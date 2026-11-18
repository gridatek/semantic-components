# Editor

A composable rich text editor built on [Tiptap](https://tiptap.dev/) (ProseMirror): the document is HTML, edited through Signal Forms. Its full demo follows Tiptap's [Simple Editor](https://tiptap.dev/docs/ui-components/templates/simple-editor) template — block types, lists with task lists, code blocks, marks, highlights, links, superscript and subscript, alignment, images, search and replace — in this library's styles.

You write the markup and every piece of text — the toolbar, its icons and names, the editor's name and placeholder, the menu labels, the popovers, the search bar; the parts add the behaviour, ARIA and default styles.

## Installation

An entry point of ui, `@semantic-components/ui/editor`, with Tiptap as optional peers of ui: install them where you use the editor.

```bash
npm install @tiptap/core @tiptap/pm @tiptap/starter-kit
```

Then its styles, in your `styles.css` — your style's, after Typeset's (the editor's document is a Typeset container):

```css
@import '@semantic-components/styles/typeset.css';
@import '@semantic-components/styles/nova/typeset-variables.css';
@import '@semantic-components/styles/nova/editor.css';
```

That is the core: text, headings, lists and task lists, quotes, code blocks, links, undo and redo, the counts and `scEditorView`, in HTML, JSON or text. Everything else is a [feature](#features), with its own package.

These are the packages of Tiptap's own [install](https://tiptap.dev/docs/editor/getting-started/install/vanilla-javascript). The core also uses `@tiptap/extensions` and `@tiptap/extension-list` (peer dependencies): `@tiptap/starter-kit` brings both.

## Features

Each feature is an entry point of its own, with its own Tiptap package (an optional peer dependency): install it, import it and provide it only when you use it — a simple editor installs no table, search or Markdown code.

```bash
npm install @tiptap/extension-superscript @tiptap/extension-subscript @tiptap/markdown
```

```ts
import { Component, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScToggle, ScToolbar, ScToolbarWidget, ScToolbarWidgetGroup } from '@semantic-components/ui';
import { ScEditor, ScEditorCommand, ScEditorContent, provideEditor } from '@semantic-components/ui/editor';
import { withMarkdown } from '@semantic-components/ui/editor/markdown';
import { withScripts } from '@semantic-components/ui/editor/scripts';
import { SiBoldIcon, SiSubscriptIcon, SiSuperscriptIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-note-editor',
  imports: [FormField, ScEditor, ScEditorCommand, ScEditorContent, ScToggle, ScToolbar, ScToolbarWidget, ScToolbarWidgetGroup, SiBoldIcon, SiSubscriptIcon, SiSuperscriptIcon],
  // The features of the editors in this component.
  providers: [provideEditor(withScripts(), withMarkdown())],
  template: `
    <div scEditor [formField]="noteForm.body" format="markdown">
      <div scToolbar aria-label="Formatting">
        <div scToolbarWidgetGroup>
          <button scToolbarWidget scToggle scEditorCommand="bold">
            <svg siBoldIcon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scToolbarWidget scToggle scEditorCommand="superscript">
            <svg siSuperscriptIcon></svg>
            <span class="sr-only">Superscript</span>
          </button>
          <button scToolbarWidget scToggle scEditorCommand="subscript">
            <svg siSubscriptIcon></svg>
            <span class="sr-only">Subscript</span>
          </button>
        </div>
      </div>
      <div scEditorContent ariaLabel="Note"></div>
    </div>
  `,
})
export class NoteEditor {
  readonly noteForm = form(signal({ body: '' }));
}
```

| Entry point                                  | Provide                                               | Parts                                                                     | Package                                                        |
| -------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `@semantic-components/ui/editor/tables`      | `withTables()`                                        | `scEditorTable`                                                           | `@tiptap/extension-table`                                      |
| `@semantic-components/ui/editor/images`      | `withImages()`                                        | `scEditorUploads`, `scEditorImage`; drop, paste                           | `@tiptap/extension-image`, `@tiptap/extension-file-handler`    |
| `@semantic-components/ui/editor/search`      | `withSearch()`                                        | `scEditorSearchBar` (`[(open)]`) and its parts; **Ctrl / ⌘ + F**          | `@tiptap/extension-find-and-replace`                           |
| `@semantic-components/ui/editor/highlight`   | `withHighlight()`                                     | `scEditorHighlight`, `scEditorHighlightColor`, `scEditorRemoveHighlight`  | `@tiptap/extension-highlight`                                  |
| `@semantic-components/ui/editor/scripts`     | `withScripts()`                                       | the commands `superscript`, `subscript`                                   | `@tiptap/extension-superscript`, `@tiptap/extension-subscript` |
| `@semantic-components/ui/editor/align`       | `withAlign()`                                         | the commands `align-left`, `align-center`, `align-right`, `align-justify` | `@tiptap/extension-text-align`                                 |
| `@semantic-components/ui/editor/markdown`    | `withMarkdown()`                                      | `format="markdown"`                                                       | `@tiptap/markdown`                                             |
| `@semantic-components/ui/editor/bubble-menu` | none (`scEditorBubbleMenu` adds itself to the editor) | `scEditorBubbleMenu`                                                      | `@tiptap/extension-bubble-menu`                                |

- **Provided, not found from the buttons**: the document's schema is set when the editor starts, and a saved document can hold a table with no table button in sight — without `withTables()` it would be dropped. `provideEditor` goes in a component's `providers` (or the app's); the editors and `scEditorView`s below read it.
- **The same features for the editor and the display**, so they hold the same documents.
- **A part without its feature** warns in development: `scEditorTable needs withTables() in provideEditor(…)`. `format="markdown"` without `withMarkdown()` throws.
- **The floating toolbar** needs no provider: `scEditorBubbleMenu` adds itself to the editor.

### Your own extensions

`withExtensions(...)` adds any Tiptap extension — a mention, an embed, your own node — to the document, for the editor and `scEditorView`; run its commands with the editor's `run`:

```ts
import Mention from '@tiptap/extension-mention';

providers: [provideEditor(withTables(), withExtensions(Mention.configure({ suggestion })))];
```

A feature is an `ScEditorFeature` — `content` (what the document holds), `behaviour` (what only the editor does, given the `ScEditor`), `markdown` — so a feature of your own can be written as the library's are.

### Loading

The features are loaded with the editor, not on their own: a feature's package is small next to what every editor needs (`@tiptap/core`, ProseMirror, `@tiptap/starter-kit`), and loading it later would make the editor and `scEditorView` wait before showing a document. To keep the editor out of a page's first load, load the component that holds it lazily — everything, Tiptap's core too, is then split off:

```html
@defer (on viewport) {
<app-note-editor />
} @placeholder {
<div class="h-40 rounded-lg border"></div>
}
```

A lazy route (`loadComponent`) does the same for a page with an editor.

## Usage

```html
<div scEditor [formField]="postForm.body" class="flex flex-col gap-2">
  <div scToolbar aria-label="Formatting">
    <div scToolbarWidgetGroup>
      <button scToolbarWidget scToggle scEditorCommand="bold">
        <svg siBoldIcon></svg>
        <span class="sr-only">Bold</span>
      </button>
      <button scToolbarWidget scToggle scEditorCommand="italic">
        <svg siItalicIcon></svg>
        <span class="sr-only">Italic</span>
      </button>
    </div>
  </div>

  <div scFrame scEditorContent ariaLabel="Post" placeholder="Write something…"></div>

  <div scEditorCount class="text-muted-foreground text-xs">
    <span scEditorWordCount #words="scEditorWordCount">{{ words.wordCount() }} words</span>
  </div>
</div>
```

The editor's parts are behaviour; the look is yours, from the library's other parts: the toolbar is `scToolbar` (one Tab stop, arrow keys, its groups and separators), each command sits beside `scToggle` (in a toolbar: all the same size) or `scButton`, the document in a `scFrame` — or any layout, any box.

```html

```

```ts
readonly postForm = form(signal({ body: '' }), (path) => {
  required(path.body, { message: 'Write something.' });
});
```

- **The value** is the document's HTML (`''` when it's empty) — or Tiptap's JSON or plain text, with `format` (see [Formats](#formats)). Setting it from outside (a reset, a load) isn't a change to undo.
- **Disabled and read-only** come from the schema (`disabled(path.body)`, `readonly(path.body)`), and can change at any time.
- **Errors**: put the editor in a `scField` with `scFieldErrors` — once it's left invalid, the document gets `aria-invalid` and is described by the errors.

## Parts

| Part                                        | Selector                                      | Does                                                                                                                                                                                                                                                                    |
| ------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScEditor`                                  | `[scEditor]`                                  | The document and its commands; a Signal Forms control (`exportAs: 'scEditor'`). `data-disabled`, `data-readonly`, `data-invalid`.                                                                                                                                       |
| `ScEditorContent`                           | `div[scEditorContent]`                        | Where it's written: a multi-line `textbox`. `ariaLabel` (name it — no default), `placeholder` (none by default), `layout` (`default` or `page`, see [Styling](#styling)).                                                                                               |
| `ScEditorCommand`                           | `button[scEditorCommand]`                     | Runs a command by name — `scEditorCommand="bold"` (see below). Behaviour only: beside `scToggle` in a toolbar (every command the same size) or `scButton`, and `scToolbarWidget`; pressed as the document says, disabled when it can't run. Write its icon and name it. |
| `ScEditorBlock`                             | `[scEditorBlock]`                             | The selection's block for a control of yours (a menu, a select): `value()` (`'paragraph'`, `'heading-1'`…`'heading-6'`, `'bullet-list'`, `'ordered-list'`, `'task-list'`, `'quote'`, `'code-block'`), `select(block)` (`exportAs`).                                     |
| `ScEditorTable` (`/tables`)                 | `button[scEditorTable]`                       | Tables: `select(action)`, `can(action)`, `inTable()` — a menu trigger, never pressed (see [Tables](#tables)).                                                                                                                                                           |
| `ScEditorBubbleMenu` (`/bubble-menu`)       | `div[scEditorBubbleMenu]`                     | A floating toolbar by the selected text (see [Floating toolbar](#floating-toolbar)).                                                                                                                                                                                    |
| `ScEditorLink`                              | `button[scEditorLink]`                        | Pressed inside a link; the trigger of your link popover: `href()`, `set(href, text?)`, `remove()` (`exportAs`).                                                                                                                                                         |
| `ScEditorHighlight` (`/highlight`)          | `button[scEditorHighlight]`                   | Pressed inside a highlight; the trigger of your highlight popover.                                                                                                                                                                                                      |
| `ScEditorHighlightColor` (`/highlight`)     | `button[scEditorHighlightColor]`              | A swatch in that popover: `[scEditorHighlightColor]="color"` highlights in it, or removes it; pressed when it's the colour. Name it.                                                                                                                                    |
| `ScEditorRemoveHighlight` (`/highlight`)    | `button[scEditorRemoveHighlight]`             | Removes the highlight (disabled when there is none).                                                                                                                                                                                                                    |
| `ScEditorUploads` (`/images`)               | `[scEditor][upload]`                          | The image uploads: `[upload]` on the editor, `imageTypes`, `uploads()`, `cancel(id)` (see [Images](#images)).                                                                                                                                                           |
| `ScEditorImage` (`/images`)                 | `button[scEditorImage]`                       | Picks images and uploads them with the editor's `[upload]` (disabled without one).                                                                                                                                                                                      |
| `ScEditorSearchBar` and its parts           | see [Search and replace](#search-and-replace) | The bar under the toolbar (`/search`).                                                                                                                                                                                                                                  |
| `ScEditorView`                              | `[scEditorView]`                              | Displays the editor's HTML in its styles, without an editor (see [Displaying the document](#displaying-the-document)).                                                                                                                                                  |
| `ScEditorCount`, `…WordCount`, `…CharCount` | `div[scEditorCount]`, `span[…]`               | `wordCount()`, `charCount()`, `limit()`, `remaining()` (`exportAs`) — write the text around them. `data-limit-reached` at the limit.                                                                                                                                    |

The commands, by name (`scEditorCommand="…"`, typed: a misspelt name doesn't compile):

| Commands                                                          | Pressed when                                               | From                         |
| ----------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------- |
| `bold`, `italic`, `underline`, `strikethrough`, `code`            | the mark is at the selection                               | core                         |
| `bullet-list`, `ordered-list`, `task-list`, `quote`, `code-block` | the selection is in it                                     | core                         |
| `horizontal-rule`, `clear-formatting`, `undo`, `redo`             | never (Undo and Redo disabled with nothing to undo / redo) | core                         |
| `align-left`, `align-center`, `align-right`, `align-justify`      | the paragraph has it                                       | `withAlign()` (`/align`)     |
| `superscript`, `subscript` (each turns the other off)             | the mark is at the selection                               | `withScripts()` (`/scripts`) |

A feature's commands are typed once its entry point is imported, and need it provided: in development, `scEditorCommand="align-center"` without `withAlign()` warns. The parts with behaviour of their own stay parts: the block (`scEditorBlock`), the link, the highlight, the image, the table, the search — see [Features](#features).

All are disabled when the editor is disabled or read-only — except `Search`, which read-only documents keep.

### One directive, by name

These were one directive each (`scEditorBold`, `scEditorUndo`… twenty of them), and before that `scEditorBoldToggle`… One directive with the command's name is one thing to learn, and a feature adds its commands without parts of its own:

- Whether it's pressed is the editor's to say: beside `scToggle`, a command with a state presses it as the document does, one without keeps it off.
- The name is typed (`ScEditorCommandName`): core's commands, and a feature's once its entry point is imported (`ScEditorCommands`, extended by module augmentation).

Their group is the Toolbar's `scToolbarWidgetGroup`, without a `value`: it groups them for the arrow keys; which are pressed — one alignment, any number of marks — is the document's to say, not the group's.

## `scEditor`

- **Set by `[formField]`**: `value` (in its `format`), `disabled`, `readonly`, `invalid`, `touched`; `touch` fires when the document loses focus.
  `scEditor` holds what the whole document has; each part holds its own state and commands, read through its `exportAs` — the block its `value()`, the link its `href()`, the counts theirs.

- **Inputs**: `format` (see [Formats](#formats)); `characterLimit` (see [Character limit](#character-limit)).
- **State**: `isActive(name, attributes?)` — a mark or node at the selection (`'bold'`, `'link'`, `'heading', { level: 2 }`…); `editable()`.
- **Commands**: `run((chain) => chain.toggleBold())` — any Tiptap command, on the focused document; `can((chain) => chain.undo())`.
- **For your own parts**: `editorInstance()`, the Tiptap editor; `contentVersion()`, which moves on with every change — read it in a `computed` that reads the document.

`run`, `can` and `editorInstance()` hand you Tiptap's own objects: they are the way out to anything the parts don't do, not the editor's API — what they give follows Tiptap.

## A block menu: text style and lists

`scEditorBlock` is the selection's block, for any control of yours — a menu, a select, toggles — with your labels and icons:

```html
<div scMenuProvider>
  <button scToolbarWidget scToggle scMenuTrigger scEditorBlock #block="scEditorBlock">
    {{ labels[block.value()] }}
    <svg siChevronDownIcon></svg>
  </button>
  <ng-template scMenuPortal>
    <div scMenu (itemSelected)="block.select($event)">
      <ng-template scMenuContent>
        <div scMenuItem value="paragraph">Normal text</div>
        <div scMenuItem value="heading-1">Heading 1</div>
        <div scMenuItem value="heading-2">Heading 2</div>
        <div scMenuItem value="bullet-list">Bullet list</div>
        <div scMenuItem value="ordered-list">Numbered list</div>
      </ng-template>
    </div>
  </ng-template>
</div>
```

`select(block)` takes the text out of the list or quote it's in first, so one menu goes from a list to a heading and back. A value that isn't a block (another item of the menu) is ignored. A task's checkbox is named by the task's text.

## Popovers: link and highlight

```html
<div scPopoverProvider [(open)]="linkOpen">
  <button scToolbarWidget scToggle scEditorLink scPopoverTrigger #link="scEditorLink" (click)="editLink(link.href())">
    <svg siLinkIcon></svg>
    <span class="sr-only">Link</span>
  </button>
  <ng-template scPopoverPortal>
    <div scPopover aria-label="Link">
      <div scField>
        <label scLabel>Address</label>
        <input scInput type="url" [formField]="linkForm.href" />
      </div>
      <button scButton type="button" (click)="link.set(linkForm.href().value()); linkOpen.set(false)">Apply</button>
    </div>
  </ng-template>
</div>

<div scPopoverProvider>
  <button scToolbarWidget scToggle scEditorHighlight scPopoverTrigger>
    <svg siHighlighterIcon></svg>
    <span class="sr-only">Highlight</span>
  </button>
  <ng-template scPopoverPortal>
    <div scPopover aria-label="Highlight colours" class="flex w-auto items-center gap-2 p-2">
      <button scEditorHighlightColor="var(--sc-editor-highlight-1)"><span class="sr-only">Yellow</span></button>
      <button scEditorHighlightColor="var(--sc-editor-highlight-2)"><span class="sr-only">Green</span></button>
      <button scEditorRemoveHighlight>
        <svg siBanIcon></svg>
        <span class="sr-only">Remove highlight</span>
      </button>
    </div>
  </ng-template>
</div>
```

A popover keeps the selection — still shown while it has focus — so the link or colour goes where it was. The editor's styles have five highlight colours, for light and dark: `var(--sc-editor-highlight-1)` to `var(--sc-editor-highlight-5)`; any CSS colour works.

## Images

`withImages()`, `ScEditorUploads` and `ScEditorImage`, from `@semantic-components/ui/editor/images`. `[upload]` on `scEditor` is `ScEditorUploads`: import it, and it uploads what is picked, dropped or pasted.

```ts
readonly upload: ScEditorUploadHandler = async (file, { onProgress, signal }) => {
  const { url } = await this.files.upload(file, { onProgress, signal });
  return url;
};
```

```html
<div scEditor [formField]="form.body" [upload]="upload" #images="scEditorUploads">
  …
  <button scToolbarWidget scToggle scEditorImage>
    <svg siImagePlusIcon></svg>
    <span class="sr-only">Add image</span>
  </button>
  … @for (upload of images.uploads(); track upload.id) {
  <div scProgress [value]="upload.progress * 100" [attr.aria-label]="'Uploading ' + upload.file.name"></div>
  }
</div>
```

The button picks files; dropping or pasting images does the same. Each is inserted where it was picked or dropped once its upload resolves, with the file's name (less its extension) as its `alt`. A rejected upload is dropped — report your errors in the handler.

## Tables

`withTables()` and `ScEditorTable`, from `@semantic-components/ui/editor/tables`.

```html
<div scMenuProvider>
  <button scToolbarWidget scToggle scMenuTrigger scEditorTable #table="scEditorTable">
    <svg siTable2Icon></svg>
    <span class="sr-only">Table</span>
  </button>
  <ng-template scMenuPortal>
    <div scMenu (itemSelected)="table.select($event)">
      <ng-template scMenuContent>
        @for (action of actions; track action) {
        <div scMenuItem [value]="action" [disabled]="!table.can(action)">{{ labels[action] }}</div>
        }
      </ng-template>
    </div>
  </ng-template>
</div>
```

The actions (`ScEditorTableAction`): `insertTable` (3 × 3, with a header row), `addRowBefore`, `addRowAfter`, `deleteRow`, `addColumnBefore`, `addColumnAfter`, `deleteColumn`, `mergeCells`, `splitCell`, `toggleHeaderRow`, `toggleHeaderColumn`, `deleteTable`. `can(action)` says which apply where the selection is — outside a table, only `insertTable`. Tab and Shift+Tab move between cells (Tab in the last cell adds a row); dragging a column's border resizes it; dragging across cells selects them, to merge.

## Floating toolbar

`ScEditorBubbleMenu`, from `@semantic-components/ui/editor/bubble-menu` (no provider).

```html
<div scEditor …>
  …
  <div scEditorBubbleMenu scToolbar aria-label="Selection" class="shadow-md">
    <div scToolbarWidgetGroup>
      <button scToolbarWidget scToggle scEditorCommand="bold">…</button>
      <button scToolbarWidget scToggle scEditorCommand="italic">…</button>
    </div>
  </div>
</div>
```

`scEditorBubbleMenu` shows by the selected text in an editable document, and hides when the selection is empty or focus leaves both — it stays while focus is in it. Behaviour only: put `scToolbar` on it too — one tab stop, arrow keys, its look (add a shadow: it floats) — and the same commands as in the toolbar. It is positioned above the selection and follows it as the document scrolls. Put it anywhere inside `scEditor`.

## Character limit

```html
<div scEditor [formField]="form.body" [characterLimit]="280">
  …
  <span scEditorCharCount #count="scEditorCharCount">{{ count.charCount() }} / {{ count.limit() }}</span>
</div>
```

`characterLimit` counts the document's text, not its HTML, and holds it there: typing stops at the limit and a longer paste is cut to fit. `scEditorCharCount` gives `charCount()`, `limit()` and `remaining()`, and has `data-limit-reached` (styled destructive) at the limit. It isn't a Signal Forms validator: the value can't go over it, so there is nothing to report.

## Search and replace

`withSearch()` and the parts, from `@semantic-components/ui/editor/search`.

```html
<button scToolbarWidget scButton variant="ghost" [scCollapsibleTrigger]="search">…</button>

<!-- searchOpen = signal(false) -->
<div scCollapsible #search="scCollapsible" [(open)]="searchOpen">
  <div scCollapsiblePanel scEditorSearchBar [(open)]="searchOpen" aria-label="Search and replace">
    <input scInput scEditorSearchInput aria-label="Search" />
    <span scEditorSearchResults #results="scEditorSearchResults"> @if (results.state() === 'found') { {{ (results.index() ?? 0) + 1 }} of {{ results.count() }} } @else if (results.state() === 'none') { No results } </span>
    <button scEditorSearchPrevious>…</button>
    <button scEditorSearchNext>…</button>
    <button scEditorSearchOption="caseSensitive">…</button>
    <button scEditorSearchOption="wholeWord">…</button>
    <button scEditorSearchOption="useRegex">…</button>
    <input scInput scEditorReplaceInput aria-label="Replace with" />
    <button scEditorReplace>Replace</button>
    <button scEditorReplaceAll>Replace all</button>
    <button scEditorSearchClose>…</button>
  </div>
</div>
```

Whether the bar is open is yours: one signal, bound to what shows it and to the bar's `[(open)]`. Here a Collapsible (`scCollapsible`), its trigger in the toolbar (`[scCollapsibleTrigger]="search"`: `aria-expanded`, `aria-controls`, the animation) — a `scButton` (ghost: the toggles' size), not a toggle: it expands, it isn't pressed. A Popover or an `@if` work the same; Ctrl / ⌘ + F opens the bar only while it is in the page (a collapsed panel is, an `@if` isn't).

**Why the bar isn't tied to a Collapsible.** Where the search shows is a layout choice, and editors make it differently: a panel that pushes the text down (CodeMirror), a box floating over a corner (VS Code), a dialog (TinyMCE, CKEditor). The editor knows the search — its keys, its focus, its matches — not where you put it. So it has no container of its own and imports none: the bar reads and writes the signal you give it, and the Collapsible here is the demo's choice, swapped for a Popover, a Sheet or an `@if` without touching the editor.

| Part                              | Does                                                                                                                                                                                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scEditorSearchBar`               | A `search` landmark (name it). `[(open)]`: opened — by you, or **Ctrl / ⌘ + F** in the document — focus in the search; Escape closes it and goes back to the text; closed, its matches are cleared.                                                            |
| `scEditorSearchInput`             | Searches as you type (after a pause), the current match highlighted, the cursor left where it is; the first Enter goes to that match, then Enter / Shift+Enter go to the next / previous one. `aria-invalid` when nothing matches. Focused when the bar opens. |
| `scEditorSearchResults`           | `role="status"`: write "2 of 5", "No results" from `index()`, `count()`, `state()` (`idle`, `found`, `none` — styled destructive).                                                                                                                             |
| `scEditorSearchOption`            | `caseSensitive`, `wholeWord`, `useRegex` (RE2 syntax), on and off (`aria-pressed`).                                                                                                                                                                            |
| `scEditorSearchPrevious`, `…Next` | Step through the matches, wrapping around.                                                                                                                                                                                                                     |
| `scEditorReplaceInput`            | What matches become; Enter replaces the current one.                                                                                                                                                                                                           |
| `scEditorReplace`, `…ReplaceAll`  | Replace the current match (and go to the next) or every one, in one undoable step.                                                                                                                                                                             |
| `scEditorSearchClose`             | Closes the bar, clears the matches, goes back to the text.                                                                                                                                                                                                     |

The matches are highlighted in the document; the current one is selected and scrolled to. Read-only documents can be searched, not replaced.

## Formats

`format` picks what the form holds — as `output` in minimal-tiptap, `outputFormat` in ngx-tiptap, `format` in ngx-quill:

| `format`         | The value                                                                          | Empty  |
| ---------------- | ---------------------------------------------------------------------------------- | ------ |
| `html` (default) | HTML: `'<p>Hello <strong>world</strong></p>'`                                      | `''`   |
| `json`           | Tiptap's JSON: `{ type: 'doc', content: [{ type: 'paragraph', … }] }`              | `null` |
| `markdown`       | Markdown: `'Hello **world**\n\nBye'` (GitHub's: tables and task lists too)         | `''`   |
| `text`           | Plain text, a line per paragraph: `'Hello world\nBye'` — the formatting isn't kept | `''`   |

```html
<div scEditor [formField]="noteForm.body" format="json">…</div>
```

```ts
readonly noteForm = form(signal<{ body: ScEditorValue }>({ body: null }), (path) => {
  required(path.body);
});
```

- **Empty is empty**: `''` or `null`, never `'<p></p>'` — so `required` works in every format.
- **Any format comes in**: JSON is read as JSON; a string as Markdown or plain text in those formats, HTML otherwise — so HTML you saved before loads into a `json` editor, which writes JSON from the next change.
- **Markdown is a feature**: `withMarkdown()`, from `@semantic-components/ui/editor/markdown`, for the editor and `scEditorView`.
- **Markdown keeps what Markdown can say**: what it has no syntax for — highlights, alignment, underline, superscript and subscript — is lost when written as Markdown.
- **Switching `format`** rewrites the value in the new one.
- **Why JSON**: it needs no HTML parsing on a server and keeps its shape as the editor's HTML output changes (the format the newer editors — Lexical, Plate, BlockNote — store). `ScEditorValue` is `string | JSONContent | null`.

## Displaying the document

`scEditorView` shows what the editor wrote — a published post, a preview — as the editor shows it: the same styles, without an editor. Give it the editor's `format`: a string is read as HTML (or as plain text with `format="text"`), an object (or `null`) as JSON.

```html
<article [scEditorView]="post.body" aria-label="Post"></article>
<article [scEditorView]="note.body" format="text"></article>
<article [scEditorView]="post.body" layout="page"></article>
```

- **The same features**: it reads the features of `provideEditor`, as the editor does — give them both the same, or a table the editor wrote isn't shown.
- **Safe**: HTML is read through the editor's schema in a document of its own; JSON is checked against the schema (a document the editor couldn't have written shows nothing). Either is then built as elements — never set as `innerHTML`. Only what the editor can hold is shown: no scripts, no event attributes, no unsafe links (from HTML or JSON).
- **The same styles**: the editor's document and the view both have `data-slot="editor-document"`, which the editor's styles are written for.
- **Tasks** are shown, not changed: their checkboxes are disabled, named by their task.
- **`layout`**: `page` centres it in the same column as `scEditorContent`'s page layout; `default` adds no space around it.

`editorContentExtensions([withTables()])` are the extensions the document is made of, with these features: use them with Tiptap's `generateHTML` / `generateJSON` to read or write the editor's HTML elsewhere (a server, a migration).

## Keyboard

Tiptap's shortcuts: **Ctrl / ⌘ + B** bold, **I** italic, **U** underline, **E** inline code, **Shift + H** highlight (with `withHighlight()`), **.** superscript, **,** subscript (with `withScripts()`), **Alt + C** code block, **Shift + 7 / 8 / 9** numbered, bulleted and task list, **Z** undo, **Shift + Z** or **Y** redo; **Ctrl / ⌘ + F** search (with a `scEditorSearchBar`). Markdown shortcuts as you type: `# ` headings, `- ` lists, `[ ] ` tasks, `> ` quotes, ` ``` ` code blocks. In the toolbar, **← / →** move between buttons and **Tab** leaves it.

## Styling

The editor is styled as the rest of the library: the toolbar's buttons are toggles (`toggleVariants`), and the document — in the editor and in `scEditorView` — is a Typeset container: headings, paragraphs, lists, code, quotes, rules and images as in rendered content (ui's `typeset.css` and your style's `typeset-variables.css`, so its corners follow the style), and what you write looks as it will once published. `editor.css` adds only what Typeset doesn't know: the placeholder, the selection and search, selected nodes, task lists (the box as `scCheckbox`), tables with cells to write in, the highlight colours. Tiptap's Simple Editor is the model for what the editor does and how it is laid out, not for how it looks. The document box has `block outline-none overflow-y-auto min-h-[150px] max-h-[400px]`; a `class` on `scEditorContent` changes it (`min-h-[300px] max-h-[500px]`, `font-serif`…).

Its `layout` sets how it sits in the box (`data-layout`):

- `default`: padded edge to edge (`p-4`), for a field or a comment box.
- `page`: the layout of Tiptap's Simple Editor, for an article or a document: a centred column at most 648px wide with 3rem page margins (1rem and 1.5rem at 480px and under). The column is the inner `.ProseMirror` element, so the scrollbar stays at the box's edge. The toolbar follows: its buttons centred over the column.

```html
<div scEditorContent ariaLabel="Article" layout="page" class="max-h-[600px] min-h-[400px]"></div>
```

The editor's styles are your style's `editor.css`: the placeholder, task lists — their box as the style's `scCheckbox` — tables with cells to write in, highlights, search matches and the kept selection, in plain CSS on the theme's `--border`, `--input`, `--muted`, `--muted-foreground`, `--primary`, `--ring` and `--accent`, with the style's corners (its Typeset variables: tables as its code block, search matches and selected nodes as its inline code). The highlight colours and the search matches' are your theme's too — add them to your theme, at the end of its own `:root` and `.dark` (your `styles.css`), with its other tokens. Matches pale yellow, the current one orange (as browsers and code editors do), underlined in a shade of it so it isn't told by colour alone:

```css
:root {
  --sc-editor-highlight-1: oklch(0.945 0.12 100);
  --sc-editor-highlight-2: oklch(0.93 0.08 150);
  --sc-editor-highlight-3: oklch(0.92 0.06 240);
  --sc-editor-highlight-4: oklch(0.92 0.06 300);
  --sc-editor-highlight-5: oklch(0.92 0.07 20);
  --sc-editor-search-match: oklch(0.945 0.12 100 / 60%);
  --sc-editor-search-current: oklch(0.85 0.14 65);
}

.dark {
  --sc-editor-highlight-1: oklch(0.45 0.09 95);
  --sc-editor-highlight-2: oklch(0.42 0.08 150);
  --sc-editor-highlight-3: oklch(0.42 0.08 250);
  --sc-editor-highlight-4: oklch(0.42 0.09 300);
  --sc-editor-highlight-5: oklch(0.42 0.1 20);
  --sc-editor-search-match: oklch(0.45 0.09 95 / 60%);
  --sc-editor-search-current: oklch(0.52 0.13 55);
}
```

## Accessibility

- The document is a multi-line `textbox` named by `ariaLabel`; `aria-readonly` / `aria-disabled` / `aria-invalid` follow the form, and the field's description and errors describe it.
- The toolbar is one tab stop (`@angular/aria` toolbar); buttons with a state have `aria-pressed`, menu triggers `data-state`.
- Task checkboxes are named by their task; images by their file's name (change it in the HTML for a better one).
- Search results are announced (`role="status"`); the search bar is a named `search` landmark.
- The library adds no text: name everything you write.
