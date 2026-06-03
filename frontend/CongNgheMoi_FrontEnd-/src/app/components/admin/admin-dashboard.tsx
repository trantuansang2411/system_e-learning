import { useState } from "react";
import { Users, BookOpen, Shield, LogOut, BarChart2 } from "lucide-react";
import { Link } from "react-router";
import { AdminInstructors } from "./admin-instructors";
import { AdminCourses } from "./admin-courses";
import { AdminAnalytics } from "./admin-analytics";
import { useAuth } from "../../../contexts/AuthContext";

type Tab = "instructors" | "courses" | "analytics";

function getAdminDisplayName(fullName?: string, email?: string): string {
  if (fullName?.trim()) {
    return fullName.trim();
  }

  if (email) {
    const [localPart] = email.split("@");
    return localPart || "Quản trị viên";
  }

  return "Quản trị viên";
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("instructors");
  const adminDisplayName = getAdminDisplayName(user?.fullName, user?.email);

  const navItems: { key: Tab; label: string; icon: typeof Users }[] = [
    { key: "instructors", label: "Giảng viên", icon: Users },
    { key: "courses", label: "Khóa học", icon: BookOpen },
    { key: "analytics", label: "Phân tích", icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-[#1a1a2e] text-white shrink-0 hidden md:flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3dcbb1] rounded-lg flex items-center justify-center shrink-0">
              <Shield size={20} />
            </div>
            <div className="flex flex-col gap-0.5 justify-center">
              <span className="text-sm leading-none" style={{ fontWeight: 700 }}>Admin Panel</span>
              <span className="text-xs text-white/50 leading-none">MyCourse.io</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 mt-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition ${tab === item.key ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white/80"
                }`}
              style={{ fontWeight: tab === item.key ? 600 : 400 }}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => {
              void logout();
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm text-red-400/80 hover:text-red-400 rounded-lg hover:bg-white/5 w-full"
          >
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#1a1a2e] z-50 flex items-center px-4 h-14">
        <Shield size={20} className="text-[#3dcbb1] mr-2" />
        <span className="text-white text-sm" style={{ fontWeight: 700 }}>Quản trị viên</span>
        <div className="flex-1" />
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`relative px-3 py-2 text-xs ${tab === item.key ? "text-[#3dcbb1]" : "text-white/50"}`}
          >
            <item.icon size={18} />
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-auto md:p-0 pt-14 md:pt-0">
        <div className="bg-white border-b px-6 md:px-8 py-4 flex items-center gap-6">
          <h1 className="text-xl" style={{ fontWeight: 700 }}>
            {tab === "instructors" ? "Quản lý giảng viên" : tab === "courses" ? "Quản lý khóa học" : "Phân tích hành vi"}
          </h1>
          <div className="flex-1" />
        </div>

        <div className="p-6 md:p-8">
          {tab === "instructors" && <AdminInstructors />}
          {tab === "courses" && <AdminCourses />}
          {tab === "analytics" && <AdminAnalytics />}
        </div>
      </main>
    </div>
  );
}
