import { Home,HomeInactive,Globe,GlobeInactive,Stairs,StairsInactive,Spotify,SpotifyInactive } from "./index";

interface Genre {
	title: string;
	value: string;
	emoji: string;
}

interface Link {
	name: string;
	to: string;
	icon:any
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
	{ name: "Home", to: "/", icon:Home },
	{ name: "Around You", to: "/around-you", icon:Globe },
	{ name: "Top Artists", to: "/top-artists", icon:Stairs },
	{ name: "Popular Now", to: "/top-charts", icon:Spotify },
];

export default Genre;
