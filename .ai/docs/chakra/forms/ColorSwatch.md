# components > Color Swatch
  
  URL: docs/components/color-swatch
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/color-swatch.mdx
  
  Used to preview a color
          
  ***
  
  title: Color Swatch
  description: Used to preview a color
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/color-swatch
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-color-swatch--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/color-swatch.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { ColorSwatch } from "@chakra-ui/react"

export const ColorSwatchBasic = () => {
  return <ColorSwatch value="#bada55" />
}

```

## Usage

```tsx
import { ColorSwatch } from "@chakra-ui/react"
```

```tsx
<ColorSwatch />
```

## Examples

### Sizes

Use the `size` prop to change the size of the color swatch.

```tsx
import { HStack } from "@chakra-ui/react"
import { ColorSwatch } from "@chakra-ui/react"
import { For } from "@chakra-ui/react"

export const ColorSwatchWithSizes = () => {
  return (
    <HStack>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => <ColorSwatch key={size} value="#bada55" size={size} />}
      </For>
    </HStack>
  )
}

```

### Alpha

Here's an example of how to create a color swatch with an alpha channel.

```tsx
import { ColorSwatch, HStack } from "@chakra-ui/react"

export const ColorSwatchWithAlpha = () => {
  return (
    <HStack>
      {colors.map((color) => (
        <ColorSwatch key={color} value={color} size="xl" />
      ))}
    </HStack>
  )
}

const colors = [
  "rgba(255, 0, 0, 0.5)",
  "rgba(0, 0, 255, 0.7)",
  "rgba(0, 255, 0, 0.4)",
  "rgba(255, 192, 203, 0.6)",
]

```

### With Badge

Here's an example of how to compose the `ColorSwatch` with a `Badge`.

```tsx
import { Badge, ColorSwatch } from "@chakra-ui/react"

export const ColorSwatchWithBadge = () => {
  return (
    <Badge>
      <ColorSwatch value="#bada55" boxSize="0.82em" />
      #bada55
    </Badge>
  )
}

```

### Mixed Colors

Use the `ColorSwatchMix` to create a color swatch that contains multiple colors,
but retains the size of a single color swatch.

```tsx
import { ColorSwatchMix, HStack } from "@chakra-ui/react"

export const ColorSwatchMixed = () => {
  return (
    <HStack>
      <ColorSwatchMix size="lg" items={["red", "pink"]} />
      <ColorSwatchMix size="lg" items={["red", "pink", "green"]} />
      <ColorSwatchMix
        size="lg"
        items={["lightgreen", "green", "darkgreen", "black"]}
      />
    </HStack>
  )
}

```

### Palette

Here's an example of composing multiple swatches to create a palette.

```tsx
import { ColorSwatch, Group } from "@chakra-ui/react"

export const ColorSwatchPalette = () => {
  return (
    <Group attached width="full" maxW="sm" grow>
      {swatches.map((color) => (
        <ColorSwatch key={color} value={color} size="2xl" />
      ))}
    </Group>
  )
}

const swatches = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]

```