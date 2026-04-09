import {
	Database,
	Edit,
	Layers,
	Loader,
	MousePointerClick,
	PackageOpen,
	Pin,
	Rows3,
	Search,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/atoms";
import { InputGroup, Table } from "@/components/molecules";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	status: string;
}

interface Product {
	id: number;
	name: string;
	price: number;
	stock: number;
	category: string;
}

function stockVariant(stock: number): "error" | "warning" | "success" {
	if (stock === 0) {
		return "error";
	}
	if (stock < 20) {
		return "warning";
	}
	return "success";
}

const USERS: User[] = [
	{
		email: "alice@acme.io",
		id: 1,
		name: "Alice Johnson",
		role: "Admin",
		status: "active",
	},
	{
		email: "bob@acme.io",
		id: 2,
		name: "Bob Smith",
		role: "Editor",
		status: "active",
	},
	{
		email: "charlie@acme.io",
		id: 3,
		name: "Charlie Brown",
		role: "Viewer",
		status: "inactive",
	},
	{
		email: "diana@acme.io",
		id: 4,
		name: "Diana Prince",
		role: "Admin",
		status: "active",
	},
	{
		email: "eve@acme.io",
		id: 5,
		name: "Eve Williams",
		role: "Editor",
		status: "pending",
	},
];

const PRODUCTS: Product[] = [
	{
		category: "Electronics",
		id: 1,
		name: "Wireless Headphones",
		price: 79.99,
		stock: 142,
	},
	{
		category: "Electronics",
		id: 2,
		name: "Ergonomic Keyboard",
		price: 129.99,
		stock: 38,
	},
	{
		category: "Furniture",
		id: 3,
		name: "Standing Desk",
		price: 449,
		stock: 12,
	},
	{
		category: "Accessories",
		id: 4,
		name: "Monitor Light Bar",
		price: 59.99,
		stock: 67,
	},
	{
		category: "Accessories",
		id: 5,
		name: "Desk Organizer",
		price: 24.99,
		stock: 203,
	},
	{ category: "Electronics", id: 6, name: "Webcam HD", price: 89.99, stock: 0 },
];

const statusColor: Record<string, string> = {
	active: "success",
	inactive: "ghost",
	pending: "warning",
};

const roleColor: Record<string, string> = {
	Admin: "primary",
	Editor: "secondary",
	Viewer: "accent",
};

