import type { FormHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardFormProps extends FormHTMLAttributes<HTMLFormElement> {
	title?: string;
	description?: string;
	children: ReactNode;
	actions?: ReactNode;
}

export default function CardForm({
	title,
	description,
	children,
	actions,
	className,
	...props
}: Readonly<CardFormProps>) {
	return (
		<div className="rounded-2xl border border-base-content/8 bg-base-100 p-5 shadow-sm">
			{(title || description) && (
				<div className="mb-4">
					{title && <h3 className="font-semibold text-base">{title}</h3>}
					{description && (
						<p className="mt-0.5 text-base-content/50 text-sm">{description}</p>
					)}
				</div>
			)}
			<form className={cn("space-y-4", className)} {...props}>
				{children}
				{actions && (
					<div className="flex items-center gap-3 pt-2">{actions}</div>
				)}
			</form>
		</div>
	);
}
