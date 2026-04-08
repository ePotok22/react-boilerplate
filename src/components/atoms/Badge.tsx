import { cn } from "@/utils/cn";

type BadgeVariant =
	| "primary"
	| "secondary"
	| "accent"
	| "ghost"
	| "outline"
	| "info"
	| "success"
	| "warning"
	| "error";

type BadgeSize = "xs" | "sm" | "md" | "lg";

interface BadgeProps {
	variant?: BadgeVariant;
	size?: BadgeSize;
	dot?: boolean;
	pill?: boolean;
	glow?: boolean;
	className?: string;
	children: React.ReactNode;
}

const variantMap: Record<BadgeVariant, string> = {
	accent: "badge-accent",
	error: "badge-error",
	ghost: "badge-ghost",
	info: "badge-info",
	outline: "badge-outline",
	primary: "badge-primary",
	secondary: "badge-secondary",
	success: "badge-success",
	warning: "badge-warning",
};

const sizeMap: Record<BadgeSize, string> = {
	lg: "badge-lg",
	md: "badge-md",
	sm: "badge-sm",
	xs: "badge-xs",
};

const dotColorMap: Record<BadgeVariant, string> = {
	accent: "bg-accent",
	error: "bg-error",
	ghost: "bg-base-content/40",
	info: "bg-info",
	outline: "bg-base-content/60",
	primary: "bg-primary",
	secondary: "bg-secondary",
	success: "bg-success",
	warning: "bg-warning",
};

const glowMap: Record<BadgeVariant, string> = {
	accent: "shadow-accent/30",
	error: "shadow-error/30",
	ghost: "",
	info: "shadow-info/30",
	outline: "",
	primary: "shadow-primary/30",
	secondary: "shadow-secondary/30",
	success: "shadow-success/30",
	warning: "shadow-warning/30",
};

export default function Badge({
	variant = "primary",
	size = "md",
	dot = false,
	pill = false,
	glow = false,
	className,
	children,
}: Readonly<BadgeProps>) {
	return (
		<span
			className={cn(
				"ds-badge",
				variantMap[variant],
				sizeMap[size],
				pill && "rounded-full",
				glow && `shadow-md ${glowMap[variant]}`,
				className,
			)}
		>
			{dot && <span className={cn("ds-badge-dot", dotColorMap[variant])} />}
			{children}
		</span>
	);
}
