
import HomeIcon from './HomeIcon'
import InfiniteUserSearch from './InfiniteNavigation/InfiniteUserSearch'

const InfiniteNavigation = () => {

  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    <nav className='w-full h-20 z-20 md:flex justify-center items-center text-center place-content-around grid grid-cols-3'>
      {/*<Image width={80} height={80} src='/headpats.gif' className='absolute top-0 left-0 right-0'/>*/}
      <HomeIcon />
      <InfiniteUserSearch />     
    </nav>
  </div>
)
}
export default InfiniteNavigation
