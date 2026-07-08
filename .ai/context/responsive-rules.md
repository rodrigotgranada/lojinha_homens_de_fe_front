# Responsive Rules

This document defines the official responsive architecture, mobile-first standards, adaptive layout rules, and responsive UX expectations for the platform.

Responsiveness is considered a core architectural requirement.

The goal is not simply to resize layouts.

The goal is to create:

* mobile-first interfaces
* scalable layouts
* adaptive workflows
* touch-friendly experiences
* responsive enterprise UX
* consistent cross-device behavior

The platform should feel intentionally designed for all screen sizes.

---

# Core Responsive Philosophy

All interfaces must be designed mobile-first.

Desktop layouts should progressively enhance the mobile experience rather than redefine it.

The platform must prioritize:

* usability
* readability
* touch ergonomics
* adaptive spacing
* responsive hierarchy
* workflow continuity

---

# Mobile-First Rules

Every component and layout must:

1. start from mobile
2. progressively scale upward
3. preserve usability across breakpoints
4. avoid desktop assumptions

Avoid desktop-first implementations adapted later.

---

# Responsive Design Goals

The responsive system should prioritize:

* clarity
* consistency
* readability
* usability
* adaptability
* low friction

The interface should feel natural on all devices.

---

# Breakpoint Philosophy

Breakpoints should support layout adaptation rather than arbitrary resizing.

Responsive behavior should feel:

* progressive
* intentional
* predictable

Avoid creating entirely different products across breakpoints.

---

# Responsive Layout Rules

Layouts should:

* scale progressively
* adapt spacing
* preserve hierarchy
* maintain readability

Avoid:

* compressed desktop layouts
* oversized mobile spacing
* horizontal overflow
* layout fragmentation

---

# Container Rules

Containers should prioritize:

* readable widths
* adaptive padding
* responsive spacing
* scalable layouts

Avoid full-width content without intentional design justification.

---

# Grid Rules

Responsive grids should:

* adapt naturally
* avoid forced column counts
* preserve spacing consistency

Preferred behavior:

* single-column on mobile
* progressive multi-column scaling

Avoid overcrowded grids on smaller screens.

---

# Responsive Spacing Rules

Spacing should adapt progressively.

Requirements:

* touch-safe spacing
* readable density
* visual breathing room
* scalable gaps

Avoid:

* compressed mobile layouts
* excessive desktop whitespace
* inconsistent spacing scales

---

# Typography Responsive Rules

Typography should scale progressively.

Requirements:

* readable mobile text
* scalable hierarchy
* accessible line height
* balanced density

Avoid:

* oversized headings on mobile
* tiny body text
* inconsistent scaling

---

# Touch Ergonomics Rules

Mobile interactions must prioritize touch usability.

Requirements:

* touch-friendly targets
* comfortable spacing
* thumb accessibility
* gesture safety

Avoid:

* tiny clickable elements
* cramped actions
* hover-dependent UX

---

# Navigation Responsive Rules

Navigation should adapt contextually.

Mobile navigation should prioritize:

* clarity
* simplicity
* accessibility
* thumb reachability

Desktop navigation may expose additional density progressively.

Avoid overly complex mobile navigation structures.

---

# Responsive Sidebar Rules

Sidebars should adapt progressively.

Preferred behavior:

* mobile drawer
* tablet collapsible sidebar
* desktop persistent sidebar

Avoid fixed desktop sidebars forced into mobile layouts.

---

# Modal Responsive Rules

Modals must remain mobile-safe.

Requirements:

* proper max height
* safe scrolling
* touch accessibility
* keyboard safety

Avoid oversized modals on small screens.

Prefer drawers for larger workflows.

---

# Drawer Responsive Rules

Drawers should feel natural on mobile.

Requirements:

* safe height
* smooth scrolling
* responsive spacing
* touch-safe interactions

Avoid desktop-sized drawers on mobile devices.

---

# Form Responsive Rules

