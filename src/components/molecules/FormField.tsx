import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/utils/cn";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	helperText?: string;
	icon?: ReactNode;
	loading?: boolean;
	ref?: Ref<HTMLInputElement>;
}

export default function FormField({
	label,
	error,
	helperText,
	icon,
	loading,
	className,
	id,
	ref,
	...props
}: Readonly<FormFieldProps>) {
	const fieldId = id || `field-${label.toLowerCase().replaceAll(/\s+/g, "-")}`;
	return (
		<fieldset className="fieldset space-y-1">
			<label className="label ds-label" htmlFor={fieldId}>
				{label}
			</label>
			<label className={cn("ds-field", error && "ds-field-error", className)}>
				{icon && <span className="ds-field-icon">{icon}</span>}
				<input ref={ref} id={fieldId} className="ds-field-input" {...props} />
				{loading && (
					<span className="shrink-0">
						<span className="loading loading-spinner loading-xs text-primary" />
					</span>
				)}
			</label>
			{error && (
				<p className="input-error-msg">
					<span className="inline-block h-1 w-1 rounded-full bg-error" />
					{error}
				</p>
			)}
			{helperText && !error && <p className="ds-field-helper">{helperText}</p>}
		</fieldset>
	);
}
