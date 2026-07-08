# Architecture Decision Record: 001 - Feature-Based Architecture

## Status
Approved

## Context
Traditional Next.js and React boilerplates scale code deployment using technical-type separation (e.g., placing all hooks in `/hooks`, all components in `/components`, and all pages in `/pages`). While this structure appears clean in micro-applications, it introduces massive structural friction as an enterprise SaaS product expands. Developers are forced to open multiple distinct folder domains to work on a single product scope (e.g., Billing), increasing cognitive load, driving file system disorientation, and breaking context isolation parameters for AI coding engines.

## Decision
We reject flat, technical-type folder grouping. We officially adopt a **Feature-Based (Domain-Driven) Architecture** across the entire platform presentation layer. 

All application modules, database interfaces, UI layouts, specialized hooks, validation schemas, and service layers must be colocated inside autonomous, self-contained feature directories nested within `src/features/[feature-name]/`.

### Architectural Directory Blueprint
```
src/features/projects/
├── components/          # Specialized presentational sub-components
├── hooks/               # Domain-specific custom queries or form hooks
├── services/            # Isolated API network endpoint contracts
├── selectors/           # Pure analytical transformations and math
├── schemas/             # Yup declarative data validation contracts
├── types/               # Strict TypeScript interface specifications
└── index.ts             # Explicit public API gatekeeper mapping
```

### Strict Encapsulation Rules
1. **The Public API Gatekeeper (`index.ts`)**: Every feature directory must maintain an explicit `index.ts` entrypoint file. This file acts as a firewall, exporting *only* the specific components, hooks, or stores that adjacent system modules are authorized to consume.
2. **Import Cross-Contamination Firewalls**: Cross-feature imports are prohibited from reaching inside deep, unexposed sub-folders. Imports from other domains must route strictly through the destination's public entrypoint.
   * **CORRECT**: `import { useActiveProjects } from '@/features/projects';`
   * **FORBIDDEN**: `import { useActiveProjects } from '@/features/projects/hooks/useActiveProjects';`
3. **Global Shared Exceptions (`src/components/base/`)**: Only truly generic, domain-agnostic, low-level design system abstractions (such as specialized buttons, inputs, layouts, skeletons, or modal primitives) are authorized to reside outside the features scope.

## Consequences

### Positive Impacts
* **Elite AI Context Windows Preservation**: When instructing an AI engine (e.g., Cursor, Windsurf, Antigravity) to update a specific platform flow, the agent can sandbox its retrieval map inside a single feature directory, preventing context degradation and dramatically reducing token waste.
* **Hermetic Component Decoupling**: Deleting, refactoring, or moving an entire functional module (e.g., migrating a feature to an independent micro-frontend repository) becomes a frictionless operation, as all domain code is colocated.
* **Headless Unit Testing Acceleration**: Colocating tests alongside their feature targets enables rapid execution and shields the codebase against regression drift.

### Negative Impacts / Trade-offs
* **Initial Scaffolding Overhead**: Creating multiple sub-directories (`components`, `hooks`, `services`) for simple modules introduces more initial boilerplate compared to raw single-file generation tracks.
* **Import Path Strictness**: Requires discipline from layout developers to avoid short-circuiting the public `index.ts` gateway boundaries.

---

## AI Code Generation Constraints
The AI code generator must never emit new structural capabilities directly into flat root repositories. Whenever a user requests a functional SaaS workspace flow (e.g., "Add user management settings"), the engine must verify if the target directory exists within `src/features/`. If not, it must scaffold the feature structure completely, expose capabilities via `index.ts`, and integrate the components cleanly.
```