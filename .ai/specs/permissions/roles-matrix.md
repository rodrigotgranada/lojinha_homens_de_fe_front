# Product Spec: Global Access Policy Association (RBAC Overview)

## Context & Objective
Provides an immutable global overview system mapping default system access roles to application capability boundaries across the tenant ecosystem.

---

## 1. Core Data Contract (Schema Interface)
```typescript
interface RoleMatrixPayload {
  systemRoles: {
    roleIdentifier: 'owner' | 'administrator' | 'operator';
    inheritedFrom: string | null; // Explains structural hierarchy paths
    associatedCapabilitiesList: string[]; // Global array of capability identifiers
  }[];
}
```

## 2. Security, RBAC & Network Handshake
* **Required Permission Bound**: `permissions.rbac.view`
* **API Ingress Route**: `GET /api/v1/iam/roles/matrix`
* **Query Cache Key Anchor**: `['iam', 'rbac', 'matrix'] as const`

## 3. UI/UX Density & Presentation Rules
* **Layout Design**: Compact horizontal grid comparison matrix mapping resource capabilities vertically against functional role tiers.
* **Visual Density**: Enforces micro variables (`size="xs"`), packing complex privilege layers within a single non-scrolling workspace fold.
* **Interactive Behavior**: This view functions strictly as an unalterable system template read-only panel, directing configuration changes to custom groups.
```