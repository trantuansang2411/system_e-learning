import axiosClient from "./axiosClient";
import type { PaginatedResponse, Transaction, WalletBalance } from "../types";

export const walletService = {
  getBalance() {
    return axiosClient.get<WalletBalance>("/api/v1/wallet/balance");
  },

  getTransactions(params: { page?: number; limit?: number } = {}) {
    return axiosClient.get<PaginatedResponse<Transaction>>("/api/v1/wallet/transactions", { params });
  },
};
