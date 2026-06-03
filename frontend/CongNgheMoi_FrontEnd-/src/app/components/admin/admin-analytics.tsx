import { useEffect, useRef, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line,
} from "recharts";
import {
  analyticsService,
  type AnalyticsStats, type CourseViewStat, type SearchStat,
  type RevenueStats, type CompletionStat, type FunnelStat,
  type ViewPerDay, type CourseRevenueStat, type EnrollmentStat,
  type TimeRange, type TimeseriesData,
} from "../../../services/analyticsService";

const ACCENT = "#3dcbb1";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const vnd = (n: number) => n.toLocaleString("vi-VN") + " ₫";

function StatCard({ label, value, suffix = "" }: { label: string; value: string | number; suffix?: string }) {
  return (
    <div className="bg-[#1a1a2e] rounded-xl p-5 flex flex-col gap-2 text-white">
      <p className="text-xs text-white/50 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold" style={{ color: ACCENT }}>
        {typeof value === "number" ? value.toLocaleString("vi-VN") : value}{suffix}
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold text-gray-800 mb-3">{children}</h2>;
}

const RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: "today",     label: "Hôm nay" },
  { value: "7d",        label: "7 ngày qua" },
  { value: "30d",       label: "30 ngày qua" },
  { value: "thismonth", label: "Tháng này" },
];

