# Product Spec: Direct Policy Overrides (User Permissions Matrix)

## Context & Objective
Renders an explicit security authorization grid mapping single operator roles to discrete application capability flags, allowing granular overrides without changing global roles.

---

## 1. Core Data Contract (Schema Interface)
```typescript
interface PolicyAssignmentPayload {
  targetOperatorId: string;
  enabledCapabilities: string[]; // Array of unique dot-notation scope strings
  overrideJustification: string; // Trimmed audit log explanation text (min 10 characters)
}
```

## 2. Security, RBAC & Network Handshake
* **Required Permission Bound**: `permissions.security.assignment`
* **API Ingress Route**: `PUT /api/v1/iam/policies/sync`
* **Cache Invalidation Lifecycle**: Evicts `['iam', 'users', 'ledger']` and target profile caches to force session token re-generation loops.

## 3. UI/UX Density & Presentation Rules
* **Display Configuration**: A structured density matrix grid utilizing inline switches (`size="sm"`).
* **Isolation Control**: Toggling an authorization capability must trigger localized optimistic state indicators, preserving layout performance by trapping render pipelines inside the row element.
* **Audit Trail Integration**: The matrix footer renders a mandatory justification text input field, disabling global save buttons until the character requirement passes validation.
```