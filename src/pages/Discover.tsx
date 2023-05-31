// import {Error,SongCard} from '../components';
import { genres } from "../assets/constants";
import React from "react";

const Discover: React.FC = () => {
	console.log(genres);
	return (
		<div className="flex flex-col">
			<div className="m m-1 mb-10 mt-4 flex w-full flex-col items-center sm:flex-row">
				{/* justify-between  */}
				<h2 className="text-left text-3xl font-bold">Discover</h2>
				<div className="relative m-4 flex items-center">
					<button className="radius btn rounded-md bg-[black] bg-opacity-40 p-2 text-xl border-none">
						Select Genre
					</button>
					
				</div>
			</div>
		</div>
	);
};

export default Discover;
