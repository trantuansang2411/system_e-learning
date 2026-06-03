import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle, Clock3, Loader2, UserX } from "lucide-react";
import { Modal, message } from "antd";
import { useNavigate } from "react-router";
import { adminService } from "../../../services/adminService";
import type { InstructorApplication } from "../../../types";
import { getImageUrl } from "../../../utils/url";

type AppStatus = "PENDING" | "APPROVED" | "REJECTED";

const PAGE_SIZE = 10;

const DEFAULT_AVATAR_URL = "https://ui-avatars.com/api/?name=User&background=E5E7EB&color=111827&size=128";

function pickString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function getApplicantName(application: InstructorApplication): string {
  const app = application as InstructorApplication & Record<string, unknown>;
  const appData = asRecord(application.data);
  const user = asRecord(app.user);
  const profile = asRecord(app.profile);

  const name = pickString(
    app.fullName,
    app.displayName,
    app.name,
    appData.fullName,
    appData.displayName,
    appData.name,
    user.fullName,
    user.displayName,
    user.name,
    profile.fullName,
    profile.displayName,
    profile.name,
  );

  return name || "Chưa cập nhật tên";
}

function getApplicantAvatar(application: InstructorApplication): string {
  const app = application as InstructorApplication & Record<string, unknown>;
  const appData = asRecord(application.data);
  const user = asRecord(app.user);
  const profile = asRecord(app.profile);

  // Check profileImageUrl first (newly uploaded image during application)
  return pickString(
    appData.profileImageUrl,
    application.avatarUrl,
    app.avatarUrl,
    app.imageUrl,
    appData.avatarUrl,
    appData.imageUrl,
    user.avatarUrl,
    user.imageUrl,
    profile.avatarUrl,
    profile.imageUrl,
  ) || DEFAULT_AVATAR_URL;
}

export function AdminInstructors() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AppStatus | "ALL">("ALL");
  const [applications, setApplications] = useState<InstructorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actingUserId, setActingUserId] = useState<string | null>(null);
  const [counts, setCounts] = useState({ PENDING: 0, APPROVED: 0, REJECTED: 0 });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const loadCounts = async () => {
    try {
      const [pending, approved, rejected] = await Promise.all([
        adminService.getApplications({ status: "PENDING", page: 1, limit: 1 }),
        adminService.getApplications({ status: "APPROVED", page: 1, limit: 1 }),
        adminService.getApplications({ status: "REJECTED", page: 1, limit: 1 }),
      ]);
      setCounts({
        PENDING: pending.total || 0,
        APPROVED: approved.total || 0,
        REJECTED: rejected.total || 0,
      });
    } catch {
      // giữ counts cũ nếu lỗi
    }
  };

  const loadApplications = async (p: number, s: typeof status) => {
    try {
      setLoading(true);
      setError("");
      const res = await adminService.getApplications({
        status: s === "ALL" ? undefined : s,
        page: p,
        limit: PAGE_SIZE,
      });
      setApplications(res.items || []);
      setTotal(res.total || 0);
    } catch {
      setError("Không thể tải danh sách đơn đăng ký giảng viên.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCounts();
  }, []);

  useEffect(() => {
    void loadApplications(page, status);
  }, [page, status]);

  const handleStatusChange = (s: typeof status) => {
    setStatus(s);
    setPage(1);
  };

  const handleApprove = async (userId: string) => {
    Modal.confirm({
      title: "Duyệt giảng viên",
      content: "Bạn muốn duyệt ứng viên này?",
      okText: "Có",
      cancelText: "Không",
      onOk: async () => {
        try {
          setActingUserId(userId);
          await adminService.approveInstructor(userId);
          message.success("Đã duyệt giảng viên thành công!");
          await Promise.all([loadApplications(page, status), loadCounts()]);
        } catch (err: any) {
          message.error(err.response?.data?.message || "Duyệt thất bại");
        } finally {
          setActingUserId(null);
        }
      },
    });
  };

  const handleReject = async (userId: string) => {
    Modal.confirm({
      title: "Từ chối đơn đăng ký",
      content: "Bạn muốn từ chối ứng viên này?",
      okText: "Có",
      cancelText: "Không",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          setActingUserId(userId);
          await adminService.rejectInstructor(userId);
          message.success("Đã từ chối đơn đăng ký!");
          await Promise.all([loadApplications(page, status), loadCounts()]);
        } catch (err: any) {
          message.error(err.response?.data?.message || "Từ chối thất bại");
        } finally {
          setActingUserId(null);
        }
      },
    });
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {([
          { key: "ALL", label: "Tất cả" },
          { key: "PENDING", label: "Chờ duyệt" },
          { key: "APPROVED", label: "Đã duyệt" },
          { key: "REJECTED", label: "Từ chối" },
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
        <StatCard label="Chờ duyệt" value={counts.PENDING} icon={<Clock3 size={15} className="text-yellow-600" />} />
        <StatCard label="Đã duyệt" value={counts.APPROVED} icon={<CheckCircle size={15} className="text-green-600" />} />
        <StatCard label="Từ chối" value={counts.REJECTED} icon={<UserX size={15} className="text-red-600" />} />
      </div>

      {loading ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
          Đang tải dữ liệu...
        </div>
      ) : error ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-amber-600">{error}</div>
      ) : applications.length === 0 ? (
        <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-400">Không có đơn đăng ký nào.</div>
      ) : (
        <div className="space-y-3">
          {applications.map((item) => {
            const appData = item.data || {};
            const fullName = getApplicantName(item);
            const avatarUrl = getApplicantAvatar(item);
            const expertise = typeof appData.expertise === "string" ? appData.expertise : "Chưa cập nhật";
            const experience = typeof appData.experience === "string" ? appData.experience : "";
            const motivation = typeof appData.motivation === "string" ? appData.motivation : "";
            return (
              <div
                key={`${item.userId}-${item.createdAt}`}
                className="rounded-xl border bg-white p-4 cursor-pointer hover:border-[#3dcbb1]/40"
                onClick={() => {
                  navigate(`/admin/instructors/${item.userId}`);
                }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex flex-1 gap-3">
                    <img src={getImageUrl(avatarUrl) || avatarUrl} alt={fullName} className="h-12 w-12 shrink-0 rounded-full object-cover border" onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR_URL; }} />

                    <div className="min-w-0">
                      <p className="text-sm" style={{ fontWeight: 700 }}>{fullName}</p>
                      <p className="mt-1 text-xs text-gray-500">{expertise}</p>
                      <p className="mt-1 text-xs text-gray-400">Tạo lúc: {new Date(item.createdAt).toLocaleString("vi-VN")}</p>
                      {experience ? <p className="mt-2 text-sm text-gray-600">Kinh nghiệm: {experience}</p> : null}
                      {motivation ? <p className="mt-1 text-sm text-gray-600">Động lực: {motivation}</p> : null}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              </div>
            );
          })}
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

function StatusBadge({ status }: { status: AppStatus }) {
  const style = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  }[status];

  const label = {
    PENDING: "Chờ duyệt",
    APPROVED: "Đã duyệt",
    REJECTED: "Từ chối",
  }[status];

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs ${style}`} style={{ fontWeight: 600 }}>
      {label}
    </span>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
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
