# Granada Architecture Rules: Accessibility Required

This document defines the official binary validation rules, keyboard navigation mappings, ARIA attribute standards, and semantic HTML mandates regarding the absolute requirement of WCAG 2.1 Level AA accessibility patterns across the platform.

Treating accessibility as an optional or secondary task is considered a critical architectural failure.

The goal is not simply passing automated lighthouse audits.

The goal is to ensure:

* full operation of all features using strictly keyboard-only navigation
* flawless interaction compatibility with modern screen readers (e.g., NVDA, JAWS, VoiceOver)
* predictable focus trapping and restoration during overlay cycles
* clear, highly visible interactive focus boundaries for keyboard users
* accessible asynchronous operation feedback across dynamic layouts
* AI-friendly predictable accessible semantic component generation trees

Every layout, form, or structural element must be authored accessibility-first by default.

---

# Core Accessibility Philosophy

Accessibility (a11y) is a core engineering requirement of premium enterprise software.

An application interface that cannot be navigated seamlessly without a mouse is considered broken.

Never defer accessibility updates to future development sprints.

Avoid sacrificing keyboard navigation or screen reader clarity to achieve complex or non-standard visual layouts.

---

# Mandated Semantic HTML over Generic Divs

Do not use raw `Box` or `div` containers to build interactive controls or structurally standard layout nodes.

Leverage semantic HTML elements or native Chakra UI v3 semantic primitives to establish accurate document landmark structures.

```tsx
// FORBIDDEN - Non-semantic box masquerading as an interactive component
<Box onClick={handleNavigate} cursor="pointer" p={2}>
  <Text>Ir para a Dashboard</Text>
</Box>
```

```tsx
// PREFERRED - Semantic component structure utilizing native accessibility hooks
<Button onClick={handleNavigate} variant="ghost" p={2}>
  Ir para a Dashboard
</Button>
```

---

# Document Landmark Layout Standards

Main application layouts must declare clear landmark roles to orient assistive technologies.

Requirements:
* wrap main view ports inside a `<main>` container or `<Box as="main">`
* wrap global sidebars or navigation groupings inside a `<nav>` container
* wrap application group control headers inside a `<header>` container
* wrap footer metadata clusters inside a `<footer` container

---

# Keyboard Clickable Element Rule

Every element that registers an `onClick` event listener must be programmatically focusable and actionable via keyboard.

Requirements:
* interactive nodes must contain a valid `tabIndex={0}` attribute if they are not native buttons or anchors
* attach a keyboard event listener (`onKeyDown` or `onKeyUp`) to handle `Enter` and `Space` keystrokes
* ensure interactive components declare an appropriate ARIA `role` trait (e.g., `role="button"`)

---

# Interactive Keyboard Event Pattern

Ensure non-native elements capture keyboard triggers seamlessly.

```tsx
// PREFERRED
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    executeAction();
  }
};

return (
  <Box 
    role="button" 
    tabIndex={0} 
    onClick={executeAction} 
    onKeyDown={handleKeyDown}
    className="gr-accessible-action"
  >
    {children}
  </Box>
);
```

---

# Focus Visibility and Outline Ban Rule

Do not global-hide or strip the CSS focus outline token ring (`outline: none` or `_focus={{ outline: "none" }}`) without assigning an explicit design token replacement.

Keyboard users rely entirely on the visual focus state indicators to track their active cursor coordinates across the interface grid.

Eliminating focus rings isolates users and degrades developer experience.

---

# Focus Ring Design System Tokens

Leverage Chakra UI v3 native focus properties to apply cohesive design token focus indicators.

```tsx
// PREFERRED
<Button
  _focusVisible={{
    outline: "2px solid",
    outlineColor: "brand.primary",
    outlineOffset: "2px",
  }}
>
  Executar Transação
</Button>
```

---

# Overlay Focus Trapping Mandate

All layer overlays (Modals, Drawers, Lightboxes) must encapsulate keyboard focus within their container boundary while active.

Users must not be able to tab out of an open modal back into the background application shell.

Ensure overlays fulfill focus management requirements laid out in `.ai/skills/future/granada-overlay-patterns.md`.

---

# Focus Restoration Mandate

When an overlay closes, the application must programmatically restore focus back to the exact trigger element that initialized the overlay.

Losing user focus position forces keyboard operators to re-tab through the entire page layout from the top.

Chakra UI v3 overlay primitives handle this cycle out-of-the-box when using composition APIs correctly.

---

# Icon-Only Accessible Label Rule

Interactive buttons, toggles, or triggers that render exclusively an icon asset must provide an explicit text descriptor via `aria-label`.

Screen readers cannot analyze visual svg vectors or icon fonts; they require explicit text attributes to announce element functionality.

```tsx
// FORBIDDEN - Screen reader announces this button as empty or raw SVG text
<IconButton onClick={onDelete}>
  <TrashIcon />
</IconButton>
```

```tsx
// PREFERRED - Safe, semantic, and highly descriptive text context
<IconButton onClick={onDelete} aria-label="Excluir perfil do usuário">
  <TrashIcon />
</IconButton>
```

---

# ARIA Interactive State Mappings

