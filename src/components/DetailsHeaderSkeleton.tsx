import React from 'react'
import Skeleton from 'react-loading-skeleton';

const DetailsHeaderSkeleton:React.FC = () => {
  return (
    <div className='w-full flex flex-col details--header__wrapper'>
    <div className='relative flex items-center justify-between w-full h-32 md:h-40 bg-gradient-to-l from-transparent to-[#080625] rounded-l-xl'>
      <div className='absolute inset-0 flex items-center px-6 gap-5'>
        <Skeleton height={90} width={90}  className='shaped--border__radius-2 shadow-2xl shadow-[var(--primary-violet)]'/>
        <div className='flex flex-col gap-2 max-w-[60%] truncate'>

          {
            <>
                <Skeleton width={600} height={40} />
                <Skeleton width={300} height={30} />
            </>
          }
        </div>
        <div className='text-base flex-grow flex justify-end'>
        </div>

      </div>
    </div>
  </div>
  )
}

export default DetailsHeaderSkeleton;