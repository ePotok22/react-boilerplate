import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/auth.service";
import type {
	AuthTokens,
	LoginCredentials,
	RegisterCredentials,
	User,
} from "@/types/auth";

interface AuthState {
	user: User | null;
	tokens: AuthTokens | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	isHydrated: boolean;
	error: string | null;

	setAuth: (user: User, tokens: AuthTokens) => void;
	setUser: (user: User) => void;
	setTokens: (tokens: AuthTokens) => void;
	clearError: () => void;
	setHydrated: () => void;

	login: (credentials: LoginCredentials) => Promise<void>;
	register: (credentials: RegisterCredentials) => Promise<void>;
	logout: () => Promise<void>;
	refreshTokens: () => Promise<boolean>;
	fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			clearError: () => set({ error: null }),
			error: null,

			fetchProfile: async () => {
				set({ isLoading: true });
				try {
					const user = await authService.getProfile();
					set({ isLoading: false, user });
				} catch (err) {
					const message =
						err instanceof Error ? err.message : "Failed to fetch profile";
					set({ error: message, isLoading: false });
					throw err;
				}
			},
			isAuthenticated: false,
			isHydrated: false,
			isLoading: false,

			login: async (credentials) => {
				set({ error: null, isLoading: true });
				try {
					const { user, tokens } = await authService.login(credentials);
					set({ isAuthenticated: true, isLoading: false, tokens, user });
				} catch (err) {
					const message = err instanceof Error ? err.message : "Login failed";
					set({ error: message, isLoading: false });
					throw err;
				}
			},

			logout: async () => {
				try {
					await authService.logout();
				} catch {
				} finally {
					set({
						error: null,
						isAuthenticated: false,
						isLoading: false,
						tokens: null,
						user: null,
					});
				}
			},

			refreshTokens: async () => {
				const { tokens } = get();
				if (!tokens?.refreshToken) {
					return false;
				}
				try {
					const newTokens = await authService.refreshToken(tokens.refreshToken);
					set({ tokens: newTokens });
					return true;
				} catch {
					set({
						error: null,
						isAuthenticated: false,
						tokens: null,
						user: null,
					});
					return false;
				}
			},

			register: async (credentials) => {
				set({ error: null, isLoading: true });
				try {
					const { user, tokens } = await authService.register(credentials);
					set({ isAuthenticated: true, isLoading: false, tokens, user });
				} catch (err) {
					const message =
						err instanceof Error ? err.message : "Registration failed";
					set({ error: message, isLoading: false });
					throw err;
				}
			},

			setAuth: (user, tokens) =>
				set({ error: null, isAuthenticated: true, tokens, user }),
			setHydrated: () => set({ isHydrated: true }),
			setTokens: (tokens) => set({ tokens }),
			setUser: (user) => set({ user }),
			tokens: null,
			user: null,
		}),
		{
			name: "auth-storage",
			onRehydrateStorage: () => (state) => {
				state?.setHydrated();
			},
			partialize: (state) => ({
				isAuthenticated: state.isAuthenticated,
				tokens: state.tokens,
				user: state.user,
			}),
		},
	),
);
