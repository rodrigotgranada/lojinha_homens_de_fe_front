# components > Checkmark
  
  URL: docs/components/checkmark
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/checkmark.mdx
  
  A visual indicator used to show checked, unchecked, or indeterminate states
          
  ***
  
  title: Checkmark
  description: A visual indicator used to show checked, unchecked, or indeterminate states
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/checkmark
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/checkmark.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Checkmark, Stack } from "@chakra-ui/react"

export const CheckmarkBasic = () => {
  return (
    <Stack>
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
      <Checkmark disabled />
      <Checkmark checked disabled />
      <Checkmark indeterminate disabled />
    </Stack>
  )
}

```

## Usage

```tsx
import { Checkmark } from "@chakra-ui/react"
```

```tsx
<Checkmark checked />
```

## Examples

### Indeterminate

Use the `indeterminate` prop to show an indeterminate state.

```tsx
import { Checkmark, HStack } from "@chakra-ui/react"

export const CheckmarkIndeterminate = () => {
  return (
    <HStack gap={4}>
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
    </HStack>
  )
}

```

### States

The Checkmark component supports three states: unchecked (default), checked, and
indeterminate.

```tsx
import { Checkmark, HStack } from "@chakra-ui/react"

export const CheckmarkStates = () => {
  return (
    <HStack gap={3}>
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
      <Checkmark disabled />
      <Checkmark checked disabled />
      <Checkmark indeterminate disabled />
    </HStack>
  )
}

```

### Variants

Use the `variant` prop to change the visual style of the checkmark.

```tsx
import { Checkmark, For, HStack } from "@chakra-ui/react"

export const CheckmarkWithVariants = () => {
  return (
    <HStack gap={4}>
      <For each={["solid", "outline", "subtle", "plain", "inverted"]}>
        {(variant) => <Checkmark key={variant} variant={variant} checked />}
      </For>
    </HStack>
  )
}

```

### Sizes

Use the `size` prop to change the size of the checkmark.

```tsx
import { Checkmark, For, HStack } from "@chakra-ui/react"

export const CheckmarkWithSizes = () => {
  return (
    <HStack gap={4} alignItems="center">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => <Checkmark key={size} size={size} checked />}
      </For>
    </HStack>
  )
}

```

### Colors

Use the `colorPalette` prop to change the color scheme of the checkmark.

```tsx
import { Checkmark, For, HStack } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const CheckmarkWithColors = () => {
  return (
    <HStack gap={4}>
      <For each={colorPalettes}>
        {(colorPalette) => (
          <Checkmark key={colorPalette} colorPalette={colorPalette} checked />
        )}
      </For>
    </HStack>
  )
}

```

### Filled

Use the `filled` prop with the `outline` variant to add a background color to
the checkmark.

```tsx
import { Checkmark } from "@chakra-ui/react"

export const CheckmarkWithFilled = () => {
  return <Checkmark variant="outline" filled />
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| size | md | `'xs' \| 'sm' \| 'md' \| 'lg'` | The size of the component |
| variant | solid | `'solid' \| 'outline' \| 'subtle' \| 'plain' \| 'inverted'` | The variant of the component |
| checked | undefined | `boolean \| undefined` | Whether the checkmark is checked |
| indeterminate | undefined | `boolean \| undefined` | Whether the checkmark is indeterminate |
| disabled | undefined | `boolean \| undefined` | Whether the checkmark is disabled |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| filled | undefined | `'true' \| 'false'` | The filled of the component |
