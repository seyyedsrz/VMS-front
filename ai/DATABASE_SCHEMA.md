# DATABASE_SCHEMA.md

# Visitor Management System (VMS)
# Database Schema
# Version: 1.0

---

# General Rules

Database Engine:
- MySQL 8+
- PostgreSQL Compatible

Laravel Version:
- Laravel 12

Primary Keys:
- BIGINT UNSIGNED
- Auto Increment

Foreign Keys:
- Use foreignId()->constrained()

Timestamps:
- Use timestamps()

Soft Deletes:
- Use softDeletes() only when specified.

Charset:
- utf8mb4

Collation:
- utf8mb4_unicode_ci

---

# Naming Convention

Tables:
snake_case + plural

Examples

users
roles
permissions
departments
employees
visitors
visits
audit_logs
settings

Columns:
snake_case

Primary Key:
id

Foreign Keys:
user_id
visitor_id
department_id
employee_id
role_id
permission_id

Boolean Prefix:
is_

Timestamp Suffix:
_at

---

# Migration Order

01_users
02_roles
03_permissions
04_role_user
05_permission_role

06_departments
07_employees

08_visitors
09_visits

10_audit_logs

11_settings

---

# TABLE : users

Purpose

System users.

SoftDelete

No

Columns

| Column | Type | Nullable | Default | Index | Notes |
|---------|------|----------|---------|-------|------|
| id | BIGINT UNSIGNED | No | Auto | PK | Primary Key |
| first_name | VARCHAR(100) | No | - | INDEX | |
| last_name | VARCHAR(100) | No | - | INDEX | |
| username | VARCHAR(50) | No | - | UNIQUE | Login username |
| email | VARCHAR(255) | Yes | NULL | UNIQUE | |
| mobile | VARCHAR(20) | Yes | NULL | INDEX | |
| password | VARCHAR(255) | No | - | | |
| remember_token | VARCHAR(100) | Yes | NULL | | Laravel |
| is_active | BOOLEAN | No | TRUE | INDEX | |
| last_login_at | DATETIME | Yes | NULL | | |
| created_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |
| updated_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |

Relationships

User
Many ↔ Many Roles

---

# TABLE : roles

Purpose

Role definitions.

SoftDelete

No

Columns

| Column | Type | Nullable | Default | Index | Notes |
|---------|------|----------|---------|-------|------|
| id | BIGINT UNSIGNED | No | Auto | PK | |
| name | VARCHAR(100) | No | - | UNIQUE | Internal name |
| display_name | VARCHAR(150) | No | - | | Persian title |
| description | TEXT | Yes | NULL | | |
| created_at | TIMESTAMP | | | | |
| updated_at | TIMESTAMP | | | | |

Relationships

Role
Many ↔ Many Users

Role
Many ↔ Many Permissions

---

# TABLE : permissions

Purpose

System permissions.

SoftDelete

No

Columns

| Column | Type | Nullable | Default | Index | Notes |
|---------|------|----------|---------|-------|------|
| id | BIGINT UNSIGNED | No | Auto | PK | |
| name | VARCHAR(150) | No | - | UNIQUE | Example: visit.create |
| display_name | VARCHAR(150) | No | - | | |
| module | VARCHAR(100) | No | - | INDEX | visitors, reports... |
| description | TEXT | Yes | NULL | | |
| created_at | TIMESTAMP | | | | |
| updated_at | TIMESTAMP | | | | |

Relationships

Permission
Many ↔ Many Roles

---

# TABLE : role_user

Purpose

Pivot table between users and roles.

SoftDelete

No

Columns

| Column | Type | Nullable | Default | Index | Notes |
|---------|------|----------|---------|-------|------|
| user_id | BIGINT UNSIGNED | No | - | INDEX | FK users |
| role_id | BIGINT UNSIGNED | No | - | INDEX | FK roles |

Composite Unique

(user_id, role_id)

---

# TABLE : permission_role

Purpose

Pivot table between roles and permissions.

SoftDelete

No

Columns

