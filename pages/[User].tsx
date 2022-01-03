import axios from 'axios'
import { useRouter } from 'next/router'
import type {NextPage, GetServerSideProps } from 'next'
import Card from '../components/card'
import { ReactNode } from 'react'

//interface propType {
//    id: string
//    title: string
//    coverId: string
//    coverImage: string
//    coverWidth: number
//    coverHeight: number
// 
//}

const User:NextPage = (props:ReactNode) => {
  const albumCards = props.data.map(item => {
    return (
      <Card key={item.id} id={item.id} coverImage={item.imageLink} coverWidth={item.coverWidth} coverHeight={item.coverHeight} title={item.title}/>
    )
  })
  return (
    <div className='flex flex-wrap p-4 justify-center items-center bg-slate-800'>
      {albumCards}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { User } = context.query
    const header = {
      headers:{
        'Authorization': `Client-ID ${process.env.IMGUR_KEY}`
      }
    }
    const apiURL = process.env.IMGUR_BASE_URL + `/account/${User}/submissions`
    
    const res = await axios.get(apiURL, header)
    const data = res.data.data.map(item => {
      return {
        id: item.id,
        title: item.title,
        coverId: item.cover,
        coverWidth: item.cover_width,
        coverHeight: item.cover_height,
        imageLink: item.images[0].link
      }  
    })

    console.log(apiURL)
    return {
      props: { data }
    }
  } catch(error) {
    return { props: { "error": "not working" } }
  }
}

export default User
