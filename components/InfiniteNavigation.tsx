
import { useRouter } from 'next/router'
import HomeIcon from './HomeIcon'
import InfiniteUserSearch from './InfiniteNavigation/InfiniteUserSearch'
import Link from 'next/link'

const InfiniteNavigation = () => {

  const router = useRouter()
  const { User } = router.query

  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    <nav className='w-full h-20 z-20 justify-center items-center text-center place-content-around grid grid-cols-3 md:grid-cols-5'>
      {/*<Image width={80} height={80} src='/headpats.gif' className='absolute top-0 left-0 right-0'/>*/}
      <HomeIcon />
      <div className='order-first md:order-none'></div>
      <InfiniteUserSearch />
      <div className='order-last md:order-none'></div>
      <div className='hidden md:block'>
        <Link href={'/' + User + '/1'}> Page Mode </Link>
      </div>
    </nav>
  </div>
)
}
export default InfiniteNavigation
