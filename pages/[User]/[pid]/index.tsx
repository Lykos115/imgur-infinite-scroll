import axios from 'axios'
import { useRouter } from 'next/router'
import type {GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Card from '../../../components/card'
import Loading from '../../../components/load'
import Link from 'next/link'

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

const AlbumCards = ({data}: Data) => {
    const albums = data.map((item:itemType) => {
    return (
      <Card key={item.id} id={item.id} coverImage={item.coverLink} coverWidth={item.coverWidth} coverHeight={item.coverHeight} title={item.title}/>
    )
  })
  return (<div className='flex flex-wrap p-4 justify-center items-center bg-slate-800'>{albums}</div>)
}

const User: NextPage<Data> = ({ data })=> {
  const router = useRouter()
  const { User, pid } = router.query
  const pageNext = (Number(pid) + 1).toString()
  const pagePrev = (Number(pid) - 1).toString()
  if(router.isFallback) return <Loading /> 
  return (
  <>
      <AlbumCards data={data}/>
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

          <Link href={{
            pathname:'/[User]/[pid]',
            query:{
              pid:pageNext,
              User:User
            }
          }}>next</Link>
        </div>
      </div>
    </>
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
  return {paths, fallback: true}
}


export default User
