import { API_BASE_URL } from "../api";
import { api } from "../apiClient";

export type MediaItem = {
  _id?: string;
  id?: string;
  filename?: string;
  url?: string;
  size?: number;
  mimeType?: string;
  createdAt?: string;
  [k: string]: any;
};

export type UploadResult = {
  success: boolean;
  data?: MediaItem | MediaItem[];
  message?: string;
};

function buildAuthHeaders(token?: string, cookie?: string): Headers {
  const headers = new Headers();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (cookie) headers.set("Cookie", cookie);
  return headers;
}

export const getAllMedia = async (): Promise<MediaItem[]> => {
  return api.get<MediaItem[]>("/admin/uploads/media");
};

export const getMediaById = async (id: string): Promise<MediaItem> => {
  return api.get<MediaItem>(`/admin/uploads/media/${encodeURIComponent(id)}`);
};

export const uploadMedia = async (
  file: File | Blob,
  token?: string,
  cookie?: string
): Promise<UploadResult> => {
  const url = `${API_BASE_URL}/admin/uploads/media`;
  const form = new FormData();
  form.append("file", file);

  const headers = buildAuthHeaders(token, cookie);

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    return { success: false, message: `Upload failed: ${res.status} ${text}` };
  }

  const data = await res.json();
  return { success: true, data };
};

export const uploadMultipleMedia = async (
  files: (File | Blob)[],
  token?: string,
  cookie?: string
): Promise<UploadResult> => {
  const url = `${API_BASE_URL}/admin/uploads/media/multi`;
  const form = new FormData();
  files.forEach((f) => form.append("files", f));

  const headers = buildAuthHeaders(token, cookie);

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    return {
      success: false,
      message: `Multi upload failed: ${res.status} ${text}`,
    };
  }

  const data = await res.json();
  return { success: true, data };
};

export const deleteMedia = async (
  id: string,
  token?: string,
  cookie?: string
): Promise<{ success: boolean; message?: string }> => {
  const url = `${API_BASE_URL}/admin/uploads/media/${encodeURIComponent(id)}`;
  const headers = buildAuthHeaders(token, cookie);

  const res = await fetch(url, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    return { success: false, message: `Delete failed: ${res.status} ${text}` };
  }

  try {
    const json = await res.json();
    return { success: true, message: json?.message ?? undefined };
  } catch {
    return { success: true };
  }
};

export const buildAuthHeaderObject = (token?: string, cookie?: string) => {
  const h: Record<string, string> = {};
  if (token) h["Authorization"] = `Bearer ${token}`;
  if (cookie) h["Cookie"] = cookie;
  return h;
};

export default {
  getAllMedia,
  getMediaById,
  uploadMedia,
  uploadMultipleMedia,
  deleteMedia,
  buildAuthHeaderObject,
};
