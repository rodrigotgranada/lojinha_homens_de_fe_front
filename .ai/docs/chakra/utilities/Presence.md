# components > Presence
  
  URL: docs/components/presence
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/presence.mdx
  
  Used to animate the entry and exit of an element while controlled the render behavior
          
  ***
  
  title: Presence
  description: Used to animate the entry and exit of an element while controlled the render behavior
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/presence
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-presence--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/presence.ts
 - ark: https://ark-ui.com/docs/utilities/presence
  ------------------------------------------------------------------------------------------------
  
  ```tsx
"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceFade = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        present={open}
        animationName={{ _open: "fade-in", _closed: "fade-out" }}
        animationDuration="moderate"
      >
        <Center p="10" layerStyle="fill.muted">
          Fade
        </Center>
      </Presence>
    </Stack>
  )
}

```

## Usage

```jsx
import { Presence } from "@chakra-ui/react"
```

```jsx
<Presence present={true}>
  <div>Presence content</div>
</Presence>
```

Think of `Presence` like the `AnimatePresence` component from Framer Motion,
except that it's built for CSS animations instead.

The key things to note:

- the `present` prop is a boolean that controls the presence state of the
  component.
- the `_open` condition is used to style the open state.
- the `_closed` condition is used to style the closed state.

## Examples

### Fade

Setting the animation name to `fade-in` and `fade-out`, the component will
animate the entry and exit of the element.

```tsx
"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceFade = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        present={open}
        animationName={{ _open: "fade-in", _closed: "fade-out" }}
        animationDuration="moderate"
      >
        <Center p="10" layerStyle="fill.muted">
          Fade
        </Center>
      </Presence>
    </Stack>
  )
}

```

### Scale Fade

Using the animation styles `scale-fade-in` and `scale-fade-out`, the component
will animate the entry and exit of the element.

```tsx
"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceScaleFade = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        present={open}
        animationStyle={{ _open: "scale-fade-in", _closed: "scale-fade-out" }}
        animationDuration="moderate"
      >
        <Center p="10" layerStyle="fill.muted">
          Scale Fade
        </Center>
      </Presence>
    </Stack>
  )
}

```

### Slide Fade

Here's an example that uses the animation names `slide-from-bottom` and
`slide-to-bottom` to animate the entry and exit of the element.

```tsx
"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceSlideFade = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        present={open}
        animationName={{
          _open: "slide-from-bottom, fade-in",
          _closed: "slide-to-bottom, fade-out",
        }}
        animationDuration="moderate"
      >
        <Center p="10" layerStyle="fill.muted">
          Slide Fade
        </Center>
      </Presence>
    </Stack>
  )
}

```

### Slide

Here's an example that uses the animation names `slide-from-bottom-full` and
`slide-to-bottom-full` to animate the entry and exit of the element.

```tsx
"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceSlide = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        position="fixed"
        bottom="0"
        insetX="0"
        present={open}
        animationName={{
          _open: "slide-from-bottom-full",
          _closed: "slide-to-bottom-full",
        }}
        animationDuration="moderate"
      >
        <Center p="10" roundedTop="md" layerStyle="fill.muted">
          Slide
        </Center>
      </Presence>
    </Stack>
  )
}

```

### Lazy Mount

Use the `lazyMount` prop to delay the mount of the component until it's present.

```tsx
"use client"

import {
  Alert,
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceLazyMount = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Alert.Root>
        <Alert.Indicator />
        <Alert.Title>
          Check the DOM to see that the element not mounted initially
        </Alert.Title>
      </Alert.Root>
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        lazyMount
        present={open}
        animationName={{ _open: "fade-in", _closed: "fade-out" }}
        animationDuration="moderate"
      >
        <Center p="10" layerStyle="fill.muted">
          Fade
        </Center>
      </Presence>
    </Stack>
  )
}

```

### Unmount On Exit

Use the `unmountOnExit` prop to unmount the component when it's not present.

```tsx
"use client"

import {
  Alert,
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceUnmountOnExit = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Alert.Root>
        <Alert.Indicator />
        <Alert.Title>
          Check the DOM to see that the element is removed when not present.
        </Alert.Title>
      </Alert.Root>
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        unmountOnExit
        present={open}
        animationName={{ _open: "fade-in", _closed: "fade-out" }}
        animationDuration="moderate"
      >
        <Center p="10" layerStyle="fill.muted">
          Fade
        </Center>
      </Presence>
    </Stack>
  )
}

```