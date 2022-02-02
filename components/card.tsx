import Link from "next/link"
import { useRouter } from "next/router"
import Image from "./Image"
import { motion } from "framer-motion"
import LazyLoad from "react-lazyload"

interface cardProps{
  title: string;
  id: string;
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
  pageNumber?: number;
}

  
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const card = (props: cardProps) =>{
 const router = useRouter()
 const {User, pid} = router.query
  return(
    <motion.div className='m-4 w-60 h-auto hover:cursor-pointer'  variants={item}>
      <Link href={`/${User}/${!pid ? props.pageNumber : pid}/${props.id}`}>
        <div className='relative'>
          <Image width={props.coverWidth} height={props.coverHeight} url={props.coverImage} />
          <div className='rounded-b-xl w-full absolute inset-x-0 bottom-0 p-4 bg-slate-900 opacity-50 text-white'>{props.title}</div> 
        </div>
      </Link>
    </motion.div>
  )
}
export default card


//<LazyLoad height={300} offset={200} once>
//</LazyLoad>
