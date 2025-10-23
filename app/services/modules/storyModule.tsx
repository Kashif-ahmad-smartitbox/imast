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

export const getStories = async (): Promise<StoryResponse> => {
  return api.get<StoryResponse>("/admin/stories");
};

export const getStory = async (id: string): Promise<{ story: StoryItem }> => {
  return api.get<{ story: StoryItem }>(`/admin/stories/${id}`);
};

export const getStoryWithContent = async (
  slug: string
): Promise<{ story: StoryItem }> => {
  return api.get<{ story: StoryItem }>(`/admin/stories/slug/${slug}`);
};

export const createStory = async (
  payload: StoryCreatePayload,
  opts?: { useCookies?: boolean; signal?: AbortSignal }
): Promise<StoryCreateResponse> => {
  const token = getCookie("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const requestInit: RequestInit = {
    headers,
    ...(opts?.signal ? { signal: opts.signal } : {}),
    ...(opts?.useCookies ? { credentials: "include" } : {}),
  };

  return api.post<StoryCreateResponse>("/admin/stories", payload, requestInit);
};

export const updateStory = async (
  id: string,
  payload: StoryUpdatePayload,
  opts?: { useCookies?: boolean; signal?: AbortSignal }
): Promise<StoryUpdateResponse> => {
  const token = getCookie("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const requestInit: RequestInit = {
    headers,
    ...(opts?.signal ? { signal: opts.signal } : {}),
    ...(opts?.useCookies ? { credentials: "include" } : {}),
  };

  return api.put<StoryUpdateResponse>(
    `/admin/stories/${id}`,
    payload,
    requestInit
  );
};

export default {
  getStories,
  getStory,
  getStoryWithContent,
  createStory,
  updateStory,
};
