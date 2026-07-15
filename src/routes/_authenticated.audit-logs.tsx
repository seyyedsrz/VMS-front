import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { useStore } from "@/lib/use-store";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { formatDateTime } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/audit-logs")({
  head: () => ({ meta: [{ title: "رخدادنگار — سامانه مراجعین" }] }),
  component: AuditLogsPage,
});

const ACTION_LABEL: Record<string, { label: string; tone: string }> = {
  login: { label: "ورود به سامانه", tone: "bg-primary/10 text-primary" },
  logout: { label: "خروج از سامانه", tone: "bg-muted text-muted-foreground" },
  "visit.create": { label: "ثبت ورود", tone: "bg-success/10 text-success" },
  "visit.exit": { label: "ثبت خروج", tone: "bg-warning/10 text-warning" },
  "visit.cancel": { label: "لغو بازدید", tone: "bg-destructive/10 text-destructive" },
  "visitor.create": { label: "افزودن بازدیدکننده", tone: "bg-primary/10 text-primary" },
  "visitor.update": { label: "ویرایش بازدیدکننده", tone: "bg-primary/10 text-primary" },
  "department.create": { label: "افزودن اداره", tone: "bg-primary/10 text-primary" },
  "department.update": { label: "ویرایش اداره", tone: "bg-primary/10 text-primary" },
  "department.delete": { label: "حذف اداره", tone: "bg-destructive/10 text-destructive" },
  "employee.create": { label: "افزودن کارمند", tone: "bg-primary/10 text-primary" },
  "employee.update": { label: "ویرایش کارمند", tone: "bg-primary/10 text-primary" },
  "employee.delete": { label: "حذف کارمند", tone: "bg-destructive/10 text-destructive" },
  "user.create": { label: "افزودن کاربر", tone: "bg-primary/10 text-primary" },
  "user.update": { label: "ویرایش کاربر", tone: "bg-primary/10 text-primary" },
  "user.delete": { label: "حذف کاربر", tone: "bg-destructive/10 text-destructive" },
};

function AuditLogsPage() {
  const store = useStore();
  const [query, setQuery] = useState("");

  const userName = (id: string) =>
    store.users.find((u) => u.id === id)?.fullName ?? "کاربر حذف‌شده";

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...store.auditLogs].sort((a, b) =>
      b.timestamp.localeCompare(a.timestamp),
    );
    const enriched = sorted.map((l) => ({
      ...l,
      userName: userName(l.userId),
      details: `${l.entity} · ${l.entityId}`,
    }));
    if (!q) return enriched;
    return enriched.filter(
      (l) =>
        l.userName.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        l.details.toLowerCase().includes(q) ||
        l.ip.toLowerCase().includes(q),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.auditLogs, store.users, query]);

  return (
    <div>
      <PageHeader
        title="رخدادنگار سامانه"
        description="گزارش کامل رخدادها و فعالیت‌های ثبت‌شده توسط کاربران."
      />

      <Card>
        <CardContent className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو در رخدادها..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-9"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>زمان</TableHead>
                  <TableHead>کاربر</TableHead>
                  <TableHead>رخداد</TableHead>
                  <TableHead>جزئیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                      رخدادی برای نمایش وجود ندارد.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((log) => {
                    const meta = ACTION_LABEL[log.action] ?? {
                      label: log.action,
                      tone: "bg-muted text-muted-foreground",
                    };
                    return (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                          {formatDateTime(log.timestamp)}
                        </TableCell>
                        <TableCell className="font-medium">{log.userName}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={meta.tone}>
                            {meta.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {log.details}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
