# components > Format Byte
  
  URL: docs/components/format-byte
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/format-byte.mdx
  
  Used to format bytes to a human-readable format
          
  ***
  
  title: Format Byte
  description: Used to format bytes to a human-readable format
  links: 
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-format-byte--basic
 - ark: https://ark-ui.com/docs/utilities/format-byte
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { FormatByte, Text } from "@chakra-ui/react"

export const FormatByteBasic = () => {
  return (
    <Text textStyle="lg">
      File size: <FormatByte value={1450.45} />
    </Text>
  )
}

```

## Usage

```jsx
import { FormatByte } from "@chakra-ui/react"
```

```jsx
<FormatByte value={1000} />
```

## Examples

### Sizes

The format functions works for any size of bytes.

```tsx
import { FormatByte, Stack, Text } from "@chakra-ui/react"

export const FormatByteSizes = () => {
  return (
    <Stack>
      <Text textStyle="lg">
        <FormatByte value={50} />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={5000} />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={5000000} />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={5000000000} />
      </Text>
    </Stack>
  )
}

```

### Format Bits

Use the `unit` prop to change the byte format to bits.

```tsx
import { FormatByte, Text } from "@chakra-ui/react"

export const FormatByteWithUnit = () => {
  return (
    <Text textStyle="lg">
      File size: <FormatByte value={1450.45} unit="bit" />
    </Text>
  )
}

```

### Locale

Wrap the `FormatByte` component within the `LocaleProvider` to change the
locale.

```tsx
import { FormatByte, HStack, LocaleProvider, Text } from "@chakra-ui/react"

export const FormatByteWithLocale = () => {
  return (
    <Text textStyle="lg">
      <HStack>
        <Text fontWeight="medium">de-DE</Text>
        <LocaleProvider locale="de-DE">
          <FormatByte value={1450.45} />
        </LocaleProvider>
      </HStack>

      <HStack>
        <Text fontWeight="medium">zh-CN</Text>
        <LocaleProvider locale="zh-CN">
          <FormatByte value={1450.45} />
        </LocaleProvider>
      </HStack>
    </Text>
  )
}

```

### Unit Display

Use the `unitDisplay` prop to change the byte format to compact notation.

```tsx
import { FormatByte, Stack, Text } from "@chakra-ui/react"

export const FormatByteWithUnitDisplay = () => {
  return (
    <Stack>
      <Text textStyle="lg">
        <FormatByte value={50345.53} unitDisplay="narrow" />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={50345.53} unitDisplay="short" />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={50345.53} unitDisplay="long" />
      </Text>
    </Stack>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| value | undefined | `number` | The byte size to format |
| unit | undefined | `'bit' \| 'byte'` | The unit granularity to display |
| unitDisplay | undefined | `'short' \| 'long' \| 'narrow'` | The unit display |
| unitSystem | undefined | `'decimal' \| 'binary'` | The unit system to use for formatting |
