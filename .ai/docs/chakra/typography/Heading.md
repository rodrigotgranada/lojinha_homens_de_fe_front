# components > Heading
  
  URL: docs/components/heading
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/heading.mdx
  
  Used to render semantic HTML heading elements.
          
  ***
  
  title: Heading
  description: Used to render semantic HTML heading elements.
  links: 

  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Heading } from "@chakra-ui/react"

export const HeadingBasic = () => {
  return <Heading>The quick brown fox jumps over the lazy dog</Heading>
}

```

## Usage

```js
import { Heading } from "@chakra-ui/react"
```

```jsx
<Heading>I'm a Heading</Heading>
```

## Examples

### Sizes

Use the `size` prop to change the size of the heading component.

```tsx
import { Heading, Stack } from "@chakra-ui/react"

export const HeadingWithSizes = () => {
  return (
    <Stack gap="2" align="flex-start">
      <Heading size="sm">Heading (sm)</Heading>
      <Heading size="md">Heading (md)</Heading>
      <Heading size="lg">Heading (lg)</Heading>
      <Heading size="xl">Heading (xl)</Heading>
      <Heading size="2xl">Heading (2xl)</Heading>
      <Heading size="3xl">Heading (3xl)</Heading>
      <Heading size="4xl">Heading (4xl)</Heading>
      <Heading size="5xl">Heading (5xl)</Heading>
      <Heading size="6xl">Heading (6xl)</Heading>
    </Stack>
  )
}

```

### Highlight

Compose the `Heading` component with the `Highlight` component to highlight
text.

```tsx
import { Heading, Highlight, Stack, Text } from "@chakra-ui/react"

export const HeadingWithHighlight = () => {
  return (
    <Stack>
      <Heading size="3xl" letterSpacing="tight">
        <Highlight query="with speed" styles={{ color: "teal.600" }}>
          Create accessible React apps with speed
        </Highlight>
      </Heading>
      <Text fontSize="md" color="fg.muted">
        Chakra UI is a simple, modular and accessible component library that
        gives you the building blocks you need.
      </Text>
    </Stack>
  )
}

```

### As another element

Use the `as` prop to render the heading as another HTML element.

```tsx
import { Heading, Stack } from "@chakra-ui/react"

export const HeadingWithAsProp = () => {
  return (
    <Stack>
      <Heading as="h1">Level 1</Heading>
      <Heading as="h2">Level 2</Heading>
      <Heading as="h3">Level 3</Heading>
    </Stack>
  )
}

```

### Weights

Use the `fontWeight` prop to change the weight of the heading component.

```tsx
import { Heading, Stack } from "@chakra-ui/react"

export const HeadingWithWeights = () => {
  return (
    <Stack>
      <Heading fontWeight="normal">Normal</Heading>
      <Heading fontWeight="medium">Medium</Heading>
      <Heading fontWeight="semibold">Semibold</Heading>
      <Heading fontWeight="bold">Bold</Heading>
    </Stack>
  )
}

```

### Composition

Use the `Heading` component to compose other components.

```tsx
import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"

export const HeadingWithComposition = () => {
  return (
    <Stack align="flex-start">
      <Heading size="2xl">Modern payments for Stores</Heading>
      <Text mb="3" fontSize="md" color="fg.muted">
        PayMe helps startups get paid by anyone, anywhere in the world
      </Text>
      <Button>
        Create account <LuArrowRight />
      </Button>
    </Stack>
  )
}

```

## Customization

:::info

After customizing the recipe, run the CLI typegen command to regenerate the
types. See the [CLI docs](/docs/get-started/cli#chakra-typegen) for how to run
typegen in postinstall, CI, and monorepos.

```bash
npx @chakra-ui/cli typegen
```

:::

To override the `fontSize`, we recommend using the `textStyle` prop since it
considers the line height and letter spacing as well.

### Changing default styles

Here's an example of customizing the `Heading` component.

```tsx title="components/ui/provider.tsx"
import { createSystem, defaultConfig, defineRecipe } from "@chakra-ui/react"

const headingRecipe = defineRecipe({
  base: {
    fontWeight: "normal",
    textStyle: "4xl",
  },
})

const system = createSystem(defaultConfig, {
  theme: {
    recipes: { heading: headingRecipe },
  },
})
```

### Changing heading font globally

To change the default heading font, set the `fonts.heading` token in your theme.

```tsx title="components/ui/provider.tsx"
import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Playfair Display, serif" },
      },
    },
  },
})
```

### Adding a new size

Update the `variants.size` property to create a custom size.

```tsx title="components/ui/provider.tsx"
import { createSystem, defaultConfig, defineRecipe } from "@chakra-ui/react"

const headingRecipe = defineRecipe({
  variants: {
    size: {
      custom: {
        fontSize: "100px",
        lineHeight: "100px",
        letterSpacing: "-2px",
      },
    },
  },
})

const system = createSystem(defaultConfig, {
  theme: {
    recipes: { heading: headingRecipe },
  },
})
```

Then, use the `custom` variant to create a custom size.

```tsx
<Heading size="custom">I'm a custom size</Heading>
```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| size | xl | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl'` | The size of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
