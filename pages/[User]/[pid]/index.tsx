import axios from 'axios'
import { useRouter } from 'next/router'
import type {NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Card from '../../../components/card'
import useSWR, { SWRConfig } from 'swr'

//interface propType {
//    id: string
//    title: string
//    coverId: string
//    coverImage: string
//    coverWidth: number
//    coverHeight: number
// 
//}
//
type Data = {
  id: string
  title: string
  coverId: string
  imageLink: string
  coverWidth: number
  coverHeight: number
}

type albumType = {
  User: string
  pid: string
}

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const AlbumCards = ({User, pid}: albumType) => {
  const {data} = useSWR(`/api/${User}/albumData?page=${pid}`, fetcher)
  if(!data) return <div>loading ... </div>
  console.log(data.response[2])
  const albums = data.response.map((item:any) => {
    return (
      <Card key={item.id} id={item.id} coverImage={item.coverLink} coverWidth={item.coverWidth} coverHeight={item.coverHeight} title={item.title}/>
    )
  })
  return (<div className='flex flex-wrap p-4 justify-center items-center bg-slate-800'>{albums}</div>)
}

const User:NextPage = ({ fallback }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { User, pid } = router.query
  const pageNext = (Number(pid) + 1).toString()
  const pagePrev = (Number(pid) - 1).toString()
  const username: string = User as string
  const pageId: string = pid as string
  return (
    <SWRConfig value={{fallback}}>
      <AlbumCards User={username} pid={pageId}/>
      <div className='hidden'><AlbumCards User={username} pid={pageId} /></div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { User, pid } = context.query
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
        imageLink: item.images[0].link,
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

export default User
