# PDF Viewer

A composable PDF viewer built on [PDF.js](https://mozilla.github.io/pdf.js/) (`pdfjs-dist`, a peer dependency): navigation, zoom, rotation, find, text selection, links, forms, annotations (highlight, text, drawing, images, signatures, comments), saving, printing, presentation mode and page organisation.

**pdf.js's viewer, your interface.** The pages are pdf.js's own `PDFViewer`, wired as pdf.js's viewer application wires it (`web/app.js`): its rendering, text, link, form, structure and annotation-editor layers, its find controller, link service, scripting sandbox and page map. Everything around them — toolbars, sidebar, find bar, dialogs, the undo bar — is your template: usually `@semantic-components/ui` components (`scButton`, `scInput`, `scToggleGroup`, `scDialog`…), with the viewer's parts as directives on them adding behaviour, ARIA wiring, state (`data-*` attributes) and default classes you can adjust with `class`. The library ships no text: yours is yours to word and translate. pdf.js's own words on the pages (its editors' toolbar buttons) are its English, or the app's language when the page links pdf.js's locale files (`<link rel="resource" type="application/l10n" href="…/locale/locale.json">`).

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

The demo (`apps/showcase/.../pdf-viewer-demo.ts`) writes out everything: find bar, sidebar (pages with organisation, outline, attachments, layers, comments), annotation tools and their options, signatures and all dialogs.

Parts look up the viewer by dependency injection: put them inside `scPdfViewer`. That includes `ng-template`s you render elsewhere (e.g. a recursive outline): declare them inside it.

### Fullscreen

Dialogs, menus, popovers and tooltips render in a CDK overlay attached to `<body>`, which is hidden while the viewer is fullscreen. Provide CDK's `FullscreenOverlayContainer` once in your app so they follow the fullscreen element:

```typescript
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';

providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }];
```

## The viewer

`ScPdfViewer` (`[scPdfViewer]`, `exportAs: 'scPdfViewer'`) holds the document and all state; your template reads it (`viewer.currentPage()`, `viewer.findState()`…) to write its text.

