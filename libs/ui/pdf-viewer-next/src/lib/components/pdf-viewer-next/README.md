# PDF Viewer Next

A composable PDF viewer built on [PDF.js](https://mozilla.github.io/pdf.js/) (`pdfjs-dist`, a peer dependency): navigation, zoom, rotation, find, text selection, links, forms, annotations (highlight, text, drawing, images, signatures, comments), saving, printing, presentation mode and page organisation.

**pdf.js's viewer, your interface.** The pages are pdf.js's own `PDFViewer`, wired as pdf.js's viewer application wires it (`web/app.js`): its rendering, text, link, form, structure and annotation-editor layers, its find controller, link service, scripting sandbox and page map. Everything around them — toolbars, sidebar, find bar, dialogs, the undo bar — is your template: usually `@semantic-components/ui` components (`scButton`, `scInput`, `scToggleGroup`, `scDialog`…), with the viewer's parts as directives on them adding behaviour, ARIA wiring, state (`data-*` attributes) and default classes you can adjust with `class`. The library ships no text: yours is yours to word and translate. pdf.js's own words on the pages (its editors' toolbar buttons) are its English, or the app's language when the page links pdf.js's locale files (`<link rel="resource" type="application/l10n" href="…/locale/locale.json">`).

## Usage

```html
<div scPdfViewerNext [src]="url" fileName="report" #viewer="scPdfViewerNext">
  <div scPdfViewerNextContainer class="flex h-[800px] flex-col">
    <div scPdfViewerNextToolbar aria-label="Document">
      <div scPdfViewerNextNav aria-label="Page navigation">
        <button scPdfViewerNextPrevPage>
          <svg siChevronUpIcon></svg>
          <span class="sr-only">Previous page</span>
        </button>
        <button scPdfViewerNextNextPage>
          <svg siChevronDownIcon></svg>
          <span class="sr-only">Next page</span>
        </button>
      </div>
      <input scInput scPdfViewerNextPageInput aria-label="Page" />
      <span>/ {{ viewer.totalPages() }}</span>
      <div scPdfViewerNextSpacer></div>
      <button scPdfViewerNextDownload>
        <svg siDownloadIcon></svg>
        <span class="sr-only">Download</span>
      </button>
    </div>

    <div scPdfViewerNextContent>
      <div scPdfViewerNextLoading><svg scSpinner siLoaderCircleIcon></svg> Loading…</div>
      <div scEmpty scPdfViewerNextError>
        <div scEmptyTitle>Couldn't open the document</div>
        <button scPdfViewerNextRetry>Try again</button>
      </div>
      <div scPdfViewerNextCanvas></div>
    </div>
  </div>
</div>
```

The demo (`apps/showcase/.../pdf-viewer-next-demo.ts`) writes out everything: find bar, sidebar (pages with organisation, outline, attachments, layers, comments), annotation tools and their options, signatures and all dialogs.

Parts look up the viewer by dependency injection: put them inside `scPdfViewerNext`. That includes `ng-template`s you render elsewhere (e.g. a recursive outline): declare them inside it.

### Fullscreen

Dialogs, menus, popovers and tooltips render in a CDK overlay attached to `<body>`, which is hidden while the viewer is fullscreen. Provide CDK's `FullscreenOverlayContainer` once in your app so they follow the fullscreen element:

```typescript
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';

providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }];
```

## The viewer

`ScPdfViewerNext` (`[scPdfViewerNext]`, `exportAs: 'scPdfViewerNext'`) holds the document and all state; your template reads it (`viewer.currentPage()`, `viewer.findState()`…) to write its text.

