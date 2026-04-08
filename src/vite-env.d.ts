/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string;
	readonly VITE_APP_TITLE: string;
	readonly VITE_SENTRY_DSN: string;
	readonly VITE_SENTRY_ORG: string;
	readonly VITE_SENTRY_PROJECT: string;
	readonly VITE_ENVIRONMENT: "development" | "staging" | "production";
	readonly MODE: string;
	readonly DEV: boolean;
	readonly PROD: boolean;
	readonly SSR: boolean;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
