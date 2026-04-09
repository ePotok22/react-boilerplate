import { useState } from "react";

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (globalThis.window === undefined) {
			return initialValue;
		}
		try {
			const item = globalThis.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = (value: T | ((prev: T) => T)) => {
		setStoredValue((prev) => {
			const nextValue =
				typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
			try {
				globalThis.localStorage.setItem(key, JSON.stringify(nextValue));
			} catch {}
			return nextValue;
		});
	};

	return [storedValue, setValue];
}
