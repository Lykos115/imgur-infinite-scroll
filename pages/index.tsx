import type { NextPage } from 'next'
import Image from '../components/Image'
import SearchUser from '../components/SearchUser'

const Home: NextPage = () => {
  return (
    <div className='bg-slate-800 h-screen w-screen flex flex-col items-center justify-center text-white'>

      {/*<Link href='/MetaPathos/1'>
        Meta
      </Link>*/}
      <Image url='/headpats.gif' width={400} height={400} />
      <div className='font-black text-6xl'>Headpats</div>
      <SearchUser />
    </div>
  )
}

export default Home
