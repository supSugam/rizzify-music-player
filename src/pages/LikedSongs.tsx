import React from 'react'
import Tilt from 'react-parallax-tilt';
import {Link} from 'react-router-dom'
import {AiFillPlayCircle} from 'react-icons/ai';
import {useSelector} from 'react-redux';

interface LikedSongBarProps {
    song:any,
    i:number
}

const LikedSongBar:React.FC<LikedSongBarProps> = ({song,i}) => {
    return(
        <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#6156f4" glarePosition="all" tiltMaxAngleX={3} tiltMaxAngleY={3}>
            <Link to={`/songs/${song.key}/`}>
        <div className="flex w-full h-[5.6rem] items-center justify-between cursor-pointer md:gap-8 py-3 px-2 border-b-2 border-gray-200 border-opacity-5">
          <div className="flex items-center gap-4 md:gap-6">
            <p className="text-[var(--primary-grey)] text-sm font-bold">{i+1}</p>
            <div className='w-16 h-auto'>
              <img src={song?.image} alt={song.title} className='rounded-md' />
            </div>
    
          </div>
          <div className='flex flex-col flex-1 max-w-[40%] gap-2 sm:max-w-none'>
            <h3 className="text-base font-semibold text-left truncate">{song.title}</h3>
            <p className="text-sm text-[var(--primary-grey)] text-left truncate">{song.subtitle}</p>
          </div>
          <Link to={`/songs/${song.key}/`} className='min-[10%]'>
          <AiFillPlayCircle size={50} className='z-10 text-white/80 cursor-pointer hover:scale-110 active:scale-125 animate-hoverscale transition-transform' />
          </Link>
    
        </div>
        </Link>
    
        </Tilt>
    )
}

const LikedSongs:React.FC = () => {
    const {likedSongs} = useSelector((state:any) => state.player);
  return (
    <div className='w-full flex flex-col gap-8'>
      <div className='flex items-center px-6 bg-gradient-to-l h-20 from-transparent to-[#080625]'>
        <h2 className='text-white text-2xl font-bold'>Your Liked Songs</h2>
      </div>
        <div className='flex w-full flex-col'>
        {
            likedSongs.length === 0 ? (
                <div className='flex flex-col items-center justify-center w-full h-64 gap-8 bg-black bg-opacity-60 rounded-lg'>
                    <div className='flex flex-col items-center justify-center w-full gap-2 text-2xl font-bold'>
                    <p className=''>You haven't liked any songs yet</p>
                    <span className=''>ಥ_ಥ</span>
                    </div>
                    <Link to='/'>
                        <button className='bg-[#6156f4] text-white text-2xl font-semibold px-4 py-2 rounded-md hover:scale-110 transition-all duration-100'>Discover Songs</button>
                        </Link>
                    </div>
            ) : likedSongs.map((song:any,i:number) => <LikedSongBar key={i} song={song} i={i} />)
        }
        </div>

    </div>
  )
}

export default LikedSongs