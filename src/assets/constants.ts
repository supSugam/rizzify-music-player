import React from "react";
import {
	HiOutlineHashtag,
	HiOutlineHome,
	HiOutlinePhotograph,
	HiOutlineUserGroup,
} from "react-icons/hi";

interface Genre {
	title: string;
	value: string;
	emoji: string;
}

interface Link {
	name: string;
	to: string;
	icon: React.ComponentType;
}

export const genres: Genre[] = [
	{ title: "Pop", value: "POP", emoji: "🎶" },
	{ title: "Worldwide", value: "WORLDWIDE", emoji: "🌎" },
	
	{ title: "Film", value: "FILM_TV", emoji: "🎬" },
	{ title: "Rock", value: "ROCK", emoji: "🤘" },
	{ title: "Hip-Hop", value: "HIP_HOP_RAP", emoji: "🎤" },
	{ title: "Soul", value: "SOUL_RNB", emoji: "🎵" },
	{ title: "Reggae", value: "REGGAE_DANCE_HALL", emoji: "🌴" },
	{ title: "Country", value: "COUNTRY", emoji: "🤠" },
	{ title: "Latin", value: "LATIN", emoji: "🌍" },
	{ title: "Dance", value: "DANCE", emoji: "💃" },
	{ title: "K-Pop", value: "K_POP", emoji: "🇰🇷" },
	{ title: "House", value: "HOUSE", emoji: "🏠" },
	{ title: "Electronic", value: "ELECTRONIC", emoji: "🎧" },
	{ title: "Alternative", value: "ALTERNATIVE", emoji: "🎸" },
	{ title: "For You", value: "", emoji: "❤️" },
  ];
  
export const links: Link[] = [
	{ name: "Discover", to: "/", icon: HiOutlineHome },
	{ name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
	{ name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
	{ name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];
