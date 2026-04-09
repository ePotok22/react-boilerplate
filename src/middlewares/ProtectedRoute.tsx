import { Navigate, Outlet, useLocation } from "@tanstack/react-router";
import { Spinner } from "@/components/atoms";
import { useAuthStore } from "@/stores/auth.store";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
	readonly roles?: UserRole[];
	readonly redirectTo?: string;
}

export default function ProtectedRoute({
	roles,
	redirectTo = "/login",
}: ProtectedRouteProps) {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const isHydrated = useAuthStore((s) => s.isHydrated);
	const userRole = useAuthStore((s) => s.user?.role);
	const location = useLocation();

	if (!isHydrated) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	if (!isAuthenticated) {
		return (
			<Navigate to={redirectTo} search={{ redirect: location.pathname }} />
		);
	}

	if (roles && roles.length > 0 && userRole && !roles.includes(userRole)) {
		return <Navigate to={"/" as string} search={{ unauthorized: "true" }} />;
	}

	return <Outlet />;
}
