import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, User as UserIcon, Lock } from "lucide-react";
import { toast } from "sonner";
import { MOCK_USERS, roleLabel } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "ورود به سامانه — سامانه مدیریت مراجعین" },
      { name: "description", content: "ورود کاربران سامانه مدیریت مراجعین." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/dashboard", replace: true });
  }, [isAuthenticated, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      toast.success("ورود موفق. خوش آمدید.");
      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "خطای ورود");
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (u: string) => {
    setUsername(u);
    setPassword(u);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left/brand panel */}
      <div className="relative hidden overflow-hidden gradient-sidebar text-sidebar-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-gold-foreground text-xl font-bold shadow-elegant">
            ن
          </div>
          <div className="text-lg font-bold">سامانه مدیریت مراجعین</div>
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent/40 px-3 py-1 text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            سامانه یکپارچه سازمانی
          </div>
          <h1 className="text-4xl font-bold leading-tight">
            مدیریت هوشمند ورود و خروج
            <br />
            مراجعین سازمان
          </h1>
          <p className="max-w-md text-sm leading-7 text-sidebar-foreground/70">
            ثبت دقیق مراجعات، احراز هویت از طریق ثبت احوال، گزارش‌گیری تفصیلی و کنترل کامل
            دسترسی‌ها در یک پلتفرم امن و ماژولار.
          </p>
        </div>

        <div className="text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} — تمامی حقوق محفوظ است.
        </div>
      </div>

      {/* Right/form panel */}
      <div className="flex items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                ن
              </div>
              <div className="font-bold">سامانه مراجعین</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground">ورود به حساب کاربری</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            برای دسترسی به پنل مدیریتی، اطلاعات خود را وارد کنید.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">نام کاربری</Label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="مثال: admin"
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-primary-foreground shadow-elegant hover:opacity-95"
              size="lg"
              disabled={loading}
            >
              {loading ? "در حال ورود…" : "ورود به سامانه"}
            </Button>
          </form>

          <Card className="mt-8 border-dashed">
            <CardContent className="p-4">
              <div className="mb-3 text-xs font-medium text-muted-foreground">
                کاربران آزمایشی (رمز = نام کاربری)
              </div>
              <div className="grid gap-2">
                {MOCK_USERS.filter((u) => u.active)
                  .slice(0, 3)
                  .map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => quickLogin(u.username)}
                      className="flex items-center justify-between rounded-md border border-border bg-secondary/40 px-3 py-2 text-right text-sm transition-colors hover:bg-secondary"
                    >
                      <span className="font-medium">{u.username}</span>
                      <span className="text-xs text-muted-foreground">{roleLabel(u.role)}</span>
                    </button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
