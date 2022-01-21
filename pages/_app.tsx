import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'

function MyApp({ Component, pageProps:{ session, ...pageProps }}: AppProps) {

  return (
    <div className='bg-slate-800 h-screen'>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
