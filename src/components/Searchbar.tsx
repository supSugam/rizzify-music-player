import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

const Searchbar:React.FC = () => {
  return (
    <form autoComplete='off' className='p-2 text-[varchar(--primary-grey)] focus-within:text-gray-500'>
      <label htmlFor='search' className='sr-only'>Search</label>
      <div className='flex items-center gap-2'>
        <FaSearch className='w-5 h-5 ml-4' />
        <input autoComplete='off' id='search-field' type='text' name='search' placeholder='Search for Songs' className='w-full bg-transparent focus:outline-none' />
      </div>
    </form>
  )
}

export default Searchbar