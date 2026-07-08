# components > For
  
  URL: docs/components/for
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/for.mdx
  
  Used to loop over an array and render a component for each item.
          
  ***
  
  title: For
  description: Used to loop over an array and render a component for each item.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/for
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-for--basic
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { For } from "@chakra-ui/react"

export const ForBasic = () => {
  return (
    <For each={["One", "Two", "Three"]}>
      {(item, index) => <div key={index}>{item}</div>}
    </For>
  )
}

```

## Usage

The `For` component is used to render a list of items in a strongly typed
manner. It is similar to the `.map()`.

```jsx
import { For } from "@chakra-ui/react"
```

```jsx
<For each={[]} fallback={...} />
```

## Examples

### Object

Here's an example of using the `For` component to loop over an object.

```tsx
import { Box, For, Stack, Text } from "@chakra-ui/react"

export const ForWithObject = () => {
  return (
    <Stack>
      <For
        each={[
          { name: "Naruto", powers: ["Shadow Clone", "Rasengan"] },
          { name: "Sasuke", powers: ["Chidori", "Sharingan"] },
          { name: "Sakura", powers: ["Healing", "Super Strength"] },
        ]}
      >
        {(item, index) => (
          <Box borderWidth="1px" key={index} p="4">
            <Text fontWeight="bold">{item.name}</Text>
            <Text color="fg.muted">Powers: {item.powers.join(", ")}</Text>
          </Box>
        )}
      </For>
    </Stack>
  )
}

```

### Fallback

Use the `fallback` prop to render a fallback component when the array is empty
or undefined.

```tsx
import { For, Stack, VStack } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { LuBox } from "react-icons/lu"

export const ForWithFallback = () => {
  return (
    <Stack gap="4">
      <For
        each={[]}
        fallback={
          <VStack textAlign="center" fontWeight="medium">
            <LuBox />
            No items to show
          </VStack>
        }
      >
        {(item, index) => (
          <DecorativeBox h="10" key={index}>
            {item}
          </DecorativeBox>
        )}
      </For>
    </Stack>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| each | undefined | `T[] \| readonly T[] \| undefined` | The array to iterate over |
| fallback | undefined | `React.ReactNode \| undefined` | The fallback content to render when the array is empty |
