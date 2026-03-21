export type PdfZoomLevel =
  | 'auto'
  | 'page-actual'
  | 'page-fit'
  | 'page-width'
  | number;

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

export type PdfFindState =
  | 'idle'
  | 'found'
  | 'not-found'
  | 'wrapped'
  | 'pending';

export interface PdfPageMatchInfo {
  matches: number[];
  matchesLength: number[];
}

export const ZOOM_LEVELS: { label: string; value: PdfZoomLevel }[] = [
  { label: 'Auto', value: 'auto' },
  { label: 'Actual Size', value: 'page-actual' },
  { label: 'Page Fit', value: 'page-fit' },
  { label: 'Page Width', value: 'page-width' },
  { label: '50%', value: 0.5 },
  { label: '75%', value: 0.75 },
  { label: '100%', value: 1 },
  { label: '125%', value: 1.25 },
  { label: '150%', value: 1.5 },
  { label: '200%', value: 2 },
  { label: '300%', value: 3 },
  { label: '400%', value: 4 },
];
