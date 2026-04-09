import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { type ReactNode, useCallback, useRef, useState } from "react";
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

function animateOpen(el: HTMLDivElement) {
	gsap.set(el, { height: "auto" });
	const h = el.scrollHeight;
	gsap.fromTo(
		el,
		{ height: 0, opacity: 0 },
		{ duration: 0.35, ease: "power3.out", height: h, opacity: 1 },
	);
}

function animateClose(el: HTMLDivElement) {
	gsap.to(el, {
		duration: 0.25,
		ease: "power2.in",
		height: 0,
		opacity: 0,
	});
}

function animateChevron(chev: HTMLSpanElement, isOpening: boolean) {
	gsap.to(chev, {
		duration: 0.25,
		ease: "power2.out",
		rotation: isOpening ? 180 : 0,
	});
}

function closeOpenItems(
	prev: Set<number>,
	contentRefs: (HTMLDivElement | null)[],
	chevronRefs: (HTMLSpanElement | null)[],
) {
	for (const openIdx of prev) {
		const el = contentRefs[openIdx];
		const chev = chevronRefs[openIdx];
		if (el) {
			animateClose(el);
		}
		if (chev) {
			gsap.to(chev, { duration: 0.25, rotation: 0 });
		}
	}
}

export default function Accordion({
	className,
	items,
	multiple = false,
}: Readonly<AccordionProps>) {
	const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
	const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
	const chevronRefs = useRef<(HTMLSpanElement | null)[]>([]);

	const toggle = useCallback(
		(index: number) => {
			if (items[index]?.disabled) {
				return;
			}

			setOpenIndices((prev) => {
				const next = new Set(prev);
				const isOpening = !next.has(index);

				if (isOpening) {
					if (!multiple) {
						closeOpenItems(prev, contentRefs.current, chevronRefs.current);
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
						animateOpen(el);
					} else {
						animateClose(el);
					}
				}
				if (chev) {
					animateChevron(chev, isOpening);
				}

				return next;
			});
		},
		[items, multiple],
	);

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