- **Inputs**: `src`, `fileName` (download / print name, without `.pdf`), `initialPage`, `initialZoom`, `assetsUrl` (where pdf.js's worker, sandbox, fonts, CMaps, wasm decoders and colour profiles are, and the icons of a document's notes — served by your app, never a CDN: `/pdfjs/` by default, see Install in the entry's README), `workerSrc`, `sandboxSrc`, `wasmSrc`, `keyboardShortcuts`, `autoPrint`, `enableScripting`, `enableAutoLinking` (URLs and email addresses in the text become links; on by default), `enablePermissions` (follow the document's permissions — no copying, printing, adding annotations or filling in forms when it forbids them; off by default, as in pdf.js), `rememberView` (a document reopens where it was left — page, zoom, scroll, rotation — as pdf.js's view history; on by default).
- **Two-way**: `sidebarOpen`, `sidebarView`, `cursorTool`, `scrollMode`, `spreadMode`, `savedSignatures`, `pageColors` (on: the pages in the theme's page colours, `--sc-pdf-viewer-page-foreground` on `--sc-pdf-viewer-page` — light on `:root`, dark on `.dark`, following the app's mode; off: the document's own, or the system's in high-contrast mode), `caretBrowsing` (the browser's caret browsing, F7, is on — the page can't tell, so say when your app knows).
- **Outputs**: `loaded`, `pageChange`, `zoomChange`, `errorEvent` (`ScPdfLoadError`), `fileOpened`.
- **State for your text**: `currentPage()`, `totalPages()`, `pageLabels()` / `pageLabel(n)`, `zoom()`, `isLoading()`, `loadProgress()`, `error()` (`{ kind: 'invalid' | 'missing' | 'network' | 'password' | 'unknown' }`), `findState()`, `findCurrentMatchIndex()`, `findTotalMatches()`, `undoable()` (`{ kind, count, annotation? }`), `editorState()` (pdf.js's: `hasSomethingToUndo`, `hasSelectedEditor`…), `currentView()` (the open parameters of where the pages are, for a link to it), `pendingComment()`, `toolSettings()` (the tool whose settings to show: `'highlight'`, `'freetext'`, `'ink'` or null), `insertFailed()` (the name of a file that couldn't be inserted), `printProgress()`, `outline()`, `attachments()`, `layers()`, `comments()`, `savedSignatures()`, `pageSelection()`, `canGoBack()` / `canGoForward()`, `canCopy()` / `canPrint()` / `canEdit()` / `canFillForms()`…

## Parts

### Layout

| Part                   | Selector                 | Does                                                                                                                                                                                           |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScPdfViewerContainer` | `[scPdfViewerContainer]` | The frame — the style's, as `scFrame`'s; the fullscreen element.                                                                                                                               |
| `ScPdfViewerToolbar`   | `[scPdfViewerToolbar]`   | A toolbar row (`role="toolbar"`) — name it.                                                                                                                                                    |
| `ScPdfViewerNav`       | `[scPdfViewerNav]`       | Groups page controls (`role="group"`) — name it.                                                                                                                                               |
| `ScPdfViewerZoom`      | `[scPdfViewerZoom]`      | Groups zoom controls (`role="group"`) — name it.                                                                                                                                               |
| `ScPdfViewerSpacer`    | `[scPdfViewerSpacer]`    | Pushes what follows to the end.                                                                                                                                                                |
| `ScPdfViewerContent`   | `[scPdfViewerContent]`   | The page area. Opens a file dropped on it (`data-dragging`; `[dropFiles]="false"` turns it off).                                                                                               |
| `ScPdfViewerCanvas`    | `div[scPdfViewerCanvas]` | pdf.js's viewer: the pages, with their text, link, form, structure and annotation-editor layers. `pageName`: a function naming each page, which makes the pages landmarks (see Accessibility). |

### Buttons

Each styles its button (the style's button, `ghost` by default): pick another look with `variant` and `size`, as on `scButton`. Write its icon and text, and name the icon-only ones.

| Part                                    | Does                                                  | Disabled when                                       |
| --------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| `scPdfViewerPrevPage` / `NextPage`      | Previous / next page                                  | on the first / last page                            |
| `scPdfViewerBack` / `Forward`           | Back to before the last jump, or again                | with nowhere to go                                  |
| `scPdfViewerZoomIn` / `ZoomOut`         | Zoom a step (×1.1, as pdf.js)                         | at 2500% / 10%                                      |
| `scPdfViewerRotateLeft` / `RotateRight` | Rotate the pages                                      | —                                                   |
| `scPdfViewerPrint`                      | Print (with the `print` dialog)                       | until the document loads, or if it forbids printing |
| `scPdfViewerDownload`                   | Download, with annotations and form data              | until the document loads                            |
| `scPdfViewerFullscreen`                 | Toggle fullscreen (`aria-pressed`)                    | —                                                   |
| `scPdfViewerFindToggle`                 | Open / close the find bar                             | —                                                   |
| `scPdfViewerSidebarToggle`              | Open / close the sidebar (`aria-pressed`)             | —                                                   |
| `scPdfViewerPresentation`               | Presentation mode (`aria-pressed`)                    | until the document loads                            |
| `scPdfViewerOpenFile`                   | Ask for a PDF and open it                             | —                                                   |
| `scPdfViewerAddImage`                   | Ask for an image and place it (pdf.js's image editor) | while the document forbids changes                  |
| `scPdfViewerFindPrevious` / `FindNext`  | Previous / next match                                 | while there are none                                |
| `scPdfViewerRetry`                      | Load again after an error                             | —                                                   |
| `scPdfViewerUndo` / `UndoDismiss`       | Undo / close what the undo bar offers                 | —                                                   |

### Fields and settings

| Part                         | Use on                                                              | Does                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScPdfViewerPageInput`       | `input[scInput]`                                                    | The current page — the label when the document has page labels; accepts a label or a number. Write the count next to it.                                                                                                                                                                                                                                                                                                                                    |
| `ScPdfViewerZoomSelect`      | `select` (`#zoom="scPdfViewerZoomSelect"`)                          | Binds the zoom. Write the options: `auto`, `page-actual`, `page-fit`, `page-width`, `zoom.scales()`, and `zoom.customZoom()` while it's set.                                                                                                                                                                                                                                                                                                                |
| `ScPdfViewerFindbar`         | any                                                                 | The find bar's row, under the toolbar (its look).                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ScPdfViewerFindInput`       | `input[scInput]`                                                    | Searches as you type; Enter / Shift+Enter: next / previous.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `ScPdfViewerFindResultsInfo` | any                                                                 | Where results are announced (`role="status"`, `data-state`); write "3 of 12" etc. from the viewer.                                                                                                                                                                                                                                                                                                                                                          |
| `ScPdfViewerSetting`         | `scToggleGroup` / `scTabs` / `scSlider` / `scSwitch` / `scCheckbox` | `scPdfViewerSetting="…"` binds a setting both ways: `editorMode` (the tools — nothing pressed is `none`; disabled while the document forbids changes), `sidebarView` (tabs), `cursorTool`, `scrollMode`, `spreadMode`, `highlightThickness`, `highlightShowAll`, `freetextSize`, `inkThickness`, `inkOpacity`, `findHighlightAll`, `findMatchCase`, `findEntireWord`, `findMatchDiacritics`, `caretBrowsing`, `pageColors` (a switch). You write the items. |
| `ScPdfViewerMenu`            | `scMenu`                                                            | Runs commands: each item's `value` — `open`, `download`, `print`, `presentation`, `fullscreen`, `first-page`, `last-page`, `rotate-right`, `rotate-left`, `properties`. You write the items.                                                                                                                                                                                                                                                                |

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

| `scPdfViewerDialog=`                                      | Closing it…                                | Parts inside                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `password`                                                | gives up                                   | `form[scPdfViewerPasswordForm]` (`password()`, `incorrect()`), `input[scPdfViewerPasswordInput]`                                                                                                                                                                                                                                                                                                          |
| `print`                                                   | cancels the print                          | `[scProgress][scPdfViewerPrintProgress]`; `viewer.printProgress()` for text                                                                                                                                                                                                                                                                                                                               |
| `altText` (pdf.js's alt-text button on an image opens it) | discards                                   | `form[scPdfViewerAltTextForm]` (`text()`, `decorative()`), `textarea[scPdfViewerAltTextInput]`, `input[scPdfViewerAltTextKind="describe" \| "decorative"]`                                                                                                                                                                                                                                                |
| `signature` (a new signature editor waits for it)         | discards, and pdf.js's waiting editor goes | `[scPdfViewerSignatureForm]` (`strokes()`, `image()`, `thickness`, `saveForReuse`), `[scTabs][scPdfViewerSignatureMode]` (tabs `type`, `draw`, `image`), `input[scPdfViewerSignatureName]`, `canvas[scPdfViewerSignaturePad]`, `button[scPdfViewerSignatureImage]` (asks for the image), `input[scPdfViewerSignatureDescription]`, `button[scPdfViewerSignatureClear]`, `button[scPdfViewerSignatureAdd]` |
| `properties`                                              | closes                                     | none: write `viewer.documentProperties()` (file name and size, title, author, subject, keywords, dates as `Temporal.Instant`, creator, producer, PDF version, language, page count, the current page's size in points with its `paper` — `'a4'`, `'letter'`… — and `orientation`, `linearized`); open it with `viewer.openProperties()`                                                                   |

Saved signatures: write your list of `viewer.savedSignatures()` with `button[scPdfViewerSignaturePlace]` (places it: pdf.js's signature editor turns the image into lines), `button[scPdfViewerSignatureRemove]` and `button[scPdfViewerSignatureNew]` (a new signature editor, which opens the dialog).

### Annotations

pdf.js's annotation editors: `viewer.setEditorMode('highlight' | 'freetext' | 'ink' | 'stamp' | 'signature' | 'comment' | 'none')` (again: off), or your tools — a `scToggleGroup` with `scPdfViewerSetting="editorMode"` — and their options (`scPdfViewerSetting`, kept in step with pdf.js both ways: selecting an annotation shows its own; `viewer.toolSettings()` says which tool's to show). pdf.js draws, selects, moves and resizes them; in `none`, a double-click opens one for editing, as in pdf.js. Deleting offers your undo bar (`undoable()`: `annotation-deleted` with its type, `annotations-deleted`, `comment-deleted`).

**The toolbar on a selected annotation is yours**: an `<ng-template scPdfViewerAnnotationToolbar let-annotation>`, which the viewer stamps where pdf.js puts its own toolbar — in the annotation, so it follows it when moved, resized, zoomed or scrolled, and comes in its focus order — in place of pdf.js's buttons. `annotation` is the one selected (`{ id, type, pageNumber }`, `type` one of `highlight`, `freetext`, `ink`, `stamp`, `signature`): show what fits it. Its parts:

| Part                           | Use on        | Does                                                                                                                 |
| ------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `ScPdfViewerAnnotationToolbar` | `ng-template` | The toolbar's template; its box is the style's popover, as a row. Without it, annotations have no toolbar.           |
| `ScPdfViewerAnnotationComment` | `button`      | Writes the annotation's comment (`viewer.commentAnnotation(id)`: `pendingComment()`, in your comment form). Name it. |
| `ScPdfViewerAnnotationAltText` | `button`      | An image's alt text (`viewer.editAltText(id)`: `altText()`, in your dialog); `data-done` once it has one. Word it.   |
| `ScPdfViewerAnnotationDelete`  | `button`      | Removes it, with the others selected (`viewer.removeAnnotation(id)`; undoable). Name it.                             |
| `ScPdfViewerColor`             | `button`      | A colour swatch (below): in the toolbar, it colours the annotation selected.                                         |

Why the library's and not pdf.js's: pdf.js builds its toolbar itself, with its own icons drawn by its stylesheet and its own words — the library draws no icons (they're your template's, as everywhere) and ships no words. Why stamped into pdf.js's place and not floated over the page: pdf.js keeps its toolbar in the annotation's element, where it follows it through every move, resize, zoom and rotation, and hides it while dragging, for free; the stamped template gets all of that. Focus in it leaves the annotation selected, as pdf.js's own buttons do.

**Colours** are the theme's CSS variables, as the editor's highlight colours: `var(--sc-pdf-viewer-highlight-1)` to `-5` (pdf.js's yellow, green, blue, pink, red) and `var(--sc-pdf-viewer-ink-1)` to `-4` (text and drawings) — the colours of your swatches: `button[scPdfViewerColor]="var(--sc-pdf-viewer-highlight-1)"` with `setting="highlightColor"` (or `freetextColor`, `inkColor`), pressed while it's the one, in a named group (`role="group"`). Define them in your `styles.css` as every theme colour: in oklch, light on `:root`, dark under `.dark` (unset, pdf.js's colours and black, red, blue, green). A selected annotation's colour shows as its swatch.

**Saved and shown.** Unlike the editor's highlights, which only colour the screen, these colours are written into the PDF file — and a file mustn't depend on the mode it was annotated in. So each colour has two sides (`pdf-viewer-colors.ts`):

- **Saved: the `:root` value, always.** The viewer reads it from your stylesheets — the last `:root` (or `html`) rule that sets the variable, inside `@layer`, `@media` and `@supports` too — not from the page, where in dark mode the variable reads its `.dark` value. That's what goes into the file, what prints, what whoever opens it sees: keep the colours you'd want on paper. A stylesheet from another origin can't be read (the browser's rule): define the variables in your own; if none is found, the variable's value in light mode is saved.
- **Shown: the value now.** Highlights show their `.dark` value on dark pages only — `pageColors` in dark mode, where a light highlight would glare and hide the light text. pdf.js has on-screen variants of its highlight colours for this (the ones it uses while it draws the pages in other colours, its `_HCM` colours): the viewer gives it the `.dark` values there, and pdf.js writes the saved ones into the file. On the document's own white pages — in dark mode too, as in pdf.js — the saved colours show: a dark highlight would darken the text under it.
- **Text and drawings** have no on-screen variant in pdf.js: they're drawn, and saved, in the `:root` colour, whatever the pages. Their `.dark` value colours your swatches (in dark mode, the ink swatch for black can read white on your dark toolbar): give them one that stands for the saved colour.

The page colours (`pageColors`: `--sc-pdf-viewer-page` and `--sc-pdf-viewer-page-foreground`) are the other way round: they only paint the screen, so their light and dark values are just that, and the pages follow the app's mode. Several reading looks are named themes (`[data-theme='…']`), as for the theme's other colours.

`button[scPdfViewerAddImage]` places an image on the current page (pdf.js's image editor). Annotations are kept in pdf.js's annotation storage with the form data: written into the PDF on download, printed, carried by page organisation; opening another document clears them.

### Comments

As in pdf.js, a comment belongs to an annotation: the comment button of pdf.js's toolbar on it asks for one — `viewer.pendingComment()` (`{ id, pageNumber, text }`) is set; write a `form[scPdfViewerCommentForm]` with `textarea[scPdfViewerCommentInput]` and `button[scPdfViewerCommentCancel]` while it is. pdf.js then shows a comment button on the annotation.

Write your list of `viewer.comments()` (`{ id, pageNumber, text, date, color }` — the document's own and those written here): `[scPdfViewerComment]` per comment (`data-active`, scrolled into view when picked), `button[scPdfViewerCommentShow]` (shows its annotation), `button[scPdfViewerCommentEdit]` (edits it in your comment form), `button[scPdfViewerCommentRemove]` (undoable; the document's own stay). The `comment` editor mode is pdf.js's comment mode. As there, the comments show in the sidebar (`sidebarView` `comments`) in comment mode, while one is written, and when one is picked.

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

As pdf.js's: its page map (`pagesMapper`) moves, deletes, copies and pastes pages, and its viewer moves their views — with their annotations, comments and form data — without rebuilding the file. Every change can be undone from the undo bar. Downloading writes the pages in their new order. Inserting another PDF rebuilds the document (from what it is now, annotations and order included).

Buttons act on `viewer.pageSelection()`: `scPdfViewerMovePagesEarlier`, `MovePagesLater`, `CopyPages`, `CutPages`, `PastePages` (after the current page; pages keep their labels), `DeletePages`, `ExportPages` (download just those), `InsertPages` (merge another PDF; `insertFailed` when it isn't one). The methods behind them are on the viewer: `movePages`, `deletePages`, `copyPages`, `cutPages`, `pastePages`, `insertFile`, `exportPages`.

## Behaviour

### Opening a document

- **The document's preferences** — its page mode opens the sidebar (`sidebarView`); its page layout sets the scroll and spread modes (unless you changed them); its open action goes to a destination, or prints.
- **Open parameters** in the fragment of `src`: `doc.pdf#page=3`, `#zoom=150` (also `page-width`, `page-fit`, `auto`, `page-actual`, or `150,left,top`), `#nameddest=intro` or `#intro`, `#search=word`, `#pagemode=thumbs|bookmarks|attachments|layers|none`. `viewer.applyHash('page=3')` applies them later.
- **Where it was left** — a document opened again goes back to its page, zoom, scroll and rotation (`rememberView`), unless open parameters or its open action say otherwise.
- **Back / Forward** — jumps (links, bookmarks, thumbnails, the page input, destinations) are remembered, with where the pages were scrolled to: `viewer.goBack()` / `goForward()`, or `scPdfViewerBack` / `Forward`. The viewer keeps this history itself, not the browser's (your app owns that).
- **Auto-print** — a document that asks to print on opening is printed (`[autoPrint]="false"` turns it off). Printing renders the pages in a hidden frame: no pop-up.

### Forms

- **AcroForm** fields render as inputs over the page (pdf.js's annotation layer, styled by the viewer's stylesheet — `@semantic-components/styles/pdf-viewer.css`, in your global styles), named from the document (pdf.js gives their name to the wrapping section only; the viewer gives it to the field). Their values are kept, saved and printed.
- **XFA** forms render as HTML.
- **Scripts** — calculations, formatting, validation, actions — run in pdf.js's sandbox (`[enableScripting]="false"` turns them off).
- **Tagged PDFs** — the page's structure (headings, paragraphs, lists, tables, figures with their alt text, links) is exposed to assistive technology, as in pdf.js's viewer; artifacts (running headers, page numbers) are hidden from it.
- **Annotations** — notes show pdf.js's icons (from `assetsUrl`), file attachments download on double-click, and links that show or hide layers update `layers()`.

### Saving and printing

- **Download** saves the document as pdf.js does, with the annotations, comments and form data written into it and the pages in their order. Without changes it downloads the original file. `viewer.saveDocument()` gives the bytes; `viewer.hasChanges()` tells whether there's anything to save.
- **Print** prints the saved file, so annotations and filled-in fields are on paper too.

### Look

The pages and what pdf.js draws on them are styled by the library's stylesheet, `@semantic-components/styles/pdf-viewer.css` (import it in your global styles, in place of pdf.js's `pdf_viewer.css`). It is pdf.js's own, rebuilt for the library by `scripts/build-pdf-viewer-css.mjs` — not pdf.js's imported and then overridden, which took important declarations (pdf.js's stylesheet is unlayered: it beats any Tailwind utility) and left its global rules in place:

- **What pdf.js's pages need, kept** — their text, annotation, XFA and structure layers, pdf.js's annotation editors (with the comment buttons by annotations, the alt-text badge and tooltip), the page view. pdf.js's application is left out — its toolbar, sidebars, dialogs, find bar, message bars, undo bar, the buttons of its toolbar on an annotation: the library's parts are those (your annotation toolbar's box is pdf.js's, only placing it).
- **pdf.js's global `color-scheme`, dropped** — `pdf_viewer.css` sets `:root { color-scheme: light dark; }` for the whole page, not only the viewer ([pdf.js issue 19886](https://github.com/mozilla/pdf.js/issues/19886)): the browser's own parts (scrollbars, native form controls) and every `light-dark()` would follow the operating system's mode instead of the app's. Ours doesn't set it: the page's `color-scheme` stays the app's (`ScPresetManager` sets it with the mode, see the preset's README). The text, annotation and XFA layers keep pdf.js's `color-scheme: only light`: the pages are drawn light, whatever the mode.
- **pdf.js's colours on the theme's tokens** — the variables of what it draws on the pages take `--popover`, `--border`, `--accent`, `--primary`, `--ring`, `--muted` and the theme's shadows; its `6px` corners, `--radius`. Its forced-colours rules stay, with their system colours.
- **The page frame** — `scripts/pdf-viewer-theme.css`, appended to the built file (next to the script: only the built file is shipped): pages 8px apart and from the edges, on the theme's background, with a small shadow (pdf.js's frame is a transparent border its application draws a shadow image in); in forced colours, a `CanvasText` border instead. pdf.js's buttons on the pages (the comment buttons) take the browser's button font, as pdf.js expects (Tailwind's preflight would give them the page's, and their icons would leave them) — not yours, in your annotation toolbar. pdf.js's box for the annotation toolbar loses its look: yours has the style's.
- **No images** — pdf.js's are dropped, its icons and the ones it writes inline alike: the library draws no icons. See "Icons" below.
- **The colours of the pages themselves** — highlights, ink, reading colours — are your theme's variables (see "Colours" above).

When pdfjs-dist is upgraded, run the script again: `node scripts/build-pdf-viewer-css.mjs --list` shows what's kept and what's dropped (compare with the last version: a new pdf.js section may need a rule), then without `--list` it writes the stylesheet, pdf.js's images dropped (a new editing cursor stops the script: give it a variable in `CURSORS`; a new icon needs a place in `scPdfViewerIcon`). Don't edit the built part by hand: change the script's rules, or `scripts/pdf-viewer-theme.css`.

### Icons

The library draws no icons — yours are in your templates, the annotation toolbar's included. pdf.js shows a few on the pages itself, in elements it builds: an `<ng-template scPdfViewerIcon="…">` is stamped into each, as pdf.js makes them (pdf.js's image is off: without your template, there's none).

| Name               | Where                                                                                     | E.g.                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `comment`          | The button by an annotation with a comment (pdf.js names it)                              | `<svg siMessageSquareTextIcon></svg>`                     |
| `alt-text-missing` | The badge on an image without alt text                                                    | `<svg siImageOffIcon></svg>`                              |
| `media-play`       | The button that plays a video or sound in the document (pdf.js names it: the file's name) | `<svg siCirclePlayIcon></svg>`                            |
| `page-loading`     | A page being drawn: shown while it is                                                     | `<svg scSpinner siLoaderCircleIcon aria-label="…"></svg>` |

The library sizes your icon for the place, and it takes the colour pdf.js gives it (`currentColor`: the comment button's, state by state). Why templates and not CSS images: an image in a stylesheet is the library's icon, which you'd have to override in CSS — and couldn't swap for your icon set's component; a template is yours, as every icon in the library.

**Cursors** are the exception: pdf.js's editing cursors are CSS, and no template can be a cursor. They're pdf.js's without its images (`pointer`, `text`), each behind a variable your CSS can set to yours (its whole cursor value: `--sc-pdf-viewer-ink-cursor: url(pen.svg) 0 16, pointer;`):

| Variable                                | The cursor                     |
| --------------------------------------- | ------------------------------ |
| `--sc-pdf-viewer-ink-cursor`            | While drawing                  |
| `--sc-pdf-viewer-highlight-cursor`      | Over text, highlighting        |
| `--sc-pdf-viewer-free-highlight-cursor` | Highlighting freely (off text) |
| `--sc-pdf-viewer-freetext-cursor`       | Placing text                   |

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
