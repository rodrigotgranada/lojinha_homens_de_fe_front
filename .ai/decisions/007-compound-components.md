# Architecture Decision Record: 007 - Compound Component Pattern via Namespace Assignment

## Status
Approved

## Context
When engineering complex, multi-part interface structures (such as custom data metrics cards, dashboard analytical widgets, or multi-step configuration panels), developers often split them into multiple independent files (e.g., `WidgetHeader.tsx`, `WidgetBody.tsx`, `WidgetFooter.tsx`). While this splits long lines of code, it introduces significant folder clutter, pollutes the global import namespace, and makes individual pieces fragile when separated.

Without a strict structural relationship, developers can easily misplace components, misconfigure layout alignments, or use the wrong child wrappers inside parents. 

For AI coding tools (such as Cursor, Windsurf, or Antigravity), loose sub-components are highly problematic. When an AI agent scans a file system, it cannot easily infer that `MetricHeader.tsx` is strictly coupled with `MetricCard.tsx`. This missing relationship causes the AI to hallucinate layout configurations, inject incompatible property states, or hallucinate non-existent wrappers, breaking code consistency.

## Decision
We officially mandate the **Compound Component Pattern** implemented through explicit JavaScript namespace encapsulation using `Object.assign` for all multi-part domain and semantic components. All related sub-components must be bound directly to the root component's identity namespace, ensuring they are imported and utilized as a single, cohesive unit.

### Structural Namespace Blueprint
```tsx
// CORRECT - Self-contained structural mapping via Object.assign
import { Box, Flex, Heading, HTMLChakraProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

// 1. Root Implementation Shell
interface MetricsWidgetRootProps extends HTMLChakraProps<'div'> {
  children: ReactNode;
}

const MetricsWidgetRoot = ({ children, ...props }: MetricsWidgetRootProps) => {
  return (
    <Box p={5} bg="bg.surface" borderRadius="lg" border="1px solid" borderColor="border.subtle" {...props}>
      {children}
    </Box>
  );
};

// 2. Bound Sub-Component Slots
const MetricsWidgetHeader = ({ children, ...props }: HTMLChakraProps<'div'>) => (
  <Flex justify="space-between" align="center" mb={3} {...props}>
    {children}
  </Flex>
);

const MetricsWidgetBody = ({ children, ...props }: HTMLChakraProps<'div'>) => (
  <Box py={2} {...props}>
    {children}
  </Box>
);

// 3. Unified Namespace Namespace Assignment
export const MetricsWidget = Object.assign(MetricsWidgetRoot, {
  Header: MetricsWidgetHeader,
  Body: MetricsWidgetBody,
});

// 4. Explicit Component Identity Mapping for React DevTools and AI Parsers
MetricsWidgetRoot.displayName = 'MetricsWidget.Root';
MetricsWidgetHeader.displayName = 'MetricsWidget.Header';
MetricsWidgetBody.displayName = 'MetricsWidget.Body';
```

### Strict Implementation Rules
1. **Ban on Flat Sub-Component Exports**: Exporting detached sub-components globally from a file (e.g., `export const DashboardCardHeader = ...`) to build an explicit multi-part element is prohibited. All children must be accessed through the parent's dot-notation namespace (e.g., `<MetricsWidget.Header>`).
2. **Mandatory DisplayName Reflection**: Every sub-component attached via namespace assignment must explicitly define its matching string identifier metadata property (e.g., `Component.Header.displayName = 'Component.Header'`). This preserves clean stack traces during runtime tracking and ensures AI parsers map composition patterns accurately.
3. **Internal State Context Isolation**: If a compound component requires internal state synchronization (such as tracking active indices or managing open/close switches), it must use an isolated React Context Provider wrapped safely inside the root layout element. This state must never leak into global application scopes.

## Consequences

### Positive Impacts
* **Clean Global Import Ecosystem**: Decreases file system clutter by allowing developers to import a single structural parent element, which automatically gives them access to all internal child slots.
  * **Unified Usage**: `import { MetricsWidget } from '@/features/analytics';`
* **Self-Documenting Code Context**: The syntax itself defines how the components must be structured (e.g., a developer or AI can immediately see that `<MetricsWidget.Header>` belongs strictly inside a `<MetricsWidget>`).
* **Optimized AI Context Interpretation**: AI layout generators can easily read and use compound patterns because the complete structural setup is mapped clearly in a single file or an explicit index gate. This completely removes layout nesting bugs.

### Negative Impacts / Trade-offs
* **Increased Single-File Complexity**: Grouping multiple layout sub-components into a single file can make that specific file long if the internal components require significant styling.
* **Handoff Friction with `asChild` Primitives**: Requires careful coordination when nesting compound components within complex, ref-forwarding third-party UI primitives.

---

## AI Code Generation Constraints
The AI engine must never generate unstructured, floating sub-components when instructed to build multi-part UI blocks, semantic card containers, or detailed layout wrappers. The agent must enforce the compound pattern using `Object.assign`, attach explicit `displayName` properties onto every child tier, and ensure the entire composition is exposed cleanly under a single parent namespace import.
```