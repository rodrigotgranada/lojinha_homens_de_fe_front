# components > Listbox
  
  URL: docs/components/listbox
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/listbox.mdx
  
  Used to display a list of options for selection.
          
  ***
  
  title: Listbox
  description: Used to display a list of options for selection.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/listbox
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-listbox--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/listbox.ts
 - ark: https://ark-ui.com/docs/components/listbox
  ------------------------------------------------------------------------------------------------
  
  ```tsx
"use client"

import { Listbox, createListCollection } from "@chakra-ui/react"

export const ListboxBasic = () => {
  return (
    <Listbox.Root collection={frameworks} width="320px">
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})

```

## Usage

```jsx
import { Listbox } from "@chakra-ui/react"
```

```jsx
<Listbox.Root>
  <Listbox.Label />
  <Listbox.Content>
    <Listbox.Item>
      <Listbox.ItemText />
      <Listbox.ItemIndicator />
    </Listbox.Item>
  </Listbox.Content>
</Listbox.Root>
```

To setup the listbox, use `useListCollection` to manage the
[list collection](https://ark-ui.com/docs/collections/list-collection).

## Examples

### Controlled

Control the listbox value externally using the `value` and `onValueChange` props
for custom state management.

```tsx
"use client"

import { Code, Listbox, Stack, createListCollection } from "@chakra-ui/react"
import { useState } from "react"

export const ListboxControlled = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <Stack maxWidth="320px" width="full" gap="4">
      <Listbox.Root
        collection={frameworks}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <Listbox.Label>Select framework</Listbox.Label>
        <Listbox.Content>
          {frameworks.items.map((framework) => (
            <Listbox.Item item={framework} key={framework.value}>
              <Listbox.ItemText>{framework.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.Root>

      <Code alignSelf="flex-start">
        Selected: {JSON.stringify(value, null, 2)}
      </Code>
    </Stack>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})

```

### With Store

An alternative way to control the listbox is to use the `RootProvider` component
and the `useListbox` store hook.

This way you can access the listbox state and methods from outside the listbox.

> Use `RootProvider + useListbox` or `Root`, not both.

```tsx
"use client"

import {
  Code,
  Listbox,
  Stack,
  createListCollection,
  useListbox,
} from "@chakra-ui/react"

export const ListboxWithStore = () => {
  const listbox = useListbox({ collection: frameworks })

  return (
    <Stack maxWidth="320px" width="full" gap="4">
      <Listbox.RootProvider value={listbox}>
        <Listbox.Label>Select framework</Listbox.Label>
        <Listbox.Content>
          {frameworks.items.map((framework) => (
            <Listbox.Item item={framework} key={framework.value}>
              <Listbox.ItemText>{framework.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.RootProvider>

      <Code alignSelf="flex-start">
        Selected: {JSON.stringify(listbox.value, null, 2)}
      </Code>
    </Stack>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})

```

### Disabled Item

Disable specific items in the listbox to indicate unavailable options while
keeping them visible for context.

```tsx
"use client"

import { Listbox, createListCollection } from "@chakra-ui/react"

export const ListboxDisabledItem = () => {
  return (
    <Listbox.Root collection={frameworks} width="320px">
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue", disabled: true },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte", disabled: true },
    { label: "Next.js", value: "nextjs" },
  ],
})

```

### Grouped

Use item groups to organize related options with clear section headers, making
it easier for users to find specific categories of items.

```tsx
"use client"

import { Listbox, createListCollection } from "@chakra-ui/react"

export const ListboxGrouped = () => {
  return (
    <Listbox.Root collection={collection} width="320px">
      <Listbox.Label>Select media</Listbox.Label>
      <Listbox.Content divideY="1px">
        {collection.group().map(([category, items]) => (
          <Listbox.ItemGroup key={category}>
            <Listbox.ItemGroupLabel>{category}</Listbox.ItemGroupLabel>
            {items.map((item) => (
              <Listbox.Item item={item} key={item.value}>
                <Listbox.ItemText>{item.label}</Listbox.ItemText>
                <Listbox.ItemIndicator />
              </Listbox.Item>
            ))}
          </Listbox.ItemGroup>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const collection = createListCollection({
  items: [
    { label: "Naruto", value: "naruto", category: "Anime" },
    { label: "One Piece", value: "one-piece", category: "Anime" },
    { label: "Dragon Ball", value: "dragon-ball", category: "Anime" },
    {
      label: "The Shawshank Redemption",
      value: "the-shawshank-redemption",
      category: "Movies",
    },
    { label: "The Godfather", value: "the-godfather", category: "Movies" },
    { label: "The Dark Knight", value: "the-dark-knight", category: "Movies" },
  ],
  groupBy: (item) => item.category,
})

```

### Horizontal

Display listbox items in a horizontal layout with card-based presentation,
perfect for media galleries or visual selection interfaces.

```tsx
"use client"

import {
  Image,
  Listbox,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react"

export const ListboxHorizontal = () => {
  return (
    <Listbox.Root
      collection={musicAlbums}
      orientation="horizontal"
      maxW="640px"
    >
      <Listbox.Label>Select Album</Listbox.Label>
      <Listbox.Content>
        {musicAlbums.items.map((album) => (
          <Listbox.Item
            item={album}
            key={album.value}
            flexDirection="column"
            alignItems="flex-start"
            gap="2"
            position="relative"
          >
            <Image
              src={album.image}
              alt={album.title}
              bg="bg.subtle"
              objectFit="cover"
              aspectRatio="1"
              borderRadius="l2"
              flexShrink="0"
              height="150px"
              minWidth="150px"
            />
            <Stack gap="0">
              <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
                {album.title}
              </Text>
              <Text fontSize="xs">{album.artist}</Text>
            </Stack>
            <Listbox.ItemIndicator
              position="absolute"
              top="4"
              right="4"
              layerStyle="fill.solid"
              borderWidth="2px"
              borderColor="fg.inverted"
            />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const musicAlbums = createListCollection({
  items: [
    {
      value: "euphoric-echoes",
      title: "Euphoric Echoes",
      artist: "Luna Solstice",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=160&h=160&fit=crop",
    },
    {
      value: "neon-dreamscape",
      title: "Neon Dreamscape",
      artist: "Electra Skyline",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=160&h=160&fit=crop",
    },
    {
      value: "cosmic-serenade",
      title: "Cosmic Serenade",
      artist: "Orion's Symphony",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=160&h=160&fit=crop",
    },
    {
      value: "melancholy-melodies",
      title: "Melancholy Melodies",
      artist: "Violet Mistral",
      image:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=160&h=160&fit=crop",
    },
    {
      value: "rhythmic-illusions",
      title: "Rhythmic Illusions",
      artist: "Mirage Beats",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=160&h=160&fit=crop",
    },
  ],
})

```

### Multiple Selection

Enable users to select multiple items from the list, useful for scenarios like
choosing tags, categories, or preferences.

```tsx
"use client"

import { Listbox, createListCollection } from "@chakra-ui/react"

export const ListboxMultiselect = () => {
  return (
    <Listbox.Root collection={frameworks} selectionMode="multiple" maxW="320px">
      <Listbox.Label>Select frameworks (multiple)</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt.js", value: "nuxtjs" },
  ],
})

```

### Select All

Provide convenient "Select All" and "Select None" controls for multiple
selection scenarios, with visual indicators showing selection state.

```tsx
"use client"

import type { CheckmarkProps, FlexProps } from "@chakra-ui/react"
import {
  Box,
  Checkmark,
  Flex,
  Listbox,
  createListCollection,
  useListboxContext,
  useListboxItemContext,
} from "@chakra-ui/react"

export const ListboxSelectAll = () => {
  return (
    <Box maxW="320px">
      <Listbox.Root collection={frameworks} selectionMode="multiple" gap="0">
        <ListboxHeader />
        <Listbox.Content maxH="300px" roundedTop="0">
          {frameworks.items.map((framework) => (
            <Listbox.Item item={framework} key={framework.value}>
              <ListboxItemCheckmark />
              <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.Root>
    </Box>
  )
}

const ListboxHeader = (props: FlexProps) => {
  const listbox = useListboxContext()
  const isAllSelected = listbox.value.length === frameworks.items.length
  const isSomeSelected =
    listbox.value.length > 0 && listbox.value.length < frameworks.items.length

  const handleSelectAll = () => {
    if (isAllSelected) {
      listbox.setValue([])
    } else {
      listbox.setValue(frameworks.items.map((item) => item.value))
    }
  }

  return (
    <Flex
      as="button"
      onClick={handleSelectAll}
      px="3"
      gap="2"
      align="center"
      cursor="pointer"
      borderWidth="1px"
      minH="10"
      roundedTop="l2"
      mb="-1px"
      {...props}
    >
      <Checkmark
        filled
        size="sm"
        checked={isAllSelected}
        indeterminate={isSomeSelected}
      />
      <Listbox.Label>Select Frameworks</Listbox.Label>
    </Flex>
  )
}

const ListboxItemCheckmark = (props: CheckmarkProps) => {
  const itemState = useListboxItemContext()
  return (
    <Checkmark
      filled
      size="sm"
      checked={itemState.selected}
      disabled={itemState.disabled}
      {...props}
    />
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt.js", value: "nuxtjs" },
    { label: "Remix", value: "remix" },
    { label: "Gatsby", value: "gatsby" },
    { label: "Ember.js", value: "ember" },
    { label: "Preact", value: "preact" },
  ],
})

```

### Extended Select

Use extended selection mode to allow users to select multiple items using
keyboard shortcuts like Cmd/Ctrl for advanced selection patterns.

```tsx
"use client"

import { Kbd, Listbox, createListCollection } from "@chakra-ui/react"

export const ListboxExtendedSelect = () => {
  return (
    <Listbox.Root collection={frameworks} selectionMode="extended">
      <Listbox.Label>
        Select frameworks (hold <Kbd>⌘</Kbd> or <Kbd>^</Kbd> to select multiple)
      </Listbox.Label>
      <Listbox.Content maxW="320px">
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})

```

### With Checkmark

Display custom checkmarks for multiple selection scenarios, providing clear
visual feedback for selected items.

```tsx
"use client"

import {
  Checkmark,
  Listbox,
  createListCollection,
  useListboxItemContext,
} from "@chakra-ui/react"

const ListboxItemCheckmark = () => {
  const itemState = useListboxItemContext()
  return (
    <Checkmark
      filled
      size="sm"
      checked={itemState.selected}
      disabled={itemState.disabled}
    />
  )
}

export const ListboxWithCheckmark = () => {
  return (
    <Listbox.Root collection={frameworks} selectionMode="multiple" maxW="320px">
      <Listbox.Label>Select frameworks (with checkmarks)</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <ListboxItemCheckmark />
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt.js", value: "nuxtjs" },
  ],
})

```

### With Icon

Add icons to listbox items to provide visual context and improve recognition of
different options.

```tsx
"use client"

import { Box, Listbox, createListCollection } from "@chakra-ui/react"
import { LuAtom, LuGlobe, LuPalette, LuZap } from "react-icons/lu"

export const ListboxWithIcon = () => {
  return (
    <Listbox.Root collection={frameworks} maxW="320px">
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Box display="flex" alignItems="center" gap="3" flex="1">
              <Box color="fg.muted" flexShrink="0">
                {framework.icon}
              </Box>
              <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            </Box>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react", icon: <LuAtom size={16} /> },
    { label: "Vue.js", value: "vue", icon: <LuPalette size={16} /> },
    { label: "Angular", value: "angular", icon: <LuGlobe size={16} /> },
    { label: "Svelte", value: "svelte", icon: <LuZap size={16} /> },
  ],
})

```

### With Description

Include additional descriptive text for each item to provide more context and
help users make informed choices.

```tsx
"use client"

import { Box, Listbox, Text, createListCollection } from "@chakra-ui/react"

export const ListboxWithDescription = () => {
  return (
    <Listbox.Root collection={frameworks} maxW="400px">
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Box flex="1">
              <Listbox.ItemText>{framework.label}</Listbox.ItemText>
              <Text fontSize="xs" color="fg.muted" mt="1">
                {framework.description}
              </Text>
            </Box>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const frameworks = createListCollection({
  items: [
    {
      label: "React.js",
      value: "react",
      description: "A JavaScript library for building user interfaces",
    },
    {
      label: "Vue.js",
      value: "vue",
      description: "The progressive JavaScript framework",
    },
    {
      label: "Angular",
      value: "angular",
      description: "Platform for building mobile and desktop web applications",
    },
    {
      label: "Svelte",
      value: "svelte",
      description: "Cybernetically enhanced web apps",
    },
    {
      label: "Next.js",
      value: "nextjs",
      description: "The React framework for production",
    },
  ],
})

```

### With Input

Combine a search input with the listbox to filter options dynamically, making it
easy to find specific items in long lists.

```tsx
"use client"

import { Input, Listbox, useFilter, useListCollection } from "@chakra-ui/react"

export const ListboxWithInput = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
      { label: "Next.js", value: "nextjs" },
      { label: "Nuxt.js", value: "nuxtjs" },
      { label: "Remix", value: "remix" },
      { label: "Gatsby", value: "gatsby" },
      { label: "Ember.js", value: "ember" },
      { label: "Preact", value: "preact" },
    ],
    filter: contains,
  })

  return (
    <Listbox.Root maxW="320px" collection={collection}>
      <Listbox.Label>Select Framework</Listbox.Label>
      <Listbox.Input
        as={Input}
        placeholder="Type to filter frameworks..."
        onChange={(e) => filter(e.target.value)}
      />
      <Listbox.Content maxH="200px">
        {collection.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}

        <Listbox.Empty>No frameworks found</Listbox.Empty>
      </Listbox.Content>
    </Listbox.Root>
  )
}

```

### With Popover

Use the listbox within a popover to create dropdown-like selection menus that
overlay other content without taking up permanent screen space.

```tsx
"use client"

import {
  Button,
  Listbox,
  Popover,
  Portal,
  useFilter,
  useListCollection,
  useListbox,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { LuChevronDown } from "react-icons/lu"

export const ListboxWithPopover = () => {
  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false)

  const { contains } = useFilter({ sensitivity: "base" })
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
      { label: "Next.js", value: "nextjs" },
      { label: "Nuxt.js", value: "nuxtjs" },
    ],
    filter: contains,
  })

  const listbox = useListbox({
    collection,
    onValueChange() {
      setOpen(false)
      setInputValueFn("")
      triggerRef.current?.focus()
    },
  })

  const setInputValueFn = (value: string) => {
    setInputValue(value)
    filter(value)
  }

  const selectedItem = listbox.selectedItems[0]

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button size="sm" ref={triggerRef} variant="outline">
          {selectedItem ? selectedItem.label : "Select"} <LuChevronDown />
        </Button>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content _closed={{ animation: "none" }}>
            <Popover.Body p="0">
              <Listbox.RootProvider value={listbox} gap="0" overflow="hidden">
                <Listbox.Input
                  minH="10"
                  px="3"
                  roundedTop="l2"
                  bg="transparent"
                  outline="0"
                  value={inputValue}
                  onChange={(e) => setInputValueFn(e.currentTarget.value)}
                />
                <Listbox.Content
                  borderWidth="0"
                  borderTopWidth="1px"
                  roundedTop="0"
                  gap="0"
                >
                  {collection.items.map((framework) => (
                    <Listbox.Item item={framework} key={framework.value}>
                      <Listbox.ItemText>{framework.label}</Listbox.ItemText>
                      <Listbox.ItemIndicator />
                    </Listbox.Item>
                  ))}
                </Listbox.Content>
              </Listbox.RootProvider>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

```

### With Dialog

Present the listbox in a modal dialog for focused selection experiences,
particularly useful for important choices that need user attention.

```tsx
"use client"

import {
  Button,
  Dialog,
  HStack,
  Kbd,
  Listbox,
  Portal,
  Span,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const ListboxWithDialog = () => {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: "Linear.app", value: "linear", type: "applications" },
      { label: "Notion", value: "notion", type: "applications" },
      { label: "Figma", value: "figma", type: "applications" },
      { label: "Slack", value: "slack", type: "applications" },
      { label: "Cursor", value: "cursor", type: "applications" },

      { label: "Open Terminal", value: "terminal", type: "commands" },
      { label: "Search Files", value: "search", type: "commands" },
      { label: "Git Status", value: "git-status", type: "commands" },
      { label: "Run Tests", value: "run-tests", type: "commands" },
      { label: "Deploy App", value: "deploy", type: "commands" },
    ],
    filter: contains,
    groupBy: (item) => item.type,
    groupSort: ["applications", "commands"],
  })

  const handleSelectionChange = (details: any) => {
    setSelectedFrameworks(details.value)
    setIsOpen(false)
    filter("")
  }

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Dialog.Trigger asChild>
          <Button variant="outline">Open Search</Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Listbox.Root
                collection={collection}
                value={selectedFrameworks}
                onValueChange={handleSelectionChange}
                variant="plain"
              >
                <Dialog.Header>
                  <Listbox.Input
                    placeholder="Search for apps or command..."
                    minH="6"
                    outline="0"
                    width="full"
                    onChange={(e) => filter(e.currentTarget.value)}
                    autoHighlight
                  />
                </Dialog.Header>

                <Listbox.Content px="3" maxH="300px">
                  {collection.group().map(([group, items]) => (
                    <Listbox.ItemGroup key={group}>
                      <Listbox.ItemGroupLabel textTransform="capitalize">
                        {group}
                      </Listbox.ItemGroupLabel>
                      {items.map((item) => (
                        <Listbox.Item
                          item={item}
                          key={item.value}
                          justifyContent="space-between"
                        >
                          <Listbox.ItemText>{item.label}</Listbox.ItemText>
                          <Span fontSize="xs" color="fg.muted">
                            {item.type}
                          </Span>
                        </Listbox.Item>
                      ))}
                    </Listbox.ItemGroup>
                  ))}
                </Listbox.Content>

                <Dialog.Footer textStyle="xs" borderTopWidth="1px">
                  <CommandItem label="Press Esc to close" keys={["Esc"]} />
                  <CommandItem label="Open Application" keys={["⏎"]} />
                  <CommandItem label="Actions" keys={["⌘", "K"]} />
                </Dialog.Footer>
              </Listbox.Root>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {selectedFrameworks.length > 0 && (
        <Text mt="3" textStyle="sm">
          Selected: {JSON.stringify(selectedFrameworks, null, 2)}
        </Text>
      )}
    </>
  )
}

const CommandItem = (props: { label: string; keys: string[] }) => {
  return (
    <HStack>
      {props.label} <Kbd size="sm">{props.keys.join(" ")}</Kbd>
    </HStack>
  )
}

```

### Virtualized

Handle large datasets efficiently with virtualization, rendering only visible
items to maintain smooth scrolling performance even with thousands of items.

```tsx
"use client"

import { Listbox, createListCollection, useLiveRef } from "@chakra-ui/react"
import { type VirtualItem, useVirtualizer } from "@tanstack/react-virtual"
import React, { useEffect, useMemo, useRef } from "react"

export const ListboxVirtualized = () => {
  const virtual = useListboxVirtualizer({
    count: countries.length,
  })

  const collection = useMemo(
    () => createListCollection({ items: countries }),
    [],
  )

  return (
    <Listbox.Root
      maxW="sm"
      collection={collection}
      scrollToIndexFn={virtual.scrollToIndexFn}
    >
      <Listbox.Label>Select Country ({countries.length} items)</Listbox.Label>
      <Listbox.Content ref={virtual.scrollRef} maxH="300px">
        <div {...virtual.getViewportProps()}>
          {virtual.virtualItems.map((virtualItem) => {
            const item = countries[virtualItem.index]
            return (
              <Listbox.Item
                key={item.value}
                item={item}
                {...virtual.getItemProps({ virtualItem })}
              >
                <Listbox.ItemText>{item.label}</Listbox.ItemText>
                <Listbox.ItemIndicator />
              </Listbox.Item>
            )
          })}
        </div>
      </Listbox.Content>
    </Listbox.Root>
  )
}

interface ScrollToIndexDetails {
  index: number
  getElement: () => HTMLElement | null
  immediate?: boolean
}

function useListboxVirtualizer(props: { count: number }) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearScrollTimeout = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = null
    }
  }

  const virtualizer = useVirtualizer({
    count: props.count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 32,
    overscan: 10,
  })

  const virtualizerRef = useLiveRef(virtualizer)

  const scrollToIndexFn = (details: ScrollToIndexDetails) => {
    clearScrollTimeout()

    const scrollToIndex = () => {
      const virtualizer = virtualizerRef.current
      const virtualItems = virtualizer.getVirtualItems()
      const virtualItem = virtualItems.find(
        (item) => item.index === details.index,
      )

      if (virtualItem) {
        const element = details.getElement()
        element?.scrollIntoView({ block: "nearest" })
        clearScrollTimeout()
        return
      }

      // Scroll towards the target index
      virtualizer.scrollToIndex(details.index)

      // Continue scrolling in intervals until we reach the target
      if (!details.immediate) {
        scrollTimeoutRef.current = setTimeout(scrollToIndex, 16) // ~60fps
      }
    }

    scrollToIndex()
  }

  // Cleanup timeout on unmount
  useEffect(() => clearScrollTimeout, [])

  const totalSize = virtualizer.getTotalSize()

  return {
    scrollRef,
    scrollToIndexFn,
    totalSize,
    virtualItems: virtualizer.getVirtualItems(),
    getViewportProps(
      props: React.ComponentProps<"div"> = {},
    ): React.ComponentProps<"div"> {
      return {
        ...props,
        style: {
          ...props.style,
          height: `${totalSize}px`,
          width: "100%",
          position: "relative",
        },
      }
    },
    getItemProps(
      props: React.ComponentProps<"div"> & { virtualItem: VirtualItem },
    ): React.ComponentProps<"div"> {
      const { virtualItem, ...rest } = props
      return {
        ...rest,
        "aria-posinset": virtualItem.index + 1,
        "aria-setsize": totalSize,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...rest.style,
          height: `${virtualItem.size}px`,
          transform: `translateY(${virtualItem.start}px)`,
        },
      }
    },
  }
}

export const countries = [
  { value: "AD", label: "Andorra" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "AF", label: "Afghanistan" },
  { value: "AG", label: "Antigua and Barbuda" },
  { value: "AI", label: "Anguilla" },
  { value: "AL", label: "Albania" },
  { value: "AM", label: "Armenia" },
  { value: "AO", label: "Angola" },
  { value: "AQ", label: "Antarctica" },
  { value: "AR", label: "Argentina" },
  { value: "AS", label: "American Samoa" },
  { value: "AT", label: "Austria" },
  { value: "AU", label: "Australia" },
  { value: "AW", label: "Aruba" },
  { value: "AX", label: "Åland Islands" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "BA", label: "Bosnia and Herzegovina" },
  { value: "BB", label: "Barbados" },
  { value: "BD", label: "Bangladesh" },
  { value: "BE", label: "Belgium" },
  { value: "BF", label: "Burkina Faso" },
  { value: "BG", label: "Bulgaria" },
  { value: "BH", label: "Bahrain" },
  { value: "BI", label: "Burundi" },
  { value: "BJ", label: "Benin" },
  { value: "BL", label: "Saint Barthélemy" },
  { value: "BM", label: "Bermuda" },
  { value: "BN", label: "Brunei Darussalam" },
  { value: "BO", label: "Bolivia, Plurinational State of" },
  { value: "BQ", label: "Bonaire, Sint Eustatius and Saba" },
  { value: "BR", label: "Brazil" },
  { value: "BS", label: "Bahamas" },
  { value: "BT", label: "Bhutan" },
  { value: "BV", label: "Bouvet Island" },
  { value: "BW", label: "Botswana" },
  { value: "BY", label: "Belarus" },
  { value: "BZ", label: "Belize" },
  { value: "CA", label: "Canada" },
  { value: "CC", label: "Cocos (Keeling) Islands" },
  { value: "CD", label: "Congo, Democratic Republic of the" },
  { value: "CF", label: "Central African Republic" },
  { value: "CG", label: "Congo" },
  { value: "CH", label: "Switzerland" },
  { value: "CI", label: "Côte d'Ivoire" },
  { value: "CK", label: "Cook Islands" },
  { value: "CL", label: "Chile" },
  { value: "CM", label: "Cameroon" },
  { value: "CN", label: "China" },
  { value: "CO", label: "Colombia" },
  { value: "CR", label: "Costa Rica" },
  { value: "CU", label: "Cuba" },
  { value: "CV", label: "Cabo Verde" },
  { value: "CW", label: "Curaçao" },
  { value: "CX", label: "Christmas Island" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czechia" },
  { value: "DE", label: "Germany" },
  { value: "DJ", label: "Djibouti" },
  { value: "DK", label: "Denmark" },
  { value: "DM", label: "Dominica" },
  { value: "DO", label: "Dominican Republic" },
  { value: "DZ", label: "Algeria" },
  { value: "EC", label: "Ecuador" },
  { value: "EE", label: "Estonia" },
  { value: "EG", label: "Egypt" },
  { value: "EH", label: "Western Sahara" },
  { value: "ER", label: "Eritrea" },
  { value: "ES", label: "Spain" },
  { value: "ET", label: "Ethiopia" },
  { value: "FI", label: "Finland" },
  { value: "FJ", label: "Fiji" },
  { value: "FK", label: "Falkland Islands (Malvinas)" },
  { value: "FM", label: "Micronesia, Federated States of" },
  { value: "FO", label: "Faroe Islands" },
  { value: "FR", label: "France" },
  { value: "GA", label: "Gabon" },
  {
    value: "GB",
    label: "United Kingdom of Great Britain and Northern Ireland",
  },
  { value: "GD", label: "Grenada" },
  { value: "GE", label: "Georgia" },
  { value: "GF", label: "French Guiana" },
  { value: "GG", label: "Guernsey" },
  { value: "GH", label: "Ghana" },
  { value: "GI", label: "Gibraltar" },
  { value: "GL", label: "Greenland" },
  { value: "GM", label: "Gambia" },
  { value: "GN", label: "Guinea" },
  { value: "GP", label: "Guadeloupe" },
  { value: "GQ", label: "Equatorial Guinea" },
  { value: "GR", label: "Greece" },
  { value: "GS", label: "South Georgia and the South Sandwich Islands" },
  { value: "GT", label: "Guatemala" },
  { value: "GU", label: "Guam" },
  { value: "GW", label: "Guinea-Bissau" },
  { value: "GY", label: "Guyana" },
  { value: "HK", label: "Hong Kong" },
  { value: "HM", label: "Heard Island and McDonald Islands" },
  { value: "HN", label: "Honduras" },
  { value: "HR", label: "Croatia" },
  { value: "HT", label: "Haiti" },
  { value: "HU", label: "Hungary" },
  { value: "ID", label: "Indonesia" },
  { value: "IE", label: "Ireland" },
  { value: "IL", label: "Israel" },
  { value: "IM", label: "Isle of Man" },
  { value: "IN", label: "India" },
  { value: "IO", label: "British Indian Ocean Territory" },
  { value: "IQ", label: "Iraq" },
  { value: "IR", label: "Iran, Islamic Republic of" },
  { value: "IS", label: "Iceland" },
  { value: "IT", label: "Italy" },
  { value: "JE", label: "Jersey" },
  { value: "JM", label: "Jamaica" },
  { value: "JO", label: "Jordan" },
  { value: "JP", label: "Japan" },
  { value: "KE", label: "Kenya" },
  { value: "KG", label: "Kyrgyzstan" },
  { value: "KH", label: "Cambodia" },
  { value: "KI", label: "Kiribati" },
  { value: "KM", label: "Comoros" },
  { value: "KN", label: "Saint Kitts and Nevis" },
  { value: "KP", label: "Korea, Democratic People's Republic of" },
  { value: "KR", label: "Korea, Republic of" },
  { value: "KW", label: "Kuwait" },
  { value: "KY", label: "Cayman Islands" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "LA", label: "Lao People's Democratic Republic" },
  { value: "LB", label: "Lebanon" },
  { value: "LC", label: "Saint Lucia" },
  { value: "LI", label: "Liechtenstein" },
  { value: "LK", label: "Sri Lanka" },
  { value: "LR", label: "Liberia" },
  { value: "LS", label: "Lesotho" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "LV", label: "Latvia" },
  { value: "LY", label: "Libya" },
  { value: "MA", label: "Morocco" },
  { value: "MC", label: "Monaco" },
  { value: "MD", label: "Moldova, Republic of" },
  { value: "ME", label: "Montenegro" },
  { value: "MF", label: "Saint Martin, (French part)" },
  { value: "MG", label: "Madagascar" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MK", label: "North Macedonia" },
  { value: "ML", label: "Mali" },
  { value: "MM", label: "Myanmar" },
  { value: "MN", label: "Mongolia" },
  { value: "MO", label: "Macao" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "MQ", label: "Martinique" },
  { value: "MR", label: "Mauritania" },
  { value: "MS", label: "Montserrat" },
  { value: "MT", label: "Malta" },
  { value: "MU", label: "Mauritius" },
  { value: "MV", label: "Maldives" },
  { value: "MW", label: "Malawi" },
  { value: "MX", label: "Mexico" },
  { value: "MY", label: "Malaysia" },
  { value: "MZ", label: "Mozambique" },
  { value: "NA", label: "Namibia" },
  { value: "NC", label: "New Caledonia" },
  { value: "NE", label: "Niger" },
  { value: "NF", label: "Norfolk Island" },
  { value: "NG", label: "Nigeria" },
  { value: "NI", label: "Nicaragua" },
  { value: "NL", label: "Netherlands" },
  { value: "NO", label: "Norway" },
  { value: "NP", label: "Nepal" },
  { value: "NR", label: "Nauru" },
  { value: "NU", label: "Niue" },
  { value: "NZ", label: "New Zealand" },
  { value: "OM", label: "Oman" },
  { value: "PA", label: "Panama" },
  { value: "PE", label: "Peru" },
  { value: "PF", label: "French Polynesia" },
  { value: "PG", label: "Papua New Guinea" },
  { value: "PH", label: "Philippines" },
  { value: "PK", label: "Pakistan" },
  { value: "PL", label: "Poland" },
  { value: "PM", label: "Saint Pierre and Miquelon" },
  { value: "PN", label: "Pitcairn" },
  { value: "PR", label: "Puerto Rico" },
  { value: "PS", label: "Palestine, State of" },
  { value: "PT", label: "Portugal" },
  { value: "PW", label: "Palau" },
  { value: "PY", label: "Paraguay" },
  { value: "QA", label: "Qatar" },
  { value: "RE", label: "Réunion" },
  { value: "RO", label: "Romania" },
  { value: "RS", label: "Serbia" },
  { value: "RU", label: "Russian Federation" },
  { value: "RW", label: "Rwanda" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "SB", label: "Solomon Islands" },
  { value: "SC", label: "Seychelles" },
  { value: "SD", label: "Sudan" },
  { value: "SE", label: "Sweden" },
  { value: "SG", label: "Singapore" },
  { value: "SH", label: "Saint Helena, Ascension and Tristan da Cunha" },
  { value: "SI", label: "Slovenia" },
  { value: "SJ", label: "Svalbard and Jan Mayen" },
  { value: "SK", label: "Slovakia" },
  { value: "SL", label: "Sierra Leone" },
  { value: "SM", label: "San Marino" },
  { value: "SN", label: "Senegal" },
  { value: "SO", label: "Somalia" },
  { value: "SR", label: "Suriname" },
  { value: "SS", label: "South Sudan" },
  { value: "ST", label: "Sao Tome and Principe" },
  { value: "SV", label: "El Salvador" },
  { value: "SX", label: "Sint Maarten, (Dutch part)" },
  { value: "SY", label: "Syrian Arab Republic" },
  { value: "SZ", label: "Eswatini" },
  { value: "TC", label: "Turks and Caicos Islands" },
  { value: "TD", label: "Chad" },
  { value: "TF", label: "French Southern Territories" },
  { value: "TG", label: "Togo" },
  { value: "TH", label: "Thailand" },
  { value: "TJ", label: "Tajikistan" },
  { value: "TK", label: "Tokelau" },
  { value: "TL", label: "Timor-Leste" },
  { value: "TM", label: "Turkmenistan" },
  { value: "TN", label: "Tunisia" },
  { value: "TO", label: "Tonga" },
  { value: "TR", label: "Türkiye" },
  { value: "TT", label: "Trinidad and Tobago" },
  { value: "TV", label: "Tuvalu" },
  { value: "TW", label: "Taiwan, Province of China" },
  { value: "TZ", label: "Tanzania, United Republic of" },
  { value: "UA", label: "Ukraine" },
  { value: "UG", label: "Uganda" },
  { value: "UM", label: "United States Minor Outlying Islands" },
  { value: "US", label: "United States of America" },
  { value: "UY", label: "Uruguay" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "VA", label: "Holy See" },
  { value: "VC", label: "Saint Vincent and the Grenadines" },
  { value: "VE", label: "Venezuela, Bolivarian Republic of" },
  { value: "VG", label: "Virgin Islands, British" },
  { value: "VI", label: "Virgin Islands, U.S." },
  { value: "VN", label: "Viet Nam" },
  { value: "VU", label: "Vanuatu" },
  { value: "WF", label: "Wallis and Futuna" },
  { value: "WS", label: "Samoa" },
  { value: "YE", label: "Yemen" },
  { value: "YT", label: "Mayotte" },
  { value: "ZA", label: "South Africa" },
  { value: "ZM", label: "Zambia" },
  { value: "ZW", label: "Zimbabwe" },
]

```

### Image Explorer

Create an interactive gallery where the listbox acts as navigation for
displaying different images or media content.

```tsx
"use client"

import {
  Box,
  Flex,
  Image,
  Listbox,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const ListboxImageExplorer = () => {
  const [selectedImage, setSelectedImage] = useState<string>("mountains")

  const handleSelectionChange = (details: any) => {
    if (details.value.length > 0) {
      setSelectedImage(details.value[0])
    }
  }

  const currentImage = images.items.find((img) => img.value === selectedImage)

  return (
    <Flex gap="6" maxW="800px">
      <Listbox.Root
        maxW="2xs"
        collection={images}
        value={[selectedImage]}
        onValueChange={handleSelectionChange}
        variant="solid"
      >
        <Listbox.Content border="0">
          {images.items.map((image) => (
            <Listbox.Item item={image} key={image.value}>
              <Listbox.ItemText>{image.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.Root>

      <Box flex="1">
        {currentImage && (
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb="3">
              {currentImage.label}
            </Text>
            <Image
              src={currentImage.url}
              alt={currentImage.label}
              borderRadius="md"
              maxH="400px"
              width="full"
              objectFit="cover"
            />
            <Text fontSize="sm" color="fg.muted" mt="2">
              {currentImage.description}
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  )
}

const images = createListCollection({
  items: [
    {
      label: "Mountain Landscape",
      value: "mountains",
      description: "Scenic mountain view",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
    {
      label: "Ocean Waves",
      value: "ocean",
      description: "Peaceful ocean scene",
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
    },
    {
      label: "Forest Path",
      value: "forest",
      description: "Tranquil forest trail",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    },
    {
      label: "City Skyline",
      value: "city",
      description: "Urban cityscape at night",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    },
    {
      label: "Desert Dunes",
      value: "desert",
      description: "Golden sand dunes",
      url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    },
  ],
})

```

### Transfer List

Create a dual-listbox interface for moving items between available and selected
states, commonly used for permission management or item selection workflows.

```tsx
"use client"

import {
  Center,
  type CollectionOptions,
  Flex,
  IconButton,
  Listbox,
  VStack,
  createListCollection,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

interface ListboxRenderProps<T> extends Listbox.RootProps<T> {
  contentRef: React.RefObject<HTMLDivElement | null>
}

function ListboxRender<T>(props: ListboxRenderProps<T>) {
  const { collection, contentRef, ...rest } = props
  return (
    <Listbox.Root {...rest} collection={collection} selectionMode="multiple">
      <Listbox.Content minH="96" ref={contentRef}>
        {collection.items.length > 0 ? (
          collection.items.map((item) => {
            const itemValue = collection.getItemValue(item)
            const itemLabel = collection.stringifyItem(item)
            return (
              <Listbox.Item item={item} key={itemValue} flex="0">
                <Listbox.ItemText>{itemLabel}</Listbox.ItemText>
                <Listbox.ItemIndicator />
              </Listbox.Item>
            )
          })
        ) : (
          <Center boxSize="full" p="4" color="fg.muted" textStyle="sm">
            No items available
          </Center>
        )}
      </Listbox.Content>
    </Listbox.Root>
  )
}

export const ListboxTransferList = () => {
  const state = useTransferListState<Item>({ items: animeCharacters })

  return (
    <Flex gap="4" maxW="600px" align="stretch">
      <ListboxRender
        contentRef={state.sourceContentRef}
        collection={state.source}
        value={state.selectedSource.map((item) => item.value)}
        onValueChange={(e) => state.setSelectedSource(e.items)}
      />
      <VStack justify="center" gap="2" py="8">
        <IconButton
          size="xs"
          variant="subtle"
          disabled={state.selectedSource.length === 0}
          onClick={() => {
            state.moveToTarget(state.selectedSource)
          }}
        >
          <LuChevronRight />
        </IconButton>
        <IconButton
          size="xs"
          variant="subtle"
          disabled={state.selectedTarget.length === 0}
          onClick={() => {
            state.moveToSource(state.selectedTarget)
          }}
        >
          <LuChevronLeft />
        </IconButton>
      </VStack>
      <ListboxRender
        contentRef={state.targetContentRef}
        collection={state.target}
        value={state.selectedTarget.map((item) => item.value)}
        onValueChange={(e) => state.setSelectedTarget(e.items)}
      />
    </Flex>
  )
}

function useTransferListState<T>(options: CollectionOptions<T>) {
  const sourceContentRef = useRef<HTMLDivElement | null>(null)
  const targetContentRef = useRef<HTMLDivElement | null>(null)

  const [source, setSource] = useState(createListCollection<T>(options))
  const [target, setTarget] = useState(
    createListCollection<T>({ ...options, items: [] }),
  )
  const [selectedSource, setSelectedSource] = useState<T[]>([])
  const [selectedTarget, setSelectedTarget] = useState<T[]>([])

  const scrollToItem = (container: HTMLDivElement | null, item: T) => {
    if (!container) return
    requestAnimationFrame(() => {
      const itemValue = target.getItemValue(item)
      const itemElement = container.querySelector(`[data-value="${itemValue}"]`)
      itemElement?.scrollIntoView({ block: "nearest" })
    })
  }

  const moveToTarget = (items: T[]) => {
    setSource(source.remove(...items))
    setTarget(target.append(...items))
    setSelectedSource([])
    scrollToItem(targetContentRef.current, items[items.length - 1])
  }

  const moveToSource = (items: T[]) => {
    setSource(source.append(...items))
    setTarget(target.remove(...items))
    setSelectedTarget([])
    scrollToItem(sourceContentRef.current, items[items.length - 1])
  }

  return {
    source,
    target,
    selectedSource,
    selectedTarget,
    setSelectedSource,
    setSelectedTarget,
    moveToTarget,
    moveToSource,
    sourceContentRef,
    targetContentRef,
  }
}

interface Item {
  label: string
  value: string
}

const animeCharacters = [
  { label: "Naruto", value: "naruto" },
  { label: "Sasuke", value: "sasuke" },
  { label: "Sakura", value: "sakura" },
  { label: "Kakashi", value: "kakashi" },
  { label: "Shisui", value: "shisui" },
  { label: "Itachi", value: "itachi" },
  { label: "Gaara", value: "gaara" },
  { label: "Rock Lee", value: "rock-lee" },
  { label: "Neji", value: "neji" },
  { label: "Tenten", value: "tenten" },
  { label: "Hinata", value: "hinata" },
  { label: "Kiba", value: "kiba" },
  { label: "Shino", value: "shino" },
  { label: "Choji", value: "choji" },
  { label: "Ino", value: "ino" },
]

```

### Emoji Grid

Display emojis in a grid layout with filtering capability, perfect for emoji
pickers or icon selection interfaces.

```tsx
"use client"

import {
  Input,
  Listbox,
  Square,
  createGridCollection,
  useFilter,
  useListboxContext,
} from "@chakra-ui/react"
import emojibase from "emojibase-data/en/compact.json"
import { useCallback, useMemo, useState } from "react"
import { LuSmile } from "react-icons/lu"

type Emoji = (typeof emojibase)[number]
const emojis = emojibase
  .filter((e) => !e.label.startsWith("regional indicator"))
  .slice(0, 200) as Emoji[]

export const ListboxWithEmojiGrid = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const [items, setItems] = useState(emojis)

  const collection = useMemo(
    () =>
      createGridCollection({
        columnCount: 8,
        items: items,
        itemToString(item) {
          return `${item.label} (${item.shortcodes})`
        },
        itemToValue(item) {
          return item.hexcode
        },
      }),
    [items],
  )

  const filter = useCallback(
    (value: string) => {
      setItems(emojis.filter((e) => contains(e.label, value)))
    },
    [contains],
  )

  return (
    <Listbox.Root collection={collection} maxW="min-content">
      <SelectedEmoji />
      <Listbox.Input
        as={Input}
        placeholder="Type to filter frameworks..."
        onChange={(e) => filter(e.target.value)}
      />
      <Listbox.Content
        w="374px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gap="1"
      >
        {collection.items.map((item, index) => (
          <Listbox.Item
            item={item}
            key={index}
            css={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "md",
              fontSize: "22px",
            }}
          >
            {item.unicode}
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const SelectedEmoji = () => {
  const listbox = useListboxContext()
  const [item] = listbox.selectedItems as Emoji[]
  return (
    <Square size="40px" bg="bg.muted" rounded="sm" textStyle="lg">
      {item ? item.unicode : <LuSmile />}
    </Square>
  )
}

```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| collection | undefined | `ListCollection<T>` | The collection of items |
| defaultValue | [] | `string[]` | The initial default value of the listbox when rendered.
Use when you don't need to control the value of the listbox. |
| loopFocus | false | `boolean` | Whether to loop the keyboard navigation through the options |
| orientation | "vertical" | `'horizontal' \| 'vertical'` | The orientation of the listbox. |
| selectionMode | "single" | `SelectionMode` | How multiple selection should behave in the listbox.

- `single`: The user can select a single item.
- `multiple`: The user can select multiple items without using modifier keys.
- `extended`: The user can select multiple items by using modifier keys. |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| variant | subtle | `'subtle' \| 'solid' \| 'plain'` | The variant of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| defaultHighlightedValue | undefined | `string` | The initial value of the highlighted item when opened.
Use when you don't need to control the highlighted value of the listbox. |
| deselectable | undefined | `boolean` | Whether to disallow empty selection |
| disabled | undefined | `boolean` | Whether the listbox is disabled |
| disallowSelectAll | undefined | `boolean` | Whether to disallow selecting all items when `meta+a` is pressed |
| highlightedValue | undefined | `string` | The controlled key of the highlighted item |
| id | undefined | `string` | The unique identifier of the machine. |
| ids | undefined | `Partial<{\n  root: string\n  content: string\n  label: string\n  item: (id: string \| number) => string\n  itemGroup: (id: string \| number) => string\n  itemGroupLabel: (id: string \| number) => string\n}>` | The ids of the elements in the listbox. Useful for composition. |
| onHighlightChange | undefined | `(details: HighlightChangeDetails<T>) => void` | The callback fired when the highlighted item changes. |
| onSelect | undefined | `(details: SelectionDetails) => void` | Function called when an item is selected |
| onValueChange | undefined | `(details: ValueChangeDetails<T>) => void` | The callback fired when the selected item changes. |
| scrollToIndexFn | undefined | `(details: ScrollToIndexDetails) => void` | Function to scroll to a specific index |
| selectOnHighlight | undefined | `boolean` | Whether to select the item when it is highlighted |
| typeahead | undefined | `boolean` | Whether to enable typeahead on the listbox |
| value | undefined | `string[]` | The controlled keys of the selected items |


### Label

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


### Input

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| autoHighlight | false | `boolean` | Whether to automatically highlight the item when typing |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


### Content

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


### Item

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| highlightOnHover | undefined | `boolean` | Whether to highlight the item on hover |
| item | undefined | `any` | The item to render |


### ItemText

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


### ItemIndicator

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


### ItemGroup

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


### ItemGroupLabel

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


## Explorer

Explore the `Listbox` component parts interactively. Click on parts in the
sidebar to highlight them in the preview.

<Explorer name="listbox-explorer-demo" />