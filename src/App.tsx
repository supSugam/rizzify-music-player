import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleInfoModal, toggleModal } from "./redux/features/playerSlice";
import { Link } from "react-router-dom";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
	ArtistDetails,
	TopArtists,
	AroundYou,
	Discover,
	Search,
	SongDetails,
	TopCharts,
	LikedSongs
} from "./pages";

const App = () => {
	const { activeSong, isPlaying, isModalOpen,isInfoModalOpen } = useSelector((state: any) => state.player);

	const dispatch = useDispatch();

	const handleInfoModal = () => {
		dispatch(toggleInfoModal(!isInfoModalOpen));
		dispatch(toggleModal(!isModalOpen));
	};

	return (
		<div className="relative block h-screen bg-primary-gradient sm:flex">
			<div id="overlay" className={`w-screen h-screen z-40 backdrop-blur-sm absolute top-0 left-0 ${isModalOpen ? 'block':'hidden'}`}/>
			<div id="infoModal" className={`w-[84%] md:w-[25%] h-[40%] z-[60] absolute top-[25%] left-[9%] md:top-[23%] md:left-[37%] bg-black rounded-lg p-8 flex items-center justify-center flex-col gap-10 animate-hoverscale ${isInfoModalOpen ? 'block':'hidden'}`}>
						<h1 className="text-3xl font-bold gradient--text">Not Working Yet</h1>
						<p className="text-xl font-semibold text-center">No implementation for this feature to avoid extra API Calls 🤑</p>
						<Link to='/'>
                        <button onClick={handleInfoModal} className='bg-[#6156f4] text-white text-xl font-semibold px-8 py-2 rounded-md hover:scale-110 transition-all duration-100 uppercase'>Ok Sir</button>
                        </Link>
				</div>
			<Sidebar />
			<div className="flex flex-1 flex-col">
				<Searchbar />
				{/* h-[calc(100vh-72px)] */}
				<div className="hide-scrollbar flex h-screen flex-col md:flex-col-reverse overflow-x-hidden overflow-y-scroll px-6 md:mx-10  xl:flex-col">
					{/* xl:flex-row */}
					<div className="h-fit flex-1 pb-10">
						<Routes>
							<Route path="/" element={<Discover />} />
							<Route path="/top-artists" element={<TopArtists />} />
							<Route path="/top-charts" element={<TopCharts />} />
							<Route path="/around-you" element={<AroundYou />} />
							<Route path="/artists/:id" element={<ArtistDetails />} />
							<Route path="/songs/:songid" element={<SongDetails />} />
							<Route path="/search/:searchTerm" element={<Search />} />
							<Route path="/liked-songs" element={<LikedSongs />} />
						</Routes>
					</div>
					{/* <div className="relative flex min-h-max w-full"> */}
					<div className="">
						<TopPlay />
					</div>
				</div>
			</div>

			{activeSong?.title && (
				<div>
					<MusicPlayer />
				</div>
			)}
		</div>
	);
};

export default App;
