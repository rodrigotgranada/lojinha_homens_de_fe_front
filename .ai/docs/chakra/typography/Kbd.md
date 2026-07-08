# components > Kbd
  
  URL: docs/components/kbd
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/kbd.mdx
  
  Used to show key combinations for an action
          
  ***
  
  title: Kbd
  description: Used to show key combinations for an action
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/kbd
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-kbd--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/kbd.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Kbd } from "@chakra-ui/react"

export const KbdBasic = () => {
  return <Kbd>Shift + Tab</Kbd>
}

```

## Usage

```jsx
import { Kbd } from "@chakra-ui/react"
```

```jsx
<Kbd>F12</Kbd>
```

## Examples

### Combinations

Render `Kbd` to showcase key combinations

```tsx
import { HStack, Kbd } from "@chakra-ui/react"

export const KbdWithCombinations = () => {
  return (
    <HStack gap="1">
      <Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
    </HStack>
  )
}

```

### Function Keys

Here's an example of using `Kbd` to showcase function keys

```tsx
import { HStack, Kbd } from "@chakra-ui/react"

export const KbdFunctionKeys = () => {
  return (
    <HStack>
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌃</Kbd>
    </HStack>
  )
}

```

### Variants

Use the `variant` prop to change the appearance of the `Kbd` component

```tsx
import { HStack, Kbd } from "@chakra-ui/react"

export const KbdWithVariants = () => {
  return (
    <HStack gap="4">
      <Kbd variant="raised">Shift + Tab</Kbd>
      <Kbd variant="outline">Shift + Tab</Kbd>
      <Kbd variant="subtle">Shift + Tab</Kbd>
      <Kbd variant="plain">Shift + Tab</Kbd>
    </HStack>
  )
}

```

### Sizes

Use the `size` prop to change the size of the `Kbd` component

```tsx
import { HStack, Kbd } from "@chakra-ui/react"

export const KbdWithSizes = () => {
  return (
    <HStack gap="4">
      <Kbd size="sm">Shift + Tab</Kbd>
      <Kbd size="md">Shift + Tab</Kbd>
      <Kbd size="lg">Shift + Tab</Kbd>
    </HStack>
  )
}

```

### Within Text

Use `Kbd` within text to highlight key combinations

```tsx
import { Kbd, Text } from "@chakra-ui/react"

export const KbdWithinText = () => {
  return (
    <Text>
      Press <Kbd>F12</Kbd> to open DevTools
    </Text>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| variant | raised | `'raised' \| 'outline' \| 'subtle' \| 'plain'` | The variant of the component |
| size | md | `'sm' \| 'md' \| 'lg'` | The size of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
