# @semantic-components/editor

Rich text editor components built on top of Tiptap for the Semantic Components library.

## Contents

- **Core** (`@semantic-components/editor`): Editor (a Signal Forms control; HTML, JSON or text), content, toolbar, command buttons (bold, italic, underline, strikethrough, code, lists and task lists, blockquote, code block, horizontal rule, clear formatting, undo/redo, link), heading and list menus, word/char count and character limit, `scEditorView`, `provideEditor`
- **Features**, each an entry point with its own Tiptap package: `/tables`, `/images`, `/search`, `/highlight`, `/scripts` (superscript and subscript), `/align`, `/markdown`, `/bubble-menu` (the floating toolbar)
- **Styles**: ProseMirror editor styles

## Usage

```ts
import { ScEditor, ScEditorBold, ScEditorContent, ScEditorToolbar, provideEditor } from '@semantic-components/editor';
import { ScEditorTable, withTables } from '@semantic-components/editor/tables';
```

See [the editor's README](src/lib/components/editor/README.md).
