# Code Editor

Code to edit: [CodeMirror 6](https://codemirror.net), colored by the app's highlighter — Shiki, through `provideCodeHighlighter()` — so it has the same colors as the [code block](../code-block/README.md) and the diff viewer. Undo, indentation from the keyboard, line numbers, the current line; a `[formField]` (`string`). `@codemirror/view`, `state`, `commands` and `language` are peers of this library.

## Usage

Put it in a code block for its frame, title and copy button:

```html
<div scCodeBlock>
  <div scCodeBlockHeader>
    <div scCodeBlockTitle>counter.ts</div>
  </div>
  <div scCodeEditorNext aria-label="counter.ts" language="typescript" class="max-h-80" [(value)]="code"></div>
</div>
```

In a field, its label names it:

```html
<div scField>
  <label scLabel>Query</label>
  <div scCodeBlock>
    <div scCodeEditorNext language="sql" class="h-32" [formField]="form.sql"></div>
  </div>
  <p scFieldDescription>Escape, then Tab, moves on.</p>
</div>
```

The code block's frame shows the editor's focus ring, and its invalid state once touched. Size it with a height (`h-32`) or a maximum (`max-h-80`, it then scrolls).

## Keyboard

| Key                   | Does                                              |
| --------------------- | ------------------------------------------------- |
| Tab / Shift+Tab       | Indent / outdent the line, or every selected line |
| Enter                 | A new line, keeping the indentation               |
| Ctrl/⌘+Z, Ctrl/⌘+Y    | Undo, redo                                        |
| Escape, then Tab      | Moves focus on (Tab otherwise indents)            |
| Ctrl+M (⇧⌥M on macOS) | Tab moves focus until pressed again               |

## The Shiki bridge

`shikiHighlighting(highlighter, language)` is a CodeMirror extension: after each pause in typing, the whole text is highlighted by the highlighter, its tokens painted as decorations — moved along with the edits until the next answer. The editor adds it when the app provides a highlighter; it can also be used in any CodeMirror editor.

Shiki only colors. CodeMirror's syntax-aware features — indentation by syntax, bracket matching, folding — come from its own language packages: add them through `extensions` (`[javascript()]` from `@codemirror/lang-javascript`), with search, autocompletion and the rest.

## API

### ScCodeEditorNext — `div[scCodeEditorNext]`, `#editor="scCodeEditorNext"`

| Input                   | Type             | Default           |
| ----------------------- | ---------------- | ----------------- |
| `value`                 | `string` (model) | `''`              |
| `language`              | `string`         | `'plaintext'`     |
| `lineNumbers`           | `boolean`        | `true`            |
| `wrap`                  | `boolean`        | `false`           |
| `tabSize`               | `number`         | `2`               |
| `placeholder`           | `string`         | `''`              |
| `readonly` / `disabled` | `boolean`        | `false`           |
| `invalid` / `touched`   | `boolean`        | `false`           |
| `aria-label`            | `string`         | the field's label |
| `extensions`            | `Extension[]`    | `[]`              |

| Output  | When                                          |
| ------- | --------------------------------------------- |
| `touch` | Focus left it (Signal Forms marks it touched) |

| Member    | Description                 |
| --------- | --------------------------- |
| `view`    | The CodeMirror `EditorView` |
| `focus()` | Focus in the editor         |

## Accessibility

- The content is a `textbox` (`aria-multiline`), named by its field's label or `aria-label`, described by the field's description; `aria-invalid`, `aria-readonly`, `aria-disabled`.
- Tab indents — Escape then Tab leaves, so the keyboard is never trapped; say so in a description.
