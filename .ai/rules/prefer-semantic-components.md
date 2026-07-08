# Granada Architecture Rules: Prefer Semantic and Compound Components

This document defines the official binary validation rules, composition design patterns, semantic layering guidelines, and mandatory structural standards regarding the strict enforcement of Compound Components and the Chakra UI v3 Composition API, while prohibiting monolithic "prop-bloated" component interfaces.

Building highly rigid, configuration-driven monolithic components is treated as a severe architectural failure.

The goal is not simply making components reusable.

The goal is to ensure:

* extreme layout flexibility via declarative children orchestration
* complete eradication of visual configuration prop-bloat (Prop Hell)
* strict structural alignment with Chakra UI v3 slot-based mechanics
* clean semantic decoupling between atomic primitives and domain definitions
* highly predictable and maintainable design system token distribution
* AI-friendly composable user interface code generation layouts

Interfaces must be composed dynamically using nested semantic primitives rather than driven by dozens of conditional boolean switches.

---

# Core Composition Philosophy

UI engineering must prioritize composition over rigid configuration matrices.

Components should act as Lego bricks: small, open, and orchestrable via standard React `children` mapping.

Avoid wrapping multiple internal structural choices behind boolean flags, which causes component rigidity and internal code bloat.

---

# Prohibited Monolithic Prop-Bloat Pattern

Do not design components that consume a massive list of configuration properties to toggle internal sub-elements or layout states.

This anti-pattern (Prop Hell) forces the component to internalize endless layout permutations, destroying flexibility.

```tsx
// FORBIDDEN - Monolithic, rigid, configuration-driven
<EnterpriseModal
  isOpen={isOpen}
  title="Edit Workspace"
  showCloseButton={true}
  primaryActionLabel="Save Changes"
  secondaryActionLabel="Cancel"
  onPrimaryAction={handleSave}
  onSecondaryAction={handleClose}
  size="lg"
  variant="premium"
  hasIcon={true}
  iconType="settings"
>
  <FormBody />
</EnterpriseModal>
```

---

# Mandated Compound Components Pattern

Complex UI structures with internal structural hierarchies must be authored using the Compound Components Pattern.

Expose sub-components as properties of a primary container block or as independent contextual exports to allow flexible structural assembly directly inside the view layer.

```tsx
// PREFERRED - Declarative, composed, hyper-flexible (Chakra v3 Composition style)
<Modal.Root open={isOpen} onOpenChange={handleClose} size="lg">
  <Modal.Backdrop />
  <Modal.Positioner>
    <Modal.Content border="1px solid" borderColor="border.premium">
      <Modal.Header>
        <HStack gap={2}>
          <Icon as={SettingsIcon} color="brand.primary" />
          <Modal.Title>Edit Workspace</Modal.Title>
        </HStack>
        <Modal.CloseTrigger />
      </Modal.Header>
      
      <Modal.Body>
        <FormBody />
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="outline" onClick={handleClose}>Cancel</Button>
        <Button variant="solid" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal.Content>
  </Modal.Positioner>
</Modal.Root>
```

---

# Chakra UI v3 Composition API Standard

Align all local UI abstractions directly with Chakra UI v3 slot mechanics and naming conventions.

Leverage native parts component trees (`Root`, `Trigger`, `Content`, `Header`, `Body`, `Footer`) instead of bundling presentation parameters into hidden wrappers.

This pattern empowers the layout layer to inject contextual overrides, styling attributes, and conditional state modifiers directly onto the relevant target slots without editing the source component codebase.

---

# Semantic Abstraction Layer Rules

Distinguish clearly between Primitive Foundation Components (`base/`), Visual Overrides (`variants/`), and Domain-Aware Components (`semantic/`).

Primitives manage agnostic layouts and basic structural orchestration.

Semantic components compose primitives to bind them tightly to application domain models (e.g., `UserTable`, `BillingDrawer`).

---

# Semantic Assembly Rule

Semantic domain components must map structural fields by composing primitive layout structures, never by generating localized monolithic DOM sub-nodes.

