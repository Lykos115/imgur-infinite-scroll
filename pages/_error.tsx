import Link from 'next/link'

export default function Error() {
  return (
    <div className='bg-slate-800 h-screen w-screen flex flex-col justify-center items-center text-center'>
      <Link href='/'>
        <img src='/headpats.gif' className='w-40 h-40 rounded-xl' width={400} height={400}/>
      </Link>
      <h1 className='text-9xl font-black text-white'>404</h1>
      <div className='text-6xl font-bold text-white'>Oh no it seems this content doesn't exist.</div>
      <div className='text-4xl font-bold text-white'>Pat to go back ^_^</div>
    </div>
  )
}
