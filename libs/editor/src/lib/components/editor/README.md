# Editor

A composable rich text editor built on [Tiptap](https://tiptap.dev/) (ProseMirror): the document is HTML, edited through Signal Forms. Its full demo follows Tiptap's [Simple Editor](https://tiptap.dev/docs/ui-components/templates/simple-editor) template — block types, lists with task lists, code blocks, marks, highlights, links, superscript and subscript, alignment, images, search and replace — in this library's styles.

You write the markup and every piece of text — the toolbar, its icons and names, the editor's name and placeholder, the menu labels, the popovers, the search bar; the parts add the behaviour, ARIA and default styles.

## Installation

```bash
npm install @semantic-components/editor @tiptap/core @tiptap/starter-kit @tiptap/extensions @tiptap/extension-list @tiptap/extension-text-align @tiptap/extension-highlight @tiptap/extension-superscript @tiptap/extension-subscript @tiptap/extension-image @tiptap/extension-file-handler @tiptap/extension-find-and-replace
```

The editor turns all of them on: there is no extension list to set up.

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

- **The value** is the document's HTML (`''` when it's empty), in the form. Setting it from outside (a reset, a load) isn't a change to undo.
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
| `ScEditorLink`                              | `button[scEditorLink]`                        | Pressed inside a link; the trigger of your link popover, which calls the editor's `setLink(href)` / `unsetLink()`.                                                        |
| `ScEditorHighlight`                         | `button[scEditorHighlight]`                   | Pressed inside a highlight; the trigger of your highlight popover.                                                                                                        |
| `ScEditorHighlightColor`                    | `button[scEditorHighlightColor]`              | A swatch in that popover: `[scEditorHighlightColor]="color"` highlights in it, or removes it; pressed when it's the colour. Name it.                                      |
| `ScEditorUnsetHighlight`                    | `button[scEditorUnsetHighlight]`              | Removes the highlight (disabled when there is none).                                                                                                                      |
| `ScEditorImage`                             | `button[scEditorImage]`                       | Picks images and uploads them with the editor's `upload` (disabled without one).                                                                                          |
| `ScEditorSearch`                            | `button[scEditorSearch]`                      | Opens and closes the search bar (`aria-pressed`); with it, **Ctrl / ⌘ + F** in the document opens it too.                                                                 |
| `ScEditorSearchBar` and its parts           | see [Search and replace](#search-and-replace) | The bar under the toolbar.                                                                                                                                                |
| `ScEditorView`                              | `[scEditorView]`                              | Displays the editor's HTML in its styles, without an editor (see [Displaying the HTML](#displaying-the-html)).                                                            |
| `ScEditorSeparator`                         | `div[scEditorSeparator]`                      | Between toolbar groups.                                                                                                                                                   |
| `ScEditorHeader`, `ScEditorFooter`          | `div[scEditorHeader]`, `div[scEditorFooter]`  | Above and below the document.                                                                                                                                             |
| `ScEditorCount`, `…WordCount`, `…CharCount` | `div[scEditorCount]`, `span[…]`               | `wordCount()`, `charCount()` (`exportAs`) — write the text around them.                                                                                                   |

The buttons, `scEditor` + the command:

- **With a state** — `aria-pressed` follows the document: `Bold`, `Italic`, `Underline`, `Strikethrough`, `Code`, `Superscript`, `Subscript` (each turns the other off), `BulletList`, `NumberedList`, `TaskList`, `Blockquote`, `CodeBlock`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify`, `Link`, `Highlight`, `Search`.
- **Run once** — no `aria-pressed`: `HorizontalRule`, `ClearFormatting`, `Image`, `Undo`, `Redo` (disabled when there is nothing to undo / redo).

All are disabled when the editor is disabled or read-only — except `Search`, which read-only documents keep.

### Why no `Toggle` suffix

These were `scEditorBoldToggle`, `scEditorUndoToggle`… But Undo, Redo, Horizontal rule and Clear formatting aren't toggles — they have no state — and a `Toggle` / `Button` split would be a second thing to remember for each one. So every button is named the same way, after its command:

- The selector already says it's a button (`button[scEditorBold]`); a suffix adds nothing.
- Whether it's a toggle is in its ARIA: `aria-pressed` on the ones with a state, none on the others.
- It matches the other parts: `scEditorHeading`, `scEditorContent`, `scEditorWordCount`.

For the same reason the editor's group is `scEditorToolbarGroup`, not a toggle group: it groups buttons for the toolbar's arrow keys; which are pressed — one alignment, any number of marks — is the document's to say, not the group's.

## `scEditor`

- **Set by `[formField]`**: `value` (the HTML), `disabled`, `readonly`, `invalid`, `touched`; `touch` fires when the document loses focus.
- **Inputs**: `upload` — the image upload handler (none: no images); `imageTypes` — the image types it takes (PNG, JPEG, GIF, WebP).
- **State**: `isActive(name, attributes?)` — a mark or node at the selection (`'bold'`, `'link'`, `'heading', { level: 2 }`…); `alignment()`, `heading()`, `list()`, `linkHref()`, `highlightColor()`; `editable()`.
- **Commands**: `run((chain) => chain.toggleBold())` — any Tiptap command, on the focused document; `can((chain) => chain.undo())`; `toggleList(type)`.
- **Links**: `setLink(href, text?)` — links the selection, or writes `text` (or the address) as a link where nothing is selected; `unsetLink()`. Addresses with unsafe protocols (`javascript:`…) aren't rendered as links.
- **Search**: `searchOpen()`, `openSearch()`, `closeSearch()`, `toggleSearch()`; `search(term)`, `setReplaceTerm(term)`, `setSearchOption(option, on)`; `searchTerm()`, `replaceTerm()`, `caseSensitive()`, `wholeWord()`, `useRegex()`, `searchResults()` (how many), `searchIndex()` (the current one, from 0); `searchNext()`, `searchPrevious()`, `replace()`, `replaceAll()`.
- **Images**: `insertImages(files, position?)`, `uploads()` (`{ id, file, progress }`, progress from 0 to 1), `cancelUpload(id)`.
- **Tiptap**: `editorInstance()` for anything else.

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
  <button scEditorLink scPopoverTrigger value="link" (click)="editLink(editor.linkHref())">
    <svg siLinkIcon></svg>
    <span class="sr-only">Link</span>
  </button>
  <ng-template scPopoverPortal>
    <div scPopover aria-label="Link">
      <div scField>
        <label scLabel>Address</label>
        <input scInput type="url" [formField]="linkForm.href" />
      </div>
      <button scButton type="button" (click)="editor.setLink(linkForm.href().value()); linkOpen.set(false)">Apply</button>
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
      <button scEditorHighlightColor="var(--editor-highlight-yellow)" aria-label="Yellow"></button>
      <button scEditorHighlightColor="var(--editor-highlight-green)" aria-label="Green"></button>
      <button scEditorUnsetHighlight>
        <svg siBanIcon></svg>
        <span class="sr-only">Remove highlight</span>
      </button>
    </div>
  </ng-template>
</div>
```

`#editor="scEditor"` on the root. A popover keeps the selection — still shown while it has focus — so the link or colour goes where it was. The editor's styles have five highlight colours, for light and dark: `var(--editor-highlight-yellow)`, `-green`, `-blue`, `-purple`, `-red`; any CSS colour works.

## Images

```ts
readonly upload: ScEditorUploadHandler = async (file, { onProgress, signal }) => {
  const { url } = await this.files.upload(file, { onProgress, signal });
  return url;
};
```

```html
<div scEditor [formField]="form.body" [upload]="upload" #editor="scEditor">
  …
  <button scEditorImage value="image">
    <svg siImagePlusIcon></svg>
    <span class="sr-only">Add image</span>
  </button>
  … @for (upload of editor.uploads(); track upload.id) {
  <div scProgress [value]="upload.progress * 100" [attr.aria-label]="'Uploading ' + upload.file.name"></div>
  }
</div>
```

The button picks files; dropping or pasting images does the same. Each is inserted where it was picked or dropped once its upload resolves, with the file's name (less its extension) as its `alt`. A rejected upload is dropped — report your errors in the handler.

## Search and replace

```html
@if (editor.searchOpen()) {
<div scEditorSearchBar aria-label="Search and replace">
  <input scInput scEditorSearchInput aria-label="Search" />
  <span scEditorSearchResults> @if (editor.searchTerm()) { @if (editor.searchResults()) { {{ (editor.searchIndex() ?? 0) + 1 }} of {{ editor.searchResults() }} } @else { No results } } </span>
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
| `scEditorSearchResults`           | `role="status"`: write "2 of 5", "No results"; `data-state` `none` is styled destructive.                                                                   |
| `scEditorSearchOption`            | `caseSensitive`, `wholeWord`, `useRegex` (RE2 syntax), on and off (`aria-pressed`).                                                                         |
| `scEditorSearchPrevious`, `…Next` | Step through the matches, wrapping around.                                                                                                                  |
| `scEditorReplaceInput`            | What matches become; Enter replaces the current one.                                                                                                        |
| `scEditorReplace`, `…ReplaceAll`  | Replace the current match (and go to the next) or every one, in one undoable step.                                                                          |
| `scEditorSearchClose`             | Closes the bar, clears the matches, goes back to the text.                                                                                                  |

The matches are highlighted in the document; the current one is selected and scrolled to. Read-only documents can be searched, not replaced.

## Displaying the HTML

`scEditorView` shows what the editor wrote — a published post, a preview — as the editor shows it: the same styles, without an editor.

```html
<article [scEditorView]="post.body" aria-label="Post"></article>
<article [scEditorView]="post.body" layout="page"></article>
```

- **Safe**: the HTML is read through the editor's schema in a document of its own, then built as elements — never set as `innerHTML`. Only what the editor can hold is shown: no scripts, no event attributes, no unsafe links.
- **The same styles**: the editor's document and the view both have `data-slot="editor-document"`, which the editor's styles are written for.
- **Tasks** are shown, not changed: their checkboxes are disabled, named by their task.
- **`layout`**: `page` centres it in the same column as `scEditorContent`'s page layout; `default` adds no space around it.

`editorContentExtensions()` are the extensions the document is made of: use them with Tiptap's `generateHTML` / `generateJSON` to read or write the editor's HTML elsewhere (a server, a migration).

## Keyboard

Tiptap's shortcuts: **Ctrl / ⌘ + B** bold, **I** italic, **U** underline, **E** inline code, **Shift + H** highlight, **.** superscript, **,** subscript, **Alt + C** code block, **Shift + 7 / 8 / 9** numbered, bulleted and task list, **Z** undo, **Shift + Z** or **Y** redo; **Ctrl / ⌘ + F** search (with `scEditorSearch`). Markdown shortcuts as you type: `# ` headings, `- ` lists, `[ ] ` tasks, `> ` quotes, ` ``` ` code blocks. In the toolbar, **← / →** move between buttons and **Tab** leaves it.

## Styling

The editor follows Tiptap's Simple Editor in its sizes and spacing — the toolbar (one 44px row of 32px buttons that scrolls sideways when it doesn't fit, 2px apart in a group, 1px separators), and the document's typography (paragraphs 1rem with 1.6 line height and 20px apart, headings, lists, task checkboxes, code, quotes, rules, images) — in this library's tokens and fonts. The document box has `block outline-none overflow-y-auto min-h-[150px] max-h-[400px]`; a `class` on `scEditorContent` changes it (`min-h-[300px] max-h-[500px]`, `font-serif`…).

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
