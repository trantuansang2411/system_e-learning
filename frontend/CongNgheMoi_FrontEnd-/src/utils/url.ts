const API_BASE_URL = (import.meta as { env?: Record<string, string> }).env?.VITE_API_BASE_URL || "http://localhost:3000";

export function getImageUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }
  if (url.startsWith("/")) {
    return `${API_BASE_URL}${url}`;
  }
  return `${API_BASE_URL}/${url}`;
}

// Alias for video and other media URLs — same logic as getImageUrl
export const getMediaUrl = getImageUrl;

// Returns a URL sized for card thumbnails (~600×400). Applies CDN params for
// Unsplash/Pexels so the browser downloads a small image instead of the original.
export function getThumbnailUrl(url?: string | null, fallback = ""): string {
  const resolved = getImageUrl(url);
  if (!resolved) return fallback;

  if (resolved.includes("images.unsplash.com") && !resolved.includes("w=")) {
    const sep = resolved.includes("?") ? "&" : "?";
    return `${resolved}${sep}w=600&h=400&fit=crop&auto=format&q=75`;
  }
  if (resolved.includes("images.pexels.com") && !resolved.includes("w=")) {
    const sep = resolved.includes("?") ? "&" : "?";
    return `${resolved}${sep}auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`;
  }
  return resolved;
}

