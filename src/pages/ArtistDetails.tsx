import React from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

import { DetailsHeader,Error,RelatedSongs } from '../components';
import {artistDetailsTestData,artistDetailsTestDataSOLO} from '../redux/services/artistDetailsTestData';

import {Song} from '../redux/services/types'

interface ArtistDetailsProps {

}

const ArtistDetails:React.FC<ArtistDetailsProps> = () => {

    const dispatch = useDispatch();
    const {activeSong,isPlaying} = useSelector((state:any)=>state.player);
    const {id:artistId} = useParams<{id:string}>();

    // const {data:artistData,isFetching:isFetchingArtistDetails} = useGetArtistDetailsQuery(artistId);
    const artistData = artistDetailsTestDataSOLO;
    const artistAttributes = artistData?.data[0].attributes;
    const topSongs =Object.values(artistData?.data[0].views['top-songs'].data).slice(0,8);

    const handlePlayClick = (song:any,data:any[],i:number):void => {
      dispatch(setActiveSong({song,data,i}));
      dispatch(playPause(true));
    };
  
    const handlePauseClick = ():void => {
      dispatch(playPause(false));
    };
  return (
    <div className='flex flex-col md:flex-row gap-8 md:mt-16'>
        <div className='w-full md:w-1/2'>
        <DetailsHeader activeSong={activeSong} isPlaying={isPlaying} artistData={artistData} artistId={artistId}/>
        <div className='my-8 z-10'>
            <div className='bg-dark-linear p-8 gap-6 rounded-2xl w-full h-[32rem] md:h-[41rem] flex flex-col '>
                <h2 className='text-3xl font-bold scroll-smooth'>About  <span className=" font-semibold gradient--text">{artistAttributes.name}</span></h2>
                <div className='h-full overflow-y-auto overflow-x-hidden hide-scrollbar'>

             {
              artistAttributes.hasOwnProperty('artistBio') ?(
                <div className='flex flex-col w-full h-full gap-6'>
                <div>
                <p className='text-xl font-semibold'>Debut at: {artistAttributes.bornOrFormed}</p>
                <p className='text-xl font-semibold'>Country of Origin: {artistAttributes.origin}</p>
                </div>
                <div className='text-2xl font-semibold text-[var(--primary-grey)]' dangerouslySetInnerHTML={{ __html: `${artistAttributes?.artistBio}` }}></div>
                </div>
                
              ): (
                <div className='text-3xl w-full h-full flex flex-col gap-6 items-center justify-center'>
                <p className='text-2xl font-semibold'>Debut at: {artistAttributes.bornOrFormed}</p>
                <p className='text-2xl font-semibold'>Country of Origin: {artistAttributes.origin}</p>
                </div>
              )
}
                </div>
            </div>
        </div>

        </div>
        <RelatedSongs forArtistDetails={true} handlePlayClick={handlePlayClick} handlePauseClick={handlePauseClick}  relatedSongs={topSongs} activeSong={activeSong} isPlaying={isPlaying}/>
    </div>
  )
}

export default ArtistDetails