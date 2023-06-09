import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {IoSearchOutline} from 'react-icons/io5'

const SearchBar:React.FC = () => {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(searchTerm) navigate(`/search/${searchTerm}`);
  };
  return (
    <form autoComplete='off' onSubmit={handleSubmit} className='p-2 m-4 mt-24 mb-8 md:m-10 text-[varchar(--primary-grey)] text-gray-400 focus-within:text-white transition-all duration-100 ease-in-out group'>
      <label htmlFor='search' className='sr-only'>Search</label>
      <div className='flex items-center gap-4'>
        <div className='md:min-w-min'>
        <IoSearchOutline className='hidden md:block' size={40}/>
        <IoSearchOutline className='block md:hidden' size={30}/>
        </div>
        <input
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)} autoComplete='off' id='search-field' type='text' name='search' placeholder='Search for Songs' className='flex-1 bg-transparent py-3 focus:outline-none placeholder-gray-400 text-[1.4rem] sm:text-2xl text-white font-semibold outline-none border-b-2 border-gray-400 border-opacity-10 tracking-wide group-focus-within:border-opacity-60 transition-all duration-150 ease-in ' />
      </div>
    </form>
  )
}

export default SearchBar