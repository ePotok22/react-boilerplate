import { cn } from "@/utils/cn";

type SpinnerSize = "xs" | "sm" | "md" | "lg";
type SpinnerVariant = "spinner" | "dots" | "ring" | "bars";

interface SpinnerProps {
	size?: SpinnerSize;
	variant?: SpinnerVariant;
	className?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
	lg: "loading-lg",
	md: "loading-md",
	sm: "loading-sm",
	xs: "loading-xs",
};

const variantMap: Record<SpinnerVariant, string> = {
	bars: "loading-bars",
	dots: "loading-dots",
	ring: "loading-ring",
	spinner: "loading-spinner",
};

export default function Spinner({
	size = "md",
	variant = "spinner",
	className,
}: Readonly<SpinnerProps>) {
	return (
		<span
			className={cn("loading", variantMap[variant], sizeMap[size], className)}
		/>
	);
}
