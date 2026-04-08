import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Alert from "./Alert";

describe("Alert", () => {
	it("renders children", () => {
		render(<Alert>Something happened</Alert>);
		expect(screen.getByText("Something happened")).toBeInTheDocument();
	});

	it("has alert role", () => {
		render(<Alert>Message</Alert>);
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("applies variant class", () => {
		render(<Alert variant="error">Error!</Alert>);
		expect(screen.getByRole("alert").className).toContain("alert-error");
	});

	it("renders auto-icon by default", () => {
		const { container } = render(<Alert variant="success">Done</Alert>);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("hides icon when icon=false", () => {
		const { container } = render(
			<Alert variant="success" icon={false}>
				Done
			</Alert>,
		);
		expect(container.querySelector(".ds-alert-icon")).not.toBeInTheDocument();
	});

	it("renders title when provided", () => {
		render(<Alert title="Heads up">Body text</Alert>);
		expect(screen.getByText("Heads up")).toBeInTheDocument();
		expect(screen.getByText("Body text")).toBeInTheDocument();
	});

	it("renders dismiss button when dismissible", () => {
		const onDismiss = vi.fn();
		render(
			<Alert dismissible onDismiss={onDismiss}>
				Dismissible
			</Alert>,
		);
		const btn = screen.getByLabelText("Dismiss");
		expect(btn).toBeInTheDocument();
		fireEvent.click(btn);
	});
});
