import { API_BASE_URL } from "./api";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errText = await res.text();
    try {
      const errRes = JSON.parse(errText);
      throw new Error(errRes.message ? errRes.message : errText);
    } catch {
      throw new Error(errText || `API Error ${res.status}`);
    }
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : {}) as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiClient<T>(endpoint, { method: "GET", ...(options || {}) }),
  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiClient<T>(endpoint, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...(options || {}),
    }),
  put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiClient<T>(endpoint, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...(options || {}),
    }),
  del: <T>(endpoint: string, options?: RequestInit) =>
    apiClient<T>(endpoint, { method: "DELETE", ...(options || {}) }),
};
