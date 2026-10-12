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

/** Why a document couldn't be loaded; the consumer writes the message. */
export type ScPdfLoadErrorKind =
  'invalid' | 'missing' | 'network' | 'password' | 'unknown';

/** A failed load: its kind, and pdf.js's error when there is one. */
export interface ScPdfLoadError {
  kind: ScPdfLoadErrorKind;
  error: Error | null;
}

/** What the undo bar can undo, and how many items it concerns. */
export type ScPdfUndoKind =
  | 'annotation-deleted'
  | 'annotations-cleared'
  | 'pages-moved'
  | 'pages-deleted'
  | 'pages-pasted'
  | 'pages-inserted';

export interface ScPdfUndoable {
  kind: ScPdfUndoKind;
  count: number;
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

/** A file attached to the document. */
export interface ScPdfAttachment {
  filename: string;
  /** The file, when pdf.js has loaded it (otherwise it's fetched by `id`). */
  content?: Uint8Array;
  id?: string;
}

/** A layer (optional content group) of the document. */
export interface ScPdfLayer {
  id: string;
  /** From the document. */
  name: string;
  visible: boolean;
}

/** Colours to draw the pages with: their text and lines, on a background. */
export interface ScPdfPageColors {
  /** Any CSS colour (system colours too, e.g. `CanvasText`). */
  foreground: string;
  background: string;
}

/** A viewer setting the consumer's controls bind to (`scPdfViewerSetting`). */
export type ScPdfViewerSettingKey =
  | 'cursorTool'
  | 'scrollMode'
  | 'spreadMode'
  | 'highlightColor'
  | 'highlightThickness'
  | 'highlightShowAll'
  | 'freetextColor'
  | 'freetextSize'
  | 'inkColor'
  | 'inkThickness'
  | 'inkOpacity';
