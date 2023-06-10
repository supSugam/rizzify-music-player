import React from 'react'
// import {logo} from '../assets'
import { logo_compressed } from '../assets';
import {Link} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface LogoProps{
  forMobile:boolean;
}

const Logo:React.FC<LogoProps> = ({forMobile}) => {
  if(!forMobile){
    return (
      <Link to={'/'} className='flex items-center gap-1'>
          <LazyLoadImage effect='blur' className='w-10' src={logo_compressed} alt="Rizzify" />
          <h1 className='text-2xl font-semibold'>Rizzify</h1>
          {/* <p>by Sugam.</p> */}
      </Link>
    )
  }
  if(forMobile){
    return (
      <Link to={'/'} className='flex items-center gap-1 ml-1'>
          <LazyLoadImage effect='blur' className='w-12' src={logo_compressed} alt="Rizzify" />
          <h1 className='text-3xl font-semibold gradient--text'>Rizzify</h1>
          {/* <p className='text-[var(--primary-grey)] text-sm font-semibold pl-2 pt-[0.8rem] opacity-60'>by Sugam.</p> */}

      </Link>
    )
  }

}

export default Logo