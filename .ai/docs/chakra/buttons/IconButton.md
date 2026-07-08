# components > Icon Button
  
  URL: docs/components/icon-button
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/icon-button.mdx
  
  Used to render an icon within a button
          
  ***
  
  title: Icon Button
  description: Used to render an icon within a button
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/button
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-icon-button--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/button.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { IconButton } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

export const IconButtonBasic = () => {
  return (
    <IconButton aria-label="Search database">
      <LuSearch />
    </IconButton>
  )
}

```

## Usage

```jsx
import { IconButton } from "@chakra-ui/react"
```

```jsx
<IconButton aria-label="Search database">
  <LuSearch />
</IconButton>
```

## Examples

### Sizes

Use the `size` prop to change the size of the button.

```tsx
import { For, HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import { LuPhone } from "react-icons/lu"

export const IconButtonWithSizes = () => {
  return (
    <HStack wrap="wrap" gap="8">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <VStack key={size}>
            <IconButton
              aria-label="Search database"
              variant="outline"
              size={size}
            >
              <LuPhone />
            </IconButton>
            <Text textStyle="sm">{size}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  )
}

```

### Variants

Use the `variant` prop to change its visual style

```tsx
import { For, HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import { LuVoicemail } from "react-icons/lu"

export const IconButtonWithVariants = () => {
  return (
    <HStack wrap="wrap" gap="8">
      <For each={["solid", "subtle", "surface", "outline", "ghost"]}>
        {(variant) => (
          <VStack key={variant}>
            <IconButton
              aria-label="Call support"
              key={variant}
              variant={variant}
            >
              <LuVoicemail />
            </IconButton>
            <Text textStyle="sm">{variant}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  )
}

```

### Color

Use the `colorPalette` prop to change the color of the button

```tsx
import { For, HStack, IconButton } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { LuSearch } from "react-icons/lu"

export const IconButtonWithColors = () => {
  return (
    <HStack wrap="wrap">
      <For each={colorPalettes}>
        {(c) => (
          <IconButton aria-label="Search database" key={c} colorPalette={c}>
            <LuSearch />
          </IconButton>
        )}
      </For>
    </HStack>
  )
}

```

### Rounded

Set `rounded="full"` to make the button fully rounded

```tsx
import { IconButton } from "@chakra-ui/react"
import { LuVoicemail } from "react-icons/lu"

export const IconButtonRounded = () => {
  return (
    <IconButton aria-label="Call support" rounded="full">
      <LuVoicemail />
    </IconButton>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| spinnerPlacement | start | `'start' \| 'end' \| undefined` | The placement of the spinner |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| size | md | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | The size of the component |
| variant | solid | `'solid' \| 'subtle' \| 'surface' \| 'outline' \| 'ghost' \| 'plain'` | The variant of the component |
| spinner | undefined | `React.ReactNode \| undefined` | The spinner to show while loading. |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
