export type ScPdfZoomLevel =
  'auto' | 'page-actual' | 'page-fit' | 'page-width' | number;

export interface ScPdfLoadEvent {
  totalPages: number;
}

export interface ScPdfPageChangeEvent {
  currentPage: number;
  totalPages: number;
}

export interface ScPdfZoomChangeEvent {
  zoom: ScPdfZoomLevel;
  scale: number;
}

export interface ScPdfErrorEvent {
  error: Error;
  message: string;
}

export type ScPdfFindState =
  'idle' | 'found' | 'not-found' | 'wrapped' | 'pending';

export interface ScPdfPageMatchInfo {
  matches: number[];
  matchesLength: number[];
}

export type ScPdfEditorMode =
  'none' | 'highlight' | 'freetext' | 'ink' | 'stamp' | 'signature' | 'comment';

/** Select text, or drag the pages to scroll. */
export type ScPdfCursorTool = 'select' | 'hand';

/** One spread at a time, or all pages in a column, a row, or wrapped. */
export type ScPdfScrollMode = 'page' | 'vertical' | 'horizontal' | 'wrapped';

/** Single pages, or two side by side starting with an odd / even page. */
export type ScPdfSpreadMode = 'none' | 'odd' | 'even';

/** The sidebar's views (the `pagemode` open parameter picks one). */
export type ScPdfSidebarView =
  'thumbnails' | 'outline' | 'attachments' | 'layers' | 'comments';

/** A bookmark of the document's outline, with its destination resolved. */
export interface ScPdfOutlineItem {
  /** Unique within the outline (its path, e.g. `0.2.1`). */
  id: string;
  title: string;
  /** The page it points to, or null for a web link / unresolvable target. */
  pageNumber: number | null;
  /** Where on that page, from 0 (top) to 1 (bottom). */
  top: number;
  /** A web link instead of a destination. */
  url: string | null;
  bold: boolean;
  italic: boolean;
  /** The zoom the destination asks for, if any. */
  zoom?: ScPdfZoomLevel;
  /** Whether the document wants it open initially. */
  open: boolean;
  items: ScPdfOutlineItem[];
}

/** A resolved destination: a page, a position on it and maybe a zoom. */
export interface ScPdfDestination {
  pageNumber: number;
  /** From 0 (top of the page) to 1 (bottom). */
  top: number;
  zoom?: ScPdfZoomLevel;
}

export interface ScPdfEditorAnnotation {
  id: string;
  type: 'highlight' | 'freetext' | 'ink' | 'stamp' | 'signature';
  pageNumber: number;
  // Highlight: array of rects relative to the page (0-1 normalized)
  rects?: { x: number; y: number; width: number; height: number }[];
  color?: string;
  opacity?: number;
  // FreeText
  text?: string;
  x?: number;
  y?: number;
  fontSize?: number;
  fontColor?: string;
  // Ink: array of strokes, each stroke is array of {x,y} points (0-1 normalized)
  strokes?: { x: number; y: number }[][];
  strokeWidth?: number;
  // Stamp / Signature
  imageDataUrl?: string;
  width?: number;
  height?: number;
  // Alt text
  altText?: string;
  isDecorative?: boolean;
  // Description (for signatures)
  description?: string;
}

export interface ScPdfSignatureData {
  id: string;
  dataUrl: string;
  description: string;
  width: number;
  height: number;
}

export interface ScPdfComment {
  id: string;
  pageNumber: number;
  x: number;
  y: number;
  text: string;
  author: string;
  date: string;
  color: string;
}

export const ZOOM_LEVELS: { label: string; value: ScPdfZoomLevel }[] = [
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
