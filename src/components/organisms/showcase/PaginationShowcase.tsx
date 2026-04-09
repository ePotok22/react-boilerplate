import {
	ChevronsLeft,
	ChevronsRight,
	Gauge,
	MoreHorizontal,
	Rows3,
	Scaling,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/atoms";
import { Pagination } from "@/components/molecules";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";

function PaginationSmallDemo() {
	const { t } = useTranslation("showcase");
	const [p, setP] = useState(2);
	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<span className="text-xs opacity-50">5 pages</span>
				<Badge variant="ghost" size="sm">
					{t("pagination.interactive.noEllipsis")}
				</Badge>
			</div>
			<Pagination currentPage={p} totalPages={5} onPageChange={setP} />
		</div>
	);
}

const MOCK_ITEMS = [
	{ id: 1, name: "API Gateway", status: "active" },
	{ id: 2, name: "Auth Service", status: "active" },
	{ id: 3, name: "User Service", status: "warning" },
];

export default function PaginationShowcase() {
	const { t } = useTranslation("showcase");
	const [page, setPage] = useState(5);
	const [sizePage, setSizePage] = useState(3);
	const [animPage, setAnimPage] = useState(1);

	return (
		<Section
			id="pagination"
			title={t("pagination.sectionTitle")}
			badge={t("pagination.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("pagination.interactive.title")}
					description={t("pagination.interactive.description")}
				>
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<span className="text-xs opacity-50">20 pages — current:</span>
								<Badge variant="primary" size="sm" dot>
									{page}
								</Badge>
							</div>
							<Pagination
								currentPage={page}
								totalPages={20}
								onPageChange={setPage}
							/>
						</div>
						<div className="divider my-0" />
						<PaginationSmallDemo />
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("pagination.paginatedData.title")}
					description={t("pagination.paginatedData.description")}
				>
					<div className="space-y-3">
						<div className="overflow-hidden rounded-xl border border-base-content/10">
							<div className="bg-base-200/60 px-3 py-1.5 font-semibold text-[10px] tracking-wider opacity-50">
								PAGE {page} OF 20
							</div>
							{MOCK_ITEMS.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between border-base-content/8 border-t px-3 py-2"
								>
									<span className="font-medium text-xs">{item.name}</span>
									<Badge
										variant={item.status === "active" ? "success" : "warning"}
										size="xs"
										dot
									>
										{item.status}
									</Badge>
								</div>
							))}
						</div>
						<div className="grid grid-cols-3 gap-1.5">
							{[
								{
									icon: ChevronsLeft,
									label: t("pagination.paginatedData.firstLast"),
								},
								{
									icon: MoreHorizontal,
									label: t("pagination.paginatedData.ellipsis"),
								},
								{
									icon: ChevronsRight,
									label: t("pagination.paginatedData.disabled"),
								},
							].map(({ icon: Icon, label }) => (
								<div
									key={label}
									className="flex flex-col items-center gap-1 rounded-lg bg-base-200/50 p-2 text-center transition-colors hover:bg-base-200"
								>
									<Icon size={12} className="text-primary opacity-60" />
									<span className="text-[9px] opacity-50">{label}</span>
								</div>
							))}
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("pagination.sizeVariants.title")}
					description={t("pagination.sizeVariants.description")}
				>
					<div className="space-y-4">
						{(["sm", "md", "lg"] as const).map((s) => (
							<div key={s} className="space-y-1.5">
								<div className="flex items-center gap-1.5">
									<Scaling size={10} className="opacity-30" />
									<span className="font-semibold text-[9px] uppercase tracking-wider opacity-40">
										{s}
									</span>
								</div>
								<Pagination
									currentPage={sizePage}
									totalPages={8}
									onPageChange={setSizePage}
									size={s}
								/>
							</div>
						))}
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("pagination.animationNav.title")}
					description={t("pagination.animationNav.description")}
				>
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Gauge size={10} className="opacity-30" />
								<span className="font-semibold text-[9px] tracking-wider opacity-40">
									{t("pagination.withPageInfo")}
								</span>
							</div>
							<Pagination
								currentPage={animPage}
								totalPages={10}
								onPageChange={setAnimPage}
								showInfo
							/>
						</div>
						<div className="divider my-0" />
						<div className="rounded-xl border border-base-content/8 bg-base-200/30 p-3">
							<div className="space-y-2 text-xs">
								{[
									{
										color: "bg-primary/10 text-primary",
										icon: "⟪",
										label: t("pagination.firstLast"),
									},
									{
										color: "bg-primary/10 text-primary",
										icon: "✦",
										label: t("pagination.activeGlow"),
									},
									{
										color: "bg-primary text-primary-content",
										icon: "◌",
										label: t("pagination.ripplePage"),
									},
									{
										color: "bg-primary/10 text-primary",
										icon: "···",
										label: t("pagination.animatedBouncing"),
									},
									{
										color: "bg-primary/10 text-primary",
										icon: "↕",
										label: t("pagination.pageLift"),
									},
								].map((feature) => (
									<div key={feature.label} className="flex items-center gap-2">
										<span
											className={`flex h-5 w-5 items-center justify-center rounded-lg text-[10px] ${feature.color}`}
										>
											{feature.icon}
										</span>
										<span className="opacity-60">{feature.label}</span>
									</div>
								))}
							</div>
						</div>
						<div className="flex items-center gap-2 rounded-lg bg-base-200/50 p-2">
							<Rows3 size={12} className="text-primary opacity-60" />
							<span className="text-[10px] opacity-50">
								{t("pagination.ariaLabel")}
							</span>
						</div>
					</div>
				</ShowcaseCard>
			</div>
		</Section>
	);
}
