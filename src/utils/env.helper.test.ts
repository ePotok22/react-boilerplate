import { describe, expect, it } from "vitest";
import { isDev, isProd, parseEnv } from "./env.helper";

describe("env.helper", () => {
	describe("isProd", () => {
		it("returns true for production", () => {
			expect(isProd("production")).toBe(true);
		});

		it("returns false for development", () => {
			expect(isProd("development")).toBe(false);
		});
	});

	describe("isDev", () => {
		it("returns true for development", () => {
			expect(isDev("development")).toBe(true);
		});

		it("returns false for production", () => {
			expect(isDev("production")).toBe(false);
		});
	});

	describe("parseEnv", () => {
		it("returns env config with skipValidation", () => {
			const raw = {
				BASE_URL: "/",
				NODE_ENV: "development",
				VITE_API_TIMEOUT: "5000",
			};
			const env = parseEnv(raw, { skipValidation: true });
			expect(env.DEV).toBe(true);
			expect(env.PROD).toBe(false);
			expect(env.VITE_API_TIMEOUT).toBe(5000);
		});

		it("defaults VITE_API_TIMEOUT to 30000", () => {
			const env = parseEnv({}, { skipValidation: true });
			expect(env.VITE_API_TIMEOUT).toBe(30000);
		});

		it("parses VITE_SENTRY_IS_USE as boolean", () => {
			const env = parseEnv(
				{ VITE_SENTRY_IS_USE: "true" },
				{ skipValidation: true },
			);
			expect(env.VITE_SENTRY_IS_USE).toBe(true);
		});

		it("defaults to development when NODE_ENV is missing", () => {
			const env = parseEnv({}, { skipValidation: true });
			expect(env.DEV).toBe(true);
			expect(env.MODE).toBe("development");
		});
	});
});
