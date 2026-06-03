import axiosClient from "./axiosClient";
import type { PaginatedResponse, Review, ReviewStats } from "../types";

export const reviewService = {
  getCourseReviews(courseId: string, params: { page?: number; limit?: number } = {}) {
    return axiosClient.get<PaginatedResponse<Review>>(`/api/v1/reviews/course/${courseId}`, { params });
  },

  getReviewStats(courseId: string) {
    return axiosClient.get<ReviewStats>(`/api/v1/reviews/course/${courseId}/stats`);
  },

  createReview(payload: { courseId: string; rating: number; comment: string }) {
    return axiosClient.post<Review>("/api/v1/reviews", payload);
  },

  updateReview(reviewId: string, payload: { rating?: number; comment?: string }) {
    return axiosClient.put<Review>(`/api/v1/reviews/${reviewId}`, payload);
  },

  deleteReview(reviewId: string) {
    return axiosClient.delete<{ message?: string }>(`/api/v1/reviews/${reviewId}`);
  },
};
