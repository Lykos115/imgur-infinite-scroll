import NavButton from './Navigation/NavButton'
import AlbumSearchUser from './AlbumUserSearch'
import HomeIcon from './HomeIcon'

const Navigation = () => {

  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    <HomeIcon />
    <nav className='w-full h-20 z-20 flex justify-center items-center text-center place-content-around'>
      {/*<Image width={80} height={80} src='/headpats.gif' className='absolute top-0 left-0 right-0'/>*/}
      <NavButton direction={false} />
      {/*<div>{User}</div>*/}
      <AlbumSearchUser />     
      <NavButton direction={true} />
    </nav>
  </div>
)
}
export default Navigation
