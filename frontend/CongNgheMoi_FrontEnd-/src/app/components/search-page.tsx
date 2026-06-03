import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { CourseCard } from "./course-card";
import { ChevronDown, ChevronUp, Star, SlidersHorizontal, X, BookOpen } from "lucide-react";
import { searchService } from "../../services/searchService";
import { courseService } from "../../services/courseService";
import type { Course } from "../../types";
import { getThumbnailUrl } from "../../utils/url";
import { toFiniteNumber, toSafeInt } from "../../utils/number";

function toCardCourse(course: Course) {
  const basePrice = toFiniteNumber(course.basePrice, 0);
  const salePrice = toFiniteNumber(course.salePrice, basePrice);
  const price = salePrice > 0 ? salePrice : basePrice;
  const rating = toFiniteNumber(course.ratingAvg, 0);
  const reviews = toSafeInt(course.ratingCount, 0);

  return {
    id: course.courseId,
    title: course.title,
    instructor: course.instructorName || "Giảng viên",
    rating,
    reviews,
    price,
    originalPrice: basePrice,
    image: getThumbnailUrl(course.thumbnailUrl, "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=340&fit=crop"),
    discount: basePrice > 0 && basePrice > price ? `${Math.round(((basePrice - price) / basePrice) * 100)}%` : "",
    category: course.topicId,
    totalDurationSeconds: course.totalDurationSec || 0,
  };
}

interface Category {
  categoryId: string;
  name: string;
  slug: string;
}

const DURATION_OPTIONS = [
  { label: "0-2 giờ", minSec: 0, maxSec: 7200 },
  { label: "3-5 giờ", minSec: 10800, maxSec: 18000 },
  { label: "6-12 giờ", minSec: 21600, maxSec: 43200 },
  { label: "12+ giờ", minSec: 43201, maxSec: undefined },
];

const RATING_OPTIONS = [4.5, 4.0, 3.5, 3.0];

const SORT_OPTIONS = [
  { value: "popular", label: "Phổ biến nhất" },
  { value: "newest", label: "Mới nhất" },
  { value: "price-low", label: "Giá thấp → cao" },
  { value: "price-high", label: "Giá cao → thấp" },
];

const EMPTY_FILTERS = {
  rating: null as number | null,
  duration: null as string | null,
  minPrice: null as number | null,
  maxPrice: null as number | null,
  category: null as string | null,
};

const LIMIT = 12;

function StarRow({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={s <= Math.floor(value) ? "text-yellow-400 fill-yellow-400" : s - 0.5 <= value ? "text-yellow-400 fill-yellow-200" : "text-gray-300 fill-gray-100"}
        />
      ))}
      <span className="ml-1 text-gray-600">{value}+</span>
    </span>
  );
}

