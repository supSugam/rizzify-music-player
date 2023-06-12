import React,{useEffect,useRef} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { wentWrong } from '../assets';

import { DetailsHeader,DetailsHeaderSkeleton,RelatedSongs } from '../components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import {artistDetailsTestData,artistDetailsTestDataSOLO} from '../redux/services/artistDetailsTestData';

const ArtistDetails:React.FC<{}> = () => {

    const dispatch = useDispatch();
    const {activeSong,isPlaying} = useSelector((state:any)=>state.player);
    const {id:artistId} = useParams<{id:string}>();

    const {data:artistData,isFetching,isSuccess} = useGetArtistDetailsQuery(artistId);

    const handlePlayClick = (song:any,data:any[],i:number):void => {
      dispatch(setActiveSong({song,data,i}));
      dispatch(playPause(true));
    };
  
    const handlePauseClick = ():void => {
      dispatch(playPause(false));
    };
    let artistAttributes:any, topSongs:any;
    if(isSuccess){
      artistAttributes = !isFetching && artistData?.data[0]?.attributes;
      topSongs = !isFetching && Object.values(artistData?.data[0]?.views['top-songs']?.data).slice(0,8);
    }
    useEffect(() => {
      window.scrollTo({top:0,behavior:'smooth'})
    }, [])

    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      // divRef.current && divRef.current.scrollTo({top:-200,behavior:'smooth'})
      window.scrollTo({top:0,behavior:'smooth'})
		}, [divRef,artistData]);	
  return (
    <div ref={divRef} className='flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-1/2'>
          {
            isSuccess && <DetailsHeader songData={undefined} activeSong={activeSong} isPlaying={isPlaying} artistData={artistData} artistId={artistId}/>
          }
          {
            isFetching && <DetailsHeaderSkeleton/>
          }
        <div className='my-8 z-10'>
            <div className='bg-dark-linear p-8 gap-6 rounded-2xl w-full h-[32rem] md:h-[41rem] flex flex-col '>
  
                  {
                    isFetching ? <Skeleton width={"100%"} height={50} /> : <h2 className='text-3xl font-bold scroll-smooth'>About  <span className=" font-semibold gradient--text">{artistAttributes?.name}
                </span></h2>

                  }
                <div className='h-full overflow-y-auto overflow-x-hidden hide-scrollbar'>

                  {
                    isFetching && (
                      <div className='flex flex-col w-full h-full gap-6'>
                      <div>
                      <p className='text-xl font-semibold'>
                        <Skeleton width={"100%"} height={30} />
                      </p>
                      <p className='text-xl font-semibold'>
                      <Skeleton width={"100%"} height={30} />
                      </p>
                      </div>
                      <div className='text-2xl font-semibold text-[var(--primary-grey)]'>
                      <Skeleton width={"100%"} height={300} />
                      </div>
                      </div>
                    )
                  }

             {
              isSuccess &&
              (artistAttributes.hasOwnProperty('artistBio') ?(
                <div className='flex flex-col w-full h-full gap-6'>
                <div>
                <p className='text-xl font-semibold'>Debut at: {artistAttributes.bornOrFormed}</p>
                <p className='text-xl font-semibold'>Country of Origin: {artistAttributes.origin}</p>
                </div>
                <div className='text-2xl font-semibold text-[var(--primary-grey)]' dangerouslySetInnerHTML={{ __html: `${artistAttributes?.artistBio}` }}></div>
                </div>
                
              ): (
                <div className='text-3xl w-full h-full flex flex-col gap-6 items-center justify-center'>
                  <LazyLoadImage style={{transform: "scale(1.3) scaleX(-1)"}} src={wentWrong} alt='went wrong' className='pl-8 hidden md:block' />
                  <LazyLoadImage style={{transform: "scale(1.1) scaleX(-1)"}} src={wentWrong} alt='went wrong' className='pl-4 block md:hiddne' />
                <p className='text-xl text-center md:text-2xl font-semibold text-[var(--primary-grey)] italic md:translate-y-16'>Uh oh, there's no information on this artist! </p>
                </div>
              ))
}
                </div>
            </div>
        </div>

        </div>
        {
          isSuccess && !isFetching && <RelatedSongs forArtistDetails={true} handlePlayClick={handlePlayClick} handlePauseClick={handlePauseClick}  relatedSongs={topSongs} activeSong={activeSong} isPlaying={isPlaying}/>
        }

    </div>
  )
}

export default ArtistDetails