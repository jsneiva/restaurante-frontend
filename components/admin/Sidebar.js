import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAppContext } from '../../components/providers/AppContext'

export default function SideBar(props) {
  const { sideBar, toggleSideBar } = useAppContext()
  const ref = useRef()
  const router = useRouter()

  useEffect(() => {
    const element = ref.current.querySelector(`a[href="${router.pathname}"]`)
    if (element) {
      element.classList.add('active')
    }
  }, [])

  function onClick(e) {
    ref.current.querySelectorAll('li a').forEach(el => {
      if (e.target === el) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
  }

  return (
    <>
      {sideBar && <div className="adm-sidebar-modal" />}
      <nav className={'adm-sidebar' + (sideBar ? ' show' : '')} onClick={onClick}>
        <ul ref={ref}>
          <li>
            <button className="adm-sidebar-close" onClick={toggleSideBar}>
              <i className="fas fa-times fa-2x"></i>
            </button>
          </li>
          <li>
            <Link href="/">
              <a className="adm-sidebar-logo">
                <figure className="image">
                  <img src="/images/logo.svg" alt="Logomarca do restaurante"/>
                </figure>
              </a>
            </Link>                    
            <hr />
          </li>
          <li className="item"><Link href='/admin'><a>Dashboard</a></Link></li>        
          <li className="menu">
            <i className="fas fa-list-alt"></i>
            <span>Cardápio</span>
          </li>
          <li className="item"><Link href='/admin/groups'><a>Grupos</a></Link></li>
          <li className="item"><Link href='/admin/products'><a>Produtos</a></Link></li>        
          <li className="menu">
            <i className="fas fa-users"></i>
            <span>Clientes</span>
          </li>
          <li className="item"><Link href='/admin/contacts'><a>Contatos</a></Link></li>        
          <li className="item"><Link href='/admin/reservations'><a>Reservas</a></Link></li>                
          <li className="menu">
            <i className="fas fa-cogs"></i>
            <span>Configurações</span>
          </li>
          <li className="item"><Link href='/admin/users'><a>Usuários</a></Link></li>   
          <li className="adm-sidebar-footer">
            <hr/>
            <Link href='/login'>
              <a className="flex flex-align-center">
                <i className="fas fa-sign-out-alt"></i>
                <span>Sair</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </>    
  )
}