import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import Spinner from "@/components/atoms/Spinner";
import { HeroShowcase } from "@/components/organisms/showcase";
import { PageTemplate } from "@/components/templates";

const GsapShowcase = lazy(
	() => import("@/components/organisms/showcase/GsapShowcase"),
);
const ToastShowcase = lazy(
	() => import("@/components/organisms/showcase/ToastShowcase"),
);
const DatePickerShowcase = lazy(
	() => import("@/components/organisms/showcase/DatePickerShowcase"),
);
const LoadingShowcase = lazy(
	() => import("@/components/organisms/showcase/LoadingShowcase"),
);
const ModalShowcase = lazy(
	() => import("@/components/organisms/showcase/ModalShowcase"),
);
const PaginationShowcase = lazy(
	() => import("@/components/organisms/showcase/PaginationShowcase"),
);
const TableShowcase = lazy(
	() => import("@/components/organisms/showcase/TableShowcase"),
);
const FormShowcase = lazy(
	() => import("@/components/organisms/showcase/FormShowcase"),
);
const TypographyShowcase = lazy(
	() => import("@/components/organisms/showcase/TypographyShowcase"),
);
const AtomsShowcase = lazy(
	() => import("@/components/organisms/showcase/AtomsShowcase"),
);
const LayoutShowcase = lazy(
	() => import("@/components/organisms/showcase/LayoutShowcase"),
);
const HooksShowcase = lazy(
	() => import("@/components/organisms/showcase/HooksShowcase"),
);
const AuthShowcase = lazy(
	() => import("@/components/organisms/showcase/AuthErrorShowcase"),
);
const ErrorShowcase = lazy(() =>
	import("@/components/organisms/showcase/AuthErrorShowcase").then((m) => ({
		default: m.ErrorShowcase,
	})),
);
const TypesShowcase = lazy(() =>
	import("@/components/organisms/showcase/AuthErrorShowcase").then((m) => ({
		default: m.TypesShowcase,
	})),
);

export const Route = createFileRoute("/")({ component: HomePage });

const ShowcaseFallback = () => (
	<div className="flex items-center justify-center py-12">
		<Spinner size="lg" />
	</div>
);

function HomePage() {
	return (
		<PageTemplate>
			<HeroShowcase />
			<div className="space-y-14">
				<Suspense fallback={<ShowcaseFallback />}>
					<GsapShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<ToastShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<DatePickerShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<LoadingShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<ModalShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<PaginationShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<TableShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<FormShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<TypographyShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<AuthShowcase />
					<ErrorShowcase />
					<TypesShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<LayoutShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<HooksShowcase />
				</Suspense>
				<Suspense fallback={<ShowcaseFallback />}>
					<AtomsShowcase />
				</Suspense>
			</div>
		</PageTemplate>
	);
}
