# Granada Anti-Patterns: Inconsistent Component Compositions

This document defines the official refactoring standards, practical engineering counter-examples, architectural rules, and composition guidelines to eradicate the anti-pattern of Inconsistent Components (Inconsistent and Monolithic Component Compositions) across the platform.

Building monolithic, non-standard visual abstractions that bypass the design system primitives or create custom non-composable HTML structures is treated as a critical architectural failure.

The goal of this document is not simply enforcing visual styling guidelines.

The goal is to eliminate:
* prop explosion (Prop Hell) where visual variations are controlled via endless layout boolean flags
* design token fractures caused by hardcoded inline pixel overrides and local CSS hacks
* breakages in theme inheritance that isolate custom abstractions from native dark/light mode syncing
* high structural rigidity that prevents developers from reorganizing or adding slots to layouts dynamically
* duplication of fundamental component engineering patterns (e.g., focus rings, overlays, aria states)
* AI-generated layout structures that recreate existing primitives instead of composing them cleanly

All presentation abstractions must strictly extend the Chakra UI v3 Composition API and align with the established platform naming conventions.

---

# The Anatomy of the Anti-Pattern

The inconsistent component anti-pattern manifests when a developer wraps core UI primitives into a rigid, non-composable custom layout module that handles visual layout, iconography, text sizes, and actions entirely through top-level configuration properties.

In modern frontend platform engineering, building closed monolithic UI blocks destroys design system consistency. 

When a component fails to expose its internal slots via standard sub-component composition, any future layout adjustments (e.g., changing the position of an icon, adding a badge, or applying an explicit margin token) force developers to append another configuration prop to the source codebase, leading to architectural decay.

Avoid creating tightly coupled, single-purpose wrappers that encapsulate presentation variants behind opaque parameters.

---

# Forbidden Scenario (The Rigid Monolithic Wrapper)

The code block below exemplifies the absolute anti-pattern: an data asset component that hardcodes internal margins, handles theme variations using local ternary parameters, and locks structural content behind rigid prop flags.

```tsx
// FORBIDDEN - Prop hell, hardcoded spacing tokens, and zero composition flexibility
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { WarningIcon, CheckIcon } from '@assets/icons';

interface CustomStatusCardProps {
  title: string;
  description: string;
  statusType: 'success' | 'warning' | 'critical';
  hasActionButton?: boolean;
  onActionClick?: () => void;
  customHeaderColor?: string; // Dangerous inline style leak
}

export const CustomStatusCard = ({
  title,
  description,
  statusType,
  hasActionButton = false,
  onActionClick,
  customHeaderColor
}: CustomStatusCardProps) => {
  // Architectural Degradation: Hardcoded theme switching bypassing design tokens
  const cardBg = statusType === 'success' ? '#E6F4EA' : statusType === 'warning' ? '#FEF7E0' : '#FCE8E6';
  const iconAsset = statusType === 'success' ? CheckIcon : WarningIcon;

  return (
    <Box p="24px" bg={cardBg} borderRadius="8px" border="1px solid #DADCE0">
      <Flex align="center" mb="12px">
        <Icon as={iconAsset} color={customHeaderColor || "blue.500"} mr="8px" />
        <Text fontSize="16px" fontWeight="600" color="#202124">{title}</Text>
      </Flex>
      <Text fontSize="14px" color="#5F6368" mb="16px">{description}</Text>
      
      {/* Structural Rigidity: Trapped conditional action layout block */}
      {hasActionButton && (
        <Box 
          as="button" 
          onClick={onActionClick}
          style={{ padding: '8px 16px', background: '#1A73E8', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Executar Ação
        </Box>
      )}
    </Box>
  );
};
```

---

# Code Degradation Analysis

