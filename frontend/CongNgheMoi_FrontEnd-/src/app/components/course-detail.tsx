import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BookOpen, ChevronDown, ChevronUp, Clock, MessageSquare, Play, Send, ShoppingCart, Star, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { useLayoutContext } from "./layout";
import { formatPrice } from "../../utils/price";
import { getImageUrl } from "../../utils/url";
import { courseService } from "../../services/courseService";
import { learningService } from "../../services/learningService";
import { orderService } from "../../services/orderService";
import { reviewService } from "../../services/reviewService";
import { userService } from "../../services/userService";
import type { Review, User } from "../../types";
import { toFiniteNumber, toSafeInt } from "../../utils/number";

interface DisplayCourse {
  id: string;
  title: string;
  instructor: string;
  instructorId?: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  image: string;
  level: string;
  category: string;
  duration: string;
  description: string;
  sections: Array<{ id: string; title: string; orderIndex: number; lessons: Array<{ id: string; title: string; orderIndex: number; durationSec?: number }> }>;
}

interface DisplayLesson {
  id: string;
  title: string;
  durationSec?: number;
}

function getSectionLinkId(section: { _id: string; sectionId?: string }) {
  return section.sectionId || section._id;
}

function toDuration(totalSec?: number) {
  if (!totalSec) {
    return "0 giờ";
  }
  const hours = Math.round((totalSec / 3600) * 10) / 10;
  return `${hours} giờ`;
}

function formatReviewDate(date: string) {
  return new Date(date).toLocaleDateString("vi-VN");
}

