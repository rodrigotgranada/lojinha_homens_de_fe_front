# components > Marquee
  
  URL: docs/components/marquee
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/marquee.mdx
  
  Create a continuous scrolling display of logos, images, or text horizontally or vertically.
          
  ***
  
  title: Marquee
  description: Create a continuous scrolling display of logos, images, or text horizontally or vertically.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/marquee
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-marquee--auto-fill
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/marquee.ts
 - ark: https://ark-ui.com/docs/components/marquee
  ------------------------------------------------------------------------------------------------
  
  ```tsx
"use client"

import { Marquee } from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"

export const MarqueeAutoFill = () => (
  <Marquee.Root autoFill spacing="2rem">
    <Marquee.Viewport>
      <Marquee.Content>
        {items.map((item, i) => (
          <Marquee.Item key={i} px="2rem">
            {item.icon && (
              <item.icon
                size="3rem"
                aria-label={item.label}
                color={item.color}
              />
            )}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]

```

## Usage

```js
import { Marquee } from "@chakra-ui/react"
```

```jsx
<Marquee.Root>
  <Marquee.Viewport>
    <Marquee.Content>
      <Marquee.Item />
    </Marquee.Content>
  </Marquee.Viewport>
</Marquee.Root>
```

## Examples

### Reversed

Use the reverse prop on the `Marquee.Root` component to reverse the direction of
the marquee.

```tsx
"use client"
import { Marquee } from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"

export const MarqueeReverseDirection = () => (
  <Marquee.Root reverse autoFill>
    <Marquee.Viewport>
      <Marquee.Content>
        {items.map((item, i) => (
          <Marquee.Item key={i} px="2rem">
            {item.icon && (
              <item.icon
                size="3rem"
                aria-label={item.label}
                color={item.color}
              />
            )}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]

```

### Vertical Animation

To animate content along the Y axis, use the `side` prop and set it to `bottom`.

```tsx
"use client"
import { Marquee } from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"

export const MarqueeVerticalAnimation = () => (
  <Marquee.Root side="bottom" height="300px" spacing="2rem">
    <Marquee.Viewport>
      <Marquee.Content>
        {items.map((item, i) => (
          <Marquee.Item key={i} px="2rem">
            {item.icon && (
              <item.icon
                size="3rem"
                aria-label={item.label}
                color={item.color}
              />
            )}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]

```

### Speed

Use the `speed` prop to control the animation speed in pixels per second.

```tsx
"use client"

import { For, Marquee, Span, Stack } from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"

const speeds = [
  { value: 25, label: "Slow (25px/s)" },
  { value: 50, label: "Normal (50px/s)" },
  { value: 100, label: "Fast (100px/s)" },
]

export const MarqueeWithSpeed = () => (
  <Stack gap="12">
    <For each={speeds}>
      {(speed) => (
        <Stack key={speed.value} gap="4">
          <Span fontWeight="medium" textStyle="sm">
            {speed.label}
          </Span>
          <Marquee.Root speed={speed.value}>
            <Marquee.Viewport>
              <Marquee.Content>
                {items.map((item, i) => (
                  <Marquee.Item key={i} px="2rem">
                    {item.icon && (
                      <item.icon
                        size="3rem"
                        aria-label={item.label}
                        color={item.color}
                      />
                    )}
                  </Marquee.Item>
                ))}
              </Marquee.Content>
            </Marquee.Viewport>
          </Marquee.Root>
        </Stack>
      )}
    </For>
  </Stack>
)

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]

```

### Pause On Interaction

Use the `pauseOnInteraction` prop to pause the animation when the user hovers or
focuses the marquee.

```tsx
"use client"
import { Marquee } from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"

export const MarqueePauseInteractions = () => (
  <Marquee.Root pauseOnInteraction>
    <Marquee.Viewport>
      <Marquee.Content>
        {items.map((item, i) => (
          <Marquee.Item key={i} px="2rem">
            {item.icon && (
              <item.icon
                size="3rem"
                aria-label={item.label}
                color={item.color}
              />
            )}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]

```

### Store

Use the `Marquee.RootProvider` and `useMarquee` hook to provide the marquee
instance to the component and control the animation state programmatically.

