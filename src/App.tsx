import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

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
	const { activeSong, isPlaying, isModalOpen } = useSelector((state: any) => state.player);

	return (
		<div className="relative block h-screen bg-primary-gradient sm:flex">
			<div id="overlay" className={`w-screen h-screen z-40 backdrop-blur-sm absolute top-0 left-0 ${isModalOpen ? 'block':'hidden'}`}/>
			<Sidebar />
			<div className="flex flex-1 flex-col">
				<Searchbar />
				{/* h-[calc(100vh-72px)] */}
				<div className="hide-scrollbar flex h-screen flex-col md:flex-col-reverse overflow-x-hidden overflow-y-scroll px-6 md:mx-10  xl:flex-col">
					{/* xl:flex-row */}
					<div className="h-fit flex-1 pb-14">
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
