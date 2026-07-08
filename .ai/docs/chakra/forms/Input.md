# components > Input
  
  URL: docs/components/input
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/input.mdx
  
  Used to get user input in a text field.
          
  ***
  
  title: Input
  description: Used to get user input in a text field.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/input
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-input--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/input.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Input } from "@chakra-ui/react"

export const InputBasic = () => {
  return <Input placeholder="Enter your email" />
}

```

## Usage

```tsx
import { Input } from "@chakra-ui/react"
```

```tsx
<Input />
```

## Examples

### Variants

Use the `variant` prop to change the visual style of the input.

```tsx
import { Input, Stack } from "@chakra-ui/react"

export const InputWithVariants = () => {
  return (
    <Stack gap="4">
      <Input placeholder="Subtle" variant="subtle" />
      <Input placeholder="Outline" variant="outline" />
      <Input placeholder="Flushed" variant="flushed" />
    </Stack>
  )
}

```

### Sizes

Use the `size` prop to change the size of the input.

```tsx
import { Input, Stack } from "@chakra-ui/react"

export const InputWithSizes = () => {
  return (
    <Stack gap="4">
      <Input placeholder="size (xs)" size="xs" />
      <Input placeholder="size (sm)" size="sm" />
      <Input placeholder="size (md)" size="md" />
      <Input placeholder="size (lg)" size="lg" />
    </Stack>
  )
}

```

### Helper Text

Pair the input with the `Field` component to add helper text.

```tsx
import { Field, Input } from "@chakra-ui/react"

export const InputWithHelperText = () => {
  return (
    <Field.Root required>
      <Field.Label>
        Email <Field.RequiredIndicator />
      </Field.Label>
      <Input placeholder="Enter your email" />
      <Field.HelperText>We'll never share your email.</Field.HelperText>
    </Field.Root>
  )
}

```

### Error Text

Pair the input with the `Field` component to add error text.

```tsx
import { Field, Input } from "@chakra-ui/react"

export const InputWithErrorText = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Email</Field.Label>
      <Input placeholder="Enter your email" />
      <Field.ErrorText>This field is required</Field.ErrorText>
    </Field.Root>
  )
}

```

### Field

Compose the input with the `Field` component to add a label, helper text, and
error text.

```tsx
import { Field, HStack, Input } from "@chakra-ui/react"

export const InputWithField = () => {
  return (
    <HStack gap="10" width="full">
      <Field.Root required>
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="me@example.com" variant="subtle" />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="me@example.com" variant="outline" />
      </Field.Root>
    </HStack>
  )
}

```

### Hook Form

Here's an example of how to integrate the input with `react-hook-form`.

```tsx
"use client"

import { Button, Field, Input, Stack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

interface FormValues {
  firstName: string
  lastName: string
}

export const InputWithHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.firstName}>
          <Field.Label>First name</Field.Label>
          <Input {...register("firstName")} />
          <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Last name</Field.Label>
          <Input {...register("lastName")} />
          <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}

```

### Element

Use the `startElement` and `endElement` on the `InputGroup` component to add an
element to the start and end of the input.

#### Start Icon

```tsx
import { Input, InputGroup } from "@chakra-ui/react"
import { LuUser } from "react-icons/lu"

export const InputWithStartIcon = () => {
  return (
    <InputGroup startElement={<LuUser />}>
      <Input placeholder="Username" />
    </InputGroup>
  )
}

```

#### Start Text

```tsx
import { Input, InputGroup } from "@chakra-ui/react"

export const InputWithStartText = () => {
  return (
    <InputGroup
      startElement="https://"
      startElementProps={{ color: "fg.muted" }}
    >
      <Input ps="7ch" placeholder="yoursite.com" />
    </InputGroup>
  )
}

```

#### Start and End Text

```tsx
import { Input, InputGroup } from "@chakra-ui/react"

export const InputWithStartAndEndText = () => {
  return (
    <InputGroup startElement="$" endElement="USD">
      <Input placeholder="0.00" />
    </InputGroup>
  )
}

```

#### Kbd

```tsx
import { Input, InputGroup, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

export const InputWithKbd = () => (
  <InputGroup flex="1" startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>}>
    <Input placeholder="Search contacts" />
  </InputGroup>
)

```

#### Select

```tsx
import { Input, InputGroup, NativeSelect } from "@chakra-ui/react"

