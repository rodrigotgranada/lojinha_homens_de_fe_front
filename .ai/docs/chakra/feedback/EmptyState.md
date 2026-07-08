# components > Empty State
  
  URL: docs/components/empty-state
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/empty-state.mdx
  
  Used to indicate when a resource is empty or unavailable.
          
  ***
  
  title: Empty State
  description: Used to indicate when a resource is empty or unavailable.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/empty-state
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-empty-state--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/empty-state.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { EmptyState, VStack } from "@chakra-ui/react"
import { LuShoppingCart } from "react-icons/lu"

export const EmptyStateBasic = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuShoppingCart />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Your cart is empty</EmptyState.Title>
          <EmptyState.Description>
            Explore our products and add items to your cart
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

```

## Usage

```tsx
import { EmptyState } from "@chakra-ui/react"
```

```tsx
<EmptyState.Root>
  <EmptyState.Content>
    <EmptyState.Indicator />
    <EmptyState.Title />
    <EmptyState.Description />
  </EmptyState.Content>
</EmptyState.Root>
```

:::info

If you prefer a closed component composition, check out the
[snippet below](#closed-component).

:::

## Examples

### Sizes

Use the `size` prop to set the size of the Empty state.

```tsx
import { EmptyState, For, Stack, VStack } from "@chakra-ui/react"
import { LuShoppingCart } from "react-icons/lu"

export const EmptyStateSizes = () => {
  return (
    <Stack>
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <EmptyState.Root size={size} key={size}>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <LuShoppingCart />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>Your cart is empty</EmptyState.Title>
                <EmptyState.Description>
                  Explore our products and add items to your cart
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Action

Here's an example of an empty state with an action button.

```tsx
import { Button, ButtonGroup, EmptyState, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"

export const EmptyStateWithAction = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiColorSwatch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Start adding tokens</EmptyState.Title>
          <EmptyState.Description>
            Add a new design token to get started
          </EmptyState.Description>
        </VStack>
        <ButtonGroup>
          <Button>Create token</Button>
          <Button variant="outline">Import</Button>
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

```

### List

Here's an example of an empty state with a list.

```tsx
import { EmptyState, List, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"

export const EmptyStateWithList = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiColorSwatch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>No results found</EmptyState.Title>
          <EmptyState.Description>
            Try adjusting your search
          </EmptyState.Description>
        </VStack>
        <List.Root variant="marker">
          <List.Item>Try removing filters</List.Item>
          <List.Item>Try different keywords</List.Item>
        </List.Root>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

```

### Closed Component

Here's how to setup the Empty State for a closed component composition.

<ExampleCode name="empty-state-closed-component" />

If you want to automatically add the closed component to your project, run the
command:

```bash
npx @chakra-ui/cli snippet add empty-state
```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| size | md | `'sm' \| 'md' \| 'lg'` | The size of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |


## Explorer

Explore the `Empty State` component parts interactively. Click on parts in the
sidebar to highlight them in the preview.

<Explorer name="empty-state-basic" />