import React,{useLayoutEffect,useRef,useState} from 'react';
import {Song} from '../../redux/services/types';

interface TrackProps {
  isPlaying: boolean;
  isActive: boolean;
  activeSong: Song;
}
const Track:React.FC<TrackProps> = ({ isPlaying, isActive, activeSong }) =>{

  const textRef = useRef<HTMLHeadingElement>(null);

  const [textWidth,setTextWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if(textRef.current){
      setTextWidth(textRef.current.getBoundingClientRect().width-8); // 8px Padding
    }
  },[activeSong]);

return(
  <div className="flex-1 flex items-center justify-start sm:min-w-[26.5rem]">
    <div className={`${isPlaying && isActive ?'songPlaying' : ''} sm:block w-10 h-10 mr-3 sm:h-16 sm:w-16 sm:mr-4 relative song-img__player`}>
      <img src={activeSong?.images?.coverart} alt="cover art" className="rounded-md" />
      <div className="music--waves absolute w-full h-full top-0 left-0 flex items-center justify-center gap-1 sm:gap-2 z-10 opacity-0">
        <div style={{animationDelay:"0s"}} className='bg-white w-1 h-3 animate-musicwavesPh sm:h-7 rounded-md sm:animate-musicwavesLg'></div>
        <div style={{animationDelay:"0.3s"}} className='bg-white w-1 h-3 animate-musicwavesPh sm:h-7 rounded-md sm:animate-musicwavesLg'></div>
        <div style={{animationDelay:"0.6s"}} className='bg-white w-1 h-3 animate-musicwavesPh sm:h-7 rounded-md sm:animate-musicwavesLg'></div>
      </div>
    </div>
    <div className="w-[60%] sm:w-[50%] overflow-hidden gap-2 flex flex-col">
      <p ref={textRef} className={`truncate text-white font-bold text-base w-max overflow-hidden ${textWidth>190?'animate-textreveal':'whitespace-nowrap'}`}>
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
      </p>
    </div>
  </div>
);
}

export default Track;
