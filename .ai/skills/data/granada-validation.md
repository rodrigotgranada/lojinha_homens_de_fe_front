# Granada Validation Standards

This document defines the official validation philosophy, schema architecture rules, reusable validation systems, and enterprise validation UX standards for the platform.

Validation is considered a foundational UX and business integrity layer.

The goal is not simply blocking invalid input.

The goal is to create:

* predictable validation systems
* reusable schema architecture
* accessible validation UX
* scalable business validation
* resilient async validation flows
* AI-friendly validation patterns

Validation should improve confidence rather than create friction.

---

# Core Validation Philosophy

Validation should prioritize:

* clarity
* predictability
* accessibility
* scalability
* recoverability

Validation should guide users rather than punish them.

---

# Yup Philosophy

The platform uses:

# Yup

as the official validation schema layer.

Validation schemas should remain:

* centralized
* composable
* reusable
* strongly typed

Avoid inline validation logic.

---

# Schema Architecture Philosophy

Schemas should be organized by domain ownership.

Preferred:

```txt
schemas/
├── auth/
├── users/
├── settings/
└── shared/
```

Avoid scattered validation logic.

---

# Validation Layer Philosophy

The platform distinguishes:

# UI Validation

Input formatting and lightweight interaction rules.

# Business Validation

Rules that protect business integrity.

# Server Validation

Backend-enforced constraints.

Avoid mixing all validation responsibilities together.

---

# Validation UX Philosophy

Validation should feel:

* contextual
* progressive
* human-readable
* low-friction

Avoid aggressive error spam.

---

# Validation Timing Philosophy

Prefer:

* onBlur
* submit validation
* contextual validation

Avoid validating aggressively on every keystroke unnecessarily.

---

# Async Validation Philosophy

Async validation should remain lightweight.

Examples:

* email uniqueness
* username availability

Avoid request storms.

---

# Validation Message Philosophy

Validation messages should communicate:

* what failed
* why it failed
* how to recover

Avoid cryptic validation wording.

---

# Accessible Validation Philosophy

Validation must support:

* screen readers
* keyboard navigation
* semantic error associations

Accessibility is mandatory.

---

# Form Schema Philosophy

Schemas should remain close to workflow ownership.

Preferred:

```txt
login.schema.ts
user.schema.ts
settings.schema.ts
```

Avoid giant universal schemas.

---

# Reusable Validation Philosophy

Reusable validation fragments are encouraged.

Examples:

* password rules
* email validation
* CPF validation
* phone validation

Avoid duplicated validation logic.

---

# Mask Philosophy

Masks should assist users without blocking natural interaction.

Masks must remain:

* predictable
* accessible
* mobile-friendly

---

# Enterprise Validation Philosophy

Enterprise validation should optimize:

* workflow continuity
* predictability
* recoverability

Validation should reduce operational mistakes.

---

# Forbidden Validation Patterns

Avoid:

* inline validation chaos
* duplicated schemas
* inaccessible validation
* destructive resets
* validation spam
* unclear errors

Avoid validation systems that create frustration.

---

# Final Validation Goal

The platform should behave as:

* a scalable validation ecosystem
* a reusable schema platform
* a predictable enterprise validation system
* an AI-friendly validation architecture

Every validation interaction should reinforce clarity and confidence.
