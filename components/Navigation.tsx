import { useRouter } from 'next/router'
import Image from 'next/image'
import PrevButton from './Navigation/prevButton'


const Navigation = () => {
  const router = useRouter()
  const { User } = router.query

//  const { data: firstArr } = useSWR(`/api/${User}/albumIds?page=${pid}`, fetcher)
//  const { data: secondArr } = useSWR(`/api/${User}/albumIds?page=${Number(pid) + 1}`, fetcher)


  return (
  <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
    
    <nav className='w-full h-20 z-20 flex justify-center items-center text-center space-x-96'>
      {/*<Image width={80} height={80} src='/headpats.gif' className='absolute top-0 left-0 right-0'/>*/}
      <PrevButton direction={false}/>
      <div>{User}</div>
      <PrevButton direction={true} />
    </nav>
  </div>
)
}
export default Navigation

