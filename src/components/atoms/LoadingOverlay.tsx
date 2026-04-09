import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "@/atoms/Spinner";

interface LoadingOverlayProps {
	message?: string;
	fullscreen?: boolean;
}

export default function LoadingOverlay({
	message,
	fullscreen = false,
}: Readonly<LoadingOverlayProps>) {
	const { t } = useTranslation();
	const overlayRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);
	const displayMessage = message ?? t("loading");

	useEffect(() => {
		if (!ringRef.current) {
			return;
		}
		gsap.to(ringRef.current, {
			duration: 3,
			ease: "none",
			repeat: -1,
			rotation: 360,
		});
		if (overlayRef.current) {
			gsap.fromTo(
				overlayRef.current,
				{ opacity: 0, scale: 0.95 },
				{ duration: 0.4, ease: "power3.out", opacity: 1, scale: 1 },
			);
		}

		const ring = ringRef.current;
		return () => {
			gsap.killTweensOf(ring);
		};
	}, []);

	return (
		<div
			ref={overlayRef}
			className={
				fullscreen
					? "fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-base-100/80 backdrop-blur-md"
					: "flex min-h-[40vh] flex-col items-center justify-center gap-5"
			}
		>
			<div className="relative flex items-center justify-center">
				<div
					ref={ringRef}
					className="absolute h-20 w-20 rounded-full border-2 border-primary/20 border-t-primary"
				/>
				<Spinner size="lg" className="text-primary" />
			</div>
			<div className="flex flex-col items-center gap-1">
				<p className="font-medium text-base-content/70 text-sm">
					{displayMessage}
				</p>
				<div className="mt-1 flex gap-1">
					{[0, 1, 2].map((i) => (
						<span
							key={i}
							className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-primary/50"
							style={{ animationDelay: `${i * 150}ms` }}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
