import { useState, useEffect } from "react";

function useFavourite(id: string){
    const [isFav, setIsFav] = useState<boolean>(false);
	const [favourites, setfavourites] = useState<string[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem("favourites");
		const favs = stored ? JSON.parse(stored) : [];
		const exists = favs.some((fav: string) => fav === id);
		if (exists) {
			setIsFav(true);
		}
		setfavourites(favs);
	}, [id]);

    return {isFav, setIsFav, favourites, setfavourites}
}
export default useFavourite;