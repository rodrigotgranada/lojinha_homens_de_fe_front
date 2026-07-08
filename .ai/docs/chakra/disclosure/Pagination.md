# components > Pagination
  
  URL: docs/components/pagination
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/pagination.mdx
  
  Used to navigate through a series of pages.
          
  ***
  
  title: Pagination
  description: Used to navigate through a series of pages.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/pagination
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-pagination--basic
 - ark: https://ark-ui.com/docs/components/pagination
  ------------------------------------------------------------------------------------------------
  
  ```tsx
"use client"

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export const PaginationBasic = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

```

## Usage

```tsx
import { Pagination } from "@chakra-ui/react"
```

```tsx
<Pagination.Root>
  <Pagination.PrevTrigger />
  <Pagination.Ellipsis />
  <Pagination.Item />
  <Pagination.PageText />
  <Pagination.NextTrigger />
</Pagination.Root>
```

## Shortcuts

The `Pagination` component also provides a set of shortcuts for common use
cases.

### PaginationItems

This component renders the number of pages based on the `count` and `pageSize`
props.

Rendering this:

```tsx
<Pagination.Items />
```

is shorthand for this:

```tsx
<Pagination.Context>
  {({ pages }) =>
    pages.map((page, index) =>
      page.type === "page" ? (
        <Pagination.Item key={index} {...page} />
      ) : (
        <Pagination.Ellipsis key={index} index={index} />
      ),
    )
  }
</Pagination.Context>
```

## Examples

### Sizes

Use the `size` prop to change the size of the pagination.

:::info

The pagination sizes are mapped to the `Button` component sizes.

:::

```tsx
"use client"

import {
  ButtonGroup,
  For,
  IconButton,
  Pagination,
  Stack,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export const PaginationWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <Pagination.Root count={20} pageSize={2} defaultPage={1} key={size}>
            <ButtonGroup variant="ghost" size={size}>
              <Pagination.PrevTrigger asChild>
                <IconButton>
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton>
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Variants

Use the `variant` prop to control the variant of the pagination items and
ellipsis.

> The variant matches the `Button` component variant.

```tsx
"use client"

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export const PaginationWithVariants = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <ButtonGroup variant="outline" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "outline", _selected: "solid" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

```

### Controlled

Use the `page` and `onPageChange` props to control the current page.

```tsx
"use client"

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { useState } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

export const PaginationControlled = () => {
  const [page, setPage] = useState(1)

  return (
    <Pagination.Root
      count={20}
      pageSize={2}
      page={page}
      onPageChange={(e) => setPage(e.page)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

```

### Sibling Count

Use `siblingCount` to control the number of sibling pages to show before and
after the current page.

```tsx
"use client"

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export const PaginationWithSiblingCount = () => {
  return (
    <Pagination.Root
      count={200}
      pageSize={10}
      defaultPage={10}
      siblingCount={2}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

```

### Compact

Use the `Pagination.PageText` to create a compact pagination. This can be useful
for mobile views.

```tsx
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

export const PaginationCompact = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <ButtonGroup gap="4" size="sm" variant="ghost">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.PageText />
        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

```

### As Link

Here's an example of rendering the pagination as links.

```tsx
"use client"

import {
  ButtonGroup,
  IconButton,
  type IconButtonProps,
  Pagination,
  usePaginationContext,
} from "@chakra-ui/react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

const PaginationLink = (
  props: IconButtonProps & { page?: "prev" | "next" | number },
) => {
  const { page, ...rest } = props
  const pagination = usePaginationContext()
  const pageValue = () => {
    if (page === "prev") return pagination.previousPage
    if (page === "next") return pagination.nextPage
    return page
  }
  return (
    <IconButton asChild {...rest}>
      <a href={`?page=${pageValue()}`}>{props.children}</a>
    </IconButton>
  )
}

export const PaginationAsLink = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <ButtonGroup variant="ghost" size="sm">
        <PaginationLink page="prev">
          <HiChevronLeft />
        </PaginationLink>

        <Pagination.Items
          render={(page) => (
            <PaginationLink
              page={page.value}
              variant={{ base: "ghost", _selected: "outline" }}
            >
              {page.value}
            </PaginationLink>
          )}
        />

        <PaginationLink page="next">
          <HiChevronRight />
        </PaginationLink>
      </ButtonGroup>
    </Pagination.Root>
  )
}

```

### Attached

Here's an example of composing the pagination with the `Group` component to
attach the pagination items and triggers.

```tsx
"use client"

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

export const PaginationAttached = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <ButtonGroup attached variant="outline" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton
              variant={{ base: "outline", _selected: "solid" }}
              zIndex={{ _selected: "1" }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

```

### Count Text

Pass `format="long"` to the `Pagination.PageText` component to show the count
text.

```tsx
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export const PaginationWithCountText = () => {
  return (
    <Pagination.Root count={50} pageSize={5} defaultPage={1} maxW="240px">
      <ButtonGroup variant="ghost" size="sm" w="full">
        <Pagination.PageText format="long" flex="1" />
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

```

### Data Driven

Here's an example of controlling the pagination state and using the state to
chunk the data.

```tsx
"use client"

import {
  ButtonGroup,
  IconButton,
  Pagination,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

const pageSize = 5
const count = 50
const items = new Array(count)
  .fill(0)
  .map((_, index) => `Lorem ipsum dolor sit amet ${index + 1}`)

export const PaginationWithContent = () => {
  const [page, setPage] = useState(1)

  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize

  const visibleItems = items.slice(startRange, endRange)

  return (
    <Stack gap="4">
      <Stack>
        {visibleItems.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Stack>
      <Pagination.Root
        count={count}
        pageSize={pageSize}
        page={page}
        onPageChange={(e) => setPage(e.page)}
      >
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <HiChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <HiChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  )
}

```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| boundaryCount | 1 | `number` | Number of pages to show at the beginning and end |
| defaultPage | 1 | `number` | The initial active page when rendered.
Use when you don't need to control the active page of the pagination. |
| defaultPageSize | 10 | `number` | The initial number of data items per page when rendered.
Use when you don't need to control the page size of the pagination. |
| siblingCount | 1 | `number` | Number of pages to show beside active page |
| type | "button" | `'button' \| 'link'` | The type of the trigger element |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| count | undefined | `number` | Total number of data items |
| getPageUrl | undefined | `(details: PageUrlDetails) => string` | Function to generate href attributes for pagination links.
Only used when `type` is set to "link". |
| ids | undefined | `Partial<{\n  root: string\n  ellipsis: (index: number) => string\n  firstTrigger: string\n  prevTrigger: string\n  nextTrigger: string\n  lastTrigger: string\n  item: (page: number) => string\n}>` | The ids of the elements in the accordion. Useful for composition. |
| onPageChange | undefined | `(details: PageChangeDetails) => void` | Called when the page number is changed |
| onPageSizeChange | undefined | `(details: PageSizeChangeDetails) => void` | Called when the page size is changed |
| page | undefined | `number` | The controlled active page |
| pageSize | undefined | `number` | The controlled number of data items per page |
| translations | undefined | `IntlTranslations` | Specifies the localized strings that identifies the accessibility elements and their states |
