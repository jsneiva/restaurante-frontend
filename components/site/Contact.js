import axios from '../../config/axios'
import { useState } from 'react'
import classNames from 'classnames'
import MessageBox from '../common/MessageBox'
import { Input, TextArea } from './Input'

const initData = {
  name: '',
  email: '',
  phone: '',
  cellphone: '',
  message: ''
}

export default function Contact(props) {
  const [msg, setMsg] = useState()
  const [waiting, setWaiting] = useState(false)
  const [data, setData] = useState(initData)

  function onChange(name, value) {
    setData({ ...data, [name]: value })
  }

  function onClick(e) {
    setMsg(null)
    if (msg && !msg.error) {
      setData(initData)    
    }
  }

  async function onSubmit(e) {
    let oMsg = null
    e.preventDefault()
    setWaiting(true)    
    try {
      const resp = await axios.post('/contacts', data)      
      oMsg = {
        success: true,
        message: 'A sua mensagem foi enviada com sucesso. Aguarde o nosso contato.'        
      }
    } catch (error) {
      oMsg = {
        error: true,
        message: 'Ops, não foi possivel enviar a sua mensagem. Tente mais tarde!'
      }
    }
    setWaiting(false)
    if (oMsg) {
      setMsg(oMsg)
    }
  }

  return (
    <section className="section" data-animate="bottom">
      <div className="container">

        <div className="mb-6">
          <h1 className="is-size-2 has-text-centered">Envie-nos uma mensagem</h1>
          <hr className="st-line" />
        </div>

        <div className="columns is-centered">
          <div className="column is-9" data-animate="right">
            {msg ? (
              <MessageBox {...msg} onClick={onClick} />
            ) : (
              <form onSubmit={onSubmit}>
                <div className="field is-horizontal">
                  <div className="field-body">
                    <Input type="text" name="name" value={data.name} onChange={onChange} placeholder="Nome completo *" required />
                    <Input type="email" name="email" value={data.email} onChange={onChange} placeholder="E-mail *" required />
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-body">
                    <Input type="text" name="cellphone" mask="phone" value={data.cellphone} onChange={onChange} placeholder="Celular" />
                    <Input type="text" name="phone" mask="phone" value={data.phone} onChange={onChange} placeholder="Telefone fixo" />
                  </div>
                </div>
                <TextArea name="message" value={data.message} onChange={onChange} placeholder="Digite aqui a sua mensagem" />
                <button 
                  className={classNames('button is-primary is-medium mt-4', waiting && 'is-loading')} 
                  type="submit"
                >Enviar mensagem</button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>      
  )
}