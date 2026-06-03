import { useEffect, useRef, useState } from "react";
import { Camera, Loader2, Globe, Mail, Calendar, GraduationCap } from "lucide-react";
import { userService } from "../../../services/userService";
import { toast } from "sonner";
import defaultAvatar from "../../../assets/default_avatar.jfif";
import type { User } from "../../../types";
import { useAuth } from "../../../contexts/AuthContext";
import { getImageUrl } from "../../../utils/url";

interface ApplicationData {
  fullName: string;
  birthDate: string | null;
  headline: string;
  experience: string;
  expertise: string;
  educationLevel: string;
  teachingTopics: string[];
  portfolioUrl: string;
  email: string;
}

interface InstructorProfileData extends User {
  applicationData?: ApplicationData;
  headline?: string;
  expertise?: string;
  experience?: string;
  portfolioUrl?: string;
  teachingTopics?: string[];
}

function formatEducationLevel(value: string): string {
  const normalized = value.trim().toLowerCase();
  const map: Record<string, string> = {
    highschool: "Trung học phổ thông",
    high_school: "Trung học phổ thông",
    college: "Cao đẳng",
    university: "Đại học",
    bachelor: "Cử nhân",
    master: "Thạc sĩ",
    doctorate: "Tiến sĩ",
    phd: "Tiến sĩ",
  };
  return map[normalized] || value;
}

