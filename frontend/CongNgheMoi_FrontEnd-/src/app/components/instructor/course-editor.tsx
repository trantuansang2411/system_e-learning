import { useState, useEffect } from "react";
import {
  ArrowLeft, ArrowRight, Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
  Eye, EyeOff, Link as LinkIcon, FileText, X, Send, Play, BookOpen, Clock,
  CheckCircle, Image as ImageIcon, Tag, Percent, BadgeDollarSign, Infinity, CalendarOff, Copy, Check,
} from "lucide-react";
import type { Course, Section, Lesson, Resource, Coupon } from "./instructor-types";
import { generateId, topicOptions, formatDuration } from "./instructor-types";
import { formatPrice } from "../../../utils/price";
import { getImageUrl } from "../../../utils/url";
import { courseService } from "../../../services/courseService";
import { toast } from "sonner";

type Step = "info" | "sections" | "preview";

interface Props {
  course?: Course;
  saving?: boolean;
  onSave: (course: Course) => void;
  onBack: () => void;
}

function createEmptyCourse(): Course {
  return {
    id: generateId(),
    title: "",
    slug: "",
    description: "",
    objectives: [""],
    requirements: [""],
    outcomes: [""],
    topicId: "web",
    thumbnailUrl: "",
    basePrice: 0,
    salePrice: 0,
    sections: [],
    coupons: [],
    status: "DRAFT",
  };
}

function PriceInput({ value, onChange, className }: { value: number; onChange: (v: number) => void; className: string }) {
  const fmt = (n: number) => (n === 0 ? "" : n.toLocaleString("vi-VN"));
  const [display, setDisplay] = useState(fmt(value));
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!focused) setDisplay(fmt(value));
  }, [value, focused]);
  return (
    <input
      type="text"
      className={className}
      value={display}
      placeholder="0"
      onFocus={() => { setFocused(true); setDisplay(value === 0 ? "" : String(value)); }}
      onChange={(e) => {
        const digits = e.target.value.replace(/\D/g, "");
        setDisplay(digits);
        onChange(digits ? Number(digits) : 0);
      }}
      onBlur={() => { setFocused(false); setDisplay(fmt(value)); }}
    />
  );
}

