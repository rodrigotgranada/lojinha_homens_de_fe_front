# Glossary: Semantic Component (Domain Presenter)

## Definition
A domain-aware interface element positioned strictly within a local feature directory (`src/features/[feature]/components/`).

## Architectural Rules
* **Schema Coupling**: It is explicitly bound to business models, mapping domain schemas directly to user viewports.
* **Composition Standard**: It encapsulates multiple **Foundation Components** into an explicit layout layout without containing complex local state machinery.
* **Examples**: `TenantBillingRow`, `GatewayCredentialCard`, `UserStatusBadge`.
```