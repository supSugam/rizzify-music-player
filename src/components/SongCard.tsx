import React from 'react'
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';

// import {PlayPause} from './PlayPause';
import {playPause,setActiveSong} from "../redux/features/playerSlice"

interface SongCardProps{
  song:{
    key: string,
    title: string,
    subtitle: string,
    images: {
      coverart: string,
      coverarthq: string,
      background: string
    }
  },
  i:number
}
const SongCard:React.FC<SongCardProps> = ({song,i}) => {
  const activeSong = {
    key: 2,
  };
  return (
    // Aile npm package wala animation use garne
    <div key={i} className='flex flex-col min-w-[11rem] h-60 p-2 bg-white/10 bg-opacity-80 backdrop-blur-sm shadow-md border-solid border-b-2 border-[--primary-violet] animate-slideup cursor-pointer rounded-lg sm:w-52 sm:h-auto'>
      <div className="relative group w-full h-52">
        <div className={`absolute inset-0 justify-center items-center bg-opacity-50 group-hover:flex ${activeSong?.key === 1?'flex bg-opacity-70':'hidden'}`}>
          {/* <PlayPause song={song} /> */}
        </div>
        <img src={song.images?.coverarthq||song.images?.coverart || song.images?.background} alt={song.title} className='w-full h-full rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-sm rounded-bl-sm' />
      </div>
      <div className='pt-2'>
        <h3 className='text-lg font-semibold truncate'>{song.title}</h3>
        <p className='text-sm text-white/80 truncate'>{song.subtitle}</p>
      </div>
    </div>
  )
}

export default SongCard