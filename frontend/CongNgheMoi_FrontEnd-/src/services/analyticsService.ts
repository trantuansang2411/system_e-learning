import axiosClient from "./axiosClient";

export interface AnalyticsStats {
  total_views: number;
  total_searches: number;
  total_cart_adds: number;
  total_revenue: number;
  courses_completed: number;
}

export interface CourseViewStat {
  course_id: string;
  course_title: string;
  view_count: number;
}

export interface SearchStat {
  keyword: string;
  search_count: number;
}

export interface RevenueStats {
  today_revenue: number;
  today_purchases: number;
  total_revenue: number;
  total_purchases: number;
}

export interface CompletionStat {
  course_id: string;
  course_title: string;
  completion_count: number;
}

export interface SearchByHour {
  keyword: string;
  hour: string;
  count: number;
}

export interface FunnelStat {
  course_id: string;
  course_title: string;
  views: number;
  cart_adds: number;
  purchases: number;
  view_to_cart_rate: number;
  cart_to_purchase_rate: number;
  overall_conversion: number;
}

export interface ViewPerDay {
  day: string;
  views: number;
}

export type TimeRange = "today" | "7d" | "30d" | "thismonth";

export interface TimeseriesPoint {
  label: string;
  views: number;
  searches: number;
  cart_adds: number;
  purchases: number;
  revenue: number;
}

export interface TimeseriesData {
  range: TimeRange;
  granularity: "hour" | "day";
  data: TimeseriesPoint[];
}

export interface CourseRevenueStat {
  course_id: string;
  course_title: string;
  total_revenue: number;
  purchase_count: number;
}

export interface EnrollmentStat {
  course_id: string;
  course_title: string;
  enrollment_count: number;
  completion_count: number;
  completion_rate: number;
}

export const analyticsService = {
  getStats() {
    return axiosClient.get<AnalyticsStats>("/api/v1/analytics/stats");
  },

  getTopCourses(limit = 5) {
    return axiosClient.get<CourseViewStat[]>("/api/v1/analytics/top-courses", { params: { limit } });
  },

  getTopSearches(limit = 5) {
    return axiosClient.get<SearchStat[]>("/api/v1/analytics/top-searches", { params: { limit } });
  },

  getRevenue() {
    return axiosClient.get<RevenueStats>("/api/v1/analytics/revenue");
  },

  getCompletions() {
    return axiosClient.get<CompletionStat[]>("/api/v1/analytics/completions");
  },

  getSearchByHour() {
    return axiosClient.get<SearchByHour[]>("/api/v1/analytics/search-by-hour");
  },

  getFunnel(limit = 8) {
    return axiosClient.get<FunnelStat[]>("/api/v1/analytics/funnel", { params: { limit } });
  },

  getViewsPerDay(days = 7) {
    return axiosClient.get<ViewPerDay[]>("/api/v1/analytics/views-per-day", { params: { days } });
  },

  getRevenueByCourse() {
    return axiosClient.get<CourseRevenueStat[]>("/api/v1/analytics/revenue-by-course");
  },

  getEnrollmentStats() {
    return axiosClient.get<EnrollmentStat[]>("/api/v1/analytics/enrollment-stats");
  },

  getTimeseries(range: TimeRange = "7d") {
    return axiosClient.get<TimeseriesData>("/api/v1/analytics/timeseries", { params: { range } });
  },
};
