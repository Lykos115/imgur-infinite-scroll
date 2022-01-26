import NavButton from './Navigation/NavButton'
import AlbumSearchUser from './AlbumUserSearch'
import HomeIcon from './HomeIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navigation = () => {
  const router = useRouter()
  const { User } = router.query
  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    {/*<HomeIcon />*/}
    <nav className='w-full h-20 z-20 justify-center items-center text-center place-content-around grid grid-cols-3 md:grid-cols-5'>
      {/*<Image width={80} height={80} src='/headpats.gif' className='absolute top-0 left-0 right-0'/>*/}
      <HomeIcon />
      <NavButton direction={false} />
      <AlbumSearchUser />     
      <NavButton direction={true} />
      <Link href={'/' + User}> Infinite </Link>
    </nav>
  </div>
)
}
export default Navigation
