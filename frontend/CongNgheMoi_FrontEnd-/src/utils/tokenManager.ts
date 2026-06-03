/**
 * Shared token manager - ensures only ONE refresh happens at a time
 * Used by both axiosClient interceptor AND pre-upload refresh
 * Prevents race condition with token rotation
 */

import axios from "axios";
import type { AuthTokens } from "../types";

const API_BASE_URL = (import.meta as { env?: Record<string, string> }).env?.VITE_API_BASE_URL || "http://localhost:3000";

let isRefreshing = false;
let refreshPromise: Promise<AuthTokens> | null = null;

interface EnsureTokenFreshOptions {
  forceRefresh?: boolean;
}

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("refreshToken");
}

export function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem("accessToken", tokens.accessToken);
  if (tokens.refreshToken) {
    localStorage.setItem("refreshToken", tokens.refreshToken);
  }
}

export function clearAuthStorage(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("authUser");
}

/**
 * Centralized refresh token - shared lock prevents race conditions
 * Multiple callers (axiosClient, pre-upload) use same refresh promise
 */
export async function ensureTokenFresh(options: EnsureTokenFreshOptions = {}): Promise<AuthTokens> {
  const { forceRefresh = false } = options;

  // Already refreshing - return same promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  // Token still fresh - no need to refresh
  if (!forceRefresh && !isTokenExpiringSoon()) {
    const token = getAccessToken();
    if (token) {
      return { accessToken: token, refreshToken: "" };
    }
  }

  // Start refresh - set lock first
  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post<{ data: AuthTokens }>(
        `${API_BASE_URL}/api/v1/auth/refresh-token`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );

      const tokens = response.data.data;
      saveTokens(tokens);
      return tokens;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Check if token is expiring soon (< 2 minutes)
 */
function isTokenExpiringSoon(): boolean {
  const token = getAccessToken();
  if (!token) return true; // No token = expiring soon

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload = JSON.parse(atob(padded));
    const expiryTime = payload.exp ? payload.exp * 1000 : Date.now();
    const now = Date.now();
    const timeUntilExpiry = expiryTime - now;

    return timeUntilExpiry < 2 * 60 * 1000; // Less than 2 minutes
  } catch {
    return true; // Invalid token = treat as expiring
  }
}
