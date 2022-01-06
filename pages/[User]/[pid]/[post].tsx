import axios from 'axios'
import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig } from 'swr'


type Data = {
  fallback: any
}

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const Post = ({pageNum}) => {
  const router = useRouter()
  const { User } = router.query
  const { data } = useSWR(`/api/${User}/albumIds?page=${pageNum}`, fetcher)
  if(!data) return <div> loading ... </div>

  return <div>testing PID</div>
  
 }

const UserPost:NextPage = ({ fallback }) =>{ 
  const router = useRouter()
  const { User, pid, post } = router.query
  const { data } = useSWR(`/api/${User}/albumIds?page=${pid}`, fetcher)
  const nextPost = data.response.indexOf(post) + 1
  const nextPostId = data.response[nextPost]
  console.log(nextPostId)
  return (
  <SWRConfig value={{ fallback }}>
    <div className='hidden'><Post pageNum={pid} /></div>
    <Post pageNum={pid} />
    <button className='bg-gray-800 w-12 h-12 text-white'
      onClick={() => router.push({
        pathname:'/[User]/[pid]/[post]',
        query: {
          User:User,
          pid:pid,
          post:[nextPostId]
        }
      })}> next </button>
  </SWRConfig>

)}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { User, pid } = context.query
    const header = {
      headers:{
        'Authorization': `Client-ID ${process.env.IMGUR_KEY}`
      }
    }
    const pageNumber = Number(pid) - 1
    const apiURL = `/account/${User}/submissions/${pageNumber}`
    const res = await axios.get(process.env.IMGUR_BASE_URL + apiURL, header)
    const data = res.data.data.map((item:any) => item.id)

    return {
      props: { 
        fallback: {
          [apiURL]: data
        }
      }
    }
  } catch(error) {
    return { props: { "error": "not working" } }
  }
}



export default UserPost
