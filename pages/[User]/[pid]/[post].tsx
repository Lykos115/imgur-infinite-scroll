import axios from 'axios'
import type { NextPage } from 'next'
import Image from '../../../components/Image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loading from '../../../components/load'
import PostNavigation from '../../../components/PostNavigation'
import Head from 'next/head'
import GoBack from '../../../components/GoBack'


type postType = {
  data:itemType[] 
}

type itemType = {
  width: number
  height: number
  link: string
}


const fetcher = (url:string) => axios.get(url).then(res => res.data)


const UserPost:NextPage<postType> = () => { 
  const router = useRouter()
  const { User, pid, post } = router.query


  const { data } = useSWR(`/api/album/${post}`, fetcher)
  
  const { data: currArr } = useSWR(`/api/${User}/albumIds?page=${pid}`, fetcher)
  const { data: nextArr } = useSWR(`/api/${User}/albumIds?page=${Number(pid) + 1}`, fetcher)
  const { data: prevArr } = useSWR(Number(pid) - 1 ? `/api/${User}/albumIds?page=${Number(pid) - 1}` : null, fetcher)
  if(!currArr || !nextArr || (!prevArr && prevArr === null) || !data) return <Loading /> 
  const postPos = currArr.response.indexOf(post)
  const prevPost = postPos - 1 >= 0 ? postPos - 1 : 59
  const nextPost = postPos + 1 > 59 ? 0 : postPos + 1


  return (
    <>
      <Head>
        <title>{User}</title>
      </Head>
      <PostNavigation currPosition={postPos} prevPosition={prevPost} prevArr={prevArr?.response} nextPostion={nextPost} currArr={currArr.response} nextArr={nextArr.response}/>
      <div className='bg-slate-800 pt-20'>
        <Post data={data.response} />
        <GoBack />
      </div>
    </>
)}


const Post = ({data}: postType) => {
  const imageList = data?.map((item:itemType, i: number) => { return (
      <div className='md:w-[42rem] w-auto h-auto p-4' key={'dhfouifasdf' + i}>
        <Image  width={item.width} height={item.height} url={item.link} />
      </div>
    )})
  return <div className='flex flex-col items-center justify-center p-4 h-auto'>{imageList}</div> 
  
 }

export default UserPost
