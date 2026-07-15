import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { ROLE_DEFINITIONS } from "@/lib/mock-data";
import type { Permission } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/roles")({
  head: () => ({ meta: [{ title: "نقش‌ها و مجوزها — سامانه مراجعین" }] }),
  component: RolesPage,
});

const ALL_PERMISSIONS: { key: Permission; label: string; group: string }[] = [
  { key: "dashboard.view", label: "مشاهده داشبورد", group: "عمومی" },
  { key: "visits.create", label: "ثبت ورود", group: "مراجعات" },
  { key: "visits.exit", label: "ثبت خروج", group: "مراجعات" },
  { key: "visits.view", label: "مشاهده مراجعات", group: "مراجعات" },
  { key: "visitors.search", label: "جستجوی مراجعین", group: "مراجعات" },
  { key: "reports.view", label: "مشاهده گزارش‌ها", group: "گزارش" },
  { key: "reports.export", label: "خروجی اکسل", group: "گزارش" },
  { key: "audit.view", label: "مشاهده رخدادها", group: "گزارش" },
  { key: "users.manage", label: "مدیریت کاربران", group: "مدیریت" },
  { key: "roles.manage", label: "مدیریت نقش‌ها", group: "مدیریت" },
  { key: "departments.manage", label: "مدیریت اداره", group: "مدیریت" },
  { key: "employees.manage", label: "مدیریت کارمندان", group: "مدیریت" },
  { key: "settings.manage", label: "تنظیمات سامانه", group: "مدیریت" },
];

function RolesPage() {
  const groups = Array.from(new Set(ALL_PERMISSIONS.map((p) => p.group)));

  return (
    <div>
      <PageHeader
        title="نقش‌ها و مجوزها"
        description="ماتریس نقش‌های سیستم و مجوزهای اختصاص یافته به هر نقش."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {ROLE_DEFINITIONS.map((role) => (
          <Card key={role.key}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{role.label}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {role.key}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {groups.map((g) => {
                const perms = ALL_PERMISSIONS.filter((p) => p.group === g);
                return (
                  <div key={g}>
                    <div className="mb-2 text-xs font-semibold text-muted-foreground">
                      {g}
                    </div>
                    <ul className="space-y-1.5">
                      {perms.map((p) => {
                        const has = role.permissions.includes(p.key);
                        return (
                          <li
                            key={p.key}
                            className="flex items-center justify-between rounded-md px-2 py-1 text-sm"
                          >
                            <span
                              className={
                                has ? "text-foreground" : "text-muted-foreground/70"
                              }
                            >
                              {p.label}
                            </span>
                            {has ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground/40" />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        ویرایش مجوزها پس از اتصال به API مدیریت نقش‌ها فعال خواهد شد.
      </p>
    </div>
  );
}
