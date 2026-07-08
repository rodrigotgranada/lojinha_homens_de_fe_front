# Architecture Decision Record: 003 - Semantic Components and Layout Segregation

## Status
Approved

## Context
When engineering high-density enterprise SaaS platforms, developers often confuse generic UI library primitives with domain-specific interface blocks. This lack of distinction leads to files where foundational UI atoms (like customized buttons, badges, or input boxes) are heavily coupled with specific backend database models and business schemas. 

As a result, generic components lose their reusability, and layout files become brittle. Any minor update to a database field structure can break global layout states. 

Furthermore, AI models often struggle to differentiate between a generic container and a specific business feature component (e.g., a card displaying account metrics). Without explicit rules separating these layers, AI engines tend to generate highly coupled, un-testable, and rigid components that break when layout requirements change.

## Decision
We officially establish a strict architectural boundary separating **Foundational Design Primitives** from **Semantic Presentation Components**. 

* **Foundational Primitives (`src/components/base/` or `src/components/ui/`)**: These are completely domain-agnostic, generic UI atoms and layout components (e.g., `Button`, `Dialog`, `TableScrollArea`, `SkeletonRoot`). They have no knowledge of business entities like "Users", "Invoices", or "Gateways". They communicate exclusively through standard HTML types and primitive TypeScript parameters (`string`, `number`, `boolean`).
* **Semantic Components (`src/features/[feature]/components/`)**: These are domain-aware, feature-specific visual layouts (e.g., `ProjectActiveList`, `BillingInvoiceCard`, `UserManagementGrid`). They understand business entities and are named directly after the specific feature they represent. However, they must act as **passive, logic-less viewlayers**, using pure foundational primitives to construct the layout.

### Architectural Composition Blueprint
```tsx
// CORRECT - Passive Semantic Component composing generic Foundation Primitives
import { Box, Heading, Text, Badge, Icon } from '@chakra-ui/react';
import { StatusCard } from '@/components/base/StatusCard'; // Foundation Primitive
import { ShieldAlertIcon } from '@/assets/icons';
import { VulnerabilityPayload } from '../types'; // Scoped Domain Type

interface SecurityAlertBannerProps {
  // Binds explicitly to a typed business domain model object
  payload: VulnerabilityPayload;
}

export const SecurityAlertBanner = ({ payload }: SecurityAlertBannerProps) => {
  return (
    <StatusCard variant="critical" className="gr-security-banner">
      <StatusCard.Header>
        <StatusCard.Title>
          <Icon as={ShieldAlertIcon} color="red.500" mr={2} inline />
          {payload.vulnerabilityName}
        </StatusCard.Title>
        <Badge colorPalette="red" variant="solid">{payload.severityLevel}</Badge>
      </StatusCard.Header>
      
      <StatusCard.Body>
        {payload.remediationDescription}
      </StatusCard.Body>
    </StatusCard>
  );
};
```

### Strict Implementation Rules
1. **Zero-Logic Presentation**: Semantic Components must never initiate raw network fetches (`fetch`, `axios`), manage core business mutations, or implement complex calculation formulas. They receive pre-processed, clean data from custom hooks or domain selectors and map it directly to layout primitives.
2. **Strict Domain-Driven Naming**: Component files inside feature directories must be named clearly after the business entities they map (e.g., `TenantQuotaProgress.tsx` instead of `GenericProgressBarWrapper.tsx`).
3. **No Database Structures in Base**: Foundational primitive components are strictly banned from importing types, enums, or payload contracts from feature directories.

## Consequences

### Positive Impacts
* **Clean Separation of Concerns**: Foundational primitive UI files remain highly stable, allowing changes to business requirements to be handled entirely within the feature layers.
* **Streamlined UI Theme Migration**: Upgrading the design library, changing styling properties, or updating core layout values can be done globally within the `/components/base/` folder without touching feature code.
* **Enhanced AI Generation Target Paths**: By separating generic components from semantic layouts, AI code generation engines can easily find where to apply style tokens versus where to map backend database contracts, preventing AI-generated layout drift.

### Negative Impacts / Trade-offs
* **Increased Component Volume**: Separating components into foundational atoms and semantic feature layouts naturally increases the number of small files across the codebase.
* **Stricter Prop Mapping**: Requires developers to map backend API objects explicitly to semantic components, rather than passing database payloads directly into low-level buttons or input tags.

---

## AI Code Generation Constraints
The AI code generator must never insert domain logic, API configurations, or feature-specific typings directly into files located in `src/components/base/`. When generating dashboard widgets, profile cards, user tables, or settings pages inside feature paths, the agent must compose existing base components cleanly. If a required foundational element does not exist, the agent must build it as a generic primitive in the base directory first, before using it within the semantic feature layout.
```