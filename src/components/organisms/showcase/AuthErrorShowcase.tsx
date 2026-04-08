import {
	AlertOctagon,
	ArrowRightLeft,
	Bug,
	Code2,
	ExternalLink,
	FileCode2,
	Globe,
	KeyRound,
	Lock,
	LogIn,
	LogOut,
	RefreshCw,
	RotateCw,
	Shield,
	ShieldCheck,
	User,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button } from "@/components/atoms";
import Section from "@/components/organisms/showcase/Section";
import ShowcaseCard from "@/components/organisms/showcase/ShowcaseCard";
import { useAuthStore } from "@/stores/auth.store";
import type { UserRole } from "@/types/auth";

const MOCK_USERS: Record<
	string,
	{ name: string; email: string; role: UserRole }
> = {
	admin: { email: "alice@demo.com", name: "Alice Admin", role: "admin" },
	mod: { email: "carol@demo.com", name: "Carol Mod", role: "moderator" },
	user: { email: "bob@demo.com", name: "Bob User", role: "user" },
};

function AuthDemoCard() {
	const { t } = useTranslation("showcase");
	const { isAuthenticated, user, tokens, isLoading, error } = useAuthStore();
	const setAuth = useAuthStore((s) => s.setAuth);
	const logout = useAuthStore((s) => s.logout);
	const clearError = useAuthStore((s) => s.clearError);
	const [selectedRole, setSelectedRole] = useState<string>("user");

	const handleLogin = () => {
		const mock = MOCK_USERS[selectedRole] ?? MOCK_USERS.user;
		if (!mock) {
			return;
		}
		setAuth(
			{
				createdAt: new Date().toISOString(),
				email: mock.email,
				emailVerified: true,
				id: crypto.randomUUID(),
				name: mock.name,
				role: mock.role,
			},
			{
				accessToken: `demo_access_${Date.now()}`,
				expiresIn: 3600,
				refreshToken: `demo_refresh_${Date.now()}`,
			},
		);
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<ShowcaseCard
			title={t("auth.demo.title")}
			description={t("auth.demo.description")}
		>
			<div className="space-y-3">
				{error && (
					<Alert variant="error">
						{error}
						<button
							type="button"
							className="ml-2 underline"
							onClick={clearError}
						>
							{t("auth.demo.dismiss")}
						</button>
					</Alert>
				)}

				{!isAuthenticated ? (
					<div className="space-y-3">
						<div className="flex gap-1.5">
							{Object.entries(MOCK_USERS).map(([key, val]) => (
								<button
									key={key}
									type="button"
									onClick={() => setSelectedRole(key)}
									className={`flex-1 rounded-lg border px-2 py-1.5 font-medium text-[11px] transition ${
										selectedRole === key
											? "border-primary bg-primary/10 text-primary"
											: "border-base-300 opacity-60 hover:opacity-80"
									}`}
								>
									{val.role}
								</button>
							))}
						</div>
						<Button
							variant="primary"
							className="w-full gap-2"
							onClick={handleLogin}
							disabled={isLoading}
						>
							<LogIn size={14} />
							{isLoading ? t("auth.demo.signingIn") : t("auth.demo.signIn")}
						</Button>
					</div>
				) : (
					<div className="space-y-3">
						<div className="flex items-center gap-3 rounded-xl bg-base-200/60 p-3">
							<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15">
								<User size={16} className="text-primary" />
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate font-semibold text-sm">{user?.name}</p>
								<p className="truncate text-xs opacity-50">{user?.email}</p>
							</div>
							<span className="rounded-full bg-success/15 px-2 py-0.5 font-semibold text-[10px] text-success">
								{user?.role}
							</span>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="w-full gap-2"
							onClick={handleLogout}
						>
							<LogOut size={14} />
							{t("auth.demo.logOut")}
						</Button>
					</div>
				)}

				<details className="group">
					<summary className="cursor-pointer font-medium text-xs opacity-60 group-open:opacity-80">
						{t("auth.demo.storeState")}
					</summary>
					<pre className="mt-1 max-h-36 overflow-auto rounded-lg bg-base-200 p-2 text-[10px] leading-relaxed">
						{JSON.stringify(
							{
								hasTokens: !!tokens,
								isAuthenticated,
								user: user ? { name: user.name, role: user.role } : null,
							},
							null,
							2,
						)}
					</pre>
				</details>
			</div>
		</ShowcaseCard>
	);
}

