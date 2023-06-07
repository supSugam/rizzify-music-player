import React from 'react'
import Tilt from "react-parallax-tilt"
import {Song} from '../redux/services/types'

// import {SongBar} from '../components'

import PlayPause from './PlayPause'
import { useDispatch } from 'react-redux';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
import { setSingleActiveSong,playPause } from '../redux/features/playerSlice';
import { Link } from 'react-router-dom';
interface SongBarProps {
  song:any;
  handlePauseClick?:()=>void;
  handlePlayClick?:()=>void;
  forArtistDetails:boolean;
  isPlaying:boolean;
  activeSong:any;
  i:number;
}

const SongBar:React.FC<SongBarProps> = ({song,handlePauseClick,handlePlayClick,isPlaying,activeSong,forArtistDetails,i}) => {
  console.log(song);
  if(!forArtistDetails){
    return(
      <Link to={`/songs/${song.key}`} className='w-full'>
      <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#6156f4" glarePosition="all" tiltMaxAngleX={3} tiltMaxAngleY={3}>
      <div className="flex w-full h-[5.6rem] items-center justify-between cursor-pointer gap-8 py-3 px-2 border-b-2 border-gray-200 border-opacity-5">
        <div className="flex items-center gap-6">
          <p className="text-[var(--primary-grey)] text-sm font-bold">{i+1}</p>
          <div className='w-16 h-auto'>
            <img src={song.images?.coverarthq || song.images?.coverart || song.images?.background} alt={song.title} className='rounded-md' />
          </div>
  
        </div>
        <div className='flex flex-col flex-1 max-w-[70%] gap-2'>
        <h3 className="text-base font-semibold text-left truncate">{song.title}</h3>
        <p className="text-sm text-[var(--primary-grey)] text-left truncate">{song.subtitle}</p>
        </div>
          <PlayPause key={i} handlePause={handlePauseClick} handlePlay={handlePlayClick} isPlaying={isPlaying} activeSong={activeSong} song={song} />
      </div>
      </Tilt>
      </Link>
    )
  }

  if(forArtistDetails){
    return(
      <Link to={`/songs/${song.id}`} className='w-full'>
      <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#6156f4" glarePosition="all" tiltMaxAngleX={3} tiltMaxAngleY={3}>
      <div className="flex w-full h-[5.6rem] items-center justify-between cursor-pointer gap-8 py-3 px-2 border-b-2 border-gray-200 border-opacity-5">
        <div className="flex items-center gap-6">
          <p className="text-[var(--primary-grey)] text-sm font-bold">{i+1}</p>
          <div className='w-16 h-auto'>
            <img src={song.attributes?.artwork?.url} alt={song.attributes.name} className='rounded-md' />
          </div>
  
        </div>
        <div className='flex flex-col flex-1 max-w-[70%] gap-2'>
        <h3 className="text-base font-semibold text-left truncate">{song.attributes.name}</h3>
        <p className="text-sm text-[var(--primary-grey)] text-left truncate">{song.attributes.artistName}</p>
        </div>
          <PlayPause key={i} handlePause={handlePauseClick} handlePlay={handlePlayClick} isPlaying={isPlaying} activeSong={activeSong} song={song} />
      </div>
      </Tilt>
      </Link>
    )
  }

}

interface RelatedSongsProps {
  relatedSongs:Song[],
  activeSong:any,
  isPlaying:boolean;
  forArtistDetails:boolean;
  handlePauseClick:()=>void,
  handlePlayClick:()=>void,
}
const RelatedSongs:React.FC<RelatedSongsProps> = ({relatedSongs,activeSong,isPlaying,handlePauseClick, handlePlayClick, forArtistDetails}) => {

  const dispatch = useDispatch();

  // Continue from here
  const handleTopPlayClick = (songKey:number,i:number):void => {
      const {data:songData,isFetching:isFetchingSongDetails} = useGetSongDetailsQuery({songKey})
      dispatch(setSingleActiveSong({songData,i}));
      dispatch(playPause(true));
    };
  
    const handleTopPauseClick = ():void => {
      dispatch(playPause(false));
    };
  return (
    <div className='w-full md:w-1/2 h-full flex flex-col'>
      <div className="flex h-28 bg-gradient-to-l px-8 from-transparent to-[#080625] rounded-l-xl">
          <h1 className='text-3xl font-bold text-left flex items-center '>
          Related Songs You Might Like
        </h1>
      </div>
      <div className="w-fullflex flex-col mt-4 gap-2">
        {
          !forArtistDetails && relatedSongs?.map((song:any,i:number)=>(
          <SongBar activeSong={activeSong} forArtistDetails={forArtistDetails} isPlaying={isPlaying} handlePlayClick={()=>handlePlayClick(song,relatedSongs,i)} handlePauseClick={handlePauseClick} key={song.key} song={song} i={i} />))
        }
                {
          forArtistDetails && relatedSongs?.map((song:any,i:number)=>(
          <SongBar activeSong={activeSong} forArtistDetails={forArtistDetails} isPlaying={isPlaying} handlePlayClick={()=>handleTopPlayClick(song,i)} handlePauseClick={handlePauseClick} key={song.key} song={song} i={i} />))
        }
      </div>
      </div>
  )
}

export default RelatedSongs