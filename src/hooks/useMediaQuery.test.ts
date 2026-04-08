import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
	it("returns a boolean", () => {
		const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
		expect(typeof result.current).toBe("boolean");
	});

	it("defaults to false for wide queries in test env", () => {
		const { result } = renderHook(() => useMediaQuery("(min-width: 99999px)"));
		expect(result.current).toBe(false);
	});
});
