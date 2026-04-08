import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxOptions {
	speed?: number;
	direction?: "vertical" | "horizontal";
	triggerRef?: RefObject<HTMLElement | null>;
}

export function useParallax<T extends HTMLElement>(
	options?: ParallaxOptions,
): RefObject<T | null> {
	const ref = useRef<T>(null);
	const { speed = 0.3, direction = "vertical", triggerRef } = options ?? {};

	useGSAP(
		() => {
			if (!ref.current) {
				return;
			}

			const prop = direction === "vertical" ? "y" : "x";
			const distance = 100 * speed;
			const trigger =
				triggerRef?.current ?? ref.current.parentElement ?? ref.current;

			gsap.fromTo(
				ref.current,
				{ [prop]: -distance },
				{
					[prop]: distance,
					ease: "none",
					scrollTrigger: {
						end: "bottom top",
						scrub: true,
						start: "top bottom",
						trigger,
					},
				},
			);
		},
		{ scope: ref },
	);

	return ref;
}
