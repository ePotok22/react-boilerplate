import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonGroupAlign = "start" | "center" | "end" | "between";

interface ButtonGroupProps {
	children: ReactNode;
	className?: string;
	align?: ButtonGroupAlign;
}

const alignMap: Record<ButtonGroupAlign, string> = {
	between: "justify-between",
	center: "justify-center",
	end: "justify-end",
	start: "justify-start",
};

export default function ButtonGroup({
	children,
	className,
	align = "start",
}: Readonly<ButtonGroupProps>) {
	return (
		<div className={cn("flex items-center gap-3", alignMap[align], className)}>
			{children}
		</div>
	);
}
