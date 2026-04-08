import * as v from "valibot";

export const envSchema = v.object({
	BASE_URL: v.pipe(
		v.string(),
		v.minLength(1, "BASE_URL is required"),
		v.check(
			(val) =>
				val.startsWith("/") ||
				val.startsWith("http://") ||
				val.startsWith("https://"),
			"BASE_URL must be a relative path (starting with /) or a full URL",
		),
	),
	DEV: v.boolean(),
	MODE: v.pipe(v.string(), v.minLength(1)),
	PROD: v.boolean(),
	SSR: v.boolean(),

	VITE_API_BASE_URL: v.optional(
		v.pipe(
			v.string(),
			v.minLength(1),
			v.url("VITE_API_BASE_URL must be a valid URL"),
			v.transform((val) => val.replace(/\/$/, "")),
		),
	),
	VITE_API_TIMEOUT: v.optional(
		v.pipe(
			v.string(),
			v.transform((val) => Number.parseInt(val, 10)),
			v.number(),
			v.minValue(1000, "API timeout must be at least 1000ms"),
			v.maxValue(60000, "API timeout must not exceed 60000ms"),
		),
		"30000",
	),
	VITE_SENTRY_AUTH_TOKEN: v.pipe(
		v.string(),
		v.transform((val) => val.trim()),
	),
	VITE_SENTRY_DSN: v.pipe(
		v.string(),
		v.transform((val) => val.trim()),
	),

	VITE_SENTRY_IS_USE: v.boolean(),
	VITE_SENTRY_ORG: v.pipe(
		v.string(),
		v.transform((val) => val.trim()),
	),
	VITE_SENTRY_PROJECT: v.pipe(
		v.string(),
		v.transform((val) => val.trim()),
	),
	VITE_SENTRY_TELEMETRY: v.boolean(),
});

export const productionEnvSchema = v.pipe(
	envSchema,
	v.check((data) => {
		if (data.PROD && data.VITE_SENTRY_IS_USE) {
			const hasValidSentry =
				data.VITE_SENTRY_DSN.length > 0 &&
				data.VITE_SENTRY_ORG.length > 0 &&
				data.VITE_SENTRY_PROJECT.length > 0;

			if (!hasValidSentry) {
				return false;
			}
		}
		return true;
	}, "Sentry configuration is required when VITE_SENTRY_IS_USE is enabled in production"),
);

export type EnvConfig = v.InferOutput<typeof envSchema>;

export function validateEnv(env: Record<string, unknown>): EnvConfig {
	try {
		const schema = env.PROD ? productionEnvSchema : envSchema;
		return v.parse(schema, env);
	} catch (error) {
		if (error instanceof v.ValiError) {
			const errorMessages = error.issues
				.map((issue) => {
					// biome-ignore lint: error path type is dynamic
					const path = issue.path?.map((p: any) => p.key).join(".") || "root";
					return `  - ${path}: ${issue.message}`;
				})
				.join("\n");

			throw new Error(
				`Environment validation failed:\n${errorMessages}\n\nPlease check your .env file and ensure all required variables are set correctly.`,
			);
		}
		throw error;
	}
}