function ProtectedRouteCard() {
	const { t } = useTranslation("showcase");
	return (
		<ShowcaseCard
			title={t("auth.protectedRoutes.title")}
			description={t("auth.protectedRoutes.description")}
		>
			<div className="space-y-2">
				<div className="flex items-start gap-2 rounded-lg bg-base-200/60 p-2.5">
					<Shield size={14} className="mt-0.5 shrink-0 text-primary" />
					<div className="text-xs">
						<p className="font-semibold">
							{t("auth.protectedRoutes.roleBasedAccess")}
						</p>
						<p className="mt-0.5 opacity-60">
							Pass <code>roles={`["admin"]`}</code> to restrict by role.
						</p>
					</div>
				</div>
				<div className="flex items-start gap-2 rounded-lg bg-base-200/60 p-2.5">
					<KeyRound size={14} className="mt-0.5 shrink-0 text-warning" />
					<div className="text-xs">
						<p className="font-semibold">
							{t("auth.protectedRoutes.redirectBack")}
						</p>
						<p className="mt-0.5 opacity-60">
							Saves <code>?redirect=/path</code> for post-login navigation.
						</p>
					</div>
				</div>
				<div className="mockup-code text-[10px]">
					<pre data-prefix="1">
						<code>{'<ProtectedRoute roles={["admin"]}>'}</code>
					</pre>
					<pre data-prefix="2">
						<code>{"  <Route path='settings' ... />"}</code>
					</pre>
					<pre data-prefix="3">
						<code>{"</ProtectedRoute>"}</code>
					</pre>
				</div>
			</div>
		</ShowcaseCard>
	);
}

function AuthServiceCard() {
	const { t } = useTranslation("showcase");
	const endpoints = [
		{ fn: "login(credentials)", group: "auth", icon: LogIn, method: "POST" },
		{ fn: "register(credentials)", group: "auth", icon: User, method: "POST" },
		{ fn: "logout()", group: "auth", icon: LogOut, method: "POST" },
		{
			fn: "refreshToken(token)",
			group: "auth",
			icon: RefreshCw,
			method: "POST",
		},
		{ fn: "getProfile()", group: "profile", icon: User, method: "GET" },
		{
			fn: "updateProfile(data)",
			group: "profile",
			icon: User,
			method: "PATCH",
		},
		{
			fn: "changePassword(payload)",
			group: "password",
			icon: Lock,
			method: "POST",
		},
		{
			fn: "forgotPassword(payload)",
			group: "password",
			icon: KeyRound,
			method: "POST",
		},
		{
			fn: "resetPassword(payload)",
			group: "password",
			icon: KeyRound,
			method: "POST",
		},
		{
			fn: "verifyEmail(token)",
			group: "verify",
			icon: ShieldCheck,
			method: "POST",
		},
	];

	const methodStyles: Record<string, string> = {
		GET: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
		PATCH: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
		POST: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
	};

	return (
		<ShowcaseCard
			title={t("auth.service.title")}
			description={t("auth.service.description")}
		>
			<div className="space-y-0.5">
				{endpoints.map(({ fn, method, icon: Icon }) => (
					<div
						key={fn}
						className="group/row flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-base-200/80"
					>
						<Icon
							size={11}
							className="shrink-0 opacity-30 transition-opacity group-hover/row:opacity-60"
						/>
						<span
							className={`shrink-0 rounded px-1.5 py-0.5 font-bold font-mono text-[7px] leading-none ${methodStyles[method] ?? ""}`}
						>
							{method}
						</span>
						<code className="truncate text-[10px] opacity-70 transition-opacity group-hover/row:opacity-100">
							{fn}
						</code>
					</div>
				))}
			</div>
		</ShowcaseCard>
	);
}

