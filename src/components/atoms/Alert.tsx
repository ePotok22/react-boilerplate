import gsap from "gsap";
import { AlertCircle, CheckCircle2, Info, ShieldAlert, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
	variant?: AlertVariant;
	title?: string;
	dismissible?: boolean;
	onDismiss?: () => void;
	icon?: boolean;
	className?: string;
	children: React.ReactNode;
}

const variantMap: Record<AlertVariant, string> = {
	error: "alert-error",
	info: "alert-info",
	success: "alert-success",
	warning: "alert-warning",
};

const variantStyle: Record<AlertVariant, string> = {
	error: "ds-alert-error",
	info: "ds-alert-info",
	success: "ds-alert-success",
	warning: "ds-alert-warning",
};

const iconMap: Record<AlertVariant, typeof Info> = {
	error: AlertCircle,
	info: Info,
	success: CheckCircle2,
	warning: ShieldAlert,
};

export default function Alert({
	variant = "info",
	title,
	dismissible = false,
	onDismiss,
	icon = true,
	className,
	children,
}: Readonly<AlertProps>) {
	const alertRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLSpanElement>(null);
	const Icon = iconMap[variant];

	useEffect(() => {
		if (!alertRef.current) {
			return;
		}
		gsap.fromTo(
			alertRef.current,
			{ opacity: 0, x: -12 },
			{ duration: 0.4, ease: "power2.out", opacity: 1, x: 0 },
		);
	}, []);

	const handleDismiss = useCallback(() => {
		if (!alertRef.current) {
			onDismiss?.();
			return;
		}
		gsap.to(alertRef.current, {
			duration: 0.35,
			ease: "power2.in",
			height: 0,
			marginBottom: 0,
			onComplete: () => onDismiss?.(),
			opacity: 0,
			paddingBottom: 0,
			paddingTop: 0,
			x: 24,
		});
	}, [onDismiss]);

	return (
		<div
			ref={alertRef}
			role="alert"
			className={cn(
				"ds-alert",
				variantMap[variant],
				variantStyle[variant],
				className,
			)}
		>
			{icon && (
				<span ref={iconRef} className="ds-alert-icon-wrap">
					<Icon size={18} className="ds-alert-icon" />
				</span>
			)}
			<div className="min-w-0 grow">
				{title && (
					<p className="mb-0.5 font-bold text-sm leading-tight">{title}</p>
				)}
				<span
					className={cn(
						"text-sm leading-relaxed",
						title && "text-xs opacity-75",
					)}
				>
					{children}
				</span>
			</div>
			{dismissible && (
				<button
					type="button"
					className="ds-alert-dismiss shrink-0"
					onClick={handleDismiss}
					aria-label="Dismiss"
				>
					<X size={14} />
				</button>
			)}
		</div>
	);
}
