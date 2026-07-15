# Prompt Patterns

## Goal

This document defines how AI assistants (ChatGPT, Claude, Kiro, GitHub Copilot, Cursor, etc.) should receive tasks throughout the project.

A well-written prompt produces predictable, high-quality results.

A vague prompt produces inconsistent implementations.

Every prompt should provide enough context for the AI to make good architectural decisions without unnecessary assumptions.

---

# Core Principles

Every prompt should be:

- Clear
- Specific
- Complete
- Context-aware
- Goal-oriented

Avoid ambiguous instructions.

---

# Always Provide Context

The AI should always know:

- What feature is being built
- Where it belongs
- Which architecture is used
- Which standards must be followed

Bad

```
Create a login page.
```

Good

```
Create a Login page inside the App Router.

Use the project's design system.

Follow all rules inside the AI Playbook.

Prefer Server Components whenever possible.

Client Components only for interactive sections.

Use TypeScript strictly.

No any.

Production-ready code only.
```

---

# State the Objective

Every prompt should explain:

- The business goal
- The expected behavior
- The desired outcome

Avoid asking only for implementation details.

---

# Mention Constraints

Always specify constraints.

Examples:

- No any
- No duplicated logic
- No inline styles
- Responsive design
- Accessible UI
- SEO-friendly
- Performance optimized
- Reusable components

Constraints improve consistency.

---

# Request Production Quality

Prefer prompts such as:

```
Generate production-ready code.
```

```
Write maintainable code.
```

```
Follow enterprise architecture.
```

```
Use clean architecture.
```

Avoid requesting quick prototypes unless intentionally experimenting.

---

# Encourage Planning

For medium or large tasks, request a plan first.

Example

```
First explain the implementation plan.

Wait for approval.

Then implement.
```

Planning reduces unnecessary rewrites.

---

# Large Features

Break large requests into phases.

Example

Phase 1

Architecture

Phase 2

API

Phase 3

UI

Phase 4

Testing

Phase 5

Optimization

Avoid asking AI to generate an entire complex system in one prompt.

---

# File-by-File Generation

Prefer:

```
Generate one file at a time.
```

Instead of:

```
Generate the entire project.
```

This improves consistency and review quality.

---

# Ask for Explanations

When introducing unfamiliar logic, request explanations.

Example

```
Explain important architectural decisions after the implementation.
```

Knowledge transfer is valuable.

---

# Require Existing Standards

Reference the playbook whenever possible.

Example

```
Follow:

05-coding.md

06-typescript.md

07-nextjs.md

09-performance.md

10-security.md
```

This keeps implementations aligned.

---

# UI Requests

When requesting UI:

Specify:

- Responsive
- Accessible
- Design system
- Dark mode compatibility (if applicable)
- Loading state
- Error state
- Empty state

Do not assume AI will include these automatically.

---

# API Requests

Specify:

- Request shape
- Response shape
- Validation
- Error handling
- Authentication
- Authorization
- Loading behavior

---

# Refactoring Requests

Clearly state:

- What should change
- What must remain unchanged

Example

```
Refactor this component.

Do not change public behavior.

Improve readability.

Reduce duplication.

Maintain backward compatibility.
```

---

# Bug Fix Requests

Provide:

- Expected behavior
- Actual behavior
- Error messages
- Steps to reproduce
- Related files

The more context provided, the more accurate the solution.

---

# Code Review Requests

Example

```
Review this code as a senior software engineer.

Identify:

- Bugs
- Architecture issues
- Performance problems
- Security risks
- Accessibility issues
- TypeScript improvements
- React improvements

Do not rewrite the code unless necessary.

Explain every finding.
```

---

# Optimization Requests

Example

```
Optimize this implementation.

Focus on:

- Performance
- Bundle size
- Readability
- Maintainability
- React rendering
- Next.js best practices

Do not change behavior.
```

---

# Documentation Requests

Example

```
Generate technical documentation for this module.

Include:

Purpose

Architecture

Public API

Examples

Limitations

Future improvements
```

---

# Testing Requests

Example

```
Generate comprehensive tests.

Cover:

Happy path

Edge cases

Validation

Error handling

Loading states

Empty states
```

---

# Things to Avoid

Avoid prompts like:

```
Make it better.
```

```
Optimize this.
```

```
Fix everything.
```

```
Improve UI.
```

These requests are too vague.

Always define success criteria.

---

# Preferred Workflow

Step 1

Explain the task.

Step 2

Review requirements.

Step 3

Produce implementation plan.

Step 4

Wait for approval if necessary.

Step 5

Generate implementation.

Step 6

Review implementation.

Step 7

Optimize.

Step 8

Generate tests.

Step 9

Generate documentation.

---

# AI Expectations

The AI should:

- Think before coding.
- Respect the project architecture.
- Avoid assumptions.
- Explain important trade-offs.
- Prefer simple solutions.
- Minimize technical debt.
- Keep code production-ready.

---

# Prompt Template

Use the following template whenever possible:

```
Task:
<Describe the feature or problem>

Context:
<Project architecture and related modules>

Requirements:
<List functional requirements>

Constraints:
- TypeScript
- No any
- Reusable
- Responsive
- Accessible
- SEO-friendly
- Production-ready

Follow:
AI Playbook

Expected Output:
<Describe exactly what should be generated>
```

---

# Final Checklist

Before sending a prompt, verify:

□ Business goal is clear

□ Context is provided

□ Relevant files are referenced

□ Constraints are specified

□ Success criteria are defined

□ Expected output is clear

□ Scope is realistic

□ Prompt is unambiguous

A high-quality prompt is the foundation of a high-quality implementation.