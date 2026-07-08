# Architecture Decision Record: 002 - Chakra UI v3 Composition API Adoption

## Status
Approved

## Context
In previous design systems and legacy versions of Chakra UI (v2), components were built using a monolithic configuration pattern. Visual components encapsulated layout, controls, states, and content mapping behind opaque, top-level property objects (e.g., `<Menu isOpen={isOpen} onClose={handleClose} items={menuItemsArray} />`). 

As an enterprise SaaS system grows, this design creates significant architectural decay, commonly known as **Prop Hell**. Adding a simple design requirement—such as adding a badge, changing an icon orientation, or adjusting margin tokens in a single menu element—forces developers to add new boolean variables and structural flags to the root primitive configuration. This makes component files verbose and difficult for developers and AI code generation engines to interpret cleanly.

Moreover, the training data for many AI systems is saturated with legacy Chakra UI v2 implementations. Left unguided, AI tools will frequently attempt to generate outdated, non-functional monolithic markup that breaks when compiled against modern design libraries.

## Decision
We officially mandate the exclusive use of the **Chakra UI v3 Composition (Slot-Based) API** across all visual layers of the platform. All primitive design components, structural overlays, form containers, and interactive elements must be constructed using explicit sub-component composition trees instead of closed prop configurations.

### Structural Composition Blueprint
```tsx
// CORRECT - Composable sub-component slots (Chakra UI v3 Standard)
import { Menu } from '@chakra-ui/react';

export const UserNavigationMenu = () => {
  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <button className="gr-menu-trigger-button">Account Settings</button>
      </Menu.Trigger>
      
      <Menu.Positioner>
        <Menu.Content bg="bg.surface" borderColor="border.subtle">
          <Menu.Item value="profile" cursor="pointer">
            <UserIcon /> Profile Workspace
          </Menu.Item>
          <Menu.Item value="billing" cursor="pointer">
            <BillingIcon /> Subscription Ledger
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
```

### Strict Implementation Rules
1. **Ban on Monolithic Prop Configuration**: Creating or exporting custom design wrappers that pass text descriptions, array lists, or icon names through configuration properties to alter component layouts is strictly prohibited.
2. **Mandatory Slot Exposure**: All composite primitives (e.g., custom data tables, card grids, wizard wrappers) must expose inner elements via explicit sub-component slotting namespaces (e.g., `Card.Header`, `Card.Body`, `Card.Footer`) using the `Object.assign` mapping pattern.
3. **Compound Theme & Token Integration**: Sub-components must inherit configurations transparently from the master context tree, allowing modifications to propagate seamlessly across light, dark, and multi-tenant viewport themes.

## Consequences

### Positive Impacts
* **Infinite Visual Flexibility**: UI layout developers can reorganize internal tags, inject custom badges, change layout alignments, and refactor code without modifying core design files.
* **Elimination of Prop Drilling**: State synchronization (such as tracking open/closed states or tracking active field borders) is handled natively by the context engine inside the component tree, removing the need for manual prop propagation.
* **AI Generative Precision**: By defining explicit, semantic slot names (`Menu.Trigger`, `Menu.Content`), AI tools can scan code layout coordinates easily, significantly improving generation accuracy and eliminating visual bugs.

### Negative Impacts / Trade-offs
* **Increased Initial Verbosity**: Structural component layouts require more lines of declarative code than primitive monolithic abstractions.
* **Learning Curve Overhead**: Requires developers to follow strict compound component design patterns, moving away from simple single-tag implementations.

---

## AI Code Generation Constraints
The AI code generator must never emit design elements using legacy configuration props or flat wrappers. Whenever instructed to generate layout wrappers, dropdown boxes, navigation bars, modal dialogs, or data cards, the agent must use the Chakra UI v3 slot layout architecture. If the agent detects legacy properties (such as `isOpen`, `onClose`, or `items={...}`) inside user prompts, it must automatically refactor those structures into clean, composable compound layouts.
```