import {
	Home,
	LayoutDashboard,
	Lock,
	Mail,
	PanelLeftClose,
	Settings,
	TrendingUp,
	Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";

function AuthPreview() {
	const { t } = useTranslation("showcase");
	return (
		<div className="relative overflow-hidden rounded-xl border border-base-300">
			<div className="flex h-72 items-center justify-center bg-gradient-to-br from-primary/5 via-base-200 to-secondary/5 p-4">
				<div className="pointer-events-none absolute top-0 left-0 h-32 w-32 rounded-full bg-primary/8 blur-2xl" />
				<div className="pointer-events-none absolute right-0 bottom-0 h-28 w-28 rounded-full bg-secondary/8 blur-2xl" />

				<div className="relative w-full max-w-[260px] rounded-2xl border border-base-300/60 bg-base-100 p-5 shadow-base-300/20 shadow-xl">
					<div className="mb-4 flex flex-col items-center gap-1.5">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
							<Lock size={14} className="text-primary" />
						</div>
						<span className="font-bold text-sm">
							{t("layouts.auth.signIn")}
						</span>
						<span className="text-[10px] opacity-50">
							{t("layouts.auth.welcome")}
						</span>
					</div>

					<div className="mb-2.5">
						<span className="mb-0.5 block font-medium text-[9px] opacity-60">
							{t("layouts.auth.email")}
						</span>
						<div className="flex items-center gap-1.5 rounded-lg border border-base-300/80 bg-base-200/40 px-2.5 py-1.5">
							<Mail size={10} className="opacity-30" />
							<span className="text-[10px] opacity-40">user@example.com</span>
						</div>
					</div>

					<div className="mb-3">
						<span className="mb-0.5 block font-medium text-[9px] opacity-60">
							{t("layouts.auth.password")}
						</span>
						<div className="flex items-center gap-1.5 rounded-lg border border-base-300/80 bg-base-200/40 px-2.5 py-1.5">
							<Lock size={10} className="opacity-30" />
							<span className="text-[10px] tracking-widest opacity-40">
								••••••••
							</span>
						</div>
					</div>

					<div className="rounded-lg bg-primary px-3 py-1.5 text-center font-semibold text-[10px] text-primary-content">
						{t("layouts.auth.signIn")}
					</div>

					<div className="mt-3 flex items-center gap-2">
						<div className="h-px flex-1 bg-base-300" />
						<span className="text-[8px] opacity-40">
							{t("layouts.auth.or")}
						</span>
						<div className="h-px flex-1 bg-base-300" />
					</div>
					<div className="mt-2 flex justify-center gap-2">
						{["G", "X", "GH"].map((label) => (
							<div
								key={label}
								className="flex h-6 w-8 items-center justify-center rounded-md border border-base-300/60 font-semibold text-[8px] opacity-50"
							>
								{label}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function DashboardPreview() {
	const { t } = useTranslation("showcase");
	const sidebarItems = [
		{ active: false, icon: Home, label: t("layouts.dashboard.home") },
		{
			active: true,
			icon: LayoutDashboard,
			label: t("layouts.dashboard.dashboard"),
		},
		{ active: false, icon: Users, label: t("layouts.dashboard.users") },
		{ active: false, icon: Settings, label: t("layouts.dashboard.settings") },
	];

	return (
		<div className="relative overflow-hidden rounded-xl border border-base-300">
			<div className="flex h-72">
				<div className="flex w-[72px] flex-col border-base-300/60 border-r bg-gradient-to-b from-base-200 to-base-200/60 px-2 py-3">
					<div className="mb-4 flex h-7 w-7 items-center justify-center self-center rounded-lg bg-primary">
						<span className="font-extrabold text-[10px] text-primary-content">
							RB
						</span>
					</div>
					<div className="flex flex-col gap-0.5">
						{sidebarItems.map(({ icon: Icon, label, active }) => (
							<div
								key={label}
								className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[9px] ${
									active
										? "bg-primary/15 font-semibold text-primary"
										: "opacity-50 hover:opacity-70"
								}`}
							>
								<Icon size={11} />
								<span className="hidden min-[440px]:inline">{label}</span>
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-1 flex-col overflow-hidden">
					<div className="flex items-center justify-between border-base-300/40 border-b bg-base-100/60 px-3 py-2">
						<div className="flex items-center gap-1.5">
							<PanelLeftClose size={11} className="opacity-30" />
							<span className="font-semibold text-[10px]">
								{t("layouts.dashboard.dashboard")}
							</span>
						</div>
						<div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
							<span className="font-bold text-[8px] text-primary">U</span>
						</div>
					</div>

					<div className="flex flex-1 flex-col gap-2 p-3">
						<div className="grid grid-cols-3 gap-1.5">
							{[
								{
									color: "primary",
									label: t("layouts.dashboard.revenue"),
									up: true,
									val: "$12.4k",
								},
								{
									color: "success",
									label: t("layouts.dashboard.users"),
									up: true,
									val: "1,284",
								},
								{
									color: "warning",
									label: t("layouts.dashboard.bounce"),
									up: false,
									val: "24.3%",
								},
							].map(({ label, val, color, up }) => (
								<div
									key={label}
									className={`rounded-lg bg-${color}/8 p-2 transition-colors`}
								>
									<span className="block font-medium text-[7px] opacity-50">
										{label}
									</span>
									<span className="font-bold text-[11px]">{val}</span>
									<span
										className={`ml-0.5 text-[7px] ${up ? "text-success" : "text-warning"}`}
									>
										{up ? "↑" : "↓"}
									</span>
								</div>
							))}
						</div>

						<div className="flex flex-1 flex-col rounded-lg border border-base-300/50 border-dashed p-2">
							<div className="mb-1.5 flex items-center gap-1">
								<TrendingUp size={9} className="text-primary opacity-60" />
								<span className="font-semibold text-[8px] opacity-60">
									{t("layouts.dashboard.monthlyOverview")}
								</span>
							</div>
							<div className="flex flex-1 items-end gap-1 pb-0.5">
								{[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 68].map((h) => (
									<div
										key={`bar-${h.toString()}`}
										className="flex-1 rounded-t bg-primary/20 transition-all"
										style={{ height: `${h}%` }}
									>
										<div
											className="w-full rounded-t bg-primary/50"
											style={{ height: `${Math.min(h * 0.6, 100)}%` }}
										/>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-lg border border-base-300/40 p-2">
							<div className="mb-1 flex gap-4">
								{["Name", "Status", "Date"].map((col) => (
									<span
										key={col}
										className="flex-1 font-semibold text-[7px] opacity-40"
									>
										{col}
									</span>
								))}
							</div>
							{[1, 2].map((row) => (
								<div
									key={`row-${row}`}
									className="flex gap-4 border-base-300/30 border-t py-0.5"
								>
									<div className="h-1.5 flex-1 rounded bg-base-300/60" />
									<div className="h-1.5 w-6 rounded-full bg-success/30" />
									<div className="h-1.5 flex-1 rounded bg-base-300/40" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function LayoutShowcase() {
	const { t } = useTranslation("showcase");
	return (
		<Section
			id="layouts"
			title={t("layouts.sectionTitle")}
			badge={t("layouts.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("layouts.auth.title")}
					description={t("layouts.auth.description")}
				>
					<AuthPreview />
				</ShowcaseCard>
				<ShowcaseCard
					title={t("layouts.dashboard.title")}
					description={t("layouts.dashboard.description")}
				>
					<DashboardPreview />
				</ShowcaseCard>
			</div>
		</Section>
	);
}
