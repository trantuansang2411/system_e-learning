import { Link, useNavigate } from "react-router";
import { ShoppingCart, Search, Bell, Menu, X } from "lucide-react";
import defaultAvatar from "../../assets/default_avatar.jfif";
import { useEffect, useRef, useState } from "react";
import { notificationService } from "../../services/notificationService";
import type { Notification, User } from "../../types";
import { getImageUrl } from "../../utils/url";

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  isLoggedIn?: boolean;
  user?: User | null;
  onLogout?: () => void | Promise<void>;
  cartCount?: number;
  setCartCount?: React.Dispatch<React.SetStateAction<number>>;
  unreadCount?: number;
}

function getDisplayName(user?: User | null): string {
  if (user?.fullName?.trim()) {
    return user.fullName.trim();
  }

  if (user?.displayName?.trim()) {
    return user.displayName.trim();
  }

  if (user?.email) {
    const [localPart] = user.email.split("@");
    return localPart || "Nguoi dung";
  }

  return "Nguoi dung";
}

export function Navbar({ onLoginClick, onSignupClick, isLoggedIn = false, user, onLogout, cartCount = 0, setCartCount, unreadCount = 0 }: NavbarProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationError, setNotificationError] = useState("");
  const [localUnreadCount, setLocalUnreadCount] = useState(unreadCount);
  const notificationPanelRef = useRef<HTMLDivElement | null>(null);

  const displayName = getDisplayName(user);
  const displayEmail = user?.email || "";
  const avatarUrl = user?.avatarUrl;
  const hasInstructorRole = (user?.roles ?? []).some((role) => String(role).toUpperCase() === "INSTRUCTOR");

  useEffect(() => {
    setLocalUnreadCount(unreadCount);
  }, [unreadCount]);

  useEffect(() => {
    if (!showNotifications) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!notificationPanelRef.current) {
        return;
      }
      if (!notificationPanelRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showNotifications]);

  const handleLogout = async () => {
    if (!onLogout) {
      return;
    }
    setLoggingOut(true);
    try {
      await onLogout();
      setShowMenu(false);
    } finally {
      setLoggingOut(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const formatNotificationTime = (value?: string) => {
    if (!value) {
      return "Vua xong";
    }
    const dt = new Date(value);
    if (Number.isNaN(dt.getTime())) {
      return "Vua xong";
    }
    return dt.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const loadNotifications = async () => {
    try {
      setNotificationLoading(true);
      setNotificationError("");
      const response = await notificationService.getNotifications({ page: 1, limit: 8 });
      setNotifications(response.items || []);
    } catch {
      setNotificationError("Khong the tai thong bao.");
    } finally {
      setNotificationLoading(false);
    }
  };

  const toggleNotifications = async () => {
    if (showNotifications) {
      setShowNotifications(false);
      return;
    }
    setShowNotifications(true);
    await loadNotifications();
  };

  const handleMarkNotificationRead = async (notificationId: string, alreadyRead: boolean) => {
    if (alreadyRead) {
      return;
    }
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prev) => prev.map((item) => (
        item._id === notificationId ? { ...item, read: true } : item
      )));
      setLocalUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      // Keep UI responsive even if mark-read fails.
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
      setLocalUnreadCount(0);
    } catch {
      // No-op: user can retry.
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0f3f36] text-[#e7f5ef] border-b border-[#2d6a5e]">
      <div className="max-w-[1680px] mx-auto px-6 lg:px-10 h-[72px] flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-[#3dcbb1] rounded-full w-[36px] h-[36px] flex items-center justify-center">
            <span className="text-white text-xl" style={{ fontWeight: 900 }}>m</span>
          </div>
          <span className="text-lg hidden sm:block" style={{ fontWeight: 800 }}>MyCourse.io</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 min-w-[280px] mx-2 lg:mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khoá học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md px-4 py-2 pr-10 text-sm placeholder:text-[#6e8f85] outline-none focus:ring-2 focus:ring-[#3dcbb1] bg-[#e8f3ef]"
              style={{ color: '#17352e' }}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search size={18} className="text-[#5b7a71]" />
            </button>
          </div>
        </form>

        <div className="hidden md:flex items-center gap-6 shrink-0">
          {!hasInstructorRole && (
            <Link to="/become-instructor" className="text-[15px] text-[#c2e5da] hover:text-white whitespace-nowrap">
              Trở thành giảng viên
            </Link>
          )}

          <Link to="/cart" className="relative flex items-center" onClick={() => setCartCount?.(0)}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <>
              <div className="relative" ref={notificationPanelRef}>
                <button className="relative flex items-center" onClick={() => { void toggleNotifications(); }} aria-label="Thong bao">
                  <Bell size={22} />
                  {localUnreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                      {localUnreadCount > 99 ? "99+" : localUnreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 rounded-xl border border-gray-100 bg-white shadow-xl z-50 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                      <p className="text-base text-gray-900" style={{ fontWeight: 800 }}>Thông báo</p>
                      <button
                        onClick={() => { void handleMarkAllRead(); }}
                        className="text-sm hover:underline disabled:text-gray-300 cursor-pointer transition-colors"
                        style={{ fontWeight: 700, color: '#0f6b5c' }}
                        disabled={notifications.length === 0}
                      >
                        Đánh dấu đã đọc
                      </button>
                    </div>

                    <div className="max-h-96 overflow-auto">
                      {notificationLoading && <p className="px-3 py-3 text-sm text-gray-500">Dang tai...</p>}

                      {!notificationLoading && notificationError && (
                        <p className="px-3 py-3 text-sm text-amber-600">{notificationError}</p>
                      )}

                      {!notificationLoading && !notificationError && notifications.length === 0 && (
                        <p className="px-3 py-3 text-sm text-gray-500">Ban chua co thong bao nao.</p>
                      )}

                      {!notificationLoading && !notificationError && notifications.map((item) => (
                        <button
                          key={item._id}
                          onClick={() => { void handleMarkNotificationRead(item._id, item.read); }}
                          className={`w-full text-left border-b px-3 py-2.5 hover:bg-gray-50 ${item.read ? "bg-white" : "bg-[#3dcbb1]/5"}`}
                        >
                          <p className="text-sm text-gray-900" style={{ fontWeight: item.read ? 500 : 700 }}>
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">{item.message}</p>
                          <p className="mt-1 text-[11px] text-gray-400">{formatNotificationTime(item.createdAt)}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div
                className="relative"
                ref={menuRef}
                onMouseEnter={() => {
                  if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
                  setShowMenu(true);
                }}
                onMouseLeave={() => {
                  menuTimeoutRef.current = setTimeout(() => setShowMenu(false), 150);
                }}
              >
                <button
                  className="w-9 h-9 rounded-full overflow-hidden bg-[#2e9d8d] text-white flex items-center justify-center"
                  style={{ borderRadius: "9999px", overflow: "hidden" }}
                >
                  <img
                    src={getImageUrl(avatarUrl) || defaultAvatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                    style={{ borderRadius: "9999px", display: "block" }}
                  />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-10 bg-white shadow-xl rounded-xl w-56 py-1.5 z-50 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-900" style={{ fontWeight: 800 }}>{displayName}</p>
                    </div>
                    <Link to="/student" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0faf7] hover:text-[#1b8b78] transition-colors duration-150 rounded-md mx-1" style={{ fontWeight: 600 }} onClick={() => setShowMenu(false)}>Khu vực học viên</Link>
                    <Link to="/my-courses" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0faf7] hover:text-[#1b8b78] transition-colors duration-150 rounded-md mx-1" style={{ fontWeight: 600 }} onClick={() => setShowMenu(false)}>Khoá học của tôi</Link>
                    {hasInstructorRole && (
                      <Link to="/instructor" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0faf7] hover:text-[#1b8b78] transition-colors duration-150 rounded-md mx-1" style={{ fontWeight: 600 }} onClick={() => setShowMenu(false)}>Trang giảng viên</Link>
                    )}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button className="flex items-center w-full text-left px-4 py-2.5 text-sm hover:bg-[#f0faf7] hover:text-[#1b8b78] transition-colors duration-150 rounded-md mx-1 disabled:opacity-60 cursor-pointer" style={{ fontWeight: 700, color: '#1f2937' }} disabled={loggingOut} onClick={handleLogout}>
                        {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={onLoginClick} className="px-4 py-1.5 border border-[#5f988b] rounded-full text-sm text-[#e7f5ef] hover:bg-[#174a40]">
                Đăng nhập
              </button>
              <button onClick={onSignupClick} className="px-4 py-1.5 bg-[#2e9d8d] text-white rounded-full text-sm hover:bg-[#268173]">
                Đăng ký
              </button>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#123f36] border-t border-[#2d6a5e] px-4 py-4 space-y-3 text-[#d6efe6]">
          <Link to="/become-instructor" className="block text-sm">Trở thành giảng viên</Link>
          <Link to="/cart" className="block text-sm" onClick={() => setCartCount?.(0)}>Giỏ hàng {cartCount > 0 && `(${cartCount})`}</Link>
          {!isLoggedIn && (
            <div className="flex gap-2">
              <button onClick={onLoginClick} className="px-4 py-1.5 border border-[#5f988b] rounded text-sm text-[#e7f5ef]">Đăng nhập</button>
              <button onClick={onSignupClick} className="px-4 py-1.5 bg-[#2e9d8d] text-white rounded text-sm">Đăng ký</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}