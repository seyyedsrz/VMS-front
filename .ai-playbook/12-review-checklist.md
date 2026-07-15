# Code Review Checklist

## Goal

Code review exists to improve software quality, maintain consistency, reduce defects, and share knowledge.

A review is not only about finding bugs.

It ensures that every change aligns with the project's architecture, coding standards, security requirements, and long-term maintainability.

---

# Review Principles

Every review should be:

- Objective
- Respectful
- Constructive
- Consistent
- Evidence-based

Review the code, not the developer.

---

# General Checklist

Before approving a Pull Request, verify:

□ The implementation solves the intended problem.

□ The solution follows the project architecture.

□ No unnecessary complexity has been introduced.

□ The code is readable.

□ Naming is clear and meaningful.

□ The implementation is maintainable.

□ No duplicated logic exists.

□ Existing functionality remains unaffected.

---

# Architecture

Verify:

□ Proper separation of concerns.

□ Correct folder placement.

□ Correct layer responsibilities.

□ No business logic inside UI components.

□ No infrastructure logic inside presentation layer.

□ Shared code is reused appropriately.

□ No circular dependencies.

---

# Code Quality

Verify:

□ Small, focused functions.

□ Components have a single responsibility.

□ Files are not excessively large.

□ Unused code removed.

□ Dead code removed.

□ No commented-out code.

□ No debugging statements left behind.

□ Consistent formatting.

□ Project conventions followed.

---

# TypeScript

Verify:

□ No usage of `any`.

□ Proper interfaces or types defined.

□ Type inference used where appropriate.

□ Generics used correctly.

□ Nullable values handled safely.

□ Type assertions minimized.

□ No unsafe casting.

---

# React

Verify:

□ Server Components used whenever possible.

□ Client Components only where necessary.

□ Correct hook usage.

□ Hooks follow React rules.

□ Stable keys in lists.

□ Proper memoization only when justified.

□ No unnecessary re-renders.

---

# Next.js

Verify:

□ App Router conventions followed.

□ Metadata implemented correctly.

□ Dynamic routes handled properly.

□ Loading states implemented.

□ Error boundaries available.

□ Server-side rendering used appropriately.

□ Caching strategy considered.

---

# UI / UX

Verify:

□ Responsive layout.

□ Consistent spacing.

□ Consistent typography.

□ Design system respected.

□ Loading states exist.

□ Empty states exist.

□ Error states exist.

□ Interactive elements provide feedback.

□ Keyboard navigation works.

□ Accessibility maintained.

---

# Performance

Verify:

□ No unnecessary client-side rendering.

□ Images optimized.

□ Dynamic imports used for heavy modules.

□ Large lists optimized.

□ No unnecessary API requests.

□ Expensive calculations avoided during render.

□ Bundle size impact acceptable.

□ Memory leaks prevented.

---

# Security

Verify:

□ Input validation present.

□ Output sanitized where necessary.

□ No secrets exposed.

□ Sensitive information not logged.

□ Authorization enforced.

□ Authentication respected.

□ Secure handling of cookies and tokens.

□ No obvious XSS or injection risks.

---

# API

Verify:

□ Correct HTTP methods.

□ Proper status code handling.

□ Error handling implemented.

□ Loading state handled.

□ Retry behavior considered (if needed).

□ API contracts respected.

□ No duplicated requests.

---

# State Management

Verify:

□ State kept as local as possible.

□ No unnecessary global state.

□ Derived state not duplicated.

□ State updates predictable.

□ No stale closures.

---

# Forms

Verify:

□ Validation implemented.

□ Error messages shown.

□ Disabled state handled.

□ Loading state handled.

□ Submission flow correct.

□ Invalid input prevented.

---

# Testing

Verify:

□ Appropriate tests added.

□ Existing tests updated.

□ Critical paths covered.

□ Edge cases tested.

□ Regression tests included for bug fixes.

□ All tests passing.

---

# Documentation

Verify:

□ Public APIs documented.

□ Complex logic explained where necessary.

□ README updated if required.

□ Breaking changes documented.

---

# Git

Verify:

□ Commit history is clean.

□ Commit messages are meaningful.

□ No unrelated changes included.

□ No generated files committed unintentionally.

□ No merge conflicts remain.

---

# Dependencies

Verify:

□ No unnecessary packages added.

□ New dependencies justified.

□ Dependency size acceptable.

□ Security risks evaluated.

□ License compatibility considered.

---

# Logging

Verify:

□ No debug logs.

□ No console statements in production code.

□ Errors logged appropriately.

□ Sensitive information excluded from logs.

---

# Error Handling

Verify:

□ All expected failures handled.

□ User-friendly messages displayed.

□ Application remains stable during failures.

□ Recovery paths considered.

---

# Accessibility

Verify:

□ Semantic HTML used.

□ Labels provided.

□ ARIA attributes correct.

□ Keyboard accessible.

□ Focus management correct.

□ Sufficient color contrast.

---

# Before Approval

The reviewer should confidently answer:

- Is this code understandable six months from now?
- Would another developer easily maintain it?
- Does it follow project standards?
- Is the implementation as simple as possible?
- Is the feature complete?
- Would I be comfortable deploying this to production today?

If any answer is **No**, request changes before approval.

---

# Approval Criteria

Approve only when:

- The implementation is correct.
- Project standards are followed.
- Tests pass.
- Security concerns are addressed.
- Performance is acceptable.
- Documentation is sufficient.
- The code is production-ready.

---

# Final Review Checklist

Before approving:

□ Correct functionality

□ Clean architecture

□ Readable code

□ Proper TypeScript

□ React best practices

□ Next.js conventions

□ UI consistency

□ Responsive design

□ Accessibility

□ Performance

□ Security

□ API correctness

□ State management

□ Error handling

□ Testing

□ Documentation

□ Clean Git history

□ No unnecessary dependencies

□ Production-ready quality

Every Pull Request should leave the codebase in a better state than before.