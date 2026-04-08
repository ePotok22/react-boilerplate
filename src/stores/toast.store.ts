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

export const useToastStore = create<ToastState>()((set) => ({
	addToast: (message, variant = "info", duration = 4000) => {
		const id = crypto.randomUUID();
		set((state) => ({
			toasts: [...state.toasts, { duration, id, message, variant }],
		}));
		if (duration > 0) {
			setTimeout(() => {
				set((state) => ({
					toasts: state.toasts.map((t) =>
						t.id === id ? { ...t, dismissing: true } : t,
					),
				}));
				setTimeout(() => {
					set((state) => ({
						toasts: state.toasts.filter((t) => t.id !== id),
					}));
				}, 500);
			}, duration);
		}
	},
	dismissToast: (id) =>
		set((state) => ({
			toasts: state.toasts.map((t) =>
				t.id === id ? { ...t, dismissing: true } : t,
			),
		})),
	removeToast: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((t) => t.id !== id),
		})),
	toasts: [],
}));
