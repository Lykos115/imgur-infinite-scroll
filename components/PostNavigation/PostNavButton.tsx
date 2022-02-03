import Link from 'next/link'
import { useRouter } from 'next/router'




const PostNavButton = (props: any) => {

  const router = useRouter()
  const { User, pid } = router.query 
  const linkPath = router.pathname
  
  const nextPosition = props.nextPosition > 59 ? 0 : props.nextPosition
  const nextPid = props.nextPosition === 0  ? Number(pid) + 1 : Number(pid)
  const nextPostId = (props.direction && nextPosition === 0) ? props.nextArr[nextPosition] : props.currArr[nextPosition]


  const prevPosition = props.prevPosition === 0 ? 59 : props.prevPostion
  const prevPid = prevPosition === 59  ? Number(pid) - 1 : Number(pid)
  const prevPostId = (!props.direction && prevPosition === 59 && props.prevArr) ? props.prevArr[prevPosition] : props.currArr[prevPosition]

  const pidDirection = props.direction ? nextPid : prevPid
  const postIdDirection = props.direction ? nextPostId : prevPostId

  const disabledButton = props.direction ?  (props.nextArr) : ((!props.prevArr && props.currPosition !== 0 || Number(pid) !== 1) )

  if(props.direction){

    return <Link
      href={{
        pathname: linkPath,
        query: {
          pid: pidDirection,
          User: User,
          post: postIdDirection
        }
      }} passHref><a className='bg-gray-600 text-white p-4 rounded-xl'>Next</a></Link>
  }else{
    return ( disabledButton ? 
      <Link
        href={{
          pathname: linkPath,
          query: {
            pid: pidDirection,
            User: User,
            post: postIdDirection
          }
        }} passHref><a className='bg-gray-600 text-white p-4 rounded-xl'>Prev</a></Link>
      :
      <div className='invisible'> Prev </div>
    )
  }

}

export default PostNavButton
