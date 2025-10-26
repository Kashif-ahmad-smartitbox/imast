import { getCookie } from "@/app/lib/cookies";
import { api } from "../apiClient";

export interface StoryItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  author?: string;
  tags?: string[];
  status: "draft" | "published" | "scheduled" | "archived";
  publishedAt?: string | null;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface StoryResponse {
  items: StoryItem[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface StoryCreatePayload {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  tags?: string[];
  status?: "draft" | "published" | "scheduled";
  publishedAt?: string | null;
}

export interface StoryUpdatePayload {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  tags?: string[];
  status?: "draft" | "published" | "scheduled" | "archived";
  publishedAt?: string | null;
}

export interface StoryCreateResponse {
  story: StoryItem;
}

export interface StoryUpdateResponse {
  story: StoryItem;
}

export interface StoryDeleteResponse {
  message: string;
  storyId: string;
}

export interface ApiOptions {
  useCookies?: boolean;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

// Common request configuration helper
const getRequestConfig = (opts?: ApiOptions): RequestInit => {
  const token = getCookie("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts?.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return {
    headers,
    ...(opts?.signal ? { signal: opts.signal } : {}),
    ...(opts?.useCookies ? { credentials: "include" } : {}),
  };
};

export const getStories = async (opts?: ApiOptions): Promise<StoryResponse> => {
  return api.get<StoryResponse>("/admin/stories", getRequestConfig(opts));
};

export const getStory = async (
  id: string,
  opts?: ApiOptions
): Promise<{ story: StoryItem }> => {
  if (!id) {
    throw new Error("Story ID is required");
  }
  return api.get<{ story: StoryItem }>(
    `/admin/stories/${id}`,
    getRequestConfig(opts)
  );
};

export const getStoryWithContent = async (
  slug: string,
  opts?: ApiOptions
): Promise<{ story: StoryItem }> => {
  if (!slug) {
    throw new Error("Story slug is required");
  }
  return api.get<{ story: StoryItem }>(
    `/admin/stories/slug/${slug}`,
    getRequestConfig(opts)
  );
};

export const createStory = async (
  payload: StoryCreatePayload,
  opts?: ApiOptions
): Promise<StoryCreateResponse> => {
  if (!payload.title?.trim()) {
    throw new Error("Story title is required");
  }

  return api.post<StoryCreateResponse>(
    "/admin/stories",
    payload,
    getRequestConfig(opts)
  );
};

export const updateStory = async (
  id: string,
  payload: StoryUpdatePayload,
  opts?: ApiOptions
): Promise<StoryUpdateResponse> => {
  if (!id) {
    throw new Error("Story ID is required");
  }

  return api.put<StoryUpdateResponse>(
    `/admin/stories/${id}`,
    payload,
    getRequestConfig(opts)
  );
};

export const deleteStory = async (
  id: string,
  opts?: ApiOptions
): Promise<StoryDeleteResponse> => {
  if (!id) {
    throw new Error("Story ID is required");
  }

  return api.del<StoryDeleteResponse>(
    `/admin/stories/${id}`,
    getRequestConfig(opts)
  );
};

export default {
  getStories,
  getStory,
  getStoryWithContent,
  createStory,
  updateStory,
  deleteStory,
};
