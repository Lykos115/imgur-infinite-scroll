
import { useRouter } from 'next/router'
import PostNavButton from './PostNavigation/PostNavButton'


const PostNavigation = (prop: any) => {
  const router = useRouter()
  const { User } = router.query

  console.log(prop)

  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    
    <nav className='w-full h-20 z-20 flex justify-center items-center text-center space-x-96'>
      {/*<Image width={80} height={80} src='/headpats.gif' className='absolute top-0 left-0 right-0'/>*/}
      <PostNavButton prevArr={prop.prevArr} prevPostion={prop.prevPosition} currPosition={prop.currPosition} currArr={prop.currArr} direction={false}/>
      <div>{User}</div>
      <PostNavButton nextArr={prop.nextArr} currArr={prop.currArr} nextPosition={prop.nextPostion} direction={true}/>
    </nav>
  </div>
)
}
export default PostNavigation

