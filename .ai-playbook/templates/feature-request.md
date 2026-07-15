# Feature Request Template

## Goal

This template defines how to request the implementation of a new feature from an AI assistant.

A feature request should provide enough business and technical context for the AI to design and implement a production-ready solution that aligns with the project's architecture and standards.

The AI should understand **why** the feature exists before implementing **how** it works.

---

# Feature Request Template

```text
Task:
Implement a new feature.

Feature Name:
<Feature Name>

Business Goal:
<Why is this feature needed?>

Description:
<High-level overview>

Target Users:
<Who will use this feature?>

Related Module:
<Feature/Module Name>

Requirements:

Functional Requirements:
- ...
- ...
- ...

Non-Functional Requirements:
- Performance
- Security
- Accessibility
- SEO (if applicable)
- Responsiveness

Constraints:

- Follow the AI Playbook
- TypeScript Strict Mode
- No any
- Reusable architecture
- Production-ready
- No duplicated logic

Dependencies:
<List related APIs, services, hooks or components>

Expected Output:

- Architecture
- File structure
- Implementation
- Types
- Tests
- Documentation
```

---

# AI Workflow

Before writing code, the AI should:

1. Understand the business goal.
2. Review existing architecture.
3. Identify reusable components.
4. Propose an implementation plan.
5. Explain important design decisions.
6. Wait for approval if requested.
7. Implement the feature.
8. Review and optimize the solution.

Planning is preferred over immediate implementation.

---

# Requirement Analysis

The AI should identify:

- Functional requirements
- Non-functional requirements
- Edge cases
- Failure scenarios
- Dependencies
- Risks
- Future extensibility

Never assume missing requirements without documenting the assumption.

---

# Architecture

The implementation should follow:

- Feature-based architecture
- Separation of concerns
- Modular design
- Reusable components
- Strong typing

Business logic must remain independent of presentation.

---

# File Organization

The AI should propose the required file structure before implementation.

Example:

```
features/
    booking/
        components/
        hooks/
        services/
        types/
        utils/
        validation/
```

Only create files that have a clear responsibility.

---

# API Integration

When APIs are required, define:

- Endpoints
- Request models
- Response models
- Validation
- Authentication
- Error handling
- Retry strategy (if applicable)

Do not assume undocumented API behavior.

---

# UI Requirements

Every feature should include:

- Responsive layout
- Loading state
- Error state
- Empty state
- Success state
- Accessible interactions

UI should follow the project's design system.

---

# State Management

Keep state:

- Local whenever possible
- Predictable
- Minimal

Introduce global state only when justified.

---

# Validation

Define validation for:

- User input
- Route parameters
- Query parameters
- API payloads

Validation should exist on both frontend and backend where applicable.

---

# Error Handling

Every feature should handle:

- API failures
- Validation errors
- Permission errors
- Network failures
- Unexpected exceptions

Applications should fail gracefully.

---

# Performance

The AI should consider:

- Bundle size
- Rendering strategy
- Lazy loading
- Caching
- Network requests
- Memoization (only when justified)

Performance is part of the implementation—not an afterthought.

---

# Security

Verify:

- Authentication
- Authorization
- Input validation
- Output sanitization
- Sensitive data handling

Never weaken security to simplify implementation.

---

# Accessibility

The feature should support:

- Keyboard navigation
- Semantic HTML
- Screen readers
- Focus management
- ARIA attributes where needed

Accessibility issues are treated as defects.

---

# Testing

Generate or recommend tests for:

- Business logic
- Components
- API interactions
- User flows
- Edge cases
- Error scenarios

Critical workflows should be covered.

---

# Documentation

If the feature introduces public behavior or architectural changes, document:

- Purpose
- Architecture
- Usage
- Limitations
- Future considerations

Documentation should evolve with the implementation.

---

# AI Output

The response should include:

1. Feature overview
2. Architecture proposal
3. File structure
4. Data flow
5. Implementation
6. Testing strategy
7. Performance considerations
8. Security considerations
9. Accessibility considerations

---

# Example Request

```text
Task:
Implement a Course Enrollment feature.

Business Goal:
Allow authenticated users to enroll in courses.

Requirements:

- Authentication required
- Prevent duplicate enrollments
- Display enrollment status
- Optimistic UI updates
- Responsive
- Accessible
- Follow the AI Playbook

Expected Output:

- Architecture
- File structure
- Production-ready implementation
- Tests
```

---

# Final Checklist

Before submitting a feature request, verify:

□ Business goal is defined.

□ Functional requirements are complete.

□ Non-functional requirements are included.

□ Dependencies are identified.

□ Constraints are specified.

□ Expected output is clear.

□ Performance requirements are stated.

□ Security requirements are stated.

□ Accessibility requirements are included.

□ The AI Playbook is referenced.

A well-defined feature request produces consistent, maintainable, and production-ready implementations.