export default function TableShowcase() {
	const { t } = useTranslation("showcase");
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [filter, setFilter] = useState("");
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(3);

	const productColumns = [
		{ header: t("table.columns.product"), key: "name" },
		{
			header: t("table.columns.price"),
			key: "price",
			render: (row: Product) => (
				<span className="font-mono">${row.price.toFixed(2)}</span>
			),
		},
		{
			header: t("table.columns.stock"),
			key: "stock",
			render: (row: Product) => (
				<Badge variant={stockVariant(row.stock)} size="sm">
					{row.stock === 0 ? "Out" : row.stock}
				</Badge>
			),
		},
	];

	const filteredProducts = PRODUCTS.filter(
		(p) =>
			p.name.toLowerCase().includes(filter.toLowerCase()) ||
			p.category.toLowerCase().includes(filter.toLowerCase()),
	);

	return (
		<Section
			id="table"
			title={t("table.sectionTitle")}
			badge={t("table.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("table.defaultTable.title")}
					description={t("table.defaultTable.description")}
				>
					<div className="space-y-3">
						<Table<User>
							columns={[
								{ header: t("table.columns.name"), key: "name" },
								{
									header: t("table.columns.role"),
									key: "role",
									render: (row) => (
										<Badge
											variant={
												roleColor[row.role] as
													| "primary"
													| "secondary"
													| "accent"
											}
											size="sm"
										>
											{row.role}
										</Badge>
									),
								},
								{
									header: t("table.columns.status"),
									key: "status",
									render: (row) => (
										<Badge
											variant={
												statusColor[row.status] as
													| "success"
													| "warning"
													| "ghost"
											}
											size="sm"
											dot
										>
											{row.status}
										</Badge>
									),
								},
							]}
							data={USERS}
							onRowClick={(row) => setSelectedUser(row)}
						/>
						{selectedUser && (
							<div className="flex items-center gap-2 rounded-xl bg-primary/8 px-3 py-2 text-xs">
								<MousePointerClick size={14} className="text-primary" />
								<span>
									{t("table.defaultTable.selected")}{" "}
									<strong>{selectedUser.name}</strong> — {selectedUser.email}
								</span>
							</div>
						)}
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("table.loadingState.title")}
					description={t("table.loadingState.description")}
				>
					<Table<User>
						columns={[
							{ header: t("table.columns.name"), key: "name" },
							{ header: t("table.columns.email"), key: "email" },
							{ header: t("table.columns.role"), key: "role" },
						]}
						data={[]}
						loading
					/>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("table.pagination.title")}
					description={t("table.pagination.description")}
				>
					<Table<Product>
						columns={productColumns}
						data={PRODUCTS}
						variant="zebra"
						pageSize={pageSize}
						pageSizeOptions={[2, 3, 5]}
						currentPage={page}
						onPageChange={setPage}
						onPageSizeChange={(s) => {
							setPageSize(s);
							setPage(1);
						}}
					/>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("table.actionButtons.title")}
					description={t("table.actionButtons.description")}
				>
					<Table<User>
						columns={[
							{ header: t("table.columns.name"), key: "name" },
							{ header: t("table.columns.role"), key: "role" },
							{
								header: t("table.columns.actions"),
								key: "actions",
								render: () => (
									<div className="flex items-center gap-1">
										<button
											type="button"
											className="ds-table-action-btn"
											aria-label="Edit"
										>
											<Edit size={14} />
										</button>
										<button
											type="button"
											className="ds-table-action-btn text-error"
											aria-label="Delete"
										>
											<Trash2 size={14} />
										</button>
									</div>
								),
							},
						]}
						data={USERS}
						hoverable
					/>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("table.compact.title")}
					description={t("table.compact.description")}
				>
					<div className="space-y-3">
						<InputGroup startAddon={<Search size={14} />}>
							<input
								type="text"
								placeholder={t("table.compact.filterPlaceholder")}
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
								className="ds-field-input text-xs"
							/>
						</InputGroup>
						<Table<Product>
							columns={[
								...productColumns,
								{ header: t("table.columns.category"), key: "category" },
							]}
							data={filteredProducts}
							variant="compact"
							emptyMessage={t("table.compact.noMatch")}
						/>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("table.emptyState.title")}
					description={t("table.emptyState.description")}
				>
					<div className="space-y-4">
						<Table<Record<string, unknown>>
							columns={[
								{ header: t("table.columns.columnA"), key: "a" },
								{ header: t("table.columns.columnB"), key: "b" },
							]}
							data={[]}
							emptyIcon={<PackageOpen size={40} />}
							emptyMessage={t("table.emptyState.noRecords")}
							emptyDescription={t("table.emptyState.addFirst")}
						/>
						<div className="divider my-0" />
						<div className="flex flex-wrap gap-2">
							{[
								{
									desc: t("table.emptyState.loadingDesc"),
									icon: Loader,
									label: t("table.emptyState.loading"),
								},
								{
									desc: t("table.emptyState.paginationDesc"),
									icon: Rows3,
									label: t("table.emptyState.pagination"),
								},
								{
									desc: t("table.emptyState.threeVariantsDesc"),
									icon: Layers,
									label: t("table.emptyState.threeVariants"),
								},
								{
									desc: t("table.emptyState.iconTitleDesc"),
									icon: Database,
									label: t("table.emptyState.emptyState"),
								},
								{
									desc: t("table.emptyState.stickyHeaderDesc"),
									icon: Pin,
									label: t("table.emptyState.stickyHeader"),
								},
							].map(({ icon: Icon, label, desc }) => (
								<div
									key={label}
									className="flex items-center gap-2 rounded-lg bg-base-200/40 px-2.5 py-1.5"
								>
									<Icon size={12} className="text-primary" />
									<div>
										<p className="font-bold text-[10px] leading-none">
											{label}
										</p>
										<p className="text-[9px] opacity-50">{desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</ShowcaseCard>
			</div>
		</Section>
	);
}
