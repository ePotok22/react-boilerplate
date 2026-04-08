import gsap from "gsap";
import { Check, ChevronDown, X } from "lucide-react";
import {
	type ReactNode,
	type Ref,
	useEffect,
	useEffectEvent,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

interface SelectOption {
	disabled?: boolean;
	label: string;
	value: string;
}

interface SingleSelectProps {
	defaultValue?: string;
	multi?: false;
	onChange?: (value: string) => void;
	value?: string;
}

interface MultiSelectProps {
	defaultValue?: string[];
	multi: true;
	onChange?: (value: string[]) => void;
	value?: string[];
}

type SelectFieldProps = {
	className?: string;
	disabled?: boolean;
	error?: string;
	helperText?: string;
	icon?: ReactNode;
	id?: string;
	label: string;
	name?: string;
	options: SelectOption[];
	placeholder?: string;
	ref?: Ref<HTMLInputElement>;
} & (SingleSelectProps | MultiSelectProps);

export default function SelectField({
	className,
	defaultValue,
	disabled,
	error,
	helperText,
	icon,
	id,
	label,
	multi,
	name,
	onChange,
	options,
	placeholder = "Select…",
	ref,
	value: controlledValue,
}: Readonly<SelectFieldProps>) {
	const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;

	const [open, setOpen] = useState(false);
	const [portalReady, setPortalReady] = useState(false);

	const [internalSingle, setInternalSingle] = useState<string>(
		!multi ? ((defaultValue as string) ?? "") : "",
	);
	const [internalMulti, setInternalMulti] = useState<string[]>(
		multi ? ((defaultValue as string[]) ?? []) : [],
	);

	const selectedSingle =
		!multi && controlledValue !== undefined
			? (controlledValue as string)
			: internalSingle;
	const selectedMulti =
		multi && controlledValue !== undefined
			? (controlledValue as string[])
			: internalMulti;
	const triggerRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const chevronRef = useRef<HTMLSpanElement>(null);
	const hiddenRef = useRef<HTMLInputElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(ref, () => hiddenRef.current as HTMLInputElement);
	useEffect(() => {
		setPortalReady(true);
	}, []);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as Node;
			if (
				wrapperRef.current?.contains(target) ||
				dropdownRef.current?.contains(target)
			) {
				return;
			}
			setOpen(false);
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	const [dropdownPos, setDropdownPos] = useState({
		left: 0,
		top: 0,
		width: 0,
	});

	const updateDropdownPos = useEffectEvent(() => {
		if (!triggerRef.current) {
			return;
		}
		const rect = triggerRef.current.getBoundingClientRect();
		setDropdownPos({
			left: rect.left + window.scrollX,
			top: rect.bottom + window.scrollY + 6,
			width: rect.width,
		});
	});

	const selectedOption = !multi
		? options.find((o) => o.value === selectedSingle)
		: null;
	const selectedOptions = multi
		? options.filter((o) => selectedMulti.includes(o.value))
		: [];
	const hasValue = multi ? selectedMulti.length > 0 : !!selectedSingle;

	const onAnimateOpen = useEffectEvent(() => {
		if (!dropdownRef.current || !chevronRef.current) {
			return;
		}
		updateDropdownPos();
		gsap.killTweensOf([dropdownRef.current, chevronRef.current]);
		gsap.set(dropdownRef.current, { display: "block" });
		gsap.fromTo(
			dropdownRef.current,
			{ opacity: 0, scaleY: 0.95, y: -8 },
			{ duration: 0.25, ease: "power3.out", opacity: 1, scaleY: 1, y: 0 },
		);
		gsap.to(chevronRef.current, {
			duration: 0.3,
			ease: "back.out(1.7)",
			rotation: 180,
		});
		const items = dropdownRef.current.querySelectorAll("[data-option]");
		gsap.fromTo(
			items,
			{ opacity: 0, x: -6 },
			{ duration: 0.2, ease: "power2.out", opacity: 1, stagger: 0.03, x: 0 },
		);
	});

	const onAnimateClose = useEffectEvent(() => {
		if (!dropdownRef.current || !chevronRef.current) {
			return;
		}
		gsap.killTweensOf([dropdownRef.current, chevronRef.current]);
		gsap.to(dropdownRef.current, {
			duration: 0.18,
			ease: "power2.in",
			onComplete: () => {
				if (dropdownRef.current) {
					gsap.set(dropdownRef.current, { display: "none" });
				}
			},
			opacity: 0,
			scaleY: 0.96,
			y: -6,
		});
		gsap.to(chevronRef.current, {
			duration: 0.25,
			ease: "power2.out",
			rotation: 0,
		});
	});

	const toggle = () => {
		if (disabled) {
			return;
		}
		setOpen((prev) => !prev);
	};

	const _close = () => setOpen(false);

	const selectSingle = (opt: SelectOption) => {
		if (opt.disabled) {
			return;
		}
		if (controlledValue === undefined) {
			setInternalSingle(opt.value);
		}
		(onChange as ((v: string) => void) | undefined)?.(opt.value);
		setOpen(false);
		triggerRef.current?.focus();
	};

	const toggleMulti = (opt: SelectOption) => {
		if (opt.disabled) {
			return;
		}
		const current =
			controlledValue !== undefined
				? (controlledValue as string[])
				: internalMulti;
		const next = current.includes(opt.value)
			? current.filter((v) => v !== opt.value)
			: [...current, opt.value];
		if (controlledValue === undefined) {
			setInternalMulti(next);
		}
		(onChange as ((v: string[]) => void) | undefined)?.(next);
	};

	const clearAll = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (multi) {
			if (controlledValue === undefined) {
				setInternalMulti([]);
			}
			(onChange as ((v: string[]) => void) | undefined)?.([]);
		} else {
			if (controlledValue === undefined) {
				setInternalSingle("");
			}
			(onChange as ((v: string) => void) | undefined)?.("");
		}
		triggerRef.current?.focus();
	};

	useEffect(() => {
		if (open) {
			onAnimateOpen();
			const reposition = () => updateDropdownPos();
			window.addEventListener("scroll", reposition, { passive: true });
			window.addEventListener("resize", reposition, { passive: true });
			return () => {
				window.removeEventListener("scroll", reposition);
				window.removeEventListener("resize", reposition);
			};
		}
		onAnimateClose();
	}, [open]);

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			setOpen(false);
			triggerRef.current?.focus();
		}
		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			e.preventDefault();
			if (!open) {
				setOpen(true);
				return;
			}
			if (!multi) {
				const enabledOpts = options.filter((o) => !o.disabled);
				const idx = enabledOpts.findIndex((o) => o.value === selectedSingle);
				const next =
					e.key === "ArrowDown"
						? (idx + 1) % enabledOpts.length
						: (idx - 1 + enabledOpts.length) % enabledOpts.length;
				const nextOpt = enabledOpts[next];
				if (nextOpt) {
					selectSingle(nextOpt);
				}
			}
		}
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggle();
		}
	};

	const hiddenValue = multi ? selectedMulti.join(",") : selectedSingle;

	const renderTriggerContent = () => {
		if (multi && selectedOptions.length > 0) {
			return (
				<span className="ds-select-tags">
					{selectedOptions.map((opt) => (
						<span key={opt.value} className="ds-select-tag">
							{opt.label}
						</span>
					))}
				</span>
			);
		}
		return (
			<span
				className={cn(
					"min-w-0 grow text-left text-sm",
					!selectedOption && "text-base-content/30",
				)}
			>
				{selectedOption?.label || placeholder}
			</span>
		);
	};

	return (
		<fieldset className="fieldset space-y-1">
			<label className="label ds-label" htmlFor={fieldId}>
				{label}
				{multi && selectedMulti.length > 0 && (
					<span className="ds-select-count">{selectedMulti.length}</span>
				)}
			</label>
			<div ref={wrapperRef} className="relative">
				<input ref={hiddenRef} type="hidden" name={name} value={hiddenValue} />
				<button
					ref={triggerRef}
					type="button"
					id={fieldId}
					role="combobox"
					aria-expanded={open}
					aria-haspopup="listbox"
					disabled={disabled}
					onClick={toggle}
					onKeyDown={onKeyDown}
					className={cn(
						"ds-field cursor-pointer",
						multi && selectedOptions.length > 0 && "h-auto min-h-10 py-1.5",
						error && "ds-field-error",
						disabled && "pointer-events-none opacity-50",
						className,
					)}
				>
					{icon && <span className="ds-field-icon">{icon}</span>}
					{renderTriggerContent()}

					{hasValue && !disabled && (
						<button
							type="button"
							aria-label="Clear selection"
							onClick={clearAll}
							className="ds-select-clear"
						>
							<X size={13} />
						</button>
					)}

					<span ref={chevronRef} className="ds-select-chevron">
						<ChevronDown size={14} />
					</span>
				</button>
			</div>

			{portalReady &&
				createPortal(
					<div
						ref={dropdownRef}
						role="listbox"
						aria-labelledby={fieldId}
						aria-multiselectable={multi || undefined}
						className="ds-select-dropdown"
						style={{
							display: "none",
							left: dropdownPos.left,
							position: "absolute",
							top: dropdownPos.top,
							width: dropdownPos.width,
						}}
					>
						{options.map((opt) => {
							const isSelected = multi
								? selectedMulti.includes(opt.value)
								: opt.value === selectedSingle;
							return (
								<button
									key={opt.value}
									type="button"
									role="option"
									data-option
									aria-selected={isSelected}
									disabled={opt.disabled}
									onClick={() => (multi ? toggleMulti(opt) : selectSingle(opt))}
									className={cn(
										"ds-select-option",
										isSelected && "ds-select-option-active",
										opt.disabled && "pointer-events-none opacity-40",
									)}
								>
									{multi && (
										<span
											className={cn(
												"ds-select-checkbox",
												isSelected && "ds-select-checkbox-checked",
											)}
										>
											{isSelected && <Check size={10} />}
										</span>
									)}
									<span className="grow">{opt.label}</span>
									{!multi && isSelected && (
										<Check size={14} className="shrink-0 text-primary" />
									)}
								</button>
							);
						})}
					</div>,
					document.body,
				)}

			{error && (
				<p className="input-error-msg">
					<span className="inline-block h-1 w-1 rounded-full bg-error" />
					{error}
				</p>
			)}
			{helperText && !error && <p className="ds-field-helper">{helperText}</p>}
		</fieldset>
	);
}
