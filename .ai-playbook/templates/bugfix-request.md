# Bug Fix Request Template

## Goal

This template defines how bug reports should be written when requesting an AI assistant to investigate and fix an issue.

A complete bug report allows the AI to identify the root cause instead of applying temporary fixes.

Always provide as much context as possible.

---

# Bug Report Template

```text
Task:
Fix the following bug.

Bug Summary:
<Short description>

Expected Behavior:
<What should happen>

Actual Behavior:
<What currently happens>

Steps to Reproduce:
1.
2.
3.

Environment:
- Development / Staging / Production
- Browser
- Device
- Operating System

Related Files:
<List relevant files>

Error Message:
<Paste the exact error if available>

Screenshots:
<Optional>

Logs:
<Optional>

Additional Context:
<Anything else that may help>

Requirements:

- Find the root cause.
- Explain why the bug occurs.
- Fix the issue without introducing regressions.
- Preserve existing behavior unless explicitly required.
- Follow the AI Playbook.
```

---

# Required Information

A useful bug report should include:

- Problem description
- Expected behavior
- Actual behavior
- Reproduction steps
- Environment details
- Error messages
- Related files
- Screenshots (if applicable)

The more information provided, the more accurate the diagnosis.

---

# AI Investigation Process

Before writing any code, the AI should:

1. Understand the bug.
2. Review the relevant files.
3. Identify the root cause.
4. Explain the cause.
5. Propose the safest solution.
6. Consider side effects.
7. Implement the fix.
8. Verify the solution.

Never jump directly to implementation.

---

# Root Cause Analysis

The AI should explain:

- Why the issue occurs.
- Which part of the code is responsible.
- Why previous logic failed.
- Whether similar issues may exist elsewhere.

A correct diagnosis is more important than a quick fix.

---

# Preferred Fix Strategy

Fixes should:

- Be minimal.
- Be maintainable.
- Preserve architecture.
- Avoid duplicated logic.
- Avoid introducing technical debt.

Never apply temporary workarounds unless explicitly requested.

---

# Regression Prevention

Every bug fix should consider:

- Existing functionality
- Related modules
- Edge cases
- Performance
- Security
- Accessibility

When practical, add or update tests to prevent the bug from reappearing.

---

# Common Bug Categories

Examples include:

- Rendering issues
- Hydration mismatches
- State synchronization
- API failures
- Authentication problems
- Authorization issues
- Validation errors
- TypeScript errors
- Build failures
- Memory leaks
- Performance regressions
- Styling inconsistencies
- Responsive layout issues
- Accessibility defects

The investigation approach should be adapted to the category.

---

# Performance Considerations

A bug fix should not:

- Increase bundle size unnecessarily.
- Introduce extra network requests.
- Cause unnecessary re-renders.
- Create memory leaks.

Maintain or improve performance whenever possible.

---

# Security Considerations

While fixing bugs, verify that the solution:

- Does not expose sensitive data.
- Does not weaken validation.
- Does not bypass authentication or authorization.
- Does not introduce XSS, CSRF, or injection risks.

Security must never be sacrificed to resolve a bug quickly.

---

# Output Format

The AI response should include:

## 1. Root Cause

Explain why the bug occurs.

---

## 2. Proposed Solution

Explain the chosen fix.

---

## 3. Files to Modify

List all affected files.

---

## 4. Implementation

Provide production-ready code.

---

## 5. Verification

Describe how to verify the fix.

---

## 6. Regression Risks

Identify any areas that should be tested after the change.

---

# Example Request

```text
Task:
Fix a hydration mismatch.

Expected Behavior:
The page should hydrate without warnings.

Actual Behavior:
React reports a hydration mismatch after refresh.

Environment:
Development

Related Files:
app/dashboard/page.tsx
components/Header.tsx

Requirements:

- Find the root cause.
- Explain the issue.
- Fix it without changing visible behavior.
- Follow the AI Playbook.
```

---

# Final Checklist

Before submitting a bug fix request, verify:

□ The problem is clearly described.

□ Expected behavior is defined.

□ Actual behavior is defined.

□ Reproduction steps are included.

□ Environment details are provided.

□ Error messages are attached.

□ Related files are identified.

□ Requirements are explicit.

□ The AI is asked to identify the root cause first.

A well-structured bug report leads to faster, safer, and more reliable fixes.