const DomainSelect = () => (
  <NativeSelect.Root size="xs" variant="plain" width="auto" me="-1">
    <NativeSelect.Field defaultValue=".com" fontSize="sm">
      <option value=".com">.com</option>
      <option value=".org">.org</option>
      <option value=".net">.net</option>
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
)

export const InputWithSelect = () => {
  return (
    <InputGroup flex="1" startElement="https://" endElement={<DomainSelect />}>
      <Input ps="4.75em" pe="0" placeholder="yoursite.com" />
    </InputGroup>
  )
}

```

### Addon

Use the `InputAddon` and `Group` components to add an addon to the input.

#### Start Addon

```tsx
import { Input, InputGroup } from "@chakra-ui/react"

export const InputWithStartAddon = () => {
  return (
    <InputGroup startAddon="https://">
      <Input placeholder="yoursite.com" />
    </InputGroup>
  )
}

```

#### End Addon

```tsx
import { Input, InputGroup } from "@chakra-ui/react"

export const InputWithEndAddon = () => {
  return (
    <InputGroup endAddon=".com">
      <Input placeholder="yoursite" />
    </InputGroup>
  )
}

```

#### Start and End Addon

```tsx
import { Input, InputGroup } from "@chakra-ui/react"

export const InputWithStartAndEndAddon = () => {
  return (
    <InputGroup startAddon="$" endAddon="USD">
      <Input placeholder="0.00" />
    </InputGroup>
  )
}

```

### Disabled

Use the `disabled` prop to disable the input.

```tsx
import { Input } from "@chakra-ui/react"

export const InputWithDisabled = () => {
  return <Input disabled placeholder="disabled" />
}

```

### Button

Use the `Group` component to attach a button to the input.

```tsx
import { Button, Group, Input } from "@chakra-ui/react"

export const InputWithEndButton = () => {
  return (
    <Group attached w="full" maxW="sm">
      <Input flex="1" placeholder="Enter your email" />
      <Button bg="bg.subtle" variant="outline">
        Submit
      </Button>
    </Group>
  )
}

```

### Focus and Error Color

Use the `--focus-color` and `--error-color` CSS custom properties to change the
color of the input when it is focused or in an error state.

```tsx
import { Field, Input, Stack } from "@chakra-ui/react"

export const InputWithFocusErrorColor = () => {
  return (
    <Stack gap="4">
      <Field.Root>
        <Field.Label>focusColor=lime</Field.Label>
        <Input placeholder="Focus me" css={{ "--focus-color": "lime" }} />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>errorColor=green</Field.Label>
        <Input placeholder="Email" css={{ "--error-color": "green" }} />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>errorColor=blue</Field.Label>
        <Input placeholder="Password" css={{ "--error-color": "blue" }} />
      </Field.Root>

      <Field.Root invalid>
        <Field.Label>variant=outline,focusColor=error</Field.Label>
        <Input placeholder="Focus me" variant="outline" />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>variant=subtle,focusColor=error</Field.Label>
        <Input placeholder="Focus me" variant="subtle" />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>variant=flushed,focusColor=error</Field.Label>
        <Input placeholder="Focus me" variant="flushed" />
      </Field.Root>
    </Stack>
  )
}

```

### Placeholder Style

Use the `_placeholder` prop to style the placeholder text.

```tsx
import { Input } from "@chakra-ui/react"

export const InputWithPlaceholderStyle = () => {
  return (
    <Input
      color="teal"
      placeholder="custom placeholder"
      _placeholder={{ color: "inherit" }}
    />
  )
}

```

### Floating Label

Here's an example of how to build a floating label to the input.

```tsx
"use client"

import type { InputProps } from "@chakra-ui/react"
import {
  Box,
  Field,
  Input,
  defineStyle,
  useControllableState,
} from "@chakra-ui/react"
import { useState } from "react"

export const InputWithFloatingLabel = () => {
  return (
    <Field.Root>
      <FloatingLabelInput label="Email" />
      <Field.ErrorText>This field is required</Field.ErrorText>
    </Field.Root>
  )
}

interface FloatingLabelInputProps extends InputProps {
  label: React.ReactNode
  value?: string | undefined
  defaultValue?: string | undefined
  onValueChange?: ((value: string) => void) | undefined
}

