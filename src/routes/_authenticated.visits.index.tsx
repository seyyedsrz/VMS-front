import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { useStore } from "@/lib/use-store";
import { useAuth } from "@/lib/auth";
import { cancelVisit, exitVisit } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut, Plus, Search, XCircle } from "lucide-react";
import {
  formatDateTime,
  formatDuration,
  durationMinutes,
  toPersianDigits,
} from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/visits/")({
  head: () => ({ meta: [{ title: "مراجعات — سامانه مراجعین" }] }),
  component: VisitsPage,
});

function VisitsPage() {
  const store = useStore();
  const { user, hasPermission } = useAuth();
  const [query, setQuery] = useState("");

  const deptOf = (id: string) => store.departments.find((d) => d.id === id)?.name ?? "-";
  const empOf = (id: string) => store.employees.find((e) => e.id === id)?.fullName ?? "-";
  const visitorOf = (id: string) => store.visitors.find((v) => v.id === id);

  const filter = (list: typeof store.visits) => {
    if (!query.trim()) return list;
    const q = query.trim().toLowerCase();
    return list.filter((v) => {
      const visitor = visitorOf(v.visitorId);
      return (
        visitor?.fullName.toLowerCase().includes(q) ||
        visitor?.nationalCode.includes(q) ||
        deptOf(v.departmentId).toLowerCase().includes(q) ||
        empOf(v.employeeId).toLowerCase().includes(q)
      );
    });
  };

  const inside = filter(store.visits.filter((v) => v.status === "inside"));
  const exited = filter(store.visits.filter((v) => v.status === "exited"));
  const cancelled = filter(store.visits.filter((v) => v.status === "cancelled"));

  const handleExit = (id: string) => {
    if (!user) return;
    const res = exitVisit(id, user.id);
    if (res) toast.success("خروج بازدیدکننده با موفقیت ثبت شد.");
    else toast.error("امکان ثبت خروج وجود ندارد.");
  };

  const handleCancel = (id: string) => {
    if (!user) return;
    const res = cancelVisit(id, user.id);
    if (res) toast.success("بازدید لغو شد.");
  };

  const renderRow = (v: (typeof store.visits)[number]) => {
    const visitor = visitorOf(v.visitorId);
    const inside = v.status === "inside";
    return (
      <TableRow key={v.id}>
        <TableCell>
          <div className="font-medium">{visitor?.fullName ?? "—"}</div>
          <div className="text-xs text-muted-foreground">
            کد ملی: {toPersianDigits(visitor?.nationalCode ?? "-")}
          </div>
        </TableCell>
        <TableCell>
          <div className="font-mono text-xs">{v.visitNumber}</div>
          {v.badgeNumber && (
            <div className="text-xs text-muted-foreground">کارت: {v.badgeNumber}</div>
          )}
        </TableCell>
        <TableCell>{deptOf(v.departmentId)}</TableCell>
        <TableCell>{empOf(v.employeeId)}</TableCell>
        <TableCell className="max-w-xs truncate">
          {v.purpose}
          {v.companionsCount > 0 && (
            <span className="mr-1 text-xs text-muted-foreground">
              (+{toPersianDigits(v.companionsCount)} همراه)
            </span>
          )}
        </TableCell>
        <TableCell>{formatDateTime(v.entryTime)}</TableCell>
        <TableCell>
          {v.exitTime ? formatDateTime(v.exitTime) : (
            <span className="text-muted-foreground">—</span>
          )}
        </TableCell>
        <TableCell>{formatDuration(durationMinutes(v.entryTime, v.exitTime))}</TableCell>
        <TableCell>
          {v.status === "inside" && (
            <Badge className="bg-primary/10 text-primary hover:bg-primary/15">داخل</Badge>
          )}
          {v.status === "exited" && (
            <Badge variant="secondary" className="bg-muted text-muted-foreground">خارج شده</Badge>
          )}
          {v.status === "cancelled" && (
            <Badge variant="destructive">لغو شده</Badge>
          )}
        </TableCell>
        <TableCell className="text-left">
          {inside && hasPermission("visits.exit") && (
            <div className="flex justify-end gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <LogOut className="ml-1 h-3.5 w-3.5" /> ثبت خروج
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ثبت خروج بازدیدکننده</AlertDialogTitle>
                    <AlertDialogDescription>
                      خروج {visitor?.fullName} ثبت شود؟ این عملیات قابل بازگشت نیست.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>انصراف</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleExit(v.id)}>
                      تایید خروج
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-destructive">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>لغو بازدید</AlertDialogTitle>
                    <AlertDialogDescription>
                      این بازدید لغو شود؟ رکورد باقی می‌ماند اما وضعیت به «لغو شده» تغییر می‌کند.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>خیر</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleCancel(v.id)}>
                      بله، لغو شود
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </TableCell>
      </TableRow>
    );
  };

  const renderTable = (rows: typeof store.visits, emptyText: string) => {
    if (rows.length === 0) {
      return (
        <div className="py-16 text-center text-sm text-muted-foreground">{emptyText}</div>
      );
    }
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>بازدیدکننده</TableHead>
              <TableHead>شماره بازدید</TableHead>
              <TableHead>اداره</TableHead>
              <TableHead>کارمند میزبان</TableHead>
              <TableHead>موضوع</TableHead>
              <TableHead>ورود</TableHead>
              <TableHead>خروج</TableHead>
              <TableHead>مدت</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead className="text-left">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{rows.map(renderRow)}</TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title="مراجعات"
        description="مشاهده و مدیریت ورود و خروج مراجعین."
        actions={
          hasPermission("visits.create") && (
            <Button asChild className="gradient-primary text-primary-foreground">
              <Link to="/visits/new">
                <Plus className="ml-1 h-4 w-4" /> ثبت ورود جدید
              </Link>
            </Button>
          )
        }
      />

      <Card>
        <CardContent className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو بر اساس نام، کد ملی، اداره یا کارمند…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          <Tabs defaultValue="inside">
            <TabsList>
              <TabsTrigger value="inside">
                داخل ({toPersianDigits(inside.length)})
              </TabsTrigger>
              <TabsTrigger value="exited">
                خارج شده ({toPersianDigits(exited.length)})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                لغو شده ({toPersianDigits(cancelled.length)})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="inside" className="mt-4">
              {renderTable(inside, "بازدیدکننده‌ای داخل نیست.")}
            </TabsContent>
            <TabsContent value="exited" className="mt-4">
              {renderTable(exited, "بازدید خارج شده‌ای یافت نشد.")}
            </TabsContent>
            <TabsContent value="cancelled" className="mt-4">
              {renderTable(cancelled, "بازدید لغو شده‌ای یافت نشد.")}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
