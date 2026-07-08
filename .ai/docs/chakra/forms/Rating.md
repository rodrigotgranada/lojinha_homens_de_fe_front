# components > Rating
  
  URL: docs/components/rating
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/rating.mdx
  
  Used to show reviews and ratings in a visual format.
          
  ***
  
  title: Rating
  description: Used to show reviews and ratings in a visual format.
  links: 
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-rating--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/rating.ts
 - ark: https://ark-ui.com/docs/components/rating-group
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { RatingGroup } from "@chakra-ui/react"

export const RatingBasic = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

## Usage

```tsx
import { RatingGroup } from "@chakra-ui/react"
```

```tsx
<RatingGroup.Root>
  <RatingGroup.Label />
  <RatingGroup.HiddenInput />
  <RatingGroup.Control>
    <RatingGroup.Item>
      <RatingGroup.ItemIndicator />
    </RatingGroup.Item>
  </RatingGroup.Control>
</RatingGroup.Root>
```

:::info

If you prefer a closed component composition, check out the
[snippet below](#closed-component).

:::

## Shortcuts

The `Rating` component also provides a set of shortcuts for common use cases.

### RatingControl

This component renders the number of rating items specified in the `count` prop.

This works:

```tsx
<RatingGroup.Control>
  {Array.from({ length: 5 }).map((_, index) => (
    <RatingGroup.Item key={index} index={index + 1}>
      <RatingGroup.ItemIndicator />
    </RatingGroup.Item>
  ))}
</RatingGroup.Control>
```

This might be more concise, if you don't need to customize the rating icons:

```tsx
<RatingGroup.Control />
```

## Examples

### Basic

```tsx
import { RatingGroup } from "@chakra-ui/react"

export const RatingBasic = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

### Sizes

Use the `size` prop to change the size of the rating component.

```tsx
import { For, RatingGroup, Stack } from "@chakra-ui/react"

export const RatingWithSizes = () => {
  return (
    <Stack>
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <RatingGroup.Root key={size} count={5} defaultValue={3} size={size}>
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Controlled

Use the `value` and `onValueChange` prop to control the rating value.

```tsx
"use client"

import { RatingGroup } from "@chakra-ui/react"
import { useState } from "react"

export const RatingControlled = () => {
  const [value, setValue] = useState(3)
  return (
    <RatingGroup.Root
      count={5}
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

### Store

An alternative way to control the rating is to use the `RootProvider` component
and the `useRatingGroup` store hook.

This way you can access the rating state and methods from outside the component.

```tsx
"use client"

import { RatingGroup, useRatingGroup } from "@chakra-ui/react"

export const RatingWithStore = () => {
  const store = useRatingGroup({ count: 5, defaultValue: 3 })
  return (
    <RatingGroup.RootProvider value={store} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.RootProvider>
  )
}

```

### ReadOnly

Use the `readOnly` prop to make the rating component read-only.

```tsx
import { RatingGroup } from "@chakra-ui/react"

export const RatingWithReadonly = () => {
  return (
    <RatingGroup.Root readOnly count={5} defaultValue={3} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

### Hook Form

Here's an example of how to use rating with `react-hook-form`.

```tsx
"use client"

import { Button, Field, RatingGroup, Stack } from "@chakra-ui/react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  rating: z.number({ message: "Rating is required" }).min(1).max(5),
})

type FormValues = z.infer<typeof formSchema>

export const RatingWithHookForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        <Field.Root invalid={!!errors.rating}>
          <Field.Label>Rating</Field.Label>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <RatingGroup.Root
                count={5}
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
            )}
          />
          <Field.ErrorText>{errors.rating?.message}</Field.ErrorText>
        </Field.Root>
        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

```

### Custom Icon

Use the `icon` prop to pass a custom icon to the rating component. This will
override the default star icon.

```tsx
import { RatingGroup } from "@chakra-ui/react"
import { IoHeart } from "react-icons/io5"

export const RatingWithCustomIcon = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={4} colorPalette="red">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingGroup.Item key={index} index={index + 1}>
            <RatingGroup.ItemIndicator icon={<IoHeart />} />
          </RatingGroup.Item>
        ))}
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}

```

### Label

Render the `RatingGroup.Label` component to provide a human-readable label for
the rating component.

```tsx
import { RatingGroup } from "@chakra-ui/react"

export const RatingWithLabel = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3} size="sm" gap="4">
      <RatingGroup.HiddenInput />
      <RatingGroup.Label>Rating</RatingGroup.Label>
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

### Half Star

Use the `allowHalf` prop to allow half-star ratings.

```tsx
import { RatingGroup } from "@chakra-ui/react"

export const RatingWithHalf = () => {
  return (
    <RatingGroup.Root allowHalf count={5} defaultValue={3.5} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

```

### Emoji

Compose the rating component with emojis.

```tsx
import { RatingGroup } from "@chakra-ui/react"

const emojiMap: Record<string, string> = {
  1: "😡",
  2: "😠",
  3: "😐",
  4: "😊",
  5: "😍",
}

export const RatingEmoji = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3}>
      <RatingGroup.Control>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingGroup.Item
            key={index}
            index={index + 1}
            minW="9"
            filter={{ base: "grayscale(1)", _checked: "revert" }}
            transition="scale 0.1s"
            _hover={{ scale: "1.1" }}
          >
            {emojiMap[index + 1]}
          </RatingGroup.Item>
        ))}
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}

```

### Colors

Use the `colorPalette` prop to change the color of the rating

```tsx
import { RatingGroup, Stack, Text } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"

export const RatingWithColors = () => {
  return (
    <Stack gap="2" align="flex-start">
      {colorPalettes.map((colorPalette) => (
        <Stack
          align="center"
          key={colorPalette}
          direction="row"
          gap="10"
          px="4"
        >
          <Text minW="8ch">{colorPalette}</Text>

          <RatingGroup.Root
            count={5}
            defaultValue={3}
            size="sm"
            colorPalette={colorPalette}
          >
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
        </Stack>
      ))}
    </Stack>
  )
}

```

### Testimonial

Use the rating component to show testimonials.

```tsx
import { Avatar, HStack, RatingGroup, Stack, Text } from "@chakra-ui/react"

export const RatingInTestimonial = () => {
  return (
    <Stack maxW="320px" gap="4">
      <RatingGroup.Root
        colorPalette="orange"
        readOnly
        count={5}
        defaultValue={5}
        size="xs"
      >
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.Root>

      <Text>
        Sage is a great software engineer. He is very professional and
        knowledgeable.
      </Text>

      <HStack gap="4">
        <Avatar.Root>
          <Avatar.Fallback name="Matthew Jones" />
          <Avatar.Image src="https://randomuser.me/api/portraits/men/70.jpg" />
        </Avatar.Root>
        <Stack textStyle="sm" gap="0">
          <Text fontWeight="medium">Matthew Jones</Text>
          <Text color="fg.muted">CTO, Company</Text>
        </Stack>
      </HStack>
    </Stack>
  )
}

```

### Closed Component

Here's how to setup the Rating for a closed component composition.

<ExampleCode name="rating-closed-component" />

Here's how to use the it

```tsx
<Rating defaultValue={3} size="sm" />
```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| count | 5 | `number` | The total number of ratings. |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| size | md | `'xs' \| 'sm' \| 'md' \| 'lg'` | The size of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| allowHalf | undefined | `boolean` | Whether to allow half stars. |
| autoFocus | undefined | `boolean` | Whether to autofocus the rating. |
| defaultValue | undefined | `number` | The initial value of the rating when rendered.
Use when you don't need to control the value of the rating. |
| disabled | undefined | `boolean` | Whether the rating is disabled. |
| form | undefined | `string` | The associate form of the underlying input element. |
| id | undefined | `string` | The unique identifier of the machine. |
| ids | undefined | `Partial<{\n  root: string\n  label: string\n  hiddenInput: string\n  control: string\n  item: (id: string) => string\n}>` | The ids of the elements in the rating. Useful for composition. |
| name | undefined | `string` | The name attribute of the rating element (used in forms). |
| onHoverChange | undefined | `(details: HoverChangeDetails) => void` | Function to be called when the rating value is hovered. |
| onValueChange | undefined | `(details: ValueChangeDetails) => void` | Function to be called when the rating value changes. |
| readOnly | undefined | `boolean` | Whether the rating is readonly. |
| required | undefined | `boolean` | Whether the rating is required. |
| translations | undefined | `IntlTranslations` | Specifies the localized strings that identifies the accessibility elements and their states |
| value | undefined | `number` | The controlled value of the rating |


### Item

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| index | undefined | `number` | undefined |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
