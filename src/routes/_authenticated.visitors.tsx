import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { Search, ShieldCheck, ShieldAlert } from "lucide-react";
import { formatDate, toPersianDigits } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/visitors")({
  head: () => ({ meta: [{ title: "مراجعین — سامانه مراجعین" }] }),
  component: VisitorsPage,
});

function VisitorsPage() {
  const store = useStore();
  const [q, setQ] = useState("");

  const filtered = store.visitors.filter((v) => {
    if (!q.trim()) return true;
    const s = q.trim().toLowerCase();
    return (
      v.fullName.toLowerCase().includes(s) ||
      v.nationalCode.includes(s) ||
      v.phone.includes(s)
    );
  });

  const visitCountOf = (id: string) => store.visits.filter((x) => x.visitorId === id).length;

  return (
    <div>
      <PageHeader
        title="مراجعین"
        description="مشاهده و جستجوی مراجعین ثبت‌شده در سامانه."
      />

      <Card>
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو با نام، کد ملی یا تلفن…"
              className="pr-10"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              بازدیدکننده‌ای یافت نشد.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام و نام خانوادگی</TableHead>
                    <TableHead>کد ملی</TableHead>
                    <TableHead>نام پدر</TableHead>
                    <TableHead>تاریخ تولد</TableHead>
                    <TableHead>تلفن</TableHead>
                    <TableHead>منبع</TableHead>
                    <TableHead>تعداد بازدید</TableHead>
                    <TableHead>ثبت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium">{v.fullName}</TableCell>
                      <TableCell>{toPersianDigits(v.nationalCode)}</TableCell>
                      <TableCell>{v.fatherName}</TableCell>
                      <TableCell>{toPersianDigits(v.birthDate)}</TableCell>
                      <TableCell>{toPersianDigits(v.phone)}</TableCell>
                      <TableCell>
                        {v.verified ? (
                          <Badge className="bg-success/10 text-success hover:bg-success/15">
                            <ShieldCheck className="ml-1 h-3 w-3" /> ثبت احوال
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-warning/15 text-warning-foreground"
                          >
                            <ShieldAlert className="ml-1 h-3 w-3" /> دستی
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{toPersianDigits(visitCountOf(v.id))}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {formatDate(v.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
