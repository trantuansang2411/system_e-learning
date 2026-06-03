import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, BookOpenCheck, Briefcase, CalendarDays, Globe, GraduationCap, Loader2, User, UserCheck, UserX } from "lucide-react";
import { Modal, message } from "antd";
import { adminService } from "../../../services/adminService";
import type { InstructorApplication } from "../../../types";
import { getImageUrl } from "../../../utils/url";

const DEFAULT_AVATAR_URL = "https://ui-avatars.com/api/?name=User&background=E5E7EB&color=111827&size=160";

type AppStatus = "PENDING" | "APPROVED" | "REJECTED";

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

    return (
        pickString(
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
        ) || "Chưa cập nhật tên"
    );
}

function getApplicantAvatar(application: InstructorApplication): string {
    const app = application as InstructorApplication & Record<string, unknown>;
    const appData = asRecord(application.data);
    const user = asRecord(app.user);
    const profile = asRecord(app.profile);

    // Check profileImageUrl first (newly uploaded image during application)
    return (
        pickString(
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
        ) || DEFAULT_AVATAR_URL
    );
}

function statusMeta(status: AppStatus) {
    if (status === "APPROVED") {
        return { label: "Đã duyệt", chipClass: "bg-green-100 text-green-700", icon: <UserCheck size={16} className="text-green-600" /> };
    }

    if (status === "REJECTED") {
        return { label: "Từ chối", chipClass: "bg-red-100 text-red-700", icon: <UserX size={16} className="text-red-600" /> };
    }

    return { label: "Chờ duyệt", chipClass: "bg-yellow-100 text-yellow-700", icon: <BookOpenCheck size={16} className="text-yellow-600" /> };
}

function formatEducationLevel(value: string): string {
    const normalized = value.trim().toLowerCase();
    const educationMap: Record<string, string> = {
        highschool: "Trung học phổ thông",
        high_school: "Trung học phổ thông",
        college: "Cao đẳng",
        university: "Đại học",
        bachelor: "Cử nhân",
        master: "Thạc sĩ",
        doctorate: "Tiến sĩ",
        phd: "Tiến sĩ",
    };

    return educationMap[normalized] || value;
}

