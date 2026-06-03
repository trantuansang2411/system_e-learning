import { Outlet, useLocation, useNavigate, useOutletContext } from "react-router";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { AuthModal } from "./auth-modal";
import { useAuth } from "../../contexts/AuthContext";
import { orderService } from "../../services/orderService";
import { notificationService } from "../../services/notificationService";
import type { User } from "../../types";

export interface LayoutContext {
  isLoggedIn: boolean;
  user: User | null;
  openLoginModal: () => void;
  openSignupModal: (prefillEmail?: string) => void;
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

export function useLayoutContext() {
  return useOutletContext<LayoutContext>();
}

function normalizeRoles(roles?: string[]): string[] {
  return (roles ?? []).map((role) => String(role).toUpperCase());
}

function resolvePostLoginPath(roles?: string[]): string | null {
  const normalizedRoles = normalizeRoles(roles);

  if (normalizedRoles.includes("ADMIN")) {
    return "/admin";
  }
  if (normalizedRoles.includes("INSTRUCTOR")) {
    return "/instructor";
  }
  return null;
}

function getCachedUserRoles(): string[] {
  try {
    const raw = localStorage.getItem("authUser");
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as User;
    return parsed.roles ?? [];
  } catch {
    return [];
  }
}

function LayoutShell() {
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [signupPrefillEmail, setSignupPrefillEmail] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  const hideFooter = location.pathname.startsWith("/student");

  const openLoginModal = () => {
    setSignupPrefillEmail("");
    setAuthModal("login");
  };

  const openSignupModal = (prefillEmail?: string) => {
    setSignupPrefillEmail(prefillEmail?.trim() ?? "");
    setAuthModal("signup");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setCartCount(0);
      setUnreadCount(0);
      return;
    }

    const loadNavbarData = async () => {
      try {
        const [cart, unread] = await Promise.all([
          orderService.getCart(),
          notificationService.getUnreadCount(),
        ]);
        setCartCount(cart.items?.length ?? 0);
        setUnreadCount(unread.unreadCount ?? 0);
      } catch {
        setCartCount(0);
        setUnreadCount(0);
      }
    };

    loadNavbarData();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        onLoginClick={openLoginModal}
        onSignupClick={() => openSignupModal()}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        cartCount={cartCount}
        setCartCount={setCartCount}
        unreadCount={unreadCount}
      />
      <main className="flex-1">
        <Outlet
          context={{
            isLoggedIn,
            user,
            openLoginModal,
            openSignupModal,
            cartCount,
            setCartCount,
          } satisfies LayoutContext}
        />
      </main>
      {!hideFooter && <Footer />}

      {authModal && (
        <AuthModal
          mode={authModal}
          initialEmail={authModal === "signup" ? signupPrefillEmail : ""}
          onClose={() => {
            setAuthModal(null);
            setSignupPrefillEmail("");
          }}
          onSwitchMode={() => setAuthModal(authModal === "login" ? "signup" : "login")}
          onError={(message) => toast.error(message, { duration: 5000, closeButton: true })}
          onSuccess={() => {
            setAuthModal(null);
            setSignupPrefillEmail("");

            const destination = resolvePostLoginPath(user?.roles ?? getCachedUserRoles());
            if (destination) {
              navigate(destination, { replace: true });
            }
          }}
        />
      )}
    </div>
  );
}

export function Layout() {
  return <LayoutShell />;
}