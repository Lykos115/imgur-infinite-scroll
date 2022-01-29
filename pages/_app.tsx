import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps:{ session, ...pageProps }}: AppProps) {

  return (
    <div className='bg-slate-800 h-screen'> 
      <Head>
        <title>Headpats</title>
        <link rel='icon' type='image/gif' href='/headpats_icon.gif' />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
