import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Skeleton from "./Skeleton";

describe("Skeleton", () => {
	it("renders a skeleton element", () => {
		const { container } = render(<Skeleton />);
		const skeleton = container.querySelector(".skeleton");
		expect(skeleton).toBeInTheDocument();
	});

	it("merges custom className", () => {
		const { container } = render(<Skeleton className="h-10 w-10" />);
		const skeleton = container.querySelector(".skeleton");
		expect(skeleton?.className).toContain("h-10");
		expect(skeleton?.className).toContain("w-10");
	});

	it("renders circle variant", () => {
		const { container } = render(<Skeleton variant="circle" />);
		const skeleton = container.querySelector(".skeleton");
		expect(skeleton?.className).toContain("rounded-full");
	});

	it("renders avatar variant", () => {
		const { container } = render(<Skeleton variant="avatar" />);
		const skeleton = container.querySelector(".skeleton");
		expect(skeleton?.className).toContain("rounded-full");
	});

	it("renders card variant", () => {
		const { container } = render(<Skeleton variant="card" />);
		const skeleton = container.querySelector(".skeleton");
		expect(skeleton?.className).toContain("rounded-xl");
	});

	it("renders multiple lines", () => {
		const { container } = render(<Skeleton lines={3} />);
		const skeletons = container.querySelectorAll(".skeleton");
		expect(skeletons).toHaveLength(3);
	});
});
