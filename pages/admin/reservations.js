import { useState, useEffect, useRef } from 'react'
import axios from '../../config/axios'
import { userLoggedSSR } from '../../utils/auth'

import Layout from '../../components/admin/Layout'
import Table from '../../components/common/Table'
import Input from '../../components/common/Input'
import InputRadio from '../../components/common/InputRadio'
import TextArea from '../../components/common/TextArea'
import FormInputSearch from '../../components/common/FormInputSearch'
import MessageBox from '../../components/common/MessageBox'
import Button from '../../components/common/Button'

const iniState = {
  loading: false,
  data: [],
  message: null,
  error: false,
  filter: { status: '0' }
}

const headers = [
  { field: 'id', title: 'ID' },
  { field: 'name', title: 'Nome'},
  { field: 'phone', title: 'Telefone'},
  { title: 'Data/Hora', render: row => <>{new Date(row.date).toLocaleString().substr(0, 10) + ' ' + row.time}</>},
  { title: 'Confirmada', align: 'center', render: row => !!row.checked && <i className="fas fa-check has-text-success" />}
]

const listStatus = [
  { label: 'Todos', value: '0' },
  { label: 'Confirmadas', value: '1' },
  { label: 'Pendentes', value: '2' }    
]

const url = '/reservations'

export default function(props) {
  const [state, _setState] = useState(iniState)
  const [dataShow, setDataShow] = useState(null)

  function setState(obj) {
    _setState(state => ({ ...state, ...obj }))
  }


  function show(id) {
    setDataShow(state.data.find(item => item.id === id))    
  }

  async function remove(id) {
    try {
      await axios.delete(url + '/' + id)
      load()
    } catch (error) {
      setState({
        error: true,
        message: 'Não foi possivel excluir a reserva!'
      })
    }
  }

  async function save(data) {
    try {
      await axios.put(url + '/' + data.id, { checked: !data.checked })
      setDataShow(null)
      load()
    } catch (error) {
      setState({
        error: true,
        message: 'Não foi possivel atualizar os dados!'
      })
    }
  }

  function closeMessage() {
    setState({ error: false, message: null })
  }

  function cancel() {
    setDataShow(null)
  }

  function onChangeFilter(name, value) {
    const filter = { ...state.filter }
    if (value) {
      filter[name] = value
    } else {
      delete filter[name]
    }
    setState({ filter })
  }

  async function load() {
    setState({ loading: true })
    try {
      const resp = await axios.get(url, { params: state.filter })
      setState({ loading: false, data: resp.data })
    } catch (error) {
      setState({ 
        loading: false,
        msgError: 'Não foi possível obter a lista de reservas!'
       })
    }
  }

  useEffect(() => { load() }, [state.filter])

  return (
    <Layout>
      <div>
        {dataShow &&
          <Show
            data={dataShow} 
            save={save}
            cancel={cancel}
          />
        }
        <div className="columns is-vcentered">
          <div className="column">
            <FormInputSearch 
              onSubmit={v => onChangeFilter('name', v)} 
              onChange={v => !v && onChangeFilter('name')}
            />
          </div>
          <div className="column"> 
            <div className="control is-pulled-right">
              <InputRadio 
                items={listStatus} 
                name="status"
                value={state.filter.status}                
                onChange={onChangeFilter}
              />
            </div>            
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
            showRow={show}
            loading={state.loading}
          />
        </div>
      </div>  
    </Layout>      
  )
}


function Show(props) {
  const data = { ...props.data }

  data.datetime = new Date(data.date).toLocaleString().substr(0, 10) + ' ' +
                  data.time

  function onSubmit(e) {
    e.preventDefault()
    props.save(data)
  }

  return (
    <div className="modal is-active">
      <form onSubmit={onSubmit}>            
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Detalhes da reserva</p>
          </header>
          <section className="modal-card-body">
            <div className="columns is-variable is-1">
              <div className="column">
                <Input type="text" label="Nome completo" value={data.name} readOnly />
              </div>
              <div className="column">
                <Input type="email" label="Email" value={data.email} readOnly />
              </div>
            </div>
            <div className="columns is-variable is-1">
              <div className="column">
                <Input type="text" label="Telefone" value={data.phone} readOnly />
              </div>
              <div className="column">
                <Input type="text" label="Data/Hora" value={data.datetime} readOnly />
              </div>
              <div className="column">
                <Input type="text" label="Assentos" value={data.seats} readOnly />
              </div>
            </div>
            <TextArea label="Mensagem" value={data.message} readOnly />
          </section>          
          <footer className="modal-card-foot">
            <Button type="submit" theme="success" icon={'fas fa-' + (data.checked ? 'undo' : 'check')}>
              {data.checked ? 'Retirar reserva' : 'Confirmar reserva'}
            </Button>
            <Button className="ml-2" theme="danger" icon="fas fa-times" onClick={props.cancel}>Cancelar</Button>
            {!!data.checked &&
              <span class="icon is-large" style={{marginLeft: 'auto'}}>
                <i className="fas fa-check fa-2x has-text-success"></i>
              </span>
            }
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