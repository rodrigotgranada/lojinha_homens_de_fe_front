# components > Rich Text Editor
  
  URL: docs/components/rich-text-editor
  Source: https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/docs/components/rich-text-editor.mdx
  
  Used to create and format text content visually, built on Tiptap.
          
  ***
  
  title: Rich Text Editor
  description: Used to create and format text content visually, built on Tiptap.
  links: 
 - storybook: https://storybook.chakra-ui.com/?path=/story/rich-text-editor-tiptap--basic
 - tiptap: https://tiptap.dev/
  ------------------------------------------------------------------------------------------------
  
  ```tsx
"use client"

import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorBasic = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyleKit,
    ],
    content: `<h1>Welcome to Chakra UI + Tiptap!</h1><p>Edit using the toolbar below...</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.FontFamily />
          <Control.FontSize />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
          <Control.H4 />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

```

## Getting Started

::::steps

### Add the snippet

The rich text editor is exposed as a snippet that can be added to your project.

```bash
npx @chakra-ui/cli snippet add rich-text-editor
```

### Tiptap StarterKit

To get started with the core editor features, install the
[Tiptap StarterKit](https://tiptap.dev/docs/editor/extensions/functionality/starterkit).

```bash
npm i @tiptap/starter-kit
```

### Additional extensions

Tiptap provides a rich set of additional extensions for adding additional
features to the editor. The most commonly used additional extensions you can
install are:

- Subscript: `@tiptap/extension-subscript`
- Superscript: `@tiptap/extension-superscript`
- Text Align: `@tiptap/extension-text-align`
- Text Style: `@tiptap/extension-text-style`

```bash
npm i @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-text-align @tiptap/extension-text-style
```

::::

## Usage

```tsx
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import { useEditor } from "@tiptap/react"
```

```tsx
<RichTextEditor.Root editor={editor}>
  <RichTextEditor.Toolbar>
    <RichTextEditor.ControlGroup>
      <Control.Bold />
      <Control.Italic />
      <Control.Underline />
    </RichTextEditor.ControlGroup>
  </RichTextEditor.Toolbar>
  <RichTextEditor.Content />
</RichTextEditor.Root>
```

## Examples

### Toggle Edit Mode

In the `useEditor` hook, assign the `editable` property to control the editor's
mode. When set to `false`, the editor will be in view-only mode.

```tsx
"use client"

import { HStack } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Control,
  RichTextEditor,
  createSelectControl,
} from "@/components/ui/rich-text-editor"
import { useState } from "react"

export const RichTextEditorWithMode = () => {
  const [editable, setEditable] = useState(true)

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>Edit this text...</p>`,
    editable,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  const handleModeChange = (newMode: string) => {
    setEditable(newMode === "edit")
    editor.setEditable(newMode === "edit")
  }

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="md">
      <HStack p="2" borderBottomWidth="1px" justify="space-between">
        <RichTextEditor.ControlGroup
          inert={!editable}
          opacity={!editable ? 0.5 : 1}
        >
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>
        <RichTextEditor.ControlGroup>
          <ModePicker
            width="120px"
            currentMode={editable ? "edit" : "view"}
            onModeChange={handleModeChange}
          />
        </RichTextEditor.ControlGroup>
      </HStack>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

interface ModePickerProps {
  currentMode: string
  onModeChange: (mode: string) => void
  width?: string
}

const ModePicker = (props: ModePickerProps) => {
  const { currentMode, onModeChange, ...rest } = props

  const SelectControl = createSelectControl({
    label: "Mode",
    options: [
      { value: "edit", label: "Editing" },
      { value: "view", label: "Viewing" },
    ],
    getValue: () => currentMode,
    command: (_editor, value) => {
      onModeChange(value)
    },
  })

  return <SelectControl {...rest} />
}

```

### Controlled

In the `useEditor` hook, set the `content` and `onUpdate` properties to control
the editor's content programmatically.

```tsx
const [content, setContent] = useState("<p>Edit here...</p>")

const editor = useEditor({
  content,
  onUpdate({ editor }) {
    setContent(editor.getHTML())
  },
})
```

```tsx
"use client"

import { Box, Stack } from "@chakra-ui/react"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import { useState } from "react"

export const RichTextEditorControlled = () => {
  const [content, setContent] = useState<string>("<p>Edit here...</p>")

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <Stack maxW="3xl">
      <RichTextEditor.Root editor={editor} maxHeight="2xl">
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
            <Control.Strikethrough />
            <Control.Code />
          </RichTextEditor.ControlGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor.Root>

      <Box p="4" bg="bg.muted" flex="1">
        <Box
          as="pre"
          textStyle="sm"
          wordWrap="break-word"
          whiteSpace="pre-wrap"
        >
          {content}
        </Box>
      </Box>
    </Stack>
  )
}

```

### Placeholder

To add a placeholder to the editor, use the
[@tiptap/extension-placeholder](https://www.npmjs.com/package/@tiptap/extension-placeholder)
extension and configure the `placeholder` property.

```tsx
const editor = useEditor({
  extensions: [
    // ... other extensions
    Placeholder.configure({
      placeholder: "Start typing your content here...",
    }),
  ],
})
```

```tsx
"use client"

import Placeholder from "@tiptap/extension-placeholder"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithPlaceholder = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing your content here...",
      }),
    ],
    content: "",
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="l2">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

```

### Character Count

To display live character and word counts, use the
[@tiptap/extensions/character-count](https://www.npmjs.com/package/@tiptap/extensions/character-count)
extension. This is especially useful for editors with limits or word-count
requirements.

```tsx
const editor = useEditor({
  extensions: [
    // ... other extensions
    CharacterCount.configure({
      limit: 1000,
      mode: "textSize",
    }),
  ],
})
```

```tsx
"use client"

import { Box } from "@chakra-ui/react"
import Image from "@tiptap/extension-image"
import { CharacterCount } from "@tiptap/extensions/character-count"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithCharacterCount = () => {
  const editor = useEditor({
    content: `
      <h2>Dr. Stone</h2>
      <p><strong>Dr. Stone</strong> is a Japanese manga and anime series that follows the story of Senku Ishigami, a scientific genius who awakens thousands of years after humanity has been petrified.</p>
      <p>The world is in ruins, and Senku aims to rebuild civilization using the power of science.</p>
    `,
    extensions: [
      StarterKit,
      Image,
      CharacterCount.configure({
        limit: 1000,
        mode: "textSize",
      }),
    ],
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  const charCount = editor.storage.characterCount.characters()
  const wordCount = editor.storage.characterCount.words()

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />

      <RichTextEditor.Footer justify="flex-end" textStyle="xs">
        <Box fontVariantNumeric="tabular-nums">Characters: {charCount}</Box>
        <Box fontVariantNumeric="tabular-nums">Words: {wordCount}</Box>
      </RichTextEditor.Footer>
    </RichTextEditor.Root>
  )
}

```

### Live Preview

Use the editor's `getHTML()` method to retrieve content and display it in a
read-only panel.

```tsx
"use client"

import { Splitter } from "@chakra-ui/react"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Prose } from "@/components/ui/prose"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithPreview = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    content: `
        <p>Edit here...</p>
        <p><strong>Tip:</strong> Try selecting this sentence.</p>
        <h2>Example Subheading</h2>
        <p>Here's a paragraph with <em>italic</em>, <u>underline</u>, and <strong>bold</strong> text.</p>
        <p><code>Code snippets can be inline or block-level.</code></p>
        <ul>
        <li>Item one</li>
        <li>Item two</li>
        <li>Item three</li>
        </ul>
        <ol>
        <li>First numbered item</li>
        <li>Second numbered item</li>
        </ol>
        <blockquote>This is a blockquote example.</blockquote>
    `,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <Splitter.Root panels={[{ id: "editor" }, { id: "preview" }]} minH="60">
      <Splitter.Panel id="editor">
        <RichTextEditor.Root
          editor={editor}
          css={{ "--content-min-height": "520px" }}
        >
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlGroup>
              <Control.Bold />
              <Control.Italic />
              <Control.Underline />
              <Control.Strikethrough />
              <Control.Code />
            </RichTextEditor.ControlGroup>
            <RichTextEditor.ControlGroup>
              <Control.H1 />
              <Control.H2 />
              <Control.H3 />
              <Control.H4 />
            </RichTextEditor.ControlGroup>
            <RichTextEditor.ControlGroup>
              <Control.Undo />
              <Control.Redo />
            </RichTextEditor.ControlGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor.Root>
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="editor:preview" />
      <Splitter.Panel id="preview" px="8" py="2">
        <Prose
          width="full"
          size="lg"
          color="fg"
          dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
        />
      </Splitter.Panel>
    </Splitter.Root>
  )
}

```

### Text Highlight

To add text highlighting, use the
[@tiptap/extension-highlight](https://www.npmjs.com/package/@tiptap/extension-highlight)
extension and configure the `multicolor` property. This allows users to pick or
cycle through highlight colors via the `<Control.Highlight />` component.

```tsx
"use client"

import Highlight from "@tiptap/extension-highlight"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithHighlight = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: `
      <p>This is a basic example of implementing text <mark data-color="#FFFF00" style="background-color: #FFFF00">highlighting</mark> using the Tiptap editor.</p>
      <p>Select some text and click the highlight button to <mark data-color="#00FFFF" style="background-color: #00FFFF">apply a highlight color</mark>.</p>
    `,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="l2">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Highlight />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

```

### Bubble Menu

Use the `BubbleMenu` component from Tiptap with any existing controls. The menu
will appear above any text selection, providing contextual formatting options.

```tsx
"use client"

import { useEditor } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithBubbleMenu = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: sampleContent,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="lg">
      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.Toolbar variant="floating">
            <RichTextEditor.ControlGroup>
              <Control.Bold />
              <Control.Italic />
              <Control.Underline />
              <Control.Strikethrough />
            </RichTextEditor.ControlGroup>

            <RichTextEditor.ControlGroup>
              <Control.Hr />
              <Control.Code />
            </RichTextEditor.ControlGroup>

            <RichTextEditor.ControlGroup>
              <Control.BulletList />
              <Control.OrderedList />
            </RichTextEditor.ControlGroup>
          </RichTextEditor.Toolbar>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

const sampleContent = `
  <h2>Select some text in this paragraph to see the bubble menu!</h2>
  <p>The <strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>, and <strike>Strikethrough</strike> controls will appear. You can also change the block type here.</p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <ul>
    <li>Try selecting text within this list item.</li>
    <li>Use the list buttons to switch between bullet and ordered lists.</li>
  </ul>
`

```

### Autosave

Implement an autosave feature by using the editor's `onUpdate` method. This
allows you to handle content changes and save them to a server, local storage,
or any other persistence layer.

```tsx
"use client"

import { Badge, Box, HStack, Text } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import { useCallback, useEffect, useRef, useState } from "react"
import { LuCheck, LuCloud, LuLoader } from "react-icons/lu"

type SaveStatus = "idle" | "saving" | "saved" | "error"

export const RichTextEditorWithAutosave = () => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate saving to server
  const saveContent = useCallback(async (content: string) => {
    setSaveStatus("saving")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Save to localStorage as demo
    localStorage.setItem("autosave-content", content)

    setSaveStatus("saved")
    setLastSaved(new Date())

    // Reset status after 2 seconds
    setTimeout(() => setSaveStatus("idle"), 2000)
  }, [])

  // Load saved content on mount
  const getSavedContent = () => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("autosave-content")
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content:
      getSavedContent() ||
      `<p>Start typing... your content will be automatically saved.</p>
       <p>Try making some changes and watch the save indicator.</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Debounce autosave
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveContent(editor.getHTML())
      }, 1000) // Save after 1 second of inactivity
    },
  })

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  if (!editor) return null

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)

    if (seconds < 60) return "just now"
    if (seconds < 120) return "1 minute ago"
    return `${Math.floor(seconds / 60)} minutes ago`
  }

  return (
    <Box>
      <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="l2">
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.BulletList />
            <Control.OrderedList />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.Undo />
            <Control.Redo />
          </RichTextEditor.ControlGroup>

          <HStack flex="1" justify="flex-end" gap="2">
            <Badge
              variant="subtle"
              colorPalette={
                saveStatus === "saving"
                  ? "yellow"
                  : saveStatus === "saved"
                    ? "green"
                    : "gray"
              }
            >
              <HStack gap="1">
                {saveStatus === "saving" && (
                  <LuLoader className="animate-spin" />
                )}
                {saveStatus === "saved" && <LuCheck />}
                {saveStatus === "idle" && <LuCloud />}
                <Text>
                  {saveStatus === "saving" && "Saving..."}
                  {saveStatus === "saved" && "Saved"}
                  {saveStatus === "idle" &&
                    (lastSaved
                      ? `Saved ${formatLastSaved(lastSaved)}`
                      : "Draft")}
                </Text>
              </HStack>
            </Badge>
          </HStack>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor.Root>
    </Box>
  )
}

