import { defineConfig } from "vitest/config";

export default defineConfig(() => {
	return {
		resolve: {
			tsconfigPaths: true,
		},
		cacheDir: "node_modules/.vite",
		test: {
			globals: true,
			environment: "happy-dom",
			include: ["src/**/*.{test,spec}.{ts,tsx}"],
			setupFiles: ["./src/test/setup.ts"],
			css: false,
			pool: "forks",
			onConsoleLog: () => false,
			fileParallelism: true,
			clearMocks: true,
			restoreMocks: true,
			mockReset: true,
			passWithNoTests: true,
			testTimeout: 10_000,
			hookTimeout: 10_000,
			reporters: ["default"],
			deps: {
				optimizer: {
					web: { enabled: true, include: ["happy-dom"] },
				},
			},
			coverage: {
				provider: "v8" as const,
				reportsDirectory: "coverage",
				reporter: ["text", "text-summary", "html", "lcov"],
				include: ["src/**/*.{ts,tsx}"],
				exclude: [
					"**/*.d.ts",
					"**/*.spec.*",
					"**/*.test.*",
					"src/vite-env.d.ts",
					"src/routeTree.gen.ts",
					"src/test/**",
					"src/routes/**",
					"src/**/index.ts",
					"src/types/**",
					"src/enums/**",
					"src/constants/**",
					"src/i18n/**",
				],
			},
		},
	};
});
