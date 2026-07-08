# components > Fieldset
  
  URL: docs/components/fieldset
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/fieldset.mdx
  
  A set of form controls optionally grouped under a common name.
          
  ***
  
  title: Fieldset
  description: A set of form controls optionally grouped under a common name.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/fieldset
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-fieldset--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/fieldset.ts
 - ark: https://ark-ui.com/docs/components/fieldset
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react"

export const FieldsetBasic = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input name="name" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input name="email" type="email" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Country</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field name="country">
              <For each={["United Kingdom", "Canada", "United States"]}>
                {(item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )}
              </For>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  )
}

```

## Usage

```jsx
import { Fieldset } from "@chakra-ui/react"
```

```jsx
<Fieldset.Root>
  <Fieldset.Legend />
  <Fieldset.Content />
</Fieldset.Root>
```

## Examples

### Disabled

Use the `disabled` prop to disable the fieldset to disable all input elements
within the fieldset.

```tsx
import {
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Textarea,
} from "@chakra-ui/react"

export const FieldsetWithDisabled = () => {
  return (
    <Fieldset.Root size="lg" disabled>
      <Fieldset.Legend>Shipping details</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Street address</Field.Label>
        <Input name="address" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field name="country">
            <For each={["United Kingdom", "Canada", "United States"]}>
              {(item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              )}
            </For>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>Delivery notes</Field.Label>
        <Textarea name="notes" />
      </Field.Root>
    </Fieldset.Root>
  )
}

```

### Invalid

Use the `invalid` prop to mark the fieldset as invalid. This will show the error
text.

> Note: You need to pass the `invalid` prop to the `Field` component within the
> fieldset to make each input element invalid.

```tsx
import {
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Textarea,
} from "@chakra-ui/react"

export const FieldsetWithInvalid = () => {
  return (
    <Fieldset.Root size="lg" invalid>
      <Fieldset.Legend>Shipping details</Fieldset.Legend>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Street address</Field.Label>
          <Input name="address" />
        </Field.Root>
        <Field.Root invalid>
          <Field.Label>Country</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field name="country">
              <For each={["United Kingdom", "Canada", "United States"]}>
                {(item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )}
              </For>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
        <Field.Root invalid>
          <Field.Label>Notes</Field.Label>
          <Textarea name="notes" />
        </Field.Root>
      </Fieldset.Content>
      <Fieldset.ErrorText>
        Some fields are invalid. Please check them.
      </Fieldset.ErrorText>
    </Fieldset.Root>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| size | md | `'sm' \| 'md' \| 'lg'` | The size of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| invalid | undefined | `boolean` | Indicates whether the fieldset is invalid. |


## Explorer

Explore the `Fieldset` component parts interactively. Click on parts in the
sidebar to highlight them in the preview.

<Explorer name="fieldset-explorer-demo" />