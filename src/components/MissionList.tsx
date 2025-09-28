import { useEffect, useState } from "react";
import MissionItem from "./MissionItem";

type Mission = {
	id: string;
	name: string;
	details: string;
	success: boolean;
	date_utc: string;
};

const MissionList = () => {
	const [missions, setMissions] = useState<Mission[]>([]);
	const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]);
	const [successOnly, setSuccessOnly] = useState<boolean>(false);
	const [year, setYear] = useState<string>("All");

	useEffect(() => {
		async function fetchMissions() {
			const response = await fetch("https://api.spacexdata.com/v4/launches");
			const data = await response.json();
			setMissions(data);
			setFilteredMissions(data);
		}
		fetchMissions();
	}, []);

	useEffect(() => {
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

		setFilteredMissions(list);
	}, [missions, year, successOnly]);

	return (
		<>
			<div>
				<select
					onChange={(e) => {
						setYear(e.target.value);
					}}
				>
					{[
						"All",
						...new Set(
							missions.map((mission) =>
								new Date(mission.date_utc).getFullYear()
							)
						),
					].map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>

				<div>
					<label htmlFor="success">Success Only</label>
					<input
						type="checkbox"
						name="success"
						value="success"
						id="success"
						onChange={() => setSuccessOnly(!successOnly)}
					/>
				</div>
			</div>
			<div className="grid grid-cols-4 gap-3">
				{filteredMissions.map((mission) => (
					<MissionItem key={mission.id} {...mission} />
				))}
			</div>
		</>
	);
};

export default MissionList;
