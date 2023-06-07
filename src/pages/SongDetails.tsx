import React from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';

import { DetailsHeader,Error,RelatedSongs } from '../components';
import songDetailsTestData from '../redux/services/songDetailsTestData';
import songRelatedTestData from '../redux/services/songRelatedTestData';

import {Song} from '../redux/services/types'

interface SongDetailsProps {

}

const SongDetails:React.FC<SongDetailsProps> = () => {

    const dispatch = useDispatch();
    const {activeSong,isPlaying} = useSelector((state:any)=>state.player);
    const {songid} = useParams<{songid:string}>();

    const handlePlayClick = (song:Song,data:Song[],i:number):void => {
        dispatch(setActiveSong({song,data,i}));
        dispatch(playPause(true));
      };
    
      const handlePauseClick = ():void => {
        dispatch(playPause(false));
      };

    // const {data:songData,isFetching:isFetchingSongDetails} = useGetSongDetailsQuery({songid})
    // const {data:relatedSongsData, isFetching:isFetchingRelatedSongs} = useGetSongRelatedQuery({songid})
    const songData = songDetailsTestData;
    const songRelatedData = songRelatedTestData.slice(0,8);
  return (
    <div className='flex flex-col md:flex-row gap-8 md:mt-16'>
        <div className='w-full md:w-1/2'>
        <DetailsHeader activeSong={activeSong} isPlaying={isPlaying} artistData={undefined} artistId={undefined} songData={songData}/>
        <div className='my-8 z-10'>
            <div className='bg-dark-linear p-8 gap-6 rounded-2xl w-full h-[32rem] md:h-[41rem] flex flex-col '>
                <h2 className='text-3xl font-bold scroll-smooth'>Lyrics</h2>
                <div className='overflow-y-auto overflow-x-hidden hide-scrollbar'>

            {
                songData?.sections[1].type === 'LYRICS' ? (
                    songData?.sections[1].text.map((line:string,i:number)=>(
                        <p key={i} className='text-2xl font-semibold text-[var(--primary-grey)]'>{line}</p>
                    ))
                ):(<p className=''>No Lyrics found.</p>)
            }
                </div>
            </div>
        </div>
        </div>
        <RelatedSongs handlePlayClick={handlePlayClick} handlePauseClick={handlePauseClick}  relatedSongs={songRelatedData} activeSong={activeSong} isPlaying={isPlaying}/>
    </div>
  )
}

export default SongDetails