Dynamic interface components must adjust state variables using appropriate ARIA parameters to communicate layout modifications instantly.

Mappings checklist:
* Accordions, dropdowns, and collapsible menus -> use `aria-expanded="true | false"`
* Tabs layouts controls -> use `role="tablist"`, `role="tab"`, and `aria-selected="true | false"`
* Selections checklists switches -> use `aria-checked="true | false"`
* Popovers or contextual drawers -> use `aria-haspopup="true"` and `aria-controls="target-id"`

---

# Form Field Accessibility Contracts

Form control fields must map descriptions, validation states, and requirements explicitly to assistive screen reading software.

Requirements:
* assign matching html `id` and `htmlFor` configurations to form `Label` elements
* assign `aria-invalid="true"` dynamically to input elements when validation errors trigger
* associate validation error text blocks to the input using `aria-errormessage="error-block-id"`
* append `aria-required="true"` if fields are marked mandatory inside the Yup schema

---

# Form Field Accessible Pattern

Map form inputs securely using descriptive references.

```tsx
// PREFERRED
<FormControl isInvalid={!!errors.email}>
  <FormLabel htmlFor="email-input">Endereço de E-mail</FormLabel>
  <Input
    id="email-input"
    type="email"
    aria-invalid={errors.email ? "true" : "false"}
    aria-errormessage="email-error-msg"
    {...register("email")}
  />
  {errors.email && (
    <FormErrorMessage id="email-error-msg">
      {errors.email.message}
    </FormErrorMessage>
  )}
</FormControl>
```

---

# Color Contrast Ratios Constraints

Text and essential user interface controls must maintain crisp, legal contrast ratios matching WCAG AA specifications.

Minimum contrast markers:
* standard reading text strings -> minimum contrast ratio of 4.5:1 against the background surface
* large scale header text units -> minimum contrast ratio of 3:1 against the background surface
* critical visual icons and interactive states -> minimum contrast ratio of 3:1

This rule must enforce complete compliance across both light mode and dark mode theme setups.

---

# Dynamic Screen Reader Announcements (Aria Live)

Dynamic notifications, toast messages, and background asynchronous state changes must speak to assistive devices via `aria-live`.

Requirements:
* use `aria-live="polite"` for non-disruptive feedback logs (e.g., "Alterações salvas automaticamente")
* use `aria-live="assertive"` for critical error barriers requiring prompt attention (e.g., "Falha na conexão com o servidor")

Avoid overusing assertive live flags to prevent audio channel clutter.

---

# Reduced Motion Media Support

The platform layout framework must honor user operating system preferences regarding reduced animation configurations.

Heavy translation movements, screen scaling effects, or fast looping loading pulses must pause or transform into static states when the user configures reduced motion.

```typescript
// PREFERRED - Programmatic motion mitigation using Chakra v3 tokens
import { useReducedMotion } from '@chakra-ui/react';

const shouldReduceMotion = useReducedMotion();
const standardAnimation = shouldReduceMotion ? undefined : "slide-up 0.2s ease-out";
```

---

# Image and Asset Descriptive Text Mandate

Every static image asset, informational vector graphic, or content illustration must append an explicit descriptive `alt` parameter.

If an asset serves purely decorative aesthetic functions, assign an empty string configuration (`alt=""`) so screen reading software skips it safely.

---

# Table Accessibility Markups

Data display tables must leverage complete, semantic grid trees to protect screen scanning.

Ensure tables use explicit semantic markup structural tokens as outlined in `.ai/rules/prefer-semantic-components.md`:
* encapsulate headers inside `<thead>` and rows inside `<tr>`
* use `<th>` tags for heading columns and supply `scope="col"` descriptors
* use `<td>` tags strictly for grid item data nodes

---

# AI Code Generation Guard Rules

The AI production engine must strictly deny writing UI layouts that lack accessible parameters.

When outputting custom interaction forms, navigation anchors, modals, or action controllers, the agent must embed semantic HTML layout primitives, explicit keyboard trigger event maps, focus visibility configurations, and necessary ARIA binding structures automatically.

The engine must never output simplified mock components that drop access variables to shorten output files.

---

# Forbidden Accessibility Anti-Patterns Summary

Avoid:
* implementing `onClick` triggers on un-focusable `div` or `Box` layouts missing roles or `tabIndex`
* disabling focus ring styling markers (`outline: none`) without declaring design token overrides
* omitting `aria-label` variables on buttons that feature only graphic icons
* hardcoding raw color hex elements that breach 4.5:1 WCAG AA contrast scales
* blocking browser focus cycles from moving naturally across dynamic layout views

---

# Preferred Accessibility Characteristics

Prefer design layouts that feel:
* completely controllable via standard keyboard tracking routes
* highly descriptive and informative to screen readers via semantic parameters
* visually stable and transparent across dark/light mode configurations
* resiliently structured around native landmark blocks

---

# Final Accessibility Definition of Done

No user interface view component, dynamic control layer, or system layout will pass completion requirements if it breaks keyboard navigation pathways or omits mandatory ARIA descriptive tags.

Enforcing complete accessibility governance confirms the market-premium quality execution metrics of the platform.