import { useEffect } from 'react'
import Router from 'next/router'

import Header from './Header'
import Footer from './Footer'
import SideBar from './Sidebar'
import Loading from '../common/Loading'

import { useAppContext } from '../providers/AppContext'

export default function(props) {
  const { user, logged, loadUser, sideBar } = useAppContext()

  useEffect(() => { 
    if (!user) {
      loadUser()
    } else if (!logged()) {
      Router.push('/login')
    }
  }, [user])

  if (!logged()) {
    return <Loading isFull />
  }

  return (
    <div className="is-flex">
      <SideBar />
      <div className={'adm-container' + (!sideBar ? ' fullwidth' : '')}>
        <Header />      
        <main className="adm-main">{props.children}</main>
        <Footer />
      </div>      
    </div>
  )
}