```tsx
"use client"

import {
  Button,
  ButtonGroup,
  Marquee,
  Stack,
  useMarquee,
} from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"
import { LuPause, LuPlay } from "react-icons/lu"

export const MarqueeWithStore = () => {
  const marquee = useMarquee()

  return (
    <Stack gap="8">
      <Marquee.RootProvider value={marquee}>
        <Marquee.Viewport>
          <Marquee.Content>
            {items.map((item, i) => (
              <Marquee.Item key={i} px="2rem">
                {item.icon && (
                  <item.icon
                    size="3rem"
                    aria-label={item.label}
                    color={item.color}
                  />
                )}
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>

      <ButtonGroup size="sm" variant="outline">
        <Button hidden={marquee.paused} onClick={() => marquee.pause()}>
          <LuPause /> Pause
        </Button>
        <Button hidden={!marquee.paused} onClick={() => marquee.resume()}>
          <LuPlay />
          Resume
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]

```

### Finite Loops

To loop the marquee a finite number of times, set the `loopCount` prop on
`Marquee.Root`. Alternatively, use the `onLoopComplete` and `onComplete`
callbacks to track the number of completed loops or when the animation fully
finishes.

```tsx
<Marquee.Root
  loopCount={3}
  onLoopComplete={() => {
    /* handle loop completion */
  }}
  onComplete={() => {
    /* handle animation end */
  }}
>
  {/* Marquee.Item elements */}
</Marquee.Root>
```

```tsx
"use client"

import { Marquee, Stack } from "@chakra-ui/react"
import { useState } from "react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"

export const MarqueeFiniteLoop = () => {
  const [loopCount, setLoopCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

  return (
    <>
      <Marquee.Root
        loopCount={3}
        onLoopComplete={() => setLoopCount((prev) => prev + 1)}
        onComplete={() => setCompletedCount((prev) => prev + 1)}
      >
        <Marquee.Viewport>
          <Marquee.Content>
            {items.map((item, i) => (
              <Marquee.Item key={i} px="2rem">
                {item.icon && (
                  <item.icon
                    size="3rem"
                    aria-label={item.label}
                    color={item.color}
                  />
                )}
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>

      <Stack m="4" textStyle="sm">
        <p>Loop completed: {loopCount} times</p>
        <p>Animation completed: {completedCount} times</p>
      </Stack>
    </>
  )
}

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]

```

### Edge Gradient

Render the `Marquee.Edge` component to apply an edge fade.

```tsx
"use client"
import { Marquee } from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"

export const MarqueeEdgeGradient = () => (
  <Marquee.Root>
    <Marquee.Edge side="start" />
    <Marquee.Viewport>
      <Marquee.Content>
        {items.map((item, i) => (
          <Marquee.Item key={i} px="2rem">
            {item.icon && (
              <item.icon
                size="3rem"
                aria-label={item.label}
                color={item.color}
              />
            )}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
    <Marquee.Edge side="end" />
  </Marquee.Root>
)

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]

```

### Multiple

Here's an example of how to render alternating marquee components.

```tsx
"use client"

import { Marquee, Stack } from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"
import type { IconType } from "react-icons/lib"

interface Item {
  icon: IconType
  color: string
}

const items: Item[] = [
  { icon: IoLogoFigma, color: "#F24E1E" },
  { icon: IoLogoTwitter, color: "#1da1f2" },
  { icon: IoLogoLinkedin, color: "#0077b5" },
  { icon: IoLogoGitlab, color: "#fc6d26" },
  { icon: IoLogoVimeo, color: "#1ab7ea" },
  { icon: IoLogoJavascript, color: "#f7df1e" },
]

export const MarqueeMultiple = () => {
  return (
    <Stack gap="8" py="8">
      <MarqueeRow items={items} />
      <MarqueeRow items={items} reverse />
    </Stack>
  )
}

interface MarqueeRowProps {
  items: Item[]
  reverse?: boolean
}

const MarqueeRow = (props: MarqueeRowProps) => {
  const { items, reverse = false } = props
  return (
    <Marquee.Root reverse={reverse} autoFill>
      <Marquee.Viewport>
        <Marquee.Content>
          {items.map((item, i) => (
            <Marquee.Item key={i} px="2rem">
              <item.icon size="3rem" color={item.color} />
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>
  )
}

```

### Diagonal

Here's an example of how to animate content diagonally using the marquee
component.

```tsx
import { Circle, HStack, Marquee } from "@chakra-ui/react"

export const MarqueeDiagonal = () => {
  return (
    <Marquee.Root
      position="relative"
      top="25%"
      overflow="hidden"
      transform="rotate(-2deg)"
      bg="bg.emphasized"
      py="4"
    >
      <Marquee.Viewport>
        <Marquee.Content>
          {[...Array(10)].map((_, i) => (
            <Marquee.Item key={i} pr="4">
              <HStack gap="8" textStyle="3xl" fontWeight="medium">
                Chakra Conf 2026
                <Circle size="1.5" bg="colorPalette.solid" />
              </HStack>
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>
  )
}

```

