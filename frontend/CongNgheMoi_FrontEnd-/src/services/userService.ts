import axiosClient from "./axiosClient";
import type { InstructorApplication, User } from "../types";
import { ensureTokenFresh } from "../utils/tokenManager";

export const userService = {
  getProfile() {
    return axiosClient.get<User>("/api/v1/users/me");
  },

  updateProfile(payload: Partial<User>) {
    return axiosClient.put<User>("/api/v1/users/me", payload);
  },

  getInstructorPublicProfile(userId: string) {
    return axiosClient.get<User>(`/api/v1/users/instructor/${userId}`);
  },

  applyInstructor(payload: {
    fullName: string;
    headline: string;
    experience: string;
    expertise: string;
    educationLevel: string;
    teachingTopics: string[];
    portfolioUrl: string;
    birthDate: string;
  }, profileImage?: File) {
    // If profile image provided, use FormData for multipart request
    if (profileImage) {
      return ensureTokenFresh().then(() => {
        const formData = new FormData();

        // Add all form fields
        formData.append('fullName', payload.fullName);
        formData.append('headline', payload.headline);
        formData.append('experience', payload.experience);
        formData.append('expertise', payload.expertise);
        formData.append('educationLevel', payload.educationLevel);
        formData.append('portfolioUrl', payload.portfolioUrl);
        formData.append('birthDate', payload.birthDate);

        // Add teaching topics array
        payload.teachingTopics.forEach((topic) => {
          formData.append('teachingTopics', topic);
        });

        // Add profile image file
        formData.append('profileImage', profileImage);

        return axiosClient.post<{ message?: string }>("/api/v1/users/instructor/apply", formData);
      });
    }

    // Otherwise use JSON (backward compatible)
    return axiosClient.post<{ message?: string }>("/api/v1/users/instructor/apply", payload);
  },

  getApplicationStatus() {
    return axiosClient.get<InstructorApplication>("/api/v1/users/instructor/application");
  },

  getInstructorProfile() {
    return axiosClient.get<User>("/api/v1/users/instructor/me");
  },

  updateInstructorProfile(payload: Partial<User>) {
    return axiosClient.put<User>("/api/v1/users/instructor/me", payload);
  },

  uploadUserAvatar(file: File) {
    return ensureTokenFresh().then(() => {
      const formData = new FormData();
      formData.append("avatar", file);
      return axiosClient.post<User>("/api/v1/users/me/avatar", formData);
    });
  },

  uploadInstructorAvatar(file: File) {
    return ensureTokenFresh().then(() => {
      const formData = new FormData();
      formData.append("avatar", file);
      return axiosClient.post<User>("/api/v1/users/instructor/me/avatar", formData);
    });
  },
};