The `CustomStatusCard` abstraction introducing severe technical debt into the user interface layer for 4 distinct structural reasons:
1. Hardcoded Theme Omissions: The component utilizes static hexadecimal colors (`#FFFFFF`, `#DADCE0`, `#202124`). When the operator toggles the active system viewport into dark mode, this component remains completely locked in light properties, rendering text entirely illegible.
2. Rigid Slot Architecture: If a developer needs to introduce a supplementary component (such as a loading indicator, a dynamic tooltip, or a copy-to-clipboard trigger badge) next to the header title, they cannot inject it declaratively from the layout tier. They are forced to alter the core file to support a new prop.
3. Native HTML Element Failure: The action control is mapped using a generic `<Box as="button">` missing appropriate accessibility roles, focus rings, and type declarations, directly breaching instructions in `.ai/rules/accessibility-required.md`.
4. Style Token Fragmentation: Specifying raw spacing configurations (`p="24px"`, `mb="12px"`) skips the official design system scales, breaking layout consistency across SaaS viewports.

---

# The Refactoring Standard: Slot-Driven Compound Composition

To fix the anti-pattern, we completely reconstruct the monolithic structure into an open, tokenized Compound Component framework utilizing the official Chakra UI v3 slot configuration guidelines.

We separate execution across three clean files inside our component tree:
1. **The Shared Compound Context (`base/StatusCardRoot.tsx`)**: Manages common structural states, theme variants, and elements isolation.
2. **The Exposed Visual Slots (`base/StatusCardSlots.tsx`)**: Exposes highly semantic sub-components (`Header`, `Title`, `Body`, `Action`) optimized for children layout injection.
3. **The Composite Export Namespacing Entrypoint (`index.ts`)**: Binds properties together under a clean, unified export namespace block.

---

# Step 1: The Context Proved Root Component (`base/StatusCardRoot.tsx`)

Build the base configuration controller. Ensure it correctly extends native HTML primitive types and implements semantic visual variants natively via standard data attributes.

```typescript
// PREFERRED - Context-bound extensible primitive container
import { createContext } from 'react';

export type StatusCardVariant = 'success' | 'warning' | 'critical';

interface StatusCardContextState {
  variant: StatusCardVariant;
}

export const [StatusCardProvider, useStatusCardContext] = createContext<StatusCardContextState>({
  name: "StatusCardContext",
  strict: true,
  errorMessage: "useStatusCardContext must be consumed inside a <StatusCard.Root> layout node",
});
```

```tsx
import { forwardRef } from 'react';
import { Box, HTMLChakraProps } from '@chakra-ui/react';

interface StatusCardRootProps extends HTMLChakraProps<'div'> {
  variant?: StatusCardVariant;
}

export const StatusCardRoot = forwardRef<HTMLDivElement, StatusCardRootProps>(
  ({ variant = 'success', children, ...restProps }, ref) => {
    return (
      <StatusCardProvider value={{ variant }}>
        <Box
          ref={ref}
          data-variant={variant}
          bg="bg.panel"
          border="1px solid"
          borderColor="border.subtle"
          borderRadius="md"
          p={5}
          _hover={{ borderColor: "border.emphasized" }}
          // Semantic variant transformations handled cleanly via token mappings
          _dark={{ bg: "bg.muted" }}
          {...restProps}
        >
          {children}
        </Box>
      </StatusCardProvider>
    );
  }
);
```

---

# Step 2: The Exposed Visual Slots Elements (`base/StatusCardSlots.tsx`)

Declare independent, single-purpose sub-components to handle layout distribution. Use standard children composition to preserve infinite customization capabilities without expanding prop files.

```tsx
// PREFERRED - Granular, uncoupled, semantic sub-component slot blocks
import { Flex, HStack, Heading, Text, HTMLChakraProps } from '@chakra-ui/react';
import { useStatusCardContext } from './StatusCardRoot';

export const StatusCardHeader = (props: HTMLChakraProps<'div'>) => (
  <Flex align="center" justify="space-between" mb={3} {...props} />
);

export const StatusCardTitle = (props: HTMLChakraProps<'h3'>) => (
  <Heading as="h3" size="sm" tracking="tight" color="fg.primary" {...props} />
);

export const StatusCardBody = (props: HTMLChakraProps<'p'>) => (
  <Text fontSize="sm" color="fg.secondary" lineHeight="relaxed" {...props} />
);

export const StatusCardActionArea = (props: HTMLChakraProps<'div'>) => (
  <HStack gap={3} mt={4} justify="flex-start" {...props} />
);
```

---

# Step 3: The Namespaced Composition Assembly (`index.ts`)

Unify all sub-elements into a single, clean namespaced object pattern.

