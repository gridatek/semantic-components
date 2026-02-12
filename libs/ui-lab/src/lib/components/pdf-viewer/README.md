# PDF Viewer

A document viewer component for displaying PDF files with navigation, zoom, and toolbar controls.

## Installation

Import the components from the pdf-viewer module:

```typescript
import { ScPdfViewer, ScPdfViewerToolbar } from '@/ui/pdf-viewer';
```

## Usage

### Basic Usage

```html
<sc-pdf-viewer [src]="pdfUrl" [title]="'My Document'" class="h-[600px]" />
```

### With Event Handlers

```html
<sc-pdf-viewer [src]="pdfUrl" (loaded)="onLoaded($event)" (pageChange)="onPageChange($event)" (zoomChange)="onZoomChange($event)" (errorEvent)="onError($event)" />
```

```typescript
import type {
  PdfLoadEvent,
  PdfPageChangeEvent,
  PdfZoomChangeEvent,
  PdfErrorEvent,
} from '@/ui/pdf-viewer';

onLoaded(event: PdfLoadEvent): void {
  console.log('PDF loaded, total pages:', event.totalPages);
}

onPageChange(event: PdfPageChangeEvent): void {
  console.log('Page:', event.currentPage, '/', event.totalPages);
}

onZoomChange(event: PdfZoomChangeEvent): void {
  console.log('Zoom level:', event.zoom, 'Scale:', event.scale);
}

onError(event: PdfErrorEvent): void {
  console.error('Error loading PDF:', event.message);
}
```

### Without Toolbar

```html
<sc-pdf-viewer [src]="pdfUrl" [showToolbar]="false" />
```

### Custom Toolbar Configuration

```html
<sc-pdf-viewer
  [src]="pdfUrl"
  [toolbarConfig]="{
    showNavigation: true,
    showPageInfo: true,
    showZoom: true,
    showRotate: false,
    showDownload: true,
    showPrint: false,
    showFullscreen: true
  }"
/>
```

### Initial Page and Zoom

```html
<sc-pdf-viewer [src]="pdfUrl" [initialPage]="3" [initialZoom]="1.5" />
```

### Programmatic Control

```typescript
import { viewChild } from '@angular/core';
import { ScPdfViewer } from '@/ui/pdf-viewer';

readonly pdfViewer = viewChild(ScPdfViewer);

goToPage(page: number): void {
  this.pdfViewer()?.setPage(page);
}

setZoom(level: PdfZoomLevel): void {
  this.pdfViewer()?.setZoom(level);
}
```

## API Reference

### ScPdfViewer

The main PDF viewer component.

#### Inputs

| Input           | Type               | Default                  | Description                        |
| --------------- | ------------------ | ------------------------ | ---------------------------------- |
| `src`           | `string`           | `''`                     | URL of the PDF document            |
| `title`         | `string`           | `''`                     | Document title for a11y & download |
| `showToolbar`   | `boolean`          | `true`                   | Show or hide the toolbar           |
| `toolbarConfig` | `PdfToolbarConfig` | `DEFAULT_TOOLBAR_CONFIG` | Configure toolbar controls         |
| `initialPage`   | `number`           | `1`                      | Initial page to display            |
| `initialZoom`   | `PdfZoomLevel`     | `'auto'`                 | Initial zoom level                 |
| `class`         | `string`           | `''`                     | Additional CSS classes             |

#### Outputs

| Output       | Type                 | Description                |
| ------------ | -------------------- | -------------------------- |
| `loaded`     | `PdfLoadEvent`       | Emitted when PDF is loaded |
| `pageChange` | `PdfPageChangeEvent` | Emitted when page changes  |
| `zoomChange` | `PdfZoomChangeEvent` | Emitted when zoom changes  |
| `errorEvent` | `PdfErrorEvent`      | Emitted on load error      |

#### Public Methods

| Method            | Parameters            | Description                 |
| ----------------- | --------------------- | --------------------------- |
| `setPage()`       | `page: number`        | Navigate to a specific page |
| `setZoom()`       | `level: PdfZoomLevel` | Set the zoom level          |
| `setTotalPages()` | `total: number`       | Set total page count        |

### ScPdfViewerToolbar

Standalone toolbar component (used internally or separately).

## Type Definitions

### PdfToolbarConfig

```typescript
interface PdfToolbarConfig {
  showNavigation?: boolean; // Page navigation buttons
  showZoom?: boolean; // Zoom controls
  showDownload?: boolean; // Download button
  showPrint?: boolean; // Print button
  showFullscreen?: boolean; // Fullscreen toggle
  showPageInfo?: boolean; // Page number display
  showRotate?: boolean; // Rotate buttons
}
```

### PdfZoomLevel

```typescript
type PdfZoomLevel = 'auto' | 'page-fit' | 'page-width' | number;
```

Available zoom presets:

- `'auto'` - Automatic fit
- `'page-fit'` - Fit entire page
- `'page-width'` - Fit to page width
- `number` - Specific scale (e.g., `1.5` for 150%)

### Event Types

```typescript
interface PdfLoadEvent {
  totalPages: number;
}

interface PdfPageChangeEvent {
  currentPage: number;
  totalPages: number;
}

interface PdfZoomChangeEvent {
  zoom: PdfZoomLevel;
  scale: number;
}

interface PdfErrorEvent {
  error: Error;
  message: string;
}
```

## Features

- **Native PDF Rendering**: Uses browser's built-in PDF viewer for maximum compatibility
- **Page Navigation**: Previous/next buttons and direct page input
- **Zoom Controls**: Zoom in/out, preset levels, and custom percentages
- **Rotation**: Rotate document left or right
- **Download**: Download the PDF file
- **Print**: Print the document
- **Fullscreen**: Toggle fullscreen viewing mode
- **Loading State**: Shows spinner while PDF is loading
- **Error Handling**: Displays error message with retry option
- **Empty State**: Placeholder when no PDF is loaded
- **Customizable Toolbar**: Show/hide individual controls
- **Keyboard Accessible**: All controls are keyboard navigable

## Styling

The component uses Tailwind CSS classes and supports theming through CSS variables:

- `--background` / `--foreground`: Base colors
- `--muted` / `--muted-foreground`: Secondary colors
- `--primary` / `--primary-foreground`: Accent colors
- `--destructive`: Error colors
- `--ring`: Focus ring color
- `--border`: Border colors

## Notes

- **CORS**: PDF URLs must be served with appropriate CORS headers for cross-origin access
- **Browser Support**: Uses native browser PDF rendering via `<object>` and `<iframe>` elements
- **Page Count**: For accurate page count tracking, consider integrating PDF.js
- **Print/Download**: Depends on browser permissions and PDF URL accessibility
- **Security**: Be cautious with user-provided PDF URLs to prevent security issues
