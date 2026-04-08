import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface AccordionItem {
	content: ReactNode;
	disabled?: boolean;
	title: string;
}

interface AccordionProps {
	className?: string;
	items: AccordionItem[];
	multiple?: boolean;
}

export default function Accordion({
	className,
	items,
	multiple = false,
}: Readonly<AccordionProps>) {
	const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
	const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
	const chevronRefs = useRef<(HTMLSpanElement | null)[]>([]);

	const toggle = (index: number) => {
		if (items[index]?.disabled) {
			return;
		}

		setOpenIndices((prev) => {
			const next = new Set(prev);
			const isOpening = !next.has(index);

			if (isOpening) {
				if (!multiple) {
					for (const openIdx of prev) {
						const el = contentRefs.current[openIdx];
						const chev = chevronRefs.current[openIdx];
						if (el) {
							gsap.to(el, {
								duration: 0.3,
								ease: "power2.inOut",
								height: 0,
								opacity: 0,
							});
						}
						if (chev) {
							gsap.to(chev, { duration: 0.25, rotation: 0 });
						}
					}
					next.clear();
				}
				next.add(index);
			} else {
				next.delete(index);
			}

			const el = contentRefs.current[index];
			const chev = chevronRefs.current[index];
			if (el) {
				if (isOpening) {
					gsap.set(el, { height: "auto" });
					const h = el.scrollHeight;
					gsap.fromTo(
						el,
						{ height: 0, opacity: 0 },
						{ duration: 0.35, ease: "power3.out", height: h, opacity: 1 },
					);
				} else {
					gsap.to(el, {
						duration: 0.25,
						ease: "power2.in",
						height: 0,
						opacity: 0,
					});
				}
			}
			if (chev) {
				gsap.to(chev, {
					duration: 0.25,
					ease: "power2.out",
					rotation: isOpening ? 180 : 0,
				});
			}

			return next;
		});
	};

	return (
		<div className={cn("ds-accordion", className)}>
			{items.map((item, i) => {
				const isOpen = openIndices.has(i);
				return (
					<div
						key={item.title}
						className={cn(
							"ds-accordion-item",
							isOpen && "ds-accordion-item-open",
							item.disabled && "ds-accordion-item-disabled",
						)}
					>
						<button
							type="button"
							aria-expanded={isOpen}
							disabled={item.disabled}
							onClick={() => toggle(i)}
							className="ds-accordion-trigger"
						>
							<span className="grow text-left">{item.title}</span>
							<span
								ref={(el) => {
									chevronRefs.current[i] = el;
								}}
								className="ds-accordion-chevron"
							>
								<ChevronDown size={16} />
							</span>
						</button>
						<div
							ref={(el) => {
								contentRefs.current[i] = el;
							}}
							className="ds-accordion-content"
							style={{ height: 0, opacity: 0, overflow: "hidden" }}
						>
							<div className="ds-accordion-body">{item.content}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