export function InstructorProfilePage() {
  const { refreshProfile } = useAuth();
  const [profile, setProfile] = useState<InstructorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await userService.getInstructorProfile();
        const d = data as InstructorProfileData;

        // Nếu profile chưa có giá trị, lấy từ applicationData ban đầu
        const app = d.applicationData;
        if (app) {
          if (!d.headline) d.headline = app.headline || "";
          if (!d.expertise) d.expertise = app.expertise || "";
          if (!d.experience) d.experience = app.experience || "";
          if (!d.portfolioUrl) d.portfolioUrl = app.portfolioUrl || "";
          if (!d.teachingTopics || d.teachingTopics.length === 0) d.teachingTopics = app.teachingTopics || [];
        }

        setProfile(d);
      } catch {
        setError("Không thể tải hồ sơ giảng viên.");
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const updateField = (field: string, value: string | string[]) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handlePickAvatar = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn file ảnh hợp lệ.");
      event.target.value = "";
      return;
    }

    // Chỉ preview, chưa upload – đợi bấm Lưu
    const previewUrl = URL.createObjectURL(file);
    updateField("avatarUrl", previewUrl);
    setPendingAvatarFile(file);
    event.target.value = "";
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      setSaving(true);
      setError("");

      // Upload avatar nếu có ảnh mới đang chờ
      if (pendingAvatarFile) {
        try {
          const avatarResult = await userService.uploadInstructorAvatar(pendingAvatarFile);
          setProfile((prev) => (prev ? { ...prev, avatarUrl: avatarResult.avatarUrl } : prev));
          setPendingAvatarFile(null);
        } catch (uploadError) {
          if (uploadError instanceof Error) {
            if (uploadError.message.includes("401") || uploadError.message.includes("Unauthorized")) {
              toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            } else if (uploadError.message.includes("NetworkError") || uploadError.message.includes("timeout")) {
              toast.error("Lỗi kết nối. Vui lòng kiểm tra internet và thử lại.");
            } else {
              toast.error("Không thể tải lên ảnh đại diện. Vui lòng thử lại.");
            }
          } else {
            toast.error("Không thể tải lên ảnh đại diện.");
          }
          throw uploadError;
        }
      }

      const updated = await userService.updateInstructorProfile({
        displayName: profile.displayName,
        headline: profile.headline,
        bio: profile.bio,
        expertise: profile.expertise,
        experience: profile.experience,
        portfolioUrl: profile.portfolioUrl,
        teachingTopics: profile.teachingTopics,
      } as Partial<User>);
      setProfile((prev) => (prev ? { ...prev, ...updated } : updated as InstructorProfileData));
      toast.success("Hồ sơ đã được cập nhật!");
      try { await refreshProfile(); } catch { /* ignore sidebar refresh error */ }
    } catch {
      if (!error) {
        toast.error("Không thể lưu hồ sơ. Vui lòng thử lại.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
        <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
        Đang tải hồ sơ giảng viên...
      </div>
    );
  }

  if (!profile) {
    return <div className="rounded-xl border bg-white py-16 text-center text-sm text-amber-600">{error || "Không có dữ liệu"}</div>;
  }

  const app = profile.applicationData;

  return (
    <div>
      <h1 className="mb-6 text-2xl" style={{ fontWeight: 700 }}>Hồ sơ giảng viên</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* ── Cột trái: Avatar + Thông tin chỉnh sửa chính ── */}
        <div className="space-y-5">
          {/* Avatar Card */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg text-[#163c33]" style={{ fontWeight: 700 }}>Thông tin hiển thị</h2>

            <div className="mb-6 flex items-center gap-4 border-b pb-6">
              <div className="relative h-20 w-20 shrink-0">
                <button type="button" onClick={handlePickAvatar} className="h-20 w-20 overflow-hidden rounded-full cursor-pointer">
                  <img src={getImageUrl(profile.avatarUrl) || defaultAvatar} alt="avatar" className="h-20 w-20 rounded-full object-cover" onError={(e) => { e.currentTarget.src = defaultAvatar; }} />
                </button>
                <button type="button" onClick={handlePickAvatar} className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 cursor-pointer">
                  <Camera size={14} className="text-white" />
                </button>
                <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </div>
              <div className="min-w-0">
                <p className="truncate" style={{ fontWeight: 700 }}>{profile.displayName || profile.fullName || "Giảng viên"}</p>
                <p className="text-sm text-gray-500">{profile.email || ""}</p>
                <p className="mt-1 text-[11px] text-gray-400">Bấm vào avatar để thay đổi ảnh</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-gray-500">Tên hiển thị</label>
                <input
                  value={profile.displayName || ""}
                  onChange={(e) => updateField("displayName", e.target.value)}
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
                  style={{ color: '#1f2937' }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Giới thiệu ngắn</label>
                <input
                  value={profile.headline || ""}
                  onChange={(e) => updateField("headline", e.target.value)}
                  placeholder="VD: Giảng viên CNTT | 5 năm kinh nghiệm..."
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
                  style={{ color: '#1f2937' }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Chuyên môn</label>
                <input
                  value={profile.expertise || ""}
                  onChange={(e) => updateField("expertise", e.target.value)}
                  placeholder="VD: Lập trình Web, Machine Learning..."
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
                  style={{ color: '#1f2937' }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Kinh nghiệm</label>
                <textarea
                  rows={3}
                  value={profile.experience || ""}
                  onChange={(e) => updateField("experience", e.target.value)}
                  placeholder="Mô tả kinh nghiệm giảng dạy, làm việc..."
                  className="w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
                  style={{ color: '#1f2937' }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Portfolio / Website</label>
                <input
                  value={profile.portfolioUrl || ""}
                  onChange={(e) => updateField("portfolioUrl", e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
                  style={{ color: '#1f2937' }}
                />
              </div>
            </div>

            {error ? <p className="mt-4 text-sm text-amber-600">{error}</p> : null}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => { void handleSave(); }}
                disabled={saving}
                className="rounded-lg bg-[#3dcbb1] px-6 py-2.5 text-sm text-white hover:bg-[#35b89f] disabled:opacity-50 cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>

        {/* ── Cột phải: Thông tin từ đơn ứng tuyển (chỉ đọc) ── */}
        {app && (
          <div className="space-y-5">
            {/* Thông tin cá nhân */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg text-[#163c33]" style={{ fontWeight: 700 }}>Thông tin cá nhân (từ đơn)</h2>
              <p className="text-xs text-gray-400 mb-4">Các thông tin bên dưới lấy từ hồ sơ ứng tuyển, không thể chỉnh sửa.</p>
              <div className="space-y-3 text-sm text-gray-700">
                {app.fullName && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#3dcbb1]"><GraduationCap size={16} /></span>
                    <div>
                      <p className="text-xs text-gray-400">Họ và tên</p>
                      <p style={{ fontWeight: 600 }}>{app.fullName}</p>
                    </div>
                  </div>
                )}
                {app.email && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#3dcbb1]"><Mail size={16} /></span>
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <p style={{ fontWeight: 600 }}>{app.email}</p>
                    </div>
                  </div>
                )}
                {app.birthDate && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#3dcbb1]"><Calendar size={16} /></span>
                    <div>
                      <p className="text-xs text-gray-400">Ngày sinh</p>
                      <p style={{ fontWeight: 600 }}>{new Date(app.birthDate).toLocaleDateString("vi-VN")}</p>
                    </div>
                  </div>
                )}
                {app.educationLevel && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#3dcbb1]"><GraduationCap size={16} /></span>
                    <div>
                      <p className="text-xs text-gray-400">Trình độ học vấn</p>
                      <p style={{ fontWeight: 600 }}>{formatEducationLevel(app.educationLevel)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Portfolio link */}
            {app.portfolioUrl && (
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg text-[#163c33]" style={{ fontWeight: 700 }}>Portfolio (từ đơn)</h2>
                <div className="flex items-start gap-3">
                  <Globe size={16} className="mt-0.5 text-[#3dcbb1] shrink-0" />
                  <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-sm text-[#1b8b78] hover:underline break-all" style={{ fontWeight: 600 }}>
                    {app.portfolioUrl}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
