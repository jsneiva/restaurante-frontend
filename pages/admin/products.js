import { useState, useEffect, useRef } from 'react'
import axios from '../../config/axios'
import utils from '../../utils/utils'
import { userLoggedSSR } from '../../utils/auth'

import Layout from '../../components/admin/Layout'
import Table from '../../components/common/Table'
import Input from '../../components/common/Input'
import InputCheck from '../../components/common/InputCheck'
import InputFile from '../../components/common/InputFile'
import InputNumber from '../../components/common/InputNumber'
import FormInputSearch from '../../components/common/FormInputSearch'
import TextArea from '../../components/common/TextArea'
import DatePicker from '../../components/common/DatePicker'
import Select from '../../components/common/Select'
import MessageBox from '../../components/common/MessageBox'
import Button from '../../components/common/Button'

const iniState = {
  loading: false,
  data: [],
  message: null,
  error: false
}

const headers = [
  { field: 'image', title: 'Imagem', width: 70, render: row => !!row.image && <Image {...row} />},  
  { field: 'id', title: 'ID' },
  { field: 'name', title: 'Nome do Item'},
  { field: 'price', title: 'Preço', align: 'right', render: row => utils.formatCurrency(row.price)},
  { title: "Status", render: row => <Status {...row} /> } 
]

const url = '/menu/products'

const Image = props => (
  <img src={props.urlImage} alt={props.name} width={64} />
)

const Status = ({ promotion, active }) => (
  <div className="tags">
    {promotion && <span className="tag is-success is-rounded">Promo</span>}
    {!active && <span className="tag is-danger is-rounded">Inativo</span>}
  </div>
)


export default function(props) {
  const [state, _setState] = useState(iniState)
  const [dataEdit, setDataEdit] = useState(null)

  function setState(obj) {
    _setState(state => ({ ...state, ...obj }))
  }

  function add() {
    setDataEdit({ 
      name: '',
      description: '',
      active: true,
      price: 0,
      is_promo: false,
      price_promo: 0,
      end_promo: 0,
      group_id: null,
      image: null
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
        message: 'Não foi possivel excluir o produto!'
      })
    }
  }

  async function save(data) {
    try {
      if (!data.is_promo) {
        delete data.price_promo
        delete data.end_promo
      }
      const fileImage = data.image ? data.image : null
      delete data.image
      if (data.id) {
        await axios.put(url + '/' + data.id, data)
      } else {
        const resp = await axios.post(url, data)
        data.id = resp.data.id
      }
      if (fileImage) {
        const formData = new FormData()
        formData.append('image', fileImage)
        await axios.post(
          url + '/' + data.id + '/images', 
          formData, 
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
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

  function setMessage(oMsg) {
    if (oMsg) {
      setState(oMsg)
    } else {
      setState({ error: false, message: null })
    }
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
        msgError: 'Não foi possível obter a lista de produtos!'
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
            setMessage={setMessage}
          />      
        }
        <div className="columns">
          <div className="column is-6">
            <Button theme="primary" icon="fas fa-plus" onClick={add}>
              Adicionar produto
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
            onClick={e => setMessage(null)}
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
  const [data, setData] = useState({ 
    ...props.data, 
    image: null,
    end_promo: utils.stringToDate(props.data.end_promo)
   })
  const [groups, setGroups] = useState([])
  const refInput = useRef()
  const refImage = useRef()

  function onChange(name, value) {
    setData({ ...data, [name]: value })
  }

  function onSubmit(e) {
    e.preventDefault()    
    props.save({
      ...data, 
      image: refImage.current.files[0]
    })
  }

  useEffect(() => {
    async function loadGroups() {
      try {
        const resp = await axios.get('/menu/groups')        
        setGroups(resp.data.map(grp => ({ value: grp.id, label: grp.id + ' - ' + grp.name })))
      } catch (error) {
        props.setMessage({
          error: true,
          message: 'Não foi possível obter os grupos de produtos!'
        })
      }
    }
    loadGroups()
    refInput.current.focus() 
  }, [])

  return (
    <div className="modal is-active">
      <form onSubmit={onSubmit}>            
        <div className="modal-background"></div>
        <div className="modal-card" style={{minWidth: '70vw'}}>
          <header className="modal-card-head">
            <p className="modal-card-title">Cadastro de produto</p>
          </header>
          <section className="modal-card-body">
            <div className="columns mb-0 is-variable is-1">
              {data.id && 
                <div className="column is-1">
                  <Input type="text" label="ID" name="id" value={data.id} readOnly />
                </div>
              }
              <div className="column">
                <Input 
                  ref={refInput} 
                  type="text" 
                  label="Nome do produto*" 
                  name="name" 
                  value={data.name} 
                  onChange={onChange} 
                  required 
                />
              </div>
              <div className="column">
                <Select 
                  label="Grupo do cardápio*"
                  name="group_id"
                  value={data.group_id}
                  onChange={onChange}
                  options={groups}
                />
              </div>
            </div>
            <div className="columns is-variabel is-1">
              <div className="column">
                <TextArea 
                  label="Descrição detalhada"
                  name="description"
                  value={data.description}
                  onChange={onChange}
                  rows={2}
                />
              </div>
              <div className="column">
                <InputFile
                  label="Arquivo de imagem do produto"
                  name="image"
                  ref={refImage}
                />
                <div className="columns">
                  <div className="column is-narrow">
                    <InputCheck label="Produto Ativo" name="active" checked={data.active} onChange={onChange} />        
                  </div>
                  <div className="column">
                    <InputCheck label="Produto em Promoção" name="is_promo" checked={data.is_promo} onChange={onChange} />                    
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <InputNumber
                  type="text"
                  label="Preço de venda*"
                  name="price"
                  value={data.price}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="column">
                <InputNumber 
                    label="Preço de promoção"
                    name="price_promo"
                    value={data.price_promo}
                    onChange={onChange}
                    disabled={!data.is_promo}
                    required={data.is_promo}
                  />
              </div>
              <div className="column">
                <DatePicker
                  label="Fim da promoção"
                  type="date"
                  name="end_promo"
                  value={data.end_promo || ''}
                  onChange={onChange}
                  disabled={!data.is_promo}
                  required={data.is_promo}
                />
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