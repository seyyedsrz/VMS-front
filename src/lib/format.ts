const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function toEnglishDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "short",
      timeStyle: "short",
    });
    return formatter.format(d);
  } catch {
    return iso;
  }
}

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(d);
  } catch {
    return iso;
  }
}

export function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("fa-IR", { timeStyle: "short" }).format(d);
  } catch {
    return iso;
  }
}

export function durationMinutes(startIso: string, endIso: string | null): number {
  const start = new Date(startIso).getTime();
  const end = endIso ? new Date(endIso).getTime() : Date.now();
  return Math.max(0, Math.round((end - start) / 60000));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${toPersianDigits(minutes)} دقیقه`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${toPersianDigits(h)} ساعت`;
  return `${toPersianDigits(h)} ساعت و ${toPersianDigits(m)} دقیقه`;
}

export function isValidNationalCode(code: string): boolean {
  const c = toEnglishDigits(code).trim();
  if (!/^\d{10}$/.test(c)) return false;
  if (/^(\d)\1{9}$/.test(c)) return false;
  const check = Number(c[9]);
  const sum = c
    .slice(0, 9)
    .split("")
    .reduce((acc, digit, i) => acc + Number(digit) * (10 - i), 0);
  const remainder = sum % 11;
  return remainder < 2 ? check === remainder : check === 11 - remainder;
}

export function isValidPhone(phone: string): boolean {
  const p = toEnglishDigits(phone).trim();
  return /^09\d{9}$/.test(p);
}
