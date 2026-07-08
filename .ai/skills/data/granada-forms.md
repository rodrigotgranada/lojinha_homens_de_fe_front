# Granada Forms Architecture Standards

This document defines the official forms engineering philosophy, validation architecture, field composition standards, workflow orchestration rules, and enterprise form UX patterns for the platform.

Forms are considered a foundational business architecture layer.

The goal is not simply collecting user input.

The goal is to create:

* scalable form ecosystems
* reusable field architectures
* accessible workflows
* enterprise-grade validation systems
* predictable form experiences
* AI-friendly form patterns

Forms should behave as reusable workflow infrastructure.

---

# Core Forms Philosophy

Forms should prioritize:

* clarity
* predictability
* scalability
* accessibility
* responsiveness
* validation consistency
* low-friction UX

Forms should reduce user effort.

---

# React Hook Form Philosophy

The platform uses:

# React Hook Form (RHF)

RHF is considered the official form orchestration layer.

Forms should leverage:

* uncontrolled performance
* isolated rerenders
* scalable validation
* composable field architecture

Avoid unnecessary local state for forms.

---

# Validation Philosophy

Validation is considered part of UX.

Validation should prioritize:

* clarity
* contextual feedback
* predictability
* recoverability

Avoid aggressive or disruptive validation behavior.

---

# Yup Philosophy

The platform uses:

# Yup

for schema validation.

Validation schemas should remain:

* centralized
* reusable
* composable
* strongly typed

Avoid inline validation chaos.

---

# Form Architecture Philosophy

Forms should follow layered architecture.

Preferred structure:

```txt id="forms-arch-1"
form/
├── fields/
├── schemas/
├── hooks/
├── types/
├── steps/
├── services/
└── index.ts
```

Architecture should remain scalable and discoverable.

---

# Semantic Form Philosophy

Semantic forms are encouraged.

Examples:

```txt id="forms-semantic-1"
LoginForm
UserForm
RoleForm
SettingsForm
```

Semantic forms should orchestrate reusable fields and validation logic.

---

# Field Architecture Philosophy

Fields should remain reusable primitives.

Examples:

```txt id="forms-field-1"
Input
Select
Checkbox
Switch
Textarea
DatePicker
```

Avoid business-specific field implementations inside primitives.

---

# Field Composition Philosophy

Field composition is strongly encouraged.

Preferred:

```tsx id="forms-comp-1"
<Form.Field>
  <Form.Label />
  <Input />
  <Form.HelperText />
  <Form.ErrorMessage />
</Form.Field>
```

Composition improves consistency and scalability.

---

# Form Layer Philosophy

The platform distinguishes:

# Primitive Fields

Reusable UI primitives.

# Semantic Forms

Business-oriented workflows.

Avoid mixing responsibilities.

---

# Controlled vs Uncontrolled Philosophy

Prefer uncontrolled RHF integrations whenever possible.

Use controlled fields only when required.

Avoid excessive Controller usage unnecessarily.

---

# Schema Organization Philosophy

Schemas should remain close to ownership boundaries.

Preferred:

```txt id="forms-schema-1"
schemas/
├── login.schema.ts
├── user.schema.ts
└── role.schema.ts
```

Avoid scattered validation logic.

---

# Validation Message Philosophy

Validation messages should remain:

* human-readable
* actionable
* contextual

Avoid cryptic validation wording.

---

# Async Validation Philosophy

Async validation should remain lightweight and contextual.

Avoid aggressive server validation on every keystroke.

---

# Error State Philosophy

Errors should communicate:

* what failed
* why it failed
* how to recover

Errors should never feel punitive.

---

# Form State Philosophy

Forms should support:

* loading state
* submitting state
* success state
* error state
* disabled state

Avoid undefined workflow states.

---

# Async Form Philosophy

Async forms should preserve:

* user input
* workflow continuity
* contextual feedback

Avoid destructive form resets after failures.

---

# Submission Philosophy

Submission flows should communicate:

* pending state
* success state
* retry capability

Users should always understand current workflow state.

---

# Multi-Step Form Philosophy

Multi-step forms are encouraged for complex workflows.

Requirements:

* step persistence
* contextual validation
* progress indication
* recoverable navigation

Avoid overwhelming single-screen forms.

---

# Progressive Disclosure Philosophy

Complexity should appear progressively.

Avoid displaying excessive inputs simultaneously.

Users should focus on relevant context only.

---

# Mobile Forms Philosophy

Forms must be mobile-first.

Requirements:

* keyboard-safe layouts
* touch-friendly spacing
* adaptive inputs
* simplified workflows

Mobile forms should remain highly usable.

---

# Accessibility Philosophy

Forms must support:

* keyboard navigation
* screen readers
* semantic labels
* accessible validation
* focus visibility

Accessibility is mandatory.

---

# Input Mask Philosophy

Input masks should remain:

* predictable
* non-destructive
* user-friendly

Masks should assist users rather than fight them.

---

# Supported Input Variants

The platform should support:

* text
* email
* password
* date
* currency
* CPF
* CNPJ
* CEP
* phone
* multi-select
* async select

Field systems should remain extensible.

---

# Select Philosophy

Select systems should support:

* searchable behavior
* async options
* multi-selection
* keyboard accessibility
* mobile usability

Avoid inaccessible select implementations.

---

# Checkbox and Switch Philosophy

Checkboxes and switches should communicate state clearly.

Requirements:

* accessible labels
* keyboard support
* semantic grouping

Avoid ambiguous toggle behavior.

---

# Form Performance Philosophy

Forms should optimize:

* isolated rerenders
* lightweight subscriptions
* minimal controlled state

Avoid giant rerender chains.

---

# Form Context Philosophy

Context usage should remain intentional.

Use context for:

* multi-step orchestration
* shared form workflows
* semantic field composition

Avoid excessive context complexity.

---

# Enterprise Workflow Philosophy

Enterprise forms should optimize:

* productivity
* low friction
* predictability
* recoverability

Complex workflows should remain understandable.

---

# Auto Save Philosophy

Auto-save workflows should feel:

* subtle
* predictable
* non-disruptive

Avoid aggressive save interruptions.

---

# Form Layout Philosophy

Forms should maintain:

* clear grouping
* visual hierarchy
* responsive spacing

Avoid visually overwhelming forms.

---

# AI-Friendly Form Philosophy

Form architecture should optimize:

* reusable validation patterns
* predictable composition
* semantic workflows
* scalable field systems

Generated forms should feel cohesive.

---

# Forbidden Form Patterns

Avoid:

* giant forms
* inline validation chaos
* useState-driven forms
* duplicated validation
* inaccessible inputs
* placeholder-only labels
* destructive resets
* inconsistent field behavior
* tightly coupled business logic

Avoid forms that become difficult to scale.

---

# Preferred Form Characteristics

Prefer forms that feel:

* predictable
* accessible
* responsive
* scalable
* composable
* enterprise-grade

Forms should reinforce workflow confidence.

---

# Final Forms Goal

The platform should behave as:

* a scalable forms ecosystem
* an enterprise workflow platform
* a reusable validation architecture
* a production-grade SaaS form system
* an AI-friendly forms foundation

Every form should reinforce clarity, continuity, and long-term maintainability.
