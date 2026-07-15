import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { useStore } from "@/lib/use-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileBarChart2 } from "lucide-react";
import {
  formatDate,
  formatDateTime,
  formatDuration,
  durationMinutes,
  toPersianDigits,
} from "@/lib/format";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({ meta: [{ title: "گزارش‌ها — سامانه مراجعین" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const store = useStore();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [deptId, setDeptId] = useState<string>("all");

  const filtered = useMemo(() => {
    return store.visits.filter((v) => {
      if (from && v.entryTime < new Date(from).toISOString()) return false;
      if (to) {
        const end = new Date(to);
        end.setDate(end.getDate() + 1);
        if (v.entryTime >= end.toISOString()) return false;
      }
      if (deptId !== "all" && v.departmentId !== deptId) return false;
      return true;
    });
  }, [store.visits, from, to, deptId]);

  const deptOf = (id: string) => store.departments.find((d) => d.id === id)?.name ?? "-";
  const empOf = (id: string) => store.employees.find((e) => e.id === id)?.fullName ?? "-";
  const visitorOf = (id: string) => store.visitors.find((v) => v.id === id);

  const byDept = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((v) => {
      map.set(v.departmentId, (map.get(v.departmentId) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([id, count]) => ({
      label: deptOf(id),
      count,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered]);

  const exportCsv = () => {
    const headers = [
      "نام بازدیدکننده",
      "کد ملی",
      "اداره",
      "کارمند",
      "موضوع",
      "زمان ورود",
      "زمان خروج",
      "وضعیت",
    ];
    const rows = filtered.map((v) => {
      const visitor = visitorOf(v.visitorId);
      return [
        visitor?.fullName ?? "",
        visitor?.nationalCode ?? "",
        deptOf(v.departmentId),
        empOf(v.employeeId),
        v.purpose,
        formatDateTime(v.entryTime),
        v.exitTime ? formatDateTime(v.exitTime) : "",
        v.status,
      ];
    });
    const csv =
      "\ufeff" +
      [headers, ...rows]
        .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visits-report-${formatDate(new Date().toISOString())}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("خروجی گزارش دریافت شد.");
  };

  return (
    <div>
      <PageHeader
        title="گزارش‌ها"
        description="گزارش‌های تفصیلی مراجعات با فیلترهای زمانی و اداره."
        actions={
          <Button onClick={exportCsv} variant="outline">
            <Download className="ml-1 h-4 w-4" /> خروجی CSV
          </Button>
        }
      />

      <Card className="mb-6">
        <CardContent className="grid gap-4 p-4 sm:grid-cols-4">
          <div className="space-y-2">
            <Label>از تاریخ</Label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>تا تاریخ</Label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>اداره</Label>
            <Select value={deptId} onValueChange={setDeptId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه ادارات</SelectItem>
                {store.departments.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileBarChart2 className="h-4 w-4 text-primary" /> بازدید بر اساس اداره
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byDept}>
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
                  />
                  <Bar dataKey="count" fill="var(--color-gold)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">خلاصه</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">تعداد کل مراجعات</span>
              <span className="font-bold">{toPersianDigits(filtered.length)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">داخل</span>
              <span className="font-bold">
                {toPersianDigits(filtered.filter((v) => v.status === "inside").length)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">خارج شده</span>
              <span className="font-bold">
                {toPersianDigits(filtered.filter((v) => v.status === "exited").length)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">لغو شده</span>
              <span className="font-bold">
                {toPersianDigits(filtered.filter((v) => v.status === "cancelled").length)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">جزئیات مراجعات</CardTitle>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              رکوردی برای فیلترهای انتخابی وجود ندارد.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>بازدیدکننده</TableHead>
                    <TableHead>اداره</TableHead>
                    <TableHead>کارمند</TableHead>
                    <TableHead>ورود</TableHead>
                    <TableHead>خروج</TableHead>
                    <TableHead>مدت</TableHead>
                    <TableHead>وضعیت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((v) => {
                    const visitor = visitorOf(v.visitorId);
                    return (
                      <TableRow key={v.id}>
                        <TableCell>{visitor?.fullName}</TableCell>
                        <TableCell>{deptOf(v.departmentId)}</TableCell>
                        <TableCell>{empOf(v.employeeId)}</TableCell>
                        <TableCell>{formatDateTime(v.entryTime)}</TableCell>
                        <TableCell>
                          {v.exitTime ? formatDateTime(v.exitTime) : "—"}
                        </TableCell>
                        <TableCell>
                          {formatDuration(durationMinutes(v.entryTime, v.exitTime))}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {v.status}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
