# Anti-Patterns

## Goal

This document defines coding patterns that are explicitly forbidden or strongly discouraged.

These anti-patterns reduce maintainability, introduce bugs, degrade performance, or violate the project's architecture.

When in doubt, choose the simpler, more maintainable solution.

---

# General Rules

Never write code that is:

- Difficult to understand
- Difficult to test
- Difficult to maintain
- Difficult to extend

Readable code is preferred over clever code.

---

# God Components

❌ Bad

One component responsible for:

- Fetching data
- Business logic
- Validation
- Rendering
- State management
- API calls
- Animations

✅ Good

Split responsibilities into:

- Page
- Container
- Presentational components
- Custom hooks
- Services

---

# God Functions

Avoid functions that perform multiple unrelated tasks.

❌ Bad

One function that:

- Validates
- Fetches data
- Transforms data
- Updates state
- Navigates

✅ Good

Small focused functions with one responsibility.

---

# Massive Files

Avoid files larger than necessary.

As a guideline:

- Components: preferably <300 lines
- Hooks: preferably <200 lines
- Utilities: preferably <150 lines

Large files should be split by responsibility.

---

# Duplicate Logic

Never copy business logic.

If logic appears more than once:

Extract it.

Possible destinations:

- Utility
- Hook
- Service
- Shared component

---

# Premature Optimization

Do not optimize code without evidence.

Avoid unnecessary use of:

- memo
- useMemo
- useCallback
- React.memo

Optimize only after profiling identifies a bottleneck.

---

# Over-Abstraction

Do not introduce abstractions that provide little or no value.

❌ Bad

Five abstraction layers for simple CRUD logic.

✅ Good

Keep code straightforward until complexity justifies abstraction.

---

# Prop Drilling

Avoid passing props through many intermediate components.

If data is shared across distant components, consider:

- Context
- State management
- Composition

Do not introduce global state solely to avoid passing one or two props.

---

# Global State Abuse

Global state is not a default solution.

Do not store:

- Modal visibility
- Form input
- Temporary UI state
- Hover state
- Local filters

Keep UI state as close as possible to where it is used.

---

# Unnecessary Client Components

In Next.js:

Default to Server Components.

Avoid marking entire pages with:

"use client"

Only interactive parts should be client-side.

---

# Business Logic in UI

Never place business logic inside JSX.

❌ Bad

Calculations directly in render.

Permissions inside JSX.

Complex conditions inside markup.

✅ Good

Move business logic to:

- Services
- Hooks
- Utilities

Render should remain simple.

---

# Direct API Calls in Components

Avoid embedding HTTP logic directly inside UI components.

❌ Bad

Component performs fetch, transformation, and rendering.

✅ Good

Move API communication into dedicated service layers or server-side logic.

---

# Deep Component Nesting

Avoid excessive nesting.

❌ Bad

10 nested wrappers.

✅ Good

Flat, composable component hierarchy.

---

# Magic Numbers

Avoid unexplained values.

❌ Bad

```
if (age > 17)
```

✅ Good

```
const LEGAL_AGE = 18;
```

---

# Magic Strings

Avoid repeating raw strings.

Prefer:

- Constants
- Enums
- Configuration

---

# Boolean Explosion

Avoid components with many boolean props.

❌ Bad

```
primary
secondary
danger
outlined
small
large
rounded
loading
disabled
```

Prefer:

```
variant

size
```

---

# Long Conditional Chains

Avoid deeply nested:

if

else

switch

Prefer:

- Strategy pattern
- Lookup objects
- Early returns

---

# Nested Ternary Operators

Never use nested ternaries.

❌ Bad

```
a ? b : c ? d : e
```

Use readable conditional logic instead.

---

# Excessive useEffect

Avoid using useEffect for:

- Derived state
- Simple calculations
- Synchronizing props unnecessarily

Prefer computing values during render when possible.

---

# Derived State Duplication

Do not store values that can be derived.

❌ Bad

```
const [fullName, setFullName]
```

When:

```
firstName + lastName
```

already exists.

---

# Mutating State

Never mutate state directly.

❌ Bad

```
array.push()
```

```
object.property =
```

Always create new immutable values.

---

# Index as Key

Never use array index as React key when list order can change.

Prefer stable unique identifiers.

---

# Unsafe TypeScript

Avoid:

- any
- excessive type assertions
- non-null assertions without proof

Prefer explicit, safe typing.

---

# Console Statements

Do not leave:

- console.log
- console.debug
- console.warn

in production code.

Temporary debugging code must be removed before merge.

---

# Silent Error Handling

Never ignore errors.

❌ Bad

```
catch {}
```

Handle, log, or propagate errors appropriately.

---

# Hardcoded Configuration

Avoid hardcoded values such as:

- URLs
- API endpoints
- Feature flags
- Environment-specific settings

Use configuration or environment variables.

---

# Large Dependency Usage

Do not add heavy libraries for simple tasks.

Evaluate:

- Native APIs
- Existing project utilities
- Bundle size impact

before introducing a new dependency.

---

# Dead Code

Remove:

- Unused variables
- Unused imports
- Unused components
- Commented-out implementations
- Obsolete feature flags

The repository should remain clean.

---

# Ignoring Accessibility

Never sacrifice accessibility for convenience.

Avoid:

- Clickable divs
- Missing labels
- Missing keyboard support
- Missing focus states

Accessibility is a requirement.

---

# Weak Error Messages

Avoid generic messages such as:

```
Something went wrong.
```

Provide meaningful, user-friendly feedback whenever appropriate.

---

# Ignoring Loading States

Every asynchronous operation should define:

- Loading state
- Error state
- Empty state
- Success state

Never leave users without feedback.

---

# Ignoring Performance

Avoid:

- Unnecessary re-renders
- Duplicate requests
- Large bundles
- Unoptimized images
- Heavy synchronous computations

Performance is part of quality.

---

# Ignoring Security

Never:

- Trust client input
- Expose secrets
- Skip validation
- Disable security checks for convenience

Security issues must be addressed before merge.

---

# Final Checklist

Before submitting code, verify:

□ No duplicated logic

□ No oversized components

□ No oversized functions

□ No unnecessary abstractions

□ No unnecessary Client Components

□ No direct business logic in UI

□ No state mutation

□ No unsafe TypeScript

□ No console statements

□ No dead code

□ No hardcoded configuration

□ No accessibility regressions

□ No performance regressions

□ No security shortcuts

Good architecture is often defined not only by what we build, but also by what we intentionally avoid.