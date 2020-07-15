import Avatar from 'react-avatar'
import Router from 'next/router'

import { useAppContext } from '../providers/AppContext'

export default props => {
  const { user, logout, toggleSideBar } = useAppContext()

  function exitApp(e) {
    Router.push('/login')
  }

  return (
    <header className="adm-header">
      <button className="adm-button-menu" onClick={toggleSideBar}>
        <i className="fas fa-bars fa-2x"></i>
      </button>
      <h2>Painel de administração</h2>
      {user &&
        <>
          <div className="avatar">
            <Avatar 
              email={user.email}
              name={user.username}
              size="40"
              round
            />
            <span>&nbsp;&nbsp;{user.username}</span>
          </div>
          <button 
            className="button is-light is-outlined is-small ml-5"
            onClick={exitApp}
          >
            Sair
          </button>
        </>
      }
    </header>
  )
}