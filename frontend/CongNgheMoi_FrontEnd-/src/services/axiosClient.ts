import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import type { ApiEnvelope } from "../types";
import { getAccessToken, getRefreshToken, saveTokens, clearAuthStorage, ensureTokenFresh } from "../utils/tokenManager";

const API_BASE_URL = (import.meta as { env?: Record<string, string> }).env?.VITE_API_BASE_URL || "http://localhost:3000";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Clone request body - especially for FormData
 * FormData.entries() allows rebuild after consumption
 */
function cloneFormData(formData: FormData): FormData {
  const cloned = new FormData();
  for (const [key, value] of formData.entries()) {
    cloned.append(key, value);
  }
  return cloned;
}

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    const payload = response.data as ApiEnvelope<unknown>;
    if (payload && typeof payload === "object" && "success" in payload) {
      return payload.data;
    }
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    if (status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    if ((originalRequest.url || "").includes("/api/v1/auth/refresh-token")) {
      clearAuthStorage();
      window.location.href = "/";
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Use shared token manager - prevents race conditions
      const tokens = await ensureTokenFresh({ forceRefresh: true });

      // FormData CAN be retried - clone it to use fresh body
      if (originalRequest.data instanceof FormData) {
        originalRequest.data = cloneFormData(originalRequest.data);
      }

      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return axiosClient(originalRequest);
    } catch (_refreshError) {
      clearAuthStorage();
      window.location.href = "/";
      return Promise.reject(error);
    }
  },
);

const apiClient = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return axiosClient.get<T, T>(url, config);
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return axiosClient.post<T, T>(url, data, config);
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return axiosClient.put<T, T>(url, data, config);
  },

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return axiosClient.delete<T, T>(url, config);
  },
};

export default apiClient;
