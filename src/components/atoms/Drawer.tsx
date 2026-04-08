import gsap from "gsap";
import { X } from "lucide-react";
import { type ReactNode, useEffect, useEffectEvent, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

type DrawerSide = "left" | "right";

interface DrawerProps {
	children: ReactNode;
	className?: string;
	onClose: () => void;
	open: boolean;
	side?: DrawerSide;
	title?: string;
}

export default function Drawer({
	children,
	className,
	onClose,
	open,
	side = "right",
	title,
}: Readonly<DrawerProps>) {
	const backdropRef = useRef<HTMLDivElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	const onAnimateIn = useEffectEvent(() => {
		if (!backdropRef.current || !panelRef.current) {
			return;
		}
		gsap.to(backdropRef.current, {
			duration: 0.25,
			ease: "power2.out",
			opacity: 1,
		});
		gsap.fromTo(
			panelRef.current,
			{ x: side === "right" ? "100%" : "-100%" },
			{ duration: 0.35, ease: "power3.out", x: "0%" },
		);
	});

	const onAnimateOut = useEffectEvent(() => {
		if (!backdropRef.current || !panelRef.current) {
			return;
		}
		gsap.to(backdropRef.current, {
			duration: 0.2,
			ease: "power2.in",
			opacity: 0,
		});
		gsap.to(panelRef.current, {
			duration: 0.25,
			ease: "power2.in",
			onComplete: onClose,
			x: side === "right" ? "100%" : "-100%",
		});
	});

	useEffect(() => {
		if (open) {
			onAnimateIn();
		}
	}, [open]);

	useEffect(() => {
		if (!open) {
			return;
		}
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onAnimateOut();
			}
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [open]);

	if (!open) {
		return null;
	}

	return createPortal(
		<div className="ds-drawer-root">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop close */}
			{/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop overlay */}
			<div
				ref={backdropRef}
				className="ds-drawer-backdrop"
				onClick={onAnimateOut}
				style={{ opacity: 0 }}
			/>
			<div
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-label={title || "Drawer"}
				className={cn(
					"ds-drawer-panel",
					side === "left" ? "ds-drawer-left" : "ds-drawer-right",
					className,
				)}
			>
				{title && (
					<div className="ds-drawer-header">
						<h3 className="font-semibold text-base">{title}</h3>
						<button
							type="button"
							aria-label="Close drawer"
							onClick={onAnimateOut}
							className="ds-drawer-close"
						>
							<X size={18} />
						</button>
					</div>
				)}
				<div className="ds-drawer-body">{children}</div>
			</div>
		</div>,
		document.body,
	);
}
