import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { BookOpen, CheckCircle2, Clock, FileText, FileWarning, Loader2, Play, ChevronDown, ChevronUp, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { adminService } from "../../../services/adminService";
import { formatPrice } from "../../../utils/price";
import { getImageUrl, getMediaUrl } from "../../../utils/url";
import type { Course, CourseDetailResponse } from "../../../types";

function formatDuration(sec: number) {
  const m = Math.floor((sec || 0) / 60);
  const s = (sec || 0) % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const PAGE_SIZE = 10;

export function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<CourseDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [actingCourseId, setActingCourseId] = useState<string | null>(null);
  const [status, setStatus] = useState<"ALL" | "SUBMITTED" | "NEEDS_FIXES" | "PUBLISHED">("ALL");
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const loadCourses = async (p: number, s: typeof status) => {
    try {
      setLoading(true);
      setError("");
      const res = await adminService.getSubmittedCourses({
        status: s === "ALL" ? undefined : s,
        page: p,
        limit: PAGE_SIZE,
      });
      setCourses((res.items || []) as Course[]);
      setTotal(res.total || 0);
    } catch {
      setError("Không thể tải danh sách khóa học.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCourses(page, status);
  }, [page, status]);

  const handleStatusChange = (s: typeof status) => {
    setStatus(s);
    setPage(1);
  };

  const stats = useMemo(() => ({
    total,
    lessons: courses.reduce((sum, c) => sum + (c.totalLessons || 0), 0),
    sections: courses.reduce((sum, c) => sum + (c.totalSections || 0), 0),
  }), [total, courses]);

  const loadCourseDetail = async (courseId: string) => {
    try {
      setDetailLoading(true);
      const detail = await adminService.getCourseReviewDetail(courseId);
      setSelected(detail);
    } finally {
      setDetailLoading(false);
    }
  };

  const handlePublish = async (courseId: string) => {
    setActingCourseId(courseId);
    try {
      await Promise.race([
        adminService.publishCourse(courseId),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 30000)),
      ]);
      toast.success("Đã xuất bản khoá học thành công!");
      setSelected(null);
      await loadCourses(page, status);
    } catch (err: unknown) {
      const isTimeout = (err as Error)?.message === 'TIMEOUT';
      toast.error(isTimeout ? "Yêu cầu hết thời gian. Vui lòng thử lại." : "Không thể xuất bản khoá học. Vui lòng thử lại.");
    } finally {
      setActingCourseId(null);
    }
  };

  const handleNeedsFixes = async (courseId: string) => {
    setActingCourseId(courseId);
    try {
      await Promise.race([
        adminService.needsFixes(courseId),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 30000)),
      ]);
      toast.success("Đã trả về cho giảng viên sửa!");
      setSelected(null);
      await loadCourses(page, status);
    } catch (err: unknown) {
      const isTimeout = (err as Error)?.message === 'TIMEOUT';
      toast.error(isTimeout ? "Yêu cầu hết thời gian. Vui lòng thử lại." : "Không thể trả về. Vui lòng thử lại.");
    } finally {
      setActingCourseId(null);
    }
  };

  if (selected) {
    const totalLessons = selected.lessons.length;
    const totalSections = selected.sections.length;
    const totalDuration = selected.lessons.reduce((s, l) => s + (l.durationSec || 0), 0);
    const isActing = actingCourseId === selected.course.courseId;
    const c = selected.course;

    return (
      <div className="max-w-4xl">
        <button onClick={() => { setSelected(null); setExpandedLessonId(null); }} className="mb-5 text-sm text-gray-500 hover:text-gray-700">
          ← Quay lại danh sách
        </button>

        {/* Header card */}
        <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl p-8 text-white mb-6">
          <p className="text-xs text-[#3dcbb1] mb-2 uppercase tracking-wider">{c.topicId || "Khoá học"}</p>
          <h2 className="text-2xl mb-3" style={{ fontWeight: 700 }}>{c.title}</h2>
          <p className="text-white/70 text-sm mb-4 max-w-xl">{c.description || "Không có mô tả."}</p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1"><BookOpen size={14} /> {totalLessons} bài học</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {formatDuration(totalDuration)}</span>
            <span>{totalSections} chương</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            {(c.salePrice ?? 0) > 0 && <span className="text-xl" style={{ fontWeight: 700 }}>{formatPrice(c.salePrice!)}</span>}
            {(c.basePrice ?? 0) > 0 && (
              <span className={`text-sm ${(c.salePrice ?? 0) > 0 ? "line-through text-white/40" : "text-xl font-bold"}`}>
                {formatPrice(c.basePrice)}
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        {c.thumbnailUrl && (
          <div className="mb-6">
            <h3 className="text-sm mb-2" style={{ fontWeight: 600 }}>Thumbnail</h3>
            <img src={getImageUrl(c.thumbnailUrl)} alt="thumbnail" className="w-80 h-44 object-cover rounded-xl border" />
          </div>
        )}

        {/* Objectives / Requirements / Outcomes */}
        {((c.objectives && c.objectives.length > 0) || (c.requirements && c.requirements.length > 0) || (c.outcomes && c.outcomes.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Mục tiêu", items: c.objectives || [], color: "text-green-600" },
              { label: "Yêu cầu", items: c.requirements || [], color: "text-orange-600" },
              { label: "Kết quả", items: c.outcomes || [], color: "text-blue-600" },
            ].map((block) => (
              <div key={block.label} className="border rounded-xl p-4">
                <h3 className="text-sm mb-2" style={{ fontWeight: 600 }}>{block.label}</h3>
                <ul className="space-y-1">
                  {block.items.filter(Boolean).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} className={`${block.color} mt-0.5 shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Curriculum with video player */}
        <div className="border rounded-xl overflow-hidden mb-6">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="text-sm" style={{ fontWeight: 600 }}>Nội dung khoá học</h3>
          </div>
          {selected.sections
            .slice()
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((section) => {
              const lessons = selected.lessons
                .filter((l) => l.sectionId === section._id)
                .sort((a, b) => a.orderIndex - b.orderIndex);
              return (
                <div key={section._id} className="border-b last:border-0">
                  <div className="px-4 py-3 bg-white flex items-center justify-between">
                    <span className="text-sm" style={{ fontWeight: 600 }}>
                      Chương {section.orderIndex + 1}: {section.title}
                    </span>
                    <span className="text-xs text-gray-400">{lessons.length} bài</span>
                  </div>
                  {lessons.map((lesson) => {
                    const isExpanded = expandedLessonId === lesson._id;
                    const videoSrc = lesson.videoUrl ? getMediaUrl(lesson.videoUrl) : "";
                    const isLocalVideo = lesson.videoUrl && !lesson.videoUrl.startsWith("http");
                    const lessonResources = (selected.resources || []).filter(
                      (r) => r.lessonId === lesson._id || r.lessonId === lesson.lessonId
                    );
                    return (
                      <div key={lesson._id} className="border-t border-gray-100">
                        <button
                          onClick={() => setExpandedLessonId(isExpanded ? null : lesson._id)}
                          className="w-full px-4 py-2 pl-8 flex items-center justify-between bg-white hover:bg-gray-50 text-left"
                        >
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Play size={12} />
                            <span>Bài {lesson.orderIndex + 1}: {lesson.title}</span>
                            {lesson.isPreview && (
                              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Xem trước</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            {lesson.durationSec && lesson.durationSec > 0 && (
                              <span className="flex items-center gap-1"><Clock size={11} />{formatDuration(lesson.durationSec)}</span>
                            )}
                            {lesson.videoUrl && (
                              <span className="flex items-center gap-1 text-blue-500"><FileText size={11} />Video</span>
                            )}
                            {lessonResources.length > 0 && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Paperclip size={10} /> {lessonResources.length} tài liệu
                              </span>
                            )}
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </div>
                        </button>
                        {isExpanded && (lesson.videoUrl || lessonResources.length > 0) && (
                          <div className="px-8 py-4 bg-gray-50">
                            {lesson.videoUrl && (
                              <div className="mb-4">
                                {isLocalVideo ? (
                                  <video controls className="w-full max-w-2xl rounded-lg border" preload="metadata">
                                    <source src={videoSrc} />
                                    Trình duyệt không hỗ trợ phát video.
                                  </video>
                                ) : (
                                  <div className="text-sm text-gray-600">
                                    <a href={videoSrc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                                      <Play size={14} /> Xem video: {lesson.videoUrl}
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
                            {lessonResources.length > 0 && (
                              <div>
                                <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                  <Paperclip size={13} /> Tài liệu đính kèm
                                </h4>
                                <div className="space-y-2">
                                  {lessonResources.map((res) => (
                                    <div key={res._id || res.resourceId} className="flex items-center gap-2 p-2 bg-white rounded border text-xs">
                                      <FileText size={14} className="text-gray-500" />
                                      <span className="flex-1 text-gray-700">{res.title || "Tài liệu không tên"}</span>
                                      <a
                                        href={getMediaUrl(res.url)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-xs"
                                      >
                                        Tải về
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {lessons.length === 0 && (
                    <p className="px-8 py-2 text-xs text-gray-400 border-t border-gray-100">Chưa có bài học.</p>
                  )}
                </div>
              );
            })}
        </div>

        {/* Actions - only show for SUBMITTED or NEEDS_FIXES */}
        {(c.status === "SUBMITTED" || c.status === "NEEDS_FIXES") && (
          <div className="flex gap-2">
            <button
              onClick={() => { void handleNeedsFixes(selected.course.courseId); }}
              disabled={isActing}
              className="rounded-lg border border-orange-200 px-4 py-2 text-sm text-orange-700 hover:bg-orange-50 disabled:opacity-50"
              style={{ fontWeight: 600 }}
            >
              Yêu cầu sửa
            </button>
            <button
              onClick={() => { void handlePublish(selected.course.courseId); }}
              disabled={isActing}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
              style={{ fontWeight: 600 }}
            >
              {isActing ? <Loader2 size={14} className="animate-spin inline mr-1" /> : null}
              Duyệt xuất bản
            </button>
          </div>
        )}

        {/* Published status indicator */}
        {c.status === "PUBLISHED" && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
            <CheckCircle2 size={18} className="text-green-600" />
            <p className="text-sm text-green-700" style={{ fontWeight: 600 }}>Khoá học đã được xuất bản và đang hoạt động.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {([
          { key: "ALL", label: "Tất cả" },
          { key: "SUBMITTED", label: "Chờ duyệt" },
          { key: "NEEDS_FIXES", label: "Cần sửa" },
          { key: "PUBLISHED", label: "Đã công bố" },
        ] as const).map((item) => (
          <button
            key={item.key}
            onClick={() => handleStatusChange(item.key)}
            className={`rounded-full px-4 py-2 font-semibold transition ${status === item.key ? "bg-[#1a1a2e] text-white text-base" : "border bg-white text-gray-600 hover:bg-gray-50 text-sm"
              }`}
            style={{
              fontWeight: status === item.key ? 700 : 400,
              color: status === item.key ? "#FFFFFF" : undefined
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <InfoCard label="Khóa học" value={stats.total} icon={<FileWarning size={14} className="text-yellow-600" />} />
        <InfoCard label="Tổng chương" value={stats.sections} icon={<CheckCircle2 size={14} className="text-blue-600" />} />
        <InfoCard label="Tổng bài học" value={stats.lessons} icon={<CheckCircle2 size={14} className="text-green-600" />} />
      </div>

      {loading ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
          Đang tải dữ liệu...
        </div>
      ) : error ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-amber-600">{error}</div>
      ) : courses.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-400">Không có khóa học nào.</div>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => {
            // Normalize status to uppercase to handle gRPC lowercase
            const statusUpper = (course.status || "").toUpperCase();
            const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
              SUBMITTED: { label: "Chờ duyệt", color: "text-blue-700", bg: "bg-blue-100" },
              NEEDS_FIXES: { label: "Cần sửa", color: "text-orange-700", bg: "bg-orange-100" },
              PUBLISHED: { label: "Đã công bố", color: "text-green-700", bg: "bg-green-100" },
              DRAFT: { label: "Nháp", color: "text-gray-700", bg: "bg-gray-100" },
            };
            const badge = statusConfig[statusUpper] || null;

            return (
              <button
                key={course.courseId}
                onClick={() => {
                  void loadCourseDetail(course.courseId);
                }}
                className="w-full rounded-xl border bg-white p-4 text-left hover:shadow-sm relative"
              >
                {/* Status badge */}
                {badge && (
                  <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold ${badge.bg} ${badge.color}`}>
                    {badge.label}
                  </span>
                )}

                <p className="text-sm pr-24" style={{ fontWeight: 700 }}>{course.title}</p>
                <p className="mt-1 text-xs text-gray-500">{course.instructorName || "Chưa cập nhật giảng viên"}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                  <span>{course.totalSections || 0} chương</span>
                  <span>{course.totalLessons || 0} bài học</span>
                  <span>{formatPrice(course.salePrice || course.basePrice || 0)}</span>
                </div>
              </button>
            );
          })}
          {detailLoading ? <p className="text-xs text-gray-500">Đang tải chi tiết khóa học...</p> : null}
        </div>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce<(number | "...")[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="px-2 text-sm text-gray-400">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${page === p ? "bg-[#1a1a2e]" : "border text-gray-600 hover:bg-gray-50"}`}
                  style={page === p ? { color: "#FFFFFF" } : undefined}
                >
                  {p}
                </button>
              )
            )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
        {icon}
        {label}
      </div>
      <p className="text-2xl" style={{ fontWeight: 700 }}>{value}</p>
    </div>
  );
}
