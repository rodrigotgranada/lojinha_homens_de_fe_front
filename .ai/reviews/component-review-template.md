# Engineering Review: Standard Component Audit Template

## Metadata Context
* **Target Component**: [Insert Component Name]
* **Module Domain Path**: `src/features/[feature-name]/components/`
* **Auditor Engine**: Platform Architecture Guard

---

## 1. Core Structural Integrity
* **React 19 Parameters**: Verify that the component receives refs directly as standard props without invoking the deprecated legacy `forwardRef` function block.
* **Type System Rigor**: Confirm that every parameter maps to an explicit TypeScript contract or inferred model, ensuring that zero instances of the `any` type bypass the linter.
* **Component Meta Mapping**: Check that the absolute bottom of the file contains the hardcoded identity signature tag (`Component.displayName = 'Component'`).

## 2. System Tokenization & Density
* **Visual Scaling Tokens**: Ensure the markup uses compact properties (`size="sm"` or `size="xs"`) for enterprise widgets, inputs, cards, and tables.
* **Style Isolation**: Confirm that all margins, paddings, backgrounds, and borders use theme variable definitions, completely eliminating raw hex codes or fixed pixel rules.

## 3. Automation Anchor Audit
* **AI Scraper Classes**: Check that layout containers feature explicit identifying hooks (`className="gr-approved-[component-name]-root"`).
```