import { useEffect, useMemo, useState } from "react";
import { BookOpen, Loader2, Play, Search } from "lucide-react";
import { learningService } from "../../../services/learningService";
import type { Enrollment } from "../../../types";

type FilterType = "all" | "in-progress" | "completed" | "not-started";

interface Props {
  onOpenPlayer?: (courseId: string) => void;
}

export function StudentLearning({ onOpenPlayer }: Props) {
  const [items, setItems] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadMyLearning = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await learningService.getMyCourses({ page: 1, limit: 100 });
        setItems(res.items || []);
      } catch {
        setError("Không thể tải danh sách khóa học đang học.");
      } finally {
        setLoading(false);
      }
    };

    void loadMyLearning();
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return items.filter((item) => {
      const progress = item.progressPercent || 0;

      if (filter === "in-progress" && !(progress > 0 && progress < 100)) {
        return false;
      }
      if (filter === "completed" && progress !== 100) {
        return false;
      }
      if (filter === "not-started" && progress !== 0) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      return item.titleSnapshot.toLowerCase().includes(normalized);
    });
  }, [items, filter, query]);

  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter((item) => (item.progressPercent || 0) === 100).length;
    const inProgress = items.filter((item) => {
      const progress = item.progressPercent || 0;
      return progress > 0 && progress < 100;
    }).length;
    const avg = total > 0 ? Math.round(items.reduce((sum, item) => sum + (item.progressPercent || 0), 0) / total) : 0;

    return { total, completed, inProgress, avg };
  }, [items]);

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "Tất cả", count: items.length },
    { key: "in-progress", label: "Đang học", count: stats.inProgress },
    { key: "completed", label: "Hoàn thành", count: stats.completed },
    { key: "not-started", label: "Chưa bắt đầu", count: items.filter((item) => (item.progressPercent || 0) === 0).length },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl" style={{ fontWeight: 700 }}>Bảng điều khiển học tập</h1>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Khóa đã mua" value={stats.total} />
        <Stat label="Đang học" value={stats.inProgress} />
        <Stat label="Đã hoàn thành" value={stats.completed} />
        <Stat label="Tiến độ TB" value={`${stats.avg}%`} />
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm khóa học..."
            className="w-full rounded-lg border py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`rounded-full px-4 py-2 text-sm transition ${filter === item.key ? "bg-[#3dcbb1] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            style={{ fontWeight: filter === item.key ? 600 : 400 }}
          >
            {item.label} ({item.count})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
          Đang tải khóa học...
        </div>
      ) : error ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-amber-600">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-400">
          <BookOpen size={32} className="mx-auto mb-2 opacity-40" />
          Không có khóa học phù hợp.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => {
            const progress = course.progressPercent || 0;
            return (
              <button
                key={course.courseId}
                onClick={() => onOpenPlayer?.(course.courseId)}
                className="rounded-xl border bg-white p-4 text-left transition hover:shadow-md"
              >
                <p className="line-clamp-2 text-sm" style={{ fontWeight: 700 }}>{course.titleSnapshot}</p>
                <p className="mt-1 text-xs text-gray-500">Trạng thái: {course.status}</p>

                <div className="mt-3 h-2 rounded-full bg-gray-100">
                  <div className={`h-full rounded-full ${progress === 100 ? "bg-green-500" : "bg-[#3dcbb1]"}`} style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>{progress}%</span>
                  <span>{progress === 100 ? "Xem lại" : "Tiếp tục học"}</span>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#3dcbb1] px-3 py-2 text-xs text-white" style={{ fontWeight: 600 }}>
                  <Play size={12} /> Mở khóa học
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-2xl" style={{ fontWeight: 700 }}>{value}</p>
    </div>
  );
}
