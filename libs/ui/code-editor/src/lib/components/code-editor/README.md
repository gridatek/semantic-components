# Code Editor

Code to edit: [CodeMirror 6](https://codemirror.net), its language loaded by name and colored like the [code block](../code-block/README.md). Undo, indentation from the keyboard and by syntax, matching brackets, line numbers, the current line; a `[formField]` (`string`). `@codemirror/view`, `state`, `commands`, `language`, `language-data` and `@lezer/highlight` are peers of this library.

## Usage

Put it in a code block for its frame, title and copy button:

```html
<div scCodeBlock>
  <div scCodeBlockHeader>
    <div scCodeBlockTitle>counter.ts</div>
  </div>
  <div scCodeEditor aria-label="counter.ts" language="typescript" class="max-h-80" [(value)]="code"></div>
</div>
```

In a field, its label names it:

```html
<div scField>
  <label scLabel>Query</label>
  <div scCodeBlock>
    <div scCodeEditor language="sql" class="h-32" [formField]="form.sql"></div>
  </div>
  <p scFieldDescription>Escape, then Tab, moves on.</p>
</div>
```

The code block's frame shows the editor's focus ring, and its invalid state once touched. Size it with a height (`h-32`) or a maximum (`max-h-80`, it then scrolls).

## Keyboard

| Key                   | Does                                              |
| --------------------- | ------------------------------------------------- |
| Tab / Shift+Tab       | Indent / outdent the line, or every selected line |
| Enter                 | A new line, indented by the syntax                |
| Ctrl/⌘+Z, Ctrl/⌘+Y    | Undo, redo                                        |
| Escape, then Tab      | Moves focus on (Tab otherwise indents)            |
| Ctrl+M (⇧⌥M on macOS) | Tab moves focus until pressed again               |

## Languages

`language` is a name or alias from [`@codemirror/language-data`](https://github.com/codemirror/language-data) — `typescript` (`ts`), `javascript`, `html`, `css`, `json`, `python`, `sql`, `markdown`, `yaml` and about 150 more, case aside. Each one loads the first time it is shown; until then, and for a name it doesn't know (`plaintext`), the code shows plain. A language gives:

- **Colors**: the code block's — GitHub light (high contrast), GitHub dark under `.dark`. No highlighter to provide.
- **Structure**: Enter indents by the syntax, a closing bracket typed outdents its line (`indentOnInput`), the bracket at the cursor and its match are marked.

A language of yours (a `LanguageSupport`) goes in `extensions`, with search, autocompletion and the rest.

## API

### ScCodeEditor — `div[scCodeEditor]`, `#editor="scCodeEditor"`

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
