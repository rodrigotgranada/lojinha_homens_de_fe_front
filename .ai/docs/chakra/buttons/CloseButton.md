# components > Close Button
  
  URL: docs/components/close-button
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/close-button.mdx
  
  Used to trigger close functionality
          
  ***
  
  title: Close Button
  description: Used to trigger close functionality
  links: 
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-close-button--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/close-button.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { CloseButton } from "@chakra-ui/react"

export const CloseButtonBasic = () => {
  return <CloseButton />
}

```

## Usage

```jsx
import { CloseButton } from "@chakra-ui/react"
```

```jsx
<CloseButton />
```

## Examples

### Sizes

Use the `size` prop to change the size of the close button.

```tsx
import { CloseButton, For, HStack } from "@chakra-ui/react"

export const CloseButtonWithSizes = () => {
  return (
    <HStack gap="4" wrap="wrap">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl"]}>
        {(size) => <CloseButton key={size} variant="outline" size={size} />}
      </For>
    </HStack>
  )
}

```

### Variants

Use the `variant` prop to change the appearance of the close button.

```tsx
import { CloseButton, HStack } from "@chakra-ui/react"

export const CloseButtonWithVariants = () => {
  return (
    <HStack>
      <CloseButton variant="ghost" />
      <CloseButton variant="outline" />
      <CloseButton variant="subtle" />
      <CloseButton variant="solid" />
    </HStack>
  )
}

```

### Custom Icon

Pass the custom icon to the `children` of the `CloseButton` component.

```tsx
import { CloseButton } from "@chakra-ui/react"
import { HiX } from "react-icons/hi"

export const CloseButtonWithCustomIcon = () => {
  return (
    <CloseButton variant="ghost" aria-label="Close">
      <HiX />
    </CloseButton>
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
| loading | false | `boolean \| undefined` | If `true`, the button will show a loading spinner. |
| loadingText | undefined | `React.ReactNode \| undefined` | The text to show while loading. |
| spinner | undefined | `React.ReactNode \| undefined` | The spinner to show while loading. |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
