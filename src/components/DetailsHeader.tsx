import React from 'react'
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {AiFillPauseCircle, AiFillPlayCircle} from 'react-icons/ai';
import {playPause,setSingleActiveSong} from "../redux/features/playerSlice"

interface DetailsHeaderProps {
  artistId:string;
  songData:any;
  artistData:any;
  isPlaying:boolean;
  activeSong:any;
}

const DetailsHeader:React.FC<DetailsHeaderProps> = ({artistId,songData,artistData,isPlaying,activeSong}) => {
  const dispatch = useDispatch();
  const song = songData;
  const handlePlayClick = ():void => {
    dispatch(setSingleActiveSong({song}));
    dispatch(playPause(true));
  };

  const handlePauseClick = ():void => {
    dispatch(playPause(false));
  };
  const artist = artistData?.data[0].attributes;
  return (
    <div className='w-full flex flex-col details--header__wrapper'>
      <div className='relative flex items-center justify-between w-full h-40 bg-gradient-to-l from-transparent to-[#080625] rounded-l-xl'>
        <div className='absolute inset-0 flex items-center px-6 gap-5'>
          <img alt='Artist Profile' src={artistId? artist.artwork?.url.replace('{w}','500').replace('{h}','500'): songData?.images.coverart} className={`h-[80%] w-auto shaped--border__radius-2 border-2 border-[#fff] border-opacity-80 shadow-2xl shadow-[var(--primary-violet)] ${isPlaying && activeSong?.key === songData.key && 'animate-borderRadius'}`}/>
          <div className='flex flex-col gap-2 max-w-[60%] truncate'>
            <h2 className='text-lg md:text-2xl font-bold text-white'>{artistId? artist.name:songData?.title}</h2>
            {
              !artistId && (
                <Link to={`/artists/${songData?.artists[0].adamid}`}>
                  <p className='text-base md:text-xl font-semibold text-[var(--primary-grey)]'>{songData?.subtitle}</p>
                </Link>
              )
            }
            {
              artistId && (<p className='text-base md:text-xl font-semibold text-[var(--primary-grey)]'>{artist?.genreNames[0]}</p>)
            }
          </div>
          <div className='text-base flex-grow flex justify-end'>
          {
               !artistId ? ((isPlaying && activeSong?.key === songData.key) ? (
                <AiFillPauseCircle size={70} onClick={handlePauseClick} className='z-10 text-white/80 cursor-pointer hover:scale-110 active:scale-125 animate-hoverscale transition-transform animate-pulse delay-200' />
              ) : (
                <AiFillPlayCircle size={70} onClick={handlePlayClick} className='z-10 text-white/80 cursor-pointer hover:scale-110 active:scale-125 animate-hoverscale transition-transform' />
              )):''
          }
          </div>

        </div>
      </div>
    </div>
  )
}

export default DetailsHeader