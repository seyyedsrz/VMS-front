import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { useStore } from "@/lib/use-store";
import { useAuth } from "@/lib/auth";
import { saveDepartment, toggleDepartment } from "@/lib/store";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Department } from "@/lib/types";
import { toPersianDigits } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/departments")({
  head: () => ({ meta: [{ title: "ادارات — سامانه مراجعین" }] }),
  component: DepartmentsPage,
});

const EMPTY: Department = { id: "", name: "", code: "", floor: "", active: true };

function DepartmentsPage() {
  const store = useStore();
  const { user } = useAuth();
  const [editing, setEditing] = useState<Department | null>(null);
  const [open, setOpen] = useState(false);

  const openNew = () => {
    setEditing({ ...EMPTY });
    setOpen(true);
  };
  const openEdit = (d: Department) => {
    setEditing({ ...d });
    setOpen(true);
  };

  const submit = () => {
    if (!editing || !user) return;
    if (editing.name.trim().length < 2) return toast.error("نام اداره الزامی است.");
    if (editing.code.trim().length < 2) return toast.error("کد اداره الزامی است.");
    saveDepartment(editing, user.id);
    toast.success("اداره ذخیره شد.");
    setOpen(false);
    setEditing(null);
  };

  const empCountOf = (id: string) =>
    store.employees.filter((e) => e.departmentId === id).length;

  return (
    <div>
      <PageHeader
        title="ادارات"
        description="مدیریت ادارات."
        actions={
          <Button onClick={openNew} className="gradient-primary text-primary-foreground">
            <Plus className="ml-1 h-4 w-4" /> اداره جدید
          </Button>
        }
      />

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام</TableHead>
                  <TableHead>کد</TableHead>
                  <TableHead>طبقه</TableHead>
                  <TableHead>تعداد کارمند</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {store.departments.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.code}</TableCell>
                    <TableCell>{d.floor}</TableCell>
                    <TableCell>{toPersianDigits(empCountOf(d.id))}</TableCell>
                    <TableCell>
                      {d.active ? (
                        <Badge className="bg-success/10 text-success">فعال</Badge>
                      ) : (
                        <Badge variant="secondary">غیرفعال</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center justify-end gap-2">
                        <Switch
                          checked={d.active}
                          onCheckedChange={() => user && toggleDepartment(d.id, user.id)}
                        />
                        <Button size="sm" variant="ghost" onClick={() => openEdit(d)}>
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
            <DialogTitle>{editing?.id ? "ویرایش اداره" : "اداره جدید"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>نام اداره</Label>
                <Input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>کد</Label>
                  <Input
                    value={editing.code}
                    onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>طبقه</Label>
                  <Input
                    value={editing.floor}
                    onChange={(e) => setEditing({ ...editing, floor: e.target.value })}
                    placeholder="مثال: طبقه ۲"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
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
