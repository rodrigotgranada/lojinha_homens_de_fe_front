# components > Select (Native)
  
  URL: docs/components/native-select
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/native-select.mdx
  
  Used to pick a value from predefined options.
          
  ***
  
  title: Select (Native)
  description: Used to pick a value from predefined options.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/native-select
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-native-select--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/native-select.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { NativeSelect } from "@chakra-ui/react"

export const NativeSelectBasic = () => {
  return (
    <NativeSelect.Root size="sm" width="240px">
      <NativeSelect.Field placeholder="Select option">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}

```

## Usage

```jsx
import { NativeSelect } from "@chakra-ui/react"
```

```jsx
<NativeSelect.Root>
  <NativeSelect.Field>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </NativeSelect.Field>
  <NativeSelect.Indicator />
</NativeSelect.Root>
```

:::info

If you prefer a closed component composition, check out the
[snippet below](#closed-component).

:::

## Examples

### Sizes

Use the `size` prop to change the size of the select component.

```tsx
import { For, NativeSelect, Stack } from "@chakra-ui/react"

export const NativeSelectWithSizes = () => {
  return (
    <Stack gap="4" width="240px">
      <For each={["xs", "sm", "md", "lg", "xl"]}>
        {(size) => (
          <NativeSelect.Root key={size} size={size}>
            <NativeSelect.Field placeholder="Select option">
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
              <option value="svelte">Svelte</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Variants

Use the `variant` prop to change the appearance of the select component.

```tsx
import { For, NativeSelect, Stack } from "@chakra-ui/react"

export const NativeSelectWithVariants = () => {
  return (
    <Stack gap="4" width="240px">
      <For each={["outline", "subtle", "plain"]}>
        {(variant) => (
          <NativeSelect.Root key={variant} variant={variant}>
            <NativeSelect.Field placeholder={`variant (${variant})`}>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
              <option value="svelte">Svelte</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Controlled

Use the `value` and `onChange` props to control the select component.

```tsx
"use client"

import { NativeSelect } from "@chakra-ui/react"
import { useState } from "react"

export const NativeSelectControlled = () => {
  const [value, setValue] = useState("")
  return (
    <NativeSelect.Root size="sm" width="240px">
      <NativeSelect.Field
        placeholder="Select option"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}

```

### Disabled

Pass the `disabled` prop to the `NativeSelect.Root` component to disable the
select component.

```tsx
import { NativeSelect } from "@chakra-ui/react"

export const NativeSelectWithDisabled = () => (
  <NativeSelect.Root disabled>
    <NativeSelect.Field placeholder="Select option">
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="angular">Angular</option>
      <option value="svelte">Svelte</option>
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
)

```

### Invalid

Compose the native and `Field` component to set the invalid set and show the
error text.

```tsx
import { Field, NativeSelect } from "@chakra-ui/react"

export const NativeSelectWithInvalid = () => (
  <Field.Root invalid width="240px">
    <NativeSelect.Root>
      <NativeSelect.Field placeholder="Select option">
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
    <Field.ErrorText>This is an error</Field.ErrorText>
  </Field.Root>
)

```

Alternatively, you can use the `invalid` prop on the `NativeSelect.Root`
component as well.

```tsx
import { NativeSelect } from "@chakra-ui/react"

export const NativeSelectWithInvalidRoot = () => (
  <NativeSelect.Root invalid width="240px">
    <NativeSelect.Field placeholder="Select option">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
)

```

### Hook Form

Here is an example of how to use the `NativeSelect` component with
`react-hook-form`.

```tsx
"use client"

import { Button, Field, NativeSelect } from "@chakra-ui/react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  framework: z.string().min(1, { message: "Framework is required" }),
})

type FormValues = z.infer<typeof formSchema>

export const NativeSelectWithHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Field.Root invalid={!!errors.framework}>
        <Field.Label>Framework</Field.Label>
        <NativeSelect.Root size="sm" width="240px">
          <NativeSelect.Field
            placeholder="Select option"
            {...register("framework")}
          >
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
            <option value="svelte">Svelte</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Field.ErrorText>{errors.framework?.message}</Field.ErrorText>
      </Field.Root>

      <Button size="sm" type="submit" mt="4">
        Submit
      </Button>
    </form>
  )
}

```

### Ref

Here's how to access the underlying element reference

```tsx
import { NativeSelect } from "@chakra-ui/react"

const Demo = () => {
  const ref = useRef<HTMLSelectElement | null>(null)
  return (
    <NativeSelect.Root>
      <NativeSelect.Field ref={ref}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}
```

### Closed Component

Here's how to setup the Native Select for a closed component composition.

<ExampleCode name="native-select-closed-component" />

If you want to automatically add the closed component to your project, run the
command:

```bash
npx @chakra-ui/cli snippet add native-select
```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| variant | outline | `'outline' \| 'subtle' \| 'plain' \| 'ghost'` | The variant of the component |
| size | md | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | The size of the component |
| disabled | undefined | `boolean \| undefined` | undefined |
| invalid | undefined | `boolean \| undefined` | undefined |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |


## Explorer

Explore the `Select (Native)` component parts interactively. Click on parts in
the sidebar to highlight them in the preview.

<Explorer name="native-select-basic" />