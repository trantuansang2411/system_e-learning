import { useState } from "react";
import { BookOpen, User, Wallet, Award, LogOut } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { StudentLearning } from "./student-learning";
import { StudentPlayer } from "./student-player";
import { StudentProfile } from "./student-profile";
import { StudentWallet } from "./student-wallet";
import { StudentCertificates } from "./student-certificates";
import { useAuth } from "../../../contexts/AuthContext";

type Tab = "learning" | "player" | "profile" | "wallet" | "certificates";

function getDisplayName(fullName?: string, displayName?: string, email?: string): string {
  if (fullName?.trim()) {
    return fullName.trim();
  }

  if (displayName?.trim()) {
    return displayName.trim();
  }

  if (email) {
    const [localPart] = email.split("@");
    return localPart || "Hoc vien";
  }

  return "Hoc vien";
}

export function StudentDashboard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialCourseId = searchParams.get("courseId");
  const initialTab: Tab = searchParams.get("tab") === "player" && initialCourseId ? "player" : "learning";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(initialTab === "player" ? initialCourseId : null);
  const displayName = getDisplayName(user?.fullName, user?.displayName, user?.email);

  const navItems: { key: Tab; label: string; icon: typeof User }[] = [
    { key: "learning", label: "Bảng điều khiển", icon: BookOpen },
    { key: "profile", label: "Hồ sơ & Cài đặt", icon: User },
    { key: "wallet", label: "Ví & Giao dịch", icon: Wallet },
    { key: "certificates", label: "Chứng chỉ", icon: Award },
  ];

  const openPlayer = (courseId: string) => {
    setActiveCourseId(courseId);
    setTab("player");
  };

  if (tab === "player" && activeCourseId) {
    return <StudentPlayer courseId={activeCourseId} onBack={() => setTab("learning")} />;
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shrink-0 hidden md:flex flex-col">
        <div className="px-5 py-6 border-b text-center">
          <p className="text-base truncate" style={{ fontWeight: 700 }}>{displayName}</p>
          <p className="text-sm text-gray-400 mt-1">Học viên</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${tab === item.key ? "bg-[#3dcbb1]/10 text-[#3dcbb1]" : "text-gray-600 hover:bg-gray-50"
                }`}
              style={{ fontWeight: tab === item.key ? 600 : 400 }}
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
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] ${tab === item.key ? "text-[#3dcbb1]" : "text-gray-400"
              }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 p-6 md:p-8 bg-gray-50 overflow-auto pb-20 md:pb-8">
        {tab === "learning" && <StudentLearning onOpenPlayer={openPlayer} />}
        {tab === "profile" && <StudentProfile />}
        {tab === "wallet" && <StudentWallet />}
        {tab === "certificates" && <StudentCertificates />}
      </main>
    </div>
  );
}
