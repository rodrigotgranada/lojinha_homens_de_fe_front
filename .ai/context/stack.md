# Frontend Stack Standards

This document defines the official frontend stack, responsibilities, usage standards, and architectural expectations for the platform.

All implementations must follow these standards unless a documented architectural decision explicitly states otherwise.

---

# Core Philosophy

The stack is designed to prioritize:

* scalability
* maintainability
* enterprise UX
* AI-friendly architecture
* strong typing
* reusable abstractions
* predictable patterns
* production readiness

The stack should behave as a reusable frontend platform rather than a collection of isolated screens.

---

# Core Stack

## React 19

React is the primary UI engine.

Use React for:

* composable UI
* reusable abstractions
* declarative rendering
* state-driven interfaces
* scalable component architecture

Prefer:

* functional components
* hooks
* composition
* isolated logic

Avoid:

* class components
* excessive prop drilling
* monolithic components
* deeply nested render trees

---

# Next.js 15 App Router

Next.js App Router is the official application framework.

Use Next.js for:

* routing
* layouts
* server rendering
* streaming
* async boundaries
* server components when appropriate

Prefer:

* App Router patterns
* route groups
* layout composition
* server-first architecture where beneficial

Avoid:

* legacy Pages Router patterns
* unnecessary client components
* oversized layout trees

---

# TypeScript Strict Mode

Strict TypeScript is mandatory.

Requirements:

* strong typing
* explicit contracts
* reusable interfaces
* typed APIs
* typed hooks
* typed async states

Never:

* use `any`
* bypass typing without justification
* disable strict typing rules

Prefer:

* inferred types when clear
* reusable generic utilities
* discriminated unions
* utility types
* domain-oriented typing

---

# Chakra UI v3

Chakra UI v3 Composition API is the official UI framework.

The project must prioritize:

* composition
* accessibility
* reusable primitives
* scalable variants
* semantic abstractions

Preferred patterns:

* compound components
* semantic wrappers
* reusable variants
* responsive props
* token-based styling

Preferred API style:

```tsx
<Dialog.Root>
  <Dialog.Content>
    <Dialog.Header />
  </Dialog.Content>
</Dialog.Root>
```

Avoid:

* legacy Chakra patterns
* tightly coupled styles
* excessive inline styling
* duplicated visual logic

---

# Component Architecture Standards

Components should follow layered architecture whenever appropriate:

```txt
component/
├── base/
├── variants/
├── semantic/
├── hooks/
├── styles/
├── types/
└── index.ts
```

---

# Base Layer

Contains reusable primitive components.

Examples:

* Button
* Input
* Modal
* Drawer
* Table

Base components should:

* remain reusable
* remain domain-agnostic
* avoid business rules
* expose scalable APIs

---

# Variant Layer

Contains reusable variations of primitives.

Examples:

* PrimaryButton
* DangerModal
* AsyncSelect
* CompactTable

Variants should specialize behavior or styling without introducing domain logic.

---

# Semantic Layer

Contains business-oriented abstractions.

Examples:

* UsersTable
* BillingDrawer
* PermissionsForm
* AnalyticsCard

Semantic components compose primitives and variants into domain-aware experiences.

---

# React Hook Form

React Hook Form is the official form engine.

All forms must:

* use RHF
* use reusable field abstractions
* support accessibility
* support async UX
* support validation feedback
* support loading states

Prefer:

* controlled abstractions only when necessary
* reusable form providers
* isolated field components
* semantic form composition

Avoid:

* duplicated form logic
* excessive inline validation
* unmanaged form state

---

# Yup Validation

Yup is the official validation library.

Validation should:

* remain isolated
* remain reusable
* remain declarative

Prefer:

* schema composition
* reusable validators
* semantic validation rules

Avoid:

* validation directly inside components
* duplicated validation logic

---

# Zustand

Zustand is the official client state manager.

Use Zustand for:

* global UI state
* persistent client state
* lightweight shared state

Examples:

* sidebar state
* theme preferences
* modal orchestration
* filters
* command palette state

Avoid using Zustand for:

* server cache
* async fetching
* backend synchronization

Prefer minimal stores.

---

# TanStack Query / React Query

TanStack Query is the official async data layer.

All async fetching should prioritize:

* reusable hooks
* query abstraction
* caching
* retry handling
* stale management
* optimistic updates

Preferred pattern:

```tsx
const { data, isLoading } = useUsers()
```

Avoid:

```tsx
useEffect(() => {
  fetch(...)
})
```

unless strictly necessary.

---

# Async Architecture Standards

All async experiences must support:

* loading states
* skeleton states
* retry states
* empty states
* graceful errors
* optimistic interactions

Avoid:

* blank screens
* invisible loading
* abrupt transitions
* UI flickering

---

# Styling Standards

Styling should prioritize:

* Chakra tokens
* responsive props
* semantic spacing
* reusable style recipes
* visual consistency

Avoid:

* magic values
* inconsistent spacing
* duplicated styling logic
* hardcoded responsive behaviors

---

# Responsive Standards

Mobile-first is mandatory.

All layouts and components should:

* start from mobile
* progressively enhance for desktop
* support touch interactions
* support adaptive spacing
* support fluid layouts

Desktop should extend the mobile experience rather than replace it.

---

# Accessibility Standards

Accessibility is mandatory.

All interactive components must support:

* keyboard navigation
* focus visibility
* screen readers
* semantic HTML
* ARIA attributes
* reduced motion preferences

Accessibility should be considered part of engineering quality, not optional polish.

---

# Performance Standards

The platform should optimize for:

* low re-rendering
* lazy loading
* virtualization when needed
* async boundaries
* efficient rendering
* scalable rendering patterns

Avoid premature optimization, but never ignore scalability concerns.

---

# Folder Organization Philosophy

The project should prioritize:

* feature-based organization
* low cognitive load
* predictable structure
* scalable modules
* reusable abstractions

Avoid:

* random folder structures
* duplicated modules
* mixed responsibilities
* oversized feature folders

---

# AI-Friendly Engineering Standards

The architecture must optimize for AI-assisted engineering.

Requirements:

* explicit conventions
* reusable patterns
* predictable abstractions
* semantic consistency
* low ambiguity
* isolated responsibilities

The codebase should feel understandable both for developers and AI systems.

---

# Forbidden Patterns

The following patterns are strongly discouraged:

* `any`
* giant components
* excessive `useEffect`
* inline fetch logic
* duplicated state
* business logic inside JSX
* tightly coupled UI
* deeply nested prop chains
* inconsistent component APIs

---

# Preferred Engineering Patterns

Prefer:

* composition over inheritance
* reusable hooks
* semantic abstractions
* declarative APIs
* scalable architecture
* isolated responsibilities
* strongly typed contracts
* predictable component structures

---

# Final Engineering Goal

The stack should consistently enable:

* enterprise scalability
* reusable product foundations
* premium UX quality
* maintainable architecture
* AI-friendly development
* long-term sustainability

The project should feel like a frontend platform rather than a temporary application.
