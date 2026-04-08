import gsap from "gsap";
import {
	Blend,
	Magnet,
	Move3d,
	Orbit,
	Shuffle,
	Sparkles,
	Target,
	Type,
	Wand2,
	Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";
import { useGSAP } from "@/hooks/useGSAP";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { useTextReveal } from "@/hooks/useTextReveal";

function GsapBoxDemo() {
	const { t } = useTranslation("showcase");
	const boxRef = useRef<HTMLButtonElement>(null);
	const wrapRef = useRef<HTMLDivElement>(null);
	const { contextSafe } = useGSAP({ scope: wrapRef });

	const playBounce = contextSafe(() => {
		gsap.fromTo(
			boxRef.current,
			{ rotation: 0, scale: 1 },
			{
				duration: 0.6,
				ease: "back.out(1.7)",
				repeat: 1,
				rotation: 360,
				scale: 1.3,
				yoyo: true,
			},
		);
	});

	return (
		<ShowcaseCard
			title={t("gsap.tween.title")}
			description={t("gsap.tween.description")}
		>
			<div className="flex flex-col items-center gap-4" ref={wrapRef}>
				<button
					type="button"
					ref={boxRef}
					onClick={playBounce}
					className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-2xl text-primary-content shadow-lg transition-shadow hover:shadow-xl"
				>
					▶
				</button>
				<p className="text-xs opacity-50">{t("gsap.tween.clickBox")}</p>
			</div>
		</ShowcaseCard>
	);
}

function GsapStaggerDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const playStagger = contextSafe(() => {
		if (playing) {
			return;
		}
		setPlaying(true);
		gsap.fromTo(
			".stagger-dot",
			{ opacity: 0, scale: 0 },
			{
				duration: 0.4,
				ease: "back.out(2)",
				onComplete: () => setPlaying(false),
				opacity: 1,
				scale: 1,
				stagger: { each: 0.06, from: "center" },
			},
		);
	});

	return (
		<ShowcaseCard
			title={t("gsap.stagger.title")}
			description={t("gsap.stagger.description")}
		>
			<div ref={containerRef} className="space-y-4">
				<div className="grid grid-cols-6 gap-1.5">
					{Array.from({ length: 24 }, (_, i) => (
						<div
							key={`stagger-dot-${i.toString()}`}
							className="stagger-dot h-6 w-full rounded bg-accent/70"
						/>
					))}
				</div>
				<button
					type="button"
					className="btn btn-sm btn-accent w-full"
					onClick={playStagger}
					disabled={playing}
				>
					{playing ? t("gsap.stagger.playing") : t("gsap.stagger.playStagger")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function GsapTimelineDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const playTimeline = contextSafe(() => {
		if (playing) {
			return;
		}
		setPlaying(true);
		const tl = gsap.timeline({
			onComplete: () => setPlaying(false),
		});
		tl.fromTo(
			".tl-step-1",
			{ opacity: 0, x: -50 },
			{ duration: 0.4, ease: "power2.out", opacity: 1, x: 0 },
		)
			.fromTo(
				".tl-step-2",
				{ opacity: 0, scale: 0.8, y: 20 },
				{ duration: 0.4, ease: "back.out(1.5)", opacity: 1, scale: 1, y: 0 },
			)
			.fromTo(
				".tl-step-3",
				{ opacity: 0, x: 50 },
				{ duration: 0.4, ease: "power2.out", opacity: 1, x: 0 },
			);
	});

	return (
		<ShowcaseCard
			title={t("gsap.timeline.title")}
			description={t("gsap.timeline.description")}
		>
			<div ref={containerRef} className="space-y-4">
				<div className="flex items-center justify-center gap-3">
					<div className="tl-step-1 flex h-12 w-12 items-center justify-center rounded-lg bg-info text-info-content text-lg">
						1
					</div>
					<div className="tl-step-2 flex h-14 w-14 items-center justify-center rounded-xl bg-success text-success-content text-xl">
						2
					</div>
					<div className="tl-step-3 flex h-12 w-12 items-center justify-center rounded-lg bg-warning text-lg text-warning-content">
						3
					</div>
				</div>
				<button
					type="button"
					className="btn btn-sm btn-info w-full"
					onClick={playTimeline}
					disabled={playing}
				>
					{playing
						? t("gsap.timeline.playing")
						: t("gsap.timeline.playTimeline")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function MagneticButtonDemo() {
	const { t } = useTranslation("showcase");
	const magnetRef = useMagneticHover<HTMLButtonElement>({ strength: 0.4 });

	return (
		<ShowcaseCard
			title={t("gsap.magneticHover.title")}
			description={t("gsap.magneticHover.description")}
		>
			<div className="flex flex-col items-center gap-4">
				<div className="flex h-28 w-full items-center justify-center rounded-xl bg-base-200/40">
					<button
						type="button"
						ref={magnetRef}
						className="btn btn-primary btn-lg gap-2 shadow-lg"
					>
						<Magnet size={18} />
						{t("gsap.magneticHover.hoverMe")}
					</button>
				</div>
				<p className="text-xs opacity-50">{t("gsap.magneticHover.hint")}</p>
			</div>
		</ShowcaseCard>
	);
}

function TextRevealHeading() {
	const { t } = useTranslation("showcase");
	const headingRef = useTextReveal<HTMLHeadingElement>({
		delay: 0.2,
		duration: 0.6,
		stagger: 0.04,
		y: 25,
	});

	return (
		<h3 ref={headingRef} className="font-bold text-2xl text-primary">
			{t("gsap.textReveal.heading")}
		</h3>
	);
}

function TextRevealDemo() {
	const { t } = useTranslation("showcase");
	const [key, setKey] = useState(0);

	return (
		<ShowcaseCard
			title={t("gsap.textReveal.title")}
			description={t("gsap.textReveal.description")}
		>
			<div className="flex flex-col items-center gap-4">
				<div className="flex h-20 w-full items-center justify-center rounded-xl bg-base-200/40">
					<TextRevealHeading key={key} />
				</div>
				<button
					type="button"
					className="btn btn-sm btn-secondary w-full gap-2"
					onClick={() => setKey((k) => k + 1)}
				>
					<Type size={14} />
					{t("gsap.textReveal.replay")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function ElasticBounceDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const playElastic = contextSafe(() => {
		if (playing) {
			return;
		}
		setPlaying(true);
		gsap.fromTo(
			".elastic-ball",
			{ scale: 0, y: -40 },
			{
				duration: 1.2,
				ease: "elastic.out(1, 0.3)",
				onComplete: () => setPlaying(false),
				scale: 1,
				stagger: 0.15,
				y: 0,
			},
		);
	});

	return (
		<ShowcaseCard
			title={t("gsap.elasticBounce.title")}
			description={t("gsap.elasticBounce.description")}
		>
			<div ref={containerRef} className="space-y-4">
				<div className="flex items-end justify-center gap-3 pt-4">
					{[
						"bg-primary",
						"bg-secondary",
						"bg-accent",
						"bg-info",
						"bg-success",
					].map((color, i) => (
						<div
							key={`elastic-${i.toString()}`}
							className={`elastic-ball h-10 w-10 rounded-full ${color} shadow-md`}
						/>
					))}
				</div>
				<button
					type="button"
					className="btn btn-sm btn-primary w-full gap-2"
					onClick={playElastic}
					disabled={playing}
				>
					<Sparkles size={14} />
					{playing
						? t("gsap.elasticBounce.playing")
						: t("gsap.elasticBounce.dropBalls")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function MorphingShapesDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const playMorph = contextSafe(() => {
		if (playing) {
			return;
		}
		setPlaying(true);
		const tl = gsap.timeline({
			onComplete: () => setPlaying(false),
		});

		tl.to(".morph-shape", {
			borderRadius: "50%",
			duration: 0.5,
			ease: "power2.inOut",
			rotation: 180,
			scale: 1.2,
			stagger: 0.1,
		})
			.to(".morph-shape", {
				borderRadius: "12px",
				duration: 0.5,
				ease: "power2.inOut",
				rotation: 360,
				scale: 0.8,
				stagger: 0.1,
			})
			.to(".morph-shape", {
				borderRadius: "8px",
				duration: 0.4,
				ease: "back.out(1.7)",
				rotation: 0,
				scale: 1,
				stagger: 0.1,
			});
	});

	return (
		<ShowcaseCard
			title={t("gsap.morphingShapes.title")}
			description={t("gsap.morphingShapes.description")}
		>
			<div ref={containerRef} className="space-y-4">
				<div className="flex items-center justify-center gap-3">
					{["bg-error", "bg-warning", "bg-success"].map((color, i) => (
						<div
							key={`morph-${i.toString()}`}
							className={`morph-shape h-14 w-14 rounded-lg ${color} shadow-md`}
						/>
					))}
				</div>
				<button
					type="button"
					className="btn btn-sm btn-warning w-full"
					onClick={playMorph}
					disabled={playing}
				>
					{playing
						? t("gsap.morphingShapes.playing")
						: t("gsap.morphingShapes.playMorph")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function FlipCardDemo() {
	const { t } = useTranslation("showcase");
	const cardRef = useRef<HTMLButtonElement>(null);
	const [flipped, setFlipped] = useState(false);

	const flip = () => {
		setFlipped((prev) => !prev);
		gsap.to(cardRef.current, {
			duration: 0.6,
			ease: "power2.inOut",
			rotationY: flipped ? 0 : 180,
		});
	};

	return (
		<ShowcaseCard
			title={t("gsap.cardFlip.title")}
			description={t("gsap.cardFlip.description")}
		>
			<div
				className="flex flex-col items-center gap-4"
				style={{ perspective: 600 }}
			>
				<button
					type="button"
					ref={cardRef}
					className="flex h-28 w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent text-lg text-secondary-content shadow-lg"
					style={{ transformStyle: "preserve-3d" }}
					onClick={flip}
				>
					<span style={{ backfaceVisibility: "hidden" }}>
						{flipped
							? t("gsap.cardFlip.backSide")
							: t("gsap.cardFlip.clickToFlip")}
					</span>
				</button>
				<p className="text-xs opacity-50">
					{flipped
						? t("gsap.cardFlip.clickAgain")
						: t("gsap.cardFlip.clickCard")}
				</p>
			</div>
		</ShowcaseCard>
	);
}

function WaveAnimationDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const playWave = contextSafe(() => {
		if (playing) {
			return;
		}
		setPlaying(true);
		gsap.fromTo(
			".wave-bar",
			{ scaleY: 0.3 },
			{
				duration: 0.4,
				ease: "sine.inOut",
				onComplete: () => setPlaying(false),
				repeat: 3,
				scaleY: 1,
				stagger: { each: 0.05, repeat: -1, yoyo: true },
				yoyo: true,
			},
		);
	});

	return (
		<ShowcaseCard
			title={t("gsap.wave.title")}
			description={t("gsap.wave.description")}
		>
			<div ref={containerRef} className="space-y-4">
				<div className="flex h-20 items-end justify-center gap-1">
					{Array.from({ length: 16 }, (_, i) => (
						<div
							key={`wave-${i.toString()}`}
							className="wave-bar w-2 origin-bottom rounded-t bg-gradient-to-t from-primary to-secondary"
							style={{ height: "100%" }}
						/>
					))}
				</div>
				<button
					type="button"
					className="btn btn-sm btn-secondary w-full"
					onClick={playWave}
					disabled={playing}
				>
					{playing ? t("gsap.wave.playing") : t("gsap.wave.playWave")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function ParticleExplosionDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const explode = contextSafe(() => {
		if (playing) {
			return;
		}
		setPlaying(true);
		const particles = containerRef.current?.querySelectorAll(".particle") ?? [];

		gsap.set(particles, { opacity: 1, scale: 1, x: 0, y: 0 });

		gsap.to(particles, {
			duration: 0.9,
			ease: "power3.out",
			onComplete: () => {
				gsap.to(particles, {
					duration: 0.5,
					ease: "back.out(1.7)",
					onComplete: () => setPlaying(false),
					opacity: 1,
					rotation: 0,
					scale: 1,
					stagger: { each: 0.02, from: "edges" },
					x: 0,
					y: 0,
				});
			},
			opacity: 0,
			rotation: () => Math.random() * 360,
			scale: () => Math.random() * 1.5 + 0.5,
			stagger: { each: 0.02, from: "center" },
			x: () => (Math.random() - 0.5) * 200,
			y: () => (Math.random() - 0.5) * 200,
		});
	});

	const COLORS = [
		"bg-primary",
		"bg-secondary",
		"bg-accent",
		"bg-info",
		"bg-success",
		"bg-warning",
		"bg-error",
		"bg-primary/60",
		"bg-secondary/60",
	];

	return (
		<ShowcaseCard
			title={t("gsap.particleExplosion.title")}
			description={t("gsap.particleExplosion.description")}
		>
			<div ref={containerRef} className="space-y-4">
				<div className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl bg-base-200/40">
					<div className="grid grid-cols-5 gap-1.5">
						{Array.from({ length: 20 }, (_, i) => (
							<div
								key={`p-${i.toString()}`}
								className={`particle h-4 w-4 rounded-full ${COLORS[i % COLORS.length]} shadow-sm`}
							/>
						))}
					</div>
				</div>
				<button
					type="button"
					className="btn btn-sm btn-error w-full gap-2"
					onClick={explode}
					disabled={playing}
				>
					<Sparkles size={14} />
					{playing
						? t("gsap.particleExplosion.playing")
						: t("gsap.particleExplosion.explode")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function PulseRingDemo() {
	const { t } = useTranslation("showcase");
	const ringRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(false);

	const toggle = () => {
		setActive((a) => {
			const next = !a;
			if (next && ringRef.current) {
				const rings = ringRef.current.querySelectorAll(".pulse-ring");
				gsap.fromTo(
					rings,
					{ opacity: 0.8, scale: 0.5 },
					{
						duration: 1.5,
						ease: "power2.out",
						opacity: 0,
						repeat: -1,
						scale: 2.5,
						stagger: { each: 0.5 },
					},
				);
			} else if (ringRef.current) {
				gsap.killTweensOf(ringRef.current.querySelectorAll(".pulse-ring"));
				gsap.set(ringRef.current.querySelectorAll(".pulse-ring"), {
					opacity: 0,
					scale: 0.5,
				});
			}
			return next;
		});
	};

	return (
		<ShowcaseCard
			title={t("gsap.pulseRing.title")}
			description={t("gsap.pulseRing.description")}
		>
			<div className="flex flex-col items-center gap-4">
				<div className="flex h-28 w-full items-center justify-center rounded-xl bg-base-200/40">
					<div
						ref={ringRef}
						className="relative flex items-center justify-center"
					>
						{[0, 1, 2].map((i) => (
							<div
								key={`ring-${i.toString()}`}
								className="pulse-ring absolute h-12 w-12 rounded-full border-2 border-primary opacity-0"
							/>
						))}
						<button
							type="button"
							onClick={toggle}
							className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors ${
								active
									? "bg-primary text-primary-content"
									: "bg-base-100 text-primary"
							}`}
						>
							<Target size={20} />
						</button>
					</div>
				</div>
				<p className="text-xs opacity-50">
					{active
						? t("gsap.pulseRing.pulsing")
						: t("gsap.pulseRing.clickToStart")}
				</p>
			</div>
		</ShowcaseCard>
	);
}

function TypewriterDemo() {
	const { t } = useTranslation("showcase");
	const textRef = useRef<HTMLSpanElement>(null);
	const cursorRef = useRef<HTMLSpanElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP();

	const play = contextSafe(() => {
		if (playing || !textRef.current || !cursorRef.current) {
			return;
		}
		setPlaying(true);

		const text = t("gsap.typewriter.text");
		textRef.current.textContent = "";

		gsap.fromTo(
			cursorRef.current,
			{ opacity: 1 },
			{ duration: 0.5, ease: "steps(1)", opacity: 0, repeat: -1, yoyo: true },
		);

		const chars = text.split("");
		const tl = gsap.timeline({
			onComplete: () => {
				setTimeout(() => setPlaying(false), 500);
			},
		});

		for (const char of chars) {
			tl.call(
				() => {
					if (textRef.current) {
						textRef.current.textContent += char;
					}
				},
				[],
				`+=${0.05 + Math.random() * 0.06}`,
			);
		}
	});

	return (
		<ShowcaseCard
			title={t("gsap.typewriter.title")}
			description={t("gsap.typewriter.description")}
		>
			<div className="flex flex-col items-center gap-4">
				<div className="flex min-h-20 w-full items-center justify-center rounded-xl bg-base-200/40 px-4">
					<p className="font-mono text-sm">
						<span ref={textRef} />
						<span ref={cursorRef} className="text-primary">
							▎
						</span>
					</p>
				</div>
				<button
					type="button"
					className="btn btn-sm btn-accent w-full gap-2"
					onClick={play}
					disabled={playing}
				>
					<Wand2 size={14} />
					{playing
						? t("gsap.typewriter.playing")
						: t("gsap.typewriter.startTyping")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function OrbitalDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(false);

	const toggle = () => {
		setActive((a) => {
			const next = !a;
			if (!containerRef.current) {
				return next;
			}

			const orbs = containerRef.current.querySelectorAll(".orbit-dot");

			if (next) {
				orbs.forEach((orb, i) => {
					gsap.to(orb, {
						duration: 2 + i * 0.8,
						ease: "none",
						motionPath: {
							path: `circle(${36 + i * 14}px at 50% 50%)`,
						},
						repeat: -1,
					});
					gsap.to(orb, {
						duration: 2 + i * 0.8,
						ease: "none",
						repeat: -1,
						rotation: 360,
						transformOrigin: `${-(36 + i * 14)}px 0px`,
					});
				});
			} else {
				gsap.killTweensOf(orbs);
				gsap.to(orbs, {
					duration: 0.5,
					ease: "power2.out",
					rotation: 0,
				});
			}
			return next;
		});
	};

	return (
		<ShowcaseCard
			title={t("gsap.orbital.title")}
			description={t("gsap.orbital.description")}
		>
			<div className="flex flex-col items-center gap-4">
				<div className="flex h-28 w-full items-center justify-center rounded-xl bg-base-200/40">
					<div
						ref={containerRef}
						className="relative flex items-center justify-center"
					>
						<div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-md">
							<Zap size={14} className="text-primary-content" />
						</div>
						{["bg-secondary", "bg-accent", "bg-info"].map((color, i) => (
							<div
								key={`orb-${i.toString()}`}
								className={`orbit-dot absolute h-3 w-3 rounded-full ${color} shadow-sm`}
								style={{
									left: "50%",
									marginLeft: `${36 + i * 14 - 6}px`,
									marginTop: "-6px",
									top: "50%",
								}}
							/>
						))}
					</div>
				</div>
				<button
					type="button"
					className="btn btn-sm btn-info w-full gap-2"
					onClick={toggle}
				>
					<Orbit size={14} />
					{active ? t("gsap.orbital.stopOrbit") : t("gsap.orbital.startOrbit")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function LiquidMorphDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const play = contextSafe(() => {
		if (playing) {
			return;
		}
		setPlaying(true);
		const blobs = containerRef.current?.querySelectorAll(".blob") ?? [];
		const tl = gsap.timeline({ onComplete: () => setPlaying(false) });

		tl.to(blobs, {
			borderRadius: () =>
				`${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%`,
			duration: 0.8,
			ease: "power2.inOut",
			rotation: () => Math.random() * 90 - 45,
			scale: () => 0.8 + Math.random() * 0.5,
			stagger: 0.1,
		})
			.to(blobs, {
				borderRadius: () =>
					`${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%`,
				duration: 0.8,
				ease: "power2.inOut",
				rotation: () => Math.random() * 120 - 60,
				scale: () => 0.7 + Math.random() * 0.6,
				stagger: 0.1,
			})
			.to(blobs, {
				borderRadius: "12px",
				duration: 0.6,
				ease: "back.out(1.4)",
				rotation: 0,
				scale: 1,
				stagger: 0.08,
			});
	});

	return (
		<ShowcaseCard
			title={t("gsap.liquidMorph.title")}
			description={t("gsap.liquidMorph.description")}
		>
			<div ref={containerRef} className="space-y-4">
				<div className="flex items-center justify-center gap-3 py-2">
					{[
						"bg-primary/70",
						"bg-secondary/70",
						"bg-accent/70",
						"bg-info/70",
					].map((color, i) => (
						<div
							key={`blob-${i.toString()}`}
							className={`blob h-14 w-14 rounded-xl ${color} shadow-md`}
						/>
					))}
				</div>
				<button
					type="button"
					className="btn btn-sm btn-secondary w-full gap-2"
					onClick={play}
					disabled={playing}
				>
					<Blend size={14} />
					{playing
						? t("gsap.liquidMorph.playing")
						: t("gsap.liquidMorph.morphBlobs")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

const SHUFFLE_COLORS = [
	"bg-primary",
	"bg-secondary",
	"bg-accent",
	"bg-info",
	"bg-success",
	"bg-warning",
	"bg-error",
	"bg-primary/50",
	"bg-secondary/50",
	"bg-accent/50",
	"bg-info/50",
	"bg-success/50",
];

function ShuffleGridDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const [colors, setColors] = useState(SHUFFLE_COLORS);

	const shuffle = contextSafe(() => {
		if (playing) {
			return;
		}
		setPlaying(true);
		const items = containerRef.current?.querySelectorAll(".shuffle-item") ?? [];

		gsap.to(items, {
			duration: 0.4,
			ease: "power2.in",
			onComplete: () => {
				setColors((prev) => {
					const next = [...prev];
					for (let i = next.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						next.splice(i, 1, ...next.splice(j, 1, next[i] as string));
					}
					return next;
				});

				gsap.to(items, {
					duration: 0.5,
					ease: "back.out(1.4)",
					onComplete: () => setPlaying(false),
					opacity: 1,
					rotation: 0,
					scale: 1,
					stagger: { each: 0.03, from: "random" },
					x: 0,
					y: 0,
				});
			},
			opacity: 0.5,
			rotation: () => Math.random() * 360 - 180,
			scale: 0.6,
			stagger: { each: 0.02, from: "random" },
			x: () => (Math.random() - 0.5) * 80,
			y: () => (Math.random() - 0.5) * 80,
		});
	});

	return (
		<ShowcaseCard
			title={t("gsap.shuffleGrid.title")}
			description={t("gsap.shuffleGrid.description")}
		>
			<div ref={containerRef} className="space-y-4">
				<div className="grid grid-cols-4 gap-1.5 overflow-hidden rounded-xl p-1">
					{colors.map((color, i) => (
						<div
							key={`sh-${i.toString()}`}
							className={`shuffle-item aspect-square rounded-lg ${color} shadow-sm`}
						/>
					))}
				</div>
				<button
					type="button"
					className="btn btn-sm btn-warning w-full gap-2"
					onClick={shuffle}
					disabled={playing}
				>
					<Shuffle size={14} />
					{playing
						? t("gsap.shuffleGrid.playing")
						: t("gsap.shuffleGrid.shuffle")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function PerspectiveTiltDemo() {
	const { t } = useTranslation("showcase");
	const cardRef = useRef<HTMLDivElement>(null);

	const onMove = (e: React.MouseEvent) => {
		if (!cardRef.current) {
			return;
		}
		const rect = cardRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;

		gsap.to(cardRef.current, {
			duration: 0.3,
			ease: "power2.out",
			rotationX: -y * 25,
			rotationY: x * 25,
		});
	};

	const onLeave = () => {
		if (!cardRef.current) {
			return;
		}
		gsap.to(cardRef.current, {
			duration: 0.6,
			ease: "elastic.out(1, 0.5)",
			rotationX: 0,
			rotationY: 0,
		});
	};

	return (
		<ShowcaseCard
			title={t("gsap.perspectiveTilt.title")}
			description={t("gsap.perspectiveTilt.description")}
		>
			<div
				className="flex flex-col items-center gap-4"
				style={{ perspective: 800 }}
			>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: decorative hover */}
				<div
					ref={cardRef}
					onMouseMove={onMove}
					onMouseLeave={onLeave}
					className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/15 shadow-lg"
					style={{ transformStyle: "preserve-3d" }}
				>
					<div style={{ transform: "translateZ(30px)" }}>
						<Move3d size={28} className="text-primary" />
					</div>
					<p
						className="font-semibold text-sm"
						style={{ transform: "translateZ(20px)" }}
					>
						{t("gsap.perspectiveTilt.hoverMove")}
					</p>
					<p
						className="text-[10px] opacity-50"
						style={{ transform: "translateZ(10px)" }}
					>
						{t("gsap.perspectiveTilt.parallaxLayers")}
					</p>
				</div>
			</div>
		</ShowcaseCard>
	);
}

function GradientWaveBarsDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const { contextSafe } = useGSAP({ scope: containerRef });

	const play = contextSafe(() => {
		if (playing) {
			return;
		}
		setPlaying(true);
		const bars = containerRef.current?.querySelectorAll(".gwave-bar") ?? [];
		gsap.fromTo(
			bars,
			{ scaleY: 0.15 },
			{
				duration: 0.5,
				ease: "sine.inOut",
				onComplete: () => {
					gsap.to(bars, {
						duration: 0.3,
						ease: "power2.out",
						onComplete: () => setPlaying(false),
						scaleY: 0.3,
						stagger: 0.02,
					});
				},
				scaleY: 1,
				stagger: {
					each: 0.04,
					from: "center",
					repeat: 5,
					yoyo: true,
				},
			},
		);
	});

	return (
		<ShowcaseCard
			title={t("gsap.gradientWave.title")}
			description={t("gsap.gradientWave.description")}
		>
			<div ref={containerRef} className="space-y-4">
				<div className="flex h-24 items-end justify-center gap-[3px] overflow-hidden rounded-xl bg-base-200/30 px-2">
					{Array.from({ length: 24 }, (_, i) => {
						const hue = (i / 24) * 120 + 160;
						return (
							<div
								key={`gw-${i.toString()}`}
								className="gwave-bar w-2 origin-bottom rounded-t-sm"
								style={{
									background: `oklch(0.7 0.14 ${hue})`,
									height: "100%",
									transform: "scaleY(0.3)",
								}}
							/>
						);
					})}
				</div>
				<button
					type="button"
					className="btn btn-sm btn-accent w-full gap-2"
					onClick={play}
					disabled={playing}
				>
					<Sparkles size={14} />
					{playing
						? t("gsap.gradientWave.playing")
						: t("gsap.gradientWave.playWave")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

export default function GsapShowcase() {
	const { t } = useTranslation("showcase");
	return (
		<Section id="gsap" title={t("gsap.sectionTitle")} badge={t("gsap.badge")}>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<GsapBoxDemo />
				<GsapStaggerDemo />
				<GsapTimelineDemo />
				<MagneticButtonDemo />
				<TextRevealDemo />
				<ElasticBounceDemo />
				<MorphingShapesDemo />
				<FlipCardDemo />
				<WaveAnimationDemo />
				<ParticleExplosionDemo />
				<PulseRingDemo />
				<TypewriterDemo />
				<OrbitalDemo />
				<LiquidMorphDemo />
				<ShuffleGridDemo />
				<PerspectiveTiltDemo />
				<GradientWaveBarsDemo />
			</div>
		</Section>
	);
}
