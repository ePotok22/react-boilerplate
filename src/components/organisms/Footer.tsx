import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Heart } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@/hooks/useGSAP";

if (globalThis.window !== undefined) {
	gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
	const { t } = useTranslation(["footer", "common"]);
	const year = new Date().getFullYear();
	const footerRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (!footerRef.current) {
				return;
			}

			const divider = footerRef.current.querySelector(".ds-footer-divider");
			if (divider) {
				gsap.fromTo(
					divider,
					{ scaleX: 0 },
					{
						duration: 0.8,
						ease: "power3.out",
						scaleX: 1,
						scrollTrigger: {
							once: true,
							start: "top 95%",
							trigger: footerRef.current,
						},
						transformOrigin: "left center",
					},
				);
			}

			const items = footerRef.current.querySelectorAll(".ds-footer-item");
			if (items.length > 0) {
				gsap.fromTo(
					items,
					{ opacity: 0, y: 20 },
					{
						delay: 0.3,
						duration: 0.6,
						ease: "power3.out",
						opacity: 1,
						scrollTrigger: {
							once: true,
							start: "top 95%",
							trigger: footerRef.current,
						},
						stagger: 0.1,
						y: 0,
					},
				);
			}

			const socials = footerRef.current.querySelectorAll(".ds-footer-social");
			if (socials.length > 0) {
				gsap.fromTo(
					socials,
					{ opacity: 0, scale: 0.5 },
					{
						delay: 0.5,
						duration: 0.5,
						ease: "back.out(2)",
						opacity: 1,
						scale: 1,
						scrollTrigger: {
							once: true,
							start: "top 95%",
							trigger: footerRef.current,
						},
						stagger: 0.08,
					},
				);
			}
		},
		{ scope: footerRef },
	);

	return (
		<footer ref={footerRef} className="ds-footer">
			<div className="ds-footer-divider" />

			<div className="page-wrap">
				<div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
					<div className="ds-footer-item flex flex-col items-center gap-2 sm:items-start">
						<span className="font-bold text-(--sea-ink) text-base tracking-tight">
							{t("footer:brand")}
						</span>
						<p className="m-0 max-w-xs text-center text-(--sea-ink-soft)/60 text-xs sm:text-left">
							{t("footer:description")}
						</p>
					</div>

					<div className="flex items-center gap-2">
						<a
							href="https://github.com/ePotok22/react-boilerplate"
							target="_blank"
							rel="noreferrer"
							className="ds-footer-social"
							aria-label={t("common:github")}
						>
							<span className="sr-only">{t("common:github")}</span>
							<svg
								viewBox="0 0 16 16"
								aria-hidden="true"
								width="18"
								height="18"
							>
								<path
									fill="currentColor"
									d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
								/>
							</svg>
						</a>
					</div>

					<div className="ds-footer-item">
						<span className="ds-footer-badge">
							<Code2 size={12} />
							{t("footer:badge")}
						</span>
					</div>
				</div>

				<div className="ds-footer-bottom ds-footer-item">
					<p className="m-0 text-(--sea-ink-soft)/40 text-xs">
						{t("footer:copyright", { year })}
					</p>
					<p className="m-0 flex items-center gap-1 text-(--sea-ink-soft)/40 text-xs">
						{t("footer:madeWith")} <Heart size={10} className="text-error" />{" "}
						{t("footer:coffee")}
					</p>
				</div>
			</div>
		</footer>
	);
}