| Column | Type | Nullable | Default | Index | Notes |
|---------|------|----------|---------|-------|------|
| permission_id | BIGINT UNSIGNED | No | - | INDEX | FK permissions |
| role_id | BIGINT UNSIGNED | No | - | INDEX | FK roles |

Composite Unique

(permission_id, role_id)

---

# =====================================================
# TABLE : departments
# =====================================================

Purpose

Organization departments.

SoftDelete

Yes

Columns

| Column | Type | Nullable | Default | Index | Notes |
|---------|------|----------|---------|-------|------|
| id | BIGINT UNSIGNED | No | Auto | PK | Primary Key |
| code | VARCHAR(20) | No | - | UNIQUE | Department Code |
| name | VARCHAR(150) | No | - | UNIQUE | Department Name |
| description | TEXT | Yes | NULL | | |
| is_active | BOOLEAN | No | TRUE | INDEX | |
| metadata | JSON | Yes | NULL | | Future Extensions |
| created_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |
| updated_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |
| deleted_at | TIMESTAMP | Yes | NULL | | Soft Delete |

Indexes

UNIQUE(code)

UNIQUE(name)

INDEX(is_active)

Relationships

Department

1 ------ N Employees

Department

1 ------ N Visits

Delete Rule

RESTRICT

Notes

Departments cannot be physically deleted if they have employees or visits.

---

# =====================================================
# TABLE : employees
# =====================================================

Purpose

Organization employees who receive visitors.

SoftDelete

Yes

Columns

| Column | Type | Nullable | Default | Index | Notes |
|---------|------|----------|---------|-------|------|
| id | BIGINT UNSIGNED | No | Auto | PK | Primary Key |
| department_id | BIGINT UNSIGNED | No | - | INDEX | FK Departments |
| personnel_code | VARCHAR(30) | No | - | UNIQUE | Personnel Number |
| first_name | VARCHAR(100) | No | - | INDEX | |
| last_name | VARCHAR(100) | No | - | INDEX | |
| national_code | CHAR(10) | Yes | NULL | INDEX | Optional |
| mobile | VARCHAR(20) | Yes | NULL | INDEX | |
| email | VARCHAR(255) | Yes | NULL | INDEX | |
| position | VARCHAR(100) | Yes | NULL | | Job Title |
| room_number | VARCHAR(30) | Yes | NULL | | |
| extension_number | VARCHAR(20) | Yes | NULL | | Internal Phone |
| is_active | BOOLEAN | No | TRUE | INDEX | |
| metadata | JSON | Yes | NULL | | Future Extensions |
| created_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |
| updated_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |
| deleted_at | TIMESTAMP | Yes | NULL | | Soft Delete |

Foreign Keys

department_id
→ departments.id

On Update

CASCADE

On Delete

RESTRICT

Indexes

UNIQUE(personnel_code)

INDEX(department_id)

INDEX(first_name)

INDEX(last_name)

INDEX(national_code)

INDEX(mobile)

INDEX(email)

INDEX(is_active)

Relationships

Employee

Belongs To Department

Employee

1 ------ N Visits

Delete Rule

RESTRICT

Business Rules

Employee must always belong to one Department.

Employee cannot be physically deleted.

Inactive employees cannot receive new visitors.

Excel Import supported.



---
# =====================================================
# TABLE : visitors
# =====================================================

Purpose

Stores unique visitor information.

SoftDelete

Yes

Columns

| Column | Type | Nullable | Default | Index | Notes |
|---------|------|----------|---------|-------|------|
| id | BIGINT UNSIGNED | No | Auto | PK | Primary Key |
| national_code | CHAR(10) | No | - | UNIQUE | National Code |
| first_name | VARCHAR(100) | No | - | INDEX | |
| last_name | VARCHAR(100) | No | - | INDEX | |
| father_name | VARCHAR(100) | Yes | NULL | | |
| birth_date | DATE | Yes | NULL | | |
| gender | ENUM('male','female','unknown') | No | unknown | INDEX | |
| mobile | VARCHAR(20) | No | - | INDEX | |
| photo | VARCHAR(255) | Yes | NULL | | Visitor Image |
| source | ENUM('civil_registry','manual') | No | manual | INDEX | |
| verified | BOOLEAN | No | FALSE | INDEX | Civil Registry Validation |
| last_verified_at | DATETIME | Yes | NULL | | |
| metadata | JSON | Yes | NULL | | Future Extensions |
| created_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |
| updated_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |
| deleted_at | TIMESTAMP | Yes | NULL | | Soft Delete |

