import React,{useLayoutEffect,useRef,useState} from 'react';
import {Song} from '../../redux/services/types';
import {AiFillHeart} from 'react-icons/ai';
import {RiHeartFill,RiHeartLine} from 'react-icons/ri';

import{likeUnlike, setLikedSongs} from '../../redux/features/playerSlice';
import {useDispatch,useSelector} from 'react-redux';

interface TrackProps {
  isPlaying: boolean;
  isActive: boolean;
  activeSong: Song;
}
const Track:React.FC<TrackProps> = ({ isPlaying, isActive, activeSong }) =>{

  const {isLiked,likedSongs} = useSelector((state:any) => state.player);
  const dispatch = useDispatch();

  const handleLikeSong = () => {
    if (!isActive) return;
    if (isLiked) {
      dispatch(likeUnlike(false));
      dispatch(setLikedSongs({activeSong}));
    } else {
      dispatch(likeUnlike(true));
      dispatch(setLikedSongs({activeSong}));
    }
  };

  const textRef = useRef<HTMLHeadingElement>(null);

  const [textWidth,setTextWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if(textRef.current){
      setTextWidth(textRef.current.getBoundingClientRect().width-8); // 8px Padding
    }
  },[activeSong]);

return(
  <div className=" flex items-center w-2/3 justify-start sm:flex-1 sm:min-w-[26.5rem]">
    <div className={`${isPlaying && isActive ?'songPlaying' : ''} sm:block w-14 h-14 mr-3 sm:h-16 sm:w-16 sm:mr-4 relative song-img__player`}>
      <img src={activeSong?.images?.coverart} alt="cover art" className="rounded-md" />
      <div className="music--waves absolute w-full h-full top-0 left-0 flex items-center justify-center gap-1 sm:gap-2 z-10 opacity-0">
        <div style={{animationDelay:"0s"}} className='bg-white w-1 h-7 animate-musicwavesPh rounded-md sm:animate-musicwavesLg'></div>
        <div style={{animationDelay:"0.3s"}} className='bg-white w-1 h-7 animate-musicwavesPh rounded-md sm:animate-musicwavesLg'></div>
        <div style={{animationDelay:"0.6s"}} className='bg-white w-1 h-7 animate-musicwavesPh rounded-md sm:animate-musicwavesLg'></div>
      </div>
    </div>
    <div className="w-[60%] sm:w-[50%] overflow-hidden gap-2 flex flex-col relative">
      <p ref={textRef} className={`truncate text-white font-bold text-base w-max overflow-hidden ${textWidth>190?'animate-textreveal':'whitespace-nowrap'}`}>
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
      </p>
      <button onClick={handleLikeSong} className='absolute hidden md:block top-[30%] right-0 hover:scale-110 active:scale-90'>
        {/* Add like animation here later  */}
        {
          likedSongs.some((song:any)=>song.key===activeSong?.key) ?
          <RiHeartFill size={30} color='#845ef7'/>
          : <RiHeartLine size={30} color='#6b7280'/>
        }
      </button>
    </div>
  </div>
);
}

export default Track;
