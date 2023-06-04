import React from 'react'
import {logo} from '../assets'

const Logo:React.FC = () => {
  return (
    <div className='flex items-center gap-1'>
        <img className='w-10' src={logo} alt="Rizzify" />
        <h1 className='text-2xl font-semibold'>Rizzify</h1>
    </div>
  )
}

export default Logo