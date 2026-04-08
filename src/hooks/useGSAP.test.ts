import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("gsap", () => {
	const context = vi.fn((fn: () => void) => {
		fn();
		return {
			add: vi.fn((cb: () => void) => cb()),
			revert: vi.fn(),
		};
	});
	return { __esModule: true, default: { context } };
});

import { useGSAP } from "./useGSAP";

describe("useGSAP", () => {
	it("calls callback on mount", () => {
		const callback = vi.fn();
		renderHook(() => useGSAP(callback));
		expect(callback).toHaveBeenCalledOnce();
	});

	it("returns contextSafe function", () => {
		const { result } = renderHook(() => useGSAP());
		expect(result.current.contextSafe).toBeTypeOf("function");
	});

	it("returns context ref", () => {
		const { result } = renderHook(() => useGSAP());
		expect(result.current.context).toBeDefined();
	});

	it("contextSafe wraps function in context", () => {
		const { result } = renderHook(() => useGSAP());
		const fn = vi.fn();
		const safe = result.current.contextSafe(fn);
		safe();
		expect(fn).toHaveBeenCalled();
	});

	it("accepts config object without callback", () => {
		const { result } = renderHook(() => useGSAP({ dependencies: [] }));
		expect(result.current.contextSafe).toBeTypeOf("function");
	});
});
