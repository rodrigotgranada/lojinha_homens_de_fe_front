# Playbook: Orchestrating High-Density Analytics Dashboards

This playbook guides the systematic structure and data connection of premium workspace dashboards and telemetry analytics layout views.

---

## Phase 1: Grid Layout Preparation
1. **Responsive Scaffolding**: Setup the structural container layer using Chakra UI v3 `<SimpleGrid>` or `<Grid>`.
2. **Mobile-First Footprint**: Define column counts starting from 1 column on `base` viewports, scaling up additively to 3 or 4 columns on large desktop frames.

## Phase 2: Computational Isolation (Selectors)
1. **No Math In JSX**: Extract multi-array operations, filtering systems, percentages, and string mutations out of the visual code path.
2. **Pure Utility Pipeline**: Route calculations through clean, immutable transformer selectors (`selectors/`). Pass pure primitives down to visual card nodes.

## Phase 3: Component Slot Ingestion
1. **High Density Configuration**: Deploy layout nodes utilizing compact sizes (`size="sm"` or `size="xs"`) via the compound card pattern.
2. **Telemetry Standardization**: Enforce monospace formatting (`fontFamily="mono"`) on numeric integers and currency updates.

## Phase 4: Telemetry Synchronization Checks
1. Verify loading boundaries using progressive skeletons during deep network latency shifts.
2. Confirm layout behaviors comply with the operational criteria within `ux-checklist.md`.
```