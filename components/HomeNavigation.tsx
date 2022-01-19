import { useSession, signIn, signOut } from 'next-auth/react'

const HomeNavigation = () => {
  const { data: session } = useSession()

  const profileButton = session ? <button onClick={() => signOut()}> sign out </button> : <button onClick={() => signIn()}> sign in </button>
  console.log(session)
  return (
    <div className='fixed top-0 left-0 right-0 z-10 bg-stone-900 text-white'>
      <nav className='w-full h-20 z-20 flex justify-end items-end text-right space-x-96'>
        {profileButton}
      </nav>
    </div>
  )
}

export default HomeNavigation
