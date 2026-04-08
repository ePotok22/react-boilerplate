import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useClickOutside } from "./useClickOutside";

describe("useClickOutside", () => {
	it("returns a ref object", () => {
		const { result } = renderHook(() =>
			useClickOutside<HTMLDivElement>(() => {}),
		);
		expect(result.current).toHaveProperty("current");
	});

	it("calls callback on outside click", () => {
		let called = false;
		const { result } = renderHook(() =>
			useClickOutside<HTMLDivElement>(() => {
				called = true;
			}),
		);

		const div = document.createElement("div");
		document.body.appendChild(div);
		(result.current as { current: HTMLDivElement | null }).current = div;

		act(() => {
			document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
		});
		expect(called).toBe(true);

		document.body.removeChild(div);
	});
});
