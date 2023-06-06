import {Error,SongCard,MiniError} from '../components';
import { useDispatch,useSelector } from 'react-redux';

import { genres } from "../assets/constants";
import React,{useRef,useState} from "react";
import {FiChevronDown} from 'react-icons/fi'
import testData from '../redux/services/testData'
import Skeleton from 'react-loading-skeleton'
import Tilt from "react-parallax-tilt"
import 'react-loading-skeleton/dist/skeleton.css'

// import { useState,useMemo,useEffect,useCallback } from "react";

// import SongCard from "../components/SongCard";

const Discover: React.FC = () => {
	const dispatch = useDispatch();
	const {activeSong,isPlaying} = useSelector((state:any) => state.player);
	const genreContainer = useRef<HTMLDivElement>(null);
	const [isLoading,setIsLoading] = useState<boolean>(true);
	// const [genre, setGenre] = useState<string>('');

	const handleDropdownBtn = (): void => {
		if (genreContainer.current) {
			genreContainer.current.classList.toggle('genre-dropdown-active');
			genreContainer.current.classList.toggle('genre-dropdown-inactive');
		}
	};
	const data = testData.slice(0,5)

	// const fetchGenre = useCallback((): string => {
	// 	console.log(genre);
	// 	return genre;
	// }, [genre]);

	// const handleGenreChange = () => {
	// 	fetchGenre();
	// };

	// useEffect(() => {
	// 	handleGenreChange();
	// }, [genre]);
	
	return (
		<div className="flex flex-col">
			{/* {isLoading ? (<MiniError />): */}
			<div className="m-1 mb-10 mt-4 flex flex-wrap w-full flex-col items-center sm:flex-row justify-center sm:justify-between ">
				<h2 className="text-center text-3xl font-bold sm:text-left">Find your taste</h2>
				<div ref={genreContainer} className="relative m-4 flex items-center genre-dropdown-inactive">

					<button onClick={handleDropdownBtn}  className="flex justify-between gap-2 items-center btn rounded-md bg-[black] bg-opacity-40 p-2 text-xl border-none select-none">
						Select Genre
						<FiChevronDown/>
					</button>

					<ul className="bg-gray-950 bg-opacity-60 rounded-lg genre-list z-10">
						{
							genres.map((genre) => (
								<li /*>onClick={() => setGenre(genre.value)}*/ key={genre.value} className={`bg-gray-950 p-2 rounded-2xl pl-3 border-white border-2 border-opacity-10 bg-opacity-70 genre-item cursor-pointer hover:border-opacity-20 hover:bg-opacity-40 select-none active:bg-black active:border-opacity-70 ${
									genre.value === '' ? 'bg-primary-gradient border-opacity-30' : ''
								}`}>{genre.title}<span>{genre.emoji}</span>
								</li>
							))
						}
						</ul>

				</div>
			</div>
			<div className="flex w-96 flex-nowrap overflow-x-scroll md:overflow-hidden justify-start gap-x-6 gap-y-12 overflow-y-hidden sm:w-full sm:flex-wrap">

				{
					data.map((song,i) => (
						<SongCard key={song.key} isPlaying={isPlaying} activeSong={activeSong} song={song} data={testData} i={i} />
						))
					}
			</div>
		</div>
	);
};

export default Discover;
