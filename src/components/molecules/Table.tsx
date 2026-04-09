import gsap from "gsap";
import { ChevronDown, DatabaseZap } from "lucide-react";
import {
	useCallback,
	useEffect,
	useEffectEvent,
	useRef,
	useState,
} from "react";
import { useTranslation } from "react-i18next";
import Pagination from "@/molecules/Pagination";
import { cn } from "@/utils/cn";

interface Column<T> {
	key: string;
	header: string;
	render?: (row: T, index: number) => React.ReactNode;
	className?: string;
	headerClassName?: string;
}

function getCellValue<T>(row: T, col: Column<T>, index: number) {
	if (col.render) {
		return col.render(row, index);
	}
	const value = (row as Record<string, unknown>)[col.key];
	if (value == null) {
		return "";
	}
	if (typeof value === "string") {
		return value;
	}
	if (typeof value === "number" || typeof value === "boolean") {
		return `${value}`;
	}
	return JSON.stringify(value);
}

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	className?: string;
	variant?: "default" | "zebra" | "compact";
	hoverable?: boolean;
	stickyHeader?: boolean;
	loading?: boolean;
	emptyIcon?: React.ReactNode;
	emptyMessage?: string;
	emptyDescription?: string;
	onRowClick?: (row: T, index: number) => void;
	rowKey?: (row: T, index: number) => string;
	pageSize?: number;
	pageSizeOptions?: number[];
	currentPage?: number;
	onPageChange?: (page: number) => void;
	onPageSizeChange?: (size: number) => void;
}

const variantMap: Record<string, string> = {
	compact: "ds-table ds-table-compact",
	default: "ds-table",
	zebra: "ds-table ds-table-zebra",
};

const SKELETON_ROWS = 5;
const SKELETON_WIDTHS = ["w-3/4", "w-1/2", "w-2/3", "w-5/6", "w-3/5"];

