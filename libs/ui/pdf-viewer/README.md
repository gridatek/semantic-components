# @semantic-components/ui/pdf-viewer

A composable PDF viewer for the Semantic Components library, built on PDF.js (`pdfjs-dist`): navigation, zoom, find, forms, annotations, saving, printing, presentation mode and page organisation.

You write the markup — usually `@semantic-components/ui` components — and all of its text; the viewer's parts are directives that add behaviour, ARIA wiring and default styles. The library ships no text.

## Contents

- **The viewer** (`scPdfViewer`): the document and all state, for your template to read
- **Layout and pages**: container, toolbar, groups, content, canvas (with templates for the annotation toolbar and comment markers)
- **Buttons**: page, zoom, rotate, print, download, fullscreen, find, retry, undo, page organisation, outline, annotations, signatures, comments
- **Fields and settings**: page input, zoom select, find input, `scPdfViewerSetting` for toggle groups, sliders and switches
- **States**: loading, loading bar, error, empty, undo bar
- **Dialogs**: `scPdfViewerDialog` on your `scDialogProvider` (password, print, signature, alt text), with their form parts
- **Sidebar views**: pages (thumbnails, selection, drag to reorder), outline, attachments, layers, comments, resizer

## Usage

```ts
import { ScPdfViewer, ScPdfViewerCanvas, ScPdfViewerContainer, ScPdfViewerContent, ScPdfViewerToolbar } from '@semantic-components/ui/pdf-viewer';
```

Also import PDF.js's viewer styles in your `styles.css`: `@import 'pdfjs-dist/web/pdf_viewer.css';`

See `src/lib/components/pdf-viewer/README.md` for every part.
