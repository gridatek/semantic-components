# PDF Viewer

A composable PDF viewer built on [PDF.js](https://mozilla.github.io/pdf.js/) (`pdfjs-dist`, a peer dependency): navigation, zoom, rotation, find, text selection, links, forms, annotations (highlight, text, drawing, images, signatures, comments), saving, printing, presentation mode and page organisation.

**You write the markup; the library adds behaviour.** Every element, text, icon and accessible name is in your template — usually `@semantic-components/ui` components (`scButton`, `scInput`, `scToggleGroup`, `scDialog`…). The viewer's parts are directives on them: they add behaviour, ARIA wiring, state (`data-*` attributes) and default classes you can adjust with `class`. The library ships no text at all, so everything is yours to word and translate. Only the pages themselves — what pdf.js draws — are rendered by the library.

## Usage

```html
<div scPdfViewer [src]="url" fileName="report" #viewer="scPdfViewer">
  <div scPdfViewerContainer class="flex h-[800px] flex-col">
    <div scPdfViewerToolbar aria-label="Document">
      <div scPdfViewerNav aria-label="Page navigation">
        <button scPdfViewerPrevPage>
          <svg siChevronUpIcon></svg>
          <span class="sr-only">Previous page</span>
        </button>
        <button scPdfViewerNextPage>
          <svg siChevronDownIcon></svg>
          <span class="sr-only">Next page</span>
        </button>
      </div>
      <input scInput scPdfViewerPageInput aria-label="Page" />
      <span>/ {{ viewer.totalPages() }}</span>
      <div scPdfViewerSpacer></div>
      <button scPdfViewerDownload>
        <svg siDownloadIcon></svg>
        <span class="sr-only">Download</span>
      </button>
    </div>

    <div scPdfViewerContent>
      <div scPdfViewerLoading><svg scSpinner siLoaderCircleIcon></svg> Loading…</div>
      <div scEmpty scPdfViewerError>
        <div scEmptyTitle>Couldn't open the document</div>
        <button scPdfViewerRetry>Try again</button>
      </div>
      <div scPdfViewerCanvas></div>
    </div>
  </div>
</div>
```

The demo (`apps/showcase/.../pdf-viewer-demo.ts`) writes out everything: find bar, sidebar (pages with organisation, outline, attachments, layers, comments), annotation tools and their options, the annotation toolbar, comment markers, signatures and all dialogs.

Parts look up the viewer by dependency injection: put them inside `scPdfViewer`. That includes `ng-template`s you render elsewhere (e.g. a recursive outline): declare them inside it.

### Fullscreen

Dialogs, menus, popovers and tooltips render in a CDK overlay attached to `<body>`, which is hidden while the viewer is fullscreen. Provide CDK's `FullscreenOverlayContainer` once in your app so they follow the fullscreen element:

```typescript
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';

providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }];
```

## The viewer

`ScPdfViewer` (`[scPdfViewer]`, `exportAs: 'scPdfViewer'`) holds the document and all state; your template reads it (`viewer.currentPage()`, `viewer.findState()`…) to write its text.

- **Inputs**: `src`, `fileName` (download / print name, without `.pdf`), `initialPage`, `initialZoom`, `assetsUrl` (where pdf.js's worker, sandbox, fonts, CMaps, wasm decoders and colour profiles are — unpkg by default; host `pdfjs-dist`'s folders yourself for offline or strict-CSP apps), `workerSrc`, `sandboxSrc`, `wasmSrc`, `keyboardShortcuts`, `autoPrint`, `enableScripting`, `enableAutoLinking` (URLs and email addresses in the text become links; on by default), `enablePermissions` (follow the document's permissions — no copying, printing, adding annotations or filling in forms when it forbids them; off by default, as in pdf.js), `pageColors` (`{ foreground, background }` to draw the pages with; unset, they follow the system's high-contrast mode), `caretBrowsing` (the browser's caret browsing, F7, is on — the page can't tell, so say when your app knows).
- **Two-way**: `sidebarOpen`, `sidebarView`, `cursorTool`, `scrollMode`, `spreadMode`, `savedSignatures`.
- **Outputs**: `loaded`, `pageChange`, `zoomChange`, `errorEvent` (`ScPdfLoadError`), `fileOpened`.
- **State for your text**: `currentPage()`, `totalPages()`, `pageLabels()` / `pageLabel(n)`, `zoom()`, `isLoading()`, `loadProgress()`, `error()` (`{ kind: 'invalid' | 'missing' | 'network' | 'password' | 'unknown' }`), `findState()`, `findCurrentMatchIndex()`, `findTotalMatches()`, `undoable()` (`{ kind, count }`), `printProgress()`, `outline()`, `attachments()`, `layers()`, `comments()`, `savedSignatures()`, `pageSelection()`, `canGoBack()` / `canGoForward()`, `canCopy()` / `canPrint()` / `canEdit()` / `canFillForms()`…

## Parts

### Layout

| Part                   | Selector                 | Does                                                                                                        |
| ---------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `ScPdfViewerContainer` | `[scPdfViewerContainer]` | The frame; the fullscreen element.                                                                          |
| `ScPdfViewerToolbar`   | `[scPdfViewerToolbar]`   | A toolbar row (`role="toolbar"`) — name it.                                                                 |
| `ScPdfViewerNav`       | `[scPdfViewerNav]`       | Groups page controls (`role="group"`) — name it.                                                            |
| `ScPdfViewerZoom`      | `[scPdfViewerZoom]`      | Groups zoom controls (`role="group"`) — name it.                                                            |
| `ScPdfViewerSpacer`    | `[scPdfViewerSpacer]`    | Pushes what follows to the end.                                                                             |
| `ScPdfViewerContent`   | `[scPdfViewerContent]`   | The page area. Opens a file dropped on it (`data-dragging`; `[dropFiles]="false"` turns it off).            |
| `ScPdfViewerCanvas`    | `div[scPdfViewerCanvas]` | The pages, with text, link, form and annotation layers. `pageName`: a function naming each page (a region). |

### Buttons

Each styles its button (the preset's button, `ghost` by default): pick another look with `variant` and `size`, as on `scButton`. Write its icon and text, and name the icon-only ones.

| Part                                    | Does                                     | Disabled when                                       |
| --------------------------------------- | ---------------------------------------- | --------------------------------------------------- |
| `scPdfViewerPrevPage` / `NextPage`      | Previous / next page                     | on the first / last page                            |
| `scPdfViewerBack` / `Forward`           | Back to before the last jump, or again   | with nowhere to go                                  |
| `scPdfViewerZoomIn` / `ZoomOut`         | Zoom a step (×1.1, as pdf.js)            | at 2500% / 10%                                      |
| `scPdfViewerRotateLeft` / `RotateRight` | Rotate the pages                         | —                                                   |
| `scPdfViewerPrint`                      | Print (with the `print` dialog)          | until the document loads, or if it forbids printing |
| `scPdfViewerDownload`                   | Download, with annotations and form data | until the document loads                            |
| `scPdfViewerFullscreen`                 | Toggle fullscreen (`aria-pressed`)       | —                                                   |
| `scPdfViewerFindToggle`                 | Open / close the find bar                | —                                                   |
| `scPdfViewerFindPrevious` / `FindNext`  | Previous / next match                    | while there are none                                |
| `scPdfViewerRetry`                      | Load again after an error                | —                                                   |
| `scPdfViewerUndo` / `UndoDismiss`       | Undo / close what the undo bar offers    | —                                                   |

### Fields and settings

| Part                         | Use on                                     | Does                                                                                                                                                                                                                                                      |
| ---------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScPdfViewerPageInput`       | `input[scInput]`                           | The current page — the label when the document has page labels; accepts a label or a number. Write the count next to it.                                                                                                                                  |
| `ScPdfViewerZoomSelect`      | `select` (`#zoom="scPdfViewerZoomSelect"`) | Binds the zoom. Write the options: `auto`, `page-actual`, `page-fit`, `page-width`, `zoom.scales()`, and `zoom.customZoom()` while it's set.                                                                                                              |
| `ScPdfViewerFindbar`         | any                                        | The find bar row.                                                                                                                                                                                                                                         |
| `ScPdfViewerFindInput`       | `input[scInput]`                           | Searches as you type; Enter / Shift+Enter: next / previous.                                                                                                                                                                                               |
| `ScPdfViewerFindResultsInfo` | any                                        | Where results are announced (`role="status"`, `data-state`); write "3 of 12" etc. from the viewer.                                                                                                                                                        |
| `ScPdfViewerSetting`         | `scToggleGroup` / `scSlider` / `scSwitch`  | `scPdfViewerSetting="…"` binds a setting both ways: `cursorTool`, `scrollMode`, `spreadMode`, `highlightColor`, `highlightThickness`, `highlightShowAll`, `freetextColor`, `freetextSize`, `inkColor`, `inkThickness`, `inkOpacity`. You write the items. |

### States

| Part                    | Use on       | Does                                                                                              |
| ----------------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `ScPdfViewerLoading`    | any          | Covers the content while loading (`role="status"`); hidden otherwise.                             |
| `ScPdfViewerLoadingBar` | `scProgress` | The download progress along the top; hidden when unknown or done.                                 |
| `ScPdfViewerError`      | `scEmpty`    | Shown when loading fails (`role="alert"`, `data-kind`); word it from `viewer.error()`.            |
| `ScPdfViewerEmpty`      | `scEmpty`    | Shown while there's no document.                                                                  |
| `ScPdfViewerUndoBar`    | any          | The undo bar (`role="status"`, `data-state`); write its content while `viewer.undoable()` is set. |

### Dialogs

Write the `scDialogProvider`, `scDialog` and content; `scPdfViewerDialog` on the provider opens it when the viewer needs it and tells the viewer when it's closed (`scDialogClose`, Escape, a click outside).

| `scPdfViewerDialog=` | Closing it…       | Parts inside                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `password`           | gives up          | `form[scPdfViewerPasswordForm]` (`password()`, `incorrect()`), `input[scPdfViewerPasswordInput]`                                                                                                                                                                                                                                             |
| `print`              | cancels the print | `[scProgress][scPdfViewerPrintProgress]`; `viewer.printProgress()` for text                                                                                                                                                                                                                                                                  |
| `altText`            | discards          | `form[scPdfViewerAltTextForm]` (`text()`, `decorative()`), `textarea[scPdfViewerAltTextInput]`, `input[scPdfViewerAltTextKind="describe" \| "decorative"]`                                                                                                                                                                                   |
| `signature`          | discards          | `[scPdfViewerSignatureForm]` (`mode()` for tabs, `strokes()`, `image()`, `thickness`, `saveForReuse`), `input[scPdfViewerSignatureName]`, `canvas[scPdfViewerSignaturePad]`, `input[type=file][scPdfViewerSignatureImage]`, `input[scPdfViewerSignatureDescription]`, `button[scPdfViewerSignatureClear]`, `button[scPdfViewerSignatureAdd]` |
| `properties`         | closes            | none: write `viewer.documentProperties()` (file name and size, title, author, subject, keywords, dates as `Temporal.Instant`, creator, producer, PDF version, language, page count, the current page's size in points with its `paper` — `'a4'`, `'letter'`… — and `orientation`, `linearized`); open it with `viewer.openProperties()`      |

Saved signatures: write your list of `viewer.savedSignatures()` with `button[scPdfViewerSignaturePlace]`, `button[scPdfViewerSignatureRemove]` and `button[scPdfViewerSignatureNew]` (opens the dialog).

### Annotations

Set the tool with `viewer.setEditorMode('highlight' | 'freetext' | 'ink' | 'comment' | 'none')`; write the tools (e.g. a `scToggleGroup`) and their options (`scPdfViewerSetting`). The canvas draws the annotations with your theme; what you place on the pages is yours, as templates inside `div[scPdfViewerCanvas]`:

| Template                                    | Context                                                        | Use in it                                                                                                                       |
| ------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `ng-template[scPdfViewerAnnotationToolbar]` | `$implicit`: the selected annotation                           | `button[scPdfViewerAnnotationDelete]`, `button[scPdfViewerAnnotationAltText]`, `button[scPdfViewerAnnotationColor]` (+ `color`) |
| `ng-template[scPdfViewerCommentMarker]`     | `$implicit` (null while placing), `index`, `active`, `pending` | `button[scPdfViewerCommentShow]`                                                                                                |

`input[type=file][scPdfViewerAddImage]` places an image on the current page. Select an annotation by clicking it; drag to move, drag a corner of an image to resize, double-click text to edit it, Delete to delete, Escape to deselect. Annotations stay editable and are written into the PDF on download; opening another document clears them.

### Comments

Write your list of `viewer.comments()`: `[scPdfViewerComment]` per comment (`data-active`, scrolled into view when picked), `button[scPdfViewerCommentShow]`, `button[scPdfViewerCommentRemove]`, `button[scPdfViewerCommentAdd]` (the comment tool, `aria-pressed`), and while `viewer.pendingComment()` is set a `form[scPdfViewerCommentForm]` with `textarea[scPdfViewerCommentInput]` and `button[scPdfViewerCommentCancel]`. `viewer.updateComment(id, text)` edits one.

### Sidebar views

| Part                                                          | Use on       | Does                                                                                                         |
| ------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| `ScPdfViewerSidebarResizer`                                   | any          | Resizes `viewer.sidebarWidth()` (drag, ←/→) — a `separator`; name it.                                        |
| `ScPdfViewerPages`                                            | your list    | A list of `viewer.pageNumbers()`: drag to reorder, Delete / Ctrl+C / X / V on the selection.                 |
| `ScPdfViewerPageItem`                                         | each item    | Draggable (`data-drop`, `data-selected`, `data-current`).                                                    |
| `ScPdfViewerPageSelect`                                       | `scCheckbox` | Selects the page.                                                                                            |
| `ScPdfViewerGoToPage`                                         | `scButton`   | Goes to the page (`aria-current="page"`).                                                                    |
| `ScPdfViewerThumbnail`                                        | `img`        | The page's thumbnail, rendered when near view.                                                               |
| `ScPdfViewerOutlineItem`                                      | `scButton`   | A bookmark of `viewer.outline()` (`aria-current="location"`, `data-bold`, `data-italic`).                    |
| `ScPdfViewerOutlineToggle`                                    | `button`     | Opens its children (`aria-expanded`; Shift: the branch). Show them while `viewer.outlineExpanded().has(id)`. |
| `ScPdfViewerOutlineExpandAll` / `CollapseAll` / `FindCurrent` | `button`     | Open / close all, reveal the current bookmark.                                                               |
| `ScPdfViewerAttachment`                                       | `button`     | Downloads an attached file of `viewer.attachments()`.                                                        |
| `ScPdfViewerLayer`                                            | `scCheckbox` | Shows / hides a layer of `viewer.layers()`; the pages redraw.                                                |

### Page organisation

Each change rebuilds the document with pdf.js's `extractPages` — form data comes along, annotations and comments follow their pages — and can be undone from the undo bar. Buttons act on `viewer.pageSelection()`: `scPdfViewerMovePagesEarlier`, `MovePagesLater`, `CopyPages`, `CutPages`, `PastePages` (after the current page), `DeletePages`, `ExportPages` (download just those), `InsertPages` (merge another PDF; `insertFailed` when it isn't one). The methods behind them are on the viewer: `movePages`, `deletePages`, `copyPages`, `cutPages`, `pastePages`, `insertFile`, `exportPages`.

## Behaviour

### Opening a document

- **The document's preferences** — its page mode opens the sidebar (`sidebarView`); its page layout sets the scroll and spread modes (unless you changed them); its open action goes to a destination, or prints.
- **Open parameters** in the fragment of `src`: `doc.pdf#page=3`, `#zoom=150` (also `page-width`, `page-fit`, `auto`, `page-actual`, or `150,left,top`), `#nameddest=intro` or `#intro`, `#search=word`, `#pagemode=thumbs|bookmarks|attachments|layers|none`. `viewer.applyHash('page=3')` applies them later.
- **Back / Forward** — jumps (links, bookmarks, thumbnails, the page input, destinations) are remembered, with where the pages were scrolled to: `viewer.goBack()` / `goForward()`, or `scPdfViewerBack` / `Forward`. The viewer keeps this history itself, not the browser's (your app owns that).
- **Auto-print** — a document that asks to print on opening is printed (`[autoPrint]="false"` turns it off). Printing renders the pages in a hidden frame: no pop-up.

### Forms

- **AcroForm** fields render as inputs over the page (pdf.js's annotation layer, styled by `pdfjs-dist/web/pdf_viewer.css` — import it in your global styles), named from the document. Their values are kept, saved and printed.
- **XFA** forms render as HTML.
- **Scripts** — calculations, formatting, validation, actions — run in pdf.js's sandbox (`[enableScripting]="false"` turns them off).
- **Tagged PDFs** — the page's structure (headings, paragraphs, lists, tables, figures with their alt text, links) is exposed to assistive technology, as in pdf.js's viewer; artifacts (running headers, page numbers) are hidden from it.
- **Annotations** — notes show pdf.js's icons (from `assetsUrl`), file attachments download on double-click, and links that show or hide layers update `layers()`.

### Saving and printing

- **Download** saves the document with the annotations, comments and form data written into it (Highlight, FreeText, Ink and Stamp annotations; comments as a note with a popup). Without changes it downloads the original file. `viewer.saveDocument()` gives the bytes; `viewer.hasChanges()` tells whether there's anything to save.
- **Print** prints the saved file, so annotations and filled-in fields are on paper too.

### Presentation mode

`viewer.togglePresentation()` (Ctrl+Alt+P): one page at a time, fitted to the screen on black, fullscreen, toolbar hidden. Click / → / Space for the next page, Shift+click / ← for the previous, the wheel or a swipe either way; the cursor hides when still. Escape leaves and restores the view. `data-presenting` on the viewer while it's on.

### Keyboard

pdf.js's shortcuts work while focus is in the viewer (`[keyboardShortcuts]="false"` turns them off): Ctrl+F / G find, Ctrl+= / − / 0 zoom, Ctrl+O open, Ctrl+S download, Ctrl+P print, Ctrl+Alt+G go to page, Ctrl+Alt+P presentation, n / j and p / k next / previous page, Home / End, r / Shift+R rotate, s / h select / hand tool, F4 sidebar. Ctrl+wheel and pinch zoom around the pointer. Rotation goes through pdf.js, so text, links and annotations stay aligned. With `caretBrowsing`, ↑ / ↓ move the caret a line in the text (Shift extends the selection), onto the next page at the end of one, as in pdf.js.

## Performance

- The document shows as soon as its first page is read: pages are laid out at the first page's size and corrected when drawn.
- Only pages near the viewport are drawn; the others are released and redrawn on return, so memory stays flat on long documents. Thumbnails render when they scroll near view, one at a time.
- Canvas pixels line up with the screen's (the page's size is rounded so the ratio is exact), so text stays crisp. Canvases are capped at 16.7 megapixels; past that (high zoom on a dense screen) the page is drawn lower and a detail canvas draws the visible part sharp, again as you scroll. Pages redraw when the window moves to a screen with another pixel density.
- After 30 s without drawing, pdf.js's caches (fonts, images) are freed.
- Find extracts each page's text once per document, in parallel batches.

## Accessibility

- Parts add the roles and states (`toolbar`, `group`, `status`, `alert`, `separator`, `aria-pressed`, `aria-current`, `aria-expanded`, `aria-invalid`…); you give the names. Icon-only buttons, toolbars, groups, the zoom select, the resizer and the signature pad need an `aria-label`.
- Live regions (find results, the undo bar, loading) stay in place, so what you write in them is announced.
- Dialogs (ui's `scDialog`) trap focus, close with Escape and return focus.
- Form fields are named from the document; images with alt text are named by it.
- In high-contrast mode (forced colours) the pages are drawn in the system's colours.

## Find

As in pdf.js: words hyphenated at a line end are found whole, phrases match across line breaks, ligatures and compatibility characters (`ﬁ`, `½`) and curly quotes match their plain forms, line breaks between Chinese, Japanese or Korean characters are ignored, and spaces around punctuation are optional. Match case, whole words and accents are options (`findMatchCase`, `findEntireWord`, `findMatchDiacritics`).
