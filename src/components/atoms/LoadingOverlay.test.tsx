import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("gsap", () => ({
	__esModule: true,
	default: {
		fromTo: vi.fn(),
		killTweensOf: vi.fn(),
		to: vi.fn(),
	},
}));

import LoadingOverlay from "./LoadingOverlay";

describe("LoadingOverlay", () => {
	it("renders default loading message", () => {
		render(<LoadingOverlay />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("renders custom message", () => {
		render(<LoadingOverlay message="Fetching data..." />);
		expect(screen.getByText("Fetching data...")).toBeInTheDocument();
	});

	it("contains a spinner", () => {
		const { container } = render(<LoadingOverlay />);
		expect(container.querySelector(".loading-spinner")).toBeInTheDocument();
	});

	it("renders fullscreen variant", () => {
		const { container } = render(<LoadingOverlay fullscreen />);
		const overlay = container.firstElementChild;
		expect(overlay?.className).toContain("fixed");
	});
});
