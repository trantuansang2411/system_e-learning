import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import defaultAvatar from "../../assets/default_avatar.jfif";
import { useAuth } from "../../contexts/AuthContext";
import { userService } from "../../services/userService";
import { getImageUrl } from "../../utils/url";

export function ProfilePage() {
  const { user, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>(defaultAvatar);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    setFullName(user?.fullName || user?.displayName || "");
    setBio(user?.bio || "");
    setAvatarUrl(user?.avatarUrl || defaultAvatar);
  }, [user]);

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    // Chỉ preview, chưa upload – đợi bấm Lưu
    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);
    setPendingAvatarFile(file);
    setSaved(false);
    event.target.value = "";
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      // Upload avatar nếu có ảnh mới đang chờ
      if (pendingAvatarFile) {
        try {
          const avatarResult = await userService.uploadUserAvatar(pendingAvatarFile);
          setAvatarUrl(avatarResult.avatarUrl || defaultAvatar);
          setPendingAvatarFile(null);
        } catch (uploadError) {
          // Specific error handling for upload
          if (uploadError instanceof Error) {
            if (uploadError.message.includes("401") || uploadError.message.includes("Unauthorized")) {
              setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
            } else if (uploadError.message.includes("NetworkError") || uploadError.message.includes("timeout")) {
              setError("Lỗi kết nối. Vui lòng kiểm tra internet và thử lại.");
            } else {
              setError("Không thể tải lên ảnh đại diện. Vui lòng thử lại.");
            }
          } else {
            setError("Không thể tải lên ảnh đại diện.");
          }
          throw uploadError;
        }
      }

      await userService.updateProfile({ fullName, bio });
      setSaved(true);
      await refreshProfile();
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // Error already set by specific handlers above
      if (!error) {
        setError("Không thể cập nhật hồ sơ.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl mb-6 text-center" style={{ fontWeight: 700 }}>Tài khoản của tôi</h1>

      {/* Avatar */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <button type="button" onClick={handleAvatarClick} className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
            <img src={getImageUrl(avatarUrl) || defaultAvatar} alt="avatar" className="w-full h-full object-cover" />
          </button>
          <button type="button" onClick={handleAvatarClick} className="absolute bottom-0 right-0 bg-black/70 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <Camera size={14} className="text-white" />
          </button>
          <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Họ và tên</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border-b pb-2 text-sm outline-none focus:border-[#3dcbb1]" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Giới thiệu bản thân</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Hãy giới thiệu ngắn gọn về bản thân bạn..." className="w-full border-b pb-2 text-sm outline-none focus:border-[#3dcbb1] resize-none" />
        </div>
      </div>

      {error ? <p className="mt-4 text-center text-sm text-amber-600">{error}</p> : null}

      <div className="flex items-center justify-center gap-3 mt-8">
        {saved ? <span className="text-sm text-green-600">Đã lưu thành công</span> : null}
        <button
          onClick={() => { void handleSave(); }}
          disabled={saving}
          className="bg-[#3dcbb1] text-white px-12 py-2.5 rounded-xl text-sm hover:bg-[#35b89f] disabled:opacity-60 cursor-pointer"
          style={{ fontWeight: 600 }}
        >
          {saving ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </div>
  );
}
