import Link from 'next/link'
import { useRouter } from 'next/router'

type NavButtonType = {
  direction: boolean
}



const NavButton = ({direction}:NavButtonType) => {

  const router = useRouter()
  const { User, pid } = router.query 
  const linkPath = router.pathname

  const pageNext = direction ? Number(pid) + 1 : Number(pid) - 1
  if(direction){
    return <Link
      href={{
        pathname: linkPath,
        query: {
          pid: pageNext,
          User:User
        }
      }}> Next </Link>
  }else{

  return ( pageNext > 0 ? 
    <Link
      href={{
        pathname: linkPath,
        query: {
          pid: pageNext,
          User: User 
        }
      }}> Prev </Link>
      :
      <div className='invisible'> Prev </div>)
  }
}

export default NavButton
