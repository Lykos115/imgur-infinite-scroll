import Link from "next/link"

interface cardProps{
  title: string;
  id: string;
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
}

const card = (props: cardProps) => (

  <Link href={'/MetaPathos/' + props.id}>
    <div className='w-60 h-60 m-4 rounded-xl bg-black relative'>
      <img src={props.coverImage} className='w-full h-full rounded-xl'/>
      <div className='rounded-b-xl w-full absolute inset-x-0 bottom-0 p-4 bg-slate-900 opacity-50 text-white'>{props.title}</div> 
    </div>
  </Link>
)
export default card
