import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";

function normalizeRoles(roles?: string[]): string[] {
  return (roles ?? []).map((role) => String(role).toUpperCase());
}

interface GuardProps {
  children?: ReactNode;
  fallbackPath?: string;
}

interface RoleGuardProps extends GuardProps {
  allowedRoles: string[];
  forbiddenRoles?: string[];
}

export function RequireAuth({ children, fallbackPath = "/" }: GuardProps) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div className="max-w-5xl mx-auto p-6 text-sm text-gray-500">Dang tai...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}

export function RequireRole({ children, allowedRoles, forbiddenRoles, fallbackPath = "/" }: RoleGuardProps) {
  const { isLoggedIn, isLoading, user } = useAuth();

  if (isLoading) {
    return <div className="max-w-5xl mx-auto p-6 text-sm text-gray-500">Dang tai...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={fallbackPath} replace />;
  }

  const roles = normalizeRoles(user?.roles);
  const normalizedAllowedRoles = normalizeRoles(allowedRoles);
  const normalizedForbiddenRoles = normalizeRoles(forbiddenRoles || []);

  const hasRole = normalizedAllowedRoles.some((role) => roles.includes(role));
  const hasForbiddenRole = normalizedForbiddenRoles.some((role) => roles.includes(role));

  if (!hasRole || hasForbiddenRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}
