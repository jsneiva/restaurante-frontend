import { useState, useEffect, useRef } from 'react'
import axios from '../../config/axios'

import Layout from '../../components/admin/Layout'
import Table from '../../components/common/Table'
import Input from '../../components/common/Input'
import InputCheck from '../../components/common/InputCheck'
import FormInputSearch from '../../components/common/FormInputSearch'
import MessageBox from '../../components/common/MessageBox'
import Button from '../../components/common/Button'

const iniState = {
  loading: false,
  data: [],
  message: null,
  error: false
}

const headers = [
  { field: 'id', title: 'ID' },
  { field: 'username', title: 'Nome do usuário'},
  { field: 'email', title: 'Email'},
  { field: 'admin', title: 'Admin.', align: 'center', render: v => !!v && <i className="fas fa-check has-text-success" />}  
]


const url = '/users'

export default function(props) {
  const [state, _setState] = useState(iniState)
  const [dataEdit, setDataEdit] = useState(null)

  function setState(obj) {
    _setState(state => ({ ...state, ...obj }))
  }

  function add() {
    setDataEdit({ 
      username: '',
      email: '',
      admin: false,
      password: '',
      passwordConf: ''
    })
  }

  function edit(id) {
    setDataEdit(state.data.find(item => item.id === id))
  }

  async function remove(id) {
    try {
      await axios.delete(url + '/' + id)
      load()
    } catch (error) {
      setState({
        error: true,
        message: 'Não foi possivel excluir o usuário!'
      })
    }
  }

  async function save(data) {
    try {
      if (data.password !== data.passwordConf) {
        throw { msg: 'A confirmação de senha não confere!' }
      }
      if (data.id) {
        await axios.put(url + '/' + data.id, data)
      } else {
        await axios.post(url, data)
      }
      setDataEdit(null)
      load()
    } catch (e) {
      setState({
        error: true,
        message: e.msg || 'Não foi possivel salvar os dados!'
      })
    }
  }

  function closeMessage() {
    setState({ error: false, message: null })
  }

  function cancel() {
    setDataEdit(null)
  }

  function search(value) {
    load({ name: value })  
  }
  
  async function load(params) {
    setState({ loading: true })
    try {
      const resp = await axios.get(url, params && { params })
      setState({ loading: false, data: resp.data })
    } catch (error) {
      setState({ 
        loading: false,
        msgError: 'Não foi possível obter a lista de usuários!'
       })
    }
  }

  useEffect(() => { load() }, [])

  return (
    <Layout>
      <div>
        {dataEdit ? (
          <Edit 
            data={dataEdit}
            save={save}
            cancel={cancel} 
          />
        ) : (
          <div className="columns">
            <div className="column is-6">
              <Button theme="primary" icon="fas fa-plus" onClick={add}>
                Adicionar usuário
              </Button>
            </div>          
            <div className="column is-6">
              <FormInputSearch 
                onChange={v => !v && load()}
                onSubmit={search} 
              />
            </div>
          </div>
        )}
        {state.error && 
          <MessageBox 
            small error 
            message={state.message} 
            onClick={closeMessage}
            className="mt-4"
          />
        }
        <div>
          <Table
            headers={headers}
            rows={state.data}
            removeRow={remove}
            editRow={edit}
          />
        </div>
      </div>  
    </Layout>      
  )
}


function Edit(props) {
  const [data, setData] = useState(props.data)
  const ref = useRef()


  function onChange(name, value) {
    setData({ ...data, [name]: value })
  }

  function onSubmit(e) {
    e.preventDefault()
    props.save(data)
  }

  useEffect(() => ref.current.focus(), [])

  return (
    <div className="adm-box-cad mb-5">
      <form onSubmit={onSubmit}>
        <div className="columns is-variable is-1">
          {data.id && 
            <div className="column is-1">
              <Input type="text" label="ID" name="id" value={data.id} readOnly />
            </div>
          }
          <div className="column">
            <Input ref={ref} type="text" label="Nome do usuário" name="username" value={data.username} onChange={onChange} required />
          </div>
          <div className="column">
            <Input type="email" label="Email" name="email" value={data.email} onChange={onChange} required />
          </div>
        </div>
        <div className="columns is-variable is-1">
          <div className="column">
            <Input type="password" label="Senha" name="password" value={data.password} onChange={onChange} required />
          </div>
          <div className="column">
            <Input type="password" label="Confirme a senha" name="passwordConf" value={data.passwordConf} onChange={onChange} />            
          </div>
        </div>
        <InputCheck label="Adminstrador do site" name="admin" checked={data.admin} onChange={onChange} small />        
        <div className="mt-4">
          <Button type="submit" theme="success" icon="fas fa-check">Salvar</Button>
          <Button className="ml-2" theme="danger" icon="fas fa-times" onClick={props.cancel}>Cancelar</Button>
        </div>
      </form>
    </div>
  )
}
