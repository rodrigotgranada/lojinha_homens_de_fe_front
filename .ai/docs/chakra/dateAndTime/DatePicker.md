# components > Date Picker
  
  URL: docs/components/date-picker
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/date-picker.mdx
  
  Used to select dates or date ranges from a calendar.
          
  ***
  
  title: Date Picker
  description: Used to select dates or date ranges from a calendar.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/date-picker
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-date-picker--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/date-picker.ts
  ------------------------------------------------------------------------------------------------
  
  ```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerBasic = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

## Usage

```tsx
import { DatePicker } from "@chakra-ui/react"
```

```tsx
<DatePicker.Root>
  <DatePicker.Label />
  <DatePicker.Control>
    <DatePicker.Input />
    <DatePicker.IndicatorGroup>
      <DatePicker.Trigger>
        <LuCalendar />
      </DatePicker.Trigger>
    </DatePicker.IndicatorGroup>
  </DatePicker.Control>
  <Portal>
    <DatePicker.Positioner>
      <DatePicker.Content>
        <DatePicker.View view="day">
          <DatePicker.Header />
          <DatePicker.DayTable />
        </DatePicker.View>
        <DatePicker.View view="month">
          <DatePicker.Header />
          <DatePicker.MonthTable />
        </DatePicker.View>
        <DatePicker.View view="year">
          <DatePicker.Header />
          <DatePicker.YearTable />
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </Portal>
</DatePicker.Root>
```

## Date Value

Date values are provided using objects from
[`@internationalized/date`](https://react-aria.adobe.com/internationalized/date/),
which handles timezone-safe, locale-aware date handling.

This will be replaced by the
[Temporal API](https://tc39.es/proposal-temporal/docs/) when it's widely
supported in browsers.

## Examples

### Sizes

Use the `size` prop to change the size of the date picker.

```tsx
"use client"

