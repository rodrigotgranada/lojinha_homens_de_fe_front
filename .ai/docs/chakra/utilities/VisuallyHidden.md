# components > Visually Hidden
  
  URL: docs/components/visually-hidden
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/visually-hidden.mdx
  
  Used to hide content visually but keep it accessible to screen readers.
          
  ***
  
  title: Visually Hidden
  description: Used to hide content visually but keep it accessible to screen readers.
  links: 

  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Button, VisuallyHidden } from "@chakra-ui/react"
import { LuBell } from "react-icons/lu"

export const VisuallyHiddenBasic = () => {
  return (
    <Button>
      <LuBell /> 3 <VisuallyHidden>Notifications</VisuallyHidden>
    </Button>
  )
}

```

## Usage

```jsx
import { VisuallyHidden } from "@chakra-ui/react"
```

```jsx
<VisuallyHidden>Hidden content</VisuallyHidden>
```

## Examples

### Input

Using the `asChild` prop, you can pass a child element to the `VisuallyHidden`
component.

```tsx
import { HStack, VisuallyHidden } from "@chakra-ui/react"

export const VisuallyHiddenWithInput = () => {
  return (
    <HStack>
      The input is hidden
      <VisuallyHidden asChild>
        <input type="text" placeholder="Search..." />
      </VisuallyHidden>
    </HStack>
  )
}

```