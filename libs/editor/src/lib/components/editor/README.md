# Editor

A composable rich text editor built on [Tiptap](https://tiptap.dev/) (ProseMirror): the document is HTML, edited through Signal Forms. Its full demo follows Tiptap's [Simple Editor](https://tiptap.dev/docs/ui-components/templates/simple-editor) template — block types, lists with task lists, code blocks, marks, highlights, links, superscript and subscript, alignment, images, search and replace — in this library's styles.

You write the markup and every piece of text — the toolbar, its icons and names, the editor's name and placeholder, the menu labels, the popovers, the search bar; the parts add the behaviour, ARIA and default styles.

## Installation

```bash
npm install @semantic-components/editor @tiptap/core @tiptap/pm @tiptap/starter-kit
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
import { ScEditor, ScEditorBold, ScEditorContent, ScEditorToolbar, ScEditorToolbarGroup, provideEditor } from '@semantic-components/editor';
import { withMarkdown } from '@semantic-components/editor/markdown';
import { ScEditorSubscript, ScEditorSuperscript, withScripts } from '@semantic-components/editor/scripts';
import { SiBoldIcon, SiSubscriptIcon, SiSuperscriptIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-note-editor',
  imports: [FormField, ScEditor, ScEditorBold, ScEditorContent, ScEditorSubscript, ScEditorSuperscript, ScEditorToolbar, ScEditorToolbarGroup, SiBoldIcon, SiSubscriptIcon, SiSuperscriptIcon],
  // The features of the editors in this component.
  providers: [provideEditor(withScripts(), withMarkdown())],
  template: `
    <div scEditor [formField]="noteForm.body" format="markdown">
      <div scEditorToolbar aria-label="Formatting">
        <div scEditorToolbarGroup>
          <button scEditorBold value="bold">
            <svg siBoldIcon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scEditorSuperscript value="superscript">
            <svg siSuperscriptIcon></svg>
            <span class="sr-only">Superscript</span>
          </button>
          <button scEditorSubscript value="subscript">
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

| Entry point                               | Provide                                               | Parts                                                                                    | Package                                                        |
| ----------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `@semantic-components/editor/tables`      | `withTables()`                                        | `scEditorTable`                                                                          | `@tiptap/extension-table`                                      |
| `@semantic-components/editor/images`      | `withImages()`                                        | `scEditorUploads`, `scEditorImage`; drop, paste                                          | `@tiptap/extension-image`, `@tiptap/extension-file-handler`    |
| `@semantic-components/editor/search`      | `withSearch()`                                        | `scEditorSearch`, `scEditorSearchBar` and its parts; **Ctrl / ⌘ + F**                    | `@tiptap/extension-find-and-replace`                           |
| `@semantic-components/editor/highlight`   | `withHighlight()`                                     | `scEditorHighlight`, `scEditorHighlightColor`, `scEditorRemoveHighlight`                 | `@tiptap/extension-highlight`                                  |
| `@semantic-components/editor/scripts`     | `withScripts()`                                       | `scEditorSuperscript`, `scEditorSubscript`                                               | `@tiptap/extension-superscript`, `@tiptap/extension-subscript` |
| `@semantic-components/editor/align`       | `withAlign()`                                         | `scEditorAlignLeft`, `scEditorAlignCenter`, `scEditorAlignRight`, `scEditorAlignJustify` | `@tiptap/extension-text-align`                                 |
| `@semantic-components/editor/markdown`    | `withMarkdown()`                                      | `format="markdown"`                                                                      | `@tiptap/markdown`                                             |
| `@semantic-components/editor/bubble-menu` | none (`scEditorBubbleMenu` adds itself to the editor) | `scEditorBubbleMenu`                                                                     | `@tiptap/extension-bubble-menu`                                |

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
<div scEditor [formField]="postForm.body" class="overflow-hidden rounded-lg border">
  <div scEditorToolbar aria-label="Formatting">
    <div scEditorToolbarGroup>
      <button scEditorBold value="bold">
        <svg siBoldIcon></svg>
        <span class="sr-only">Bold</span>
      </button>
      <button scEditorItalic value="italic">
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

- **The value** is the document's HTML (`''` when it's empty) — or Tiptap's JSON or plain text, with `format` (see [Formats](#formats)). Setting it from outside (a reset, a load) isn't a change to undo.
- **Disabled and read-only** come from the schema (`disabled(path.body)`, `readonly(path.body)`), and can change at any time.
- **Errors**: put the editor in a `scField` with `scFieldErrors` — once it's left invalid, the document gets `aria-invalid` and is described by the errors.

