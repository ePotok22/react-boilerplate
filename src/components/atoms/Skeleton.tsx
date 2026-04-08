import { cn } from "@/utils/cn";

type SkeletonVariant = "line" | "circle" | "card" | "avatar";

interface SkeletonProps {
	className?: string;
	variant?: SkeletonVariant;
	lines?: number;
}

const variantStyles: Record<SkeletonVariant, string> = {
	avatar: "skeleton h-12 w-12 shrink-0 rounded-full",
	card: "skeleton h-32 w-full rounded-xl",
	circle: "skeleton h-10 w-10 shrink-0 rounded-full",
	line: "skeleton h-4 w-full rounded-lg",
};

export default function Skeleton({
	className,
	variant = "line",
	lines = 1,
}: Readonly<SkeletonProps>) {
	if (variant === "line" && lines > 1) {
		return (
			<div className="space-y-2.5">
				{Array.from({ length: lines }, (_, i) => (
					<div
						key={`sk-${i.toString()}`}
						className={cn(
							variantStyles.line,
							i === lines - 1 && "w-3/5",
							className,
						)}
					/>
				))}
			</div>
		);
	}

	return <div className={cn(variantStyles[variant], className)} />;
}
