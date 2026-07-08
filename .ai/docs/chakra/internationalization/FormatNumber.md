# components > Format Number
  
  URL: docs/components/format-number
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/format-number.mdx
  
  Used to format numbers to a specific locale and options
          
  ***
  
  title: Format Number
  description: Used to format numbers to a specific locale and options
  links: 
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-format-number--basic
 - ark: https://ark-ui.com/docs/utilities/format-number
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { FormatNumber, Text } from "@chakra-ui/react"

export const FormatNumberBasic = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={1450.45} />
    </Text>
  )
}

```

## Usage

The number formatting logic is handled by the native `Intl.NumberFormat` API and
smartly cached to avoid performance issues when using the same locale and
options.

```jsx
import { FormatNumber } from "@chakra-ui/react"
```

```jsx
<FormatNumber value={1000} />
```

## Examples

### Percentage

Use the `style=percentage` prop to change the number format to percentage.

```tsx
import { FormatNumber, Text } from "@chakra-ui/react"

export const FormatNumberWithPercentage = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber
        value={0.145}
        style="percent"
        maximumFractionDigits={2}
        minimumFractionDigits={2}
      />
    </Text>
  )
}

```

### Currency

Use the `style=currency` prop to change the number format to currency.

```tsx
import { FormatNumber, Text } from "@chakra-ui/react"

export const FormatNumberWithCurrency = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={1234.45} style="currency" currency="USD" />
    </Text>
  )
}

```

### Locale

Wrap the `FormatNumber` component within the `LocaleProvider` to change the
locale.

```tsx
import { FormatNumber, HStack, LocaleProvider, Text } from "@chakra-ui/react"

export const FormatNumberWithLocale = () => {
  return (
    <Text textStyle="lg">
      <HStack>
        <Text fontWeight="medium">de-DE</Text>
        <LocaleProvider locale="de-DE">
          <FormatNumber value={1450.45} />
        </LocaleProvider>
      </HStack>

      <HStack>
        <Text fontWeight="medium">zh-CN</Text>
        <LocaleProvider locale="zh-CN">
          <FormatNumber value={1450.45} />
        </LocaleProvider>
      </HStack>
    </Text>
  )
}

```

### Unit

Use the `style=unit` prop to change the number format to unit.

```tsx
import { FormatNumber, Text } from "@chakra-ui/react"

export const FormatNumberWithUnit = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={384.4} style="unit" unit="kilometer" />
    </Text>
  )
}

```

### Compact Notation

Use the `notation=compact` prop to change the number format to compact notation.

```tsx
import { FormatNumber, Text } from "@chakra-ui/react"

export const FormatNumberWithCompact = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={1500000} notation="compact" compactDisplay="short" />
    </Text>
  )
}

```

## Props

The `FormatNumber` component supports all `Intl.NumberFormat` options in
addition to the following props:

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| value | undefined | `number` | The number to format |
