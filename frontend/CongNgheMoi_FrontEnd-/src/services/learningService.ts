import axiosClient from "./axiosClient";
import type { CourseDetailResponse, Enrollment, LessonProgress, PaginatedResponse } from "../types";

export const learningService = {
  getMyCourses(params: { page?: number; limit?: number } = {}) {
    return axiosClient.get<PaginatedResponse<Enrollment>>("/api/v1/learning/my-courses", { params });
  },

  getEnrollment(courseId: string) {
    return axiosClient.get<Enrollment>(`/api/v1/learning/enrollments/${courseId}`);
  },

  getPlayerDetail(courseId: string) {
    return axiosClient.get<CourseDetailResponse>(`/api/v1/learning/${courseId}/player-detail`);
  },

  getProgress(courseId: string) {
    return axiosClient.get<LessonProgress[]>(`/api/v1/learning/${courseId}/progress`);
  },

  completeLesson(courseId: string, lessonId: string) {
    return axiosClient.post<{ progressPercent: number; completed: boolean }>(`/api/v1/learning/${courseId}/complete`, { lessonId });
  },

  sendHeartbeat(courseId: string, payload: { lessonId: string; deltaWatchSec: number }) {
    return axiosClient.post<{ recorded: number; watchTimeSec: number }>(`/api/v1/learning/${courseId}/watch-session`, payload);
  },
};
