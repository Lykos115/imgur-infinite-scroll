import Link from 'next/link'

const HomeIcon = () =>(
  <div className='justify-self-center'>
    <Link href='/'>
      <img src='/headpats.gif' className='w-16 h-16 rounded-xl justify-self-center' width={400} height={400}/>
    </Link>
  </div>    
)

export default HomeIcon
//md:fixed md:top-2 md:left-4
