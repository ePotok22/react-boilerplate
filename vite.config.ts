import { defineConfig, loadEnv, type PluginOption } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { visualizer as rollupVisualizer } from "rollup-plugin-visualizer";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { compression, defineAlgorithm } from "vite-plugin-compression2";
import { constants as zlibConstants } from "node:zlib";

import { isTruthyBoolean } from "./src/utils/boolean.helper";
import { parseEnv } from "./src/utils/env.helper";

const CHUNK_MAP: Record<string, readonly string[]> = {
  react: ["react", "react-dom", "react/"],
  gsap: ["gsap"],
  sentry: ["@sentry"],
  i18n: ["i18next", "react-i18next"],
  valibot: ["valibot"],
  zustand: ["zustand"],
  icons: ["lucide-react"],
  daisyui: ["daisyui"],
  utils: ["clsx", "tailwind-merge", "date-fns", "ky", "qs"],
};

const TANSTACK_CHUNKS: Record<string, readonly string[]> = {
  "tanstack-query": ["react-query"],
  "tanstack-router": ["react-router"],
  "tanstack-form": ["react-form", "valibot-form-adapter"],
};

const getManualChunks = (id: string): string | undefined => {
  if (!id.includes("node_modules")) return;

  for (const [chunk, patterns] of Object.entries(CHUNK_MAP)) {
    if (patterns.some((pattern) => id.includes(pattern))) {
      if (chunk === "react" && (id.includes("@tanstack") || id.includes("i18next"))) {
        continue;
      }
      return chunk;
    }
  }

  if (id.includes("@tanstack")) {
    for (const [chunk, patterns] of Object.entries(TANSTACK_CHUNKS)) {
      if (patterns.some((pattern) => id.includes(pattern))) {
        return chunk;
      }
    }
  }

  return "vendor";
};

const config = defineConfig(({ mode, command }) => {
  const raw = loadEnv(mode, process.cwd(), "");
  const isBuild = command === "build";
  const env = parseEnv(raw, { skipValidation: isBuild });
  const isProd = env.PROD;

  const plugins: PluginOption[] = [
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
    svgr(),
  ];

  if (!isProd) {
    plugins.push(
      devtools({
        injectSource: { enabled: false },
      }),
    );
  }

  if (isProd) {
    plugins.push(
      compression({
        algorithms: [
          defineAlgorithm("gzip", { level: 9 }),
          defineAlgorithm("brotliCompress", {
            params: {
              [zlibConstants.BROTLI_PARAM_QUALITY]: zlibConstants.BROTLI_MAX_QUALITY,
            },
          }),
        ],
      }),
      rollupVisualizer({
        brotliSize: true,
        filename: "dist/stats.html",
        gzipSize: true,
        open: false,
      }) as unknown as PluginOption,
    );
  }

  if (isTruthyBoolean(env.VITE_SENTRY_IS_USE) && isProd) {
    plugins.push(
      sentryVitePlugin({
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
        org: env.VITE_SENTRY_ORG,
        project: env.VITE_SENTRY_PROJECT,
        telemetry: env.VITE_SENTRY_TELEMETRY,
      }),
    );
  }

  return {
    oxc: isProd
      ? {
        target: "esnext",
      }
      : undefined,
    build: {
      target: "esnext",
      cssTarget: "esnext",
      chunkSizeWarningLimit: 1000,
      minify: isProd ? "oxc" : false,
      cssMinify: isProd ? "lightningcss" : false,
      rolldownOptions: isProd
        ? {
          checks: {
            pluginTimings: false,
          },
          output: {
            manualChunks: getManualChunks,
            chunkFileNames: "assets/js/[name]-[hash].js",
            entryFileNames: "assets/js/[name]-[hash].js",
            assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          },
        }
        : {},
      sourcemap: isProd ? "hidden" : true,
      reportCompressedSize: false,
      cssCodeSplit: true,
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins,
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@tanstack/react-router",
        "@tanstack/react-query",
        "zustand",
        "i18next",
        "react-i18next",
        "clsx",
        "tailwind-merge",
        "lucide-react",
      ],
    },

    server: {
      open: true,
      fs: {
        strict: true,
      },
      warmup: {
        clientFiles: [
          "./src/routes/index.tsx",
          "./src/routes/__root.tsx",
          "./src/components/**/*.tsx",
        ],
      },
    },
    preview: {
      port: 4173,
      open: true,
    },
  };
});

export default config;