```typescript
// PREFERRED - Namespace distribution entrypoint
import { StatusCardRoot } from './StatusCardRoot';
import { StatusCardHeader, StatusCardTitle, StatusCardBody, StatusCardActionArea } from './StatusCardSlots';

export const StatusCard = Object.assign(StatusCardRoot, {
  Header: StatusCardHeader,
  Title: StatusCardTitle,
  Body: StatusCardBody,
  ActionArea: StatusCardActionArea,
});
```

---

# Practical Utilization inside Semantic Feature Components

The semantic tier can now easily compose these blocks to fit precise layout rules. If requirements adapt tomorrow, the presentation file can reorganize internal tags instantly without altering the primitive codebase.

```tsx
// PREFERRED - Clean, highly declarative semantic integration pattern
import { StatusCard } from '@/components/base/StatusCard';
import { Button, Badge, Icon } from '@chakra-ui/react';
import { ShieldAlertIcon } from '@/assets/icons';

export const SecurityAlertBanner = () => {
  return (
    <StatusCard variant="critical" className="gr-security-banner">
      <StatusCard.Header>
        <StatusCard.Title>
          <Icon as={ShieldAlertIcon} color="red.500" mr={2} inline />
          Vazamento de Chaves de API Detectado
        </StatusCard.Title>
        <Badge colorPalette="red">Crítico</Badge>
      </StatusCard.Header>
      
      <StatusCard.Body>
        Uma chave de produção privada foi identificada em um repositório público externo. Revogue as credenciais imediatamente para mitigar riscos de segurança.
      </StatusCard.Body>
      
      <StatusCard.ActionArea>
        <Button variant="solid" colorPalette="red" onClick={() => triggerRevocation()}>
          Revogar Credenciais
        </Button>
        <Button variant="outline">Visualizar logs</Button>
      </StatusCard.ActionArea>
    </StatusCard>
  );
};
```

---

# Non-Negotiable Composition Rules

To preserve architectural consistency across user interface modules, the following engineering directives apply:
* Functional presentation elements must never consume more than 2 parameters purely dedicated to changing localized layout parameters (e.g., hiding or displaying sections). Use declarative children slots instead.
* Hardcoding absolute pixel measurements or embedding inline styles (`style={{ color: '#000' }}`) is completely banned. All values must reference valid design system token mappings.
* Building parallel, independent custom versions of pre-existing primitive foundational items (e.g., custom button implementations, home-brewed tooltips) is strictly prohibited. Extend or variant-wrap the existing core structures.

---

# AI Code Generation Guidelines (Composition API Guard)

The AI code generation engine must strictly oppose code execution pathways that output monolithic components driven by massive prop parameters configurations.

Whenever requested to draft a modal wrapper, dashboard widget box, dropdown navigation pane, or operational list element, the agent must generate a highly modular Compound Component design schema following the parts-based slot mechanics of Chakra UI v3.

The generated code must group sub-components using namespace object alignments (`Object.assign`), ensuring that layout developers retain infinite flexibility to arrange, style, and compose elements within the presentation layer natively.

---

# Forbidden Component Compositions Summary

Avoid:
* Packing layout sub-sections or text descriptions inside top-level configuration objects.
* Passing layout properties across intermediate layers due to context omission (Prop Drilling).
* Using inline boolean flags (`hasHeader`, `showFooter`) to switch complete visibility trees.
* Writing direct text style specifications outside official typographic tokens (`fontSize="14px"`).
* Short-circuiting compound styles by omitting standard React `children` mapping slots.

---

# Preferred Composition Characteristics

Prefer user interface architectures that feel:
* declaratively modifiable directly from presentation layout tiers via children slotting
* tightly synchronized with slot-driven definitions (Chakra v3 design token standards)
* completely decoupled across data management, typography variables, and visual tokens
* cleanly namespaced and self-documenting to minimize implementation ambiguities

---

# Final Composition Definition of Done

No presentation block, design variant wrapper, feature layout group, or composite control element will cross the integration deployment gate if it maps interface permutations through monolithic multi-flag configuration matrices instead of clean, open Compound Component abstractions.

Composition-first platform design guarantees elite maintainability, stable code generation workflows, and long-term UI resilience.