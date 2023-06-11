import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SongCardSkeleton:React.FC<{i?:number}> = ({i}) => {
  return (
    <div key={i} className='flex flex-col w-[14rem] h-auto p-3 bg-white/5 bg-opacity-80 backdrop-blur-sm shadow-md border-solid border-b-2 border-[--primary-violet] animate-slideup cursor-pointer rounded-lg sm:w-56 sm:h-auto sm:p-4 group song--card'>
    <div className="relative group w-full min-h-[12rem] h-auto flex md:block">
      <div className='flex  absolute inset-0 justify-center items-center bg-opacity-50 group-hover:flex'>
      </div>
      <div className='w-full h-full rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-sm rounded-bl-sm song--img__wrapper'>
        <Skeleton className='w-full h-full min-h-[12rem] min-w-[12rem]' />
      </div>
    </div>
    <div className='flex flex-col mt-3 overflow-hidden pr-2'>
   <Skeleton width={"80%"} />
    <Skeleton width={"60%"} />
    </div>
  </div>
  )
}

export default SongCardSkeleton;