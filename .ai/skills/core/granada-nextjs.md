# Granada Next.js Engineering Standards

This document defines the official Next.js architecture philosophy, App Router standards, rendering strategy, server/client boundaries, and scalable frontend platform patterns for the project.

This platform uses:

* Next.js 15
* App Router
* React Server Components
* Streaming-first architecture
* Modern React rendering patterns

The goal is to create:

* scalable SaaS architecture
* production-grade rendering systems
* optimized frontend performance
* reusable route structures
* enterprise-grade frontend workflows

Next.js should behave as an application platform rather than a routing library.

---

# Core Next.js Philosophy

The architecture should prioritize:

* server-first rendering
* scalable route organization
* progressive rendering
* streaming UX
* layout persistence
* rendering efficiency
* async responsiveness

The platform should feel fast, resilient, and production-ready.

---

# App Router Philosophy

The platform uses App Router architecture exclusively.

All implementations must follow App Router mental models.

Avoid Pages Router patterns.

Preferred architecture:

```txt
app/
├── (dashboard)/
├── (auth)/
├── api/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

Route structure should communicate application organization clearly.

---

# Server-First Philosophy

Server Components are preferred by default.

Use Server Components whenever possible.

Client Components should exist only when necessary.

Preferred:

```tsx
Server Components
↓
Client islands
↓
Interactive boundaries
```

Avoid unnecessary client-side rendering.

---

# Client Component Rules

Use `"use client"` only when required.

Valid reasons:

* browser APIs
* local interactive state
* event handlers
* animations
* client-side hooks

Avoid marking large trees as client components unnecessarily.

---

# Forbidden Client Patterns

Avoid:

* global `"use client"`
* unnecessary client layouts
* excessive client rendering
* client-only data orchestration

Client boundaries should remain minimal and intentional.

---

# Server Component Philosophy

Prefer Server Components for:

* layout composition
* async rendering
* data fetching
* static content
* low-interactivity sections

Server rendering should reduce client complexity.

---

# Data Fetching Philosophy

Data fetching should prioritize:

* server rendering
* cache efficiency
* progressive rendering
* async scalability

Preferred flow:

```txt
server fetch
↓
server composition
↓
client interaction
```

Avoid unnecessary client fetching.

---

# Fetching Rules

Prefer server-side fetching when:

* SEO matters
* initial rendering matters
* caching benefits exist
* data is static or semi-static

Prefer React Query when:

* mutations exist
* realtime updates exist
* client interaction requires cache orchestration

---

# Layout Philosophy

Layouts should preserve:

* navigation continuity
* shared UI persistence
* rendering efficiency

Use nested layouts intentionally.

Avoid duplicated layout composition.

---

# Loading UI Philosophy

Every async route should support loading UI.

Use:

```txt
loading.tsx
```

Loading should preserve:

* layout continuity
* visual stability
* perceived responsiveness

Avoid blank route transitions.

---

# Error Boundary Philosophy

Every important route should support:

```txt
error.tsx
```

Errors should remain isolated and recoverable.

Avoid catastrophic full-app failures.

---

# Not Found Philosophy

Routes should support:

```txt
not-found.tsx
```

404 experiences should remain cohesive with product UX.

---

# Streaming Philosophy

Streaming is encouraged.

Prefer progressive rendering for:

* dashboards
* analytics
* tables
* async-heavy workflows

Streaming should improve perceived performance.

---

# Suspense Philosophy

Suspense boundaries should remain intentional.

Requirements:

* isolated loading regions
* preserved surrounding context
* progressive rendering

Avoid wrapping entire pages unnecessarily.

---

# Route Group Philosophy

Use route groups for:

* organization
* layout isolation
* feature separation

Preferred:

```txt
(dashboard)
(auth)
(marketing)
```

Route groups should improve architectural clarity.

---

# Parallel Routes Philosophy

Use parallel routes only when:

* workflow complexity justifies it
* independent rendering regions exist

Avoid overengineering routing.

---

# Intercepting Routes Philosophy

Intercepting routes may be used for:

* modals
* overlays
* contextual navigation

Use intentionally.

Avoid unnecessary navigation complexity.

---

# Folder Organization Philosophy

Feature organization should remain scalable.

Preferred:

```txt
feature/
├── components/
├── hooks/
├── services/
├── queries/
├── schemas/
├── types/
└── page.tsx
```

Structure should optimize contextual understanding.

---

# API Architecture Philosophy

API routes should remain:

* isolated
* typed
* predictable

Avoid business logic duplication between frontend and API layers.

---

# Server Actions Philosophy

Server Actions should be used intentionally.

Valid use cases:

* lightweight mutations
* form workflows
* server-side orchestration

Avoid overcoupling frontend logic to Server Actions unnecessarily.

---

# Caching Philosophy

Caching should remain predictable.

Prioritize:

* cache reuse
* background refresh
* stale-while-revalidate behavior

Avoid unnecessary cache invalidation.

---

# Revalidation Philosophy

Revalidation should prioritize:

* freshness
* stability
* UX continuity

Avoid aggressive invalidation behavior.

---

# Metadata Philosophy

Use Next.js metadata APIs consistently.

Metadata should support:

* SEO
* social sharing
* semantic structure

Avoid inconsistent metadata handling.

---

# Navigation Philosophy

Navigation should feel:

* immediate
* responsive
* stable
* predictable

Avoid layout flickering during transitions.

---

# Image Optimization Philosophy

Use Next.js image optimization whenever appropriate.

Requirements:

* responsive images
* optimized delivery
* lazy loading
* sizing predictability

Avoid oversized asset delivery.

---

# Font Optimization Philosophy

Fonts should prioritize:

* readability
* performance
* visual stability

Avoid unnecessary font loading complexity.

---

# Middleware Philosophy

Middleware should remain lightweight.

Valid use cases:

* authentication
* redirects
* localization
* edge logic

Avoid heavy business orchestration in middleware.

---

# Authentication Architecture Philosophy

Authentication should remain:

* isolated
* scalable
* server-aware

Avoid tightly coupling authentication logic across unrelated layers.

---

# Environment Architecture Rules

Environment variables should remain:

* typed
* isolated
* predictable

Avoid hardcoded configuration values.

---

# Performance Philosophy

Next.js performance should prioritize:

* server rendering
* minimal client JS
* route splitting
* streaming
* rendering isolation

Avoid unnecessary client-side complexity.

---

# Mobile Philosophy

Mobile rendering must remain performant.

Requirements:

* lightweight hydration
* responsive layouts
* efficient rendering boundaries

Avoid desktop-heavy rendering assumptions.

---

# Accessibility Philosophy

Accessibility must remain preserved across:

* routing
* async rendering
* streaming
* navigation transitions

Navigation continuity is part of accessibility.

---

# AI-Friendly Next.js Philosophy

Architecture should optimize:

* predictable folder structures
* semantic route organization
* reusable rendering patterns
* scalable async architecture

Generated code should feel cohesive across the platform.

---

# Forbidden Next.js Patterns

Avoid:

* unnecessary `"use client"`
* client-side fetching everywhere
* giant route files
* duplicated layouts
* blocking rendering
* excessive hydration
* monolithic route structure
* tightly coupled pages
* inline async orchestration

Avoid architectures that reduce scalability.

---

# Preferred Next.js Characteristics

Prefer architectures that feel:

* server-first
* scalable
* progressive
* resilient
* responsive
* lightweight
* maintainable

The platform should feel optimized by design.

---

# Final Next.js Goal

The platform should behave as:

* a scalable Next.js application platform
* a production-grade SaaS architecture
* a server-first frontend ecosystem
* a progressive rendering system
* an enterprise-grade App Router foundation

Every route and rendering boundary should reinforce scalability, responsiveness, and long-term maintainability.
