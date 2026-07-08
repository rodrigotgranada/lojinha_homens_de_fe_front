# Recipe: Creating a Standard Platform Component

This recipe provides a step-by-step blueprint for engineering consistent, performance-isolated, and AI-friendly components across the codebase. It targets both **Foundational Primitives** (`src/components/base/`) and **Semantic Components** (`src/features/[feature]/components/`).

---

## Step 1: Determine Destination & Classification
Before writing any line of code, evaluate the scope of the target element:
* **Does it contain business definitions or map database properties?** It is a **Semantic Component**. It must be placed in `src/features/[relevant-feature]/components/`.
* **Is it a purely stylistic layout molecule, completely ignorant of business definitions?** It is a **Foundational Primitive**. It must be placed in `src/components/base/`.

## Step 2: Establish the Interface Contract
1. Extend the appropriate native HTML props combined with Chakra's system types via `HTMLChakraProps<'div'>` (or matching tag element).
2. Explicitly document any custom behavioral parameters using structured TSDoc comments.
3. Never introduce loose `any` fallbacks.

## Step 3: Implement the Layout via Composition Slots
1. Group distinct sub-sections into explicit compound namespaces if building a multi-part structure.
2. Bind the component architecture to Chakra UI v3 primitives using token-driven design values.
3. Attach unique, descriptive semantic identifier classes (`className="gr-..."`) onto layout boundaries to guide AI scraping context tracking.

## Step 4: Ref Reference Forwarding (React 19 Standard)
* Do not import or mount the legacy `forwardRef` wrapper. 
* Accept the `ref` directly inside the native component parameter signature list as a standard variable prop.

## Step 5: Export Mapping and Naming Reflection
1. Explicitly assign a hardcoded identity string via the component's `displayName` property.
2. Register the component interface into the local public gateway (`index.ts`) if it resides within a feature sandbox directory.

---

## Reference Execution Pattern

Here is the exact code signature structure to replicate whenever scaffolding a component:

```tsx
import { Box, Heading, HTMLChakraProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ContentBlockProps extends HTMLChakraProps<'div'> {
  /**
   * Explains the explicit semantic visual variant token to apply.
   */
  surfaceVariant?: 'default' | 'accentuated';
  /**
   * Dynamic template slots to render inside the container shell.
   */
  children: ReactNode;
}

/**
 * Standard Platform Presentational Primitive Component.
 * Engineered for React 19, Next.js 15, and Chakra UI v3.
 */
export const ContentBlockApproved = ({
  surfaceVariant = 'default',
  children,
  ref, // Accepted directly as a normal parameter prop (React 19)
  ...restProps
}: ContentBlockProps) => {
  const isAccent = surfaceVariant === 'accentuated';

  return (
    <Box
      ref={ref}
      className="gr-approved-content-block-root"
      p={{ base: 4, md: 5 }}
      bg={isAccent ? "bg.muted" : "bg.surface"}
      border="1px solid"
      borderColor={isAccent ? "brand.subtle" : "border.subtle"}
      borderRadius="md"
      width="100%"
      {...restProps}
    >
      {children}
    </Box>
  );
};

// Enforced identity metadata assignment
ContentBlockApproved.displayName = 'ContentBlockApproved';
```