import { DatePicker, For, Portal, Stack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithSizes = () => {
  return (
    <Stack gap={4} maxWidth="20rem">
      <For each={["xs", "sm", "md", "lg", "xl"]}>
        {(size) => (
          <DatePicker.Root key={size} size={size}>
            <DatePicker.Label>Select date - {size}</DatePicker.Label>
            <DatePicker.Control>
              <DatePicker.Input />
              <DatePicker.IndicatorGroup>
                <DatePicker.Trigger>
                  <LuCalendar />
                </DatePicker.Trigger>
              </DatePicker.IndicatorGroup>
            </DatePicker.Control>
            <Portal>
              <DatePicker.Positioner>
                <DatePicker.Content>
                  <DatePicker.View view="day">
                    <DatePicker.Header />
                    <DatePicker.DayTable />
                  </DatePicker.View>
                  <DatePicker.View view="month">
                    <DatePicker.Header />
                    <DatePicker.MonthTable />
                  </DatePicker.View>
                  <DatePicker.View view="year">
                    <DatePicker.Header />
                    <DatePicker.YearTable />
                  </DatePicker.View>
                </DatePicker.Content>
              </DatePicker.Positioner>
            </Portal>
          </DatePicker.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Variants

Use the `variant` prop to change the visual style of the date picker.

```tsx
"use client"

import { DatePicker, For, Portal, Stack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithVariants = () => {
  return (
    <Stack gap={4} maxWidth="20rem">
      <For each={["outline", "subtle", "flushed"]}>
        {(variant) => (
          <DatePicker.Root key={variant} variant={variant}>
            <DatePicker.Label>Select date - {variant}</DatePicker.Label>
            <DatePicker.Control>
              <DatePicker.Input />
              <DatePicker.IndicatorGroup>
                <DatePicker.Trigger>
                  <LuCalendar />
                </DatePicker.Trigger>
              </DatePicker.IndicatorGroup>
            </DatePicker.Control>
            <Portal>
              <DatePicker.Positioner>
                <DatePicker.Content>
                  <DatePicker.View view="day">
                    <DatePicker.Header />
                    <DatePicker.DayTable />
                  </DatePicker.View>
                  <DatePicker.View view="month">
                    <DatePicker.Header />
                    <DatePicker.MonthTable />
                  </DatePicker.View>
                  <DatePicker.View view="year">
                    <DatePicker.Header />
                    <DatePicker.YearTable />
                  </DatePicker.View>
                </DatePicker.Content>
              </DatePicker.Positioner>
            </Portal>
          </DatePicker.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Disabled

Use the `disabled` prop to prevent user interaction with the date picker.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerDisabled = () => {
  return (
    <DatePicker.Root disabled maxWidth="20rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Read Only

Use the `readOnly` prop to prevent modification while keeping the value visible.

```tsx
"use client"

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerReadOnly = () => {
  return (
    <DatePicker.Root
      readOnly
      defaultValue={[parseDate("2025-03-15")]}
      maxWidth="20rem"
    >
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Default View

Use the `defaultView` prop to set the initial calendar view to `"day"`,
`"month"`, or `"year"`.

```tsx
"use client"

import { Badge, DatePicker, Portal, Stack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerDefaultView = () => {
  return (
    <Stack gap={4} maxWidth="20rem">
      <Badge variant="outline" width="fit-content">
        Opens with month view
      </Badge>
      <DatePicker.Root defaultView="month">
        <DatePicker.Label>End Date</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger>
              <LuCalendar />
            </DatePicker.Trigger>
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <DatePicker.View view="day">
                <DatePicker.Header />
                <DatePicker.DayTable />
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Header />
                <DatePicker.MonthTable />
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Header />
                <DatePicker.YearTable />
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>
    </Stack>
  )
}

```

### Default Value

Use the `defaultValue` prop to set the initially selected date.

```tsx
"use client"

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerDefaultValue = () => {
  return (
    <DatePicker.Root defaultValue={[parseDate("2026-01-26")]} maxWidth="20rem">
      <DatePicker.Label>Start Date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Controlled

Use the `value` and `onValueChange` props to control the selected date.

```tsx
"use client"

import { DatePicker, Portal, Stack, Text, parseDate } from "@chakra-ui/react"
import { useState } from "react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerControlled = () => {
  const [value, setValue] = useState([parseDate("2026-01-26")])

  return (
    <Stack gap={4} maxWidth="20rem">
      <Text textStyle="sm">
        Selected: {value.map((d) => d.toString()).join(", ")}
      </Text>

      <DatePicker.Root value={value} onValueChange={(e) => setValue(e.value)}>
        <DatePicker.Label>Date of birth</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger>
              <LuCalendar />
            </DatePicker.Trigger>
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <DatePicker.View view="day">
                <DatePicker.Header />
                <DatePicker.DayTable />
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Header />
                <DatePicker.MonthTable />
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Header />
                <DatePicker.YearTable />
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>
    </Stack>
  )
}

```

### Store

An alternative way to control the date picker is to use the `RootProvider`
component and the `useDatePicker` store hook.

```tsx
"use client"

import {
  DatePicker,
  Portal,
  Stack,
  Text,
  useDatePicker,
} from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerRootProvider = () => {
  const datePicker = useDatePicker()
  return (
    <Stack gap={4} align="flex-start" maxWidth="20rem">
      <Text textStyle="sm">
        Selected: {datePicker.valueAsString.join(", ") || "None"}
      </Text>

      <DatePicker.RootProvider value={datePicker}>
        <DatePicker.Label>Select range</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger>
              <LuCalendar />
            </DatePicker.Trigger>
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <DatePicker.View view="day">
                <DatePicker.Header />
                <DatePicker.DayTable />
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Header />
                <DatePicker.MonthTable />
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Header />
                <DatePicker.YearTable />
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.RootProvider>
    </Stack>
  )
}

```

### Range Selection

Set the `selectionMode` prop to `"range"` to allow selecting a start and end
date.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerRangeSelection = () => {
  return (
    <DatePicker.Root selectionMode="range" maxWidth="20rem">
      <DatePicker.Label>Select range</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Multiple Selection

Set the `selectionMode` prop to `"multiple"` to allow selecting multiple dates.

```tsx
"use client"

import { DatePicker, Portal, Tag, Wrap } from "@chakra-ui/react"
import type { DateValue, WrapProps } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMultiSelection = () => {
  return (
    <DatePicker.Root selectionMode="multiple" maxWidth="sm">
      <DatePicker.Label>Date of birth</DatePicker.Label>

      <DatePicker.Control>
        <DatePickerValueContainer>
          <DatePickerValue />
        </DatePickerValueContainer>

        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>

      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const formatWithDay = (date: DateValue) => {
  const jsDate = date.toDate("UTC")
  return jsDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

const DatePickerValue = () => {
  return (
    <DatePicker.ValueText placeholder="Select dates...">
      {({ value, index, remove }) => (
        <Tag.Root key={index} size="lg" variant="subtle">
          <Tag.Label>{formatWithDay(value)}</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger onClick={remove} />
          </Tag.EndElement>
        </Tag.Root>
      )}
    </DatePicker.ValueText>
  )
}

const DatePickerValueContainer = (props: WrapProps) => {
  return (
    <Wrap
      gap="2"
      borderWidth="1px"
      minH="10"
      display="flex"
      alignItems="center"
      width="full"
      borderRadius="l2"
      textStyle="sm"
      py="1.5"
      ps="2.5"
      pe="8"
      {...props}
    />
  )
}

```

### Month Picker

Set the `defaultView` and `minView` props to `"month"` to restrict the picker to
month selection only.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import type { DateValue } from "@chakra-ui/react"
import { CalendarDate } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMonthPicker = () => {
  return (
    <DatePicker.Root
      format={format}
      parse={parse}
      defaultView="month"
      minView="month"
      placeholder="mm/yyyy"
      maxWidth="20rem"
    >
      <DatePicker.Label>Select month</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const format = (date: DateValue) => {
  const month = date.month.toString().padStart(2, "0")
  const year = date.year.toString()
  return `${month}/${year}`
}

const parse = (string: string) => {
  const fullRegex = /^(\d{1,2})\/(\d{4})$/
  const fullMatch = string.match(fullRegex)
  if (fullMatch) {
    const [, month, year] = fullMatch.map(Number)
    return new CalendarDate(year, month, 1)
  }
}

```

### Month Range

Set the `selectionMode` prop to `"range"` and `minView` to `"month"` to select a
month range.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import type { DateValue } from "@chakra-ui/react"
import { CalendarDate } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMonthRange = () => {
  return (
    <DatePicker.Root
      selectionMode="range"
      defaultView="month"
      minView="month"
      format={format}
      parse={parse}
      placeholder="mm/yyyy"
      maxWidth="20rem"
    >
      <DatePicker.Label>Select range</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const format = (date: DateValue) => {
  const month = date.month.toString().padStart(2, "0")
  const year = date.year.toString()
  return `${month}/${year}`
}

const parse = (string: string) => {
  const fullRegex = /^(\d{1,2})\/(\d{4})$/
  const fullMatch = string.match(fullRegex)
  if (fullMatch) {
    const [, month, year] = fullMatch.map(Number)
    return new CalendarDate(year, month, 1)
  }
}

```

### Year Picker

Set the `defaultView` and `minView` props to `"year"` to restrict the picker to
year selection only.

```tsx
"use client"

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import type { DateValue } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerYearPicker = () => {
  return (
    <DatePicker.Root
      format={format}
      parse={parse}
      defaultView="year"
      minView="year"
      placeholder="yyyy"
      maxWidth="20rem"
    >
      <DatePicker.Label>Select year</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const format = (date: DateValue) => date.year.toString()

const parse = (string: string | undefined) => {
  if (string === "" || !string) return
  const year = Number(string)
  if (year < 100) {
    const currentYear = new Date().getFullYear()
    const currentCentury = Math.floor(currentYear / 100) * 100
    return parseDate(new Date(currentCentury + year, 0))
  }
  return parseDate(new Date(Number(string), 0))
}

```

### Year Range

Set the `selectionMode` prop to `"range"` and `minView` to `"year"` to select a
year range.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import type { DateValue } from "@chakra-ui/react"
import { CalendarDate } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerYearPickerRange = () => {
  return (
    <DatePicker.Root
      selectionMode="range"
      defaultView="year"
      minView="year"
      format={format}
      parse={parse}
      placeholder="yyyy"
      maxWidth="20rem"
    >
      <DatePicker.Label>Select year range</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const format = (date: DateValue) => date.year.toString()

const parse = (string: string) => {
  const fullRegex = /^(\d{4})$/
  const fullMatch = string.match(fullRegex)
  if (fullMatch) {
    const [, year] = fullMatch.map(Number)
    return new CalendarDate(year, 1, 1)
  }
}

```

### Min/Max

Use the `min` and `max` props to restrict date selection to a specific range.

```tsx
"use client"

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMinMax = () => {
  return (
    <DatePicker.Root
      min={parseDate("2025-03-05")}
      max={parseDate("2025-03-31")}
      maxWidth="20rem"
    >
      <DatePicker.Label>Date of creation</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Unavailable Dates

Use the `isDateUnavailable` prop to disable specific dates (e.g., weekends,
holidays).

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import type { DateValue } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerUnavailable = () => {
  return (
    <DatePicker.Root isDateUnavailable={isWeekend} maxWidth="20rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const isWeekend = (date: DateValue) => {
  const dayOfWeek = date.toDate("UTC").getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}

```

### Formatting & Parsing

Use the `format` and `parse` props to control how dates are displayed and
interpreted.

```tsx
"use client"
import { DatePicker, Portal } from "@chakra-ui/react"
import type { DateValue } from "@chakra-ui/react"
import { CalendarDate } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerFormatParse = () => {
  return (
    <DatePicker.Root
      format={format}
      parse={parse}
      placeholder="dd/mm/yy"
      maxWidth="20rem"
    >
      <DatePicker.Label>Label</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const parse = (value: string) => {
  const fullRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/
  const fullMatch = value.match(fullRegex)
  if (fullMatch) {
    const [_, day, month, year] = fullMatch.map(Number)
    try {
      return new CalendarDate(year + 2000, month, day)
    } catch {
      return undefined
    }
  }

  const partialRegex = /^(\d{1,2})\/(\d{1,2})$/
  const partialMatch = value.match(partialRegex)
  if (partialMatch) {
    const [_, day, month] = partialMatch.map(Number)
    const currentYear = new Date().getFullYear()
    try {
      return new CalendarDate(currentYear, month, day)
    } catch {
      return undefined
    }
  }

  const dayRegex = /^(\d{1,2})$/
  const dayMatch = value.match(dayRegex)
  if (dayMatch) {
    const [_, day] = dayMatch.map(Number)
    const currentYear = new Date().getFullYear()
    return new CalendarDate(currentYear, 1, day)
  }

  return undefined
}

const format = (date: DateValue) => {
  const day = date.day.toString().padStart(2, "0")
  const month = date.month.toString().padStart(2, "0")
  const year = (date.year % 100).toString().padStart(2, "0")
  return `${day}/${month}/${year}`
}

```

### Localization

Use the `locale` prop to display the calendar in different languages and
regional formats.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerLocale = () => {
  return (
    <DatePicker.Root locale="de-DE" startOfWeek={1} maxWidth="20rem">
      <DatePicker.Label>Datum auswählen</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Button Trigger

Replace the default trigger with a styled custom button.

```tsx
"use client"

import { Button, DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithButton = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Trigger asChild unstyled>
          <Button variant="outline" width="full" justifyContent="flex-start">
            <DatePicker.ValueText placeholder="Select date" />
          </Button>
        </DatePicker.Trigger>
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Outside Icon

Place the trigger icon outside the input field.

```tsx
"use client"

import { DatePicker, IconButton, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithOutsideIcon = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.Trigger asChild unstyled>
          <IconButton variant="outline">
            <LuCalendar />
          </IconButton>
        </DatePicker.Trigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Input Group

Integrate with InputGroup for custom input layouts with start/end elements.

```tsx
"use client"

import { DatePicker, InputGroup, Portal } from "@chakra-ui/react"
import { LuCalendar, LuChevronsUpDown } from "react-icons/lu"

export const DatePickerWithInputGroup = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
      <DatePicker.Label>Date</DatePicker.Label>
      <InputGroup
        as={DatePicker.Control}
        startElement={<LuCalendar />}
        endElement={
          <DatePicker.Trigger>
            <LuChevronsUpDown />
          </DatePicker.Trigger>
        }
      >
        <DatePicker.Input />
      </InputGroup>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Clear Icon

Add a clear trigger to reset the selection.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithClear = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Context>
            {(context) =>
              context.value.length ? (
                <DatePicker.ClearTrigger />
              ) : (
                <DatePicker.Trigger>
                  <LuCalendar />
                </DatePicker.Trigger>
              )
            }
          </DatePicker.Context>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Placement

Use the `positioning` prop to control the placement of the calendar popover.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithPlacement = () => {
  return (
    <DatePicker.Root positioning={{ placement: "top-start" }} maxWidth="20rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Header Layout

Here's an example of customizing the header layout with `RangeText` and
navigation buttons.

```tsx
"use client"

import { DatePicker, HStack, Portal, Spacer } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithHeaderLayout = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
      <DatePicker.Label>Date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <HStack>
                <DatePicker.RangeText ps="4" />
                <Spacer />
                <DatePicker.PrevTrigger />
                <DatePicker.NextTrigger />
              </HStack>
              <DatePicker.DayTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Month and Year Select

Render the `DatePicker.MonthSelect` and `DatePicker.YearSelect` components for
quick month/year navigation.

```tsx
"use client"

import { DatePicker, HStack, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithMonthYearSelect = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger />
                <HStack>
                  <DatePicker.MonthSelect />
                  <DatePicker.YearSelect />
                </HStack>
                <DatePicker.NextTrigger />
              </DatePicker.ViewControl>
              <DatePicker.DayTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Multiple Months

Use the `numOfMonths` prop to display multiple months side by side.

```tsx
"use client"

import { DatePicker, Flex } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMultipleMonths = () => {
  return (
    <DatePicker.Root numOfMonths={2} maxWidth="24rem">
      <DatePicker.Label>Select months</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.Header />
            <Flex gap="4">
              <DatePicker.DayTable />
              <DatePicker.DayTable offset={1} />
            </Flex>
          </DatePicker.View>
          <DatePicker.View view="month">
            <DatePicker.Header />
            <DatePicker.MonthTable />
          </DatePicker.View>
          <DatePicker.View view="year">
            <DatePicker.Header />
            <DatePicker.YearTable />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  )
}

```

### Presets

Render the `DatePicker.PresetTrigger` component to provide quick date selection
options.

```tsx
"use client"

import { Button, DatePicker, Flex, Portal, VStack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerPresets = () => {
  return (
    <DatePicker.Root selectionMode="range" maxWidth="32rem">
      <DatePicker.Label>Select range</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content maxW="100dvw" w="fit-content" overflow="auto">
            <Flex
              px={{ base: "3", sm: "4" }}
              py={{ base: "3", sm: "4" }}
              gap={{ base: "3", sm: "6" }}
              flexDirection={{ base: "column", sm: "row" }}
            >
              <VStack
                align="stretch"
                gap={{ base: "1.5", sm: "2" }}
                minW={{ base: "full", sm: "140px" }}
                height="100%"
              >
                <DatePicker.PresetTrigger value="last7Days" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    Last 7 days
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="last30Days" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    Last 30 days
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="thisMonth" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    This month
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="lastMonth" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    Last month
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="thisYear" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    This year
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="lastYear" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    Last year
                  </Button>
                </DatePicker.PresetTrigger>
              </VStack>
              <Flex direction="column" flex="1" minW={0}>
                <DatePicker.View view="day">
                  <DatePicker.Header />
                  <DatePicker.DayTable />
                </DatePicker.View>
                <DatePicker.View view="month">
                  <DatePicker.Header />
                  <DatePicker.MonthTable />
                </DatePicker.View>
                <DatePicker.View view="year">
                  <DatePicker.Header />
                  <DatePicker.YearTable />
                </DatePicker.View>
              </Flex>
            </Flex>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Presets Sidebar

Here's an example of a task-management style picker with presets sidebar and
calendar side by side.

```tsx
"use client"

import { DatePicker, Flex, HStack, Spacer, Span, Stack } from "@chakra-ui/react"
import type { DateValue } from "@chakra-ui/react"
import {
  DateFormatter,
  getLocalTimeZone,
  isSameDay,
  isToday,
  today,
} from "@internationalized/date"

export const DatePickerWithPresetsSidebar = () => {
  return (
    <DatePicker.Root inline fixedWeeks width="fit-content" borderWidth="1px">
      <Flex flexDirection={{ base: "column", sm: "row" }}>
        <Stack
          gap="0"
          minW={{ base: "full", sm: "2xs" }}
          borderBottomWidth={{ base: "1px", sm: "0" }}
          borderEndWidth={{ base: "0", sm: "1px" }}
          py="2"
        >
          {presets.map((preset) => (
            <DatePicker.Context key={preset.label}>
              {(ctx) => (
                <DatePicker.PresetTrigger
                  value={[preset.value]}
                  height="10"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px="4"
                  textStyle="sm"
                  gap="1"
                  data-selected={
                    ctx.value.length > 0 &&
                    preset.value.compare(ctx.value[0]) === 0
                      ? ""
                      : undefined
                  }
                  _selected={{
                    layerStyle: "fill.subtle",
                  }}
                >
                  <Span>{preset.label}</Span>
                  <Span color="fg.muted" textStyle="sm">
                    {formatShortDate(preset.value, preset.value.toDate(tz))}
                  </Span>
                </DatePicker.PresetTrigger>
              )}
            </DatePicker.Context>
          ))}
        </Stack>

        <DatePicker.View view="day" p="3">
          <HStack justify="space-between" gap="0">
            <DatePicker.RangeText ps="4" fontWeight="medium" />
            <Spacer />
            <DatePicker.PrevTrigger />
            <DatePicker.NextTrigger />
          </HStack>
          <DatePicker.DayTable />
        </DatePicker.View>
      </Flex>
    </DatePicker.Root>
  )
}

const tz = getLocalTimeZone()
const now = today(tz)

const presets = [
  { label: "Today", value: now },
  { label: "Tomorrow", value: now.add({ days: 1 }) },
  { label: "Next week", value: now.add({ weeks: 1 }) },
  { label: "2 weeks", value: now.add({ weeks: 2 }) },
  { label: "4 weeks", value: now.add({ weeks: 4 }) },
]

const weekdayFormatter = new DateFormatter("en-US", { weekday: "short" })
const shortDateFormatter = new DateFormatter("en-US", {
  day: "numeric",
  month: "short",
})

const tomorrow = now.add({ days: 1 })
const formatShortDate = (value: DateValue, display: Date) => {
  if (isToday(value, tz)) return weekdayFormatter.format(display)
  if (isSameDay(value, tomorrow)) return weekdayFormatter.format(display)
  return shortDateFormatter.format(display)
}

```

### Today Button

Here's an example of adding a footer button to quickly jump to today's date.

```tsx
"use client"

import { Button, DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithTodayButton = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
      <DatePicker.Label>Date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
              <DatePicker.Context>
                {(api) => (
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => api.selectToday()}
                  >
                    Today
                  </Button>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### With Time

Here's an example of combining date selection with a time input for datetime
picking.

```tsx
"use client"

import { Button, DatePicker, Input, Portal } from "@chakra-ui/react"
import {
  CalendarDateTime,
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date"
import { useState } from "react"
import { LuCalendar } from "react-icons/lu"

const formatter = new DateFormatter("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
})

export const DatePickerWithTime = () => {
  const [value, setValue] = useState<CalendarDateTime[]>([
    new CalendarDateTime(2025, 1, 29, 14, 30),
  ])

  const timeValue = value[0]
    ? `${String(value[0].hour).padStart(2, "0")}:${String(value[0].minute).padStart(2, "0")}`
    : ""

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.currentTarget.value.split(":").map(Number)
    setValue((prev) => {
      const current = prev[0] ?? new CalendarDateTime(2025, 1, 1, 0, 0)
      return [current.set({ hour: hours, minute: minutes })]
    })
  }

  const onDateChange = (details: { value: DateValue[] }) => {
    const newDate = details.value[0]
    if (!newDate) return setValue([])
    const prevTime = value[0] ?? { hour: 0, minute: 0 }
    setValue([
      new CalendarDateTime(
        newDate.year,
        newDate.month,
        newDate.day,
        prevTime.hour,
        prevTime.minute,
      ),
    ])
  }

  return (
    <DatePicker.Root
      value={value}
      onValueChange={onDateChange}
      closeOnSelect={false}
      maxWidth="20rem"
    >
      <DatePicker.Label>Date and time</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Trigger asChild unstyled>
          <Button variant="outline" width="full" justifyContent="space-between">
            {value[0]
              ? formatter.format(value[0].toDate(getLocalTimeZone()))
              : "Select date and time"}
            <LuCalendar />
          </Button>
        </DatePicker.Trigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
              <Input type="time" value={timeValue} onChange={onTimeChange} />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Form

Here's an example of integrating with native form validation.

```tsx
"use client"

import { Button, DatePicker, Portal, Stack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        alert(JSON.stringify({ date: form.get("date") }))
      }}
    >
      <Stack gap="4" align="flex-start" maxW="sm">
        <DatePicker.Root name="date">
          <DatePicker.Label>Appointment date</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.Input required />
            <DatePicker.IndicatorGroup>
              <DatePicker.Trigger>
                <LuCalendar />
              </DatePicker.Trigger>
            </DatePicker.IndicatorGroup>
          </DatePicker.Control>
          <Portal>
            <DatePicker.Positioner>
              <DatePicker.Content>
                <DatePicker.View view="day">
                  <DatePicker.Header />
                  <DatePicker.DayTable />
                </DatePicker.View>
                <DatePicker.View view="month">
                  <DatePicker.Header />
                  <DatePicker.MonthTable />
                </DatePicker.View>
                <DatePicker.View view="year">
                  <DatePicker.Header />
                  <DatePicker.YearTable />
                </DatePicker.View>
              </DatePicker.Content>
            </DatePicker.Positioner>
          </Portal>
        </DatePicker.Root>

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

```

### React Hook Form

Here's an example of integrating with `react-hook-form` using the Controller
pattern.

```tsx
"use client"

import {
  Button,
  DatePicker,
  Field,
  Input,
  Portal,
  Stack,
  parseDate,
} from "@chakra-ui/react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { Controller, useForm } from "react-hook-form"
import { LuCalendar } from "react-icons/lu"
import { z } from "zod"

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
})

type FormValues = z.infer<typeof formSchema>

export const DatePickerWithHookForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => alert(JSON.stringify(data)))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.firstName}>
          <Field.Label>First name</Field.Label>
          <Input {...register("firstName")} />
          <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
        </Field.Root>

        <Controller
          control={control}
          name="dob"
          render={({ field }) => (
            <Field.Root invalid={!!errors.dob}>
              <DatePicker.Root
                value={field.value ? [parseDate(field.value)] : []}
                onValueChange={(e) =>
                  field.onChange(e.value[0]?.toString() ?? "")
                }
                invalid={!!errors.dob}
              >
                <DatePicker.Label>Date of birth</DatePicker.Label>
                <DatePicker.Control>
                  <DatePicker.Input placeholder="Select date" />
                  <DatePicker.IndicatorGroup>
                    <DatePicker.Trigger>
                      <LuCalendar />
                    </DatePicker.Trigger>
                  </DatePicker.IndicatorGroup>
                </DatePicker.Control>
                <Portal>
                  <DatePicker.Positioner>
                    <DatePicker.Content>
                      <DatePicker.View view="day">
                        <DatePicker.Header />
                        <DatePicker.DayTable />
                      </DatePicker.View>
                      <DatePicker.View view="month">
                        <DatePicker.Header />
                        <DatePicker.MonthTable />
                      </DatePicker.View>
                      <DatePicker.View view="year">
                        <DatePicker.Header />
                        <DatePicker.YearTable />
                      </DatePicker.View>
                    </DatePicker.Content>
                  </DatePicker.Positioner>
                </Portal>
              </DatePicker.Root>
              <Field.ErrorText>{errors.dob?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

```

### Fixed Weeks

Use the `fixedWeeks` prop to always display 6 weeks in the calendar, ensuring a
consistent height regardless of the month.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerFixedWeeks = () => {
  return (
    <DatePicker.Root fixedWeeks maxWidth="20rem">
      <DatePicker.Label>Date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Open on Click

Use the `openOnClick` prop to open the calendar when clicking the input field,
removing the need for a separate trigger button.

```tsx
"use client"

import { DatePicker, Portal } from "@chakra-ui/react"

export const DatePickerOpenOnClick = () => {
  return (
    <DatePicker.Root openOnClick maxWidth="20rem">
      <DatePicker.Label>Date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

```

### Field

The `DatePicker` does not natively integrate with the `Field` component yet. Use
`Field.Context` to wire up the field state manually. Native support will be
added in a future version.

```tsx
"use client"

import { Button, DatePicker, Field, Portal, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithField = () => {
  const [invalid, setInvalid] = useState(false)
  const toggleInvalid = () => setInvalid((prev) => !prev)

  return (
    <Stack gap="6" align="flex-start" maxWidth="20rem">
      <Button onClick={toggleInvalid} variant="outline" size="sm">
        Toggle Invalid
      </Button>
      <Field.Root invalid={invalid}>
        <Field.Label>Date of birth</Field.Label>
        <Field.Context>
          {(ctx) => (
            <DatePicker.Root
              invalid={ctx.invalid}
              ids={{ label: () => ctx.ids.label, input: () => ctx.ids.control }}
            >
              <DatePicker.Control>
                <DatePicker.Input />
                <DatePicker.IndicatorGroup>
                  <DatePicker.Trigger>
                    <LuCalendar />
                  </DatePicker.Trigger>
                </DatePicker.IndicatorGroup>
              </DatePicker.Control>
              <Portal>
                <DatePicker.Positioner>
                  <DatePicker.Content>
                    <DatePicker.View view="day">
                      <DatePicker.Header />
                      <DatePicker.DayTable />
                    </DatePicker.View>
                    <DatePicker.View view="month">
                      <DatePicker.Header />
                      <DatePicker.MonthTable />
                    </DatePicker.View>
                    <DatePicker.View view="year">
                      <DatePicker.Header />
                      <DatePicker.YearTable />
                    </DatePicker.View>
                  </DatePicker.Content>
                </DatePicker.Positioner>
              </Portal>
            </DatePicker.Root>
          )}
        </Field.Context>
        <Field.ErrorText>Date of birth is required</Field.ErrorText>
      </Field.Root>
    </Stack>
  )
}

```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| closeOnSelect | true | `boolean` | Whether the calendar should close after the date selection is complete.
This is ignored when the selection mode is `multiple`. |
| defaultView | "day" | `DateView` | The default view of the calendar |
| lazyMount | false | `boolean` | Whether to enable lazy mounting |
| locale | "en-US" | `string` | The locale (BCP 47 language tag) to use when formatting the date. |
| maxView | "year" | `DateView` | The maximum view of the calendar |
| minView | "day" | `DateView` | The minimum view of the calendar |
| openOnClick | false | `boolean` | Whether to open the calendar when the input is clicked. |
| outsideDaySelectable | false | `boolean` | Whether day outside the visible range can be selected. |
| selectionMode | "single" | `SelectionMode` | The selection mode of the calendar.
- `single` - only one date can be selected
- `multiple` - multiple dates can be selected
- `range` - a range of dates can be selected |
| skipAnimationOnMount | false | `boolean` | Whether to allow the initial presence animation. |
| timeZone | "UTC" | `string` | The time zone to use |
| unmountOnExit | false | `boolean` | Whether to unmount on exit. |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| size | md | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | The size of the component |
| variant | outline | `'outline' \| 'subtle' \| 'flushed'` | The variant of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| defaultFocusedValue | undefined | `DateValue` | The initial focused date when rendered.
Use when you don't need to control the focused date of the date picker. |
| defaultOpen | undefined | `boolean` | The initial open state of the date picker when rendered.
Use when you don't need to control the open state of the date picker. |
| defaultValue | undefined | `DateValue[]` | The initial selected date(s) when rendered.
Use when you don't need to control the selected date(s) of the date picker. |
| disabled | undefined | `boolean` | Whether the calendar is disabled. |
| fixedWeeks | undefined | `boolean` | Whether the calendar should have a fixed number of weeks.
This renders the calendar with 6 weeks instead of 5 or 6. |
| focusedValue | undefined | `DateValue` | The controlled focused date. |
| format | undefined | `(date: DateValue, details: LocaleDetails) => string` | The format of the date to display in the input. |
| id | undefined | `string` | The unique identifier of the machine. |
| ids | undefined | `Partial<{ root: string; label: (index: number) => string; table: (id: string) => string; tableHeader: (id: string) => string; tableBody: (id: string) => string; tableRow: (id: string) => string; content: string; ... 10 more ...; positioner: string; }>` | The ids of the elements in the date picker. Useful for composition. |
| immediate | undefined | `boolean` | Whether to synchronize the present change immediately or defer it to the next frame |
| inline | undefined | `boolean` | Whether to render the date picker inline |
| invalid | undefined | `boolean` | Whether the date picker is invalid |
| isDateUnavailable | undefined | `(date: DateValue, locale: string) => boolean` | Returns whether a date of the calendar is available. |
| max | undefined | `DateValue` | The maximum date that can be selected. |
| maxSelectedDates | undefined | `number` | The maximum number of dates that can be selected.
This is only applicable when `selectionMode` is `multiple`. |
| min | undefined | `DateValue` | The minimum date that can be selected. |
| name | undefined | `string` | The `name` attribute of the input element. |
| numOfMonths | undefined | `number` | The number of months to display. |
| onExitComplete | undefined | `VoidFunction` | Function called when the animation ends in the closed state |
| onFocusChange | undefined | `(details: FocusChangeDetails) => void` | Function called when the focused date changes. |
| onOpenChange | undefined | `(details: OpenChangeDetails) => void` | Function called when the calendar opens or closes. |
| onValueChange | undefined | `(details: ValueChangeDetails) => void` | Function called when the value changes. |
| onViewChange | undefined | `(details: ViewChangeDetails) => void` | Function called when the view changes. |
| onVisibleRangeChange | undefined | `(details: VisibleRangeChangeDetails) => void` | Function called when the visible range changes. |
| open | undefined | `boolean` | The controlled open state of the date picker |
| parse | undefined | `(value: string, details: LocaleDetails) => DateValue \| undefined` | Function to parse the date from the input back to a DateValue. |
| placeholder | undefined | `string` | The placeholder text to display in the input. |
| positioning | undefined | `PositioningOptions` | The user provided options used to position the date picker content |
| present | undefined | `boolean` | Whether the node is present (controlled by the user) |
| readOnly | undefined | `boolean` | Whether the calendar is read-only. |
| required | undefined | `boolean` | Whether the date picker is required |
| showWeekNumbers | undefined | `boolean` | Whether to show the week number column in the day view. |
| startOfWeek | undefined | `number` | The first day of the week.
 `0` - Sunday
 `1` - Monday
 `2` - Tuesday
 `3` - Wednesday
 `4` - Thursday
 `5` - Friday
 `6` - Saturday |
| translations | undefined | `IntlTranslations` | The localized messages to use. |
| value | undefined | `DateValue[]` | The controlled selected date(s). |
| view | undefined | `DateView` | The view of the calendar |
| hideOutsideDays | undefined | `'true' \| 'false'` | The hideOutsideDays of the component |


### Input

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| fixOnBlur | true | `boolean` | Whether to fix the input value on blur. |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| index | undefined | `number` | The index of the input to focus. |


### View

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| view | undefined | `DateView` | undefined |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


### TableCell

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| value | undefined | `number \| DateValue` | undefined |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| columns | undefined | `number` | undefined |
| disabled | undefined | `boolean` | undefined |
| visibleRange | undefined | `VisibleRange` | undefined |


### PresetTrigger

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| value | undefined | `PresetTriggerValue` | undefined |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


## Explorer

Explore the `DatePicker` component parts interactively. Click on parts in the
sidebar to highlight them in the preview.

<Explorer name="date-picker-explorer-demo" />