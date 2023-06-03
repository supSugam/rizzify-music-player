import React from 'react';
import {Song} from '../../redux/services/types';

interface TrackProps {
  isPlaying: boolean;
  isActive: boolean;
  activeSong: Song;
}
const Track:React.FC<TrackProps> = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'songPlaying' : ''} hidden sm:block h-16 w-16 mr-4 relative song-img__player`}>
      <img src={activeSong?.images?.coverart} alt="cover art" className="rounded-md" />
      <div className="music--waves absolute w-full h-full top-0 left-0 flex items-center justify-center gap-2 z-10 opacity-0">
        <div style={{animationDelay:"0s"}} className='bg-white w-1 h-7 rounded-md animate-musicwaves'></div>
        <div style={{animationDelay:"0.3s"}} className='bg-white w-1 h-7 rounded-md animate-musicwaves'></div>
        <div style={{animationDelay:"0.6s"}} className='bg-white w-1 h-7 rounded-md animate-musicwaves'></div>
      </div>
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
