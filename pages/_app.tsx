import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
