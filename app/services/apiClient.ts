import { API_BASE_URL } from "./api";

export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  url?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const text = await res.text();

    // Handle empty responses (like for 204 No Content)
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof Error) {
      // Re-throw existing API errors
      throw error;
    }

    // Handle network errors or other unexpected errors
    const apiError = new Error(
      typeof error === "string" ? error : "Network request failed"
    ) as ApiError;
    apiError.url = url;
    throw apiError;
  }
}

// Add the request method that was missing
export const request = <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  return apiClient<T>(endpoint, options);
};

export const api = {
  request, // Add the request method
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiClient<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiClient<T>(endpoint, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),

  put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiClient<T>(endpoint, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),

  patch: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiClient<T>(endpoint, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),

  del: <T>(endpoint: string, options?: RequestInit) =>
    apiClient<T>(endpoint, { method: "DELETE", ...options }),
};
