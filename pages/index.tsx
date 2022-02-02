import type { NextPage } from 'next'
import SearchUser from '../components/SearchUser'
import { AnimatePresence } from 'framer-motion'

const Home: NextPage = () => {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
    <div className='bg-slate-800 h-screen w-screen flex flex-col items-center justify-center text-white'>

      {/*<Link href='/MetaPathos/1'>
        Meta
      </Link>*/}
      <img src='/headpats.png' className='w-24 h-24 rounded-xl' onMouseOver={e => e.currentTarget.src = '/headpats.gif'} onMouseOut={e => e.currentTarget.src = '/headpats.png'} width={400} height={400}/>
      <div className='font-black text-6xl'>Headpats</div>
      <SearchUser />
    </div>
    </AnimatePresence>
  )
}

export default Home
