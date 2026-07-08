# components > Environment Provider
  
  URL: docs/components/environment-provider
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/environment-provider.mdx
  
  Used to render components in iframes, Shadow DOM, or Electron.
          
  ***
  
  title: Environment Provider
  description: Used to render components in iframes, Shadow DOM, or Electron.
  links: 
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-environment-provider--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/environment-provider.ts
 - ark: https://ark-ui.com/docs/utilities/environment
  ------------------------------------------------------------------------------------------------
  
  We use
[Zag.js](https://zagjs.com/overview/composition#custom-window-environment)
internally, which relies on DOM query methods like `document.querySelectorAll`
and `document.getElementById`. In custom environments like iframes, Shadow DOM,
or Electron, these methods might not work as expected.

To handle this, Ark UI includes the `EnvironmentProvider`, allowing you to set
the appropriate root node or document, ensuring correct DOM queries.

## Usage

```jsx
import { EnvironmentProvider } from "@chakra-ui/react"
```

```jsx
<EnvironmentProvider>{/* Your App */}</EnvironmentProvider>
```

## Examples

### iframe

Here's an example that uses `react-frame-component` to set the
`EnvironmentProvider`'s value with the iframe environment.

```jsx
import { EnvironmentProvider } from "@chakra-ui/react"
import Frame, { FrameContextConsumer } from "react-frame-component"

export const Demo = () => (
  <Frame>
    <FrameContextConsumer>
      {({ document }) => (
        <EnvironmentProvider value={() => document}>
          {/* Your App */}
        </EnvironmentProvider>
      )}
    </FrameContextConsumer>
  </Frame>
)
```

### Shadow DOM

Here's an example that uses `react-shadow` to set the `EnvironmentProvider`'s
value with Shadow DOM environment.

```jsx
import { EnvironmentProvider } from "@chakra-ui/react"
import { useRef } from "react"
import root from "react-shadow"

export const Demo = () => {
  const portalRef = useRef()
  return (
    <root.div ref={portalRef}>
      <EnvironmentProvider
        value={() => portalRef?.current?.shadowRoot ?? document}
      >
        {/* Your App */}
      </EnvironmentProvider>
    </root.div>
  )
}
```

### Accessing Context

Use the `useEnvironmentContext` hook to access the `RootNode`, `Document`, and
`Window` context.

```jsx
import { useEnvironmentContext } from "@chakra-ui/react"

export const Demo = () => {
  const { getRootNode } = useEnvironmentContext()

  return <pre>{JSON.stringify(getRootNode(), null, 2)}</pre>
}
```

## Props

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| value | undefined | `RootNode \| (() => RootNode)` | undefined |
