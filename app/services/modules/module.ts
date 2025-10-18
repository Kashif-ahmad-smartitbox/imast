import { getCookie } from "@/app/lib/cookies";
import { api } from "../apiClient";

export interface ModuleCreatePayload {
  type: string;
  title?: string;
  content?: any;
  status?: "draft" | "published";
}

export interface ModuleResponse {
  module: {
    _id: string;
    type: string;
    title?: string;
    content?: any;
    status?: "draft" | "published";
    version?: number;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
    [k: string]: any;
  };
}

export type ModuleUpdatePayload = Partial<ModuleCreatePayload>;

export type ModuleRequestOptions = {
  token?: string | null;
  useCookies?: boolean;
  signal?: AbortSignal | null;
};

function buildRequestOptions(opts?: ModuleRequestOptions): RequestInit {
  const token = getCookie("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return {
    headers,
    ...(opts?.signal ? { signal: opts.signal } : {}),
    ...(opts?.useCookies ? { credentials: "include" } : {}),
  };
}

export const createModule = async (
  payload: ModuleCreatePayload,
  opts?: ModuleRequestOptions
): Promise<ModuleResponse> => {
  const requestInit = buildRequestOptions(opts);
  return api.post<ModuleResponse>("/admin/modules", payload, requestInit);
};

export const updateModule = async (
  id: string,
  payload: ModuleUpdatePayload,
  opts?: ModuleRequestOptions
): Promise<ModuleResponse> => {
  if (!id) throw new Error("updateModule: id is required");
  const requestInit = buildRequestOptions(opts);
  return api.put<ModuleResponse>(`/admin/modules/${id}`, payload, requestInit);
};

export default { createModule, updateModule };