const FloatingLabelInput = (props: FloatingLabelInputProps) => {
  const { label, onValueChange, value, defaultValue = "", ...rest } = props

  const [inputState, setInputState] = useControllableState({
    defaultValue,
    onChange: onValueChange,
    value,
  })

  const [focused, setFocused] = useState(false)
  const shouldFloat = inputState.length > 0 || focused

  return (
    <Box pos="relative" w="full">
      <Input
        {...rest}
        onFocus={(e) => {
          props.onFocus?.(e)
          setFocused(true)
        }}
        onBlur={(e) => {
          props.onBlur?.(e)
          setFocused(false)
        }}
        onChange={(e) => {
          props.onChange?.(e)
          setInputState(e.target.value)
        }}
        value={inputState}
        data-float={shouldFloat || undefined}
      />
      <Field.Label css={floatingStyles} data-float={shouldFloat || undefined}>
        {label}
      </Field.Label>
    </Box>
  )
}

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "2.5",
  insetStart: "3",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  color: "fg.muted",
  "&[data-float]": {
    top: "-3",
    insetStart: "2",
    color: "fg",
  },
})

```

### Mask

Here's an example of using the `use-mask-input` library to mask the input shape.

```tsx
"use client"

import { Input } from "@chakra-ui/react"
import { withMask } from "use-mask-input"

export const InputWithMask = () => {
  return (
    <Input placeholder="(99) 99999-9999" ref={withMask("(99) 99999-9999")} />
  )
}

```

### Character Counter

Here's an example of how to add a character counter to the input.

```tsx
"use client"

import { Input, InputGroup, Span } from "@chakra-ui/react"
import { useState } from "react"

const MAX_CHARACTERS = 20

export const InputWithCharacterCounter = () => {
  const [value, setValue] = useState("")
  return (
    <InputGroup
      endElement={
        <Span color="fg.muted" textStyle="xs">
          {value.length} / {MAX_CHARACTERS}
        </Span>
      }
    >
      <Input
        placeholder="Enter your message"
        value={value}
        maxLength={MAX_CHARACTERS}
        onChange={(e) => {
          setValue(e.currentTarget.value.slice(0, MAX_CHARACTERS))
        }}
      />
    </InputGroup>
  )
}

```

### Card Number

Here's an example of using `react-payment-inputs` to create a card number input.

```tsx
"use client"

import { Input, InputGroup } from "@chakra-ui/react"
import { LuCreditCard } from "react-icons/lu"
import { usePaymentInputs } from "react-payment-inputs"

export const InputWithCardNumber = () => {
  const { wrapperProps, getCardNumberProps } = usePaymentInputs()
  return (
    <InputGroup {...wrapperProps} endElement={<LuCreditCard />}>
      <Input {...getCardNumberProps()} />
    </InputGroup>
  )
}

```

You can create a full card inputs for a card number, expiry date, and CVC.

```tsx
"use client"

import { Box, Group, Input, InputGroup, Show } from "@chakra-ui/react"
import { LuCreditCard } from "react-icons/lu"
import { usePaymentInputs } from "react-payment-inputs"
import cardImages, { type CardImages } from "react-payment-inputs/images"

const images = cardImages as unknown as CardImages

const CardImage = (props: ReturnType<typeof usePaymentInputs>) => {
  const { meta, getCardImageProps } = props
  return (
    <Show
      when={meta.cardType}
      fallback={<LuCreditCard size={16} aria-hidden="true" />}
    >
      <svg {...getCardImageProps({ images })} />
    </Show>
  )
}

export const InputWithCardDetails = () => {
  const payment = usePaymentInputs()
  return (
    <Box spaceY="-1px">
      <InputGroup
        zIndex={{ _focusWithin: "1" }}
        endElement={<CardImage {...payment} />}
      >
        <Input roundedBottom="0" {...payment.getCardNumberProps()} />
      </InputGroup>
      <Group w="full" attached>
        <Input roundedTopLeft="0" {...payment.getExpiryDateProps()} />
        <Input roundedTopRight="0" {...payment.getCVCProps()} />
      </Group>
    </Box>
  )
}

```

### Clear Button

Combine the `Input` and `CloseButton` components to create a clear button. This
is useful for building search inputs.

```tsx
"use client"

import { CloseButton, Input, InputGroup } from "@chakra-ui/react"
import { useRef, useState } from "react"

export const InputWithClearButton = () => {
  const [value, setValue] = useState("Initial value")
  const inputRef = useRef<HTMLInputElement | null>(null)

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("")
        inputRef.current?.focus()
      }}
      me="-2"
    />
  ) : undefined

  return (
    <InputGroup endElement={endElement}>
      <Input
        ref={inputRef}
        placeholder="Email"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
      />
    </InputGroup>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| size | md | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | The size of the component |
| variant | outline | `'outline' \| 'subtle' \| 'flushed'` | The variant of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
