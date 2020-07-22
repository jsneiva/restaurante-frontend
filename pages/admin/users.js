import { useState, useEffect, useRef } from 'react'
import axios from '../../config/axios'
import { userLoggedSSR } from '../../utils/auth'
import { msgBoxConfirm, msgBoxError } from '../../utils/messages'

import Layout from '../../components/admin/Layout'
import Table from '../../components/common/Table'
import Input from '../../components/common/Input'
import InputCheck from '../../components/common/InputCheck'
import FormInputSearch from '../../components/common/FormInputSearch'
import Button from '../../components/common/Button'

const iniState = {
  loading: false,
  data: []
}

const headers = [
  { field: 'id', title: 'ID' },
  { field: 'username', title: 'Nome do usuário'},
  { field: 'email', title: 'Email'},
  { field: 'admin', title: 'Admin.', align: 'center', render: row => row.admin && <i className="fas fa-check has-text-success" />}  
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
      if (await msgBoxConfirm('Confirma a exclusão deste usuário?')) {
        await axios.delete(url + '/' + id)
        load()
      }
    } catch (error) {
      msgBoxError('Não foi possível excluir o usuário!')
    }
  }

  async function save(data) {
    if (data.password !== data.passwordConf) {
      msgBoxError('A confirmação de senha não confere!')
      return
    }
    if (data.id) {
      await axios.put(url + '/' + data.id, data)
    } else {
      await axios.post(url, data)
    }
    setDataEdit(null)
    load()
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
      setState({ loading: false })
      msgBoxError('Não foi possível obter a lista de usuários!')
    }
  }

  useEffect(() => { load() }, [])

  return (
    <Layout>
      <div>
        {dataEdit &&
          <Edit 
            data={dataEdit}
            save={save}
            cancel={cancel} 
          />
        }
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
        <div>
          <Table
            headers={headers}
            rows={state.data}
            removeRow={remove}
            editRow={edit}
            loading={state.loading}
          />
        </div>
      </div>  
    </Layout>      
  )
}


function Edit(props) {
  const [data, setData] = useState(props.data)
  const [waiting, setWaiting] = useState(false)
  const ref = useRef()


  function onChange(name, value) {
    setData({ ...data, [name]: value })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setWaiting(true)
    try {
      await props.save(data)      
    } catch (error) {
      msgBoxError('Não foi posível salvar os dados!')
    }
    setWaiting(false)
  }

  useEffect(() => ref.current.focus(), [])

  return (
    <div className="modal is-active">
      <form onSubmit={onSubmit}>            
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Cadastro de usuário</p>
          </header>
          <section className="modal-card-body">
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
          </section>
          <footer className="modal-card-foot">
            <Button type="submit" loading={waiting} theme="success" icon="fas fa-check">Salvar</Button>
            <Button className="ml-2" theme="danger" icon="fas fa-times" onClick={props.cancel}>Cancelar</Button>
          </footer>            
        </div>
      </form>
    </div>
  )
}


export async function getServerSideProps(ctx) {
  const user = await userLoggedSSR(ctx)
  return { props: { user } }
}