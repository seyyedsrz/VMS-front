import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { useStore } from "@/lib/use-store";
import { useAuth } from "@/lib/auth";
import { saveUser, toggleUser } from "@/lib/store";
import { ROLE_DEFINITIONS, roleLabel } from "@/lib/mock-data";
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
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Role, User } from "@/lib/types";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/users")({
  head: () => ({ meta: [{ title: "کاربران — سامانه مراجعین" }] }),
  component: UsersPage,
});

const EMPTY: User = {
  id: "",
  username: "",
  fullName: "",
  role: "guard",
  active: true,
  createdAt: new Date().toISOString(),
};

function UsersPage() {
  const store = useStore();
  const { user } = useAuth();
  const [editing, setEditing] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const submit = () => {
    if (!editing || !user) return;
    if (editing.username.trim().length < 3) return toast.error("نام کاربری الزامی است.");
    if (editing.fullName.trim().length < 3) return toast.error("نام کامل الزامی است.");
    saveUser({ ...editing, createdAt: editing.createdAt || new Date().toISOString() }, user.id);
    toast.success("کاربر ذخیره شد.");
    setOpen(false);
    setEditing(null);
  };

  return (
    <div>
      <PageHeader
        title="کاربران"
        description="مدیریت کاربران سامانه و اختصاص نقش‌ها."
        actions={
          <Button
            onClick={() => {
              setEditing({ ...EMPTY });
              setOpen(true);
            }}
            className="gradient-primary text-primary-foreground"
          >
            <Plus className="ml-1 h-4 w-4" /> کاربر جدید
          </Button>
        }
      />

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام کاربری</TableHead>
                  <TableHead>نام کامل</TableHead>
                  <TableHead>نقش</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>تاریخ ایجاد</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {store.users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.username}</TableCell>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{roleLabel(u.role)}</Badge>
                    </TableCell>
                    <TableCell>
                      {u.active ? (
                        <Badge className="bg-success/10 text-success">فعال</Badge>
                      ) : (
                        <Badge variant="secondary">غیرفعال</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(u.createdAt)}
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center justify-end gap-2">
                        <Switch
                          checked={u.active}
                          disabled={u.id === user?.id}
                          onCheckedChange={() => user && toggleUser(u.id, user.id)}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditing({ ...u });
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
            <DialogTitle>{editing?.id ? "ویرایش کاربر" : "کاربر جدید"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>نام کاربری</Label>
                <Input
                  value={editing.username}
                  onChange={(e) => setEditing({ ...editing, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>نام کامل</Label>
                <Input
                  value={editing.fullName}
                  onChange={(e) => setEditing({ ...editing, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>نقش</Label>
                <Select
                  value={editing.role}
                  onValueChange={(v) => setEditing({ ...editing, role: v as Role })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_DEFINITIONS.map((r) => (
                      <SelectItem key={r.key} value={r.key}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
