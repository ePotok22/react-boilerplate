import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/utils/cn";

interface CheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label: string;
	error?: string;
	ref?: Ref<HTMLInputElement>;
}

export default function Checkbox({
	label,
	error,
	className,
	id,
	ref,
	...props
}: Readonly<CheckboxProps>) {
	const fieldId =
		id || `checkbox-${label.toLowerCase().replaceAll(/\s+/g, "-")}`;
	return (
		<div className="space-y-1">
			<label
				htmlFor={fieldId}
				className={cn(
					"flex cursor-pointer items-center gap-3 rounded-xl px-1 py-1.5 transition-colors duration-200 hover:bg-base-200/50",
					error && "text-error",
					className,
				)}
			>
				<input
					ref={ref}
					type="checkbox"
					id={fieldId}
					className={cn(
						"checkbox checkbox-sm checkbox-primary rounded-lg",
						error && "checkbox-error",
					)}
					{...props}
				/>
				<span className="select-none text-sm">{label}</span>
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
