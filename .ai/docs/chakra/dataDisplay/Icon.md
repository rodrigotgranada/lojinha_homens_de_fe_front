# components > Icon
  
  URL: docs/components/icon
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/icon.mdx
  
  Used to display an svg icon
          
  ***
  
  title: Icon
  description: Used to display an svg icon
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/icon
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-icon--basic
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Icon } from "@chakra-ui/react"
import { HiHeart } from "react-icons/hi"

export const IconBasic = () => (
  <Icon size="lg" color="pink.700">
    <HiHeart />
  </Icon>
)

```

## Usage

```jsx
import { Icon } from "@chakra-ui/react"
```

```jsx
<Icon />
```

:::warning

Chakra doesn't provide any icons out of the box. Use popular icon libraries like
[react-icons](https://react-icons.github.io/react-icons/) or
[lucide-react](https://lucide.dev/react/)

:::

## Examples

### React Icons

Integrate with popular react icon libraries like `react-icons`

```tsx
import { Icon } from "@chakra-ui/react"
import { Md3dRotation } from "react-icons/md"

export const IconWithReactIcon = () => (
  <Icon size="lg" color="tomato">
    <Md3dRotation />
  </Icon>
)

```

### Custom svg

Use the `asChild` prop to render custom svg icons within the `Icon` component

```tsx
import { Icon } from "@chakra-ui/react"

export const IconWithCustomSvg = () => {
  return (
    <Icon size="lg" color="red.500" asChild>
      <svg viewBox="0 0 32 32">
        <g fill="currentColor">
          <path d="M16,11.5a3,3,0,1,0-3-3A3,3,0,0,0,16,11.5Z" />
          <path d="M16.868.044A8.579,8.579,0,0,0,16,0a15.99,15.99,0,0,0-.868,31.956A8.579,8.579,0,0,0,16,32,15.99,15.99,0,0,0,16.868.044ZM16,26.5a3,3,0,1,1,3-3A3,3,0,0,1,16,26.5ZM16,15A8.483,8.483,0,0,0,8.788,27.977,13.986,13.986,0,0,1,16,2a6.5,6.5,0,0,1,0,13Z" />
        </g>
      </svg>
    </Icon>
  )
}

```

### Create Icon

Use the `createIcon` utility to create custom icons

```tsx
"use client"

import { createIcon } from "@chakra-ui/react"

const HeartIcon = createIcon({
  displayName: "HeartIcon",
  path: (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        fill="currentColor"
        d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
      />
    </>
  ),
})

export const IconWithCreateIcon = () => {
  return <HeartIcon size="lg" color="blue.400" />
}

```