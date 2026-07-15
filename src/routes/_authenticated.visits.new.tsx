import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { useStore } from "@/lib/use-store";
import { useAuth } from "@/lib/auth";
import { createVisit, findVisitorByCode, upsertVisitor } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Search,
  ShieldAlert,
  User as UserIcon,
  UserCheck,
} from "lucide-react";
import {
  isValidNationalCode,
  isValidPhone,
  toEnglishDigits,
  toPersianDigits,
} from "@/lib/format";
import { toast } from "sonner";
import type { Gender, Visitor, VisitorSource } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/visits/new")({
  head: () => ({ meta: [{ title: "ثبت ورود جدید — سامانه مراجعین" }] }),
  component: NewVisitPage,
});

interface VisitorForm {
  nationalCode: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  birthDate: string;
  gender: Gender;
  phone: string;
  source: VisitorSource;
  verified: boolean;
}

const EMPTY_VISITOR: VisitorForm = {
  nationalCode: "",
  firstName: "",
  lastName: "",
  fatherName: "",
  birthDate: "",
  gender: "unknown",
  phone: "",
  source: "manual",
  verified: false,
};

interface VisitDataForm {
  departmentId: string;
  employeeId: string;
  purpose: string;
  description: string;
  badgeNumber: string;
  vehiclePlate: string;
  companionsCount: number;
}

const EMPTY_VISIT: VisitDataForm = {
  departmentId: "",
  employeeId: "",
  purpose: "",
  description: "",
  badgeNumber: "",
  vehiclePlate: "",
  companionsCount: 0,
};

/**
 * ثبت ورود بازدیدکننده در سه مرحله:
 * 1) شناسایی بازدیدکننده با کد ملی (کش سامانه ← استعلام ثبت احوال)
 * 2) تکمیل اطلاعات هویتی
 * 3) اطلاعات بازدید (میزبان، هدف، کارت، خودرو، همراهان)
 *
 * ساختار state دقیقاً منطبق با ستون‌های جدول‌های visitors و visits است
 * تا هنگام اتصال به Laravel API فقط لایه‌ی fetch جایگزین شود.
 */
