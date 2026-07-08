# components > Combobox
  
  URL: docs/components/combobox
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/combobox.mdx
  
  A versatile input component that combines a text input with a listbox, allowing users to filter a list of options and select single or multiple values.
          
  ***
  
  title: Combobox
  description: A versatile input component that combines a text input with a listbox, allowing users to filter a list of options and select single or multiple values.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/combobox
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-combobox--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/combobox.ts
 - ark: https://ark-ui.com/docs/components/combobox
  ------------------------------------------------------------------------------------------------
  
  ```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxBasic = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

## Usage

```tsx
import { Combobox } from "@chakra-ui/react"
```

```tsx
<Combobox.Root>
  <Combobox.Label />

  <Combobox.Control>
    <Combobox.Input />
    <Combobox.IndicatorGroup>
      <Combobox.ClearTrigger />
      <Combobox.Trigger />
    </Combobox.IndicatorGroup>
  </Combobox.Control>

  <Combobox.Positioner>
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.Item />

      <Combobox.ItemGroup>
        <Combobox.ItemGroupLabel />
        <Combobox.Item />
      </Combobox.ItemGroup>
    </Combobox.Content>
  </Combobox.Positioner>
</Combobox.Root>
```

To setup combobox, you need to import the following hooks:

- `useListCollection`: Used to manage the
  [list collection](https://ark-ui.com/docs/collections/list-collection) in the
  combobox, providing helpful methods for filtering and mutating the list.

- `useFilter`: Used to provide the filtering logic for the combobox based on
  [`Intl.Collator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator)
  APIs.

## Examples

### Basic

The basic combobox provides a searchable dropdown with single selection.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxBasic = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Sizes

Pass the `size` prop to the `Combobox.Root` to change the size of the combobox.

```tsx
"use client"

import {
  Combobox,
  Portal,
  Stack,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithSizes = () => {
  return (
    <Stack gap="8">
      <ComboboxDemo size="xs" />
      <ComboboxDemo size="sm" />
      <ComboboxDemo size="md" />
      <ComboboxDemo size="lg" />
    </Stack>
  )
}

const ComboboxDemo = (props: Omit<Combobox.RootProps, "collection">) => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      {...props}
      onInputValueChange={(e) => filter(e.inputValue)}
      collection={collection}
    >
      <Combobox.Label>
        Select framework ({props.size?.toString()})
      </Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Variants

Pass the `variant` prop to the `Combobox.Root` to change the appearance of the
combobox.

```tsx
"use client"

