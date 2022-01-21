import LazyLoad from 'react-lazyload'

type imageType = {
  height: number
  url: string
  width: number
  icon?:boolean
}


const Image = ({height, url, width,icon}: imageType) => (
  <img src={url} loading='eager' className={`${icon ? 'w-24 h-24' : 'w-full h-full'} rounded-xl`} width={width} height={height}/>
)

export default Image



//<LazyLoad height={300} offset={200} once>
//</LazyLoad>
