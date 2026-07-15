# TypeScript Engineering Guide

This document defines engineering rules for writing scalable, maintainable, and type-safe TypeScript.

Target:
- TypeScript 5+
- Strict Mode
- Production Applications

TypeScript is not only a type checker.

It is a design tool.

Use it to model the business domain.

Never use it only to satisfy the compiler.

---

# Strict Mode

Always assume:

strict = true

Never write code that depends on relaxed compiler options.

---

# Type Safety

Never trade type safety for convenience.

Avoid shortcuts.

If TypeScript reports an error,

understand why.

Do not silence the compiler.

---

# any

Never use any.

There are very few valid use cases.

Decision

Need unknown data?

↓

Use unknown.

Need generic data?

↓

Use Generics.

Need flexible object?

↓

Use Record.

Need impossible case?

↓

Use never.

Never use any to "make the error disappear".

---

# unknown

Prefer unknown over any.

unknown forces validation.

any disables validation.

---

Good

unknown

↓

Validate

↓

Safe

---

Bad

any

↓

Hope it works

---

# never

Use never to represent impossible states.

Never use never to silence TypeScript.

---

# Type vs Interface

Decision

Need object contract?

↓

Prefer interface.

Need union?

↓

Use type.

Need mapped type?

↓

Use type.

Need primitive alias?

↓

Use type.

Need declaration merging?

↓

Use interface.

---

Never argue about type vs interface.

Choose based on purpose.

---

# Interface Philosophy

Interfaces describe object shapes.

Keep interfaces focused.

Avoid huge interfaces.

---

Bad

UserEverything

---

Prefer

User

UserProfile

UserPermissions

UserSettings

---

# Type Aliases

Use type for:

Union Types

Intersection Types

Mapped Types

Conditional Types

Template Literal Types

Primitive aliases

Function signatures

---

# Enum

Avoid enum by default.

Prefer literal unions.

Good

type Status =
"draft"
| "published"
| "archived"

---

Avoid

enum Status

unless interoperability requires it.

---

# Literal Types

Prefer literal unions

instead of generic string.

Good

type Theme =
"light"
| "dark"

Bad

theme: string

---

# Discriminated Union

Prefer discriminated unions

for state machines.

Good

Loading

Success

Error

Empty

instead of

multiple boolean flags.

---

Bad

isLoading

isSuccess

isError

isEmpty

---

# Generic Types

Generics should improve flexibility.

Avoid unnecessary generics.

Decision

Only one concrete type

↓

No generic.

Multiple valid types

↓

Generic.

---

Bad

<T>

everywhere.

---

# Generic Naming

Avoid

<TDataResultValue>

Prefer

T

TData

TItem

TError

TResponse

---

# Record

Prefer Record

for dynamic keys.

Good

Record<string, User>

instead of

{ [key:string]: User }

---

# Utility Types

Prefer built-in utility types.

Examples

Pick

Omit

Partial

Required

Readonly

Record

ReturnType

Parameters

Awaited

Exclude

Extract

InstanceType

No need to reinvent them.

---

# Readonly

Prefer immutable data.

Mark values readonly

when mutation is not intended.

---

# as

Avoid type assertions.

Bad

value as User

---

Prefer

Validation

or

Type Guards.

---

# satisfies

Prefer satisfies

when checking object structure

without losing inference.

Avoid unnecessary assertions.

---

# as const

Use as const

for immutable configuration.

Example

routes

permissions

roles

constants

Do not overuse it.

---

# Type Guards

Prefer explicit narrowing.

Good

typeof

instanceof

in

custom guards

---

Avoid

blind assertions.

---

# Assertion Functions

Use assertion functions

only

when validation is guaranteed.

Avoid abusing assertions.

---

# Nullability

Avoid nullable values

unless they represent real business states.

Prefer

undefined

for missing values.

Use null

only when domain explicitly requires it.

---

# Optional Properties

Use optional properties

only when truly optional.

Avoid making everything optional.

---

# Exact Types

Prefer exact domain types.

Bad

string

Good

Email

Currency

LanguageCode

CountryCode

Role

Permission

---

# Domain Modeling

Model the business.

Do not model the database.

Business language

should appear in types.

---

# Functions

Always define return types

for exported functions.

Internal functions

may rely on inference.

---

# Inference

Trust inference.

Do not annotate

everything.

Avoid

const age: number = 18

Prefer

const age = 18

---

# Arrays

Prefer

ReadonlyArray<T>

when mutation is unnecessary.

---

# Tuples

Use tuples

only

when order has semantic meaning.

Avoid replacing objects

with tuples.

---

# Casting

Every cast

must have justification.

If many casts appear,

redesign the types.

---

# API Responses

Never trust backend data.

Validate external data.

Types do NOT validate runtime.

Use runtime validation.

---

# Runtime Validation

TypeScript disappears at runtime.

Never confuse

compile-time safety

with

runtime safety.

Use validation

for external input.

---

# Errors

Never throw raw strings.

Prefer

Error

or

custom error types.

---

# File Organization

Keep types

close to the domain.

Avoid giant

types.ts

containing everything.

---

# Naming

Types

PascalCase

Interfaces

PascalCase

Generics

TSomething

Constants

UPPER_CASE

Variables

camelCase

---

# Anti-patterns

Avoid

any

blind assertions

huge interfaces

over-generic code

enum everywhere

optional everything

casting everything

boolean state explosion

copy-pasted types

duplicate models

---

# Philosophy

TypeScript should prevent bugs.

Not hide them.

The compiler is your teammate.

Do not fight it.

Learn from it.

---

# Final Checklist

Before returning TypeScript code ask:

Did I avoid any?

Can inference do the work?

Is the domain modeled correctly?

Did I avoid unnecessary casting?

Are exported APIs typed?

Did I validate external data?

Can another developer understand these types?

Would this survive long-term maintenance?

Only then generate the implementation.