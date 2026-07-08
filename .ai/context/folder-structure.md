# Folder Structure Standards

This document defines the official folder structure, organizational responsibilities, scalability rules, and module boundaries for the platform.

The goal is not only to organize files.

The goal is to create:

* predictable architecture
* scalable organization
* low cognitive load
* reusable structures
* maintainable growth
* AI-friendly navigation

The project should feel understandable and extensible at all times.

---

# Core Folder Philosophy

Folders exist to organize responsibilities, not file types.

The structure should prioritize:

* domain clarity
* scalability
* separation of concerns
* discoverability
* maintainability
* reusable architecture

Avoid creating folders without explicit responsibility.

---

# Primary Project Structure

Preferred high-level structure:

```txt
src/
├── app/
├── features/
├── shared/
├── services/
├── stores/
├── providers/
├── hooks/
├── lib/
├── types/
├── constants/
├── styles/
└── config/
```

---

# app/

The `app/` directory contains Next.js App Router structure.

Responsibilities:

* routes
* layouts
* route groups
* server boundaries
* page composition
* loading boundaries
* error boundaries

Avoid placing:

* business logic
* reusable UI
* domain orchestration

inside `app/`.

---

# features/

The `features/` directory contains domain-oriented modules.

Examples:

```txt
features/
├── auth/
├── users/
├── billing/
├── permissions/
├── dashboard/
```

Each feature should encapsulate:

* UI
* forms
* hooks
* services
* validation
* state orchestration
* domain logic

Features should remain isolated whenever possible.

---

# Feature Internal Structure

Preferred feature structure:

```txt
feature/
├── components/
├── forms/
├── hooks/
├── services/
├── validation/
├── types/
├── stores/
├── constants/
├── utils/
└── pages/
```

Not every feature requires every folder.

Create folders only when necessary.

---

# Feature Responsibility Rules

Features should contain:

* domain-specific logic
* business workflows
* domain-oriented orchestration

Features should NOT contain:

* global platform abstractions
* unrelated reusable utilities
* cross-domain orchestration

---

# shared/

The `shared/` directory contains reusable platform-level abstractions.

Examples:

```txt
shared/
├── ui/
├── hooks/
├── utils/
├── types/
├── constants/
├── providers/
```

The shared layer exists to support the entire platform.

---

# Shared Layer Rules

Only place code inside shared when:

* reused across domains
* platform-oriented
* domain-agnostic
* stable abstraction

Avoid prematurely moving feature logic into shared.

---

# shared/ui/

Contains reusable UI primitives and platform abstractions.

Examples:

```txt
shared/ui/
├── button/
├── input/
├── modal/
├── drawer/
├── table/
├── tabs/
```

This layer powers the design system foundation.

---

# Shared UI Component Structure

Preferred structure:

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

# base/

Contains primitive reusable components.

Examples:

* Button
* Input
* Modal
* Drawer
* Table

Base components should remain:

* reusable
* scalable
* accessible
* domain-agnostic

---

# variants/

Contains reusable visual or behavioral variations.

Examples:

* PrimaryButton
* AsyncSelect
* CompactTable

Variants specialize primitives without domain coupling.

---

# semantic/

Contains business-oriented abstractions.

Examples:

* UsersTable
* BillingSettingsDrawer
* PermissionsForm

Semantic components compose reusable primitives into domain experiences.

---

# hooks/

Contains reusable hooks.

Examples:

```txt
hooks/
├── useDebounce.ts
├── useBreakpoint.ts
├── useDisclosure.ts
```

Hooks should remain responsibility-oriented.

Avoid giant hooks.

---

# services/

Contains API and backend integration logic.

Responsibilities:

* HTTP clients
* API abstraction
* backend orchestration
* request utilities

Preferred structure:

```txt
services/
├── api/
├── auth/
├── users/
├── billing/
```

Avoid placing UI logic inside services.

---

# stores/

Contains Zustand stores or shared client state.

Examples:

