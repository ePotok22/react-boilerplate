import { create } from "zustand";

export type ToastVariant = "info" | "success" | "warning" | "error";

interface Toast {
	id: string;
	message: string;
	variant: ToastVariant;
	duration?: number;
	dismissing?: boolean;
}

interface ToastState {
	toasts: Toast[];
	addToast: (
		message: string,
		variant?: ToastVariant,
		duration?: number,
	) => void;
	dismissToast: (id: string) => void;
	removeToast: (id: string) => void;
}

const toastTimers = new Map<string, ReturnType<typeof setTimeout>[]>();

function removeToast(
	id: string,
	set: (fn: (state: ToastState) => Partial<ToastState>) => void,
) {
	set((state) => ({
		toasts: state.toasts.filter((t) => t.id !== id),
	}));
	toastTimers.delete(id);
}

function markDismissing(
	id: string,
	set: (fn: (state: ToastState) => Partial<ToastState>) => void,
) {
	set((state) => ({
		toasts: state.toasts.map((t) =>
			t.id === id ? { ...t, dismissing: true } : t,
		),
	}));
}

function scheduleAutoDismiss(
	id: string,
	duration: number,
	set: (fn: (state: ToastState) => Partial<ToastState>) => void,
) {
	const timers: ReturnType<typeof setTimeout>[] = [];
	const t1 = setTimeout(() => {
		markDismissing(id, set);
		const t2 = setTimeout(() => removeToast(id, set), 500);
		timers.push(t2);
	}, duration);
	timers.push(t1);
	toastTimers.set(id, timers);
}

function clearToastTimers(id: string) {
	const timers = toastTimers.get(id);
	if (timers) {
		for (const t of timers) {
			clearTimeout(t);
		}
		toastTimers.delete(id);
	}
}

export const useToastStore = create<ToastState>()((set) => ({
	addToast: (message, variant = "info", duration = 4000) => {
		const id = crypto.randomUUID();
		set((state) => ({
			toasts: [...state.toasts, { duration, id, message, variant }],
		}));
		if (duration > 0) {
			scheduleAutoDismiss(id, duration, set);
		}
	},
	dismissToast: (id) => {
		clearToastTimers(id);
		set((state) => ({
			toasts: state.toasts.map((t) =>
				t.id === id ? { ...t, dismissing: true } : t,
			),
		}));
	},
	removeToast: (id) => {
		clearToastTimers(id);
		set((state) => ({
			toasts: state.toasts.filter((t) => t.id !== id),
		}));
	},
	toasts: [],
}));
