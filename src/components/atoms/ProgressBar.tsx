import gsap from "gsap";
import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

type ProgressSize = "xs" | "sm" | "md" | "lg";
type ProgressVariant =
	| "primary"
	| "secondary"
	| "accent"
	| "success"
	| "info"
	| "warning"
	| "error";

interface ProgressBarProps {
	value: number;
	max?: number;
	size?: ProgressSize;
	variant?: ProgressVariant;
	showLabel?: boolean;
	animated?: boolean;
	className?: string;
}

const sizeStyles: Record<ProgressSize, string> = {
	lg: "h-4",
	md: "h-2.5",
	sm: "h-1.5",
	xs: "h-1",
};

const variantStyles: Record<ProgressVariant, string> = {
	accent: "bg-accent",
	error: "bg-error",
	info: "bg-info",
	primary: "bg-primary",
	secondary: "bg-secondary",
	success: "bg-success",
	warning: "bg-warning",
};

export default function ProgressBar({
	value,
	max = 100,
	size = "md",
	variant = "primary",
	showLabel = false,
	animated = true,
	className,
}: Readonly<ProgressBarProps>) {
	const barRef = useRef<HTMLDivElement>(null);
	const pct = Math.min(100, Math.max(0, (value / max) * 100));

	useEffect(() => {
		if (!barRef.current || !animated) {
			return;
		}
		gsap.to(barRef.current, {
			duration: 0.6,
			ease: "power2.out",
			width: `${pct}%`,
		});
	}, [pct, animated]);

	return (
		<div className={cn("w-full", className)}>
			{showLabel && (
				<div className="mb-1 flex justify-between">
					<span className="ds-label">Progress</span>
					<span className="font-semibold text-base-content/60 text-xs">
						{Math.round(pct)}%
					</span>
				</div>
			)}
			<div
				className={cn(
					"w-full overflow-hidden rounded-full bg-base-200/60",
					sizeStyles[size],
				)}
			>
				<div
					ref={barRef}
					className={cn(
						"h-full rounded-full transition-none",
						variantStyles[variant],
					)}
					style={{ width: animated ? 0 : `${pct}%` }}
				/>
			</div>
		</div>
	);
}
