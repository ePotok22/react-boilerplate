import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/config/query-client";
import {
	type CreatePostPayload,
	type PostFilters,
	postService,
	type UpdatePostPayload,
} from "@/services/post.service";

export const postKeys = {
	all: ["posts"] as const,
	detail: (id: string) => [...postKeys.details(), id] as const,
	details: () => [...postKeys.all, "detail"] as const,
	list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
	lists: () => [...postKeys.all, "list"] as const,
};

export const postListOptions = (filters: PostFilters = {}) =>
	queryOptions({
		queryFn: () => postService.getAll(filters),
		queryKey: postKeys.list(filters),
	});

export const postDetailOptions = (id: string) =>
	queryOptions({
		enabled: !!id,
		queryFn: () => postService.getById(id),
		queryKey: postKeys.detail(id),
	});

export function usePostList(filters: PostFilters = {}) {
	return useQuery(postListOptions(filters));
}

export function usePostDetail(id: string) {
	return useQuery(postDetailOptions(id));
}

export function useCreatePost() {
	return useMutation({
		mutationFn: (payload: CreatePostPayload) => postService.create(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: postKeys.lists() });
		},
	});
}

export function useUpdatePost() {
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdatePostPayload }) =>
			postService.update(id, payload),
		onSuccess: (_data, { id }) => {
			queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
			queryClient.invalidateQueries({ queryKey: postKeys.lists() });
		},
	});
}

export function useDeletePost() {
	return useMutation({
		mutationFn: (id: string) => postService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: postKeys.lists() });
		},
	});
}
