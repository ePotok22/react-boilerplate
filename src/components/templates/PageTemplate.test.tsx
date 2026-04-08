import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageTemplate from "./PageTemplate";

describe("PageTemplate", () => {
	it("renders children", () => {
		render(
			<PageTemplate>
				<p>Page content</p>
			</PageTemplate>,
		);
		expect(screen.getByText("Page content")).toBeInTheDocument();
	});

	it("renders as main element with max-width", () => {
		const { container } = render(
			<PageTemplate>
				<p>Content</p>
			</PageTemplate>,
		);
		const main = container.querySelector("main");
		expect(main).toBeTruthy();
		expect(main).toHaveClass("max-w-6xl");
	});
});
