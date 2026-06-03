import axiosClient from "./axiosClient";
import type { CourseDetailResponse, InstructorApplication, PaginatedResponse } from "../types";

export const adminService = {
  getApplications(params: { status?: "PENDING" | "APPROVED" | "REJECTED"; page?: number; limit?: number } = {}) {
    return axiosClient.get<PaginatedResponse<InstructorApplication>>("/api/v1/admin/applications", { params });
  },

  getApplicationDetail(applicationId: string) {
    return axiosClient.get<InstructorApplication>(`/api/v1/admin/applications/${applicationId}`);
  },

  approveInstructor(userId: string) {
    return axiosClient.post<{ message?: string }>(`/api/v1/admin/instructors/${userId}/approve`);
  },

  rejectInstructor(userId: string) {
    return axiosClient.post<{ message?: string }>(`/api/v1/admin/instructors/${userId}/reject`);
  },

  banInstructor(userId: string) {
    return axiosClient.post<{ message?: string }>(`/api/v1/admin/instructors/${userId}/ban`);
  },

  unbanInstructor(userId: string) {
    return axiosClient.post<{ message?: string }>(`/api/v1/admin/instructors/${userId}/unban`);
  },

  getSubmittedCourses(params: { status?: "SUBMITTED" | "NEEDS_FIXES" | "PUBLISHED"; page?: number; limit?: number } = {}) {
    return axiosClient.get<PaginatedResponse<unknown>>("/api/v1/admin/courses/submitted", { params });
  },

  async getCourseReviewDetail(courseId: string): Promise<CourseDetailResponse> {
    // gRPC response uses 'id' instead of '_id' for sections, lessons, & resources — normalize here
    const raw = await axiosClient.get<CourseDetailResponse>(`/api/v1/admin/courses/${courseId}/review-detail`);
    const data = raw as unknown as Record<string, unknown>;
    interface GrpcSection { id?: string; _id?: string; sectionId?: string; courseId?: string; title: string; orderIndex: number }
    interface GrpcLesson { id?: string; _id?: string; lessonId?: string; sectionId?: string; title: string; orderIndex: number; durationSec?: number; isPreview?: boolean; videoUrl?: string }
    interface GrpcResource { id?: string; _id?: string; resourceId?: string; lessonId?: string; title: string; type: string; url: string }
    const sections = ((data.sections || []) as GrpcSection[]).map((s) => ({
      ...s,
      _id: s._id || s.id || s.sectionId || "",
    }));
    const lessons = ((data.lessons || []) as GrpcLesson[]).map((l) => ({
      ...l,
      _id: l._id || l.id || l.lessonId || "",
    }));
    const resources = ((data.resources || []) as GrpcResource[]).map((r) => ({
      ...r,
      _id: r._id || r.id || r.resourceId || "",
    }));
    return { course: data.course as CourseDetailResponse["course"], sections, lessons, resources } as CourseDetailResponse;
  },

  publishCourse(courseId: string) {
    return axiosClient.post<{ message?: string }>(`/api/v1/admin/courses/${courseId}/publish`);
  },

  needsFixes(courseId: string) {
    return axiosClient.post<{ message?: string }>(`/api/v1/admin/courses/${courseId}/needs-fixes`);
  },
};
