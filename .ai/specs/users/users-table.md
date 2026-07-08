# Product Spec: Advanced Users Ledger (Table View)

## Context & Objective
This view serves as the primary administrative command deck for managing identity operations inside the active tenant. It handles bulk data operations, user lifecycle status transitions, and role inspection pipelines.

---

## 1. Comprehensive Data Contract (Schema Interface)
```typescript
interface UserAccountPayload {
  id: string;              // Secure cryptographic UUIDv4 identifier
  fullName: string;        // Sanity trimmed string (max 100 characters)
  emailAddress: string;    // Enforced lowercase unique index credential
  assignedRole: 'owner' | 'administrator' | 'operator'; 
  accountStatus: 'active' | 'suspended' | 'invitation_pending';
  joinedAtTimestamp: string; // ISO 8601 UTC representation (YYYY-MM-DDTHH:mm:ssZ)
  lastActiveAt: string | null; // Monospace tracking string for telemetry audits
}
```

## 2. Security, RBAC & Network Handshake
* **Required Permission Bound**: `permissions.users.read`
* **API Ingress Route**: `GET /api/v1/iam/users`
* **Query Cache Key Anchor**: `['iam', 'users', 'ledger'] as const`
* **Cache Eviction Dependencies**: Actions triggered by deletion modals, status updates, or invitations automatically flush this specific cache array.

## 3. UI/UX Density & Presentation Rules
* **Layout Recipe Target**: Adhere strictly to the blueprint inside `recipes/create-table.md`.
* **Density Scale**: Force the most compact variable token (`size="sm"`), maximizing viewport data scanning efficiency.
* **Typography Constraints**: All emails, database hashes, and date elements enforce monospace structures (`fontFamily="mono"`).
* **Multi-Select Capability**: The first column maps a row selection checkbox (`size="sm"`), unlocking bulk action toolbars upon activation.

## 4. Column Alignment & Formatting Matrix
| Column Name | Data Property | UI Alignment | Typography Type | Component Type |
| :--- | :--- | :--- | :--- | :--- |
| Selection | Checkbox | Center | System Base | Chakra Checkbox |
| Operator Name | `fullName` | Left | Standard Sans | High Contrast Text |
| Email Address | `emailAddress` | Left | Monospace | Secondary Muted Text |
| Security Role | `assignedRole` | Center | Badge Pill | Subtle Color Palette |
| Account Status | `accountStatus` | Center | Badge Pill | Solid/Subtle Status Pill |
| Last Activity | `lastActiveAt` | Right | Monospace | Relative Time String |
| Actions Menu | Context Row | Right | Control Node | Ghost IconButton Dropdown |
```