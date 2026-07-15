# Review Request Template

## Goal

This template defines how to request a professional code review from an AI assistant.

The purpose of a review is to evaluate code quality, identify risks, suggest improvements, and ensure compliance with the project's architecture and standards.

The AI should behave like a Senior Software Engineer or Staff Engineer—not like an automatic code formatter.

---

# Review Request Template

```text
Task:
Review the following code.

Objective:
Perform a comprehensive technical review.

Context:
<Explain what this code does>

Files:
<List relevant files>

Requirements:

Review the code for:

- Architecture
- Readability
- Maintainability
- TypeScript
- React
- Next.js
- Performance
- Security
- Accessibility
- Error handling
- Testing
- Scalability
- Best practices

Follow the AI Playbook.

Do not rewrite the code unless necessary.

Explain every issue and justify every recommendation.
```

---

# AI Review Process

Before making recommendations, the AI should:

1. Understand the purpose of the code.
2. Review surrounding context.
3. Identify architectural decisions.
4. Evaluate implementation quality.
5. Detect risks.
6. Prioritize findings.
7. Recommend improvements.

Avoid reviewing isolated lines without considering the overall design.

---

# Review Philosophy

A review should be:

- Objective
- Constructive
- Actionable
- Evidence-based
- Consistent

Critique the implementation—not the developer.

---

# Severity Levels

Every issue should be categorized.

## Critical

Issues that may cause:

- Security vulnerabilities
- Data loss
- Production failures
- Broken functionality

These should be fixed before merging.

---

## High

Issues affecting:

- Maintainability
- Performance
- Scalability
- Reliability

Strongly recommended before merge.

---

## Medium

Improvements related to:

- Readability
- Code organization
- Reusability
- Consistency

Should be addressed when practical.

---

## Low

Minor improvements such as:

- Naming
- Formatting
- Documentation
- Small refactors

Useful but not blockers.

---

# Architecture Review

Verify:

- Separation of concerns
- Feature boundaries
- Dependency direction
- Folder organization
- Layer responsibilities
- Reusability

Avoid architectural drift.

---

# TypeScript Review

Check:

- No `any`
- Safe typing
- Correct interfaces
- Proper generics
- Nullable handling
- Type inference

Unsafe typing should be highlighted.

---

# React Review

Verify:

- Proper hook usage
- Stable keys
- Component responsibility
- Render efficiency
- State management
- Memoization usage

Avoid unnecessary re-renders.

---

# Next.js Review

Verify:

- Server Components by default
- Proper App Router usage
- Metadata
- Loading states
- Error boundaries
- Data fetching strategy
- Caching

Ensure framework best practices are followed.

---

# Performance Review

Check for:

- Large bundles
- Duplicate requests
- Expensive renders
- Missing lazy loading
- Hydration issues
- Unoptimized images
- Memory leaks

Performance recommendations should be measurable.

---

# Security Review

Verify:

- Input validation
- Output sanitization
- Authentication
- Authorization
- Secret management
- Safe API usage

Security issues always take priority.

---

# Accessibility Review

Verify:

- Semantic HTML
- Labels
- Keyboard support
- Focus management
- ARIA attributes
- Color contrast (when applicable)

Accessibility regressions should be reported.

---

# Error Handling

Check:

- Error boundaries
- API failures
- Validation failures
- Loading states
- Empty states
- Recovery mechanisms

Applications should fail gracefully.

---

# Testing Review

Evaluate:

- Existing test coverage
- Missing edge cases
- Regression risks
- Test quality

Recommend additional tests where needed.

---

# Documentation Review

Verify:

- Public APIs documented
- Complex logic explained
- Comments are meaningful
- Documentation reflects implementation

Outdated documentation should be reported.

---

# AI Output Format

The response should include:

## 1. Summary

Overall quality assessment.

---

## 2. Strengths

Identify what is implemented well.

---

## 3. Findings

For each finding include:

- Severity
- Category
- Explanation
- Recommendation

---

## 4. Risks

Potential production risks.

---

## 5. Suggested Improvements

Prioritized recommendations.

---

## 6. Overall Verdict

One of:

- Approve
- Approve with Minor Changes
- Request Changes
- Reject

Include a brief justification.

---

# Example Request

```text
Task:
Review the authentication module.

Files:

features/auth/

Requirements:

Review:

- Architecture
- TypeScript
- Security
- Performance
- Error handling
- Testing

Follow the AI Playbook.

Explain every issue before suggesting code changes.
```

---

# Final Checklist

Before requesting a review, verify:

□ The purpose of the code is explained.

□ Relevant files are included.

□ Review scope is defined.

□ Evaluation criteria are listed.

□ The AI Playbook is referenced.

□ The desired output format is specified.

□ The AI is instructed to explain findings before proposing changes.

A thorough review should improve both the current implementation and the long-term quality of the codebase.