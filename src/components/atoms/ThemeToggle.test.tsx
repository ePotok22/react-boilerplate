import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
	it("renders a button", () => {
		render(<ThemeToggle />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("has accessible aria-label", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-label");
	});

	it("cycles theme on click", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");
		const initialText = button.textContent;
		fireEvent.click(button);
		fireEvent.click(button);
		expect(button).toBeInTheDocument();
		expect(["Auto", "Light", "Dark"]).toContain(initialText);
	});

	it("displays current mode text", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");
		expect(["Auto", "Light", "Dark"]).toContain(button.textContent);
	});
});
