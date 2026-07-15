import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/use-store";
import { updateSettings } from "@/lib/store";
import { ROLE_DEFINITIONS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { Building2, Bell, Shield, Palette } from "lucide-react";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "تنظیمات — سامانه مراجعین" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const store = useStore();
  const [settings, setSettings] = useState(store.settings);
  const roleLabel =
    ROLE_DEFINITIONS.find((r) => r.key === user?.role)?.label ?? user?.role ?? "-";

  const save = () => {
    updateSettings(settings);
    toast.success("تنظیمات با موفقیت ذخیره شد.");
  };

  return (
    <div>
      <PageHeader
        title="تنظیمات سامانه"
        description="پیکربندی سازمان، اعلان‌ها و پارامترهای عملیاتی."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-primary" /> اطلاعات سازمان
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>نام سازمان</Label>
              <Input
                value={settings.organizationName}
                onChange={(e) =>
                  setSettings({ ...settings, organizationName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>آدرس</Label>
              <Input
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>تلفن</Label>
                <Input
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>ایمیل</Label>
                <Input
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-primary" /> امنیت و عملیات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>حداکثر مدت بازدید (دقیقه)</Label>
              <Input
                type="number"
                value={settings.maxVisitMinutes}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxVisitMinutes: Number(e.target.value) || 0,
                  })
                }
              />
              <p className="text-xs text-muted-foreground">
                در صورت عبور، هشدار برای نگهبان ارسال می‌شود.
              </p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="text-sm font-medium">الزام تصویر کارت شناسایی</div>
                <div className="text-xs text-muted-foreground">
                  بارگذاری تصویر هنگام ثبت ورود اجباری شود.
                </div>
              </div>
              <Switch
                checked={settings.requireIdImage}
                onCheckedChange={(v) => setSettings({ ...settings, requireIdImage: v })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="text-sm font-medium">تایید سرپرست برای ورود</div>
                <div className="text-xs text-muted-foreground">
                  بازدیدکننده تنها با تایید کارمند میزبان وارد می‌شود.
                </div>
              </div>
              <Switch
                checked={settings.requireHostApproval}
                onCheckedChange={(v) =>
                  setSettings({ ...settings, requireHostApproval: v })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-primary" /> اعلان‌ها
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="text-sm font-medium">پیامک اطلاع‌رسانی</div>
                <div className="text-xs text-muted-foreground">
                  ارسال پیامک به کارمند میزبان هنگام ورود بازدیدکننده.
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(v) =>
                  setSettings({ ...settings, smsNotifications: v })
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="text-sm font-medium">اعلان درون سامانه‌ای</div>
                <div className="text-xs text-muted-foreground">
                  نمایش اعلان بلادرنگ در داشبورد کاربران.
                </div>
              </div>
              <Switch
                checked={settings.inAppNotifications}
                onCheckedChange={(v) =>
                  setSettings({ ...settings, inAppNotifications: v })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="h-4 w-4 text-primary" /> حساب کاربری
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">نام کاربر</span>
              <span className="font-medium">{user?.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">نام کاربری</span>
              <span className="font-medium">{user?.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">نقش</span>
              <span className="font-medium">{roleLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">آخرین ورود</span>
              <span className="font-medium">هم اکنون</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={save}>ذخیره تنظیمات</Button>
      </div>
    </div>
  );
}
