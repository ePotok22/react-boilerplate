import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkipToContent from "./SkipToContent";

describe("SkipToContent", () => {
	it("renders a skip link targeting main-content", () => {
		const { container } = render(<SkipToContent />);
		const link = container.querySelector("a");
		expect(link).toBeTruthy();
		expect(link?.getAttribute("href")).toBe("#main-content");
		expect(link?.textContent).toBe("Skip to content");
		expect(link?.className).toContain("sr-only");
	});
});
