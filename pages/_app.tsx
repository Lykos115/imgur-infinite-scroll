import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps:{ session, ...pageProps }}: AppProps) {

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
