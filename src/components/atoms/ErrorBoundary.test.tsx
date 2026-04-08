import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

function ThrowError(): React.ReactNode {
	throw new Error("Test error");
}

describe("ErrorBoundary", () => {
	it("renders children when no error", () => {
		render(
			<ErrorBoundary>
				<p>Hello</p>
			</ErrorBoundary>,
		);
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("renders fallback on error", () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		render(
			<ErrorBoundary fallback={<p>Fallback UI</p>}>
				<ThrowError />
			</ErrorBoundary>,
		);
		expect(screen.getByText("Fallback UI")).toBeInTheDocument();
		vi.restoreAllMocks();
	});

	it("renders default error UI when no fallback", () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		render(
			<ErrorBoundary>
				<ThrowError />
			</ErrorBoundary>,
		);
		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
		expect(screen.getByText("Refresh Page")).toBeInTheDocument();
		vi.restoreAllMocks();
	});
});
