# components > Download Trigger
  
  URL: docs/components/download-trigger
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/download-trigger.mdx
  
  Used to trigger a download of a file.
          
  ***
  
  title: Download Trigger
  description: Used to trigger a download of a file.
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/download-trigger
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-download-trigger--basic
 - ark: https://ark-ui.com/docs/utilities/download-trigger
  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Button, DownloadTrigger } from "@chakra-ui/react"

const data = "The quick brown fox jumps over the lazy dog"

export const DownloadTriggerBasic = () => {
  return (
    <DownloadTrigger
      data={data}
      fileName="sample.txt"
      mimeType="text/plain"
      asChild
    >
      <Button variant="outline">Download txt</Button>
    </DownloadTrigger>
  )
}

```

## Usage

```jsx
import { DownloadTrigger } from "@chakra-ui/react"
```

```jsx
<DownloadTrigger data="..." fileName="x.png" mimeType="image/png" />
```

## Examples

### Basic

Pass the data you want to download to the `data` prop, and specify the
`fileName` and `mimeType` of the file.

```tsx
import { Button, DownloadTrigger } from "@chakra-ui/react"

const data = "The quick brown fox jumps over the lazy dog"

export const DownloadTriggerBasic = () => {
  return (
    <DownloadTrigger
      data={data}
      fileName="sample.txt"
      mimeType="text/plain"
      asChild
    >
      <Button variant="outline">Download txt</Button>
    </DownloadTrigger>
  )
}

```

### Download SVG

Here's an example of how to download an SVG file.

```tsx
import { Button, DownloadTrigger } from "@chakra-ui/react"

const data = String.raw`
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>
</svg>
`

export const DownloadTriggerSvg = () => {
  return (
    <DownloadTrigger
      data={data}
      fileName="sample.svg"
      mimeType="image/svg+xml"
      asChild
    >
      <Button variant="outline">Download svg</Button>
    </DownloadTrigger>
  )
}

```

### Promise

You can also trigger downloads from a promise that returns a `Blob`, `File`, or
`string`.

```tsx
"use client"

import { Button, DownloadTrigger } from "@chakra-ui/react"
import { LuImageDown } from "react-icons/lu"

const data = async () => {
  const res = await fetch("https://picsum.photos/200/300")
  return res.blob()
}

export const DownloadTriggerWithPromise = () => {
  return (
    <DownloadTrigger
      data={data}
      fileName="sample.jpg"
      mimeType="image/jpeg"
      asChild
    >
      <Button variant="outline">
        <LuImageDown /> Download
      </Button>
    </DownloadTrigger>
  )
}

```

### File Size

Compose the `DownloadTrigger` with the `FormatByte` component to display the
size of the file in a human-readable format.

```tsx
import { Button, DownloadTrigger, FormatByte } from "@chakra-ui/react"
import { LuDownload } from "react-icons/lu"

const data = "The quick brown fox jumps over the lazy dog"

export const DownloadTriggerWithFileSize = () => {
  return (
    <DownloadTrigger
      data={data}
      fileName="sample.txt"
      mimeType="text/plain"
      asChild
    >
      <Button variant="outline">
        <LuDownload /> Download (
        <FormatByte value={data.length} unitDisplay="narrow" />)
      </Button>
    </DownloadTrigger>
  )
}

```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| spinnerPlacement | start | `'start' \| 'end' \| undefined` | The placement of the spinner |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| size | md | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | The size of the component |
| variant | solid | `'solid' \| 'subtle' \| 'surface' \| 'outline' \| 'ghost' \| 'plain'` | The variant of the component |
| loading | false | `boolean \| undefined` | If `true`, the button will show a loading spinner. |
| loadingText | undefined | `React.ReactNode \| undefined` | The text to show while loading. |
| spinner | undefined | `React.ReactNode \| undefined` | The spinner to show while loading. |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
