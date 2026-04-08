import { Badge } from "@/components/atoms";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionProps {
	id: string;
	title: string;
	badge?: string;
	children: React.ReactNode;
}

export default function Section({
	id,
	title,
	badge,
	children,
}: Readonly<SectionProps>) {
	const ref = useScrollReveal<HTMLElement>({
		childSelector: ".section-reveal",
		duration: 0.7,
		stagger: 0.12,
		y: 30,
	});

	return (
		<section id={id} ref={ref} className="scroll-mt-24">
			<div className="section-reveal mb-5 flex items-center gap-3">
				<h2 className="font-bold text-2xl">{title}</h2>
				{badge && <Badge variant="accent">{badge}</Badge>}
			</div>
			<div className="section-reveal">{children}</div>
		</section>
	);
}
