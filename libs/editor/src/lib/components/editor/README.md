# Editor

A composable rich text editor built on [Tiptap](https://tiptap.dev/) (ProseMirror): the document is HTML, edited through Signal Forms; a toolbar of toggles, counts, and nothing you don't write.

You write the markup and every piece of text — the toolbar, its icons and names, the editor's name and placeholder, the heading labels, the link form; the parts add the behaviour, ARIA and default styles.

## Installation

```bash
npm install @semantic-components/editor @tiptap/core @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-placeholder
```

## Usage

```html
<div scEditor [formField]="postForm.body" class="overflow-hidden rounded-lg border">
  <div scEditorToolbar aria-label="Formatting">
    <div scEditorToolbarGroup>
      <button scEditorBoldToggle value="bold">
        <svg siBoldIcon></svg>
        <span class="sr-only">Bold</span>
      </button>
      <button scEditorItalicToggle value="italic">
        <svg siItalicIcon></svg>
        <span class="sr-only">Italic</span>
      </button>
    </div>
  </div>

  <div scEditorContent ariaLabel="Post" placeholder="Write something…"></div>

  <div scEditorFooter>
    <div scEditorCount>
      <span scEditorWordCount #words="scEditorWordCount">{{ words.wordCount() }} words</span>
    </div>
  </div>
</div>
```

```ts
readonly postForm = form(signal({ body: '' }), (path) => {
  required(path.body, { message: 'Write something.' });
});
```

- **The value** is the document's HTML (`''` when it's empty), in the form.
- **Disabled and read-only** come from the schema (`disabled(path.body)`, `readonly(path.body)`), and can change at any time.
- **Errors**: put the editor in a `scField` with `scFieldErrors` — once it's left invalid, the document gets `aria-invalid` and is described by the errors.

## Parts

| Part                                        | Selector                                     | Does                                                                                                                              |
| ------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `ScEditor`                                  | `[scEditor]`                                 | The document and its commands; a Signal Forms control (`exportAs: 'scEditor'`). `data-disabled`, `data-readonly`, `data-invalid`. |
| `ScEditorContent`                           | `div[scEditorContent]`                       | Where it's written: a multi-line `textbox`. `ariaLabel` (name it — no default), `placeholder` (none by default).                  |
| `ScEditorToolbar`, `ScEditorToolbarGroup`   | `div[scEditorToolbar]`, `div[…Group]`        | The toolbar: one tab stop, arrow keys between its buttons. Name it (`aria-label`).                                                |
| `ScEditorBoldToggle` … (see below)          | `button[scEditor…Toggle]`                    | A command; `aria-pressed` when its format is on. Write its icon and name it.                                                      |
| `ScEditorHeading`                           | `button[scEditorHeading]`                    | The block type: `level()` (`'p'`, `'h1'`…`'h6'`), `select(level)` — the trigger of your menu, with your labels.                   |
| `ScEditorLinkToggle`                        | `button[scEditorLinkToggle]`                 | Pressed inside a link; the trigger of your link form (a popover), which calls the editor's `setLink(href)` / `unsetLink()`.       |
| `ScEditorSeparator`                         | `div[scEditorSeparator]`                     | Between toolbar groups.                                                                                                           |
| `ScEditorHeader`, `ScEditorFooter`          | `div[scEditorHeader]`, `div[scEditorFooter]` | Above and below the document.                                                                                                     |
| `ScEditorCount`, `…WordCount`, `…CharCount` | `div[scEditorCount]`, `span[…]`              | `wordCount()`, `charCount()` (`exportAs`) — write the text around them.                                                           |

The toggles: `Bold`, `Italic`, `Underline`, `Strikethrough`, `Code`, `BulletList`, `NumberedList`, `Blockquote`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify`, `HorizontalRule`, `ClearFormatting`, `Undo`, `Redo` (disabled when there is nothing to undo / redo). All are disabled when the editor is disabled or read-only.

## `scEditor`

- **Set by `[formField]`**: `value` (the HTML), `disabled`, `readonly`, `invalid`, `touched`; `touch` fires when the document loses focus.
- **State**: `isActive(name, attributes?)` — a mark or node at the selection (`'bold'`, `'link'`, `'heading', { level: 2 }`…); `alignment()`, `heading()`, `linkHref()`; `editable()`.
- **Commands**: `run((chain) => chain.toggleBold())` — any Tiptap command, on the focused document; `can((chain) => chain.undo())`.
- **Links**: `setLink(href, text?)` — links the selection, or writes `text` (or the address) as a link where nothing is selected; `unsetLink()`. Addresses with unsafe protocols (`javascript:`…) aren't rendered as links.
- **Tiptap**: `editorInstance()` for anything else.

## A link form

```html
<div scPopoverProvider [(open)]="linkOpen">
  <button scEditorLinkToggle scPopoverTrigger value="link" (click)="editLink(editor.linkHref())">
    <svg siLinkIcon></svg>
    <span class="sr-only">Link</span>
  </button>
  <ng-template scPopoverPortal>
    <div scPopover>
      <div scField>
        <label scLabel>Address</label>
        <input scInput type="url" [formField]="linkForm.href" />
      </div>
      <button scButton type="button" (click)="editor.setLink(linkForm.href().value()); linkOpen.set(false)">Apply</button>
    </div>
  </ng-template>
</div>
```

`#editor="scEditor"` on the root. Opening the form keeps the selection: the link goes where it was.

## Keyboard

Tiptap's shortcuts: **Ctrl / ⌘ + B** bold, **I** italic, **U** underline, **E** inline code, **Z** undo, **Shift+Z** or **Y** redo. In the toolbar, **← / →** move between buttons and **Tab** leaves it.

## Styling

The document has `block outline-none overflow-y-auto min-h-[150px] max-h-[400px] p-4 prose prose-sm max-w-none dark:prose-invert`; a `class` on `scEditorContent` changes it (`min-h-[300px] max-h-[500px]`, `font-serif`…). The editor's theme uses `--border`, `--muted`, `--muted-foreground` and `--primary`.

## Accessibility

- The document is a multi-line `textbox` named by `ariaLabel`; `aria-readonly` / `aria-disabled` / `aria-invalid` follow the form, and the field's description and errors describe it.
- The toolbar is one tab stop (`@angular/aria` toolbar); toggles have `aria-pressed`.
- The library adds no text: name everything you write.
