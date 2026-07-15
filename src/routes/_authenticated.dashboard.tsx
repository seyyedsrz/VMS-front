import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/app-shell";
import { useStore } from "@/lib/use-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, DoorOpen, LogOut, Building2, ArrowLeft } from "lucide-react";
import { toPersianDigits, formatTime, durationMinutes, formatDuration } from "@/lib/format";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "داشبورد — سامانه مراجعین" }] }),
  component: DashboardPage,
});

interface StatCard {
  label: string;
  value: number;
  icon: typeof Users;
  tone: "primary" | "success" | "gold" | "warning";
}

function DashboardPage() {
  const store = useStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = today.toISOString();

  const inside = store.visits.filter((v) => v.status === "inside");
  const todayVisits = store.visits.filter((v) => v.entryTime >= todayIso);
  const exitedToday = todayVisits.filter((v) => v.status === "exited");

  const stats: StatCard[] = [
    { label: "مراجعین حاضر", value: inside.length, icon: DoorOpen, tone: "primary" },
    { label: "مراجعاتی امروز", value: todayVisits.length, icon: Users, tone: "gold" },
    { label: "خروج‌های امروز", value: exitedToday.length, icon: LogOut, tone: "success" },
    { label: "اداراتی فعال", value: store.departments.filter((d) => d.active).length, icon: Building2, tone: "warning" },
  ];

  // last 7 days chart
  const chartData = useMemo(() => {
    const days: { label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - i);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const count = store.visits.filter(
        (v) => v.entryTime >= start.toISOString() && v.entryTime < end.toISOString(),
      ).length;
      days.push({
        label: new Intl.DateTimeFormat("fa-IR", { weekday: "short" }).format(start),
        count,
      });
    }
    return days;
  }, [store.visits]);

  const deptOf = (id: string) => store.departments.find((d) => d.id === id)?.name ?? "-";
  const empOf = (id: string) => store.employees.find((e) => e.id === id)?.fullName ?? "-";
  const visitorOf = (id: string) => store.visitors.find((v) => v.id === id);

  const toneClass = (tone: StatCard["tone"]) => {
    switch (tone) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "success":
        return "bg-success/10 text-success";
      case "gold":
        return "bg-gold/15 text-gold-foreground";
      case "warning":
        return "bg-warning/15 text-warning-foreground";
    }
  };

  return (
    <div>
      <PageHeader
        title="داشبورد"
        description="نمای کلی از وضعیت مراجعات و فعالیت‌های سامانه."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-l-4 border-l-primary/60">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="mt-1 text-3xl font-bold">{toPersianDigits(s.value)}</div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneClass(s.tone)}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">مراجعات در ۷ روز اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="label" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontFamily: "Vazirmatn",
                    }}
                    labelStyle={{ color: "var(--color-foreground)" }}
                  />
                  <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">مراجعین حاضر</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/visits">
                همه <ArrowLeft className="mr-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {inside.length === 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                هیچ بازدیدکننده‌ای در حال حاضر داخل نیست.
              </div>
            )}
            {inside.slice(0, 5).map((v) => {
              const visitor = visitorOf(v.visitorId);
              return (
                <div
                  key={v.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{visitor?.fullName}</div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">
                      {deptOf(v.departmentId)} — {empOf(v.employeeId)}
                    </div>
                  </div>
                  <div className="text-left">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      داخل
                    </Badge>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      ورود {formatTime(v.entryTime)} · {formatDuration(durationMinutes(v.entryTime, null))}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
