import { cn } from "@/utils/cn";

interface DividerProps {
	className?: string;
	label?: string;
	orientation?: "horizontal" | "vertical";
}

export default function Divider({
	className,
	label,
	orientation = "horizontal",
}: Readonly<DividerProps>) {
	if (orientation === "vertical") {
		return <div className={cn("ds-divider-vertical", className)} />;
	}

	if (label) {
		return (
			<div className={cn("ds-divider-labeled", className)}>
				<span className="ds-divider-line" />
				<span className="ds-divider-label">{label}</span>
				<span className="ds-divider-line" />
			</div>
		);
	}

	return <hr className={cn("ds-divider", className)} />;
}
