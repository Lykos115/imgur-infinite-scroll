import axios from 'axios'
import { useRouter } from 'next/router'
import type {GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Card from '../../../components/card'
import Loading from '../../../components/load'
import Navigation from '../../../components/Navigation'
import { motion } from 'framer-motion'

type Data = {
  data: itemType[]
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

const User: NextPage<Data> = ({ data })=> {
  const router = useRouter()
  if(router.isFallback) return <Loading /> 
  return (
    <>
      <Navigation />
      <AlbumCards data={data}/>
    </>
  )
}

const AlbumCards = ({data}: Data) => {
    const albums = data.map((item:itemType) => {
    if(item === null) return null
    return (
      <Card key={item.id} id={item.id} coverImage={item.coverLink} coverWidth={item.coverWidth} coverHeight={item.coverHeight} title={item.title} />
    )
  })
  return (
    <div className='flex justify-center items-center content-center w-full bg-slate-800'>
      <motion.div variants={container} initial="hidden" animate="visible" className='grid grid-cols-5 max-w-screen-2xl p-4 mt-20 justify-center items-center content-center bg-slate-800'>{albums}</motion.div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {


  try {
    type paramType = {
      User:string
      pid:string
    }
    const { User, pid }:paramType = context.params as paramType
    const header = {
      headers:{
        'Authorization': `Client-ID ${process.env.IMGUR_KEY}`
      }
    }
    const pageNumber = Number(pid) - 1
    const url = `/account/${User}/submissions/${pageNumber}`

    const apiURL = process.env.IMGUR_BASE_URL + url

    const res = await axios.get(apiURL, header)
    if(!res.data.data.length){
      return {
        notFound:true
      }
    }

    const data = res.data.data.map((item:any) => {
      if(item.layout){
        return {
          id: item.id,
          title: item.title,
          coverId: item.cover,
          coverLink: item.images[0].link,
          coverHeight: item.images[0].height,
          coverWidth: item.images[0].width
        }
      }
      return null 
    })
    

    return {
      props: {
        data
      },
      revalidate: 60
    }
  } catch(error) {
    return { props: { "error": "not working" } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{params: {User:'MetaPathos',pid:'1'}}]
  return {paths:[], fallback: true}
}


export default User
