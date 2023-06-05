import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { Song } from '../../redux/services/types';

// 
import{SlVolumeOff,SlVolume2} from 'react-icons/sl';
import {FaChevronDown} from 'react-icons/fa'
import {SlOptionsVertical} from 'react-icons/sl'
import {AiFillHeart} from 'react-icons/ai'
import {HiShare} from 'react-icons/hi'

interface MusicPlayerProps {
  activeSong: Song;
  currentSongs: Song[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  duration: number;
  state: any;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  seekTime: number;
  setSeekTime: React.Dispatch<React.SetStateAction<number>>;
  appTime: number;
  setAppTime: React.Dispatch<React.SetStateAction<number>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  repeat: boolean;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: any;
  handlePlayPause: () => void;
  handleNextSong: () => void;
  handlePrevSong: () => void;
}

const MusicPlayer:React.FC<MusicPlayerProps> = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state:any) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playerExpanded, setPlayerExpanded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handlePlayerExpansion = (e:React.MouseEvent<HTMLDivElement>):void=>{
    const clickedElement = e.target as HTMLElement;
    if(clickedElement.classList.contains("mini--player"))
    setPlayerExpanded(!playerExpanded);
  }

  return (
    <>
  <div onClick={(e)=>handlePlayerExpansion(e)} className="absolute sm:h-28 h-20 bottom-[4.5rem] sm:bottom-0 left-0 right-0 flex animate-slideup smooth-transition bg-darkblue bg-opacity-90 backdrop-blur-md w-full z-11">
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between mini--player">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
          playerExpanded={false}
        />
        <Seekbar
          value={appTime}
          min={0}
          max={duration}
          onInput={(event) => {setSeekTime(+event.target.value)}}
          playerExpanded={false}
          /*
          setSeekTime={setSeekTime}
          appTime={appTime}
          */
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min={0} max={1} onChange={(event) => setVolume(+event.target.value)} setVolume={setVolume} />
    </div>
  </div>
      <div className={`absolute overflow-y-scroll flex-col top-0 left-0 sm:hidden w-full h-[calc(100vh-4.5rem)] hide-scrollbar px-6 pt-10 pb-4 gap-8 bg-[#121212] animate-slideup ${playerExpanded? 'flex':'hidden'}`}>
        <div className='flex justify-between items-center sticky fixed'>
          <SlOptionsVertical size={21}/>
          <h3 className='text-sm text-white font-semi uppercase'>From Search</h3>
          <button onClick={()=>setPlayerExpanded(false)}>      
            <FaChevronDown size={21}/>
          </button>
        </div>
        <div className='h-min w-auto px-3 mt-8'>
          <img className='w-full h-full rounded-xl' src={activeSong?.images.coverart} alt='Cover Image'/>
        </div>
        <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center px-3 mt-6'>
            <div className='w-2/3'>
              <h3 className='text-white truncate font-bold text-xl'>{activeSong?.title}</h3>
              <p className='text-gray-300 truncate text-base'>{activeSong?.subtitle}</p>
            </div>
            <button>
              <AiFillHeart size={28}/>
            </button>
        </div>
        <Seekbar
          value={appTime}
          min={0}
          max={duration}
          onInput={(event) => {setSeekTime(+event.target.value)}}
          playerExpanded={true}
          /*
          setSeekTime={setSeekTime}
          appTime={appTime}
          */
        />
        </div>
        <div className='flex flex-col gap-7'>
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
            playerExpanded={true}
          />
        <div className='flex items-center justify-between px-3'>
          <button>
            {volume <= 0.9  && <SlVolumeOff className='cursor-pointer hover:scale-105 transition-all duration-75' size={25} color="#FFF" onClick={() => setVolume(1)} />}
          {volume >= 0.9  && <SlVolume2 className='cursor-pointer hover:scale-105 transition-all duration-75' size={25} color="#FFF" onClick={() => setVolume(0)} />}
          </button>
          <button>
            <HiShare size={25} color="#FFF"/>
          </button>
        </div>
          <div className='w-full h-56 bg-[#191919] rounded-xl p-6 flex flex-col gap-6 overflow-scroll'>
            <h3 className='font-semibold text-3xl'>Lyrics</h3>
            <p className=' text-2xl font-semibold text-[var(--primary-grey)]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, omnis porro. Laboriosam nemo distinctio perferendis mollitia exercitationem tempora animi. Blanditiis exercitationem laboriosam asperiores cum laborum sequi rem, natus rerum in..</p>
          </div>
        </div>
    </div>
    </>
  );
};

export default MusicPlayer;
