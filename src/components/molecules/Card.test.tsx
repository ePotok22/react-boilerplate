import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "./Card";

describe("Card", () => {
	it("renders title and description", () => {
		render(<Card title="Test Card" description="A test description" />);
		expect(screen.getByText("Test Card")).toBeInTheDocument();
		expect(screen.getByText("A test description")).toBeInTheDocument();
	});

	it("renders badge when provided", () => {
		render(<Card title="Title" description="Desc" badge="New" />);
		expect(screen.getByText("New")).toBeInTheDocument();
	});

	it("renders children", () => {
		render(
			<Card title="Title" description="Desc">
				<span>Child content</span>
			</Card>,
		);
		expect(screen.getByText("Child content")).toBeInTheDocument();
	});

	it("renders actions", () => {
		render(
			<Card
				title="Title"
				description="Desc"
				actions={<button type="button">Action</button>}
			/>,
		);
		expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
	});

	it("renders image when imageUrl is provided", () => {
		render(<Card title="Title" description="Desc" imageUrl="/test.jpg" />);
		const img = screen.getByAltText("Title");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", "/test.jpg");
	});

	it("merges custom className", () => {
		const { container } = render(
			<Card title="T" description="D" className="custom-card" />,
		);
		expect(container.firstChild).toHaveClass("custom-card");
	});

	it("applies variant class", () => {
		const { container } = render(
			<Card title="T" description="D" variant="bordered" />,
		);
		expect(container.firstChild).toHaveClass("ds-card-bordered");
	});

	it("applies glass variant", () => {
		const { container } = render(
			<Card title="T" description="D" variant="glass" />,
		);
		expect(container.firstChild).toHaveClass("ds-card-glass");
	});
});
