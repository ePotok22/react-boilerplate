import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface InputGroupProps {
	children: ReactNode;
	className?: string;
	startAddon?: ReactNode;
	endAddon?: ReactNode;
}

export default function InputGroup({
	children,
	className,
	startAddon,
	endAddon,
}: Readonly<InputGroupProps>) {
	return (
		<div className={cn("ds-input-group", className)}>
			{startAddon && (
				<div className="flex shrink-0 items-center border-base-content/10 border-r px-3 text-base-content/40 text-sm">
					{startAddon}
				</div>
			)}
			<div className="flex min-w-0 grow items-center">{children}</div>
			{endAddon && (
				<div className="flex shrink-0 items-center border-base-content/10 border-l">
					{endAddon}
				</div>
			)}
		</div>
	);
}