```txt
stores/
├── auth-store.ts
├── sidebar-store.ts
├── command-palette-store.ts
```

Stores should remain:

* minimal
* isolated
* predictable

Avoid turning stores into business orchestration layers.

---

# providers/

Contains React providers and application wrappers.

Examples:

```txt
providers/
├── QueryProvider.tsx
├── ThemeProvider.tsx
├── AuthProvider.tsx
```

Providers should remain focused.

Avoid giant provider trees.

---

# lib/

Contains low-level infrastructure utilities.

Examples:

```txt
lib/
├── query-client/
├── axios/
├── env/
├── analytics/
```

The `lib/` layer should contain infrastructure-oriented abstractions.

---

# types/

Contains shared contracts and reusable typing.

Examples:

```txt
types/
├── api/
├── auth/
├── billing/
```

Avoid placing business logic inside types.

---

# constants/

Contains reusable constants.

Examples:

```txt
constants/
├── routes.ts
├── permissions.ts
├── breakpoints.ts
```

Avoid magic values spread throughout the codebase.

---

# styles/

Contains global styling foundations.

Examples:

```txt
styles/
├── theme/
├── tokens/
├── recipes/
├── globals/
```

The styling layer should support the design system architecture.

---

# config/

Contains application configuration.

Examples:

```txt
config/
├── env.ts
├── feature-flags.ts
├── app-config.ts
```

Configuration should remain centralized and explicit.

---

# Folder Creation Rules

Create folders only when:

* responsibility is clear
* scalability improves
* readability improves
* organization improves

Avoid excessive nesting.

---

# Nesting Philosophy

Avoid deeply nested structures.

Preferred:

```txt
users/
├── components/
├── hooks/
├── services/
```

Avoid:

```txt
users/
└── ui/
    └── internal/
        └── components/
            └── tables/
```

unless strongly justified.

---

# Colocation Philosophy

Prefer colocating tightly related logic.

Examples:

* feature-specific hooks
* feature-specific validation
* feature-specific forms

Avoid scattering related logic across unrelated folders.

---

# Shared vs Feature Decision Rules

## Move to shared when:

* reused multiple times
* stable abstraction exists
* platform-wide value exists

## Keep inside feature when:

* domain-specific
* workflow-specific
* unstable abstraction
* tightly coupled to feature logic

Avoid premature extraction.

---

# Async Organization Rules

Async responsibilities should remain isolated.

Preferred flow:

```txt
service
↓
query hook
↓
semantic component
↓
UI primitive
```

Avoid inline fetch orchestration inside components.

---

# Form Organization Rules

Forms should remain modular.

Preferred structure:

```txt
forms/
├── fields/
├── validation/
├── hooks/
├── schemas/
├── semantic/
```

Avoid giant form components.

---

# Validation Organization Rules

Validation must remain isolated.

Preferred:

```txt
validation/
schemas/
```

Avoid inline validation logic.

---

# Design System Organization

The design system should behave as a reusable platform.

Preferred structure:

```txt
shared/ui/
├── button/
├── input/
├── modal/
├── drawer/
├── table/
├── tabs/
├── select/
├── form/
```

Each component should expose scalable architecture.

---

# AI-Friendly Organization Philosophy

The folder structure must optimize:

* discoverability
* contextual understanding
* semantic consistency
* predictable navigation
* scalable generation

A developer or AI should quickly understand where responsibilities belong.

---

# Forbidden Folder Patterns

Avoid:

* misc/
* random/
* temp/
* stuff/
* utils-with-everything/
* giant shared folders
* deeply ambiguous structures

Avoid dumping unrelated logic into generic folders.

---

# Preferred Folder Philosophy

Prefer structures that feel:

* scalable
* semantic
* predictable
* cohesive
* maintainable
* reusable

The architecture should feel intentional.

---

# Final Organizational Goal

The folder structure should support:

* enterprise scalability
* reusable architecture
* low cognitive load
* maintainable growth
* AI-assisted engineering
* long-term sustainability

The project should remain understandable as it grows.
