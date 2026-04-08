import {
	AlertTriangle,
	Expand,
	FileText,
	Info,
	Layers,
	MessageSquareText,
	Settings,
	Trash2,
	X,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Button } from "@/components/atoms";
import { Modal } from "@/components/molecules";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";
import { useToastStore } from "@/stores/toast.store";

export default function ModalShowcase() {
	const { t } = useTranslation("showcase");
	const addToast = useToastStore((s) => s.addToast);
	const [modalOpen, setModalOpen] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [sizeModal, setSizeModal] = useState<"sm" | "md" | "lg" | null>(null);
	const [formOpen, setFormOpen] = useState(false);

	return (
		<Section
			id="modal"
			title={t("modal.sectionTitle")}
			badge={t("modal.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("modal.basic.title")}
					description={t("modal.basic.description")}
				>
					<div className="space-y-3">
						<div className="space-y-1.5">
							{[
								{ icon: X, text: t("modal.basic.keyboardDismiss") },
								{
									icon: MessageSquareText,
									text: t("modal.basic.backdropClick"),
								},
								{ icon: Info, text: t("modal.basic.focusTrapping") },
							].map(({ icon: Icon, text }) => (
								<div
									key={text}
									className="flex items-center gap-2 rounded-lg bg-base-200/50 px-2.5 py-1.5 text-xs transition-colors hover:bg-base-200"
								>
									<Icon
										size={12}
										className="shrink-0 text-primary opacity-60"
									/>
									<span className="opacity-70">{text}</span>
								</div>
							))}
						</div>
						<Button
							variant="primary"
							size="sm"
							className="w-full gap-2"
							onClick={() => setModalOpen(true)}
						>
							<MessageSquareText size={14} />
							{t("modal.basic.openModal")}
						</Button>
					</div>
					<Modal
						open={modalOpen}
						onClose={() => setModalOpen(false)}
						title={t("modal.basic.welcome")}
					>
						<p className="py-2 text-sm opacity-70">
							This is a premium modal built on the native{" "}
							<code className="badge badge-sm">&lt;dialog&gt;</code> element
							with GSAP spring animation, rounded corners, and subtle border.
						</p>
						<div className="modal-action">
							<Button
								variant="primary"
								size="sm"
								onClick={() => setModalOpen(false)}
							>
								{t("modal.basic.gotIt")}
							</Button>
						</div>
					</Modal>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("modal.confirm.title")}
					description={t("modal.confirm.description")}
				>
					<div className="space-y-3">
						<div className="rounded-xl border border-error/20 bg-error/5 p-3">
							<div className="flex items-start gap-3">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-error/15">
									<AlertTriangle size={14} className="text-error" />
								</div>
								<div className="min-w-0">
									<p className="font-semibold text-sm">
										{t("modal.confirm.confirmDeletion")}
									</p>
									<p className="mt-0.5 text-xs opacity-60">
										{t("modal.confirm.thisCannotBeUndone")}
									</p>
								</div>
							</div>
							<div className="mt-3 flex justify-end gap-2">
								<span className="rounded-lg bg-base-200 px-3 py-1 font-medium text-[10px] opacity-40">
									{t("modal.confirm.cancel")}
								</span>
								<span className="rounded-lg bg-error/15 px-3 py-1 font-bold text-[10px] text-error">
									{t("modal.confirm.delete")}
								</span>
							</div>
						</div>
						<Button
							variant="secondary"
							size="sm"
							className="w-full gap-2"
							onClick={() => setConfirmOpen(true)}
						>
							<Trash2 size={14} />
							{t("modal.confirm.tryDeleteFlow")}
						</Button>
					</div>
					<Modal
						open={confirmOpen}
						onClose={() => setConfirmOpen(false)}
						title={t("modal.confirm.confirmDeletion")}
						size="sm"
					>
						<div className="flex items-start gap-3 py-2">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error/10">
								<AlertTriangle size={18} className="text-error" />
							</div>
							<p className="text-sm opacity-70">
								{t("modal.confirm.deleteConfirmMessage")}
							</p>
						</div>
						<div className="modal-action">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setConfirmOpen(false)}
							>
								{t("modal.confirm.cancel")}
							</Button>
							<Button
								variant="primary"
								size="sm"
								className="btn-error"
								onClick={() => {
									setConfirmOpen(false);
									addToast(t("modal.confirm.itemDeleted"), "success");
								}}
							>
								{t("modal.confirm.delete")}
							</Button>
						</div>
					</Modal>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("modal.size.title")}
					description={t("modal.size.description")}
				>
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-1.5">
							{(["sm", "md", "lg"] as const).map((s) => (
								<div
									key={s}
									className="flex flex-col items-center gap-1 rounded-lg bg-base-200/50 p-2.5 text-center transition-colors hover:bg-base-200"
								>
									<Expand size={12} className="text-primary opacity-60" />
									<span className="font-semibold text-[10px] uppercase opacity-50">
										{s}
									</span>
								</div>
							))}
						</div>
						<div className="flex gap-2">
							{(["sm", "md", "lg"] as const).map((s) => (
								<Button
									key={s}
									variant="outline"
									size="sm"
									className="grow gap-1 uppercase"
									onClick={() => setSizeModal(s)}
								>
									<Layers size={12} />
									{s}
								</Button>
							))}
						</div>
					</div>
					{sizeModal && (
						<Modal
							open={!!sizeModal}
							onClose={() => setSizeModal(null)}
							title={t("modal.size.sizeTitle", {
								size: sizeModal.toUpperCase(),
							})}
							size={sizeModal}
						>
							<p className="py-2 text-sm opacity-70">
								This is a{" "}
								<Badge variant="primary" size="sm">
									{sizeModal}
								</Badge>{" "}
								size modal. Each size is optimized for different content types.
							</p>
							<div className="modal-action">
								<Button
									variant="primary"
									size="sm"
									onClick={() => setSizeModal(null)}
								>
									Close
								</Button>
							</div>
						</Modal>
					)}
				</ShowcaseCard>

				<ShowcaseCard
					title={t("modal.form.title")}
					description={t("modal.form.description")}
				>
					<div className="space-y-3">
						<div className="rounded-xl border border-base-content/10 bg-base-200/30 p-3">
							<div className="flex items-start gap-3">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
									<Settings size={14} className="text-primary" />
								</div>
								<div className="min-w-0">
									<p className="font-semibold text-sm">
										{t("modal.form.settingsForm")}
									</p>
									<p className="mt-0.5 text-xs opacity-60">
										{t("modal.form.editPreferences")}
									</p>
								</div>
							</div>
						</div>
						<Button
							variant="primary"
							size="sm"
							className="w-full gap-2"
							onClick={() => setFormOpen(true)}
						>
							<FileText size={14} />
							{t("modal.form.openForm")}
						</Button>
					</div>
					<Modal
						open={formOpen}
						onClose={() => setFormOpen(false)}
						title={t("modal.form.editSettings")}
					>
						<div className="space-y-3 py-2">
							<div className="space-y-1">
								<label className="ds-label" htmlFor="modal-name">
									{t("modal.form.displayName")}
								</label>
								<div className="ds-field">
									<input
										id="modal-name"
										type="text"
										placeholder={t("modal.form.namePlaceholder")}
										className="ds-field-input"
									/>
								</div>
							</div>
							<div className="space-y-1">
								<label className="ds-label" htmlFor="modal-email">
									{t("modal.form.email")}
								</label>
								<div className="ds-field">
									<input
										id="modal-email"
										type="email"
										placeholder={t("modal.form.emailPlaceholder")}
										className="ds-field-input"
									/>
								</div>
							</div>
						</div>
						<div className="modal-action">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setFormOpen(false)}
							>
								{t("modal.form.cancel")}
							</Button>
							<Button
								variant="primary"
								size="sm"
								onClick={() => {
									setFormOpen(false);
									addToast(t("modal.form.settingsSaved"), "success");
								}}
							>
								{t("modal.form.saveChanges")}
							</Button>
						</div>
					</Modal>
				</ShowcaseCard>
			</div>
		</Section>
	);
}
