import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

import { useEffect } from 'react'

export default function(props) {

  useEffect(() => {
    const target = document.querySelectorAll('[data-animate]')
    
    function animate(e) {
      target.forEach(element => {
        const minHeight = window.innerHeight * 0.9
        const topElement = element.getBoundingClientRect().top 
        if (topElement < minHeight) {
          element.classList.add('animate')
        } else {
          element.classList.remove('animate')
        }
      })
    } 

    if (target.length) {
      animate()
      window.addEventListener('scroll', animate)
      return () => {
        window.removeEventListener('scroll', animate)
      }
    }
  }, [])


  return (
    <>
      <Head>
        <title>Sabor & Delícia Restaurante</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />        
      </Head>
      <Header />
      <div className="st-body">
        {props.children}
      </div>
      <Footer />
    </>
  )
}