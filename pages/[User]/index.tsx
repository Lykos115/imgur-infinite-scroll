import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"
import Loading from "../../components/smallLoad"
import Card from '../../components/card'
import axios from 'axios'
import InfiniteNavigation from "../../components/InfiniteNavigation"
import Error from "../_error"

const fetcher = (url:string) => axios.get(url).then(res => res.data)

type PageNum = {
  pid:number
}

const Page = ({pid}: PageNum) => {
  const router = useRouter()
  const { User } = router.query
  const apiURL = `/api/${User}/albumData?page=${Number(pid)}` 
  const { data } = useSWR(apiURL, fetcher)
  
  if(!data) return <Loading />

  const albums = data?.response?.map((item:any) => {
    return (
      <Card key={item.id} id={item.id} coverImage={item.coverLink} coverWidth={item.coverWidth} coverHeight={item.coverHeight} title={item.title} />
    )
  })
  return ( 
    <div className='flex justify-center items-center content-center w-full bg-slate-800'> 
      <div className='flex flex-wrap xl:grid xl:grid-cols-5 xl:max-w-screen-2xl p-4 justify-center items-center content-center bg-slate-800'> {albums} </div>
    </div>
  )
}

const UserInfinite = () => {

  const router = useRouter()
  const { User } = router.query
  const apiURL = `/api/${User}/albumData?page=0` 
  const { data, error } = useSWR(apiURL, fetcher)
  if(error) return <Error /> 
  
  const [cnt, setCnt] = useState(1)

  const page = []

  for(let i = 0; i < cnt; i++){
    page.push(<Page pid={i} key={i+'infinite'} />)
  }

  console.log(page)


  return (
    <>
      <InfiniteNavigation />
      <div className='flex flex-col mt-20 bg-slate-800 justify-center items-center text-center'>
        {page}
        <button className='text-white mt-4 mb-12 bg-stone-900 w-32 rounded-3xl p-4' onClick={() => setCnt(cnt + 1)}> Load More </button>
      </div>
    </>
  )

}



export default UserInfinite