function formatLessonDuration(durationSec?: number) {
  if (!durationSec || durationSec <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatSectionDuration(lessons: DisplayLesson[]) {
  const totalDurationSec = lessons.reduce((sum, lesson) => sum + (lesson.durationSec || 0), 0);
  const totalMinutes = Math.max(1, Math.round(totalDurationSec / 60));
  return `${totalMinutes}min`;
}

export function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, openLoginModal, setCartCount } = useLayoutContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [course, setCourse] = useState<DisplayCourse | null>(null);
  const [instructorProfile, setInstructorProfile] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState({ ratingAvg: 0, ratingCount: 0 });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadCourseData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const detail = await courseService.getCourseDetail(id);
        const courseRating = toFiniteNumber(detail.course.ratingAvg, 0);
        const courseReviews = toSafeInt(detail.course.ratingCount, 0);
        const courseBasePrice = toFiniteNumber(detail.course.basePrice, 0);
        const courseSalePrice = toFiniteNumber(detail.course.salePrice, courseBasePrice);
        const mapped: DisplayCourse = {
          id: detail.course.courseId,
          title: detail.course.title,
          instructor: detail.course.instructorName || "Giảng viên",
          instructorId: detail.course.instructorId,
          rating: courseRating,
          reviews: courseReviews,
          price: courseSalePrice,
          originalPrice: courseBasePrice,
          image: getImageUrl(detail.course.thumbnailUrl) || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
          level: "Tất cả trình độ",
          category: detail.course.topicId || "Khóa học",
          duration: toDuration(detail.course.totalDurationSec),
          description: detail.course.description || "",
          sections: detail.sections
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((section) => ({
              id: getSectionLinkId(section),
              title: section.title,
              orderIndex: section.orderIndex,
              lessons: detail.lessons
                .filter((lesson) => lesson.sectionId === getSectionLinkId(section))
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((lesson) => ({
                  id: lesson._id,
                  title: lesson.title,
                  durationSec: lesson.durationSec,
                  orderIndex: lesson.orderIndex,
                })),
            })),
        };

        setCourse(mapped);
        setExpandedSections(
          mapped.sections.reduce<Record<string, boolean>>((acc, section, index) => {
            acc[section.id] = index === 0;
            return acc;
          }, {}),
        );

        const [reviewsResponse, statsResponse] = await Promise.all([
          reviewService.getCourseReviews(detail.course.courseId, { page: 1, limit: 20 }),
          reviewService.getReviewStats(detail.course.courseId),
        ]);

        setReviews(reviewsResponse.items);
        setReviewStats({
          ratingAvg: toFiniteNumber(statsResponse.ratingAvg, 0),
          ratingCount: toSafeInt(statsResponse.ratingCount, 0),
        });

        if (detail.course.instructorId) {
          try {
            const instructor = await userService.getInstructorPublicProfile(detail.course.instructorId);
            setInstructorProfile(instructor);
          } catch {
            setInstructorProfile(null);
          }
        } else {
          setInstructorProfile(null);
        }
      } catch {
        setCourse(null);
        setInstructorProfile(null);
        setError("Không thể tải dữ liệu khóa học từ backend.");
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!course || !isLoggedIn) {
        setIsEnrolled(false);
        setCheckingEnrollment(false);
        return;
      }

      try {
        setCheckingEnrollment(true);
        await learningService.getEnrollment(course.id);
        setIsEnrolled(true);
      } catch {
        setIsEnrolled(false);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    void checkEnrollment();
  }, [course, isLoggedIn]);

  const chapterSummary = useMemo(() => {
    if (!course) {
      return { sections: 0, lessons: 0 };
    }
    return {
      sections: course.sections.length,
      lessons: course.sections.reduce((sum, section) => sum + section.lessons.length, 0),
    };
  }, [course]);

  const ratingDistribution = useMemo(() => {
    const counters: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
      const normalized = Math.max(1, Math.min(5, Math.round(review.rating)));
      counters[normalized] += 1;
    });

    const maxCount = Math.max(1, ...Object.values(counters));
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counters[star],
      percentage: (counters[star] / maxCount) * 100,
    }));
  }, [reviews]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleAddToCart = async () => {
    if (!course) {
      return;
    }
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    try {
      await orderService.addToCart(course.id);
      toast.success("Đã thêm vào giỏ hàng!");
      // Cập nhật số lượng trên navbar
      setCartCount(prev => prev + 1);
    } catch {
      toast.error("Không thể thêm vào giỏ hàng. Vui lòng thử lại.");
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/checkout");
  };

  const handleContinueLearning = () => {
    if (!course) {
      return;
    }
    navigate(`/student?tab=player&courseId=${course.id}`);
  };

  const handleSubmitReview = async () => {
    if (!course || !reviewText.trim()) {
      return;
    }
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    try {
      setSubmittingReview(true);
      await reviewService.createReview({
        courseId: course.id,
        rating: reviewRating,
        comment: reviewText.trim(),
      });
      const [reviewsResponse, statsResponse] = await Promise.all([
        reviewService.getCourseReviews(course.id, { page: 1, limit: 20 }),
        reviewService.getReviewStats(course.id),
      ]);
      setReviews(reviewsResponse.items);
      setReviewStats({
        ratingAvg: toFiniteNumber(statsResponse.ratingAvg, 0),
        ratingCount: toSafeInt(statsResponse.ratingCount, 0),
      });
      setReviewText("");
      setReviewRating(5);
      toast.success("Đánh giá của bạn đã được gửi!");
    } catch {
      toast.error("Không thể gửi đánh giá. Vui lòng kiểm tra trạng thái ghi danh.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Đang tải chi tiết khóa học...</div>;
  }

  if (!course) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Không tìm thấy khóa học.</div>;
  }

  const instructorDisplayName = (instructorProfile?.displayName || course.instructor || "Giảng viên").trim();
  const instructorHeadline = (instructorProfile?.headline || "Giảng viên").trim();
  const instructorBio = (instructorProfile?.bio || "").trim();
  const instructorExpertise = (instructorProfile?.expertise || "").trim();
  const instructorExperience = (instructorProfile?.experience || "").trim();
  const instructorAvatarUrl = getImageUrl(instructorProfile?.avatarUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-1">{course.category} / {course.level}</p>
      <h1 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{course.title}</h1>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-[#3dcbb1]">{instructorDisplayName}</span>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm" style={{ fontWeight: 600 }}>{(reviewStats.ratingAvg || course.rating).toFixed(1)}</span>
          <span className="text-sm text-gray-400">({reviewStats.ratingCount || course.reviews} đánh giá)</span>
        </div>
      </div>

      {error && <p className="text-sm text-amber-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6">
            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          </div>

          <div className="mb-6">
            <h2 className="text-lg mb-2" style={{ fontWeight: 700 }}>Mô tả khóa học</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg mb-3" style={{ fontWeight: 700 }}>Nội dung khóa học</h2>
            {course.sections.length === 0 ? (
              <p className="text-sm text-gray-500">Chưa có thông tin chương/bài học.</p>
            ) : (
              <>
                <div className="flex gap-3 text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2.5 mb-3 border">
                  <span>{chapterSummary.sections} chương</span>
                  <span>•</span>
                  <span>{chapterSummary.lessons} bài học</span>
                </div>
                <div className="space-y-2 border rounded-xl overflow-hidden">
                  {course.sections
                    .slice()
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((section, idx) => {
                      const isOpen = expandedSections[section.id];
                      const sortedLessons = section.lessons.slice().sort((a, b) => a.orderIndex - b.orderIndex);
                      return (
                        <div key={section.id} className={idx > 0 ? "border-t" : ""}>
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isOpen ? <ChevronUp size={15} className="shrink-0 text-gray-500" /> : <ChevronDown size={15} className="shrink-0 text-gray-500" />}
                              <span className="text-sm truncate" style={{ fontWeight: 600 }}>{section.title || "(Chưa đặt tên)"}</span>
                            </div>
                            <span className="text-xs text-gray-400 shrink-0 ml-3">
                              {sortedLessons.length} bài • {formatSectionDuration(sortedLessons)}
                            </span>
                          </button>
                          {isOpen && (
                            <div className="divide-y bg-white">
                              {sortedLessons.map((lesson) => (
                                <div key={lesson.id} className="flex items-center gap-3 px-5 py-2.5">
                                  <Play size={11} className="text-[#3dcbb1] shrink-0" />
                                  <span className="text-sm text-gray-700 flex-1">{lesson.title || "(Chưa đặt tên)"}</span>
                                  <span className="text-xs text-gray-400 shrink-0">{formatLessonDuration(lesson.durationSec)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-lg mb-3" style={{ fontWeight: 700 }}>Giảng viên</h2>
            <div className="border rounded-xl p-5 bg-gray-50 flex items-start gap-4">
              {instructorAvatarUrl ? (
                <img src={instructorAvatarUrl} alt={instructorDisplayName} className="h-14 w-14 rounded-full object-cover shrink-0" />
              ) : (
                <div className="h-14 w-14 rounded-full bg-[#176756] text-white flex items-center justify-center shrink-0 text-xl" style={{ fontWeight: 700 }}>
                  {instructorDisplayName ? instructorDisplayName.charAt(0).toUpperCase() : <UserIcon size={22} />}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-base text-[#17352e] mb-0.5" style={{ fontWeight: 700 }}>{instructorDisplayName}</p>
                <p className="text-sm text-[#3dcbb1] mb-2" style={{ fontWeight: 500 }}>{instructorHeadline}</p>
                {(instructorExpertise || instructorExperience) && (
                  <div className="mb-2 space-y-1">
                    {instructorExpertise ? <p className="text-sm text-gray-700">Chuyên môn: {instructorExpertise}</p> : null}
                    {instructorExperience ? <p className="text-sm text-gray-700">Kinh nghiệm: {instructorExperience}</p> : null}
                  </div>
                )}
                {instructorBio ? <p className="text-sm text-gray-600 leading-relaxed">{instructorBio}</p> : <p className="text-sm text-gray-400 italic">Thông tin giảng viên sẽ được cập nhật sớm.</p>}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare size={18} className="text-[#3dcbb1]" />
              <h2 className="text-xl" style={{ fontWeight: 700 }}>Đánh giá & Bình luận</h2>
              <span className="text-sm text-gray-400">({reviewStats.ratingCount || reviews.length} đánh giá)</span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border">
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-6 items-center">
                <div>
                  <p className="text-[52px] text-[#3dcbb1] leading-none" style={{ fontWeight: 700 }}>
                    {(reviewStats.ratingAvg || course.rating || 0).toFixed(1)}
                  </p>
                  <div className="flex gap-1 mt-2 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={star <= Math.round(reviewStats.ratingAvg || course.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{(reviewStats.ratingCount || reviews.length).toLocaleString("vi-VN")} đánh giá</p>
                </div>

                <div className="space-y-2.5">
                  {ratingDistribution.map((item) => (
                    <div key={item.star} className="grid grid-cols-[20px_16px_1fr_32px] items-center gap-2">
                      <span className="text-gray-600">{item.star}</span>
                      <Star size={13} className="text-yellow-400 fill-yellow-400" />
                      <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full rounded-full bg-[#f2b600]" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <span className="text-gray-500 text-right">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border rounded-xl p-5 mb-8 bg-white">
              <p className="text-base mb-4" style={{ fontWeight: 700 }}>Viết đánh giá của bạn</p>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-600">Đánh giá:</span>
                <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      className="p-0.5 transition-transform hover:scale-110"
                      aria-label={`Chọn ${star} sao`}
                    >
                      <Star
                        size={20}
                        className={star <= (hoverRating || reviewRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full border rounded-lg px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400"
                placeholder="Chia sẻ trải nghiệm của bạn về khóa học này..."
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSubmitReview}
                  disabled={submittingReview || !reviewText.trim()}
                  className="inline-flex items-center gap-2 bg-[#9ddfd4] text-white px-5 py-2.5 rounded-xl text-sm disabled:opacity-60"
                  style={{ fontWeight: 600 }}
                >
                  <Send size={15} />
                  {submittingReview ? "Đang gửi..." : "Gửi đánh giá"}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {reviews.length === 0 && <p className="text-sm text-gray-500">Chưa có đánh giá nào.</p>}
              {reviews.map((review) => (
                <div key={review._id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm" style={{ fontWeight: 600 }}>{review.studentName || "Học viên"}</span>
                    <span className="text-xs text-gray-400">{formatReviewDate(review.createdAt)}</span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{review.comment || "Không có nhận xét"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border rounded-[20px] p-6 sticky top-20 shadow-sm">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-[32px] tracking-tight" style={{ fontWeight: 800, color: '#111827' }}>{formatPrice(course.price)}</span>
              <span className="text-[17px] text-gray-400 line-through" style={{ fontWeight: 600 }}>{formatPrice(course.originalPrice)}</span>
            </div>
            {checkingEnrollment ? (
              <button disabled className="w-full bg-gray-100 text-gray-500 rounded-lg py-2.5 mb-4 text-sm" style={{ fontWeight: 600 }}>
                Đang kiểm tra ghi danh...
              </button>
            ) : isEnrolled ? (
              <button onClick={handleContinueLearning} className="w-full bg-[#3dcbb1] text-white rounded-lg py-2.5 mb-4 text-sm hover:bg-[#35b89f]" style={{ fontWeight: 600 }}>
                Tiếp tục học
              </button>
            ) : (
              <>
                <button onClick={handleAddToCart} className="w-full border-2 border-[#3dcbb1] text-[#3dcbb1] rounded-lg py-3 text-sm flex items-center justify-center gap-2 hover:bg-[#3dcbb1]/5" style={{ fontWeight: 600 }}>
                  <ShoppingCart size={16} /> Thêm vào giỏ hàng
                </button>
                <div className="h-3" />
                <button onClick={handleBuyNow} className="w-full bg-[#3dcbb1] text-white rounded-lg py-3 mb-4 text-sm hover:bg-[#35b89f]" style={{ fontWeight: 600 }}>
                  Mua ngay
                </button>
              </>
            )}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Clock size={14} /> {course.duration} nội dung</div>
              <div className="flex items-center gap-2"><BookOpen size={14} /> {chapterSummary.sections} chương • {chapterSummary.lessons} bài học</div>
              <div className="flex items-center gap-2"><Star size={14} /> Chứng chỉ hoàn thành</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
