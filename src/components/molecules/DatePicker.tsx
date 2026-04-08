import { format } from "date-fns";
import gsap from "gsap";
import { Calendar } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { type DateRange, DayPicker, type Matcher } from "react-day-picker";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import "react-day-picker/style.css";

type DatePickerMode = "single" | "range";

interface BaseDatePickerProps {
	label?: string;
	placeholder?: string;
	disabled?: Matcher | Matcher[];
	className?: string;
}

interface SingleDatePickerProps extends BaseDatePickerProps {
	mode?: "single";
	value?: Date;
	onChange?: (date: Date | undefined) => void;
}

interface RangeDatePickerProps extends BaseDatePickerProps {
	mode: "range";
	value?: DateRange;
	onChange?: (range: DateRange | undefined) => void;
}

type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

function formatDisplay(
	mode: DatePickerMode,
	value: Date | DateRange | undefined,
): string {
	if (!value) {
		return "";
	}
	if (mode === "range") {
		const range = value as DateRange;
		if (range.from && range.to) {
			return `${format(range.from, "PP")} – ${format(range.to, "PP")}`;
		}
		if (range.from) {
			return format(range.from, "PP");
		}
		return "";
	}
	return format(value as Date, "PP");
}

export default function DatePicker(props: Readonly<DatePickerProps>) {
	const { t } = useTranslation("common");
	const {
		label,
		placeholder,
		disabled,
		className,
		mode = "single",
		value,
		onChange,
	} = props;

	const [open, setOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [pos, setPos] = useState({ left: 0, top: 0 });
	const wrapperRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const updatePosition = useEffectEvent(() => {
		if (triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			setPos({ left: rect.left, top: rect.bottom + 8 });
		}
	});

	useEffect(() => {
		if (open) {
			setMounted(true);
			updatePosition();
		} else if (mounted && dropdownRef.current) {
			gsap.to(dropdownRef.current, {
				duration: 0.2,
				ease: "power2.in",
				onComplete: () => setMounted(false),
				opacity: 0,
				scale: 0.95,
				y: -4,
			});
		}
	}, [open, mounted]);

	useEffect(() => {
		if (mounted && dropdownRef.current) {
			gsap.fromTo(
				dropdownRef.current,
				{ opacity: 0, scale: 0.95, y: -6 },
				{ duration: 0.3, ease: "back.out(2)", opacity: 1, scale: 1, y: 0 },
			);
		}
	}, [mounted]);

	useEffect(() => {
		if (!open) {
			return;
		}
		const handler = (e: MouseEvent) => {
			const target = e.target as Node;
			if (
				wrapperRef.current?.contains(target) ||
				dropdownRef.current?.contains(target)
			) {
				return;
			}
			setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);

	useEffect(() => {
		if (!open) {
			return;
		}
		const reposition = () => updatePosition();
		window.addEventListener("scroll", reposition, true);
		window.addEventListener("resize", reposition);
		return () => {
			window.removeEventListener("scroll", reposition, true);
			window.removeEventListener("resize", reposition);
		};
	}, [open]);

	const display = formatDisplay(mode, value);

	return (
		<div ref={wrapperRef} className={`relative ${className ?? ""}`}>
			{label && (
				<label
					className="label font-medium text-base-content/60 text-xs"
					htmlFor={`dp-${label}`}
				>
					{label}
				</label>
			)}
			<button
				ref={triggerRef}
				type="button"
				id={label ? `dp-${label}` : undefined}
				className={`group flex h-10 w-full cursor-pointer items-center gap-2 rounded-xl border bg-base-100 px-4 text-left shadow-sm transition-all duration-200 ${
					open
						? "border-primary shadow-md ring-2 ring-primary/15"
						: "border-base-content/10 hover:border-base-content/20 hover:shadow-md"
				}`}
				onClick={() => setOpen((o) => !o)}
			>
				<span
					className={`shrink-0 transition-colors duration-200 ${
						open ? "text-primary" : "text-base-content/40"
					}`}
				>
					<Calendar size={16} />
				</span>
				<span
					className={`flex-1 truncate text-sm ${display ? "" : "text-base-content/30"}`}
				>
					{display || placeholder || t("datePicker.pickADate")}
				</span>
			</button>
			{mounted &&
				createPortal(
					<div
						ref={dropdownRef}
						style={{
							left: pos.left,
							opacity: 0,
							position: "fixed",
							top: pos.top,
							zIndex: 99999,
						}}
						className="origin-top rounded-xl border border-base-content/10 bg-base-100 p-3 shadow-lg"
					>
						{mode === "range" ? (
							<DayPicker
								mode="range"
								selected={value as DateRange | undefined}
								onSelect={(range) => {
									(onChange as RangeDatePickerProps["onChange"])?.(range);
									if (range?.from && range?.to) {
										setOpen(false);
									}
								}}
								disabled={disabled}
							/>
						) : (
							<DayPicker
								mode="single"
								selected={value as Date | undefined}
								onSelect={(date) => {
									(onChange as SingleDatePickerProps["onChange"])?.(date);
									setOpen(false);
								}}
								disabled={disabled}
							/>
						)}
					</div>,
					document.body,
				)}
		</div>
	);
}
