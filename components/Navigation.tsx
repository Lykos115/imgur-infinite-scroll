import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

const Navigation = () => {
  const router = useRouter()
  const { User, pid } = router.query
  const pageNext = (Number(pid) + 1).toString()
  const pagePrev = (Number(pid) - 1).toString()

  const prevButton = () => {}

  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    
    <nav className='w-full h-20 z-20 flex justify-center items-center text-center space-x-96'>
      {/*<Image width={80} height={80} src='/headpats.gif' className='absolute top-0 left-0 right-0'/>*/}
      <Link
        href={{
          pathname: '/[User]/[pid]',
          query: {
            pid:pagePrev,
            User: User
          }
        }}> Prev </Link>
      <div>{User}</div>
      <Link href={{
        pathname:'/[User]/[pid]',
        query:{
          pid:pageNext,
          User:User
        }
      }}>next</Link>
    </nav>
  </div>
)
}
export default Navigation

//{
//            pathname:'/[User]/[pid]/[post]',
//            query: {
//              User:User,
//              pid:[prevPid],
//              post:[nextPostId]
//            }
//        }
