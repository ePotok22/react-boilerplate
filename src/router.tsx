import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import Spinner from "@/atoms/Spinner";
import { NotFoundPage } from "@/components/pages";
import ErrorPage from "@/components/pages/ErrorPage";

function DefaultPendingComponent() {
	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<Spinner size="lg" />
		</div>
	);
}

export function getRouter() {
	const router = createTanStackRouter({
		defaultErrorComponent: ErrorPage,
		defaultNotFoundComponent: NotFoundPage,
		defaultPendingComponent: DefaultPendingComponent,
		defaultPendingMinMs: 300,
		defaultPendingMs: 200,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultStructuralSharing: true,
		routeTree,
		scrollRestoration: true,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