function FilterSection({
  title,
  open,
  onToggle,
  children,
  hasActive,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  hasActive?: boolean;
}) {
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-sm font-bold text-gray-800 mb-3 cursor-pointer hover:text-[#176756] transition-colors duration-150"
      >
        <span className="flex items-center gap-2">
          {title}
          {hasActive && <span className="w-1.5 h-1.5 rounded-full bg-[#3dcbb1]" />}
        </span>
        {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function RadioOption({
  name,
  checked,
  onChange,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex items-center gap-2.5 text-sm cursor-pointer px-2 py-1.5 rounded-md transition-colors duration-150 ${
        checked ? "bg-[#3dcbb1]/10 text-[#176756]" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-150 ${
          checked ? "border-[#3dcbb1]" : "border-gray-300"
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-[#3dcbb1]" />}
      </div>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

function CheckboxOption({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex items-center gap-2.5 text-sm cursor-pointer px-2 py-1.5 rounded-md transition-colors duration-150 ${
        checked ? "bg-[#3dcbb1]/10 text-[#176756]" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors duration-150 ${
          checked ? "border-[#3dcbb1] bg-[#3dcbb1]" : "border-gray-300"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 text-white fill-current">
            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 bg-[#3dcbb1]/15 text-[#176756] rounded-full text-xs font-semibold">
      {label}
      <button onClick={onRemove} className="hover:bg-[#3dcbb1]/20 rounded-full p-0.5 cursor-pointer transition-colors duration-150">
        <X size={11} />
      </button>
    </span>
  );
}

function CourseCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-3.5 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

interface SidebarContentProps {
  filters: typeof EMPTY_FILTERS;
  openSections: { rating: boolean; duration: boolean; categories: boolean; price: boolean };
  categories: Category[];
  priceInputs: { min: string; max: string };
  onToggleSection: (key: "rating" | "duration" | "categories" | "price") => void;
  onFilterChange: (patch: Partial<typeof EMPTY_FILTERS>) => void;
  onPriceInputChange: (patch: { min?: string; max?: string }) => void;
}

function SidebarContent({
  filters,
  openSections,
  categories,
  priceInputs,
  onToggleSection,
  onFilterChange,
  onPriceInputChange,
}: SidebarContentProps) {
  return (
    <div className="space-y-0">
      <FilterSection
        title="Đánh giá"
        open={openSections.rating}
        onToggle={() => onToggleSection("rating")}
        hasActive={!!filters.rating}
      >
        {RATING_OPTIONS.map((r) => (
          <RadioOption
            key={r}
            name="rating"
            checked={filters.rating === r}
            onChange={() => onFilterChange({ rating: filters.rating === r ? null : r })}
          >
            <StarRow value={r} />
          </RadioOption>
        ))}
      </FilterSection>

      <FilterSection
        title="Thời lượng"
        open={openSections.duration}
        onToggle={() => onToggleSection("duration")}
        hasActive={!!filters.duration}
      >
        {DURATION_OPTIONS.map((d) => (
          <RadioOption
            key={d.label}
            name="duration"
            checked={filters.duration === d.label}
            onChange={() => onFilterChange({ duration: filters.duration === d.label ? null : d.label })}
          >
            {d.label}
          </RadioOption>
        ))}
      </FilterSection>

      <FilterSection
        title="Danh mục"
        open={openSections.categories}
        onToggle={() => onToggleSection("categories")}
        hasActive={!!filters.category}
      >
        {categories.length === 0 && (
          <p className="text-xs text-gray-400 px-2">Đang tải...</p>
        )}
        {categories.map((c) => (
          <CheckboxOption
            key={c.categoryId}
            checked={filters.category === c.categoryId}
            onChange={() => onFilterChange({ category: filters.category === c.categoryId ? null : c.categoryId })}
          >
            {c.name}
          </CheckboxOption>
        ))}
      </FilterSection>

      <FilterSection
        title="Khoảng giá"
        open={openSections.price}
        onToggle={() => onToggleSection("price")}
        hasActive={!!(filters.minPrice || filters.maxPrice)}
      >
        <div className="space-y-2 px-2">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Từ</label>
            <input
              type="number"
              placeholder="0"
              value={priceInputs.min}
              onChange={(e) => onPriceInputChange({ min: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3dcbb1] focus:ring-1 focus:ring-[#3dcbb1]/30 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Đến</label>
            <input
              type="number"
              placeholder="∞"
              value={priceInputs.max}
              onChange={(e) => onPriceInputChange({ max: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3dcbb1] focus:ring-1 focus:ring-[#3dcbb1]/30 transition-colors"
            />
          </div>
        </div>
      </FilterSection>
    </div>
  );
}

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [apiCourses, setApiCourses] = useState<ReturnType<typeof toCardCourse>[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // pendingFilters: những gì đang chọn trong sidebar (chưa apply)
  const [pendingFilters, setPendingFilters] = useState({ ...EMPTY_FILTERS });
  const [pendingPriceInputs, setPendingPriceInputs] = useState({ min: "", max: "" });

  // appliedFilters: những gì đã bấm Lọc, dùng để gọi API
  const [appliedFilters, setAppliedFilters] = useState({ ...EMPTY_FILTERS });

  const [openSections, setOpenSections] = useState({
    rating: true,
    duration: true,
    categories: true,
    price: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((p) => ({ ...p, [key]: !p[key] }));
  };

  useEffect(() => {
    courseService.getCategories().then(setCategories).catch(() => {});
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedFilters({
      ...pendingFilters,
      minPrice: pendingPriceInputs.min ? Number(pendingPriceInputs.min) : null,
      maxPrice: pendingPriceInputs.max ? Number(pendingPriceInputs.max) : null,
    });
    setPage(1);
  }, [pendingFilters, pendingPriceInputs]);

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        setError("");
        let response;
        if (!query) {
          response = await courseService.getPublishedCourses({ page, limit: LIMIT });
        } else {
          const apiSort =
            sortBy === "price-low" ? "price_asc" :
            sortBy === "price-high" ? "price_desc" :
            sortBy === "popular" ? "rating" : undefined;
          const durationOption = DURATION_OPTIONS.find((d) => d.label === appliedFilters.duration);
          response = await searchService.searchCourses({
            keyword: query,
            sortBy: apiSort,
            topicId: appliedFilters.category || undefined,
            minPrice: appliedFilters.minPrice || undefined,
            maxPrice: appliedFilters.maxPrice || undefined,
            minRating: appliedFilters.rating || undefined,
            minDurationSec: durationOption?.minSec,
            maxDurationSec: durationOption?.maxSec,
            page,
            limit: LIMIT,
          });
        }
        setApiCourses(response.items.map(toCardCourse));
        setTotal(response.total);
      } catch {
        setError("Không thể tải danh sách khóa học. Vui lòng thử lại.");
        setApiCourses([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, [query, sortBy, page, appliedFilters.category, appliedFilters.minPrice, appliedFilters.maxPrice, appliedFilters.rating, appliedFilters.duration]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const clearAllFilters = () => {
    setPendingFilters({ ...EMPTY_FILTERS });
    setPendingPriceInputs({ min: "", max: "" });
    setAppliedFilters({ ...EMPTY_FILTERS });
    setPage(1);
  };

  const handleFilterChange = useCallback((patch: Partial<typeof EMPTY_FILTERS>) => {
    setPendingFilters((f) => ({ ...f, ...patch }));
  }, []);

  const handlePriceInputChange = useCallback((patch: { min?: string; max?: string }) => {
    setPendingPriceInputs((p) => ({ ...p, ...patch }));
  }, []);

  // có thay đổi chưa apply
  const isDirty =
    pendingFilters.rating !== appliedFilters.rating ||
    pendingFilters.duration !== appliedFilters.duration ||
    pendingFilters.category !== appliedFilters.category ||
    (pendingPriceInputs.min ? Number(pendingPriceInputs.min) : null) !== appliedFilters.minPrice ||
    (pendingPriceInputs.max ? Number(pendingPriceInputs.max) : null) !== appliedFilters.maxPrice;

  const appliedFilterCount = [
    appliedFilters.rating,
    appliedFilters.duration,
    appliedFilters.category,
    appliedFilters.minPrice ?? appliedFilters.maxPrice,
  ].filter(Boolean).length;

  const selectedCategory = categories.find((c) => c.categoryId === appliedFilters.category);

  const totalPages = Math.ceil(total / LIMIT);

  const sidebarProps: SidebarContentProps = {
    filters: pendingFilters,
    openSections,
    categories,
    priceInputs: pendingPriceInputs,
    onToggleSection: toggleSection,
    onFilterChange: handleFilterChange,
    onPriceInputChange: handlePriceInputChange,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Page header */}
      <div className="mb-5">
        {query ? (
          <h1 className="text-2xl font-bold text-gray-900">
            Kết quả cho <span className="text-[#176756]">&ldquo;{query}&rdquo;</span>
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-900">Tất cả khóa học</h1>
        )}
        <p className="text-sm text-gray-500 mt-1">
          {loading ? "Đang tìm kiếm…" : `${total.toLocaleString()} khóa học`}
        </p>
      </div>

      {/* Toolbar: active chips + sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileSidebarOpen((o) => !o)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-[#3dcbb1] hover:text-[#176756] transition-colors duration-150 cursor-pointer"
          >
            <SlidersHorizontal size={15} />
            Bộ lọc
            {appliedFilterCount > 0 && (
              <span className="bg-[#3dcbb1] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {appliedFilterCount}
              </span>
            )}
          </button>

          {/* Active filter chips — chỉ hiển thị filter đã apply */}
          {appliedFilters.rating && (
            <ActiveChip
              label={`${appliedFilters.rating}+ sao`}
              onRemove={() => {
                setPendingFilters((f) => ({ ...f, rating: null }));
                setAppliedFilters((f) => ({ ...f, rating: null }));
                setPage(1);
              }}
            />
          )}
          {appliedFilters.duration && (
            <ActiveChip
              label={appliedFilters.duration}
              onRemove={() => {
                setPendingFilters((f) => ({ ...f, duration: null }));
                setAppliedFilters((f) => ({ ...f, duration: null }));
                setPage(1);
              }}
            />
          )}
          {selectedCategory && (
            <ActiveChip
              label={selectedCategory.name}
              onRemove={() => {
                setPendingFilters((f) => ({ ...f, category: null }));
                setAppliedFilters((f) => ({ ...f, category: null }));
                setPage(1);
              }}
            />
          )}
          {(appliedFilters.minPrice || appliedFilters.maxPrice) && (
            <ActiveChip
              label={`${appliedFilters.minPrice?.toLocaleString() ?? "0"}đ – ${appliedFilters.maxPrice?.toLocaleString() ?? "∞"}đ`}
              onRemove={() => {
                setPendingFilters((f) => ({ ...f, minPrice: null, maxPrice: null }));
                setPendingPriceInputs({ min: "", max: "" });
                setAppliedFilters((f) => ({ ...f, minPrice: null, maxPrice: null }));
                setPage(1);
              }}
            />
          )}
          {appliedFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-150 cursor-pointer underline underline-offset-2"
            >
              Xoá tất cả
            </button>
          )}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#3dcbb1] focus:ring-1 focus:ring-[#3dcbb1]/30 text-gray-700 cursor-pointer transition-colors"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <SlidersHorizontal size={14} className="text-[#3dcbb1]" />
                Bộ lọc
              </span>
              {appliedFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-150 cursor-pointer"
                >
                  Xoá ({appliedFilterCount})
                </button>
              )}
            </div>
            <SidebarContent {...sidebarProps} />
            <button
              onClick={applyFilters}
              className={`mt-4 w-full py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors duration-150 text-white ${
                isDirty
                  ? "bg-[#3dcbb1] hover:bg-[#2db89e]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isDirty}
            >
              Áp dụng bộ lọc
            </button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <span className="font-bold text-gray-800">Bộ lọc</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
              <SidebarContent {...sidebarProps} />
              <button
                onClick={() => { applyFilters(); setMobileSidebarOpen(false); }}
                className="mt-4 w-full py-2.5 bg-[#3dcbb1] text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-[#2db89e] transition-colors duration-150"
              >
                {isDirty ? "Áp dụng bộ lọc" : "Đóng"}
              </button>
            </aside>
          </div>
        )}

        {/* Course grid */}
        <div className="flex-1 min-w-0">
          {error && (
            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)
              : apiCourses.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>

          {!loading && apiCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen size={28} className="text-gray-400" />
              </div>
              <p className="text-gray-700 font-semibold mb-1">Không tìm thấy khoá học nào</p>
              <p className="text-sm text-gray-400 mb-4">Thử thay đổi từ khoá hoặc bộ lọc</p>
              {appliedFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-[#3dcbb1] text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-[#2db89e] transition-colors duration-150"
                >
                  Xoá bộ lọc
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 disabled:opacity-40 hover:border-[#3dcbb1] hover:text-[#176756] transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                .reduce<(number | "...")[]>((acc, p, i, arr) => {
                  if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span key={`e-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      className={`w-9 h-9 border rounded-lg text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                        page === p
                          ? "bg-[#3dcbb1] text-white border-[#3dcbb1]"
                          : "border-gray-200 text-gray-600 hover:border-[#3dcbb1] hover:text-[#176756]"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 disabled:opacity-40 hover:border-[#3dcbb1] hover:text-[#176756] transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
