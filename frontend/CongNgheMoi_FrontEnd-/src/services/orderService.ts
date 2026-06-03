import axiosClient from "./axiosClient";
import type { Cart, CheckoutResponse, Order, PaginatedResponse } from "../types";

export const orderService = {
  getCart() {
    return axiosClient.get<Cart>("/api/v1/cart");
  },

  addToCart(courseId: string) {
    return axiosClient.post<{ message?: string }>("/api/v1/cart", { courseId });
  },

  removeFromCart(courseId: string) {
    return axiosClient.delete<{ message?: string }>(`/api/v1/cart/${courseId}`);
  },

  checkout(payload: { couponCode?: string; couponCourseId?: string; paymentProvider: "MOCK" | "STRIPE" | "MOMO" }) {
    return axiosClient.post<CheckoutResponse>("/api/v1/checkout", payload);
  },

  getOrders(params: { page?: number; limit?: number } = {}) {
    return axiosClient.get<PaginatedResponse<Order>>("/api/v1/orders", { params });
  },

  getOrderDetail(orderId: string) {
    return axiosClient.get<Order>(`/api/v1/orders/${orderId}`);
  },
};
