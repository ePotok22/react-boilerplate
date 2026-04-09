import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (globalThis.window !== undefined) {
	gsap.registerPlugin(ScrollTrigger);
}

export { ScrollTrigger } from "gsap/ScrollTrigger";
