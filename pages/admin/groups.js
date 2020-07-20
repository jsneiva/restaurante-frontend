import { useState, useEffect, useRef } from 'react'
import axios from '../../config/axios'
import { userLoggedSSR } from '../../utils/auth'

import Layout from '../../components/admin/Layout'
import Table from '../../components/common/Table'
import Input from '../../components/common/Input'
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
  { field: 'name', title: 'Nome do grupo'}
]

const url = '/menu/groups'

export default function(props) {
  const [state, _setState] = useState(iniState)
  const [dataEdit, setDataEdit] = useState(null)

  function setState(obj) {
    _setState(state => ({ ...state, ...obj }))
  }

  function add() {
    setDataEdit({ name: '' })
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
        message: 'Não foi possivel excluir o grupo!'
      })
    }
  }

  async function save(data) {
    try {
      if (data.id) {
        await axios.put(url + '/' + data.id, data)
      } else {
        await axios.post(url, data)
      }
      setDataEdit(null)
      load()
    } catch (error) {
      setState({
        error: true,
        message: 'Não foi possivel salvar os dados!'
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
        msgError: 'Não foi possível obter a lista de grupos!'
       })
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
              Adicionar grupo
            </Button>
          </div>          
          <div className="column is-6">
            <FormInputSearch 
              onChange={v => !v && load()}
              onSubmit={search} 
            />
          </div>
        </div>
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
            loading={state.loading}
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

  useEffect(() => ref.current.focus())

  return (
    <div className="modal is-active">
      <form onSubmit={onSubmit}>            
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Cadastro de grupo</p>
          </header>
          <section className="modal-card-body">
            <div className="columns is-variable is-1">
              {data.id && 
                <div className="column is-1">
                  <Input type="text" label="ID" name="id" value={data.id} readOnly />
                </div>
              }
              <div className="column">
                <Input ref={ref} type="text" label="Nome do grupo" name="name" value={data.name} onChange={onChange} required />
              </div>
            </div>
          </section>          
          <footer className="modal-card-foot">
            <Button type="submit" theme="success" icon="fas fa-check">Salvar</Button>
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