import gsap from "gsap";
import { useRef } from "react";
import "@/config/gsap-plugins";
import { useGSAP } from "@/hooks/useGSAP";

interface ScrollRevealOptions {
	y?: number;
	x?: number;
	opacity?: number;
	duration?: number;
	delay?: number;
	stagger?: number;
	ease?: string;
	start?: string;
	childSelector?: string;
}

const defaults: Required<ScrollRevealOptions> = {
	childSelector: "",
	delay: 0,
	duration: 0.8,
	ease: "power3.out",
	opacity: 0,
	stagger: 0.1,
	start: "top 88%",
	x: 0,
	y: 40,
};

export function useScrollReveal<T extends HTMLElement>(
	options?: ScrollRevealOptions,
) {
	const ref = useRef<T>(null);
	const opts = { ...defaults, ...options };

	useGSAP(
		() => {
			if (!ref.current) {
				return;
			}

			const targets = opts.childSelector
				? ref.current.querySelectorAll(opts.childSelector)
				: ref.current;

			gsap.from(targets, {
				delay: opts.delay,
				duration: opts.duration,
				ease: opts.ease,
				opacity: opts.opacity,
				scrollTrigger: {
					start: opts.start,
					toggleActions: "play none none none",
					trigger: ref.current,
				},
				stagger: opts.stagger,
				x: opts.x,
				y: opts.y,
			});
		},
		{ scope: ref },
	);

	return ref;
}
