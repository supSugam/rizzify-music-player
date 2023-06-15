import React from "react";
import { useEffect,useState } from "react";
import axios from 'axios';

import { useSelector } from "react-redux";

import {SongCard,SongCardSkeleton } from "../components";

// import songsByCountryTestData from "../redux/services/songsByCountryTestData";
// import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopCharts: React.FC = () => {
	const { activeSong, isPlaying } = useSelector((state: any) => state.player);

	const options = {
		method: 'GET',
		url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
		headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_RIZZIFY_API_KEY_3,
		'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
		}
	};

		const [topChartsGlobal,setTopChartsGlobal] = useState<any>([]);

		useEffect(() => {
			window.scrollTo({top:0,behavior:'smooth'});
			const getTopChartsQuery = async () => {
			try {
				const response = await axios.request(options);
				setTopChartsGlobal(response.data);
			} catch (error) {
				console.error(error);
			}
			};
		
			getTopChartsQuery();
		}, []);
		// const divRef = useRef<HTMLDivElement>(null);

		// useEffect(() => {
		// 	divRef.current?.scrollIntoView({behavior:'smooth',block:'nearest'});
		// }, [divRef]);	

	return (
		<div className="flex flex-col gap-8 mt-6 mb-8">
			<h2 className="text-2xl animate-slideleft sm:text-3xl font-bold">
				Discover What Everyone is Listening to
			</h2>
			<div className="flex w-96 flex-nowrap justify-start md:justify-around gap-x-8 gap-y-12 overflow-y-hidden sm:w-full sm:flex-wrap md:overflow-hidden hide-scrollbar">
				{
				topChartsGlobal && (topChartsGlobal.map((song:any, i:number) => (
					<SongCard
						key={song.key}
						isPlaying={isPlaying}
						activeSong={activeSong}
						song={song}
						data={topChartsGlobal}
						i={i}
					/>
				)))
				}
				{
				topChartsGlobal < 30 && [...Array(10)].map((i:number) => (
					<SongCardSkeleton key={i} i={i} />
				))
				}
			</div>
		</div>
	);
};

export default TopCharts;
