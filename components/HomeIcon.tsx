import Link from 'next/link'

const HomeIcon = () =>(
  <div className='justify-self-center md:justify-self-start md:order-none order-2'>
    <Link href='/'>
      <img src='/headpats.gif' className='w-16 h-16 rounded-xl justify-self-center md:justify-self-start' width={400} height={400}/>
    </Link>
  </div>    
)

export default HomeIcon
//md:fixed md:top-2 md:left-4
