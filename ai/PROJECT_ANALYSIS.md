# PROJECT_ANALYSIS.md

## Project

Visitor Management System (VMS)

---

# Goal

Develop a modular Visitor Management System for government organizations.

The system records visitor entry/exit, validates identity through Civil Registry API, manages visitor records, and provides reporting.

Architecture must support future modules without changing the core.

---

# Tech Stack

Backend: Laravel

Database: MySQL 8 (PostgreSQL compatible)

Architecture:

REST API

RBAC

Modular

Scalable

Audit Logging

---

# Main Modules

Authentication

Visitors

Visits

Departments

Employees

Users

Roles

Permissions

Reports

Audit Logs

Settings

---

# User Roles

## Guard

Create Visit

Exit Visitor

Search Visitor

View Current Visitors

---

## Security Manager

View Reports

Export Excel

View Audit Logs

Dashboard

---

## System Admin

Full Access

User Management

Role Management

Department Management

Employee Management

Settings

---

# Business Rules

National Code is required.

National Code length = 10.

Phone Number is mandatory.

Each visit belongs to ONE department.

Each visit belongs to ONE employee.

Employee must belong to selected department.

Only Guard can register Entry/Exit.

Exit can only happen once.

No physical delete.

Use soft delete or cancelled status.

All actions must be logged.

---

# Visitor Validation

Primary source:

Civil Registry API

If API available

Store visitor

source = civil_registry

verified = true

---

If API unavailable

Manual registration allowed

source = manual

verified = false

Manual records MUST NOT be used as trusted cache.

---

# Visitor Cache

If visitor exists

AND verified=true

Load local data.

No Civil Registry request required.

Otherwise

Call API.

---

# Current Visitors

Visitor entered

AND exit_time IS NULL

Status = Inside

---

# Reports

Daily

Monthly

By National Code

By Visitor

By Department

By Employee

By Guard

Current Visitors

Excel Export

---

# Departments

Managed manually.

Excel Import supported.

---

# Employees

Managed manually.

Excel Import supported.

Each employee belongs to one department.

---

# Audit Log

Log every action.

Login

Create

Update

Delete

Entry

Exit

Export

Include

User

IP

Timestamp

Old Values

New Values

---

# Permissions

Use RBAC.

Do NOT hardcode permissions.

Permissions examples:

visit.create

visit.exit

visit.view

visit.export

department.manage

employee.manage

user.manage

role.manage

settings.manage

audit.view

dashboard.view

---

# Database Entities

Visitors

Visits

Departments

Employees

Users

Roles

Permissions

UserRoles

RolePermissions

AuditLogs

---

# Visitor Entity

Store unique visitor.

One visitor

Many visits.

---

# Visit Entity

Stores every entry/exit.

Contains

Visitor

Department

Employee

Guard

Entry Time

Exit Time

Purpose

Status

Description

---

# Status

Entered

Exited

Cancelled

---

# Future Modules

Must NOT require database redesign.

Possible modules

SMS

RFID

QR Code

Face Recognition

License Plate Recognition

National Card Reader

Biometric Devices

Notification

Workflow

---

# Development Rules

Keep Controllers thin.

Business logic in Services.

Repository Pattern preferred.

Use FormRequest validation.

API Resource responses.

Database Transactions.

Foreign Keys.

Indexes.

Soft Deletes where applicable.

No duplicated business logic.

SOLID principles.

---

# Coding Rules

Readable code.

Reusable.

No magic numbers.

Use Enums where possible.

Use UUID-ready architecture.

Prepare for multi-organization support.

---

# Non Functional Requirements

Fast search by National Code.

Support long-term data retention.

Scalable.

Secure.

Maintainable.

Modular.
