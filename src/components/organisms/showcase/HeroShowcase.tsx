import gsap from "gsap";
import {
	Bell,
	CalendarDays,
	Component,
	FormInput,
	Layout,
	ListChecks,
	Loader,
	MessageSquare,
	MousePointerClick,
	Search,
	ShieldCheck,
	Sparkles,
	Table2,
	TriangleAlert,
	Type,
} from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@/hooks/useGSAP";

export const NAV_ITEMS = [
	{ icon: Sparkles, id: "gsap", labelKey: "nav.gsap" },
	{ icon: Bell, id: "toast", labelKey: "nav.toast" },
	{ icon: CalendarDays, id: "datepicker", labelKey: "nav.datePicker" },
	{ icon: Loader, id: "loading", labelKey: "nav.loading" },
	{ icon: MessageSquare, id: "modal", labelKey: "nav.modal" },
	{ icon: Search, id: "pagination", labelKey: "nav.pagination" },
	{ icon: Table2, id: "table", labelKey: "nav.table" },
	{ icon: FormInput, id: "form", labelKey: "nav.form" },
	{ icon: Type, id: "typography", labelKey: "nav.typography" },
	{ icon: ListChecks, id: "alerts", labelKey: "nav.alertsBadges" },
	{ icon: Layout, id: "layouts", labelKey: "nav.layouts" },
	{ icon: MousePointerClick, id: "hooks", labelKey: "nav.hooks" },
	{ icon: ShieldCheck, id: "auth", labelKey: "nav.auth" },
	{ icon: TriangleAlert, id: "errors", labelKey: "nav.errors" },
	{ icon: Component, id: "atoms", labelKey: "nav.atoms" },
] as const;

export default function HeroShowcase() {
	const { t } = useTranslation("showcase");
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!containerRef.current) {
				return;
			}
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			tl.from(".hero-kicker", { duration: 0.5, opacity: 0, y: 20 })
				.from(".hero-title", { duration: 0.7, opacity: 0, y: 30 }, "-=0.2")
				.from(".hero-subtitle", { duration: 0.6, opacity: 0, y: 20 }, "-=0.3")
				.from(
					".hero-nav-item",
					{ duration: 0.4, opacity: 0, scale: 0.9, stagger: 0.05, y: 15 },
					"-=0.3",
				);
		},
		{ scope: containerRef },
	);

	return (
		<div ref={containerRef} className="mb-10">
			<div className="island-shell relative overflow-hidden rounded-4xl px-6 py-10 sm:px-10 sm:py-14">
				<div className="pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
				<div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
				<p className="hero-kicker island-kicker mb-3">{t("kicker")}</p>
				<h1 className="hero-title display-title mb-3 max-w-3xl font-bold text-(--sea-ink) text-4xl leading-[1.02] tracking-tight sm:text-5xl">
					{t("title")}
				</h1>
				<p className="hero-subtitle mb-6 max-w-2xl text-(--sea-ink-soft) text-base sm:text-lg">
					{t("subtitle")}
				</p>
				<div className="flex flex-wrap gap-2">
					{NAV_ITEMS.map(({ icon: Icon, id, labelKey }) => (
						<a
							key={id}
							href={`#${id}`}
							className="hero-nav-item btn btn-sm btn-outline gap-1.5 rounded-full transition-all duration-200 hover:scale-105"
						>
							<Icon size={14} />
							{t(labelKey)}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
