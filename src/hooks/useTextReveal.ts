import gsap from "gsap";
import { type RefObject, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

interface TextRevealOptions {
	duration?: number;
	stagger?: number;
	ease?: string;
	delay?: number;
	y?: number;
}

export function useTextReveal<T extends HTMLElement>(
	options?: TextRevealOptions,
): RefObject<T | null> {
	const ref = useRef<T>(null);
	const {
		duration = 0.5,
		stagger = 0.03,
		ease = "power3.out",
		delay = 0,
		y = 20,
	} = options ?? {};

	useGSAP(
		() => {
			const el = ref.current;
			if (!el) {
				return;
			}

			const text = el.textContent ?? "";
			el.innerHTML = "";
			el.style.overflow = "hidden";

			const segmenter = new Intl.Segmenter(undefined, {
				granularity: "grapheme",
			});
			const graphemes = [...segmenter.segment(text)].map((s) => s.segment);

			const chars: HTMLSpanElement[] = [];
			for (const grapheme of graphemes) {
				const span = document.createElement("span");
				span.textContent = grapheme === " " ? "\u00A0" : grapheme;
				span.style.display = "inline-block";
				chars.push(span);
				el.appendChild(span);
			}

			gsap.from(chars, {
				delay,
				duration,
				ease,
				opacity: 0,
				stagger,
				y,
			});
		},
		{ scope: ref },
	);

	return ref;
}