function HttpClientCard() {
	const { t } = useTranslation("showcase");
	const features = [
		{
			color: "text-amber-500",
			desc: t("auth.httpClient.autoBearerDesc"),
			icon: Zap,
			title: t("auth.httpClient.autoBearerTitle"),
		},
		{
			color: "text-sky-500",
			desc: t("auth.httpClient.silentRefreshDesc"),
			icon: RefreshCw,
			title: t("auth.httpClient.silentRefreshTitle"),
		},
		{
			color: "text-emerald-500",
			desc: t("auth.httpClient.deduplicationDesc"),
			icon: ArrowRightLeft,
			title: t("auth.httpClient.deduplicationTitle"),
		},
		{
			color: "text-rose-400",
			desc: t("auth.httpClient.autoLogoutDesc"),
			icon: Globe,
			title: t("auth.httpClient.autoLogoutTitle"),
		},
	];

	return (
		<ShowcaseCard
			title={t("auth.httpClient.title")}
			description={t("auth.httpClient.description")}
		>
			<div className="space-y-2">
				{features.map(({ icon: Icon, title, desc, color }) => (
					<div
						key={title}
						className="flex items-start gap-2.5 rounded-lg bg-base-200/50 p-2.5 transition-colors hover:bg-base-200/80"
					>
						<div
							className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-base-100 shadow-sm ${color}`}
						>
							<Icon size={12} />
						</div>
						<div className="min-w-0">
							<p className="font-semibold text-[11px] leading-tight">{title}</p>
							<p className="mt-0.5 text-[10px] leading-snug opacity-50">
								{desc}
							</p>
						</div>
					</div>
				))}

				<div className="flex items-center justify-center gap-1 rounded-lg border border-base-300/50 border-dashed px-3 py-2">
					{["Request", "401?", "Refresh", "Retry"].map((step, i) => (
						<div key={step} className="flex items-center gap-1">
							<span
								className={`rounded px-1.5 py-0.5 font-mono text-[8px] ${
									i === 1
										? "bg-warning/15 font-bold text-warning"
										: "bg-base-200 opacity-70"
								}`}
							>
								{step}
							</span>
							{i < 3 && <span className="text-[10px] opacity-30">→</span>}
						</div>
					))}
				</div>
			</div>
		</ShowcaseCard>
	);
}

export default function AuthShowcase() {
	const { t } = useTranslation("showcase");
	return (
		<Section id="auth" title={t("auth.sectionTitle")} badge={t("auth.badge")}>
			<div className="grid gap-4 sm:grid-cols-2">
				<AuthDemoCard />
				<ProtectedRouteCard />
				<AuthServiceCard />
				<HttpClientCard />
			</div>
		</Section>
	);
}

export function ErrorShowcase() {
	const { t } = useTranslation("showcase");
	return (
		<Section
			id="errors"
			title={t("errors.sectionTitle")}
			badge={t("errors.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<ShowcaseCard
					title={t("errors.boundary.title")}
					description={t("errors.boundary.description")}
				>
					<div className="space-y-2.5">
						<div className="flex items-start gap-2.5 rounded-xl border border-error/15 bg-error/5 p-3">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-error/15">
								<Bug size={13} className="text-error" />
							</div>
							<div>
								<p className="font-semibold text-xs">
									{t("errors.boundary.crashGuard")}
								</p>
								<p className="mt-0.5 text-[10px] opacity-50">
									Wraps the entire app in{" "}
									<code className="font-mono">__root.tsx</code>. Falls back to a
									friendly error screen with reload button.
								</p>
							</div>
						</div>
						<div className="mockup-code text-[10px]">
							<pre data-prefix="1">
								<code>{"<ErrorBoundary"}</code>
							</pre>
							<pre data-prefix="2">
								<code>{"  fallback={<ErrorPage />}"}</code>
							</pre>
							<pre data-prefix="3">
								<code>{">"}</code>
							</pre>
						</div>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("errors.notFound.title")}
					description={t("errors.notFound.description")}
				>
					<div className="space-y-3">
						<div className="flex flex-col items-center gap-2 rounded-xl bg-base-200/40 py-4">
							<span className="font-bold text-3xl tabular-nums opacity-20">
								404
							</span>
							<span className="text-[10px] opacity-40">
								{t("errors.notFound.pageNotFound")}
							</span>
						</div>
						<a
							href="/this-page-does-not-exist"
							className="btn btn-sm btn-outline w-full gap-2"
						>
							<ExternalLink size={12} />
							{t("errors.notFound.goToUnknown")}
						</a>
					</div>
				</ShowcaseCard>

				<ShowcaseCard
					title={t("errors.routeError.title")}
					description={t("errors.routeError.description")}
				>
					<div className="space-y-2.5">
						<div className="flex items-start gap-2.5 rounded-xl border border-warning/15 bg-warning/5 p-3">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-warning/15">
								<AlertOctagon size={13} className="text-warning" />
							</div>
							<div>
								<p className="font-semibold text-xs">
									{t("errors.routeError.routeLevelError")}
								</p>
								<p className="mt-0.5 text-[10px] opacity-50">
									TanStack Router shows an inline error UI when a route loader
									or component throws.
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2 rounded-lg bg-base-200/50 px-2.5 py-2 transition-colors hover:bg-base-200">
							<RotateCw size={11} className="text-primary opacity-60" />
							<span className="text-[10px] opacity-60">
								{t("errors.routeError.tryAgain")}
							</span>
						</div>
					</div>
				</ShowcaseCard>
			</div>
		</Section>
	);
}

export function TypesShowcase() {
	const { t } = useTranslation("showcase");
	return (
		<Section
			id="types"
			title={t("types.sectionTitle")}
			badge={t("types.badge")}
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<ShowcaseCard
					title={t("types.authTypes.title")}
					description={t("types.authTypes.description")}
				>
					<div className="space-y-2.5">
						<div className="flex items-center gap-2 rounded-lg bg-base-200/40 px-2.5 py-1.5">
							<FileCode2 size={11} className="text-primary opacity-50" />
							<span className="font-semibold text-[10px] tracking-wider opacity-40">
								AUTH.TS
							</span>
						</div>
						<div className="mockup-code text-xs">
							<pre data-prefix="">
								<code>{"interface User {"}</code>
							</pre>
							<pre data-prefix="">
								<code>{"  id: string; email: string;"}</code>
							</pre>
							<pre data-prefix="">
								<code>{"  name: string; role: UserRole;"}</code>
							</pre>
							<pre data-prefix="">
								<code>{"  emailVerified: boolean;"}</code>
							</pre>
							<pre data-prefix="">
								<code>{"}"}</code>
							</pre>
						</div>
						<div className="flex flex-wrap gap-1">
							{["User", "AuthTokens", "LoginCredentials", "UserRole"].map(
								(type) => (
									<span
										key={type}
										className="rounded-md bg-primary/8 px-1.5 py-0.5 font-mono text-[9px] text-primary"
									>
										{type}
									</span>
								),
							)}
						</div>
					</div>
				</ShowcaseCard>
				<ShowcaseCard
					title={t("types.apiTypes.title")}
					description={t("types.apiTypes.description")}
				>
					<div className="space-y-2.5">
						<div className="flex items-center gap-2 rounded-lg bg-base-200/40 px-2.5 py-1.5">
							<Code2 size={11} className="text-secondary opacity-50" />
							<span className="font-semibold text-[10px] tracking-wider opacity-40">
								API.TS
							</span>
						</div>
						<div className="mockup-code text-xs">
							<pre data-prefix="">
								<code>{"interface PaginatedResponse<T> {"}</code>
							</pre>
							<pre data-prefix="">
								<code>{"  data: T[];"}</code>
							</pre>
							<pre data-prefix="">
								<code>{"  meta: { page, limit,"}</code>
							</pre>
							<pre data-prefix="">
								<code>{"    total, totalPages }"}</code>
							</pre>
							<pre data-prefix="">
								<code>{"}"}</code>
							</pre>
						</div>
						<div className="flex flex-wrap gap-1">
							{["PaginatedResponse", "ApiError", "ApiResponse"].map((type) => (
								<span
									key={type}
									className="rounded-md bg-secondary/8 px-1.5 py-0.5 font-mono text-[9px] text-secondary"
								>
									{type}
								</span>
							))}
						</div>
					</div>
				</ShowcaseCard>
			</div>
		</Section>
	);
}
