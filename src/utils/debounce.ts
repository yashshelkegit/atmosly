function debounce<T extends (...args: any[]) => void>(fn: T, time = 300) {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, time);
	};
}

export default debounce;
