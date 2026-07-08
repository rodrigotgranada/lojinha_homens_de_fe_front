# components > Radiomark
  
  URL: docs/components/radiomark
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/radiomark.mdx
  
  A visual indicator used to show selected and unselected radio states
          
  ***
  
  title: Radiomark
  description: A visual indicator used to show selected and unselected radio states
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/radiomark
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/radiomark.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Radiomark, Stack } from "@chakra-ui/react"

export const RadiomarkBasic = () => {
  return (
    <Stack>
      <Radiomark />
      <Radiomark checked />
      <Radiomark disabled />
      <Radiomark checked disabled />
    </Stack>
  )
}

```

## Usage

```tsx
import { Radiomark } from "@chakra-ui/react"
```

```tsx
<Radiomark checked />
```

## Examples

### States

The Radiomark component supports checked and unchecked states, with optional
disabled state.

```tsx
import { HStack, Radiomark } from "@chakra-ui/react"

export const RadiomarkStates = () => {
  return (
    <HStack gap={4}>
      <Radiomark />
      <Radiomark checked />
      <Radiomark disabled />
      <Radiomark checked disabled />
    </HStack>
  )
}

```

### Variants

Use the `variant` prop to change the visual style of the radiomark.

```tsx
import { For, Radiomark, Stack } from "@chakra-ui/react"

export const RadiomarkVariants = () => {
  return (
    <Stack>
      <For each={["outline", "subtle", "solid", "inverted"]}>
        {(variant) => <Radiomark checked key={variant} variant={variant} />}
      </For>
    </Stack>
  )
}

```

### Sizes

Use the `size` prop to change the size of the radiomark.

```tsx
import { For, HStack, Radiomark } from "@chakra-ui/react"

export const RadiomarkWithSizes = () => {
  return (
    <HStack gap={4} alignItems="center">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => <Radiomark key={size} size={size} checked />}
      </For>
    </HStack>
  )
}

```

### Colors

Use the `colorPalette` prop to change the color scheme of the radiomark.

```tsx
import { For, HStack, Radiomark } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const RadiomarkWithColors = () => {
  return (
    <HStack gap={4}>
      <For each={colorPalettes}>
        {(colorPalette) => (
          <Radiomark key={colorPalette} colorPalette={colorPalette} checked />
        )}
      </For>
    </HStack>
  )
}

```

### Filled

Use the `filled` prop with the `outline` variant to add a background color to
the radiomark.

```tsx
import { HStack, Radiomark } from "@chakra-ui/react"

export const RadiomarkWithFilled = () => {
  return (
    <HStack gap={4}>
      <Radiomark variant="outline" />
      <Radiomark variant="outline" checked />
      <Radiomark variant="outline" filled />
      <Radiomark variant="outline" filled checked />
    </HStack>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| variant | solid | `'solid' \| 'subtle' \| 'outline' \| 'inverted'` | The variant of the component |
| size | md | `'xs' \| 'sm' \| 'md' \| 'lg'` | The size of the component |
| checked | undefined | `boolean \| undefined` | Whether the checkmark is checked |
| disabled | undefined | `boolean \| undefined` | Whether the checkmark is disabled |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| filled | undefined | `'true' \| 'false'` | The filled of the component |
