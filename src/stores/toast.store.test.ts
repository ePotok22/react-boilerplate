import { beforeEach, describe, expect, it, vi } from "vitest";
import { useToastStore } from "./toast.store";

describe("useToastStore", () => {
	beforeEach(() => {
		useToastStore.setState({ toasts: [] });
	});

	it("starts with empty toasts", () => {
		expect(useToastStore.getState().toasts).toEqual([]);
	});

	it("adds a toast", () => {
		useToastStore.getState().addToast("Hello", "success", 0);
		const toasts = useToastStore.getState().toasts;
		expect(toasts).toHaveLength(1);
		expect(toasts[0]?.message).toBe("Hello");
		expect(toasts[0]?.variant).toBe("success");
	});

	it("removes a toast by id", () => {
		useToastStore.getState().addToast("A", "info", 0);
		const id = useToastStore.getState().toasts[0]?.id ?? "";
		useToastStore.getState().removeToast(id);
		expect(useToastStore.getState().toasts).toHaveLength(0);
	});

	it("marks toast as dismissing after duration", () => {
		vi.useFakeTimers();
		useToastStore.getState().addToast("Temp", "warning", 2000);
		expect(useToastStore.getState().toasts).toHaveLength(1);
		expect(useToastStore.getState().toasts[0]?.dismissing).toBeFalsy();

		vi.advanceTimersByTime(2000);
		expect(useToastStore.getState().toasts).toHaveLength(1);
		expect(useToastStore.getState().toasts[0]?.dismissing).toBe(true);
		vi.useRealTimers();
	});

	it("dismissToast marks a toast as dismissing", () => {
		useToastStore.getState().addToast("A", "info", 0);
		const id = useToastStore.getState().toasts[0]?.id ?? "";
		useToastStore.getState().dismissToast(id);
		expect(useToastStore.getState().toasts[0]?.dismissing).toBe(true);
	});

	it("defaults to info variant", () => {
		useToastStore.getState().addToast("Default", undefined, 0);
		expect(useToastStore.getState().toasts[0]?.variant).toBe("info");
	});
});
