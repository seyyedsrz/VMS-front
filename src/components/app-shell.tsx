import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Building2,
  BadgeCheck,
  ShieldCheck,
  FileBarChart2,
  ScrollText,
  Settings,
  LogOut,
  Menu,
  UserCog,
  DoorOpen,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { roleLabel } from "@/lib/mock-data";
import type { Permission } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  permission: Permission;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", label: "داشبورد", icon: LayoutDashboard, permission: "dashboard.view" },
  { to: "/visits", label: "مراجعات", icon: DoorOpen, permission: "visits.view" },
  { to: "/visits/new", label: "ثبت ورود", icon: UserPlus, permission: "visits.create" },
  { to: "/visitors", label: "مراجعین", icon: Users, permission: "visitors.search" },
  { to: "/departments", label: "ادارات", icon: Building2, permission: "departments.manage" },
  { to: "/employees", label: "کارمندان", icon: BadgeCheck, permission: "employees.manage" },
  { to: "/users", label: "کاربران", icon: UserCog, permission: "users.manage" },
  { to: "/roles", label: "نقش‌ها و مجوزها", icon: ShieldCheck, permission: "roles.manage" },
  { to: "/reports", label: "گزارش‌ها", icon: FileBarChart2, permission: "reports.view" },
  { to: "/audit-logs", label: "گزارش رخدادها", icon: ScrollText, permission: "audit.view" },
  { to: "/settings", label: "تنظیمات", icon: Settings, permission: "settings.manage" },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, hasPermission, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items = NAV_ITEMS.filter((i) => hasPermission(i.permission));

  return (
    <div className="flex h-full flex-col gradient-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-gold-foreground font-bold shadow-elegant">
          ن
        </div>
        <div>
          <div className="text-sm font-bold">سامانه مراجعین</div>
          <div className="text-xs text-sidebar-foreground/60">نسخه ۱٫۰٫۰</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const isActive = (to: string) => {
            const current = location.pathname;

            if (current === to) return true;

            const hasMoreSpecificItem = items.some(
              (i) => i.to !== to && current === i.to && i.to.startsWith(to + "/")
            );

            if (hasMoreSpecificItem) return false;

            return current.startsWith(to + "/");
          };
          const active = isActive(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border-r-2 border-gold"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-gold text-gold-foreground text-xs font-bold">
              {user?.fullName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="truncate text-sm font-semibold">{user?.fullName}</div>
            <div className="truncate text-xs text-sidebar-foreground/60">
              {user ? roleLabel(user.role) : ""}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => {
            logout();
            navigate({ to: "/login" });
          }}
        >
          <LogOut className="h-4 w-4" />
          خروج از حساب
        </Button>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="fixed inset-y-0 right-0 w-64">
          <SidebarContent />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
              ن
            </div>
            <span className="font-semibold">سامانه مراجعین</span>
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetTitle className="sr-only">منوی ناوبری</SheetTitle>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
