import {
	Bell,
	CheckCircle2,
	Crown,
	Flame,
	Palette,
	Sparkles,
	Tag,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Badge, Button } from "@/components/atoms";
import type { BadgeVariant } from "@/components/atoms/Badge";
import { Card } from "@/components/molecules";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";

export default function TypographyShowcase() {
	const { t } = useTranslation("showcase");

	return (
		<Section
			id="typography"
			title={t("typography.sectionTitle")}
			badge={t("typography.badge")}
		>
			<ShowcaseCard
				title={t("typography.headings.title")}
				description={t("typography.headings.description")}
			>
				<div className="space-y-3">
					<h1 className="display-title font-bold text-4xl">
						{t("typography.headings.displayTitle")}
					</h1>
					<h2 className="font-bold text-2xl">
						{t("typography.headings.heading2")}
					</h2>
					<h3 className="font-bold text-xl">
						{t("typography.headings.heading3")}
					</h3>
					<h4 className="font-semibold text-lg">
						{t("typography.headings.heading4")}
					</h4>
					<p className="text-(--sea-ink-soft) text-base">
						{t("typography.headings.bodyText")}
					</p>
					<p className="text-sm opacity-60">
						{t("typography.headings.captionText")}
					</p>
				</div>
			</ShowcaseCard>
			<div className="mt-4 grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("typography.cards.title")}
					description={t("typography.cards.description")}
				>
					<div className="space-y-3">
						<Card
							title={t("typography.cards.default")}
							description={t("typography.cards.defaultDesc")}
						/>
						<Card
							title={t("typography.cards.bordered")}
							description={t("typography.cards.borderedDesc")}
							variant="bordered"
						/>
						<Card
							title={t("typography.cards.glass")}
							description={t("typography.cards.glassDesc")}
							variant="glass"
						>
							<Button variant="primary" size="sm">
								{t("typography.cards.learnMore")}
							</Button>
						</Card>
					</div>
				</ShowcaseCard>
				<ShowcaseCard
					title={t("typography.buttons.title")}
					description={t("typography.buttons.description")}
				>
					<div className="space-y-3">
						<div className="flex flex-wrap gap-2">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="accent">Accent</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="error">Error</Button>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<Button variant="primary" size="xs">
								XS
							</Button>
							<Button variant="primary" size="sm">
								Small
							</Button>
							<Button variant="primary" size="lg">
								Large
							</Button>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<Button variant="primary" loading>
								Loading
							</Button>
							<Button variant="primary" disabled>
								Disabled
							</Button>
							<Button variant="outline" size="sm" className="gap-1">
								<Sparkles size={14} />
								{t("typography.buttons.withIcon")}
							</Button>
						</div>
					</div>
				</ShowcaseCard>
			</div>
		</Section>
	);
}

