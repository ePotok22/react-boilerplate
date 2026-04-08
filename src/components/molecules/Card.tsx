import Badge from "@/atoms/Badge";
import { cn } from "@/utils/cn";

interface CardProps {
	title: string;
	description: string;
	badge?: string;
	imageUrl?: string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	variant?: "default" | "bordered" | "glass";
}

const variantMap: Record<string, string> = {
	bordered: "ds-card ds-card-bordered",
	default: "ds-card",
	glass: "ds-card ds-card-glass",
};

export default function Card({
	title,
	description,
	badge,
	imageUrl,
	actions,
	children,
	className,
	variant = "default",
}: Readonly<CardProps>) {
	return (
		<div className={cn(variantMap[variant], className)}>
			{imageUrl && (
				<figure className="overflow-hidden">
					<img
						src={imageUrl}
						alt={title}
						loading="lazy"
						className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
					/>
				</figure>
			)}
			<div className="card-body">
				<h2 className="card-title">
					{title}
					{badge && (
						<Badge variant="secondary" size="sm">
							{badge}
						</Badge>
					)}
				</h2>
				<p className="text-sm opacity-70">{description}</p>
				{children}
				{actions && <div className="card-actions justify-end">{actions}</div>}
			</div>
		</div>
	);
}
