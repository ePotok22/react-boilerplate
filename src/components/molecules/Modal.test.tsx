import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Modal from "./Modal";

describe("Modal", () => {
	it("renders title when provided", () => {
		render(
			<Modal open title="Test Modal" onClose={() => {}}>
				<p>Content</p>
			</Modal>,
		);
		expect(screen.getByText("Test Modal")).toBeInTheDocument();
	});

	it("renders children", () => {
		render(
			<Modal open onClose={() => {}}>
				<p>Modal body</p>
			</Modal>,
		);
		expect(screen.getByText("Modal body")).toBeInTheDocument();
	});

	it("calls onClose when close button is clicked", () => {
		const onClose = vi.fn();
		render(
			<Modal open title="Title" onClose={onClose}>
				<p>Content</p>
			</Modal>,
		);
		const closeButtons = screen.getAllByRole("button");
		const firstButton = closeButtons[0];
		if (firstButton) {
			fireEvent.click(firstButton);
		}
		expect(onClose).toHaveBeenCalledOnce();
	});

	it("applies size class", () => {
		const { container } = render(
			<Modal open title="Small" size="sm" onClose={() => {}}>
				<p>Content</p>
			</Modal>,
		);
		expect(container.querySelector(".ds-modal-sm")).toBeInTheDocument();
	});
});
