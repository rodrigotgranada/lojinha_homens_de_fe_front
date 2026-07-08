# components > Code
  
  URL: docs/components/code
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/code.mdx
  
  Used to display inline code
          
  ***
  
  title: Code
  description: Used to display inline code
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/code
 - storybook: https://storybook.chakra-ui.com/?path=/story/typography-code--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/code.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Code } from "@chakra-ui/react"

export const CodeBasic = () => {
  return <Code>{`console.log("Hello, world!")`}</Code>
}

```

## Usage

```js
import { Code } from "@chakra-ui/react"
```

```jsx
<Code>Hello world</Code>
```

## Examples

### Sizes

Use the `size` prop to change the size of the code component.

```tsx
import { Code, Stack } from "@chakra-ui/react"

export const CodeWithSizes = () => {
  return (
    <Stack gap="2" align="flex-start">
      <Code size="xs">console.log()</Code>
      <Code size="sm">console.log()</Code>
      <Code size="md">console.log()</Code>
      <Code size="lg">console.log()</Code>
    </Stack>
  )
}

```

### Variants

Use the `variant` prop to change the appearance of the code component.

```tsx
import { Code, Stack } from "@chakra-ui/react"

export const CodeWithVariants = () => {
  return (
    <Stack gap="2" align="flex-start">
      <Code variant="solid">console.log()</Code>
      <Code variant="outline">console.log()</Code>
      <Code variant="subtle">console.log()</Code>
      <Code variant="surface">console.log()</Code>
    </Stack>
  )
}

```

### Colors

Use the `colorPalette` prop to change the color scheme of the component.

```tsx
import { Code, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const CodeWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          px="4"
          width="full"
        >
          <Text minW="8ch" textStyle="sm">
            {colorPalette}
          </Text>
          <Code colorPalette={colorPalette} variant="solid">
            {`console.log()`}
          </Code>
          <Code colorPalette={colorPalette} variant="outline">
            {`console.log()`}
          </Code>
          <Code colorPalette={colorPalette} variant="subtle">
            {`console.log()`}
          </Code>
          <Code colorPalette={colorPalette} variant="surface">
            {`console.log()`}
          </Code>
        </Stack>
      ))}
    </Stack>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| variant | subtle | `'solid' \| 'subtle' \| 'outline' \| 'surface' \| 'plain'` | The variant of the component |
| size | sm | `'xs' \| 'sm' \| 'md' \| 'lg'` | The size of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
