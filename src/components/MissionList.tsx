import { useEffect, useState } from "react";
import MissionItem from "./MissionItem";
import debounce from "../utils/debounce";
import type { MissionItemType } from "../types/MissionItemType";
import Fallback from "./Fallback";
import Filter from "./Filter";
import Loading from "./Loading";

const MissionList = () => {
	const [missions, setMissions] = useState<MissionItemType[]>([]);
	const [filteredMissions, setFilteredMissions] = useState<MissionItemType[]>(
		[]
	);
	const [successOnly, setSuccessOnly] = useState<boolean>(false);
	const [favOnly, setfavOnly] = useState<boolean>(false);
	const [year, setYear] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);


	useEffect(() => {
		async function fetchMissions() {
			const response = await fetch("https://api.spacexdata.com/v4/launches");
			const data = await response.json();
			setMissions(data);
			setFilteredMissions(data);
		}
		fetchMissions();
    setLoading(false);
	}, []);

	useEffect(() => {
    setLoading(true);
		let list = missions;

		if (year !== "All") {
			list = list.filter(
				(mission) =>
					new Date(mission.date_utc).getFullYear().toString() === year
			);
		}

		if (successOnly) {
			list = list.filter((mission) => mission.success);
		}
    if(favOnly){
      const favs = getFavs();
      list = list.filter(mission => favs.includes(mission.id))
    }

		setFilteredMissions(list);
    setLoading(false);
	}, [missions, year, successOnly, favOnly]);

	function handleSearch(query: string) {
    setLoading(true);
		let list = missions;

		if (year !== "All") {
			list = list.filter(
				(mission) =>
					new Date(mission.date_utc).getFullYear().toString() === year
			);
		}

		if (successOnly) {
			list = list.filter((mission) => mission.success);
		}
    if(favOnly){
      const favs = getFavs();
      list = list.filter(mission => favs.includes(mission.id))
    }
		const lowerQuery = query.toLowerCase();
		if (lowerQuery === "") {
			setFilteredMissions(list);
      setLoading(false);
			return;
		}
		list = list.filter((mission) =>
			mission.name.toLowerCase().includes(lowerQuery)
		);
		setFilteredMissions(list);
    setLoading(false);
	}
	const debouncedHandleSearch = debounce(handleSearch, 700);

  function getFavs(){
    const stored = localStorage.getItem("favourites");
    const favs = (stored) ? JSON.parse(stored) : [];

    return favs
  }

  if(loading){
    return <Loading />
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
				setFavOnly={setfavOnly}
				debouncedHandleSearch={debouncedHandleSearch}
			/>

			{(loading) ? <Loading /> : filteredMissions.length === 0 || missions.length === 0 ? (
				<Fallback message="No Missions Found" />
			) : (
				<div 
          className={`grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3
          
          `}>
					{filteredMissions.map((mission) => (
						<MissionItem key={mission.id} {...mission} />
					))}
				</div>
			)}
		</>
	);
};

export default MissionList;
