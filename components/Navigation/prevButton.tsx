import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'

type NavButtonType = {
  direction: boolean
}


const fetcher = (url:string) => axios.get(url).then(res => res.data)

const NavButton = ({direction}:NavButtonType) => {

  const router = useRouter()
  const { User, pid } = router.query 
  const linkPath = router.pathname
  const { data } = useSWR(direction ? `/api/${User}/albumIds?page=${Number(pid) + 1}` : `/api/${User}/albumIds?page=${Number(pid) - 1}`, fetcher)

  const pageNext = direction ? (Number(pid) + 1).toString() : (Number(pid) - 1).toString()
//  console.log(data)
  return ( (data && data.response.length) ? 
    <Link
      href={{
        pathname: linkPath,
        query: {
          pid: pageNext,
          User: User 
        }
      }}> Prev </Link>
      :
      <div>Next</div>)
}

export default NavButton

