import gsap from "gsap";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	size?: "sm" | "md" | "lg";
	showInfo?: boolean;
	className?: string;
}

const btnSizeMap = {
	lg: "h-11 min-w-11 text-base",
	md: "h-9 min-w-9 text-sm",
	sm: "h-7 min-w-7 text-xs",
};

const iconSizeMap = { lg: 18, md: 16, sm: 14 };
const doubleIconSizeMap = { lg: 16, md: 14, sm: 12 };

const animateArrowHover = (el: HTMLButtonElement, enter: boolean) => {
	if (el.disabled) {
		return;
	}
	gsap.to(el, {
		duration: 0.25,
		ease: enter ? "back.out(2)" : "power2.in",
		scale: enter ? 1.25 : 1,
		y: enter ? -1 : 0,
	});
};

const animatePageHover = (el: HTMLButtonElement, enter: boolean) => {
	if (el.getAttribute("aria-current") === "page") {
		return;
	}
	gsap.to(el, {
		duration: 0.2,
		ease: "power2.out",
		y: enter ? -2 : 0,
	});
};

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	size = "md",
	showInfo = false,
	className,
}: Readonly<PaginationProps>) {
	const navRef = useRef<HTMLElement>(null);
	const prevPageRef = useRef(currentPage);
	const activeIndicatorRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!navRef.current) {
			return;
		}
		const items = navRef.current.querySelectorAll(
			"button, .ds-page-ellipsis, .ds-page-info",
		);
		gsap.fromTo(
			items,
			{ opacity: 0, scale: 0.75, y: 12 },
			{
				duration: 0.45,
				ease: "back.out(1.8)",
				opacity: 1,
				scale: 1,
				stagger: 0.03,
				y: 0,
			},
		);
	}, []);

	useEffect(() => {
		if (!activeIndicatorRef.current || prevPageRef.current === currentPage) {
			return;
		}
		const direction = currentPage > prevPageRef.current ? 1 : -1;
		const el = activeIndicatorRef.current;
		const btn = el.closest("button");

		gsap.fromTo(
			el,
			{ opacity: 0, scale: 0.5, x: direction * 20, y: -4 },
			{
				duration: 0.4,
				ease: "back.out(2.5)",
				opacity: 1,
				scale: 1,
				x: 0,
				y: 0,
			},
		);

		if (btn) {
			gsap.fromTo(
				btn,
				{ boxShadow: "0 0 0 0 rgba(var(--color-primary), 0.4)" },
				{
					boxShadow: "0 0 0 8px rgba(var(--color-primary), 0)",
					duration: 0.6,
					ease: "power2.out",
				},
			);
		}

		prevPageRef.current = currentPage;
	}, [currentPage]);

	const handlePageChange = useCallback(
		(page: number) => {
			onPageChange(page);
		},
		[onPageChange],
	);

	if (totalPages <= 1) {
		return null;
	}

	const pages = getPageNumbers(currentPage, totalPages);
	const isFirst = currentPage <= 1;
	const isLast = currentPage >= totalPages;

	return (
		<nav
			ref={navRef}
			aria-label="Pagination"
			className={cn("ds-pagination", className)}
		>
			{showInfo && (
				<span className="ds-page-info">
					{currentPage}
					<span className="opacity-40">/</span>
					{totalPages}
				</span>
			)}

			<button
				type="button"
				className={cn("ds-page-btn ds-page-arrow", btnSizeMap[size])}
				disabled={isFirst}
				onClick={() => handlePageChange(1)}
				onMouseEnter={(e) => animateArrowHover(e.currentTarget, true)}
				onMouseLeave={(e) => animateArrowHover(e.currentTarget, false)}
				aria-label="First page"
			>
				<ChevronsLeft size={doubleIconSizeMap[size]} />
			</button>

			<button
				type="button"
				className={cn("ds-page-btn ds-page-arrow", btnSizeMap[size])}
				disabled={isFirst}
				onClick={() => handlePageChange(currentPage - 1)}
				onMouseEnter={(e) => animateArrowHover(e.currentTarget, true)}
				onMouseLeave={(e) => animateArrowHover(e.currentTarget, false)}
				aria-label="Previous page"
			>
				<ChevronLeft size={iconSizeMap[size]} />
			</button>

			<span className="ds-page-separator" />

			{pages.map((page) =>
				typeof page === "string" ? (
					<span
						key={page}
						className={cn("ds-page-btn ds-page-ellipsis", btnSizeMap[size])}
					>
						<span className="ds-page-dots">
							<span>·</span>
							<span>·</span>
							<span>·</span>
						</span>
					</span>
				) : (
					<button
						type="button"
						key={page}
						className={cn(
							"ds-page-btn",
							btnSizeMap[size],
							currentPage === page && "ds-page-btn-active",
						)}
						onClick={() => handlePageChange(page)}
						onMouseEnter={(e) => animatePageHover(e.currentTarget, true)}
						onMouseLeave={(e) => animatePageHover(e.currentTarget, false)}
						aria-current={currentPage === page ? "page" : undefined}
					>
						{currentPage === page ? (
							<span ref={activeIndicatorRef}>{page}</span>
						) : (
							page
						)}
					</button>
				),
			)}

			<span className="ds-page-separator" />

			<button
				type="button"
				className={cn("ds-page-btn ds-page-arrow", btnSizeMap[size])}
				disabled={isLast}
				onClick={() => handlePageChange(currentPage + 1)}
				onMouseEnter={(e) => animateArrowHover(e.currentTarget, true)}
				onMouseLeave={(e) => animateArrowHover(e.currentTarget, false)}
				aria-label="Next page"
			>
				<ChevronRight size={iconSizeMap[size]} />
			</button>

			<button
				type="button"
				className={cn("ds-page-btn ds-page-arrow", btnSizeMap[size])}
				disabled={isLast}
				onClick={() => handlePageChange(totalPages)}
				onMouseEnter={(e) => animateArrowHover(e.currentTarget, true)}
				onMouseLeave={(e) => animateArrowHover(e.currentTarget, false)}
				aria-label="Last page"
			>
				<ChevronsRight size={doubleIconSizeMap[size]} />
			</button>
		</nav>
	);
}

function getPageNumbers(current: number, total: number): (number | string)[] {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}

	const pages: (number | string)[] = [1];

	if (current > 3) {
		pages.push("ellipsis-start");
	}

	const start = Math.max(2, current - 1);
	const end = Math.min(total - 1, current + 1);

	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	if (current < total - 2) {
		pages.push("ellipsis-end");
	}

	pages.push(total);

	return pages;
}
