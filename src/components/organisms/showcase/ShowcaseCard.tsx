import gsap from "gsap";
import { useRef } from "react";

interface ShowcaseCardProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export default function ShowcaseCard({
	title,
	description,
	children,
}: Readonly<ShowcaseCardProps>) {
	const cardRef = useRef<HTMLFieldSetElement>(null);

	const onEnter = () => {
		gsap.to(cardRef.current, {
			boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
			duration: 0.35,
			ease: "power2.out",
			y: -3,
		});
	};

	const onLeave = () => {
		gsap.to(cardRef.current, {
			boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
			duration: 0.35,
			ease: "power2.out",
			y: 0,
		});
	};

	return (
		<fieldset
			ref={cardRef}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			className="group card overflow-visible border border-(--line) bg-base-100 shadow-sm"
		>
			<div className="card-body overflow-visible">
				<legend className="card-title text-base transition-colors group-hover:text-primary">
					{title}
				</legend>
				{description && <p className="text-sm opacity-60">{description}</p>}
				<div className="mt-2">{children}</div>
			</div>
		</fieldset>
	);
}
