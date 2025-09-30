import { Link } from "react-router";
import type { MissionItemType } from "../types/MissionItemType";
import { memo } from "react";
// import placeholder from "../assets/placeholder.jpeg";


const MissionItem = memo(({
	id,
	name,
	success,
	date_utc,
	links,
	rocket,
	details,
}: MissionItemType) => {
	return (
		<Link
			to={`${id}`}
			state={{ name, success, date_utc, links, rocket, details }}
		>
			<div
				className={`p-4 border rounded-md border-gray-300 cursor-pointer `}
			>
				{/* <img
					src={links.patch.small || links.patch.large || placeholder}
					alt={name}
				/> */}
                <p>{rocket}</p>
				<p>{name}</p>
				<p>{date_utc.split("T")[0]}</p>
				<p className={`inline-block rounded-md px-2 text-sm ${success ? "bg-green-400" : "bg-red-400"}`}>{success ? "Success" : "Failed"}</p>
			</div>
		</Link>
	);
});

export default MissionItem;
