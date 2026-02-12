export type PdfZoomLevel = 'auto' | 'page-fit' | 'page-width' | number;

export interface PdfToolbarConfig {
  showNavigation?: boolean;
  showZoom?: boolean;
  showDownload?: boolean;
  showPrint?: boolean;
  showFullscreen?: boolean;
  showPageInfo?: boolean;
  showRotate?: boolean;
}

export interface PdfLoadEvent {
  totalPages: number;
}

export interface PdfPageChangeEvent {
  currentPage: number;
  totalPages: number;
}

export interface PdfZoomChangeEvent {
  zoom: PdfZoomLevel;
  scale: number;
}

export interface PdfErrorEvent {
  error: Error;
  message: string;
}

export const DEFAULT_TOOLBAR_CONFIG: PdfToolbarConfig = {
  showNavigation: true,
  showZoom: true,
  showDownload: true,
  showPrint: true,
  showFullscreen: true,
  showPageInfo: true,
  showRotate: true,
};

export const ZOOM_LEVELS: { label: string; value: PdfZoomLevel }[] = [
  { label: 'Auto', value: 'auto' },
  { label: 'Page Fit', value: 'page-fit' },
  { label: 'Page Width', value: 'page-width' },
  { label: '50%', value: 0.5 },
  { label: '75%', value: 0.75 },
  { label: '100%', value: 1 },
  { label: '125%', value: 1.25 },
  { label: '150%', value: 1.5 },
  { label: '200%', value: 2 },
];
