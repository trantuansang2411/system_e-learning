import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CourseCard } from "./course-card";
import { courseService } from "../../services/courseService";
import type { Course } from "../../types";
import { useLayoutContext } from "./layout";
import { getThumbnailUrl } from "../../utils/url";

type FeaturedCourseCard = {
  id: number | string;
  title: string;
  instructor: string;
  rating: number;
  reviews?: number;
  price: number;
  originalPrice: number;
  image: string;
  discount?: string;
};

function toCardCourse(course: Course): FeaturedCourseCard {
  const price = course.salePrice ?? course.basePrice;
  return {
    id: course.courseId,
    title: course.title,
    instructor: course.instructorName || "Giảng viên",
    rating: course.ratingAvg ?? 0,
    reviews: course.ratingCount ?? 0,
    price,
    originalPrice: course.basePrice,
    image: getThumbnailUrl(course.thumbnailUrl, "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=340&fit=crop"),
    discount: course.basePrice > price ? `${Math.round(((course.basePrice - price) / course.basePrice) * 100)}%` : "",
  };
}

export function LandingPage() {
  const { openSignupModal } = useLayoutContext();
  const heroSlides = [
    {
      title: "Học điều mới\nmỗi ngày.",
      subtitle: "Sẵn sàng bứt phá sự nghiệp với hàng nghìn khóa học thực chiến từ các chuyên gia hàng đầu, lộ trình học được thiết kế rõ ràng theo từng cấp độ và cộng đồng học viên luôn đồng hành để bạn giữ được động lực học mỗi ngày.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=720&fit=crop",
      imageAlt: "Học viên học trực tuyến",
    },
    {
      title: "Nâng cấp kỹ năng\ntrong 30 phút mỗi ngày.",
      subtitle: "Theo dõi lộ trình học cá nhân hóa, học mọi lúc mọi nơi trên mọi thiết bị, nhận bài tập thực hành ngắn gọn sau mỗi buổi học và tích lũy chứng chỉ giá trị để làm đẹp hồ sơ nghề nghiệp của bạn.",
      image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=1200&h=720&fit=crop",
      imageAlt: "Màn hình lập trình và học tập",
    },
    {
      title: "Từ người mới\nđến chuyên gia thực thụ.",
      subtitle: "Học theo dự án thật, được mentor hỗ trợ trong suốt quá trình hoàn thiện sản phẩm, xây dựng portfolio chuyên nghiệp và sẵn sàng gia nhập thị trường việc làm công nghệ với kỹ năng thực chiến vững vàng.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=720&fit=crop",
      imageAlt: "Không gian học tập công nghệ",
    },
  ];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [featuredCourses, setFeaturedCourses] = useState<FeaturedCourseCard[]>([]);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [signupEmail, setSignupEmail] = useState("");

  useEffect(() => {
    const loadPublishedCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await courseService.getPublishedCourses({ page: 1, limit: 20 });
        const mapped = response.items.map(toCardCourse);
        setFeaturedCourses(mapped);
      } catch {
        setError("Không thể tải danh sách khóa học từ server.");
        setFeaturedCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadPublishedCourses();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const activeHeroSlide = heroSlides[currentHeroSlide];

  const handleOpenSignupModal = () => {
    openSignupModal(signupEmail);
  };

  return (
    <div className="bg-[#f4f8f6] text-[#17352e]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#e8f3ef] via-[#d9ece5] to-[#c8e4dc] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] overflow-hidden rounded-2xl bg-[#e1f0ea] shadow-[0_20px_45px_rgba(16,58,49,0.12)]">
            <div className="px-6 py-8 md:px-12 md:py-14">
              <h1 className="text-4xl leading-[1.15] md:text-6xl text-[#103a31] mb-4 whitespace-pre-line" style={{ fontWeight: 700 }}>
                {activeHeroSlide.title}
              </h1>
              <p className="text-xl text-[#2d5a50] mb-8 max-w-2xl">
                {activeHeroSlide.subtitle}
              </p>

              <div className="flex items-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroSlide(index)}
                    aria-label={`Chuyển tới slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${currentHeroSlide === index ? "w-10 bg-[#176756]" : "w-2.5 bg-[#93bdb2]"}`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:block bg-[#143a32]">
              <img
                src={activeHeroSlide.image}
                alt={activeHeroSlide.imageAlt}
                className="h-full w-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses section */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-end justify-between mb-1">
          <h2 className="text-xl" style={{ fontWeight: 700 }}>Khoá học thịnh hành</h2>
          <Link to="/search" className="text-sm text-[#176756] hover:underline" style={{ fontWeight: 600 }}>
            Xem tất cả →
          </Link>
        </div>
        <p className="text-sm text-gray-500 mb-4">Chúng tôi chọn những khoá học tốt nhất cho bạn.</p>
        {error && <p className="text-sm text-amber-600 mb-3">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="rounded-lg border h-[260px] animate-pulse bg-gray-100" />
            ))
            : featuredCourses.slice(0, 8).map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
        </div>
        {!loading && featuredCourses.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">Hiện chưa có khóa học nào.</p>
        )}
      </section>

      {/* Instructors */}
      <section className="max-w-7xl mx-auto px-4 mt-12 mb-12">
        <h2 className="text-xl mb-1" style={{ fontWeight: 700 }}>Giảng viên nổi bật</h2>
        <p className="text-sm text-gray-500 mb-4">Dữ liệu giảng viên nổi bật đang được cập nhật.</p>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#114f46] via-[#1a6f64] to-[#2e9d8d] text-white px-6 py-8 md:px-14 md:py-12">
          <div className="absolute right-[16%] top-1/2 hidden md:block h-[350px] w-[350px] -translate-y-1/2 rounded-full border border-white/15" />
          <div className="absolute right-[20%] top-1/2 hidden md:block h-[280px] w-[280px] -translate-y-1/2 rounded-full border border-white/20" />

          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
              <h2 className="text-3xl leading-tight mb-4 md:text-5xl" style={{ fontWeight: 700 }}>
                Tham gia và nhận
                <br />
                ưu đãi hấp dẫn
              </h2>
              <p className="text-lg text-[#d8fff7] mb-7 leading-relaxed">
                Hàng nghìn khóa học chất lượng đang chờ bạn. Đăng ký ngay để nhận thông báo về các khóa học mới và ưu đãi độc quyền.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center max-w-xl">
                <div className="flex-1 rounded-2xl border border-white/25 bg-white/15 px-5 py-3 backdrop-blur-[2px]">
                  <p className="text-sm text-[#ddfff8] mb-1" style={{ fontWeight: 600 }}>Email của bạn</p>
                  <input
                    value={signupEmail}
                    onChange={(event) => setSignupEmail(event.target.value)}
                    placeholder="example@email.com"
                    className="w-full bg-transparent text-xl text-white placeholder:text-[#b8e9df] outline-none"
                  />
                </div>
                <button onClick={handleOpenSignupModal} className="h-[72px] rounded-2xl bg-[#113b33] px-9 text-xl text-white transition hover:bg-[#0d2f29]" style={{ fontWeight: 700 }}>
                  Đăng ký
                </button>
              </div>

              <p className="mt-5 text-base text-[#bee9df]">Chúng tôi cam kết bảo mật thông tin của bạn.</p>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="h-[290px] w-[290px] rounded-full border-[6px] border-[#6fe5d4] shadow-[0_20px_40px_rgba(0,0,0,0.18)] overflow-hidden bg-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=600&fit=crop"
                    alt="Student learning"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}