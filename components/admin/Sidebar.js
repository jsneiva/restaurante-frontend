import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAppContext } from '../../components/providers/AppContext'

export default function SideBar(props) {
  const { sideBar } = useAppContext()
  const ref = useRef()
  const router = useRouter()

  useEffect(() => {
    const element = [...ref.current.children].find(item => {
      const a = item.querySelector('a')
      return (a && a.getAttribute('href') === router.pathname)
    })
    if (element) {
      element.classList.add('active')
    }
  }, [])

  return (
    <nav className={'adm-sidebar' + (sideBar ? ' show' : '')}>
      <ul ref={ref}>
        <li>
          <Link href="/">
            <a>
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
      </ul>
    </nav>
  )
}