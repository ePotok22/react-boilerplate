import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Badge from "./Badge";

describe("Badge", () => {
	it("renders children", () => {
		render(<Badge>New</Badge>);
		expect(screen.getByText("New")).toBeInTheDocument();
	});

	it("applies primary variant by default", () => {
		render(<Badge>Tag</Badge>);
		expect(screen.getByText("Tag").className).toContain("badge-primary");
	});

	it("applies custom variant", () => {
		render(<Badge variant="success">Done</Badge>);
		expect(screen.getByText("Done").className).toContain("badge-success");
	});

	it("applies size class", () => {
		render(<Badge size="lg">Big</Badge>);
		expect(screen.getByText("Big").className).toContain("badge-lg");
	});

	it("renders dot indicator", () => {
		const { container } = render(<Badge dot>Status</Badge>);
		expect(container.querySelector(".ds-badge-dot")).toBeInTheDocument();
	});

	it("applies pill style", () => {
		render(<Badge pill>Pill</Badge>);
		expect(screen.getByText("Pill").className).toContain("rounded-full");
	});

	it("applies glow shadow", () => {
		render(
			<Badge glow variant="primary">
				Glow
			</Badge>,
		);
		expect(screen.getByText("Glow").className).toContain("shadow-md");
	});
});
