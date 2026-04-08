import { useTranslation } from "react-i18next";

interface DashboardLayoutProps {
	readonly children: React.ReactNode;
}

export default function DashboardLayout({
	children,
}: Readonly<DashboardLayoutProps>) {
	const { t } = useTranslation("dashboard");
	return (
		<div className="drawer lg:drawer-open">
			<input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<div className="navbar bg-base-100 shadow-sm lg:hidden">
					<div className="flex-none">
						<label
							htmlFor="dashboard-drawer"
							className="btn btn-ghost btn-square drawer-button"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block h-5 w-5 stroke-current"
								aria-hidden="true"
							>
								<title>{t("menu")}</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</label>
					</div>
					<div className="flex-1">
						<span className="font-semibold text-xl">{t("dashboard")}</span>
					</div>
				</div>
				<main className="flex-1 p-6">{children}</main>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="dashboard-drawer"
					aria-label={t("closeSidebar")}
					className="drawer-overlay"
				/>
				<aside className="menu min-h-full w-64 bg-base-200 p-4">
					<div className="mb-6 px-2">
						<span className="font-bold text-xl">{t("dashboard")}</span>
					</div>
					<ul>
						<li>
							<a href="/dashboard">{t("overview")}</a>
						</li>
						<li>
							<a href="/dashboard/settings">{t("settings")}</a>
						</li>
					</ul>
				</aside>
			</div>
		</div>
	);
}
