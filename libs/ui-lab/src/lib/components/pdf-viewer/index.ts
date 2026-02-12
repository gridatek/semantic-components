// Root directive
export { ScPdfViewerRoot, SC_PDF_VIEWER } from './pdf-viewer-root';

// Container
export { ScPdfViewerContainer } from './pdf-viewer-container';

// Toolbar components
export { ScPdfViewerToolbar } from './pdf-viewer-toolbar-base';
export { ScPdfViewerNav } from './pdf-viewer-nav';
export { ScPdfViewerPrevPage } from './pdf-viewer-prev-page';
export { ScPdfViewerNextPage } from './pdf-viewer-next-page';
export { ScPdfViewerPageInfo } from './pdf-viewer-page-info';
export { ScPdfViewerZoom } from './pdf-viewer-zoom';
export { ScPdfViewerZoomIn } from './pdf-viewer-zoom-in';
export { ScPdfViewerZoomOut } from './pdf-viewer-zoom-out';
export { ScPdfViewerZoomSelect } from './pdf-viewer-zoom-select';
export { ScPdfViewerRotateLeft } from './pdf-viewer-rotate-left';
export { ScPdfViewerRotateRight } from './pdf-viewer-rotate-right';
export { ScPdfViewerDownload } from './pdf-viewer-download';
export { ScPdfViewerPrint } from './pdf-viewer-print';
export { ScPdfViewerFullscreen } from './pdf-viewer-fullscreen';
export { ScPdfViewerSeparator } from './pdf-viewer-separator';
export { ScPdfViewerSpacer } from './pdf-viewer-spacer';

// Content
export { ScPdfViewerContent } from './pdf-viewer-content';

// State components
export { ScPdfViewerLoading } from './pdf-viewer-loading';
export { ScPdfViewerError } from './pdf-viewer-error';
export { ScPdfViewerEmpty } from './pdf-viewer-empty';
export { ScPdfViewerRetry } from './pdf-viewer-retry';

// Types
export { DEFAULT_TOOLBAR_CONFIG, ZOOM_LEVELS } from './pdf-viewer-types';
export type {
  PdfZoomLevel,
  PdfToolbarConfig,
  PdfLoadEvent,
  PdfPageChangeEvent,
  PdfZoomChangeEvent,
  PdfErrorEvent,
} from './pdf-viewer-types';

// Legacy exports for backward compatibility
export { ScPdfViewer } from './pdf-viewer';
export { ScPdfViewerToolbar as ScPdfViewerToolbarLegacy } from './pdf-viewer-toolbar';
