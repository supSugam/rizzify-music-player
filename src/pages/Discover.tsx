import {Error,SongCard,MiniError} from '../components';
import { useDispatch,useSelector } from 'react-redux';

import { genres } from "../assets/constants";
import React,{useRef,useState,useEffect,useCallback} from "react";
import {FiChevronDown} from 'react-icons/fi'

import { toggleModal,selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import {logo_compressed} from '../assets'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GenreSongsComponent:React.FC<{genreListId:any,isPlaying:boolean,activeSong:any}> = ({ genreListId,isPlaying,activeSong }) => {
	const { data: genreData, error: genreError, isFetching } = useGetSongsByGenreQuery(genreListId);
	return (
	genreData?.map((song:any,i:number) => (
		<SongCard key={song.key} isPlaying={isPlaying} activeSong={activeSong} song={song} data={genreData} i={i} />
		))
	);
  };

const Discover: React.FC = () => {
	
	const dispatch = useDispatch();
	const {activeSong,isPlaying,isModalOpen,genreListId,isInfoModalOpen} = useSelector((state:any) => state.player);
	const genreContainer = useRef<HTMLDivElement>(null);

	const handleDropdownBtn = (): void => {
		if (genreContainer.current) {
			genreContainer.current.classList.toggle('genre-dropdown-active');
			genreContainer.current.classList.toggle('genre-dropdown-inactive');
		}
		dispatch(toggleModal(!isModalOpen));
	};
	
	const [activeGenre, setActiveGenre] = useState<string>("POP");
	const [activeGenreText, setActiveGenreText] = useState<string>('Pop🎶');

	const fetchGenre = useCallback(() => {
		dispatch(selectGenreListId(activeGenre));
		}, [activeGenre, dispatch]);
		
		const handleGenreChange = (genre: string, e) => {
		handleDropdownBtn();
		setActiveGenre(genre);
		if (!e.target.classList.contains('genre--item')) {
			setActiveGenreText(e.target.parentElement.textContent);
		} else {
			setActiveGenreText(e?.target?.textContent);
		}
		};
		
		useEffect(() => {
		fetchGenre();
		}, [fetchGenre, genreListId]);

		const [animating, setAnimating] = useState(true);
		useEffect(() => {
			setTimeout(() => {
				setAnimating(false);
			}, 3000);
		}, []);

	return (
		<>
		<div className={`${animating? 'animate-slideup flex':'hidden'} absolute top-0 left-0 z-[99] min-h-screen min-w-full bg-dark-linear items-center justify-center"`}>

			<div className={'hidden md:flex flex-col w-full h-full items-center justify-center relative mb-20'}>
				<LazyLoadImage width={280} effect="blur" className='bg-cover' src={logo_compressed} alt="Rizzify" />
				<h1  className='text-[3rem] font-bold absolute translate-y-[200%] typewriter-text'>Rizzify</h1>
				<svg viewBox='0 0 180 180' className='circleSvg absolute'>
					<circle cx={89.5} cy={93} r={20} fill="transparent" stroke="#fff" strokeWidth={0.1} className='md:on-anim' />
					{/* <circle cx="100" cy="100" r="15%" fill="transparent" stroke="#fff" strokeWidth="0.5" className='' /> */}
				</svg>
			</div>

			<div className='flex md:hidden flex-col w-full h-full items-center justify-center relative mb-20'>
			<LazyLoadImage width={195} effect="blur" className='bg-cover' src={logo_compressed} alt="Rizzify" />
				<h1 className='text-[2rem] font-bold absolute translate-y-[195%] typewriter-text_mb'>Rizzify</h1>
				<svg viewBox='0 0 180 180' className='circleSvg absolute'>
					<circle cx={89.5} cy={97} r={57} fill="transparent" stroke="#fff" strokeWidth={0.3} className='' />
					{/* <circle cx="100" cy="100" r="15%" fill="transparent" stroke="#fff" strokeWidth="0.5" className='' /> */}
				</svg>
			</div>
		</div>
		<div className="flex flex-col">
			{/* {isLoading ? (<MiniError />): */}
			<div className="m-1 mb-12 flex w-full items-center sm:flex-row justify-between ">
				<h2 className="text-center text-[1.6rem] md:text-3xl font-bold sm:text-left">Find your taste</h2>
				<div ref={genreContainer} className="relative md:m-4 flex items-center genre-dropdown-inactive">

					<button onClick={handleDropdownBtn}  className={`flex justify-between gap-2 items-center btn rounded-md bg-[black] bg-opacity-40 p-2 text-xl border-none select-none md:w-48 ${isModalOpen && !isInfoModalOpen && 'z-50'}`}>
						<p className='hidden md:block'>{activeGenreText}</p>
						<p className='block md:hidden'>{activeGenreText.slice(-2)}</p>
						<FiChevronDown/>
					</button>

					<ul className={`bg-gray-950 bg-opacity-80 rounded-lg genre-list ${isModalOpen && !isInfoModalOpen && 'z-50'}`}>
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
					genreListId !=="" && <GenreSongsComponent genreListId={genreListId} isPlaying={isPlaying} activeSong={activeSong}/>
				}
			</div>
		</div>
		</>
	);
};

export default Discover;