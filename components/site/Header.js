import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import classNames from 'classnames'

const pages = [
  {
    title: 'Home',
    path: '/'
  }, {
    title: 'Cardápio',
    path: '/menu'
  }, {
    title: 'Galeria',
    path: '/gallery'
  }, {
    title: 'Sobre',
    path: '/about'
  }, {
    title: 'Contato',
    path: '/contacts'
  }
]

export default function Header(props) {
  const router = useRouter()
  const active = pages.findIndex(page=> page.path === router.pathname)
  const [openMenu, setOpenMenu] = useState(false)

  function onButtonClick(e) {
    e.preventDefault()
    setOpenMenu(!openMenu)
  }

  return (
    <header>

      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="container">

          <div className="navbar-brand">
            <Link href="/">
              <a>
                <img className="logo" src="/images/logo.svg" alt="Logomarca do Restaurante Sabor & Delícia" />
              </a>
            </Link>

            <a role="button" 
              className="navbar-burger" 
              aria-label="menu" 
              aria-expanded="false"
              onClick={onButtonClick}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

          </div>

          <div className={'navbar-menu' + (openMenu ? ' is-active' : '')}>

            <div className="navbar-end mr-6">

              {pages.map((page, idx) => (
                <Link key={page.path} href={page.path}> 
                  <a 
                    className={classNames("navbar-item", active===idx && 'active')}
                  >
                    {page.title}
                  </a>
                </Link>
              ))}

            </div>

            <div className="navbar-item">
              <Link href="/login">
                <a className="button is-primary is-outlined">
                  <span className="icon">
                    <i className="fas fa-unlock"></i>
                  </span>
                  <span>Login</span>
                </a>
              </Link>
            </div>

          </div>

        </div>

      </nav>

    </header>
  )
}

