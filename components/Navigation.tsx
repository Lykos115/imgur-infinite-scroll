import { useRouter } from 'next/router'
import Link from 'next/link'


const Navigation = () => {
  const router = useRouter()
  const { User, pid } = router.query
  const pageNext = (Number(pid) + 1).toString()
  const pagePrev = (Number(pid) - 1).toString()


  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    <nav className='w-full h-20 z-20 flex justify-center items-center text-center space-x-96'> 
      <Link
        href={{
          pathname: '/[User]/[pid]',
          query: {
            pid:pagePrev,
            User: User
          }
        }}>Prev</Link>
       <div>Title</div>
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
