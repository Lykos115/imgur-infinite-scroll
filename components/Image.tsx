import LazyLoad from 'react-lazyload'

type imageType = {
  height: number
  url: string
  width: number
}


const Image = ({height, url, width}: imageType) => (
  <img src={url} className='w-full h-full rounded-xl' width={width} height={height}/>
)

export default Image



//<LazyLoad height={300} offset={200} once>
//</LazyLoad>