```

### Task List

To add interactive task lists, use the
[@tiptap/extension-task-item](https://www.npmjs.com/package/@tiptap/extension-task-item)
and
[@tiptap/extension-task-list](https://www.npmjs.com/package/@tiptap/extension-task-list)
extensions and configure the `nested` property.

```tsx
"use client"

import { HStack } from "@chakra-ui/react"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditor,
  createBooleanControl,
} from "@/components/ui/rich-text-editor"
import { LuArrowLeft, LuArrowRight, LuListChecks, LuPlus } from "react-icons/lu"

export const RichTextEditorWithTask = () => {
  const editor = useEditor({
    extensions: [StarterKit, TaskList, TaskItem.configure({ nested: true })],
    content: `
      <h2>Project Tasks</h2>
      <p>Use the toolbar to manage your tasks:</p>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false">Write introduction</li>
        <li data-type="taskItem" data-checked="true">Set up editor</li>
        <li data-type="taskItem" data-checked="false">Add toolbar controls</li>
      </ul>
      <p>Keep adding tasks to track your progress!</p>
    `,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="md">
      <HStack gap="2" p="2" borderBottomWidth="1px">
        <RichTextEditor.ControlGroup>
          <ToggleTaskList />
          <IndentTask />
          <OutdentTask />
          <AddTask />
        </RichTextEditor.ControlGroup>
      </HStack>
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

const ToggleTaskList = createBooleanControl({
  label: "Toggle Task List",
  icon: LuListChecks,
  command: (editor) => editor.chain().focus().toggleTaskList().run(),
  getVariant: (editor) => (editor.isActive("taskList") ? "subtle" : "ghost"),
})

const IndentTask = createBooleanControl({
  label: "Indent Task",
  icon: LuArrowRight,
  command: (editor) => editor.chain().focus().sinkListItem("taskItem").run(),
  getVariant: (editor) => (editor.isActive("taskItem") ? "subtle" : "ghost"),
})

const OutdentTask = createBooleanControl({
  label: "Outdent Task",
  icon: LuArrowLeft,
  command: (editor) => editor.chain().focus().liftListItem("taskItem").run(),
  getVariant: (editor) => (editor.isActive("taskItem") ? "subtle" : "ghost"),
})

const AddTask = createBooleanControl({
  label: "Add Task",
  icon: LuPlus,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent(
        `<li data-type="taskItem" data-checked="false">New task</li>`,
      )
      .run(),
  getVariant: (editor) => (editor.isActive("taskItem") ? "subtle" : "ghost"),
})

```

### Code Blocks

Add syntax-highlighted code blocks using
[@tiptap/extension-code-block-lowlight](https://www.npmjs.com/package/@tiptap/extension-code-block-lowlight)
and `lowlight` to highlight your favorite languages.

```tsx
"use client"

import { HStack } from "@chakra-ui/react"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"
import { all, createLowlight } from "lowlight"

const lowlight = createLowlight(all)
lowlight.register("html", html)
lowlight.register("css", css)
lowlight.register("js", js)
lowlight.register("ts", ts)

export const RichTextEditorWithCode = () => {
  const editor = useEditor({
    extensions: [StarterKit, CodeBlockLowlight.configure({ lowlight })],
    content: `<p>That’s a boring paragraph followed by a fenced code block:</p>
<pre><code class="language-javascript">${code}</code></pre>
<p>Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="md"
    >
      <HStack gap="2" p="2" borderBottom="1px solid" borderColor="border">
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Code />
        </RichTextEditor.ControlGroup>
      </HStack>
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

// Escape HTML so it can be safely injected
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const code = escapeHtml(`
async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  const data = await response.json()
  return data
}

async function showTodos() {
  const todos = await fetchTodos()
  todos.forEach(todo => console.log(\`\${todo.id}: \${todo.title} [\${todo.completed ? '✅' : '❌'}]\`))
}

showTodos()
`)

```

### Drag Handle

To add drag-and-drop reordering, use the
[@tiptap/extension-drag-handle-react](https://www.npmjs.com/package/@tiptap/extension-drag-handle-react).
This extension enables draggable handles for each block, letting users easily
reorder content.

```tsx
"use client"

import { Box, Icon, useChakraContext } from "@chakra-ui/react"
import { DragHandle } from "@tiptap/extension-drag-handle-react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import { LuGripVertical } from "react-icons/lu"

export const RichTextEditorWithDragHandle = () => {
  const { token } = useChakraContext()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        dropcursor: { width: 2, color: token("colors.teal.solid") },
      }),
    ],
    content: `
      <p>Hover over any paragraph to see the drag handle appear on the left.</p>
      <p>This is another paragraph. You can drag blocks to reorder them.</p>
      <p>Try adding more content and rearranging it!</p>
      <ul>
        <li>List items can also be dragged</li>
        <li>Each block has its own handle</li>
      </ul>
      <blockquote>Blockquotes work too!</blockquote>
    `,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <Box position="relative">
        <DragHandle editor={editor}>
          <Box
            pos="relative"
            top="-0.5"
            insetStart="-1"
            cursor="grab"
            color="fg.muted"
            opacity="0.6"
            _hover={{ opacity: 1, color: "fg" }}
            _active={{ cursor: "grabbing" }}
          >
            <Icon asChild boxSize="4">
              <LuGripVertical />
            </Icon>
          </Box>
        </DragHandle>
        <RichTextEditor.Content />
      </Box>
    </RichTextEditor.Root>
  )
}

```

### Images

To add images, use the
[@tiptap/extension-image](https://www.npmjs.com/package/@tiptap/extension-image)
extension. This lets you embed image URLs, upload files, or integrate a custom
media service.

```tsx
"use client"

import {
  Box,
  Button,
  Dialog,
  FileUpload,
  Icon,
  Input,
  Portal,
  Tabs,
} from "@chakra-ui/react"
import Image from "@tiptap/extension-image"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Control,
  RichTextEditor,
  useRichTextEditorContext,
} from "@/components/ui/rich-text-editor"
import { useState } from "react"
import { LuImage, LuLink, LuUpload } from "react-icons/lu"

export const RichTextEditorWithImage = () => {
  const editor = useEditor({
    content: `
      <h2>Jiraiya Sensei</h2>
      <img src="https://preview.redd.it/was-jiraiya-good-looking-back-in-the-day-or-does-it-just-v0-7lcmj7gpf4we1.jpg?width=640&crop=smart&auto=webp&s=cbece8f347da1b9326d1958dbb46284d4bceb828" alt="Jiraiya Sensei" />
      <p><strong>Jiraiya</strong> is a legendary ninja from the Naruto series, known for his wisdom, humor, and mentorship of Naruto Uzumaki.</p>
      <p>Famed as one of the "Legendary Sannin," Jiraiya travels the world gathering knowledge and inspiring future generations.</p>
    `,
    extensions: [StarterKit, Image],
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <InsertImageControl />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

function InsertImageControl() {
  const { editor } = useRichTextEditorContext()
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  if (!editor) return null

  return (
    <>
      <Control.ButtonControl
        icon={<LuImage />}
        label="Insert Image"
        onClick={() => setOpen(true)}
        variant="ghost"
      />

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="lg">
              <Dialog.Header>
                <Dialog.Title>Insert Image</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Tabs.Root defaultValue="url">
                  <Tabs.List>
                    <Tabs.Trigger value="url">
                      <LuLink /> Embed URL
                    </Tabs.Trigger>
                    <Tabs.Trigger value="upload">
                      <LuUpload /> Upload File
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="url">
                    <Box display="flex" gap="2" mt="4">
                      <Input
                        placeholder="Enter image URL"
                        id="image-url-input"
                      />
                      <Button
                        onClick={() => {
                          const url = (
                            document.getElementById(
                              "image-url-input",
                            ) as HTMLInputElement
                          ).value
                          if (url)
                            editor.chain().focus().setImage({ src: url }).run()
                          setOpen(false)
                        }}
                      >
                        Insert
                      </Button>
                    </Box>
                  </Tabs.Content>

                  <Tabs.Content value="upload">
                    <FileUpload.Root
                      maxW="xl"
                      alignItems="stretch"
                      maxFiles={1}
                      accept="image/*"
                      onFileAccept={(accepted) => {
                        const uploaded = accepted.files ?? []
                        setFiles(uploaded)

                        if (uploaded[0]) {
                          const url = URL.createObjectURL(uploaded[0])
                          editor.chain().focus().setImage({ src: url }).run()
                          setOpen(false)
                        }
                      }}
                    >
                      <FileUpload.HiddenInput />
                      <FileUpload.Dropzone>
                        <Icon size="md" color="fg.muted">
                          <LuUpload />
                        </Icon>
                        <FileUpload.DropzoneContent>
                          <Box>Drag and drop a file here</Box>
                          <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                        </FileUpload.DropzoneContent>
                      </FileUpload.Dropzone>

                      <FileUpload.List files={files} />
                    </FileUpload.Root>
                  </Tabs.Content>
                </Tabs.Root>
              </Dialog.Body>

              <Dialog.Footer mt="4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

```

### Hashtags

To support hashtags in the editor, create a custom
[Tiptap node](https://tiptap.dev/docs/editor/extensions/nodes). This allows
hashtags to be parsed, rendered, and handled as structured inline content.

```tsx
"use client"

import {
  Node,
  mergeAttributes,
  nodeInputRule,
  nodePasteRule,
} from "@tiptap/core"
import {
  type NodeViewProps,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithHashtags = () => {
  const initialContent = `<p>Type #chakra or #react and press space, it becomes a tag. Try pasting: #tiptap #awesome</p>`
  const preprocessedContent = preprocessContent(initialContent, "#")

  const editor = useEditor({
    extensions: [StarterKit, Hashtag],
    content: preprocessedContent,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null
  return (
    <RichTextEditor.Root
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="md"
    >
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

interface HashtagOptions {
  trigger: string
}
interface HashtagAttributes {
  tag: string
}

const Hashtag = Node.create<HashtagOptions>({
  name: "hashtag",
  inline: true,
  group: "inline",
  atom: true,

  addOptions() {
    return { trigger: "#" }
  },

  addAttributes() {
    return {
      tag: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-tag"),
        renderHTML: (attributes) => {
          return { "data-tag": attributes.tag }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "span[data-type='hashtag']",
        getAttrs: (element) => {
          if (typeof element === "string") return false
          return {
            tag: element.getAttribute("data-tag") || "",
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": "hashtag",
        "data-tag": HTMLAttributes.tag,
      }),
      `${this.options.trigger}${HTMLAttributes.tag}`,
    ]
  },

  addInputRules() {
    const trigger = this.options.trigger
    return [
      nodeInputRule({
        find: new RegExp(`(${trigger}[a-zA-Z0-9_]+)\\s```tsx
"use client"

import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorBasic = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyleKit,
    ],
    content: `<h1>Welcome to Chakra UI + Tiptap!</h1><p>Edit using the toolbar below...</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.FontFamily />
          <Control.FontSize />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
          <Control.H4 />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

```

## Getting Started

::::steps

### Add the snippet

The rich text editor is exposed as a snippet that can be added to your project.

```bash
npx @chakra-ui/cli snippet add rich-text-editor
```

### Tiptap StarterKit

To get started with the core editor features, install the
[Tiptap StarterKit](https://tiptap.dev/docs/editor/extensions/functionality/starterkit).

```bash
npm i @tiptap/starter-kit
```

### Additional extensions

Tiptap provides a rich set of additional extensions for adding additional
features to the editor. The most commonly used additional extensions you can
install are:

- Subscript: `@tiptap/extension-subscript`
- Superscript: `@tiptap/extension-superscript`
- Text Align: `@tiptap/extension-text-align`
- Text Style: `@tiptap/extension-text-style`

```bash
npm i @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-text-align @tiptap/extension-text-style
```

::::

## Usage

```tsx
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import { useEditor } from "@tiptap/react"
```

```tsx
<RichTextEditor.Root editor={editor}>
  <RichTextEditor.Toolbar>
    <RichTextEditor.ControlGroup>
      <Control.Bold />
      <Control.Italic />
      <Control.Underline />
    </RichTextEditor.ControlGroup>
  </RichTextEditor.Toolbar>
  <RichTextEditor.Content />
</RichTextEditor.Root>
```

## Examples

### Toggle Edit Mode

In the `useEditor` hook, assign the `editable` property to control the editor's
mode. When set to `false`, the editor will be in view-only mode.

```tsx
"use client"

import { HStack } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Control,
  RichTextEditor,
  createSelectControl,
} from "@/components/ui/rich-text-editor"
import { useState } from "react"

export const RichTextEditorWithMode = () => {
  const [editable, setEditable] = useState(true)

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>Edit this text...</p>`,
    editable,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  const handleModeChange = (newMode: string) => {
    setEditable(newMode === "edit")
    editor.setEditable(newMode === "edit")
  }

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="md">
      <HStack p="2" borderBottomWidth="1px" justify="space-between">
        <RichTextEditor.ControlGroup
          inert={!editable}
          opacity={!editable ? 0.5 : 1}
        >
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>
        <RichTextEditor.ControlGroup>
          <ModePicker
            width="120px"
            currentMode={editable ? "edit" : "view"}
            onModeChange={handleModeChange}
          />
        </RichTextEditor.ControlGroup>
      </HStack>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

interface ModePickerProps {
  currentMode: string
  onModeChange: (mode: string) => void
  width?: string
}

const ModePicker = (props: ModePickerProps) => {
  const { currentMode, onModeChange, ...rest } = props

  const SelectControl = createSelectControl({
    label: "Mode",
    options: [
      { value: "edit", label: "Editing" },
      { value: "view", label: "Viewing" },
    ],
    getValue: () => currentMode,
    command: (_editor, value) => {
      onModeChange(value)
    },
  })

  return <SelectControl {...rest} />
}

```

### Controlled

In the `useEditor` hook, set the `content` and `onUpdate` properties to control
the editor's content programmatically.

```tsx
const [content, setContent] = useState("<p>Edit here...</p>")

const editor = useEditor({
  content,
  onUpdate({ editor }) {
    setContent(editor.getHTML())
  },
})
```

```tsx
"use client"

import { Box, Stack } from "@chakra-ui/react"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import { useState } from "react"

export const RichTextEditorControlled = () => {
  const [content, setContent] = useState<string>("<p>Edit here...</p>")

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <Stack maxW="3xl">
      <RichTextEditor.Root editor={editor} maxHeight="2xl">
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
            <Control.Strikethrough />
            <Control.Code />
          </RichTextEditor.ControlGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor.Root>

      <Box p="4" bg="bg.muted" flex="1">
        <Box
          as="pre"
          textStyle="sm"
          wordWrap="break-word"
          whiteSpace="pre-wrap"
        >
          {content}
        </Box>
      </Box>
    </Stack>
  )
}

```

### Placeholder

To add a placeholder to the editor, use the
[@tiptap/extension-placeholder](https://www.npmjs.com/package/@tiptap/extension-placeholder)
extension and configure the `placeholder` property.

```tsx
const editor = useEditor({
  extensions: [
    // ... other extensions
    Placeholder.configure({
      placeholder: "Start typing your content here...",
    }),
  ],
})
```

```tsx
"use client"

import Placeholder from "@tiptap/extension-placeholder"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithPlaceholder = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing your content here...",
      }),
    ],
    content: "",
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="l2">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

```

### Character Count

To display live character and word counts, use the
[@tiptap/extensions/character-count](https://www.npmjs.com/package/@tiptap/extensions/character-count)
extension. This is especially useful for editors with limits or word-count
requirements.

```tsx
const editor = useEditor({
  extensions: [
    // ... other extensions
    CharacterCount.configure({
      limit: 1000,
      mode: "textSize",
    }),
  ],
})
```

```tsx
"use client"

import { Box } from "@chakra-ui/react"
import Image from "@tiptap/extension-image"
import { CharacterCount } from "@tiptap/extensions/character-count"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithCharacterCount = () => {
  const editor = useEditor({
    content: `
      <h2>Dr. Stone</h2>
      <p><strong>Dr. Stone</strong> is a Japanese manga and anime series that follows the story of Senku Ishigami, a scientific genius who awakens thousands of years after humanity has been petrified.</p>
      <p>The world is in ruins, and Senku aims to rebuild civilization using the power of science.</p>
    `,
    extensions: [
      StarterKit,
      Image,
      CharacterCount.configure({
        limit: 1000,
        mode: "textSize",
      }),
    ],
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  const charCount = editor.storage.characterCount.characters()
  const wordCount = editor.storage.characterCount.words()

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />

      <RichTextEditor.Footer justify="flex-end" textStyle="xs">
        <Box fontVariantNumeric="tabular-nums">Characters: {charCount}</Box>
        <Box fontVariantNumeric="tabular-nums">Words: {wordCount}</Box>
      </RichTextEditor.Footer>
    </RichTextEditor.Root>
  )
}

```

### Live Preview

Use the editor's `getHTML()` method to retrieve content and display it in a
read-only panel.

```tsx
"use client"

import { Splitter } from "@chakra-ui/react"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Prose } from "@/components/ui/prose"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithPreview = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    content: `
        <p>Edit here...</p>
        <p><strong>Tip:</strong> Try selecting this sentence.</p>
        <h2>Example Subheading</h2>
        <p>Here's a paragraph with <em>italic</em>, <u>underline</u>, and <strong>bold</strong> text.</p>
        <p><code>Code snippets can be inline or block-level.</code></p>
        <ul>
        <li>Item one</li>
        <li>Item two</li>
        <li>Item three</li>
        </ul>
        <ol>
        <li>First numbered item</li>
        <li>Second numbered item</li>
        </ol>
        <blockquote>This is a blockquote example.</blockquote>
    `,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <Splitter.Root panels={[{ id: "editor" }, { id: "preview" }]} minH="60">
      <Splitter.Panel id="editor">
        <RichTextEditor.Root
          editor={editor}
          css={{ "--content-min-height": "520px" }}
        >
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlGroup>
              <Control.Bold />
              <Control.Italic />
              <Control.Underline />
              <Control.Strikethrough />
              <Control.Code />
            </RichTextEditor.ControlGroup>
            <RichTextEditor.ControlGroup>
              <Control.H1 />
              <Control.H2 />
              <Control.H3 />
              <Control.H4 />
            </RichTextEditor.ControlGroup>
            <RichTextEditor.ControlGroup>
              <Control.Undo />
              <Control.Redo />
            </RichTextEditor.ControlGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor.Root>
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="editor:preview" />
      <Splitter.Panel id="preview" px="8" py="2">
        <Prose
          width="full"
          size="lg"
          color="fg"
          dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
        />
      </Splitter.Panel>
    </Splitter.Root>
  )
}

```

### Text Highlight

To add text highlighting, use the
[@tiptap/extension-highlight](https://www.npmjs.com/package/@tiptap/extension-highlight)
extension and configure the `multicolor` property. This allows users to pick or
cycle through highlight colors via the `<Control.Highlight />` component.

```tsx
"use client"

import Highlight from "@tiptap/extension-highlight"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithHighlight = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: `
      <p>This is a basic example of implementing text <mark data-color="#FFFF00" style="background-color: #FFFF00">highlighting</mark> using the Tiptap editor.</p>
      <p>Select some text and click the highlight button to <mark data-color="#00FFFF" style="background-color: #00FFFF">apply a highlight color</mark>.</p>
    `,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="l2">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Highlight />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

```

### Bubble Menu

Use the `BubbleMenu` component from Tiptap with any existing controls. The menu
will appear above any text selection, providing contextual formatting options.

```tsx
"use client"

import { useEditor } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"

export const RichTextEditorWithBubbleMenu = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: sampleContent,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="lg">
      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.Toolbar variant="floating">
            <RichTextEditor.ControlGroup>
              <Control.Bold />
              <Control.Italic />
              <Control.Underline />
              <Control.Strikethrough />
            </RichTextEditor.ControlGroup>

            <RichTextEditor.ControlGroup>
              <Control.Hr />
              <Control.Code />
            </RichTextEditor.ControlGroup>

            <RichTextEditor.ControlGroup>
              <Control.BulletList />
              <Control.OrderedList />
            </RichTextEditor.ControlGroup>
          </RichTextEditor.Toolbar>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

const sampleContent = `
  <h2>Select some text in this paragraph to see the bubble menu!</h2>
  <p>The <strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>, and <strike>Strikethrough</strike> controls will appear. You can also change the block type here.</p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <ul>
    <li>Try selecting text within this list item.</li>
    <li>Use the list buttons to switch between bullet and ordered lists.</li>
  </ul>
`

```

### Autosave

Implement an autosave feature by using the editor's `onUpdate` method. This
allows you to handle content changes and save them to a server, local storage,
or any other persistence layer.

```tsx
"use client"

import { Badge, Box, HStack, Text } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import { useCallback, useEffect, useRef, useState } from "react"
import { LuCheck, LuCloud, LuLoader } from "react-icons/lu"

type SaveStatus = "idle" | "saving" | "saved" | "error"

export const RichTextEditorWithAutosave = () => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate saving to server
  const saveContent = useCallback(async (content: string) => {
    setSaveStatus("saving")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Save to localStorage as demo
    localStorage.setItem("autosave-content", content)

    setSaveStatus("saved")
    setLastSaved(new Date())

    // Reset status after 2 seconds
    setTimeout(() => setSaveStatus("idle"), 2000)
  }, [])

  // Load saved content on mount
  const getSavedContent = () => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("autosave-content")
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content:
      getSavedContent() ||
      `<p>Start typing... your content will be automatically saved.</p>
       <p>Try making some changes and watch the save indicator.</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Debounce autosave
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveContent(editor.getHTML())
      }, 1000) // Save after 1 second of inactivity
    },
  })

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  if (!editor) return null

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)

    if (seconds < 60) return "just now"
    if (seconds < 120) return "1 minute ago"
    return `${Math.floor(seconds / 60)} minutes ago`
  }

  return (
    <Box>
      <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="l2">
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.BulletList />
            <Control.OrderedList />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.Undo />
            <Control.Redo />
          </RichTextEditor.ControlGroup>

          <HStack flex="1" justify="flex-end" gap="2">
            <Badge
              variant="subtle"
              colorPalette={
                saveStatus === "saving"
                  ? "yellow"
                  : saveStatus === "saved"
                    ? "green"
                    : "gray"
              }
            >
              <HStack gap="1">
                {saveStatus === "saving" && (
                  <LuLoader className="animate-spin" />
                )}
                {saveStatus === "saved" && <LuCheck />}
                {saveStatus === "idle" && <LuCloud />}
                <Text>
                  {saveStatus === "saving" && "Saving..."}
                  {saveStatus === "saved" && "Saved"}
                  {saveStatus === "idle" &&
                    (lastSaved
                      ? `Saved ${formatLastSaved(lastSaved)}`
                      : "Draft")}
                </Text>
              </HStack>
            </Badge>
          </HStack>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor.Root>
    </Box>
  )
}

```

### Task List

To add interactive task lists, use the
[@tiptap/extension-task-item](https://www.npmjs.com/package/@tiptap/extension-task-item)
and
[@tiptap/extension-task-list](https://www.npmjs.com/package/@tiptap/extension-task-list)
extensions and configure the `nested` property.

```tsx
"use client"

import { HStack } from "@chakra-ui/react"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditor,
  createBooleanControl,
} from "@/components/ui/rich-text-editor"
import { LuArrowLeft, LuArrowRight, LuListChecks, LuPlus } from "react-icons/lu"

export const RichTextEditorWithTask = () => {
  const editor = useEditor({
    extensions: [StarterKit, TaskList, TaskItem.configure({ nested: true })],
    content: `
      <h2>Project Tasks</h2>
      <p>Use the toolbar to manage your tasks:</p>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false">Write introduction</li>
        <li data-type="taskItem" data-checked="true">Set up editor</li>
        <li data-type="taskItem" data-checked="false">Add toolbar controls</li>
      </ul>
      <p>Keep adding tasks to track your progress!</p>
    `,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="md">
      <HStack gap="2" p="2" borderBottomWidth="1px">
        <RichTextEditor.ControlGroup>
          <ToggleTaskList />
          <IndentTask />
          <OutdentTask />
          <AddTask />
        </RichTextEditor.ControlGroup>
      </HStack>
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

const ToggleTaskList = createBooleanControl({
  label: "Toggle Task List",
  icon: LuListChecks,
  command: (editor) => editor.chain().focus().toggleTaskList().run(),
  getVariant: (editor) => (editor.isActive("taskList") ? "subtle" : "ghost"),
})

const IndentTask = createBooleanControl({
  label: "Indent Task",
  icon: LuArrowRight,
  command: (editor) => editor.chain().focus().sinkListItem("taskItem").run(),
  getVariant: (editor) => (editor.isActive("taskItem") ? "subtle" : "ghost"),
})

const OutdentTask = createBooleanControl({
  label: "Outdent Task",
  icon: LuArrowLeft,
  command: (editor) => editor.chain().focus().liftListItem("taskItem").run(),
  getVariant: (editor) => (editor.isActive("taskItem") ? "subtle" : "ghost"),
})

const AddTask = createBooleanControl({
  label: "Add Task",
  icon: LuPlus,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent(
        `<li data-type="taskItem" data-checked="false">New task</li>`,
      )
      .run(),
  getVariant: (editor) => (editor.isActive("taskItem") ? "subtle" : "ghost"),
})

```

### Code Blocks

Add syntax-highlighted code blocks using
[@tiptap/extension-code-block-lowlight](https://www.npmjs.com/package/@tiptap/extension-code-block-lowlight)
and `lowlight` to highlight your favorite languages.

```tsx
"use client"

import { HStack } from "@chakra-ui/react"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"
import { all, createLowlight } from "lowlight"

const lowlight = createLowlight(all)
lowlight.register("html", html)
lowlight.register("css", css)
lowlight.register("js", js)
lowlight.register("ts", ts)

export const RichTextEditorWithCode = () => {
  const editor = useEditor({
    extensions: [StarterKit, CodeBlockLowlight.configure({ lowlight })],
    content: `<p>That’s a boring paragraph followed by a fenced code block:</p>
<pre><code class="language-javascript">${code}</code></pre>
<p>Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="md"
    >
      <HStack gap="2" p="2" borderBottom="1px solid" borderColor="border">
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Code />
        </RichTextEditor.ControlGroup>
      </HStack>
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

// Escape HTML so it can be safely injected
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const code = escapeHtml(`
async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  const data = await response.json()
  return data
}

async function showTodos() {
  const todos = await fetchTodos()
  todos.forEach(todo => console.log(\`\${todo.id}: \${todo.title} [\${todo.completed ? '✅' : '❌'}]\`))
}

showTodos()
`)

```

### Drag Handle

To add drag-and-drop reordering, use the
[@tiptap/extension-drag-handle-react](https://www.npmjs.com/package/@tiptap/extension-drag-handle-react).
This extension enables draggable handles for each block, letting users easily
reorder content.

```tsx
"use client"

import { Box, Icon, useChakraContext } from "@chakra-ui/react"
import { DragHandle } from "@tiptap/extension-drag-handle-react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import { LuGripVertical } from "react-icons/lu"

export const RichTextEditorWithDragHandle = () => {
  const { token } = useChakraContext()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        dropcursor: { width: 2, color: token("colors.teal.solid") },
      }),
    ],
    content: `
      <p>Hover over any paragraph to see the drag handle appear on the left.</p>
      <p>This is another paragraph. You can drag blocks to reorder them.</p>
      <p>Try adding more content and rearranging it!</p>
      <ul>
        <li>List items can also be dragged</li>
        <li>Each block has its own handle</li>
      </ul>
      <blockquote>Blockquotes work too!</blockquote>
    `,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <Box position="relative">
        <DragHandle editor={editor}>
          <Box
            pos="relative"
            top="-0.5"
            insetStart="-1"
            cursor="grab"
            color="fg.muted"
            opacity="0.6"
            _hover={{ opacity: 1, color: "fg" }}
            _active={{ cursor: "grabbing" }}
          >
            <Icon asChild boxSize="4">
              <LuGripVertical />
            </Icon>
          </Box>
        </DragHandle>
        <RichTextEditor.Content />
      </Box>
    </RichTextEditor.Root>
  )
}

```

### Images

To add images, use the
[@tiptap/extension-image](https://www.npmjs.com/package/@tiptap/extension-image)
extension. This lets you embed image URLs, upload files, or integrate a custom
media service.

```tsx
"use client"

import {
  Box,
  Button,
  Dialog,
  FileUpload,
  Icon,
  Input,
  Portal,
  Tabs,
} from "@chakra-ui/react"
import Image from "@tiptap/extension-image"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Control,
  RichTextEditor,
  useRichTextEditorContext,
} from "@/components/ui/rich-text-editor"
import { useState } from "react"
import { LuImage, LuLink, LuUpload } from "react-icons/lu"

export const RichTextEditorWithImage = () => {
  const editor = useEditor({
    content: `
      <h2>Jiraiya Sensei</h2>
      <img src="https://preview.redd.it/was-jiraiya-good-looking-back-in-the-day-or-does-it-just-v0-7lcmj7gpf4we1.jpg?width=640&crop=smart&auto=webp&s=cbece8f347da1b9326d1958dbb46284d4bceb828" alt="Jiraiya Sensei" />
      <p><strong>Jiraiya</strong> is a legendary ninja from the Naruto series, known for his wisdom, humor, and mentorship of Naruto Uzumaki.</p>
      <p>Famed as one of the "Legendary Sannin," Jiraiya travels the world gathering knowledge and inspiring future generations.</p>
    `,
    extensions: [StarterKit, Image],
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <InsertImageControl />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

function InsertImageControl() {
  const { editor } = useRichTextEditorContext()
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  if (!editor) return null

  return (
    <>
      <Control.ButtonControl
        icon={<LuImage />}
        label="Insert Image"
        onClick={() => setOpen(true)}
        variant="ghost"
      />

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="lg">
              <Dialog.Header>
                <Dialog.Title>Insert Image</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Tabs.Root defaultValue="url">
                  <Tabs.List>
                    <Tabs.Trigger value="url">
                      <LuLink /> Embed URL
                    </Tabs.Trigger>
                    <Tabs.Trigger value="upload">
                      <LuUpload /> Upload File
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="url">
                    <Box display="flex" gap="2" mt="4">
                      <Input
                        placeholder="Enter image URL"
                        id="image-url-input"
                      />
                      <Button
                        onClick={() => {
                          const url = (
                            document.getElementById(
                              "image-url-input",
                            ) as HTMLInputElement
                          ).value
                          if (url)
                            editor.chain().focus().setImage({ src: url }).run()
                          setOpen(false)
                        }}
                      >
                        Insert
                      </Button>
                    </Box>
                  </Tabs.Content>

                  <Tabs.Content value="upload">
                    <FileUpload.Root
                      maxW="xl"
                      alignItems="stretch"
                      maxFiles={1}
                      accept="image/*"
                      onFileAccept={(accepted) => {
                        const uploaded = accepted.files ?? []
                        setFiles(uploaded)

                        if (uploaded[0]) {
                          const url = URL.createObjectURL(uploaded[0])
                          editor.chain().focus().setImage({ src: url }).run()
                          setOpen(false)
                        }
                      }}
                    >
                      <FileUpload.HiddenInput />
                      <FileUpload.Dropzone>
                        <Icon size="md" color="fg.muted">
                          <LuUpload />
                        </Icon>
                        <FileUpload.DropzoneContent>
                          <Box>Drag and drop a file here</Box>
                          <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                        </FileUpload.DropzoneContent>
                      </FileUpload.Dropzone>

                      <FileUpload.List files={files} />
                    </FileUpload.Root>
                  </Tabs.Content>
                </Tabs.Root>
              </Dialog.Body>

              <Dialog.Footer mt="4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

```

### Hashtags

To support hashtags in the editor, create a custom
[Tiptap node](https://tiptap.dev/docs/editor/extensions/nodes). This allows
hashtags to be parsed, rendered, and handled as structured inline content.

),
        type: this.type,
        getAttributes: (match) => ({
          tag: match[1].substring(trigger.length),
        }),
      }),
    ]
  },

  addPasteRules() {
    const trigger = this.options.trigger
    return [
      nodePasteRule({
        find: new RegExp(`${trigger}([a-zA-Z0-9_]+)`, "g"),
        type: this.type,
        getAttributes: (match) => ({ tag: match[1] }),
      }),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(HashtagComponent)
  },
})

function HashtagComponent({ node }: NodeViewProps) {
  const { tag } = node.attrs as HashtagAttributes
  return `#${tag}`
}

function preprocessContent(content: string, trigger: string = "#"): string {
  const regex = new RegExp(`${trigger}([a-zA-Z0-9_]+)`, "g")

  return content.replace(regex, (_match, tag) => {
    return `<span data-type="hashtag" data-tag="${tag}">${trigger}${tag}</span>`
  })
}

```

### Mentions

Here's an example of how to add mentions to the editor by creating a custom
Tiptap extension that triggers on `@` and renders a suggestion menu using the
provided menu components.

```tsx
"use client"

import Mention from "@tiptap/extension-mention"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import {
  NodeViewWrapper,
  type ReactNodeViewProps,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import {
  type HashtagItem,
  type MentionItem,
  createMentionConfig,
  createSuggestionConfig,
} from "@/components/ui/rich-text-editor-menu"
import { Tag } from "@/components/ui/tag"

export const RichTextEditorWithMentions = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyle,
      CustomMention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: createMentionConfig(MENTION_USERS),
      }),
      HashtagMention.configure({
        HTMLAttributes: {
          class: "hashtag",
        },
        suggestion: createSuggestionConfig("#", (query) =>
          HASHTAGS.filter((hashtag) =>
            hashtag.label.toLowerCase().includes(query.toLowerCase()),
          ),
        ),
      }),
    ],
    content: `<h1>Rich Text Editor with Mentions</h1><p>Type <strong>@</strong> for mentions or <strong>#</strong> for hashtags</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="sm">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

const MentionComponent = (props: ReactNodeViewProps) => {
  return (
    <NodeViewWrapper as="span">
      <Tag size="lg" colorPalette="orange" mr="1">
        @{props.node.attrs.label ?? props.node.attrs.id}
      </Tag>
    </NodeViewWrapper>
  )
}

const CustomMention = Mention.extend({
  addNodeView() {
    return ReactNodeViewRenderer(MentionComponent)
  },
})

const HashtagMention = Mention.extend({
  name: "hashtag",
  addNodeView() {
    return ReactNodeViewRenderer((props) => (
      <NodeViewWrapper as="span">
        #{props.node.attrs.label ?? props.node.attrs.id}
      </NodeViewWrapper>
    ))
  },
})

const MENTION_USERS: MentionItem[] = [
  { id: "1", label: "Alice Johnson", email: "alice@example.com" },
  { id: "2", label: "Bob Smith", email: "bob@example.com" },
  { id: "3", label: "Charlie Davis", email: "charlie@example.com" },
  { id: "4", label: "Diana Wilson", email: "diana@example.com" },
  { id: "5", label: "Ethan Brown", email: "ethan@example.com" },
  { id: "6", label: "Fiona Martinez", email: "fiona@example.com" },
  { id: "7", label: "George Anderson", email: "george@example.com" },
  { id: "8", label: "Hannah Taylor", email: "hannah@example.com" },
]

const HASHTAGS: HashtagItem[] = [
  { id: "react", label: "react", description: "React.js framework" },
  { id: "typescript", label: "typescript", description: "TypeScript language" },
  { id: "nextjs", label: "nextjs", description: "Next.js framework" },
  { id: "chakra", label: "chakra", description: "Chakra UI library" },
  { id: "javascript", label: "javascript", description: "JavaScript language" },
  { id: "css", label: "css", description: "CSS styling" },
]

```

### Emojis

Enhance your editor with [emoji suggestions](#emoji-menu) by using Tiptap's
[Emoji extension](https://www.npmjs.com/package/@tiptap/extension-emoji). Emojis
can be triggered by typing `:` or using common emoticons like `:)` or `<3`.

```tsx
"use client"

import Emoji, { emojis } from "@tiptap/extension-emoji"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { createEmojiSuggestionConfig } from "@/components/ui/rich-text-editor-menu"

export const RichTextEditorWithEmoji = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Emoji.configure({
        emojis,
        enableEmoticons: true,
        suggestion: createEmojiSuggestionConfig(emojis),
      }),
    ],
    content: `<p>Type <strong>:</strong> to insert an emoji, like :smile: or :heart:</p><p>You can also use emoticons like :) or &lt;3</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} rounded="md">
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

```

### Slash Commands

Enable slash commands in your editor by creating a Tiptap extension that
triggers on `/`.

```tsx
"use client"

import { Extension } from "@tiptap/core"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { PluginKey } from "@tiptap/pm/state"
import { ReactRenderer, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Suggestion } from "@tiptap/suggestion"
import { Control, RichTextEditor } from "@/components/ui/rich-text-editor"
import {
  type FloatingMenuProps,
  SuggestionMenu,
} from "@/components/ui/rich-text-editor-menu"
import { LuCode, LuHash, LuList, LuListOrdered, LuQuote } from "react-icons/lu"

export const RichTextEditorWithSlashCommands = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyle,
      SlashCommandsExtension,
    ],
    content: `<h1>Slash Commands Editor</h1><p>Type <strong>/</strong> to see commands</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="sm">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

interface SlashCommand {
  id: string
  label: string
  description: string
  icon: any
  command: (props: { editor: any; range: any }) => void
}

const SLASH_COMMANDS: SlashCommand[] = [
  {
    id: "heading1",
    label: "Heading 1",
    description: "Large section heading",
    icon: LuHash,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run()
    },
  },
  {
    id: "heading2",
    label: "Heading 2",
    description: "Medium section heading",
    icon: LuHash,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run()
    },
  },
  {
    id: "heading3",
    label: "Heading 3",
    description: "Small section heading",
    icon: LuHash,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run()
    },
  },
  {
    id: "bullet",
    label: "Bullet List",
    description: "Create a bullet list",
    icon: LuList,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    id: "numbered",
    label: "Numbered List",
    description: "Create a numbered list",
    icon: LuListOrdered,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  {
    id: "quote",
    label: "Quote",
    description: "Add a blockquote",
    icon: LuQuote,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    },
  },
  {
    id: "code",
    label: "Code Block",
    description: "Add a code block",
    icon: LuCode,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    },
  },
]

const SlashCommandsExtension = Extension.create({
  name: "slashCommands",

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: "/",
        pluginKey: new PluginKey("slashCommands"),

        command: ({
          editor,
          range,
          props,
        }: {
          editor: any
          range: any
          props: SlashCommand
        }) => {
          props.command({ editor, range })
        },

        items: ({ query }: { query: string }) =>
          SLASH_COMMANDS.filter((command) =>
            command.label.toLowerCase().includes(query.toLowerCase()),
          ),

        render: () => {
          let component: ReactRenderer<
            HTMLDivElement,
            FloatingMenuProps
          > | null = null
          let container: HTMLDivElement | null = null
          let selectedIndex = 0

          return {
            onStart(props) {
              selectedIndex = 0
              container = document.createElement("div")
              document.body.appendChild(container)

              component = new ReactRenderer(SuggestionMenu, {
                props: {
                  items: props.items,
                  selectedIndex,
                  onSelect: (item: SlashCommand) => props.command(item),
                  clientRect: props.clientRect,
                },
                editor: props.editor,
              })

              container.appendChild(component.element)
            },

            onUpdate(props) {
              if (!component) return
              component.updateProps({
                items: props.items,
                selectedIndex,
                onSelect: (item: SlashCommand) => props.command(item),
                clientRect: props.clientRect,
              })
            },

            onKeyDown({ event }) {
              if (!component) return false

              if (event.key === "ArrowUp") {
                selectedIndex =
                  (selectedIndex - 1 + component.props.items.length) %
                  component.props.items.length
                component.updateProps({ ...component.props, selectedIndex })
                return true
              }

              if (event.key === "ArrowDown") {
                selectedIndex =
                  (selectedIndex + 1) % component.props.items.length
                component.updateProps({ ...component.props, selectedIndex })
                return true
              }

              if (event.key === "Enter") {
                const item = component.props.items[selectedIndex]
                if (item) component.props.onSelect(item)
                return true
              }

              if (event.key === "Escape") return true

              return false
            },

            onExit() {
              if (container) container.remove()
              container = null
              if (component) component.destroy()
              component = null
            },
          }
        },
      }),
    ]
  },
})

```

### Composition

A real-world Google Docs–like layout demonstrating a full-page editor with a
collapsible document outline, sticky toolbar, floating link menus, and
integrated controls for headings, lists, links, images, and text formatting.

```tsx
"use client"

import {
  Box,
  Button,
  Dialog,
  FileUpload,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Portal,
  Switch,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react"
import Color from "@tiptap/extension-color"
import Heading from "@tiptap/extension-heading"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { Plugin } from "@tiptap/pm/state"
import { Editor, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Avatar } from "@/components/ui/avatar"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Control,
  RichTextEditor,
  useRichTextEditorContext,
} from "@/components/ui/rich-text-editor"
import { Tooltip } from "@/components/ui/tooltip"
import { forwardRef, useEffect, useId, useState } from "react"
import {
  LuChevronDown,
  LuCircleHelp,
  LuFileText,
  LuLock,
  LuMessageSquare,
  LuSearch,
  LuStar,
  LuUpload,
  LuVideo,
} from "react-icons/lu"
import { LuImage, LuLink } from "react-icons/lu"
import {
  LuArrowRight,
  LuCopy,
  LuDownload,
  LuFolder,
  LuPlus,
  LuSettings,
} from "react-icons/lu"

export const RichTextEditorComposition = () => {
  const [linkBubblePosition, setLinkBubblePosition] = useState<{
    top: number
    left: number
  } | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      HeadingWithSlug.configure({ levels: [1, 2, 3] }),
      TextStyleKit,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: editorContent,
    onSelectionUpdate: ({ editor }) => {
      if (editor.isActive("link")) {
        const { from } = editor.state.selection
        const domAtPos = editor.view.domAtPos(from)
        const node = domAtPos.node as HTMLElement
        const linkElement =
          node.nodeType === Node.TEXT_NODE ? node.parentElement : node

        if (linkElement && linkElement.tagName === "A") {
          const rect = linkElement.getBoundingClientRect()
          setLinkBubblePosition({
            top: rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX + rect.width / 2,
          })
        }
      } else {
        setLinkBubblePosition(null)
      }
    },
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root
      editor={editor}
      shadow="sm"
      h="100vh"
      display="flex"
      flexDirection="column"
      css={{
        "--content-padding-x": "spacing.16",
        "--content-padding-y": "spacing.12",
      }}
    >
      <GoogleDocsHeader />
      <Toolbar />
      <HStack
        borderTop="1px solid"
        borderColor="border"
        flex="1"
        mt="4"
        alignItems="stretch"
        gap={0}
        overflow="hidden"
      >
        <Box
          w="280px"
          borderRight="1px solid"
          borderColor="border"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <SidebarOutline editor={editor} />
        </Box>
        <Flex
          flex="1"
          justifyContent="center"
          overflowY="auto"
          position="relative"
        >
          <RichTextEditor.Content />
          {linkBubblePosition && (
            <LinkBubbleMenu
              editor={editor}
              position={linkBubblePosition}
              onClose={() => setLinkBubblePosition(null)}
            />
          )}
        </Flex>
      </HStack>
    </RichTextEditor.Root>
  )
}

const LinkBubbleMenu = ({
  editor,
  position,
  onClose,
}: {
  editor: Editor
  position: { top: number; left: number }
  onClose: () => void
}) => {
  const [url, setUrl] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const attrs = editor.getAttributes("link")
    setUrl(attrs.href || "")
  }, [editor])

  const handleSave = () => {
    if (url.trim()) {
      const isValid = /^https?:\/\//i.test(url.trim())
      const finalUrl = isValid ? url.trim() : `https://${url.trim()}`
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: finalUrl })
        .run()
    }
    setIsEditing(false)
  }

  const handleRemove = () => {
    editor.chain().focus().unsetLink().run()
    onClose()
  }

  return (
    <Box
      position="fixed"
      top={`${position.top}px`}
      left={`${position.left}px`}
      transform="translateX(-50%)"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      borderWidth="1px"
      p={3}
      zIndex={1000}
      minW="280px"
    >
      {isEditing ? (
        <VStack gap={2} align="stretch">
          <Input
            size="sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") setIsEditing(false)
            }}
          />
          <HStack justify="flex-end" gap={2}>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button size="xs" colorPalette="blue" onClick={handleSave}>
              Save
            </Button>
          </HStack>
        </VStack>
      ) : (
        <VStack gap={2} align="stretch">
          <HStack justify="space-between">
            <Text
              fontSize="sm"
              lineClamp={1}
              truncate
              flex="1"
              color="blue.600"
            >
              {url}
            </Text>
          </HStack>
          <HStack gap={2}>
            <Button
              size="xs"
              variant="outline"
              onClick={() => setIsEditing(true)}
              flex="1"
            >
              Edit
            </Button>
            <Button
              size="xs"
              variant="outline"
              colorPalette="red"
              onClick={handleRemove}
              flex="1"
            >
              Remove
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  )
}

const GoogleDocsHeader = () => {
  return (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between">
      <HStack gap={3} align="flex-start">
        <Icon as={LuFileText} color="blue.500" boxSize={8} mt={1} />

        <VStack align="flex-start" gap={0}>
          <HStack gap={2}>
            <Text fontSize="lg" fontWeight="semibold">
              Legend Of X: The Complete Saga
            </Text>
            <IconButton variant="ghost" size="xs" color="gray.500">
              <LuStar size={16} />
            </IconButton>
          </HStack>

          <HStack gap={3}>
            {menuItems.map((menu) => (
              <MenuRoot key={menu.label}>
                <MenuTrigger>
                  <Button fontSize="sm" px={2} py={1} variant="ghost" size="xs">
                    {menu.label}
                  </Button>
                </MenuTrigger>

                <MenuContent minW="200px" py={1}>
                  {menu.items.map((item) => (
                    <MenuItem
                      value={item.label}
                      key={item.label}
                      gap={3}
                      cursor="button"
                    >
                      <HStack gap={3} align="center">
                        <Icon as={() => item.icon} boxSize={4} />
                        <Text fontSize="sm">{item.label}</Text>
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuContent>
              </MenuRoot>
            ))}
          </HStack>
        </VStack>
      </HStack>

      <HStack gap={4}>
        <IconButton variant="ghost">
          <LuMessageSquare size={20} />
        </IconButton>

        <HStack gap={0}>
          <IconButton variant="ghost">
            <LuVideo size={20} />
          </IconButton>
          <IconButton variant="ghost" size="xs">
            <LuChevronDown size={14} />
          </IconButton>
        </HStack>

        <Button borderRadius="full" px={6} gap={2} colorPalette="blue">
          <LuLock size={14} />
          Share
        </Button>

        <Avatar
          fallback={<Text fontSize="sm">SA</Text>}
          name="Segun Adebayo"
          src="https://bit.ly/sage-adebayo"
        />
      </HStack>
    </Flex>
  )
}
const Toolbar = () => {
  return (
    <Box px={4}>
      <HStack
        bg="bg.muted"
        p={2}
        gap={1}
        rounded="50px"
        mt="4"
        overflowX="auto"
      >
        <IconButton variant="ghost" size="sm">
          <LuSearch />
        </IconButton>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.FontFamily width="140px" />
          <Control.FontSize width="80px" />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.AlignLeft />
          <Control.AlignCenter />
          <Control.AlignRight />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <LinkControl />
          <InsertImageControl />
        </RichTextEditor.ControlGroup>
      </HStack>
    </Box>
  )
}

const SidebarOutline = ({ editor }: { editor: Editor }) => {
  if (!editor) return null

  const headings: { level: number; text: string; id: string }[] = []

  if (editor.getJSON().content) {
    editor.getJSON().content.forEach((node, i) => {
      if (node.type === "heading") {
        const { attrs = {}, content = [] } = node
        const level = attrs.level ?? 1
        const id = attrs.id ?? `heading-${i}`
        const text = content.map((c: any) => c.text).join("") ?? ""
        headings.push({ level, text, id })
      }
    })
  }

  const getPaddingLeft = (level: number = 1) => {
    return (level - 1) * 16 + 4
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <VStack align="stretch" gap={0} h="full">
      <HStack
        justify="space-between"
        align="center"
        p={4}
        borderBottom="1px solid"
        borderColor="border"
        flexShrink={0}
      >
        <Text fontWeight="medium" fontSize="sm">
          Document outline
        </Text>
        <IconButton variant="ghost" size="xs" aria-label="Options">
          <Icon as={LuChevronDown} />
        </IconButton>
      </HStack>

      <VStack align="stretch" gap={1} p={2} overflowY="auto" flex="1">
        {headings.length === 0 ? (
          <Text fontSize="sm" textAlign="center" p={4}>
            Headings you add to the document will appear here
          </Text>
        ) : (
          headings.map((h) => (
            <Button
              key={h.id}
              variant="ghost"
              size="sm"
              pl={`${getPaddingLeft(h.level)}px`}
              py={2}
              onClick={() => scrollToHeading(h.id)}
              lineClamp="1"
              truncate
            >
              <Icon
                as={LuFileText}
                mr={2}
                flexShrink={0}
                color="gray.500"
                boxSize={4}
              />
              {h.text}
            </Button>
          ))
        )}
      </VStack>
    </VStack>
  )
}

const LinkControl = forwardRef<
  HTMLButtonElement,
  Omit<Control.ButtonControlProps, "icon" | "label">
>(function LinkControl(props, ref) {
  const { editor } = useRichTextEditorContext()
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [external, setExternal] = useState(false)
  const [position, setPosition] = useState<{
    top: number
    left: number
  } | null>(null)

  const triggerId = useId()

  if (!editor) return null

  const handleOpen = () => {
    const markAttrs = editor.getAttributes("link")
    setUrl(markAttrs.href ?? "")
    setExternal(markAttrs.target === "_blank")

    // Get cursor position
    const { from } = editor.state.selection
    const coords = editor.view.coordsAtPos(from)

    console.log("coords", coords)
    setPosition({
      top: coords.bottom,
      left: coords.left,
    })

    setOpen(true)
  }

  const handleApply = () => {
    const trimmed = url.trim()
    if (!trimmed) {
      editor.chain().focus().unsetLink().run()
      setOpen(false)
      return
    }

    const isValid = /^https?:\/\//i.test(trimmed)
    const finalUrl = isValid ? trimmed : `https://${trimmed}`

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: finalUrl, ...(external ? { target: "_blank" } : {}) })
      .run()

    setOpen(false)
  }

  const positioning = position
    ? {
        strategy: "fixed" as const,
        placement: "bottom-start" as const,
        gutter: 8,
        getAnchorRect: () => ({
          x: position.left,
          y: position.top,
          height: 0,
        }),
      }
    : undefined

  return (
    <PopoverRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={positioning}
      ids={{ trigger: triggerId }}
    >
      <Tooltip content="Insert Link" ids={{ trigger: triggerId }}>
        <PopoverTrigger asChild>
          <IconButton
            ref={ref}
            size="2xs"
            aria-label="Insert Link"
            onClick={handleOpen}
            variant={editor.isActive("link") ? "subtle" : "ghost"}
            {...props}
          >
            <LuLink />
          </IconButton>
        </PopoverTrigger>
      </Tooltip>
      <Portal>
        <PopoverContent p="3" minW="280px">
          <PopoverBody>
            <Text fontWeight="medium" mb="2">
              Insert Link
            </Text>
            <Input
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              size="sm"
              mb="3"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApply()
              }}
              autoFocus
            />
            <HStack mb="4" align="center">
              <Switch.Root
                checked={external}
                onCheckedChange={(e) => setExternal(e.checked)}
                size="sm"
              >
                <Switch.HiddenInput />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Open in new tab</Switch.Label>
              </Switch.Root>
            </HStack>
            <HStack justify="flex-end" gap="2">
              <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleApply}>
                Apply
              </Button>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </PopoverRoot>
  )
})

function InsertImageControl() {
  const { editor } = useRichTextEditorContext()
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  if (!editor) return null

  return (
    <>
      <Control.ButtonControl
        icon={<LuImage />}
        label="Insert Image"
        onClick={() => setOpen(true)}
        variant="ghost"
      />

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Trigger asChild />
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="lg">
              <Dialog.Header>
                <Dialog.Title>Insert Image</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Tabs.Root defaultValue="url">
                  <Tabs.List>
                    <Tabs.Trigger value="url">
                      <LuLink /> Embed URL
                    </Tabs.Trigger>
                    <Tabs.Trigger value="upload">
                      <LuUpload /> Upload File
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="url">
                    <Box display="flex" gap="2" mt="4">
                      <Input
                        placeholder="Enter image URL"
                        id="image-url-input"
                      />
                      <Button
                        onClick={() => {
                          const url = (
                            document.getElementById(
                              "image-url-input",
                            ) as HTMLInputElement
                          ).value
                          if (url) {
                            editor.chain().focus().setImage({ src: url }).run()
                            setOpen(false)
                          }
                        }}
                      >
                        Insert
                      </Button>
                    </Box>
                  </Tabs.Content>

                  <Tabs.Content value="upload">
                    <FileUpload.Root
                      maxW="xl"
                      alignItems="stretch"
                      maxFiles={1}
                      accept="image/*"
                      onFileAccept={(accepted) => {
                        const uploaded = accepted.files ?? []
                        setFiles(uploaded)

                        if (uploaded[0]) {
                          const url = URL.createObjectURL(uploaded[0])
                          editor.chain().focus().setImage({ src: url }).run()
                          setOpen(false)
                        }
                      }}
                    >
                      <FileUpload.HiddenInput />
                      <FileUpload.Dropzone>
                        <Icon size="md" color="fg.muted">
                          <LuUpload />
                        </Icon>
                        <FileUpload.DropzoneContent>
                          <Box>Drag and drop a file here</Box>
                          <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                        </FileUpload.DropzoneContent>
                      </FileUpload.Dropzone>

                      <FileUpload.List files={files} />
                    </FileUpload.Root>
                  </Tabs.Content>
                </Tabs.Root>
              </Dialog.Body>

              <Dialog.Footer mt="4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, "") // remove leading/trailing dashes
}

const HeadingWithSlug = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("id"),
        renderHTML: (attributes) => ({
          id: attributes.id,
        }),
      },
    }
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (_transactions, _oldState, newState) => {
          const tr = newState.tr
          let modified = false

          newState.doc.descendants((node, pos) => {
            if (node.type.name === "heading") {
              const text = node.textContent
              const slug = slugify(text)
              if (node.attrs.id !== slug) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  id: slug,
                })
                modified = true
              }
            }
          })

          return modified ? tr : null
        },
      }),
    ]
  },
})

