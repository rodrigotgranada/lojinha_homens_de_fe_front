# Generator: Basic Component Blueprint Template

Use this template as a macro-structural generator model whenever instructed to build or scaffold a new presentation atom or base component from scratch.

---

## Generator Variables Setup
```
[COMPONENT_NAME] -> Clear PascalCase technical identifier (e.g., TenantMetricsCard)
[CLASS_NAME_HOOK] -> Unique semantic locator token lowercase hyphenated (e.g., tenant-metrics-card)
[ELEMENT_TAG] -> Semantic underlying HTML5 interface string (e.g., div, section, article)
```

## Structural Template Blueprint

```tsx
import { Box, HTMLChakraProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface [COMPONENT_NAME]Props extends HTMLChakraProps<'[ELEMENT_TAG]'> {
  /**
   * Explicitly documents the context and role of children nodes inside this generation placeholder.
   */
  children?: ReactNode;
}

/**
 * Platform AI-Generated Premium Component Module.
 * Conforms strictly to React 19, Next.js 15, and Chakra UI v3 Composition Primitives.
 */
export const [COMPONENT_NAME] = ({
  children,
  ref,
  ...restProps
}: [COMPONENT_NAME]Props) => {
  return (
    <Box
      ref={ref}
      as="[ELEMENT_TAG]"
      className="gr-approved-[CLASS_NAME_HOOK]-root"
      width="100%"
      bg="bg.surface"
      p={{ base: 4, md: 5 }}
      border="1px solid"
      borderColor="border.subtle"
      borderRadius="md"
      {...restProps}
    >
      {children}
    </Box>
  );
};

[COMPONENT_NAME].displayName = '[COMPONENT_NAME]';
```

---

## Execution Protocol Instructions
When deploying this generation wrapper, the AI code engine must automatically substitute the bracketed variables based on the user's specific context requests, expand interior child layout blocks logically using token-guided slots, and expose the module through the feature's primary local public routing node (`index.ts`).
```