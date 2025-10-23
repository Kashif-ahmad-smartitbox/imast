import { getCookie } from "@/app/lib/cookies";
import { api } from "../apiClient";

export interface BlogItem {
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

export interface BlogResponse {
  items: BlogItem[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface BlogCreatePayload {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  tags?: string[];
  status?: "draft" | "published" | "scheduled";
  publishedAt?: string | null;
}

export interface BlogUpdatePayload {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  tags?: string[];
  status?: "draft" | "published" | "scheduled" | "archived";
  publishedAt?: string | null;
}

export interface BlogCreateResponse {
  blog: BlogItem;
}

export interface BlogUpdateResponse {
  blog: BlogItem;
}

export const getBlogs = async (): Promise<BlogResponse> => {
  return api.get<BlogResponse>("/admin/blogs");
};

export const getBlog = async (id: string): Promise<{ blog: BlogItem }> => {
  return api.get<{ blog: BlogItem }>(`/admin/blogs/${id}`);
};

export const getBlogWithContent = async (
  slug: string
): Promise<{ blog: BlogItem }> => {
  return api.get<{ blog: BlogItem }>(`/admin/blogs/slug/${slug}`);
};

export const createBlog = async (
  payload: BlogCreatePayload,
  opts?: { useCookies?: boolean; signal?: AbortSignal }
): Promise<BlogCreateResponse> => {
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

  return api.post<BlogCreateResponse>("/admin/blogs", payload, requestInit);
};

export const updateBlog = async (
  id: string,
  payload: BlogUpdatePayload,
  opts?: { useCookies?: boolean; signal?: AbortSignal }
): Promise<BlogUpdateResponse> => {
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

  return api.put<BlogUpdateResponse>(
    `/admin/blogs/${id}`,
    payload,
    requestInit
  );
};

export default {
  getBlogs,
  getBlog,
  getBlogWithContent,
  createBlog,
  updateBlog,
};
