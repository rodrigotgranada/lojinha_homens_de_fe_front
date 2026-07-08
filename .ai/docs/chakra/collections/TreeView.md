# components > TreeView
  
  URL: docs/components/tree-view
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/tree-view.mdx
  
  Used to display hierarchical data structures in an expandable tree format
          
  ***
  
  title: TreeView
  description: Used to display hierarchical data structures in an expandable tree format
  links: 
 - source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/components/tree-view
 - storybook: https://storybook.chakra-ui.com/?path=/story/components-treeview--basic
 - recipe: https://github.com/chakra-ui/chakra-ui/tree/main/packages/react/src/theme/recipes/tree-view.ts
 - ark: https://ark-ui.com/docs/components/tree-view
  ------------------------------------------------------------------------------------------------
  
  ```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewBasic = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm">
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

## Usage

```tsx
import { TreeView } from "@chakra-ui/react"
```

```tsx
<TreeView.Root>
  <TreeView.Label />
  <TreeView.Tree>
    <TreeView.Branch>
      <TreeView.BranchControl>
        <TreeView.BranchIndicator />
        <TreeView.BranchText />
      </TreeView.BranchControl>
      <TreeView.BranchContent>
        <TreeView.BranchIndentGuide />
        <TreeView.Item />
      </TreeView.BranchContent>
    </TreeView.Branch>
    <TreeView.Item />
  </TreeView.Tree>
</TreeView.Root>
```

> To setup the tree view, you need to use the
> [tree collection](https://ark-ui.com/docs/collections/tree-collection) to
> register the tree data.

## Shortcuts

### `TreeView.Node`

This component is a helper to manage the recursive rendering of the branch and
leaf nodes.

```tsx
<TreeView.Node
  showIndentGuide
  render={({ node, nodeState }) =>
    nodeState.isBranch ? (
      <TreeView.BranchControl>
        <TreeView.BranchText>{node.name}</TreeView.BranchText>
      </TreeView.BranchControl>
    ) : (
      <TreeView.Item>
        <TreeView.ItemText>{node.name}</TreeView.ItemText>
      </TreeView.Item>
    )
  }
/>
```

is equivalent to:

```tsx
const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchText>{node.name}</TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <TreeNode
                key={child.id}
                node={child}
                indexPath={[...indexPath, index]}
              />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item>
          <TreeView.ItemText>{node.name}</TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}
```

## Examples

### Sizes

Use the `size` prop to change the size of the tree view.

```tsx
"use client"

