import React,{useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery,useGetSongRelatedQuery } from '../redux/services/shazamCore';

import { DetailsHeader,DetailsHeaderSkeleton,RelatedSongs } from '../components';

import {Song} from '../redux/services/types'
import Skeleton from 'react-loading-skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {NotFound} from '../assets';

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

    const {data:songData,isFetching,isSuccess:isSuccessSongDetails,isError} = useGetSongDetailsQuery({songid})
    const {data:relatedSongsData,isSuccess:isSuccessRelated} = useGetSongRelatedQuery({songid})
    // isFetching:isFetchingRelatedSongs
    const relatedSongs = relatedSongsData?.slice(0,8);
    relatedSongsData && console.log(relatedSongsData)

    useEffect(() => {
      window.scrollTo({top:0,behavior:'smooth'})
    }, [songData,relatedSongsData])

    // const divRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
		// 	divRef.current?.scrollIntoView({behavior:'smooth',block:'nearest'});
		// }, [divRef]);	
    const navigate = useNavigate();

    useEffect(() => {
      if(isError){
        navigate('/top-charts')
      }
    }, [isError,navigate])
    
  return (
    <div className='flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-1/2'>
          {
            isSuccessSongDetails && <DetailsHeader activeSong={activeSong} isPlaying={isPlaying} artistData={undefined} artistId={undefined} songData={songData}/>
          }
          {
            (!isSuccessSongDetails || isFetching) && <DetailsHeaderSkeleton/>
          }
        <div className='my-8 z-10'>
            <div className='bg-dark-linear p-8 gap-6 rounded-2xl w-full h-[28rem] md:h-[41rem] flex flex-col '>
                <h2 className='text-3xl font-bold scroll-smooth'>Lyrics</h2>
                <div className='overflow-y-auto overflow-x-hidden hide-scrollbar'>

            {
                isSuccessSongDetails && (songData?.sections[1]?.type === 'LYRICS' ? (
                    songData.sections[1]?.text?.map((line:string,i:number)=>(
                        <p key={i} className='text-2xl font-semibold text-[var(--primary-grey)]'>{line}</p>
                    ))
                ):(
                  <div className='text-3xl w-full h-full flex flex-col gap-6 items-center justify-center'>
                  <LazyLoadImage src={NotFound} alt='Not Found Lyrics' className='scale-125 md:scale-105 md:w-[80%] mt-10' />
                <p className='text-xl mt-8 sm:mt-2 text-center md:text-2xl font-semibold text-[var(--primary-grey)] italic'>Uh oh, there's no lyrics for this song! </p>
                </div>
                ))
            }
            {
                !isSuccessSongDetails && isFetching && (
                  <>
                <Skeleton width={"80%"} height={20} />
                <Skeleton width={"90%"} height={25} />
                <Skeleton width={"80%"} height={17} />
                <Skeleton width={"93%"} height={20} />
                <Skeleton width={"68%"} height={18} />
                <Skeleton width={"75%"} height={26} />
                <Skeleton width={"37%"} height={27} />
                <Skeleton width={"49%"} height={22} />
                <Skeleton width={"40%"} height={24} />
                <Skeleton width={"96%"} height={16} />
                <Skeleton width={"80%"} height={13} />
                <Skeleton width={"100%"} height={20} />
                <Skeleton width={"100%"} height={25} />
                <Skeleton width={"100%"} height={29} />
                </>
                )
            }
                </div>
            </div>
        </div>
        </div>
        {
          isSuccessRelated && <RelatedSongs forArtistDetails={false} handlePlayClick={handlePlayClick} handlePauseClick={handlePauseClick}  relatedSongs={relatedSongs} activeSong={activeSong} isPlaying={isPlaying}/>
        }

    </div>
  )
}

export default SongDetails