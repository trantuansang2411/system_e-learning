import axiosClient from "./axiosClient";
import type { Course, PaginatedResponse, SearchParams } from "../types";

export const searchService = {
  searchCourses(params: SearchParams) {
    return axiosClient.get<PaginatedResponse<Course>>("/api/v1/search", { params });
  },
};
