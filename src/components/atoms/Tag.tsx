import { X } from "lucide-react";
import { cn } from "@/utils/cn";

type TagVariant =
	| "default"
	| "primary"
	| "secondary"
	| "accent"
	| "success"
	| "warning"
	| "error";
type TagSize = "sm" | "md" | "lg";

interface TagProps {
	children: React.ReactNode;
	className?: string;
	onRemove?: () => void;
	size?: TagSize;
	variant?: TagVariant;
}

const VARIANT_MAP: Record<TagVariant, string> = {
	accent: "ds-tag-accent",
	default: "ds-tag-default",
	error: "ds-tag-error",
	primary: "ds-tag-primary",
	secondary: "ds-tag-secondary",
	success: "ds-tag-success",
	warning: "ds-tag-warning",
};

const SIZE_MAP: Record<TagSize, string> = {
	lg: "ds-tag-lg",
	md: "",
	sm: "ds-tag-sm",
};

export default function Tag({
	children,
	className,
	onRemove,
	size = "md",
	variant = "default",
}: Readonly<TagProps>) {
	return (
		<span
			className={cn("ds-tag", VARIANT_MAP[variant], SIZE_MAP[size], className)}
		>
			{children}
			{onRemove && (
				<button
					type="button"
					aria-label="Remove"
					onClick={onRemove}
					className="ds-tag-remove"
				>
					<X size={12} />
				</button>
			)}
		</span>
	);
}
