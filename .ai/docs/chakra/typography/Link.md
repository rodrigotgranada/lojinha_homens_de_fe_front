# components > Link
  
  URL: docs/components/link
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/link.mdx
  
  Used to provide accessible navigation
          
  ***
  
  title: Link
  description: Used to provide accessible navigation
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/link
 - storybook: https://storybook.chakra-ui.com/?path=/story/typography-link--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/link.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Link } from "@chakra-ui/react"

export const LinkBasic = () => {
  return <Link href="#">Visit Chakra UI</Link>
}

```

## Usage

```jsx
import { Link } from "@chakra-ui/react"
```

```jsx
<Link href="...">Click here</Link>
```

## Examples

### Variants

Use the `variant` prop to change the appearance of the `Link` component

```tsx
import { Link, Stack } from "@chakra-ui/react"

export const LinkWithVariants = () => {
  return (
    <Stack>
      <Link variant="underline" href="#">
        Link (Underline)
      </Link>
      <Link variant="plain" href="#">
        Link (Plain)
      </Link>
    </Stack>
  )
}

```

### Within Text

Use `Link` within a text to create a hyperlink

```tsx
import { Link, Text } from "@chakra-ui/react"

export const LinkWithinText = () => {
  return (
    <Text>
      Visit the{" "}
      <Link
        variant="underline"
        href="https://chakra-ui.com"
        colorPalette="teal"
      >
        Chakra UI
      </Link>{" "}
      website
    </Text>
  )
}

```

### External

Add an external link icon to the `Link` component

```tsx
import { Link } from "@chakra-ui/react"
import { LuExternalLink } from "react-icons/lu"

export const LinkWithExternal = () => {
  return (
    <Link href="#">
      Visit Chakra UI <LuExternalLink />
    </Link>
  )
}

```

## Guides

### Routing Library

Use the `asChild` prop to compose `Link` with framework links like (Next.js)

```jsx
import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"

const Demo = () => {
  return (
    <ChakraLink asChild>
      <NextLink href="/about">Click here</NextLink>
    </ChakraLink>
  )
}
```

### Styling Active Links

Use the `_currentPage` condition to style active links when using
`aria-current="page"`.

```jsx
<Link
  href="/home"
  aria-current="page"
  _currentPage={{ color: "blue.500", fontWeight: "bold" }}
>
  Home
</Link>
```

With routing libraries, set `aria-current` based on the current route:

```jsx
import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

const NavLink = ({ href, children }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <ChakraLink asChild>
      <NextLink
        href={href}
        aria-current={isActive ? "page" : undefined}
        _currentPage={{ color: "blue.500", fontWeight: "bold" }}
      >
        {children}
      </NextLink>
    </ChakraLink>
  )
}
```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| variant | plain | `'underline' \| 'plain'` | The variant of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
