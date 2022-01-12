import axios from 'axios'
import { useRouter } from 'next/router'
import type {GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Card from '../../../components/card'
import useSWR, { SWRConfig } from 'swr'
import Loading from '../../../components/load'

type Data = {
  [key:string]: itemType
}

type itemType = {
  id:string
  title:string
  coverId:string
  coverLink: string
  coverWidth: number
  coverHeight: number
}

type albumType = {
  [key:string]: {
    User: string
    pid: string
  }
}

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const AlbumCards = ({data}: albumType) => {
    const albums = data.response.map((item:itemType) => {
    return (
      <Card key={item.id} id={item.id} coverImage={item.coverLink} coverWidth={item.coverWidth} coverHeight={item.coverHeight} title={item.title}/>
    )
  })
  return (<div className='flex flex-wrap p-4 justify-center items-center bg-slate-800'>{albums}</div>)
}

const User: NextPage<Data> = ({ fallback })=> {
  const router = useRouter()
  const { User, pid } = router.query
  const pageNext = (Number(pid) + 1).toString()
  const pagePrev = (Number(pid) - 1).toString()
  const {data} = useSWR(`/api/${User}/albumData?page=${pid}`, fetcher)
  if(router.isFallback || !data) return <Loading /> 
  return (
    <SWRConfig value={{fallback}}>
      <AlbumCards data={data}/>
      <div className='hidden'><AlbumCards data={data} /></div>
      <div className='flex justify-center items-center bg-slate-800'>
        <div className='flex-row space-x-4 p-4'>
          <button
            onClick={() => {
                router.push({
                  pathname: '/[User]/[pid]',
                  query: {
                    pid:pagePrev,
                    User: User
                  },
                })
              }}>Prev</button>

          <button
            onClick={() =>{
                router.push({
                  pathname: '/[User]/[pid]',
                  query: {
                    pid:pageNext,
                    User: User
                  },
                })
              }}>Next</button>
        </div>
      </div>
    </SWRConfig>
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
    const fallBack = '/api' + url

    const apiURL = process.env.IMGUR_BASE_URL + url

    const res = await axios.get(apiURL, header)
    const data = res.data.data.map((item:any) => {
      return {
        id: item.id,
        title: item.title,
        coverId: item.cover,
        coverLink: item.images[0].link,
        coverHeight: item.images[0].height,
        coverWidth: item.images[0].width
      }  
    })

    return {
      props: {
        fallback: {
          [fallBack]: data
        }
      }
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
