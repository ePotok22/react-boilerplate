import {
	BarChart3,
	Bell,
	ChevronRight,
	Globe,
	Inbox,
	LayoutDashboard,
	PackageOpen,
	Palette,
	Rocket,
	Settings,
	Shield,
	UserRound,
	Users,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Accordion,
	Avatar,
	Button,
	Divider,
	Drawer,
	EmptyState,
	Kbd,
	RadioGroup,
	Tabs,
	Tag,
	Tooltip,
} from "@/components/atoms";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";

export default function AtomsShowcase() {
	const { t } = useTranslation("showcase");
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [radioValue, setRadioValue] = useState("option1");
	const [tags, setTags] = useState(["React", "TypeScript", "Tailwind", "GSAP"]);

	return (
		<Section
			id="atoms"
			title={t("atoms.sectionTitle")}
			badge={t("atoms.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("atoms.avatar.title")}
					description={t("atoms.avatar.description")}
				>
					<div className="flex flex-wrap items-end gap-3">
						<Avatar src="https://i.pravatar.cc/80?img=1" alt="User" size="xs" />
						<Avatar
							src="https://i.pravatar.cc/80?img=2"
							alt="User"
							size="sm"
							status="online"
						/>
						<Avatar fallback="JD" status="online" />
						<Avatar fallback="AK" size="lg" status="busy" />
						<Avatar fallback="MR" size="xl" status="away" />
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("atoms.tooltip.title")}
					description={t("atoms.tooltip.description")}
				>
					<div className="flex flex-wrap gap-3">
						<Tooltip content={t("atoms.tooltip.topTooltip")} placement="top">
							<Button variant="outline" size="sm">
								Top
							</Button>
						</Tooltip>
						<Tooltip
							content={t("atoms.tooltip.bottomTooltip")}
							placement="bottom"
						>
							<Button variant="outline" size="sm">
								Bottom
							</Button>
						</Tooltip>
						<Tooltip content={t("atoms.tooltip.leftTooltip")} placement="left">
							<Button variant="outline" size="sm">
								Left
							</Button>
						</Tooltip>
						<Tooltip
							content={t("atoms.tooltip.rightTooltip")}
							placement="right"
						>
							<Button variant="outline" size="sm">
								Right
							</Button>
						</Tooltip>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("atoms.radioGroup.title")}
					description={t("atoms.radioGroup.description")}
				>
					<div className="space-y-4">
						<RadioGroup
							label={t("atoms.radioGroup.selectOption")}
							name="demo-radio"
							options={[
								{ label: t("atoms.radioGroup.optionA"), value: "option1" },
								{ label: t("atoms.radioGroup.optionB"), value: "option2" },
								{ label: t("atoms.radioGroup.optionC"), value: "option3" },
							]}
							value={radioValue}
							onChange={(e) => setRadioValue(e.target.value)}
						/>
						<RadioGroup
							label={t("atoms.radioGroup.horizontalLayout")}
							name="demo-radio-h"
							horizontal
							options={[
								{ label: t("atoms.radioGroup.small"), value: "sm" },
								{ label: t("atoms.radioGroup.medium"), value: "md" },
								{ label: t("atoms.radioGroup.large"), value: "lg" },
							]}
							value="md"
							onChange={() => {}}
						/>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("atoms.tag.title")}
					description={t("atoms.tag.description")}
				>
					<div className="space-y-3">
						<div className="flex flex-wrap gap-2">
							<Tag variant="primary">Primary</Tag>
							<Tag variant="secondary">Secondary</Tag>
							<Tag variant="accent">Accent</Tag>
							<Tag variant="success">Success</Tag>
							<Tag variant="warning">Warning</Tag>
							<Tag variant="error">Error</Tag>
						</div>
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => (
								<Tag
									key={tag}
									variant="primary"
									onRemove={() =>
										setTags((prev) => prev.filter((t) => t !== tag))
									}
								>
									{tag}
								</Tag>
							))}
							{tags.length === 0 && (
								<Button
									variant="ghost"
									size="sm"
									onClick={() =>
										setTags(["React", "TypeScript", "Tailwind", "GSAP"])
									}
								>
									{t("atoms.tag.resetTags")}
								</Button>
							)}
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("atoms.divider.title")}
					description={t("atoms.divider.description")}
				>
					<div className="space-y-4">
						<Divider />
						<Divider label={t("atoms.divider.or")} />
						<div className="flex h-8 items-center gap-4">
							<span className="text-sm">{t("atoms.divider.left")}</span>
							<Divider orientation="vertical" />
							<span className="text-sm">{t("atoms.divider.right")}</span>
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("atoms.kbd.title")}
					description={t("atoms.kbd.description")}
				>
					<div className="space-y-3">
						<div className="flex items-center gap-1">
							<Kbd>⌘</Kbd> <Kbd>K</Kbd>
							<span className="ml-2 text-sm opacity-60">
								{t("atoms.kbd.commandPalette")}
							</span>
						</div>
						<div className="flex items-center gap-1">
							<Kbd>Ctrl</Kbd> <Kbd>Shift</Kbd> <Kbd>P</Kbd>
							<span className="ml-2 text-sm opacity-60">
								{t("atoms.kbd.quickActions")}
							</span>
						</div>
						<div className="flex items-center gap-1">
							<Kbd>Esc</Kbd>
							<span className="ml-2 text-sm opacity-60">
								{t("atoms.kbd.close")}
							</span>
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("atoms.tabs.title")}
					description={t("atoms.tabs.description")}
				>
					<div className="space-y-8">
						<div>
							<p className="mb-2 font-medium text-xs uppercase tracking-wider opacity-40">
								{t("atoms.tabs.lineLabel")}
							</p>
							<Tabs
								variant="line"
								items={[
									{
										content: (
											<div className="space-y-2">
												<p className="text-base-content/70 text-sm">
													{t("atoms.tabs.overviewContent")}
												</p>
												<div className="flex gap-2">
													<span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-success text-xs">
														<Zap size={10} /> {t("atoms.tabs.overviewUptime")}
													</span>
													<span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-primary text-xs">
														<BarChart3 size={10} />{" "}
														{t("atoms.tabs.overviewRequests")}
													</span>
												</div>
											</div>
										),
										icon: <LayoutDashboard size={14} />,
										label: "Overview",
									},
									{
										badge: 3,
										content: (
											<p className="text-base-content/70 text-sm">
												{t("atoms.tabs.analyticsContent")}
											</p>
										),
										icon: <BarChart3 size={14} />,
										label: "Analytics",
									},
									{
										content: (
											<p className="text-base-content/70 text-sm">
												{t("atoms.tabs.settingsContent")}
											</p>
										),
										icon: <Settings size={14} />,
										label: "Settings",
									},
									{
										content: (
											<p className="text-base-content/70 text-sm">
												{t("atoms.tabs.archivedContent")}
											</p>
										),
										disabled: true,
										label: "Archived",
									},
								]}
							/>
						</div>
						<div>
							<p className="mb-2 font-medium text-xs uppercase tracking-wider opacity-40">
								{t("atoms.tabs.boxedLabel")}
							</p>
							<Tabs
								variant="boxed"
								items={[
									{
										badge: 12,
										content: (
											<p className="text-base-content/70 text-sm">
												{t("atoms.tabs.inboxContent")}
											</p>
										),
										icon: <Bell size={14} />,
										label: "Inbox",
									},
									{
										content: (
											<p className="text-base-content/70 text-sm">
												{t("atoms.tabs.teamContent")}
											</p>
										),
										icon: <Users size={14} />,
										label: "Team",
									},
									{
										content: (
											<p className="text-base-content/70 text-sm">
												{t("atoms.tabs.permissionsContent")}
											</p>
										),
										icon: <Shield size={14} />,
										label: "Security",
									},
								]}
							/>
						</div>
						<div>
							<p className="mb-2 font-medium text-xs uppercase tracking-wider opacity-40">
								{t("atoms.tabs.pillLabel")}
							</p>
							<Tabs
								variant="pill"
								items={[
									{
										content: (
											<p className="text-base-content/70 text-sm">
												{t("atoms.tabs.performanceContent")}
											</p>
										),
										icon: <Rocket size={14} />,
										label: "Performance",
									},
									{
										content: (
											<p className="text-base-content/70 text-sm">
												{t("atoms.tabs.themeContent")}
											</p>
										),
										icon: <Palette size={14} />,
										label: "Appearance",
									},
									{
										content: (
											<p className="text-base-content/70 text-sm">
												{t("atoms.tabs.cdnContent")}
											</p>
										),
										icon: <Globe size={14} />,
										label: "Regions",
									},
								]}
							/>
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("atoms.accordion.title")}
					description={t("atoms.accordion.description")}
				>
					<Accordion
						items={[
							{
								content: t("atoms.accordion.whatAnimationsAnswer"),
								title: t("atoms.accordion.whatAnimationsQuestion"),
							},
							{
								content: t("atoms.accordion.darkModeAnswer"),
								title: t("atoms.accordion.darkModeQuestion"),
							},
							{
								content: t("atoms.accordion.disabledContent"),
								disabled: true,
								title: t("atoms.accordion.disabledTitle"),
							},
						]}
					/>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("atoms.emptyState.title")}
					description={t("atoms.emptyState.description")}
				>
					<EmptyState
						icon={<Inbox size={48} />}
						title={t("atoms.emptyState.noItems")}
						description={t("atoms.emptyState.noItemsDesc")}
						action={
							<Button variant="primary" size="sm">
								{t("atoms.emptyState.createItem")}
							</Button>
						}
					/>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("atoms.drawer.title")}
					description={t("atoms.drawer.description")}
				>
					<Button
						variant="primary"
						size="sm"
						onClick={() => setDrawerOpen(true)}
					>
						{t("atoms.drawer.openDrawer")}
					</Button>
					<Drawer
						open={drawerOpen}
						onClose={() => setDrawerOpen(false)}
						title={t("atoms.drawer.settings")}
					>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<Settings size={18} className="opacity-50" />
								<span className="text-sm">{t("atoms.drawer.preferences")}</span>
								<ChevronRight size={14} className="ml-auto opacity-30" />
							</div>
							<div className="flex items-center gap-3">
								<UserRound size={18} className="opacity-50" />
								<span className="text-sm">{t("atoms.drawer.account")}</span>
								<ChevronRight size={14} className="ml-auto opacity-30" />
							</div>
							<div className="flex items-center gap-3">
								<PackageOpen size={18} className="opacity-50" />
								<span className="text-sm">{t("atoms.drawer.storage")}</span>
								<ChevronRight size={14} className="ml-auto opacity-30" />
							</div>
						</div>
					</Drawer>
				</ShowcaseCard>
			</div>
		</Section>
	);
}
