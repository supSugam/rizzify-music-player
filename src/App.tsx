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
} from "./pages";

const App = () => {
	const { activeSong,isPlaying } = useSelector((state:any) => state.player);

	return (
		<div className="relative block sm:flex h-screen bg-primary-gradient">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				{/* <Searchbar /> */}

				<div className="px-6 h-[calc(100vh-72px)] overflow-x-hidden overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
					<div className="flex-1 h-fit pb-40">
						<Routes>
							<Route path="/" element={<Discover />} />
							<Route path="/top-artists" element={<TopArtists />} />
							<Route path="/top-charts" element={<TopCharts />} />
							<Route path="/around-you" element={<AroundYou />} />
							<Route path="/artists/:id" element={<ArtistDetails />} />
							<Route path="/songs/:songid" element={<SongDetails />} />
							<Route path="/search/:searchTerm" element={<Search />} />
						</Routes>
					</div>
					<div className="xl:sticky relative top-0 h-fit">
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
