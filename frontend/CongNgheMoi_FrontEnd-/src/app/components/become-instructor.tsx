import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Award, Users, TrendingUp, BookOpen, CheckCircle, X, AlertCircle, Camera } from "lucide-react";
import { userService } from "../../services/userService";

export function BecomeInstructorPage() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const benefits = [
    { icon: TrendingUp, title: "Thu nhập hấp dẫn", desc: "Kiếm thu nhập thụ động từ khoá học của bạn. Chia sẻ doanh thu lên đến 70%." },
    { icon: Users, title: "Tiếp cận hàng triệu học viên", desc: "Nền tảng của chúng tôi có hơn 1 triệu học viên đang hoạt động." },
    { icon: BookOpen, title: "Công cụ giảng dạy hiện đại", desc: "Hệ thống quản lý khoá học, video, quiz và chứng chỉ tự động." },
    { icon: Award, title: "Xây dựng thương hiệu cá nhân", desc: "Tạo dựng uy tín và thương hiệu trong lĩnh vực chuyên môn của bạn." },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#3dcbb1] to-[#2ea891] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>Trở thành giảng viên</h1>
          <p className="text-white/80 max-w-xl mx-auto mb-6">Chia sẻ kiến thức, truyền cảm hứng và kiếm thu nhập từ chuyên môn của bạn.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white px-8 py-3 rounded-lg hover:bg-gray-100 transition border border-white/60"
            style={{ fontWeight: 700, color: "#1f8f7d" }}
          >
            Tôi muốn trở thành giảng viên
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl text-center mb-10" style={{ fontWeight: 700 }}>Quyền lợi của giảng viên</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-xl border hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#3dcbb1]/10 rounded-lg flex items-center justify-center shrink-0">
                <b.icon size={24} className="text-[#3dcbb1]" />
              </div>
              <div>
                <h3 className="text-base mb-1" style={{ fontWeight: 600 }}>{b.title}</h3>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => setShowForm(true)} className="bg-[#3dcbb1] text-white px-8 py-3 rounded-lg hover:bg-[#35b89f] transition" style={{ fontWeight: 600 }}>
            Tôi muốn trở thành giảng viên
          </button>
        </div>
      </section>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto p-8">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
            <h2 className="text-xl mb-6" style={{ fontWeight: 700 }}>Đăng ký trở thành giảng viên</h2>
            <InstructorForm onSubmit={() => { setShowForm(false); navigate("/instructor"); }} />
          </div>
        </div>
      )}
    </div>
  );
}

function InstructorForm({ onSubmit }: { onSubmit: () => void }) {
  const navigate = useNavigate();
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    shortBio: "",
    experience: "",
    expertise: "",
    education: "university",
    portfolioUrl: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    setProfileImage(file);
    const previewUrl = URL.createObjectURL(file);
    setProfileImagePreview(previewUrl);
    event.target.value = "";
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    if (profileImagePreview) {
      URL.revokeObjectURL(profileImagePreview);
    }
    setProfileImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await userService.applyInstructor({
        fullName: form.fullName,
        headline: form.shortBio,
        experience: form.experience,
        expertise: form.expertise,
        educationLevel: form.education,
        teachingTopics: [],
        portfolioUrl: form.portfolioUrl,
        birthDate: form.dob,
      }, profileImage || undefined);

      setShowSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-lg mb-2" style={{ fontWeight: 700 }}>Đăng ký thành công!</h3>
        <p className="text-sm text-gray-600 mb-6">Đơn đăng ký của bạn đã được gửi. Admin sẽ xem xét trong 24-48 giờ.</p>
        <button
          onClick={() => {
            setShowSuccess(false);
            onSubmit();
            navigate("/instructor");
          }}
          className="bg-[#3dcbb1] text-white px-6 py-2 rounded-lg hover:bg-[#35b89f] transition"
          style={{ fontWeight: 600 }}
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <div>
        <label className="text-xs text-gray-500 block mb-1">Họ và tên *</label>
        <input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} disabled={loading} className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1] disabled:bg-gray-50" />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Ngày sinh *</label>
        <input type="date" required value={form.dob} onChange={(e) => update("dob", e.target.value)} disabled={loading} className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1] disabled:bg-gray-50" />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-2">Ảnh profile giảng viên</label>
        <div className="flex items-start gap-4">
          {profileImagePreview ? (
            <div className="relative group">
              <img src={profileImagePreview} alt="profile preview" className="w-24 h-24 rounded-lg object-cover border border-gray-300" />
              <button
                type="button"
                onClick={removeProfileImage}
                disabled={loading}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => profileImageInputRef.current?.click()}
              disabled={loading}
              className="w-24 h-24 rounded-lg border-2 border-dashed border-[#3dcbb1] flex items-center justify-center cursor-pointer hover:bg-[#3dcbb1]/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Camera size={24} className="text-[#3dcbb1]" />
            </button>
          )}
          <div className="text-xs text-gray-500 pt-2">
            <p className="font-semibold mb-1">Thêm ảnh đại diện</p>
            <p>Bấm vào nút để chọn ảnh</p>
            <p className="mt-2">Yêu cầu: JPG, PNG, GIF, WebP (max 10MB)</p>
          </div>
        </div>
        <input
          ref={profileImageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileImageChange}
          disabled={loading}
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Giới thiệu ngắn *</label>
        <textarea required value={form.shortBio} onChange={(e) => update("shortBio", e.target.value)} disabled={loading} rows={2} className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1] resize-none disabled:bg-gray-50" />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Kinh nghiệm *</label>
        <textarea required value={form.experience} onChange={(e) => update("experience", e.target.value)} disabled={loading} rows={2} className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1] resize-none disabled:bg-gray-50" placeholder="Mô tả kinh nghiệm làm việc của bạn..." />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Chuyên môn *</label>
        <input required value={form.expertise} onChange={(e) => update("expertise", e.target.value)} disabled={loading} className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1] disabled:bg-gray-50" placeholder="VD: Lập trình web, Thiết kế đồ họa..." />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Trình độ học vấn *</label>
        <select value={form.education} onChange={(e) => update("education", e.target.value)} disabled={loading} className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1] disabled:bg-gray-50">
          <option value="college">Cao đẳng</option>
          <option value="university">Đại học</option>
          <option value="postgrad">Cao học</option>
        </select>
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Đường dẫn Portfolio hoặc LinkedIn</label>
        <input value={form.portfolioUrl} onChange={(e) => update("portfolioUrl", e.target.value)} disabled={loading} className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#3dcbb1] disabled:bg-gray-50" placeholder="https://..." />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-[#3dcbb1] text-white rounded-lg py-3 text-sm hover:bg-[#35b89f] transition disabled:bg-gray-400 disabled:cursor-not-allowed" style={{ fontWeight: 600 }}>
        {loading ? "Đang gửi..." : "Gửi đăng ký"}
      </button>
    </form>
  );
}