import axios from 'axios'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Card from '../../../components/card'
import Loading from '../../../components/load'
import Navigation from '../../../components/Navigation'
import { motion } from 'framer-motion'
import Error from '../../_error'
import useSWRInfinite from 'swr/infinite'
import Head from 'next/head'

type Data = {
  [data:string]: itemType[]
}

type itemType = {
  id:string
  title:string
  coverId:string
  coverLink: string
  coverWidth: number
  coverHeight: number
}


const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2
    }
  }
}

const fetcher = (url:string) => axios.get(url).then(res => res.data.response)


const User:NextPage<Data> = ()=> {
  const router = useRouter()
  const { User, pid } = router.query
  const current = Number(pid) 
  //const next = Number(pid) + 1
  return (
      <>
        <Head>
          <title>{User}</title>
        </Head>
        <AlbumCards currentPage={current} username={User} />
      </>
    )
  
}

        //<div className='hidden'><AlbumCards currentPage={next} username={User} /></div>
const AlbumCards = (props:any) => {
  
  const getKey = (pageIndex: number, prevPage: any) =>{
    if(prevPage && !prevPage.length) return null
    return `/api/${props.username}/albumData?page=${props.currentPage - 1}`
  }

  const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher)
  if(!data) return <Loading />
  if(error || data[0].length === 0) return <Error />
  const isEnd = data && data[0]?.length < 59

  const albums = data[0]?.map((item:itemType) => {
    return(
      <Card key={item.id} id={item.id} coverImage={item.coverLink} coverWidth={item.coverWidth} coverHeight={item.coverWidth} title={item.title} />
    )
  })
  return(
    <>
      <Navigation isEnd={!isEnd}/> 
      <div className='flex justify-center items-center content-center w-full bg-slate-800'>
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-wrap xl:grid xl:grid-cols-5 xl:max-w-screen-2xl p-4 mt-20 justify-center items-center content-center bg-slate-800">
          {albums}
        </motion.div>
      </div>
    </>)


}

export default User
