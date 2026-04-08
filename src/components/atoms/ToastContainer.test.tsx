import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("gsap", () => ({
	__esModule: true,
	default: {
		fromTo: vi.fn(),
		killTweensOf: vi.fn(),
		set: vi.fn(),
		to: vi.fn(),
	},
}));

vi.mock("@/stores/toast.store", () => ({
	useToastStore: vi.fn((selector) => {
		const store = {
			dismissToast: vi.fn(),
			removeToast: vi.fn(),
			toasts: [
				{
					duration: 4000,
					id: "1",
					message: "Hello",
					variant: "success" as const,
				},
				{
					duration: 4000,
					id: "2",
					message: "Error!",
					variant: "error" as const,
				},
			],
		};
		return selector(store);
	}),
}));

import ToastContainer from "./ToastContainer";

describe("ToastContainer", () => {
	it("renders all toasts", () => {
		render(<ToastContainer />);
		expect(screen.getByText("Hello")).toBeInTheDocument();
		expect(screen.getByText("Error!")).toBeInTheDocument();
	});

	it("renders dismiss buttons for each toast", () => {
		render(<ToastContainer />);
		const buttons = screen.getAllByLabelText("Dismiss toast");
		expect(buttons).toHaveLength(2);
	});

	it("applies correct variant class", () => {
		const { container } = render(<ToastContainer />);
		const items = container.querySelectorAll(".ds-toast-item");
		expect(items[0]?.className).toContain("ds-toast-success");
		expect(items[1]?.className).toContain("ds-toast-error");
	});

	it("renders variant icons", () => {
		const { container } = render(<ToastContainer />);
		const icons = container.querySelectorAll(".ds-toast-icon");
		expect(icons).toHaveLength(2);
	});

	it("renders progress bars", () => {
		const { container } = render(<ToastContainer />);
		const bars = container.querySelectorAll(".ds-toast-progress");
		expect(bars).toHaveLength(2);
	});

	it("renders shine sweep elements", () => {
		const { container } = render(<ToastContainer />);
		const shines = container.querySelectorAll(".ds-toast-shine");
		expect(shines).toHaveLength(2);
	});
});
