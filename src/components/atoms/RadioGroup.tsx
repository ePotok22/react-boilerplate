import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/utils/cn";

interface RadioOption {
	disabled?: boolean;
	label: string;
	value: string;
}

interface RadioGroupProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
	className?: string;
	error?: string;
	horizontal?: boolean;
	label: string;
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	options: RadioOption[];
	ref?: Ref<HTMLInputElement>;
	value?: string;
}

export default function RadioGroup({
	className,
	disabled,
	error,
	horizontal = false,
	label,
	name,
	onChange,
	options,
	ref,
	value,
}: Readonly<RadioGroupProps>) {
	const fieldId = `radio-${name}`;

	return (
		<fieldset className={cn("fieldset space-y-2", className)}>
			<legend className="label ds-label">{label}</legend>
			<div
				className={cn(
					"flex gap-1",
					horizontal ? "flex-row flex-wrap gap-4" : "flex-col",
				)}
			>
				{options.map((opt, i) => (
					<label
						key={opt.value}
						htmlFor={`${fieldId}-${opt.value}`}
						className={cn(
							"ds-radio-label",
							(disabled || opt.disabled) && "pointer-events-none opacity-50",
						)}
					>
						<input
							ref={i === 0 ? ref : undefined}
							type="radio"
							id={`${fieldId}-${opt.value}`}
							name={name}
							value={opt.value}
							checked={value === undefined ? undefined : value === opt.value}
							disabled={disabled || opt.disabled}
							onChange={onChange}
							className="radio radio-sm radio-primary"
						/>
						<span className="select-none text-sm">{opt.label}</span>
					</label>
				))}
			</div>
			{error && (
				<p className="flex items-center gap-1.5 pl-1 text-error text-xs">
					<span className="inline-block h-1 w-1 rounded-full bg-error" />
					{error}
				</p>
			)}
		</fieldset>
	);
}
