import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { ensureTokenFresh } from "../utils/tokenManager";
import type { RegisterResponse, User } from "../types";

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<RegisterResponse>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function normalizeRoles(roles?: string[]): string[] {
  return (roles ?? []).map((role) => String(role).toUpperCase());
}

interface TokenPayload {
  sub?: string;
  email?: string;
  roles?: string[];
}

function readTokenPayload(accessToken: string): TokenPayload | null {
  try {
    const parts = accessToken.split(".");
    if (parts.length < 2 || !parts[1]) {
      return null;
    }

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const decoded = atob(padded);
    return JSON.parse(decoded) as TokenPayload;
  } catch {
    return null;
  }
}

function withNormalizedRoles(user: User): User {
  return {
    ...user,
    roles: normalizeRoles(user.roles),
  };
}

function mergeUserProfile(profile: User, cachedUser: User | null): User {
  const merged = {
    ...(cachedUser ?? {}),
    ...profile,
  } as User;

  const profileRoles = normalizeRoles(profile.roles);
  const cachedRoles = normalizeRoles(cachedUser?.roles);
  merged.roles = profileRoles.length > 0 ? profileRoles : cachedRoles;

  return merged;
}

function readCachedUser(): User | null {
  const raw = localStorage.getItem("authUser");
  if (!raw) {
    return null;
  }

  try {
    return withNormalizedRoles(JSON.parse(raw) as User);
  } catch {
    localStorage.removeItem("authUser");
    return null;
  }
}

function buildBootstrapUser(accessToken: string, cachedUser: User | null): User | null {
  const payload = readTokenPayload(accessToken);
  const tokenUser: User | null = payload
    ? {
      userId: payload.sub,
      id: payload.sub,
      email: payload.email,
      roles: normalizeRoles(payload.roles),
    }
    : null;

  if (!cachedUser && !tokenUser) {
    return null;
  }

  const merged = {
    ...(tokenUser ?? {}),
    ...(cachedUser ?? {}),
  } as User;

  const tokenRoles = normalizeRoles(tokenUser?.roles);
  const cachedRoles = normalizeRoles(cachedUser?.roles);
  merged.roles = cachedRoles.length > 0 ? cachedRoles : tokenRoles;

  return merged;
}

function saveSession(accessToken: string, refreshToken: string, user: User) {
  const normalizedUser = withNormalizedRoles(user);
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("authUser", JSON.stringify(normalizedUser));
}

function clearSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("authUser");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      let cachedUser: User | null = null;
      if (!accessToken || !refreshToken) {
        clearSession();
        setIsLoading(false);
        return;
      }

      cachedUser = readCachedUser();
      if (cachedUser) {
        const hasLegacySeed =
          cachedUser?.fullName === "Jonathan Doe"
          || String(cachedUser?.avatarUrl || "").includes("pravatar.cc");

        if (hasLegacySeed) {
          localStorage.removeItem("authUser");
          cachedUser = null;
        } else {
          setUser(cachedUser);
        }
      }

      const bootstrapUser = buildBootstrapUser(accessToken, cachedUser);
      if (bootstrapUser) {
        const normalizedUser = withNormalizedRoles(bootstrapUser);
        setUser(normalizedUser);
        localStorage.setItem("authUser", JSON.stringify(normalizedUser));
      } else {
        setUser(null);
      }

      setIsLoading(false);

      // Fetch fresh profile in background để lấy avatarUrl mới nhất
      try {
        const profile = await userService.getProfile();
        const base = bootstrapUser ?? readCachedUser();
        const freshUser = mergeUserProfile(profile, base);
        setUser(freshUser);
        localStorage.setItem("authUser", JSON.stringify(freshUser));
      } catch { /* ignore – dùng cached user nếu lỗi */ }
    };

    bootstrap();
  }, []);

  useEffect(() => {
    const hasRefreshToken = () => Boolean(localStorage.getItem("refreshToken"));

    if (!hasRefreshToken()) {
      return;
    }

    const refreshIfNeeded = async () => {
      if (!hasRefreshToken()) {
        return;
      }

      try {
        await ensureTokenFresh();
      } catch {
        // Ignore transient refresh failures; request interceptor handles hard logout when needed.
      }
    };

    const intervalId = window.setInterval(() => {
      void refreshIfNeeded();
    }, 60 * 1000);

    const onFocusOrVisible = () => {
      if (document.visibilityState === "hidden") {
        return;
      }
      void refreshIfNeeded();
    };

    window.addEventListener("focus", onFocusOrVisible);
    document.addEventListener("visibilitychange", onFocusOrVisible);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", onFocusOrVisible);
      document.removeEventListener("visibilitychange", onFocusOrVisible);
    };
  }, [user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isLoggedIn: Boolean(user),
    isLoading,

    async login(email: string, password: string) {
      const result = await authService.login({ email, password });
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      let finalUser = withNormalizedRoles(result.user);
      try {
        const profile = await userService.getProfile();
        finalUser = mergeUserProfile(profile, finalUser);
      } catch { /* dùng user từ auth nếu lỗi */ }
      saveSession(result.accessToken, result.refreshToken, finalUser);
      setUser(finalUser);
    },

    register(email: string, password: string) {
      return authService.register({ email, password });
    },

    async verifyOtp(email: string, otp: string) {
      const result = await authService.verifyRegistrationOtp({ email, otp });
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      let finalUser = withNormalizedRoles(result.user);
      try {
        const profile = await userService.getProfile();
        finalUser = mergeUserProfile(profile, finalUser);
      } catch { /* dùng user từ auth nếu lỗi */ }
      saveSession(result.accessToken, result.refreshToken, finalUser);
      setUser(finalUser);
    },

    async resendOtp(email: string) {
      await authService.resendOtp({ email });
    },

    async loginWithGoogle(idToken: string) {
      const result = await authService.googleLogin({ idToken });
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      let finalUser = withNormalizedRoles(result.user);
      try {
        const profile = await userService.getProfile();
        finalUser = mergeUserProfile(profile, finalUser);
      } catch { /* dùng user từ auth nếu lỗi */ }
      saveSession(result.accessToken, result.refreshToken, finalUser);
      setUser(finalUser);
    },

    async forgotPassword(email: string) {
      await authService.forgotPassword({ email });
    },

    async resetPassword(token: string, newPassword: string) {
      await authService.resetPassword({ token, newPassword });
    },

    async logout() {
      try {
        const rt = localStorage.getItem("refreshToken") ?? "";
        await authService.logout({ refreshToken: rt });
      } catch {
        // Ignore network/logout failures and clear local session anyway.
      }
      clearSession();
      setUser(null);
    },

    async refreshProfile() {
      const me = await userService.getProfile();
      const cachedUser = readCachedUser();
      const mergedUser = mergeUserProfile(me, user ?? cachedUser);
      setUser(mergedUser);
      saveSession(localStorage.getItem("accessToken") ?? "", localStorage.getItem("refreshToken") ?? "", mergedUser);
    },
  }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
