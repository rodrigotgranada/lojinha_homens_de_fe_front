# Product Spec: Audit Trail Stream (Activity Feed Widget)

## Context & Objective
Renders a chronological, live-updating stream of operational mutations executed across the organization workspace for administrative tracing.

---

## 1. Core Data Contract (Schema Interface)
```typescript
interface AuditLogEventPayload {
  id: string;                  // Unique log record database hash
  actorName: string;           // Operator account name triggering the change
  actionDescription: string;   // Clean system mutation description text
  severityLevel: 'info' | 'warning' | 'security_alert';
  recordedAtTimestamp: string; // ISO 8601 representation
}
```

## 2. Security, RBAC & Network Handshake
* **Required Permission Bound**: `permissions.logs.read`
* **API Ingress Route**: `GET /api/v1/iam/audit-trail`
* **Query Cache Key Anchor**: `['iam', 'audit', 'stream'] as const`

## 3. UI/UX Density & Presentation Rules
* **Visual Presentation**: High density vertical list stack omitting external margins, utilizing thin dividing grid boundaries.
* **Severity Color Mapping**:
  * `info` -> Text muted styling (`color="fg.muted"`)
  * `warning` -> Golden warning alerts (`color="amber.solid"`)
  * `security_alert` -> High contrast crimson warnings (`color="red.solid"`)
* **Text Containment**: Apply ellipsis variables (`truncate`) onto description strings on mobile viewports.
```