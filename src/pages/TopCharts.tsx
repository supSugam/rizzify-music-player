import React from "react";
import { useEffect,useRef } from "react";
import axios from 'axios';

import { useSelector } from "react-redux";

import { Error, SongCard } from "../components";

// import songsByCountryTestData from "../redux/services/songsByCountryTestData";
// import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopCharts: React.FC = () => {
	const { activeSong, isPlaying } = useSelector((state: any) => state.player);

	const options = {
		method: 'GET',
		url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
		headers: {
		'X-RapidAPI-Key': '91410e5a11msh65b992a9150ca2ep1c78ebjsn2feeb0f104b0',
		'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
		}
	};

		const topChartsGlobalRef = useRef(null);

		useEffect(() => {
			const getTopChartsQuery = async () => {
			try {
				const response = await axios.request(options);
				topChartsGlobalRef.current = response.data;
			} catch (error) {
				console.error(error);
			}
			};
		
			getTopChartsQuery();
		}, []);

	return (
		<div className="flex flex-col gap-8 mt-6 mb-8">
			<h2 className="text-3xl font-bold">
				Discover What Everyone is Listening to
			</h2>
			<div className="flex w-96 flex-nowrap justify-start md:justify-around gap-x-8 gap-y-12 overflow-y-hidden overflow-x-scroll sm:w-full sm:flex-wrap md:overflow-hidden hide-scrollbar">
				{topChartsGlobalRef?.current?.map((song:any, i:number) => (
					<SongCard
						key={song.key}
						isPlaying={isPlaying}
						activeSong={activeSong}
						song={song}
						data={topChartsGlobalRef.current}
						i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default TopCharts;