### News Ticker

Here's an example of how to implement a news ticker with the marquee component.

```tsx
"use client"

import { Box, Circle, Flex, HStack, Marquee } from "@chakra-ui/react"

const newsItems = [
  "Bitcoin hits all-time high",
  "New React version released",
  "SpaceX successfully lands rocket",
  "Global markets rally today",
  "AI regulation talks begin in EU",
]

export const MarqueeNewsTicker = () => {
  return (
    <Flex align="center" bg="bg.muted">
      <Box
        bg="teal.solid"
        color="teal.contrast"
        px="4"
        py="2"
        whiteSpace="nowrap"
        textStyle="sm"
        fontWeight="medium"
      >
        LATEST NEWS
      </Box>

      <Marquee.Root css={{ "--marquee-duration": "40s" }}>
        <Marquee.Viewport>
          <Marquee.Content textStyle="sm">
            {newsItems.map((item, i) => (
              <Marquee.Item key={i} pr="4">
                <HStack
                  align="center"
                  gap="8"
                  fontWeight="medium"
                  textTransform="uppercase"
                >
                  {item}
                  <Circle size="1" bg="colorPalette.solid" />
                </HStack>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Flex>
  )
}

```

### Image Gallery

Here's an example of a 3D perspective image gallery with multiple vertical
marquees scrolling in alternating directions.

```tsx
"use client"

import { Box, HStack, Image, Marquee } from "@chakra-ui/react"

export const MarqueeImageGallery = () => (
  <Box height="500px" overflow="hidden" perspective="500px">
    <HStack
      gap="4"
      height="700px"
      transform="rotateX(20deg)"
      transformOrigin="center top"
    >
      <Marquee.Root side="top" flex="1" autoFill>
        <Marquee.Viewport>
          <Marquee.Content>
            <MarqueeItems images={imagesColumn1} />
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>

      <Marquee.Root side="bottom" flex="1" autoFill>
        <Marquee.Viewport>
          <Marquee.Content>
            <MarqueeItems images={imagesColumn2} />
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>

      <Marquee.Root side="top" flex="1" autoFill>
        <Marquee.Viewport>
          <Marquee.Content>
            <MarqueeItems images={imagesColumn3} />
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </HStack>
  </Box>
)

const MarqueeItems = (props: { images: string[] }) => {
  return (
    <>
      {props.images.map((src, i) => (
        <Marquee.Item key={i} py="2">
          <Image
            src={src}
            alt={`Gallery image ${i + 1}`}
            width="full"
            height="200px"
            objectFit="cover"
            rounded="lg"
            shadow="md"
          />
        </Marquee.Item>
      ))}
    </>
  )
}

const imagesColumn1 = [
  "https://picsum.photos/seed/img1/280/200",
  "https://picsum.photos/seed/img2/280/200",
  "https://picsum.photos/seed/img3/280/200",
  "https://picsum.photos/seed/img4/280/200",
]

const imagesColumn2 = [
  "https://picsum.photos/seed/img5/280/200",
  "https://picsum.photos/seed/img6/280/200",
  "https://picsum.photos/seed/img7/280/200",
  "https://picsum.photos/seed/img8/280/200",
]

const imagesColumn3 = [
  "https://picsum.photos/seed/img9/280/200",
  "https://picsum.photos/seed/img10/280/200",
  "https://picsum.photos/seed/img11/280/200",
  "https://picsum.photos/seed/img12/280/200",
]

```

### Testimonials

You can display testimonials with the marquee component.

