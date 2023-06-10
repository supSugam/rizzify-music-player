import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { Error, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import songsByCountryTestData from "../redux/services/songsByCountryTestData";

const TopCharts: React.FC = () => {
	const { activeSong, isPlaying } = useSelector((state: any) => state.player);

	// const {data:topChartsGlobal, isFetching} = useGetTopChartsQuery();

	const songsDataByCountry = songsByCountryTestData.slice(0, 50);

	return (
		<div className="flex flex-col gap-8 mt-12 mb-8">
			<h2 className="text-3xl font-bold">
				Discover What Everyone is Listening to
			</h2>
			<div className="flex w-96 flex-nowrap justify-around gap-x-8 gap-y-12 overflow-y-hidden overflow-x-scroll sm:w-full sm:flex-wrap md:overflow-hidden hide-scrollbar">
				{songsDataByCountry.map((song, i) => (
					<SongCard
						key={song.key}
						isPlaying={isPlaying}
						activeSong={activeSong}
						song={song}
						data={songsDataByCountry}
						i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default TopCharts;
