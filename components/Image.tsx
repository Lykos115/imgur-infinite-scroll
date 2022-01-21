import {useState} from 'react'
import {motion} from 'framer-motion'

type imageType = {
  height: number
  url: string
  width: number
}


const Image = ({height, url, width}: imageType) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [pulsing, setPulsing] = useState(true)

  const imageLoad = () => {
    setImageLoading(false)
    setTimeout(() => setPulsing(false),800)
  }

  return (
    <div className={`${pulsing ? 'animate-pulse' : ''} h-auto w-60 bg-gray-600 rounded-xl`}>
      <motion.img 
        initial={{height: "24rem", opacity: 0}}
        animate={{
          height: imageLoading ? "20rem" : "auto",
          opacity: imageLoading ? 0 : 1
          }}
          transition={
            { height: { delay: 0, duration: 0.4 },
             opacity: { delay: 0.5, duration: 0.4 } }
          }
          onLoad={imageLoad}
          width={width}
          height={height}
          src={url}
          className='rounded-xl'/>
    
    </div>
  )
}

export default Image

//<img src={url} className='w-full h-full rounded-xl' width={width} height={height}/>

//<LazyLoad height={300} offset={200} once>
//</LazyLoad>
