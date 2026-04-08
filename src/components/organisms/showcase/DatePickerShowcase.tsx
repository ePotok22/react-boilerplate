import { addDays, startOfToday } from "date-fns";
import {
	Calendar,
	CalendarCheck,
	CalendarDays,
	CalendarOff,
	Code2,
} from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/atoms";
import { DatePicker } from "@/components/molecules";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";

function DatePickerPrefilled() {
	const { t } = useTranslation("showcase");
	const [date, setDate] = useState<Date | undefined>(
		addDays(startOfToday(), 7),
	);
	return (
		<DatePicker
			label={t("datePicker.preFilled.label")}
			value={date}
			onChange={setDate}
			placeholder={t("datePicker.preFilled.placeholder")}
		/>
	);
}

function DatePickerDisabledPast() {
	const { t } = useTranslation("showcase");
	const [date, setDate] = useState<Date | undefined>(undefined);
	const today = startOfToday();
	return (
		<>
			<DatePicker
				label={t("datePicker.disabledPast.label")}
				value={date}
				onChange={setDate}
				disabled={{ before: today }}
				placeholder={t("datePicker.disabledPast.placeholder")}
			/>
			{date && (
				<div className="flex items-center gap-2 rounded-lg bg-success/10 px-2.5 py-1.5">
					<CalendarCheck size={12} className="text-success" />
					<span className="font-medium text-success text-xs">
						{date.toLocaleDateString()}
					</span>
				</div>
			)}
		</>
	);
}

export default function DatePickerShowcase() {
	const { t } = useTranslation("showcase");
	const [pickerDate, setPickerDate] = useState<Date | undefined>(undefined);
	const [pickerRange, setPickerRange] = useState<DateRange | undefined>(
		undefined,
	);

	return (
		<Section
			id="datepicker"
			title={t("datePicker.sectionTitle")}
			badge={t("datePicker.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<ShowcaseCard
					title={t("datePicker.single.title")}
					description={t("datePicker.single.description")}
				>
					<div className="space-y-3">
						<div className="flex items-center gap-2 rounded-lg bg-primary/5 px-2.5 py-1.5">
							<Calendar size={12} className="text-primary opacity-60" />
							<span className="text-[10px] opacity-50">
								{t("datePicker.single.hint")}
							</span>
						</div>
						<DatePicker
							label={t("datePicker.single.label")}
							value={pickerDate}
							onChange={setPickerDate}
							placeholder={t("datePicker.single.placeholder")}
						/>
						{pickerDate && (
							<div className="flex items-center gap-2 rounded-lg bg-success/10 px-2.5 py-1.5">
								<CalendarCheck size={12} className="text-success" />
								<span className="font-medium text-success text-xs">
									{pickerDate.toLocaleDateString()}
								</span>
							</div>
						)}
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("datePicker.range.title")}
					description={t("datePicker.range.description")}
				>
					<div className="space-y-3">
						<div className="flex items-center gap-2 rounded-lg bg-secondary/5 px-2.5 py-1.5">
							<CalendarDays size={12} className="text-secondary opacity-60" />
							<span className="text-[10px] opacity-50">
								{t("datePicker.range.hint")}
							</span>
						</div>
						<DatePicker
							mode="range"
							label={t("datePicker.range.label")}
							value={pickerRange}
							onChange={setPickerRange}
							placeholder={t("datePicker.range.placeholder")}
						/>
						{pickerRange?.from && pickerRange?.to && (
							<div className="flex items-center gap-2 rounded-lg bg-success/10 px-2.5 py-1.5">
								<CalendarCheck size={12} className="text-success" />
								<span className="font-medium text-success text-xs">
									{pickerRange.from.toLocaleDateString()} →{" "}
									{pickerRange.to.toLocaleDateString()}
								</span>
							</div>
						)}
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("datePicker.disabledPast.title")}
					description={t("datePicker.disabledPast.description")}
				>
					<div className="space-y-3">
						<div className="flex items-center gap-2 rounded-lg bg-warning/8 px-2.5 py-1.5">
							<CalendarOff size={12} className="text-warning opacity-60" />
							<span className="text-[10px] opacity-50">
								{t("datePicker.disabledPast.hint")}
							</span>
						</div>
						<DatePickerDisabledPast />
					</div>
				</ShowcaseCard>
			</div>

			<div className="mt-4 grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("datePicker.preFilled.title")}
					description={t("datePicker.preFilled.description")}
				>
					<div className="space-y-3">
						<div className="flex items-center gap-2 rounded-lg bg-base-200/50 px-2.5 py-1.5">
							<CalendarCheck size={12} className="text-primary opacity-60" />
							<span className="text-[10px] opacity-50">
								{t("datePicker.preFilled.hint")}
							</span>
						</div>
						<DatePickerPrefilled />
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("datePicker.usage.title")}
					description={t("datePicker.usage.description")}
				>
					<div className="space-y-3">
						<div className="flex flex-wrap gap-1.5">
							{["single", "range"].map((mode) => (
								<Badge key={mode} variant="accent">
									mode=&quot;{mode}&quot;
								</Badge>
							))}
						</div>
						<div className="mockup-code text-xs">
							<pre data-prefix="1">
								<code>{'import { DatePicker } from "@/molecules";'}</code>
							</pre>
							<pre data-prefix="2">
								<code>{"<DatePicker"}</code>
							</pre>
							<pre data-prefix="3">
								<code>{'  mode="single" // or "range"'}</code>
							</pre>
							<pre data-prefix="4">
								<code>{"  value={date} onChange={setDate}"}</code>
							</pre>
							<pre data-prefix="5">
								<code>{"/>"}</code>
							</pre>
						</div>
						<div className="flex items-center gap-1.5 rounded-lg bg-base-200/40 px-2.5 py-1.5">
							<Code2 size={10} className="opacity-30" />
							<span className="text-[10px] opacity-40">
								{t("datePicker.usage.hint")}
							</span>
						</div>
					</div>
				</ShowcaseCard>
			</div>
		</Section>
	);
}
