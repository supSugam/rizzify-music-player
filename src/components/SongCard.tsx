import React,{useRef,useState,useLayoutEffect} from 'react'
import Tilt from "react-parallax-tilt"
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import PlayPause from './PlayPause';
import {playPause,setActiveSong} from "../redux/features/playerSlice"

import {Song} from '../redux/services/types'

interface SongCardProps{
  song:Song,
  i:number,
  isPlaying:boolean,
  activeSong: Song,
  data:Song[]
}

const SongCard:React.FC<SongCardProps> = ({song,data,isPlaying,activeSong,i}) => {

  const dispatch = useDispatch();

  const textRef = useRef<HTMLHeadingElement>(null);

  const [textWidth,setTextWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if(textRef.current){
      setTextWidth(textRef.current.getBoundingClientRect().width-8); // 8px Padding
    }
  },[textWidth]);

  const handlePlayClick = ():void => {
    dispatch(setActiveSong({song,data,i}));
    dispatch(playPause(true));
  };

  const handlePauseClick = ():void => {
    dispatch(playPause(false));
  };

  return (
    // Aile npm package wala animation use garne
    <Tilt glareEnable={true} glareMaxOpacity={0.3} glareColor="#845ef7" glarePosition="bottom" tiltMaxAngleX={10} tiltMaxAngleY={10}>
    <div key={i} className='flex flex-col w-[14rem] h-auto p-3 bg-white/5 bg-opacity-80 backdrop-blur-sm shadow-md border-solid border-b-2 border-[--primary-violet] animate-slideup cursor-pointer rounded-lg sm:w-60 sm:h-auto sm:p-4 group song--card'>
      <div className="relative group w-full h-52 flex md:block">
        <div className={`flex md:hidden absolute inset-0 justify-center items-center bg-opacity-50 group-hover:flex ${activeSong?.key === song.key?'flex bg-opacity-90':'md:hidden'}`}>
          <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick} />
        </div>
        <div className={`w-full h-full rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-sm rounded-bl-sm song--img__wrapper ${activeSong?.key === song.key? 'isPlaying':''}`}>
          <img src={song.images?.coverarthq || song.images?.coverart || song.images?.background} alt={song.title} className='radius' />
        </div>

      </div>
      <div className='flex flex-col mt-3 overflow-hidden pr-2'>
        <h3 ref={textRef} className={`text-lg font-semibold w-max ${textWidth>192?'animate-textreveal':'overflow-hidden whitespace-nowrap'}`}>
        <Link to={`songs/${song?.key}`}>
          
          {song.title}
          </Link>
          </h3>
        <p className='text-sm text-white/80 truncate'>
          <Link to={song.artists? `artists/${song.artists[0].adamid}`:'/top-artists'}>
          {song.subtitle}
          </Link>
          </p>
      </div>
    </div>
    </Tilt>
  )
}

export default SongCard