```tsx
// PREFERRED - semantic/WorkspaceSettingsDrawer.tsx
import { Drawer } from '@/components/base/Drawer';

export const WorkspaceSettingsDrawer = ({ isOpen, onClose }: WorkspaceDrawerProps) => {
  return (
    <Drawer.Root open={isOpen} onOpenChange={onClose} placement="right">
      <Drawer.Backdrop />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Configurações do Workspace</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <WorkspaceConfigurationForm />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
```

---

# Prop Drilling Absolute Prohibition

Do not pass layout customization properties through multiple intermediate structural component layers.

If a deeply nested sub-component requires access to configuration data or operational callbacks, resolve the contract using:
* React Context initialized at the Compound Component Root level
* Direct layout injection via declarative component composition children slots

---

# Context Sharing inside Compound Patterns

Use specialized localized React Context hooks to share internal interaction states seamlessly across compound slots without exposing leaking parameters to the outer application layout.

```typescript
// PREFERRED - Internal state orchestration blueprint
const [CompoundProvider, useCompoundContext] = createContext<CompoundContextState>({
  name: "CompoundContext",
  errorMessage: "useCompoundContext must be consumed inside a CompoundComponent.Root node",
});
```

---

# Semantic Variant Definitions over Inline Logic

Avoid embedding volatile inline ternary layout switches to mutate structural design tokens based on dynamic states.

Manage alternative presentation configurations by declaring semantic component visual configurations inside design system recipe sheets (`styles/`) or concrete variants files.

```tsx
// FORBIDDEN
<Box bg={isPremium ? "gold.500" : isEnterprise ? "purple.600" : "gray.100"} p={isMobile ? 2 : 4}>
```

```tsx
// PREFERRED
<Box recipe="workspaceCard" variant={tierContext} data-mobile={isMobile}>
```

---

# Mandatory Support for HTML Primitives

Custom primitive foundations and variant wrapper configurations must extend native HTML element bindings correctly.

Ensure that structural container properties propagate style attributes, references (`ref`), and native event listeners via standard REST parameters mapping.

```typescript
// PREFERRED
import { forwardRef } from 'react';
import { Box, HTMLChakraProps } from '@chakra-ui/react';

interface SurfaceProps extends HTMLChakraProps<'div'> {
  elevationTier?: 'low' | 'high';
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ elevationTier = 'low', children, ...restProps }, ref) => {
    return (
      <Box ref={ref} data-elevation={elevationTier} className="gr-surface" {...restProps}>
        {children}
      </Box>
    );
  }
);
```

---

# Sub-Component Export Consistency

Compound sub-elements must be exposed collectively via namespaced object attachments to preserve clean import statements across application features.

```typescript
// PREFERRED - index.ts orchestration entrypoint
import { ModalRoot } from './ModalRoot';
import { ModalContent } from './ModalContent';
import { ModalHeader } from './ModalHeader';

export const Modal = Object.assign(ModalRoot, {
  Content: ModalContent,
  Header: ModalHeader,
});
```

---

# AI Code Generation Blueprint Mandates

The AI architecture generation engine must strictly oppose code tracks that synthesize monolithic components packed with multiple configuration flags.

When instructed to draft interactive overlay UI blocks, layouts, menus, or listings, the engine must construct a modular Compound design scheme following the exact structural slots pattern of Chakra UI v3.

Never compromise composition flexibility to deliver a shorter code string block inside conversations.

---

# Forbidden Component Architecture Patterns Summary

Avoid:
* writing single component declarations that consume more than 2 boolean styling layout flags
* packing independent sub-views behind complex property configuration variables
* inline ternary style property arrays injected into raw foundational layout elements
* breaking composition inheritance trees by omitting standard `children` properties
* hardcoding structural layout elements inside closed, non-extendable component definitions

---

# Preferred Component Characteristics

Prefer code implementations that feel:
* structurally transparent and declaratively modifiable via standard children assembly
* fully aligned with slot-driven design specifications (Chakra v3 architecture style)
* highly decoupled across presentation tiers, style contracts, and domain semantics
* cleanly namespaced for straightforward usage across global feature modules

---

# Final Composition Definition of Done

No user interface view component will pass structural delivery reviews if it relies on multi-flag monolithic configurations instead of strict compound semantic composition layers.

Composition-first engineering ensures premium scalability, robust code generation mechanics, and fluid enterprise UX evolution.