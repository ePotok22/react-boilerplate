import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { usePageTitle } from "./usePageTitle";

describe("usePageTitle", () => {
	beforeEach(() => {
		document.title = "Original";
	});

	it("sets document title on mount", () => {
		renderHook(() => usePageTitle("Dashboard"));
		expect(document.title).toBe("Dashboard | React Boilerplate");
	});

	it("uses custom app name", () => {
		renderHook(() => usePageTitle("Home", "My App"));
		expect(document.title).toBe("Home | My App");
	});

	it("restores previous title on unmount", () => {
		const { unmount } = renderHook(() => usePageTitle("Test"));
		expect(document.title).toBe("Test | React Boilerplate");
		unmount();
		expect(document.title).toBe("Original");
	});

	it("uses app name only when title is empty", () => {
		renderHook(() => usePageTitle(""));
		expect(document.title).toBe("React Boilerplate");
	});
});
