import {
	CircleCheck,
	CircleX,
	Clock,
	Info,
	Sparkles,
	TriangleAlert,
	Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";
import { useToastStore } from "@/stores/toast.store";

export default function ToastShowcase() {
	const { t } = useTranslation("showcase");
	const addToast = useToastStore((s) => s.addToast);

	return (
		<Section
			id="toast"
			title={t("toast.sectionTitle")}
			badge={t("toast.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("toast.trigger.title")}
					description={t("toast.trigger.description")}
				>
					<div className="space-y-3">
						<div className="flex flex-wrap gap-2">
							<Button
								variant="primary"
								size="sm"
								onClick={() =>
									addToast(t("toast.trigger.successMsg"), "success")
								}
							>
								<CircleCheck size={15} /> Success
							</Button>
							<Button
								variant="secondary"
								size="sm"
								onClick={() => addToast(t("toast.trigger.errorMsg"), "error")}
							>
								<CircleX size={15} /> Error
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() =>
									addToast(t("toast.trigger.warningMsg"), "warning")
								}
							>
								<TriangleAlert size={15} /> Warning
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => addToast(t("toast.trigger.infoMsg"), "info")}
							>
								<Info size={15} /> Info
							</Button>
						</div>
						<div className="flex flex-wrap gap-2">
							<Button
								variant="accent"
								size="sm"
								onClick={() =>
									addToast(t("toast.trigger.longMsg"), "info", 8000)
								}
							>
								<Clock size={15} /> Long (8s)
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() =>
									addToast(t("toast.trigger.stickyMsg"), "warning", 0)
								}
							>
								<Zap size={15} /> Sticky
							</Button>
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("toast.animationFeatures.title")}
					description={t("toast.animationFeatures.description")}
				>
					<div className="space-y-3">
						<div className="rounded-xl border border-base-content/8 bg-base-200/30 p-3">
							<div className="space-y-2 text-xs">
								{[
									{
										color: "bg-primary/10 text-primary",
										icon: "↗",
										label: t("toast.animationFeatures.springSlide"),
									},
									{
										color: "bg-success/10 text-success",
										icon: "⟳",
										label: t("toast.animationFeatures.iconBounce"),
									},
									{
										color: "bg-info/10 text-info",
										icon: "▬",
										label: t("toast.animationFeatures.progressBar"),
									},
									{
										color: "bg-error/10 text-error",
										icon: "↘",
										label: t("toast.animationFeatures.collapseDismiss"),
									},
									{
										color: "bg-warning/10 text-warning",
										icon: <Sparkles size={10} />,
										label: t("toast.animationFeatures.variantBorder"),
									},
								].map((feature) => (
									<div key={feature.label} className="flex items-center gap-2">
										<span
											className={`flex h-5 w-5 items-center justify-center rounded-lg text-[10px] ${feature.color}`}
										>
											{feature.icon}
										</span>
										<span className="opacity-60">{feature.label}</span>
									</div>
								))}
							</div>
						</div>
						<div className="mockup-code text-xs">
							<pre data-prefix="1">
								<code>
									{"const addToast = useToastStore(s => s.addToast);"}
								</code>
							</pre>
							<pre data-prefix="2">
								<code>{'addToast("Saved!", "success");'}</code>
							</pre>
							<pre data-prefix="3">
								<code>
									{'addToast("Sticky!", "warning", 0); // no auto-dismiss'}
								</code>
							</pre>
						</div>
					</div>
				</ShowcaseCard>
			</div>
		</Section>
	);
}
