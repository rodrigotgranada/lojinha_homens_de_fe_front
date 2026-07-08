# Product Spec: Alert Routing Configurations (Notification Preferences)

## Context & Objective
Allows operators to configure personalized delivery channels (In-app, Email, Webhook) for explicit system event classifications.

---

## 1. Core Data Contract (Schema Interface)
```typescript
interface NotificationPreferencesPayload {
  infrastructureAlerts: ('in_app' | 'email' | 'webhook')[];
  securityAlerts: ('in_app' | 'email' | 'webhook')[];
  billingAlerts: ('in_app' | 'email' | 'webhook')[];
}
```

## 2. Security, RBAC & Network Handshake
* **Required Permission Bound**: `permissions.notifications.write`
* **API Ingress Route**: `PUT /api/v1/communication/preferences`
* **Cache Invalidation Lifecycle**: Flushes local preferences query keys upon verification loops completing.

## 3. UI/UX Density & Presentation Rules
* **Form Architecture Model**: Implements React Hook Form uncontrolled matrices mapped with custom switch arrays (`size="sm"`).
* **Interactive Control Guards**: Disable saving actions until changes are detected against the initial query hydration model.
```