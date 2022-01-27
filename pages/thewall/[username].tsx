import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import LazyLoad from "react-lazyload"
import useSWR from "swr"

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const Page = (props:any) => {
  const router = useRouter()
  const { username } = router.query
  const {data: albums} = useSWR(`/api/${username}/albumIds?page=${props.index + 1}`, fetcher)

  if(!albums) return null

  const imagesForWall = albums.response.map((item:any) => <ImageWall url={`/api/album/${item}`} />)
  //if(!pageImages) return null

  //console.log(pageImages)

  return (
    <div className='flex flex-wrap flex-row bg-slate-800'>
      {imagesForWall}
    </div>
  )

}

const ImageWall = (props:any) => {
  const {data:images} = useSWR(props.url, fetcher);
  if(!images) return null
  const wall = images?.response.map((item:any) => {
    return(
      <LazyLoad classNamePrefix='h-fit '> 
        <img className='w-full' src={item.link} height={item.height} width={item.width}/>
      </LazyLoad>
    )
  })
  return <div className='basis-1/4'>{wall}</div> 
}

const UserWall = () => {
  const [cnt, setCnt] = useState(1);

  const page = []

  for(let i = 0; i < cnt; i++){
    page.push(<Page index={i} key={i+'wall'} setNextPage={setCnt} count={cnt}/>)
  }

  return (
    <div> 
      {page}
     {/*<button> Load More </button>*/}
    </div>
  )

}

export default UserWall
