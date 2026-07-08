# components > QR Code
  
  URL: docs/components/qr-code
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/qr-code.mdx
  
  A component that generates a QR code based on the provided data.
          
  ***
  
  title: QR Code
  description: A component that generates a QR code based on the provided data.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/qr-code
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-qr-code--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/qr-code.ts
 - ark: https://ark-ui.com/docs/components/qr-code
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { QrCode } from "@chakra-ui/react"

export const QrCodeBasic = () => {
  return (
    <QrCode.Root value="https://www.google.com">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode.Root>
  )
}

```

## Usage

```tsx
import { QrCode } from "@chakra-ui/react"
```

```tsx
<QrCode.Root value="...">
  <QrCode.Frame>
    <QrCode.Pattern />
  </QrCode.Frame>
</QrCode.Root>
```

:::info

If you prefer a closed component composition, check out the
[snippet below](#closed-component).

:::

## Examples

### Sizes

Use the `size` prop to set the size of the QR code.

```tsx
import { For, QrCode, Stack } from "@chakra-ui/react"

export const QrCodeWithSizes = () => {
  return (
    <Stack>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <QrCode.Root size={size} value="https://www.google.com" key={size}>
            <QrCode.Frame>
              <QrCode.Pattern />
            </QrCode.Frame>
          </QrCode.Root>
        )}
      </For>
    </Stack>
  )
}

```

### Logo Overlay

Pass the children prop to the `QrCode.Overlay` component to add a logo or
overlay to the QR code.

```tsx
import { QrCode } from "@chakra-ui/react"

export const QrCodeWithOverlay = () => {
  return (
    <QrCode.Root value="https://www.google.com">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay>
        <Logo />
      </QrCode.Overlay>
    </QrCode.Root>
  )
}

const Logo = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C15.5228 0 20 4.47715 20 10V0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20C35.5228 20 40 24.4772 40 30C40 32.7423 38.8961 35.2268 37.1085 37.0334L37.0711 37.0711L37.0379 37.1041C35.2309 38.8943 32.7446 40 30 40C27.2741 40 24.8029 38.9093 22.999 37.1405C22.9756 37.1175 22.9522 37.0943 22.9289 37.0711C22.907 37.0492 22.8852 37.0272 22.8635 37.0051C21.0924 35.2009 20 32.728 20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30V20H10C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10ZM38 30C38 25.5817 34.4183 22 30 22C25.5817 22 22 25.5817 22 30H38ZM2 22V30C2 34.4183 5.58172 38 10 38C14.4183 38 18 34.4183 18 30V22H2ZM22 18V2L30 2C34.4183 2 38 5.58172 38 10C38 14.4183 34.4183 18 30 18H22Z"
        fill="#5417D7"
      ></path>
    </svg>
  )
}

```

### Fill

Use the `fill` prop to set the fill color of the QR code.

```tsx
import { Flex, For, QrCode } from "@chakra-ui/react"

export const QrCodeWithFill = () => {
  return (
    <Flex gap="4">
      <For each={["#5417D7", "#FF0000"]}>
        {(fill) => (
          <QrCode.Root key={fill} value="https://www.google.com">
            <QrCode.Frame style={{ fill }}>
              <QrCode.Pattern />
            </QrCode.Frame>
          </QrCode.Root>
        )}
      </For>
    </Flex>
  )
}

```

### Download

Use the `QrCode.DownloadTrigger` to download the QR code.

> The `fileName` and the `mimeType` props are required.

```tsx
import { Button, QrCode } from "@chakra-ui/react"

export const QrCodeWithExport = () => {
  return (
    <QrCode.Root value="https://www.google.com">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>

      <QrCode.DownloadTrigger
        asChild
        fileName="qr-code.png"
        mimeType="image/png"
      >
        <Button variant="outline" size="xs" mt="3">
          Download
        </Button>
      </QrCode.DownloadTrigger>
    </QrCode.Root>
  )
}

