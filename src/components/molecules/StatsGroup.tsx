import { cn } from "@/utils/cn";

interface StatItemProps {
	title: string;
	value: string;
	description?: string;
}

interface StatsGroupProps {
	items: StatItemProps[];
	className?: string;
}

export default function StatsGroup({
	items,
	className,
}: Readonly<StatsGroupProps>) {
	return (
		<div className={cn("stats shadow", className)}>
			{items.map((item) => (
				<div key={item.title} className="stat">
					<div className="stat-title">{item.title}</div>
					<div className="stat-value">{item.value}</div>
					{item.description && (
						<div className="stat-desc">{item.description}</div>
					)}
				</div>
			))}
		</div>
	);
}
