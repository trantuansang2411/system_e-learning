export interface ApiError {
  code: string;
  message: string;
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: ApiError;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface User {
  id?: string;
  userId?: string;
  email?: string;
  fullName?: string;
  displayName?: string;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  headline?: string;
  experience?: string;
  expertise?: string;
  portfolioUrl?: string;
  teachingTopics?: string[];
  status?: string;
  payoutInfo?: {
    bankName?: string;
    accountNumber?: string;
    accountHolder?: string;
  };
  roles?: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

export interface RegisterResponse {
  email: string;
  requiresVerification: boolean;
  message: string;
}

export interface Course {
  courseId: string;
  instructorId?: string;
  instructorName?: string;
  title: string;
  slug?: string;
  description?: string;
  objectives?: string[];
  requirements?: string[];
  outcomes?: string[];
  topicId?: string;
  thumbnailUrl?: string;
  basePrice: number;
  salePrice?: number;
  currency?: string;
  status?: string;
  totalSections?: number;
  totalLessons?: number;
  totalDurationSec?: number;
  ratingAvg?: number;
  ratingCount?: number;
  publishedAt?: string;
}

export interface Section {
  _id: string;
  sectionId?: string; // UUID used for update/delete API calls
  courseId: string;
  title: string;
  orderIndex: number;
}

export interface Lesson {
  _id: string;
  lessonId?: string; // UUID used for update/delete API calls
  title: string;
  sectionId: string;
  orderIndex: number;
  durationSec?: number;
  isPreview?: boolean;
  videoUrl?: string;
}

export interface Resource {
  _id: string;
  resourceId?: string; // UUID used for delete API calls
  lessonId: string;
  title: string;
  type: string;
  url: string;
}

export interface CourseDetailResponse {
  course: Course;
  sections: Section[];
  lessons: Lesson[];
  resources?: Resource[];
}

export interface SearchParams {
  keyword?: string;
  topicId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minDurationSec?: number;
  maxDurationSec?: number;
  sortBy?: "price_asc" | "price_desc" | "rating";
  page?: number;
  limit?: number;
}

export interface CartItem {
  id: string;
  cartId: string;
  courseId: string;
  titleSnapshot: string;
  thumbnailUrl?: string;
  priceSnapshot: number;
  instructorId?: string;
  addedAt?: string;
}

export interface Cart {
  id: string;
  studentId: string;
  items: CartItem[];
}

export interface OrderItem {
  courseId: string;
  instructorId: string;
  titleSnapshot: string;
  originalPrice: number;
  finalPrice: number;
}

export interface Order {
  id: string;
  studentId: string;
  status: string;
  total: number;
  couponCode?: string | null;
  discountAmount?: number | null;
  paymentIntentId?: string;
  paidAt?: string;
  createdAt?: string;
  items: OrderItem[];
}

export interface CheckoutResponse {
  order: Order;
  paymentIntentId: string;
  checkoutUrl: string | null;
}

export interface PaymentIntent {
  id: string;
  type: string;
  studentId?: string;
  orderId?: string;
  amount: number;
  currency: string;
  provider: string;
  status: string;
  providerIntentId?: string;
  checkoutUrl?: string;
}

export interface Enrollment {
  studentId: string;
  courseId: string;
  instructorId: string;
  titleSnapshot: string;
  status: "ACTIVE" | "COMPLETED";
  progressPercent: number;
  enrolledAt: string;
  completedAt?: string | null;
}

export interface LessonProgress {
  studentId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  watchTimeSec: number;
  lastHeartbeatAt?: string;
}

export interface Review {
  _id: string;
  studentId: string;
  studentName?: string;
  studentAvatarUrl?: string;
  courseId: string;
  rating: number;
  comment?: string;
  status?: string;
  createdAt: string;
}

export interface ReviewStats {
  ratingAvg: number;
  ratingCount: number;
}

export interface Certificate {
  _id: string;
  studentId: string;
  courseId: string;
  enrollmentId: string;
  certificateNo: string;
  verificationUrl: string;
  issuedAt: string;
}

export interface WalletBalance {
  balance: number;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
  description: string;
  refType?: string;
  refId?: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: string;
}

export interface InstructorApplication {
  userId: string;
  data: Record<string, unknown>;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  avatarUrl?: string;
}
