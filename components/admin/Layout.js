import { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'
import SideBar from './Sidebar'
import Loading from '../common/Loading'

import { useAppContext } from '../providers/AppContext'

export default function(props) {
  const { user, logged, loadUser, sideBar, toggleSideBar } = useAppContext()

  useEffect(() => { 

    function defSideBar() {
      toggleSideBar(window.innerWidth > 800)  
    }

    if (!user) {
      loadUser()
    } else if (!logged()) {
      Router.push('/login')
    }
    Router.events.on('routeChangeComplete', defSideBar)
    defSideBar()
    return () => {
      Router.events.off('routeChangeComplete', defSideBar)
    }
    
  }, [user])

  if (!logged()) {
    return <Loading isFull />
  }

  return (
    <>
      <Head>
        <title>Sabor & Delícia - Administrativo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />        
      </Head>
      <div className="is-flex">
        <SideBar />
        <div className={'adm-container' + (!sideBar ? ' fullwidth' : '')}>
          <Header />      
          <main className="adm-main">{props.children}</main>
          <Footer />
        </div>      
      </div>
    </>
  )
}
