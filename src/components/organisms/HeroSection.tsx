import gsap from "gsap";
import { useRef } from "react";
import Button from "@/atoms/Button";
import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/utils/cn";

interface HeroSectionProps {
	readonly title: string;
	readonly subtitle: string;
	readonly primaryAction?: Readonly<{ label: string; onClick?: () => void }>;
	readonly secondaryAction?: Readonly<{ label: string; href?: string }>;
	readonly className?: string;
}

export default function HeroSection({
	title,
	subtitle,
	primaryAction,
	secondaryAction,
	className,
}: Readonly<HeroSectionProps>) {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!ref.current) {
				return;
			}
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
			tl.from(".hero-h1", { duration: 0.8, opacity: 0, y: 40 })
				.from(".hero-p", { duration: 0.6, opacity: 0, y: 25 }, "-=0.4")
				.from(
					".hero-actions > *",
					{ duration: 0.5, opacity: 0, stagger: 0.1, y: 15 },
					"-=0.3",
				);
		},
		{ scope: ref },
	);

	return (
		<div
			ref={ref}
			className={cn("hero min-h-112 rounded-2xl bg-base-200", className)}
		>
			<div className="hero-content text-center">
				<div className="max-w-lg">
					<h1 className="hero-h1 font-bold text-5xl">{title}</h1>
					<p className="hero-p py-6">{subtitle}</p>
					<div className="hero-actions flex flex-wrap justify-center gap-3">
						{primaryAction && (
							<Button
								variant="primary"
								size="lg"
								onClick={primaryAction.onClick}
							>
								{primaryAction.label}
							</Button>
						)}
						{secondaryAction && (
							<a href={secondaryAction.href} className="btn btn-outline btn-lg">
								{secondaryAction.label}
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
