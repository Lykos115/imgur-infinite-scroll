import type { NextPage } from 'next'
import Link from 'next/link'
import HomeNavigation from '../components/HomeNavigation'

const Home: NextPage = () => {
  return (
    <div className='bg-slate-800 h-screen w-screen flex flex-col items-center justify-center text-white'>
      <HomeNavigation />
      <Link href='/MetaPathos/1'>
        Meta
      </Link>
    </div>
  )
}

export default Home
