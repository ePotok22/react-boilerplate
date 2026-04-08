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
	},
}));

import { useStaggerReveal } from "./useStaggerReveal";

describe("useStaggerReveal", () => {
	it("returns a ref object", () => {
		const { result } = renderHook(() => useStaggerReveal());
		expect(result.current).toBeDefined();
		expect(result.current.current).toBeNull();
	});

	it("accepts custom options", () => {
		const { result } = renderHook(() =>
			useStaggerReveal({ duration: 1, stagger: 0.1, y: 50 }),
		);
		expect(result.current).toBeDefined();
	});
});
