import { useLocation, useParams } from "react-router";
import placeholder from "../assets/placeholder.jpeg";
import type { MissionItemType } from "../types/MissionItemType";

import useFavourite from "../hooks/useFavourite";

const MissionDetails = () => {
	const { id } = useParams();

	const { name, details, success, date_utc, links, rocket }: MissionItemType =
		useLocation().state;

	const {isFav, setIsFav, setfavourites} = useFavourite(id!);

	function favouriteHandler() {
		setfavourites((prevFavs) => {
			let updated: string[];
			if (isFav) {
				updated = prevFavs.filter((fav) => fav !== id);
				setIsFav(false);
				// alert("Removed from favourites");
			} else {
				updated = [...prevFavs, id!];
				setIsFav(true);
				// alert("Added to favourites");
			}
			localStorage.setItem("favourites", JSON.stringify(updated));
			return updated;
		});
	}

	return (
		<div className="p-4 grid gap-4">
			<div className="w-48">
				<img src={links.patch.small || links.patch.large || placeholder} />
			</div>
			<h2 className="text-lg font-bold">Mission Details of {id}</h2>
            <div className="flex gap-4">

			<p className={`place-self-start rounded-md px-2 text-sm ${success ? "bg-green-400" : "bg-red-400"}`}>{success ? "Success" : "Failed"}</p>
			<button
				className="place-self-start rounded-md px-2 text-sm  bg-amber-800 text-white cursor-pointer"
				onClick={favouriteHandler}
			>
				{isFav ? "Remove from favourites" : "Add to favourites"}
			</button>
            </div>
			<p>{name}</p>
			<p>{rocket}</p>
			<p>{details}</p>
			<p>{date_utc.split("T")[0]}</p>
			<div className="text-blue-500">
				<a href={links.wikipedia} target="_blank" rel="noreferrer">
					{links.wikipedia}
				</a>
				<br />
				<a href={links.webcast} target="_blank" rel="noreferrer">
					{links.webcast}
				</a>
			</div>
		</div>
	);
};

export default MissionDetails;
