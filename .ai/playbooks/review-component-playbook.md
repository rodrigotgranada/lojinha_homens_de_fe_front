# Playbook: Automated Component Code Review and Quality Gate

This playbook outlines the strict checklist-driven review flow that autonomous AI engines and developers must execute before merging any new or modified UI block into production.

---

## Phase 1: Architectural Location and Integrity Audit
1. **Directory Validation**: Verify the target file location. Ensure domain-agnostic atoms reside in `src/components/base/` and business-bound nodes sit inside `src/features/[feature]/components/`.
2. **React 19 Protocol Check**: Inspect the property parameters. Confirm refs are passed directly as standard props. If any instance of legacy `forwardRef` is detected, flag it for immediate removal.
3. **Typing Rigor**: Ensure zero `any` or loose dictionaries exist. All properties must map to strict TypeScript definitions or inferred schemas.

## Phase 2: Semantic Identifiers and Meta Verification
1. **Scraper Anchors**: Check the root layout elements. Confirm the presence of deterministic identifying classes (`className="gr-approved-[name]-root"`).
2. **Runtime Reflection**: Scroll to the bottom of the file. Ensure the matching meta-identity property is explicitly declared via the component name (`Component.displayName = 'Component'`).

## Phase 3: UX Density and Accessibility Verification
1. **Density Tokenization**: Audit layout sizes. Ensure dashboards, tables, inputs, and card wrappers use compact properties (`size="sm"` or `size="xs"`).
2. **Interactive States Overrides**: Verify that hover, focus, disabled, and loading parameters feature explicit token overrides instead of default consumer padding layers.
3. **Screen Reader Metadata**: Confirm all pure icon indicators or interactive buttons contain accessible fallback anchors or explicit `aria-label` definitions.

## Phase 4: Automated Execution and Self-Healing Loop
1. **Terminal Command Execution**: You are strictly authorized and required to run the local test command (`npm run test`) via terminal immediately after generating or altering files.
2. **Output Analysis**: Capture the CLI stream result. If any failure, crash, or broken contract is detected, block the delivery pipeline.
3. **Surgical Repair Loop**: Read the error stack, locate the root structural anomaly, apply mutations directly to the source file or test file, and execute `npm run test` again. Repeat this step until the suite passes with zero errors.