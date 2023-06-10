import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


import { ArtistCard, Error, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import songsByCountryTestData from "../redux/services/songsByCountryTestData";

const TopArtists: React.FC = () => {
	// const {data:topChartsGlobal, isFetching} = useGetTopChartsQuery()

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const songsDataByCountry = songsByCountryTestData.filter((track)=> track.hasOwnProperty('artists')).slice(0, 20)

	return (
		<div className="flex flex-col gap-8 md:mt-12 mt-2 mb-8">
			<h2 className="text-3xl font-bold">
				Discover Top Artists
			</h2>
			<div className="flex w-full h-auto justify-around gap-x-8 gap-y-24 md:gap-x-14 md:gap-y-24 flex-wrap">
				{songsDataByCountry.map((track, i) => (
					<ArtistCard
					forSearch={false}
					key={track.key}
					track={track}
					i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default TopArtists;
