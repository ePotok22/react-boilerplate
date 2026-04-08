import qs from "qs";
import type { PaginatedResponse } from "@/types/api";
import { httpClient } from "@/utils/http-client";

// ── Types ──────────────────────────────────────────────
export interface Post {
	id: string;
	title: string;
	content: string;
	authorId: string;
	createdAt: string;
	updatedAt: string;
}

export interface PostFilters {
	page?: number;
	limit?: number;
	search?: string;
	sortBy?: "createdAt" | "title";
	order?: "asc" | "desc";
}

export interface CreatePostPayload {
	title: string;
	content: string;
}

export interface UpdatePostPayload {
	title?: string;
	content?: string;
}

// ── Service ────────────────────────────────────────────
const PREFIX = "posts";

export const postService = {
	create: (payload: CreatePostPayload) =>
		httpClient.post(PREFIX, { json: payload }).json<Post>(),

	delete: (id: string) => httpClient.delete(`${PREFIX}/${id}`).json<void>(),
	getAll: (filters: PostFilters = {}) => {
		const query = qs.stringify(filters, {
			addQueryPrefix: true,
			skipNulls: true,
		});
		return httpClient.get(`${PREFIX}${query}`).json<PaginatedResponse<Post>>();
	},

	getById: (id: string) => httpClient.get(`${PREFIX}/${id}`).json<Post>(),

	update: (id: string, payload: UpdatePostPayload) =>
		httpClient.patch(`${PREFIX}/${id}`, { json: payload }).json<Post>(),
};
