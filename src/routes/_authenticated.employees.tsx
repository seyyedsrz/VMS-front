import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { useStore } from "@/lib/use-store";
import { useAuth } from "@/lib/auth";
import { saveEmployee, toggleEmployee } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Pencil, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import type { Employee } from "@/lib/types";
import {
  isValidNationalCode,
  isValidPhone,
  toEnglishDigits,
  toPersianDigits,
} from "@/lib/format";

export const Route = createFileRoute("/_authenticated/employees")({
  head: () => ({ meta: [{ title: "کارمندان — سامانه مراجعین" }] }),
  component: EmployeesPage,
});

const EMPTY: Employee = {
  id: "",
  fullName: "",
  nationalCode: "",
  position: "",
  departmentId: "",
  phone: "",
  active: true,
};

function EmployeesPage() {
  const store = useStore();
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Employee | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = store.employees.filter((e) => {
    if (!q.trim()) return true;
    const s = q.trim().toLowerCase();
    return (
      e.fullName.toLowerCase().includes(s) ||
      e.nationalCode.includes(s) ||
      (e.position ?? "").toLowerCase().includes(s)
    );
  });

  const deptOf = (id: string) => store.departments.find((d) => d.id === id)?.name ?? "-";

  const submit = () => {
    if (!editing || !user) return;
    if (editing.fullName.trim().length < 3) return toast.error("نام کامل الزامی است.");
    if (!isValidNationalCode(editing.nationalCode))
      return toast.error("کد ملی معتبر نیست.");
    if (!editing.departmentId) return toast.error("اداره را انتخاب کنید.");
    if (!isValidPhone(editing.phone)) return toast.error("شماره تماس معتبر نیست.");
    saveEmployee(
      { ...editing, nationalCode: toEnglishDigits(editing.nationalCode), phone: toEnglishDigits(editing.phone) },
      user.id,
    );
    toast.success("کارمند ذخیره شد.");
    setOpen(false);
    setEditing(null);
  };

  return (
    <div>
      <PageHeader
        title="کارمندان"
        description="فهرست کارمندان قابل انتخاب هنگام ثبت بازدید."
        actions={
          <Button
            onClick={() => {
              setEditing({ ...EMPTY });
              setOpen(true);
            }}
            className="gradient-primary text-primary-foreground"
          >
            <Plus className="ml-1 h-4 w-4" /> کارمند جدید
          </Button>
        }
      />

      <Card>
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو با نام، کد ملی یا سمت…"
              className="pr-10"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام کامل</TableHead>
                  <TableHead>سمت</TableHead>
                  <TableHead>اداره</TableHead>
                  <TableHead>کد ملی</TableHead>
                  <TableHead>تلفن</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.fullName}</TableCell>
                    <TableCell>{e.position}</TableCell>
                    <TableCell>{deptOf(e.departmentId)}</TableCell>
                    <TableCell>{toPersianDigits(e.nationalCode)}</TableCell>
                    <TableCell>{toPersianDigits(e.phone)}</TableCell>
                    <TableCell>
                      {e.active ? (
                        <Badge className="bg-success/10 text-success">فعال</Badge>
                      ) : (
                        <Badge variant="secondary">غیرفعال</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center justify-end gap-2">
                        <Switch
                          checked={e.active}
                          onCheckedChange={() => user && toggleEmployee(e.id, user.id)}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditing({ ...e });
                            setOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing?.id ? "ویرایش کارمند" : "کارمند جدید"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>نام کامل</Label>
                <Input
                  value={editing.fullName}
                  onChange={(e) => setEditing({ ...editing, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>کد ملی</Label>
                <Input
                  maxLength={10}
                  value={editing.nationalCode}
                  onChange={(e) => setEditing({ ...editing, nationalCode: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>سمت</Label>
                <Input
                  value={editing.position}
                  onChange={(e) => setEditing({ ...editing, position: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>اداره</Label>
                <Select
                  value={editing.departmentId}
                  onValueChange={(v) => setEditing({ ...editing, departmentId: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب" />
                  </SelectTrigger>
                  <SelectContent>
                    {store.departments.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>تلفن</Label>
                <Input
                  value={editing.phone}
                  onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <Switch
                  checked={editing.active}
                  onCheckedChange={(v) => setEditing({ ...editing, active: v })}
                />
                <Label>فعال</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              انصراف
            </Button>
            <Button onClick={submit} className="gradient-primary text-primary-foreground">
              ذخیره
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
