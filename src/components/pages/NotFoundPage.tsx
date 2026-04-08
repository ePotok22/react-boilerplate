import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ArrowLeft, Compass, Ghost, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function FloatingParticle({
	delay,
	x,
	y,
	size,
}: Readonly<{ delay: number; x: number; y: number; size: number }>) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		gsap.fromTo(
			ref.current,
			{ opacity: 0, scale: 0, y: 10 },
			{
				delay,
				duration: 1.5,
				ease: "power2.out",
				opacity: 0.15,
				repeat: -1,
				scale: 1,
				y: -30,
				yoyo: true,
			},
		);
	}, [delay]);

	return (
		<div
			ref={ref}
			className="absolute rounded-full bg-primary/30"
			style={{ height: size, left: `${x}%`, top: `${y}%`, width: size }}
		/>
	);
}

const PARTICLES = [
	{ delay: 0, size: 6, x: 15, y: 20 },
	{ delay: 0.4, size: 8, x: 80, y: 15 },
	{ delay: 0.8, size: 5, x: 25, y: 75 },
	{ delay: 1.2, size: 7, x: 70, y: 70 },
	{ delay: 0.6, size: 4, x: 50, y: 10 },
	{ delay: 1.0, size: 6, x: 90, y: 45 },
	{ delay: 0.2, size: 5, x: 10, y: 50 },
];

export default function NotFoundPage() {
	const { t } = useTranslation("errors");
	const containerRef = useRef<HTMLDivElement>(null);
	const ghostRef = useRef<HTMLDivElement>(null);
	const numberRef = useRef<HTMLParagraphElement>(null);
	const compassRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current || !ghostRef.current || !numberRef.current) {
			return;
		}

		const tl = gsap.timeline();

		tl.fromTo(
			ghostRef.current,
			{ opacity: 0, rotation: -20, scale: 0.3, y: -60 },
			{
				duration: 0.8,
				ease: "elastic.out(1, 0.5)",
				opacity: 1,
				rotation: 0,
				scale: 1,
				y: 0,
			},
		);

		gsap.to(ghostRef.current, {
			delay: 0.8,
			duration: 3,
			ease: "sine.inOut",
			repeat: -1,
			y: -12,
			yoyo: true,
		});

		const digits = { val: 0 };
		tl.to(
			digits,
			{
				duration: 0.6,
				ease: "power2.out",
				onUpdate: () => {
					if (numberRef.current) {
						numberRef.current.textContent = String(Math.round(digits.val));
					}
				},
				val: 404,
			},
			"-=0.4",
		);

		tl.fromTo(
			containerRef.current.querySelectorAll(".reveal-item"),
			{ opacity: 0, y: 24 },
			{ duration: 0.5, ease: "power2.out", opacity: 1, stagger: 0.08, y: 0 },
			"-=0.3",
		);

		if (compassRef.current) {
			gsap.to(compassRef.current, {
				delay: 1.2,
				duration: 8,
				ease: "none",
				repeat: -1,
				rotation: 360,
			});
		}
	}, []);

	return (
		<main
			ref={containerRef}
			className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center"
		>
			{PARTICLES.map((p) => (
				<FloatingParticle key={`${p.x}-${p.y}`} {...p} />
			))}

			<div
				ref={compassRef}
				className="absolute top-[15%] right-[12%] hidden opacity-[0.06] sm:block"
			>
				<Compass size={120} strokeWidth={0.8} />
			</div>

			<div className="absolute bottom-[18%] left-[10%] hidden animate-bounce opacity-[0.06] sm:block">
				<MapPin size={80} strokeWidth={0.8} />
			</div>

			<div ref={ghostRef} className="relative mb-8" style={{ opacity: 0 }}>
				<div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/15 shadow-lg shadow-primary/10">
					<Ghost size={56} className="text-primary" strokeWidth={1.5} />
				</div>
				<div className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/8 blur-xl" />
			</div>

			<p
				ref={numberRef}
				className="reveal-item mb-1 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text font-extrabold text-8xl text-transparent tracking-tighter sm:text-9xl"
			>
				0
			</p>

			<h1 className="reveal-item mb-3 font-bold text-(--sea-ink) text-2xl sm:text-3xl">
				{t("notFound.title")}
			</h1>

			<p className="reveal-item mb-10 max-w-lg text-(--sea-ink-soft) leading-relaxed">
				{t("notFound.description")}
			</p>

			<Link
				to="/"
				className="reveal-item ds-btn btn-primary btn-lg gap-2 rounded-2xl px-8 shadow-lg shadow-primary/20"
			>
				<ArrowLeft size={18} />
				{t("notFound.backHome")}
			</Link>

			<p className="reveal-item mt-8 text-xs opacity-30">
				{t("notFound.hint")}
			</p>
		</main>
	);
}
