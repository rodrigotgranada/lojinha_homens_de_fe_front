# components > Progress Circle
  
  URL: docs/components/progress-circle
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/progress-circle.mdx
  
  Used to display a task's progress in a circular form.
          
  ***
  
  title: Progress Circle
  description: Used to display a task's progress in a circular form.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/progress-circle
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-progress-circle--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/progress-circle.ts
 - ark: https://ark-ui.com/docs/components/progress-circular
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { ProgressCircle } from "@chakra-ui/react"

export const ProgressCircleBasic = () => {
  return (
    <ProgressCircle.Root value={75}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}

```

## Usage

```tsx
import { ProgressCircle } from "@chakra-ui/react"
```

```tsx
<ProgressCircle.Root>
  <ProgressCircle.Circle>
    <ProgressCircle.Track />
    <ProgressCircle.Range />
  </ProgressCircle.Circle>
  <ProgressCircle.ValueText />
</ProgressCircle.Root>
```

## Examples

### Rounded

Use the `strokeLinecap` prop on `ProgressCircle.Range` to make the ends of the
progress circle rounded.

```tsx
import { ProgressCircle } from "@chakra-ui/react"

export const ProgressCircleWithRoundCap = () => {
  return (
    <ProgressCircle.Root value={75}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range strokeLinecap="round" />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}

```

### Sizes

Use the `size` prop to change the size of the progress circle component.

```tsx
import { For, HStack, ProgressCircle } from "@chakra-ui/react"

export const ProgressCircleWithSizes = () => {
  return (
    <HStack gap="10">
      <For each={["xs", "sm", "md", "lg", "xl"]}>
        {(size) => (
          <ProgressCircle.Root key={size} size={size} value={30}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
        )}
      </For>
    </HStack>
  )
}

```

### Colors

Use the `colorPalette` prop to change the color scheme of the component.

```tsx
import { HStack, ProgressCircle, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const ProgressCircleWithColors = () => {
  return (
    <Stack gap="4" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <HStack key={colorPalette} gap="10" px="4">
          <Text minW="8ch">{colorPalette}</Text>

          <ProgressCircle.Root size="sm" value={30} colorPalette={colorPalette}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>

          <ProgressCircle.Root size="md" value={30} colorPalette={colorPalette}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>

          <ProgressCircle.Root size="lg" value={30} colorPalette={colorPalette}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
        </HStack>
      ))}
    </Stack>
  )
}

```

### Value Text

Render the `ProgressCircle.ValueText` component to display the progress value.

```tsx
import { AbsoluteCenter, For, HStack, ProgressCircle } from "@chakra-ui/react"

export const ProgressCircleWithValueText = () => {
  return (
    <HStack gap="8">
      <For each={["md", "lg", "xl"]}>
        {(size) => (
          <ProgressCircle.Root size={size} key={size} value={5}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <ProgressCircle.ValueText />
            </AbsoluteCenter>
          </ProgressCircle.Root>
        )}
      </For>
    </HStack>
  )
}

```

### Custom Thickness

Pass the `--thickness` css variable to the `ProgressCircleRing` component to
change the thickness of the ring.

```tsx
import { ProgressCircle } from "@chakra-ui/react"

export const ProgressCircleWithThickness = () => {
  return (
    <ProgressCircle.Root value={75}>
      <ProgressCircle.Circle css={{ "--thickness": "2px" }}>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}

```

### Indeterminate

Set the `value` prop to `null` to render the indeterminate state.

```tsx
import { ProgressCircle } from "@chakra-ui/react"

export const ProgressCircleIndeterminate = () => {
  return (
    <ProgressCircle.Root value={null} size="sm">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}

```

### Color

Pass the `stroke` prop to the `ProgressCircle.Range` component to change the
color of the range.

```tsx
import { ProgressCircle } from "@chakra-ui/react"

export const ProgressCircleWithRangeColor = () => {
  return (
    <ProgressCircle.Root value={75}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range stroke="orange" />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}

```

### Closed Component

Here's how to create a closed component using the `ProgressCircle` component.

<ExampleCode name="progress-circle-closed-component" />

## Guide

### Customizing indeterminate color

Use the `_indeterminate` condition to style the indeterminate state.

```tsx
<ProgressCircle.Range _indeterminate={{ stroke: "purple.500" }} />
```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| size | md | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | The size of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