import { For, Stack, TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={["xs", "sm", "md"]}>
        {(size) => (
          <TreeView.Root
            collection={collection}
            maxW="sm"
            size={size}
            key={size}
          >
            <TreeView.Label>Tree (size={size})</TreeView.Label>
            <TreeView.Tree>
              <TreeView.Node
                indentGuide={<TreeView.BranchIndentGuide />}
                render={({ node, nodeState }) =>
                  nodeState.isBranch ? (
                    <TreeView.BranchControl>
                      <LuFolder />
                      <TreeView.BranchText>{node.name}</TreeView.BranchText>
                    </TreeView.BranchControl>
                  ) : (
                    <TreeView.Item>
                      <LuFile />
                      <TreeView.ItemText>{node.name}</TreeView.ItemText>
                    </TreeView.Item>
                  )
                }
              />
            </TreeView.Tree>
          </TreeView.Root>
        )}
      </For>
    </Stack>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Variants

Use the `variant` prop to change the variant of the tree view.

```tsx
"use client"

import { For, Stack, TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={["subtle", "solid"]}>
        {(variant) => (
          <TreeView.Root
            key={variant}
            collection={collection}
            maxW="sm"
            size="sm"
            variant={variant}
            colorPalette="teal"
            defaultSelectedValue={["node_modules"]}
          >
            <TreeView.Label>Tree (variant={variant})</TreeView.Label>
            <TreeView.Tree>
              <TreeView.Node
                render={({ node, nodeState }) =>
                  nodeState.isBranch ? (
                    <TreeView.BranchControl>
                      <LuFolder />
                      <TreeView.BranchText>{node.name}</TreeView.BranchText>
                    </TreeView.BranchControl>
                  ) : (
                    <TreeView.Item>
                      <LuFile />
                      <TreeView.ItemText>{node.name}</TreeView.ItemText>
                    </TreeView.Item>
                  )
                }
              />
            </TreeView.Tree>
          </TreeView.Root>
        )}
      </For>
    </Stack>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Colors

Use the `colorPalette` prop to change the color palette of the tree view.

```tsx
"use client"

import { For, TreeView, Wrap, createTreeCollection } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewWithColors = () => {
  return (
    <Wrap gap="8">
      <For each={colorPalettes}>
        {(colorPalette) => (
          <TreeView.Root
            key={colorPalette}
            collection={collection}
            maxW="xs"
            size="sm"
            colorPalette={colorPalette}
            defaultSelectedValue={["node_modules"]}
          >
            <TreeView.Label>Tree (colorPalette={colorPalette})</TreeView.Label>
            <TreeView.Tree>
              <TreeView.Node
                render={({ node, nodeState }) =>
                  nodeState.isBranch ? (
                    <TreeView.BranchControl>
                      <LuFolder />
                      <TreeView.BranchText>{node.name}</TreeView.BranchText>
                    </TreeView.BranchControl>
                  ) : (
                    <TreeView.Item>
                      <LuFile />
                      <TreeView.ItemText>{node.name}</TreeView.ItemText>
                    </TreeView.Item>
                  )
                }
              />
            </TreeView.Tree>
          </TreeView.Root>
        )}
      </For>
    </Wrap>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Disabled Node

Adding the `disabled` prop to a node's property will disable the node and
prevent interaction.

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewDisabledNode = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm">
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  disabled?: boolean
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json", disabled: true },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Controlled Expansion

Use the `expandedValue` and `onExpandedChange` props to programmatically control
node expansion behavior.

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewControlledExpansion = () => {
  const [expandedValue, setExpandedValue] = useState<string[]>(["node_modules"])
  return (
    <TreeView.Root
      collection={collection}
      expandedValue={expandedValue}
      onExpandedChange={(e) => setExpandedValue(e.expandedValue)}
    >
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node<Node>
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node }) =>
            node.children ? (
              <TreeView.BranchControl>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Explicit Expand

Render the `TreeView.BranchTrigger` to manually control node expansion behavior.

> You might need to set `role="none"` on the `TreeView.BranchControl` to avoid
> accessibility issues.

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuChevronRight, LuFile, LuFolder } from "react-icons/lu"

export const TreeViewExplicitExpand = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm" expandOnClick={false}>
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <TreeView.BranchTrigger>
                  <TreeView.BranchIndicator asChild>
                    <LuChevronRight />
                  </TreeView.BranchIndicator>
                </TreeView.BranchTrigger>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Expand Icon

Use the `nodeState.expanded` prop to swap the rendered icon on the branch when
it's expanded or collapsed.

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuSquareMinus, LuSquarePlus } from "react-icons/lu"

export const TreeViewExpandIcon = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm">
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                {nodeState.expanded ? <LuSquareMinus /> : <LuSquarePlus />}
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>{node.name}</TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Remove Indentation

Set the css variable `--tree-indentation` to `0px` to remove the indentation of
the tree view.

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewRemoveIndentation = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm">
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree css={{ "--tree-indentation": "0px" }}>
        <TreeView.Node
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Async Loading

Lazy loading is a feature that allows the tree view to load children of a node
on demand (or async). This helps to improve the initial load time and memory
usage.

To use this, you need to provide the following:

- `loadChildren` — A function that is used to load the children of a node.
- `onLoadChildrenComplete` — A callback that is called when the children of a
  node are loaded. Used to update the tree collection.
- `childrenCount` — A number that indicates the number of children of a branch
  node.

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder, LuLoaderCircle } from "react-icons/lu"

// mock api result
const response: Record<string, Node[]> = {
  node_modules: [
    { id: "zag-js", name: "zag-js" },
    { id: "pandacss", name: "panda" },
    { id: "@types", name: "@types", childrenCount: 2 },
  ],
  "node_modules/@types": [
    { id: "react", name: "react" },
    { id: "react-dom", name: "react-dom" },
  ],
  src: [
    { id: "app.tsx", name: "app.tsx" },
    { id: "index.ts", name: "index.ts" },
  ],
}

// function to load children of a node
function loadChildren(
  details: TreeView.LoadChildrenDetails<Node>,
): Promise<Node[]> {
  const value = details.valuePath.join("/")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response[value] ?? [])
    }, 1200)
  })
}

