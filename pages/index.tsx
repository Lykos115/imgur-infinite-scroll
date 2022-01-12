import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className='bg-slate-800 h-screen w-screen flex flex-col items-center justify-center text-white'>
      <Link href='/MetaPathos/1'>
        Meta
      </Link>
    </div>
  )
}

export default Home
