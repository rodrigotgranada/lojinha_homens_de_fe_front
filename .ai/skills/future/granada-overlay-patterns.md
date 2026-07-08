# Granada Overlay Patterns Standards

This document defines the official overlay philosophy, modal architecture standards, layered interaction systems, accessibility rules, async overlay UX patterns, and scalable overlay orchestration practices for the platform.

Overlays are considered foundational interaction systems.

The goal is not simply opening floating UI.

The goal is to create:

* scalable interaction layers
* resilient workflow orchestration
* accessible overlay systems
* predictable async UX
* mobile-safe interactions
* AI-friendly overlay architecture

Overlays should reinforce focus and workflow continuity rather than interrupt users aggressively.

---

# Core Overlay Philosophy

Overlay systems should prioritize:

* focus
* clarity
* continuity
* accessibility
* recoverability
* responsiveness

Overlays should feel lightweight and intentional.

---

# Overlay Architecture Philosophy

Overlay systems are treated as orchestration layers.

Examples:

* Modal
* Drawer
* Popover
* Tooltip
* Context Menu
* Dropdown
* Command Palette
* Alert Dialog
* Bottom Sheet

Avoid treating overlays as isolated components.

---

# Layering Philosophy

Overlay systems must support predictable layering behavior.

Requirements:

* z-index consistency
* stacking management
* isolated portals
* backdrop coordination

Avoid overlay stacking chaos.

---

# Focus Management Philosophy

Focus management is mandatory.

Requirements:

* focus trapping
* focus restoration
* keyboard continuity
* accessible navigation

Users should never lose interaction context.

---

# Accessibility Philosophy

All overlays must support:

* keyboard navigation
* screen readers
* semantic roles
* focus visibility
* escape handling

Accessibility is mandatory.

---

# Escape Philosophy

Escape behavior should remain predictable.

Examples:

* ESC closes modal
* ESC closes popover
* ESC exits command palette

Avoid inconsistent escape behavior.

---

# Scroll Philosophy

Overlay systems must preserve scroll integrity.

Requirements:

* body scroll locking
* nested scroll isolation
* mobile-safe overflow
* predictable scroll restoration

Avoid scroll freezing bugs.

---

# Mobile Overlay Philosophy

Mobile overlays require dedicated behavior.

Examples:

* bottom sheets
* full-screen drawers
* responsive modals

Desktop overlays should adapt progressively.

---

# Modal Philosophy

Modals should support:

* focused workflows
* confirmations
* compact forms
* critical interactions

Avoid oversized modal systems.

---

# Confirmation Modal Philosophy

Confirmation dialogs should remain lightweight.

Requirements:

* clear intent
* destructive differentiation
* explicit actions

Avoid dangerous ambiguity.

---

# Drawer Philosophy

Drawers should support:

* large workflows
* navigation systems
* multi-step flows
* contextual editing

Drawers should preserve workflow continuity.

---

# Popover Philosophy

Popovers should remain contextual.

Requirements:

* lightweight interaction
* anchored positioning
* focus predictability

Avoid complex application flows inside popovers.

---

# Tooltip Philosophy

Tooltips should remain assistive.

Requirements:

* concise messaging
* delayed appearance
* non-blocking interaction

Avoid putting critical information only inside tooltips.

---

# Dropdown Philosophy

Dropdown systems should support:

* keyboard navigation
* search when necessary
* async loading
* virtualization for large lists

Avoid giant dropdown menus.

---

# Command Palette Philosophy

Command systems should optimize:

* speed
* discoverability
* keyboard-first interaction
* workflow acceleration

Command palettes should feel instantaneous.

---

# Context Menu Philosophy

Context menus should remain contextual and lightweight.

Avoid overwhelming option density.

---

# Overlay Animation Philosophy

Animations should reinforce continuity.

Requirements:

* subtle transitions
* responsive timing
* low-motion compatibility

Avoid aggressive animations.

---

# Async Overlay Philosophy

Overlays should support async UX.

Requirements:

* loading states
* optimistic continuity
* async feedback
* recoverability

Avoid frozen overlay interactions.

---

# Loading Philosophy

Overlay loading should preserve layout stability.

Prefer:

* inline loading
* skeleton sections
* progressive rendering

Avoid blank overlays.

---

# Error Recovery Philosophy

Overlay systems should recover gracefully.

Requirements:

* retry actions
* contextual feedback
* state preservation

Avoid catastrophic overlay resets.

---

# Overlay State Philosophy

Overlay state should remain isolated.

Avoid deeply coupled overlay orchestration.

---

# Compound Component Philosophy

Overlay systems should strongly prefer compound component architecture.

Examples:

```tsx id="overlay-comp-1"
<Modal.Root>
  <Modal.Trigger />
  <Modal.Content>
    <Modal.Header />
    <Modal.Body />
    <Modal.Footer />
  </Modal.Content>
</Modal.Root>
```

Composition-first architecture is encouraged.

---

# Chakra UI Philosophy

Overlay systems should leverage:

* Chakra UI v3 composition API
* Portal
* Positioner
* semantic slots

Avoid rigid monolithic wrappers.

---

# Semantic Overlay Philosophy

Semantic overlays are encouraged.

Examples:

* DeleteUserDialog
* SettingsDrawer
* PermissionsModal
* InviteUserPopover

Semantic overlays should compose primitives.

---

# Enterprise UX Philosophy

Enterprise overlays should optimize:

* operational continuity
* low cognitive load
* workflow acceleration
* safe interaction patterns

Users should maintain contextual awareness at all times.

---

# Performance Philosophy

Overlay systems should optimize:

* lazy mounting
* portal isolation
* rendering continuity

Avoid excessive overlay rerendering.

---

# AI-Friendly Overlay Philosophy

Overlay architecture should optimize:

* reusable patterns
* semantic composition
* scalable orchestration
* predictable APIs

Generated overlays should remain cohesive across the platform.

---

# Forbidden Overlay Patterns

Avoid:

* giant modals
* inaccessible focus handling
* broken scroll locking
* overlay stacking chaos
* oversized drawers
* tooltip abuse
* modal-over-modal systems
* aggressive animations
* destructive ambiguity

Avoid overlay systems that disrupt workflow continuity.

---

# Preferred Overlay Characteristics

Prefer overlays that feel:

* lightweight
* responsive
* accessible
* contextual
* enterprise-grade

Overlay systems should reinforce productivity and clarity.

---

# Final Overlay Architecture Goal

The platform should behave as:

* a scalable overlay ecosystem
* a resilient interaction platform
* a mobile-safe enterprise UX system
* an AI-friendly overlay architecture
* a production-grade frontend orchestration layer

Every overlay interaction should reinforce focus, continuity, and operational efficiency.
