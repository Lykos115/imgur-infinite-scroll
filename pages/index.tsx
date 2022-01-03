import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  console.log(process.env.IMGUR_BASE_URL)
  return (
    <div className='bg-slate-800 h-screen w-screen flex flex-col items-center justify-center text-white'>
      <Link href='/MetaPathos'>
        Meta
      </Link>
    </div>
  )
}

export default Home
