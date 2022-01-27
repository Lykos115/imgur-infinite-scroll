import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import LazyLoad from "react-lazyload"
import useSWR from "swr"
import SmallLoading from "../../components/smallLoad"

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const Page = (props:any) => {
  const router = useRouter()
  const { username } = router.query
  const {data: albums} = useSWR(`/api/${username}/albumIds?page=${props.index + 1}`, fetcher)

  if(!albums) return <SmallLoading /> 

  const imagesForWall = albums.response.map((item:any) => <ImageWall url={`/api/album/${item}`} />)
  //if(!pageImages) return null

  //console.log(pageImages)

  return imagesForWall
  

}

const ImageWall = (props:any) => {
  const {data:images} = useSWR(props.url, fetcher);
  if(!images) return <SmallLoading /> 
  const wall = images?.response.map((item:any) => {
    return(
      <LazyLoad classNamePrefix='block w-1/12' offset={200} once>
        <img className='w-24 h-40' src={item.link} height={item.height} width={item.width}/>
      </LazyLoad>
    )
  })
  return wall 
}

const UserWall = () => {

  const [cnt, setCnt] = useState(1);

  const page = []

  for(let i = 0; i < cnt; i++){
    page.push(<Page index={i} key={i+'wall'} setNextPage={setCnt} count={cnt}/>)
  }

  return (
    <div className='bg-slate-800 flex flex-col items-center justify-center w-screen'> 
      <div className='flex flex-wrap'> 
        {page}
      </div>
     <button className='bg-zinc-800 text-white p-4 m-8 rounded-3xl' onClick={() => setCnt(cnt + 1)}> Load More </button>
    </div>
  )

}

export default UserWall