## Parts

| Part                                        | Selector                                      | Does                                                                                                                                                                      |
| ------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScEditor`                                  | `[scEditor]`                                  | The document and its commands; a Signal Forms control (`exportAs: 'scEditor'`). `data-disabled`, `data-readonly`, `data-invalid`.                                         |
| `ScEditorContent`                           | `div[scEditorContent]`                        | Where it's written: a multi-line `textbox`. `ariaLabel` (name it — no default), `placeholder` (none by default), `layout` (`default` or `page`, see [Styling](#styling)). |
| `ScEditorToolbar`, `ScEditorToolbarGroup`   | `div[scEditorToolbar]`, `div[…Group]`         | The toolbar: one tab stop, arrow keys between its buttons. Name it (`aria-label`).                                                                                        |
| `ScEditorBold` … (see below)                | `button[scEditorBold]`…                       | A command; `aria-pressed` when it has a state. Write its icon and name it.                                                                                                |
| `ScEditorHeading`                           | `button[scEditorHeading]`                     | The block type: `level()` (`'p'`, `'h1'`…`'h6'`), `select(level)` — the trigger of your menu, with your labels.                                                           |
| `ScEditorList`                              | `button[scEditorList]`                        | The list type: `type()` (`'bulletList'`, `'orderedList'`, `'taskList'`, or null; `data-state="on"` in one), `select(type)` — a menu trigger.                              |
| `ScEditorTable` (`/tables`)                 | `button[scEditorTable]`                       | Tables: `select(action)`, `can(action)`, `inTable()` (`data-state="on"` in one) — a menu trigger (see [Tables](#tables)).                                                 |
| `ScEditorBubbleMenu` (`/bubble-menu`)       | `div[scEditorBubbleMenu]`                     | A floating toolbar by the selected text (see [Floating toolbar](#floating-toolbar)).                                                                                      |
| `ScEditorLink`                              | `button[scEditorLink]`                        | Pressed inside a link; the trigger of your link popover: `href()`, `set(href, text?)`, `remove()` (`exportAs`).                                                           |
| `ScEditorHighlight` (`/highlight`)          | `button[scEditorHighlight]`                   | Pressed inside a highlight; the trigger of your highlight popover.                                                                                                        |
| `ScEditorHighlightColor` (`/highlight`)     | `button[scEditorHighlightColor]`              | A swatch in that popover: `[scEditorHighlightColor]="color"` highlights in it, or removes it; pressed when it's the colour. Name it.                                      |
| `ScEditorRemoveHighlight` (`/highlight`)    | `button[scEditorRemoveHighlight]`             | Removes the highlight (disabled when there is none).                                                                                                                      |
| `ScEditorUploads` (`/images`)               | `[scEditor][upload]`                          | The image uploads: `[upload]` on the editor, `imageTypes`, `uploads()`, `cancel(id)` (see [Images](#images)).                                                             |
| `ScEditorImage` (`/images`)                 | `button[scEditorImage]`                       | Picks images and uploads them with the editor's `[upload]` (disabled without one).                                                                                        |
| `ScEditorSearch` (`/search`)                | `button[scEditorSearch]`                      | Opens and closes the search bar (`open()`, `aria-pressed`); with it, **Ctrl / ⌘ + F** in the document opens it too.                                                       |
| `ScEditorSearchBar` and its parts           | see [Search and replace](#search-and-replace) | The bar under the toolbar (`/search`).                                                                                                                                    |
| `ScEditorView`                              | `[scEditorView]`                              | Displays the editor's HTML in its styles, without an editor (see [Displaying the document](#displaying-the-document)).                                                    |
| `ScEditorSeparator`                         | `div[scEditorSeparator]`                      | Between toolbar groups.                                                                                                                                                   |
| `ScEditorHeader`, `ScEditorFooter`          | `div[scEditorHeader]`, `div[scEditorFooter]`  | Above and below the document.                                                                                                                                             |
| `ScEditorCount`, `…WordCount`, `…CharCount` | `div[scEditorCount]`, `span[…]`               | `wordCount()`, `charCount()`, `limit()`, `remaining()` (`exportAs`) — write the text around them. `data-limit-reached` at the limit.                                      |

The buttons, `scEditor` + the command:

- **With a state** — `aria-pressed` follows the document: `Bold`, `Italic`, `Underline`, `Strikethrough`, `Code`, `Superscript`, `Subscript` (each turns the other off; `/scripts`), `BulletList`, `OrderedList`, `TaskList`, `Blockquote`, `CodeBlock`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify` (`/align`), `Link`, `Highlight`, `Search`.
- **Run once** — no `aria-pressed`: `HorizontalRule`, `ClearFormatting`, `Image`, `Undo`, `Redo` (disabled when there is nothing to undo / redo).

