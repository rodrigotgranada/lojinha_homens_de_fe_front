# components > Link Overlay
  
  URL: docs/components/link-overlay
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/link-overlay.mdx
  
  Used to stretch a link over a container.
          
  ***
  
  title: Link Overlay
  description: Used to stretch a link over a container.
  links: 

  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Heading, Link, LinkOverlay, Stack, Text } from "@chakra-ui/react"

export const LinkOverlayBasic = () => {
  return (
    <Stack position="relative">
      <Heading as="h4">Wanna try it out?</Heading>
      <Text color="fg.muted">
        This entire area is a link. Click it to see the effect.
      </Text>
      <LinkOverlay asChild href="#">
        <Link variant="underline">Click me</Link>
      </LinkOverlay>
    </Stack>
  )
}

```

## Usage

The `LinkOverlay` component provides a semantic way to link an entire component
or card.

```jsx
import { LinkBox, LinkOverlay } from "@chakra-ui/react"
```

```jsx
<LinkBox>
  <LinkOverlay />
</LinkBox>
```

## Examples

### Article

Here's an example of using `LinkOverlay` to link an entire article.

```tsx
import {
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Span,
  Text,
} from "@chakra-ui/react"

export const LinkOverlayArticle = () => {
  return (
    <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
      <Span asChild color="fg.muted" textStyle="sm">
        <time dateTime="2021-01-15 15:30:00 +0000 UTC">13 days ago</time>
      </Span>
      <Heading size="lg" my="2">
        <LinkOverlay href="#">Chakra V3 Workshop</LinkOverlay>
      </Heading>
      <Text mb="3" color="fg.muted">
        Catch up on whats been cooking at Chakra UI and explore some of the
        popular community resources.
      </Text>
      <Link href="#inner-link" variant="underline" colorPalette="teal">
        Inner Link
      </Link>
    </LinkBox>
  )
}

```

### Custom Link

Use the `asChild` prop to add support for custom Link component like `next/link`
or react router's `Link`

```jsx
import { LinkBox, LinkOverlay } from "@chakra-ui/react"
import NextLink from "next/link"

function Example() {
  return (
    <LinkBox as="article">
      <h2>
        <LinkOverlay asChild>
          <NextLink href="#">Blog Post Title</NextLink>
        </LinkOverlay>
      </h2>
      <p>Some blog post content</p>
      <NextLink href="#inner-link">Some inner link</NextLink>
    </LinkBox>
  )
}
```

## Caveat

One of the side-effects of this technique is that the content can't be
"selectable" (i.e. with a pointing device), however, this seems to be pretty
uncommon in web design.