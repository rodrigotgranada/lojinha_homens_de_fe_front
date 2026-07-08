# Performance Standards

This document defines the official frontend performance philosophy, rendering standards, scalability rules, optimization strategies, and responsiveness expectations for the platform.

Performance is considered a core product quality attribute.

The goal is not premature optimization.

The goal is to create:

* scalable frontend architecture
* predictable rendering behavior
* responsive user experiences
* efficient async workflows
* enterprise-grade performance
* maintainable optimization patterns

Performance should emerge naturally from good architecture.

---

# Core Performance Philosophy

Performance should prioritize:

* responsiveness
* rendering stability
* scalability
* predictable behavior
* perceived speed
* efficient updates

The platform should feel fast even during complex workflows.

---

# Performance Priorities

The platform must prioritize:

1. rendering efficiency
2. layout stability
3. async responsiveness
4. scalable state management
5. efficient updates
6. predictable rendering
7. progressive loading
8. mobile performance

---

# Rendering Philosophy

Rendering should remain:

* predictable
* isolated
* scalable
* minimal

Avoid unnecessary re-rendering.

The UI should update only when required.

---

# Component Rendering Rules

Components should:

* remain focused
* avoid giant render trees
* isolate responsibilities
* minimize reactive dependencies

Avoid components that manage excessive unrelated state.

---

# Re-Render Prevention Rules

Prefer architectures that naturally reduce re-rendering.

Requirements:

* state isolation
* memoization when justified
* stable references
* scoped subscriptions

Avoid excessive reactive coupling.

---

# Memoization Philosophy

Memoization should solve real rendering problems.

Use memoization when:

* render cost is significant
* prop stability matters
* rendering frequency is high

Avoid premature memoization everywhere.

---

# useMemo Rules

Use `useMemo` only when:

* computations are expensive
* reference stability matters
* rendering optimization is justified

Avoid using `useMemo` for trivial values.

---

# useCallback Rules

Use `useCallback` only when:

* callback stability affects children
* dependency optimization matters

Avoid excessive callback memoization.

---

# React.memo Rules

Use `React.memo` when:

* component rendering is expensive
* props remain stable frequently
* list rendering benefits

Avoid wrapping everything blindly.

---

# State Management Philosophy

State should remain:

* minimal
* isolated
* predictable
* scoped appropriately

Avoid global state for local concerns.

---

# Zustand Performance Rules

Prefer isolated Zustand slices.

Requirements:

* scoped selectors
* minimal subscriptions
* isolated updates

Avoid giant monolithic stores.

---

# TanStack Query Performance Rules

Prefer TanStack Query for server state.

Requirements:

* cache reuse
* stale management
* background refresh
* deduplication

Avoid duplicated server state management.

---

# Async Rendering Philosophy

Async rendering should prioritize:

* layout stability
* progressive rendering
* perceived responsiveness

Avoid blocking entire interfaces unnecessarily.

---

# Suspense Performance Rules

Suspense boundaries should remain intentional.

Requirements:

* isolated loading regions
* progressive rendering
* predictable fallback structure

Avoid wrapping large unrelated sections unnecessarily.

---

# Lazy Loading Rules

Lazy loading should optimize:

* bundle size
* route performance
* progressive loading

Preferred candidates:

* heavy modals
* complex charts
* admin sections
* rarely used workflows

Avoid excessive fragmentation.

---

# Bundle Size Philosophy

Bundle size should remain controlled.

Requirements:

* avoid unnecessary dependencies
* prefer tree-shakeable libraries
* isolate heavy modules

Avoid oversized client bundles.

---

# Next.js Performance Rules

Prefer Next.js native optimization mechanisms.

Requirements:

* server components when appropriate
* route-level splitting
* optimized image usage
* streaming support

Avoid unnecessary client components.

---

# Client Component Rules

Client components should remain intentional.

Use client components only when:

* interactivity exists
* browser APIs are required
* client-side state is necessary

Avoid unnecessary `"use client"` usage.

---

# Server Component Philosophy

Prefer server components for:

* static rendering
* data composition
* low-interactivity layouts

