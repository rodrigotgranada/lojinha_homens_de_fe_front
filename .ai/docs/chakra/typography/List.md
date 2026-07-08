# components > List
  
  URL: docs/components/list
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/list.mdx
  
  Used to display a list of items
          
  ***
  
  title: List
  description: Used to display a list of items
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/list
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-list--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/list.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { List } from "@chakra-ui/react"

export const ListBasic = () => (
  <List.Root>
    <List.Item>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit
    </List.Item>
    <List.Item>
      Assumenda, quia temporibus eveniet a libero incidunt suscipit
    </List.Item>
    <List.Item>
      Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
    </List.Item>
  </List.Root>
)

```

## Usage

```jsx
import { List } from "@chakra-ui/react"
```

```jsx
<List.Root>
  <List.Item>Item 1</List.Item>
  <List.Item>Item 2</List.Item>
</List.Root>
```

## Examples

### Ordered

Pass the `as="ol"` prop to create an ordered list

```tsx
import { List } from "@chakra-ui/react"

export const ListOrdered = () => {
  return (
    <List.Root as="ol">
      <List.Item>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </List.Item>
      <List.Item>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </List.Item>
      <List.Item>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </List.Item>
    </List.Root>
  )
}

```

### Icon

Use the `List.Indicator` component to add an icon to the list

```tsx
import { List } from "@chakra-ui/react"
import { LuCircleCheck, LuCircleDashed } from "react-icons/lu"

export const ListWithIcon = () => {
  return (
    <List.Root gap="2" variant="plain" align="center">
      <List.Item>
        <List.Indicator asChild color="green.500">
          <LuCircleCheck />
        </List.Indicator>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </List.Item>
      <List.Item>
        <List.Indicator asChild color="green.500">
          <LuCircleCheck />
        </List.Indicator>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </List.Item>
      <List.Item>
        <List.Indicator asChild color="green.500">
          <LuCircleDashed />
        </List.Indicator>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </List.Item>
    </List.Root>
  )
}

```

### Nested

Here's an example of a nested list

```tsx
import { List } from "@chakra-ui/react"

export const ListNested = () => {
  return (
    <List.Root>
      <List.Item>First order item</List.Item>
      <List.Item>First order item</List.Item>
      <List.Item>
        First order item with list
        <List.Root ps="5">
          <List.Item>Nested item</List.Item>
          <List.Item>Nested item</List.Item>
          <List.Item>Nested item</List.Item>
        </List.Root>
      </List.Item>
      <List.Item>First order item</List.Item>
    </List.Root>
  )
}

```

### Marker Style

Use the `_marker` prop to style the marker of the list

```tsx
import { List } from "@chakra-ui/react"

const items = [
  "Your failure to comply with any provision of these Terms of Service;",
  "Your use of the Services, including but not limited to economic, physical, emotional, psychological or privacy related considerations; and",
  "Your actions to knowingly affect the Services via any bloatware, malware, computer virus, worm, Trojan horse, spyware, adware, crimeware, scareware, rootkit or any other program installed in a way that executable code of any program is scheduled to utilize or utilizes processor cycles during periods of time when such program is not directly or indirectly being used.",
]

export const ListWithMarkerStyle = () => {
  return (
    <List.Root as="ol" listStyle="decimal">
      {items.map((item, index) => (
        <List.Item key={index} _marker={{ color: "inherit" }}>
          {item}
        </List.Item>
      ))}
    </List.Root>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| variant | marker | `'marker' \| 'plain'` | The variant of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| align | undefined | `'center' \| 'start' \| 'end'` | The align of the component |


## Explorer

Explore the `List` component parts interactively. Click on parts in the sidebar
to highlight them in the preview.

<Explorer name="list-basic" />