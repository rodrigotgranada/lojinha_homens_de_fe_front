# Product Spec: Plan Ingestion Panels (Subscription Cards View)

## Context & Objective
Displays corporate software utility packages, usage limits, and active entitlement validation matrices for customer selection.

---

## 1. Core Data Contract (Schema Interface)
```typescript
interface SubscriptionTierPayload {
  tierId: string;
  tierName: string;
  monthlyPriceCents: number;   // Stored in integers to avoid float anomalies
  allocatedQuotaTokens: number;
  isCurrentlyActive: boolean;
}
```

## 2. Security, RBAC & Network Handshake
* **Required Permission Bound**: `permissions.billing.manage`
* **API Ingress Route**: `GET /api/v1/finance/tiers`
* **Checkout Session Ingress**: `POST /api/v1/finance/checkout/session`

## 3. UI/UX Density & Presentation Rules
* **Visual Presentation**: High contrast side-by-side card segments showcasing pricing attributes using tight tracking numbers.
* **Typography Constraints**: Price amounts and threshold quotas enforce monospace formatting rules (`fontFamily="mono"`).
* **Active State Mapping**: The active selected card applies a bold borders token (`border="2px solid"` with `borderColor="brand.solid"`).
```