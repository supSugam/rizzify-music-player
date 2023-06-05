import React from 'react'
import {logo} from '../assets'

interface LogoProps{
  forMobile:boolean;
}

const Logo:React.FC<LogoProps> = ({forMobile}) => {
  if(!forMobile){
    return (
      <div className='flex items-center gap-1'>
          <img className='w-10' src={logo} alt="Rizzify" />
          <h1 className='text-2xl font-semibold'>Rizzify</h1>
          {/* <p>by Sugam.</p> */}
      </div>
    )
  }
  if(forMobile){
    return (
      <div className='flex items-center gap-1 ml-1'>
          <img className='w-12' src={logo} alt="Rizzify" />
          <h1 className='text-3xl font-semibold gradient--text'>Rizzify</h1>
          {/* <p className='text-[var(--primary-grey)] text-sm font-semibold pl-2 pt-[0.8rem] opacity-60'>by Sugam.</p> */}

      </div>
    )
  }

}

export default Logo