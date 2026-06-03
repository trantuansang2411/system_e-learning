import axiosClient from "./axiosClient";
import type { Notification, PaginatedResponse } from "../types";

export const notificationService = {
  getNotifications(params: { page?: number; limit?: number } = {}) {
    return axiosClient.get<PaginatedResponse<Notification>>("/api/v1/notifications", { params });
  },

  markAsRead(notificationId: string) {
    return axiosClient.put<{ message?: string }>(`/api/v1/notifications/${notificationId}/read`);
  },

  markAllAsRead() {
    return axiosClient.put<{ message?: string }>("/api/v1/notifications/read-all");
  },

  getUnreadCount() {
    return axiosClient.get<{ unreadCount: number }>("/api/v1/notifications/unread-count");
  },
};
