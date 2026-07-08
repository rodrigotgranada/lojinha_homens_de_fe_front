# Granada TypeScript Engineering Standards

This document defines the official TypeScript architecture philosophy, typing standards, contract design principles, and scalable typing patterns for the platform.

TypeScript is considered a foundational architecture layer.

The goal is not simply adding types.

The goal is to create:

* scalable type systems
* predictable APIs
* maintainable contracts
* reusable type architecture
* enterprise-grade safety
* AI-friendly code generation

TypeScript should improve scalability, readability, and developer confidence.

---

# Core TypeScript Philosophy

TypeScript should prioritize:

* predictability
* clarity
* maintainability
* scalability
* semantic meaning
* reusable contracts

Types should communicate intent clearly.

---

# Strict Typing Philosophy

Strict typing is mandatory.

The platform uses:

```json id="ts-json-1"
{
  "strict": true
}
```

All code should remain compatible with strict TypeScript rules.

---

# Forbidden TypeScript Patterns

Never use:

```ts id="ts-forbidden-1"
any
```

Avoid:

* unsafe casting
* weak typing
* duplicated contracts
* implicit unknown behavior
* oversized generic complexity

Type safety must remain intentional.

---

# Preferred TypeScript Characteristics

Prefer types that feel:

* explicit
* readable
* reusable
* scalable
* semantic
* predictable

Types should improve engineering clarity.

---

# Type Architecture Philosophy

Type systems should behave as reusable architecture layers.

The platform should prioritize:

* shared contracts
* reusable interfaces
* semantic typing
* domain-driven contracts

Avoid fragmented type organization.

---

# Semantic Typing Philosophy

Types should communicate business meaning.

Preferred:

```ts id="ts-semantic-1"
type UserId = string
type RoleId = string
type PermissionSlug = string
```

Avoid meaningless primitive duplication.

---

# Interface vs Type Philosophy

Prefer:

```ts id="ts-pref-1"
interface
```

for extensible object contracts.

Prefer:

```ts id="ts-pref-2"
type
```

for:

* unions
* mapped types
* utility composition
* derived contracts

Use intentionally.

---

# Component Typing Philosophy

Component APIs must remain predictable.

Preferred:

```ts id="ts-comp-1"
interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
}
```

Avoid oversized prop interfaces.

---

# Component Contract Rules

Component contracts should:

* expose clear APIs
* remain composable
* support scalability
* minimize ambiguity

Avoid overly generic component contracts.

---

# Generic Philosophy

Generics should improve reusability without harming readability.

Preferred:

```ts id="ts-gen-1"
interface TableProps<T>
```

Avoid deeply nested generic complexity.

---

# Generic Rules

Use generics when:

* behavior is reusable
* domain shape varies
* contracts remain predictable

Avoid generics that reduce contextual understanding.

---

# Discriminated Union Philosophy

Prefer discriminated unions for predictable state management.

Preferred:

```ts id="ts-union-1"
type AsyncState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: string }
```

Avoid ambiguous boolean combinations.

---

# Async Typing Philosophy

Async state should remain explicit.

Prefer typed async contracts.

Avoid:

```ts id="ts-async-bad-1"
loading: boolean
error: boolean
```

without meaningful async state structure.

---

# Nullable Rules

Nullable behavior should remain intentional.

Prefer:

```ts id="ts-null-1"
User | null
```

over unsafe undefined assumptions.

Avoid unclear nullable flows.

---

# Optional Property Philosophy

Optional properties should remain meaningful.

Avoid excessive optional chaining caused by weak architecture.

Prefer explicit contracts.

---

# Type Inference Philosophy

Leverage inference when readability remains strong.

Avoid unnecessary manual typing when inference is already clear.

Do not over-annotate trivial code.

---

# Utility Type Philosophy

Utility types should improve scalability.

Preferred utilities:

```ts id="ts-util-1"
Partial
Pick
Omit
Record
Readonly
Required
```

Avoid excessive type gymnastics.

---

# Domain Type Philosophy

Domain contracts should remain centralized.

Preferred structure:

```txt id="ts-domain-1"
types/
├── api/
├── domain/
├── ui/
├── forms/
└── shared/
```

Avoid duplicated business contracts.

---

# API Typing Philosophy

API contracts must remain strongly typed.

Requirements:

* typed responses
* typed payloads
* typed mutations
* typed query results

Avoid untyped API orchestration.

---

# React Query Typing Rules

React Query hooks should expose typed contracts.

Preferred:

```ts id="ts-query-1"
useUsers(): UseQueryResult<User[]>
```

Avoid implicit unknown data structures.

---

# Form Typing Philosophy

Forms must support typed schemas.

Preferred integration:

```txt id="ts-form-1"
Yup
↓
InferType
↓
React Hook Form
```

Avoid duplicated form contracts.

---

# Validation Typing Rules

Validation schemas should drive type safety whenever possible.

Prefer schema-derived contracts.

Avoid duplicated validation definitions.

---

# Zustand Typing Philosophy

Zustand stores must remain strongly typed.

Requirements:

* typed state
* typed actions
* typed selectors

Avoid weakly typed global state.

---

# Event Typing Philosophy

Events should remain explicit.

Preferred:

```ts id="ts-event-1"
React.ChangeEvent<HTMLInputElement>
```

Avoid implicit event assumptions.

---

# Children Typing Rules

Use:

```ts id="ts-children-1"
React.ReactNode
```

for renderable children contracts.

Avoid overly restrictive child typing unless necessary.

---

# Enum Philosophy

Prefer union literals over enums when possible.

Preferred:

```ts id="ts-union-pref-1"
type ButtonVariant = "primary" | "secondary"
```

Avoid unnecessary enums for UI contracts.

---

# Folder Structure Philosophy

Types should remain discoverable.

Preferred:

```txt id="ts-folder-1"
component/
├── types/
└── interfaces/
```

Avoid scattering related contracts across unrelated folders.

---

# Naming Philosophy

Type names should remain semantic and explicit.

Preferred:

```ts id="ts-name-1"
User
UserResponse
CreateUserPayload
RolePermissions
```

Avoid vague naming.

---

# AI-Friendly TypeScript Philosophy

Type architecture should optimize:

* contextual understanding
* reusable contracts
* predictable APIs
* scalable abstractions

Types should help AI generate cohesive code.

---

# Scalability Philosophy

Type systems should scale naturally as the platform grows.

Architecture should support:

* reusable modules
* evolving domains
* extensible contracts
* feature expansion

Avoid tightly coupled type ecosystems.

---

# Readability Philosophy

Readable types are preferred over “clever” types.

Avoid:

* excessive nesting
* impossible-to-read utility chains
* overengineered generics

Maintainability is more important than type wizardry.

---

# Performance Philosophy

Type systems should remain performant for developer tooling.

Avoid excessive type complexity that harms IDE responsiveness.

Type architecture should support scalable DX.

---

# Forbidden TypeScript Characteristics

Avoid:

* any
* implicit contracts
* duplicated types
* weak API typing
* unsafe casting
* excessive generic complexity
* ambiguous async state
* oversized prop contracts

Avoid type systems that become difficult to reason about.

---

# Preferred TypeScript Characteristics

Prefer code that feels:

* safe
* predictable
* semantic
* scalable
* reusable
* maintainable
* enterprise-grade

TypeScript should reinforce architectural quality.

---

# Final TypeScript Goal

The platform should behave as:

* a strongly typed frontend ecosystem
* a scalable contract architecture
* a reusable type-safe platform
* a production-grade TypeScript foundation

Every contract should reinforce predictability, maintainability, and long-term scalability.
