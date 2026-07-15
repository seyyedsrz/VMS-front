import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/_authenticated")({
  // Session lives in localStorage → gate client-side to avoid SSR redirect loops.
  ssr: false,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login", replace: true });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
