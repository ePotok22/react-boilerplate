import gsap from "gsap";
import {
	Clock,
	Code2,
	Layers,
	Loader2,
	Monitor,
	MousePointerClick,
	MoveVertical,
	Play,
	Search,
	Smartphone,
	Timer,
	Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/atoms";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useDebounce } from "@/hooks/useDebounce";
import { useGSAP } from "@/hooks/useGSAP";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useParallax } from "@/hooks/useParallax";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

function GsapCounterDemo() {
	const { t } = useTranslation("showcase");
	const counterRef = useRef<HTMLSpanElement>(null);
	const barRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const { contextSafe } = useGSAP({ scope: counterRef });

	const animate = contextSafe(() => {
		if (isPlaying) {
			return;
		}
		setIsPlaying(true);
		const obj = { val: 0 };
		const tl = gsap.timeline({
			onComplete: () => setIsPlaying(false),
		});
		tl.to(obj, {
			duration: 1.5,
			ease: "power2.out",
			onUpdate: () => {
				if (counterRef.current) {
					counterRef.current.textContent = Math.round(obj.val).toString();
				}
			},
			val: 1000,
		}).to(
			barRef.current,
			{ duration: 1.5, ease: "power2.out", width: "100%" },
			0,
		);
	});

	return (
		<ShowcaseCard
			title={t("hooks.gsapCounter.title")}
			description={t("hooks.gsapCounter.description")}
		>
			<div className="space-y-3">
				<div className="flex flex-col items-center gap-1 rounded-xl bg-base-200/40 py-4">
					<span className="font-semibold text-[9px] tracking-wider opacity-30">
						{t("hooks.gsapCounter.count")}
					</span>
					<span
						ref={counterRef}
						className="font-bold text-4xl text-primary tabular-nums"
					>
						0
					</span>
				</div>
				<div className="h-2.5 w-full overflow-hidden rounded-full bg-base-200">
					<div
						ref={barRef}
						className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-none"
						style={{ width: 0 }}
					/>
				</div>
				<button
					type="button"
					className="btn btn-sm btn-primary w-full gap-2"
					onClick={animate}
					disabled={isPlaying}
				>
					<Play size={12} />
					{isPlaying
						? t("hooks.gsapCounter.animating")
						: t("hooks.gsapCounter.startAnimation")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function ParallaxPreview() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const slowRef = useParallax<HTMLDivElement>({
		speed: 0.2,
		triggerRef: containerRef,
	});
	const medRef = useParallax<HTMLDivElement>({
		speed: 0.5,
		triggerRef: containerRef,
	});
	const fastRef = useParallax<HTMLDivElement>({
		speed: 0.8,
		triggerRef: containerRef,
	});

	return (
		<div
			ref={containerRef}
			className="relative flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-base-200/60 to-base-300/60"
		>
			<div
				ref={slowRef}
				className="absolute top-6 left-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary/25 font-bold text-[10px] text-primary"
			>
				0.2×
			</div>
			<div
				ref={medRef}
				className="absolute top-10 right-1/4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/30 font-bold text-[10px] text-secondary"
			>
				0.5×
			</div>
			<div
				ref={fastRef}
				className="absolute right-8 bottom-8 flex h-16 w-16 items-center justify-center rounded-xl bg-accent/25 font-bold text-[10px] text-accent"
			>
				0.8×
			</div>
			<span className="pointer-events-none z-10 font-medium text-xs opacity-30">
				{t("hooks.parallax.scrollHint")}
			</span>
		</div>
	);
}

function StaggerGrid() {
	const containerRef = useStaggerReveal<HTMLDivElement>({
		duration: 0.5,
		stagger: 0.06,
		y: 20,
	});

	return (
		<div ref={containerRef} className="grid grid-cols-4 gap-1.5">
			{Array.from({ length: 8 }, (_, i) => (
				<div key={`stg-${i.toString()}`} className="h-8 rounded bg-accent/50" />
			))}
		</div>
	);
}

function StaggerPreview() {
	const { t } = useTranslation("showcase");
	const [key, setKey] = useState(0);

	return (
		<div className="space-y-2">
			<StaggerGrid key={key} />
			<button
				type="button"
				className="btn btn-xs btn-accent w-full"
				onClick={() => setKey((k) => k + 1)}
			>
				{t("hooks.staggerReveal.replay")}
			</button>
		</div>
	);
}

function MediaQueryDemo() {
	const { t } = useTranslation("showcase");
	const isMobile = useMediaQuery("(max-width: 639px)");
	const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
	const isDesktop = useMediaQuery("(min-width: 1024px)");

	const breakpoints = [
		{
			active: isMobile,
			icon: Smartphone,
			label: "Mobile",
			query: "max-width: 639px",
		},
		{
			active: isTablet,
			icon: Monitor,
			label: "Tablet",
			query: "640px – 1023px",
		},
		{
			active: isDesktop,
			icon: Monitor,
			label: "Desktop",
			query: "min-width: 1024px",
		},
	];

	return (
		<div className="space-y-2">
			{breakpoints.map((bp) => (
				<div
					key={bp.label}
					className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${bp.active ? "bg-success/10" : "bg-base-200/40"}`}
				>
					<div className="flex items-center gap-2">
						<bp.icon
							size={12}
							className={bp.active ? "text-success" : "opacity-30"}
						/>
						<span className="text-xs">{bp.label}</span>
					</div>
					<Badge variant={bp.active ? "success" : "ghost"}>
						{bp.active ? "Active" : "—"}
					</Badge>
				</div>
			))}
			<p className="text-[10px] opacity-40">
				{t("hooks.mediaQuery.resizeHint")}
			</p>
		</div>
	);
}

function ClickOutsideDemo() {
	const { t } = useTranslation("showcase");
	const [open, setOpen] = useState(false);
	const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

	return (
		<div className="space-y-3">
			<div ref={ref} className="relative">
				<button
					type="button"
					className="btn btn-sm btn-primary w-full"
					onClick={() => setOpen((o) => !o)}
				>
					<MousePointerClick size={14} />
					{open
						? t("hooks.clickOutside.dropdownOpen")
						: t("hooks.clickOutside.openDropdown")}
				</button>
				{open && (
					<div className="absolute top-full z-10 mt-1 w-full rounded-lg border border-base-300 bg-base-100 p-3 shadow-lg">
						<p className="font-semibold text-xs">
							{t("hooks.clickOutside.dropdownMenu")}
						</p>
						<p className="mt-1 text-[10px] opacity-50">
							{t("hooks.clickOutside.outsideHint")}
						</p>
					</div>
				)}
			</div>
			<div className="flex items-center gap-1.5 rounded-lg bg-base-200/40 px-2.5 py-1.5">
				<Code2 size={10} className="opacity-30" />
				<span className="text-[10px] opacity-40">
					{t("hooks.clickOutside.hint")}
				</span>
			</div>
		</div>
	);
}

export default function HooksShowcase() {
	const { t } = useTranslation("showcase");
	const [searchText, setSearchText] = useState("");
	const debouncedSearch = useDebounce(searchText, 500);
	const isDebouncing = searchText !== debouncedSearch;

	return (
		<Section
			id="hooks"
			title={t("hooks.sectionTitle")}
			badge={t("hooks.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("hooks.debounce.title")}
					description={t("hooks.debounce.description")}
				>
					<div className="space-y-3">
						<label className="ds-field">
							<span className="ds-field-icon">
								<Search size={16} />
							</span>
							<input
								type="text"
								className="ds-field-input"
								placeholder={t("hooks.debounce.placeholder")}
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
							/>
							{isDebouncing && (
								<span className="shrink-0">
									<Loader2 size={16} className="animate-spin text-primary" />
								</span>
							)}
						</label>
						<div className="space-y-1.5">
							<div className="flex items-center justify-between rounded-lg bg-base-200/50 px-3 py-2 transition-colors hover:bg-base-200">
								<div className="flex items-center gap-2">
									<Zap size={11} className="text-warning opacity-60" />
									<span className="text-xs opacity-50">
										{t("hooks.debounce.rawValue")}
									</span>
								</div>
								<code className="max-w-36 truncate text-xs">
									{searchText || "—"}
								</code>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2 transition-colors hover:bg-primary/10">
								<div className="flex items-center gap-2">
									<Timer size={11} className="text-primary opacity-60" />
									<span className="text-xs opacity-50">
										{t("hooks.debounce.debounced")}
									</span>
								</div>
								<code className="max-w-36 truncate font-semibold text-primary text-xs">
									{debouncedSearch || "—"}
								</code>
							</div>
						</div>
						<div className="flex items-center gap-1.5 rounded-lg bg-base-200/40 px-2.5 py-1.5">
							<Clock size={10} className="opacity-30" />
							<span className="text-[10px] opacity-40">
								{t("hooks.debounce.delay")}
							</span>
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("hooks.mediaQuery.title")}
					description={t("hooks.mediaQuery.description")}
				>
					<MediaQueryDemo />
				</ShowcaseCard>

				<GsapCounterDemo />

				<ShowcaseCard
					title={t("hooks.parallax.title")}
					description={t("hooks.parallax.description")}
				>
					<div className="space-y-3">
						<ParallaxPreview />
						<div className="flex items-center gap-1.5 rounded-lg bg-base-200/40 px-2.5 py-1.5">
							<MoveVertical size={10} className="opacity-30" />
							<span className="text-[10px] opacity-40">
								{t("hooks.parallax.hint")}
							</span>
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("hooks.staggerReveal.title")}
					description={t("hooks.staggerReveal.description")}
				>
					<div className="space-y-3">
						<StaggerPreview />
						<div className="flex items-center gap-1.5 rounded-lg bg-base-200/40 px-2.5 py-1.5">
							<Layers size={10} className="opacity-30" />
							<span className="text-[10px] opacity-40">
								{t("hooks.staggerReveal.hint")}
							</span>
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("hooks.clickOutside.title")}
					description={t("hooks.clickOutside.description")}
				>
					<ClickOutsideDemo />
				</ShowcaseCard>
			</div>
		</Section>
	);
}
