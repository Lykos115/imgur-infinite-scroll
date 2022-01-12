import axios from 'axios'
import { warn } from 'console'
import type {GetStaticProps, NextPage, GetStaticPaths} from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig } from 'swr'


type fallbackType = {
  [key: string]: string[]
}

type postType = {
  post: string
}

type itemType = {
  width: number
  height: number
  link: string
}


const fetcher = (url:string) => axios.get(url).then(res => res.data)

const Post = ({post}: postType) => {
  const { data } = useSWR(`/api/album/${post}`, fetcher)
  if(!data) return <div> loading ... </div>
  const imageList = data.response.map((item:itemType, i: number) => { return (
      <div className='w-[42rem] h-auto p-4'>
        <Image layout='responsive' width={item.width} height={item.height} key={'fhsaodf' + i} src={item.link} alt='placeholder' />
      </div>
    )})
  return <div className='flex flex-col items-center justify-center p-4 h-auto'>{imageList}</div> 
  
 }

const UserPost:NextPage<fallbackType> = ({ fallback }) => { 
  const router = useRouter()
  const { User, pid, post } = router.query

  const { data: firstArr } = useSWR(`/api/${User}/albumIds?page=${pid}`, fetcher)
  const { data: secondArr } = useSWR(`/api/${User}/albumIds?page=${Number(pid) + 1}`, fetcher)
  
  if(!firstArr || !secondArr) return <div> loading... </div>
  const postPos = firstArr.response.indexOf(post) + 1;

  const nextPost = postPos === 60 ? 0 : postPos
  const nextPid = postPos === 60 ? Number(pid) + 1 : Number(pid)
  const prevPid = Number(pid) - 1 
  const nextPostId = postPos === 60 ? secondArr.response[nextPost] : firstArr.response[nextPost]
  
  const postId: string = post as string

  return (
  <SWRConfig value={{ fallback }}>
    <div className='bg-slate-800'>
      <div className='hidden'><Post post={nextPostId} /></div>
      <Post post={postId} />
      <div>
        <button className='bg-gray-800 w-12 h-12 text-white'
          onClick={() => router.push({
            pathname:'/[User]/[pid]/[post]',
            query: {
              User:User,
              pid:[prevPid],
              post:[nextPostId]
            }
          })}> prev </button>
        <button className='bg-gray-800 w-12 h-12 text-white'
          onClick={() => router.push({
            pathname:'/[User]/[pid]/[post]',
            query: {
              User:User,
              pid:[nextPid],
              post:[nextPostId]
            }
          })}> next </button>
      </div>
    </div>
  </SWRConfig>

)}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    type paramType = {
      post: string
    }
    const { post }:paramType = context.params as paramType
    const header = {
      headers:{
        'Authorization': `Client-ID ${process.env.IMGUR_KEY}`
      }
    }
    const apiURL = `/album/${post}/images`
    const fallbackUrl = '/api/' + apiURL
    const res = await axios.get(process.env.IMGUR_BASE_URL + apiURL, header)
    const data = res.data.data.map((item:any) => item.link)

    return {
      props: { 
        fallback: {
          [fallbackUrl]: data
        }
      }
    }
  } catch(error) {
    return { props: { "error": "not working" } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {paths:[], fallback: true}
}


export default UserPost
