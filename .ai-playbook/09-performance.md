# Performance Standards

## Goal

Performance is a core feature of the product, not an afterthought.

Every implementation must minimize:

- Initial page load
- Bundle size
- Hydration cost
- Network requests
- Memory usage
- CPU usage
- Re-renders

---

# General Principles

Always prefer:

- Server Components
- Streaming
- Partial Rendering
- Lazy Loading
- Code Splitting
- Memoization only when needed

Never optimize blindly.

Measure first.

---

# Rendering Strategy

Default:

Server Component

Only use Client Components when interaction is required.

Example:

Good

Page
 ├── Hero (Server)
 ├── Features (Server)
 ├── FAQ (Server)
 └── BuyButton (Client)

Bad

Entire page as Client Component

---

# Client Components

Keep them as small as possible.

Bad

Entire Dashboard

Good

Button
Modal
Dropdown
Form

---

# Bundle Size

Avoid:

Huge dependencies

Prefer:

Native APIs

Example

Bad

lodash

Good

Array methods

---

Don't import entire libraries.

Bad

import * as Icons

Good

Import only used icons.

---

# Dynamic Imports

Heavy components should load lazily.

Examples

Video Player

Charts

Maps

Rich Text Editor

Admin-only components

Use:

dynamic()

Suspense

---

# Images

Always:

next/image

Requirements

Proper sizes

Responsive

Lazy loading

Modern formats

Compressed

Never:

Huge PNG

Original DSLR photos

---

# Video

Videos must:

Not autoplay unless required

Use poster

Load metadata only

Adaptive streaming

Use CDN

---

# Fonts

Prefer:

next/font

Never:

Google Fonts via CSS import

Avoid multiple font families.

---

# CSS

Avoid:

Unused utilities

Large global CSS

Deep selectors

Prefer:

Tailwind utilities

Component-based styles

Minimal global styles

---

# Re-render Rules

Avoid unnecessary renders.

Use:

memo

useMemo

useCallback

Only when profiling proves benefit.

Never use them everywhere.

---

# State Updates

Keep state local.

Avoid lifting state unnecessarily.

Derived state should not be duplicated.

---

# Lists

Large lists:

Pagination

Infinite Scroll

Virtualization

if needed.

---

# API Requests

Avoid waterfalls.

Prefer:

Parallel requests

Server fetching

Caching

Deduplication

---

# Caching

Use:

Next.js Cache

ISR

Tag Revalidation

Request Memoization

Browser Cache

CDN Cache

When appropriate.

---

# Loading States

Every async page should have:

loading.tsx

Skeleton

Streaming

No blank screens.

---

# Suspense

Prefer multiple small Suspense boundaries.

Avoid one huge boundary.

---

# Search

Use:

Debounce

Caching

Pagination

Avoid request on every key stroke.

---

# Tables

Large tables should support:

Pagination

Sorting

Filtering

Virtualization

Server-side fetching

---

# Animations

Animations should:

Run at 60 FPS

Avoid layout thrashing

Prefer transform

Prefer opacity

Avoid animating width/height.

---

# DOM

Keep DOM shallow.

Avoid deeply nested wrappers.

---

# Memory

Always cleanup:

Timers

Intervals

Observers

Event listeners

Subscriptions

Video instances

Maps

Charts

---

# Event Handling

Throttle:

Resize

Scroll

Mouse Move

Debounce:

Search

Autocomplete

Validation

---

# SEO Performance

Optimize:

LCP

CLS

INP

TTFB

FCP

Use Lighthouse continuously.

---

# Accessibility Performance

Performance must never reduce accessibility.

Accessibility has higher priority.

---

# Mobile First

Performance target device:

Mid-range Android

Slow 4G

Not latest flagship.

---

# Production Checklist

Before merge verify:

□ No unnecessary Client Components

□ No duplicate fetching

□ Images optimized

□ Dynamic imports used

□ No memory leak

□ Lighthouse acceptable

□ Bundle size acceptable

□ No unnecessary dependencies

□ Minimal JavaScript shipped

□ Fast navigation

□ Smooth scrolling

□ No hydration mismatch

Performance is a mandatory requirement.