export function AdminAnalytics() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [topCourses, setTopCourses] = useState<CourseViewStat[]>([]);
  const [topSearches, setTopSearches] = useState<SearchStat[]>([]);
  const [revenue, setRevenue] = useState<RevenueStats | null>(null);
  const [completions, setCompletions] = useState<CompletionStat[]>([]);
  const [funnel, setFunnel] = useState<FunnelStat[]>([]);
  const [viewsPerDay, setViewsPerDay] = useState<ViewPerDay[]>([]);
  const [revenueByCourse, setRevenueByCourse] = useState<CourseRevenueStat[]>([]);
  const [enrollmentStats, setEnrollmentStats] = useState<EnrollmentStat[]>([]);
  const [liveEvent, setLiveEvent] = useState<string | null>(null);
  const [wsConnected, setWsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [timeseries, setTimeseries] = useState<TimeseriesData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const loadTimeseries = (range: TimeRange) => {
    void analyticsService.getTimeseries(range).then((d) => setTimeseries(d as unknown as TimeseriesData));
  };

  const refreshAll = () => {
    void Promise.allSettled([
      analyticsService.getStats().then((d) => setStats(d as unknown as AnalyticsStats)),
      analyticsService.getTopCourses(5).then((d) => setTopCourses(d as unknown as CourseViewStat[])),
      analyticsService.getTopSearches(5).then((d) => setTopSearches(d as unknown as SearchStat[])),
      analyticsService.getRevenue().then((d) => setRevenue(d as unknown as RevenueStats)),
      analyticsService.getCompletions().then((d) => setCompletions(d as unknown as CompletionStat[])),
      analyticsService.getFunnel(8).then((d) => setFunnel(d as unknown as FunnelStat[])),
      analyticsService.getViewsPerDay(7).then((d) => setViewsPerDay(d as unknown as ViewPerDay[])),
      analyticsService.getRevenueByCourse().then((d) => setRevenueByCourse(d as unknown as CourseRevenueStat[])),
      analyticsService.getEnrollmentStats().then((d) => setEnrollmentStats(d as unknown as EnrollmentStat[])),
    ]);
  };

  useEffect(() => { refreshAll(); loadTimeseries(timeRange); }, []);

  useEffect(() => { loadTimeseries(timeRange); }, [timeRange]);

  // Auto-refresh timeseries mỗi 60s để cập nhật realtime theo giờ
  useEffect(() => {
    const timer = setInterval(() => loadTimeseries(timeRange), 60_000);
    return () => clearInterval(timer);
  }, [timeRange]);

  useEffect(() => {
    const wsUrl = BASE_URL.replace(/^http/, "ws") + "/api/v1/analytics/ws";
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setWsConnected(true);
    ws.onclose = () => setWsConnected(false);
    ws.onerror = () => setWsConnected(false);
    ws.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data as string) as { type: string; count?: number };
        if (payload.type === "active_users") {
          setActiveUsers(payload.count ?? 0);
          return;
        }
        setLiveEvent(payload.type);
        void analyticsService.getStats().then((d) => setStats(d as unknown as AnalyticsStats));
        if (payload.type === "view_course") {
          void analyticsService.getTopCourses(5).then((d) => setTopCourses(d as unknown as CourseViewStat[]));
          void analyticsService.getViewsPerDay(7).then((d) => setViewsPerDay(d as unknown as ViewPerDay[]));
          void analyticsService.getFunnel(8).then((d) => setFunnel(d as unknown as FunnelStat[]));
          void analyticsService.getTimeseries(timeRange).then((d) => setTimeseries(d as unknown as TimeseriesData));
        } else if (payload.type === "search_course") {
          void analyticsService.getTopSearches(5).then((d) => setTopSearches(d as unknown as SearchStat[]));
          void analyticsService.getTimeseries(timeRange).then((d) => setTimeseries(d as unknown as TimeseriesData));
        } else if (payload.type === "payment_success") {
          void analyticsService.getRevenue().then((d) => setRevenue(d as unknown as RevenueStats));
        } else if (payload.type === "course_revenue") {
          void analyticsService.getRevenue().then((d) => setRevenue(d as unknown as RevenueStats));
          void analyticsService.getRevenueByCourse().then((d) => setRevenueByCourse(d as unknown as CourseRevenueStat[]));
          void analyticsService.getFunnel(8).then((d) => setFunnel(d as unknown as FunnelStat[]));
          void analyticsService.getTimeseries(timeRange).then((d) => setTimeseries(d as unknown as TimeseriesData));
        } else if (payload.type === "add_to_cart") {
          void analyticsService.getTimeseries(timeRange).then((d) => setTimeseries(d as unknown as TimeseriesData));
        } else if (payload.type === "enroll_course") {
          void analyticsService.getEnrollmentStats().then((d) => setEnrollmentStats(d as unknown as EnrollmentStat[]));
          void analyticsService.getFunnel(8).then((d) => setFunnel(d as unknown as FunnelStat[]));
        } else if (payload.type === "complete_course") {
          void analyticsService.getCompletions().then((d) => setCompletions(d as unknown as CompletionStat[]));
          void analyticsService.getEnrollmentStats().then((d) => setEnrollmentStats(d as unknown as EnrollmentStat[]));
        }
      } catch { /* ignore */ }
    };
    return () => { ws.close(); };
  }, [timeRange]);

  const eventLabels: Record<string, string> = {
    view_course: "Xem khóa học", search_course: "Tìm kiếm",
    add_to_cart: "Thêm vào giỏ", payment_success: "Thanh toán",
    course_revenue: "Doanh thu", enroll_course: "Đăng ký",
    complete_course: "Hoàn thành",
  };

  return (
    <div className="space-y-8">
      {/* Header: WS status + active users */}
      <div className="flex items-center gap-3 text-sm flex-wrap">
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: wsConnected ? ACCENT : "#ef4444" }} />
        <span className="text-gray-500">{wsConnected ? "Realtime đang hoạt động" : "Không kết nối realtime"}</span>
        {wsConnected && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "#1a1a2e" }}>
            🟢 {activeUsers} admin online
          </span>
        )}
        {liveEvent && (
          <span className="px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: ACCENT }}>
            {eventLabels[liveEvent] ?? liveEvent}
          </span>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Lượt xem" value={stats?.total_views ?? 0} />
        <StatCard label="Lượt tìm kiếm" value={stats?.total_searches ?? 0} />
        <StatCard label="Thêm giỏ hàng" value={stats?.total_cart_adds ?? 0} />
        <StatCard label="Doanh thu" value={(stats?.total_revenue ?? 0).toLocaleString("vi-VN")} suffix=" ₫" />
        <StatCard label="Hoàn thành KH" value={stats?.courses_completed ?? 0} />
      </div>

      {/* Timeseries chart with range filter */}
      <div className="bg-white rounded-xl border p-5">
        <div className="flex items-center justify-between mb-4">
          <SectionTitle>
            {timeRange === "today" ? "Hoạt động hôm nay (theo giờ)" :
             timeRange === "7d"   ? "7 ngày qua" :
             timeRange === "30d"  ? "30 ngày qua" : "Tháng này"}
          </SectionTitle>
          <div className="flex gap-1 flex-wrap">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTimeRange(opt.value)}
                className="px-3 py-1 text-xs rounded-full font-medium transition-colors"
                style={
                  timeRange === opt.value
                    ? { backgroundColor: ACCENT, color: "#fff" }
                    : { backgroundColor: "#f3f4f6", color: "#6b7280" }
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        {!timeseries || timeseries.data.every((d) => d.views === 0 && d.searches === 0) ? (
          <p className="text-sm text-gray-400 text-center py-8">Chưa có dữ liệu trong khoảng thời gian này</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timeseries.data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10 }}
                interval={timeseries.granularity === "hour" ? 2 : "preserveStartEnd"}
              />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = {
                    views: "Lượt xem", searches: "Tìm kiếm",
                    cart_adds: "Giỏ hàng", purchases: "Mua",
                  };
                  return [value, labels[name] ?? name];
                }}
              />
              <Line type="monotone" dataKey="views" stroke={ACCENT} strokeWidth={2} dot={false} name="views" />
              <Line type="monotone" dataKey="searches" stroke="#6366f1" strokeWidth={1.5} dot={false} name="searches" />
              <Line type="monotone" dataKey="cart_adds" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="cart_adds" />
              <Line type="monotone" dataKey="purchases" stroke="#10b981" strokeWidth={1.5} dot={false} name="purchases" />
            </LineChart>
          </ResponsiveContainer>
        )}
        <div className="flex gap-4 mt-3 text-xs text-gray-500 justify-end">
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5" style={{ backgroundColor: ACCENT }} /> Lượt xem</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 bg-indigo-500" /> Tìm kiếm</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 bg-amber-400" /> Giỏ hàng</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 bg-emerald-500" /> Mua</span>
        </div>
      </div>

      {/* Conversion funnel */}
      <div className="bg-white rounded-xl border p-5">
        <SectionTitle>Conversion Funnel theo khóa học</SectionTitle>
        {funnel.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">Chưa có dữ liệu</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500 text-xs">
                  <th className="pb-2 font-medium">Khóa học</th>
                  <th className="pb-2 font-medium text-right">Views</th>
                  <th className="pb-2 font-medium text-right">Giỏ hàng</th>
                  <th className="pb-2 font-medium text-right">Mua</th>
                  <th className="pb-2 font-medium text-right">View→Cart</th>
                  <th className="pb-2 font-medium text-right">Cart→Buy</th>
                  <th className="pb-2 font-medium text-right">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {funnel.map((f) => (
                  <tr key={f.course_id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2 text-gray-700 max-w-[160px] truncate">{f.course_title}</td>
                    <td className="py-2 text-right text-gray-600">{f.views.toLocaleString()}</td>
                    <td className="py-2 text-right text-gray-600">{f.cart_adds.toLocaleString()}</td>
                    <td className="py-2 text-right text-gray-600">{f.purchases.toLocaleString()}</td>
                    <td className="py-2 text-right">
                      <RateBadge rate={f.view_to_cart_rate} />
                    </td>
                    <td className="py-2 text-right">
                      <RateBadge rate={f.cart_to_purchase_rate} />
                    </td>
                    <td className="py-2 text-right font-bold" style={{ color: ACCENT }}>
                      {f.overall_conversion}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Charts: top courses + top searches */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-5">
          <SectionTitle>Top 5 khóa học được xem nhiều nhất</SectionTitle>
          {topCourses.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Chưa có dữ liệu</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topCourses} margin={{ top: 0, right: 10, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="course_title" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip formatter={(v: number) => [`${v} lượt`, "Lượt xem"]} />
                <Bar dataKey="view_count" fill={ACCENT} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl border p-5">
          <SectionTitle>Top 5 từ khóa tìm kiếm</SectionTitle>
          {topSearches.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Chưa có dữ liệu</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topSearches} margin={{ top: 0, right: 10, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="keyword" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip formatter={(v: number) => [`${v} lần`, "Số lần tìm"]} />
                <Bar dataKey="search_count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Revenue cards + Revenue by course */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-5 space-y-4">
          <SectionTitle>Doanh thu tổng quan</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500">Hôm nay</p>
              <p className="text-xl font-bold mt-1" style={{ color: ACCENT }}>{vnd(revenue?.today_revenue ?? 0)}</p>
              <p className="text-xs text-gray-400 mt-1">{revenue?.today_purchases ?? 0} đơn</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500">Tổng cộng</p>
              <p className="text-xl font-bold mt-1 text-gray-800">{vnd(revenue?.total_revenue ?? 0)}</p>
              <p className="text-xs text-gray-400 mt-1">{revenue?.total_purchases ?? 0} đơn</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <SectionTitle>Doanh thu theo khóa học</SectionTitle>
          {revenueByCourse.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Chưa có dữ liệu</p>
          ) : (
            <div className="overflow-auto max-h-52">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="pb-2 font-medium">Khóa học</th>
                    <th className="pb-2 font-medium text-right">Doanh thu</th>
                    <th className="pb-2 font-medium text-right">Đơn</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueByCourse.map((r) => (
                    <tr key={r.course_id} className="border-b last:border-0">
                      <td className="py-2 text-gray-700 truncate max-w-[150px]">{r.course_title}</td>
                      <td className="py-2 text-right font-semibold" style={{ color: ACCENT }}>{vnd(r.total_revenue)}</td>
                      <td className="py-2 text-right text-gray-500">{r.purchase_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Completion rate + Completion list */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-5">
          <SectionTitle>Completion Rate</SectionTitle>
          {enrollmentStats.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Chưa có dữ liệu</p>
          ) : (
            <div className="overflow-auto max-h-52">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="pb-2 font-medium">Khóa học</th>
                    <th className="pb-2 font-medium text-right">Đăng ký</th>
                    <th className="pb-2 font-medium text-right">Hoàn thành</th>
                    <th className="pb-2 font-medium text-right">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollmentStats.map((e) => (
                    <tr key={e.course_id} className="border-b last:border-0">
                      <td className="py-2 text-gray-700 truncate max-w-[130px]">{e.course_title}</td>
                      <td className="py-2 text-right text-gray-600">{e.enrollment_count}</td>
                      <td className="py-2 text-right text-gray-600">{e.completion_count}</td>
                      <td className="py-2 text-right font-bold">
                        <RateBadge rate={e.completion_rate} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border p-5">
          <SectionTitle>Hoàn thành khóa học</SectionTitle>
          {completions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Chưa có dữ liệu</p>
          ) : (
            <div className="overflow-auto max-h-52">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="pb-2 font-medium">Khóa học</th>
                    <th className="pb-2 font-medium text-right">Hoàn thành</th>
                  </tr>
                </thead>
                <tbody>
                  {completions.map((c) => (
                    <tr key={c.course_id} className="border-b last:border-0">
                      <td className="py-2 text-gray-700 truncate max-w-[200px]">{c.course_title || c.course_id}</td>
                      <td className="py-2 text-right font-semibold" style={{ color: ACCENT }}>{c.completion_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RateBadge({ rate }: { rate: number }) {
  const color = rate >= 50 ? "#22c55e" : rate >= 20 ? "#f59e0b" : "#ef4444";
  return (
    <span className="inline-block px-1.5 py-0.5 rounded text-xs font-semibold text-white" style={{ backgroundColor: color }}>
      {rate}%
    </span>
  );
}
