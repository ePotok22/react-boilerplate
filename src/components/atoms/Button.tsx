import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant =
	| "primary"
	| "secondary"
	| "accent"
	| "ghost"
	| "outline"
	| "error";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
}

const variantMap: Record<ButtonVariant, string> = {
	accent: "btn-accent",
	error: "btn-error",
	ghost: "btn-ghost shadow-none hover:shadow-none",
	outline: "btn-outline",
	primary: "btn-primary",
	secondary: "btn-secondary",
};

const sizeMap: Record<ButtonSize, string> = {
	lg: "btn-lg",
	md: "btn-md",
	sm: "btn-sm",
	xs: "btn-xs",
};

export default function Button({
	variant = "primary",
	size = "md",
	loading = false,
	className,
	children,
	disabled,
	...props
}: Readonly<ButtonProps>) {
	return (
		<button
			className={cn("ds-btn", variantMap[variant], sizeMap[size], className)}
			disabled={disabled || loading}
			{...props}
		>
			{loading && <span className="loading loading-spinner loading-xs" />}
			{children}
		</button>
	);
}
