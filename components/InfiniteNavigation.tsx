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
      <div className='hidden md:block md:justify-self-center'>
        <Link href={'/' + User + '/1'} passHref><a>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        </a></Link>
      </div>
    </nav>
  </div>
)
}
export default InfiniteNavigation
