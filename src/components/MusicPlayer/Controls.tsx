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
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
        <BiShuffle size={24} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" />

    {currentSongs?.length && <MdSkipPrevious size={30} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />}
    {isPlaying ? (
      <AiFillPauseCircle size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <AiFillPlayCircle size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    {currentSongs?.length && <MdSkipNext size={30} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />}
    <FiRepeat size={20} color={repeat ? 'red' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer" />
  </div>
);

export default Controls;
