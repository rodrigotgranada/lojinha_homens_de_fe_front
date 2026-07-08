# Generator: Feature Directory Scaffolding

Use this blueprint configuration model whenever instructed to instantiate, register, or scaffold an entire new isolated module or functional domain from scratch.

---

## Target Directory Layout Matrix
Whenever a new feature name (e.g., `billing`) is requested, the engine must spin up this exact structural encapsulation tree inside `src/features/[feature-name]/`:

```
src/features/[feature-name]/
├── components/          # Shared presentational UI elements
├── hooks/               # Domain-specific custom hooks (queries/mutations)
├── services/            # Isolated API network endpoint contracts
├── types/               # Strong TypeScript interface definitions
└── index.ts             # Public API gatekeeper file
```

## Gatekeeper Configuration Template (`index.ts`)
Every directory initialization must conclude by deploying an explicit public gateway firewall contract file exactly like this:

```typescript
/**
 * Public API Gateway Contract for the [FEATURE_NAME] Domain Module.
 * Only explicitly exported items are consumable by adjacent workspace paths.
 */

// Export Primary Semantic Presentation Shells
export { default as [FEATURE_NAME]WorkspacePage } from './components/[FEATURE_NAME]WorkspacePage';
export { [FEATURE_NAME]ManagementGrid } from './components/[FEATURE_NAME]ManagementGrid';

// Export Remote State Orchestration Hooks
export { useGet[FEATURE_NAME]Query } from './hooks/useGet[FEATURE_NAME]Query';
export { useModify[FEATURE_NAME]Mutation } from './hooks/useModify[FEATURE_NAME]Mutation';

// Export Strong Interface Models
export type { [FEATURE_NAME]PayloadInterface } from './types';
```

---

## Execution Protocol Instructions
The AI agent is strictly forbidden from dumping loose files across raw root paths. If a feature request is made, verify directory existence, scaffold all five sub-nodes immediately, and lock down access routing rules through the public gatekeeper.
```