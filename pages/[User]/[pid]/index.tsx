import axios from 'axios'
import { useRouter } from 'next/router'
import type {NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Card from '../../../components/card'

//interface propType {
//    id: string
//    title: string
//    coverId: string
//    coverImage: string
//    coverWidth: number
//    coverHeight: number
// 
//}
//
type Data = {
  id: string
  title: string
  coverId: string
  imageLink: string
}




const User:NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { User, pid } = router.query
  const pageNext = (Number(pid) + 1).toString()
  const pagePrev = (Number(pid) - 1).toString()
  const albumCards = data.map((item:any) => {
    return (
      <Card key={item.id} id={item.id} coverImage={item.imageLink} coverWidth={item.coverWidth} coverHeight={item.coverHeight} title={item.title}/>
    )
  })
  return (
    <div className='flex flex-wrap p-4 justify-center items-center bg-slate-800'>
      {albumCards}
      <div className='flex-row space-x-4 p-4'>
        <button
          onClick={() => {
              router.push({
                pathname: '/[User]/[pid]',
                query: {
                  pid:pagePrev,
                  User: User
                },
              })
            }}>Prev</button>

        <button
          onClick={() =>{
              router.push({
                pathname: '/[User]/[pid]',
                query: {
                  pid:pageNext,
                  User: User
                },
              })
            }}>Next</button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { User, pid } = context.query
    const header = {
      headers:{
        'Authorization': `Client-ID ${process.env.IMGUR_KEY}`
      }
    }
    const pageNumber = Number(pid) - 1
    const apiURL = process.env.IMGUR_BASE_URL + `/account/${User}/submissions/${pageNumber}`
    const res = await axios.get(apiURL, header)
    const data = res.data.data.map((item:any) => {
      return {
        id: item.id,
        title: item.title,
        coverId: item.cover,
        imageLink: item.images[0].link
      }  
    })

    return {
      props: { data }
    }
  } catch(error) {
    return { props: { "error": "not working" } }
  }
}

export default User
