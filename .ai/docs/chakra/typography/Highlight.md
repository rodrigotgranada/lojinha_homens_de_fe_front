# components > Highlight
  
  URL: docs/components/highlight
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/highlight.mdx
  
  Used to highlight substrings of a text.
          
  ***
  
  title: Highlight
  description: Used to highlight substrings of a text.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/highlight
 - storybook: https://storybook.chakra-ui.com/?path=/story/typography-highlight--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/highlight.ts
 - ark: https://ark-ui.com/docs/utilities/highlight
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Highlight } from "@chakra-ui/react"

export const HighlightBasic = () => {
  return (
    <Highlight
      query="spotlight"
      styles={{ px: "0.5", bg: "orange.subtle", color: "orange.fg" }}
    >
      With the Highlight component, you can spotlight words.
    </Highlight>
  )
}

```

## Usage

```jsx
import { Highlight } from "@chakra-ui/react"
```

```jsx
<Highlight query="Hello">Hello World</Highlight>
```

## Examples

### Multiple

Pass an array of strings to the `query` prop to highlight multiple substrings.

```tsx
import { Heading, Highlight } from "@chakra-ui/react"

export const HighlightMultiple = () => {
  return (
    <Heading lineHeight="tall">
      <Highlight
        query={["spotlight", "emphasize", "accentuate"]}
        styles={{ px: "0.5", bg: "teal.muted" }}
      >
        With the Highlight component, you can spotlight, emphasize and
        accentuate words.
      </Highlight>
    </Heading>
  )
}

```

### Custom Style

Use the `styles` prop to customize the style of the highlighted text.

```tsx
import { Highlight } from "@chakra-ui/react"

export const HighlightWithCustomStyle = () => {
  return (
    <Highlight query="component" styles={{ fontWeight: "semibold" }}>
      With the Highlight component, you can spotlight words.
    </Highlight>
  )
}

```

### Search Query

Use the highlight component to highlight search query results.

```tsx
import { Highlight, Stack, Text } from "@chakra-ui/react"

const query = "spot"
const results = ["Spotlight bulb", "Spot cleaner", "Spot ceiling"]

export const HighlightSearchQuery = () => {
  return (
    <Stack gap="6">
      <Text>Search result for: spot</Text>
      <Stack gap="1">
        {results.map((item) => (
          <p key={item}>
            <Highlight
              ignoreCase
              query={query}
              styles={{ fontWeight: "semibold" }}
            >
              {item}
            </Highlight>
          </p>
        ))}
      </Stack>
    </Stack>
  )
}

```

### With Squiggle

Here's an example of how to render a custom squiggle image around the
highlighted text. Useful for a more fancy effect.

```tsx
"use client"

import { Heading, Mark, useHighlight } from "@chakra-ui/react"
import { Fragment } from "react"

export const HighlightWithSquiggle = () => {
  const chunks = useHighlight({
    text: "Endless scale, powered by real humans.",
    query: ["endless", "real humans."],
  })

  return (
    <Heading size="2xl" maxW="20ch">
      {chunks.map((chunk, index) => {
        return chunk.match ? (
          <Mark
            key={index}
            css={{
              fontStyle: "italic",
              color: "red.500",
              position: "relative",
            }}
          >
            {chunk.text}
            <img
              style={{ position: "absolute", left: 0 }}
              src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61c4dc7572d22f05ba26fd34_hero-underline.svg"
              loading="lazy"
              alt=""
            />
          </Mark>
        ) : (
          <Fragment key={index}>{chunk.text}</Fragment>
        )
      })}
    </Heading>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| query | undefined | `string \| string[]` | The query to highlight in the text |
| text | undefined | `string` | The text to highlight |
| styles | undefined | `SystemStyleObject \| undefined` | undefined |
| ignoreCase | undefined | `boolean` | Whether to ignore case while matching |
| matchAll | undefined | `boolean` | Whether to match multiple instances of the query |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| exactMatch | undefined | `boolean` | Whether to match whole words only |