function NewVisitPage() {
  const store = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nationalCodeInput, setNationalCodeInput] = useState("");
  const [visitorForm, setVisitorForm] = useState<VisitorForm>(EMPTY_VISITOR);
  const [existingVisitor, setExistingVisitor] = useState<Visitor | null>(null);
  const [lookupState, setLookupState] = useState<
    "idle" | "searching" | "found" | "manual"
  >("idle");

  const [visitData, setVisitData] = useState<VisitDataForm>(EMPTY_VISIT);

  const employeesOfDept = useMemo(
    () =>
      store.employees.filter(
        (e) => e.departmentId === visitData.departmentId && e.active,
      ),
    [store.employees, visitData.departmentId],
  );

  const activeDepartments = store.departments.filter((d) => d.active);

  const splitName = (full: string): { first: string; last: string } => {
    const parts = full.trim().split(/\s+/);
    if (parts.length === 1) return { first: parts[0] ?? "", last: "" };
    return { first: parts[0], last: parts.slice(1).join(" ") };
  };

  const handleLookup = async () => {
    const code = toEnglishDigits(nationalCodeInput).trim();
    if (!isValidNationalCode(code)) {
      toast.error("کد ملی وارد شده معتبر نیست.");
      return;
    }
    setLookupState("searching");

    // 1) کش محلی
    const cached = findVisitorByCode(code);
    if (cached && cached.verified) {
      setExistingVisitor(cached);
      const { first, last } = splitName(cached.fullName);
      setVisitorForm({
        nationalCode: cached.nationalCode,
        firstName: cached.firstName ?? first,
        lastName: cached.lastName ?? last,
        fatherName: cached.fatherName,
        birthDate: cached.birthDate,
        gender: cached.gender ?? "unknown",
        phone: cached.phone,
        source: cached.source,
        verified: cached.verified,
      });
      setLookupState("found");
      toast.success("بازدیدکننده در سامانه شناسایی شد.");
      return;
    }

    // 2) استعلام از ثبت احوال (شبیه‌سازی — هنگام اتصال API جایگزین می‌شود)
    await new Promise((r) => setTimeout(r, 600));
    const civilRegistryAvailable = Math.random() > 0.3;

    if (civilRegistryAvailable) {
      const first = cached?.firstName ?? "احمد";
      const last = cached?.lastName ?? "نمونه";
      setVisitorForm({
        nationalCode: code,
        firstName: first,
        lastName: last,
        fatherName: cached?.fatherName ?? "محمد",
        birthDate: cached?.birthDate ?? "1370/01/01",
        gender: cached?.gender ?? "male",
        phone: cached?.phone ?? "",
        source: "civil_registry",
        verified: true,
      });
      setLookupState("found");
      toast.success("اطلاعات از ثبت احوال دریافت شد.");
    } else {
      setVisitorForm({ ...EMPTY_VISITOR, nationalCode: code });
      setLookupState("manual");
      toast.warning("ثبت احوال در دسترس نیست. اطلاعات به‌صورت دستی وارد شود.");
    }
  };

  const goToStep2 = () => {
    if (!isValidNationalCode(visitorForm.nationalCode))
      return toast.error("کد ملی معتبر نیست.");
    setStep(2);
  };

  const goToStep3 = () => {
    if (visitorForm.firstName.trim().length < 2)
      return toast.error("نام الزامی است.");
    if (visitorForm.lastName.trim().length < 2)
      return toast.error("نام خانوادگی الزامی است.");
    if (!isValidPhone(visitorForm.phone))
      return toast.error("شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).");
    setStep(3);
  };

  const handleSubmit = () => {
    if (!user) return;
    if (!visitData.departmentId || !visitData.employeeId)
      return toast.error("اداره و کارمند میزبان را انتخاب کنید.");
    if (visitData.purpose.trim().length < 3)
      return toast.error("موضوع بازدید الزامی است.");

    const fullName = `${visitorForm.firstName.trim()} ${visitorForm.lastName.trim()}`.trim();

    const visitor = upsertVisitor(
      {
        nationalCode: toEnglishDigits(visitorForm.nationalCode),
        fullName,
        firstName: visitorForm.firstName.trim(),
        lastName: visitorForm.lastName.trim(),
        fatherName: visitorForm.fatherName.trim(),
        birthDate: visitorForm.birthDate.trim(),
        gender: visitorForm.gender,
        phone: toEnglishDigits(visitorForm.phone),
        source: visitorForm.source,
        verified: visitorForm.verified,
      },
      user.id,
    );

    createVisit(
      {
        visitorId: visitor.id,
        departmentId: visitData.departmentId,
        employeeId: visitData.employeeId,
        guardId: user.id,
        purpose: visitData.purpose.trim(),
        description: visitData.description.trim() || undefined,
        badgeNumber: visitData.badgeNumber.trim() || undefined,
        vehiclePlate: visitData.vehiclePlate.trim() || undefined,
        companionsCount: Number(visitData.companionsCount) || 0,
      },
      user.id,
    );

    toast.success("ورود بازدیدکننده با موفقیت ثبت شد.");
    navigate({ to: "/visits" });
  };

  const steps: { n: 1 | 2 | 3; label: string }[] = [
    { n: 1, label: "شناسایی" },
    { n: 2, label: "اطلاعات هویتی" },
    { n: 3, label: "اطلاعات بازدید" },
  ];

  return (
    <div className="mx-auto max-w-4xl" dir="rtl">
      <PageHeader
        title="ثبت ورود بازدیدکننده"
        description="مراحل شناسایی، تکمیل اطلاعات هویتی و ثبت اطلاعات بازدید به سازمان."
      />

      {/* Stepper */}
      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.n} className="flex flex-1 items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                step >= s.n
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {toPersianDigits(s.n)}
            </div>
            <div
              className={`text-sm font-medium ${
                step >= s.n ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 border-t border-dashed" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Identification */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Search className="h-4 w-4 text-primary" />
              مرحله ۱ — شناسایی بازدیدکننده
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nc">کد ملی</Label>
              <div className="flex gap-2">
                <Input
                  id="nc"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="کد ملی ۱۰ رقمی"
                  value={nationalCodeInput}
                  onChange={(e) => setNationalCodeInput(e.target.value)}
                  className="text-left"
                  dir="ltr"
                />
                <Button
                  onClick={handleLookup}
                  disabled={lookupState === "searching"}
                  className="gradient-primary text-primary-foreground shrink-0"
                >
                  <Search className="ml-1 h-4 w-4" />
                  {lookupState === "searching" ? "در حال جستجو…" : "استعلام"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                ابتدا کش محلی و در صورت عدم اعتبار، سرویس ثبت احوال فراخوانی می‌شود.
              </p>
            </div>

            {lookupState === "found" && (
              <Alert className="border-success/40 bg-success/5">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <AlertTitle>احراز هویت موفق</AlertTitle>
                <AlertDescription>
                  اطلاعات بازدیدکننده {existingVisitor ? "از سامانه" : "از ثبت احوال"} دریافت شد.
                </AlertDescription>
              </Alert>
            )}

            {lookupState === "manual" && (
              <Alert className="border-warning/40 bg-warning/5">
                <ShieldAlert className="h-4 w-4 text-warning" />
                <AlertTitle>ثبت احوال در دسترس نیست</AlertTitle>
                <AlertDescription>
                  اطلاعات به‌صورت دستی وارد می‌شود و به‌عنوان تاییدنشده ثبت خواهد شد.
                </AlertDescription>
              </Alert>
            )}

            {(lookupState === "found" || lookupState === "manual") && (
              <div className="flex justify-end">
                <Button
                  onClick={goToStep2}
                  className="gradient-primary text-primary-foreground"
                >
                  ادامه <ArrowLeft className="mr-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Identity details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserIcon className="h-4 w-4 text-primary" />
              مرحله ۲ — اطلاعات هویتی
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>نام</Label>
                <Input
                  value={visitorForm.firstName}
                  disabled={visitorForm.source === "civil_registry"}
                  onChange={(e) =>
                    setVisitorForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>نام خانوادگی</Label>
                <Input
                  value={visitorForm.lastName}
                  disabled={visitorForm.source === "civil_registry"}
                  onChange={(e) =>
                    setVisitorForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>نام پدر</Label>
                <Input
                  value={visitorForm.fatherName}
                  disabled={visitorForm.source === "civil_registry"}
                  onChange={(e) =>
                    setVisitorForm((f) => ({ ...f, fatherName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>تاریخ تولد (شمسی)</Label>
                <Input
                  placeholder="۱۳۷۰/۰۱/۰۱"
                  value={visitorForm.birthDate}
                  disabled={visitorForm.source === "civil_registry"}
                  onChange={(e) =>
                    setVisitorForm((f) => ({ ...f, birthDate: e.target.value }))
                  }
                  dir="ltr"
                  className="text-left"
                />
              </div>
              <div className="space-y-2">
                <Label>جنسیت</Label>
                <Select
                  value={visitorForm.gender}
                  onValueChange={(v: Gender) =>
                    setVisitorForm((f) => ({ ...f, gender: v }))
                  }
                  disabled={visitorForm.source === "civil_registry"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">مرد</SelectItem>
                    <SelectItem value="female">زن</SelectItem>
                    <SelectItem value="unknown">نامشخص</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>شماره موبایل</Label>
                <Input
                  inputMode="tel"
                  placeholder="09xxxxxxxxx"
                  value={visitorForm.phone}
                  onChange={(e) =>
                    setVisitorForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  dir="ltr"
                  className="text-left"
                />
              </div>
              <div className="sm:col-span-2">
                <Badge
                  variant="secondary"
                  className={
                    visitorForm.verified
                      ? "bg-success/10 text-success"
                      : "bg-warning/15 text-warning"
                  }
                >
                  <UserCheck className="ml-1 h-3 w-3" />
                  منبع:{" "}
                  {visitorForm.source === "civil_registry"
                    ? "ثبت احوال (تاییدشده)"
                    : "ثبت دستی (تاییدنشده)"}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                بازگشت
              </Button>
              <Button
                onClick={goToStep3}
                className="gradient-primary text-primary-foreground"
              >
                ادامه <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Visit information */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-primary" />
              مرحله ۳ — اطلاعات بازدید
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Visitor summary */}
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">بازدیدکننده</div>
                  <div className="mt-1 font-semibold">
                    {visitorForm.firstName} {visitorForm.lastName}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    کد ملی: {toPersianDigits(visitorForm.nationalCode)} · موبایل:{" "}
                    {toPersianDigits(visitorForm.phone)}
                  </div>
                </div>
                {visitorForm.verified && (
                  <Badge className="bg-success/10 text-success">
                    <BadgeCheck className="ml-1 h-3 w-3" /> تاییدشده
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>اداره مقصد</Label>
                <Select
                  value={visitData.departmentId}
                  onValueChange={(v) =>
                    setVisitData((d) => ({ ...d, departmentId: v, employeeId: "" }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب اداره" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeDepartments.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                        {d.floor ? ` — ${d.floor}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>کارمند میزبان</Label>
                <Select
                  value={visitData.employeeId}
                  onValueChange={(v) =>
                    setVisitData((d) => ({ ...d, employeeId: v }))
                  }
                  disabled={!visitData.departmentId}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        visitData.departmentId
                          ? "انتخاب کارمند"
                          : "ابتدا اداره را انتخاب کنید"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {employeesOfDept.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.fullName}
                        {e.position ? ` — ${e.position}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>موضوع بازدید</Label>
                <Input
                  value={visitData.purpose}
                  onChange={(e) =>
                    setVisitData((d) => ({ ...d, purpose: e.target.value }))
                  }
                  placeholder="مثال: جلسه هماهنگی پروژه"
                />
              </div>

              <div className="space-y-2">
                <Label>شماره کارت بازدیدکننده</Label>
                <Input
                  value={visitData.badgeNumber}
                  onChange={(e) =>
                    setVisitData((d) => ({ ...d, badgeNumber: e.target.value }))
                  }
                  placeholder="مثال: B-024"
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div className="space-y-2">
                <Label>تعداد همراهان</Label>
                <Input
                  type="number"
                  min={0}
                  max={20}
                  value={visitData.companionsCount}
                  onChange={(e) =>
                    setVisitData((d) => ({
                      ...d,
                      companionsCount: Number(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>پلاک خودرو (اختیاری)</Label>
                <Input
                  value={visitData.vehiclePlate}
                  onChange={(e) =>
                    setVisitData((d) => ({ ...d, vehiclePlate: e.target.value }))
                  }
                  placeholder="مثال: ۱۲ ب ۳۴۵ - ایران ۱۱"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>توضیحات (اختیاری)</Label>
                <Textarea
                  value={visitData.description}
                  onChange={(e) =>
                    setVisitData((d) => ({ ...d, description: e.target.value }))
                  }
                  rows={3}
                  placeholder="یادداشت‌های تکمیلی برای این بازدید…"
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                بازگشت
              </Button>
              <Button
                onClick={handleSubmit}
                className="gradient-primary text-primary-foreground shadow-elegant"
              >
                <CheckCircle2 className="ml-1 h-4 w-4" />
                ثبت نهایی ورود
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
