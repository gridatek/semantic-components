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

Also import PDF.js's viewer styles in your `styles.css`: `@import 'pdfjs-dist/web/pdf_viewer.css';`

That stylesheet sets `:root { color-scheme: light dark; }` for the whole page, not only the viewer ([pdf.js issue 19886](https://github.com/mozilla/pdf.js/issues/19886)): the browser's own parts — scrollbars, native form controls — would follow the operating system's mode instead of your app's. `ScPresetManager` sets the page's `color-scheme` inline on `<html>` with the mode, which no stylesheet overrides: nothing to do with it. Without it, set it yourself the same way (`document.documentElement.style.colorScheme = 'light'` or `'dark'`) — see the preset's README, "The mode tells the browser".

See `src/lib/components/pdf-viewer/README.md` for every part.
