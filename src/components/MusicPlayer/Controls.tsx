import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {BiShuffle} from 'react-icons/bi';
import {AiFillPlayCircle, AiFillPauseCircle} from 'react-icons/ai';
import { FiRepeat } from 'react-icons/fi';

interface ControlsProps {
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  currentSongs: any;
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
}

const Controls:React.FC<ControlsProps> = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }) => (
  <div className="flex items-center justify-around md:w-58 lg:w-60 2xl:w-80 gap-5">
        <BiShuffle size={24} color={shuffle ? 'var(--primary-violet)' : 'var(--primary-grey)'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer control--icons" />

    {currentSongs?.length && <MdSkipPrevious size={30} color="var(--primary-grey)" className="cursor-pointer control--icons" onClick={handlePrevSong} />}
    {isPlaying ? (
      <AiFillPauseCircle size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <AiFillPlayCircle size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    {currentSongs?.length && <MdSkipNext size={30} color="var(--primary-grey)" className="cursor-pointer control--icons" onClick={handleNextSong} />}
    <div className={`loop--icon__wrapper relative ${repeat?'isOnLoop':''}`}>
    <FiRepeat size={20} color={repeat ? 'var(--primary-violet)' : 'var(--primary-grey)'} onClick={() => setRepeat((prev) => !prev)} className=" hidden sm:block cursor-pointer control--icons" />
    {/* Pachhi entire playlist loop garne feature halne */}
    </div>

  </div>
);

export default Controls;
