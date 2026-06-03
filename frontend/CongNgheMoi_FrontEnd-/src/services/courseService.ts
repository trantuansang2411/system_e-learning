import axiosClient from "./axiosClient";
import type { Course, CourseDetailResponse, Lesson, PaginatedResponse, Resource, Section } from "../types";

export const courseService = {
  getPublishedCourses(params: { page?: number; limit?: number } = {}) {
    return axiosClient.get<PaginatedResponse<Course>>("/api/v1/courses/published", { params });
  },

  getCategories() {
    return axiosClient.get<{ categoryId: string; name: string; slug: string; description?: string; iconUrl?: string; orderIndex?: number }[]>("/api/v1/courses/categories");
  },

  getCourseDetail(courseId: string) {
    return axiosClient.get<CourseDetailResponse>(`/api/v1/courses/${courseId}`);
  },

  getSections(courseId: string) {
    return axiosClient.get<Section[]>(`/api/v1/courses/${courseId}/sections`);
  },

  getLessons(courseId: string, sectionId: string) {
    return axiosClient.get<Lesson[]>(`/api/v1/courses/${courseId}/sections/${sectionId}/lessons`);
  },

  getLessonResources(courseId: string, sectionId: string, lessonId: string) {
    return axiosClient.get<Resource[]>(`/api/v1/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/resources`);
  },

  getMyCourses(params: { page?: number; limit?: number } = {}) {
    return axiosClient.get<PaginatedResponse<Course>>("/api/v1/courses/instructor/mine", { params });
  },

  createCourse(payload: Partial<Course>) {
    return axiosClient.post<Course>("/api/v1/courses", payload);
  },

  updateCourse(courseId: string, payload: Partial<Course>) {
    return axiosClient.put<Course>(`/api/v1/courses/${courseId}`, payload);
  },

  deleteCourse(courseId: string) {
    return axiosClient.delete<{ message?: string }>(`/api/v1/courses/${courseId}`);
  },

  submitCourse(courseId: string) {
    return axiosClient.post<{ message?: string }>(`/api/v1/courses/${courseId}/submit`);
  },

  previewCourse(courseId: string) {
    return axiosClient.get<CourseDetailResponse>(`/api/v1/courses/${courseId}/preview`);
  },

  createSection(courseId: string, payload: { title: string; orderIndex: number }) {
    return axiosClient.post<Section>(`/api/v1/courses/${courseId}/sections`, payload);
  },

  updateSection(courseId: string, sectionId: string, payload: Partial<Section>) {
    return axiosClient.put<Section>(`/api/v1/courses/${courseId}/sections/${sectionId}`, payload);
  },

  deleteSection(courseId: string, sectionId: string) {
    return axiosClient.delete<{ message?: string }>(`/api/v1/courses/${courseId}/sections/${sectionId}`);
  },

  reorderSections(courseId: string, orderedIds: string[]) {
    return axiosClient.put<{ message?: string }>(`/api/v1/courses/${courseId}/sections/reorder`, { orderedIds });
  },

  createLesson(courseId: string, sectionId: string, payload: Partial<Lesson>) {
    return axiosClient.post<Lesson>(`/api/v1/courses/${courseId}/sections/${sectionId}/lessons`, payload);
  },

  updateLesson(courseId: string, sectionId: string, lessonId: string, payload: Partial<Lesson>) {
    return axiosClient.put<Lesson>(`/api/v1/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`, payload);
  },

  deleteLesson(courseId: string, sectionId: string, lessonId: string) {
    return axiosClient.delete<{ message?: string }>(`/api/v1/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`);
  },

  reorderLessons(courseId: string, sectionId: string, orderedIds: string[]) {
    return axiosClient.put<{ message?: string }>(`/api/v1/courses/${courseId}/sections/${sectionId}/lessons/reorder`, { orderedIds });
  },

  createResource(courseId: string, sectionId: string, lessonId: string, payload: { title: string; type: string; url: string }) {
    return axiosClient.post<Resource>(`/api/v1/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/resources`, payload);
  },

  deleteResource(courseId: string, sectionId: string, lessonId: string, resourceId: string) {
    return axiosClient.delete<{ message?: string }>(`/api/v1/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/resources/${resourceId}`);
  },

  createCoupon(courseId: string, payload: { code: string; discountType: string; discountValue: number; maxUses?: number; startAt?: string; endAt?: string }) {
    return axiosClient.post<{ message?: string }>(`/api/v1/courses/${courseId}/coupons`, payload);
  },

  getCoupons(courseId: string) {
    return axiosClient.get<{ items: unknown[] } | unknown[]>(`/api/v1/courses/${courseId}/coupons`);
  },

  deleteCoupon(courseId: string, couponId: string) {
    return axiosClient.delete<{ message?: string }>(`/api/v1/courses/${courseId}/coupons/${couponId}`);
  },

  uploadVideo(file: File) {
    const form = new FormData();
    form.append("file", file);
    return axiosClient.post<{ url: string }>("/api/v1/courses/upload/video", form);
  },

  uploadResource(file: File) {
    const form = new FormData();
    form.append("file", file);
    return axiosClient.post<{ url: string }>("/api/v1/courses/upload/resource", form);
  },

  uploadThumbnail(file: File) {
    const form = new FormData();
    form.append("file", file);
    return axiosClient.post<{ url: string }>("/api/v1/courses/upload/thumbnail", form);
  },

  deleteUpload(url: string) {
    return axiosClient.delete("/api/v1/courses/upload", { data: { url } }).catch(() => {});
  },
};
