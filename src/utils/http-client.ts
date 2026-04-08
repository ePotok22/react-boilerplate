import ky, { type KyInstance, type Options } from "ky";
import { APPLICATION_JSON } from "@/constants/http";
import { useAuthStore } from "@/stores/auth.store";

let refreshPromise: Promise<boolean> | null = null;

export function createHttpClient(
	baseUrl?: string,
	timeout = 30000,
): KyInstance {
	if (baseUrl) {
		try {
			new URL(baseUrl);
		} catch {
			throw new Error(`Invalid API base URL: ${baseUrl}`);
		}
	}

	const defaultOptions: Options = {
		...(baseUrl && { prefixUrl: baseUrl }),
		credentials: "same-origin",
		headers: {
			Accept: APPLICATION_JSON,
			"Content-Type": APPLICATION_JSON,
		},
		hooks: {
			afterResponse: [
				async ({ request, response }) => {
					if (response.status !== 401) {
						return;
					}

					const url = new URL(request.url);
					if (url.pathname.includes("/auth/refresh")) {
						return;
					}
					if (url.pathname.includes("/auth/login")) {
						return;
					}

					if (!refreshPromise) {
						refreshPromise = useAuthStore
							.getState()
							.refreshTokens()
							.finally(() => {
								refreshPromise = null;
							});
					}

					const success = await refreshPromise;
					if (!success) {
						return;
					}

					const { tokens } = useAuthStore.getState();
					if (tokens?.accessToken) {
						request.headers.set(
							"Authorization",
							`Bearer ${tokens.accessToken}`,
						);
					}
					return ky(request);
				},
			],
			beforeError: [
				({ error }) => {
					if ("response" in error) {
						const { response } = error as { response: Response };
						error.message = `HTTP Error ${response.status}: ${response.statusText}`;
					}
					return error;
				},
			],
			beforeRequest: [
				async ({ request }) => {
					const { tokens } = useAuthStore.getState();
					if (tokens?.accessToken) {
						request.headers.set(
							"Authorization",
							`Bearer ${tokens.accessToken}`,
						);
					}

					if (request.method === "GET") {
						const url = new URL(request.url);
						if (!url.searchParams.has("_t")) {
							url.searchParams.set("_t", Date.now().toString());
							return new Request(url.toString(), request);
						}
					}
				},
			],
		},
		redirect: "follow",
		referrerPolicy: "strict-origin-when-cross-origin",
		retry: {
			backoffLimit: 3000,
			limit: 3,
			methods: ["get", "head", "options", "put", "delete"],
			statusCodes: [408, 413, 429, 500, 502, 503, 504],
		},
		timeout,
	};

	return ky.create(defaultOptions);
}

export const httpClient = createHttpClient(
	import.meta.env.VITE_API_BASE_URL,
	Number.parseInt(import.meta.env.VITE_API_TIMEOUT || "30000", 10),
);

export function sanitizeUrlParam(param: string): string {
	return param
		.replace(/<script[^>]*>.*?<\/script>/gi, "") // Remove script tags
		.replace(/[<>]/g, "") // Remove angle brackets
		.trim();
}

export function isUrlSafe(url: string, allowedDomains: string[] = []): boolean {
	try {
		const parsedUrl = new URL(url);

		if (!["http:", "https:"].includes(parsedUrl.protocol)) {
			return false;
		}

		if (allowedDomains.length > 0) {
			const isAllowed = allowedDomains.some((domain) =>
				parsedUrl.hostname.endsWith(domain),
			);

			if (!isAllowed) {
				return false;
			}
		}

		return true;
	} catch {
		return false;
	}
}
