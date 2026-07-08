# Granada Folder Architecture Standards

This document defines the official folder organization philosophy, feature architecture standards, module boundaries, and scalable frontend structure patterns for the platform.

Folder organization is considered a core architecture layer.

The goal is not simply organizing files.

The goal is to create:

* scalable frontend ecosystems
* predictable project structures
* reusable architecture patterns
* maintainable feature boundaries
* AI-friendly contextual organization

The architecture should remain understandable as the platform grows.

---

# Core Folder Architecture Philosophy

Folder organization should prioritize:

* scalability
* discoverability
* predictability
* contextual understanding
* separation of concerns
* maintainability

Structure should communicate architecture clearly.

---

# Primary Architecture Style

The platform uses:

# Feature-Based Architecture

Features are considered the primary scalability unit.

Avoid page-centric organization.

Avoid type-centric architecture.

Avoid technology-centric chaos.

---

# Feature Philosophy

Features should encapsulate:

* UI
* business logic
* queries
* services
* schemas
* types
* workflows

Each feature should behave as an isolated domain boundary.

---

# Preferred Feature Structure

Preferred structure:

```txt id="fa-struct-1"
feature/
├── components/
├── hooks/
├── services/
├── queries/
├── schemas/
├── types/
├── utils/
├── constants/
├── store/
└── index.ts
```

Not every folder is mandatory.

Structure should remain intentional.

---

# Feature Isolation Philosophy

Features should minimize cross-feature coupling.

Prefer:

```txt id="fa-iso-1"
features/users
features/roles
features/settings
```

Avoid tightly coupled feature dependencies.

---

# Shared Folder Philosophy

Shared modules should contain:

* reusable primitives
* generic utilities
* global infrastructure
* platform-wide abstractions

Avoid placing feature-specific logic inside shared folders.

---

# Preferred Shared Structure

Preferred:

```txt id="fa-shared-1"
shared/
├── components/
├── hooks/
├── utils/
├── types/
├── constants/
├── services/
└── lib/
```

Shared should remain truly reusable.

---

# UI Architecture Philosophy

UI architecture should separate:

* primitives
* variants
* semantic components

Preferred organization:

```txt id="fa-ui-1"
components/
├── ui/
├── semantic/
├── layout/
└── feedback/
```

---

# Primitive Component Philosophy

Primitive components should remain generic.

Examples:

```txt id="fa-ui-2"
Button
Input
Drawer
Tabs
Card
```

Avoid business-specific logic inside primitives.

---

# Semantic Component Philosophy

Semantic components represent business meaning.

Examples:

```txt id="fa-ui-3"
UsersTable
PermissionsDrawer
SettingsForm
AnalyticsOverview
```

Semantic components should compose primitives.

---

# Component Internal Structure

Complex components should follow:

```txt id="fa-comp-1"
component/
├── base/
├── variants/
├── semantic/
├── hooks/
├── styles/
├── types/
└── index.ts
```

This improves:

* scalability
* discoverability
* contextual understanding

---

# Hooks Organization Philosophy

Hooks should remain close to ownership boundaries.

Use:

```txt id="fa-hooks-1"
feature/hooks
```

for feature hooks.

Use:

```txt id="fa-hooks-2"
shared/hooks
```

for reusable platform hooks.

Avoid giant global hooks folders.

---

# Query Organization Philosophy

Queries should remain domain-oriented.

Preferred:

```txt id="fa-query-1"
features/users/queries
```

Avoid centralized query chaos.

---

# Service Layer Philosophy

Services should encapsulate:

* API communication
* external integrations
* orchestration helpers

Services should remain isolated from UI rendering.

---

# Validation Organization Philosophy

Schemas should remain close to ownership boundaries.

Preferred:

```txt id="fa-schema-1"
feature/schemas
```

Avoid scattered validation logic.

---

# Type Organization Philosophy

Types should remain contextual.

Preferred:

