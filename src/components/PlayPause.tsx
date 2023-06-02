import React from 'react'

import {AiFillPlayCircle,AiFillPauseCircle} from 'react-icons/ai';
import {Song} from '../redux/services/types'

interface PlayPauseProps{
  isPlaying:boolean,
  activeSong: Song,
  song:Song,
  handlePlay:()=>void,
  handlePause:()=>void

}

const PlayPause:React.FC<PlayPauseProps> = ({isPlaying,activeSong, song, handlePlay, handlePause}) => {
  return (
   (isPlaying && activeSong?.key === song.key) ? (
      <AiFillPauseCircle size={50} onClick={handlePause} className='z-10 text-white/80 cursor-pointer hover:scale-110 active:scale-125 animate-hoverscale transition-transform animate-pulse delay-200' />
    ) : (
      <AiFillPlayCircle size={50} onClick={handlePlay} className='z-10 text-white/80 cursor-pointer hover:scale-110 active:scale-125 animate-hoverscale transition-transform' />
    )
  )
}

export default PlayPause
