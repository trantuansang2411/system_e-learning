export interface Resource {
  id: string;       // local React key
  apiId?: string;   // resourceId UUID from DB — used for delete API calls
  type: "FILE" | "LINK";
  name: string;
  url: string;
}

export interface Lesson {
  id: string;       // local React key (may equal _id when loaded from DB)
  apiId?: string;   // lessonId UUID from DB — used for delete/update API calls
  title: string;
  orderIndex: number;
  videoUrl: string;
  durationSec: number;
  isPreview: boolean;
  resources: Resource[];
}

export interface Section {
  id: string;       // local React key (may equal _id when loaded from DB)
  apiId?: string;   // sectionId UUID from DB — used for delete/update API calls
  title: string;
  orderIndex: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  courseId?: string; // real DB courseId — present when editing an existing course
  title: string;
  slug: string;
  description: string;
  objectives: string[];
  requirements: string[];
  outcomes: string[];
  topicId: string;
  thumbnailUrl: string;
  basePrice: number;
  salePrice: number;
  sections: Section[];
  coupons: Coupon[];
  status: "DRAFT" | "SUBMITTED" | "NEEDS_FIXES" | "PUBLISHED" | "REJECTED" | "PENDING" | "APPROVED";
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  expiresAt: string; // ISO date string, empty = forever
  maxUsage: number; // 0 = unlimited
}

export interface InstructorProfile {
  fullName: string;
  dob: string;
  shortBio: string;
  experience: string;
  expertise: string;
  education: string;
  portfolioUrl: string;
  certificates: string;
  avatarUrl: string;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const topicOptions = [
  { value: "web", label: "Lập trình Web" },
  { value: "mobile", label: "Lập trình Mobile" },
  { value: "design", label: "Thiết kế" },
  { value: "data", label: "Khoa học dữ liệu" },
  { value: "marketing", label: "Marketing" },
  { value: "photo", label: "Nhiếp ảnh" },
];