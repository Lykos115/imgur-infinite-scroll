import axios from 'axios'
import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig } from 'swr'


type Data = {
  fallback: any
}

const fetcher = (url:string) => axios.get(url).then(res => res.data)

//const Post = () => {
//  const router = useRouter()
//  const { User, pid } = router.query
//  const { data } = useSWR(`/api/${User}/albumsIds?page=${pid}`, fetcher)
//  console.log(data)

//  return <div>testing PID</div>
// }

const UserPost:NextPage = () => {
  //<SWRConfig value={{ fallback }}>
    //<Post />
  //</SWRConfig>

  const router = useRouter()
  const { User, pid, post} = router.query
  const url = `/api/${User}/albumIds?page=${pid}`
  const { data } = useSWR(url, fetcher)
  if(!data) return <div>loading...</div>
  console.log(data.response.indexOf(post))
  return <div>testing PID</div>
}


export default UserPost
