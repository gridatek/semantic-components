# @semantic-components/ui/editor

Rich text editor components built on Tiptap: an entry point of `@semantic-components/ui`, with Tiptap as its optional peers.

## Contents

- **Core** (`@semantic-components/ui/editor`): Editor (a Signal Forms control; HTML, JSON or text), content, one command part by name (`scEditorCommand="bold"`: marks, lists and task lists, blockquote, code block, horizontal rule, clear formatting, undo/redo) beside the library's `scToggle` in its `scToolbar`, link, the block in use (`scEditorBlock`: for your own paragraph/heading/list menu), word/char count and character limit, `scEditorView`, `provideEditor`
- **Features**, each an entry point with its own Tiptap package: `/tables`, `/images`, `/search`, `/highlight`, `/scripts` (superscript and subscript), `/align`, `/markdown`, `/bubble-menu` (the floating toolbar)
- **Styles**: your style's `editor.css` (`@semantic-components/styles/<style>/editor.css`), the document a Typeset container

## Usage

```ts
import { ScToggle, ScToolbar, ScToolbarWidget } from '@semantic-components/ui';
import { ScEditor, ScEditorCommand, ScEditorContent, provideEditor } from '@semantic-components/ui/editor';
import { ScEditorTable, withTables } from '@semantic-components/ui/editor/tables';
```

See [the editor's README](src/lib/components/editor/README.md).
