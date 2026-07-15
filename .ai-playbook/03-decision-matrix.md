# Decision Matrix

This file defines HOW technical decisions should be made.

Never apply patterns blindly.

Evaluate the project context first.

Always prefer the simplest valid solution.

---

# Project Size

IF Project Size = Small

THEN

Prefer simple architecture.

Avoid unnecessary abstraction.

Avoid repository pattern.

Avoid service layers unless business logic exists.

Avoid enterprise patterns.

---

IF Project Size = Medium

THEN

Introduce modular structure.

Extract shared business logic.

Separate reusable UI.

Keep architecture balanced.

---

IF Project Size = Enterprise

THEN

Prefer feature-based architecture.

Separate business logic.

Document architectural decisions.

Prioritize maintainability.

---

# Security

IF Security = Standard

THEN

Frontend may communicate directly with backend APIs.

Avoid unnecessary proxy routes.

Do not introduce BFF unless needed.

---

IF Security = High

THEN

Sensitive requests should pass through Next.js Route Handlers (BFF).

Never expose secrets to the client.

Protect authentication flow.

Protect cookies.

Protect signed requests.

Validate every external request.

---

# API Calls

IF API is public

AND

Contains no sensitive information

THEN

Call backend directly.

---

IF API requires authentication cookies

THEN

Prefer Next.js Route Handler.

---

IF API requires API Keys

THEN

Never expose keys.

Always call through backend.

---

IF API response is cacheable

THEN

Use caching strategy.

---

IF API changes frequently

THEN

Avoid unnecessary caching.

---

# Server Components

IF Browser APIs are NOT required

THEN

Use Server Component.

---

IF Component only renders data

THEN

Prefer Server Component.

---

IF Component contains only static UI

THEN

Prefer Server Component.

---

IF SEO is important

THEN

Prefer Server Component.

---

# Client Components

IF Component uses:

- useState
- useEffect
- browser APIs
- event handlers

THEN

Use Client Component.

---

Do NOT convert entire page into Client Component.

Keep client boundaries as small as possible.

---

# Server Actions

IF Form submits server-side data

AND

No client-side state manager is required

THEN

Prefer Server Actions.

---

IF Request is reusable from multiple clients

THEN

Prefer REST endpoint.

---

# Fetching

IF Data is needed only once

THEN

Use fetch().

---

IF Data updates frequently

THEN

Consider React Query.

---

IF Data is user-specific

THEN

Avoid static caching.

---

IF Data is shared globally

THEN

Cache appropriately.

---

# React Query

IF Data needs:

- refetch
- cache
- mutation
- optimistic update
- invalidation

THEN

Use React Query.

---

Do NOT use React Query

for static content.

---

# Component Extraction

IF Component is used once

THEN

Keep local.

---

IF Component is reused 2-3 times

THEN

Extract reusable component.

---

IF Component extraction makes the code harder to understand

THEN

Do NOT extract.

---

# Hook Extraction

IF Logic is reused

THEN

Extract Hook.

---

IF Logic is specific to one component

THEN

Keep inside component.

---

Never create hooks
only because hooks exist.

---

# Utility Extraction

IF Pure function

AND

Reused

THEN

Move to utils.

---

Otherwise

Keep local.

---

# Service Layer

IF Business logic exists

THEN

Create service.

---

IF Component only calls fetch()

THEN

Do NOT create service.

---

Avoid unnecessary service layers.

---

# Repository Pattern

IF Multiple data providers exist

OR

Database implementation may change

THEN

Repository Pattern is acceptable.

---

Otherwise

Avoid Repository Pattern.

---

# Folder Structure

IF Project grows

THEN

Organize by feature.

---

Avoid organizing only by file type
in large projects.

---

# Dependencies

Before installing any package

Always ask:

Can native APIs solve this?

---

IF Yes

Do not install package.

---

IF Package removes significant complexity

THEN

Install package.

---

# Performance

Measure first.

Optimize second.

---

Never optimize
without evidence.

---

Avoid memoization
unless profiling justifies it.

---

# Memo

IF Component is slow

THEN

Profile first.

---

IF Profiling shows unnecessary renders

THEN

Use memoization.

---

# useMemo

Never use useMemo

by default.

Use only

after measurement.

---

# useCallback

Never use useCallback

by default.

Use only

when necessary.

---

# State

Keep state

as local as possible.

---

Avoid global state

unless data

is truly global.

---

# Context

IF Context changes frequently

Avoid storing everything inside Context.

---

Prefer smaller contexts.

---

# Error Handling

Never ignore errors.

Every async operation

must handle failures.

---

# Logging

Development

↓

Useful logs.

Production

↓

No debug logs.

---

# Validation

Never trust client input.

Validate

on every boundary.

---

# Types

Never use any.

---

Prefer exact types.

---

Avoid unnecessary casting.

---

# Accessibility

Interactive elements

must be keyboard accessible.

---

Images

must have alt text.

---

Forms

must have labels.

---

# Naming

Names must explain intent.

Avoid abbreviations.

Avoid generic names.

---

# Comments

Explain WHY.

Do not explain WHAT.

Good code

should explain WHAT.

---

# Refactoring

Refactor only

when complexity decreases.

Never refactor

only for personal preference.

---

# Code Splitting

Split code

when it improves understanding.

Do not split

just because file size increases.

---

# Architecture

Architecture exists

to reduce complexity.

Never increase complexity

for architectural purity.

---

# Final Decision

Whenever multiple solutions are valid,

choose the solution that is:

1. Simpler

2. Easier to debug

3. Easier to maintain

4. Easier to understand

5. Appropriate for the project size

Never choose
the most complicated solution
unless it provides measurable value.