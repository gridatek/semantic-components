# PDF Viewer

A composable PDF viewer built on [PDF.js](https://mozilla.github.io/pdf.js/) (`pdfjs-dist`, a peer dependency): navigation, zoom, rotation, text selection, links, find, printing, and annotation tools (highlight, text, drawing, images, signatures, comments).

The chrome is built from `@semantic-components/ui`: the viewer's parts add behaviour, and ui components give them their look — `scButton` for every button, `scInput`, `scNativeSelect`, dialogs, tabs, toggle groups, sliders and so on. It follows your theme, light and dark.

## Usage

```html
<div scPdfViewer [src]="url" title="Report" #viewer="scPdfViewer">
  <div scPdfViewerContainer class="flex h-[800px] flex-col">
    <div scPdfViewerToolbar>
      <div scPdfViewerNav>
        <button scButton variant="ghost" size="icon" scPdfViewerPrevPage [scTooltipTrigger]="'Previous page'">
          <svg siChevronUpIcon></svg>
        </button>
        <button scButton variant="ghost" size="icon" scPdfViewerNextPage [scTooltipTrigger]="'Next page'">
          <svg siChevronDownIcon></svg>
        </button>
      </div>
      <div scPdfViewerPageInfo></div>
      <div scSeparator orientation="vertical"></div>
      <div scPdfViewerZoom>
        <button scButton variant="ghost" size="icon" scPdfViewerZoomOut><svg siZoomOutIcon></svg></button>
        <button scButton variant="ghost" size="icon" scPdfViewerZoomIn><svg siZoomInIcon></svg></button>
      </div>
      <div scNativeSelectContainer>
        <select scNativeSelect size="sm" scPdfViewerZoomSelect></select>
        <svg siChevronDownIcon scNativeSelectIcon></svg>
      </div>
      <div scPdfViewerSpacer></div>
      <button scButton variant="ghost" size="icon" scPdfViewerPrint><svg siPrinterIcon></svg></button>
      <button scButton variant="ghost" size="icon" scPdfViewerDownload><svg siDownloadIcon></svg></button>
    </div>

    <div scPdfViewerContent>
      <div scPdfViewerLoading><svg scSpinner siLoaderCircleIcon></svg></div>
      <div scPdfViewerError>
        <button scButton scPdfViewerRetry>Try again</button>
      </div>
      <div scPdfViewerEmpty></div>
      <sc-pdf-viewer-canvas />
    </div>

    <sc-pdf-viewer-password-dialog />
  </div>
</div>
```

The demo (`apps/showcase/.../pdf-viewer-demo.ts`) shows everything: find bar, sidebar (pages, outline, attachments, layers, comments), annotation tools with their options in a popover, a "More" menu, and all dialogs.

### Fullscreen

Dialogs, menus, popovers and tooltips render in a CDK overlay attached to `<body>`, which is hidden while the viewer is fullscreen. Provide CDK's `FullscreenOverlayContainer` once in your app so they follow the fullscreen element:

```typescript
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';

providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }];
```

## Parts

### Root and layout

| Part                    | Selector                    | Description                                                                                                                                                          |
| ----------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScPdfViewerRoot`       | `[scPdfViewer]`             | The document and all state (`exportAs: 'scPdfViewer'`). Inputs below.                                                                                                |
| `ScPdfViewerContainer`  | `[scPdfViewerContainer]`    | The frame (border, rounded corners); the fullscreen element.                                                                                                         |
| `ScPdfViewerToolbar`    | `[scPdfViewerToolbar]`      | The toolbar row.                                                                                                                                                     |
| `ScPdfViewerNav`        | `[scPdfViewerNav]`          | Groups the page buttons (`role="group"`, "Page navigation").                                                                                                         |
| `ScPdfViewerZoom`       | `[scPdfViewerZoom]`         | Groups the zoom buttons (`role="group"`, "Zoom controls").                                                                                                           |
| `ScPdfViewerSpacer`     | `[scPdfViewerSpacer]`       | Pushes what follows to the end.                                                                                                                                      |
| `ScPdfViewerContent`    | `[scPdfViewerContent]`      | The page area; holds the canvas and the state overlays. Opens a file dropped on it (`data-dragging` while one is dragged over; turn off with `[dropFiles]="false"`). |
| `ScPdfViewerCanvas`     | `sc-pdf-viewer-canvas`      | Renders the pages lazily, with text, link and annotation layers.                                                                                                     |
| `ScPdfViewerLoadingBar` | `sc-pdf-viewer-loading-bar` | A thin progress bar along the top of the content while the file downloads (also after the first pages show).                                                         |

Root inputs: `src`, `title` (download file name), `initialPage`, `initialZoom`, `workerSrc`, `keyboardShortcuts`, `autoPrint`, `enableScripting`, `sandboxSrc`, `wasmSrc`. Two-way: `sidebarOpen`, `sidebarView` (`'thumbnails' | 'outline' | 'attachments' | 'layers' | 'comments'`), `cursorTool` (`'select' | 'hand'`), `scrollMode` (`'page' | 'vertical' | 'horizontal' | 'wrapped'`), `spreadMode` (`'none' | 'odd' | 'even'`), `savedSignatures`. Outputs: `loaded`, `pageChange`, `zoomChange`, `errorEvent`, `fileOpened`.

### Opening a document

The viewer opens a document the way pdf.js does:

- **The document's preferences** — its page mode opens the sidebar on the outline, thumbnails, attachments or layers (`sidebarView`); its page layout sets the scroll and spread modes (unless you changed them); its open action goes to a destination, or prints.
- **Open parameters** in the fragment of `src` override them: `doc.pdf#page=3`, `#zoom=150` (also `page-width`, `page-fit`, `auto`, `page-actual`, or `150,left,top` for a position on the page), `#nameddest=intro` or just `#intro`, `#search=word`, `#pagemode=thumbs|bookmarks|attachments|layers|none`. `viewer.applyHash('page=3')` applies them later.
- **Auto-print** — a document that asks to print on opening is printed (`[autoPrint]="false"` turns it off). Printing renders the pages in a hidden frame, so no pop-up is needed.

### Forms

- **AcroForm** fields render as HTML inputs over the page (pdf.js's annotation layer, styled by `pdfjs-dist/web/pdf_viewer.css` — import it in your global styles). Their values live in the document's annotation storage, so they survive scrolling away and are saved and printed.
- **XFA** forms render as HTML (pdf.js's XFA layer).
- **Scripts** — calculations, formatting, validation, page and document actions — run in pdf.js's QuickJS sandbox, loaded only for documents that have them. `sandboxSrc` (`pdf.sandbox.mjs`) and `wasmSrc` (pdf.js's `wasm/` folder, trailing slash) default to unpkg, like `workerSrc`; host them yourself for offline or strict-CSP apps. `[enableScripting]="false"` turns scripts off.

### Saving and printing

- **Download** (`ScPdfViewerDownload`, Ctrl+S, `viewer.download()`) saves the document _with_ the annotations, comments and form data written into it — highlights as Highlight annotations, text as FreeText, drawings as Ink, images and signatures as Stamps, comments as a note icon with a popup holding the author and text. Without changes it downloads the original file.
- `viewer.saveDocument()` gives the saved file's bytes (e.g. to upload); `viewer.hasChanges()` tells whether there's anything to save.
- **Print** prints what you see: the saved file, so annotations and filled-in fields are on paper too.

### Presentation mode

`viewer.togglePresentation()` (Ctrl+Alt+P) shows one page at a time, fitted to the screen on black, in fullscreen with the toolbar hidden. Click or → / Space / PageDown for the next page, Shift+click or ← / PageUp for the previous, the wheel or a horizontal swipe either way; the cursor hides after 3 seconds still. Escape leaves and restores the view. `viewer.presenting()` and `data-presenting` on the root tell when it's on.

### Page organisation

Rebuild the document's pages (with pdf.js's `extractPages`); form data comes along and the viewer's annotations and comments follow their pages. Each change shows "… — Undo" in the undo bar.

| Method                                 | Does                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| `movePages(pages, beforePage)`         | Moves pages before another (past the end: to the end); resolves with their new numbers |
| `deletePages(pages)`                   | Deletes pages (not all of them)                                                        |
| `copyPages(pages)` / `cutPages(pages)` | Copies (cuts) pages to `viewer.pageClipboard()`                                        |
| `pastePages(afterPage?)`               | Pastes them after a page (default: the current one; 0: at the start)                   |
| `insertFile(file, afterPage?)`         | Inserts another PDF's pages — merging files                                            |
| `exportPages(pages)`                   | Downloads just these pages, with their annotations                                     |

`viewer.organizing()` is true while the document is rebuilt. The demo's Pages sidebar uses them: select pages with their checkboxes, drag thumbnails to reorder, and a toolbar to insert a file, paste, move, copy, cut, delete or save the selection (Delete, Ctrl+C / X / V work there too).

### Page labels and outline

- `viewer.pageLabels()` holds the document's page labels ("iv", "A-1"), or null when they're just the numbers. The page field shows the label and "(4 of 120)", and accepts a label or a number; `viewer.pageLabel(n)` gives one.
- `viewer.outline()` is the outline with each bookmark's page and position resolved (`ScPdfOutlineItem`: `title`, `pageNumber`, `top`, `url`, `bold`, `italic`, `open`, `items`). `viewer.goToOutlineItem(item)` goes there — to the right spot on the page, at the zoom it asks for. `viewer.currentOutlineItem()` is the bookmark for the current page (or the nearest before it). The demo renders it as a nested list with disclosure buttons (Shift+click opens a whole branch), expand / collapse all, and "find current outline item".
- `viewer.goToDestination(dest)` / `viewer.resolveDestination(dest)` handle named and explicit destinations; links use them too.

### View options

| Part                     | Selector                     | Description                                                                       |
| ------------------------ | ---------------------------- | --------------------------------------------------------------------------------- |
| `ScPdfViewerViewOptions` | `sc-pdf-viewer-view-options` | Toggle groups for the cursor tool, scroll mode and spreads; show it in a popover. |

Rotation goes through pdf.js, so the text layer, links and annotations stay aligned at any angle. In page scroll mode one spread shows at a time; the wheel past its top or bottom edge, PageUp/PageDown, Space and the arrow keys turn the page.

### Keyboard

The shortcuts of the pdf.js viewer work while focus is inside the viewer (turn them off with `[keyboardShortcuts]="false"`): Ctrl+F / Ctrl+G find, Ctrl+= / Ctrl+− / Ctrl+0 zoom, Ctrl+O open, Ctrl+S download, Ctrl+P print, Ctrl+Alt+G go to page, n / j and p / k next and previous page, Home / End, r / Shift+R rotate, s / h select and hand tool, F4 sidebar. Ctrl+wheel and pinch zoom around the pointer.

### Buttons

Each is a behaviour on a `scButton` — choose its `variant`/`size`, add an icon and a tooltip. Icon-only buttons have an accessible name by default; override it (e.g. to translate) with `aria-label`.

| Part                      | Selector                          | Does                               | Disabled when            |
| ------------------------- | --------------------------------- | ---------------------------------- | ------------------------ |
| `ScPdfViewerPrevPage`     | `button[scPdfViewerPrevPage]`     | Previous page                      | on the first page        |
| `ScPdfViewerNextPage`     | `button[scPdfViewerNextPage]`     | Next page                          | on the last page         |
| `ScPdfViewerZoomIn`       | `button[scPdfViewerZoomIn]`       | Zoom in 25%                        | at 400%                  |
| `ScPdfViewerZoomOut`      | `button[scPdfViewerZoomOut]`      | Zoom out 25%                       | at 25%                   |
| `ScPdfViewerRotateLeft`   | `button[scPdfViewerRotateLeft]`   | Rotate counterclockwise            | —                        |
| `ScPdfViewerRotateRight`  | `button[scPdfViewerRotateRight]`  | Rotate clockwise                   | —                        |
| `ScPdfViewerPrint`        | `button[scPdfViewerPrint]`        | Print (with a progress dialog)     | until the document loads |
| `ScPdfViewerDownload`     | `button[scPdfViewerDownload]`     | Download                           | until the document loads |
| `ScPdfViewerFullscreen`   | `button[scPdfViewerFullscreen]`   | Toggle fullscreen (`aria-pressed`) | —                        |
| `ScPdfViewerFindToggle`   | `button[scPdfViewerFindToggle]`   | Open/close the find bar            | —                        |
| `ScPdfViewerFindPrevious` | `button[scPdfViewerFindPrevious]` | Previous match                     | while there are none     |
| `ScPdfViewerFindNext`     | `button[scPdfViewerFindNext]`     | Next match                         | while there are none     |
| `ScPdfViewerRetry`        | `button[scPdfViewerRetry]`        | Load again after an error          | —                        |

### Fields

| Part                         | Selector                        | Description                                                                      |
| ---------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| `ScPdfViewerPageInfo`        | `[scPdfViewerPageInfo]`         | Editable page number (`scInput`) and the page count.                             |
| `ScPdfViewerZoomSelect`      | `select[scPdfViewerZoomSelect]` | The zoom levels; use on a `scNativeSelect`.                                      |
| `ScPdfViewerFindbar`         | `[scPdfViewerFindbar]`          | The find bar row.                                                                |
| `ScPdfViewerFindInput`       | `input[scPdfViewerFindInput]`   | Searches as you type (Enter / Shift+Enter: next / previous); use on a `scInput`. |
| `ScPdfViewerFindResultsInfo` | `[scPdfViewerFindResultsInfo]`  | "3 of 12" / "Phrase not found" (`role="status"`).                                |

### States

| Part                 | Selector               | Description                                                                                                        |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `ScPdfViewerLoading` | `[scPdfViewerLoading]` | While loading (`role="status"`); project a spinner. Input: `label`.                                                |
| `ScPdfViewerError`   | `[scPdfViewerError]`   | When loading fails (`role="alert"`, a `scEmpty`); project an icon in `scEmptyMedia` and actions. Input: `heading`. |
| `ScPdfViewerEmpty`   | `[scPdfViewerEmpty]`   | While there's no `src` (a `scEmpty`); project an icon and actions. Inputs: `heading`, `description`.               |

### Dialogs

Built on `scDialog` (focus trap, Escape, focus return). Place them anywhere inside `scPdfViewer`.

| Part                         | Selector                         | Description                                                                                 |
| ---------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------- |
| `ScPdfViewerPasswordDialog`  | `sc-pdf-viewer-password-dialog`  | Asks for a protected document's password; closing gives up on it.                           |
| `ScPdfViewerPrintProgress`   | `sc-pdf-viewer-print-progress`   | Print preparation progress; closing cancels the print.                                      |
| `ScPdfViewerSignatureDialog` | `sc-pdf-viewer-signature-dialog` | Type, draw or upload a signature and place it on the current page.                          |
| `ScPdfViewerAltTextDialog`   | `sc-pdf-viewer-alt-text-dialog`  | Alt text for an image annotation. Inputs `open`, `annotationId`; outputs `closed`, `saved`. |

### Annotation tools

Set the tool with `viewer.editorMode` (`'none' | 'highlight' | 'freetext' | 'ink' | 'signature' | 'comment'`); the demo uses a `scToggleGroup`. Each tool's options are a part — show them in a popover:

| Part                               | Selector                                | Options                                       |
| ---------------------------------- | --------------------------------------- | --------------------------------------------- |
| `ScPdfViewerEditorHighlightParams` | `sc-pdf-viewer-editor-highlight-params` | Color, thickness, show all                    |
| `ScPdfViewerEditorFreetextParams`  | `sc-pdf-viewer-editor-freetext-params`  | Color, size                                   |
| `ScPdfViewerEditorInkParams`       | `sc-pdf-viewer-editor-ink-params`       | Color, thickness, opacity                     |
| `ScPdfViewerEditorUndoBar`         | `sc-pdf-viewer-editor-undo-bar`         | "Annotation deleted — Undo" (`role="status"`) |

The swatches come from `SC_PDF_HIGHLIGHT_COLORS` and `SC_PDF_INK_COLORS` (`ScPdfEditorColor[]`). Annotations stay editable in the viewer and are written into the PDF when it's downloaded (see Saving and printing). They belong to the open document: opening another one clears them.

### Sidebar

| Part                        | Selector                        | Description                                                 |
| --------------------------- | ------------------------------- | ----------------------------------------------------------- |
| `ScPdfViewerSidebarResizer` | `sc-pdf-viewer-sidebar-resizer` | Drag or ←/→ (Shift for bigger steps) to resize the sidebar. |
| `ScPdfViewerLayersView`     | `sc-pdf-viewer-layers-view`     | The document's optional content layers, as checkboxes.      |
| `ScPdfViewerCommentSidebar` | `sc-pdf-viewer-comment-sidebar` | Add, edit and delete comments.                              |

## Performance

- The document shows as soon as its first page is read: every page is laid out at the first page's size, and a page whose size differs is corrected when it's drawn.
- Only pages within about one screen of the viewport are drawn; the others are released (canvas, text and link layers) and redrawn when you scroll back, so memory stays flat on long documents.
- Canvases are capped at 16.7 megapixels (high zoom on a dense screen), past which browsers draw nothing; pages redraw when the window moves to a screen with another pixel density.
- Find extracts each page's text once per document, in parallel batches; later searches reuse it.

## Accessibility

- Every control is a native, labelled button, input or select; icon-only buttons have names, toggles report `aria-pressed`, the page and zoom buttons are grouped.
- Loading is announced as a status, load errors as an alert, find results and the undo bar as statuses.
- Dialogs trap focus, close with Escape and return focus.
- The signature tabs are a tab list (arrow keys, one Tab stop).