const editorContent = `
      <h1 id="heading-0">Legend Of X: The Complete Saga</h1>
      <p>In a world where technology and humanity collide, the fate of civilization hangs in the balance. This is the story of those who dared to question everything they knew.</p>

      <h2 id="heading-1">Chapter 1: Awakening</h2>
      <p>The city of <a href="https://example.com">Neo-Tokyo</a> stretched endlessly beneath the artificial sky. Maya Tanaka stood at the edge of the observation deck, watching the streams of data flow through the neural network that powered the megacity. She had always believed the System was infallible, that the Architects who built it had created a perfect world.</p>
      <p>But something was wrong. The anomalies in the code were becoming more frequent, more deliberate. Someone—or something—was trying to break through.</p>

      <h3 id="heading-2">Part 1: The First Glitch</h3>
      <p>It started with small things. A flicker in the holographic displays. A delay in the transportation grid. Messages that appeared and disappeared before anyone could read them. Maya had noticed these irregularities for weeks, but she was afraid to report them. In Neo-Tokyo, questioning the System was considered treason.</p>
      <p>One evening, as she worked late in the Neural Operations Center, the main screen went black. Then, slowly, text began to appear: "They are watching. They have always been watching. Find the Archive before it's too late."</p>
      <h3 id="heading-3">Part 2: The Underground</h3>
      <p>The next day, Maya received an encrypted message directing her to an abandoned sector of the city. She knew it was dangerous, but curiosity overwhelmed her caution. The meeting place was a decrepit building, its walls covered in graffiti that depicted symbols she didn't recognize.</p>
      <p>Inside, she found a group of people huddled around old terminals. They called themselves the Disconnected—those who had rejected the neural implants that connected everyone to the System. Their leader, a man named Kenzo, explained that the glitches were intentional.</p>
      <p>"We're trying to wake people up," he said. "The System isn't what you think it is. The Architects didn't save humanity—they enslaved it."</p>
      <h2 id="heading-4">Chapter 2: The Archive</h2>
      <p>Maya's decision to join the Disconnected changed everything. Kenzo taught her how to navigate the hidden layers of the System, the forgotten protocols and backdoors that the Architects thought they had sealed. Together, they began their search for the Archive.</p>
      <p>The journey took them through the darkest corners of Neo-Tokyo. They encountered other groups of rebels, each with their own theories about what the Archive contained. Some believed it held the key to shutting down the System entirely. Others thought it was a weapon that could be used to take control.</p>
      <h3 id="heading-5">Part 3: Revelations</h3>
      <p>After months of searching, they found it. The Archive wasn't a physical location—it was a fragment of code hidden in the deepest layer of the System, protected by encryption so complex that even the Architects had lost access to it.</p>
      <p>When Maya finally broke through the encryption, what she found shocked her. The Archive contained memories—thousands of them, uploaded from the minds of people who had lived before the Great Collapse. They revealed a truth that the Architects had hidden: the Collapse had been engineered.</p>
      <p>The Architects had created the disaster that destroyed the old world so they could rebuild it in their image. And now, they were planning to do it again.</p>
      <h2 id="heading-6">Chapter 3: Resistance</h2>
      <p>Armed with the truth, Maya and the Disconnected began spreading the Archive's contents throughout the city. The response was immediate. Some people refused to believe it, clinging to their faith in the System. Others joined the resistance, ready to fight for their freedom.</p>
      <p>The Architects responded with force. Security drones filled the streets, hunting down anyone suspected of accessing the Archive. The city descended into chaos as the battle between the Disconnected and the System's defenders intensified.</p>
      <h3 id="heading-7">Part 4: The Final Stand</h3>
      <p>Maya knew they couldn't win through violence alone. The System was too powerful, too entrenched. Instead, she devised a plan to use the Archive itself as a weapon. If they could upload its contents directly into the neural network, everyone connected to the System would see the truth simultaneously.</p>
      <p>The operation was risky. It required infiltrating the Central Node, the heart of the System's infrastructure. Many of the Disconnected would have to sacrifice themselves to create a distraction. But it was their only chance.</p>
      <p>As Maya stood before the Central Node's interface, her fingers trembling over the controls, she thought about all the lives that had been lost, all the lies that had been told. With one final command, she initiated the upload.</p>
      <h2 id="heading-8">Epilogue: A New Beginning</h2>
      <p>The System didn't collapse overnight. But once people knew the truth, they began to question, to resist, to rebuild. Maya watched from a rooftop as the artificial sky flickered and went dark for the first time in decades, revealing the stars above.</p>
      <p>The world would never be perfect. But it would be real. And that, she thought, was worth fighting for.</p>
    `

