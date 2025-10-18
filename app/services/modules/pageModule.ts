import { getCookie } from "@/app/lib/cookies";
import { api } from "../apiClient";

export interface PageItem {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  publishedAt?: string;
  layout: {
    moduleId: string;
    order: number;
  }[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PageResponse {
  items: PageItem[];
  total: number;
  page: number;
  limit: number;
}

export interface PageUpdatePayload {
  title?: string;
  slug?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  status?: "draft" | "published" | "scheduled";
  publishedAt?: string | null;
  layout?: { moduleId: string; order: number; props?: Record<string, any> }[];
}

export interface PageUpdateResponse {
  page: PageItem;
}

export const getPages = async (): Promise<PageResponse> => {
  return api.get<PageResponse>("/admin/pages");
};

export const getPage = async (id: string): Promise<any> => {
  return api.get<any>(`/admin/pages/${id}`);
};

export const getPageWithContent = async (slug: string): Promise<any> => {
  return api.get<any>(`/admin/pages/slug/${slug}`);
};

export const updatePage = async (
  id: string,
  payload: PageUpdatePayload,
  opts?: { useCookies?: boolean; signal?: AbortSignal }
): Promise<PageUpdateResponse> => {
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

  return api.put<PageUpdateResponse>(
    `/admin/pages/${id}`,
    payload,
    requestInit
  );
};

export default {
  getPages,
  getPage,
  getPageWithContent,
  updatePage,
};
