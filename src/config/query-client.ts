import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		mutations: {
			retry: false,
		},
		queries: {
			gcTime: 10 * 60 * 1000, // 10 minutes
			refetchOnWindowFocus: false,
			retry: 1,
			staleTime: 5 * 60 * 1000, // 5 minutes
		},
	},
});
