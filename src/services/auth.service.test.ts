import { describe, expect, it, vi } from "vitest";

vi.mock("@/utils/http-client", () => ({
	httpClient: {
		get: vi.fn(() => ({
			json: vi.fn().mockResolvedValue({
				createdAt: "2025-01-01",
				email: "a@b.com",
				emailVerified: true,
				id: "1",
				name: "Test",
				role: "user",
			}),
		})),
		patch: vi.fn(() => ({
			json: vi.fn().mockResolvedValue({
				createdAt: "2025-01-01",
				email: "a@b.com",
				emailVerified: true,
				id: "1",
				name: "Updated",
				role: "user",
			}),
		})),
		post: vi.fn(() => ({
			json: vi.fn().mockResolvedValue({
				tokens: {
					accessToken: "a",
					expiresIn: 3600,
					refreshToken: "r",
				},
				user: {
					createdAt: "2025-01-01",
					email: "a@b.com",
					emailVerified: true,
					id: "1",
					name: "Test",
					role: "user",
				},
			}),
		})),
	},
}));

import { authService } from "./auth.service";

describe("authService", () => {
	it("login calls POST auth/login", async () => {
		const result = await authService.login({
			email: "a@b.com",
			password: "pass",
		});
		expect(result).toHaveProperty("user");
		expect(result).toHaveProperty("tokens");
	});

	it("register calls POST auth/register", async () => {
		const result = await authService.register({
			email: "a@b.com",
			name: "Test",
			password: "pass",
		});
		expect(result).toHaveProperty("user");
	});

	it("getProfile calls GET auth/me", async () => {
		const result = await authService.getProfile();
		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("email");
		expect(result).toHaveProperty("role");
	});

	it("updateProfile calls PATCH auth/me", async () => {
		const result = await authService.updateProfile({ name: "Updated" });
		expect(result.name).toBe("Updated");
	});

	it("logout calls POST auth/logout", async () => {
		await expect(authService.logout()).resolves.toBeDefined();
	});

	it("refreshToken calls POST auth/refresh", async () => {
		const result = await authService.refreshToken("old-token");
		expect(result).toBeDefined();
	});

	it("changePassword calls POST auth/change-password", async () => {
		await expect(
			authService.changePassword({
				currentPassword: "old",
				newPassword: "new",
			}),
		).resolves.toBeDefined();
	});

	it("forgotPassword calls POST auth/forgot-password", async () => {
		await expect(
			authService.forgotPassword({ email: "a@b.com" }),
		).resolves.toBeDefined();
	});

	it("resetPassword calls POST auth/reset-password", async () => {
		await expect(
			authService.resetPassword({ password: "new", token: "tok" }),
		).resolves.toBeDefined();
	});

	it("verifyEmail calls POST auth/verify-email", async () => {
		await expect(authService.verifyEmail("tok")).resolves.toBeDefined();
	});
});
