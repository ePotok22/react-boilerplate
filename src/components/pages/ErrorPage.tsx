import gsap from "gsap";
import { RefreshCw, ServerCrash } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
	const { t } = useTranslation("errors");
	const containerRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current || !iconRef.current) {
			return;
		}
		const tl = gsap.timeline();
		tl.fromTo(
			iconRef.current,
			{ opacity: 0, rotation: -15, scale: 0.5 },
			{
				duration: 0.6,
				ease: "back.out(1.7)",
				opacity: 1,
				rotation: 0,
				scale: 1,
			},
		);
		tl.fromTo(
			containerRef.current.querySelectorAll(".reveal-item"),
			{ opacity: 0, y: 20 },
			{ duration: 0.5, ease: "power2.out", opacity: 1, stagger: 0.1, y: 0 },
			"-=0.3",
		);
	}, []);

	return (
		<main
			ref={containerRef}
			className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
		>
			<div
				ref={iconRef}
				className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-error/10"
			>
				<ServerCrash size={48} className="text-error" />
			</div>
			<p className="reveal-item mb-2 font-bold text-(--coral) text-7xl tracking-tight">
				500
			</p>
			<h1 className="reveal-item mb-4 font-bold text-(--sea-ink) text-2xl">
				{t("server.title")}
			</h1>
			<p className="reveal-item mb-8 max-w-md text-(--sea-ink-soft)">
				{t("server.description")}
			</p>
			<button
				type="button"
				className="reveal-item ds-btn btn-primary gap-2"
				onClick={() => window.location.reload()}
			>
				<RefreshCw size={16} />
				{t("server.retry")}
			</button>
		</main>
	);
}
