import { type EnvConfig, validateEnv } from "../config/env.schema";
import { ENV } from "../constants/env";
import { isTruthyBoolean } from "./boolean.helper";

export const isProd = (mode: string) => mode === ENV.PRODUCTION;
export const isDev = (mode: string) => mode === ENV.DEVELOPMENT;

export const parseEnv = (
	raw: Record<string, string>,
	{ skipValidation = false } = {},
): EnvConfig => {
	const {
		VITE_SENTRY_ORG = "",
		VITE_SENTRY_PROJECT = "",
		VITE_SENTRY_AUTH_TOKEN = "",
		VITE_SENTRY_TELEMETRY = "",
		VITE_SENTRY_IS_USE = "",
		VITE_SENTRY_DSN = "",
		VITE_API_TIMEOUT = "30000",
		NODE_ENV = ENV.DEVELOPMENT,
		BASE_URL = "/",
	} = raw;

	const VITE_API_BASE_URL = raw.VITE_API_BASE_URL || undefined;

	const parsedEnv = {
		BASE_URL,
		DEV: isDev(NODE_ENV),
		MODE: NODE_ENV,
		PROD: isProd(NODE_ENV),
		SSR: false,
		VITE_API_BASE_URL,
		VITE_API_TIMEOUT,
		VITE_SENTRY_AUTH_TOKEN,
		VITE_SENTRY_DSN,
		VITE_SENTRY_IS_USE: isTruthyBoolean(VITE_SENTRY_IS_USE),
		VITE_SENTRY_ORG,
		VITE_SENTRY_PROJECT,
		VITE_SENTRY_TELEMETRY: isTruthyBoolean(VITE_SENTRY_TELEMETRY),
	};

	if (skipValidation) {
		return {
			...parsedEnv,
			VITE_API_TIMEOUT: Number.parseInt(VITE_API_TIMEOUT, 10),
		} as EnvConfig;
	}

	const validatedEnv = validateEnv(parsedEnv);

	return validatedEnv;
};
