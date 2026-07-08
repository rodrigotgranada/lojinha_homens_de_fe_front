# Granada React Engineering Standards

This document defines the official React engineering philosophy, architectural standards, composition patterns, rendering mindset, and scalable frontend engineering practices for the platform.

This project uses React as a scalable frontend platform architecture rather than a simple UI library.

The goal is to create:

* scalable React applications
* reusable component ecosystems
* enterprise-grade frontend architecture
* predictable rendering behavior
* composable UI systems
* maintainable engineering patterns

React should be used as a platform foundation.

---

# Core React Philosophy

React architecture should prioritize:

* composition
* scalability
* predictability
* readability
* maintainability
* separation of concerns
* semantic abstraction

The codebase should remain understandable as the platform grows.

---

# React Mindset

React is NOT used to create isolated pages.

React is used to create:

* reusable UI systems
* scalable workflows
* composable product architecture
* predictable interaction ecosystems

Every implementation should contribute to long-term scalability.

---

# Composition Over Duplication

Composition is mandatory.

Prefer:

* reusable primitives
* semantic composition
* shared abstractions
* modular interfaces

Avoid duplicated implementations.

---

# Composition-First Architecture

Components should behave as composable building blocks.

Preferred architecture:

```tsx
<Drawer>
  <Drawer.Trigger />
  <Drawer.Content>
    <Drawer.Header />
    <Drawer.Body />
    <Drawer.Footer />
  </Drawer.Content>
</Drawer>
```

Avoid monolithic prop-driven APIs when composition improves scalability.

---

# Compound Components Philosophy

Use Compound Components Pattern when:

* internal hierarchy exists
* multiple related sections exist
* state sharing improves UX
* readability improves

Examples:

* Modal
* Drawer
* Tabs
* Accordion
* Table
* Form
* Command Palette

Compound APIs should feel declarative and predictable.

---

# Semantic Component Philosophy

Prefer semantic abstractions over duplicated assembly logic.

Preferred:

```tsx
<UserTable />
<SettingsDrawer />
<RoleForm />
<AnalyticsCard />
```

Avoid rebuilding the same compositions repeatedly.

---

# Separation of Concerns

UI, state, business logic, and async orchestration should remain separated.

Preferred separation:

```txt
UI
↓
semantic component
↓
hooks/services
↓
API/data layer
```

Avoid mixing responsibilities inside components.

---

# Component Responsibility Rules

Each component should have a clear responsibility.

Avoid components that simultaneously manage:

* layout
* async orchestration
* business rules
* form validation
* global state
* rendering logic

Responsibilities should remain isolated.

---

# Component Size Philosophy

Components should remain focused.

Preferred characteristics:

* readable
* composable
* isolated
* maintainable

Avoid giant components.

If a component becomes difficult to mentally parse, split responsibilities.

---

# JSX Philosophy

JSX should remain declarative and readable.

Avoid:

* heavy inline logic
* nested ternaries
* inline business rules
* excessive condition complexity

Prefer extracted logic and semantic rendering.

---

# Conditional Rendering Rules

Prefer readable conditional rendering.

Preferred:

```tsx
if (!data) return <EmptyState />
```

Avoid deeply nested inline conditions.

---

# Hook Philosophy

Hooks should encapsulate behavior and orchestration.

Hooks are preferred for:

* async logic
* business rules
* reusable workflows
* shared interaction patterns

Hooks should improve readability rather than hide complexity.

---

# Custom Hook Standards

Custom hooks should:

* expose predictable APIs
* isolate orchestration
* avoid hidden side effects
* remain reusable

Preferred:

```tsx
const {
  users,
  loading,
  error,
  refetch
} = useUsers()
```

Avoid hooks with unclear responsibilities.

---

# useEffect Philosophy

`useEffect` should be minimized.

Prefer:

* derived state
* declarative patterns
* React Query orchestration
* memoized computation

Avoid using `useEffect` as a generic problem solver.

---

# Forbidden useEffect Patterns

Avoid:

* syncing duplicated state
* inline async fetches
* business orchestration inside effects
* excessive dependency arrays

Effects should remain intentional.

