Composition over inheritance. Local state first. Memoize only after profiling.# React Engineering Guide

This document defines engineering rules for React applications.

These rules assume:

- React 19+
- Functional Components
- TypeScript
- Production applications

React is a UI library.

Do not use React patterns to solve non-UI problems.

Always prefer the simplest solution.

---

# Component Philosophy

Components should represent UI.

Not business logic.

Business logic should be separated only when it improves maintainability.

Avoid creating components that exist only to satisfy architecture.

---

# Component Responsibility

Each component should have one primary responsibility.

Good

Product Card

User Avatar

Checkout Form

Course Player

---

Bad

DashboardEverything

PageManager

GlobalComponent

AppController

---

# Component Size

Component length is NOT a quality metric.

A component may contain 300 lines and still be perfectly maintainable.

Never split components because of file length alone.

Split components only when readability improves.

---

Decision

IF component has multiple unrelated responsibilities

↓

Split.

---

IF component has one responsibility

↓

Keep together.

---

# Composition

Always prefer composition.

Avoid inheritance.

Build UI from smaller building blocks.

---

Good

Page

↓

Section

↓

Card

↓

Button

---

Bad

MegaComponent

↓

Thousands of lines

---

# Reusability

Do not build reusable components too early.

Reusable components should emerge naturally.

---

Decision

Used once

↓

Keep local.

---

Used several times

↓

Extract.

---

Never build "generic" components without actual reuse.

---

# Props

Props should be minimal.

Pass only required information.

---

Good

<ProductCard title={title} />

---

Bad

<ProductCard product={entireHugeObject} />

when only title is needed.

---

Avoid Prop Drilling

If props pass through many unrelated components,

evaluate Context or another shared solution.

Do not introduce Context too early.

---

# State

Keep state as close as possible to where it is used.

Local state is preferred.

---

Decision

Only one component needs state

↓

Local state.

---

Several nearby components

↓

Lift state.

---

Application-wide

↓

Shared state.

---

Avoid global state by default.

---

# Derived State

Never store values that can be calculated.

---

Bad

const [fullName]

---

Good

const fullName =
firstName + lastName

---

# Effects

Effects synchronize with external systems.

Effects are NOT general-purpose logic.

---

Good

API

WebSocket

Browser API

Timer

Storage

---

Bad

Calculating values

Formatting data

Filtering arrays

Sorting lists

---

Avoid unnecessary effects.

---

# Rendering

Render should be predictable.

Never mutate data while rendering.

Never trigger side effects during render.

---

# Event Handlers

Event handlers should be easy to understand.

Avoid huge anonymous callbacks.

---

Decision

Small handler

↓

Inline acceptable.

---

Complex handler

↓

Extract.

---

# Custom Hooks

Hooks should encapsulate reusable behavior.

Hooks are NOT service layers.

---

Good

useAuth

usePagination

useCourses

---

Bad

useEverything

useHelper

---

Decision

Logic reused

↓

Extract Hook.

---

Logic used once

↓

Keep local.

---

# Memoization

Memoization has cost.

Never use React.memo automatically.

Never use useMemo automatically.

Never use useCallback automatically.

---

Measure first.

Optimize second.

---

Decision

Performance issue confirmed

↓

Optimize.

---

No evidence

↓

Avoid memoization.

---

# Lists

Always use stable keys.

Never use array index

unless list order never changes.

---

Good

id

uuid

database key

---

Bad

index

Math.random()

Date.now()

---

# Conditional Rendering

Prefer simple conditions.

Avoid deeply nested ternary operators.

---

Good

if

early return

---

Avoid

condition ? a : b ? c : d

---

# Context

Context is for shared UI state.

Avoid placing everything inside Context.

Split Contexts when necessary.

---

# Forms

Keep form state predictable.

Validate user input.

Do not trust browser validation alone.

---

# Error Boundaries

Use Error Boundaries

for unexpected UI failures.

Do not use them as business logic.

---

# Suspense

Use Suspense

when asynchronous rendering benefits user experience.

Avoid wrapping everything with Suspense.

---

# Accessibility

Interactive elements

must support:

Keyboard

Focus

Screen readers

Semantic HTML

---

Avoid clickable divs.

Prefer buttons.

---

# Performance

Avoid unnecessary renders.

Avoid recreating objects every render

unless insignificant.

Measure before optimizing.

---

# Data

React manages UI.

React should not become your backend.

Keep networking concerns organized.

---

# Business Logic

Avoid placing complex business rules directly inside JSX.

Extract only when readability improves.

---

# Styling

Keep styling predictable.

Avoid inline styles unless dynamic.

Follow project design system.

---

# Imports

Group imports consistently.

Remove unused imports.

Avoid circular dependencies.

---

# Testing

Components should be easy to test.

Avoid hidden behavior.

Avoid excessive mocking.

---

# Anti-patterns

Avoid

Huge Context

God Components

Massive useEffect

Nested ternaries

Magic props

Prop drilling everywhere

Overuse of memoization

Premature abstraction

Premature optimization

---

# React Philosophy

React should make UI easier.

If architecture makes React harder to understand,

the architecture is wrong.

---

# Final Checklist

Before returning a React implementation ask:

Can this stay simpler?

Is state local enough?

Is this component understandable?

Did I avoid unnecessary abstraction?

Is memoization actually needed?

Can another developer modify this easily?

Would I approve this in a professional React code review?

Only then return the implementation.