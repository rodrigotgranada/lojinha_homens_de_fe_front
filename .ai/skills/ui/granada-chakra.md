# Granada Chakra UI Engineering Standards

This document defines the official Chakra UI v3 architecture philosophy, composition standards, design system patterns, styling rules, and scalable UI engineering practices for the platform.

This project uses:

* Chakra UI v3
* Composition API
* Compound Component patterns
* Semantic design architecture
* Enterprise-grade UI systems

Chakra UI is used as the foundational UI platform.

The goal is not simply styling components.

The goal is to create:

* scalable design systems
* reusable UI primitives
* accessible component ecosystems
* enterprise-grade frontend UX
* composable UI architecture

The UI platform should remain scalable and predictable.

---

# Core Chakra Philosophy

Chakra UI should prioritize:

* composition
* accessibility
* scalability
* semantic structure
* responsive behavior
* reusable styling systems

Chakra should behave as a frontend platform foundation.

---

# Chakra v3 Philosophy

This platform uses:

# Chakra UI v3 Composition API

Architecture must follow Chakra v3 mental models.

Avoid Chakra v2 legacy patterns.

Prefer:

* slot-based composition
* primitive composition
* scalable component APIs
* semantic architecture

---

# Composition API Philosophy

Composition-first architecture is mandatory.

Preferred:

```tsx id="chakra-comp-1"
<Drawer>
  <Drawer.Trigger />
  <Drawer.Content>
    <Drawer.Header />
    <Drawer.Body />
  </Drawer.Content>
</Drawer>
```

Avoid oversized prop-driven APIs when composition improves scalability.

---

# Compound Components Philosophy

Compound Components are encouraged for scalable UI systems.

Preferred for:

* Modal
* Drawer
* Tabs
* Accordion
* Select
* Command Palette
* Table

Compound APIs should feel readable and declarative.

---

# Slot Architecture Philosophy

Components should expose meaningful slots.

Preferred slots:

* Header
* Body
* Footer
* Trigger
* Content
* Actions

Slots improve:

* composability
* readability
* scalability

Avoid monolithic components.

---

# Semantic Design Philosophy

The platform prioritizes semantic design systems.

Prefer semantic meaning over raw styling.

Preferred:

```tsx id="chakra-semantic-1"
<Card variant="analytics" />
<Button variant="primary" />
```

Avoid repeated inline style duplication.

---

# Styling Philosophy

Prefer Chakra style props and theme-driven styling.

Avoid excessive inline CSS objects.

Prefer:

* semantic tokens
* recipes
* variants
* reusable style abstractions

Styling should remain centralized and scalable.

---

# Theme Architecture Philosophy

The theme should behave as a scalable design token system.

Preferred structure:

```txt id="chakra-theme-1"
theme/
├── tokens/
├── semantic-tokens/
├── recipes/
├── components/
├── foundations/
└── index.ts
```

Theme organization should remain scalable.

---

# Semantic Tokens Philosophy

Semantic tokens are mandatory.

Prefer:

```ts id="chakra-token-1"
bg.surface
bg.subtle
text.primary
border.default
```

Avoid hardcoded colors.

---

# Dark Mode Philosophy

Dark mode support is mandatory.

Requirements:

* semantic tokens
* accessible contrast
* consistent surfaces
* predictable visual hierarchy

Avoid manually hardcoding dark colors.

---

# Responsive Philosophy

All Chakra components must be mobile-first.

Preferred:

```tsx id="chakra-responsive-1"
px={{ base: 4, md: 6 }}
```

Avoid desktop-first responsive logic.

---

# Accessibility Philosophy

Accessibility is mandatory.

All components must support:

* keyboard navigation
* focus visibility
* ARIA compatibility
* screen readers
* reduced motion

Chakra accessibility primitives should be preserved.

---

# Focus Philosophy

Focus states should remain visible and accessible.

Avoid removing focus styles globally.

Prefer accessible focus ring systems.

---

