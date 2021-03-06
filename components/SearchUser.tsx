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
          pathname: '/[User]',
          query: {
            User: query
          }
        })
      }
  }

  const searchClick = () => {
    router.push({
      pathname: '/[User]',
      query: {
        User: query
      }
    })
  }

  return (
    <div className='flex flex-row w-full justify-center items-center content-center p-4'>
      <input className='p-2 rounded-2xl text-black md:w-1/3 w-2/3 m-4' onChange={userInput} onKeyPress={onEnter} placeholder='Search Imgur User' type='text' value={query}/>
      <button className='bg-gray-600 text-white rounded-xl p-2' onClick={searchClick}> Search </button>
    </div>
  )

}

export default SearchUser
