import Link from 'next/link'

const HomeIcon = () =>(
  <div className='fixed top-2 left-4'>
    <Link href='/'>
      <img src='/headpats.gif' className='w-16 h-16 rounded-xl' width={400} height={400}/>
    </Link>
  </div>    
)

export default HomeIcon
