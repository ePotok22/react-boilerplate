import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("gsap", () => ({
	__esModule: true,
	default: {
		to: vi.fn(),
	},
}));

import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
	it("renders progress bar", () => {
		const { container } = render(<ProgressBar value={50} />);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("shows label when showLabel is true", () => {
		render(<ProgressBar value={50} showLabel />);
		expect(screen.getByText("50%")).toBeInTheDocument();
	});

	it("clamps value to max", () => {
		render(<ProgressBar value={150} showLabel />);
		expect(screen.getByText("100%")).toBeInTheDocument();
	});

	it("renders with different sizes", () => {
		const { container: c1 } = render(<ProgressBar value={50} size="xs" />);
		const { container: c2 } = render(<ProgressBar value={50} size="lg" />);
		expect(c1.querySelector(".h-1")).toBeInTheDocument();
		expect(c2.querySelector(".h-4")).toBeInTheDocument();
	});

	it("renders without animation", () => {
		const { container } = render(<ProgressBar value={75} animated={false} />);
		const bar = container.querySelector(".rounded-full.bg-primary");
		expect(bar).toBeInTheDocument();
	});
});
