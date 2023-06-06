import React from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';

import { DetailsHeader,Error,RelatedSongs } from '../components';
import songDetailsTestData from '../redux/services/songDetailsTestData';

interface SongDetailsProps {

}

const SongDetails:React.FC<SongDetailsProps> = () => {

    const dispatch = useDispatch();
    const {activeSong,isPlaying} = useSelector((state:any)=>state.player);
    const {songid} = useParams<{songid:string}>();

    // const {data:songData,isFetching:isFetchingSongDetails} = useGetSongDetailsQuery({songid})
    const songData = songDetailsTestData;
  return (
    <div className='flex flex-col '>

        <DetailsHeader artistData={""} artistId={0} songData={songData}/>
        <div className='my-8 z-10'>
        <div className='bg-[#111111] p-8 gap-6 rounded-2xl w-1/2 h-[30rem] overflow-y-scroll overflow-x-hidden flex flex-col hide-scrollbar'>
        <h2 className='text-3xl font-bold scroll-smooth'>Lyrics</h2>
        <div className=''>

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
  )
}

export default SongDetails