---

# State Philosophy

State should remain:

* minimal
* localized
* predictable
* isolated

Avoid duplicated state.

Avoid storing derived values unnecessarily.

---

# Local vs Global State

Prefer local state by default.

Global state should exist only for:

* shared application context
* cross-feature workflows
* persistent app behavior

Avoid globalizing temporary UI state unnecessarily.

---

# Derived State Philosophy

Prefer derived values over duplicated reactive state.

Preferred:

```tsx
const filteredUsers = users.filter(...)
```

Avoid syncing duplicated representations manually.

---

# Rendering Philosophy

Rendering should remain:

* predictable
* efficient
* isolated

Components should re-render only when necessary.

Avoid excessive reactive coupling.

---

# Reusability Philosophy

Reusable code should optimize:

* readability
* scalability
* predictability

Avoid premature abstraction.

Abstractions should emerge from repeated patterns.

---

# Abstraction Philosophy

Abstractions should reduce cognitive load.

Avoid abstractions that:

* hide behavior excessively
* reduce readability
* overgeneralize prematurely

Abstractions should improve scalability naturally.

---

# Folder Philosophy

Folder structure should communicate architecture clearly.

Preferred organization:

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

Structure should optimize contextual understanding.

---

# Semantic Layer Philosophy

The semantic layer should represent business meaning rather than UI primitives.

Preferred:

```tsx
<UsersTable />
<CreateUserDrawer />
<SettingsTabs />
```

Avoid business orchestration inside primitive components.

---

# Async React Philosophy

Async orchestration should remain isolated from UI rendering whenever possible.

Preferred flow:

```txt
query hook
↓
semantic component
↓
UI primitives
```

Avoid inline fetch orchestration inside UI primitives.

---

# Form React Philosophy

Forms should remain:

* isolated
* reusable
* scalable
* declarative

Prefer React Hook Form patterns.

Avoid uncontrolled business complexity inside JSX.

---

# Accessibility Philosophy

Accessibility is mandatory.

All React components must support:

* keyboard navigation
* focus visibility
* semantic structure
* screen readers

Accessibility should be native to component architecture.

---

# Responsive React Philosophy

Responsive behavior should prioritize:

* mobile-first layouts
* adaptive composition
* scalable spacing
* responsive rendering

Avoid desktop-first assumptions.

---

# Performance Philosophy

React performance should optimize:

* rendering isolation
* memoization when justified
* scalable state updates
* virtualization when necessary

Avoid premature optimization.

---

# React Query Philosophy

TanStack Query should manage:

* server state
* caching
* retries
* background refresh
* mutations

Avoid manual async orchestration when scalable abstractions exist.

---

# Chakra UI Philosophy

Chakra UI should be used as:

* a design system foundation
* a composable primitive system
* an accessibility baseline

Prefer Chakra Composition API patterns.

Avoid fighting Chakra architecture unnecessarily.

---

# TypeScript Philosophy

Strong typing is mandatory.

Avoid:

```ts
any
```

Prefer:

* explicit interfaces
* reusable types
* predictable APIs
* typed composition

Types should improve scalability and safety.

---

# AI-Friendly React Philosophy

React architecture should optimize:

* semantic clarity
* predictable composition
* reusable patterns
* contextual understanding
* scalable abstractions

Generated code should feel cohesive across the platform.

---

# Forbidden React Patterns

Avoid:

* giant components
* prop drilling
* inline fetch orchestration
* duplicated state
* business logic inside JSX
* excessive useEffect usage
* tightly coupled components
* deeply nested rendering logic
* premature abstraction
* uncontrolled side effects

Avoid React code that becomes difficult to reason about.

---

# Preferred React Characteristics

Prefer React code that feels:

* scalable
* readable
* composable
* predictable
* maintainable
* declarative
* enterprise-grade

The architecture should remain understandable as complexity grows.

---

# Final React Goal

The platform should behave as:

* a scalable React ecosystem
* an enterprise-grade frontend platform
* a reusable product architecture
* a composable SaaS foundation
* an AI-friendly engineering system

Every React implementation should reinforce long-term scalability and product consistency.
