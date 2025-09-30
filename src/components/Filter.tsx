import type { MissionItemType } from "../types/MissionItemType";

type FilterProps = {
	missions: MissionItemType[];
	year: string;
	setYear: (year: string) => void;
	successOnly: boolean;
	setSuccessOnly: (val: boolean) => void;
	favOnly: boolean;
	setFavOnly: (val: boolean) => void;
	debouncedHandleSearch: (value: string) => void;
};

const Filter = ({
	missions,
	year,
	setYear,
	successOnly,
	setSuccessOnly,
    favOnly,
    setFavOnly,
	debouncedHandleSearch,
}: FilterProps) => {
	return (
		<div className="grid sm:flex p-4 gap-4 items-center mb-4">
			<select
				value={year}
				onChange={(e) => setYear(e.target.value)}
				className="border p-1"
			>
				{[
					"All",
					...new Set(missions.map((m) => new Date(m.date_utc).getFullYear())),
				].map((y) => (
					<option key={y} value={y}>
						{y}
					</option>
				))}
			</select>

			<label>
				<input
					type="checkbox"
					checked={successOnly}
					onChange={() => setSuccessOnly(!successOnly)}
				/>
				Success Only
			</label>
			<label>
				<input
					type="checkbox"
					checked={favOnly}
					onChange={() => setFavOnly(!favOnly)}
				/>
				Favourites Only
			</label>

			<input
				type="text"
				placeholder="Search Mission"
				onChange={(e) => debouncedHandleSearch(e.target.value)}
				className="border p-1"
			/>
		</div>
	);
};

export default Filter;
