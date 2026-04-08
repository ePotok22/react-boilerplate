import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("gsap", () => ({
	__esModule: true,
	default: {
		context: vi.fn((fn: () => void) => {
			fn();
			return {
				add: vi.fn((cb: () => void) => cb()),
				revert: vi.fn(),
			};
		}),
		from: vi.fn(),
		registerPlugin: vi.fn(),
	},
}));

vi.mock("gsap/ScrollTrigger", () => ({
	__esModule: true,
	ScrollTrigger: {},
}));

import { useScrollReveal } from "./useScrollReveal";

describe("useScrollReveal", () => {
	it("returns a ref object", () => {
		const { result } = renderHook(() => useScrollReveal());
		expect(result.current).toBeDefined();
		expect(result.current.current).toBeNull();
	});

	it("accepts custom options", () => {
		const { result } = renderHook(() =>
			useScrollReveal({ duration: 1, y: 50 }),
		);
		expect(result.current).toBeDefined();
	});
});
