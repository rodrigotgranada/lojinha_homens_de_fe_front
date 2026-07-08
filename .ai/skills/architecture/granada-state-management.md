# Granada State Management Standards

This document defines the official client-state philosophy, Zustand architecture standards, context orchestration rules, UI state management patterns, and scalable frontend state engineering practices for the platform.

State management is considered a foundational architecture layer.

The goal is not simply storing values.

The goal is to create:

* scalable frontend state systems
* predictable orchestration patterns
* low-friction UI behavior
* performant rendering architecture
* resilient workflow coordination
* AI-friendly state organization

State should remain intentional and predictable.

---

# Core State Philosophy

State architecture should prioritize:

* simplicity
* predictability
* scalability
* isolation
* performance
* maintainability

State should exist only when necessary.

---

# Server State vs Client State Philosophy

The platform distinguishes:

# Server State

Managed by:

* TanStack Query / React Query

Examples:

* API data
* remote resources
* cached responses
* async synchronization

# Client State

Managed by:

* Zustand
* local state
* Context (when appropriate)

Examples:

* UI state
* workflow orchestration
* temporary interaction state

Avoid mixing concerns.

---

# State Minimalism Philosophy

Prefer the minimum viable state.

Avoid storing derived values unnecessarily.

Prefer computed derivation over duplicated state.

---

# Local State Philosophy

Prefer local component state whenever possible.

Use:

```tsx id="state-local-1"
useState
```

for:

* isolated interactions
* ephemeral UI behavior
* temporary local state

Avoid globalizing trivial state.

---

# Zustand Philosophy

The platform uses:

# Zustand

for scalable client-state orchestration.

Zustand should manage:

* shared UI state
* workflow orchestration
* persistent frontend behavior
* cross-component coordination

Avoid turning Zustand into a backend cache.

---

# Forbidden Zustand Usage

Never store:

* server cache
* query responses
* duplicated async state

inside Zustand unnecessarily.

TanStack Query already solves server state.

---

# Store Scope Philosophy

Stores should remain scoped and domain-oriented.

Preferred:

```txt id="state-store-1"
stores/
├── auth.store.ts
├── sidebar.store.ts
├── filters.store.ts
```

Avoid giant global stores.

---

# Feature Store Philosophy

Feature-specific stores are encouraged.

Preferred:

```txt id="state-feature-1"
features/users/store
features/settings/store
```

Avoid unrelated state coupling.

---

# Store Responsibility Philosophy

Each store should have:

* clear ownership
* isolated responsibility
* predictable boundaries

Avoid “god stores”.

---

# UI State Philosophy

UI state examples:

* modal visibility
* drawer state
* filters
* sorting
* selection state
* theme state
* command palette state

UI orchestration should remain lightweight.

---

# Workflow State Philosophy

Complex workflows may require orchestration state.

Examples:

* multi-step forms
* onboarding flows
* wizard state
* contextual navigation

Workflow state should remain predictable.

---

# Persistent State Philosophy

Persistent state should remain intentional.

Examples:

* theme preference
* sidebar collapse
* onboarding progress

Avoid persisting unstable transient state.

---

# Ephemeral State Philosophy

Ephemeral state should remain local whenever possible.

Examples:

* hover state
* temporary dropdown state
* input focus state

Avoid unnecessary global orchestration.

---

# Derived State Philosophy

Prefer derived values instead of duplicated state.

Avoid:

```ts id="state-derived-1"
filteredUsers
```

inside stores when it can be computed dynamically.

---

# Context Philosophy

React Context should remain intentional.

Use Context for:

* dependency injection
* form orchestration
* theme systems
* scoped workflows

Avoid Context for large reactive state systems.

---

# Provider Philosophy

Avoid provider hell.

Prefer lightweight provider trees.

Providers should remain intentional and scoped.

---

# Rendering Philosophy

State architecture should minimize rerenders.

Requirements:

* isolated subscriptions
* selector usage
* rendering boundaries

Avoid global rerender chains.

---

# Selector Philosophy

Selectors are strongly encouraged.

Preferred:

```ts id="state-selector-1"
useSidebarStore(state => state.isOpen)
```

Avoid broad store subscriptions.

---

# Async State Philosophy

Async state should primarily belong to React Query.

Avoid duplicating async loading/error states globally.

---

# Form State Philosophy

Forms should use:

* React Hook Form
* localized orchestration

Avoid storing form state globally unnecessarily.

---

# Modal State Philosophy

Modal orchestration should remain lightweight.

Avoid global modal chaos.

Use semantic orchestration when complexity grows.

---

# Table State Philosophy

Table systems may store:

* sorting
* filtering
* pagination
* column visibility

Prefer contextual ownership boundaries.

---

# Navigation State Philosophy

Navigation state should remain predictable.

Examples:

* sidebar collapse
* active workspace
* layout preferences

Avoid unstable navigation orchestration.

---

# Mobile State Philosophy

Mobile workflows may require:

* drawer orchestration
* touch state
* responsive layout state

Keep mobile state lightweight.

---

# Accessibility Philosophy

State transitions must remain accessible.

Requirements:

* focus preservation
* semantic feedback
* predictable transitions

Avoid inaccessible state changes.

---

# Persistence Philosophy

Persistent storage should remain minimal.

Avoid over-persisting application state.

Persist only meaningful user preferences.

---

# Performance Philosophy

State systems should optimize:

* rendering isolation
* subscription granularity
* predictable updates

Avoid centralized reactive bottlenecks.

---

# Enterprise State Philosophy

Enterprise state systems should support:

* scalability
* predictability
* workflow continuity
* maintainability

State orchestration should remain understandable under growth.

---

# AI-Friendly State Philosophy

State architecture should optimize:

* semantic organization
* predictable ownership
* reusable orchestration
* scalable workflows

Generated state systems should remain cohesive.

---

# Forbidden State Patterns

Avoid:

* giant global stores
* duplicated server state
* provider hell
* unnecessary context usage
* over-globalization
* unstable state ownership
* derived-state duplication
* excessive rerendering
* tightly coupled orchestration

Avoid state systems that become difficult to reason about.

---

# Preferred State Characteristics

Prefer state systems that feel:

* lightweight
* isolated
* scalable
* predictable
* performant
* enterprise-grade

State architecture should reinforce maintainability and continuity.

---

# Final State Management Goal

The platform should behave as:

* a scalable frontend orchestration system
* a predictable client-state ecosystem
* a resilient workflow platform
* a production-grade SaaS state architecture
* an AI-friendly frontend state foundation

Every state transition should reinforce clarity, responsiveness, and long-term maintainability.
