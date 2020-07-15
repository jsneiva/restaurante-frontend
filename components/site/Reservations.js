import { useState } from 'react'
import classNames from 'classnames'
import axios from '../../config/axios'

import MessageBox from '../common/MessageBox'
import { Input, TextArea } from './Input'

const initData = {
  name: '',
  email: '',
  date: '',
  time: '',
  seats: '',
  phone: '',
  obs: ''
}

export default function Reservations() {
  const [msg, setMsg] = useState()
  const [waiting, setWaiting] = useState(false)
  const [data, setData] = useState(initData)

  function onChange(name, value) {
    setData({ ...data, [name]: value })
  }

  function onClick(e) {
    setMsg(null)
    if (msg && ! msg.error) {
      setData(initData)
    }
  }

  async function onSubmit(e) {
    let oMsg = null
    e.preventDefault()
    setWaiting(true)    
    try {
      const resp = await axios.post('/reservations', data)      
      oMsg = {
        success: true,
        message: 'A sua solicitação foi enviada com sucesso. Aguarde a nossa confirmação.'        
      }
    } catch (error) {
      oMsg = {
        error: true,
        message: 'Ops, não foi possivel enviar a sua solicitação. Tente mais tarde!'
      }
    }
    setWaiting(false)
    if (oMsg) {
      setMsg(oMsg)
    }
  }

  return (
    <section className="section" id="reservas">
      <div className="container">
        <div className="mb-6" data-animate="bottom">
          <h1 className="title is-2 has-text-centered">Faça já sua reserva!</h1>
          <hr className="st-line" />
        </div>
        <div className="columns mt-6">
          <div className="column" data-animate="left">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.0837517889067!2d-48.11566058519574!3d-15.799537289048022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bcc83b0d8ad1d%3A0xefde57231f5438db!2sRestaurante%20Sabor%20%26%20Del%C3%ADcia!5e0!3m2!1spt-BR!2sbr!4v1593891501714!5m2!1spt-BR!2sbr" width="100%" height="430" frameBorder="0" style={{border:0}} aria-hidden="false" tabIndex="0"></iframe>
          </div>
          <div className="column" data-animate="right">
            {msg ? (
              <MessageBox {...msg} onClick={onClick} />
            ) : (
              <form onSubmit={onSubmit}>
                <div className="columns mb-0">
                  <div className="column">
                    <Input type="text" name="name" value={data.name} onChange={onChange} placeholder="Nome completo*" required />
                  </div>
                  <div className="column">
                    <Input type="email" name="email" value={data.email} onChange={onChange} placeholder="E-mail*" required />
                  </div>
                </div>
                <div className="columns mb-0">
                  <div className="column">
                    <Input type="date" name="date" mask="date" value={data.date} onChange={onChange} placeholder="Data*" required />
                  </div>
                  <div className="column">
                    <Input type="text" name="time" mask="time" value={data.time} onChange={onChange} placeholder="Horário*" required />
                  </div>
                </div>
                <div className="columns mb-0">
                  <div className="column">
                    <Input type="number" name="seats" value={data.seats} onChange={onChange} placeholder="Assentos*" required/>
                  </div>
                  <div className="column">
                    <Input type="text" name="phone" mask="phone" value={data.phone} onChange={onChange} placeholder="Telefone*" required />
                  </div>
                </div>
                <TextArea name="obs" value={data.obs} onChange={onChange} placeholder="Observações" />
                <button 
                  className={classNames('button is-primary is-medium mt-4', waiting && 'is-loading')} 
                  type="submit"
                >Solicitar reserva</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}