const menuItems = [
  {
    label: "File",
    items: [
      { label: "New", icon: <LuPlus /> },
      { label: "Open", icon: <LuFolder /> },
      { label: "Make a copy", icon: <LuCopy /> },
      { label: "Download", icon: <LuDownload /> },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", icon: <LuArrowRight /> },
      { label: "Redo", icon: <LuArrowRight /> },
      { label: "Cut", icon: <LuSettings /> },
      { label: "Copy", icon: <LuCopy /> },
      { label: "Paste", icon: <LuArrowRight /> },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Zoom in", icon: <LuArrowRight /> },
      { label: "Zoom out", icon: <LuArrowRight /> },
      { label: "Full screen", icon: <LuSettings /> },
    ],
  },
  {
    label: "Insert",
    items: [
      { label: "Image", icon: <LuPlus /> },
      { label: "Table", icon: <LuSettings /> },
      { label: "Drawing", icon: <LuFolder /> },
    ],
  },
  {
    label: "Format",
    items: [
      { label: "Bold", icon: <LuSettings /> },
      { label: "Italic", icon: <LuSettings /> },
      { label: "Underline", icon: <LuSettings /> },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Spelling", icon: <LuSettings /> },
      { label: "Word count", icon: <LuSettings /> },
    ],
  },
  {
    label: "Extensions",
    items: [
      { label: "Add-ons", icon: <LuSettings /> },
      { label: "Apps Script", icon: <LuSettings /> },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Docs Help", icon: <LuCircleHelp /> },
      { label: "Keyboard shortcuts", icon: <LuSettings /> },
    ],
  },
]

