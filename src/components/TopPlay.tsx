import React from 'react'
import {useEffect,useRef} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode} from 'swiper'
import Tilt from "react-parallax-tilt"
import 'swiper/css'
import 'swiper/css/free-mode'

// 
import testData from '../redux/services/testData'
import {Song} from '../redux/services/types'
// 

import PlayPause from './PlayPause'
import {playPause,setActiveSong} from '../redux/features/playerSlice'
import {useGetTopChartsQuery} from '../redux/services/shazamCore'

interface TopPlayProps {

}
interface TopPlayCardProps{
  song:Song;
  i:number;
  isPlaying:boolean;
  activeSong:Song;
  handlePauseClick?:()=>void;
  handlePlayClick?:()=>void;

}
const TopPlayCard:React.FC<TopPlayCardProps> = ({song,i,isPlaying,activeSong,handlePauseClick, handlePlayClick}) => {
  return (
    <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#6156f4" glarePosition="all" tiltMaxAngleX={3} tiltMaxAngleY={3}>

    <div className="flex w-full h-[5.6rem] items-center justify-between cursor-pointer md:gap-8 py-3 px-2 border-b-2 border-gray-200 border-opacity-5">
      <div className="flex items-center gap-4 md:gap-6">
        <p className="text-[var(--primary-grey)] text-sm font-bold">{i+1}</p>
        <div className='w-16 h-auto'>
          <img src={song.images?.coverarthq || song.images?.coverart || song.images?.background} alt={song.title} className='rounded-md' />
        </div>

      </div>
      <div className='flex flex-col flex-1 max-w-[40%] gap-2 sm:max-w-none'>
        <h3 className="text-base font-semibold text-left truncate">{song.title}</h3>
        <p className="text-sm text-[var(--primary-grey)] text-left truncate">{song.subtitle}</p>
      </div>
      <div className='min-[10%]'>
        <PlayPause key={i} handlePause={handlePauseClick} handlePlay={handlePlayClick} isPlaying={isPlaying} activeSong={activeSong} song={song} />
      </div>

    </div>

    </Tilt>
  )
}

const TopPlay:React.FC<TopPlayProps> = () => {
  const dispatch = useDispatch();
  const {activeSong,isPlaying} = useSelector((state:any)=>state.player)
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if(divRef.current){
      // divRef.current.scrollIntoView({behavior:'smooth'})
    }
  })
  // const {data} = useGetTopChartsQuery()
  const data = testData;
  const topSongs = data?.slice(0,5)
  const artists = data?.slice(0,20)

  const handlePlayClick=(song:Song,i:number):void=>{
    dispatch(setActiveSong({song,data,i}))
    dispatch(playPause(true))
  }
  const handlePauseClick=():void=>{
    dispatch(playPause(false))
  }
  return (
    <div ref={divRef} className="flex flex-col gap-14 w-full lg:flex-row lg:mr-4 sm:mt-0">
      {/* Top Songs */}
      <div className="w-full flex flex-col lg:w-1/2">
        <div className="flex w-full justify-between items-end">
          <h2 className='text-center text-2xl font-bold sm:text-left'>Rizzify's Top 5 this week</h2>
          <Link to='/top-charts'>
            <p className='text-[var(--primary-grey)] text-sm font-bold underline'>See All</p>
          </Link>
        </div>
        <div className="w-full flex flex-col mt-4 gap-2">
          {
            topSongs?.map((song:any,i:number)=>(<TopPlayCard activeSong={activeSong} isPlaying={isPlaying} handlePlayClick={()=>handlePlayClick(song,i)} handlePauseClick={handlePauseClick} key={song.key} song={song} i={i} />))
          }
        </div>
      </div>
      {/* Top Artists */}
      <div className="w-full min-h-[60vh] md:min-h-full flex flex-col lg:w-1/2 mb-8">
      <div className="flex w-full justify-between items-end">
          <h2 className='text-center text-2xl font-bold sm:text-left'>Top Artists - {new Date().toLocaleString('default', { month: 'long' })}</h2>
          <Link to='/top-artists'>
            <p className='text-[var(--primary-grey)] text-sm font-bold underline'>See All</p>
          </Link>
        </div>
        <Swiper freeMode={true} slidesPerView={'auto'} spaceBetween={30} centeredSlides centeredSlidesBounds modules={[FreeMode]} className='mt-8 h-[12rem]'>
          {
            artists?.map((song:any,i:number)=>(
            <SwiperSlide data-artist={song?.subtitle} key={i} style={{width:"21%",height:"h-full"}} className='relative group'>
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                    <img src={song?.images?.background} alt={song?.title} className='shaped--border__radius group-hover:rounded-3xl' />
                </Link>
                <Link className='absolute bottom-[2rem] left-0 w-[7.875rem] text-base text-center truncate artist--name' to={`/artists/${song?.artists[0].adamid}`}>
              {song?.subtitle}
              </Link>
            </SwiperSlide>
            ))
          }
          </Swiper>
        </div>
    </div>
  )
}

export default TopPlay