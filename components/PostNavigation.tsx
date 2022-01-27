import AlbumSearchUser from './AlbumUserSearch'
import HomeIcon from './HomeIcon'
import PostNavButton from './PostNavigation/PostNavButton'


const PostNavigation = (prop: any) => {

  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    
    <nav className='w-full h-20 z-20 grid grid-cols-3 md:grid-cols-5 justify-center items-center text-center'>
      {/*<Image width={80} height={80} src='/headpats.gif' className='absolute top-0 left-0 right-0'/>*/}
      <HomeIcon />
      <PostNavButton prevArr={prop.prevArr} prevPostion={prop.prevPosition} currPosition={prop.currPosition} currArr={prop.currArr} direction={false}/>
      <AlbumSearchUser />
      <PostNavButton nextArr={prop.nextArr} currArr={prop.currArr} nextPosition={prop.nextPostion} direction={true}/>
      <div></div>
    </nav>
  </div>
)
}
export default PostNavigation

