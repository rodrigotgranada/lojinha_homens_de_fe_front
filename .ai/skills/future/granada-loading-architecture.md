# Granada Loading Architecture Standards

This document defines the official enterprise loading philosophy, async UX orchestration standards, scalable skeleton composition systems, transition mechanics, and production-grade feedback engineering practices for the platform.

Loading states are considered foundational product architecture systems.

The goal is not simply displaying placeholders on screen.

The goal is to create:

* scalable async interaction systems
* resilient visual continuity patterns
* enterprise-grade layout stability
* responsive loading orchestration
* low-friction transition environments
* AI-friendly loading architecture

Loading states should reinforce clarity, perceived speed, and structural integrity.

---

# Core Loading Philosophy

Loading systems should prioritize:

* predictability
* structural continuity
* visual stability
* progressive feedback
* user reassurance

Users should always understand:

* that the platform is operating
* where information will manifest
* what structural scale to expect
* how to maintain navigation context

---

# Async UX Philosophy

Async interactions behave as core product engineering layers.

Loading strategies should optimize:

* perceived system performance
* cognitive comfort during fetch
* layout transition smoothness
* operational feedback loops

Avoid blocking the user interface aggressively without structural context.

---

# Layout Stability Philosophy

Layout stability during async operations is mandatory.

Requirements:

* zero layout shifts (CLS mitigation)
* preserved wrapper dimensions
* stable viewport boundaries
* container size anticipation

Avoid layout collapsing.

---

# Skeleton Architecture Philosophy

Skeletons are the primary structural mechanism for async data fetching.

Skeletons must act as exact gray-scale wireframes of the final state.

Avoid generic loading bars that do not respect the final content shape.

---

# Compound Skeletons Philosophy

Complex interfaces require compound skeleton composition.

Skeletons must be composed hierarchically:
* SkeletonCircle for avatars
* SkeletonText for content blocks
* Custom shape skeletons for metrics

Match the layout tree structural hierarchy exactly.

---

# Skeleton Dimension Philosophy

Skeleton components must declare explicit sizing tokens.

Requirements:

* match final component heights exactly
* mirror border-radius design tokens
* adapt fluidly to responsive grid breaks
* prevent container snapping on success

---

# Skeleton Animation Philosophy

Skeleton animations must remain subtle and consistent.

Requirements:

* use standard pulse animations
* synchronize animation cycles across components
* support dark mode contrast ratios natively
* adapt to system theme variables

---

# Spinner Scope Philosophy

Spinners possess an isolated, non-structural scope of utility.

Allowed use cases:

* inline action states (e.g., inside buttons)
* micro-interactions (e.g., small badge updates)
* background data synchronization indicator

Avoid full-page centered spinners.

---

# Spinner Placement Philosophy

Spinners should never disrupt layout hierarchy.

Requirements:

* constrain to parent boundaries
* replace icon targets during execution
* preserve text alignment labels

---

# Deferred Loading Philosophy (300ms Rule)

The platform must eliminate visual flickering on fast network responses.

Requirements:

* responses under 300ms must skip loading indicators
* leverage React 19 transitions to defer state flashes
* utilize TanStack Query suspense thresholds when appropriate

Avoid flashing a skeleton on screen for 50 milliseconds.

---

# Minimum Visibility Philosophy

Once a loading state is displayed, it must remain visible for a minimum logical duration.

Requirements:

* enforce a short internal delay if necessary (e.g., 200ms minimum)
* prevent frantic UI blinking on erratic network connections
* smooth out the visual transition curve

---

# Optimistic UI Philosophy

Data mutations should reflect success instantly whenever predictable.

Requirements:

* update local TanStack Query cache immediately
* preserve continuous interaction capability
* roll back state seamlessly on server failure
* trigger descriptive error feedback post-rollback

---

# Mutation State Philosophy

Write operations require localized visual tracking.

Requirements:

* disable triggering controls during execution
* maintain surrounding UI interactivity
* provide clear visual cues that processing is underway

---

# Form Loading Philosophy

Enterprise forms require granular input-level loading handling.

Requirements:

* submit actions must adopt loading properties
* field-level async validations must show isolated status
* prevent total form locking unless data integrity demands it

---

# Input Retention Philosophy

Async operations must never destroy user input state.

Requirements:

* maintain filled field values during re-validation
* preserve cursor focus where possible
* isolate layout changes from user interaction points

---

# Pagination Loading Philosophy

Data table navigation must preserve operational boundaries.

Requirements:

* maintain fixed container heights during page changes
* apply partial opacity overlays if displaying previous data
* prevent the pagination bar from shifting position vertically

---

# Infinite Scroll Loading Philosophy

Infinite scroll interactions require append-ready loading structures.

Requirements:

* append trailing skeletons at the bottom of the viewport
* isolate grid rendering updates
* trigger fetching before the user reaches the absolute bottom

---

# Table Loading Philosophy

Data grids require specialized structural loading patterns.

Requirements:

* mirror row counts with proportional skeleton rows
* preserve column alignment widths exactly
* isolate toolbar interactions from row loading states

---

# Sectional Loading Philosophy

Dashboard metrics require isolated loading zones.

Requirements:

* load widgets independently (Render Isolation)
* prevent slow endpoints from blocking fast widgets
* maintain individual widget error/loading boundaries

---

# App Shell Loading Philosophy

Global route transitions must preserve the outer application framework.

Requirements:

* Sidebar and Topbar must remain completely static
* inject progress bars strictly at the top of the content viewport
* cache shell layout configurations permanently

---

# Chakra UI Loading Philosophy

Loading elements must leverage primitive Chakra UI layout composition.

Requirements:

* utilize `Skeleton`, `SkeletonCircle`, and `SkeletonText`
* pass responsive layout tokens directly via composition API
* leverage semantic theme color variants

Avoid arbitrary CSS animation keyframes outside the design system.

---

# Accessibility Philosophy

Async feedback mechanisms must accommodate assistive technologies.

Requirements:

* apply `aria-busy="true"` to active loading regions
* utilize polite announcements via `aria-live="polite"`
* ensure sufficient contrast tokens for skeleton pulse states

---

# Reduced Motion Philosophy

Loading animations must respect user motion preferences.

Requirements:

* disable pulse animations when `prefers-reduced-motion` is active
* fall back to static gray-scale structural placeholders
* maintain absolute stability

---

# Performance Optimization Philosophy

Loading rendering loops must not trigger global layout thrashing.

Requirements:

* isolate skeleton components to prevent parent re-renders
* use memoized structural layouts for skeleton grids
* leverage CSS-driven animations for lower CPU overhead

---

# AI-Friendly Loading Philosophy

Loading state architecture must optimize for deterministic code generation.

Requirements:

* use explicit semantic abstractions (e.g., `UserTableSkeleton`)
* define rigid layout pattern rules
* expose standard boolean flags for async states

---

# Forbidden Loading Patterns

Avoid:

* layout shift causing sudden component jumps
* flashing loading states under 300ms
* heavy centralized full-screen spinners
* disabling entire pages during micro-fetches
* destroying entered form data on submit failure
* unaligned skeleton dimensions

---

# Preferred Loading Characteristics

Prefer loading implementations that feel:

* stable
* intentional
* fluid
* localized
* high-performance

---

# Final Enterprise Loading Goal

The platform should behave as:

* a zero-layout-shift web application
* a fluid, optimistic operational interface
* a production-grade system that respects human cognitive pacing

Every async transition must reinforce the premium quality of the SaaS platform.