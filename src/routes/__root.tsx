import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { preconnect } from "react-dom";
import { useTranslation } from "react-i18next";

import "@/i18n";
import ErrorBoundary from "@/atoms/ErrorBoundary";
import SkipToContent from "@/atoms/SkipToContent";
import ToastContainer from "@/atoms/ToastContainer";
import { APP_CONFIG } from "@/config/app.config";
import { queryClient } from "@/config/query-client";
import Footer from "@/organisms/Footer";
import Header from "@/organisms/Header";
import appCss from "@/styles.css?url";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
if (apiBaseUrl) {
	preconnect(apiBaseUrl);
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRoute({
	head: () => ({
		links: [
			{
				href: appCss,
				rel: "stylesheet",
			},
		],
		meta: [
			{
				charSet: "utf-8",
			},
			{
				content: "width=device-width, initial-scale=1",
				name: "viewport",
			},
			{
				title: APP_CONFIG.title,
			},
			{
				content: APP_CONFIG.description,
				name: "description",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
	const { i18n } = useTranslation();

	return (
		<html lang={i18n.language}>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: hardcoded theme init script to prevent FOUC */}
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="wrap-anywhere font-sans antialiased selection:bg-[rgba(79,184,178,0.24)]">
				<QueryClientProvider client={queryClient}>
					<ErrorBoundary>
						<SkipToContent />
						<Header />
						{children}
						<Footer />
						<ToastContainer />
					</ErrorBoundary>
					<ReactQueryDevtools buttonPosition="bottom-left" />
				</QueryClientProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
