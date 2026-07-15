# Page Request Template

## Goal

This template defines how to request the implementation of a complete page from an AI assistant.

A page is responsible for orchestrating layouts, data fetching, navigation, and user interactions while delegating reusable logic to features and shared components.

Pages should remain thin and should not become containers for business logic.

---

# Page Request Template

```text
Task:
Create a new page.

Page Name:
<Page Name>

Route:
<App Router path>

Business Goal:
<Why does this page exist?>

Description:
<High-level overview>

Target Users:
<Who uses this page?>

Requirements:

Functional Requirements:
- ...
- ...
- ...

Non-Functional Requirements:
- Responsive
- Accessible
- SEO optimized
- Performance optimized
- Production-ready

Constraints:

- Follow the AI Playbook
- Next.js App Router
- TypeScript Strict Mode
- No any
- Server Components by default
- Client Components only where required
- Reusable architecture

Data Source:
- API
- Server Action
- Static Data
- CMS
- Database

Expected Output:

- Folder structure
- Page implementation
- Components
- Types
- Loading state
- Error state
- Metadata
- Tests (if required)
```

---

# AI Workflow

Before implementation the AI should:

1. Understand the business goal.
2. Review existing routes.
3. Reuse existing layouts.
4. Reuse existing components.
5. Propose the page structure.
6. Identify required Client Components.
7. Implement incrementally.

---

# Routing

Every page should follow App Router conventions.

Example:

```
app/

dashboard/

courses/

profile/

settings/
```

Avoid unnecessary nested routes.

---

# Page Responsibility

A page should:

- Compose layouts
- Fetch data
- Pass props
- Coordinate feature modules

A page should **not** contain:

- Business logic
- Utility functions
- Validation logic
- Complex calculations

Move these responsibilities into dedicated modules.

---

# Rendering Strategy

Default:

Server Component

Use Client Components only for:

- Forms
- Modals
- Interactive controls
- Browser APIs

Minimize hydration.

---

# Metadata

Every page should define:

- title
- description
- Open Graph metadata
- Twitter metadata (if applicable)
- Canonical URL (if applicable)

SEO is required unless the page is private.

---

# Layout

Reuse existing layouts whenever possible.

Avoid duplicating page structure.

Shared layouts belong in layout files—not individual pages.

---

# Data Fetching

Prefer:

- Server Components
- Async server rendering
- Parallel requests
- Built-in caching

Avoid client-side fetching unless interaction requires it.

---

# Loading State

Every asynchronous page should include:

```
loading.tsx
```

Prefer skeletons over blank screens.

---

# Error Handling

Every page should define:

```
error.tsx
```

Provide meaningful recovery options when possible.

---

# Empty State

If no data exists:

Display a useful empty state.

Never render a blank page.

---

# UI Requirements

Every page should include:

- Responsive layout
- Consistent spacing
- Accessible interactions
- Design system compliance

Visual consistency is mandatory.

---

# Accessibility

Verify:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Focus management
- Screen reader compatibility

Accessibility issues are considered defects.

---

# Performance

The AI should optimize:

- Bundle size
- Hydration
- Network requests
- Image loading
- Rendering strategy

Performance should be considered during implementation—not afterward.

---

# Security

Verify:

- Authentication
- Authorization
- Input validation
- Safe rendering
- Secure data handling

Do not expose protected content.

---

# Navigation

The page should integrate correctly with:

- Breadcrumbs
- Navigation
- Deep linking
- Browser history

Navigation should feel natural.

---

# Forms

If forms exist, include:

- Validation
- Loading state
- Error handling
- Success feedback
- Disabled state

---

# Testing

If requested or appropriate, recommend tests for:

- Rendering
- Navigation
- Data fetching
- Error handling
- User interactions

---

# Documentation

Document the page if it introduces:

- New architecture
- New routing
- Public behavior
- Significant workflows

---

# AI Output

The response should include:

1. Page architecture
2. Folder structure
3. Data flow
4. Metadata
5. Components
6. Loading strategy
7. Error handling
8. Performance considerations
9. Security considerations

---

# Example Request

```text
Task:
Create a Course Details page.

Route:
/courses/[slug]

Requirements:

- Server Component
- Fetch course information
- Display lessons
- Display instructor profile
- Enrollment button
- SEO metadata
- Responsive
- Accessible

Follow the AI Playbook.

Expected Output:

- Folder structure
- Page
- Components
- Metadata
- Loading state
- Error handling
```

---

# Final Checklist

Before requesting a page, verify:

□ Business goal is defined.

□ Route is specified.

□ Functional requirements are complete.

□ Data source is identified.

□ Rendering strategy is clear.

□ SEO requirements are included.

□ Performance expectations are defined.

□ Security requirements are specified.

□ Accessibility requirements are included.

□ AI Playbook is referenced.

A page should orchestrate the application—not become the application itself.