export const TreeViewAsync = () => {
  const [collection, setCollection] = useState(initialCollection)
  return (
    <TreeView.Root
      collection={collection}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(e) => setCollection(e.collection)}
    >
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node<Node>
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                {nodeState.loading ? (
                  <LuLoaderCircle style={{ animation: "spin 1s infinite" }} />
                ) : (
                  <LuFolder />
                )}
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
  childrenCount?: number
}

const initialCollection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      { id: "node_modules", name: "node_modules", childrenCount: 3 },
      { id: "src", name: "src", childrenCount: 2 },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Filtering

Filtering is useful when you have a large tree and you want to filter the nodes
to only show the ones that match the search query.

Here's an example that composes the `filter` method from the `TreeCollection`
and `useFilter` hook to filter the nodes.

```tsx
"use client"

import {
  Highlight,
  Input,
  Stack,
  TreeView,
  createTreeCollection,
  useFilter,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewWithFilter = () => {
  const [collection, setCollection] = useState(initialCollection)
  const [expanded, setExpanded] = useState<string[]>([])
  const [query, setQuery] = useState("")

  const { contains } = useFilter({ sensitivity: "base" })

  const search = (search: string) => {
    setQuery(search)
    const nextCollection = initialCollection.filter((node) =>
      contains(node.name, search),
    )

    // update collection
    setCollection(nextCollection)

    // expand all branches
    setExpanded(nextCollection.getBranchValues())
  }

  return (
    <Stack gap="3">
      <Input
        size="sm"
        placeholder="Search for files: 'react'"
        onChange={(e) => search(e.target.value)}
      />

      <TreeView.Root
        collection={collection}
        expandedValue={expanded}
        onExpandedChange={(details) => setExpanded(details.expandedValue)}
      >
        <TreeView.Label srOnly>Tree</TreeView.Label>
        <TreeView.Tree>
          <TreeView.Node
            indentGuide={<TreeView.BranchIndentGuide />}
            render={({ node, nodeState }) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl>
                  <LuFolder />
                  <TreeView.BranchText>
                    <Highlight
                      query={[query]}
                      styles={{ bg: "gray.emphasized" }}
                    >
                      {node.name}
                    </Highlight>
                  </TreeView.BranchText>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item>
                  <LuFile />
                  <TreeView.ItemText>
                    <Highlight
                      query={[query]}
                      styles={{ bg: "gray.emphasized" }}
                    >
                      {node.name}
                    </Highlight>
                  </TreeView.ItemText>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.Root>
    </Stack>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const initialCollection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Collapse Animation

Use the `animateContent` prop to animate the tree view content expand/collapse
state.

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewCollapseAnimation = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm" animateContent>
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Expand/Collapse All

Provide controls to expand or collapse all nodes at once.

```tsx
"use client"

import {
  Button,
  ButtonGroup,
  HStack,
  TreeView,
  createTreeCollection,
  useTreeViewContext,
} from "@chakra-ui/react"
import { isEqual } from "es-toolkit"
import { useMemo } from "react"
import { LuFile, LuFolder } from "react-icons/lu"

const ExpandCollapseAll = () => {
  const tree = useTreeViewContext()
  const isAllExpanded = useMemo(
    () => isEqual(tree.expandedValue, tree.collection.getBranchValues()),
    [tree.expandedValue, tree.collection],
  )
  return (
    <ButtonGroup size="2xs" variant="outline">
      <Button
        aria-label="Expand all"
        onClick={() => tree.expand()}
        hidden={isAllExpanded}
      >
        Expand all
      </Button>
      <Button
        aria-label="Collapse all"
        onClick={() => tree.collapse()}
        hidden={!isAllExpanded}
      >
        Collapse all
      </Button>
    </ButtonGroup>
  )
}

export const TreeViewExpandCollapseAll = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm">
      <HStack justify="space-between">
        <TreeView.Label>Tree</TreeView.Label>
        <ExpandCollapseAll />
      </HStack>
      <TreeView.Tree>
        <TreeView.Node
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Store

Use the `useTreeView` hook to create the tree view store and pass it to the
`TreeView.RootProvider` component. This allows you to have maximum control over
the tree view programmatically.

