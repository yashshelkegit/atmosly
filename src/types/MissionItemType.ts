type MissionItemType = {
	id: string;
	name: string;
	details: string;
	success: boolean;
	date_utc: string;
	rocket: string;
	links: {
		patch: {
			small: string;
			large: string;
		};
		webcast: string;
	wikipedia: string;
	};
};

export type { MissionItemType };