```

## Guides

### Adding controls

`RichTextEditor` ships with a set of built-in controls that can be composed
inside `RichTextEditor.ControlGroup`.

```jsx
import { Control } from "@/components/ui/rich-text-editor"
```

```jsx
<RichTextEditor.ControlGroup>
  <Control.Bold />
  <Control.Italic />
  <Control.Strike />
</RichTextEditor.ControlGroup>
```

### Customizing Content Padding

The editor uses CSS custom properties for content padding:

```tsx
<RichTextEditor.Root
  editor={editor}
  css={{
    "--content-padding-x": "spacing.8",
    "--content-padding-y": "spacing.6",
    "--content-min-height": "sizes.96",
  }}
>
  <RichTextEditor.Content />
</RichTextEditor.Root>
```

### Custom Controls

The `RichTextEditor` provides three factory functions for creating custom
controls that integrate seamlessly with the editor: `createBooleanControl`,
`createSelectControl`, and `createSwatchControl`.

**Boolean Controls**

Boolean controls toggle editor states (bold, italic, etc.) and are the most
common control type:

```tsx
import { createBooleanControl } from "@/components/ui/rich-text-editor"
import { LuSparkles } from "react-icons/lu"

export const CustomHighlight = createBooleanControl({
  label: "Highlight Important",
  icon: LuSparkles,
  command: (editor) => {
    editor
      .chain()
      .focus()
      .toggleMark("textStyle", {
        backgroundColor: "#fef08a",
        fontWeight: "bold"
      })
      .run()
  },
  getVariant: (editor) => {
    const attrs = editor.getAttributes("textStyle")
    return attrs.backgroundColor === "#fef08a" ? "subtle" : "ghost"
  },
  isDisabled: (editor) => !editor.can().toggleMark("textStyle")
})

