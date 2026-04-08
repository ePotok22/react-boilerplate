import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
	it("returns initial value immediately", () => {
		const { result } = renderHook(() => useDebounce("hello", 300));
		expect(result.current).toBe("hello");
	});

	it("debounces value updates", () => {
		vi.useFakeTimers();
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{ initialProps: { value: "a" } },
		);

		rerender({ value: "ab" });
		expect(result.current).toBe("a");

		act(() => vi.advanceTimersByTime(300));
		expect(result.current).toBe("ab");

		vi.useRealTimers();
	});

	it("resets timer on rapid changes", () => {
		vi.useFakeTimers();
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 500),
			{ initialProps: { value: "x" } },
		);

		rerender({ value: "xy" });
		act(() => vi.advanceTimersByTime(200));
		rerender({ value: "xyz" });
		act(() => vi.advanceTimersByTime(200));

		expect(result.current).toBe("x");

		act(() => vi.advanceTimersByTime(300));
		expect(result.current).toBe("xyz");

		vi.useRealTimers();
	});
});
