import axios from 'axios'
import type {GetStaticProps, NextPage, GetStaticPaths} from 'next'
import Image from '../../../components/Image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loading from '../../../components/load'
import Link from 'next/link'


type postType = {
  data:itemType[] 
}

type itemType = {
  width: number
  height: number
  link: string
}


const fetcher = (url:string) => axios.get(url).then(res => res.data)


const UserPost:NextPage<postType> = ({ data }) => { 
  const router = useRouter()
  const { User, pid, post } = router.query



  const { data: currArr } = useSWR(`/api/${User}/albumIds?page=${pid}`, fetcher)
  const { data: nextArr } = useSWR(`/api/${User}/albumIds?page=${Number(pid) + 1}`, fetcher)
  const { data: prevArr } = useSWR(`/api/${User}/albumIds?page=${Number(pid) - 1}`, fetcher)
  if(!currArr && !nextArr && !prevArr && router.isFallback) return <Loading /> 
  const postPos = currArr.response.indexOf(post) 
  const prevPost = postPos - 1 > 0 ? postPos - 1 : 59
  const nextPost = postPos + 1 > 59 ? 0 : postPos + 1


  return (
    <div className='bg-slate-800 pt-12'>
      <Post data={data} />
    </div>
)}


const Post = ({data}: postType) => {
  const imageList = data.map((item:itemType, i: number) => { return (
      <div className='w-[42rem] h-auto p-4' key={'dhfouifasdf' + i}>
        <Image  width={item.width} height={item.height} url={item.link} />
      </div>
    )})
  return <div className='flex flex-col items-center justify-center p-4 h-auto'>{imageList}</div> 
  
 }

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
    const res = await axios.get(process.env.IMGUR_BASE_URL + apiURL, header)
    const data = res.data.data.map((item:any) => {
      return {
        link: item.link,
        width: item.width,
        height: item.height
      }
    })

    return {
      props: { 
        data
      },
      revalidate:60
    }
  } catch(error) {
    return { props: { "error": "not working" } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {paths:[], fallback: true}
}


export default UserPost
