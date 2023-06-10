import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface ArtistCardProps {
  track:any;
  i:number;
  forSearch:boolean;
}
const ArtistCard:React.FC<ArtistCardProps> = ({track,i,forSearch}) => {
  const [contentLoaded,setContentLoaded] = useState<boolean>(false);

  if(!forSearch){
    return (
      <div key={i} style={{width:"100%",height:"h-auto"}} className='relative group max-w-[40%] md:max-w-[14rem] flex-wrap'>
              <Link to={`/artists/${track?.artists[0]?.adamid}`}>
                  <LazyLoadImage onLoad={()=>setContentLoaded(true)} effect='blur' src={track?.images?.background} alt={track?.title} className='shaped--border__radius group-hover:rounded-3xl' />
              </Link>
              <Link className='absolute bottom-[-3rem] left-0 w-full text-xl font-semibold text-center truncate artist--name' to={`/artists/${track?.artists[0].adamid}`}>
            {
              contentLoaded? <p>{track?.subtitle}</p>:<Skeleton width={"100%"} className='rounded-md' />
            }
            </Link>
          </div>
)
  }

  if(forSearch){
    return (
      <div key={i} style={{width:"100%",height:"h-auto"}} className='relative group max-w-[40%] md:max-w-[14rem] flex-wrap'>
              <Link to={`/artists/${track?.adamid}`}>
                  <LazyLoadImage onLoad={()=>setContentLoaded(true)} effect='blur' src={track?.avatar} className='shaped--border__radius group-hover:rounded-3xl' />
              </Link>
              <Link className='absolute bottom-[-3rem] left-0 w-full text-xl font-semibold text-center truncate artist--name' to={`/artists/${track?.adamid}`}>
            {
              contentLoaded? <p>{track?.name}</p>:<Skeleton width={"100%"} className='rounded-md' />
            }
            </Link>
          </div>
)
  }

}

export default ArtistCard;