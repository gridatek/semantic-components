# @semantic-components/ui/pdf-viewer

A composable PDF viewer for the Semantic Components library: PDF.js's own viewer (`pdfjs-dist`) with your interface around it: navigation, zoom, find, forms, annotations, saving, printing, presentation mode and page organisation.

You write the markup — usually `@semantic-components/ui` components — and all of its text; the viewer's parts are directives that add behaviour, ARIA wiring and default styles. The library ships no text.

## Contents

- **The viewer** (`scPdfViewer`): the document and all state, for your template to read
- **Layout and pages**: container, toolbar, groups, content, canvas (pdf.js's viewer)
- **Buttons**: page, zoom, rotate, print, download, fullscreen, find, retry, undo, page organisation, outline, signatures, comments
- **Fields and settings**: page input, zoom select, find input, `scPdfViewerSetting` for toggle groups, sliders and switches
- **States**: loading, loading bar, error, empty, undo bar
- **Dialogs**: `scPdfViewerDialog` on your `scDialogProvider` (password, print, signature, alt text), with their form parts
- **Sidebar views**: pages (thumbnails, selection, drag to reorder), outline, attachments, layers, comments, resizer

## Usage

```ts
import { ScPdfViewer, ScPdfViewerCanvas, ScPdfViewerContainer, ScPdfViewerContent, ScPdfViewerToolbar } from '@semantic-components/ui/pdf-viewer';
```

Also import the viewer's stylesheet in your `styles.css`: `@import '@semantic-components/styles/pdf-viewer.css';` — in place of pdf.js's (`pdfjs-dist/web/pdf_viewer.css`; don't import both). It's pdf.js's stylesheet rebuilt for the library: what the pages need (their layers, pdf.js's editors), the library's look on your theme's tokens, and without pdf.js's global `:root { color-scheme: light dark; }` ([pdf.js issue 19886](https://github.com/mozilla/pdf.js/issues/19886)), which would hand the browser's own parts — scrollbars, native form controls — to the operating system's mode instead of your app's. It has no images: the icons pdf.js shows on the pages are your templates (`scPdfViewerIcon`), and its editing cursors are plain ones your CSS can set to yours (`--sc-pdf-viewer-*-cursor`) — see "Icons" in the component's README.

Then define the viewer's colours in your theme, as every colour of it — light on `:root`, dark under `.dark`: `--sc-pdf-viewer-highlight-1` to `-5`, `--sc-pdf-viewer-ink-1` to `-4` (written into the PDF: the `:root` value is the one saved, whatever the mode), `--sc-pdf-viewer-page` and `--sc-pdf-viewer-page-foreground` (reading colours, on screen only). See "Colours" and "Look" in the component's README.

pdf.js's own files — its worker, scripting sandbox, fonts, CMaps (Chinese, Japanese, Korean text), wasm image decoders, colour profiles and the icons of a document's notes — are served by your app, never by a CDN. Copy them into your assets (`angular.json`); the viewer looks for them at `/pdfjs/` (`assetsUrl` for elsewhere):

```json
{
  "glob": "{build/pdf.worker.min.mjs,build/pdf.sandbox.min.mjs,cmaps/**,standard_fonts/**,wasm/**,iccs/**,web/images/annotation-*.svg}",
  "input": "node_modules/pdfjs-dist",
  "output": "pdfjs"
}
```

See `src/lib/components/pdf-viewer/README.md` for every part.