```tsx
"use client"

import { TreeView, createTreeCollection, useTreeView } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewWithStore = () => {
  const store = useTreeView({
    collection,
    defaultExpandedValue: [],
  })

  return (
    <TreeView.RootProvider value={store}>
      <TreeView.Label>Tree</TreeView.Label>
      <pre>{JSON.stringify(store.expandedValue)}</pre>
      <TreeView.Tree>
        <TreeView.Node<Node>
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node }) =>
            node.children ? (
              <TreeView.BranchControl>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.RootProvider>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Links

Render the tree items as links by leveraging the `asChild` prop on the
`TreeView.Item` component.

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuChevronRight, LuExternalLink, LuFile } from "react-icons/lu"

export const TreeViewWithLinks = () => {
  return (
    <TreeView.Root collection={collection} maxW="2xs">
      <TreeView.Tree>
        <TreeView.Node
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
                <TreeView.BranchIndicator>
                  <LuChevronRight />
                </TreeView.BranchIndicator>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item asChild>
                <a href={node.href}>
                  <LuFile />
                  <TreeView.ItemText>{node.name}</TreeView.ItemText>
                  {node.href?.startsWith("http") && (
                    <LuExternalLink size={12} />
                  )}
                </a>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  href?: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "docs",
        name: "Documentation",
        children: [
          {
            id: "docs/getting-started",
            name: "Getting Started",
            href: "/docs/getting-started",
          },
          {
            id: "docs/installation",
            name: "Installation",
            href: "/docs/installation",
          },
          {
            id: "docs/components",
            name: "Components",
            children: [
              {
                id: "docs/components/accordion",
                name: "Accordion",
                href: "/docs/components/accordion",
              },
              {
                id: "docs/components/dialog",
                name: "Dialog",
                href: "/docs/components/dialog",
              },
              {
                id: "docs/components/menu",
                name: "Menu",
                href: "/docs/components/menu",
              },
            ],
          },
        ],
      },
      {
        id: "examples",
        name: "Examples",
        children: [
          {
            id: "examples/react",
            name: "React Examples",
            href: "/examples/react",
          },
          { id: "examples/vue", name: "Vue Examples", href: "/examples/vue" },
          {
            id: "examples/solid",
            name: "Solid Examples",
            href: "/examples/solid",
          },
        ],
      },
      {
        id: "external",
        name: "External Links",
        children: [
          {
            id: "external/github",
            name: "GitHub Repository",
            href: "https://github.com/chakra-ui/zag",
          },
          {
            id: "external/npm",
            name: "NPM Package",
            href: "https://www.npmjs.com/package/@zag-js/core",
          },
          {
            id: "external/docs",
            name: "Official Docs",
            href: "https://zagjs.com",
          },
        ],
      },
      { id: "readme.md", name: "README.md", href: "/readme" },
      { id: "license", name: "LICENSE", href: "/license" },
    ],
  },
})

```

### Multi Select

Add the `selectionMode="multiple"` prop to the `TreeView.Root` component to
enable multi-select functionality.

:::info

This mode requires a modifier key to be pressed to select multiple items.

- Hold `Ctrl` or `⌘` on macOS and click the items.
- Click an item, then hold `Shift` while clicking on another item.

:::

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

