import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {BiShuffle} from 'react-icons/bi';
import {AiFillPlayCircle, AiFillPauseCircle} from 'react-icons/ai';
import { FiRepeat } from 'react-icons/fi';

interface ControlsProps {
  isPlaying?: boolean;
  repeat?: boolean;
  setRepeat?: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle?: boolean;
  setShuffle?: React.Dispatch<React.SetStateAction<boolean>>;
  currentSongs?: any;
  playerExpanded?:boolean;
  isActive?: boolean;
  handlePlayPause?: () => void;
  handlePrevSong?: () => void;
  handleNextSong?: () => void;
}

const Controls:React.FC<ControlsProps> = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong,playerExpanded }) => {
  if(!playerExpanded){
    return(
  <div className="flex items-center justify-around md:w-58 lg:w-60 2xl:w-80 sm:gap-5">
        <BiShuffle size={24} color={shuffle ? 'var(--primary-violet)' : 'var(--primary-grey)'} onClick={() =>setShuffle && setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer control--icons" />

    {currentSongs?.length && <MdSkipPrevious size={30} color="var(--primary-grey)" className="hidden sm:block cursor-pointer control--icons" onClick={handlePrevSong} />}
    {isPlaying ? (
      <AiFillPauseCircle size={50} color="#FFF" onClick={handlePlayPause} className="z-10 text-white/80 cursor-pointer hover:scale-110 active:scale-125 animate-hoverscale transition-transform animate-pulse delay-200" />
    ) : (
      <AiFillPlayCircle size={50} color="#FFF" onClick={handlePlayPause} className="z-10 text-white/80 cursor-pointer hover:scale-110 active:scale-125 animate-hoverscale transition-transform" />
    )}
    {currentSongs?.length && <MdSkipNext size={30} color="var(--primary-grey)" className="hidden sm:block cursor-pointer control--icons" onClick={handleNextSong} />}
    <div className={`loop--icon__wrapper relative ${repeat?'isOnLoop':''}`}>
    <FiRepeat size={20} color={repeat ? 'var(--primary-violet)' : 'var(--primary-grey)'} onClick={() => setRepeat && setRepeat((prev) => !prev)} className=" hidden sm:block cursor-pointer control--icons" />
    {/* Pachhi entire playlist loop garne feature halne */}
    </div>
  </div>
)
}

if(playerExpanded){
  return(
    <div className='flex items-center justify-around w-full h-max'>
      <BiShuffle size={30} color={shuffle ? 'var(--primary-violet)' : '#FFF'} onClick={() => setShuffle && setShuffle((prev) => !prev)} className=" cursor-pointer control--icons" />
      {currentSongs?.length && <MdSkipPrevious size={45} color={"#FFF"} className="cursor-pointer control--icons" onClick={handlePrevSong} />}
      {isPlaying ? (
        <AiFillPauseCircle size={65} color="#FFF" onClick={handlePlayPause} className="z-10 text-white/80 cursor-pointer hover:scale-110 active:scale-125 animate-hoverscale transition-transform animate-pulse delay-200" />
      ) : (
        <AiFillPlayCircle size={65} color="#FFF" onClick={handlePlayPause} className="z-10 text-white/80 cursor-pointer hover:scale-110 active:scale-125 animate-hoverscale transition-transform" />
      )}
          {currentSongs?.length && <MdSkipNext size={45} color={"#FFF"} className="cursor-pointer control--icons" onClick={handleNextSong} />}
      <div className={`loop--icon__wrapper relative ${repeat?'isOnLoop':''}`}>
        <FiRepeat size={26} color={repeat ? 'var(--primary-violet)' : '#FFF'} onClick={() => setRepeat && setRepeat((prev) => !prev)} className=" cursor-pointer control--icons" />
    {/* Pachhi entire playlist loop garne feature halne */}
      </div>
    </div>
  )
}
return <></>
};

export default Controls;