Indexes

UNIQUE(national_code)

INDEX(last_name)

INDEX(mobile)

INDEX(source)

INDEX(verified)

Relationships

Visitor

1 ------ N Visits

Delete Rule

RESTRICT

Business Rules

National Code must be unique.

Manual visitors cannot overwrite verified data.

Verified visitors are used as cache.

Visitors are never physically deleted.

---

# =====================================================
# TABLE : visits
# =====================================================

Purpose

Stores every visitor entry and exit.

SoftDelete

Yes

Columns

| Column | Type | Nullable | Default | Index | Notes |
|---------|------|----------|---------|-------|------|
| id | BIGINT UNSIGNED | No | Auto | PK | Primary Key |
| visit_number | VARCHAR(30) | No | - | UNIQUE | Human Readable Number |
| visitor_id | BIGINT UNSIGNED | No | - | INDEX | FK Visitors |
| department_id | BIGINT UNSIGNED | No | - | INDEX | FK Departments |
| employee_id | BIGINT UNSIGNED | No | - | INDEX | FK Employees |
| guard_id | BIGINT UNSIGNED | No | - | INDEX | FK Users |
| entry_time | DATETIME | No | CURRENT_TIMESTAMP | INDEX | |
| exit_time | DATETIME | Yes | NULL | INDEX | |
| purpose | VARCHAR(255) | No | - | | Visit Purpose |
| description | TEXT | Yes | NULL | | |
| status | ENUM('entered','exited','cancelled') | No | entered | INDEX | |
| badge_number | VARCHAR(20) | Yes | NULL | INDEX | Visitor Badge |
| vehicle_plate | VARCHAR(20) | Yes | NULL | INDEX | Optional |
| companions_count | SMALLINT UNSIGNED | No | 0 | | Number of Companions |
| cancelled_by | BIGINT UNSIGNED | Yes | NULL | INDEX | FK Users |
| cancelled_at | DATETIME | Yes | NULL | | |
| metadata | JSON | Yes | NULL | | Future Extensions |
| created_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |
| updated_at | TIMESTAMP | No | CURRENT_TIMESTAMP | | |
| deleted_at | TIMESTAMP | Yes | NULL | | Soft Delete |

Foreign Keys

visitor_id
→ visitors.id
On Delete : RESTRICT

department_id
→ departments.id
On Delete : RESTRICT

employee_id
→ employees.id
On Delete : RESTRICT

guard_id
→ users.id
On Delete : RESTRICT

cancelled_by
→ users.id
On Delete : SET NULL

Indexes

UNIQUE(visit_number)

INDEX(visitor_id)

INDEX(department_id)

INDEX(employee_id)

INDEX(guard_id)

INDEX(entry_time)

INDEX(exit_time)

INDEX(status)

INDEX(badge_number)

INDEX(vehicle_plate)

Composite Indexes

(visitor_id, entry_time)

(status, entry_time)

(department_id, entry_time)

(employee_id, entry_time)

Relationships

Visit

Belongs To Visitor

Visit

Belongs To Department

Visit

Belongs To Employee

Visit

Belongs To Guard(User)

Business Rules

One record represents one visit.

Exit can happen only once.

Entry time cannot be modified after registration.

Exit time must be greater than Entry time.

Status "entered" requires exit_time = NULL.

Status "exited" requires exit_time IS NOT NULL.

Status "cancelled" requires cancelled_at IS NOT NULL.

Current Visitors

status = entered

AND

exit_time IS NULL

Reports

Search by:

National Code

Visitor

Department

Employee

Guard

Date Range

Current Visitors

Excel Export

Future Compatibility

RFID

QR Code

Face Recognition

License Plate Recognition

National Card Reader

Biometric Devices
