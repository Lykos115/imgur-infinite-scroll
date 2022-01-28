import { useRouter } from 'next/router'
import { useState } from 'react'

const AlbumSearchUser = () => {
  const router = useRouter()
  const { User } = router.query

  const [query, setQuery] = useState(User)

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


  return <input className='md:mx-10 md:block border-b hidden bg-transparent text-center focus:outline-none focus:border-b' onChange={userInput} onKeyPress={onEnter} placeholder='Username' type='text' value={query}/>

}

export default AlbumSearchUser
