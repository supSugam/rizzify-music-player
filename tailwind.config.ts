/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				black: "#111111",
				indigo: "#3730a3",
				violet: "#845ef7",
				darkblue: "#0f172a",
			},
			backgroundImage: {
				// "primary-gradient": "linear-gradient(30deg,rgba(55, 48, 163, 1)0%,rgba(132, 94, 247, 1) 100%)",
				"primary-gradient": "linear-gradient(0deg, rgba(14,25,42,1) 0%, rgba(46,16,101,1) 100%)",
				// "dark-gradient": "linear-gradient(0deg, rgba(14,25,42,1) 0%, rgba(4,7,13,1) 100%)",
				"dark-linear": "radial-gradient(circle, rgba(38,21,94,1) 0%, rgba(8,6,37,1) 53%, rgba(11,10,18,1) 100%)",
				"dark-gradient": "linear-gradient(0deg, rgba(38,21,94,1) 0%, rgba(8,6,37,1) 53%, rgba(11,10,18,1) 100%)",
				"fade-gradient":"linear-gradient(90deg, rgba(8,6,37,1) 0%, rgba(8,6,37,0.7478641114648985) 100%)"
			},
			animation: {
				slideup: "slideup 1s ease-in-out",
				slidedown: "slidedown 1s ease-in-out",
				slideleft: "slideleft 1s ease-in-out",
				slideright: "slideright 1s ease-in-out",
				wave: "wave 1.2s linear infinite",
				slowfade: "slowfade 2.2s ease-in-out",
				hoverscale: "hoverscale 0.2s ease-out",
				musicwavesLg: "musicwavesLg 1.2s linear infinite",
				musicwavesPh: "musicwavesPh 1.2s linear infinite",
				textreveal: "textreveal 8s linear infinite",
				borderRadius: "borderRadius 2s linear infinite",
			},
			keyframes: {
				slowfade: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				slideup: {
					from: { opacity: 0, transform: "translateY(25%)" },
					to: { opacity: 1, transform: "none" },
				},
				slidedown: {
					from: { opacity: 1, top: "0" },
					to: { opacity: 0, top: "100%" },
				},
				// slidedown: {
				// 	from: { opacity: 0, transform: "translateY(-25%)" },
				// 	to: { opacity: 1, transform: "none" },
				// },
				slideleft: {
					from: { opacity: 0, transform: "translateX(-20px)" },
					to: { opacity: 1, transform: "translateX(0)" },
				},
				slideright: {
					from: { opacity: 0, transform: "translateX(20px)" },
					to: { opacity: 1, transform: "translateX(0)" },
				},
				wave: {
					"0%": { transform: "scale(0)" },
					"50%": { transform: "scale(1)" },
					"100%": { transform: "scale(0)" },
				},
				hoverscale: {
					"0%": { transform: "scale(0)" },
					"100%": { transform: "scale(1)" },
				},
				musicwavesLg:{
					"50%":{
						height: "0.70rem",
					},
					"100%":{
						height: "1.75rem",
					}
				},
				musicwavesPh:{
					"50%":{
						height: "0.30rem",
					},
					"100%":{
						height: "0.75rem",
					},
				},
				textreveal: {
					"0%": {
						transform: "translateX(0)",
					},
					"20%": {
						transform: "translateX(0)", // Wow, I'm smart 😎
					},
					"100%": {
						transform: "translateX(-50%)",
					}
				},
				borderRadius:{
					"0%": {
					borderRadius: "57% 42% 40% 100% / 50% 50% 50% 50%"
					},
					"25%": {
						borderRadius: "40% 57% 100% 42% / 50% 50% 50% 50%",
					},
					"50%": {
						borderRadius: "100% 40% 42% 57% / 50% 50% 50% 50%",
					},
					"75%": {
						borderRadius: "42% 100% 57% 40% / 50% 50% 50% 50%",
					}
				}
			},
		},
	},
};