```

### Error Correction

In cases where the link is too long or the logo overlay covers a significant
area, the error correction level can be increased.

Use the `encoding.ecc` or `encoding.boostEcc` property to set the error
correction level:

- `L`: Allows recovery of up to 7% data loss (default)
- `M`: Allows recovery of up to 15% data loss
- `Q`: Allows recovery of up to 25% data loss
- `H`: Allows recovery of up to 30% data loss

```tsx
"use client"

import { QrCode, SegmentGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"

type ErrorLevel = "L" | "M" | "Q" | "H"

export const QrCodeWithErrorLevel = () => {
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>("L")
  return (
    <Stack align="flex-start">
      <QrCode.Root
        value="https://www.google.com"
        size="xl"
        encoding={{ ecc: errorLevel }}
      >
        <QrCode.Frame />
      </QrCode.Root>
      <SegmentGroup.Root
        size="sm"
        defaultValue={"L"}
        onValueChange={(e) => setErrorLevel(e.value as ErrorLevel)}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={["L", "M", "Q", "H"]} />
      </SegmentGroup.Root>
    </Stack>
  )
}

```

### Store

The `RootProvider` component provides a context for the QR code.

It accepts the value of the `useQrCode` hook. You can leverage it to access the
component state and methods from outside the QR code.

```tsx
"use client"

import { Button, QrCode, Stack, useQrCode } from "@chakra-ui/react"

export const QrCodeWithStore = () => {
  const qrCode = useQrCode({ defaultValue: "https://www.google.com" })
  return (
    <Stack align="flex-start">
      <Button onClick={() => qrCode.setValue("https://www.x.com")}>
        Update to x.com
      </Button>
      <QrCode.RootProvider value={qrCode}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.RootProvider>
    </Stack>
  )
}

```

### Input

Here's an example of how to use the `QrCode` component with an `Input`
component.

```tsx
"use client"

import { Input, QrCode, Stack } from "@chakra-ui/react"
import { useState } from "react"

export const QrCodeWithInput = () => {
  const [value, setValue] = useState("https://www.google.com")
  return (
    <Stack maxW="240px" gap="4">
      <QrCode.Root value={value}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </Stack>
  )
}

```

### Spinner

Here's an example of how to use the `QrCode` component with a `Spinner`
component.

```tsx
import { AbsoluteCenter, Box, QrCode, Spinner } from "@chakra-ui/react"

export const QrCodeWithSpinner = () => {
  return (
    <Box position="relative">
      <QrCode.Root value="https://www.google.com">
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>

        <AbsoluteCenter bg="bg/80" boxSize="100%">
          <Spinner color="red" />
        </AbsoluteCenter>
      </QrCode.Root>
    </Box>
  )
}

```

### Closed Component

Here's how to setup the QR code for a closed component composition.

<ExampleCode name="qr-code-closed-component" />

If you want to automatically add the closed component to your project, run the
command:

```bash
npx @chakra-ui/cli snippet add qr-code
```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| size | md | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | The size of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| defaultValue | undefined | `string` | The initial value to encode when rendered.
Use when you don't need to control the value of the qr code. |
| encoding | undefined | `QrCodeGenerateOptions` | The qr code encoding options. |
| id | undefined | `string` | The unique identifier of the machine. |
| ids | undefined | `Partial<{ root: string; frame: string }>` | The element ids. |
| onValueChange | undefined | `(details: ValueChangeDetails) => void` | Callback fired when the value changes. |
| pixelSize | undefined | `number` | The pixel size of the qr code. |
| value | undefined | `string` | The controlled value to encode. |


### DownloadTrigger

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| fileName | undefined | `string` | The name of the file. |
| mimeType | undefined | `DataUrlType` | The mime type of the image. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| quality | undefined | `number` | The quality of the image. |


## Explorer

Explore the `QR Code` component parts interactively. Click on parts in the
sidebar to highlight them in the preview.

<Explorer name="qr-code-explorer-demo" />