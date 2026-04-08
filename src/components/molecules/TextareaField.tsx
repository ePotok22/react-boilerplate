import type { ReactNode, Ref, TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface TextareaFieldProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	error?: string;
	helperText?: string;
	icon?: ReactNode;
	ref?: Ref<HTMLTextAreaElement>;
}

export default function TextareaField({
	label,
	error,
	helperText,
	icon,
	className,
	id,
	ref,
	...props
}: Readonly<TextareaFieldProps>) {
	const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
	return (
		<fieldset className="fieldset space-y-1">
			<label className="label ds-label" htmlFor={fieldId}>
				{label}
			</label>
			<label className={cn("ds-field-textarea", error && "ds-field-error")}>
				{icon && <span className="ds-field-icon mt-0.5">{icon}</span>}
				<textarea
					ref={ref}
					id={fieldId}
					className={cn("ds-field-input resize-y", className)}
					{...props}
				/>
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