The parts of a feature come from its entry point and need it provided: see [Features](#features).

All are disabled when the editor is disabled or read-only — except `Search`, which read-only documents keep.

### Why no `Toggle` suffix

These were `scEditorBoldToggle`, `scEditorUndoToggle`… But Undo, Redo, Horizontal rule and Clear formatting aren't toggles — they have no state — and a `Toggle` / `Button` split would be a second thing to remember for each one. So every button is named the same way, after its command:

- The selector already says it's a button (`button[scEditorBold]`); a suffix adds nothing.
- Whether it's a toggle is in its ARIA: `aria-pressed` on the ones with a state, none on the others.
- It matches the other parts: `scEditorHeading`, `scEditorContent`, `scEditorWordCount`.

For the same reason the editor's group is `scEditorToolbarGroup`, not a toggle group: it groups buttons for the toolbar's arrow keys; which are pressed — one alignment, any number of marks — is the document's to say, not the group's.

## `scEditor`

- **Set by `[formField]`**: `value` (in its `format`), `disabled`, `readonly`, `invalid`, `touched`; `touch` fires when the document loses focus.
  `scEditor` holds what the whole document has; each part holds its own state and commands, read through its `exportAs` — the heading menu its `level()`, the list menu its `type()`, the link its `href()`, the counts theirs.

- **Inputs**: `format` (see [Formats](#formats)); `characterLimit` (see [Character limit](#character-limit)).
- **State**: `isActive(name, attributes?)` — a mark or node at the selection (`'bold'`, `'link'`, `'heading', { level: 2 }`…); `editable()`.
- **Commands**: `run((chain) => chain.toggleBold())` — any Tiptap command, on the focused document; `can((chain) => chain.undo())`.
- **For your own parts**: `editorInstance()`, the Tiptap editor; `contentVersion()`, which moves on with every change — read it in a `computed` that reads the document.

`run`, `can` and `editorInstance()` hand you Tiptap's own objects: they are the way out to anything the parts don't do, not the editor's API — what they give follows Tiptap.

## Menus: block type and lists

```html
<div scMenuProvider>
  <button scMenuTrigger scEditorHeading value="heading" #heading="scEditorHeading">
    <svg siHeadingIcon></svg>
    <span class="sr-only">{{ labels[heading.level()] }}</span>
    <svg siChevronDownIcon></svg>
  </button>
  <ng-template scMenuPortal>
    <div scMenu (itemSelected)="heading.select($event)">
      <ng-template scMenuContent>
        @for (level of levels; track level) {
        <div scMenuItem [value]="level">{{ labels[level] }}</div>
        }
      </ng-template>
    </div>
  </ng-template>
</div>
```

`scEditorList` is the same, with `list.type()` and `list.select($event)` (`'bulletList'`, `'orderedList'`, `'taskList'`). A task's checkbox is named by the task's text.

## Popovers: link and highlight

```html
<div scPopoverProvider [(open)]="linkOpen">
  <button scEditorLink scPopoverTrigger value="link" #link="scEditorLink" (click)="editLink(link.href())">
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
  <button scEditorHighlight scPopoverTrigger value="highlight">
    <svg siHighlighterIcon></svg>
    <span class="sr-only">Highlight</span>
  </button>
  <ng-template scPopoverPortal>
    <div scPopover aria-label="Highlight colours" class="flex w-auto items-center gap-2 p-2">
      <button scEditorHighlightColor="var(--editor-highlight-yellow)"><span class="sr-only">Yellow</span></button>
      <button scEditorHighlightColor="var(--editor-highlight-green)"><span class="sr-only">Green</span></button>
      <button scEditorRemoveHighlight>
        <svg siBanIcon></svg>
        <span class="sr-only">Remove highlight</span>
      </button>
    </div>
  </ng-template>
</div>
```

A popover keeps the selection — still shown while it has focus — so the link or colour goes where it was. The editor's styles have five highlight colours, for light and dark: `var(--editor-highlight-yellow)`, `-green`, `-blue`, `-purple`, `-red`; any CSS colour works.

## Images

`withImages()`, `ScEditorUploads` and `ScEditorImage`, from `@semantic-components/editor/images`. `[upload]` on `scEditor` is `ScEditorUploads`: import it, and it uploads what is picked, dropped or pasted.

```ts
readonly upload: ScEditorUploadHandler = async (file, { onProgress, signal }) => {
  const { url } = await this.files.upload(file, { onProgress, signal });
  return url;
};
```

```html
<div scEditor [formField]="form.body" [upload]="upload" #images="scEditorUploads">
  …
  <button scEditorImage value="image">
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

`withTables()` and `ScEditorTable`, from `@semantic-components/editor/tables`.

```html
<div scMenuProvider>
  <button scMenuTrigger scEditorTable value="table" #table="scEditorTable">
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

`ScEditorBubbleMenu`, from `@semantic-components/editor/bubble-menu` (no provider).

```html
<div scEditor …>
  …
  <div scEditorBubbleMenu aria-label="Selection">
    <div scEditorToolbarGroup>
      <button scEditorBold value="bold">…</button>
      <button scEditorItalic value="italic">…</button>
    </div>
  </div>
</div>
```

`scEditorBubbleMenu` shows by the selected text in an editable document, and hides when the selection is empty or focus leaves both — it stays while focus is in it. It is a toolbar like `scEditorToolbar` (one tab stop, arrow keys between its buttons, the same buttons in `scEditorToolbarGroup`s), styled as a popover, positioned above the selection and following it as the document scrolls. Put it anywhere inside `scEditor`.

## Character limit

```html
<div scEditor [formField]="form.body" [characterLimit]="280">
  …
  <span scEditorCharCount #count="scEditorCharCount">{{ count.charCount() }} / {{ count.limit() }}</span>
</div>
```

`characterLimit` counts the document's text, not its HTML, and holds it there: typing stops at the limit and a longer paste is cut to fit. `scEditorCharCount` gives `charCount()`, `limit()` and `remaining()`, and has `data-limit-reached` (styled destructive) at the limit. It isn't a Signal Forms validator: the value can't go over it, so there is nothing to report.

## Search and replace

`withSearch()` and the parts, from `@semantic-components/editor/search`.

```html
<button scEditorSearch #search="scEditorSearch" value="search">…</button>

@if (search.open()) {
<div scEditorSearchBar aria-label="Search and replace">
  <input scInput scEditorSearchInput aria-label="Search" />
  <span scEditorSearchResults #results="scEditorSearchResults"> @if (results.state() === 'found') { {{ (results.index() ?? 0) + 1 }} of {{ results.count() }} } @else if (results.state() === 'none') { No results } </span>
  <button scButton variant="ghost" size="icon-sm" scEditorSearchPrevious>…</button>
  <button scButton variant="ghost" size="icon-sm" scEditorSearchNext>…</button>
  <button scEditorSearchOption="caseSensitive">…</button>
  <button scEditorSearchOption="wholeWord">…</button>
  <button scEditorSearchOption="useRegex">…</button>
  <input scInput scEditorReplaceInput aria-label="Replace with" />
  <button scButton variant="outline" size="sm" scEditorReplace>Replace</button>
  <button scButton variant="outline" size="sm" scEditorReplaceAll>Replace all</button>
  <button scButton variant="ghost" size="icon-sm" scEditorSearchClose>…</button>
</div>
}
```

| Part                              | Does                                                                                                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scEditorSearchBar`               | A `search` landmark (name it); Escape closes it and goes back to the text.                                                                                  |
| `scEditorSearchInput`             | Searches as you type (after a pause); Enter / Shift+Enter go to the next / previous match. `aria-invalid` when nothing matches. Focused when the bar opens. |
| `scEditorSearchResults`           | `role="status"`: write "2 of 5", "No results" from `index()`, `count()`, `state()` (`idle`, `found`, `none` — styled destructive).                          |
| `scEditorSearchOption`            | `caseSensitive`, `wholeWord`, `useRegex` (RE2 syntax), on and off (`aria-pressed`).                                                                         |
| `scEditorSearchPrevious`, `…Next` | Step through the matches, wrapping around.                                                                                                                  |
| `scEditorReplaceInput`            | What matches become; Enter replaces the current one.                                                                                                        |
| `scEditorReplace`, `…ReplaceAll`  | Replace the current match (and go to the next) or every one, in one undoable step.                                                                          |
| `scEditorSearchClose`             | Closes the bar, clears the matches, goes back to the text.                                                                                                  |

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
- **Markdown is a feature**: `withMarkdown()`, from `@semantic-components/editor/markdown`, for the editor and `scEditorView`.
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

Tiptap's shortcuts: **Ctrl / ⌘ + B** bold, **I** italic, **U** underline, **E** inline code, **Shift + H** highlight (with `withHighlight()`), **.** superscript, **,** subscript (with `withScripts()`), **Alt + C** code block, **Shift + 7 / 8 / 9** numbered, bulleted and task list, **Z** undo, **Shift + Z** or **Y** redo; **Ctrl / ⌘ + F** search (with `scEditorSearch`). Markdown shortcuts as you type: `# ` headings, `- ` lists, `[ ] ` tasks, `> ` quotes, ` ``` ` code blocks. In the toolbar, **← / →** move between buttons and **Tab** leaves it.

## Styling

The editor is styled as the rest of the library: the toolbar's buttons are toggles (`toggleVariants`), and the document is written in the library's typography — headings as `scHeading`, paragraphs, lists, quotes and inline code as shadcn/ui's typography, task checkboxes as `scCheckbox`, rules as `scSeparator` — with `@apply` and the theme's tokens, so it follows your theme. Tiptap's Simple Editor is the model for what the editor does and how it is laid out, not for how it looks. The document box has `block outline-none overflow-y-auto min-h-[150px] max-h-[400px]`; a `class` on `scEditorContent` changes it (`min-h-[300px] max-h-[500px]`, `font-serif`…).

Its `layout` sets how it sits in the box (`data-layout`):

- `default`: padded edge to edge (`p-4`), for a field or a comment box.
- `page`: the layout of Tiptap's Simple Editor, for an article or a document: a centred column at most 648px wide with 3rem page margins (1rem and 1.5rem at 480px and under). The column is the inner `.ProseMirror` element, so the scrollbar stays at the box's edge. The toolbar follows: its buttons centred over the column.

```html
<div scEditorContent ariaLabel="Article" layout="page" class="max-h-[600px] min-h-[400px]"></div>
```

The editor's styles (`@semantic-components/editor/styles`) cover task lists, code blocks, images, highlights, search matches and the kept selection, with `--border`, `--muted`, `--muted-foreground`, `--primary`, `--ring` and the `--editor-highlight-*` colours.

## Accessibility

- The document is a multi-line `textbox` named by `ariaLabel`; `aria-readonly` / `aria-disabled` / `aria-invalid` follow the form, and the field's description and errors describe it.
- The toolbar is one tab stop (`@angular/aria` toolbar); buttons with a state have `aria-pressed`, menu triggers `data-state`.
- Task checkboxes are named by their task; images by their file's name (change it in the HTML for a better one).
- Search results are announced (`role="status"`); the search bar is a named `search` landmark.
- The library adds no text: name everything you write.