import {
  Combobox,
  Portal,
  Stack,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithVariants = () => {
  return (
    <Stack gap="8">
      <ComboboxDemo variant="subtle" />
      <ComboboxDemo variant="outline" />
      <ComboboxDemo variant="flushed" />
    </Stack>
  )
}

const ComboboxDemo = (props: Omit<Combobox.RootProps, "collection">) => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      {...props}
      onInputValueChange={(e) => filter(e.inputValue)}
      collection={collection}
    >
      <Combobox.Label>
        Select framework ({props.variant?.toString()})
      </Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Multiple

Pass the `multiple` prop to the `Combobox.Root` to enable multiple selection.
This allows users to select multiple items from the list.

> When this is set, the combobox will always clear the input value when an item
> is selected.

```tsx
"use client"

import {
  Badge,
  Combobox,
  Portal,
  Wrap,
  createListCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "GraphQL",
  "PostgreSQL",
]

export const ComboboxWithMultiple = () => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const filteredItems = useMemo(
    () =>
      skills.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [searchValue],
  )

  const collection = useMemo(
    () => createListCollection({ items: filteredItems }),
    [filteredItems],
  )

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setSelectedSkills(details.value)
  }

  return (
    <Combobox.Root
      multiple
      closeOnSelect
      width="320px"
      value={selectedSkills}
      collection={collection}
      onValueChange={handleValueChange}
      onInputValueChange={(details) => setSearchValue(details.inputValue)}
    >
      <Wrap gap="2">
        {selectedSkills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </Wrap>

      <Combobox.Label>Select Skills</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Skills</Combobox.ItemGroupLabel>
              {filteredItems.map((item) => (
                <Combobox.Item key={item} item={item}>
                  {item}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
              <Combobox.Empty>No skills found</Combobox.Empty>
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

```

### Async Loading

Here's an example of loading the `collection` asynchronously as users type,
perfect for API-driven search interfaces.

```tsx
"use client"

import {
  Combobox,
  HStack,
  Portal,
  Span,
  Spinner,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import { useAsync } from "react-use"

export const ComboboxWithAsyncContent = () => {
  const [inputValue, setInputValue] = useState("")

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  const state = useAsync(async () => {
    const response = await fetch(
      `https://swapi.py4e.com/api/people/?search=${inputValue}`,
    )
    const data = await response.json()
    set(data.results)
  }, [inputValue, set])

  return (
    <Combobox.Root
      width="320px"
      collection={collection}
      placeholder="Example: C-3PO"
      onInputValueChange={(e) => setInputValue(e.inputValue)}
      positioning={{ sameWidth: false, placement: "bottom-start" }}
    >
      <Combobox.Label>Search Star Wars Characters</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content minW="sm">
            {state.loading ? (
              <HStack p="2">
                <Spinner size="xs" borderWidth="1px" />
                <Span>Loading...</Span>
              </HStack>
            ) : state.error ? (
              <Span p="2" color="fg.error">
                Error fetching
              </Span>
            ) : (
              collection.items?.map((character) => (
                <Combobox.Item key={character.name} item={character}>
                  <HStack justify="space-between" textStyle="sm">
                    <Span fontWeight="medium" truncate>
                      {character.name}
                    </Span>
                    <Span color="fg.muted" truncate>
                      {character.height}cm / {character.mass}kg
                    </Span>
                  </HStack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

interface Character {
  name: string
  height: string
  mass: string
  created: string
  edited: string
  url: string
}

```

### Highlight Matching Text

Here's an example of composing the `Combobox.Item` and `Highlight` components to
highlight matching text in search results.

```tsx
"use client"

import {
  Combobox,
  Highlight,
  Portal,
  useComboboxContext,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithHighlight = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <ComboboxItem item={item} key={item.value} />
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

function ComboboxItem(props: { item: { label: string; value: string } }) {
  const { item } = props
  const combobox = useComboboxContext()
  return (
    <Combobox.Item item={item} key={item.value}>
      <Combobox.ItemText>
        <Highlight
          ignoreCase
          query={combobox.inputValue}
          styles={{ bg: "yellow.emphasized", fontWeight: "medium" }}
        >
          {item.label}
        </Highlight>
      </Combobox.ItemText>
    </Combobox.Item>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Open on Click

Use the `openOnClick` prop to open the combobox when the user clicks on the
input.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxOpenOnClick = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
      openOnClick
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Custom Objects

By default, the combobox collection expects an array of objects with `label` and
`value` properties. In some cases, you may need to deal with custom objects.

Use the `itemToString` and `itemToValue` props to map the custom object to the
required interface.

```tsx
const items = [
  { country: "United States", code: "US", flag: "🇺🇸" },
  { country: "Canada", code: "CA", flag: "🇨🇦" },
  { country: "Australia", code: "AU", flag: "🇦🇺" },
  // ...
]

const { contains } = useFilter({ sensitivity: "base" })

const { collection } = useListCollection({
  initialItems: items,
  itemToString: (item) => item.country,
  itemToValue: (item) => item.code,
  filter: contains,
})
```

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithCustomObject = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: countries,
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={handleInputChange}
    >
      <Combobox.Label>Search Countries</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. United States" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>

            {collection.items.map((item) => (
              <Combobox.Item key={item.code} item={item}>
                {item.country}
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const countries = [
  { country: "United States", code: "US", flag: "🇺🇸" },
  { country: "Canada", code: "CA", flag: "🇨🇦" },
  { country: "Australia", code: "AU", flag: "🇦🇺" },
  { country: "United Kingdom", code: "UK", flag: "🇬🇧" },
  { country: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { country: "South Africa", code: "ZA", flag: "🇿🇦" },
  { country: "India", code: "IN", flag: "🇮🇳" },
  { country: "China", code: "CN", flag: "🇨🇳" },
  { country: "Japan", code: "JP", flag: "🇯🇵" },
  { country: "Korea", code: "KR", flag: "🇰🇷" },
  { country: "Vietnam", code: "VN", flag: "🇻🇳" },
  { country: "Thailand", code: "TH", flag: "🇹🇭" },
  { country: "Malaysia", code: "MY", flag: "🇲🇾" },
  { country: "Indonesia", code: "ID", flag: "🇮🇩" },
  { country: "Philippines", code: "PH", flag: "🇵🇭" },
  { country: "Singapore", code: "SG", flag: "🇸🇬" },
  { country: "Hong Kong", code: "HK", flag: "🇭🇰" },
  { country: "Macau", code: "MO", flag: "🇲🇴" },
  { country: "Taiwan", code: "TW", flag: "🇹🇼" },
]

```

### Minimum Characters

Use the `openOnChange` prop to set a minimum number of characters before
filtering the list.

```tsx
<Combobox.Root openOnChange={(e) => e.inputValue.length > 2} />
```

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxMinCharacter = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      openOnChange={(e) => e.inputValue.length > 2}
      width="320px"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Field

Compose the `Combobox` component with the `Field` component to wrap the combobox
in a form field. Useful for form layouts.

```tsx
"use client"

import {
  Combobox,
  Field,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithField = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Field.Root width="320px">
      <Field.Label>Select framework</Field.Label>
      <Combobox.Root
        collection={collection}
        onInputValueChange={(e) => filter(e.inputValue)}
      >
        <Combobox.Control>
          <Combobox.Input placeholder="Type to search" />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Field.HelperText>The framework you love to use</Field.HelperText>

        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.Empty>No items found</Combobox.Empty>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value}>
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </Field.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Form + Custom Object

When working with custom objects in forms, you often need to submit the
programmatic value rather than the display value. This example shows how to
combine custom object mapping with form submission using a hidden input.

The key is using `itemToValue` to define what gets submitted, while
`itemToString` controls what users see. A hidden input captures the programmatic
value for form submission.

> In this example, users see "🇺🇸 United States" but the form submits "US".

```tsx
"use client"

import {
  Button,
  Combobox,
  Field,
  Portal,
  Stack,
  useComboboxContext,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

// This is a hidden input that is used to store the value of the combobox
const ComboboxHiddenInput = (props: React.ComponentProps<"input">) => {
  const combobox = useComboboxContext()
  return <input type="hidden" value={combobox.value[0]} readOnly {...props} />
}

export const ComboboxWithFormSubmit = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: countries,
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter: contains,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const country = formData.get("country")
    console.log("Form submitted with country code:", country)
    alert(`Selected country code: ${country}`)
  }

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="4" align="flex-start">
        <Field.Root width="320px">
          <Field.Label>Country</Field.Label>
          <Combobox.Root
            collection={collection}
            onInputValueChange={handleInputChange}
          >
            <Combobox.Control>
              <Combobox.Input placeholder="Search countries (e.g. United States)" />
              <Combobox.IndicatorGroup>
                <Combobox.ClearTrigger />
                <Combobox.Trigger />
              </Combobox.IndicatorGroup>
            </Combobox.Control>

            <ComboboxHiddenInput name="country" />

            <Portal>
              <Combobox.Positioner>
                <Combobox.Content>
                  <Combobox.Empty>No countries found</Combobox.Empty>
                  {collection.items.map((item) => (
                    <Combobox.Item key={item.code} item={item}>
                      {item.flag} {item.country}
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </Combobox.Content>
              </Combobox.Positioner>
            </Portal>
          </Combobox.Root>
          <Field.HelperText>
            The form will submit the country code (e.g. "US"), not the display
            name
          </Field.HelperText>
        </Field.Root>

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

const countries = [
  { country: "United States", code: "US", flag: "🇺🇸" },
  { country: "Canada", code: "CA", flag: "🇨🇦" },
  { country: "Australia", code: "AU", flag: "🇦🇺" },
  { country: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { country: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { country: "South Africa", code: "ZA", flag: "🇿🇦" },
  { country: "India", code: "IN", flag: "🇮🇳" },
  { country: "China", code: "CN", flag: "🇨🇳" },
  { country: "Japan", code: "JP", flag: "🇯🇵" },
  { country: "Korea", code: "KR", flag: "🇰🇷" },
  { country: "Vietnam", code: "VN", flag: "🇻🇳" },
  { country: "Thailand", code: "TH", flag: "🇹🇭" },
  { country: "Malaysia", code: "MY", flag: "🇲🇾" },
  { country: "Indonesia", code: "ID", flag: "🇮🇩" },
  { country: "Philippines", code: "PH", flag: "🇵🇭" },
  { country: "Singapore", code: "SG", flag: "🇸🇬" },
  { country: "Hong Kong", code: "HK", flag: "🇭🇰" },
  { country: "Macau", code: "MO", flag: "🇲🇴" },
  { country: "Taiwan", code: "TW", flag: "🇹🇼" },
]

```

### Hook Form

This example demonstrates how to integrate the Combobox with React Hook Form
using the `Controller` component. The form automatically receives the item's
`value` property without needing a hidden input.

Users see "React" but the form receives "react".

```tsx
"use client"

import {
  Button,
  Combobox,
  Field,
  Portal,
  Stack,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  framework: z.string({ message: "Framework is required" }).min(1),
})

type FormValues = z.infer<typeof formSchema>

export const ComboboxWithHookForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted with:", data)
    alert(`Selected framework: ${data.framework}`)
  })

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        <Field.Root invalid={!!errors.framework} width="320px">
          <Field.Label>Framework</Field.Label>
          <Controller
            control={control}
            name="framework"
            render={({ field }) => (
              <Combobox.Root
                collection={collection}
                value={field.value ? [field.value] : []}
                onValueChange={({ value }) => field.onChange(value[0] || "")}
                onInputValueChange={handleInputChange}
                onInteractOutside={() => field.onBlur()}
              >
                <Combobox.Control>
                  <Combobox.Input placeholder="Select framework" />
                  <Combobox.IndicatorGroup>
                    <Combobox.ClearTrigger />
                    <Combobox.Trigger />
                  </Combobox.IndicatorGroup>
                </Combobox.Control>

                <Portal>
                  <Combobox.Positioner>
                    <Combobox.Content>
                      <Combobox.Empty>No frameworks found</Combobox.Empty>
                      {collection.items.map((item) => (
                        <Combobox.Item key={item.value} item={item}>
                          {item.label}
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))}
                    </Combobox.Content>
                  </Combobox.Positioner>
                </Portal>
              </Combobox.Root>
            )}
          />
          <Field.ErrorText>{errors.framework?.message}</Field.ErrorText>
        </Field.Root>

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine", value: "alpine" },
]

```

### Disabled State

Pass the `disabled` prop to the `Combobox.Root` to disable the entire combobox.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithDisabled = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      disabled
      width="320px"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Disabled Item

Disable specific items in the dropdown, add the `disabled` prop to the
collection item.

```tsx {2}
const items = [
  { label: "Item 1", value: "item-1", disabled: true },
  { label: "Item 2", value: "item-2" },
]

const { collection } = useListCollection({
  initialItems: items,
  // ...
})
```

```tsx
"use client"

import {
  Combobox,
  HStack,
  Icon,
  Portal,
  Span,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithDisabledItem = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: companies,
    filter: contains,
    itemToValue: (item) => item.id,
    itemToString: (item) => item.name,
    isItemDisabled: (item) => !!item.disabled,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root
      width="320px"
      collection={collection}
      placeholder="Type to search companies"
      onInputValueChange={handleInputChange}
    >
      <Combobox.Label>Select a Company</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Companies</Combobox.ItemGroupLabel>
              {collection.items.map((country) => {
                return (
                  <Combobox.Item item={country} key={country.id}>
                    <HStack gap="3">
                      <Icon>{country.logo}</Icon>
                      <Span fontWeight="medium">{country.name}</Span>
                    </HStack>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )
              })}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

interface Company {
  id: string
  name: string
  logo: React.ReactElement
  disabled?: boolean
}

const companies: Company[] = [
  {
    id: "airbnb",
    name: "Airbnb",
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g clipPath="url(#airbnb)">
          <path fill="#EB4C60" d="M0 0h18v18H0V0Z" />
          <path
            fill="#fff"
            d="m13.565 10.777.051.123c.133.372.173.724.092 1.076a2.142 2.142 0 0 1-1.33 1.672 2.095 2.095 0 0 1-1.096.141 2.737 2.737 0 0 1-1.023-.342c-.41-.231-.819-.564-1.269-1.047-.45.483-.85.816-1.27 1.047a2.73 2.73 0 0 1-1.29.362c-.286 0-.562-.05-.828-.16a2.146 2.146 0 0 1-1.33-1.673 2.211 2.211 0 0 1 .122-1.087c.051-.13.103-.252.153-.362l.112-.242.124-.271.011-.02a115.31 115.31 0 0 1 2.261-4.552l.03-.061c.083-.151.165-.312.246-.473a3.45 3.45 0 0 1 .37-.553 1.725 1.725 0 0 1 1.31-.605c.501 0 .972.221 1.299.625.15.167.25.342.344.51l.025.043c.081.161.163.322.246.473l.03.061a104.224 104.224 0 0 1 2.262 4.552l.01.01.124.271.112.242c.034.073.067.156.102.24Zm-5.6-1.227c.123.544.482 1.188 1.035 1.873.552-.695.911-1.339 1.034-1.873.05-.201.06-.41.03-.615a.968.968 0 0 0-.163-.422C9.715 8.232 9.379 8.07 9 8.07a1.092 1.092 0 0 0-.9.443.968.968 0 0 0-.165.423c-.03.205-.019.414.031.615l-.001-.001Zm4.187 3.524c.503-.201.86-.654.932-1.178.037-.26.013-.526-.071-.775a1.97 1.97 0 0 0-.088-.216 5.032 5.032 0 0 1-.046-.107 7.415 7.415 0 0 1-.118-.251 5.735 5.735 0 0 0-.117-.252v-.01a132.7 132.7 0 0 0-2.242-4.53l-.03-.061-.123-.232-.123-.232a2.211 2.211 0 0 0-.287-.443 1.078 1.078 0 0 0-.819-.372 1.078 1.078 0 0 0-.818.372c-.113.136-.21.284-.287.443-.042.077-.083.155-.123.232-.04.079-.082.157-.123.232l-.03.06a109.354 109.354 0 0 0-2.253 4.521l-.01.02a20.74 20.74 0 0 0-.281.61 1.951 1.951 0 0 0-.087.216 1.639 1.639 0 0 0-.092.785 1.5 1.5 0 0 0 .931 1.178c.235.09.502.13.778.1.257-.03.512-.11.778-.26.369-.202.748-.515 1.167-.978-.665-.816-1.084-1.57-1.239-2.235a2.058 2.058 0 0 1-.051-.855c.041-.253.134-.484.277-.685.317-.443.85-.716 1.442-.716.595 0 1.127.263 1.444.716.143.2.235.432.276.685.031.261.021.543-.051.855-.153.665-.563 1.41-1.239 2.225.43.464.8.776 1.167.977.266.15.522.231.778.262.267.03.533 0 .778-.101Z"
          />
        </g>
        <defs>
          <clipPath id="airbnb">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "tesla",
    disabled: true,
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g clipPath="url(#tesla)">
          <path fill="#E31937" d="M0 0h18v18H0V0Z" />
          <path
            fill="#fff"
            d="m9 15 1.5-8c1.334 0 1.654.272 1.715.872 0 0 .894-.335 1.346-1.016C11.8 6.037 10 6 10 6L9 7.25 8 6s-1.8.037-3.56.856c.45.68 1.345 1.016 1.345 1.016.061-.6.39-.871 1.715-.872L9 15Z"
          />
          <path
            fill="#fff"
            d="M9 5.608a11.35 11.35 0 0 1 4.688.955C13.91 6.16 14 6 14 6c-1.823-.724-3.53-.994-5-1-1.47.006-3.177.276-5 1 0 0 .114.2.313.563A11.348 11.348 0 0 1 9 5.608Z"
          />
        </g>
        <defs>
          <clipPath id="tesla">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    name: "Tesla",
  },
  {
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g clipPath="url(#nvidia-a)">
          <path fill="url(#nvidia-b)" d="M0 0h18v18H0V0Z" />
          <path
            fill="#fff"
            d="M7.601 7.57v-.656c.065-.004.13-.008.195-.008 1.797-.057 2.975 1.547 2.975 1.547S9.5 10.218 8.136 10.218c-.183 0-.36-.029-.53-.085V8.14c.7.085.841.393 1.258 1.093l.936-.786s-.685-.894-1.834-.894a2.745 2.745 0 0 0-.365.016Zm0-2.17v.98l.195-.012c2.497-.086 4.13 2.048 4.13 2.048s-1.871 2.275-3.819 2.275c-.17 0-.336-.016-.502-.044v.607c.138.016.28.029.417.029 1.814 0 3.126-.928 4.397-2.02.21.17 1.073.578 1.251.756-1.206 1.012-4.02 1.826-5.615 1.826-.154 0-.3-.008-.446-.024v.854H14.5V5.4H7.601Zm0 4.733v.518c-1.676-.3-2.141-2.045-2.141-2.045s.805-.89 2.141-1.036v.567h-.004c-.7-.085-1.25.57-1.25.57s.31 1.106 1.254 1.426Zm-2.975-1.6s.991-1.465 2.98-1.619V6.38C5.402 6.558 3.5 8.42 3.5 8.42s1.077 3.118 4.101 3.401v-.567c-2.218-.275-2.975-2.72-2.975-2.72Z"
          />
        </g>
        <defs>
          <linearGradient
            id="nvidia-b"
            x1="16"
            x2="5.5"
            y1="-.5"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#85B737" />
            <stop offset="1" stopColor="#597B20" />
          </linearGradient>
          <clipPath id="nvidia-a">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    id: "nvida",
    name: "NVIDA",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g clipPath="url(#amazon)">
          <path d="M0 0h18v18H0V0Z" />
          <path
            fill="#fff"
            d="M12.237 10.734c-.259-.327-.458-.56-.458-1.189V7.46c0-.88-.06-1.703-.708-2.306-.519-.478-1.373-.654-2.047-.654-1.425 0-2.698.58-3.01 2.137-.026.177.104.252.207.278l1.351.123c.13 0 .208-.125.234-.25.104-.529.572-.972 1.09-.972.285 0 .848.287.848.89v.754c-.83 0-1.757.056-2.483.357-.855.353-1.586 1.028-1.586 2.11 0 1.382 1.064 2.137 2.204 2.137.96 0 1.482-.25 2.232-.979.235.352.38.603.82.979.105.051.234.051.31-.024.26-.228.712-.703.996-.929.13-.102.104-.252 0-.377ZM9.744 8.775c0 .502-.098 1.756-1.368 1.756-.653 0-.666-.769-.666-.769 0-.988 1.049-1.317 2.034-1.317v.33Z"
          />
          <path
            fill="#FFB300"
            d="M12.917 12.952C11.862 13.601 10.284 14 9.005 14a7.818 7.818 0 0 1-4.713-1.551c-.101-.084 0-.168.1-.126 1.432.685 3 1.036 4.587 1.026 1.154 0 2.609-.209 3.787-.628.174-.042.325.126.15.231Zm.376-.44c-.125-.147-.878-.063-1.204-.043-.101 0-.125-.062-.025-.125.576-.357 1.554-.252 1.655-.126.1.126-.026.943-.577 1.32-.076.064-.176.021-.126-.04.126-.253.402-.84.276-.987Z"
          />
        </g>
        <defs>
          <clipPath id="amazon">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
]

```

### Input Group

Combine with InputGroup to add icons or other elements.

```tsx
"use client"

import {
  Combobox,
  InputGroup,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { LuCode } from "react-icons/lu"

export const ComboboxWithInputGroup = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <InputGroup startElement={<LuCode />}>
          <Combobox.Input placeholder="Type to search" />
        </InputGroup>
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Invalid

Pass the `invalid` prop to the `Combobox.Root` to show the error state.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithInvalid = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
      invalid
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Controlled Value

Use the `value` and `onValueChange` props to control the combobox's value
programmatically.

```tsx
"use client"

import {
  Badge,
  Combobox,
  For,
  HStack,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const ComboboxControlled = () => {
  const [value, setValue] = useState<string[]>([])

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      value={value}
      onValueChange={(e) => setValue(e.value)}
      width="320px"
    >
      <HStack textStyle="sm" mb="6">
        Selected:
        <HStack>
          <For each={value} fallback="N/A">
            {(v) => <Badge key={v}>{v}</Badge>}
          </For>
        </HStack>
      </HStack>
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Store

An alternative way to control the combobox is to use the `Combobox.RootProvider`
component and the `useCombobox` store hook.

```tsx
import { Combobox, useCombobox } from "@chakra-ui/react"

function Demo() {
  const combobox = useCombobox()

  return (
    <Combobox.RootProvider value={combobox}>{/* ... */}</Combobox.RootProvider>
  )
}
```

This way you can access the combobox state and methods from outside the
combobox.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useCombobox,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithStore = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  const combobox = useCombobox({
    collection,
    onInputValueChange(e) {
      filter(e.inputValue)
    },
  })

  return (
    <Combobox.RootProvider value={combobox} width="320px">
      <Combobox.Label>Select framework</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Controlled Open

Use the `open` and `onOpenChange` props to control the combobox's open state
programmatically.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const ComboboxOpenControlled = () => {
  const [open, setOpen] = useState(false)

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Combobox.Label>Combobox is {open ? "open" : "closed"}</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Limit Large Datasets

The recommended way of managing large lists is to use the `limit` property on
the `useListCollection` hook. This will limit the number of rendered items in
the DOM to improve performance.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useRef } from "react"

export const ComboboxWithLimit = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)

  const { startsWith } = useFilter({ sensitivity: "base" })

  const { collection, filter, reset } = useListCollection({
    initialItems: items,
    filter: startsWith,
    limit: 10,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      openOnClick
      width="320px"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger onClick={reset} />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content ref={contentRef}>
            {collection.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText truncate>
                  <span aria-hidden style={{ marginRight: 4 }}>
                    {item.emoji}
                  </span>
                  {item.label}
                </Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

export const items = [
  { value: "AD", label: "Andorra", emoji: "🇦🇩" },
  { value: "AE", label: "United Arab Emirates", emoji: "🇦🇪" },
  { value: "AF", label: "Afghanistan", emoji: "🇦🇫" },
  { value: "AG", label: "Antigua and Barbuda", emoji: "🇦🇬" },
  { value: "AI", label: "Anguilla", emoji: "🇦🇮" },
  { value: "AL", label: "Albania", emoji: "🇦🇱" },
  { value: "AM", label: "Armenia", emoji: "🇦🇲" },
  { value: "AO", label: "Angola", emoji: "🇦🇴" },
  { value: "AQ", label: "Antarctica", emoji: "🇦🇶" },
  { value: "AR", label: "Argentina", emoji: "🇦🇷" },
  { value: "AS", label: "American Samoa", emoji: "🇦🇸" },
  { value: "AT", label: "Austria", emoji: "🇦🇹" },
  { value: "AU", label: "Australia", emoji: "🇦🇺" },
  { value: "AW", label: "Aruba", emoji: "🇦🇼" },
  { value: "AX", label: "Åland Islands", emoji: "🇦🇽" },
  { value: "AZ", label: "Azerbaijan", emoji: "🇦🇿" },
  { value: "BA", label: "Bosnia and Herzegovina", emoji: "🇧🇦" },
  { value: "BB", label: "Barbados", emoji: "🇧🇧" },
  { value: "BD", label: "Bangladesh", emoji: "🇧🇩" },
  { value: "BE", label: "Belgium", emoji: "🇧🇪" },
  { value: "BF", label: "Burkina Faso", emoji: "🇧🇫" },
  { value: "BG", label: "Bulgaria", emoji: "🇧🇬" },
  { value: "BH", label: "Bahrain", emoji: "🇧🇭" },
  { value: "BI", label: "Burundi", emoji: "🇧🇮" },
  { value: "BJ", label: "Benin", emoji: "🇧🇯" },
  { value: "BL", label: "Saint Barthélemy", emoji: "🇧🇱" },
  { value: "BM", label: "Bermuda", emoji: "🇧🇲" },
  { value: "BN", label: "Brunei Darussalam", emoji: "🇧🇳" },
  { value: "BO", label: "Bolivia, Plurinational State of", emoji: "🇧🇴" },
  { value: "BQ", label: "Bonaire, Sint Eustatius and Saba", emoji: "🇧🇶" },
  { value: "BR", label: "Brazil", emoji: "🇧🇷" },
  { value: "BS", label: "Bahamas", emoji: "🇧🇸" },
  { value: "BT", label: "Bhutan", emoji: "🇧🇹" },
  { value: "BV", label: "Bouvet Island", emoji: "🇧🇻" },
  { value: "BW", label: "Botswana", emoji: "🇧🇼" },
  { value: "BY", label: "Belarus", emoji: "🇧🇾" },
  { value: "BZ", label: "Belize", emoji: "🇧🇿" },
  { value: "CA", label: "Canada", emoji: "🇨🇦" },
  { value: "CC", label: "Cocos (Keeling) Islands", emoji: "🇨🇨" },
  { value: "CD", label: "Congo, Democratic Republic of the", emoji: "🇨🇩" },
  { value: "CF", label: "Central African Republic", emoji: "🇨🇫" },
  { value: "CG", label: "Congo", emoji: "🇨🇬" },
  { value: "CH", label: "Switzerland", emoji: "🇨🇭" },
  { value: "CI", label: "Côte d'Ivoire", emoji: "🇨🇮" },
  { value: "CK", label: "Cook Islands", emoji: "🇨🇰" },
  { value: "CL", label: "Chile", emoji: "🇨🇱" },
  { value: "CM", label: "Cameroon", emoji: "🇨🇲" },
  { value: "CN", label: "China", emoji: "🇨🇳" },
  { value: "CO", label: "Colombia", emoji: "🇨🇴" },
  { value: "CR", label: "Costa Rica", emoji: "🇨🇷" },
  { value: "CU", label: "Cuba", emoji: "🇨🇺" },
  { value: "CV", label: "Cabo Verde", emoji: "🇨🇻" },
  { value: "CW", label: "Curaçao", emoji: "🇨🇼" },
  { value: "CX", label: "Christmas Island", emoji: "🇨🇽" },
  { value: "CY", label: "Cyprus", emoji: "🇨🇾" },
  { value: "CZ", label: "Czechia", emoji: "🇨🇿" },
  { value: "DE", label: "Germany", emoji: "🇩🇪" },
  { value: "DJ", label: "Djibouti", emoji: "🇩🇯" },
  { value: "DK", label: "Denmark", emoji: "🇩🇰" },
  { value: "DM", label: "Dominica", emoji: "🇩🇲" },
  { value: "DO", label: "Dominican Republic", emoji: "🇩🇴" },
  { value: "DZ", label: "Algeria", emoji: "🇩🇿" },
  { value: "EC", label: "Ecuador", emoji: "🇪🇨" },
  { value: "EE", label: "Estonia", emoji: "🇪🇪" },
  { value: "EG", label: "Egypt", emoji: "🇪🇬" },
  { value: "EH", label: "Western Sahara", emoji: "🇪🇭" },
  { value: "ER", label: "Eritrea", emoji: "🇪🇷" },
  { value: "ES", label: "Spain", emoji: "🇪🇸" },
  { value: "ET", label: "Ethiopia", emoji: "🇪🇹" },
  { value: "FI", label: "Finland", emoji: "🇫🇮" },
  { value: "FJ", label: "Fiji", emoji: "🇫🇯" },
  { value: "FK", label: "Falkland Islands (Malvinas)", emoji: "🇫🇰" },
  { value: "FM", label: "Micronesia, Federated States of", emoji: "🇫🇲" },
  { value: "FO", label: "Faroe Islands", emoji: "🇫🇴" },
  { value: "FR", label: "France", emoji: "🇫🇷" },
  { value: "GA", label: "Gabon", emoji: "🇬🇦" },
  {
    value: "GB",
    label: "United Kingdom of Great Britain and Northern Ireland",
    emoji: "🇬🇧",
  },
  { value: "GD", label: "Grenada", emoji: "🇬🇩" },
  { value: "GE", label: "Georgia", emoji: "🇬🇪" },
  { value: "GF", label: "French Guiana", emoji: "🇬🇫" },
  { value: "GG", label: "Guernsey", emoji: "🇬🇬" },
  { value: "GH", label: "Ghana", emoji: "🇬🇭" },
  { value: "GI", label: "Gibraltar", emoji: "🇬🇮" },
  { value: "GL", label: "Greenland", emoji: "🇬🇱" },
  { value: "GM", label: "Gambia", emoji: "🇬🇲" },
  { value: "GN", label: "Guinea", emoji: "🇬🇳" },
  { value: "GP", label: "Guadeloupe", emoji: "🇬🇵" },
  { value: "GQ", label: "Equatorial Guinea", emoji: "🇬🇶" },
  { value: "GR", label: "Greece", emoji: "🇬🇷" },
  {
    value: "GS",
    label: "South Georgia and the South Sandwich Islands",
    emoji: "🇬🇸",
  },
  { value: "GT", label: "Guatemala", emoji: "🇬🇹" },
  { value: "GU", label: "Guam", emoji: "🇬🇺" },
  { value: "GW", label: "Guinea-Bissau", emoji: "🇬🇼" },
  { value: "GY", label: "Guyana", emoji: "🇬🇾" },
  { value: "HK", label: "Hong Kong", emoji: "🇭🇰" },
  { value: "HM", label: "Heard Island and McDonald Islands", emoji: "🇭🇲" },
  { value: "HN", label: "Honduras", emoji: "🇭🇳" },
  { value: "HR", label: "Croatia", emoji: "🇭🇷" },
  { value: "HT", label: "Haiti", emoji: "🇭🇹" },
  { value: "HU", label: "Hungary", emoji: "🇭🇺" },
  { value: "ID", label: "Indonesia", emoji: "🇮🇩" },
  { value: "IE", label: "Ireland", emoji: "🇮🇪" },
  { value: "IL", label: "Israel", emoji: "🇮🇱" },
  { value: "IM", label: "Isle of Man", emoji: "🇮🇲" },
  { value: "IN", label: "India", emoji: "🇮🇳" },
  { value: "IO", label: "British Indian Ocean Territory", emoji: "🇮🇴" },
  { value: "IQ", label: "Iraq", emoji: "🇮🇶" },
  { value: "IR", label: "Iran, Islamic Republic of", emoji: "🇮🇷" },
  { value: "IS", label: "Iceland", emoji: "🇮🇸" },
  { value: "IT", label: "Italy", emoji: "🇮🇹" },
  { value: "JE", label: "Jersey", emoji: "🇯🇪" },
  { value: "JM", label: "Jamaica", emoji: "🇯🇲" },
  { value: "JO", label: "Jordan", emoji: "🇯🇴" },
  { value: "JP", label: "Japan", emoji: "🇯🇵" },
  { value: "KE", label: "Kenya", emoji: "🇰🇪" },
  { value: "KG", label: "Kyrgyzstan", emoji: "🇰🇬" },
  { value: "KH", label: "Cambodia", emoji: "🇰🇭" },
  { value: "KI", label: "Kiribati", emoji: "🇰🇮" },
  { value: "KM", label: "Comoros", emoji: "🇰🇲" },
  { value: "KN", label: "Saint Kitts and Nevis", emoji: "🇰🇳" },
  { value: "KP", label: "Korea, Democratic People's Republic of", emoji: "🇰🇵" },
  { value: "KR", label: "Korea, Republic of", emoji: "🇰🇷" },
  { value: "KW", label: "Kuwait", emoji: "🇰🇼" },
  { value: "KY", label: "Cayman Islands", emoji: "🇰🇾" },
  { value: "KZ", label: "Kazakhstan", emoji: "🇰🇿" },
  { value: "LA", label: "Lao People's Democratic Republic", emoji: "🇱🇦" },
  { value: "LB", label: "Lebanon", emoji: "🇱🇧" },
  { value: "LC", label: "Saint Lucia", emoji: "🇱🇨" },
  { value: "LI", label: "Liechtenstein", emoji: "🇱🇮" },
  { value: "LK", label: "Sri Lanka", emoji: "🇱🇰" },
  { value: "LR", label: "Liberia", emoji: "🇱🇷" },
  { value: "LS", label: "Lesotho", emoji: "🇱🇸" },
  { value: "LT", label: "Lithuania", emoji: "🇱🇹" },
  { value: "LU", label: "Luxembourg", emoji: "🇱🇺" },
  { value: "LV", label: "Latvia", emoji: "🇱🇻" },
  { value: "LY", label: "Libya", emoji: "🇱🇾" },
  { value: "MA", label: "Morocco", emoji: "🇲🇦" },
  { value: "MC", label: "Monaco", emoji: "🇲🇨" },
  { value: "MD", label: "Moldova, Republic of", emoji: "🇲🇩" },
  { value: "ME", label: "Montenegro", emoji: "🇲🇪" },
  { value: "MF", label: "Saint Martin, (French part)", emoji: "🇲🇫" },
  { value: "MG", label: "Madagascar", emoji: "🇲🇬" },
  { value: "MH", label: "Marshall Islands", emoji: "🇲🇭" },
  { value: "MK", label: "North Macedonia", emoji: "🇲🇰" },
  { value: "ML", label: "Mali", emoji: "🇲🇱" },
  { value: "MM", label: "Myanmar", emoji: "🇲🇲" },
  { value: "MN", label: "Mongolia", emoji: "🇲🇳" },
  { value: "MO", label: "Macao", emoji: "🇲🇴" },
  { value: "MP", label: "Northern Mariana Islands", emoji: "🇲🇵" },
  { value: "MQ", label: "Martinique", emoji: "🇲🇶" },
  { value: "MR", label: "Mauritania", emoji: "🇲🇷" },
  { value: "MS", label: "Montserrat", emoji: "🇲🇸" },
  { value: "MT", label: "Malta", emoji: "🇲🇹" },
  { value: "MU", label: "Mauritius", emoji: "🇲🇺" },
  { value: "MV", label: "Maldives", emoji: "🇲🇻" },
  { value: "MW", label: "Malawi", emoji: "🇲🇼" },
  { value: "MX", label: "Mexico", emoji: "🇲🇽" },
  { value: "MY", label: "Malaysia", emoji: "🇲🇾" },
  { value: "MZ", label: "Mozambique", emoji: "🇲🇿" },
  { value: "NA", label: "Namibia", emoji: "🇳🇦" },
  { value: "NC", label: "New Caledonia", emoji: "🇳🇨" },
  { value: "NE", label: "Niger", emoji: "🇳🇪" },
  { value: "NF", label: "Norfolk Island", emoji: "🇳🇫" },
  { value: "NG", label: "Nigeria", emoji: "🇳🇬" },
  { value: "NI", label: "Nicaragua", emoji: "🇳🇮" },
  { value: "NL", label: "Netherlands", emoji: "🇳🇱" },
  { value: "NO", label: "Norway", emoji: "🇳🇴" },
  { value: "NP", label: "Nepal", emoji: "🇳🇵" },
  { value: "NR", label: "Nauru", emoji: "🇳🇷" },
  { value: "NU", label: "Niue", emoji: "🇳🇺" },
  { value: "NZ", label: "New Zealand", emoji: "🇳🇿" },
  { value: "OM", label: "Oman", emoji: "🇴🇲" },
  { value: "PA", label: "Panama", emoji: "🇵🇦" },
  { value: "PE", label: "Peru", emoji: "🇵🇪" },
  { value: "PF", label: "French Polynesia", emoji: "🇵🇫" },
  { value: "PG", label: "Papua New Guinea", emoji: "🇵🇬" },
  { value: "PH", label: "Philippines", emoji: "🇵🇭" },
  { value: "PK", label: "Pakistan", emoji: "🇵🇰" },
  { value: "PL", label: "Poland", emoji: "🇵🇱" },
  { value: "PM", label: "Saint Pierre and Miquelon", emoji: "🇵🇲" },
  { value: "PN", label: "Pitcairn", emoji: "🇵🇳" },
  { value: "PR", label: "Puerto Rico", emoji: "🇵🇷" },
  { value: "PS", label: "Palestine, State of", emoji: "🇵🇸" },
  { value: "PT", label: "Portugal", emoji: "🇵🇹" },
  { value: "PW", label: "Palau", emoji: "🇵🇼" },
  { value: "PY", label: "Paraguay", emoji: "🇵🇾" },
  { value: "QA", label: "Qatar", emoji: "🇶🇦" },
  { value: "RE", label: "Réunion", emoji: "🇷🇪" },
  { value: "RO", label: "Romania", emoji: "🇷🇴" },
  { value: "RS", label: "Serbia", emoji: "🇷🇸" },
  { value: "RU", label: "Russian Federation", emoji: "🇷🇺" },
  { value: "RW", label: "Rwanda", emoji: "🇷🇼" },
  { value: "SA", label: "Saudi Arabia", emoji: "🇸🇦" },
  { value: "SB", label: "Solomon Islands", emoji: "🇸🇧" },
  { value: "SC", label: "Seychelles", emoji: "🇸🇨" },
  { value: "SD", label: "Sudan", emoji: "🇸🇩" },
  { value: "SE", label: "Sweden", emoji: "🇸🇪" },
  { value: "SG", label: "Singapore", emoji: "🇸🇬" },
  {
    value: "SH",
    label: "Saint Helena, Ascension and Tristan da Cunha",
    emoji: "🇸🇭",
  },
  { value: "SI", label: "Slovenia", emoji: "🇸🇮" },
  { value: "SJ", label: "Svalbard and Jan Mayen", emoji: "🇸🇯" },
  { value: "SK", label: "Slovakia", emoji: "🇸🇰" },
  { value: "SL", label: "Sierra Leone", emoji: "🇸🇱" },
  { value: "SM", label: "San Marino", emoji: "🇸🇲" },
  { value: "SN", label: "Senegal", emoji: "🇸🇳" },
  { value: "SO", label: "Somalia", emoji: "🇸🇴" },
  { value: "SR", label: "Suriname", emoji: "🇸🇷" },
  { value: "SS", label: "South Sudan", emoji: "🇸🇸" },
  { value: "ST", label: "Sao Tome and Principe", emoji: "🇸🇹" },
  { value: "SV", label: "El Salvador", emoji: "🇸🇻" },
  { value: "SX", label: "Sint Maarten, (Dutch part)", emoji: "🇸🇽" },
  { value: "SY", label: "Syrian Arab Republic", emoji: "🇸🇾" },
  { value: "SZ", label: "Eswatini", emoji: "🇸🇿" },
  { value: "TC", label: "Turks and Caicos Islands", emoji: "🇹🇨" },
  { value: "TD", label: "Chad", emoji: "🇹🇩" },
  { value: "TF", label: "French Southern Territories", emoji: "🇹🇫" },
  { value: "TG", label: "Togo", emoji: "🇹🇬" },
  { value: "TH", label: "Thailand", emoji: "🇹🇭" },
  { value: "TJ", label: "Tajikistan", emoji: "🇹🇯" },
  { value: "TK", label: "Tokelau", emoji: "🇹🇰" },
  { value: "TL", label: "Timor-Leste", emoji: "🇹🇱" },
  { value: "TM", label: "Turkmenistan", emoji: "🇹🇲" },
  { value: "TN", label: "Tunisia", emoji: "🇹🇳" },
  { value: "TO", label: "Tonga", emoji: "🇹🇴" },
  { value: "TR", label: "Türkiye", emoji: "🇹🇷" },
  { value: "TT", label: "Trinidad and Tobago", emoji: "🇹🇹" },
  { value: "TV", label: "Tuvalu", emoji: "🇹🇻" },
  { value: "TW", label: "Taiwan, Province of China", emoji: "🇹🇼" },
  { value: "TZ", label: "Tanzania, United Republic of", emoji: "🇹🇿" },
  { value: "UA", label: "Ukraine", emoji: "🇺🇦" },
  { value: "UG", label: "Uganda", emoji: "🇺🇬" },
  { value: "UM", label: "United States Minor Outlying Islands", emoji: "🇺🇲" },
  { value: "US", label: "United States of America", emoji: "🇺🇸" },
  { value: "UY", label: "Uruguay", emoji: "🇺🇾" },
  { value: "UZ", label: "Uzbekistan", emoji: "🇺🇿" },
  { value: "VA", label: "Holy See", emoji: "🇻🇦" },
  { value: "VC", label: "Saint Vincent and the Grenadines", emoji: "🇻🇨" },
  { value: "VE", label: "Venezuela, Bolivarian Republic of", emoji: "🇻🇪" },
  { value: "VG", label: "Virgin Islands, British", emoji: "🇻🇬" },
  { value: "VI", label: "Virgin Islands, U.S.", emoji: "🇻🇮" },
  { value: "VN", label: "Viet Nam", emoji: "🇻🇳" },
  { value: "VU", label: "Vanuatu", emoji: "🇻🇺" },
  { value: "WF", label: "Wallis and Futuna", emoji: "🇼🇫" },
  { value: "WS", label: "Samoa", emoji: "🇼🇸" },
  { value: "YE", label: "Yemen", emoji: "🇾🇪" },
  { value: "YT", label: "Mayotte", emoji: "🇾🇹" },
  { value: "ZA", label: "South Africa", emoji: "🇿🇦" },
  { value: "ZM", label: "Zambia", emoji: "🇿🇲" },
  { value: "ZW", label: "Zimbabwe", emoji: "🇿🇼" },
]

```

### Virtualization

Alternatively, you can leverage virtualization from the
`@tanstack/react-virtual` package to render large datasets efficiently.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import { flushSync } from "react-dom"

export const ComboboxVirtualized = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)

  const { startsWith } = useFilter({ sensitivity: "base" })

  const { collection, filter, reset } = useListCollection({
    initialItems: items,
    filter: startsWith,
  })

  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => contentRef.current,
    estimateSize: () => 28,
    overscan: 10,
    scrollPaddingEnd: 32,
  })

  const handleScrollToIndexFn = (details: { index: number }) => {
    flushSync(() => {
      virtualizer.scrollToIndex(details.index, {
        align: "center",
        behavior: "auto",
      })
    })
  }

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      scrollToIndexFn={handleScrollToIndexFn}
      width="320px"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger onClick={reset} />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content ref={contentRef}>
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = collection.items[virtualItem.index]
                return (
                  <Combobox.Item
                    key={item.value}
                    item={item}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Combobox.ItemText truncate>
                      <span aria-hidden style={{ marginRight: 4 }}>
                        {item.emoji}
                      </span>
                      {item.label}
                    </Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )
              })}
            </div>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

export const items = [
  { value: "AD", label: "Andorra", emoji: "🇦🇩" },
  { value: "AE", label: "United Arab Emirates", emoji: "🇦🇪" },
  { value: "AF", label: "Afghanistan", emoji: "🇦🇫" },
  { value: "AG", label: "Antigua and Barbuda", emoji: "🇦🇬" },
  { value: "AI", label: "Anguilla", emoji: "🇦🇮" },
  { value: "AL", label: "Albania", emoji: "🇦🇱" },
  { value: "AM", label: "Armenia", emoji: "🇦🇲" },
  { value: "AO", label: "Angola", emoji: "🇦🇴" },
  { value: "AQ", label: "Antarctica", emoji: "🇦🇶" },
  { value: "AR", label: "Argentina", emoji: "🇦🇷" },
  { value: "AS", label: "American Samoa", emoji: "🇦🇸" },
  { value: "AT", label: "Austria", emoji: "🇦🇹" },
  { value: "AU", label: "Australia", emoji: "🇦🇺" },
  { value: "AW", label: "Aruba", emoji: "🇦🇼" },
  { value: "AX", label: "Åland Islands", emoji: "🇦🇽" },
  { value: "AZ", label: "Azerbaijan", emoji: "🇦🇿" },
  { value: "BA", label: "Bosnia and Herzegovina", emoji: "🇧🇦" },
  { value: "BB", label: "Barbados", emoji: "🇧🇧" },
  { value: "BD", label: "Bangladesh", emoji: "🇧🇩" },
  { value: "BE", label: "Belgium", emoji: "🇧🇪" },
  { value: "BF", label: "Burkina Faso", emoji: "🇧🇫" },
  { value: "BG", label: "Bulgaria", emoji: "🇧🇬" },
  { value: "BH", label: "Bahrain", emoji: "🇧🇭" },
  { value: "BI", label: "Burundi", emoji: "🇧🇮" },
  { value: "BJ", label: "Benin", emoji: "🇧🇯" },
  { value: "BL", label: "Saint Barthélemy", emoji: "🇧🇱" },
  { value: "BM", label: "Bermuda", emoji: "🇧🇲" },
  { value: "BN", label: "Brunei Darussalam", emoji: "🇧🇳" },
  { value: "BO", label: "Bolivia, Plurinational State of", emoji: "🇧🇴" },
  { value: "BQ", label: "Bonaire, Sint Eustatius and Saba", emoji: "🇧🇶" },
  { value: "BR", label: "Brazil", emoji: "🇧🇷" },
  { value: "BS", label: "Bahamas", emoji: "🇧🇸" },
  { value: "BT", label: "Bhutan", emoji: "🇧🇹" },
  { value: "BV", label: "Bouvet Island", emoji: "🇧🇻" },
  { value: "BW", label: "Botswana", emoji: "🇧🇼" },
  { value: "BY", label: "Belarus", emoji: "🇧🇾" },
  { value: "BZ", label: "Belize", emoji: "🇧🇿" },
  { value: "CA", label: "Canada", emoji: "🇨🇦" },
  { value: "CC", label: "Cocos (Keeling) Islands", emoji: "🇨🇨" },
  { value: "CD", label: "Congo, Democratic Republic of the", emoji: "🇨🇩" },
  { value: "CF", label: "Central African Republic", emoji: "🇨🇫" },
  { value: "CG", label: "Congo", emoji: "🇨🇬" },
  { value: "CH", label: "Switzerland", emoji: "🇨🇭" },
  { value: "CI", label: "Côte d'Ivoire", emoji: "🇨🇮" },
  { value: "CK", label: "Cook Islands", emoji: "🇨🇰" },
  { value: "CL", label: "Chile", emoji: "🇨🇱" },
  { value: "CM", label: "Cameroon", emoji: "🇨🇲" },
  { value: "CN", label: "China", emoji: "🇨🇳" },
  { value: "CO", label: "Colombia", emoji: "🇨🇴" },
  { value: "CR", label: "Costa Rica", emoji: "🇨🇷" },
  { value: "CU", label: "Cuba", emoji: "🇨🇺" },
  { value: "CV", label: "Cabo Verde", emoji: "🇨🇻" },
  { value: "CW", label: "Curaçao", emoji: "🇨🇼" },
  { value: "CX", label: "Christmas Island", emoji: "🇨🇽" },
  { value: "CY", label: "Cyprus", emoji: "🇨🇾" },
  { value: "CZ", label: "Czechia", emoji: "🇨🇿" },
  { value: "DE", label: "Germany", emoji: "🇩🇪" },
  { value: "DJ", label: "Djibouti", emoji: "🇩🇯" },
  { value: "DK", label: "Denmark", emoji: "🇩🇰" },
  { value: "DM", label: "Dominica", emoji: "🇩🇲" },
  { value: "DO", label: "Dominican Republic", emoji: "🇩🇴" },
  { value: "DZ", label: "Algeria", emoji: "🇩🇿" },
  { value: "EC", label: "Ecuador", emoji: "🇪🇨" },
  { value: "EE", label: "Estonia", emoji: "🇪🇪" },
  { value: "EG", label: "Egypt", emoji: "🇪🇬" },
  { value: "EH", label: "Western Sahara", emoji: "🇪🇭" },
  { value: "ER", label: "Eritrea", emoji: "🇪🇷" },
  { value: "ES", label: "Spain", emoji: "🇪🇸" },
  { value: "ET", label: "Ethiopia", emoji: "🇪🇹" },
  { value: "FI", label: "Finland", emoji: "🇫🇮" },
  { value: "FJ", label: "Fiji", emoji: "🇫🇯" },
  { value: "FK", label: "Falkland Islands (Malvinas)", emoji: "🇫🇰" },
  { value: "FM", label: "Micronesia, Federated States of", emoji: "🇫🇲" },
  { value: "FO", label: "Faroe Islands", emoji: "🇫🇴" },
  { value: "FR", label: "France", emoji: "🇫🇷" },
  { value: "GA", label: "Gabon", emoji: "🇬🇦" },
  {
    value: "GB",
    label: "United Kingdom of Great Britain and Northern Ireland",
    emoji: "🇬🇧",
  },
  { value: "GD", label: "Grenada", emoji: "🇬🇩" },
  { value: "GE", label: "Georgia", emoji: "🇬🇪" },
  { value: "GF", label: "French Guiana", emoji: "🇬🇫" },
  { value: "GG", label: "Guernsey", emoji: "🇬🇬" },
  { value: "GH", label: "Ghana", emoji: "🇬🇭" },
  { value: "GI", label: "Gibraltar", emoji: "🇬🇮" },
  { value: "GL", label: "Greenland", emoji: "🇬🇱" },
  { value: "GM", label: "Gambia", emoji: "🇬🇲" },
  { value: "GN", label: "Guinea", emoji: "🇬🇳" },
  { value: "GP", label: "Guadeloupe", emoji: "🇬🇵" },
  { value: "GQ", label: "Equatorial Guinea", emoji: "🇬🇶" },
  { value: "GR", label: "Greece", emoji: "🇬🇷" },
  {
    value: "GS",
    label: "South Georgia and the South Sandwich Islands",
    emoji: "🇬🇸",
  },
  { value: "GT", label: "Guatemala", emoji: "🇬🇹" },
  { value: "GU", label: "Guam", emoji: "🇬🇺" },
  { value: "GW", label: "Guinea-Bissau", emoji: "🇬🇼" },
  { value: "GY", label: "Guyana", emoji: "🇬🇾" },
  { value: "HK", label: "Hong Kong", emoji: "🇭🇰" },
  { value: "HM", label: "Heard Island and McDonald Islands", emoji: "🇭🇲" },
  { value: "HN", label: "Honduras", emoji: "🇭🇳" },
  { value: "HR", label: "Croatia", emoji: "🇭🇷" },
  { value: "HT", label: "Haiti", emoji: "🇭🇹" },
  { value: "HU", label: "Hungary", emoji: "🇭🇺" },
  { value: "ID", label: "Indonesia", emoji: "🇮🇩" },
  { value: "IE", label: "Ireland", emoji: "🇮🇪" },
  { value: "IL", label: "Israel", emoji: "🇮🇱" },
  { value: "IM", label: "Isle of Man", emoji: "🇮🇲" },
  { value: "IN", label: "India", emoji: "🇮🇳" },
  { value: "IO", label: "British Indian Ocean Territory", emoji: "🇮🇴" },
  { value: "IQ", label: "Iraq", emoji: "🇮🇶" },
  { value: "IR", label: "Iran, Islamic Republic of", emoji: "🇮🇷" },
  { value: "IS", label: "Iceland", emoji: "🇮🇸" },
  { value: "IT", label: "Italy", emoji: "🇮🇹" },
  { value: "JE", label: "Jersey", emoji: "🇯🇪" },
  { value: "JM", label: "Jamaica", emoji: "🇯🇲" },
  { value: "JO", label: "Jordan", emoji: "🇯🇴" },
  { value: "JP", label: "Japan", emoji: "🇯🇵" },
  { value: "KE", label: "Kenya", emoji: "🇰🇪" },
  { value: "KG", label: "Kyrgyzstan", emoji: "🇰🇬" },
  { value: "KH", label: "Cambodia", emoji: "🇰🇭" },
  { value: "KI", label: "Kiribati", emoji: "🇰🇮" },
  { value: "KM", label: "Comoros", emoji: "🇰🇲" },
  { value: "KN", label: "Saint Kitts and Nevis", emoji: "🇰🇳" },
  { value: "KP", label: "Korea, Democratic People's Republic of", emoji: "🇰🇵" },
  { value: "KR", label: "Korea, Republic of", emoji: "🇰🇷" },
  { value: "KW", label: "Kuwait", emoji: "🇰🇼" },
  { value: "KY", label: "Cayman Islands", emoji: "🇰🇾" },
  { value: "KZ", label: "Kazakhstan", emoji: "🇰🇿" },
  { value: "LA", label: "Lao People's Democratic Republic", emoji: "🇱🇦" },
  { value: "LB", label: "Lebanon", emoji: "🇱🇧" },
  { value: "LC", label: "Saint Lucia", emoji: "🇱🇨" },
  { value: "LI", label: "Liechtenstein", emoji: "🇱🇮" },
  { value: "LK", label: "Sri Lanka", emoji: "🇱🇰" },
  { value: "LR", label: "Liberia", emoji: "🇱🇷" },
  { value: "LS", label: "Lesotho", emoji: "🇱🇸" },
  { value: "LT", label: "Lithuania", emoji: "🇱🇹" },
  { value: "LU", label: "Luxembourg", emoji: "🇱🇺" },
  { value: "LV", label: "Latvia", emoji: "🇱🇻" },
  { value: "LY", label: "Libya", emoji: "🇱🇾" },
  { value: "MA", label: "Morocco", emoji: "🇲🇦" },
  { value: "MC", label: "Monaco", emoji: "🇲🇨" },
  { value: "MD", label: "Moldova, Republic of", emoji: "🇲🇩" },
  { value: "ME", label: "Montenegro", emoji: "🇲🇪" },
  { value: "MF", label: "Saint Martin, (French part)", emoji: "🇲🇫" },
  { value: "MG", label: "Madagascar", emoji: "🇲🇬" },
  { value: "MH", label: "Marshall Islands", emoji: "🇲🇭" },
  { value: "MK", label: "North Macedonia", emoji: "🇲🇰" },
  { value: "ML", label: "Mali", emoji: "🇲🇱" },
  { value: "MM", label: "Myanmar", emoji: "🇲🇲" },
  { value: "MN", label: "Mongolia", emoji: "🇲🇳" },
  { value: "MO", label: "Macao", emoji: "🇲🇴" },
  { value: "MP", label: "Northern Mariana Islands", emoji: "🇲🇵" },
  { value: "MQ", label: "Martinique", emoji: "🇲🇶" },
  { value: "MR", label: "Mauritania", emoji: "🇲🇷" },
  { value: "MS", label: "Montserrat", emoji: "🇲🇸" },
  { value: "MT", label: "Malta", emoji: "🇲🇹" },
  { value: "MU", label: "Mauritius", emoji: "🇲🇺" },
  { value: "MV", label: "Maldives", emoji: "🇲🇻" },
  { value: "MW", label: "Malawi", emoji: "🇲🇼" },
  { value: "MX", label: "Mexico", emoji: "🇲🇽" },
  { value: "MY", label: "Malaysia", emoji: "🇲🇾" },
  { value: "MZ", label: "Mozambique", emoji: "🇲🇿" },
  { value: "NA", label: "Namibia", emoji: "🇳🇦" },
  { value: "NC", label: "New Caledonia", emoji: "🇳🇨" },
  { value: "NE", label: "Niger", emoji: "🇳🇪" },
  { value: "NF", label: "Norfolk Island", emoji: "🇳🇫" },
  { value: "NG", label: "Nigeria", emoji: "🇳🇬" },
  { value: "NI", label: "Nicaragua", emoji: "🇳🇮" },
  { value: "NL", label: "Netherlands", emoji: "🇳🇱" },
  { value: "NO", label: "Norway", emoji: "🇳🇴" },
  { value: "NP", label: "Nepal", emoji: "🇳🇵" },
  { value: "NR", label: "Nauru", emoji: "🇳🇷" },
  { value: "NU", label: "Niue", emoji: "🇳🇺" },
  { value: "NZ", label: "New Zealand", emoji: "🇳🇿" },
  { value: "OM", label: "Oman", emoji: "🇴🇲" },
  { value: "PA", label: "Panama", emoji: "🇵🇦" },
  { value: "PE", label: "Peru", emoji: "🇵🇪" },
  { value: "PF", label: "French Polynesia", emoji: "🇵🇫" },
  { value: "PG", label: "Papua New Guinea", emoji: "🇵🇬" },
  { value: "PH", label: "Philippines", emoji: "🇵🇭" },
  { value: "PK", label: "Pakistan", emoji: "🇵🇰" },
  { value: "PL", label: "Poland", emoji: "🇵🇱" },
  { value: "PM", label: "Saint Pierre and Miquelon", emoji: "🇵🇲" },
  { value: "PN", label: "Pitcairn", emoji: "🇵🇳" },
  { value: "PR", label: "Puerto Rico", emoji: "🇵🇷" },
  { value: "PS", label: "Palestine, State of", emoji: "🇵🇸" },
  { value: "PT", label: "Portugal", emoji: "🇵🇹" },
  { value: "PW", label: "Palau", emoji: "🇵🇼" },
  { value: "PY", label: "Paraguay", emoji: "🇵🇾" },
  { value: "QA", label: "Qatar", emoji: "🇶🇦" },
  { value: "RE", label: "Réunion", emoji: "🇷🇪" },
  { value: "RO", label: "Romania", emoji: "🇷🇴" },
  { value: "RS", label: "Serbia", emoji: "🇷🇸" },
  { value: "RU", label: "Russian Federation", emoji: "🇷🇺" },
  { value: "RW", label: "Rwanda", emoji: "🇷🇼" },
  { value: "SA", label: "Saudi Arabia", emoji: "🇸🇦" },
  { value: "SB", label: "Solomon Islands", emoji: "🇸🇧" },
  { value: "SC", label: "Seychelles", emoji: "🇸🇨" },
  { value: "SD", label: "Sudan", emoji: "🇸🇩" },
  { value: "SE", label: "Sweden", emoji: "🇸🇪" },
  { value: "SG", label: "Singapore", emoji: "🇸🇬" },
  {
    value: "SH",
    label: "Saint Helena, Ascension and Tristan da Cunha",
    emoji: "🇸🇭",
  },
  { value: "SI", label: "Slovenia", emoji: "🇸🇮" },
  { value: "SJ", label: "Svalbard and Jan Mayen", emoji: "🇸🇯" },
  { value: "SK", label: "Slovakia", emoji: "🇸🇰" },
  { value: "SL", label: "Sierra Leone", emoji: "🇸🇱" },
  { value: "SM", label: "San Marino", emoji: "🇸🇲" },
  { value: "SN", label: "Senegal", emoji: "🇸🇳" },
  { value: "SO", label: "Somalia", emoji: "🇸🇴" },
  { value: "SR", label: "Suriname", emoji: "🇸🇷" },
  { value: "SS", label: "South Sudan", emoji: "🇸🇸" },
  { value: "ST", label: "Sao Tome and Principe", emoji: "🇸🇹" },
  { value: "SV", label: "El Salvador", emoji: "🇸🇻" },
  { value: "SX", label: "Sint Maarten, (Dutch part)", emoji: "🇸🇽" },
  { value: "SY", label: "Syrian Arab Republic", emoji: "🇸🇾" },
  { value: "SZ", label: "Eswatini", emoji: "🇸🇿" },
  { value: "TC", label: "Turks and Caicos Islands", emoji: "🇹🇨" },
  { value: "TD", label: "Chad", emoji: "🇹🇩" },
  { value: "TF", label: "French Southern Territories", emoji: "🇹🇫" },
  { value: "TG", label: "Togo", emoji: "🇹🇬" },
  { value: "TH", label: "Thailand", emoji: "🇹🇭" },
  { value: "TJ", label: "Tajikistan", emoji: "🇹🇯" },
  { value: "TK", label: "Tokelau", emoji: "🇹🇰" },
  { value: "TL", label: "Timor-Leste", emoji: "🇹🇱" },
  { value: "TM", label: "Turkmenistan", emoji: "🇹🇲" },
  { value: "TN", label: "Tunisia", emoji: "🇹🇳" },
  { value: "TO", label: "Tonga", emoji: "🇹🇴" },
  { value: "TR", label: "Türkiye", emoji: "🇹🇷" },
  { value: "TT", label: "Trinidad and Tobago", emoji: "🇹🇹" },
  { value: "TV", label: "Tuvalu", emoji: "🇹🇻" },
  { value: "TW", label: "Taiwan, Province of China", emoji: "🇹🇼" },
  { value: "TZ", label: "Tanzania, United Republic of", emoji: "🇹🇿" },
  { value: "UA", label: "Ukraine", emoji: "🇺🇦" },
  { value: "UG", label: "Uganda", emoji: "🇺🇬" },
  { value: "UM", label: "United States Minor Outlying Islands", emoji: "🇺🇲" },
  { value: "US", label: "United States of America", emoji: "🇺🇸" },
  { value: "UY", label: "Uruguay", emoji: "🇺🇾" },
  { value: "UZ", label: "Uzbekistan", emoji: "🇺🇿" },
  { value: "VA", label: "Holy See", emoji: "🇻🇦" },
  { value: "VC", label: "Saint Vincent and the Grenadines", emoji: "🇻🇨" },
  { value: "VE", label: "Venezuela, Bolivarian Republic of", emoji: "🇻🇪" },
  { value: "VG", label: "Virgin Islands, British", emoji: "🇻🇬" },
  { value: "VI", label: "Virgin Islands, U.S.", emoji: "🇻🇮" },
  { value: "VN", label: "Viet Nam", emoji: "🇻🇳" },
  { value: "VU", label: "Vanuatu", emoji: "🇻🇺" },
  { value: "WF", label: "Wallis and Futuna", emoji: "🇼🇫" },
  { value: "WS", label: "Samoa", emoji: "🇼🇸" },
  { value: "YE", label: "Yemen", emoji: "🇾🇪" },
  { value: "YT", label: "Mayotte", emoji: "🇾🇹" },
  { value: "ZA", label: "South Africa", emoji: "🇿🇦" },
  { value: "ZM", label: "Zambia", emoji: "🇿🇲" },
  { value: "ZW", label: "Zimbabwe", emoji: "🇿🇼" },
]

```

### Links

Use the `asChild` prop to render the combobox items as links.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { LuExternalLink } from "react-icons/lu"

export const ComboboxWithLinks = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
      selectionBehavior="clear"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item asChild item={item} key={item.value}>
                <a href={item.docs}>
                  {item.label} <LuExternalLink size={10} />
                </a>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react", docs: "https://react.dev" },
  { label: "Solid", value: "solid", docs: "https://solidjs.com" },
  { label: "Vue", value: "vue", docs: "https://vuejs.org" },
  { label: "Angular", value: "angular", docs: "https://angular.io" },
  { label: "Svelte", value: "svelte", docs: "https://svelte.dev" },
  { label: "Preact", value: "preact", docs: "https://preactjs.com" },
  { label: "Qwik", value: "qwik", docs: "https://qwik.builder.io" },
  { label: "Lit", value: "lit", docs: "https://lit.dev" },
  { label: "Alpine.js", value: "alpinejs", docs: "https://alpinejs.dev" },
  { label: "Ember", value: "ember", docs: "https://emberjs.com" },
  { label: "Next.js", value: "nextjs", docs: "https://nextjs.org" },
]

```

For custom router links, you can customize the `navigate` prop on the
`Combobox.Root` component.

Here's an example of using the Tanstack Router.

```tsx {8-10}
import { Combobox } from "@chakra-ui/react"
import { useNavigate } from "@tanstack/react-router"

function Demo() {
  const navigate = useNavigate()
  return (
    <Combobox.Root
      navigate={({ href }) => {
        navigate({ to: href })
      }}
    >
      {/* ... */}
    </Combobox.Root>
  )
}
```

### Rehydrate Value

In some cases, where a combobox has a `defaultValue` but the collection is not
loaded yet, here's an example of how to rehydrate the value and populate the
input value.

```tsx
"use client"

import {
  Combobox,
  For,
  HStack,
  Portal,
  Span,
  Spinner,
  useCombobox,
  useListCollection,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useAsync } from "react-use"

export const ComboboxRehydrateValue = () => {
  const [inputValue, setInputValue] = useState("")

  const { collection, set } = useListCollection<Character>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  const combobox = useCombobox({
    collection,
    defaultValue: ["C-3PO"],
    placeholder: "Example: Dexter",
    inputValue,
    onInputValueChange: (e) => setInputValue(e.inputValue),
  })

  const state = useAsync(async () => {
    const response = await fetch(
      `https://swapi.py4e.com/api/people/?search=${inputValue}`,
    )
    const data = await response.json()
    set(data.results)
  }, [inputValue, set])

  // Rehydrate the value
  const hydrated = useRef(false)
  if (combobox.value.length && collection.size && !hydrated.current) {
    combobox.syncSelectedItems()
    hydrated.current = true
  }

  return (
    <Combobox.RootProvider value={combobox} width="320px">
      <Combobox.Label>Search Star Wars Characters</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {state.loading ? (
              <HStack p="2">
                <Spinner size="xs" />
                <Span>Loading...</Span>
              </HStack>
            ) : state.error ? (
              <Span p="2" color="fg.error">
                {state.error.message}
              </Span>
            ) : (
              <For
                each={collection.items}
                fallback={<Combobox.Empty>No items</Combobox.Empty>}
              >
                {(item) => (
                  <Combobox.Item key={item.name} item={item}>
                    <HStack justify="space-between" textStyle="sm">
                      <Span fontWeight="medium">{item.name}</Span>
                      <Span color="fg.muted">
                        {item.height}cm / {item.mass}kg
                      </Span>
                    </HStack>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )}
              </For>
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  )
}

interface Character {
  name: string
  height: string
  mass: string
  created: string
  edited: string
  url: string
}

```

### Custom Item

Customize the appearance of items in the dropdown with your own components.

```tsx
"use client"

import {
  Combobox,
  HStack,
  Image,
  Portal,
  Span,
  Stack,
  useComboboxContext,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

function ComboboxValue() {
  const combobox = useComboboxContext()
  const selectedItems = combobox.selectedItems as (typeof items)[number][]
  return (
    <Stack mt="2">
      {selectedItems.map((item) => (
        <HStack key={item.value} textStyle="sm" p="1" borderWidth="1px">
          <Image
            boxSize="10"
            p="2"
            src={item.logo}
            alt={item.label + " logo"}
          />
          <span>{item.label}</span>
        </HStack>
      ))}
    </Stack>
  )
}

export const ComboboxWithCustomItem = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
      placeholder="Example: Audi"
      multiple
      closeOnSelect
    >
      <Combobox.Label>Search and select car brands</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <ComboboxValue />
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                <Image boxSize="5" src={item.logo} alt={item.label + " logo"} />
                <Span flex="1">{item.label}</Span>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

export const items = [
  {
    label: "Audi",
    value: "audi",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/audi-logo.png",
  },
  {
    label: "BMW",
    value: "bmw",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/bmw-logo.png",
  },
  {
    label: "Citroen",
    value: "citroen",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/citroen-logo.png",
  },
  {
    label: "Dacia",
    value: "dacia",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/dacia-logo.png",
  },
  {
    label: "Fiat",
    value: "fiat",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/fiat-logo.png",
  },
  {
    label: "Ford",
    value: "ford",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/ford-logo.png",
  },
  {
    label: "Ferrari",
    value: "ferrari",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/ferrari-logo.png",
  },
  {
    label: "Honda",
    value: "honda",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/honda-logo.png",
  },
  {
    label: "Hyundai",
    value: "hyundai",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/hyundai-logo.png",
  },
  {
    label: "Jaguar",
    value: "jaguar",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/jaguar-logo.png",
  },
  {
    label: "Jeep",
    value: "jeep",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/jeep-logo.png",
  },
  {
    label: "Kia",
    value: "kia",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/kia-logo.png",
  },
  {
    label: "Land Rover",
    value: "land rover",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/land-rover-logo.png",
  },
  {
    label: "Mazda",
    value: "mazda",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mazda-logo.png",
  },
  {
    label: "Mercedes",
    value: "mercedes",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mercedes-logo.png",
  },
  {
    label: "Mini",
    value: "mini",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mini-logo.png",
  },
  {
    label: "Mitsubishi",
    value: "mitsubishi",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mitsubishi-logo.png",
  },
  {
    label: "Nissan",
    value: "nissan",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/nissan-logo.png",
  },
  {
    label: "Opel",
    value: "opel",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/opel-logo.png",
  },
  {
    label: "Peugeot",
    value: "peugeot",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/peugeot-logo.png",
  },
  {
    label: "Porsche",
    value: "porsche",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/porsche-logo.png",
  },
  {
    label: "Renault",
    value: "renault",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/renault-logo.png",
  },
  {
    label: "Saab",
    value: "saab",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/saab-logo.png",
  },
  {
    label: "Skoda",
    value: "skoda",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/skoda-logo.png",
  },
  {
    label: "Subaru",
    value: "subaru",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/subaru-logo.png",
  },
  {
    label: "Suzuki",
    value: "suzuki",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/suzuki-logo.png",
  },
  {
    label: "Toyota",
    value: "toyota",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/toyota-logo.png",
  },
  {
    label: "Volkswagen",
    value: "volkswagen",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/volkswagen-logo.png",
  },
  {
    label: "Volvo",
    value: "volvo",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/volvo-logo.png",
  },
]

```

### Custom Filter

Here's an example of a custom filter that matches multiple properties of an
item.

```tsx
"use client"

import {
  Combobox,
  Portal,
  Span,
  Stack,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithCustomFilter = () => {
  const { collection, set } = useListCollection({
    initialItems: people,
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id.toString(),
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    const filteredItems = people.filter((item) => {
      const searchLower = details.inputValue.toLowerCase()
      const nameParts = item.name.toLowerCase().split(" ")
      const emailParts = item.email.toLowerCase().split("@")[0].split(".")

      return (
        item.name.toLowerCase().includes(searchLower) ||
        nameParts.some((part) => part.includes(searchLower)) ||
        emailParts.some((part) => part.includes(searchLower)) ||
        item.role.toLowerCase().includes(searchLower)
      )
    })
    set(filteredItems)
  }

  return (
    <Combobox.Root
      width="320px"
      collection={collection}
      inputBehavior="autocomplete"
      placeholder="Search by name, email, or role..."
      onInputValueChange={handleInputChange}
    >
      <Combobox.Label>Select Person</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No matches found</Combobox.Empty>
            {collection.items.map((person) => (
              <Combobox.Item item={person} key={person.id}>
                <Stack gap={0}>
                  <Span textStyle="sm" fontWeight="medium">
                    {person.name}
                  </Span>
                  <Span textStyle="xs" color="fg.muted">
                    {person.email}
                  </Span>
                </Stack>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const people = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Sales Manager",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "UI Designer",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Software Engineer",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "AI Engineer",
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james@example.com",
    role: "Chief Executive Officer",
  },
]

```

### Custom Animation

To customize the animation of the combobox, pass the `_open` and `_closed` prop
to the `Combobox.Content` component.

```tsx
"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithCustomAnimation = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
      positioning={{ flip: false, gutter: 2 }}
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content
            _open={{ animationStyle: "scale-fade-in" }}
            _closed={{
              animationStyle: "scale-fade-out",
              animationDuration: "fast",
            }}
          >
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Open From Dialog

To use the combobox within a dialog or popover component, avoid wrapping the
`Combobox.Positioner` within the `Portal`.

```diff
-<Portal>
  <Combobox.Positioner>
    <Combobox.Content>
      {/* ... */}
    </Combobox.Content>
  </Combobox.Positioner>
-</Portal>
```

If you use a `Dialog` and have set `scrollBehavior="inside"`, you need to:

- Set the combobox positioning to `fixed` to avoid the combobox from being
  clipped by the dialog.
- Set `hideWhenDetached` to `true` to hide the combobox when the trigger is
  scrolled out of view.

```tsx
<Combobox.Root positioning={{ strategy: "fixed", hideWhenDetached: true }}>
  {/* ... */}
</Combobox.Root>
```

```tsx
"use client"

import {
  Button,
  Combobox,
  Popover,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxOpenFromPopover = () => {
  return (
    <Popover.Root size="xs">
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm">
          Toggle popover
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>Select framework</Popover.Header>
            <Popover.Body>
              <ComboboxDemo />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

const ComboboxDemo = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
    >
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No items found</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item item={item} key={item.value}>
              {item.label}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]

```

### Creatable

Here's an example of how to allow users to create new options by typing values
that don't exist in the list. It uses the `useCombobox` and
`Combobox.RootProvider` components for smoother integration and management.

> **Note:** This example is not fully tested. Feel free to use it as a starting
> point and improve it according to your needs.

```tsx
"use client"

import {
  Combobox,
  HStack,
  Portal,
  Span,
  createListCollection,
  useCombobox,
  useFilter,
} from "@chakra-ui/react"
import { useMemo, useRef, useState } from "react"
import { flushSync } from "react-dom"

export const ComboboxWithCreateable = () => {
  const combobox = useCreatableCombobox({
    initialItems: [
      { label: "React", value: "react" },
      { label: "Solid", value: "solid" },
      { label: "Vue", value: "vue" },
      { label: "Svelte", value: "svelte" },
    ],
    onCreateItem: (item) => {
      console.log("Created new item:", item)
    },
    createOptionMode: "prepend",
  })

  return (
    <Combobox.RootProvider value={combobox} maxW="320px">
      <Combobox.Label>Choose Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Search or create..." />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {combobox.collection.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                {isNewItemValue(item.value) ? (
                  <Combobox.ItemText>
                    {`+ Create "${item.label}"`}
                  </Combobox.ItemText>
                ) : (
                  <HStack justify="space-between" flex="1">
                    <Combobox.ItemText flex="0">{item.label}</Combobox.ItemText>
                    {item.isNew && <Span textStyle="xs">NEW</Span>}
                  </HStack>
                )}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  )
}

interface Item {
  label: string
  value: string
  isNew?: boolean
}

type CreateOptionMode = "append" | "prepend"

const NEW_ITEM_VALUE = "[[new]]"

const createNewItem = (value: string): Item => ({
  label: value,
  value: NEW_ITEM_VALUE,
})

const isNewItemValue = (value: string) => value === NEW_ITEM_VALUE

const replaceNewItemValue = (values: string[], value: string) =>
  values.map((v) => (v === NEW_ITEM_VALUE ? value : v))

const getNewItemData = (inputValue: string): Item => ({
  label: inputValue,
  value: inputValue,
  isNew: true,
})

const updateItems = (v: Item[], i: Item, mode: CreateOptionMode) => {
  return mode === "prepend" ? [i, ...v] : [...v, i]
}

interface UseCreatableComboboxProps {
  initialItems: Item[]
  onCreateItem: (item: Item) => void
  createOptionMode: CreateOptionMode
}

function useCreatableCombobox(props: UseCreatableComboboxProps) {
  const { initialItems, onCreateItem, createOptionMode } = props

  const [items, setItems] = useState<Item[]>(initialItems)
  const itemsRef = useRef<Item[]>(initialItems)

  const { contains } = useFilter({ sensitivity: "base" })

  const filterFn = (item: Item, query: string) =>
    !isNewItemValue(item.value) && contains(item.label, query)

  const [selectedValue, setSelectedValue] = useState<string[]>([])

  const collection = useMemo(
    () =>
      createListCollection({
        items,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
      }),
    [items],
  )

  const isValidNewItem = (inputValue: string) => {
    const exactOptionMatch =
      items.filter(
        (item) => item.label.toLowerCase() === inputValue.toLowerCase(),
      ).length > 0
    return !exactOptionMatch && inputValue.trim().length > 0
  }

  const filter = (query: string) => {
    if (isValidNewItem(query)) {
      const newItem = createNewItem(query)
      const filtered = itemsRef.current.filter((item) => filterFn(item, query))
      setItems(updateItems(filtered, newItem, createOptionMode))
      return
    }

    if (query.trim().length === 0) {
      setItems(itemsRef.current)
    } else {
      const filtered = itemsRef.current.filter((item) => filterFn(item, query))
      setItems(filtered)
    }
  }

  const selectNewItem = (inputValue: string) => {
    const newItem = getNewItemData(inputValue)
    const filtered = itemsRef.current.filter(
      (item) => !isNewItemValue(item.value),
    )

    itemsRef.current = updateItems(filtered, newItem, createOptionMode)
    setItems(itemsRef.current)
    onCreateItem?.(newItem)
  }

  const combobox = useCombobox({
    collection,
    allowCustomValue: true,
    onInputValueChange: (details: Combobox.InputValueChangeDetails) => {
      const { inputValue, reason } = details
      if (reason === "input-change" || reason === "item-select") {
        flushSync(() => filter(inputValue))
      }
    },
    onOpenChange(details) {
      const { reason, open } = details
      if (reason === "trigger-click") {
        setItems(itemsRef.current)
      }

      if (!open && selectedValue.length > 0) {
        const inputValue = collection.stringify(selectedValue[0]) || ""
        combobox.setInputValue(inputValue)
      }
    },
    value: selectedValue,
    onValueChange(details) {
      const { value } = details
      const inputValue = combobox.inputValue
      setSelectedValue(replaceNewItemValue(value, inputValue))
      if (value.includes(NEW_ITEM_VALUE)) {
        selectNewItem(inputValue)
      }
    },
  })

  return combobox
}

```

## Guides

### Controlling the value

Use `value` and `onValueChange` for controlled mode. When changing the value
externally (e.g. form reset, sync) with filtering enabled, the input can show
empty if the selected item is filtered out. Call `reset()` before updating:

```tsx
const { collection, filter, reset } = useListCollection({
  initialItems: items,
  filter: contains,
})

// When changing value externally, reset the filter first
const setValueWithReset = (v: string[]) => {
  reset()
  setValue(v)
}
```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| collection | undefined | `ListCollection<T>` | The collection of items |
| alwaysSubmitOnEnter | false | `boolean` | Whether to always submit on Enter key press, even if popup is open.
Useful for single-field autocomplete forms where Enter should submit the form. |
| composite | true | `boolean` | Whether the combobox is a composed with other composite widgets like tabs |
| defaultInputValue | "" | `string` | The initial value of the combobox's input when rendered.
Use when you don't need to control the value of the combobox's input. |
| defaultValue | [] | `string[]` | The initial value of the combobox's selected items when rendered.
Use when you don't need to control the value of the combobox's selected items. |
| inputBehavior | "none" | `'none' \| 'autohighlight' \| 'autocomplete'` | Defines the auto-completion behavior of the combobox.

- `autohighlight`: The first focused item is highlighted as the user types
- `autocomplete`: Navigating the listbox with the arrow keys selects the item and the input is updated |
| lazyMount | false | `boolean` | Whether to enable lazy mounting |
| loopFocus | true | `boolean` | Whether to loop the keyboard navigation through the items |
| openOnChange | true | `boolean \| ((details: InputValueChangeDetails) => boolean)` | Whether to show the combobox when the input value changes |
| openOnClick | false | `boolean` | Whether to open the combobox popup on initial click on the input |
| openOnKeyPress | true | `boolean` | Whether to open the combobox on arrow key press |
| positioning | { placement: "bottom-start" } | `PositioningOptions` | The positioning options to dynamically position the menu |
| selectionBehavior | "replace" | `'clear' \| 'replace' \| 'preserve'` | The behavior of the combobox input when an item is selected

- `replace`: The selected item string is set as the input value
- `clear`: The input value is cleared
- `preserve`: The input value is preserved |
| skipAnimationOnMount | false | `boolean` | Whether to allow the initial presence animation. |
| unmountOnExit | false | `boolean` | Whether to unmount on exit. |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| variant | outline | `'outline' \| 'subtle' \| 'flushed'` | The variant of the component |
| size | md | `'xs' \| 'sm' \| 'md' \| 'lg'` | The size of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| allowCustomValue | undefined | `boolean` | Whether to allow typing custom values in the input |
| autoFocus | undefined | `boolean` | Whether to autofocus the input on mount |
| closeOnSelect | undefined | `boolean` | Whether to close the combobox when an item is selected. |
| defaultHighlightedValue | undefined | `string` | The initial highlighted value of the combobox when rendered.
Use when you don't need to control the highlighted value of the combobox. |
| defaultOpen | undefined | `boolean` | The initial open state of the combobox when rendered.
Use when you don't need to control the open state of the combobox. |
| disabled | undefined | `boolean` | Whether the combobox is disabled |
| disableLayer | undefined | `boolean` | Whether to disable registering this a dismissable layer |
| form | undefined | `string` | The associate form of the combobox. |
| highlightedValue | undefined | `string` | The controlled highlighted value of the combobox |
| id | undefined | `string` | The unique identifier of the machine. |
| ids | undefined | `Partial<{\n  root: string\n  label: string\n  control: string\n  input: string\n  content: string\n  trigger: string\n  clearTrigger: string\n  item: (id: string, index?: number \| undefined) => string\n  positioner: string\n  itemGroup: (id: string \| number) => string\n  itemGroupLabel: (id: string \| number) => string\n}>` | The ids of the elements in the combobox. Useful for composition. |
| immediate | undefined | `boolean` | Whether to synchronize the present change immediately or defer it to the next frame |
| inputValue | undefined | `string` | The controlled value of the combobox's input |
| invalid | undefined | `boolean` | Whether the combobox is invalid |
| multiple | undefined | `boolean` | Whether to allow multiple selection.

**Good to know:** When `multiple` is `true`, the `selectionBehavior` is automatically set to `clear`.
It is recommended to render the selected items in a separate container. |
| name | undefined | `string` | The `name` attribute of the combobox's input. Useful for form submission |
| navigate | undefined | `(details: NavigateDetails) => void` | Function to navigate to the selected item |
| onExitComplete | undefined | `VoidFunction` | Function called when the animation ends in the closed state |
| onFocusOutside | undefined | `(event: FocusOutsideEvent) => void` | Function called when the focus is moved outside the component |
| onHighlightChange | undefined | `(details: HighlightChangeDetails<T>) => void` | Function called when an item is highlighted using the pointer
or keyboard navigation. |
| onInputValueChange | undefined | `(details: InputValueChangeDetails) => void` | Function called when the input's value changes |
| onInteractOutside | undefined | `(event: InteractOutsideEvent) => void` | Function called when an interaction happens outside the component |
| onOpenChange | undefined | `(details: OpenChangeDetails) => void` | Function called when the popup is opened |
| onPointerDownOutside | undefined | `(event: PointerDownOutsideEvent) => void` | Function called when the pointer is pressed down outside the component |
| onSelect | undefined | `(details: SelectionDetails) => void` | Function called when an item is selected |
| onValueChange | undefined | `(details: ValueChangeDetails<T>) => void` | Function called when a new item is selected |
| open | undefined | `boolean` | The controlled open state of the combobox |
| placeholder | undefined | `string` | The placeholder text of the combobox's input |
| present | undefined | `boolean` | Whether the node is present (controlled by the user) |
| readOnly | undefined | `boolean` | Whether the combobox is readonly. This puts the combobox in a "non-editable" mode
but the user can still interact with it |
| required | undefined | `boolean` | Whether the combobox is required |
| scrollToIndexFn | undefined | `(details: ScrollToIndexDetails) => void` | Function to scroll to a specific index |
| translations | undefined | `IntlTranslations` | Specifies the localized strings that identifies the accessibility elements and their states |
| value | undefined | `string[]` | The controlled value of the combobox's selected items |


### Item

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| item | undefined | `any` | The item to render |
| persistFocus | undefined | `boolean` | Whether hovering outside should clear the highlighted state |


## Explorer

Explore the `Combobox` component parts interactively. Click on parts in the
sidebar to highlight them in the preview.

<Explorer name="combobox-explorer-demo" />