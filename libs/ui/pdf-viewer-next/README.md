# @semantic-components/ui/pdf-viewer-next

A composable PDF viewer for the Semantic Components library: PDF.js's own viewer (`pdfjs-dist`) with your interface around it: navigation, zoom, find, forms, annotations, saving, printing, presentation mode and page organisation.

You write the markup — usually `@semantic-components/ui` components — and all of its text; the viewer's parts are directives that add behaviour, ARIA wiring and default styles. The library ships no text.

## Contents

- **The viewer** (`scPdfViewerNext`): the document and all state, for your template to read
- **Layout and pages**: container, toolbar, groups, content, canvas (pdf.js's viewer)
- **Buttons**: page, zoom, rotate, print, download, fullscreen, find, retry, undo, page organisation, outline, signatures, comments
- **Fields and settings**: page input, zoom select, find input, `scPdfViewerNextSetting` for toggle groups, sliders and switches
- **States**: loading, loading bar, error, empty, undo bar
- **Dialogs**: `scPdfViewerNextDialog` on your `scDialogProvider` (password, print, signature, alt text), with their form parts
- **Sidebar views**: pages (thumbnails, selection, drag to reorder), outline, attachments, layers, comments, resizer

## Usage

```ts
import { ScPdfViewerNext, ScPdfViewerNextCanvas, ScPdfViewerNextContainer, ScPdfViewerNextContent, ScPdfViewerNextToolbar } from '@semantic-components/ui/pdf-viewer-next';
```

Also import PDF.js's viewer styles in your `styles.css`: `@import 'pdfjs-dist/web/pdf_viewer.css';`

See `src/lib/components/pdf-viewer-next/README.md` for every part.
