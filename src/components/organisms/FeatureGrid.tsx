import Button from "@/atoms/Button";
import Card from "@/molecules/Card";

interface FeatureItem {
	readonly title: string;
	readonly description: string;
	readonly badge?: string;
}

interface FeatureGridProps {
	readonly features: readonly FeatureItem[];
}

export default function FeatureGrid({ features }: Readonly<FeatureGridProps>) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{features.map((feature) => (
				<Card
					key={feature.title}
					title={feature.title}
					description={feature.description}
					badge={feature.badge}
					actions={
						<Button variant="ghost" size="sm">
							Learn more
						</Button>
					}
				/>
			))}
		</div>
	);
}
