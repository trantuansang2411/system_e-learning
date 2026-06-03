import { RouterProvider } from "react-router";
import { useEffect } from "react";
import { router } from "./routes";
import { AuthProvider } from "../contexts/AuthContext";
import { useAuth } from "../contexts/AuthContext";
import { Toaster } from "./components/ui/sonner";

function AppWithAutoRedirect() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !user) return;

    // Check role immediately when user loads
    const normalizedRoles = (user.roles ?? []).map(r => String(r).toUpperCase());
    const isAdmin = normalizedRoles.includes("ADMIN");
    const currentPath = window.location.pathname;

    // Auto redirect admin to /admin immediately
    if (isAdmin && !currentPath.startsWith("/admin")) {
      window.location.replace("/admin");
    }
  }, [user, isLoading]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppWithAutoRedirect />
      <Toaster richColors position="top-right" duration={5000} />
    </AuthProvider>
  );
}
