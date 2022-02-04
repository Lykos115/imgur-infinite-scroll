import NavButton from './Navigation/NavButton'
import AlbumSearchUser from './AlbumUserSearch'
import HomeIcon from './HomeIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'

type NavType = {
  isEnd: boolean
}

const Navigation = ({isEnd}: NavType) => {
  const router = useRouter()
  const { User } = router.query
  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    <nav className='w-full h-20 z-20 justify-center items-center text-center place-content-around grid grid-cols-3 md:grid-cols-5'>
      <HomeIcon />
      <div className='order-1 md:order-none'>
        <NavButton direction={false} />
      </div>
      <AlbumSearchUser />
      <div className='order-3 md:order-none'>
        <NavButton direction={true} isEnd={isEnd}/>
      </div>
      <div className='hidden md:block md:order-last md:text-4xl'>
        <Link href={'/' + User}> &infin; </Link>
      </div>
    </nav>
  </div>
)
}
export default Navigation