export const TreeViewMultiSelect = () => {
  return (
    <TreeView.Root collection={collection} selectionMode="multiple">
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node<Node>
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node }) =>
            node.children ? (
              <TreeView.BranchControl>
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Checkbox Tree

Add checkboxes to tree nodes for selection functionality.

```tsx
"use client"

import {
  Checkmark,
  TreeView,
  createTreeCollection,
  useTreeViewNodeContext,
} from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

const TreeNodeCheckbox = (props: TreeView.NodeCheckboxProps) => {
  const nodeState = useTreeViewNodeContext()
  return (
    <TreeView.NodeCheckbox aria-label="check node" {...props}>
      <Checkmark
        bg={{
          base: "bg",
          _checked: "colorPalette.solid",
          _indeterminate: "colorPalette.solid",
        }}
        size="sm"
        checked={nodeState.checked === true}
        indeterminate={nodeState.checked === "indeterminate"}
      />
    </TreeView.NodeCheckbox>
  )
}

export const TreeViewCheckbox = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm" defaultCheckedValue={[]}>
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl role="none">
                <TreeNodeCheckbox />
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <TreeNodeCheckbox />
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Mutation

Here's an example of how to design add/remove nodes in the tree view.

```tsx
"use client"

import {
  HStack,
  IconButton,
  TreeView,
  createTreeCollection,
  useTreeViewContext,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder, LuPlus, LuTrash } from "react-icons/lu"

export const TreeViewMutation = () => {
  const [collection, setCollection] = useState(initialCollection)

  const removeNode = (props: TreeNodeProps) => {
    setCollection(collection.remove([props.indexPath]))
  }

  const addNode = (props: TreeNodeProps) => {
    const { node, indexPath } = props
    if (!collection.isBranchNode(node)) return
    const children = [
      {
        id: `untitled-${Date.now()}`,
        name: `untitled-${node.children?.length}.tsx`,
      },
      ...(node.children || []),
    ]
    setCollection(collection.replace(indexPath, { ...node, children }))
  }

  return (
    <TreeView.Root collection={collection} maxW="sm">
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState, indexPath }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl role="">
                <LuFolder />
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
                <TreeNodeActions
                  node={node}
                  indexPath={indexPath}
                  onRemove={removeNode}
                  onAdd={addNode}
                />
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
                <TreeNodeActions
                  node={node}
                  indexPath={indexPath}
                  onRemove={removeNode}
                  onAdd={addNode}
                />
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface TreeNodeProps extends TreeView.NodeProviderProps<Node> {
  onRemove?: (props: TreeView.NodeProviderProps<Node>) => void
  onAdd?: (props: TreeView.NodeProviderProps<Node>) => void
}

const TreeNodeActions = (props: TreeNodeProps) => {
  const { onRemove, onAdd, node } = props
  const tree = useTreeViewContext()
  const isBranch = tree.collection.isBranchNode(node)
  return (
    <HStack
      gap="0.5"
      position="absolute"
      right="0"
      top="0"
      scale="0.8"
      css={{
        opacity: 0,
        "[role=treeitem]:hover &": { opacity: 1 },
      }}
    >
      <IconButton
        size="xs"
        variant="ghost"
        aria-label="Remove node"
        onClick={(e) => {
          e.stopPropagation()
          onRemove?.(props)
        }}
      >
        <LuTrash />
      </IconButton>
      {isBranch && (
        <IconButton
          size="xs"
          variant="ghost"
          aria-label="Add node"
          onClick={(e) => {
            e.stopPropagation()
            onAdd?.(props)
            tree.expand([node.id])
          }}
        >
          <LuPlus />
        </IconButton>
      )}
    </HStack>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
  childrenCount?: number
}

const initialCollection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          { id: "node_modules/zag-js", name: "zag-js" },
          { id: "node_modules/pandacss", name: "panda" },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              { id: "node_modules/@types/react", name: "react" },
              { id: "node_modules/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "panda.config", name: "panda.config.ts" },
      { id: "package.json", name: "package.json" },
      { id: "renovate.json", name: "renovate.json" },
      { id: "readme.md", name: "README.md" },
    ],
  },
})

```

### Custom Icon

Here's an example of how to render a custom icon for the tree view based on its
data.

```tsx
"use client"

import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { RxFrame, RxImage, RxSquare, RxText } from "react-icons/rx"

export const TreeViewCustomIcon = () => {
  return (
    <TreeView.Root
      collection={collection}
      maxW="sm"
      size="sm"
      defaultExpandedValue={["ROOT"]}
    >
      <TreeView.Label srOnly>Tree</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <TreeViewNodeIcon type={node.type} />
                <TreeView.BranchText fontWeight="medium">
                  {node.name}
                </TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <TreeViewNodeIcon type={node.type} />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeViewNodeIcon = (props: { type: Node["type"] }) => {
  switch (props.type) {
    case "text":
      return <RxText />
    case "image":
      return <RxImage />
    case "frame":
      return <RxFrame />
    case "rectangle":
      return <RxSquare />
    default:
      return null
  }
}

interface Node {
  type: "text" | "image" | "frame" | "rectangle"
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    type: "frame",
    children: [
      {
        id: "page",
        name: "Page",
        type: "frame",
        children: [
          {
            id: "header",
            name: "Header",
            type: "frame",
            children: [
              { id: "logo", name: "Logo", type: "image" },
              { id: "nav", name: "Navigation", type: "text" },
            ],
          },
        ],
      },
      { id: "footer", name: "Footer", type: "text" },
      {
        id: "main",
        name: "Main",
        type: "frame",
        children: [
          { id: "hero", name: "Hero Section", type: "text" },
          { id: "features", name: "Features", type: "text" },
        ],
      },
    ],
  },
})

