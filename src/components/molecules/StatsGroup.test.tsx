import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatsGroup from "./StatsGroup";

const mockItems = [
	{ description: "+21% this month", title: "Users", value: "1,200" },
	{ title: "Revenue", value: "$8,400" },
];

describe("StatsGroup", () => {
	it("renders all stat items", () => {
		render(<StatsGroup items={mockItems} />);
		expect(screen.getByText("Users")).toBeInTheDocument();
		expect(screen.getByText("1,200")).toBeInTheDocument();
		expect(screen.getByText("Revenue")).toBeInTheDocument();
		expect(screen.getByText("$8,400")).toBeInTheDocument();
	});

	it("renders description when provided", () => {
		render(<StatsGroup items={mockItems} />);
		expect(screen.getByText("+21% this month")).toBeInTheDocument();
	});

	it("does not render description when not provided", () => {
		render(<StatsGroup items={[{ title: "A", value: "1" }]} />);
		const descs = document.querySelectorAll(".stat-desc");
		expect(descs).toHaveLength(0);
	});

	it("applies custom className", () => {
		const { container } = render(
			<StatsGroup items={mockItems} className="w-full" />,
		);
		expect(container.firstChild).toHaveClass("w-full");
	});
});
