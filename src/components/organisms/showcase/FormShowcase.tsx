import {
	AlertTriangle,
	Hash,
	Layers,
	Mail,
	MessageSquare,
	Search,
	Send,
	User,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Checkbox, Toggle } from "@/components/atoms";
import {
	ButtonGroup,
	CardForm,
	FormField,
	InputGroup,
	SelectField,
	TextareaField,
} from "@/components/molecules";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";

export default function FormShowcase() {
	const [formSubmitted, setFormSubmitted] = useState(false);
	const { t } = useTranslation("showcase");

	return (
		<Section id="form" title={t("form.sectionTitle")} badge={t("form.badge")}>
			<ShowcaseCard
				title={t("form.contact.title")}
				description={t("form.contact.description")}
			>
				<form
					className="space-y-4"
					onSubmit={(e) => {
						e.preventDefault();
						setFormSubmitted(true);
					}}
				>
					<div className="grid gap-4 sm:grid-cols-2">
						<FormField
							label={t("form.contact.fullNameLabel")}
							placeholder={t("form.contact.fullNamePlaceholder")}
							icon={<User size={16} />}
							required
						/>
						<FormField
							label={t("form.contact.emailLabel")}
							type="email"
							placeholder={t("form.contact.emailPlaceholder")}
							icon={<Mail size={16} />}
							required
						/>
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						<FormField
							label={t("form.contact.subjectLabel")}
							placeholder={t("form.contact.subjectPlaceholder")}
							icon={<Send size={16} />}
						/>
						<SelectField
							label={t("form.contact.priorityLabel")}
							icon={<Hash size={16} />}
							placeholder={t("form.contact.priorityPlaceholder")}
							options={[
								{ label: t("form.contact.low"), value: "low" },
								{ label: t("form.contact.medium"), value: "medium" },
								{ label: t("form.contact.high"), value: "high" },
								{ label: t("form.contact.urgent"), value: "urgent" },
							]}
						/>
					</div>
					<TextareaField
						label={t("form.contact.messageLabel")}
						placeholder={t("form.contact.messagePlaceholder")}
						icon={<MessageSquare size={16} />}
						rows={3}
					/>
					<FormField
						label={t("form.contact.errorExample")}
						placeholder={t("form.contact.errorPlaceholder")}
						icon={<AlertTriangle size={16} />}
						error={t("form.contact.fieldRequired")}
					/>
					<Checkbox label={t("form.contact.agreeTerms")} />
					<ButtonGroup>
						<Button type="submit" variant="primary">
							{t("form.contact.submit")}
						</Button>
						<Button
							type="reset"
							variant="ghost"
							onClick={() => setFormSubmitted(false)}
						>
							{t("form.contact.reset")}
						</Button>
					</ButtonGroup>
					{formSubmitted && (
						<Alert variant="success">{t("form.contact.submitSuccess")}</Alert>
					)}
				</form>
			</ShowcaseCard>

			<div className="mt-4 grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("form.multiSelect.title")}
					description={t("form.multiSelect.description")}
				>
					<div className="space-y-4">
						<SelectField
							label={t("form.multiSelect.techLabel")}
							icon={<Layers size={16} />}
							placeholder={t("form.multiSelect.techPlaceholder")}
							multi
							options={[
								{ label: "React", value: "react" },
								{ label: "TypeScript", value: "typescript" },
								{ label: "Tailwind CSS", value: "tailwind" },
								{ label: "GSAP", value: "gsap" },
								{ label: "Vite", value: "vite" },
								{ label: "Vitest", value: "vitest" },
							]}
						/>
						<SelectField
							label={t("form.multiSelect.disabledLabel")}
							multi
							disabled
							placeholder={t("form.multiSelect.notAvailable")}
							options={[{ label: "N/A", value: "na" }]}
						/>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("form.inputGroup.title")}
					description={t("form.inputGroup.description")}
				>
					<div className="space-y-3">
						<InputGroup
							startAddon={
								<span className="text-base-content/50">https://</span>
							}
						>
							<input
								className="h-10 min-w-0 grow bg-transparent px-3 text-sm outline-none placeholder:text-base-content/30"
								placeholder={t("form.inputGroup.examplePlaceholder")}
							/>
						</InputGroup>
						<InputGroup
							startAddon={<Search size={16} />}
							endAddon={
								<Button size="sm" variant="primary" className="rounded-l-none">
									{t("form.inputGroup.search")}
								</Button>
							}
						>
							<input
								className="h-10 min-w-0 grow bg-transparent px-3 text-sm outline-none placeholder:text-base-content/30"
								placeholder={t("form.inputGroup.searchPlaceholder")}
							/>
						</InputGroup>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("form.cardForm.title")}
					description={t("form.cardForm.description")}
				>
					<CardForm
						title={t("form.cardForm.feedback")}
						description={t("form.cardForm.feedbackDesc")}
						onSubmit={(e) => e.preventDefault()}
						actions={
							<>
								<Button variant="ghost" size="sm">
									{t("form.cardForm.cancel")}
								</Button>
								<Button size="sm">{t("form.cardForm.send")}</Button>
							</>
						}
					>
						<FormField
							label={t("form.cardForm.nameLabel")}
							placeholder={t("form.cardForm.namePlaceholder")}
						/>
						<SelectField
							label={t("form.cardForm.ratingLabel")}
							options={[
								{ label: t("form.cardForm.excellent"), value: "5" },
								{ label: t("form.cardForm.good"), value: "4" },
								{ label: t("form.cardForm.average"), value: "3" },
							]}
							placeholder={t("form.cardForm.rateUs")}
						/>
					</CardForm>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("form.toggle.title")}
					description={t("form.toggle.description")}
				>
					<div className="space-y-3">
						<Toggle
							label={t("form.toggle.enableNotifications")}
							variant="primary"
						/>
						<Toggle
							label={t("form.toggle.darkMode")}
							description={t("form.toggle.darkModeDesc")}
							variant="secondary"
						/>
						<Toggle
							label={t("form.toggle.autoSave")}
							variant="success"
							defaultChecked
						/>
						<div className="flex flex-wrap items-center gap-4">
							<Toggle label="XS" size="xs" variant="accent" />
							<Toggle label="SM" size="sm" variant="warning" />
							<Toggle label="MD" size="md" variant="primary" />
							<Toggle label="LG" size="lg" variant="error" />
						</div>
						<Toggle label={t("form.toggle.disabled")} disabled />
						<Toggle
							label={t("form.toggle.withError")}
							error={t("form.toggle.mustBeEnabled")}
						/>
					</div>
				</ShowcaseCard>
			</div>
		</Section>
	);
}
