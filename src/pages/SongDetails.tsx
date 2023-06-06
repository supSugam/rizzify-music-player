import React from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';

import { DetailsHeader,Error,RelatedSongs } from '../components';

interface SongDetailsProps {

}

const SongDetails:React.FC<SongDetailsProps> = () => {

    const dispatch = useDispatch();
    const {activeSong,isPlaying} = useSelector((state:any)=>state.player);
    const {songid} = useParams<{songid:string}>();

    const {data:songData,isFetching:isFetchingSongDetails} = useGetSongDetailsQuery({songid})
  return (
    <div className='flex flex-col'>
        {/* <DetailsHeader artistId={artistId} songData={songData}/> */}
        <div className='mb-8'>
            <h2 className='text-3xl font-bold'>Lyrics</h2>
        </div>
        <div>
            {
                songData?.sections[1].type === 'LYRICS' ? (
                    songData?.sections[1].text.map((line,i)=>(
                        <p key={i} className='text-[var(--primary-grey)]'>{line}</p>
                    ))
                ):(<p className=''>NOOOOOO</p>)
            }
        </div>
    </div>
  )
}

export default SongDetails