Forms should prioritize mobile usability.

Requirements:

* stacked layouts on mobile
* readable spacing
* touch-friendly inputs
* keyboard-safe interactions

Avoid dense horizontal forms on small screens.

---

# Input Responsive Rules

Inputs should support:

* proper mobile sizing
* touch accessibility
* adaptive spacing
* readable typography

Avoid tiny inputs or compressed field layouts.

---

# Table Responsive Rules

Tables must support responsive behavior.

Requirements:

* horizontal overflow handling
* responsive density
* readable spacing
* preserved usability

Large tables should support:

* horizontal scroll
* stacked alternatives when appropriate
* responsive actions

Avoid unreadable compressed tables.

---

# Card Responsive Rules

Cards should adapt naturally.

Requirements:

* responsive padding
* scalable spacing
* readable hierarchy

Cards should never feel cramped.

---

# Scroll Responsive Rules

Scrolling should remain predictable across devices.

Requirements:

* touch scrolling
* smooth overflow handling
* safe nested scrolling
* preserved usability

Avoid scroll traps.

---

# Keyboard Responsive Rules

Mobile keyboard behavior must be considered.

Requirements:

* keyboard-safe forms
* safe input visibility
* scroll adjustment
* viewport safety

Avoid hidden focused inputs.

---

# Responsive Async UX Rules

Async experiences must remain responsive.

Requirements:

* responsive skeletons
* adaptive loading states
* preserved layout structure

Avoid loading states that break responsive layouts.

---

# Responsive Empty States

Empty states should remain readable and centered appropriately.

Requirements:

* adaptive spacing
* scalable hierarchy
* preserved clarity

Avoid oversized empty states on mobile.

---

# Responsive Error States

Error states should remain accessible and readable across devices.

Requirements:

* touch-friendly retry actions
* responsive spacing
* clear hierarchy

Avoid tiny retry actions on mobile.

---

# Responsive Accessibility Rules

Accessibility must remain consistent across breakpoints.

Requirements:

* keyboard navigation
* visible focus states
* touch accessibility
* semantic structure

Responsiveness must never reduce accessibility quality.

---

# Density Responsive Rules

Density should adapt by device context.

Mobile should prioritize:

* readability
* spacing
* touch safety

Desktop may progressively increase information density.

Avoid identical density across all breakpoints.

---

# Motion Responsive Rules

Animations should remain performant on all devices.

Requirements:

* lightweight transitions
* reduced motion support
* responsive-safe animation

Avoid heavy animations on mobile devices.

---

# Responsive Performance Rules

Responsive implementations should remain performant.

Requirements:

* avoid unnecessary re-renders
* optimize responsive calculations
* minimize layout thrashing

Avoid excessive breakpoint-driven rendering logic.

---

# Chakra UI Responsive Standards

Prefer Chakra responsive props.

Preferred:

```tsx id="respchakra1"
px={{ base: 4, md: 6, xl: 8 }}
```

Avoid excessive custom media query logic unless necessary.

---

# AI-Friendly Responsive Philosophy

Responsive architecture should optimize:

* predictable scaling
* reusable responsive patterns
* semantic consistency
* maintainable layouts

Responsive behavior should remain understandable and scalable.

---

# Forbidden Responsive Patterns

Avoid:

* desktop-first layouts
* horizontal overflow
* tiny touch targets
* compressed mobile forms
* oversized mobile modals
* hover-only interactions
* unreadable tables
* inconsistent breakpoints
* layout fragmentation

---

# Preferred Responsive Characteristics

Prefer interfaces that feel:

* adaptive
* lightweight
* readable
* touch-friendly
* scalable
* accessible
* intentional

Responsive behavior should feel cohesive across the platform.

---

# Final Responsive Goal

The platform should behave as:

* a truly mobile-first system
* a responsive enterprise platform
* a scalable cross-device experience
* a production-grade adaptive frontend

Every screen should feel intentionally designed for its context.
