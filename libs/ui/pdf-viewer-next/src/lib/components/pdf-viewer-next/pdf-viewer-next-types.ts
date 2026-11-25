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
  | 'annotations-deleted'
  | 'comment-deleted'
  | 'pages-moved'
  | 'pages-deleted'
  | 'pages-pasted'
  | 'pages-inserted';

export interface ScPdfUndoable {
  kind: ScPdfUndoKind;
  count: number;
  /** The deleted annotation's type (`annotation-deleted`). */
  annotation?: ScPdfAnnotationType;
}

/** The annotations pdf.js's editors make. */
export type ScPdfAnnotationType =
  'highlight' | 'freetext' | 'ink' | 'stamp' | 'signature';

export type ScPdfFindState =
  'idle' | 'found' | 'not-found' | 'wrapped' | 'pending';

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

export interface ScPdfSignatureData {
  id: string;
  dataUrl: string;
  description: string;
  width: number;
  height: number;
}

/**
 * A comment on an annotation — one made in the viewer, or the document's
 * own — as pdf.js's comment mode lists them.
 */
export interface ScPdfComment {
  id: string;
  pageNumber: number;
  text: string;
  /** When it was written, if known. */
  date: Temporal.Instant | null;
  /** Its annotation's colour (CSS), if any. */
  color: string | null;
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

/** A standard paper size (pdf.js's document properties name these). */
export type ScPdfPaperSize = 'a3' | 'a4' | 'letter' | 'legal';

/**
 * The document's properties, as pdf.js's properties dialog shows them;
 * format them yourself (dates, sizes, units). Null when the document
 * doesn't say.
 */
export interface ScPdfDocumentProperties {
  fileName: string;
  /** In bytes. */
  fileSize: number | null;
  title: string | null;
  author: string | null;
  subject: string | null;
  keywords: string | null;
  creationDate: Temporal.Instant | null;
  modificationDate: Temporal.Instant | null;
  /** The application that created the original document. */
  creator: string | null;
  /** The application that made the PDF. */
  producer: string | null;
  /** The PDF version, e.g. `1.7`. */
  version: string | null;
  /** The document's language, e.g. `en-US`. */
  language: string | null;
  pageCount: number;
  /** The current page's size, in points (72 to the inch), as shown. */
  pageSize: {
    width: number;
    height: number;
    paper: ScPdfPaperSize | null;
    orientation: 'portrait' | 'landscape';
  } | null;
  /** Fast Web View: it can be shown before it has all downloaded. */
  linearized: boolean;
}

/** Colours to draw the pages with: their text and lines, on a background. */
export interface ScPdfPageColors {
  /** Any CSS colour (system colours too, e.g. `CanvasText`). */
  foreground: string;
  background: string;
}

/** A viewer setting the consumer's controls bind to (`scPdfViewerNextSetting`). */
export type ScPdfViewerNextSettingKey =
  | 'editorMode'
  | 'sidebarView'
  | 'pageColors'
  | 'findHighlightAll'
  | 'findMatchCase'
  | 'findEntireWord'
  | 'findMatchDiacritics'
  | 'caretBrowsing'
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

/** What a menu item does (its value, in a `scPdfViewerNextMenu`). */
export type ScPdfViewerNextCommand =
  | 'open'
  | 'download'
  | 'print'
  | 'presentation'
  | 'fullscreen'
  | 'first-page'
  | 'last-page'
  | 'rotate-right'
  | 'rotate-left'
  | 'properties';
