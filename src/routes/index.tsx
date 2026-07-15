import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    // On the client, the guarded layout will re-check the session.
    // From SSR we always send visitors to /login; if they're logged in the
    // login page redirects them to /dashboard.
    throw redirect({ to: "/login" });
  },
});