- **Inputs**: `src`, `fileName` (download / print name, without `.pdf`), `initialPage`, `initialZoom`, `assetsUrl` (where pdf.js's worker, sandbox, fonts, CMaps, wasm decoders and colour profiles are — unpkg by default; host `pdfjs-dist`'s folders yourself for offline or strict-CSP apps), `workerSrc`, `sandboxSrc`, `wasmSrc`, `keyboardShortcuts`, `autoPrint`, `enableScripting`, `enableAutoLinking` (URLs and email addresses in the text become links; on by default), `enablePermissions` (follow the document's permissions — no copying, printing, adding annotations or filling in forms when it forbids them; off by default, as in pdf.js), `pageColors` (`{ foreground, background }` to draw the pages with; unset, they follow the system's high-contrast mode), `rememberView` (a document reopens where it was left — page, zoom, scroll, rotation — as pdf.js's view history; on by default), `caretBrowsing` (the browser's caret browsing, F7, is on — the page can't tell, so say when your app knows).
- **Two-way**: `sidebarOpen`, `sidebarView`, `cursorTool`, `scrollMode`, `spreadMode`, `savedSignatures`.
- **Outputs**: `loaded`, `pageChange`, `zoomChange`, `errorEvent` (`ScPdfLoadError`), `fileOpened`.
- **State for your text**: `currentPage()`, `totalPages()`, `pageLabels()` / `pageLabel(n)`, `zoom()`, `isLoading()`, `loadProgress()`, `error()` (`{ kind: 'invalid' | 'missing' | 'network' | 'password' | 'unknown' }`), `findState()`, `findCurrentMatchIndex()`, `findTotalMatches()`, `undoable()` (`{ kind, count, annotation? }`), `editorState()` (pdf.js's: `hasSomethingToUndo`, `hasSelectedEditor`…), `currentView()` (the open parameters of where the pages are, for a link to it), `pendingComment()`, `printProgress()`, `outline()`, `attachments()`, `layers()`, `comments()`, `savedSignatures()`, `pageSelection()`, `canGoBack()` / `canGoForward()`, `canCopy()` / `canPrint()` / `canEdit()` / `canFillForms()`…

## Parts

### Layout

| Part                       | Selector                     | Does                                                                                                                                                                                           |
| -------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScPdfViewerNextContainer` | `[scPdfViewerNextContainer]` | The frame; the fullscreen element.                                                                                                                                                             |
| `ScPdfViewerNextToolbar`   | `[scPdfViewerNextToolbar]`   | A toolbar row (`role="toolbar"`) — name it.                                                                                                                                                    |
| `ScPdfViewerNextNav`       | `[scPdfViewerNextNav]`       | Groups page controls (`role="group"`) — name it.                                                                                                                                               |
| `ScPdfViewerNextZoom`      | `[scPdfViewerNextZoom]`      | Groups zoom controls (`role="group"`) — name it.                                                                                                                                               |
| `ScPdfViewerNextSpacer`    | `[scPdfViewerNextSpacer]`    | Pushes what follows to the end.                                                                                                                                                                |
| `ScPdfViewerNextContent`   | `[scPdfViewerNextContent]`   | The page area. Opens a file dropped on it (`data-dragging`; `[dropFiles]="false"` turns it off).                                                                                               |
| `ScPdfViewerNextCanvas`    | `div[scPdfViewerNextCanvas]` | pdf.js's viewer: the pages, with their text, link, form, structure and annotation-editor layers. `pageName`: a function naming each page, which makes the pages landmarks (see Accessibility). |

### Buttons

Each styles its button (the style's button, `ghost` by default): pick another look with `variant` and `size`, as on `scButton`. Write its icon and text, and name the icon-only ones.

| Part                                        | Does                                     | Disabled when                                       |
| ------------------------------------------- | ---------------------------------------- | --------------------------------------------------- |
| `scPdfViewerNextPrevPage` / `NextPage`      | Previous / next page                     | on the first / last page                            |
| `scPdfViewerNextBack` / `Forward`           | Back to before the last jump, or again   | with nowhere to go                                  |
| `scPdfViewerNextZoomIn` / `ZoomOut`         | Zoom a step (×1.1, as pdf.js)            | at 2500% / 10%                                      |
| `scPdfViewerNextRotateLeft` / `RotateRight` | Rotate the pages                         | —                                                   |
| `scPdfViewerNextPrint`                      | Print (with the `print` dialog)          | until the document loads, or if it forbids printing |
| `scPdfViewerNextDownload`                   | Download, with annotations and form data | until the document loads                            |
| `scPdfViewerNextFullscreen`                 | Toggle fullscreen (`aria-pressed`)       | —                                                   |
| `scPdfViewerNextFindToggle`                 | Open / close the find bar                | —                                                   |
| `scPdfViewerNextFindPrevious` / `FindNext`  | Previous / next match                    | while there are none                                |
| `scPdfViewerNextRetry`                      | Load again after an error                | —                                                   |
| `scPdfViewerNextUndo` / `UndoDismiss`       | Undo / close what the undo bar offers    | —                                                   |

### Fields and settings

| Part                             | Use on                                         | Does                                                                                                                                                                                                                                                          |
| -------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScPdfViewerNextPageInput`       | `input[scInput]`                               | The current page — the label when the document has page labels; accepts a label or a number. Write the count next to it.                                                                                                                                      |
| `ScPdfViewerNextZoomSelect`      | `select` (`#zoom="scPdfViewerNextZoomSelect"`) | Binds the zoom. Write the options: `auto`, `page-actual`, `page-fit`, `page-width`, `zoom.scales()`, and `zoom.customZoom()` while it's set.                                                                                                                  |
| `ScPdfViewerNextFindbar`         | any                                            | The find bar row.                                                                                                                                                                                                                                             |
| `ScPdfViewerNextFindInput`       | `input[scInput]`                               | Searches as you type; Enter / Shift+Enter: next / previous.                                                                                                                                                                                                   |
| `ScPdfViewerNextFindResultsInfo` | any                                            | Where results are announced (`role="status"`, `data-state`); write "3 of 12" etc. from the viewer.                                                                                                                                                            |
| `ScPdfViewerNextSetting`         | `scToggleGroup` / `scSlider` / `scSwitch`      | `scPdfViewerNextSetting="…"` binds a setting both ways: `cursorTool`, `scrollMode`, `spreadMode`, `highlightColor`, `highlightThickness`, `highlightShowAll`, `freetextColor`, `freetextSize`, `inkColor`, `inkThickness`, `inkOpacity`. You write the items. |

### States

| Part                        | Use on       | Does                                                                                              |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `ScPdfViewerNextLoading`    | any          | Covers the content while loading (`role="status"`); hidden otherwise.                             |
| `ScPdfViewerNextLoadingBar` | `scProgress` | The download progress along the top; hidden when unknown or done.                                 |
| `ScPdfViewerNextError`      | `scEmpty`    | Shown when loading fails (`role="alert"`, `data-kind`); word it from `viewer.error()`.            |
| `ScPdfViewerNextEmpty`      | `scEmpty`    | Shown while there's no document.                                                                  |
| `ScPdfViewerNextUndoBar`    | any          | The undo bar (`role="status"`, `data-state`); write its content while `viewer.undoable()` is set. |

### Dialogs

Write the `scDialogProvider`, `scDialog` and content; `scPdfViewerNextDialog` on the provider opens it when the viewer needs it and tells the viewer when it's closed (`scDialogClose`, Escape, a click outside).

| `scPdfViewerNextDialog=`                                  | Closing it…                                | Parts inside                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `password`                                                | gives up                                   | `form[scPdfViewerNextPasswordForm]` (`password()`, `incorrect()`), `input[scPdfViewerNextPasswordInput]`                                                                                                                                                                                                                                                                 |
| `print`                                                   | cancels the print                          | `[scProgress][scPdfViewerNextPrintProgress]`; `viewer.printProgress()` for text                                                                                                                                                                                                                                                                                          |
| `altText` (pdf.js's alt-text button on an image opens it) | discards                                   | `form[scPdfViewerNextAltTextForm]` (`text()`, `decorative()`), `textarea[scPdfViewerNextAltTextInput]`, `input[scPdfViewerNextAltTextKind="describe" \| "decorative"]`                                                                                                                                                                                                   |
| `signature` (a new signature editor waits for it)         | discards, and pdf.js's waiting editor goes | `[scPdfViewerNextSignatureForm]` (`mode()` for tabs, `strokes()`, `image()`, `thickness`, `saveForReuse`), `input[scPdfViewerNextSignatureName]`, `canvas[scPdfViewerNextSignaturePad]`, `input[type=file][scPdfViewerNextSignatureImage]`, `input[scPdfViewerNextSignatureDescription]`, `button[scPdfViewerNextSignatureClear]`, `button[scPdfViewerNextSignatureAdd]` |
| `properties`                                              | closes                                     | none: write `viewer.documentProperties()` (file name and size, title, author, subject, keywords, dates as `Temporal.Instant`, creator, producer, PDF version, language, page count, the current page's size in points with its `paper` — `'a4'`, `'letter'`… — and `orientation`, `linearized`); open it with `viewer.openProperties()`                                  |

Saved signatures: write your list of `viewer.savedSignatures()` with `button[scPdfViewerNextSignaturePlace]` (places it: pdf.js's signature editor turns the image into lines), `button[scPdfViewerNextSignatureRemove]` and `button[scPdfViewerNextSignatureNew]` (a new signature editor, which opens the dialog).

### Annotations

pdf.js's annotation editors: `viewer.setEditorMode('highlight' | 'freetext' | 'ink' | 'stamp' | 'signature' | 'comment' | 'none')` (again: off), or your tools (e.g. a `scToggleGroup`) and their options (`scPdfViewerNextSetting`, kept in step with pdf.js both ways: selecting an annotation shows its own). pdf.js draws, selects, moves and resizes them, with its toolbar on each one (colour, alt text, comment, delete); in `none`, a double-click opens one for editing, as in pdf.js. Deleting offers your undo bar (`undoable()`: `annotation-deleted` with its type, `annotations-deleted`, `comment-deleted`).

`input[type=file][scPdfViewerNextAddImage]` places an image on the current page (pdf.js's image editor). Annotations are kept in pdf.js's annotation storage with the form data: written into the PDF on download, printed, carried by page organisation; opening another document clears them.

### Comments

As in pdf.js, a comment belongs to an annotation: the comment button of pdf.js's toolbar on it asks for one — `viewer.pendingComment()` (`{ id, pageNumber, text }`) is set; write a `form[scPdfViewerNextCommentForm]` with `textarea[scPdfViewerNextCommentInput]` and `button[scPdfViewerNextCommentCancel]` while it is. pdf.js then shows a comment button on the annotation.

Write your list of `viewer.comments()` (`{ id, pageNumber, text, date, color }` — the document's own and those written here): `[scPdfViewerNextComment]` per comment (`data-active`, scrolled into view when picked), `button[scPdfViewerNextCommentShow]` (shows its annotation), `button[scPdfViewerNextCommentRemove]` (undoable; the document's own stay). `viewer.updateComment(id, text)` edits one. The `comment` editor mode is pdf.js's comment mode.

### Sidebar views

| Part                                                              | Use on       | Does                                                                                                         |
| ----------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| `ScPdfViewerNextSidebarResizer`                                   | any          | Resizes `viewer.sidebarWidth()` (drag, ←/→) — a `separator`; name it.                                        |
| `ScPdfViewerNextPages`                                            | your list    | A list of `viewer.pageNumbers()`: drag to reorder, Delete / Ctrl+C / X / V on the selection.                 |
| `ScPdfViewerNextPageItem`                                         | each item    | Draggable (`data-drop`, `data-selected`, `data-current`).                                                    |
| `ScPdfViewerNextPageSelect`                                       | `scCheckbox` | Selects the page.                                                                                            |
| `ScPdfViewerNextGoToPage`                                         | `scButton`   | Goes to the page (`aria-current="page"`).                                                                    |
| `ScPdfViewerNextThumbnail`                                        | `img`        | The page's thumbnail, rendered when near view.                                                               |
| `ScPdfViewerNextOutlineItem`                                      | `scButton`   | A bookmark of `viewer.outline()` (`aria-current="location"`, `data-bold`, `data-italic`).                    |
| `ScPdfViewerNextOutlineToggle`                                    | `button`     | Opens its children (`aria-expanded`; Shift: the branch). Show them while `viewer.outlineExpanded().has(id)`. |
| `ScPdfViewerNextOutlineExpandAll` / `CollapseAll` / `FindCurrent` | `button`     | Open / close all, reveal the current bookmark.                                                               |
| `ScPdfViewerNextAttachment`                                       | `button`     | Downloads an attached file of `viewer.attachments()`.                                                        |
| `ScPdfViewerNextLayer`                                            | `scCheckbox` | Shows / hides a layer of `viewer.layers()`; the pages redraw.                                                |

### Page organisation

As pdf.js's: its page map (`pagesMapper`) moves, deletes, copies and pastes pages, and its viewer moves their views — with their annotations, comments and form data — without rebuilding the file. Every change can be undone from the undo bar. Downloading writes the pages in their new order. Inserting another PDF rebuilds the document (from what it is now, annotations and order included).

Buttons act on `viewer.pageSelection()`: `scPdfViewerNextMovePagesEarlier`, `MovePagesLater`, `CopyPages`, `CutPages`, `PastePages` (after the current page; pages keep their labels), `DeletePages`, `ExportPages` (download just those), `InsertPages` (merge another PDF; `insertFailed` when it isn't one). The methods behind them are on the viewer: `movePages`, `deletePages`, `copyPages`, `cutPages`, `pastePages`, `insertFile`, `exportPages`.

## Behaviour

### Opening a document

- **The document's preferences** — its page mode opens the sidebar (`sidebarView`); its page layout sets the scroll and spread modes (unless you changed them); its open action goes to a destination, or prints.
- **Open parameters** in the fragment of `src`: `doc.pdf#page=3`, `#zoom=150` (also `page-width`, `page-fit`, `auto`, `page-actual`, or `150,left,top`), `#nameddest=intro` or `#intro`, `#search=word`, `#pagemode=thumbs|bookmarks|attachments|layers|none`. `viewer.applyHash('page=3')` applies them later.
- **Where it was left** — a document opened again goes back to its page, zoom, scroll and rotation (`rememberView`), unless open parameters or its open action say otherwise.
- **Back / Forward** — jumps (links, bookmarks, thumbnails, the page input, destinations) are remembered, with where the pages were scrolled to: `viewer.goBack()` / `goForward()`, or `scPdfViewerNextBack` / `Forward`. The viewer keeps this history itself, not the browser's (your app owns that).
- **Auto-print** — a document that asks to print on opening is printed (`[autoPrint]="false"` turns it off). Printing renders the pages in a hidden frame: no pop-up.

### Forms

- **AcroForm** fields render as inputs over the page (pdf.js's annotation layer, styled by `pdfjs-dist/web/pdf_viewer.css` — import it in your global styles), named from the document (pdf.js gives their name to the wrapping section only; the viewer gives it to the field). Their values are kept, saved and printed.
- **XFA** forms render as HTML.
- **Scripts** — calculations, formatting, validation, actions — run in pdf.js's sandbox (`[enableScripting]="false"` turns them off).
- **Tagged PDFs** — the page's structure (headings, paragraphs, lists, tables, figures with their alt text, links) is exposed to assistive technology, as in pdf.js's viewer; artifacts (running headers, page numbers) are hidden from it.
- **Annotations** — notes show pdf.js's icons (from `assetsUrl`), file attachments download on double-click, and links that show or hide layers update `layers()`.

### Saving and printing

- **Download** saves the document as pdf.js does, with the annotations, comments and form data written into it and the pages in their order. Without changes it downloads the original file. `viewer.saveDocument()` gives the bytes; `viewer.hasChanges()` tells whether there's anything to save.
- **Print** prints the saved file, so annotations and filled-in fields are on paper too.

### Presentation mode

`viewer.togglePresentation()` (Ctrl+Alt+P): one page at a time, fitted to the screen on black, fullscreen, toolbar hidden. Click / → / Space for the next page, Shift+click / ← for the previous, the wheel or a swipe either way; the cursor hides when still. Escape leaves and restores the view. `data-presenting` on the viewer while it's on.

### Keyboard

pdf.js's shortcuts work while focus is in the viewer (`[keyboardShortcuts]="false"` turns them off): Ctrl+F / G find, Ctrl+= / − / 0 zoom, Ctrl+O open, Ctrl+S download, Ctrl+P print, Ctrl+Alt+G go to page, Ctrl+Alt+P presentation, n / j and p / k next / previous page, Home / End, r / Shift+R rotate, s / h select / hand tool, F4 sidebar. Ctrl+wheel and pinch zoom around the pointer. Rotation goes through pdf.js, so text, links and annotations stay aligned. With `caretBrowsing`, ↑ / ↓ move the caret a line in the text (Shift extends the selection), onto the next page at the end of one, as in pdf.js.

## Performance

pdf.js's viewer's: only pages near the viewport are drawn (its rendering queue), the others released; a detail canvas draws the visible part sharp at high zoom on dense screens; pages redraw at the screen's density. Thumbnails render when they scroll near view, one at a time, and follow their pages through page organisation. After 30 s without drawing, pdf.js's caches (fonts, images) are freed.

## Accessibility

- **Pages are landmarks only when you name them.** pdf.js's viewer makes every page a region landmark named "Page N"; the library takes that off unless you give `pageName` on the canvas (`(page, label) => 'Report, page ' + label`). Why: on a page with two viewers, or in a document whose page labels repeat its numbers, pdf.js's names repeat — screen readers can't tell those landmarks apart, and axe rejects them (`landmark-unique`) — and a long document floods the list of landmarks a screen reader user moves through. Name the pages when your page has one viewer, or with something that tells the viewers apart (the document's title).

- Parts add the roles and states (`toolbar`, `group`, `status`, `alert`, `separator`, `aria-pressed`, `aria-current`, `aria-expanded`, `aria-invalid`…); you give the names. Icon-only buttons, toolbars, groups, the zoom select, the resizer and the signature pad need an `aria-label`.
- Live regions (find results, the undo bar, loading) stay in place, so what you write in them is announced.
- Dialogs (ui's `scDialog`) trap focus, close with Escape and return focus.
- Form fields are named from the document; images with alt text are named by it.
- In high-contrast mode (forced colours) the pages are drawn in the system's colours.

## Find

pdf.js's find controller: words hyphenated at a line end are found whole, phrases match across line breaks, ligatures and compatibility characters (`ﬁ`, `½`) and curly quotes match their plain forms, line breaks between Chinese, Japanese or Korean characters are ignored, and spaces around punctuation are optional. Match case, whole words and accents are options (`findMatchCase`, `findEntireWord`, `findMatchDiacritics`).
