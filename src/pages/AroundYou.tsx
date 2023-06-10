import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { Error, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

import songsByCountryTestData from "../redux/services/songsByCountryTestData";

interface AroundYouProps {}

const AroundYou: React.FC<AroundYouProps> = () => {
	const [country, setCountry] = useState<string>("");
	const [isValidCountry, setIsValidCountry] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const { activeSong, isPlaying } = useSelector((state: any) => state.player);

	// const {data:songsDataByCountry, isFetching:isFetchingSongsByCountry} = useGetSongsByCountryQuery(country)

	// useEffect(()=>{
	// axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_S9U5BOX152LEJZckYF8uPpKX39TBb')
	// .then((res)=>setCountry(res?.data?.location?.country))
	// .catch((err)=> console.log(err))
	// .finally(()=> setLoading(false))
	// console.log(country)
	// },[country])

	const validCountries: string[] = [
		"DZ",
		"BY",
		"CI",
		"SN",
		"TN",
		"AU",
		"AT",
		"AZ",
		"AR",
		"BE",
		"BG",
		"BR",
		"GB",
		"HU",
		"VE",
		"VN",
		"GH",
		"DE",
		"GR",
		"DK",
		"EG",
		"ZM",
		"IL",
		"IN",
		"ID",
		"IE",
		"ES",
		"IT",
		"KZ",
		"CM",
		"CA",
		"KE",
		"CN",
		"CO",
		"CR",
		"MY",
		"MA",
		"MX",
		"MZ",
		"NG",
		"NL",
		"NZ",
		"NO",
		"AE",
		"PE",
		"PL",
		"PT",
		"RU",
		"RO",
		"SA",
		"SG",
		"US",
		"TH",
		"TZ",
		"TR",
		"UG",
		"UZ",
		"UA",
		"UY",
		"PH",
		"FI",
		"FR",
		"HR",
		"CZ",
		"CL",
		"CH",
		"SE",
		"ZA",
		"KR",
		"JP",
	];

	useEffect(() => {
		axios
			.get(
				"https://api.ipgeolocation.io/ipgeo?apiKey=9051c2bc7f8b446bbdd880829a36475c"
			)
			.then((res) => {
				if (validCountries.includes(res?.data?.country_code2)) {
					setCountry(res?.data?.country_code2);
					setIsValidCountry(true);
				} else {
					setCountry("US");
					setIsValidCountry(false);
				}
				setCountry(res?.data?.country_name);
				console.log(res?.data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [country]);

	const songsDataByCountry = songsByCountryTestData.slice(0, 10);

	return (
		<div className="flex flex-col gap-8 mt-12 mb-8">
			<h2 className="text-3xl font-bold">
				{isValidCountry ? `Top Songs in ${country}` : "Top Songs Around You"}
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

export default AroundYou;