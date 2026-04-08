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
		fromTo: vi.fn(),
		registerPlugin: vi.fn(),
	},
}));

vi.mock("gsap/ScrollTrigger", () => ({
	__esModule: true,
	ScrollTrigger: {},
}));

import { useParallax } from "./useParallax";

describe("useParallax", () => {
	it("returns a ref object", () => {
		const { result } = renderHook(() => useParallax());
		expect(result.current).toBeDefined();
		expect(result.current.current).toBeNull();
	});

	it("accepts custom options", () => {
		const { result } = renderHook(() =>
			useParallax({ direction: "horizontal", speed: 0.5 }),
		);
		expect(result.current).toBeDefined();
	});
});
