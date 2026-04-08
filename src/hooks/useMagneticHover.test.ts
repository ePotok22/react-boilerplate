import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("gsap", () => ({
	__esModule: true,
	default: {
		to: vi.fn(),
	},
}));

import { useMagneticHover } from "./useMagneticHover";

describe("useMagneticHover", () => {
	it("returns a ref object", () => {
		const { result } = renderHook(() => useMagneticHover());
		expect(result.current).toBeDefined();
		expect(result.current.current).toBeNull();
	});

	it("accepts custom options", () => {
		const { result } = renderHook(() =>
			useMagneticHover({ duration: 0.5, strength: 0.5 }),
		);
		expect(result.current).toBeDefined();
	});
});
