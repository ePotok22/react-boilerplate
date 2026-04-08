import gsap from "gsap";
import { type RefObject, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

interface StaggerRevealOptions {
	duration?: number;
	stagger?: number;
	ease?: string;
	y?: number;
	x?: number;
	opacity?: number;
	scale?: number;
	rotation?: number;
}

export function useStaggerReveal<T extends HTMLElement>(
	options?: StaggerRevealOptions,
): RefObject<T | null> {
	const ref = useRef<T>(null);
	const {
		duration = 0.6,
		stagger = 0.08,
		ease = "power3.out",
		y = 30,
		x = 0,
		opacity = 0,
		scale = 1,
		rotation = 0,
	} = options ?? {};

	useGSAP(
		() => {
			if (!ref.current?.children.length) {
				return;
			}

			gsap.from(ref.current.children, {
				duration,
				ease,
				opacity,
				rotation,
				scale,
				stagger,
				x,
				y,
			});
		},
		{ scope: ref },
	);

	return ref;
}
