import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, prevSong, playPause,likeUnlike, setLikedSongs,toggleInfoModal,toggleModal} from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { Song } from '../../redux/services/types';
import {Link} from 'react-router-dom'

// 
import{SlVolumeOff,SlVolume2} from 'react-icons/sl';
import {FaChevronDown} from 'react-icons/fa'
import {SlOptionsVertical} from 'react-icons/sl'
import {RiHeartFill,RiHeartLine} from 'react-icons/ri';
import {HiShare} from 'react-icons/hi'

interface MusicPlayerProps {
  activeSong?: Song;
  currentSongs?: Song[];
  currentIndex?: number;
  isActive?: boolean;
  isPlaying?: boolean;
  duration?: number;
  state?: any;
  setDuration?: React.Dispatch<React.SetStateAction<number>>;
  seekTime?: number;
  setSeekTime?: React.Dispatch<React.SetStateAction<number>>;
  appTime?: number;
  setAppTime?: React.Dispatch<React.SetStateAction<number>>;
  volume?: number;
  setVolume?: React.Dispatch<React.SetStateAction<number>>;
  repeat?: boolean;
  setRepeat?: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle?: boolean;
  setShuffle?: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch?: any;
  handlePlayPause?: () => void;
  handleNextSong?: () => void;
  handlePrevSong?: () => void;
  handlePlayerExpansion?: ()=>void;
}

const MusicPlayer:React.FC<MusicPlayerProps> = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying,isLiked,likedSongs,isModalOpen,isInfoModalOpen } = useSelector((state:any) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playerExpanded, setPlayerExpanded] = useState(false);
  const dispatch = useDispatch();

	const handleInfoModal = ():void => {
		dispatch(toggleInfoModal(!isInfoModalOpen));
		dispatch(toggleModal(!isModalOpen));
	};

  // useEffect(() => {
    
  // }, []);

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

  const handlePlayerExpansion = ():void=>{
    setPlayerExpanded(!playerExpanded);
  }
  const handleLikeSong = () => {
    if (isLiked) {
      dispatch(likeUnlike(false));
    } else {
      dispatch(likeUnlike(true));
    }
    dispatch(setLikedSongs({activeSong}));
  };

  return (
    <>
  <div className="absolute sm:h-28 h-20 bottom-[4.8rem] sm:bottom-0 left-0 right-0 flex animate-slideup smooth-transition bg-black bg-opacity-90 backdrop-blur-md w-full z-[19]">
    <div className="relative sm:px-12 px-6 w-full flex items-center justify-between mini--player">
      <Track handlePlayerExpansion={()=>handlePlayerExpansion()} isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="sm:flex-1 flex flex-col items-center justify-center gap-2">
      <button onClick={handleLikeSong} className='absolute top-40% right-[21%] hover:scale-110 md:hidden'>
        {/* Add like animation here later  */}
        {
          likedSongs.some((song:any)=>song.key===activeSong?.key) ?
          <RiHeartFill size={30} color='#845ef7'/>
          : <RiHeartLine size={30} color='#6b7280'/>
        }
      </button>
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
          onTimeUpdate={(event) => {
            const target = event.target as HTMLAudioElement;
            setAppTime(target.currentTime)
          }}
          onLoadedData={(event) => {
            const target = event.target as HTMLAudioElement;
            setDuration(target.duration)}}
        />
      </div>
      <VolumeBar value={volume} min={0} max={1} onChange={(event) => setVolume(+event.target.value)} setVolume={setVolume} />
    </div>
  </div>
      <div className={`flex absolute overflow-y-scroll flex-col left-0 sm:hidden w-full h-[calc(100vh-4.8rem)] hide-scrollbar px-6 pt-10 pb-4 gap-8 bg-[#121212] z-30 ${playerExpanded? 'top-0 animate-slideup':'animate-slidedown -bottom-full -z-50'}`}>
        <div className='flex justify-between items-center sticky'>
          <button onClick={handleInfoModal}>
          <SlOptionsVertical size={21}/>
          </button>

          <h3 className='text-sm text-white font-semibold uppercase'>RIZZIFY</h3>
          <button onClick={()=>setPlayerExpanded(false)}>      
            <FaChevronDown size={21}/>
          </button>
        </div>
        <div className='h-min w-auto px-3 mt-8'>
          <img className='w-full h-full rounded-xl' src={activeSong?.images?.coverart} alt='Cover Image'/>
        </div>
        <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center px-3 mt-6'>
            <div className='w-2/3'>
              <p onClick={()=>setPlayerExpanded(false)}><Link to={`/songs/${activeSong.key}`} className='text-white truncate font-bold text-xl'>{activeSong?.title}</Link></p>
              <Link onClick={()=>setPlayerExpanded(false)} to={activeSong.artists? `artists/${activeSong.artists[0].adamid}`:'/top-artists'} className='text-gray-300 truncate text-base'>{activeSong?.subtitle}</Link>
            </div>
                <button onClick={()=>handleLikeSong()} className='hover:scale-110 active:scale-90'>
            {/* Add like animation here later  */}
            {
              likedSongs.some((song:any)=>song.key===activeSong?.key) ?
              <RiHeartFill size={30} color='#845ef7'/>
              : <RiHeartLine size={30} color='#6b7280'/>
            }
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
          <button onClick={handleInfoModal}>
            <HiShare size={25} color="#FFF"/>
          </button>
        </div>
          <div onClick={()=>setPlayerExpanded(!playerExpanded)} className='w-full h-24 bg-[#191919] rounded-xl p-6 flex items-center justify-center'>
            <Link to={`/songs/${activeSong?.key}`}>
                <h3 className='font-semibold underline text-2xl'>View Song Details and Lyrics</h3>
            </Link>
            <div>
              {
                // activeSong && isPlaying && (activeSong?.sections[1].type === 'LYRICS' ? (
                //   activeSong?.sections[1].text.map((line:string,i:number)=>() => {
                //   <p key={i} className='text-2xl font-semibold text-[var(--primary-grey)]'>{line}</p>
                // })
                // ): (<p className=''>No Lyrics found.</p>))
              }
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default MusicPlayer;
