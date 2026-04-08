import { type InputHTMLAttributes, type Ref, useState } from "react";
import { cn } from "@/utils/cn";

type ToggleSize = "xs" | "sm" | "md" | "lg";
type ToggleVariant =
	| "primary"
	| "secondary"
	| "accent"
	| "success"
	| "warning"
	| "error";

const SIZE_MAP: Record<ToggleSize, string> = {
	lg: "ds-toggle-lg",
	md: "",
	sm: "ds-toggle-sm",
	xs: "ds-toggle-xs",
};

const VARIANT_MAP: Record<ToggleVariant, string> = {
	accent: "ds-toggle-accent",
	error: "ds-toggle-error",
	primary: "ds-toggle-primary",
	secondary: "ds-toggle-secondary",
	success: "ds-toggle-success",
	warning: "ds-toggle-warning",
};

interface ToggleProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
	description?: string;
	error?: string;
	label: string;
	ref?: Ref<HTMLInputElement>;
	size?: ToggleSize;
	variant?: ToggleVariant;
}

export default function Toggle({
	className,
	description,
	disabled,
	error,
	id,
	label,
	ref,
	size = "md",
	variant = "primary",
	...props
}: Readonly<ToggleProps>) {
	const fieldId = id || `toggle-${label.toLowerCase().replace(/\s+/g, "-")}`;

	const [internalChecked, setInternalChecked] = useState(
		props.defaultChecked ?? false,
	);
	const isChecked =
		props.checked !== undefined ? props.checked : internalChecked;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (props.checked === undefined) {
			setInternalChecked(e.target.checked);
		}
		props.onChange?.(e);
	};
	return (
		<div className="space-y-1">
			<label
				htmlFor={fieldId}
				className={cn(
					"ds-toggle-label",
					disabled && "pointer-events-none opacity-50",
					error && "ds-toggle-label-error",
					className,
				)}
			>
				<div className="ds-toggle-track-wrap">
					<input
						ref={ref}
						type="checkbox"
						role="switch"
						aria-checked={isChecked}
						id={fieldId}
						disabled={disabled}
						className="peer sr-only"
						onChange={handleChange}
						{...props}
					/>
					<span
						className={cn(
							"ds-toggle-track",
							SIZE_MAP[size],
							VARIANT_MAP[variant],
						)}
					>
						<span className="ds-toggle-thumb" />
					</span>
				</div>
				<div className="min-w-0">
					<span className="ds-toggle-text">{label}</span>
					{description && <span className="ds-toggle-desc">{description}</span>}
				</div>
			</label>
			{error && (
				<p className="flex items-center gap-1.5 pl-1 text-error text-xs">
					<span className="inline-block h-1 w-1 rounded-full bg-error" />
					{error}
				</p>
			)}
		</div>
	);
}
