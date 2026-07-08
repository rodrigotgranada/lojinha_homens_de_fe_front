# Engineering Review: Next.js 15 App Router Architecture Contract

## 1. Boundary & Network Layering
* **Compiler Context Scoping**: Verify that files containing state hooks, modal switches, or input registries declare the `"use client"` compiler directive correctly.
* **Decoupled Data Handshakes**: Confirm that presentational layouts do not execute raw Axios or Fetch instances, routing operations through custom query hooks.
* **Cross-Domain Crossings**: Ensure feature components communicate with adjacent modules exclusively through public index gatekeepers (`src/features/[module]/index.ts`).

## 2. Remote State & Cache Control
* **Immutable Cache Registries**: Check that query arrays reference fixed read-only constant objects, preventing key string mutation anomalies.
* **Dynamic Query Dependencies**: Verify that active filters, pagination shifts, and workspace switches append directly to cache array dependencies.
* **Cache Eviction Handshakes**: Ensure server mutations call explicit queries invalidation pipelines upon completing database updates.
```