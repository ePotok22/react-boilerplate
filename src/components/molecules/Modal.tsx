import gsap from "gsap";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

const DIALOG_STYLE = { overflow: "visible" } as const;
const HIDDEN_STYLE = { opacity: 0 } as const;

type ModalSize = "sm" | "md" | "lg" | "full";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	size?: ModalSize;
	children: React.ReactNode;
	className?: string;
}

const sizeMap: Record<ModalSize, string> = {
	full: "ds-modal-full",
	lg: "ds-modal-lg",
	md: "",
	sm: "ds-modal-sm",
};

export default function Modal({
	open,
	onClose,
	title,
	size = "md",
	children,
	className,
}: Readonly<ModalProps>) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);
	const mountedRef = useRef(false);

	useEffect(() => {
		const dialog = dialogRef.current;
		const box = boxRef.current;
		const backdrop = backdropRef.current;
		if (!dialog || !box || !backdrop) {
			return;
		}

		gsap.killTweensOf(box);
		gsap.killTweensOf(backdrop);

		if (open) {
			gsap.set(box, { opacity: 0, scale: 0.88, y: 32 });
			gsap.set(backdrop, { opacity: 0 });
			dialog.showModal();
			mountedRef.current = true;

			gsap.to(backdrop, {
				duration: 0.35,
				ease: "power2.out",
				opacity: 1,
			});
			gsap.to(box, {
				duration: 0.5,
				ease: "back.out(1.6)",
				opacity: 1,
				scale: 1,
				y: 0,
			});
		} else if (mountedRef.current) {
			gsap.to(backdrop, { duration: 0.25, ease: "power2.in", opacity: 0 });
			gsap.to(box, {
				duration: 0.3,
				ease: "power2.in",
				onComplete: () => {
					dialog.close();
					mountedRef.current = false;
				},
				opacity: 0,
				scale: 0.92,
				y: 20,
			});
		}
	}, [open]);

	return (
		<dialog
			ref={dialogRef}
			className={cn("modal", className)}
			style={DIALOG_STYLE}
			onClose={onClose}
		>
			<div
				ref={boxRef}
				className={cn("ds-modal-box", sizeMap[size])}
				style={HIDDEN_STYLE}
			>
				{title && (
					<div className="ds-modal-header">
						<h3 className="font-bold text-lg">{title}</h3>
						<button type="button" className="ds-modal-close" onClick={onClose}>
							<X size={18} />
						</button>
					</div>
				)}
				{!title && (
					<button
						type="button"
						className="ds-modal-close absolute top-3 right-3"
						onClick={onClose}
					>
						<X size={18} />
					</button>
				)}
				{children}
			</div>
			<div ref={backdropRef} className="modal-backdrop" style={{ opacity: 0 }}>
				<button type="button" onClick={onClose}>
					close
				</button>
			</div>
		</dialog>
	);
}
