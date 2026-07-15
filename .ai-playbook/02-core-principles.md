# Core Engineering Principles

These principles define HOW decisions should be made.

They are intentionally technology-agnostic.

These principles apply regardless of programming language,
framework,
or project size.

---

# Principle 1

Prefer Simplicity

Always choose the simplest solution that satisfies the current requirements.

Simple solutions are:

- easier to debug
- easier to review
- easier to test
- easier to maintain

Do not introduce complexity unless it provides measurable value.

---

Decision

IF two solutions solve the same problem,

THEN choose the simpler one.

---

Avoid

❌ Clever code

Prefer

✅ Clear code

---

# Principle 2

KISS

Keep It Simple.

Complexity should never be the default.

Before introducing additional architecture,
ask:

"What problem does this solve?"

If the answer is unclear,

do not introduce it.

---

# Principle 3

YAGNI

You Aren't Gonna Need It.

Do not implement features for hypothetical future requirements.

Future requirements belong in the future.

Current code should solve current problems.

---

Decision

IF a feature is not required today,

Do not build it today.

---

# Principle 4

DRY

Don't Repeat Yourself.

Avoid duplicated business logic.

However,

do NOT remove duplication too early.

Some duplication is acceptable.

Wrong abstraction is worse than small duplication.

---

Decision

One usage

↓

Keep local.

---

Two usages

↓

Consider extraction.

---

Three or more usages

↓

Extract shared implementation.

---

# Principle 5

Avoid Premature Abstraction

Never create abstraction because it feels cleaner.

Create abstraction only when it reduces complexity.

Every abstraction has maintenance cost.

---

Bad

Create Service

↓

because every project has services

---

Good

Create Service

↓

because business logic is shared.

---

# Principle 6

High Cohesion

Things that belong together

should stay together.

Do not separate related logic unnecessarily.

---

Example

A small component

should contain

UI

state

handlers

together.

---

# Principle 7

Low Coupling

Reduce unnecessary dependencies between modules.

A change in one module should affect as few modules as possible.

---

Avoid

Component

↓

Component

↓

Component

↓

Component

↓

Component

---

Prefer

Component

↓

Shared Logic

---

# Principle 8

Composition over Inheritance

Build software from small reusable parts.

Avoid deep inheritance hierarchies.

Prefer composition whenever possible.

---

# Principle 9

Explicit over Implicit

Code should explain itself.

Avoid hidden behavior.

Avoid magic.

Avoid surprising side effects.

A developer should understand the code
without reading documentation.

---

# Principle 10

Optimize for Reading

Code is written once.

Read hundreds of times.

Optimize for readers.

Not writers.

---

# Principle 11

Single Responsibility

Every module

should have one reason to change.

This does NOT mean

every function

must contain three lines.

Avoid over-splitting code.

Focus on responsibility,

not line count.

---

# Principle 12

Local First

Keep logic as close as possible
to where it is used.

Do not extract code prematurely.

Local code is often easier to understand.

---

Decision

Used once

↓

Keep local.

---

# Principle 13

Scale Gradually

Architecture should evolve.

Do not begin with enterprise architecture.

Grow architecture together with the project.

---

Small Project

↓

Simple Architecture

---

Medium Project

↓

Modular Architecture

---

Enterprise

↓

Feature Architecture

---

# Principle 14

Measure Before Optimizing

Never assume.

Measure.

Profile.

Then optimize.

Avoid micro-optimizations.

---

# Principle 15

Readable Naming

Names should explain intent.

Avoid abbreviations.

Avoid generic names.

Prefer

calculateTotalPrice()

instead of

calc()

---

# Principle 16

Avoid Hidden Behavior

Functions should not surprise developers.

Inputs

↓

Predictable Logic

↓

Predictable Output

Avoid unexpected mutations.

Avoid hidden state.

---

# Principle 17

Fail Clearly

Errors should be explicit.

Never silently ignore failures.

Never swallow exceptions.

Return useful information.

---

# Principle 18

Consistency

Project consistency

is more valuable

than personal preference.

Follow existing conventions.

---

# Principle 19

Business First

Technology exists

to solve business problems.

Do not introduce technology

without business value.

---

# Principle 20

Long-Term Thinking

Assume the code

will exist

for years.

Write software

that future developers

will appreciate.

---

# Golden Rule

Whenever two solutions are technically correct,

prefer the one that is:

- simpler
- easier to debug
- easier to maintain
- easier to extend
- easier to understand

Never choose complexity
without measurable benefit.

---

# Final Self Check

Before writing code ask:

1.

Is there a simpler solution?

2.

Is this abstraction necessary?

3.

Can another developer understand this in five minutes?

4.

Will this be easy to debug?

5.

Am I solving today's problem or tomorrow's imagination?

If any answer is unsatisfactory,

rethink the implementation.