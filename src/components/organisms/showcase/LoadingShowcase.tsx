import gsap from "gsap";
import {
	Activity,
	BarChart3,
	Cloud,
	CreditCard,
	Database,
	Download,
	Globe,
	Image,
	Layers,
	Loader2,
	MonitorSmartphone,
	ScanLine,
	Server,
	ShieldCheck,
	Users,
	Wifi,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ProgressBar, Skeleton, Spinner } from "@/components/atoms";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";
import { useGSAP } from "@/hooks/useGSAP";
import { secureRandom } from "@/utils/random";

function ToggleLoadButton({
	loaded,
	onToggle,
	showLabel,
	loadLabel,
}: Readonly<{
	loaded: boolean;
	onToggle: () => void;
	showLabel: string;
	loadLabel: string;
}>) {
	return (
		<Button
			size="sm"
			variant={loaded ? "ghost" : "primary"}
			className="w-full"
			onClick={onToggle}
		>
			{loaded ? showLabel : loadLabel}
		</Button>
	);
}

const SPINNER_VARIANTS = [
	{ label: "Spinner", variant: "spinner" as const },
	{ label: "Dots", variant: "dots" as const },
	{ label: "Ring", variant: "ring" as const },
	{ label: "Bars", variant: "bars" as const },
];

const SPINNER_SIZES = [
	{ label: "XS", size: "xs" as const },
	{ label: "SM", size: "sm" as const },
	{ label: "MD", size: "md" as const },
	{ label: "LG", size: "lg" as const },
];

function SpinnersDemo() {
	const { t } = useTranslation("showcase");
	const [activeVariant, setActiveVariant] = useState<
		"spinner" | "dots" | "ring" | "bars"
	>("spinner");

	return (
		<ShowcaseCard
			title={t("loading.spinners.title")}
			description={t("loading.spinners.description")}
		>
			<div className="space-y-4">
				<div className="flex gap-1 rounded-xl bg-base-200/50 p-1">
					{SPINNER_VARIANTS.map(({ label, variant }) => (
						<button
							key={variant}
							type="button"
							onClick={() => setActiveVariant(variant)}
							className={`flex-1 rounded-lg px-2 py-1.5 font-medium text-xs transition-all ${
								activeVariant === variant
									? "bg-primary text-primary-content shadow-sm"
									: "text-base-content/50 hover:text-base-content/80"
							}`}
						>
							{label}
						</button>
					))}
				</div>
				<div className="grid grid-cols-4 gap-2">
					{SPINNER_SIZES.map(({ label, size }) => (
						<div
							key={size}
							className="flex flex-col items-center gap-2.5 rounded-xl bg-base-200/40 p-3 transition-colors hover:bg-base-200/70"
						>
							<Spinner
								size={size}
								variant={activeVariant}
								className="text-primary"
							/>
							<span className="font-bold text-[10px] tracking-wider opacity-40">
								{label}
							</span>
						</div>
					))}
				</div>
			</div>
		</ShowcaseCard>
	);
}

function SkeletonVariantsDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const { contextSafe } = useGSAP({ scope: containerRef });
	const [key, setKey] = useState(0);

	const replay = contextSafe(() => {
		setKey((k) => k + 1);
		gsap.fromTo(
			containerRef.current?.querySelectorAll(".skeleton") ?? [],
			{ opacity: 0, x: -8 },
			{
				duration: 0.4,
				ease: "power2.out",
				opacity: 1,
				stagger: 0.06,
				x: 0,
			},
		);
	});

	return (
		<ShowcaseCard
			title={t("loading.skeletonPlaceholders.title")}
			description={t("loading.skeletonPlaceholders.description")}
		>
			<div ref={containerRef} className="space-y-4" key={key}>
				<div className="space-y-2.5 rounded-xl bg-base-200/40 p-3">
					<div className="mb-1.5 flex items-center gap-2">
						<ScanLine size={10} className="opacity-30" />
						<span className="font-semibold text-[9px] tracking-wider opacity-30">
							{t("loading.skeletonPlaceholders.article")}
						</span>
					</div>
					<Skeleton className="h-5 w-3/4" />
					<Skeleton lines={3} />
				</div>
				<div className="rounded-xl bg-base-200/40 p-3">
					<div className="mb-2 flex items-center gap-2">
						<MonitorSmartphone size={10} className="opacity-30" />
						<span className="font-semibold text-[9px] tracking-wider opacity-30">
							{t("loading.skeletonPlaceholders.userCard")}
						</span>
					</div>
					<div className="flex gap-3">
						<Skeleton variant="avatar" />
						<div className="flex-1 space-y-2 pt-1">
							<Skeleton className="h-3 w-2/5" />
							<Skeleton className="h-3 w-3/4" />
							<Skeleton className="h-3 w-1/2" />
						</div>
					</div>
				</div>
				<button
					type="button"
					onClick={replay}
					className="btn btn-ghost btn-xs w-full gap-1 opacity-50 hover:opacity-100"
				>
					<Loader2 size={12} />
					{t("loading.skeletonPlaceholders.replayAnimation")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function SkeletonScreenDemo() {
	const { t } = useTranslation("showcase");

	return (
		<ShowcaseCard
			title={t("loading.skeletonScreen.title")}
			description={t("loading.skeletonScreen.description")}
		>
			<div className="space-y-3 rounded-xl border border-base-content/5 bg-base-200/30 p-3">
				<div className="flex items-center justify-between">
					<Skeleton className="h-4 w-20" />
					<div className="flex gap-2">
						<Skeleton variant="circle" className="h-6 w-6" />
						<Skeleton variant="circle" className="h-6 w-6" />
					</div>
				</div>
				<div className="grid grid-cols-3 gap-2">
					{[
						{ icon: Users, w: "w-12" },
						{ icon: BarChart3, w: "w-16" },
						{ icon: CreditCard, w: "w-10" },
					].map(({ icon: Icon, w }, i) => (
						<div
							key={`stat-${i.toString()}`}
							className="flex flex-col gap-1.5 rounded-lg bg-base-100/60 p-2"
						>
							<Icon size={10} className="opacity-20" />
							<Skeleton className={`h-5 ${w}`} />
							<Skeleton className="h-2 w-full" />
						</div>
					))}
				</div>
				<Skeleton variant="card" className="h-20" />
				<div className="space-y-1.5">
					{[1, 2, 3].map((row) => (
						<div key={row} className="flex items-center gap-2">
							<Skeleton variant="circle" className="h-5 w-5" />
							<Skeleton className="h-3 flex-1" />
							<Skeleton className="h-3 w-14" />
						</div>
					))}
				</div>
			</div>
		</ShowcaseCard>
	);
}

function ProgressDemo() {
	const { t } = useTranslation("showcase");
	const [progress, setProgress] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const startProgress = () => {
		setProgress(0);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		intervalRef.current = setInterval(() => {
			setProgress((p) => {
				if (p >= 100) {
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
					}
					return 100;
				}
				return p + secureRandom() * 15 + 3;
			});
		}, 300);
	};
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return (
		<ShowcaseCard
			title={t("loading.progress.title")}
			description={t("loading.progress.description")}
		>
			<div className="space-y-4">
				<div className="space-y-2 rounded-xl bg-base-200/40 p-3">
					<ProgressBar value={progress} showLabel />
					<Button
						size="sm"
						variant="primary"
						className="w-full"
						onClick={startProgress}
					>
						{progress >= 100
							? t("loading.progress.restart")
							: t("loading.progress.simulateUpload")}
					</Button>
				</div>
				<div className="space-y-2 rounded-xl bg-base-200/40 p-3">
					<span className="font-semibold text-[9px] tracking-wider opacity-30">
						{t("loading.progress.sizes")}
					</span>
					<ProgressBar value={85} size="xs" variant="info" animated={false} />
					<ProgressBar
						value={65}
						size="sm"
						variant="success"
						animated={false}
					/>
					<ProgressBar
						value={45}
						size="md"
						variant="warning"
						animated={false}
					/>
					<ProgressBar value={25} size="lg" variant="error" animated={false} />
				</div>
			</div>
		</ShowcaseCard>
	);
}

function LoadingOverlayDemo() {
	const { t } = useTranslation("showcase");
	const [showLoading, setShowLoading] = useState(false);
	const [step, setStep] = useState(0);
	const steps = [
		t("loading.overlay.connecting"),
		t("loading.overlay.authenticating"),
		t("loading.overlay.loadingDashboard"),
	];

	const start = () => {
		setShowLoading(true);
		setStep(0);
		let current = 0;
		const iv = setInterval(() => {
			current++;
			if (current >= steps.length) {
				clearInterval(iv);
				setTimeout(() => setShowLoading(false), 800);
				return;
			}
			setStep(current);
		}, 1000);
	};

	return (
		<ShowcaseCard
			title={t("loading.overlay.title")}
			description={t("loading.overlay.description")}
		>
			{showLoading ? (
				<div className="relative min-h-52 overflow-hidden rounded-xl border border-base-content/5">
					<div className="space-y-2 p-3 opacity-20">
						<div className="flex items-center gap-2">
							<Server size={12} />
							<span className="font-semibold text-xs">Dashboard</span>
						</div>
						<div className="grid grid-cols-3 gap-1.5">
							{[1, 2, 3].map((n) => (
								<div key={n} className="h-8 rounded-lg bg-base-200" />
							))}
						</div>
						<div className="h-16 rounded-lg bg-base-200" />
					</div>
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-base-100/85 backdrop-blur-md">
						<div className="relative flex items-center justify-center">
							<div className="absolute h-14 w-14 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
							<ShieldCheck size={20} className="text-primary" />
						</div>
						<div className="flex flex-col items-center gap-1">
							<span className="font-medium text-primary text-sm">
								{steps[step]}
							</span>
							<div className="flex gap-1">
								{steps.map((_, i) => (
									<div
										key={`step-${i.toString()}`}
										className={`h-1 w-6 rounded-full transition-colors duration-300 ${
											i <= step ? "bg-primary" : "bg-base-content/10"
										}`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-xl border border-base-content/5 border-dashed bg-base-200/20">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
						<Globe size={22} className="text-primary" />
					</div>
					<p className="text-xs opacity-50">
						{t("loading.overlay.simulatesMultiStep")}
					</p>
					<Button size="sm" variant="primary" onClick={start}>
						{t("loading.overlay.simulateLoading")}
					</Button>
				</div>
			)}
		</ShowcaseCard>
	);
}

function ContentLoaderDemo() {
	const { t } = useTranslation("showcase");
	const [loaded, setLoaded] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggle = () => {
		if (loaded) {
			setLoaded(false);
			return;
		}
		setLoaded(true);
		if (contentRef.current) {
			gsap.fromTo(
				contentRef.current.children,
				{ opacity: 0, y: 12 },
				{
					duration: 0.5,
					ease: "power3.out",
					opacity: 1,
					stagger: 0.08,
					y: 0,
				},
			);
		}
	};

	return (
		<ShowcaseCard
			title={t("loading.contentLoader.title")}
			description={t("loading.contentLoader.description")}
		>
			<div className="space-y-3">
				{loaded ? (
					<div
						ref={contentRef}
						className="space-y-3 rounded-xl bg-base-200/40 p-3"
					>
						<div className="flex items-center gap-2.5">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content">
								<Image size={16} />
							</div>
							<div>
								<p className="font-semibold text-sm">
									{t("loading.contentLoader.premiumDashboard")}
								</p>
								<p className="text-base-content/50 text-xs">
									{t("loading.contentLoader.lastUpdated")}
								</p>
							</div>
						</div>
						<p className="text-base-content/70 text-xs leading-relaxed">
							{t("loading.contentLoader.allSystems")}
						</p>
						<div className="grid grid-cols-3 gap-2">
							{[
								{ label: t("loading.contentLoader.users"), value: "3.2K" },
								{ label: t("loading.contentLoader.revenue"), value: "$48K" },
								{ label: t("loading.contentLoader.growth"), value: "+12%" },
							].map(({ label, value }) => (
								<div
									key={label}
									className="rounded-lg bg-base-100/60 px-2 py-1.5 text-center"
								>
									<p className="font-bold text-primary text-sm">{value}</p>
									<p className="text-[9px] opacity-40">{label}</p>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className="space-y-3 rounded-xl bg-base-200/40 p-3">
						<div className="flex items-center gap-2.5">
							<Skeleton variant="circle" className="h-10 w-10" />
							<div className="flex-1 space-y-1.5">
								<Skeleton className="h-3.5 w-2/5" />
								<Skeleton className="h-2.5 w-1/3" />
							</div>
						</div>
						<Skeleton lines={2} />
						<div className="grid grid-cols-3 gap-2">
							{[1, 2, 3].map((n) => (
								<div
									key={n}
									className="flex flex-col items-center gap-1 rounded-lg bg-base-100/60 p-2"
								>
									<Skeleton className="h-4 w-10" />
									<Skeleton className="h-2 w-6" />
								</div>
							))}
						</div>
					</div>
				)}
				<ToggleLoadButton
					loaded={loaded}
					onToggle={toggle}
					showLabel={t("loading.contentLoader.showSkeleton")}
					loadLabel={t("loading.contentLoader.loadContent")}
				/>
			</div>
		</ShowcaseCard>
	);
}

function OrbitingLoaderDemo() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(true);

	useEffect(() => {
		if (!containerRef.current || !active) {
			return;
		}
		const dots = containerRef.current.querySelectorAll(".orbit-dot");
		const tl = gsap.timeline({ repeat: -1 });

		dots.forEach((dot, i) => {
			gsap.set(dot, {
				transformOrigin: "50% 50%",
			});
			tl.fromTo(
				dot,
				{ opacity: 0.3, rotation: i * 120, scale: 0.6 },
				{
					duration: 2.4,
					ease: "none",
					opacity: 1,
					repeat: -1,
					rotation: i * 120 + 360,
					scale: 1,
				},
				0,
			);
		});

		return () => {
			tl.kill();
		};
	}, [active]);

	return (
		<ShowcaseCard
			title={t("loading.orbitLoader.title")}
			description={t("loading.orbitLoader.description")}
		>
			<div className="flex flex-col items-center gap-4">
				<div className="flex h-32 w-full items-center justify-center rounded-xl bg-gradient-to-br from-base-200/60 to-base-200/20">
					<div ref={containerRef} className="relative h-20 w-20">
						<div className="absolute top-1/2 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-base-100 shadow-lg">
							<Cloud size={18} className="ds-breathe text-primary" />
						</div>
						{["bg-primary", "bg-secondary", "bg-accent"].map((color, i) => (
							<div
								key={`od-${i.toString()}`}
								className="absolute top-1/2 left-1/2"
								style={{
									height: 0,
									width: 0,
								}}
							>
								<div
									className={`orbit-dot absolute h-3 w-3 rounded-full shadow-md ${color}`}
									style={{
										left: "22px",
										top: "-6px",
									}}
								/>
							</div>
						))}
					</div>
				</div>
				<button
					type="button"
					className="btn btn-ghost btn-xs opacity-50 hover:opacity-100"
					onClick={() => setActive((a) => !a)}
				>
					{active
						? t("loading.orbitLoader.pause")
						: t("loading.orbitLoader.resume")}
				</button>
			</div>
		</ShowcaseCard>
	);
}

function MultiStepProgressDemo() {
	const { t } = useTranslation("showcase");
	const [currentStep, setCurrentStep] = useState(-1);
	const barRefs = useRef<(HTMLDivElement | null)[]>([]);
	const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

	const STEPS = [
		{ icon: Download, label: t("loading.multiStep.download") },
		{ icon: Database, label: t("loading.multiStep.process") },
		{ icon: ShieldCheck, label: t("loading.multiStep.verify") },
		{ icon: Layers, label: t("loading.multiStep.deploy") },
	];

	const run = () => {
		setCurrentStep(-1);
		let step = 0;
		const interval = setInterval(() => {
			setCurrentStep(step);
			const bar = barRefs.current[step];
			if (bar) {
				gsap.fromTo(
					bar,
					{ scaleX: 0 },
					{ duration: 0.6, ease: "power2.out", scaleX: 1 },
				);
			}
			const icon = iconRefs.current[step];
			if (icon) {
				gsap.fromTo(
					icon,
					{ opacity: 0, scale: 0.5 },
					{ duration: 0.4, ease: "back.out(2)", opacity: 1, scale: 1 },
				);
			}
			step++;
			if (step >= STEPS.length) {
				clearInterval(interval);
			}
		}, 900);
	};

	return (
		<ShowcaseCard
			title={t("loading.multiStep.title")}
			description={t("loading.multiStep.description")}
		>
			<div className="space-y-4">
				<div className="flex items-center justify-between px-1">
					{STEPS.map(({ icon: Icon, label }, i) => (
						<div key={label} className="flex flex-col items-center gap-1.5">
							<div
								ref={(el) => {
									iconRefs.current[i] = el;
									return () => {
										iconRefs.current[i] = null;
									};
								}}
								className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
									i <= currentStep
										? "bg-primary text-primary-content shadow-md"
										: "bg-base-200 text-base-content/30"
								}`}
							>
								<Icon size={16} />
							</div>
							<span
								className={`font-semibold text-[9px] tracking-wider transition-colors ${
									i <= currentStep ? "text-primary" : "opacity-30"
								}`}
							>
								{label}
							</span>
						</div>
					))}
				</div>
				<div className="flex items-center gap-0 px-5">
					{STEPS.slice(0, -1).map((_, i) => (
						<div
							key={`bar-${i.toString()}`}
							className="h-1 flex-1 overflow-hidden rounded-full bg-base-200"
						>
							<div
								ref={(el) => {
									barRefs.current[i] = el;
									return () => {
										barRefs.current[i] = null;
									};
								}}
								className="h-full origin-left rounded-full bg-primary"
								style={{
									transform: i <= currentStep - 1 ? "scaleX(1)" : "scaleX(0)",
								}}
							/>
						</div>
					))}
				</div>
				<Button size="sm" variant="primary" className="w-full" onClick={run}>
					{currentStep >= STEPS.length - 1
						? t("loading.multiStep.replay")
						: t("loading.multiStep.startPipeline")}
				</Button>
			</div>
		</ShowcaseCard>
	);
}

function ShimmerCardDemo() {
	const { t } = useTranslation("showcase");
	const [loaded, setLoaded] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);

	const toggle = () => {
		if (loaded) {
			setLoaded(false);
			return;
		}
		setLoaded(true);
		if (cardRef.current) {
			gsap.fromTo(
				cardRef.current.children,
				{ opacity: 0, scale: 0.97, y: 16 },
				{
					duration: 0.5,
					ease: "power3.out",
					opacity: 1,
					scale: 1,
					stagger: 0.1,
					y: 0,
				},
			);
		}
	};

	return (
		<ShowcaseCard
			title={t("loading.shimmerCard.title")}
			description={t("loading.shimmerCard.description")}
		>
			<div className="space-y-3">
				{loaded ? (
					<div
						ref={cardRef}
						className="overflow-hidden rounded-xl border border-base-content/5 bg-base-100"
					>
						<div className="ds-gradient-bg relative h-24 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10">
							<div className="absolute bottom-2 left-3 flex items-center gap-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-base-100 shadow-md">
									<Activity size={14} className="text-primary" />
								</div>
								<div>
									<p className="font-semibold text-base-content text-xs">
										{t("loading.shimmerCard.analyticsPro")}
									</p>
									<p className="text-[9px] text-base-content/50">
										{t("loading.shimmerCard.realTime")}
									</p>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-px bg-base-content/5 p-px">
							{[
								{ l: t("loading.shimmerCard.visitors"), v: "12.8K" },
								{ l: t("loading.shimmerCard.bounce"), v: "24%" },
								{ l: t("loading.shimmerCard.duration"), v: "3m 42s" },
							].map(({ l, v }) => (
								<div
									key={l}
									className="flex flex-col items-center gap-0.5 bg-base-100 py-2"
								>
									<span className="font-bold text-primary text-sm">{v}</span>
									<span className="text-[8px] opacity-40">{l}</span>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className="overflow-hidden rounded-xl border border-base-content/5">
						<div className="relative h-24 overflow-hidden bg-base-200/60">
							<div className="ds-shimmer-bar absolute inset-0 opacity-30" />
							<div className="absolute bottom-2 left-3 flex items-center gap-2">
								<Skeleton variant="circle" className="h-8 w-8" />
								<div className="space-y-1">
									<Skeleton className="h-2.5 w-16" />
									<Skeleton className="h-2 w-10" />
								</div>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-px bg-base-content/5 p-px">
							{Array.from({ length: 3 }, (_, idx) => (
								<div
									key={`shimmer-skel-${idx.toString()}`}
									className="flex flex-col items-center gap-1 bg-base-100 py-2.5"
								>
									<Skeleton className="h-3.5 w-10" />
									<Skeleton className="h-1.5 w-6" />
								</div>
							))}
						</div>
					</div>
				)}
				<ToggleLoadButton
					loaded={loaded}
					onToggle={toggle}
					showLabel={t("loading.shimmerCard.showSkeleton")}
					loadLabel={t("loading.shimmerCard.loadCard")}
				/>
			</div>
		</ShowcaseCard>
	);
}

type LoadingState = "idle" | "loading" | "done";

function InlineLoadingDemo() {
	const { t } = useTranslation("showcase");
	const [states, setStates] = useState({
		connect: "idle" as LoadingState,
		sync: "idle" as LoadingState,
		upload: "idle" as LoadingState,
	});

	const resetToIdle = (key: keyof typeof states) => {
		setStates((s) => ({ ...s, [key]: "idle" }));
	};

	const markDone = (key: keyof typeof states) => {
		setStates((s) => ({ ...s, [key]: "done" }));
		setTimeout(() => resetToIdle(key), 2000);
	};

	const simulate = (key: keyof typeof states) => {
		setStates((s) => ({ ...s, [key]: "loading" }));
		setTimeout(() => markDone(key), 1500 + secureRandom() * 1000);
	};

	const items = [
		{
			desc: t("loading.inlineLoading.connectDesc"),
			icon: Wifi,
			key: "connect" as const,
			label: t("loading.inlineLoading.connectApi"),
		},
		{
			desc: t("loading.inlineLoading.syncDesc"),
			icon: Database,
			key: "sync" as const,
			label: t("loading.inlineLoading.syncDb"),
		},
		{
			desc: t("loading.inlineLoading.uploadDesc"),
			icon: Cloud,
			key: "upload" as const,
			label: t("loading.inlineLoading.uploadAssets"),
		},
	];

	const stateColorClass: Record<string, string> = {
		done: "bg-success/15 text-success",
		idle: "bg-base-content/5 text-base-content/30",
		loading: "bg-primary/15 text-primary",
	};

	const stateLabel = (state: "idle" | "loading" | "done") => {
		const map = {
			done: t("loading.inlineLoading.done"),
			idle: t("loading.inlineLoading.idle"),
			loading: t("loading.inlineLoading.loading"),
		};
		return map[state];
	};

	return (
		<ShowcaseCard
			title={t("loading.inlineLoading.title")}
			description={t("loading.inlineLoading.description")}
		>
			<div className="space-y-2">
				{items.map(({ key, icon: Icon, label, desc }) => (
					<button
						key={key}
						type="button"
						onClick={() => states[key] === "idle" && simulate(key)}
						className="flex w-full items-center gap-3 rounded-xl bg-base-200/40 p-3 text-left transition-colors hover:bg-base-200/70"
					>
						<div
							className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${stateColorClass[states[key]]}`}
						>
							{states[key] === "loading" && (
								<Spinner size="xs" className="text-primary" />
							)}
							{states[key] === "done" && <ShieldCheck size={14} />}
							{states[key] === "idle" && <Icon size={14} />}
						</div>
						<div className="min-w-0 flex-1">
							<p className="font-medium text-xs">{label}</p>
							<p className="text-[10px] opacity-40">{desc}</p>
						</div>
						<span
							className={`rounded-full px-2 py-0.5 font-semibold text-[9px] tracking-wider ${stateColorClass[states[key]]}`}
						>
							{stateLabel(states[key])}
						</span>
					</button>
				))}
			</div>
		</ShowcaseCard>
	);
}

export default function LoadingShowcase() {
	const { t } = useTranslation("showcase");

	return (
		<Section
			id="loading"
			title={t("loading.sectionTitle")}
			badge={t("loading.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<SpinnersDemo />
				<SkeletonVariantsDemo />
				<SkeletonScreenDemo />
				<ProgressDemo />
				<LoadingOverlayDemo />
				<ContentLoaderDemo />
				<OrbitingLoaderDemo />
				<MultiStepProgressDemo />
				<ShimmerCardDemo />
				<InlineLoadingDemo />
			</div>
		</Section>
	);
}
