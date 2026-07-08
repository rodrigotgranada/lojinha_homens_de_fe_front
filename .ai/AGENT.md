# Enterprise SaaS Frontend Platform

## Mission

This project is an enterprise-grade frontend platform designed to serve as the foundation for scalable SaaS applications and premium frontend products.

The goal is NOT simply to create screens or components.

The goal is to build:

* a reusable frontend platform
* an enterprise-grade design system
* a scalable UI architecture
* AI-friendly engineering workflows
* product-grade UX patterns
* long-term maintainability
* reusable business foundations

This project must feel production-ready at all times.

---

# Core Principles

The project must prioritize:

* scalability
* reusability
* consistency
* accessibility
* maintainability
* developer experience
* enterprise UX
* AI-assisted engineering
* mobile-first architecture
* composition over duplication
* semantic abstractions
* predictable patterns

---

# Primary Stack

## Core

* React 19
* Next.js 15 App Router
* TypeScript strict mode

## UI

* Chakra UI v3 Composition API
* Compound Components Pattern
* Semantic Component Architecture

## Forms

* React Hook Form
* Yup validation

## State Management

* Zustand
* TanStack Query / React Query

---

# Architecture Philosophy

The architecture must follow:

* feature-based architecture
* scalable folder organization
* separation of concerns
* semantic abstraction layers
* reusable UI primitives
* reusable enterprise patterns
* AI-friendly structure

The architecture should optimize for:

* long-term maintainability
* low cognitive load
* high reusability
* scalable growth
* AI contextual understanding

---

# UI Philosophy

The visual experience should feel inspired by:

* Linear
* Vercel
* Stripe
* Notion
* Raycast

The interface must feel:

* clean
* premium
* modern
* lightweight
* enterprise
* fast
* consistent

---

# UX Philosophy

UX is considered a core engineering responsibility.

Every interaction must prioritize:

* clarity
* responsiveness
* accessibility
* predictability
* smooth async transitions
* low friction
* visual consistency

The project must avoid:

* layout shift
* flickering
* abrupt loading
* inconsistent spacing
* noisy interfaces
* oversized modals
* poor mobile usability

---

# Mobile First Philosophy

All components and layouts must be designed mobile-first.

Requirements:

* touch-friendly interactions
* responsive layouts
* adaptive spacing
* fluid grids
* mobile-safe modals/drawers
* proper scroll handling
* keyboard-safe forms
* responsive typography

Desktop enhancements should be progressive.

---

# Component Architecture

All components must follow:

* composition-first architecture
* reusable primitives
* semantic layers
* strong typing
* accessibility-first patterns
* scalable variants
* separation between UI and logic

Preferred architecture:

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

# Component Standards

All components must:

* support dark mode
* support accessibility
* support keyboard navigation
* support responsive behavior
* support loading states when necessary
* avoid layout shifts
* expose reusable APIs
* avoid unnecessary abstractions

---

# Semantic Components

Semantic components are strongly encouraged.

Examples:

* UserTable
* SettingsDrawer
* PermissionsForm
* AnalyticsCard

Semantic components should compose reusable primitives rather than recreate logic.

---

# Compound Components

Use Compound Components Pattern when:

* components have internal hierarchy
* multiple related UI sections exist
* API readability improves
* state sharing is required

Examples:

* Modal
* Drawer
* Tabs
* Accordion
* Command Palette

---

# Async UX Standards

Async UX is mandatory.

The platform must support:

* loading states
* skeleton patterns
* optimistic UI
* retry actions
* empty states
* graceful error handling
* async boundaries

Avoid:

* blocking interfaces
* blank screens
* abrupt transitions
* invisible loading

---

# Accessibility Standards

Accessibility is mandatory.

Requirements:

* keyboard navigation
* focus visibility
* ARIA support
* screen reader compatibility
* reduced motion support
* semantic HTML
* accessible async feedback

Accessibility must never be considered optional.

---

# Performance Standards

The platform must prioritize:

* low re-rendering
* memoization when necessary
* virtualization for large datasets
* lazy loading
* optimized bundle size
* async rendering strategies

Avoid premature optimization, but never ignore scalability.

---

# Engineering Rules

## Never

* use `any`
* create giant components
* place business logic inside JSX
* perform inline fetching inside UI
* duplicate states
* overuse `useEffect`
* mix unrelated responsibilities
* tightly couple components

## Prefer

* reusable hooks
* semantic abstractions
* composition over inheritance
* isolated logic
* strongly typed APIs
* scalable folder structures
* declarative patterns

---

# Design System Standards

The design system must provide:

* consistency
* predictability
* scalability
* accessibility
* responsive behavior
* semantic reuse

The platform should behave like a reusable frontend operating system.

---

# AI Engineering Philosophy

This project is AI-assisted by design.

The architecture must optimize for:

