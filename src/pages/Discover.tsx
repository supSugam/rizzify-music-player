// import {Error,SongCard} from '../components';
import { genres } from "../assets/constants";
import React,{useRef} from "react";
import {FiChevronDown} from 'react-icons/fi'

import { useState,useMemo } from "react";

// import SongCard from "../components/SongCard";

const Discover: React.FC = () => {
	const genreContainer = useRef<HTMLDivElement>(null);
	const [genre, setGenre] = useState<string>('');

	const handleDropdownBtn = (): void => {
		if (genreContainer.current) {
			genreContainer.current.classList.toggle('genre-dropdown-active');
			genreContainer.current.classList.toggle('genre-dropdown-inactive');
		}
	};

	const fetchGenre = ():string => {
		console.log(genre);
		return genre;
	};

	const handleGenreChange = useMemo(() => {
		return fetchGenre();
		},[genre]);
	
	return (
		<div className="flex flex-col">
			<div className="m-1 mb-10 mt-4 flex w-full flex-col items-center sm:flex-row justify-between ">
				<h2 className="text-left text-3xl font-bold">Find your taste</h2>
				<div ref={genreContainer} className="relative m-4 flex items-center genre-dropdown-inactive">

					<button onClick={handleDropdownBtn}  className="flex justify-between gap-2 items-center btn rounded-md bg-[black] bg-opacity-40 p-2 text-xl border-none select-none">
						Select Genre
						<FiChevronDown/>
					</button>

					<ul className="bg-gray-950 bg-opacity-60 rounded-lg genre-list">
						{
							genres.map((genre) => (
								<li key={genre.value} onClick={() => setGenre(genre.value)} className={`bg-gray-950 p-2 rounded-2xl pl-3 border-white border-2 border-opacity-10 bg-opacity-70 genre-item cursor-pointer hover:border-opacity-20 hover:bg-opacity-40 select-none active:bg-black active:border-opacity-70 ${
									genre.value === '' ? 'bg-primary-gradient border-opacity-30' : ''
								}`}>{genre.title}<span>{genre.emoji}</span></li>
							))
						}
						</ul>

				</div>
			</div>
			<div className="flex flex-wrap sm:justify-start justify-center gap-8">
				{/* {
					[1,2,3,4,5,6,7,8,9,10,11,12].map((song,index) => (
						<SongCard key={song.key} song={song} index={index} />
					));
				} */}
			</div>
		</div>
	);
};

export default Discover;