export function AlertsBadgesShowcase() {
	const { t } = useTranslation("showcase");
	const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

	const ALERT_CONFIG = [
		{
			text: t("typography.alertVariants.infoText"),
			title: "Information",
			variant: "info" as const,
		},
		{
			text: t("typography.alertVariants.successText"),
			title: "Success",
			variant: "success" as const,
		},
		{
			text: t("typography.alertVariants.warningText"),
			title: "Warning",
			variant: "warning" as const,
		},
		{
			text: t("typography.alertVariants.errorText"),
			title: "Error",
			variant: "error" as const,
		},
	];

	const BADGE_GROUPS: {
		badges: { text: string; variant: BadgeVariant }[];
		label: string;
	}[] = [
		{
			badges: [
				{ text: "Active", variant: "success" },
				{ text: "Pending", variant: "warning" },
				{ text: "Offline", variant: "error" },
			],
			label: t("typography.badgeVariants.status"),
		},
		{
			badges: [
				{ text: "Primary", variant: "primary" },
				{ text: "Secondary", variant: "secondary" },
				{ text: "Accent", variant: "accent" },
			],
			label: t("typography.badgeVariants.category"),
		},
		{
			badges: [
				{ text: "Outline", variant: "outline" },
				{ text: "Ghost", variant: "ghost" },
				{ text: "Info", variant: "info" },
			],
			label: t("typography.badgeVariants.style"),
		},
	];

	return (
		<Section id="alerts" title="Alerts & Badges" badge="Atoms">
			<div className="grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("typography.alertVariants.title")}
					description={t("typography.alertVariants.description")}
				>
					<div className="space-y-2.5">
						{ALERT_CONFIG.map(({ variant, text }) => (
							<Alert key={variant} variant={variant}>
								{text}
							</Alert>
						))}
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("typography.dismissibleAlerts.title")}
					description={t("typography.dismissibleAlerts.description")}
				>
					<div className="space-y-2.5">
						{ALERT_CONFIG.filter(
							({ variant }) => !dismissedAlerts.includes(variant),
						).length === 0 ? (
							<div className="flex flex-col items-center gap-2 rounded-xl bg-base-200/50 py-6">
								<CheckCircle2 size={20} className="text-success opacity-60" />
								<p className="text-xs opacity-50">
									{t("typography.dismissibleAlerts.allDismissed")}
								</p>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setDismissedAlerts([])}
								>
									{t("typography.dismissibleAlerts.reset")}
								</Button>
							</div>
						) : (
							ALERT_CONFIG.filter(
								({ variant }) => !dismissedAlerts.includes(variant),
							).map(({ variant, title, text }) => (
								<Alert
									key={variant}
									variant={variant}
									title={title}
									dismissible
									onDismiss={() => setDismissedAlerts((p) => [...p, variant])}
								>
									{text}
								</Alert>
							))
						)}
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("typography.badgeVariants.title")}
					description={t("typography.badgeVariants.description")}
				>
					<div className="space-y-3">
						{BADGE_GROUPS.map(({ label, badges }) => (
							<div key={label} className="space-y-1.5">
								<div className="flex items-center gap-1.5">
									<Tag size={10} className="opacity-30" />
									<span className="font-semibold text-[9px] tracking-wider opacity-40">
										{label.toUpperCase()}
									</span>
								</div>
								<div className="flex flex-wrap gap-1.5">
									{badges.map(({ variant, text }) => (
										<Badge key={text} variant={variant} dot>
											{text}
										</Badge>
									))}
								</div>
							</div>
						))}
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("typography.badgeSizes.title")}
					description={t("typography.badgeSizes.description")}
				>
					<div className="space-y-4">
						<div className="space-y-1.5">
							<div className="flex items-center gap-1.5">
								<Zap size={10} className="opacity-30" />
								<span className="font-semibold text-[9px] tracking-wider opacity-40">
									{t("typography.badgeSizes.sizes")}
								</span>
							</div>
							<div className="flex flex-wrap items-center gap-2">
								<Badge variant="primary" size="xs">
									XS
								</Badge>
								<Badge variant="primary" size="sm">
									Small
								</Badge>
								<Badge variant="primary" size="md">
									Medium
								</Badge>
								<Badge variant="primary" size="lg">
									Large
								</Badge>
							</div>
						</div>
						<div className="space-y-1.5">
							<div className="flex items-center gap-1.5">
								<Crown size={10} className="opacity-30" />
								<span className="font-semibold text-[9px] tracking-wider opacity-40">
									{t("typography.badgeSizes.pillStyle")}
								</span>
							</div>
							<div className="flex flex-wrap gap-1.5">
								<Badge variant="success" pill dot>
									Online
								</Badge>
								<Badge variant="warning" pill dot>
									Away
								</Badge>
								<Badge variant="error" pill dot>
									Busy
								</Badge>
								<Badge variant="ghost" pill>
									Draft
								</Badge>
							</div>
						</div>
						<div className="space-y-1.5">
							<div className="flex items-center gap-1.5">
								<Sparkles size={10} className="opacity-30" />
								<span className="font-semibold text-[9px] tracking-wider opacity-40">
									{t("typography.badgeSizes.useCases")}
								</span>
							</div>
							<div className="flex flex-wrap gap-1.5">
								<Badge variant="info" size="sm">
									<Bell size={10} /> 3 New
								</Badge>
								<Badge variant="accent" size="sm">
									<Palette size={10} /> Design
								</Badge>
								<Badge variant="secondary" size="sm">
									v2.1.0
								</Badge>
							</div>
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("typography.glowBadges.title")}
					description={t("typography.glowBadges.description")}
				>
					<div className="space-y-4">
						<div className="space-y-1.5">
							<div className="flex items-center gap-1.5">
								<Flame size={10} className="opacity-30" />
								<span className="font-semibold text-[9px] tracking-wider opacity-40">
									{t("typography.badgeSizes.glowEffect")}
								</span>
							</div>
							<div className="flex flex-wrap gap-2">
								<Badge variant="primary" glow>
									Primary
								</Badge>
								<Badge variant="secondary" glow>
									Secondary
								</Badge>
								<Badge variant="accent" glow>
									Accent
								</Badge>
								<Badge variant="info" glow>
									Info
								</Badge>
								<Badge variant="success" glow>
									Success
								</Badge>
								<Badge variant="warning" glow>
									Warning
								</Badge>
								<Badge variant="error" glow>
									Error
								</Badge>
							</div>
						</div>
						<div className="space-y-1.5">
							<div className="flex items-center gap-1.5">
								<Sparkles size={10} className="opacity-30" />
								<span className="font-semibold text-[9px] tracking-wider opacity-40">
									{t("typography.badgeSizes.glowPillDot")}
								</span>
							</div>
							<div className="flex flex-wrap gap-2">
								<Badge variant="success" glow pill dot>
									Live
								</Badge>
								<Badge variant="error" glow pill dot>
									Critical
								</Badge>
								<Badge variant="info" glow pill dot size="lg">
									Featured
								</Badge>
							</div>
						</div>
					</div>
				</ShowcaseCard>
			</div>
		</Section>
	);
}
