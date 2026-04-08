export type UserRole = "admin" | "user" | "moderator";

export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: UserRole;
	emailVerified: boolean;
	createdAt: string;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

export interface LoginCredentials {
	email: string;
	password: string;
	remember?: boolean;
}

export interface RegisterCredentials {
	email: string;
	password: string;
	name: string;
}

export interface ForgotPasswordPayload {
	email: string;
}

export interface ResetPasswordPayload {
	token: string;
	password: string;
}

export interface ChangePasswordPayload {
	currentPassword: string;
	newPassword: string;
}