# Variant Philosophy

Variants should represent semantic meaning.

Preferred:

```tsx id="chakra-variant-1"
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="ghost" />
```

Avoid visual-only naming.

---

# Size Philosophy

Sizes should remain predictable and reusable.

Preferred:

```tsx id="chakra-size-1"
size="sm"
size="md"
size="lg"
```

Avoid arbitrary size systems.

---

# Spacing Philosophy

Spacing should follow design token consistency.

Avoid arbitrary spacing values.

Prefer token-driven spacing systems.

---

# Layout Philosophy

Layouts should prioritize:

* clarity
* responsiveness
* composability
* adaptive behavior

Prefer Chakra primitives:

* Stack
* Flex
* Grid
* Box

Avoid unnecessary custom layout abstractions.

---

# Animation Philosophy

Animations should remain subtle and performant.

Prefer:

* opacity transitions
* transform transitions
* lightweight motion

Avoid heavy layout animations.

---

# Form Architecture Philosophy

Forms should integrate naturally with Chakra composition patterns.

Preferred:

```tsx id="chakra-form-1"
<Form.Field>
  <Form.Label />
  <Input />
  <Form.Error />
</Form.Field>
```

Avoid inconsistent form composition.

---

# Input Philosophy

Inputs should support:

* accessibility
* validation
* responsive behavior
* semantic variants
* dark mode

Avoid primitive inconsistency.

---

# Table Philosophy

Tables should support:

* responsive overflow
* loading states
* empty states
* semantic structure
* scalable composition

Avoid giant monolithic table implementations.

---

# Modal Philosophy

Modals should feel:

* lightweight
* accessible
* responsive
* composable

Avoid oversized modal complexity.

---

# Drawer Philosophy

Drawers should support:

* mobile-first UX
* smooth async workflows
* scalable composition
* preserved context

Avoid blocking UX patterns.

---

# Scroll Philosophy

Custom scroll systems should remain subtle.

Requirements:

* accessible scrolling
* responsive behavior
* touch-friendly interactions

Avoid aggressive scroll customization.

---

# Async UX Philosophy

Async states are mandatory.

Components should support:

* loading
* skeletons
* empty states
* retry patterns
* error handling

Avoid blank rendering states.

---

# Chakra Recipes Philosophy

Recipes should centralize reusable styling behavior.

Preferred for:

* buttons
* cards
* inputs
* badges
* tables

Recipes should reduce styling duplication.

---

# Styling Reuse Philosophy

Avoid repeated style objects.

Prefer:

* variants
* recipes
* semantic abstractions
* reusable wrappers

Styling architecture should remain maintainable.

---

# CSS Philosophy

Prefer Chakra APIs before custom CSS.

Use custom CSS only when:

* necessary
* justified
* scalable

Avoid fighting Chakra architecture unnecessarily.

---

# Performance Philosophy

Chakra implementations should remain performant.

Avoid:

* excessive rerenders
* giant render trees
* unnecessary styling recalculation

Prefer composable rendering isolation.

---

# AI-Friendly Chakra Philosophy

Chakra architecture should optimize:

* reusable patterns
* semantic structure
* predictable composition
* scalable variants

Generated components should feel cohesive.

---

# Forbidden Chakra Patterns

Avoid:

* Chakra v2 legacy patterns
* hardcoded colors
* giant style objects
* duplicated styling
* inaccessible overrides
* excessive wrapper abstractions
* monolithic component APIs
* inline styling chaos

Avoid architecture that reduces scalability.

---

# Preferred Chakra Characteristics

Prefer components that feel:

* composable
* semantic
* scalable
* responsive
* accessible
* enterprise-grade

The design system should remain cohesive.

---

# Final Chakra Goal

The platform should behave as:

* a scalable design system
* an enterprise-grade UI platform
* a reusable frontend foundation
* a composable Chakra ecosystem
* an AI-friendly UI architecture

Every component should reinforce scalability, accessibility, and long-term maintainability.