export default function Table<T extends object>({
	columns,
	data,
	className,
	variant = "default",
	hoverable = true,
	stickyHeader = false,
	loading = false,
	emptyIcon,
	emptyMessage,
	emptyDescription,
	onRowClick,
	rowKey,
	pageSize,
	pageSizeOptions,
	currentPage,
	onPageChange,
	onPageSizeChange,
}: Readonly<TableProps<T>>) {
	const { t } = useTranslation("common");
	const wrapperRef = useRef<HTMLDivElement>(null);
	const hasAnimated = useRef(false);
	const [sizeOpen, setSizeOpen] = useState(false);
	const sizeRef = useRef<HTMLDivElement>(null);

	const totalPages = pageSize
		? Math.max(1, Math.ceil(data.length / pageSize))
		: 0;
	const activePage = currentPage ?? 1;
	const paginatedData = (() => {
		if (!pageSize) {
			return data;
		}
		const start = (activePage - 1) * pageSize;
		return data.slice(start, start + pageSize);
	})();

	const footerInfo = (() => {
		if (!pageSize) {
			return "";
		}
		const start = (activePage - 1) * pageSize + 1;
		const end = Math.min(activePage * pageSize, data.length);
		return t("table.showingRange", { end, start, total: data.length });
	})();

	const onCloseSizeMenu = useEffectEvent((e: MouseEvent) => {
		if (sizeRef.current && !sizeRef.current.contains(e.target as Node)) {
			setSizeOpen(false);
		}
	});

	useEffect(() => {
		if (sizeOpen) {
			document.addEventListener("mousedown", onCloseSizeMenu);
		}
		return () => document.removeEventListener("mousedown", onCloseSizeMenu);
	}, [sizeOpen]);

	useEffect(() => {
		if (!wrapperRef.current || hasAnimated.current) {
			return;
		}
		hasAnimated.current = true;

		const el = wrapperRef.current;

		gsap.fromTo(
			el,
			{ opacity: 0, rotateX: 2, scale: 0.96, y: 30 },
			{
				duration: 0.65,
				ease: "power3.out",
				opacity: 1,
				rotateX: 0,
				scale: 1,
				y: 0,
			},
		);

		const ths = el.querySelectorAll(".ds-table-th");
		if (ths.length > 0) {
			gsap.fromTo(
				ths,
				{ opacity: 0, scale: 0.92, y: -12 },
				{
					delay: 0.15,
					duration: 0.4,
					ease: "back.out(1.4)",
					opacity: 1,
					scale: 1,
					stagger: 0.06,
					y: 0,
				},
			);
		}

		const rows = el.querySelectorAll(".ds-table-row");
		if (rows.length > 0) {
			gsap.fromTo(
				rows,
				{ opacity: 0, scale: 0.98, x: -20 },
				{
					delay: 0.25,
					duration: 0.45,
					ease: "power2.out",
					opacity: 1,
					scale: 1,
					stagger: 0.05,
					x: 0,
				},
			);
		}

		const skels = el.querySelectorAll(".ds-table-skeleton");
		if (skels.length > 0) {
			gsap.fromTo(
				skels,
				{ opacity: 0, scaleX: 0.3 },
				{
					delay: 0.1,
					duration: 0.5,
					ease: "power3.out",
					opacity: 1,
					scaleX: 1,
					stagger: 0.03,
					transformOrigin: "left center",
				},
			);
		}

		const emptyEl = el.querySelector(".ds-table-empty");
		if (emptyEl) {
			gsap.fromTo(
				emptyEl,
				{ opacity: 0, scale: 0.8, y: 16 },
				{
					delay: 0.3,
					duration: 0.6,
					ease: "back.out(1.7)",
					opacity: 1,
					scale: 1,
					y: 0,
				},
			);
			const iconEl = emptyEl.querySelector(".ds-table-empty-icon");
			if (iconEl) {
				gsap.fromTo(
					iconEl,
					{ opacity: 0, rotate: -15, scale: 0.5 },
					{
						delay: 0.5,
						duration: 0.5,
						ease: "elastic.out(1.2, 0.5)",
						opacity: 1,
						rotate: 0,
						scale: 1,
					},
				);
			}
		}
	}, []);

	useEffect(() => {
		if (!wrapperRef.current) {
			return;
		}
		const footer = wrapperRef.current
			.closest(".ds-table-outer")
			?.querySelector(".ds-table-footer");
		if (footer) {
			gsap.fromTo(
				footer,
				{ opacity: 0, y: 10 },
				{ delay: 0.5, duration: 0.4, ease: "power2.out", opacity: 1, y: 0 },
			);
		}
	}, []);

	const prevPage = useRef(activePage);
	useEffect(() => {
		if (!wrapperRef.current || !pageSize || prevPage.current === activePage) {
			return;
		}
		const direction = activePage > prevPage.current ? 1 : -1;
		prevPage.current = activePage;

		const rows = wrapperRef.current.querySelectorAll(".ds-table-row");
		if (rows.length > 0) {
			gsap.fromTo(
				rows,
				{ opacity: 0, x: 24 * direction },
				{
					duration: 0.3,
					ease: "power2.out",
					opacity: 1,
					stagger: 0.03,
					x: 0,
				},
			);
		}
	}, [activePage, pageSize]);

	const handleRowClick = useCallback(
		(row: T, index: number) => {
			onRowClick?.(row, index);
		},
		[onRowClick],
	);

	const handlePageSizeChange = useCallback(
		(size: number) => {
			onPageSizeChange?.(size);
			setSizeOpen(false);
		},
		[onPageSizeChange],
	);

	const displayData = pageSize ? paginatedData : data;
	const showFooter =
		pageSize && (totalPages > 1 || pageSizeOptions) && !loading;

	const renderTableBody = () => {
		if (loading) {
			return Array.from(
				{ length: SKELETON_ROWS },
				(_, i) => `skeleton-${i}`,
			).map((key, rowIdx) => (
				<tr key={key} className="ds-table-row">
					{columns.map((col, colIdx) => (
						<td key={col.key} className="ds-table-td">
							<span
								className={cn(
									"ds-table-skeleton",
									SKELETON_WIDTHS[(rowIdx + colIdx) % SKELETON_WIDTHS.length],
								)}
							/>
						</td>
					))}
				</tr>
			));
		}

		if (displayData.length === 0) {
			return (
				<tr>
					<td colSpan={columns.length} className="ds-table-empty">
						<div className="ds-table-empty-inner">
							<span className="ds-table-empty-icon">
								{emptyIcon ?? <DatabaseZap size={40} />}
							</span>
							<span className="ds-table-empty-title">
								{emptyMessage ?? t("table.noData")}
							</span>
							{emptyDescription && (
								<span className="ds-table-empty-desc">{emptyDescription}</span>
							)}
						</div>
					</td>
				</tr>
			);
		}

		return displayData.map((row, index) => (
			<tr
				key={
					rowKey
						? rowKey(row, index)
						: String((row as Record<string, string | number>).id ?? index)
				}
				className={cn(
					"ds-table-row",
					hoverable && "ds-table-row-hover",
					onRowClick && "cursor-pointer",
				)}
				onClick={onRowClick ? () => handleRowClick(row, index) : undefined}
			>
				{columns.map((col) => (
					<td key={col.key} className={cn("ds-table-td", col.className)}>
						{getCellValue(row, col, index)}
					</td>
				))}
			</tr>
		));
	};

	return (
		<div className={cn("ds-table-outer", className)}>
			<div
				ref={wrapperRef}
				className={cn(
					"ds-table-wrapper",
					stickyHeader && "ds-table-sticky",
					loading && "ds-table-loading",
				)}
			>
				<table className={cn(variantMap[variant])}>
					<thead>
						<tr>
							{columns.map((col) => (
								<th
									key={col.key}
									className={cn("ds-table-th", col.headerClassName)}
								>
									{col.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>{renderTableBody()}</tbody>
				</table>
			</div>
			{showFooter && (
				<div className="ds-table-footer">
					<span className="ds-table-footer-info">{footerInfo}</span>
					<div className="flex items-center gap-3">
						{pageSizeOptions && onPageSizeChange && (
							<div ref={sizeRef} className="relative">
								<button
									type="button"
									className="ds-table-pagesize-btn"
									onClick={() => setSizeOpen((o) => !o)}
									aria-haspopup="menu"
									aria-expanded={sizeOpen}
								>
									{t("table.perPage", { count: pageSize })}
									<ChevronDown
										size={12}
										className={cn(
											"transition-transform duration-200",
											sizeOpen && "rotate-180",
										)}
									/>
								</button>
								{sizeOpen && (
									<div role="menu" className="ds-table-pagesize-menu">
										{pageSizeOptions.map((opt) => (
											<div key={opt} role="none">
												<button
													type="button"
													role="menuitem"
													aria-current={opt === pageSize || undefined}
													className={cn(
														"ds-table-pagesize-option",
														opt === pageSize && "ds-table-pagesize-active",
													)}
													onClick={() => handlePageSizeChange(opt)}
												>
													{t("table.perPage", { count: opt })}
												</button>
											</div>
										))}
									</div>
								)}
							</div>
						)}
						{totalPages > 1 && (
							<Pagination
								currentPage={activePage}
								totalPages={totalPages}
								onPageChange={onPageChange ?? (() => {})}
								size="sm"
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
