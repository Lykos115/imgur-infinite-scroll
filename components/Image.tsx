import LazyLoad from 'react-lazyload'

type imageType = {
  height: number
  url: string
  width: number
}


const Image = ({height, url, width}: imageType) => (
  <div>
    <LazyLoad height={400}>
      <img src={url} className='w-full h-full rounded-xl' />
    </LazyLoad>
  </div>
)

export default Image