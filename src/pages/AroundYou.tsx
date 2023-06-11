import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { SongCard,SongCardSkeleton } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

interface AroundYouProps {}

const AroundYou: React.FC<AroundYouProps> = () => {
	const [country, setCountry] = useState<string>("");
	const [countryCode, setCountryCode] = useState<string>("");
	const [isValidCountry, setIsValidCountry] = useState<boolean>(false);
	const { activeSong, isPlaying } = useSelector((state: any) => state.player);

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
					setCountry(res?.data?.country_name);
					setCountryCode(res?.data?.country_code2);
					setIsValidCountry(true);
				} else {
					setCountryCode("US");
					setIsValidCountry(false);
				}

			})
			.catch((err) => console.log(err))
	}, []);

	const { data:songsDataByCountry,isSuccess} = useGetSongsByCountryQuery(countryCode);

	return (
		<div ref={(div)=> div?.scrollIntoView({behavior: 'smooth',block:'end'})} className="flex flex-col gap-8 mb-8">
			<h2 className="text-3xl font-bold">
				{isValidCountry ? `Top Songs in ${country}` : "Top Songs Around You"}
			</h2>
			<div className="flex w-96 h-full flex-nowrap justify-start md:justify-around gap-x-8 gap-y-12 overflow-y-hidden overflow-x-scroll sm:w-full sm:flex-wrap md:overflow-hidden hide-scrollbar">
				{isSuccess && songsDataByCountry?.map((song:any, i:number) => (
					<SongCard
						key={song.key}
						isPlaying={isPlaying}
						activeSong={activeSong}
						song={song}
						data={songsDataByCountry}
						i={i}
					/>
				))}
				{
				!isSuccess && [...Array(10)].map((i:number) => (
					<SongCardSkeleton key={i} i={i} />
					)
				)
				}
			</div>
		</div>
	);
};

export default AroundYou;