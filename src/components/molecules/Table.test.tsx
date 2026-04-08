import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("gsap", () => ({
	__esModule: true,
	default: {
		fromTo: vi.fn(),
		to: vi.fn(),
	},
}));

vi.mock("./Pagination", () => ({
	__esModule: true,
	default: ({
		currentPage,
		totalPages,
		onPageChange,
	}: {
		currentPage: number;
		totalPages: number;
		onPageChange: (p: number) => void;
	}) => (
		<div data-testid="pagination">
			<span data-testid="pagination-info">
				{currentPage}/{totalPages}
			</span>
			<button type="button" onClick={() => onPageChange(currentPage + 1)}>
				Next
			</button>
		</div>
	),
}));

import Table from "./Table";

interface TestRow {
	id: number;
	name: string;
	email: string;
	role: string;
}

const columns = [
	{ header: "Name", key: "name" },
	{ header: "Email", key: "email" },
	{ header: "Role", key: "role" },
];

const data: TestRow[] = [
	{ email: "alice@test.com", id: 1, name: "Alice", role: "Admin" },
	{ email: "bob@test.com", id: 2, name: "Bob", role: "User" },
	{ email: "charlie@test.com", id: 3, name: "Charlie", role: "Editor" },
];

describe("Table", () => {
	it("renders column headers", () => {
		render(<Table columns={columns} data={data} />);
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Email")).toBeInTheDocument();
		expect(screen.getByText("Role")).toBeInTheDocument();
	});

	it("renders all data rows", () => {
		render(<Table columns={columns} data={data} />);
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("bob@test.com")).toBeInTheDocument();
		expect(screen.getByText("Editor")).toBeInTheDocument();
	});

	it("shows empty message when no data", () => {
		render(<Table columns={columns} data={[]} />);
		expect(screen.getByText("No data available")).toBeInTheDocument();
	});

	it("shows custom empty message", () => {
		render(<Table columns={columns} data={[]} emptyMessage="Nothing here" />);
		expect(screen.getByText("Nothing here")).toBeInTheDocument();
	});

	it("applies zebra variant class", () => {
		const { container } = render(
			<Table columns={columns} data={data} variant="zebra" />,
		);
		const table = container.querySelector("table");
		expect(table?.className).toContain("ds-table-zebra");
	});

	it("applies compact variant class", () => {
		const { container } = render(
			<Table columns={columns} data={data} variant="compact" />,
		);
		const table = container.querySelector("table");
		expect(table?.className).toContain("ds-table-compact");
	});

	it("applies hover class by default", () => {
		const { container } = render(<Table columns={columns} data={data} />);
		const rows = container.querySelectorAll(".ds-table-row");
		expect(rows[0]?.className).toContain("ds-table-row-hover");
	});

	it("disables hover class when hoverable is false", () => {
		const { container } = render(
			<Table columns={columns} data={data} hoverable={false} />,
		);
		const rows = container.querySelectorAll(".ds-table-row");
		expect(rows[0]?.className).not.toContain("ds-table-row-hover");
	});

	it("calls onRowClick when a row is clicked", () => {
		const handleClick = vi.fn();
		render(<Table columns={columns} data={data} onRowClick={handleClick} />);
		fireEvent.click(screen.getByText("Alice"));
		expect(handleClick).toHaveBeenCalledWith(data[0], 0);
	});

	it("applies sticky header wrapper class", () => {
		const { container } = render(
			<Table columns={columns} data={data} stickyHeader />,
		);
		const wrapper = container.querySelector(".ds-table-wrapper");
		expect(wrapper?.className).toContain("ds-table-sticky");
	});

	it("supports custom render function", () => {
		const customColumns = [
			...columns,
			{
				header: "Actions",
				key: "actions",
				render: (_row: TestRow) => <button type="button">Edit</button>,
			},
		];
		render(<Table columns={customColumns} data={data} />);
		const buttons = screen.getAllByText("Edit");
		expect(buttons).toHaveLength(3);
	});

	it("supports custom rowKey", () => {
		const { container } = render(
			<Table
				columns={columns}
				data={data}
				rowKey={(row) => `custom-${row.id}`}
			/>,
		);
		const rows = container.querySelectorAll(".ds-table-row");
		expect(rows).toHaveLength(3);
	});

	it("triggers GSAP entrance animation on mount", async () => {
		const gsap = await import("gsap");
		render(<Table columns={columns} data={data} />);
		expect(gsap.default.fromTo).toHaveBeenCalled();
	});

	it("renders skeleton rows when loading", () => {
		const { container } = render(<Table columns={columns} data={[]} loading />);
		const skeletons = container.querySelectorAll(".ds-table-skeleton");
		expect(skeletons).toHaveLength(15);
	});

	it("does not render data rows when loading", () => {
		render(<Table columns={columns} data={data} loading />);
		expect(screen.queryByText("Alice")).not.toBeInTheDocument();
	});

	it("renders premium empty state with icon and description", () => {
		const { container } = render(
			<Table
				columns={columns}
				data={[]}
				emptyMessage="Nothing here"
				emptyDescription="Try again later."
			/>,
		);
		expect(screen.getByText("Nothing here")).toBeInTheDocument();
		expect(screen.getByText("Try again later.")).toBeInTheDocument();
		expect(
			container.querySelector(".ds-table-empty-inner"),
		).toBeInTheDocument();
		expect(container.querySelector(".ds-table-empty-icon")).toBeInTheDocument();
	});

	it("renders custom empty icon", () => {
		render(
			<Table
				columns={columns}
				data={[]}
				emptyIcon={<span data-testid="custom-icon">!</span>}
			/>,
		);
		expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
	});

	it("renders pagination when pageSize is set with enough data", () => {
		const handlePage = vi.fn();
		render(
			<Table
				columns={columns}
				data={data}
				pageSize={2}
				currentPage={1}
				onPageChange={handlePage}
			/>,
		);
		expect(screen.getByTestId("pagination")).toBeInTheDocument();
		expect(screen.getByText(/Showing 1–2 of 3/)).toBeInTheDocument();
	});

	it("does not render pagination when data fits in one page", () => {
		render(
			<Table
				columns={columns}
				data={data}
				pageSize={10}
				currentPage={1}
				onPageChange={() => {}}
			/>,
		);
		expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
	});

	it("paginates data correctly", () => {
		render(
			<Table
				columns={columns}
				data={data}
				pageSize={2}
				currentPage={1}
				onPageChange={() => {}}
			/>,
		);
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
		expect(screen.queryByText("Charlie")).not.toBeInTheDocument();
	});

	it("calls onPageChange when pagination is clicked", () => {
		const handlePage = vi.fn();
		render(
			<Table
				columns={columns}
				data={data}
				pageSize={2}
				currentPage={1}
				onPageChange={handlePage}
			/>,
		);
		fireEvent.click(screen.getByText("Next"));
		expect(handlePage).toHaveBeenCalledWith(2);
	});

	it("renders page size selector when pageSizeOptions provided", () => {
		const handleSizeChange = vi.fn();
		render(
			<Table
				columns={columns}
				data={data}
				pageSize={2}
				pageSizeOptions={[2, 5, 10]}
				currentPage={1}
				onPageChange={() => {}}
				onPageSizeChange={handleSizeChange}
			/>,
		);
		const btn = screen.getByText("2 / page");
		expect(btn).toBeInTheDocument();
	});

	it("shows page size options when button is clicked", () => {
		const handleSizeChange = vi.fn();
		render(
			<Table
				columns={columns}
				data={data}
				pageSize={2}
				pageSizeOptions={[2, 5, 10]}
				currentPage={1}
				onPageChange={() => {}}
				onPageSizeChange={handleSizeChange}
			/>,
		);
		fireEvent.click(screen.getByText("2 / page"));
		expect(screen.getByText("5 / page")).toBeInTheDocument();
		expect(screen.getByText("10 / page")).toBeInTheDocument();
	});

	it("calls onPageSizeChange when an option is selected", () => {
		const handleSizeChange = vi.fn();
		render(
			<Table
				columns={columns}
				data={data}
				pageSize={2}
				pageSizeOptions={[2, 5, 10]}
				currentPage={1}
				onPageChange={() => {}}
				onPageSizeChange={handleSizeChange}
			/>,
		);
		fireEvent.click(screen.getByText("2 / page"));
		fireEvent.click(screen.getByText("5 / page"));
		expect(handleSizeChange).toHaveBeenCalledWith(5);
	});

	it("shows footer with pageSizeOptions even when data fits one page", () => {
		render(
			<Table
				columns={columns}
				data={data}
				pageSize={10}
				pageSizeOptions={[5, 10, 20]}
				currentPage={1}
				onPageChange={() => {}}
				onPageSizeChange={() => {}}
			/>,
		);
		expect(screen.getByText("10 / page")).toBeInTheDocument();
		expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
	});
});
