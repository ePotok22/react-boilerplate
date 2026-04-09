import { type RefObject, useRef, useState } from "react";
import { useGSAP } from "@/hooks/useGSAP";

interface UseGsapAnimationReturn<T extends HTMLElement> {
	containerRef: RefObject<T | null>;
	playing: boolean;
	play: () => void;
}

export function useGsapAnimation<T extends HTMLElement = HTMLDivElement>(
	animationFn: (container: T, done: () => void) => void,
): UseGsapAnimationReturn<T> {
	const containerRef = useRef<T>(null);
	const [playing, setPlaying] = useState(false);
	const animationRef = useRef(animationFn);
	animationRef.current = animationFn;
	const { contextSafe } = useGSAP({ scope: containerRef });

	const play = contextSafe(() => {
		if (playing || !containerRef.current) {
			return;
		}
		setPlaying(true);
		animationRef.current(containerRef.current, () => setPlaying(false));
	});

	return { containerRef, play, playing };
}
