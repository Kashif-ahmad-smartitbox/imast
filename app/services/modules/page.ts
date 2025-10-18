import { getCookie } from "@/app/lib/cookies";
import { api } from "../apiClient";

/* -------------------- Interfaces -------------------- */

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

/* -------------------- API Calls -------------------- */

/** Get paginated list of pages */
export const getPages = async (): Promise<PageResponse> => {
  return api.get<PageResponse>("/admin/pages");
};

/** Get single page by ID */
export const getPage = async (id: string): Promise<any> => {
  return api.get<any>(`/admin/pages/${id}`);
};

/** Get published page with module content (by slug) */
export const getPageWithContent = async (slug: string): Promise<any> => {
  return api.get<any>(`/admin/pages/slug/${slug}`);
};

/** Update page by ID */
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

/* -------------------- Default Export -------------------- */
export default {
  getPages,
  getPage,
  getPageWithContent,
  updatePage,
};
