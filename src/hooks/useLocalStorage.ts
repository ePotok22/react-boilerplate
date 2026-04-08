import { useState } from "react";

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === "undefined") {
			return initialValue;
		}
		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = (value: T | ((prev: T) => T)) => {
		setStoredValue((prev) => {
			const nextValue = value instanceof Function ? value(prev) : value;
			try {
				window.localStorage.setItem(key, JSON.stringify(nextValue));
			} catch {}
			return nextValue;
		});
	};

	return [storedValue, setValue];
}
