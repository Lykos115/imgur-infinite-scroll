import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps:{ session, ...pageProps }}: AppProps) {

  return (
    <div className='bg-slate-800 h-screen'> 
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
