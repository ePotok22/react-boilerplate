import { type ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
	children: ReactNode;
	className?: string;
	content: ReactNode;
	delay?: number;
	placement?: TooltipPlacement;
}

export default function Tooltip({
	children,
	className,
	content,
	delay = 200,
	placement = "top",
}: Readonly<TooltipProps>) {
	const [visible, setVisible] = useState(false);
	const [pos, setPos] = useState({ left: 0, top: 0 });
	const triggerRef = useRef<HTMLSpanElement>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

	const show = () => {
		timerRef.current = setTimeout(() => {
			if (!triggerRef.current) {
				return;
			}
			const rect = triggerRef.current.getBoundingClientRect();
			const scrollX = window.scrollX;
			const scrollY = window.scrollY;

			const positions: Record<TooltipPlacement, { left: number; top: number }> =
				{
					bottom: {
						left: rect.left + rect.width / 2 + scrollX,
						top: rect.bottom + 8 + scrollY,
					},
					left: {
						left: rect.left - 8 + scrollX,
						top: rect.top + rect.height / 2 + scrollY,
					},
					right: {
						left: rect.right + 8 + scrollX,
						top: rect.top + rect.height / 2 + scrollY,
					},
					top: {
						left: rect.left + rect.width / 2 + scrollX,
						top: rect.top - 8 + scrollY,
					},
				};

			setPos(positions[placement]);
			setVisible(true);
		}, delay);
	};

	const hide = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		setVisible(false);
	};

	return (
		<>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: tooltip trigger wrapper */}
			<span
				ref={triggerRef}
				onMouseEnter={show}
				onMouseLeave={hide}
				onFocus={show}
				onBlur={hide}
				className="inline-flex"
			>
				{children}
			</span>
			{visible &&
				createPortal(
					<div
						role="tooltip"
						className={cn("ds-tooltip", `ds-tooltip-${placement}`, className)}
						style={{
							left: pos.left,
							position: "absolute",
							top: pos.top,
							zIndex: 9999,
						}}
					>
						{content}
					</div>,
					document.body,
				)}
		</>
	);
}
