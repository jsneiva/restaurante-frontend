import { useState, useEffect, useRef } from 'react'
import axios from '../../config/axios'
import { userLoggedSSR } from '../../utils/auth'

import Layout from '../../components/admin/Layout'
import Table from '../../components/common/Table'
import Input from '../../components/common/Input'
import FormInputSearch from '../../components/common/FormInputSearch'
import Button from '../../components/common/Button'
import { msgBoxConfirm, msgBoxError } from '../../utils/messages'

const iniState = {
  loading: false,
  data: []
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
      if (await msgBoxConfirm('Confirma a exclusão deste grupo?')) {
        await axios.delete(url + '/' + id)
        load()            
      }
    } catch (error) {
      msgBoxError('Não foi possível excluir o grupo!')
    }
  }

  async function save(data) {
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
      msgBoxError('Não foi possível obter a lista de grupos!')
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
    } catch (e) {
      msgBoxError('Não foi possível salvar os dados!')
    }
    setWaiting(false)
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