// Use it in your toolbar
<RichTextEditor.ControlGroup>
  <CustomHighlight />
</RichTextEditor.ControlGroup>
```

**Select Controls**

Select controls provide dropdown menus for choosing between multiple options:

```tsx
import { createSelectControl } from "@/components/ui/rich-text-editor"

export const LineHeight = createSelectControl({
  label: "Line Height",
  width: "100px",
  placeholder: "Normal",
  options: [
    { value: "normal", label: "Normal" },
    { value: "1.5", label: "1.5" },
    { value: "2", label: "Double" },
    { value: "2.5", label: "2.5" },
  ],
  getValue: (editor) => {
    return editor.getAttributes("textStyle")?.lineHeight || "normal"
  },
  command: (editor, value) => {
    if (value === "normal") {
      editor.chain().focus().unsetMark("textStyle").run()
    } else {
      editor.chain().focus().setMark("textStyle", { lineHeight: value }).run()
    }
  },
  renderValue: (value, option) => {
    return <Box fontWeight="medium">{option?.label || "Normal"}</Box>
  },
})
```

**Swatch Controls**

Swatch controls provide color picker interfaces with predefined color swatches:

```tsx
import { createSwatchControl } from "@/components/ui/rich-text-editor"
import { LuPaintbrush } from "react-icons/lu"

export const BackgroundColor = createSwatchControl({
  label: "Background Color",
  icon: LuPaintbrush,
  swatches: [
    { value: "#fef3c7", color: "#fef3c7", label: "Yellow" },
    { value: "#dbeafe", color: "#dbeafe", label: "Blue" },
    { value: "#dcfce7", color: "#dcfce7", label: "Green" },
    { value: "#fce7f3", color: "#fce7f3", label: "Pink" },
  ],
  getValue: (editor) => {
    return editor.getAttributes("textStyle")?.backgroundColor || ""
  },
  command: (editor, color) => {
    editor
      .chain()
      .focus()
      .setMark("textStyle", { backgroundColor: color })
      .run()
  },
  getProps: (editor) => ({
    variant: editor.getAttributes("textStyle")?.backgroundColor
      ? "subtle"
      : "ghost",
  }),
  showRemove: true,
  onRemove: (editor) => {
    editor
      .chain()
      .focus()
      .updateAttributes("textStyle", { backgroundColor: null })
      .run()
  },
})
```