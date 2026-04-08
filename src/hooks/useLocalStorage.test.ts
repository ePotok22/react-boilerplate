import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("returns initial value when nothing is stored", () => {
		const { result } = renderHook(() => useLocalStorage("key", "default"));
		expect(result.current[0]).toBe("default");
	});

	it("persists value to localStorage", () => {
		const { result } = renderHook(() => useLocalStorage("name", ""));
		act(() => result.current[1]("Alice"));
		expect(result.current[0]).toBe("Alice");
		expect(localStorage.getItem("name")).toBe('"Alice"');
	});

	it("reads existing value from localStorage", () => {
		localStorage.setItem("count", "42");
		const { result } = renderHook(() => useLocalStorage("count", 0));
		expect(result.current[0]).toBe(42);
	});

	it("supports updater function", () => {
		const { result } = renderHook(() => useLocalStorage("count", 10));
		act(() => result.current[1]((prev) => prev + 5));
		expect(result.current[0]).toBe(15);
	});
});
