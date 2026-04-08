import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./Button";

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(
			screen.getByRole("button", { name: "Click me" }),
		).toBeInTheDocument();
	});

	it("applies primary variant by default", () => {
		render(<Button>Primary</Button>);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("btn-primary");
	});

	it("applies custom variant and size", () => {
		render(
			<Button variant="accent" size="lg">
				Accent Large
			</Button>,
		);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("btn-accent");
		expect(btn.className).toContain("btn-lg");
	});

	it("merges custom className", () => {
		render(<Button className="custom-class">Custom</Button>);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("custom-class");
	});

	it("applies error variant", () => {
		render(<Button variant="error">Delete</Button>);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("btn-error");
	});

	it("disables button when loading", () => {
		render(<Button loading>Saving</Button>);
		const btn = screen.getByRole("button");
		expect(btn).toBeDisabled();
	});

	it("shows loading spinner", () => {
		const { container } = render(<Button loading>Saving</Button>);
		expect(container.querySelector(".loading-spinner")).toBeInTheDocument();
	});
});
