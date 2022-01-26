import { useRouter } from 'next/router'
import { useState } from 'react'

const SearchUser = () => {
  const router = useRouter()

  const [query, setQuery] = useState('')

  const userInput = (event: any) => {
    const userQuery = event.target.value

    setQuery(userQuery)
  }

  const onEnter = (event: any) => {
      if(event.key === 'Enter'){
        router.push({
          pathname: '/[User]/[pid]',
          query: {
            User: query,
            pid: '1'
          }
        })
      }
  }

  const searchClick = () => {
    router.push({
      pathname: '/[User]/[pid]',
      query: {
        User: query,
        pid: '1'
      }
    })
  }


  const infiniteClick = () => {
    router.push({
      pathname: '/[User]',
      query: {
        User: query
      }
    })
  }

  return (
    <div className='flex flex-col w-full justify-center items-center content-center p-4'>
      <input className='p-2 rounded-2xl text-black md:w-1/3 w-2/3 m-4' onChange={userInput} onKeyPress={onEnter} placeholder='your mother' type='text' value={query}/>
      <div className='flex-row'>
        <button className='bg-cyan-50 text-black rounded-xl p-2 m-4' onClick={searchClick}> Search </button>
        <button className='bg-cyan-50 text-black rounded-xl p-2 m-4' onClick={infiniteClick}> Infinite </button>
      </div>
    </div>
  )

}

export default SearchUser