```tsx
"use client"

import { Avatar, Box, Card, HStack, Marquee, Stack } from "@chakra-ui/react"
import { IoStar } from "react-icons/io5"

export const MarqueeWithTestimonials = () => (
  <Marquee.Root pauseOnInteraction py="10">
    <Marquee.Edge side="start" />
    <Marquee.Viewport>
      <Marquee.Content>
        {testimonials.map((item, i) => (
          <Marquee.Item key={i} px="1rem">
            <TestimonialCard item={item} />
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
    <Marquee.Edge side="end" />
  </Marquee.Root>
)

const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <Card.Root maxW="sm" h="full">
      <Card.Body>
        <Stack gap="3">
          <HStack gap="1">
            {[...Array(5)].map((_, i) => (
              <Box as={IoStar} key={i} color="orange.solid" />
            ))}
          </HStack>

          <Card.Description color="fg.muted" textStyle="md" minH="16">
            "{item.content}"
          </Card.Description>

          <HStack gap="3" mt="1">
            <Avatar.Root size="sm">
              <Avatar.Image src={item.avatar} />
              <Avatar.Fallback name={item.name} />
            </Avatar.Root>
            <Box textStyle="sm">
              <Box fontWeight="medium" color="fg">
                {item.name}
              </Box>
              <Box color="fg.muted">{item.role}</Box>
            </Box>
          </HStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

interface Testimonial {
  name: string
  role: string
  rating: number
  avatar: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    content:
      "This library saved me weeks of work. The components are accessible and easy to customize.",
  },
  {
    name: "Michael Torres",
    role: "Frontend Dev",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    content:
      "The animations are buttery smooth. I love how easy it is to implement the marquee.",
  },
  {
    name: "Emily Wang",
    role: "CTO",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    content:
      "Scalable, reliable, and beautiful. Highly recommended for any modern web project.",
  },
  {
    name: "David Smith",
    role: "Marketing Lead",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    content:
      "Our conversion rates increased by 15% after switching to this UI system.",
  },
  {
    name: "Jessica Lee",
    role: "Indie Hacker",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    content:
      "Documentation is top-notch. I was able to build my MVP in a single weekend.",
  },
]

```

### RTL Support

The marquee component supports RTL (right-to-left) layouts. Wrap the component
with `LocaleProvider` to enable RTL mode.

```tsx
"use client"

import { Box, Circle, HStack, LocaleProvider, Marquee } from "@chakra-ui/react"

export const MarqueeRtl = () => (
  <LocaleProvider locale="ar-AE">
    <Marquee.Root>
      <Marquee.Viewport>
        <Marquee.Content>
          {items.map((item, i) => (
            <Marquee.Item key={i} ps="8">
              <HStack gap="8" textStyle="xl" fontWeight="medium">
                <Box>{item}</Box>
                <Circle size="1.5" bg="fg.muted" />
              </HStack>
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>
  </LocaleProvider>
)

const items = [
  "مرحبا بكم",
  "تصميم جميل",
  "سهل الاستخدام",
  "مكونات قابلة للوصول",
  "أداء عالي",
  "تجربة مستخدم رائعة",
]

```

## Guide

### CSS Variables

The marquee component exposes CSS variables that can be used to customize its
behavior and appearance.

```tsx
<Marquee.Root
  css={{
    "--marquee-duration": "30s",
    "--marquee-delay": "0s",
    "--marquee-loop-count": "infinite",
    "--marquee-edge-color": "colors.bg",
    "--marquee-edge-size": "20%",
  }}
>
  {/* ... */}
</Marquee.Root>
```

| Variable               | Description                         | Default     |
| ---------------------- | ----------------------------------- | ----------- |
| `--marquee-duration`   | Animation duration                  | Computed    |
| `--marquee-delay`      | Animation delay before starting     | `0s`        |
| `--marquee-loop-count` | Number of animation iterations      | `infinite`  |
| `--marquee-edge-color` | Color for the edge gradient overlay | `colors.bg` |
| `--marquee-edge-size`  | Size of the edge gradient           | `20%`       |

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| autoFill | false | `boolean` | Whether to automatically duplicate content to fill the container. |
| defaultPaused | false | `boolean` | Whether the marquee is paused by default. |
| delay | 0 | `number` | The delay before the animation starts (in seconds). |
| loopCount | 0 | `number` | The number of times to loop the animation (0 = infinite). |
| pauseOnInteraction | false | `boolean` | Whether to pause the marquee on user interaction (hover, focus). |
| reverse | false | `boolean` | Whether to reverse the animation direction. |
| side | "start" | `Side` | The side/direction the marquee scrolls towards. |
| spacing | "1rem" | `string` | The spacing between marquee items. |
| speed | 50 | `number` | The speed of the marquee animation in pixels per second. |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| ids | undefined | `Partial<{ root: string; viewport: string; content: (index: number) => string }>` | The ids of the elements in the marquee. Useful for composition. |
| onComplete | undefined | `() => void` | Function called when the marquee completes all loops and stops.
Only fires for finite loops (loopCount > 0). |
| onLoopComplete | undefined | `() => void` | Function called when the marquee completes one loop iteration. |
| onPauseChange | undefined | `(details: PauseStatusDetails) => void` | Function called when the pause status changes. |
| paused | undefined | `boolean` | Whether the marquee is paused. |
| translations | undefined | `IntlTranslations` | The localized messages to use. |


---