import axiosClient from "./axiosClient";
import type { AuthTokens, LoginResponse, RegisterResponse } from "../types";

export const authService = {
  register(payload: { email: string; password: string }) {
    return axiosClient.post<RegisterResponse>("/api/v1/auth/register", payload);
  },

  verifyRegistrationOtp(payload: { email: string; otp: string }) {
    return axiosClient.post<LoginResponse>("/api/v1/auth/verify-registration-otp", payload);
  },

  resendOtp(payload: { email: string }) {
    return axiosClient.post<{ message: string }>("/api/v1/auth/resend-registration-otp", payload);
  },

  login(payload: { email: string; password: string }) {
    return axiosClient.post<LoginResponse>("/api/v1/auth/login", payload);
  },

  googleLogin(payload: { idToken: string }) {
    return axiosClient.post<LoginResponse>("/api/v1/auth/google", payload);
  },

  refreshToken(payload: { refreshToken: string }) {
    return axiosClient.post<AuthTokens>("/api/v1/auth/refresh-token", payload);
  },

  logout(payload: { refreshToken: string }) {
    return axiosClient.post<{ message: string }>("/api/v1/auth/logout", payload);
  },

  forgotPassword(payload: { email: string }) {
    return axiosClient.post<{ message: string; resetToken?: string }>("/api/v1/auth/forgot-password", payload);
  },

  resetPassword(payload: { token: string; newPassword: string }) {
    return axiosClient.post<{ message: string }>("/api/v1/auth/reset-password", payload);
  },
};
