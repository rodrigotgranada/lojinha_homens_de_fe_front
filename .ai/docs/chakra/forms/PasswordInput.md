# components > Password Input
  
  URL: docs/components/password-input
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/password-input.mdx
  
  Used to collect passwords.
          
  ***
  
  title: Password Input
  description: Used to collect passwords.
  links: 

  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { PasswordInput } from "@/components/ui/password-input"

export const PasswordInputBasic = () => {
  return <PasswordInput />
}

```

## Setup

If you don't already have the snippet, run the following command to add the
`password-input` snippet

```sh
npx @chakra-ui/cli snippet add password-input
```

The snippet includes a closed component composition for the `PasswordInput`
component.

## Usage

```jsx
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input"
```

```jsx
<PasswordInput />
<PasswordStrengthMeter />
```

## Examples

### Sizes

Use the `size` prop to change the size of the password input.

:::info

The password input sizes are mapped to the `Input` component sizes.

:::

```tsx
import { Stack } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"

export const PasswordInputWithSizes = () => {
  return (
    <Stack maxW="300px">
      <PasswordInput placeholder="xs" size="xs" />
      <PasswordInput placeholder="sm" size="sm" />
      <PasswordInput placeholder="md" size="md" />
      <PasswordInput placeholder="lg" size="lg" />
    </Stack>
  )
}

```

### Controlled

Use the `value` and `onChange` props to control the current page.

```tsx
"use client"

import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react"

export const PasswordInputControlled = () => {
  const [value, setValue] = useState("")
  return (
    <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} />
  )
}

```

### Hook Form

Here's an example of how to use the `PasswordInput` component with
`react-hook-form`.

```tsx
"use client"

import { Button, Field, Input, Stack } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { useForm } from "react-hook-form"

interface FormValues {
  username: string
  password: string
}

export const PasswordInputWithHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input {...register("username")} />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <PasswordInput {...register("password")} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}

```

### Controlled Visibility

Use the `visible` and `onVisibleChange` props to control the visibility of the
password input.

```tsx
"use client"

import { Stack, Text } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react"

export const PasswordInputControlledVisibility = () => {
  const [visible, setVisible] = useState(false)
  return (
    <Stack>
      <PasswordInput
        defaultValue="secret"
        visible={visible}
        onVisibleChange={setVisible}
      />
      <Text>Password is {visible ? "visible" : "hidden"}</Text>
    </Stack>
  )
}

```

### Strength Indicator

Render the `PasswordStrengthMeter` component to show the strength of the
password. Compute the `value` prop based on the password input `value`.

```tsx
"use client"

import { Stack } from "@chakra-ui/react"
import { type Options, passwordStrength } from "check-password-strength"
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input"
import { useMemo, useState } from "react"

const strengthOptions: Options<string> = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
]

export const PasswordInputWithStrengthIndicator = () => {
  const [password, setPassword] = useState("")

  const strength = useMemo(() => {
    if (!password) return 0
    const result = passwordStrength(password, strengthOptions)
    return result.id
  }, [password])

  return (
    <Stack maxW="300px" gap="3">
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="Enter your password"
      />
      <PasswordStrengthMeter value={strength} />
    </Stack>
  )
}

```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| defaultVisible | false | `boolean` | The default visibility state of the password input. |
| visible | undefined | `boolean` | The controlled visibility state of the password input. |
| onVisibleChange | undefined | `(visible: boolean) => void` | Callback invoked when the visibility state changes. |
| visibilityIcon | undefined | `{ on: React.ReactNode; off: React.ReactNode }` | Custom icons for the visibility toggle button. |
