import { useState } from "react";
import { User, BookOpen, LogOut, Wallet } from "lucide-react";
import { Link } from "react-router";
import { InstructorProfilePage } from "./instructor-profile";
import { InstructorCoursesPage } from "./instructor-courses";
import { InstructorWallet } from "./instructor-wallet";
import { CourseEditor } from "./course-editor";
import { useAuth } from "../../../contexts/AuthContext";
import { courseService } from "../../../services/courseService";
import type { Course, Section, Lesson, Resource } from "./instructor-types";
import { toast } from "sonner";
import type { Section as ApiSection, Lesson as ApiLesson, Resource as ApiResource } from "../../../types";

type Tab = "profile" | "courses" | "wallet" | "create-course" | "edit-course";

function getDisplayName(fullName?: string, displayName?: string, email?: string): string {
  if (fullName?.trim()) return fullName.trim();
  if (displayName?.trim()) return displayName.trim();
  if (email) {
    const [localPart] = email.split("@");
    return localPart || "Giảng viên";
  }
  return "Giảng viên";
}

export function InstructorDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("courses");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);
  const displayName = getDisplayName(user?.fullName, user?.displayName, user?.email);

  const navItems: { key: Tab; label: string; icon: typeof User }[] = [
    { key: "profile", label: "Hồ sơ giảng viên", icon: User },
    { key: "courses", label: "Khoá học", icon: BookOpen },
    { key: "wallet", label: "Ví & Thu nhập", icon: Wallet },
  ];

  // ── Load existing draft into editor ──────────────────────────────────────
  const handleEditCourse = async (courseId: string) => {
    const tid = toast.loading("Đang tải dữ liệu khoá học...");
    try {
      const detail = await courseService.previewCourse(courseId);
      const c = detail.course;
      const apiSections = await courseService.getSections(courseId);

      const editorSections: Section[] = await Promise.all(
        (apiSections as ApiSection[]).map(async (s) => {
          const apiLessons = await courseService.getLessons(courseId, s._id);
          const editorLessons: Lesson[] = await Promise.all(
            (apiLessons as ApiLesson[]).map(async (l) => {
              const apiResources = await courseService.getLessonResources(courseId, s._id, l._id);
              const editorResources: Resource[] = (apiResources as ApiResource[]).map((r) => ({
                id: r._id,
                apiId: r.resourceId,
                type: (r.type as "FILE" | "LINK") ?? "LINK",
                name: r.title,
                url: r.url,
              }));
              return {
                id: l._id,
                apiId: l.lessonId,
                title: l.title,
                orderIndex: l.orderIndex,
                videoUrl: l.videoUrl ?? "",
                durationSec: l.durationSec ?? 0,
                isPreview: l.isPreview ?? false,
                resources: editorResources,
              };
            }),
          );
          return {
            id: s._id,
            apiId: s.sectionId,
            title: s.title,
            orderIndex: s.orderIndex,
            lessons: editorLessons,
          };
        }),
      );

      const loaded: Course = {
        id: courseId,
        courseId,
        title: c.title,
        slug: c.slug ?? "",
        description: c.description ?? "",
        objectives: c.objectives ?? [""],
        requirements: c.requirements ?? [""],
        outcomes: c.outcomes ?? [""],
        topicId: c.topicId ?? "web",
        thumbnailUrl: c.thumbnailUrl ?? "",
        basePrice: c.basePrice ?? 0,
        salePrice: c.salePrice ?? 0,
        sections: editorSections,
        coupons: [],
        status: (c.status as Course["status"]) ?? "DRAFT",
      };

      toast.dismiss(tid);
      setEditingCourse(loaded);
      setTab("edit-course");
    } catch {
      toast.dismiss(tid);
      toast.error("Không thể tải dữ liệu khoá học.");
    }
  };

  // ── Save (create new) ─────────────────────────────────────────────────────
  const handleCreateCourse = async (course: Course) => {
    try {
      const created = await courseService.createCourse({
        title: course.title,
        description: course.description,
        objectives: course.objectives?.filter(Boolean),
        requirements: course.requirements?.filter(Boolean),
        outcomes: course.outcomes?.filter(Boolean),
        topicId: course.topicId,
        basePrice: course.basePrice,
        salePrice: course.salePrice,
        thumbnailUrl: course.thumbnailUrl,
      });
      const courseId = created.courseId;
      await saveSectionsLessons(courseId, course.sections);
      for (const coupon of course.coupons ?? []) {
        // Only create coupons that have a valid code AND discount value > 0
        if (coupon.code && coupon.code.trim() && coupon.discountValue > 0) {
          await courseService.createCoupon(courseId, {
            code: coupon.code.trim(),
            discountType: coupon.discountType === "percent" ? "PERCENT" : "AMOUNT",
            discountValue: coupon.discountValue,
            maxUses: coupon.maxUsage > 0 ? coupon.maxUsage : undefined,
            endAt: coupon.expiresAt || undefined,
          });
        }
      }
      if (course.status === "SUBMITTED") {
        await courseService.submitCourse(courseId);
        toast.success("Đã nộp khoá học để duyệt!");
      } else {
        toast.success("Lưu khoá học thành công!");
      }
      setTab("courses");
    } catch {
      toast.error("Không thể lưu khoá học. Vui lòng thử lại.");
    }
  };

  // ── Save (update existing draft) ──────────────────────────────────────────
  const handleUpdateCourse = async (course: Course) => {
    const courseId = course.courseId!;
    try {
      await courseService.updateCourse(courseId, {
        title: course.title,
        description: course.description,
        objectives: course.objectives?.filter(Boolean),
        requirements: course.requirements?.filter(Boolean),
        outcomes: course.outcomes?.filter(Boolean),
        topicId: course.topicId,
        basePrice: course.basePrice,
        salePrice: course.salePrice,
        thumbnailUrl: course.thumbnailUrl,
      });

      // Delete sections that were removed during editing
      if (editingCourse) {
        const currentSectionIds = new Set(course.sections.map((s) => s.id));
        for (const orig of editingCourse.sections) {
          if (!currentSectionIds.has(orig.id)) {
            await deleteSectionCascade(courseId, orig);
          }
        }
      }

      // Sync each section in the editor
      for (const section of [...course.sections].sort((a, b) => a.orderIndex - b.orderIndex)) {
        let sectionDbId: string;

        if (section.apiId) {
          // Existing section — update title/order
          await courseService.updateSection(courseId, section.apiId, {
            title: section.title,
            orderIndex: section.orderIndex,
          });
          sectionDbId = section.apiId ?? section.id;

          // Delete lessons that were removed
          const origSection = editingCourse?.sections.find((s) => s.id === section.id);
          if (origSection) {
            const currentLessonIds = new Set(section.lessons.map((l) => l.id));
            for (const origLesson of origSection.lessons) {
              if (!currentLessonIds.has(origLesson.id)) {
                await deleteLessonCascade(courseId, sectionDbId, origLesson);
              }
            }
          }

          // Sync lessons
          for (const lesson of [...section.lessons].sort((a, b) => a.orderIndex - b.orderIndex)) {
            if (lesson.apiId) {
              await courseService.updateLesson(courseId, sectionDbId, lesson.apiId, {
                title: lesson.title,
                orderIndex: lesson.orderIndex,
                videoUrl: lesson.videoUrl,
                durationSec: lesson.durationSec,
                isPreview: lesson.isPreview,
              });
              // Sync new resources (skip existing, don't delete for simplicity)
              for (const res of lesson.resources) {
                if (!res.apiId && res.url.trim()) {
                  await courseService.createResource(courseId, sectionDbId, lesson.apiId ?? lesson.id, {
                    title: res.name,
                    type: res.type,
                    url: res.url,
                  });
                }
              }
            } else {
              // New lesson added during editing
              const created = await courseService.createLesson(courseId, sectionDbId, {
                title: lesson.title,
                orderIndex: lesson.orderIndex,
                videoUrl: lesson.videoUrl,
                durationSec: lesson.durationSec,
                isPreview: lesson.isPreview,
              });
              for (const res of lesson.resources) {
                if (res.url.trim()) {
                  await courseService.createResource(courseId, sectionDbId, created.lessonId ?? created._id, {
                    title: res.name,
                    type: res.type,
                    url: res.url,
                  });
                }
              }
            }
          }
        } else {
          // New section added during editing
          const created = await courseService.createSection(courseId, {
            title: section.title,
            orderIndex: section.orderIndex,
          });
          sectionDbId = created.sectionId ?? created._id;
          for (const lesson of [...section.lessons].sort((a, b) => a.orderIndex - b.orderIndex)) {
            const createdLesson = await courseService.createLesson(courseId, sectionDbId, {
              title: lesson.title,
              orderIndex: lesson.orderIndex,
              videoUrl: lesson.videoUrl,
              durationSec: lesson.durationSec,
              isPreview: lesson.isPreview,
            });
            for (const res of lesson.resources) {
              if (res.url.trim()) {
                await courseService.createResource(courseId, sectionDbId, createdLesson.lessonId ?? createdLesson._id, {
                  title: res.name,
                  type: res.type,
                  url: res.url,
                });
              }
            }
          }
        }
      }

      if (course.status === "SUBMITTED") {
        await courseService.submitCourse(courseId);
        toast.success("Đã nộp khoá học để duyệt!");
      } else {
        toast.success("Cập nhật khoá học thành công!");
      }
      setEditingCourse(null);
      setTab("courses");
    } catch {
      toast.error("Không thể cập nhật khoá học. Vui lòng thử lại.");
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const saveSectionsLessons = async (courseId: string, sections: Section[]) => {
    for (const section of [...sections].sort((a, b) => a.orderIndex - b.orderIndex)) {
      const createdSection = await courseService.createSection(courseId, {
        title: section.title,
        orderIndex: section.orderIndex,
      });
      const sectionDbId = createdSection._id;
      for (const lesson of [...section.lessons].sort((a, b) => a.orderIndex - b.orderIndex)) {
        const createdLesson = await courseService.createLesson(courseId, sectionDbId, {
          title: lesson.title,
          orderIndex: lesson.orderIndex,
          videoUrl: lesson.videoUrl,
          durationSec: lesson.durationSec,
          isPreview: lesson.isPreview,
        });
        for (const res of lesson.resources) {
          if (res.url.trim()) {
            await courseService.createResource(courseId, sectionDbId, createdLesson._id, {
              title: res.name,
              type: res.type,
              url: res.url,
            });
          }
        }
      }
    }
  };

  const deleteLessonCascade = async (courseId: string, sectionDbId: string, lesson: Lesson) => {
    const resources = await courseService.getLessonResources(courseId, sectionDbId, lesson.id);
    for (const r of resources as ApiResource[]) {
      await courseService.deleteResource(courseId, sectionDbId, lesson.id, r.resourceId ?? r._id);
    }
    await courseService.deleteLesson(courseId, sectionDbId, lesson.apiId ?? lesson.id);
  };

  const deleteSectionCascade = async (courseId: string, section: Section) => {
    for (const lesson of section.lessons) {
      await deleteLessonCascade(courseId, section.id, lesson);
    }
    await courseService.deleteSection(courseId, section.apiId ?? section.id);
  };

  const handleSaveCourse = (course: Course) => {
    if (saving) return;
    setSaving(true);
    const promise = course.courseId ? handleUpdateCourse(course) : handleCreateCourse(course);
    promise.finally(() => setSaving(false));
  };

  const isEditorMode = tab === "create-course" || tab === "edit-course";

  return (
    <div className="min-h-[calc(100vh-60px)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shrink-0 hidden md:flex flex-col">
        <div className="px-5 py-6 border-b text-center">
          <p className="text-base truncate" style={{ fontWeight: 700 }}>{displayName}</p>
          <p className="text-sm text-gray-400 mt-1">Giảng viên</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${(tab === item.key || (isEditorMode && item.key === "courses")) ? "bg-[#3dcbb1]/10 text-[#3dcbb1]" : "text-gray-600 hover:bg-gray-50"
                }`}
              style={{ fontWeight: (tab === item.key || (isEditorMode && item.key === "courses")) ? 600 : 400 }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
            <LogOut size={18} /> Quay lại trang chính
          </Link>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 flex">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs ${(tab === item.key || (isEditorMode && item.key === "courses")) ? "text-[#3dcbb1]" : "text-gray-400"
              }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 bg-gray-50 overflow-auto pb-20 md:pb-8">
        <div className="p-6 md:p-8">
          {isEditorMode ? (
            <CourseEditor
              course={tab === "edit-course" ? editingCourse ?? undefined : undefined}
              saving={saving}
              onSave={handleSaveCourse}
              onBack={() => {
                setEditingCourse(null);
                setTab("courses");
              }}
            />
          ) : (
            <>
              {tab === "profile" && <InstructorProfilePage />}
              {tab === "courses" && (
                <InstructorCoursesPage
                  onCreateCourse={() => setTab("create-course")}
                  onEditCourse={(id) => { void handleEditCourse(id); }}
                />
              )}
              {tab === "wallet" && <InstructorWallet />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

