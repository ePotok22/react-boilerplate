import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface EmptyStateProps {
	action?: ReactNode;
	className?: string;
	description?: string;
	icon?: ReactNode;
	title: string;
}

export default function EmptyState({
	action,
	className,
	description,
	icon,
	title,
}: Readonly<EmptyStateProps>) {
	return (
		<div className={cn("ds-empty-state", className)}>
			{icon && <div className="ds-empty-state-icon">{icon}</div>}
			<h3 className="ds-empty-state-title">{title}</h3>
			{description && (
				<p className="ds-empty-state-description">{description}</p>
			)}
			{action && <div className="ds-empty-state-action">{action}</div>}
		</div>
	);
}