```

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| collection | undefined | `TreeCollection<T>` | The collection of tree nodes |
| expandOnClick | true | `boolean` | Whether clicking on a branch should open it or not |
| lazyMount | false | `boolean` | Whether to enable lazy mounting |
| selectionMode | "single" | `'multiple' \| 'single'` | Whether the tree supports multiple selection
- "single": only one node can be selected
- "multiple": multiple nodes can be selected |
| typeahead | true | `boolean` | Whether the tree supports typeahead search |
| unmountOnExit | false | `boolean` | Whether to unmount on exit. |
| colorPalette | gray | `'gray' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'cyan' \| 'purple' \| 'pink'` | The color palette of the component |
| size | md | `'md' \| 'sm' \| 'xs'` | The size of the component |
| variant | subtle | `'subtle' \| 'solid'` | The variant of the component |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |
| unstyled | undefined | `boolean` | Whether to remove the component's style. |
| canRename | undefined | `(node: T, indexPath: IndexPath) => boolean` | Function to determine if a node can be renamed |
| checkedValue | undefined | `string[]` | The controlled checked node value |
| defaultCheckedValue | undefined | `string[]` | The initial checked node value when rendered.
Use when you don't need to control the checked node value. |
| defaultExpandedValue | undefined | `string[]` | The initial expanded node ids when rendered.
Use when you don't need to control the expanded node value. |
| defaultFocusedValue | undefined | `string` | The initial focused node value when rendered.
Use when you don't need to control the focused node value. |
| defaultSelectedValue | undefined | `string[]` | The initial selected node value when rendered.
Use when you don't need to control the selected node value. |
| expandedValue | undefined | `string[]` | The controlled expanded node ids |
| focusedValue | undefined | `string` | The value of the focused node |
| ids | undefined | `Partial<{ root: string; tree: string; label: string; node: (value: string) => string }>` | The ids of the tree elements. Useful for composition. |
| loadChildren | undefined | `(details: LoadChildrenDetails<T>) => Promise<T[]>` | Function to load children for a node asynchronously.
When provided, branches will wait for this promise to resolve before expanding. |
| onBeforeRename | undefined | `(details: RenameCompleteDetails) => boolean` | Called before a rename is completed. Return false to prevent the rename. |
| onCheckedChange | undefined | `(details: CheckedChangeDetails) => void` | Called when the checked value changes |
| onExpandedChange | undefined | `(details: ExpandedChangeDetails<T>) => void` | Called when the tree is opened or closed |
| onFocusChange | undefined | `(details: FocusChangeDetails<T>) => void` | Called when the focused node changes |
| onLoadChildrenComplete | undefined | `(details: LoadChildrenCompleteDetails<T>) => void` | Called when a node finishes loading children |
| onLoadChildrenError | undefined | `(details: LoadChildrenErrorDetails<T>) => void` | Called when loading children fails for one or more nodes |
| onRenameComplete | undefined | `(details: RenameCompleteDetails) => void` | Called when a node label rename is completed |
| onRenameStart | undefined | `(details: RenameStartDetails<T>) => void` | Called when a node starts being renamed |
| onSelectionChange | undefined | `(details: SelectionChangeDetails<T>) => void` | Called when the selection changes |
| scrollToIndexFn | undefined | `(details: ScrollToIndexDetails<T>) => void` | Function to scroll to a specific index.
Useful for virtualized tree views. |
| selectedValue | undefined | `string[]` | The controlled selected node value |
| animateContent | undefined | `'true' \| 'false'` | The animateContent of the component |


### Node

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| render | undefined | `(props` | undefined |
| indentGuide | undefined | `React.ReactElement` | undefined |
| renderBranch | undefined | `(props` | undefined |
| branchProps | undefined | `TreeViewBranchProps` | undefined |
| branchContentProps | undefined | `TreeViewBranchContentProps` | undefined |
| as | undefined | `React.ElementType` | The underlying element to render. |
| asChild | undefined | `boolean` | Use the provided child element as the default rendered element, combining their props and behavior. |


## Explorer

Explore the `TreeView` component parts interactively. Click on parts in the
sidebar to highlight them in the preview.

<Explorer name="tree-view-explorer-demo" />