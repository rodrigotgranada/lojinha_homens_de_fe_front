# Granada Query Architecture Standards

This document defines the official data fetching philosophy, TanStack Query architecture standards, async orchestration patterns, cache management rules, and enterprise server-state engineering practices for the platform.

Server state is considered a foundational frontend architecture layer.

The goal is not simply fetching data.

The goal is to create:

* scalable async ecosystems
* predictable server-state orchestration
* resilient frontend workflows
* enterprise-grade async UX
* performant cache strategies
* AI-friendly data architecture

The platform should feel responsive and reliable at all times.

---

# Core Query Philosophy

Server-state architecture should prioritize:

* predictability
* continuity
* responsiveness
* scalability
* recoverability
* cache consistency

Data systems should reduce friction rather than create complexity.

---

# TanStack Query Philosophy

The platform uses:

# TanStack Query / React Query

as the official async orchestration layer.

TanStack Query should manage:

* server state
* cache orchestration
* retries
* invalidation
* optimistic updates
* async synchronization

Avoid manual async orchestration whenever possible.

---

# Separation of Concerns Philosophy

The platform separates:

# Services

Responsible for:

* API communication
* request execution
* external integrations

# Queries

Responsible for:

* cache orchestration
* async state
* invalidation
* synchronization

Avoid mixing responsibilities.

---

# Service Layer Philosophy

Services should remain UI-agnostic.

Preferred:

```ts id="query-service-1"
getUsers()
createUser()
updateUser()
deleteUser()
```

Services should never contain UI orchestration.

---

# Query Layer Philosophy

Queries should encapsulate:

* cache logic
* invalidation
* retry behavior
* optimistic behavior
* async continuity

Queries should behave as reusable orchestration layers.

---

# Preferred Query Structure

Preferred structure:

```txt id="query-struct-1"
queries/
├── users.query.ts
├── users.keys.ts
├── users.mutations.ts
└── users.types.ts
```

Organization should remain scalable.

---

# Query Key Philosophy

Query keys are considered architecture.

Keys must remain:

* stable
* predictable
* domain-oriented
* serializable

Preferred:

```ts id="query-key-1"
["users"]
["users", userId]
["users", "filters", filters]
```

Avoid inconsistent query keys.

---

# Query Naming Philosophy

Query naming should remain semantic.

Preferred:

```ts id="query-name-1"
useUsersQuery
useUserQuery
useCreateUserMutation
```

Avoid ambiguous naming.

---

# Cache Philosophy

Cache should optimize:

* continuity
* perceived performance
* reduced refetching
* workflow stability

Avoid aggressive cache destruction.

---

# Stale Data Philosophy

Stale data is often preferable to blank interfaces.

Prefer:

* stale-while-revalidate
* progressive refresh
* continuity preservation

Avoid unnecessary loading resets.

---

# Refetch Philosophy

Refetching should minimize disruption.

Requirements:

* preserved layout
* preserved scroll
* preserved workflow continuity

Avoid flickering during background updates.

---

# Mutation Philosophy

Mutations should support:

* optimistic UX
* recoverability
* predictable invalidation
* contextual feedback

Users should always understand mutation state.

---

# Optimistic Update Philosophy

Optimistic updates are encouraged when safe.

Optimistic behavior should feel:

* immediate
* reversible
* predictable

Avoid destructive optimistic assumptions.

---

# Invalidation Philosophy

Invalidation should remain granular.

Prefer:

```ts id="query-invalid-1"
invalidateQueries({
  queryKey: ["users"]
})
```

Avoid invalidating unrelated cache domains unnecessarily.

---

# Retry Philosophy

Retries should remain intentional.

Requirements:

* contextual retries
* recoverable workflows
* predictable behavior

Avoid infinite retry chaos.

---

# Pagination Philosophy

Pagination should preserve:

* user orientation
* scroll continuity
* workflow stability

Avoid disruptive pagination resets.

---

# Infinite Query Philosophy

Infinite queries should optimize:

* performance
* continuity
* recoverability

Avoid uncontrolled infinite rendering.

---

# Search Query Philosophy

Search interactions should feel immediate.

Requirements:

* debouncing
* request stability
* preserved typing flow

Avoid excessive request storms.

---

# Filtering Philosophy

Filters should remain:

* predictable
* cache-friendly
* URL-friendly when applicable

Avoid unstable filter state behavior.

---

# URL Sync Philosophy

Complex filters and pagination should support URL synchronization when meaningful.

URLs should preserve user context.

---

# Prefetch Philosophy

Prefetching is encouraged for:

* navigation continuity
* perceived performance
* workflow responsiveness

Avoid excessive unnecessary prefetching.

---

# Loading Philosophy

Queries should expose meaningful loading states.

Requirements:

* initial loading
* refetch loading
* mutation loading
* stale indicators

Avoid invisible async behavior.

---

# Error Handling Philosophy

Errors should remain contextual and recoverable.

Requirements:

* retry capability
* preserved context
* actionable feedback

Avoid destructive async failures.

---

# Async Boundary Philosophy

Async boundaries should isolate failures intelligently.

Avoid entire-page failure dependence for isolated widgets.

---

# Dashboard Query Philosophy

Dashboards should support:

* granular async boundaries
* progressive rendering
* isolated widgets

Avoid blocking dashboards globally.

---

# Form Mutation Philosophy

Form mutations should preserve:

* user input
* validation state
* workflow continuity

Avoid destructive submission resets.

---

# Mobile Async Philosophy

Async behavior must remain mobile-friendly.

Requirements:

* touch continuity
* responsive loading
* preserved orientation

Avoid blocking mobile workflows.

---

# Accessibility Philosophy

Async workflows must remain accessible.

Requirements:

* loading announcements
* accessible errors
* screen reader compatibility

Async systems should remain understandable.

---

# Performance Philosophy

Query systems should optimize:

* cache reuse
* rendering isolation
* request deduplication
* stale management

Avoid unnecessary rerender chains.

---

# React Server Components Philosophy

When applicable, combine:

* server rendering
* streaming
* client orchestration

intentionally.

Avoid unnecessary client fetching.

---

# AI-Friendly Query Philosophy

Query architecture should optimize:

* predictable patterns
* reusable orchestration
* semantic query structures
* scalable async behavior

Generated async systems should feel cohesive.

---

# Enterprise Query Philosophy

Enterprise async systems should support:

* scalability
* continuity
* recoverability
* low-friction workflows

Data orchestration should remain resilient under growth.

---

# Forbidden Query Patterns

Avoid:

* fetch inside JSX
* duplicated requests
* unstable query keys
* aggressive invalidation
* loading flicker
* blocking interfaces
* cache destruction
* mixed service/query logic
* mutation chaos
* manual async orchestration everywhere

Avoid async systems that become unpredictable.

---

# Preferred Query Characteristics

Prefer async systems that feel:

* responsive
* resilient
* predictable
* scalable
* progressive
* enterprise-grade

Async orchestration should reinforce workflow continuity.

---

# Final Query Goal

The platform should behave as:

* a scalable async ecosystem
* a resilient frontend data platform
* a production-grade server-state architecture
* a low-friction SaaS async foundation
* an AI-friendly query orchestration system

Every async workflow should reinforce continuity, responsiveness, and long-term maintainability.