export function AdminInstructorDetailPage() {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const [detail, setDetail] = useState<InstructorApplication | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [acting, setActing] = useState(false);

    const loadDetail = async () => {
        if (!userId) {
            setError("Thiếu mã người dùng.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");
            const result = await adminService.getApplicationDetail(userId);
            setDetail(result);
        } catch {
            setError("Không thể tải chi tiết hồ sơ giảng viên.");
            setDetail(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadDetail();
    }, [userId]);

    const handleApprove = async () => {
        if (!detail) {
            return;
        }

        Modal.confirm({
            title: "Duyệt giảng viên",
            content: "Bạn muốn duyệt hồ sơ này?",
            okText: "Duyệt",
            cancelText: "Huỷ",
            onOk: async () => {
                try {
                    setActing(true);
                    await adminService.approveInstructor(detail.userId);
                    message.success("Đã duyệt giảng viên thành công.");
                    await loadDetail();
                } catch (err: any) {
                    message.error(err?.response?.data?.message || "Duyệt thất bại.");
                } finally {
                    setActing(false);
                }
            },
        });
    };

    const handleReject = async () => {
        if (!detail) {
            return;
        }

        Modal.confirm({
            title: "Từ chối hồ sơ",
            content: "Bạn muốn từ chối hồ sơ này?",
            okText: "Từ chối",
            cancelText: "Huỷ",
            okButtonProps: { danger: true },
            onOk: async () => {
                try {
                    setActing(true);
                    await adminService.rejectInstructor(detail.userId);
                    message.success("Đã từ chối hồ sơ.");
                    await loadDetail();
                } catch (err: any) {
                    message.error(err?.response?.data?.message || "Từ chối thất bại.");
                } finally {
                    setActing(false);
                }
            },
        });
    };

    const appData = useMemo(() => asRecord(detail?.data), [detail]);
    const fullName = detail ? getApplicantName(detail) : "";
    const avatarUrl = detail ? getApplicantAvatar(detail) : DEFAULT_AVATAR_URL;
    const meta = detail ? statusMeta(detail.status) : null;

    const headline = pickString(appData.headline, appData.bio, appData.intro);
    const expertise = pickString(appData.expertise, appData.speciality);
    const experience = pickString(appData.experience);
    const educationLevel = pickString(appData.educationLevel, appData.education);
    const portfolioUrl = pickString(appData.portfolioUrl, appData.portfolio);
    const birthDateRaw = pickString(appData.birthDate, appData.dob);

    return (
        <section className="bg-[#f5f8f7] min-h-screen py-6 md:py-8">
            <div className="mx-auto w-full max-w-6xl px-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <button
                        onClick={() => navigate("/admin")}
                        className="inline-flex items-center gap-2 rounded-lg border bg-white px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        <ArrowLeft size={16} /> Quay lại danh sách
                    </button>

                    {detail?.status === "PENDING" && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleReject}
                                disabled={acting}
                                className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
                                style={{ fontWeight: 600 }}
                            >
                                Từ chối
                            </button>
                            <button
                                onClick={handleApprove}
                                disabled={acting}
                                className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-60"
                                style={{ fontWeight: 600 }}
                            >
                                Duyệt giảng viên
                            </button>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="rounded-2xl border bg-white px-6 py-14 text-center text-sm text-gray-500">
                        <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
                        Đang tải chi tiết hồ sơ...
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border bg-white px-6 py-14 text-center text-sm text-amber-600">{error}</div>
                ) : !detail ? (
                    <div className="rounded-2xl border bg-white px-6 py-14 text-center text-sm text-gray-400">Không tìm thấy hồ sơ.</div>
                ) : (
                    <div className="space-y-4">
                        {/* ── Header ── */}
                        <article className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={getImageUrl(avatarUrl) || avatarUrl}
                                        alt={fullName}
                                        className="h-16 w-16 shrink-0 rounded-full border-2 border-[#e0f3ef] object-cover"
                                        onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR_URL; }}
                                    />
                                    <div>
                                        <h1 className="text-xl text-[#163c33]" style={{ fontWeight: 700 }}>{fullName}</h1>
                                        {expertise && <p className="mt-1 text-sm text-[#1b8b78]">{expertise}</p>}
                                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-400">
                                            <CalendarDays size={13} />
                                            Ngày gửi: {new Date(detail.createdAt).toLocaleDateString("vi-VN")}
                                        </p>
                                    </div>
                                </div>
                                {meta && (
                                    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${meta.chipClass}`} style={{ fontWeight: 600 }}>
                                        {meta.icon}{meta.label}
                                    </span>
                                )}
                            </div>
                        </article>

                        {/* ── Thông tin cá nhân ── */}
                        {(fullName || birthDateRaw || headline) && (
                            <article className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">
                                <h2 className="mb-4 flex items-center gap-2 text-base text-[#163c33]" style={{ fontWeight: 700 }}>
                                    <User size={17} className="text-[#3dcbb1]" /> Thông tin cá nhân
                                </h2>
                                <div className="space-y-3 text-sm text-gray-700">
                                    {fullName && (
                                        <div>
                                            <p className="text-xs text-gray-400">Họ và tên</p>
                                            <p style={{ fontWeight: 600 }}>{fullName}</p>
                                        </div>
                                    )}
                                    {birthDateRaw && (
                                        <div>
                                            <p className="text-xs text-gray-400">Ngày sinh</p>
                                            <p style={{ fontWeight: 600 }}>{new Date(birthDateRaw).toLocaleDateString("vi-VN")}</p>
                                        </div>
                                    )}
                                    {headline && (
                                        <div>
                                            <p className="text-xs text-gray-400">Giới thiệu</p>
                                            <p className="leading-relaxed">{headline}</p>
                                        </div>
                                    )}
                                </div>
                            </article>
                        )}

                        {/* ── Kinh nghiệm & Chuyên môn ── */}
                        {(experience || expertise) && (
                            <article className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">
                                <h2 className="mb-4 flex items-center gap-2 text-base text-[#163c33]" style={{ fontWeight: 700 }}>
                                    <Briefcase size={17} className="text-[#3dcbb1]" /> Kinh nghiệm & Chuyên môn
                                </h2>
                                <div className="space-y-3 text-sm text-gray-700">
                                    {experience && (
                                        <div>
                                            <p className="text-xs text-gray-400">Kinh nghiệm</p>
                                            <p className="leading-relaxed">{experience}</p>
                                        </div>
                                    )}
                                    {expertise && (
                                        <div>
                                            <p className="text-xs text-gray-400">Chuyên môn</p>
                                            <p>{expertise}</p>
                                        </div>
                                    )}
                                </div>
                            </article>
                        )}

                        {/* ── Học vấn ── */}
                        {educationLevel && (
                            <article className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">
                                <h2 className="mb-4 flex items-center gap-2 text-base text-[#163c33]" style={{ fontWeight: 700 }}>
                                    <GraduationCap size={17} className="text-[#3dcbb1]" /> Học vấn
                                </h2>
                                <div className="space-y-3 text-sm text-gray-700">
                                    <div>
                                        <p className="text-xs text-gray-400">Trình độ</p>
                                        <p style={{ fontWeight: 600 }}>{formatEducationLevel(educationLevel)}</p>
                                    </div>
                                </div>
                            </article>
                        )}

                        {/* ── Portfolio ── */}
                        {portfolioUrl && (
                            <article className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">
                                <h2 className="mb-3 flex items-center gap-2 text-base text-[#163c33]" style={{ fontWeight: 700 }}>
                                    <Globe size={17} className="text-[#3dcbb1]" /> Portfolio / LinkedIn
                                </h2>
                                <a href={portfolioUrl} target="_blank" rel="noreferrer" className="text-sm text-[#1b8b78] hover:underline break-all" style={{ fontWeight: 600 }}>
                                    {portfolioUrl}
                                </a>
                            </article>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
