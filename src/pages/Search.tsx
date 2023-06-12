import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { SongCard,ArtistCard, SongCardSkeleton } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

// import songsByCountryTestData from "../redux/services/songsByCountryTestData";

const Search: React.FC = () => {

  const { searchTerm } = useParams();
	const { activeSong, isPlaying } = useSelector((state: any) => state.player);

	const {data,isFetching,isSuccess} = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks.hits?.map((song: any) => song.track);
  const artists = data?.artists.hits?.map((artist: any) => artist.artist);

  useEffect(() => {
	window.scrollTo({top:0,behavior:'smooth'});
}, []);

	return (
		<div className="flex flex-col gap-8 mt-6 md:mt-0 mb-8">
			<h2 className="text-3xl font-bold">
				Search Results for <span className="italic">{`'${searchTerm}'`}</span>
			</h2>
			<div className="flex w-96 flex-nowrap justify-start md:justify-around gap-x-8 gap-y-12 overflow-y-hidden overflow-x-scroll sm:w-full sm:flex-wrap md:overflow-hidden hide-scrollbar">
				{isSuccess && songs?.map((song:any, i:number) => (
					<SongCard
						key={song.key}
						isPlaying={isPlaying}
						activeSong={activeSong}
						song={song}
						data={songs}
						i={i}
					/>
				))}
				{
					isFetching && [...Array(10)].map((i)=>(<SongCardSkeleton key={i}/>))
				}
			</div>
      <div className="flex mt-10 w-full h-auto justify-around gap-x-8 gap-y-24 md:gap-x-14 md:gap-y-24 flex-wrap">
				{isSuccess && artists?.map((track:any, i:number) => (
					<ArtistCard
          forSearch={true}
					key={track.key}
					track={track}
					i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default Search;
