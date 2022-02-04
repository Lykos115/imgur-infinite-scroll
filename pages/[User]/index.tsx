import { useRouter } from 'next/router'
import useSWRInfinite from 'swr/infinite'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../../components/smallLoad'
import Card from '../../components/card'
import InfiniteNavigation from '../../components/InfiniteNavigation'
import Error from '../_error'
import PageLoader from '../../components/load'
import Head from 'next/head'

const fetcher = (url:string) => axios.get(url).then((res:any) => res.data.response)

const Infinite = () => {
  const router = useRouter()
  const {User} = router.query
  
  const getKey = ( index: number , pagePrev: any) =>{
    if(pagePrev && !pagePrev.length) return null
    return `/api/${User}/albumData?page=${index}`
  }

   
  const {data: paginatedData, size, setSize, error} = useSWRInfinite(getKey, fetcher)

  if(error) return <Error />


  if(!paginatedData) return <PageLoader />

  const albumsFlat = paginatedData?.flat()

  if(albumsFlat.length === 0) return <Error />

  const isEnd = paginatedData && paginatedData[paginatedData.length - 1]?.length < 59 

  const albums = albumsFlat.map((item:any) => {
    return (
      <Card key={item.id} pageNumber={size} id={item.id} coverImage={item.coverLink} coverWidth={item.coverWidth} coverHeight={item.coverHeight} title={item.title} />
    )
  })

  return (
    <>
      <Head>
        <title>{User}</title>
      </Head>
      <InfiniteNavigation />
      <InfiniteScroll
        next={() => setSize(size + 1)}
        hasMore={!isEnd}
        loader={<Loader />}
        dataLength={albumsFlat?.length}
      >
        <div className='flex justify-center items-center text-center content-center bg-slate-800'>
          <div className='flex flex-wrap xl:grid xl:grid-cols-5 xl:max-w-screen-2xl p-4 justify-center items-center content-center bg-slate-800 mt-20'>{albums}</div>
        </div>
      </InfiniteScroll>
    </>
  )
}


export default Infinite