Server rendering should reduce client complexity.

---

# Data Fetching Rules

Data fetching should remain centralized.

Preferred flow:

```txt id="perf-fetch-1"
service
↓
query hook
↓
semantic component
```

Avoid inline fetch orchestration inside UI components.

---

# Virtualization Rules

Large datasets must support virtualization when appropriate.

Candidates:

* tables
* command palettes
* large lists
* activity feeds

Avoid rendering extremely large lists directly.

---

# Table Performance Rules

Tables should optimize:

* rendering isolation
* virtualization when necessary
* row memoization
* pagination efficiency

Avoid expensive row recalculations.

---

# Form Performance Rules

Forms should minimize unnecessary updates.

Requirements:

* field isolation
* scoped validation
* efficient controlled state

Avoid giant reactive form trees.

---

# Validation Performance Rules

Validation should remain lightweight.

Requirements:

* debounced async validation
* isolated validation updates
* efficient schema usage

Avoid validating entire forms unnecessarily.

---

# Animation Performance Rules

Animations should remain lightweight.

Requirements:

* GPU-friendly transforms
* minimal layout recalculation
* smooth transitions

Avoid expensive layout-triggering animations.

---

# Scroll Performance Rules

Scrolling should remain smooth.

Requirements:

* optimized scroll regions
* virtualization when needed
* reduced layout thrashing

Avoid scroll-heavy rendering bottlenecks.

---

# Responsive Performance Rules

Responsive systems should remain efficient.

Avoid:

* excessive resize calculations
* expensive responsive rendering logic
* duplicated responsive state

Prefer CSS-driven responsiveness whenever possible.

---

# Image Performance Rules

Images should prioritize:

* optimization
* responsive loading
* lazy loading
* proper sizing

Avoid oversized image delivery.

---

# Accessibility Performance Rules

Accessibility must not degrade performance architecture.

Accessibility and performance should coexist naturally.

Avoid inaccessible performance shortcuts.

---

# Mobile Performance Rules

Mobile performance is mandatory.

Requirements:

* lightweight rendering
* responsive async UX
* touch-safe responsiveness
* optimized animations

Avoid desktop-heavy rendering patterns on mobile.

---

# Async Performance Rules

Async architecture should optimize:

* cache efficiency
* request deduplication
* isolated rendering
* minimal loading disruption

Avoid duplicated async orchestration.

---

# Layout Stability Rules

Layout stability is mandatory.

Requirements:

* stable skeletons
* preserved dimensions
* predictable rendering

Avoid layout shifts during async updates.

---

# Dependency Philosophy

Dependencies should remain intentional.

Before adding dependencies:

* evaluate bundle impact
* evaluate maintenance cost
* evaluate overlap with existing tooling

Avoid dependency bloat.

---

# Code Splitting Philosophy

Code splitting should optimize:

* initial load
* route performance
* progressive rendering

Avoid excessive fragmentation that harms UX.

---

# Performance Monitoring Philosophy

Performance should be measurable.

Important signals:

* render frequency
* layout stability
* interaction responsiveness
* loading behavior
* bundle size

Optimization should remain evidence-driven.

---

# AI-Friendly Performance Philosophy

Performance architecture should optimize:

* predictable rendering
* scalable abstractions
* isolated responsibilities
* reusable optimization patterns

Performance behavior should remain understandable and maintainable.

---

# Forbidden Performance Patterns

Avoid:

* giant components
* unnecessary global state
* duplicated server state
* inline fetch orchestration
* excessive re-rendering
* oversized client bundles
* layout thrashing
* rendering large lists directly
* unnecessary client components
* aggressive memoization everywhere

---

# Preferred Performance Characteristics

Prefer architectures that feel:

* responsive
* scalable
* lightweight
* stable
* predictable
* efficient
* maintainable

Performance should feel naturally integrated into the platform.

---

# Final Performance Goal

The platform should behave as:

* a high-performance frontend system
* a scalable enterprise architecture
* a responsive SaaS platform
* a production-grade rendering ecosystem

Every interaction should feel fast, stable, and intentional.
