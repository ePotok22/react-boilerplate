import gsap from "gsap";
import { AlertCircle, CheckCircle2, Info, ShieldAlert, X } from "lucide-react";
import { useEffect, useEffectEvent, useRef } from "react";
import type { ToastVariant } from "@/stores/toast.store";
import { useToastStore } from "@/stores/toast.store";
import { cn } from "@/utils/cn";

const variantMap: Record<ToastVariant, string> = {
	error: "ds-toast-error",
	info: "ds-toast-info",
	success: "ds-toast-success",
	warning: "ds-toast-warning",
};

const iconMap: Record<ToastVariant, typeof Info> = {
	error: AlertCircle,
	info: Info,
	success: CheckCircle2,
	warning: ShieldAlert,
};

function ToastItem({
	toast,
	onRemove,
	index,
}: Readonly<{
	toast: {
		id: string;
		message: string;
		variant: ToastVariant;
		duration?: number;
		dismissing?: boolean;
	};
	onRemove: (id: string) => void;
	index: number;
}>) {
	const itemRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLSpanElement>(null);
	const shineRef = useRef<HTMLSpanElement>(null);
	const hasAnimated = useRef(false);
	const isDismissing = useRef(false);
	const Icon = iconMap[toast.variant];

	useEffect(() => {
		if (!itemRef.current || hasAnimated.current) {
			return;
		}
		hasAnimated.current = true;

		const staggerDelay = index * 0.08;

		gsap.fromTo(
			itemRef.current,
			{ opacity: 0, rotateX: 8, scale: 0.8, x: 120, y: 12 },
			{
				delay: staggerDelay,
				duration: 0.55,
				ease: "back.out(1.8)",
				opacity: 1,
				rotateX: 0,
				scale: 1,
				x: 0,
				y: 0,
			},
		);

		const icon = itemRef.current.querySelector(".ds-toast-icon");
		if (icon) {
			gsap.fromTo(
				icon,
				{ opacity: 0, rotation: -180, scale: 0 },
				{
					delay: staggerDelay + 0.25,
					duration: 0.5,
					ease: "back.out(3)",
					opacity: 1,
					rotation: 0,
					scale: 1,
				},
			);
		}

		const iconWrap = itemRef.current.querySelector(".ds-toast-icon-wrap");
		if (iconWrap) {
			gsap.fromTo(
				iconWrap,
				{ opacity: 0, scale: 0.5 },
				{
					delay: staggerDelay + 0.15,
					duration: 0.4,
					ease: "back.out(2)",
					opacity: 1,
					scale: 1,
				},
			);
		}

		const message = itemRef.current.querySelector(".ds-toast-message");
		if (message) {
			gsap.fromTo(
				message,
				{ opacity: 0, x: 20 },
				{
					delay: staggerDelay + 0.3,
					duration: 0.35,
					ease: "power2.out",
					opacity: 1,
					x: 0,
				},
			);
		}

		if (shineRef.current) {
			gsap.to(shineRef.current, {
				delay: staggerDelay + 0.5,
				duration: 0.7,
				ease: "power2.inOut",
				x: "200%",
			});
		}

		const duration = toast.duration ?? 4000;
		if (progressRef.current && duration > 0) {
			gsap.fromTo(
				progressRef.current,
				{ scaleX: 1 },
				{
					duration: duration / 1000,
					ease: "linear",
					scaleX: 0,
				},
			);
		}

		if (itemRef.current) {
			gsap.to(itemRef.current, {
				delay: staggerDelay + 0.6,
				duration: 2.5,
				ease: "sine.inOut",
				repeat: -1,
				y: -2,
				yoyo: true,
			});
		}
	}, [toast.duration, index]);

	const onDismiss = useEffectEvent(() => {
		onRemove(toast.id);
	});

	useEffect(() => {
		if (!toast.dismissing || isDismissing.current || !itemRef.current) {
			return;
		}
		isDismissing.current = true;

		gsap.killTweensOf(itemRef.current);

		gsap.to(itemRef.current, {
			duration: 0.35,
			ease: "power3.in",
			height: 0,
			marginBottom: 0,
			onComplete: () => onDismiss(),
			opacity: 0,
			paddingBottom: 0,
			paddingTop: 0,
			rotateX: -10,
			scale: 0.75,
			x: 140,
		});
	}, [toast.dismissing]);

	const dismissToast = useToastStore((s) => s.dismissToast);

	const handleRemove = () => {
		dismissToast(toast.id);
	};

	return (
		<div
			ref={itemRef}
			className={cn("ds-toast-item", variantMap[toast.variant])}
		>
			<span ref={shineRef} className="ds-toast-shine" />
			<div className="ds-toast-icon-wrap">
				<Icon size={20} className="ds-toast-icon" />
			</div>
			<span className="ds-toast-message">{toast.message}</span>
			<button
				type="button"
				className="ds-toast-dismiss"
				onClick={handleRemove}
				aria-label="Dismiss toast"
			>
				<X size={14} />
			</button>
			{(toast.duration ?? 4000) > 0 && (
				<span ref={progressRef} className="ds-toast-progress" />
			)}
		</div>
	);
}

export default function ToastContainer() {
	const toasts = useToastStore((s) => s.toasts);
	const removeToast = useToastStore((s) => s.removeToast);

	if (toasts.length === 0) {
		return null;
	}

	return (
		<div className="ds-toast-container">
			{toasts.map((toast, index) => (
				<ToastItem
					key={toast.id}
					toast={toast}
					onRemove={removeToast}
					index={index}
				/>
			))}
		</div>
	);
}
