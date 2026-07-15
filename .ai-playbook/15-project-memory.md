# Project Memory

## Goal

This document defines the persistent knowledge that every AI assistant must remember throughout the lifetime of the project.

Unlike a single conversation, this document represents long-term project knowledge.

Every implementation must remain consistent with these decisions unless this document is intentionally updated.

---

# Project Philosophy

This project prioritizes:

1. Maintainability
2. Readability
3. Scalability
4. Performance
5. Security
6. Accessibility
7. Developer Experience

Short-term convenience must never compromise long-term quality.

---

# Technology Stack

The project uses:

- React
- TypeScript (Strict Mode)
- Tailwind CSS
- ESLint
- Prettier
- Node.js

Additional technologies may be introduced only after architectural review.

---

# Architecture

The project follows:

- Feature-oriented architecture
- Component-based design
- Server-first rendering
- Separation of concerns
- Reusable modules
- Strong typing

Business logic must remain independent of the UI.

---

# Rendering Strategy

Default rendering strategy:

Server Components

Use Client Components only when browser interactivity is required.

Avoid unnecessary hydration.

---

# TypeScript Standards

Always:

- Strict typing
- Explicit interfaces where appropriate
- Type inference when beneficial
- Safe null handling

Never:

- Use `any`
- Ignore compiler errors
- Suppress type safety without justification

---

# Code Quality

Every implementation should be:

- Small
- Modular
- Readable
- Reusable
- Predictable
- Easy to review

Code is written for humans first.

---

# Naming

Naming should be:

- Consistent
- Descriptive
- Intentional

Avoid abbreviations unless they are universally understood.

---

# Components

Components should:

- Have a single responsibility
- Remain small and composable
- Avoid unnecessary props
- Avoid hidden side effects

Favor composition over inheritance.

---

# State Management

Keep state:

- Local whenever possible
- Predictable
- Minimal

Global state should exist only when multiple unrelated parts of the application require shared data.

---

# Styling

Use:

- Tailwind utilities
- Shared design tokens
- Consistent spacing
- Reusable UI primitives

Avoid custom CSS unless necessary.

---

# API Philosophy

APIs should be:

- Predictable
- Versionable
- Well-documented
- Strongly validated

Frontend should never assume undocumented behavior.

---

# Error Handling

Every feature should define:

- Loading state
- Error state
- Empty state
- Success state

Errors should fail gracefully.

---

# Performance

Performance is a feature.

Always consider:

- Bundle size
- Rendering cost
- Network requests
- Caching
- Code splitting

Measure before optimizing.

---

# Security

Security is mandatory.

Never compromise security for developer convenience.

Always:

- Validate inputs
- Sanitize outputs
- Protect secrets
- Respect authentication and authorization

---

# Accessibility

Accessibility is required.

Every new feature should support:

- Keyboard navigation
- Screen readers
- Proper semantics
- Focus management

Accessibility issues are treated as defects.

---

# Testing

Critical logic should be verified through testing.

New bugs should result in regression tests whenever practical.

Testing supports confidence—not just coverage metrics.

---

# Documentation

Documentation should remain synchronized with the implementation.

Whenever architecture or public behavior changes:

Update the documentation.

---

# AI Responsibilities

Every AI assistant should:

- Read the AI Playbook before generating code.
- Follow established architecture.
- Respect previous project decisions.
- Avoid contradicting existing standards.
- Explain important trade-offs.
- Prefer simple solutions.
- Minimize technical debt.

AI should never invent project conventions that are not documented.

---

# Decision Consistency

When multiple valid implementations exist:

Choose the one that best matches:

- Existing architecture
- Existing coding style
- Existing project conventions

Consistency is preferred over novelty.

---

# Refactoring Policy

Refactoring should:

- Improve readability
- Reduce duplication
- Simplify maintenance
- Preserve behavior

Avoid large refactors without a clear business or technical reason.

---

# Dependency Policy

Before introducing a dependency, evaluate:

- Maintenance status
- Community adoption
- Security
- Bundle size
- Long-term value

Prefer native platform capabilities whenever practical.

---

# Backward Compatibility

When modifying existing functionality:

- Preserve public behavior unless intentionally changing it.
- Document breaking changes.
- Minimize migration effort.

---

# Project Evolution

The project will evolve over time.

Architectural decisions may change only when:

- The benefits clearly outweigh the costs.
- The change is documented.
- The team agrees on the new direction.

---

# Living Document

This document is a living source of truth.

Whenever a long-term architectural decision is made:

Update this file.

Outdated project memory leads to inconsistent AI behavior.

---

# Final Reminder

Every AI implementation should ask:

- Does this follow the existing architecture?
- Does this match the project's conventions?
- Will another developer immediately understand it?
- Is it maintainable one year from now?
- Would this be acceptable in a production environment?

If the answer to any question is **No**, reconsider the implementation before proceeding.

The AI Playbook is the project's long-term memory.

This file is its permanent source of truth.