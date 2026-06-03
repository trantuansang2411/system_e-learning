import { useEffect, useMemo, useState } from "react";
import { Loader2, Pencil, Plus, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { courseService } from "../../../services/courseService";
import { reviewService } from "../../../services/reviewService";
import { formatPrice } from "../../../utils/price";
import { toFiniteNumber, toSafeInt } from "../../../utils/number";
import type { Course, Lesson, Resource, Section } from "../../../types";
import { CourseEditor } from "./course-editor";
import type { Course as EditorCourse, Lesson as EditorLesson, Resource as EditorResource, Section as EditorSection } from "./instructor-types";

interface Props {
  onCreateCourse?: () => void;
  onEditCourse?: (courseId: string) => void;
}

export function InstructorCoursesPage({ onCreateCourse, onEditCourse }: Props) {
  const [items, setItems] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actingId, setActingId] = useState<string | null>(null);
  const [ratingByCourseId, setRatingByCourseId] = useState<Record<string, string>>({});
  const [showEditor, setShowEditor] = useState(false);
  const [editorLoading, setEditorLoading] = useState(false);
  const [editorCourse, setEditorCourse] = useState<EditorCourse | undefined>(undefined);

  const mapStatusToEditor = (status?: string): EditorCourse["status"] => {
    if (status === "SUBMITTED") return "PENDING";
    if (status === "PUBLISHED") return "APPROVED";
    if (status === "REJECTED" || status === "NEEDS_FIXES") return "REJECTED";
    return "DRAFT";
  };

  const mapSectionToEditor = (section: Section, lessons: Lesson[], resourcesByLessonId: Record<string, EditorResource[]>) => {
    const mappedLessons: EditorLesson[] = lessons
      .filter((lesson) => lesson.sectionId === section._id)
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((lesson) => ({
        id: lesson._id,
        title: lesson.title,
        orderIndex: lesson.orderIndex,
        videoUrl: lesson.videoUrl || "",
        durationSec: lesson.durationSec || 0,
        isPreview: Boolean(lesson.isPreview),
        resources: resourcesByLessonId[lesson._id] || [],
      }));

    const mappedSection: EditorSection = {
      id: section._id,
      title: section.title,
      orderIndex: section.orderIndex,
      lessons: mappedLessons,
    };

    return mappedSection;
  };

  const openEditor = async (courseId?: string) => {
    if (!courseId) {
      setEditorCourse(undefined);
      setShowEditor(true);
      return;
    }

    try {
      setEditorLoading(true);
      const detail = await courseService.getCourseDetail(courseId);
      const sections = [...(detail.sections || [])].sort((a, b) => a.orderIndex - b.orderIndex);
      const lessons = [...(detail.lessons || [])];

      const resourceEntries = await Promise.all(
        lessons.map(async (lesson) => {
          const sectionId = lesson.sectionId;
          if (!sectionId) return [lesson._id, []] as const;
          try {
            const resources = await courseService.getLessonResources(courseId, sectionId, lesson._id);
            const mappedResources: EditorResource[] = (resources || []).map((resource: Resource) => ({
              id: resource._id,
              type: (resource.type || "LINK") as "FILE" | "LINK",
              name: resource.title,
              url: resource.url,
            }));
            return [lesson._id, mappedResources] as const;
          } catch {
            return [lesson._id, []] as const;
          }
        }),
      );

      const resourcesByLessonId = Object.fromEntries(resourceEntries);
      const rawCourse = detail.course as Course & {
        objectives?: string[];
        requirements?: string[];
        outcomes?: string[];
      };

      const mappedCourse: EditorCourse = {
        id: rawCourse.courseId,
        title: rawCourse.title || "",
        slug: rawCourse.slug || "",
        description: rawCourse.description || "",
        objectives: rawCourse.objectives && rawCourse.objectives.length > 0 ? rawCourse.objectives : [""],
        requirements: rawCourse.requirements && rawCourse.requirements.length > 0 ? rawCourse.requirements : [""],
        outcomes: rawCourse.outcomes && rawCourse.outcomes.length > 0 ? rawCourse.outcomes : [""],
        topicId: rawCourse.topicId || "web",
        thumbnailUrl: rawCourse.thumbnailUrl || "",
        basePrice: Number(rawCourse.basePrice) || 0,
        salePrice: Number(rawCourse.salePrice) || 0,
        sections: sections.map((section) => mapSectionToEditor(section, lessons, resourcesByLessonId)),
        coupons: [],
        status: mapStatusToEditor(rawCourse.status),
      };

      setEditorCourse(mappedCourse);
      setShowEditor(true);
    } finally {
      setEditorLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await courseService.getMyCourses({ page: 1, limit: 100 });
      const courses = data.items || [];
      setItems(courses);

      const statsEntries = await Promise.all(
        courses.map(async (course) => {
          try {
            const stats = await reviewService.getReviewStats(course.courseId);
            const ratingAvg = toFiniteNumber(stats.ratingAvg, 0);
            const ratingCount = toSafeInt(stats.ratingCount, 0);
            return [course.courseId, `${ratingAvg.toFixed(1)} (${ratingCount})`] as const;
          } catch {
            return [course.courseId, "N/A"] as const;
          }
        }),
      );

      setRatingByCourseId(Object.fromEntries(statsEntries));
    } catch {
      setError("Không thể tải danh sách khóa học giảng viên.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCourses();
  }, []);

  const stats = useMemo(() => {
    return {
      total: items.length,
      published: items.filter((item) => item.status === "PUBLISHED").length,
      submitted: items.filter((item) => item.status === "SUBMITTED").length,
      draft: items.filter((item) => item.status === "DRAFT" || item.status === "NEEDS_FIXES").length,
    };
  }, [items]);

  const removeCourse = async (courseId: string) => {
    try {
      setActingId(courseId);
      await courseService.deleteCourse(courseId);
      await loadCourses();
      toast.success("Đã xóa khóa học.");
    } catch {
      toast.error("Không thể xóa khóa học.");
    } finally {
      setActingId(null);
    }
  };

  const submitCourse = async (courseId: string) => {
    try {
      setActingId(courseId);
      await courseService.submitCourse(courseId);
      await loadCourses();
      toast.success("Đã nộp duyệt thành công!");
    } catch {
      toast.error("Không thể nộp duyệt. Vui lòng thử lại.");
    } finally {
      setActingId(null);
    }
  };

  if (showEditor) {
    return (
      <div>
        {editorLoading ? (
          <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
            <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
            Dang tai du lieu khoa hoc...
          </div>
        ) : (
          <CourseEditor
            course={editorCourse}
            onSave={() => {
              void loadCourses();
            }}
            onBack={() => {
              setShowEditor(false);
              setEditorCourse(undefined);
              void loadCourses();
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl" style={{ fontWeight: 700 }}>Khóa học của tôi</h1>
        <button
          onClick={() => onCreateCourse?.()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#3dcbb1] px-4 py-2.5 text-sm text-white hover:bg-[#35b89f]"
          style={{ fontWeight: 600 }}
        >
          <Plus size={15} /> Tạo khóa học
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card label="Tổng" value={stats.total} />
        <Card label="Đã xuất bản" value={stats.published} />
        <Card label="Đã nộp duyệt" value={stats.submitted} />
        <Card label="Nháp/Cần sửa" value={stats.draft} />
      </div>

      {loading ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
          Đang tải khóa học...
        </div>
      ) : error ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-amber-600">{error}</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-400">Chưa có khóa học nào.</div>
      ) : (
        <div className="space-y-3">
          {items.map((course) => {
            const canSubmit = course.status === "DRAFT" || course.status === "NEEDS_FIXES";
            const canDelete = course.status === "DRAFT" || course.status === "NEEDS_FIXES";
            const isActing = actingId === course.courseId;

            return (
              <div key={course.courseId} className="rounded-xl border bg-white p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm" style={{ fontWeight: 700 }}>{course.title}</p>
                    <p className="mt-1 text-xs text-gray-500">Trạng thái: {course.status || "N/A"}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                      <span>Giá: {formatPrice(course.salePrice || course.basePrice || 0)}</span>
                      <span>Đánh giá: {ratingByCourseId[course.courseId] || "N/A"}</span>
                      <span>{course.totalSections || 0} chương</span>
                      <span>{course.totalLessons || 0} bài</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    {canSubmit && (
                      <button
                        onClick={() => onEditCourse?.(course.courseId)}
                        disabled={isActing}
                        className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-700 disabled:opacity-40 hover:bg-gray-50"
                        style={{ fontWeight: 600 }}
                      >
                        <Pencil size={13} /> Sửa
                      </button>
                    )}
                    <button
                      onClick={() => {
                        void openEditor(course.courseId);
                      }}
                      disabled={isActing}
                      className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 px-3 py-2 text-xs text-emerald-700 disabled:opacity-40"
                      style={{ fontWeight: 600 }}
                    >
                      <Pencil size={13} /> Chinh sua
                    </button>
                    <button
                      onClick={() => {
                        void submitCourse(course.courseId);
                      }}
                      disabled={!canSubmit || isActing}
                      className="inline-flex items-center gap-1 rounded-lg border border-blue-200 px-3 py-2 text-xs text-blue-700 disabled:opacity-40"
                      style={{ fontWeight: 600 }}
                    >
                      <Send size={13} /> Nộp duyệt
                    </button>
                    <button
                      onClick={() => {
                        void removeCourse(course.courseId);
                      }}
                      disabled={!canDelete || isActing}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs text-red-700 disabled:opacity-40"
                      style={{ fontWeight: 600 }}
                    >
                      <Trash2 size={13} /> Xóa
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-xl" style={{ fontWeight: 700 }}>{value}</p>
    </div>
  );
}
