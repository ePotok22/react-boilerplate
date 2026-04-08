import type {
	AuthTokens,
	ChangePasswordPayload,
	ForgotPasswordPayload,
	LoginCredentials,
	RegisterCredentials,
	ResetPasswordPayload,
	User,
} from "@/types/auth";
import { httpClient } from "@/utils/http-client";

const AUTH_PREFIX = "auth";

export const authService = {
	changePassword: (payload: ChangePasswordPayload) =>
		httpClient
			.post(`${AUTH_PREFIX}/change-password`, { json: payload })
			.json<void>(),

	forgotPassword: (payload: ForgotPasswordPayload) =>
		httpClient
			.post(`${AUTH_PREFIX}/forgot-password`, { json: payload })
			.json<{ message: string }>(),

	getProfile: () => httpClient.get(`${AUTH_PREFIX}/me`).json<User>(),
	login: (credentials: LoginCredentials) =>
		httpClient
			.post(`${AUTH_PREFIX}/login`, { json: credentials })
			.json<{ user: User; tokens: AuthTokens }>(),

	logout: () => httpClient.post(`${AUTH_PREFIX}/logout`).json<void>(),

	refreshToken: (refreshToken: string) =>
		httpClient
			.post(`${AUTH_PREFIX}/refresh`, { json: { refreshToken } })
			.json<AuthTokens>(),

	register: (credentials: RegisterCredentials) =>
		httpClient
			.post(`${AUTH_PREFIX}/register`, { json: credentials })
			.json<{ user: User; tokens: AuthTokens }>(),

	resetPassword: (payload: ResetPasswordPayload) =>
		httpClient
			.post(`${AUTH_PREFIX}/reset-password`, { json: payload })
			.json<void>(),

	updateProfile: (data: Partial<Pick<User, "name" | "avatar">>) =>
		httpClient.patch(`${AUTH_PREFIX}/me`, { json: data }).json<User>(),

	verifyEmail: (token: string) =>
		httpClient
			.post(`${AUTH_PREFIX}/verify-email`, { json: { token } })
			.json<void>(),
};
