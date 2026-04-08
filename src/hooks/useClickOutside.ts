import { useEffect, useEffectEvent, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
	const ref = useRef<T>(null);

	const onClickOutside = useEffectEvent(() => {
		callback();
	});

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClickOutside();
			}
		};

		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	return ref;
}
