import React,{useRef} from "react";
import axios from 'axios';
import {  useEffect,useState } from "react";

import { ArtistCard } from "../components";
// import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists: React.FC = () => {
	const options = {
		method: 'GET',
		url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
		headers: {
		'X-RapidAPI-Key': '41459ffa84mshedf0d1731254d2ap1a40b7jsnadff3c037d6c',
		'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
		}
	};

	const [topArtistsGlobal,setTopArtistsGlobal] = useState<[]>([]);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo({top:0,behavior:'smooth'});
	const getTopArtistsQuery = async () => {
		try {
			const response = await axios.request(options);
			setTopArtistsGlobal(response.data);
		} catch (error) {
			console.error(error);
		}
		};
	getTopArtistsQuery();
	}, []);

	useEffect(() => {
		divRef.current?.scrollIntoView({behavior:'smooth',block:'nearest'});
	}, [divRef]);

	return (
		<div ref={divRef} className="flex flex-col gap-8 md:mt-12 mt-2 mb-8">
			<h2 className="text-3xl font-bold">
				Discover Top Artists
			</h2>
			<div className="flex w-full h-auto justify-around gap-x-8 gap-y-24 md:gap-x-14 md:gap-y-24 flex-wrap oyerflow-y-scroll">
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
