import Link from 'next/link'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import axios from '../config/axios'
import Input from '../components/common/Input'
import InputCheck from '../components/common/InputCheck'
import MessageBox from '../components/common/MessageBox'

import { useAppContext } from '../components/providers/AppContext'

const iniData = {
  username: '',
  email: '',
  password: '',
  passwordConf: '',
  remember: false
}

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const [register, setRegister] = useState(false)
  const [data, setData] = useState(iniData)
  const AppContext = useAppContext()

  function onChange(name, value) {
    setData({ ...data, [name]: value })
    if (msg) setMsg(null)
  }

  function toggleRegister(e) {
    setRegister(!register)
    setData(iniData)
    if (msg) setMsg(null)
  }

  async function onSubmmit(e) {
    setLoading(true)
    e.preventDefault()
    try {
      if (register) {
        if (data.password !== data.passwordConf) {
          throw 'Confirmação de senha incorreta.'
        } 
        const resp = await axios.post('/users', data)
        setMsg({ message: 'O seu cadastro foi realizado com sucesso!'})
      } else {
        const resp = await axios.post('/login', {
          email: data.email,
          password: data.password
        })
        AppContext.login(resp.data.token)
        if (data.remember) {
          localStorage.setItem('user', data.email)
        } else {
          localStorage.removeItem('user')
        }
        Router.push('/admin')
      }
    } catch (error) {
      setMsg({
        error: true,
        message: typeof error === 'string' ? (
          error
        ) : register ? (
          'Não foi possivel realizar o cadastro!'
        ) : (
          'Usuário ou senha inválidos!'
        )
      })
    }    
    setLoading(false)
  }

  useEffect(() => {
    let selector = 'input'
    if (!register) {
      const email = localStorage.getItem('user')
      setData(state => ({ 
        ...state, 
        email,
        remember: !!email
      }))
      selector = `input[name="${!!email ? 'password' : 'email'}"]`
      AppContext.logout()
    } 
    document.querySelector(selector).focus()
  }, [register])

  return (
    <div className="login-container">
      <div className="box">
        <Link href="/">
          <a>
            <figure className="image is-4by2">
              <img src="/images/logo.svg" alt="Logomarca do Restaurante Sabor & Delícia"/>
            </figure>
          </a>
        </Link>
        <hr/>
        <form onSubmit={onSubmmit}>
          {register &&
            <div className="py-3">
              <Input 
                type="text" 
                name="username" 
                value={data.username} 
                onChange={onChange} 
                placeholder="Informe o seu nome" 
                required 
              />
            </div>                
          }
          <div className="py-3">            
            <Input 
              type="email" 
              name="email" 
              value={data.email} 
              onChange={onChange} 
              placeholder="Informe o seu e-mail" 
              required 
            />
          </div>
          <div className="py-3">
            <Input 
              type="password" 
              name="password" 
              value={data.password} 
              onChange={onChange} 
              placeholder="Informe a sua senha" 
              required 
            />
          </div>
          {register &&
            <div className="py-3">
              <Input 
                type="password" 
                name="passwordConf" 
                value={data.passwordConf} 
                onChange={onChange} 
                placeholder="Confirme a senha" 
                required 
              />
            </div>              
          }
          {msg && <MessageBox small {...msg} />}
          {!register && 
            <div>
              <InputCheck 
                label="Lembrar meu usuário" 
                name="remember"
                small
                checked={data.remember}
                onChange={onChange}
              />
            </div>
          }
          <hr/>
          {(!msg || msg.error) && 
            <button 
              className={'button is-primary is-fullwidth' + (loading ? ' is-loading' : '')} 
              type="submit"
            >{register? 'Cadastrar' : 'Entrar'}</button>
          }
          <Link href="/"><a className="button is-link is-fullwidth mt-4">Voltar para o site</a></Link>
          <div className="is-size-7 mt-3">          
            {!register ? (
              <>
                Novo por aqui?&nbsp;&nbsp;
                <a href="#" className="has-text-link has-text-weight-bold" onClick={toggleRegister}>Registre-se</a>
              </>
            ) : (
              <a href="#" className="has-text-link has-text-weight-bold" onClick={toggleRegister}>Voltar para o Login</a>
            )}
          </div>                    
        </form>
      </div>
    </div>
  )

}