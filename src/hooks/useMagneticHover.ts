import gsap from "gsap";
import { type RefObject, useEffect, useEffectEvent, useRef } from "react";

interface MagneticHoverOptions {
	strength?: number;
	ease?: string;
	duration?: number;
}

export function useMagneticHover<T extends HTMLElement>(
	options?: MagneticHoverOptions,
): RefObject<T | null> {
	const ref = useRef<T>(null);
	const {
		strength = 0.35,
		ease = "power3.out",
		duration = 0.4,
	} = options ?? {};

	const onMove = useEffectEvent((e: MouseEvent) => {
		const el = ref.current;
		if (!el) {
			return;
		}
		const rect = el.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = (e.clientX - cx) * strength;
		const dy = (e.clientY - cy) * strength;
		gsap.to(el, { duration, ease, x: dx, y: dy });
	});

	const onLeave = useEffectEvent(() => {
		const el = ref.current;
		if (!el) {
			return;
		}
		gsap.to(el, { duration: 0.5, ease: "elastic.out(1, 0.4)", x: 0, y: 0 });
	});

	useEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}

		el.addEventListener("mousemove", onMove);
		el.addEventListener("mouseleave", onLeave);

		return () => {
			el.removeEventListener("mousemove", onMove);
			el.removeEventListener("mouseleave", onLeave);
		};
	}, []);

	return ref;
}
