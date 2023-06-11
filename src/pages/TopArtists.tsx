import React from "react";
import axios from 'axios';
import {  useEffect,useState } from "react";

import { ArtistCard } from "../components";
// import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists: React.FC = () => {
	const options = {
		method: 'GET',
		url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
		headers: {
		'X-RapidAPI-Key': '91410e5a11msh65b992a9150ca2ep1c78ebjsn2feeb0f104b0',
		'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
		}
	};

	const [topArtistsGlobal,setTopArtistsGlobal] = useState<[]>([]);

	useEffect(() => {
	const getTopArtistsQuery = async () => {
		try {
			const response = await axios.request(options);
			setTopArtistsGlobal(response.data);
		} catch (error) {
			console.error(error);
		}
		};
	getTopArtistsQuery();
	window.scrollTo(0, 0);
	}, []);

	return (
		<div className="flex flex-col gap-8 md:mt-12 mt-2 mb-8">
			<h2 className="text-3xl font-bold">
				Discover Top Artists
			</h2>
			<div className="flex w-full h-auto justify-around gap-x-8 gap-y-24 md:gap-x-14 md:gap-y-24 flex-wrap">
				{topArtistsGlobal?.map((track:any, i:number) => (
					track.hasOwnProperty('artists')&&
					<ArtistCard
					forSearch={false}
					key={track.key }
					track={track}
					i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default TopArtists;