```txt id="fa-type-1"
feature/types
```

Avoid giant global type folders unless truly shared.

---

# Constants Philosophy

Constants should remain domain-oriented.

Avoid giant:

```txt id="fa-const-1"
constants.ts
```

files.

Prefer contextual constants.

---

# Utility Organization Philosophy

Utilities should remain:

* focused
* domain-oriented
* predictable

Avoid giant generic utility folders.

Avoid “utils hell”.

---

# App Router Architecture Philosophy

Next.js App Router structure should remain scalable.

Preferred:

```txt id="fa-next-1"
app/
├── (dashboard)/
├── (auth)/
├── api/
├── layout.tsx
└── page.tsx
```

Route structure should reflect application boundaries.

---

# Layout Architecture Philosophy

Layouts should remain isolated and reusable.

Preferred:

```txt id="fa-layout-1"
layouts/
├── DashboardLayout
├── AuthLayout
└── MarketingLayout
```

Avoid duplicated layout composition.

---

# Form Architecture Philosophy

Forms should remain isolated.

Preferred:

```txt id="fa-form-1"
forms/
├── LoginForm
├── UserForm
└── RoleForm
```

Complex forms may include:

```txt id="fa-form-2"
form/
├── fields/
├── schemas/
├── hooks/
├── types/
└── steps/
```

---

# Table Architecture Philosophy

Complex table systems should support:

```txt id="fa-table-1"
table/
├── base/
├── variants/
├── hooks/
├── cells/
├── columns/
├── toolbar/
└── pagination/
```

Avoid monolithic table files.

---

# Modal Architecture Philosophy

Complex modal systems should support:

```txt id="fa-modal-1"
modal/
├── base/
├── variants/
├── semantic/
├── hooks/
└── types/
```

---

# Async UX Organization Philosophy

Async UX patterns should remain centralized when reusable.

Preferred:

```txt id="fa-async-1"
feedback/
├── loading/
├── skeletons/
├── empty-states/
├── error-states/
└── retry/
```

---

# Accessibility Architecture Philosophy

Accessibility should exist as architecture rather than afterthought.

Preferred:

```txt id="fa-a11y-1"
accessibility/
├── hooks/
├── utils/
├── focus/
└── keyboard/
```

when abstraction becomes meaningful.

---

# Responsive Architecture Philosophy

Responsive behavior should remain composable.

Avoid duplicated responsive logic across unrelated modules.

---

# Animation Architecture Philosophy

Motion systems should remain reusable.

Preferred:

```txt id="fa-motion-1"
motion/
├── transitions/
├── presets/
├── variants/
└── hooks/
```

---

# Enterprise Scalability Philosophy

Architecture should support:

* feature expansion
* team scaling
* onboarding clarity
* long-term maintenance
* AI contextual understanding

Structure should remain predictable under growth.

---

# Monorepo Philosophy

The architecture should remain monorepo-friendly.

Avoid tightly coupling features unnecessarily.

Folder organization should support future package extraction if needed.

---

# AI-Friendly Folder Philosophy

Folder structure should optimize:

* contextual understanding
* semantic discoverability
* predictable generation
* scalable organization

The AI should infer architecture naturally from structure.

---

# Forbidden Folder Patterns

Avoid:

* giant shared folders
* giant utils folders
* technology-chaos organization
* duplicated feature logic
* mixed responsibilities
* scattered business rules
* flat architecture
* oversized component folders
* deeply confusing nesting

Avoid structures that increase mental friction.

---

# Preferred Folder Characteristics

Prefer structures that feel:

* scalable
* intentional
* semantic
* organized
* discoverable
* enterprise-grade

Architecture should feel cohesive and maintainable.

---

# Final Folder Architecture Goal

The platform should behave as:

* a scalable frontend ecosystem
* a predictable architecture platform
* a reusable enterprise foundation
* an AI-friendly engineering structure

Every folder should reinforce scalability, readability, and long-term maintainability.
