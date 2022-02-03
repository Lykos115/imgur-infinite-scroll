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

  return <Link
      href={{
        pathname: linkPath,
        query: {
          pid: pageNext,
          User: User 
        }
      }} passHref>
      <a className={`${pageNext > 0 ? 'visible' : 'invisible'} bg-gray-600 text-white p-4 rounded-xl`}>{direction ? 'Next': 'Prev'}</a></Link>
}

export default NavButton
