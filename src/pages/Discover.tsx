import {Error,SongCard,MiniError} from '../components';
import { useDispatch,useSelector } from 'react-redux';

import { genres } from "../assets/constants";
import React,{useRef,useState,useEffect,useCallback} from "react";
import {FiChevronDown} from 'react-icons/fi'
import testData from '../redux/services/testData'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toggleModal } from '../redux/features/playerSlice';

// import SongCard from "../components/SongCard";

const Discover: React.FC = () => {
	const dispatch = useDispatch();
	const {activeSong,isPlaying,isModalOpen} = useSelector((state:any) => state.player);
	const genreContainer = useRef<HTMLDivElement>(null);
	const [isLoading,setIsLoading] = useState<boolean>(true);

	const handleDropdownBtn = (): void => {
		if (genreContainer.current) {
			genreContainer.current.classList.toggle('genre-dropdown-active');
			genreContainer.current.classList.toggle('genre-dropdown-inactive');
		}
		dispatch(toggleModal(!isModalOpen));
	};
	const [activeGenre, setActiveGenre] = useState<string>('Pop');
	const [activeGenreText, setActiveGenreText] = useState<string>('Pop🎶');

	const data = testData.slice(0,5)

	const fetchGenre = useCallback((): string => {
		console.log(activeGenre);
		return activeGenre;
	}, [activeGenre]);

	const handleGenreChange = (genre:string = 'Pop',e) => {
		handleDropdownBtn();
		if(activeGenre === genre) return;
		setActiveGenre(genre);
		if(!e.target.classList.contains('genre--item')){
			setActiveGenreText(e.target.parentElement.textContent)
		} else{
		setActiveGenreText(e?.target?.textContent);
		}
	};

	useEffect(() => {
		fetchGenre();
	}, [activeGenre]);
	
	return (
		<div className="flex flex-col">
			{/* {isLoading ? (<MiniError />): */}
			<div className="m-1 mb-12 flex w-full items-center sm:flex-row justify-between ">
				<h2 className="text-center text-3xl font-bold sm:text-left">Find your taste</h2>
				<div ref={genreContainer} className="relative md:m-4 flex items-center genre-dropdown-inactive">

					<button onClick={handleDropdownBtn}  className={`flex justify-between gap-2 items-center btn rounded-md bg-[black] bg-opacity-40 p-2 text-xl border-none select-none md:w-48 ${isModalOpen && 'md:z-50'}`}>
						<p className='hidden md:block'>{activeGenreText}</p>
						<p className='block md:hidden'>{activeGenreText.slice(-2)}</p>
						<FiChevronDown/>
					</button>

					<ul className={`bg-gray-950 bg-opacity-60 rounded-lg genre-list ${isModalOpen && 'z-50'}`}>
						{
							genres.map((genre) => (
								<li onClick={(e) => handleGenreChange(genre.value,e)} key={genre.value} className='bg-gray-950 p-2 rounded-2xl pl-3 border-white border-2 border-opacity-10 bg-opacity-70 genre-item cursor-pointer hover:border-opacity-20 hover:bg-opacity-40 select-none active:bg-black active:border-opacity-70 genre--item'>{genre.title}<span>{genre.emoji}</span>
								</li>
							))
						}
						</ul>

				</div>
			</div>
			<div className="flex w-96 flex-nowrap overflow-x-scroll md:overflow-hidden justify-start gap-x-8 gap-y-12 overflow-y-hidden sm:w-full sm:flex-wrap md:justify-around hide-scrollbar">

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
