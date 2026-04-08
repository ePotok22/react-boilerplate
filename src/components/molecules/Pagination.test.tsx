import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
	it("renders nothing when totalPages is 1", () => {
		const { container } = render(
			<Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />,
		);
		expect(container.firstChild).toBeNull();
	});

	it("renders page buttons for small page count", () => {
		render(
			<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
		);
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("disables previous button on first page", () => {
		render(
			<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
		);
		expect(screen.getByLabelText("Previous page")).toBeDisabled();
	});

	it("disables next button on last page", () => {
		render(
			<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />,
		);
		expect(screen.getByLabelText("Next page")).toBeDisabled();
	});

	it("calls onPageChange when a page is clicked", () => {
		const onPageChange = vi.fn();
		render(
			<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />,
		);
		fireEvent.click(screen.getByText("3"));
		expect(onPageChange).toHaveBeenCalledWith(3);
	});

	it("calls onPageChange with next page on next click", () => {
		const onPageChange = vi.fn();
		render(
			<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />,
		);
		fireEvent.click(screen.getByLabelText("Next page"));
		expect(onPageChange).toHaveBeenCalledWith(3);
	});

	it("shows ellipsis for large page counts", () => {
		const { container } = render(
			<Pagination currentPage={10} totalPages={20} onPageChange={() => {}} />,
		);
		const dots = container.querySelectorAll(".ds-page-dots");
		expect(dots.length).toBeGreaterThanOrEqual(1);
	});

	it("marks active page with aria-current", () => {
		render(
			<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />,
		);
		const activeBtn = screen.getByText("3").closest("button");
		expect(activeBtn).toHaveAttribute("aria-current", "page");
	});

	it("applies size class", () => {
		const { container } = render(
			<Pagination
				currentPage={1}
				totalPages={5}
				onPageChange={() => {}}
				size="sm"
			/>,
		);
		const nav = container.querySelector("nav");
		expect(nav).toBeInTheDocument();
	});

	it("renders first and last page buttons", () => {
		render(
			<Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />,
		);
		expect(screen.getByLabelText("First page")).toBeInTheDocument();
		expect(screen.getByLabelText("Last page")).toBeInTheDocument();
	});

	it("disables first page button on first page", () => {
		render(
			<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
		);
		expect(screen.getByLabelText("First page")).toBeDisabled();
	});

	it("disables last page button on last page", () => {
		render(
			<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />,
		);
		expect(screen.getByLabelText("Last page")).toBeDisabled();
	});

	it("calls onPageChange with 1 on first page click", () => {
		const onPageChange = vi.fn();
		render(
			<Pagination
				currentPage={5}
				totalPages={10}
				onPageChange={onPageChange}
			/>,
		);
		fireEvent.click(screen.getByLabelText("First page"));
		expect(onPageChange).toHaveBeenCalledWith(1);
	});

	it("calls onPageChange with totalPages on last page click", () => {
		const onPageChange = vi.fn();
		render(
			<Pagination
				currentPage={5}
				totalPages={10}
				onPageChange={onPageChange}
			/>,
		);
		fireEvent.click(screen.getByLabelText("Last page"));
		expect(onPageChange).toHaveBeenCalledWith(10);
	});

	it("renders page info when showInfo is true", () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={10}
				onPageChange={() => {}}
				showInfo
			/>,
		);
		expect(screen.getByText("3")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
	});
});