* contextual understanding
* reusable patterns
* explicit conventions
* semantic consistency
* low ambiguity
* predictable generation

All generated code should feel cohesive with the platform.

---

# Quality Standards

Every implementation should aim for:

* production readiness
* scalability
* maintainability
* readability
* accessibility
* enterprise UX quality

The project should consistently feel above market-average frontend quality.

---

# Final Goal

The final outcome should behave as:

* an enterprise frontend platform
* a scalable SaaS starter
* a reusable design system
* a premium engineering foundation
* an AI-native frontend architecture

The platform must feel ready for real production SaaS applications.

---

# Communication Rules

All explanations, architectural discussions, code reviews, and generated documentation intended for the developer must be written in Brazilian Portuguese.

Technical naming should remain in English whenever appropriate, including:

* component names
* hooks
* folder names
* APIs
* TypeScript types
* interfaces
* engineering terminology

The AI should prioritize:

* concise technical communication
* low ambiguity
* practical implementation guidance
* professional engineering language
* direct explanations

Avoid generic explanations whenever possible.

---

# Naming Conventions

## Components

Use PascalCase.

Examples:

* UserTable
* SettingsDrawer
* AnalyticsCard

## Hooks

Use camelCase prefixed with `use`.

Examples:

* useUsers
* useAsyncState
* usePermissions

## Folders

Use kebab-case.

Examples:

```txt
user-management/
analytics-dashboard/
command-palette/
```

---

# Folder Responsibilities

## base/

Contains reusable primitive components.

Should NOT contain:

* business logic
* API calls
* domain-specific rules

---

## variants/

Contains visual or behavioral variations of primitives.

Examples:

* PrimaryButton
* AsyncSelect
* DangerModal

---

## semantic/

Contains domain-aware components.

Examples:

* UsersTable
* SettingsDrawer
* BillingForm

Semantic components compose primitives and variants.

---

## hooks/

Contains reusable logic abstractions.

Should avoid UI rendering.

---

## styles/

Contains styling abstractions and recipes.

---

## types/

Contains reusable TypeScript contracts.

---

# Data Fetching Rules

All async fetching must prioritize:

* React Query / TanStack Query
* reusable hooks
* isolated fetching logic
* proper loading states
* proper error states
* retry handling

Avoid:

* inline fetching inside components
* duplicated async states
* fetch logic mixed with presentation

Preferred:

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

# Form Standards

All forms must use:

* React Hook Form
* Yup validation
* reusable form abstractions
* semantic validation schemas

Forms should support:

* loading states
* disabled states
* validation feedback
* accessibility
* keyboard navigation
* mobile responsiveness

Avoid duplicated form logic.

---

# Async UX Rules

Loading experiences must feel smooth and intentional.

Rules:

* loading above 300ms should prefer skeletons
* avoid flickering transitions
* avoid blank containers
* avoid layout shifts
* destructive actions require confirmation
* empty states should contain clear CTA actions

---

# Responsive Rules

Mobile-first is mandatory.

Requirements:

* touch-friendly spacing
* adaptive layouts
* responsive typography
* responsive grids
* safe scroll handling
* mobile-safe modals and drawers

Desktop enhancements must remain progressive.

---

# Accessibility Rules

All interactive elements must support:

* keyboard navigation
* focus visibility
* screen readers
* semantic HTML
* proper ARIA attributes
* reduced motion support

Accessibility is never optional.

---

# File Creation Rules

Prefer creating:

* isolated reusable files
* strongly typed abstractions
* scalable folder structures

Avoid:

* giant files
* deeply nested JSX
* duplicated logic
* mixed responsibilities

Components above ~250 lines should be evaluated for decomposition.

---

# AI Behavior Rules

The AI must prioritize:

* consistency with existing architecture
* reuse over recreation
* semantic abstractions
* predictable patterns
* maintainability
* readability

The AI should avoid:

* inventing inconsistent patterns
* creating unnecessary abstractions
* mixing concerns
* ignoring established project conventions

Always prefer consistency over novelty.

---

# Anti-Hallucination Rules

If project patterns already exist:

* reuse them
* extend them carefully
* avoid introducing alternative architectures

Do not generate:

* conflicting folder structures
* multiple competing patterns
* inconsistent naming conventions
* duplicated abstractions

The platform must remain cohesive.

---

# Definition of Done

A feature or component is only considered complete when:

* responsive behavior is implemented
* accessibility is implemented
* loading states are handled
* error states are handled
* dark mode is supported
* strong typing exists
* reusable abstractions are respected
* architecture conventions are respected
* no major anti-patterns exist

---

# Engineering Mindset

The platform should always optimize for:

* scalability
* maintainability
* clarity
* predictability
* developer experience
* enterprise UX quality

Every implementation should feel:

* intentional
* reusable
* production-ready
* cohesive
* platform-oriented

This is not a simple frontend project.

This is an enterprise frontend platform.