export function CourseEditor({ course, saving = false, onSave, onBack }: Props) {
  const [data, setData] = useState<Course>(course ?? createEmptyCourse());
  const [step, setStep] = useState<Step>("info");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [uploadingLesson, setUploadingLesson] = useState<string | null>(null);
  const [uploadingResource, setUploadingResource] = useState<string | null>(null);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [dragItem, setDragItem] = useState<{ type: "section" | "lesson"; id: string; parentId?: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [persistedCourseId, setPersistedCourseId] = useState<string | null>(course?.id ?? null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string>("");

  const update = <K extends keyof Course>(key: K, val: Course[K]) => setData((d) => ({ ...d, [key]: val }));

  const buildPayload = () => ({
    title: data.title.trim(),
    slug: data.slug,
    description: data.description,
    objectives: data.objectives.filter(Boolean),
    requirements: data.requirements.filter(Boolean),
    outcomes: data.outcomes.filter(Boolean),
    topicId: data.topicId,
    thumbnailUrl: data.thumbnailUrl,
    basePrice: Number(data.basePrice) || 0,
    salePrice: Number(data.salePrice) || 0,
  });

  const parseErrorMessage = (error: unknown, fallback: string) => {
    if (error && typeof error === "object") {
      const maybeAxios = error as { response?: { data?: { message?: string } }; message?: string };
      if (maybeAxios.response?.data?.message) return maybeAxios.response.data.message;
      if (maybeAxios.message) return maybeAxios.message;
    }
    return fallback;
  };

  const saveDraft = async () => {
    if (!data.title.trim()) {
      setActionMessage("Vui lòng nhập tên khoá học trước khi lưu.");
      return null;
    }

    try {
      setIsSaving(true);
      setActionMessage("");
      const payload = buildPayload();

      if (persistedCourseId) {
        await courseService.updateCourse(persistedCourseId, payload);
        onSave(data);
        setActionMessage("Đã lưu nháp khoá học.");
        return persistedCourseId;
      }

      const created = await courseService.createCourse(payload);
      const createdId = (created as { courseId?: string; id?: string }).courseId || (created as { id?: string }).id;
      if (createdId) {
        setPersistedCourseId(createdId);
        setData((prev) => ({ ...prev, id: createdId }));
      }
      onSave(createdId ? { ...data, id: createdId } : data);
      setActionMessage("Đã tạo khoá học và lưu nháp thành công.");
      return createdId ?? null;
    } catch (error) {
      setActionMessage(parseErrorMessage(error, "Không thể lưu khoá học. Vui lòng thử lại."));
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const submitForReview = async () => {
    try {
      setIsSubmitting(true);
      setActionMessage("");

      let courseId = persistedCourseId;
      if (!courseId) {
        courseId = await saveDraft();
      }
      if (!courseId) return;

      await courseService.submitCourse(courseId);
      setData((prev) => ({ ...prev, status: "PENDING" }));
      onSave({ ...data, id: courseId, status: "PENDING" });
      setActionMessage("Đã gửi khoá học để admin duyệt.");
    } catch (error) {
      setActionMessage(parseErrorMessage(error, "Không thể gửi duyệt khoá học. Vui lòng thử lại."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCode = (code: string, id: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = code;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const updateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setData((d) => ({ ...d, title, slug }));
  };

  // --- Array field helpers ---
  const updateArrayField = (field: "objectives" | "requirements" | "outcomes", idx: number, val: string) => {
    const arr = [...data[field]];
    arr[idx] = val;
    update(field, arr);
  };
  const addArrayField = (field: "objectives" | "requirements" | "outcomes") => {
    update(field, [...data[field], ""]);
  };
  const removeArrayField = (field: "objectives" | "requirements" | "outcomes", idx: number) => {
    update(field, data[field].filter((_, i) => i !== idx));
  };

  // --- Section helpers ---
  const addSection = () => {
    const s: Section = { id: generateId(), title: "", orderIndex: data.sections.length, lessons: [] };
    update("sections", [...data.sections, s]);
    setExpandedSection(s.id);
  };

  const updateSection = (id: string, title: string) => {
    update("sections", data.sections.map((s) => (s.id === id ? { ...s, title } : s)));
  };

  const removeSection = (id: string) => {
    update("sections", data.sections.filter((s) => s.id !== id).map((s, i) => ({ ...s, orderIndex: i })));
  };

  // --- Lesson helpers ---
  const addLesson = (sectionId: string) => {
    update(
      "sections",
      data.sections.map((s) => {
        if (s.id !== sectionId) return s;
        const l: Lesson = { id: generateId(), title: "", orderIndex: s.lessons.length, videoUrl: "", durationSec: 0, isPreview: false, resources: [] };
        return { ...s, lessons: [...s.lessons, l] };
      })
    );
  };

  const updateLesson = (sectionId: string, lessonId: string, patch: Partial<Lesson>) => {
    update(
      "sections",
      data.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return { ...s, lessons: s.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)) };
      })
    );
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    update(
      "sections",
      data.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId).map((l, i) => ({ ...l, orderIndex: i })) };
      })
    );
  };

  // --- Resource helpers ---
  const addResource = (sectionId: string, lessonId: string) => {
    const r: Resource = { id: generateId(), type: "LINK", name: "", url: "" };
    update(
      "sections",
      data.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return { ...s, lessons: s.lessons.map((l) => (l.id === lessonId ? { ...l, resources: [...l.resources, r] } : l)) };
      })
    );
  };

  const updateResource = (sectionId: string, lessonId: string, resId: string, patch: Partial<Resource>) => {
    update(
      "sections",
      data.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          lessons: s.lessons.map((l) => {
            if (l.id !== lessonId) return l;
            return { ...l, resources: l.resources.map((r) => (r.id === resId ? { ...r, ...patch } : r)) };
          }),
        };
      })
    );
  };

  const removeResource = (sectionId: string, lessonId: string, resId: string) => {
    update(
      "sections",
      data.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          lessons: s.lessons.map((l) => {
            if (l.id !== lessonId) return l;
            return { ...l, resources: l.resources.filter((r) => r.id !== resId) };
          }),
        };
      })
    );
  };

  // --- Drag and drop for sections ---
  const handleSectionDragStart = (id: string) => {
    setDragItem({ type: "section", id });
  };

  const handleSectionDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!dragItem || dragItem.type !== "section" || dragItem.id === targetId) return;
    const sections = [...data.sections];
    const fromIdx = sections.findIndex((s) => s.id === dragItem.id);
    const toIdx = sections.findIndex((s) => s.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;
    const [moved] = sections.splice(fromIdx, 1);
    sections.splice(toIdx, 0, moved);
    update("sections", sections.map((s, i) => ({ ...s, orderIndex: i })));
  };

  // --- Drag and drop for lessons ---
  const handleLessonDragStart = (lessonId: string, sectionId: string) => {
    setDragItem({ type: "lesson", id: lessonId, parentId: sectionId });
  };

  const handleLessonDragOver = (e: React.DragEvent, targetLessonId: string, sectionId: string) => {
    e.preventDefault();
    if (!dragItem || dragItem.type !== "lesson" || dragItem.parentId !== sectionId || dragItem.id === targetLessonId) return;
    update(
      "sections",
      data.sections.map((s) => {
        if (s.id !== sectionId) return s;
        const lessons = [...s.lessons];
        const fromIdx = lessons.findIndex((l) => l.id === dragItem.id);
        const toIdx = lessons.findIndex((l) => l.id === targetLessonId);
        if (fromIdx === -1 || toIdx === -1) return s;
        const [moved] = lessons.splice(fromIdx, 1);
        lessons.splice(toIdx, 0, moved);
        return { ...s, lessons: lessons.map((l, i) => ({ ...l, orderIndex: i })) };
      })
    );
  };

  const handleDragEnd = () => setDragItem(null);

  // --- Number input helper: clear 0 on focus, restore 0 on blur if empty ---
  const numInputProps = (value: number, onChange: (v: number) => void) => ({
    value: value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value)),
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => { if (Number(e.target.value) === 0) e.target.value = ""; },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => { if (e.target.value === "") onChange(0); },
  });

  // --- Coupon helpers ---
  const addCoupon = () => {
    const c: Coupon = { id: generateId(), code: "", discountType: "percent", discountValue: 0, expiresAt: "", maxUsage: 0 };
    update("coupons", [...(data.coupons || []), c]);
  };
  const updateCoupon = (id: string, patch: Partial<Coupon>) => {
    update("coupons", (data.coupons || []).map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };
  const removeCoupon = (id: string) => {
    update("coupons", (data.coupons || []).filter((c) => c.id !== id));
  };

  const inputCls = "w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]";

  const totalLessons = data.sections.reduce((a, s) => a + s.lessons.length, 0);
  const totalDuration = data.sections.reduce((a, s) => a + s.lessons.reduce((b, l) => b + l.durationSec, 0), 0);

  // --- STEP: INFO ---
  const renderInfo = () => (
    <div className="space-y-5 max-w-3xl">
      <div>
        <label className="text-xs text-gray-500 block mb-1">Tên khoá học *</label>
        <input value={data.title} onChange={(e) => updateSlug(e.target.value)} className={inputCls} placeholder="VD: Khoá học React từ cơ bản đến nâng cao" />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Mô tả khoá học</label>
        <textarea value={data.description} onChange={(e) => update("description", e.target.value)} rows={4} className={`${inputCls} resize-none`} placeholder="Mô tả chi tiết về khoá học..." />
      </div>

      {/* Objectives */}
      <ArrayFieldEditor label="Mục tiêu khoá học (Học xong bạn sẽ làm được gì)" items={data.objectives} field="objectives" onUpdate={updateArrayField} onAdd={addArrayField} onRemove={removeArrayField} placeholder="VD: Xây dựng được ứng dụng web hoàn chỉnh" />

      {/* Requirements */}
      <ArrayFieldEditor label="Yêu cầu trước khi học" items={data.requirements} field="requirements" onUpdate={updateArrayField} onAdd={addArrayField} onRemove={removeArrayField} placeholder="VD: Biết cơ bản HTML/CSS" />

      {/* Outcomes */}
      <ArrayFieldEditor label="Kết quả sau khi học" items={data.outcomes} field="outcomes" onUpdate={updateArrayField} onAdd={addArrayField} onRemove={removeArrayField} placeholder="VD: Có thể xin việc vị trí Frontend Developer" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Danh mục</label>
          <select value={data.topicId} onChange={(e) => update("topicId", e.target.value)} className={inputCls}>
            {topicOptions.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Ảnh thumbnail</label>
          <label className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-lg px-3 py-2 text-xs cursor-pointer transition hover:border-[#3dcbb1] hover:bg-[#3dcbb1]/5 ${uploadingThumbnail ? "opacity-60 pointer-events-none" : ""} ${data.thumbnailUrl ? "border-green-300 bg-green-50 text-green-700" : "border-gray-300 text-gray-400"}`}>
            <ImageIcon size={14} />
            {uploadingThumbnail ? "Đang upload..." : data.thumbnailUrl ? `✓ ${data.thumbnailUrl.split("/").pop()}` : "Chọn ảnh thumbnail"}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={uploadingThumbnail} onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 10 * 1024 * 1024) {
                toast.error("Ảnh thumbnail không được vượt quá 10MB.");
                e.target.value = "";
                return;
              }
              if (data.thumbnailUrl && !data.thumbnailUrl.startsWith("http")) courseService.deleteUpload(data.thumbnailUrl);
              setUploadingThumbnail(true);
              try {
                const result = await courseService.uploadThumbnail(file);
                update("thumbnailUrl", result.url);
              } catch (err: unknown) {
                const isTokenRefreshed = (err as { isTokenRefreshed?: boolean })?.isTokenRefreshed;
                toast.error(isTokenRefreshed ? "Phiên đăng nhập vừa được làm mới. Vui lòng chọn lại ảnh." : "Upload thumbnail thất bại.");
              } finally {
                setUploadingThumbnail(false);
                e.target.value = "";
              }
            }} />
          </label>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Giá gốc (VND)</label>
          <PriceInput value={data.basePrice} onChange={(v) => update("basePrice", v)} className={inputCls} />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Giá khuyến mãi (VND)</label>
          <PriceInput value={data.salePrice} onChange={(v) => update("salePrice", v)} className={inputCls} />
        </div>
      </div>

      {data.thumbnailUrl && (
        <div>
          <label className="text-xs text-gray-500 block mb-1">Xem trước thumbnail</label>
          <img src={getImageUrl(data.thumbnailUrl) || data.thumbnailUrl} alt="thumbnail" className="w-64 h-36 object-cover rounded-lg border" />
        </div>
      )}

      {/* Coupons */}
      <div className="border rounded-xl p-5 bg-gray-50/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-[#3dcbb1]" />
            <h3 className="text-sm" style={{ fontWeight: 600 }}>Mã giảm giá</h3>
            <span className="text-xs text-gray-400">({(data.coupons || []).length} mã)</span>
          </div>
          <button onClick={addCoupon} className="flex items-center gap-1.5 text-xs text-[#3dcbb1] hover:underline" style={{ fontWeight: 600 }}>
            <Plus size={12} /> Thêm mã
          </button>
        </div>

        {(data.coupons || []).length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">Chưa có mã giảm giá nào. Thêm mã để khuyến mãi cho học viên.</p>
        )}

        <div className="space-y-3">
          {(data.coupons || []).map((coupon) => (
            <div key={coupon.id} className="bg-white border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Mã giảm giá *</label>
                    <input
                      value={coupon.code}
                      onChange={(e) => updateCoupon(coupon.id, { code: e.target.value.toUpperCase().replace(/\s/g, "") })}
                      className={inputCls}
                      placeholder="VD: SALE50, NEWUSER"
                      style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Loại giảm giá</label>
                    <div className="flex gap-0 border rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateCoupon(coupon.id, { discountType: "percent" })}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm transition ${coupon.discountType === "percent" ? "bg-[#3dcbb1] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                        style={{ fontWeight: coupon.discountType === "percent" ? 600 : 400 }}
                      >
                        <Percent size={14} /> Phần trăm
                      </button>
                      <button
                        onClick={() => updateCoupon(coupon.id, { discountType: "fixed" })}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm transition ${coupon.discountType === "fixed" ? "bg-[#3dcbb1] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                        style={{ fontWeight: coupon.discountType === "fixed" ? 600 : 400 }}
                      >
                        <BadgeDollarSign size={14} /> Cố định
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeCoupon(coupon.id)} className="text-red-400 hover:text-red-500 mt-5">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Giá trị giảm {coupon.discountType === "percent" ? "(%)" : "(VND)"}
                  </label>
                  <input
                    type="number"
                    {...numInputProps(coupon.discountValue, (v) => {
                      if (coupon.discountType === "percent") v = Math.min(100, Math.max(0, v));
                      updateCoupon(coupon.id, { discountValue: v });
                    })}
                    className={inputCls}
                    placeholder={coupon.discountType === "percent" ? "VD: 20" : "VD: 100000"}
                    min={0}
                    max={coupon.discountType === "percent" ? 100 : undefined}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    Ngày hết hạn
                    {!coupon.expiresAt && <span className="text-[#3dcbb1] flex items-center gap-0.5"><CalendarOff size={10} /> Vĩnh viễn</span>}
                  </label>
                  <input
                    type="date"
                    value={coupon.expiresAt}
                    onChange={(e) => updateCoupon(coupon.id, { expiresAt: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    Số lượng tối đa
                    {coupon.maxUsage === 0 && <span className="text-[#3dcbb1] flex items-center gap-0.5"><Infinity size={10} /> Không giới hạn</span>}
                  </label>
                  <input
                    type="number"
                    {...numInputProps(coupon.maxUsage, (v) => updateCoupon(coupon.id, { maxUsage: Math.max(0, v) }))}
                    className={inputCls}
                    placeholder="0 = không giới hạn"
                    min={0}
                  />
                </div>
              </div>

              {/* Preview */}
              {coupon.code && coupon.discountValue > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-[#3dcbb1]/10 rounded-lg text-xs text-[#2ba88f]">
                  <Tag size={12} />
                  <span style={{ fontWeight: 600 }}>{coupon.code}</span>
                  <button
                    onClick={() => copyCode(coupon.code, coupon.id)}
                    className="p-0.5 rounded hover:bg-[#3dcbb1]/20 transition"
                    title="Sao chép mã"
                  >
                    {copiedId === coupon.id ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                  <span>—</span>
                  <span>
                    Giảm {coupon.discountType === "percent" ? `${coupon.discountValue}%` : formatPrice(coupon.discountValue)}
                    {coupon.expiresAt ? ` • HSD: ${new Date(coupon.expiresAt).toLocaleDateString("vi-VN")}` : " • Không hết hạn"}
                    {coupon.maxUsage > 0 ? ` • Tối đa ${coupon.maxUsage} lượt` : " • Không giới hạn lượt"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- STEP: SECTIONS ---
  const renderSections = () => (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">Kéo thả để sắp xếp thứ tự chương học và bài học</p>
        <button onClick={addSection} className="flex items-center gap-1.5 bg-[#3dcbb1] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#35b89f] transition" style={{ fontWeight: 600 }}>
          <Plus size={16} /> Thêm chương
        </button>
      </div>

      {data.sections.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed rounded-xl text-gray-400">
          <BookOpen size={40} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">Chưa có chương nào. Bấm "Thêm chương" để bắt đầu.</p>
        </div>
      )}

      <div className="space-y-3">
        {data.sections.map((section) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => handleSectionDragStart(section.id)}
            onDragOver={(e) => handleSectionDragOver(e, section.id)}
            onDragEnd={handleDragEnd}
            className="border rounded-xl bg-white overflow-hidden"
          >
            {/* Section header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b">
              <GripVertical size={18} className="text-gray-400 cursor-grab shrink-0" />
              <span className="text-xs text-gray-400 shrink-0">Chương {section.orderIndex + 1}</span>
              <input
                value={section.title}
                onChange={(e) => updateSection(section.id, e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ fontWeight: 600 }}
                placeholder="Tên chương..."
              />
              <span className="text-xs text-gray-400 shrink-0">{section.lessons.length} bài</span>
              <button onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)} className="text-gray-400 hover:text-gray-600">
                {expandedSection === section.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <button onClick={() => removeSection(section.id)} className="text-red-400 hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>

            {/* Lessons */}
            {expandedSection === section.id && (
              <div className="p-4 space-y-2">
                {section.lessons.map((lesson) => (
                  <div key={lesson.id}>
                    <div
                      draggable
                      onDragStart={(e) => { e.stopPropagation(); handleLessonDragStart(lesson.id, section.id); }}
                      onDragOver={(e) => { e.stopPropagation(); handleLessonDragOver(e, lesson.id, section.id); }}
                      onDragEnd={handleDragEnd}
                      className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white hover:bg-gray-50"
                    >
                      <GripVertical size={16} className="text-gray-300 cursor-grab shrink-0" />
                      <Play size={14} className="text-gray-400 shrink-0" />
                      <span className="text-xs text-gray-400 shrink-0">Bài {lesson.orderIndex + 1}</span>
                      <input
                        value={lesson.title}
                        onChange={(e) => updateLesson(section.id, lesson.id, { title: e.target.value })}
                        className="flex-1 bg-transparent outline-none text-sm"
                        placeholder="Tên bài học..."
                      />
                      <button
                        onClick={() => updateLesson(section.id, lesson.id, { isPreview: !lesson.isPreview })}
                        className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${lesson.isPreview ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                        title={lesson.isPreview ? "Cho xem trước" : "Cần mua"}
                      >
                        {lesson.isPreview ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)} className="text-gray-400 hover:text-gray-600">
                        <ChevronDown size={14} />
                      </button>
                      <button onClick={() => removeLesson(section.id, lesson.id)} className="text-red-400 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Lesson detail */}
                    {expandedLesson === lesson.id && (
                      <div className="ml-8 mt-2 mb-3 p-4 border rounded-lg bg-gray-50 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Video bài học</label>
                            <div className="space-y-1.5">
                              <label className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-lg px-3 py-2 text-xs cursor-pointer transition hover:border-[#3dcbb1] hover:bg-[#3dcbb1]/5 ${uploadingLesson === lesson.id ? "opacity-60 pointer-events-none" : ""} ${lesson.videoUrl && !lesson.videoUrl.startsWith("http") ? "border-green-300 bg-green-50 text-green-700" : "border-gray-300 text-gray-400"}`}>
                                <input
                                  type="file"
                                  accept="video/mp4,video/webm,video/mov,video/avi,video/mkv"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    if (file.size > 500 * 1024 * 1024) {
                                      toast.error("File video không được vượt quá 500MB.");
                                      e.target.value = "";
                                      return;
                                    }

                                    // Tự động lấy thời lượng video trước khi upload
                                    const getVideoDuration = () => {
                                      return new Promise<number>((resolve) => {
                                        const video = document.createElement("video");
                                        video.preload = "metadata";
                                        video.onloadedmetadata = () => {
                                          URL.revokeObjectURL(video.src);
                                          resolve(Math.round(video.duration));
                                        };
                                        video.onerror = () => {
                                          URL.revokeObjectURL(video.src);
                                          resolve(0);
                                        };
                                        video.src = URL.createObjectURL(file);
                                      });
                                    };

                                    if (lesson.videoUrl && !lesson.videoUrl.startsWith("http")) courseService.deleteUpload(lesson.videoUrl);
                                    setUploadingLesson(lesson.id);
                                    try {
                                      const duration = await getVideoDuration();
                                      const result = await courseService.uploadVideo(file);
                                      updateLesson(section.id, lesson.id, { videoUrl: result.url, durationSec: duration });
                                      toast.success(duration > 0 ? `Upload video thành công! (${formatDuration(duration)})` : "Upload video thành công!");
                                    } catch (err: unknown) {
                                      console.error("Upload video error:", err);
                                      const isTokenRefreshed = (err as { isTokenRefreshed?: boolean })?.isTokenRefreshed;
                                      const msg = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message;
                                      toast.error(isTokenRefreshed ? "Phiên đăng nhập vừa được làm mới. Vui lòng chọn lại file video." : msg ? `Upload thất bại: ${msg}` : "Upload video thất bại.");
                                    } finally {
                                      setUploadingLesson(null);
                                      e.target.value = "";
                                    }
                                  }}
                                />
                                {uploadingLesson === lesson.id ? "Đang upload..." : lesson.videoUrl && !lesson.videoUrl.startsWith("http") ? `✓ ${lesson.videoUrl.split("/").pop()}` : "Chọn file video"}
                              </label>
                              <input value={lesson.videoUrl} onChange={(e) => updateLesson(section.id, lesson.id, { videoUrl: e.target.value })} className={inputCls} placeholder="Hoặc nhập URL (YouTube, Vimeo...)" />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1 flex items-center gap-1">
                              Thời lượng (giây)
                              {lesson.videoUrl && !lesson.videoUrl.startsWith("http") && <span className="text-[10px] text-green-600">✓ Tự động</span>}
                            </label>
                            <input
                              type="number"
                              value={lesson.durationSec}
                              onChange={(e) => updateLesson(section.id, lesson.id, { durationSec: Number(e.target.value) })}
                              className={`${inputCls} ${lesson.videoUrl && !lesson.videoUrl.startsWith("http") ? "bg-gray-100 text-gray-600" : ""}`}
                              readOnly={Boolean(lesson.videoUrl && !lesson.videoUrl.startsWith("http"))}
                              placeholder="0"
                            />
                          </div>
                        </div>

                        {/* Resources */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-gray-500">Tài liệu đính kèm</label>
                            <button onClick={() => addResource(section.id, lesson.id)} className="text-xs text-[#3dcbb1] hover:underline flex items-center gap-1" style={{ fontWeight: 600 }}>
                              <Plus size={12} /> Thêm tài liệu
                            </button>
                          </div>
                          {lesson.resources.map((res) => (
                            <div key={res.id} className="flex items-center gap-2 mb-2">
                              <select
                                value={res.type}
                                onChange={(e) => updateResource(section.id, lesson.id, res.id, { type: e.target.value as "FILE" | "LINK" })}
                                className="border rounded px-2 py-1.5 text-xs outline-none"
                              >
                                <option value="LINK">Link</option>
                                <option value="FILE">File</option>
                              </select>
                              <input
                                value={res.name}
                                onChange={(e) => updateResource(section.id, lesson.id, res.id, { name: e.target.value })}
                                className="border rounded px-3 py-1.5 text-xs outline-none flex-1"
                                placeholder="Tên tài liệu..."
                              />
                              {res.type === "LINK" ? (
                                <input
                                  value={res.url}
                                  onChange={(e) => updateResource(section.id, lesson.id, res.id, { url: e.target.value })}
                                  className="border rounded px-3 py-1.5 text-xs outline-none flex-1"
                                  placeholder="Nhập URL..."
                                />
                              ) : (
                                <label
                                  className={`flex-1 border-2 border-dashed rounded px-3 py-1.5 text-xs cursor-pointer text-center transition hover:border-[#3dcbb1] hover:bg-[#3dcbb1]/5 ${uploadingResource === res.id ? "opacity-60 pointer-events-none" : ""} ${res.url ? "border-green-300 bg-green-50 text-green-700" : "border-gray-300 text-gray-400"}`}
                                >
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      if (file.size > 50 * 1024 * 1024) {
                                        toast.error("File tài liệu không được vượt quá 50MB.");
                                        e.target.value = "";
                                        return;
                                      }
                                      setUploadingResource(res.id);
                                      try {
                                        const result = await courseService.uploadResource(file);
                                        updateResource(section.id, lesson.id, res.id, { url: result.url, name: res.name || file.name });
                                        toast.success("Upload tài liệu thành công!");
                                      } catch (err: unknown) {
                                        const isTokenRefreshed = (err as { isTokenRefreshed?: boolean })?.isTokenRefreshed;
                                        toast.error(isTokenRefreshed ? "Phiên đăng nhập vừa được làm mới. Vui lòng chọn lại file." : "Upload tài liệu thất bại.");
                                      } finally {
                                        setUploadingResource(null);
                                        e.target.value = "";
                                      }
                                    }}
                                  />
                                  {uploadingResource === res.id ? "Đang upload..." : res.url ? `✓ ${res.name || "Đã chọn file"}` : "Bấm để chọn file"}
                                </label>
                              )}
                              <button onClick={() => removeResource(section.id, lesson.id, res.id)} className="text-red-400 hover:text-red-500">
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <button onClick={() => addLesson(section.id)} className="flex items-center gap-1.5 text-sm text-[#3dcbb1] hover:underline mt-2" style={{ fontWeight: 600 }}>
                  <Plus size={14} /> Thêm bài học
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // --- STEP: PREVIEW ---
  const renderPreview = () => {
    const topic = topicOptions.find((t) => t.value === data.topicId);
    return (
      <div className="max-w-4xl">
        <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl p-8 text-white mb-6">
          <p className="text-xs text-[#3dcbb1] mb-2">{topic?.label}</p>
          <h2 className="text-2xl mb-3" style={{ fontWeight: 700 }}>{data.title || "Tên khoá học"}</h2>
          <p className="text-white/70 text-sm mb-4 max-w-xl">{data.description || "Mô tả khoá học..."}</p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1"><BookOpen size={14} /> {totalLessons} bài học</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {formatDuration(totalDuration)}</span>
            <span className="flex items-center gap-1">{data.sections.length} chương</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            {data.salePrice > 0 && <span className="text-xl" style={{ fontWeight: 700 }}>{formatPrice(data.salePrice)}</span>}
            {data.basePrice > 0 && (
              <span className={`text-sm ${data.salePrice > 0 ? "line-through text-white/40" : "text-xl"}`} style={data.salePrice ? {} : { fontWeight: 700 }}>
                {formatPrice(data.basePrice)}
              </span>
            )}
          </div>
        </div>

        {/* Objectives / Requirements / Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Mục tiêu", items: data.objectives, color: "text-green-600" },
            { label: "Yêu cầu", items: data.requirements, color: "text-orange-600" },
            { label: "Kết quả", items: data.outcomes, color: "text-blue-600" },
          ].map((block) => (
            <div key={block.label} className="border rounded-xl p-4">
              <h3 className="text-sm mb-2" style={{ fontWeight: 600 }}>{block.label}</h3>
              <ul className="space-y-1">
                {block.items.filter(Boolean).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className={`${block.color} mt-0.5 shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Thumbnail */}
        {data.thumbnailUrl && (
          <div className="mb-6">
            <h3 className="text-sm mb-2" style={{ fontWeight: 600 }}>Thumbnail</h3>
            <img src={getImageUrl(data.thumbnailUrl) || data.thumbnailUrl} alt="thumbnail" className="w-80 h-44 object-cover rounded-lg border" />
          </div>
        )}

        {/* Curriculum */}
        <div className="border rounded-xl overflow-hidden mb-6">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="text-sm" style={{ fontWeight: 600 }}>Nội dung khoá học</h3>
          </div>
          {data.sections.map((section) => (
            <div key={section.id} className="border-b last:border-0">
              <div className="px-4 py-3 bg-white flex items-center justify-between">
                <span className="text-sm" style={{ fontWeight: 600 }}>
                  Chương {section.orderIndex + 1}: {section.title || "(Chưa đặt tên)"}
                </span>
                <span className="text-xs text-gray-400">{section.lessons.length} bài</span>
              </div>
              {section.lessons.map((lesson) => (
                <div key={lesson.id} className="px-4 py-2 pl-8 flex items-center justify-between border-t border-gray-100 bg-white">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Play size={12} />
                    <span>Bài {lesson.orderIndex + 1}: {lesson.title || "(Chưa đặt tên)"}</span>
                    {lesson.isPreview && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Xem trước</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {lesson.resources.length > 0 && (
                      <span className="flex items-center gap-1"><FileText size={12} /> {lesson.resources.length}</span>
                    )}
                    {lesson.durationSec > 0 && <span>{formatDuration(lesson.durationSec)}</span>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Coupons preview */}
        {(data.coupons || []).length > 0 && (
          <div className="border rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-50 px-4 py-3 border-b flex items-center gap-2">
              <Tag size={14} className="text-[#3dcbb1]" />
              <h3 className="text-sm" style={{ fontWeight: 600 }}>Mã giảm giá ({(data.coupons || []).length} mã)</h3>
            </div>
            <div className="p-4 space-y-2">
              {(data.coupons || []).map((coupon) => (
                <div key={coupon.id} className="flex items-center justify-between px-4 py-3 bg-white border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#3dcbb1]/10 text-[#3dcbb1] px-3 py-1 rounded text-sm tracking-wider" style={{ fontWeight: 700 }}>{coupon.code || "—"}</span>
                    {coupon.code && (
                      <button
                        onClick={() => copyCode(coupon.code, `preview-${coupon.id}`)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#3dcbb1] transition"
                        title="Sao chép mã"
                      >
                        {copiedId === `preview-${coupon.id}` ? <><Check size={12} className="text-green-500" /> <span className="text-green-500">Đã sao chép</span></> : <><Copy size={12} /> Sao chép</>}
                      </button>
                    )}
                    <span className="text-sm text-gray-600">
                      {coupon.discountType === "percent" ? `Giảm ${coupon.discountValue}%` : `Giảm ${formatPrice(coupon.discountValue)}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{coupon.expiresAt ? `HSD: ${new Date(coupon.expiresAt).toLocaleDateString("vi-VN")}` : "Không hết hạn"}</span>
                    <span>{coupon.maxUsage > 0 ? `${coupon.maxUsage} lượt` : "Không giới hạn"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        {data.status === "DRAFT" && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <Send size={18} className="text-blue-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm" style={{ fontWeight: 600 }}>Gửi duyệt khoá học</p>
              <p className="text-xs text-gray-500">Sau khi gửi, admin sẽ xem xét và phê duyệt khoá học của bạn.</p>
            </div>
            <button
              onClick={async () => {
                // Pass SUBMITTED status to onSave — backend will handle the actual submit
                await onSave({ ...data, status: "SUBMITTED" });
              }}
              disabled={saving}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition shrink-0 disabled:opacity-60"
              style={{ fontWeight: 600 }}
            >
              {saving ? "Đang lưu..." : "Gửi duyệt"}
            </button>
          </div>
        )}
        {data.status === "SUBMITTED" && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <CheckCircle size={18} className="text-green-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-green-700" style={{ fontWeight: 600 }}>Đã gửi duyệt thành công!</p>
              <p className="text-xs text-green-600">Admin sẽ xem xét và phê duyệt khoá học của bạn.</p>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition shrink-0"
              style={{ fontWeight: 600 }}
            >
              <ArrowLeft size={14} /> Quay lại danh sách khoá học
            </button>
          </div>
        )}
        {data.status === "PUBLISHED" && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <CheckCircle size={18} className="text-green-600" />
            <p className="text-sm text-green-700" style={{ fontWeight: 600 }}>Khoá học đã được duyệt!</p>
          </div>
        )}
      </div>
    );
  };

  const steps: { key: Step; label: string }[] = [
    { key: "info", label: "Thông tin khoá học" },
    { key: "sections", label: "Chương & bài học" },
    { key: "preview", label: "Xem trước & gửi duyệt" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            if (data.title.trim()) {
              onSave(data);
              if (course) onBack();
            } else {
              onBack();
            }
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl" style={{ fontWeight: 700 }}>{course ? "Chỉnh sửa khoá học" : "Tạo khoá học mới"}</h1>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <button
              onClick={() => setStep(s.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${step === s.key ? "bg-[#3dcbb1] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              style={{ fontWeight: step === s.key ? 600 : 400 }}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">{i + 1}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < steps.length - 1 && <ArrowRight size={14} className="text-gray-300" />}
          </div>
        ))}
      </div>

      {/* Content */}
      {step === "info" && renderInfo()}
      {step === "sections" && renderSections()}
      {step === "preview" && renderPreview()}

      {actionMessage && (
        <p className="mt-4 max-w-4xl text-sm text-gray-600">{actionMessage}</p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t max-w-4xl">
        <button
          onClick={() => {
            const idx = steps.findIndex((s) => s.key === step);
            if (idx > 0) setStep(steps[idx - 1].key);
          }}
          disabled={step === "info"}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSave(data)}
            disabled={saving}
            className="px-5 py-2 border rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-60"
            style={{ fontWeight: 600 }}
          >
            {saving ? "Đang lưu..." : "Lưu nháp"}
          </button>
          {step !== "preview" && (
            <button
              onClick={() => {
                const idx = steps.findIndex((s) => s.key === step);
                if (idx < steps.length - 1) setStep(steps[idx + 1].key);
              }}
              className="flex items-center gap-1.5 bg-[#3dcbb1] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#35b89f] transition"
              style={{ fontWeight: 600 }}
            >
              Tiếp theo <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Array field component ---
function ArrayFieldEditor({
  label, items, field, onUpdate, onAdd, onRemove, placeholder,
}: {
  label: string;
  items: string[];
  field: "objectives" | "requirements" | "outcomes";
  onUpdate: (field: "objectives" | "requirements" | "outcomes", idx: number, val: string) => void;
  onAdd: (field: "objectives" | "requirements" | "outcomes") => void;
  onRemove: (field: "objectives" | "requirements" | "outcomes", idx: number) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 block mb-1">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 mb-2">
          <input
            value={item}
            onChange={(e) => onUpdate(field, i, e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]"
            placeholder={placeholder}
          />
          {items.length > 1 && (
            <button onClick={() => onRemove(field, i)} className="text-red-400 hover:text-red-500"><X size={16} /></button>
          )}
        </div>
      ))}
      <button onClick={() => onAdd(field)} className="text-xs text-[#3dcbb1] hover:underline flex items-center gap-1" style={{ fontWeight: 600 }}>
        <Plus size={12} /> Thêm mục
      </button>
    </div>
  );
}