import axiosClient from "./axiosClient";
import type { PaymentIntent } from "../types";

export const paymentService = {
  getPaymentStatus(paymentIntentId: string) {
    return axiosClient.get<PaymentIntent>(`/api/v1/payments/${paymentIntentId}/status`);
  },

  topup(payload: { amount: number; provider: "STRIPE" | "MOMO" | "MOCK" }) {
    return axiosClient.post<PaymentIntent>("/api/v1/payments/topup", payload);
  },
};
