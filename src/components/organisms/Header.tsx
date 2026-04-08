import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "@/atoms/ThemeToggle";
import { useGSAP } from "@/hooks/useGSAP";
import LanguageSwitcher from "@/molecules/LanguageSwitcher";

export default function Header() {
	const { t } = useTranslation(["header", "common"]);
	const navRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (!navRef.current || !headerRef.current) {
				return;
			}

			gsap.fromTo(
				headerRef.current,
				{ opacity: 0, y: -24 },
				{ duration: 0.5, ease: "power3.out", opacity: 1, y: 0 },
			);

			gsap.fromTo(
				navRef.current.children,
				{ opacity: 0, scale: 0.92, y: -14 },
				{
					delay: 0.15,
					duration: 0.45,
					ease: "back.out(1.4)",
					opacity: 1,
					scale: 1,
					stagger: 0.07,
					y: 0,
				},
			);
		},
		{ scope: navRef },
	);

	return (
		<header ref={headerRef} className="ds-header">
			<nav
				ref={navRef}
				className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-3.5"
			>
				<h2 className="m-0 shrink-0 font-semibold text-base tracking-tight">
					<Link to="/" className="ds-header-logo">
						<span className="ds-header-dot" />
						{t("header:logo")}
					</Link>
				</h2>

				<div className="ml-auto flex items-center gap-1 sm:ml-0 sm:gap-1.5">
					<a
						href="https://github.com/ePotok22/react-boilerplate"
						target="_blank"
						rel="noreferrer"
						className="ds-header-icon-btn hidden sm:flex"
					>
						<span className="sr-only">{t("common:github")}</span>
						<svg viewBox="0 0 16 16" aria-hidden="true" width="18" height="18">
							<path
								fill="currentColor"
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
							/>
						</svg>
					</a>

					<LanguageSwitcher />
					<ThemeToggle />
				</div>

				<div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 font-semibold text-sm sm:order-2 sm:w-auto sm:flex-nowrap sm:pb-0">
					<Link
						to="/"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						{t("common:home")}
					</Link>
				</div>
			</nav>
		</header>
	);
}
