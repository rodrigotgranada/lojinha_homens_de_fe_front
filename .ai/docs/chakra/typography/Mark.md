# components > Mark
  
  URL: docs/components/mark
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/mark.mdx
  
  Used to mark text for emphasis.
          
  ***
  
  title: Mark
  description: Used to mark text for emphasis.
  links: 

  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Mark, Text } from "@chakra-ui/react"

export const MarkBasic = () => {
  return (
    <Text>
      The <Mark variant="subtle">design system</Mark> is a collection of UI
      elements
    </Text>
  )
}

```

## Usage

```js
import { Mark } from "@chakra-ui/react"
```

```jsx
<Text>
  The <Mark>design system</Mark> is a collection of UI elements
</Text>
```

## Examples

### Variants

Use the `variant` prop to change the color of the mark.

<Example name="mark-with-variants" />

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| variant | undefined | `'subtle' \| 'solid' \| 'text' \| 'plain'` | The variant of the component |
