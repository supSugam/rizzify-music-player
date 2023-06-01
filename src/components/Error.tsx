import React from 'react';
import {wentWrong,wentWrongMini} from '../assets';

const MiniError:React.FC = () => {
  return (
  <div className='w-full flex flex-col justify-evenly items-center sm:flex-row'>
    <div className="w-2/3 flex justify-center">
    <img src={wentWrongMini} alt='Something went wrong' className='w-full sm:w-1/2' />
    </div>
    <div className='flex flex-col gap-10'>
      <h1 className='font-bold tracking-wide text-3xl text-center sm:text-4xl sm:text-left'>Something went wrong 😶‍🌫️</h1>
      <p className='hidden text-xl text-left w-3/4 sm:block'>Oops! Our server encountered an error while fetching the songs. We are Sorry, Please try again later.</p>
    </div>
  </div>
  )
};

const Error:React.FC = () => {
  return (
    <div className='w-full flex justify-center items-center'>
    <img src={wentWrong} alt='Something went wrong' className='w-1/2' />
  </div>
  )
}

export{
  Error,
  MiniError
}
