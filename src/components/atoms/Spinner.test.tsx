import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Spinner from "./Spinner";

describe("Spinner", () => {
	it("renders a spinner element", () => {
		const { container } = render(<Spinner />);
		const spinner = container.querySelector(".loading-spinner");
		expect(spinner).toBeInTheDocument();
	});

	it("applies md size by default", () => {
		const { container } = render(<Spinner />);
		const spinner = container.querySelector(".loading-spinner");
		expect(spinner?.className).toContain("loading-md");
	});

	it("applies custom size", () => {
		const { container } = render(<Spinner size="lg" />);
		const spinner = container.querySelector(".loading-spinner");
		expect(spinner?.className).toContain("loading-lg");
	});

	it("merges custom className", () => {
		const { container } = render(<Spinner className="text-primary" />);
		const spinner = container.querySelector(".loading-spinner");
		expect(spinner?.className).toContain("text-primary");
	});

	it("renders dots variant", () => {
		const { container } = render(<Spinner variant="dots" />);
		const spinner = container.querySelector(".loading-dots");
		expect(spinner).toBeInTheDocument();
	});

	it("renders ring variant", () => {
		const { container } = render(<Spinner variant="ring" />);
		const spinner = container.querySelector(".loading-ring");
		expect(spinner).toBeInTheDocument();
	});

	it("renders bars variant", () => {
		const { container } = render(<Spinner variant="bars" />);
		const spinner = container.querySelector(".loading-bars");
		expect(spinner).toBeInTheDocument();
	});
});
