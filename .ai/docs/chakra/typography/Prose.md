# components > Prose
  
  URL: docs/components/prose
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/prose.mdx
  
  Used to style remote HTML content
          
  ***
  
  title: Prose
  description: Used to style remote HTML content
  links: 

  ------------------------------------------------------------------------------------------------
  
  ```tsx
import { Prose } from "@/components/ui/prose"

// Used for syntax highlighting
const html = String.raw

const content = html`
  <h1>Title Heading 1</h1>
  <h2>Title Heading 2</h2>
  <h3>Title Heading 3</h3>
  <h4>Title Heading 4</h4>

  <h4>Title Heading 4 <code>testing</code></h4>

  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at dolor nec
    ex rutrum semper. Praesent ultricies purus eget lectus tristique egestas ac
    in lacus. Nulla eleifend lorem risus, sit amet dictum nisi gravida eget.
    Suspendisse odio sem, scelerisque congue luctus nec, scelerisque ultrices
    orci. Praesent tincidunt, risus ut commodo cursus, ligula orci tristique
    justo, vitae sollicitudin lacus risus dictum orci. Press <kbd>Ctrl</kbd> +
    <kbd>C</kbd> to copy
  </p>

  <p>
    Vivamus vel enim at lorem ultricies faucibus. Cras vitae ipsum ut quam
    varius dignissim a ac tellus. Aliquam maximus mauris eget tincidunt
    interdum. Fusce vitae massa non risus congue tincidunt. Pellentesque maximus
    elit quis eros lobortis dictum.
  </p>

  <hr />

  <p>
    Fusce placerat ipsum vel sollicitudin imperdiet. Morbi vulputate non diam at
    consequat. Donec vitae sem eu arcu auctor scelerisque vel in turpis.
    Pellentesque dapibus justo dui, quis egestas sapien porttitor in.
  </p>
`

export const ProseBasic = () => {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />
}

```

## Setup

If you don't already have the snippet, run the following command to add the
`prose` snippet

```sh
npx @chakra-ui/cli snippet add prose
```

## Usage

```jsx
import { Prose } from "@/components/ui/prose"
```

```jsx
<Prose>
  <div dangerouslySetInnerHTML={{ __html: "..." }} />
</Prose>
```

## Examples

### Sizes

Use the `size` prop to change the size of the `Prose` component

```tsx
import { For, Stack, Text } from "@chakra-ui/react"
import { Prose } from "@/components/ui/prose"

export const ProseWithSizes = () => {
  return (
    <Stack gap="10">
      <For each={["md", "lg"]}>
        {(size) => (
          <Stack key={size}>
            <Text>size: {size}</Text>
            <Prose size={size}>
              <h1>Title Heading 1</h1>
              <h2>Title Heading 2</h2>
              <h3>Title Heading 3</h3>
              <h4>Title Heading 4</h4>

              <h4>
                Title Heading 4 <code>testing</code>
              </h4>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                at dolor nec ex rutrum semper. Praesent ultricies purus eget
                lectus tristique egestas ac in lacus. Nulla eleifend lorem
                risus, sit amet dictum nisi gravida eget. Suspendisse odio sem,
                scelerisque congue luctus nec, scelerisque ultrices orci.
                Praesent tincidunt, risus ut commodo cursus, ligula orci
                tristique justo, vitae sollicitudin lacus risus dictum orci.
                Press <kbd>Ctrl</kbd> +<kbd>C</kbd> to copy
              </p>
            </Prose>
          </Stack>
        )}
      </For>
    </Stack>
  )
}

```

### Blockquote

Blockquote elements are styled to match the design language of the `Blockquote`
component.

```tsx
import { Prose } from "@/components/ui/prose"

// Used for syntax highlighting
const html = String.raw

const content = html`
  <h3>Blockquotes</h3>
  <blockquote>This is a good looking blockquote!</blockquote>
  <p>And it can span into multiple lines:</p>
  <blockquote>
    Fusce placerat ipsum vel sollicitudin imperdiet. Morbi vulputate non diam at
    consequat. Donec vitae sem eu arcu auctor scelerisque vel in turpis.
    Pellentesque dapibus justo dui, quis egestas sapien porttitor in.
  </blockquote>
  <p>
    There&apos;s also <strong>strong</strong>, <b>b</b>, <em>em</em> support as
    well! But, let&apos;s display some code!
  </p>
`

export const ProseWithBlockquote = () => {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />
}

```

### List

List elements are styled to match the design language of the `List` component.

```tsx
import { Prose } from "@/components/ui/prose"

// Used for syntax highlighting
const html = String.raw

const content = html`
  <h3>Lists</h3>
  <p>Let's look at some unordered lists. Things to buy:</p>
  <ul>
    <li>Milk</li>
    <li>Eggs</li>
    <li>Bread</li>
    <li>Chakra UI Pro license</li>
  </ul>
  <p>And some ordered lists. Things to do:</p>
  <ol>
    <li>Pay the bills</li>
    <li>Walk the dog</li>
    <li>Take out trash</li>
  </ol>
`

export const ProseWithList = () => {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />
}

```

### React Markdown

Here's an example of using the `react-markdown` library to render markdown
content.

```tsx
import { Prose } from "@/components/ui/prose"
import Markdown from "react-markdown"

export const ProseWithReactMarkdown = () => {
  return (
    <Prose mx="auto">
      <Markdown>
        {`
  ## Heading
  
  Based on your Chakra package. So [click here](http://chakra-ui.com) to confirm your plan.
  
  - first item
  - second item
  - second item
  - second item
  
  [title](http://chakra-ui.com)
    `}
      </Markdown>
    </Prose>
  )
}

```

### Table

The table elements are styled to match the design language of the `Table`
component.

```tsx
import { Prose } from "@/components/ui/prose"

// Used for syntax highlighting
const html = String.raw

const content = html`
  <h3>Tables</h3>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>GitHub Profile</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Segun</td>
        <td>Creator</td>
        <td>segunadebayo</td>
      </tr>
      <tr>
        <td>Chris</td>
        <td>Ark Wizard</td>
        <td>grizzlycodes</td>
      </tr>
      <tr>
        <td>Abraham</td>
        <td>Trouble maker</td>
        <td>anubra266</td>
      </tr>
      <tr>
        <td>Esther</td>
        <td>Developer Advocate</td>
        <td>estheragbaje</td>
      </tr>
    </tbody>
  </table>
`

export const ProseWithTable = () => {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />
}

```