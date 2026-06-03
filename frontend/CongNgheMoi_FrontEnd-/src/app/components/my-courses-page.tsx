import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Star, Play, Clock, BookOpen } from "lucide-react";
import { learningService } from "../../services/learningService";

interface PurchasedCourse {
  id: string;
  title: string;
  instructor: string;
  image: string;
  rating: number;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  purchaseDate: string;
}

type Filter = "all" | "in-progress" | "completed" | "not-started";

export function MyCoursesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [myCourses, setMyCourses] = useState<PurchasedCourse[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await learningService.getMyCourses({ page: 1, limit: 30 });
        setMyCourses(response.items.map((course) => ({
          id: course.courseId,
          title: course.titleSnapshot,
          instructor: "Giảng viên",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
          rating: 4.5,
          progress: course.progressPercent,
          totalLessons: 100,
          completedLessons: Math.round(course.progressPercent),
          duration: "Đang cập nhật",
          purchaseDate: new Date(course.enrolledAt).toLocaleDateString("vi-VN"),
        })));
      } catch {
        setError("Không thể tải danh sách khóa học đã mua.");
        setMyCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filtered = myCourses.filter((c) => {
    if (filter === "in-progress") return c.progress > 0 && c.progress < 100;
    if (filter === "completed") return c.progress === 100;
    if (filter === "not-started") return c.progress === 0;
    return true;
  });

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "in-progress", label: "Đang học" },
    { key: "completed", label: "Hoàn thành" },
    { key: "not-started", label: "Chưa bắt đầu" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl mb-1" style={{ fontWeight: 700 }}>Khoá học của tôi</h1>
      <p className="text-sm text-gray-500 mb-6">Quản lý và tiếp tục học các khoá học bạn đã mua</p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              filter === f.key
                ? "bg-[#3dcbb1] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontWeight: filter === f.key ? 600 : 400 }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-amber-600 mb-4">{error}</p>}

      {loading ? (
        <div className="text-center py-16 text-gray-400">Đang tải khóa học...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <BookOpen size={48} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Không có khoá học nào trong mục này</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                {course.progress === 100 && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
                    ✓ Hoàn thành
                  </div>
                )}
                {course.progress > 0 && course.progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div className="h-full bg-[#3dcbb1] transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-sm mb-1 line-clamp-2" style={{ fontWeight: 600 }}>{course.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{course.instructor}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play size={12} />
                    <span>{course.completedLessons}/{course.totalLessons} bài</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="bg-gray-100 rounded-full h-2 mb-2">
                  <div
                    className={`h-full rounded-full transition-all ${course.progress === 100 ? "bg-green-500" : "bg-[#3dcbb1]"}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{course.progress}% hoàn thành</span>
                  <span className="text-xs text-[#3dcbb1]" style={{ fontWeight: 600 }}>
                    {course.progress === 0 ? "Bắt đầu học" : course.progress === 100 ? "Xem lại" : "Tiếp tục học"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
