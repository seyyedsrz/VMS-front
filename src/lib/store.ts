import {
  MOCK_AUDIT_LOGS,
  MOCK_DEPARTMENTS,
  MOCK_EMPLOYEES,
  MOCK_USERS,
  MOCK_VISITORS,
  MOCK_VISITS,
} from "./mock-data";
import type {
  AppSettings,
  AuditLog,
  Department,
  Employee,
  User,
  Visit,
  Visitor,
} from "./types";

/**
 * In-memory store, persisted to localStorage.
 * Replace calls to this store with real API calls when connecting the backend.
 * All mutations return a fresh snapshot for React state updates.
 */

interface StoreShape {
  visitors: Visitor[];
  visits: Visit[];
  departments: Department[];
  employees: Employee[];
  users: User[];
  auditLogs: AuditLog[];
  settings: AppSettings;
}

const STORAGE_KEY = "vms.store.v1";

const DEFAULT_SETTINGS: AppSettings = {
  organizationName: "سازمان نمونه",
  address: "تهران، خیابان آزادی، پلاک ۱۲۰",
  phone: "۰۲۱-۸۸۷۷۶۶۵۵",
  email: "info@example.ir",
  maxVisitMinutes: 240,
  requireIdImage: true,
  requireHostApproval: false,
  smsNotifications: true,
  inAppNotifications: true,
};

function seed(): StoreShape {
  return {
    visitors: [...MOCK_VISITORS],
    visits: [...MOCK_VISITS],
    departments: [...MOCK_DEPARTMENTS],
    employees: [...MOCK_EMPLOYEES],
    users: [...MOCK_USERS],
    auditLogs: [...MOCK_AUDIT_LOGS],
    settings: { ...DEFAULT_SETTINGS },
  };
}

let store: StoreShape = seed();
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoreShape>;
      store = {
        ...seed(),
        ...parsed,
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      };
    }
  } catch {
    /* ignore */
  }
  loaded = true;
}

export function updateSettings(patch: Partial<AppSettings>) {
  load();
  store.settings = { ...store.settings, ...patch };
  persist();
}

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetStore() {
  store = seed();
  persist();
}

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function log(userId: string, action: string, entity: string, entityId: string) {
  store.auditLogs.unshift({
    id: id("a"),
    userId,
    action,
    entity,
    entityId,
    timestamp: new Date().toISOString(),
    ip: "127.0.0.1",
  });
}

// --- Read helpers ---
export function getAll() {
  load();
  return store;
}

// --- Visitor ops ---
export function findVisitorByCode(nationalCode: string): Visitor | undefined {
  load();
  return store.visitors.find((v) => v.nationalCode === nationalCode);
}

export function upsertVisitor(
  data: Omit<Visitor, "id" | "createdAt">,
  actorId: string,
): Visitor {
  load();
  const existing = store.visitors.find((v) => v.nationalCode === data.nationalCode);
  if (existing) {
    Object.assign(existing, data);
    log(actorId, "به‌روزرسانی بازدیدکننده", "Visitor", existing.id);
    persist();
    return existing;
  }
  const created: Visitor = {
    ...data,
    id: id("v"),
    createdAt: new Date().toISOString(),
  };
  store.visitors.unshift(created);
  log(actorId, "ایجاد بازدیدکننده", "Visitor", created.id);
  persist();
  return created;
}

// --- Visit ops ---
function generateVisitNumber(): string {
  // Persian fiscal year prefix + incremental 6-digit suffix (mock).
  const jalaliYear = new Date().toLocaleDateString("fa-IR-u-nu-latn", {
    year: "numeric",
  });
  const suffix = String(Math.floor(Math.random() * 900000) + 100000);
  return `V-${jalaliYear}-${suffix}`;
}

export function createVisit(
  data: Omit<Visit, "id" | "entryTime" | "exitTime" | "status" | "visitNumber" | "companionsCount"> & {
    visitNumber?: string;
    companionsCount?: number;
  },
  actorId: string,
): Visit {
  load();
  const created: Visit = {
    ...data,
    id: id("vs"),
    visitNumber: data.visitNumber ?? generateVisitNumber(),
    companionsCount: data.companionsCount ?? 0,
    entryTime: new Date().toISOString(),
    exitTime: null,
    status: "inside",
  };
  store.visits.unshift(created);
  log(actorId, "ثبت ورود", "Visit", created.id);
  persist();
  return created;
}

export function exitVisit(visitId: string, actorId: string): Visit | null {
  load();
  const visit = store.visits.find((v) => v.id === visitId);
  if (!visit || visit.status !== "inside") return null;
  visit.exitTime = new Date().toISOString();
  visit.status = "exited";
  log(actorId, "ثبت خروج", "Visit", visit.id);
  persist();
  return visit;
}

export function cancelVisit(visitId: string, actorId: string): Visit | null {
  load();
  const visit = store.visits.find((v) => v.id === visitId);
  if (!visit || visit.status !== "inside") return null;
  visit.status = "cancelled";
  visit.exitTime = new Date().toISOString();
  log(actorId, "لغو بازدید", "Visit", visit.id);
  persist();
  return visit;
}

// --- Department ops ---
export function saveDepartment(dept: Department, actorId: string): Department {
  load();
  const existing = store.departments.find((d) => d.id === dept.id);
  if (existing) {
    Object.assign(existing, dept);
    log(actorId, "به‌روزرسانی اداره", "Department", dept.id);
  } else {
    const created = { ...dept, id: dept.id || id("d") };
    store.departments.push(created);
    log(actorId, "ایجاد اداره", "Department", created.id);
  }
  persist();
  return dept;
}

export function toggleDepartment(deptId: string, actorId: string) {
  load();
  const d = store.departments.find((x) => x.id === deptId);
  if (!d) return;
  d.active = !d.active;
  log(actorId, d.active ? "فعال‌سازی اداره" : "غیرفعال‌سازی اداره", "Department", d.id);
  persist();
}

// --- Employee ops ---
export function saveEmployee(emp: Employee, actorId: string): Employee {
  load();
  const existing = store.employees.find((e) => e.id === emp.id);
  if (existing) {
    Object.assign(existing, emp);
    log(actorId, "به‌روزرسانی کارمند", "Employee", emp.id);
  } else {
    const created = { ...emp, id: emp.id || id("e") };
    store.employees.push(created);
    log(actorId, "ایجاد کارمند", "Employee", created.id);
  }
  persist();
  return emp;
}

export function toggleEmployee(empId: string, actorId: string) {
  load();
  const e = store.employees.find((x) => x.id === empId);
  if (!e) return;
  e.active = !e.active;
  log(actorId, e.active ? "فعال‌سازی کارمند" : "غیرفعال‌سازی کارمند", "Employee", e.id);
  persist();
}

// --- User ops ---
export function saveUser(user: User, actorId: string): User {
  load();
  const existing = store.users.find((u) => u.id === user.id);
  if (existing) {
    Object.assign(existing, user);
    log(actorId, "به‌روزرسانی کاربر", "User", user.id);
  } else {
    const created = { ...user, id: user.id || id("u") };
    store.users.push(created);
    log(actorId, "ایجاد کاربر", "User", created.id);
  }
  persist();
  return user;
}

export function toggleUser(userId: string, actorId: string) {
  load();
  const u = store.users.find((x) => x.id === userId);
  if (!u) return;
  u.active = !u.active;
  log(actorId, u.active ? "فعال‌سازی کاربر" : "غیرفعال‌سازی کاربر", "User", u.id);
  persist();
}
