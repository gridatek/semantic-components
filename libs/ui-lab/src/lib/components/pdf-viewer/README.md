# PDF Viewer

A composable document viewer for displaying PDF files, built on [PDF.js](https://mozilla.github.io/pdf.js/). Provides navigation, zoom, rotation, text selection, and a fully customizable toolbar through standalone Angular directives.

## Architecture

The PDF viewer follows a **composable directive** pattern. Instead of a single monolithic component, it's broken into small, focused directives that you assemble in your template. This gives full control over layout, styling, and which features to include.

### Core Directives

| Directive              | Selector                 | Description                                   |
| ---------------------- | ------------------------ | --------------------------------------------- |
| `ScPdfViewerRoot`      | `[scPdfViewer]`          | Root directive, manages PDF document state    |
| `ScPdfViewerContainer` | `[scPdfViewerContainer]` | Layout wrapper (card-like container)          |
| `ScPdfViewerToolbar`   | `[scPdfViewerToolbar]`   | Toolbar container (flex row)                  |
| `ScPdfViewerContent`   | `[scPdfViewerContent]`   | Content area wrapping canvas + state overlays |
| `ScPdfViewerCanvas`    | `sc-pdf-viewer-canvas`   | Renders PDF pages on canvas with text layer   |

### Toolbar Controls

| Directive                | Description                  |
| ------------------------ | ---------------------------- |
| `ScPdfViewerNav`         | Navigation button group      |
| `ScPdfViewerPrevPage`    | Previous page button         |
| `ScPdfViewerNextPage`    | Next page button             |
| `ScPdfViewerPageInfo`    | Current page / total display |
| `ScPdfViewerZoom`        | Zoom button group            |
| `ScPdfViewerZoomIn`      | Zoom in button               |
| `ScPdfViewerZoomOut`     | Zoom out button              |
| `ScPdfViewerZoomSelect`  | Zoom level dropdown          |
| `ScPdfViewerRotateLeft`  | Rotate left button           |
| `ScPdfViewerRotateRight` | Rotate right button          |
| `ScPdfViewerDownload`    | Download button              |
| `ScPdfViewerPrint`       | Print button                 |
| `ScPdfViewerFullscreen`  | Fullscreen toggle            |
| `ScPdfViewerSeparator`   | Visual separator             |
| `ScPdfViewerSpacer`      | Flexible spacer              |

### State Overlays

| Directive            | Description                      |
| -------------------- | -------------------------------- |
| `ScPdfViewerLoading` | Loading spinner                  |
| `ScPdfViewerError`   | Error message display            |
| `ScPdfViewerEmpty`   | Empty state (no PDF loaded)      |
| `ScPdfViewerRetry`   | Retry button (used inside error) |

## Usage

```html
<div scPdfViewer [src]="pdfUrl" [title]="'My Document'" #viewer="scPdfViewer">
  <div scPdfViewerContainer>
    <div scPdfViewerToolbar>
      <div scPdfViewerNav>
        <button scPdfViewerPrevPage></button>
        <button scPdfViewerNextPage></button>
      </div>
      <sc-pdf-viewer-page-info />
      <sc-pdf-viewer-separator />
      <div scPdfViewerZoom>
        <button scPdfViewerZoomOut></button>
        <button scPdfViewerZoomIn></button>
      </div>
      <sc-pdf-viewer-zoom-select />
      <sc-pdf-viewer-spacer />
      <button scPdfViewerDownload></button>
      <button scPdfViewerPrint></button>
    </div>
    <div scPdfViewerContent>
      <sc-pdf-viewer-loading />
      <sc-pdf-viewer-error>
        <button scPdfViewerRetry></button>
      </sc-pdf-viewer-error>
      <sc-pdf-viewer-empty />
      <sc-pdf-viewer-canvas />
    </div>
  </div>
</div>
```

## Features

- **PDF.js rendering** - Canvas-based rendering via pdfjs-dist
- **Text selection** - Transparent text layer overlay for copy/paste
- **Lazy page rendering** - Only visible pages are rendered (IntersectionObserver)
- **Zoom** - Numeric scale, auto, page-fit, page-width presets
- **Rotation** - 90-degree rotation in both directions
- **Page navigation** - Prev/next buttons with smooth scroll
- **Current page tracking** - Updates as user scrolls
- **Download & print** - Built-in buttons
- **Fullscreen** - Native fullscreen API
- **Responsive** - ResizeObserver-based container-aware scaling
- **Keyboard accessible** - All controls are keyboard navigable
- **Composable** - Pick only the directives you need

## Coming Soon

- **Annotation layer** - Render PDF annotations (links, form fields, comments)
- **Thumbnail sidebar** - Built-in sidebar component with page thumbnails
- **Find / search** - Built-in text search with highlight across pages
- **Outline / bookmarks** - Table of contents from PDF document outline
- **Spread modes** - Side-by-side page display (odd, even spreads)
- **Scroll modes** - Vertical, horizontal, and wrapped scroll layouts
- **Hand tool / grab scroll** - Drag-to-scroll cursor mode
- **Document properties** - Built-in dialog showing PDF metadata
- **Page input** - Direct page number input for jump-to-page
- **Keyboard shortcuts** - Configurable keyboard bindings for navigation and zoom
- **Accessibility improvements** - Enhanced screen reader support and ARIA annotations
