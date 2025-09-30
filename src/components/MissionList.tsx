import { useEffect, useState, useMemo, useCallback } from "react";
import MissionItem from "./MissionItem";
import debounce from "../utils/debounce";
import type { MissionItemType } from "../types/MissionItemType";
import Fallback from "./Fallback";
import Filter from "./Filter";
import Loading from "./Loading";

const MissionList = () => {
	const [missions, setMissions] = useState<MissionItemType[]>([]);
	const [successOnly, setSuccessOnly] = useState(false);
	const [favOnly, setFavOnly] = useState(false);
	const [year, setYear] = useState("All");
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchMissions() {
			const response = await fetch("https://api.spacexdata.com/v4/launches");
			const data = await response.json();
			setMissions(data);
			setLoading(false);
		}
		fetchMissions();
	}, []);

	function getFavs() {
		const stored = localStorage.getItem("favourites");
		return stored ? JSON.parse(stored) : [];
	}

	const filteredMissions = useMemo(() => {
		if (missions.length === 0) return [];

		let list = [...missions];

		if (year !== "All") {
			list = list.filter(
				(mission) =>
					new Date(mission.date_utc).getFullYear().toString() === year
			);
		}

		if (successOnly) {
			list = list.filter((mission) => mission.success);
		}

		if (favOnly) {
			const favs = getFavs();
			list = list.filter((mission) => favs.includes(mission.id));
		}

		if (search.trim() !== "") {
			const lowerQuery = search.toLowerCase();
			list = list.filter((mission) =>
				mission.name.toLowerCase().includes(lowerQuery)
			);
		}

		return list;
	}, [missions, year, successOnly, favOnly, search]);

	const debouncedHandleSearch = useCallback(
		debounce((query: string) => {
			setSearch(query);
		}, 700),
		[]
	);

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<Filter
				missions={missions}
				year={year}
				setYear={setYear}
				successOnly={successOnly}
				setSuccessOnly={setSuccessOnly}
				favOnly={favOnly}
				setFavOnly={setFavOnly}
				debouncedHandleSearch={debouncedHandleSearch}
			/>

			{filteredMissions.length === 0 ? (
				<Fallback message="No Missions Found" />
			) : (
				<div className="grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
					{filteredMissions.map((mission) => (
						<MissionItem key={mission.id} {...mission} />
					))}
				</div>
			)}
		</>
	);
};

export default MissionList;
