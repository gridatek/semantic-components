# @semantic-components/pdf-viewer

A composable PDF viewer for the Semantic Components library, built on PDF.js (`pdfjs-dist`): navigation, zoom, find, printing and annotation tools, with its chrome built from `@semantic-components/ui`.

## Contents

- **Components**: Root, toolbar parts (page, zoom, rotate, print, download, fullscreen, find), canvas, loading / error / empty states, dialogs (password, print progress, signature, alt text), annotation tool options, sidebar parts (resizer, layers, comments)

## Usage

```ts
import { ScPdfViewerCanvas, ScPdfViewerContainer, ScPdfViewerContent, ScPdfViewerRoot, ScPdfViewerToolbar } from '@semantic-components/pdf-viewer';
```

Also import PDF.js's viewer styles in your `styles.css`: `@import 'pdfjs-dist/web/pdf_viewer.css';`
