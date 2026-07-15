# Component Request Template

## Goal

This template defines how to request new UI components from an AI assistant.

A well-defined request ensures the generated component is reusable, maintainable, accessible, and aligned with the project's architecture.

Components should be designed for long-term use—not just to satisfy a single screen.

---

# Component Request Template

```text
Task:
Create a new component.

Component Name:
<ComponentName>

Purpose:
<What problem does this component solve?>

Location:
<Where should the component live?>

Feature:
<Which feature/module owns this component?>

Requirements:

- Use TypeScript (strict mode)
- Follow the AI Playbook
- Reusable
- Accessible
- Responsive
- Production-ready
- No any
- Clean architecture
- No duplicated logic

Props:
<List all props>

States:
- Default
- Loading
- Empty (if applicable)
- Error (if applicable)
- Disabled (if applicable)

Interactions:
<List user interactions>

Dependencies:
<List required hooks, services or UI primitives>

Expected Output:

- Component
- Types
- Tests (if required)
- Documentation (if required)
```

---

# Before Implementation

The AI should first determine:

- Is a new component actually needed?
- Can an existing component be reused?
- Should this become a shared component?
- Is the responsibility well defined?

Avoid creating unnecessary components.

---

# Component Principles

Every component should:

- Have a single responsibility.
- Be reusable.
- Be composable.
- Be predictable.
- Be easy to test.

---

# Folder Placement

The AI should determine the correct location.

Examples:

```
features/
```

```
components/ui/
```

```
components/shared/
```

```
features/auth/components/
```

Do not place components in random directories.

---

# Props Design

Props should be:

- Minimal
- Explicit
- Strongly typed
- Easy to understand

Avoid large prop objects unless justified.

---

# Composition

Prefer composition over configuration.

Good

```
<Card>
    <CardHeader />
    <CardBody />
    <CardFooter />
</Card>
```

Avoid huge components with dozens of configuration props.

---

# Accessibility

Every interactive component should support:

- Keyboard navigation
- Focus management
- Screen readers
- Semantic HTML
- ARIA attributes when needed

Accessibility is mandatory.

---

# Responsive Design

Every component should work correctly on:

- Mobile
- Tablet
- Desktop

Do not assume desktop-only layouts.

---

# Styling

Use:

- Tailwind utilities
- Design tokens
- Existing UI primitives

Avoid:

- Inline styles
- Duplicate styling
- Hardcoded values

---

# State Handling

Handle only state owned by the component.

Avoid unnecessary global state.

Keep derived state out of local state whenever possible.

---

# Error Handling

If applicable, define:

- Error UI
- Recovery behavior
- Retry actions

Never leave users without feedback.

---

# Loading State

If asynchronous data is involved:

Provide an appropriate loading state.

Prefer skeletons over generic spinners where practical.

---

# Empty State

When data may be absent:

Provide a meaningful empty state.

Avoid blank screens.

---

# Performance

The AI should verify:

- Minimal re-renders
- Correct memoization (only when justified)
- Lazy loading for heavy dependencies
- Efficient rendering

Performance should not be sacrificed for convenience.

---

# TypeScript

Requirements:

- No `any`
- Strong prop typing
- Proper interfaces
- Safe null handling
- Minimal type assertions

---

# Testing

If requested or appropriate, generate tests for:

- Rendering
- Props
- User interactions
- Edge cases
- Accessibility

Test observable behavior rather than implementation details.

---

# Documentation

If the component is shared, document:

- Purpose
- Props
- Usage examples
- Limitations

Shared components should be easy to discover and understand.

---

# AI Output

The response should include:

1. Component architecture
2. File structure
3. Type definitions
4. Implementation
5. Usage example
6. Testing recommendations
7. Performance considerations

---

# Example Request

```text
Task:
Create a reusable Button component.

Requirements:

- TypeScript
- Tailwind CSS
- Accessible
- Responsive
- Variants:
    - primary
    - secondary
    - outline
    - danger

Sizes:
- sm
- md
- lg

Support:

- Loading
- Disabled
- Icon
- Full width

Follow the AI Playbook.

Expected Output:

- Component
- Types
- Usage examples
```

---

# Final Checklist

Before requesting a component, verify:

□ The component has a clear purpose.

□ Reuse has been considered.

□ Props are defined.

□ States are defined.

□ Accessibility requirements are included.

□ Responsive behavior is required.

□ Performance expectations are stated.

□ TypeScript requirements are explicit.

□ Expected output is defined.

A well-designed component should be reusable across multiple features with minimal modification.