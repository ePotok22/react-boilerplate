import { beforeEach, describe, expect, it, vi } from "vitest";
import { authService } from "@/services/auth.service";

vi.mock("@/services/auth.service", () => ({
	authService: {
		getProfile: vi.fn(),
		login: vi.fn(),
		logout: vi.fn(),
		refreshToken: vi.fn(),
		register: vi.fn(),
	},
}));

import { useAuthStore } from "./auth.store";

const mockUser = {
	createdAt: "2025-01-01T00:00:00Z",
	email: "a@b.com",
	emailVerified: true,
	id: "1",
	name: "Alice",
	role: "user" as const,
};
const mockTokens = {
	accessToken: "abc",
	expiresIn: 3600,
	refreshToken: "xyz",
};

const INITIAL_STATE = {
	error: null,
	isAuthenticated: false,
	isLoading: false,
	tokens: null,
	user: null,
};

describe("useAuthStore", () => {
	beforeEach(() => {
		useAuthStore.setState(INITIAL_STATE);
		vi.mocked(authService.login).mockResolvedValue({
			tokens: mockTokens,
			user: mockUser,
		});
		vi.mocked(authService.register).mockResolvedValue({
			tokens: { ...mockTokens, accessToken: "def" },
			user: { ...mockUser, id: "2", name: "Bob" },
		});
		vi.mocked(authService.logout).mockResolvedValue(undefined);
		vi.mocked(authService.refreshToken).mockResolvedValue({
			accessToken: "new-access",
			expiresIn: 3600,
			refreshToken: "new-refresh",
		});
		vi.mocked(authService.getProfile).mockResolvedValue({
			...mockUser,
			name: "Alice Updated",
			role: "admin",
		});
	});

	it("starts unauthenticated", () => {
		const state = useAuthStore.getState();
		expect(state.isAuthenticated).toBe(false);
		expect(state.user).toBeNull();
		expect(state.tokens).toBeNull();
		expect(state.isLoading).toBe(false);
		expect(state.error).toBeNull();
	});

	it("sets auth with user and tokens", () => {
		const user = {
			createdAt: "2025-01-01",
			email: "a@b.com",
			emailVerified: true,
			id: "1",
			name: "Alice",
			role: "user" as const,
		};
		const tokens = {
			accessToken: "abc",
			expiresIn: 3600,
			refreshToken: "xyz",
		};
		useAuthStore.getState().setAuth(user, tokens);

		const state = useAuthStore.getState();
		expect(state.isAuthenticated).toBe(true);
		expect(state.user).toEqual(user);
		expect(state.tokens).toEqual(tokens);
	});

	it("updates user only", () => {
		const user = {
			createdAt: "2025-01-01",
			email: "a@b.com",
			emailVerified: true,
			id: "1",
			name: "Alice",
			role: "user" as const,
		};
		useAuthStore.getState().setUser(user);
		expect(useAuthStore.getState().user).toEqual(user);
	});

	it("updates tokens only", () => {
		const tokens = {
			accessToken: "new",
			expiresIn: 3600,
			refreshToken: "ref",
		};
		useAuthStore.getState().setTokens(tokens);
		expect(useAuthStore.getState().tokens).toEqual(tokens);
	});

	it("clears error", () => {
		useAuthStore.setState({ error: "some error" });
		useAuthStore.getState().clearError();
		expect(useAuthStore.getState().error).toBeNull();
	});

	it("login sets user, tokens, and isAuthenticated", async () => {
		await useAuthStore.getState().login({ email: "a@b.com", password: "pass" });

		const state = useAuthStore.getState();
		expect(state.isAuthenticated).toBe(true);
		expect(state.user?.name).toBe("Alice");
		expect(state.tokens?.accessToken).toBe("abc");
		expect(state.isLoading).toBe(false);
	});

	it("register sets user, tokens, and isAuthenticated", async () => {
		await useAuthStore
			.getState()
			.register({ email: "b@b.com", name: "Bob", password: "pass" });

		const state = useAuthStore.getState();
		expect(state.isAuthenticated).toBe(true);
		expect(state.user?.name).toBe("Bob");
		expect(state.tokens?.accessToken).toBe("def");
	});

	it("logout clears state", async () => {
		useAuthStore.getState().setAuth(
			{
				createdAt: "2025-01-01",
				email: "a@b.com",
				emailVerified: true,
				id: "1",
				name: "Alice",
				role: "user",
			},
			{ accessToken: "abc", expiresIn: 3600, refreshToken: "xyz" },
		);

		await useAuthStore.getState().logout();

		const state = useAuthStore.getState();
		expect(state.isAuthenticated).toBe(false);
		expect(state.user).toBeNull();
		expect(state.tokens).toBeNull();
	});

	it("refreshTokens updates tokens on success", async () => {
		useAuthStore.setState({
			isAuthenticated: true,
			tokens: { accessToken: "old", expiresIn: 0, refreshToken: "old-ref" },
		});

		const success = await useAuthStore.getState().refreshTokens();
		expect(success).toBe(true);
		expect(useAuthStore.getState().tokens?.accessToken).toBe("new-access");
	});

	it("refreshTokens returns false when no tokens", async () => {
		const success = await useAuthStore.getState().refreshTokens();
		expect(success).toBe(false);
	});

	it("fetchProfile updates user", async () => {
		await useAuthStore.getState().fetchProfile();
		expect(useAuthStore.getState().user?.name).toBe("Alice Updated");
		expect(useAuthStore.getState().isLoading).toBe(false);
	});
});
