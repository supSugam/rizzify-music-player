import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

interface ArtistCardProps {
  track:any;
  i:number;
  forSearch:boolean;
}
const ArtistCard:React.FC<ArtistCardProps> = ({track,i,forSearch}) => {
  if(!forSearch){
    return (
      <div key={i} style={{width:"100%",height:"h-auto"}} className='relative group max-w-[40%] md:max-w-[14rem] flex-wrap'>
              <Link to={`/artists/${track?.artists[0]?.adamid}`}>
                  <img src={track?.images?.background} alt={track?.title} className='shaped--border__radius group-hover:rounded-3xl' />
              </Link>
              <Link className='absolute bottom-[-3rem] left-0 w-full text-xl font-semibold text-center truncate artist--name' to={`/artists/${track?.artists[0].adamid}`}>
            {track?.subtitle}
            </Link>
          </div>
)
  }

  if(forSearch){
    return (
      <div key={i} style={{width:"100%",height:"h-auto"}} className='relative group max-w-[40%] md:max-w-[14rem] flex-wrap'>
              <Link to={`/artists/${track?.adamid}`}>
                  <img src={track?.avatar} className='shaped--border__radius group-hover:rounded-3xl' />
              </Link>
              <Link className='absolute bottom-[-3rem] left-0 w-full text-xl font-semibold text-center truncate artist--name' to={`/artists/${track?.adamid}`}>
            {track?.name}
            </Link>
          </div>
)
  }

}

export default ArtistCard;