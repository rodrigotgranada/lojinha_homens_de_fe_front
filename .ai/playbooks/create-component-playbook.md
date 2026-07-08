# Playbook: Engineering Standard Platform Interface Components

This playbook outlines the deterministic step-by-step workflow for creating, styling, and finalizing a presentational layout or UI block.

---

## Phase 1: Classification & Core Target Bounds
1. **Domain Boundary Review**: Determine if the component handles specific product schemas. If yes, bind it to its parent module components repository. If agnostic, position it inside `src/components/base/`.
2. **File Blueprint Setup**: Initialize the file naming convention using strict PascalCase notation (e.g., `GatewayTelemetryCard.tsx`).

## Phase 2: Interface Modeling & React 19 Standard Hooking
1. **Extend Native Props**: Ingest standard typing objects via Chakra UI v3 primitives (`HTMLChakraProps<'div'>`).
2. **React 19 Ref Extraction**: Accept the standard `ref` argument directly inside the functional input properties list. Do not import or execute legacy `forwardRef` blocks.

## Phase 3: Composable Slot Styling Implementation
1. **Apply Composition API**: Build layout maps using Chakra UI v3 composable sub-elements and slot trees (e.g., `Card.Header`, `Card.Body`). Avoid passing flat monolithic configuration arrays.
2. **Incorporate Anchor Classnames**: Embed explicit structural identifying selectors (`className="gr-approved-[hyphenated-name]"`) to supply perfect context markers for AI scraper engines.
3. **Identity Verification Assignment**: Hardcode the mandatory identity metadata field tracking string via `ComponentIdentity.displayName = 'ComponentIdentity'` at the bottom border of the file.

## Phase 4: Quality Control Automation Check
1. Audit the finalized component layout strictly against the criteria inside `component-checklist.md`.
2. Verify visual flexibility across the responsive object breakpoints (`base`, `md`, `lg`).
```