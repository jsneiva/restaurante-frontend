import 'nprogress/nprogress.css'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'animate.css/animate.css'
import 'loaders.css/loaders.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../assets/css/style.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import AppContextProvider from '../components/providers/AppContext'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}