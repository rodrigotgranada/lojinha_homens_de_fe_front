# Product Spec: Workspace Executive Overview (Dashboard Home)

## Context & Objective
Provides a consolidated landing viewport aggregating real-time infrastructure telemetry, active operator counts, and financial standing for the tenant space.

---

## 1. Core Data Contract (Schema Interface)
```typescript
interface WorkspaceSummaryPayload {
  activeNodesCount: number;      // Total live proxy endpoints
  monthlyApiInvocations: number; // Aggregate traffic count for the billing cycle
  computeUtilizationCpu: number; // Percentage expression (0 to 100)
  currentBillingAccruedCents: number; // Financial accumulation tracking
}
```

## 2. Security, RBAC & Network Handshake
* **Required Permission Bound**: `permissions.dashboard.view`
* **API Ingress Route**: `GET /api/v1/telemetry/summary`
* **Query Cache Key Anchor**: `['telemetry', 'summary', 'overview'] as const`

## 3. UI/UX Density & Presentation Rules
* **Layout Recipe Target**: Adhere strictly to the design instructions inside `recipes/create-async-flow.md`.
* **Density Scale**: Enforce compact token allocations (`size="sm"`), packing all executive indicator grids above the primary folder viewport fold.
* **Typography Constraints**: Numeric counters, currency metrics, and percentages enforce monospace family mappings (`fontFamily="mono"`).
```