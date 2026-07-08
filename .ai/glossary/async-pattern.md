# Glossary: Asynchronous Network Pattern

## Definition
The architectural decoupling layer managing remote state synchronization, caching, and server mutations across the platform.

## Architectural Rules
* **Cache Isolation**: Orchestrated exclusively via custom feature hooks powered by TanStack Query, isolating fetch routines from layouts.
* **Deterministic Cache Keys**: Strict mapping of query arrays as immutable constant lists (`['ledger'] as const`).
* **Cache Invalidation Loops**: Successful server mutations must trigger explicit, automated cache key invalidations to enforce data correctness.
```