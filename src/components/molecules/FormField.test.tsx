import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormField from "./FormField";

describe("FormField", () => {
	it("renders label and input", () => {
		render(<FormField label="Email" />);
		expect(screen.getByLabelText("Email")).toBeInTheDocument();
	});

	it("displays error message", () => {
		render(<FormField label="Name" error="Required" />);
		expect(screen.getByText("Required")).toBeInTheDocument();
	});

	it("applies error styling to wrapper", () => {
		const { container } = render(<FormField label="Name" error="Required" />);
		const wrapper = container.querySelector("label:nth-of-type(2)");
		expect(wrapper?.className).toContain("ds-field-error");
	});

	it("passes HTML attributes to input", () => {
		render(
			<FormField label="Email" type="email" placeholder="you@example.com" />,
		);
		const input = screen.getByLabelText("Email");
		expect(input).toHaveAttribute("type", "email");
		expect(input).toHaveAttribute("placeholder", "you@example.com");
	});

	it("generates id from label when not provided", () => {
		render(<FormField label="Full Name" />);
		const input = screen.getByLabelText("Full Name");
		expect(input).toHaveAttribute("id", "field-full-name");
	});

	it("uses custom id when provided", () => {
		render(<FormField label="Name" id="custom-id" />);
		const input = screen.getByLabelText("Name");
		expect(input).toHaveAttribute("id", "custom-id");
	});

	it("renders icon when provided", () => {
		render(
			<FormField label="Search" icon={<span data-testid="icon">🔍</span>} />,
		);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("renders icon visible alongside input", () => {
		render(
			<FormField
				label="Search"
				icon={<span data-testid="vis-icon">🔍</span>}
			/>,
		);
		const icon = screen.getByTestId("vis-icon");
		const input = screen.getByLabelText("Search");
		expect(icon.closest("label")).toContainElement(input);
	});

	it("shows loading spinner when loading", () => {
		const { container } = render(<FormField label="Search" loading />);
		const spinner = container.querySelector(".loading-spinner");
		expect(spinner).toBeInTheDocument();
	});
});
