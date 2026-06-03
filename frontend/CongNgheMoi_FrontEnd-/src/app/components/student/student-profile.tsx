import { useEffect, useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { userService } from "../../../services/userService";
import { toast } from "sonner";
import defaultAvatar from "../../../assets/default_avatar.jfif";
import type { User } from "../../../types";
import { useAuth } from "../../../contexts/AuthContext";
import { getImageUrl } from "../../../utils/url";

export function StudentProfile() {
  const { refreshProfile } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await userService.getProfile();
        setProfile(data);
      } catch {
        setError("Không thể tải hồ sơ cá nhân.");
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const updateField = (field: keyof User, value: string) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
    setSaved(false);
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
    setSaved(false);
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
          const avatarResult = await userService.uploadUserAvatar(pendingAvatarFile);
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

      const updated = await userService.updateProfile({
        fullName: profile.fullName,
        phone: profile.phone,
        bio: profile.bio,
      });
      setProfile(updated);
      setSaved(true);
      toast.success("Hồ sơ đã được cập nhật!");
      setTimeout(() => setSaved(false), 2000);
      try { await refreshProfile(); } catch { /* ignore sidebar refresh error */ }
    } catch {
      if (!error) {
        toast.error("Không thể cập nhật hồ sơ. Vui lòng thử lại.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-white py-16 text-center text-sm text-gray-500">
        <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
        Đang tải hồ sơ...
      </div>
    );
  }

  if (!profile) {
    return <div className="rounded-xl border bg-white py-16 text-center text-sm text-amber-600">{error || "Không có dữ liệu hồ sơ"}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-1" style={{ fontWeight: 700 }}>Hồ sơ cá nhân</h1>

      <div className="max-w-2xl rounded-xl border bg-white p-6">
        <div className="mb-6 flex items-center gap-4 border-b pb-6">
          <div className="relative h-20 w-20">
            <button type="button" onClick={handlePickAvatar} className="h-20 w-20 overflow-hidden rounded-full">
              <img
                src={getImageUrl(profile.avatarUrl) || defaultAvatar}
                alt="avatar"
                className="h-20 w-20 rounded-full object-cover"
                onError={(e) => { e.currentTarget.src = defaultAvatar; }}
              />
            </button>
            <button
              type="button"
              onClick={handlePickAvatar}
              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-black/70"
            >
              <Camera size={14} className="text-white" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div>
            <p className="text-sm" style={{ fontWeight: 700 }}>{profile.fullName || profile.displayName || profile.email || "Người dùng"}</p>
            <p className="text-xs text-gray-500">{profile.email || ""}</p>
            <p className="mt-1 text-[11px] text-gray-400">Bấm vào avatar để thay đổi ảnh</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-gray-500">Họ và tên</label>
            <input
              value={profile.fullName || ""}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500">Số điện thoại</label>
            <input
              value={profile.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs text-gray-500">Bio</label>
            <textarea
              rows={4}
              value={profile.bio || ""}
              onChange={(e) => updateField("bio", e.target.value)}
              className="w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1]/30"
            />
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-amber-600">{error}</p> : null}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              void handleSave();
            }}
            disabled={saving}
            className="rounded-lg bg-[#3dcbb1] px-8 py-2.5 text-sm text-white hover:bg-[#35b89f] disabled:opacity-60"
            style={{ fontWeight: 600 }}
          >
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
