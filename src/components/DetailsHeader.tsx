import React from 'react'
import Link from 'react-router-dom';

interface DetailsHeaderProps {
  artistId:number;
  songData:any;
  artistData:any;
}

const DetailsHeader:React.FC<DetailsHeaderProps> = ({artistId,songData,artistData}) => {
  return (
    <div className='relative w-full flex flex-col'>

    </div>
  )
}

export default DetailsHeader