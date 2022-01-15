import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"


interface cardProps{
  title: string;
  id: string;
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
}

const card = (props: cardProps) =>{
 const router = useRouter()
 const {User, pid} = router.query
  return(
    <div className='m-4 w-60 h-auto'>
      <Link href={`/${User}/${pid}/${props.id}`}>
        <div className='relative'>
          <Image width={props.coverWidth} height={props.coverHeight} src={props.coverImage} className='w-full h-full rounded-xl'/>
          <div className='rounded-b-xl w-full absolute inset-x-0 bottom-1.5 p-4 bg-slate-900 opacity-50 text-white'>{props.title}</div> 
        </div>
      </Link>
    </div>
  )
}
export default card
