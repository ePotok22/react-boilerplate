import gsap from "gsap";
import {
	type ReactNode,
	useCallback,
	useEffect,
	useEffectEvent,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/utils/cn";

interface TabItem {
	badge?: number | string;
	content: ReactNode;
	disabled?: boolean;
	icon?: ReactNode;
	label: string;
}

interface TabsProps {
	className?: string;
	defaultIndex?: number;
	items: TabItem[];
	onChange?: (index: number) => void;
	variant?: "line" | "boxed" | "pill";
}

const VARIANT_MAP: Record<string, string> = {
	boxed: "ds-tabs-boxed",
	line: "ds-tabs-line",
	pill: "ds-tabs-pill",
};

export default function Tabs({
	className,
	defaultIndex = 0,
	items,
	onChange,
	variant = "line",
}: Readonly<TabsProps>) {
	const [active, setActive] = useState(defaultIndex);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const tablistRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);
	const panelRefs = useRef<Map<number, HTMLDivElement>>(new Map());
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const mounted = useRef(false);

	const moveIndicator = useEffectEvent((index: number, animate: boolean) => {
		const tab = tabRefs.current[index];
		const indicator = indicatorRef.current;
		const tablist = tablistRef.current;
		if (!tab || !indicator || !tablist) {
			return;
		}

		const tabRect = tab.getBoundingClientRect();
		const listRect = tablist.getBoundingClientRect();
		const x = tabRect.left - listRect.left;
		const y = tabRect.top - listRect.top;

		const shared: gsap.TweenVars = {
			duration: animate ? 0.5 : 0,
			ease: animate ? "elastic.out(1, 0.75)" : "none",
			opacity: 1,
			width: tabRect.width,
			x,
		};

		if (variant === "line") {
			shared.height = 2.5;
			shared.y = tabRect.height + y - 2.5;
		} else {
			shared.height = tabRect.height;
			shared.y = y;
			shared.borderRadius = variant === "pill" ? "9999px" : "0.5rem";
		}

		gsap.to(indicator, shared);
	});

	const moveGlow = useCallback((tab: HTMLButtonElement | null) => {
		const glow = glowRef.current;
		const tablist = tablistRef.current;
		if (!glow || !tablist) {
			return;
		}

		if (!tab) {
			gsap.to(glow, { duration: 0.25, ease: "power2.out", opacity: 0 });
			return;
		}

		const tabRect = tab.getBoundingClientRect();
		const listRect = tablist.getBoundingClientRect();

		gsap.to(glow, {
			duration: 0.3,
			ease: "power2.out",
			height: tabRect.height,
			opacity: 1,
			width: tabRect.width,
			x: tabRect.left - listRect.left,
			y: tabRect.top - listRect.top,
		});
	}, []);

	const animatePanel = useCallback((index: number, prev: number) => {
		const panel = panelRefs.current.get(index);
		if (!panel || index === prev) {
			return;
		}
		const dir = index > prev ? 1 : -1;
		gsap.fromTo(
			panel,
			{
				clipPath: `inset(0 ${dir === 1 ? "100% 0 0" : "0 0 0 100%"})`,
				opacity: 0,
			},
			{
				clipPath: "inset(0 0% 0 0%)",
				duration: 0.45,
				ease: "power3.out",
				opacity: 1,
			},
		);
	}, []);

	const prevActive = useRef(defaultIndex);

	useLayoutEffect(() => {
		const shouldAnimate = mounted.current && prevActive.current !== active;
		moveIndicator(active, shouldAnimate);

		if (shouldAnimate) {
			requestAnimationFrame(() => animatePanel(active, prevActive.current));
		}
		prevActive.current = active;

		if (!mounted.current && wrapperRef.current) {
			mounted.current = true;
			const tabs = wrapperRef.current.querySelectorAll(".ds-tab");
			gsap.fromTo(
				tabs,
				{ opacity: 0, y: 8 },
				{
					delay: 0.05,
					duration: 0.4,
					ease: "power3.out",
					opacity: 1,
					stagger: 0.06,
					y: 0,
				},
			);
		}
	}, [active, animatePanel]);

	useEffect(() => {
		const handleResize = () => moveIndicator(active, false);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [active]);

	const handleSelect = useCallback(
		(index: number) => {
			if (items[index]?.disabled) {
				return;
			}
			setActive(index);
			onChange?.(index);

			const tab = tabRefs.current[index];
			if (tab) {
				gsap.fromTo(
					tab,
					{ scale: 0.96 },
					{ duration: 0.35, ease: "elastic.out(1, 0.6)", scale: 1 },
				);
			}
		},
		[items, onChange],
	);

	return (
		<div ref={wrapperRef} className={cn("ds-tabs-wrapper", className)}>
			<div
				ref={tablistRef}
				role="tablist"
				className={cn("ds-tabs", VARIANT_MAP[variant])}
			>
				<div
					ref={glowRef}
					aria-hidden="true"
					className="ds-tabs-glow"
					style={{ opacity: 0 }}
				/>
				<div
					ref={indicatorRef}
					aria-hidden="true"
					className={cn("ds-tabs-indicator", `ds-tabs-indicator-${variant}`)}
					style={{ opacity: 0 }}
				/>
				{items.map((item, i) => (
					<button
						key={item.label}
						ref={(el) => {
							tabRefs.current[i] = el;
							return () => {
								tabRefs.current[i] = null;
							};
						}}
						type="button"
						role="tab"
						aria-selected={i === active}
						aria-controls={`tabpanel-${i}`}
						disabled={item.disabled}
						onClick={() => handleSelect(i)}
						onMouseEnter={() => moveGlow(tabRefs.current[i] ?? null)}
						onMouseLeave={() => moveGlow(null)}
						className={cn(
							"ds-tab",
							i === active && "ds-tab-active",
							item.disabled && "ds-tab-disabled",
						)}
					>
						{item.icon && <span className="ds-tab-icon">{item.icon}</span>}
						<span>{item.label}</span>
						{item.badge !== undefined && (
							<span className="ds-tab-badge">{item.badge}</span>
						)}
					</button>
				))}
			</div>
			{items.map((item, i) => (
				<div
					key={item.label}
					ref={(el) => {
						if (el) {
							panelRefs.current.set(i, el);
						}
						return () => {
							panelRefs.current.delete(i);
						};
					}}
					id={`tabpanel-${i}`}
					role="tabpanel"
					hidden={i !== active}
					className="ds-tab-panel"
				>
					{item.content}
				</div>
			))}
		</div>
	);
}
