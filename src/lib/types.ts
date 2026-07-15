/**
 * Domain types mirror the Laravel/MySQL schema in DATABASE_SCHEMA.md.
 * Field names are camelCase on the client and mapped to snake_case columns
 * at the API layer. Optional fields match nullable DB columns.
 */

export type Role = "guard" | "manager" | "admin";

/** users */
export interface User {
  id: string;
  username: string;
  /** Convenience full name (first_name + " " + last_name). */
  fullName: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  role: Role;
  departmentId?: string;
  /** is_active */
  active: boolean;
  lastLoginAt?: string;
  /** created_at */
  createdAt: string;
}

/** departments */
export interface Department {
  id: string;
  /** code UNIQUE */
  code: string;
  /** name UNIQUE */
  name: string;
  description?: string;
  /** UI-only, stored inside metadata JSON */
  floor?: string;
  /** is_active */
  active: boolean;
}

/** employees */
export interface Employee {
  id: string;
  departmentId: string;
  /** personnel_code UNIQUE */
  personnelCode?: string;
  /** convenience: first_name + " " + last_name */
  fullName: string;
  firstName?: string;
  lastName?: string;
  /** national_code, CHAR(10) — optional in schema */
  nationalCode: string;
  /** mobile */
  phone: string;
  email?: string;
  position?: string;
  roomNumber?: string;
  extensionNumber?: string;
  /** is_active */
  active: boolean;
}

export type VisitorSource = "civil_registry" | "manual";
export type Gender = "male" | "female" | "unknown";

/** visitors */
export interface Visitor {
  id: string;
  /** national_code CHAR(10) UNIQUE */
  nationalCode: string;
  /** convenience: first_name + " " + last_name */
  fullName: string;
  firstName?: string;
  lastName?: string;
  fatherName: string;
  /** birth_date DATE (jalali string in UI, ISO on API) */
  birthDate: string;
  gender: Gender;
  /** mobile */
  phone: string;
  /** photo URL */
  photo?: string;
  source: VisitorSource;
  verified: boolean;
  lastVerifiedAt?: string;
  createdAt: string;
}

/** visits.status */
export type VisitStatus = "inside" | "exited" | "cancelled";

/** visits */
export interface Visit {
  id: string;
  /** visit_number VARCHAR(30) UNIQUE — human readable, e.g. V-1404-000123 */
  visitNumber: string;
  visitorId: string;
  departmentId: string;
  employeeId: string;
  guardId: string;
  /** entry_time */
  entryTime: string;
  /** exit_time */
  exitTime: string | null;
  /** purpose VARCHAR(255) */
  purpose: string;
  /** description TEXT */
  description?: string;
  status: VisitStatus;
  /** badge_number */
  badgeNumber?: string;
  /** vehicle_plate */
  vehiclePlate?: string;
  /** companions_count */
  companionsCount: number;
  cancelledBy?: string;
  cancelledAt?: string;
  /** legacy alias, kept for older components */
  note?: string;
}

export type Permission =
  | "visits.create"
  | "visits.exit"
  | "visits.view"
  | "visitors.search"
  | "reports.view"
  | "reports.export"
  | "audit.view"
  | "users.manage"
  | "roles.manage"
  | "departments.manage"
  | "employees.manage"
  | "settings.manage"
  | "dashboard.view";

export interface RoleDefinition {
  key: Role;
  label: string;
  permissions: Permission[];
}

/** audit_logs */
export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  /** entity kept for backward compatibility; equivalent to record_type */
  entity: string;
  /** entityId ↔ record_id */
  entityId: string;
  /** module — visitors, visits, reports … */
  module?: string;
  ip: string;
  userAgent?: string;
  description?: string;
  timestamp: string;
}

export interface AppSettings {
  organizationName: string;
  address: string;
  phone: string;
  email: string;
  maxVisitMinutes: number;
  requireIdImage: boolean;
  requireHostApproval: boolean;
  smsNotifications: boolean;
  inAppNotifications: boolean;
}
