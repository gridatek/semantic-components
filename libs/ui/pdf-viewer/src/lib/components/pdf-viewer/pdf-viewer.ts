import {
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  type WritableSignal,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import type { PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdfjs-dist';
import {
  AnnotationMode,
  GlobalWorkerOptions,
  PermissionFlag,
  getDocument,
  version,
} from 'pdfjs-dist';
import { moveCaret } from './pdf-viewer-caret-browsing';
import {
  HIGHLIGHT_COLORS,
  INK_COLORS,
  colorSetting,
  resolveColor,
  resolvePageColors,
} from './pdf-viewer-colors';
import type {
  ScPdfJsComment,
  ScPdfJsEditor,
  ScPdfJsUiManager,
} from './pdf-viewer-editing';
import {
  EDITOR_MODES,
  EDITOR_PARAMS,
  SIGNATURE_HEIGHT,
  editorManagers,
  toComment,
  undoneAnnotation,
} from './pdf-viewer-editing';
import {
  SCROLL_MODES,
  SPREAD_MODES,
  type ScPdfEngine,
  type ScPdfHistoryEntry,
} from './pdf-viewer-engine';
import { loadDocumentProperties } from './pdf-viewer-properties';
import type {
  ScPdfAttachment,
  ScPdfComment,
  ScPdfCursorTool,
  ScPdfDestination,
  ScPdfDocumentProperties,
  ScPdfEditorMode,
  ScPdfFindState,
  ScPdfLayer,
  ScPdfLoadError,
  ScPdfLoadEvent,
  ScPdfOutlineItem,
  ScPdfPageChangeEvent,
  ScPdfPageColors,
  ScPdfScrollMode,
  ScPdfSidebarView,
  ScPdfSignatureData,
  ScPdfSpreadMode,
  ScPdfUndoable,
  ScPdfZoomChangeEvent,
  ScPdfZoomLevel,
} from './pdf-viewer-types';

/** As pdf.js (the detail canvas keeps high zoom sharp). */
const MIN_SCALE = 0.1;
const MAX_SCALE = 25;

/** pdf.js's optional content (layers) config; not exported by pdfjs-dist. */
type ScPdfOptionalContentConfig = Awaited<
  ReturnType<PDFDocumentProxy['getOptionalContentConfig']>
>;

/** A script that prints, in a document's JavaScript actions (as pdf.js). */
const AUTO_PRINT = /\bprint\s*\(/;

/** How long without rendering before pdf.js's caches are freed (as pdf.js). */
const CLEANUP_TIMEOUT = 30_000;

/** pdf.js's named zooms. */
const NAMED_ZOOMS = new Set([
  'auto',
  'page-actual',
  'page-fit',
  'page-width',
  'page-height',
]);

/** Back / Forward remembers this many places. */
const MAX_HISTORY = 50;

/** pdf.js's find states (`FindState`), by our names. */
const FIND_STATES: Record<number, ScPdfFindState> = {
  0: 'found',
  1: 'not-found',
  2: 'wrapped',
  3: 'pending',
};

/**
 * pdf.js's editor mode (`AnnotationEditorType`). Its typings give the getter
 * the setter's type; it's the mode's number.
 */
function editorModeOf(engine: ScPdfEngine): number {
  return engine.viewer.annotationEditorMode as unknown as number;
}

/**
 * The pages a page map says (`getPageMappingForSaving`, `extractPages`),
 * written out — with the annotations on them.
 */
function extractMapped(
  doc: PDFDocumentProxy,
  mapping: unknown,
): Promise<Uint8Array> {
  const { pageInfos, copyLevels } = mapping as {
    pageInfos: Parameters<PDFDocumentProxy['extractPages']>[0];
    copyLevels: Parameters<PDFDocumentProxy['extractPages']>[1];
  };
  return doc.extractPages(pageInfos, copyLevels);
}

/** The editor settings that are colours. */
const COLOR_PARAMS = new Set<number>([
  EDITOR_PARAMS.HIGHLIGHT_COLOR,
  EDITOR_PARAMS.FREETEXT_COLOR,
  EDITOR_PARAMS.INK_COLOR,
]);

/** A pdf.js mode number by our name. */
function modeName<T extends string>(
  modes: Record<T, number>,
  mode: number,
  fallback: T,
): T {
  return (
    (Object.keys(modes) as T[]).find((name) => modes[name] === mode) ?? fallback
  );
}

/** The document's `PageLayout` as scroll and spread modes. */
const PAGE_LAYOUTS: Record<string, [ScPdfScrollMode, ScPdfSpreadMode]> = {
  SinglePage: ['page', 'none'],
  OneColumn: ['vertical', 'none'],
  TwoColumnLeft: ['vertical', 'odd'],
  TwoColumnRight: ['vertical', 'even'],
  TwoPageLeft: ['page', 'odd'],
  TwoPageRight: ['page', 'even'],
};

/** The document's `PageMode` as a sidebar view. */
const PAGE_MODES: Record<string, ScPdfSidebarView> = {
  UseOutlines: 'outline',
  UseThumbs: 'thumbnails',
  UseAttachments: 'attachments',
  UseOC: 'layers',
};

/** The `pagemode` open parameter as a sidebar view (`none` closes it). */
const HASH_PAGE_MODES: Record<string, ScPdfSidebarView> = {
  thumbs: 'thumbnails',
  bookmarks: 'outline',
  attachments: 'attachments',
  layers: 'layers',
};

/** pdf.js's outline item, as `getOutline()` returns it. */
interface ScPdfOutlineNode {
  title: string;
  dest: string | unknown[] | null;
  url: string | null;
  bold: boolean;
  italic: boolean;
  count: number | undefined;
  items: ScPdfOutlineNode[];
}

/**
 * Page labels worth showing: not when they're all empty or just the page
 * numbers again (as pdf.js).
 */
function usefulPageLabels(
  labels: string[] | null,
  numPages: number,
): string[] | null {
  if (!labels || labels.length !== numPages) return null;
  let standard = 0;
  let empty = 0;
  labels.forEach((label, i) => {
    const trimmed = (label ?? '').trim();
    if (!trimmed) empty++;
    else if (trimmed === String(i + 1)) standard++;
  });
  return standard >= numPages || empty >= numPages ? null : labels;
}

/** A page of the rebuilt document: one of the current document's, or another PDF's. */
type ScPdfPageEntry =
  | { page: number }
  | {
      data: Uint8Array;
      /** 0-based page index in `data`. */
      index: number;
      /** Annotations / comments of `data`'s pages (page = index + 1). */
    };

/**
 * `extractPages` page infos placing each entry at its position: one info per
 * source document — and per repetition, since an info lists a page once —
 * with its pages ascending, as pdf.js takes them.
 */
function pageInfos(entries: ScPdfPageEntry[]): {
  document: Uint8Array | null;
  includePages: number[];
  pageIndices: number[];
}[] {
  const infos: {
    document: Uint8Array | null;
    pairs: [index: number, position: number][];
  }[] = [];
  entries.forEach((entry, position) => {
    const document = 'page' in entry ? null : entry.data;
    const index = 'page' in entry ? entry.page - 1 : entry.index;
    let info = infos.find(
      (candidate) =>
        candidate.document === document &&
        !candidate.pairs.some(([i]) => i === index),
    );
    if (!info) infos.push((info = { document, pairs: [] }));
    info.pairs.push([index, position]);
  });
  return infos.map(({ document, pairs }) => {
    pairs.sort((a, b) => a[0] - b[0]);
    return {
      document,
      includePages: pairs.map(([index]) => index),
      pageIndices: pairs.map(([, position]) => position),
    };
  });
}

/** The ids of these bookmarks and all their descendants. */
function outlineIds(items: ScPdfOutlineItem[]): string[] {
  return items.flatMap((item) => [item.id, ...outlineIds(item.items)]);
}

/** The ids of the bookmarks the document wants open. */
function openOutlineIds(items: ScPdfOutlineItem[]): string[] {
  return items.flatMap((item) => [
    ...(item.open ? [item.id] : []),
    ...openOutlineIds(item.items),
  ]);
}

/** pdf.js's load failure as a kind the consumer can word. */
function loadError(err: unknown): ScPdfLoadError {
  const error = err instanceof Error ? err : null;
  switch (error?.name) {
    case 'InvalidPDFException':
      return { kind: 'invalid', error };
    case 'PasswordException':
      return { kind: 'password', error };
    case 'MissingPDFException':
      return { kind: 'missing', error };
    case 'ResponseException': {
      const status = (error as Error & { status?: number }).status;
      return { kind: status === 404 ? 'missing' : 'network', error };
    }
  }
  // fetch() rejects with a TypeError when the network fails.
  return { kind: error instanceof TypeError ? 'network' : 'unknown', error };
}

/** A field of a pdf.js result that's a `Map` or a plain object. */
function field(source: unknown, key: string): unknown {
  if (source instanceof Map) return source.get(key);
  return source && typeof source === 'object'
    ? (source as Record<string, unknown>)[key]
    : undefined;
}

/** The values of a pdf.js result that's a `Map` or a plain object. */
function values(source: unknown): unknown[] {
  if (source instanceof Map) return [...source.values()];
  return source && typeof source === 'object' ? Object.values(source) : [];
}

/** `doc.pdf#page=3` → the URL and its open parameters. */
function splitSource(source: string): { url: string; hash: string } {
  const index = source.indexOf('#');
  return index < 0
    ? { url: source, hash: '' }
    : { url: source.slice(0, index), hash: source.slice(index + 1) };
}

export const SC_PDF_VIEWER = new InjectionToken<ScPdfViewer>('SC_PDF_VIEWER');

@Directive({
  selector: '[scPdfViewer]',
  exportAs: 'scPdfViewer',
  providers: [{ provide: SC_PDF_VIEWER, useExisting: ScPdfViewer }],
  host: {
    '[class]': 'class()',
    '[attr.data-loading]': 'isLoading() || null',
    '[attr.data-error]': 'error() ? true : null',
    '[attr.data-fullscreen]': 'isFullscreen() || null',
    '[attr.data-presenting]': 'presenting() || null',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScPdfViewer {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() => cn('block', this.classInput()));

  // Inputs
  readonly src = input<string>('');
  /** The file name for downloads and prints, without `.pdf`. */
  readonly fileName = input<string>('');
  readonly initialPage = input(1);
  readonly initialZoom = input<ScPdfZoomLevel>('auto');
  /**
   * Base URL of the `pdfjs-dist` package's files (trailing slash): the
   * worker, the scripting sandbox, and the fonts, CMaps (Chinese, Japanese,
   * Korean text), wasm image decoders and colour profiles pdf.js loads as
   * needed. Defaults to unpkg for the installed version; host them yourself
   * for offline or strict-CSP apps (`pdfjs-dist`'s `build`, `cmaps`,
   * `standard_fonts`, `wasm` and `iccs` folders).
   */
  readonly assetsUrl = input(`https://unpkg.com/pdfjs-dist@${version}/`);
  /** URL of `pdf.worker.mjs`, if not under `assetsUrl`. */
  readonly workerSrc = input<string>('');
  /**
   * Run the document's JavaScript (form calculations, formatting,
   * validation, actions) in pdf.js's sandbox, as pdf.js does.
   */
  readonly enableScripting = input(true);
  /** Make URLs and email addresses in the text clickable (as pdf.js). */
  readonly enableAutoLinking = input(true);
  /**
   * Follow the document's permissions: no copying, printing, editing or
   * filling in forms when it forbids them. Off by default, as in pdf.js
   * (they're easily bypassed, and only some viewers honour them).
   */
  readonly enablePermissions = input(false);
  /**
   * Draw the pages in the theme's page colours (a reading mode): its
   * `--sc-pdf-viewer-page-foreground` on `--sc-pdf-viewer-page` — light and
   * dark values as every theme colour (`.dark`), the pages following the
   * app's mode. Off: the document's own colours — or, in the system's
   * high-contrast mode (forced colours), its `CanvasText` on `Canvas`, as in
   * pdf.js.
   */
  readonly pageColors = model(false);
  /**
   * The browser's caret browsing (F7) is on: ↑ / ↓ move the caret a line
   * in the pages' text, as pdf.js does. The page can't tell, so say when
   * your app knows (as pdf.js's `supportsCaretBrowsingMode`).
   */
  readonly caretBrowsing = model(false);

  /** The system's high-contrast mode is on. */
  private readonly forcedColors = signal(false);
  /**
   * The page's root changed its mode or theme (`dark`, `data-theme`…): the
   * theme's page colours have other values, to read again.
   */
  private readonly themeChanges = signal(0);

  /**
   * The colours pages are drawn with (CSS — the theme's variables), or null
   * for their own. The real colours are read where they're drawn.
   */
  readonly appliedPageColors = computed((): ScPdfPageColors | null => {
    if (this.pageColors()) {
      // A new object when the mode or theme changes: the pages are drawn
      // again, in the colours the variables have then.
      this.themeChanges();
      return {
        foreground: 'var(--sc-pdf-viewer-page-foreground)',
        background: 'var(--sc-pdf-viewer-page)',
      };
    }
    return this.forcedColors()
      ? { foreground: 'CanvasText', background: 'Canvas' }
      : null;
  });
  /** URL of `pdf.sandbox.mjs`, if not under `assetsUrl`. */
  readonly sandboxSrc = input<string>('');
  /** URL of pdf.js's `wasm/` folder (trailing slash), if not under `assetsUrl`. */
  readonly wasmSrc = input<string>('');

  // Outputs
  readonly loaded = output<ScPdfLoadEvent>();
  readonly pageChange = output<ScPdfPageChangeEvent>();
  readonly zoomChange = output<ScPdfZoomChangeEvent>();
  readonly errorEvent = output<ScPdfLoadError>();
  /** A local file was opened (`openFile()`, `loadFile()`, drag and drop). */
  readonly fileOpened = output<{ name: string }>();

  /** pdf.js's keyboard shortcuts, while focus is in the viewer. */
  readonly keyboardShortcuts = input(true);
  /** Print when the document asks to on opening (as pdf.js). */
  readonly autoPrint = input(true);
  /**
   * Reopens a document where it was left — page, zoom, scroll, rotation — as
   * pdf.js's view history does (kept in the browser's storage).
   */
  readonly rememberView = input(true);
  /** Whether the sidebar is open (F4 toggles it). Bind `[(sidebarOpen)]`. */
  readonly sidebarOpen = model(false);
  /**
   * The sidebar view to show. The document's page mode and the `pagemode`
   * open parameter set it on load.
   */
  readonly sidebarView = model<ScPdfSidebarView>('thumbnails');
  /** Select text, or drag the pages to scroll (S / H). */
  readonly cursorTool = model<ScPdfCursorTool>('select');
  /** How the pages are laid out. */
  readonly scrollMode = model<ScPdfScrollMode>('vertical');
  /** Single pages or two side by side. */
  readonly spreadMode = model<ScPdfSpreadMode>('none');
  /** The scale the pages are drawn at (reported by the canvas). */
  readonly currentScale = signal(1);
  /** Incremented to move focus to the find field / the page field. */
  readonly findFocusRequest = signal(0);
  readonly pageFocusRequest = signal(0);

  // State signals
  readonly isLoading = signal(true);
  /** Why the document couldn't be loaded (the consumer writes the message). */
  readonly error = signal<ScPdfLoadError | null>(null);
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
  readonly zoom = signal<ScPdfZoomLevel>('auto');
  readonly rotation = signal(0);
  readonly isFullscreen = signal(false);
  /** Presentation mode: one page at a time, fit to the screen, fullscreen. */
  readonly presenting = signal(false);
  /** Pages copied or cut, for `pastePages` (pdf.js's page map holds them). */
  readonly pageClipboard = signal<{ count: number; cut: boolean } | null>(null);
  /** The document is being rebuilt (another file inserted). */
  readonly organizing = signal(false);

  /** The view before presentation mode, restored after it. */
  private presentationState: {
    scrollMode: ScPdfScrollMode;
    spreadMode: ScPdfSpreadMode;
    zoom: ScPdfZoomLevel;
    sidebarOpen: boolean;
    cursorTool: ScPdfCursorTool;
  } | null = null;

  // PDF.js document
  readonly pdfDocument = signal<PDFDocumentProxy | null>(null);

  /** The document's page labels (e.g. "iv", "A-1"), or null to show numbers. */
  readonly pageLabels = signal<string[] | null>(null);
  /** The document's outline (bookmarks), with destinations resolved. */
  readonly outline = signal<ScPdfOutlineItem[]>([]);

  /** The first bookmark (breadth first) pointing to each page. */
  private readonly outlineByPage = computed(() => {
    const byPage = new Map<number, ScPdfOutlineItem>();
    const queue = [...this.outline()];
    for (let item = queue.shift(); item; item = queue.shift()) {
      if (item.pageNumber && !byPage.has(item.pageNumber)) {
        byPage.set(item.pageNumber, item);
      }
      queue.push(...item.items);
    }
    return byPage;
  });

  /**
   * The bookmark for the current page — or the nearest page before it that
   * has one (as pdf.js's "find current outline item").
   */
  readonly currentOutlineItem = computed(() => {
    const byPage = this.outlineByPage();
    if (!byPage.size) return null;
    for (let page = this.currentPage(); page > 0; page--) {
      const item = byPage.get(page);
      if (item) return item;
    }
    return null;
  });

  /** Open bookmarks (by id) — at first, the ones the document wants open. */
  readonly outlineExpanded = signal<ReadonlySet<string>>(new Set());
  /** Incremented to bring the current bookmark into view. */
  readonly outlineRevealRequest = signal(0);

  /** Opens or closes a bookmark — with `wholeBranch`, its descendants too. */
  toggleOutlineItem(item: ScPdfOutlineItem, wholeBranch = false): void {
    const open = !this.outlineExpanded().has(item.id);
    const ids = wholeBranch ? outlineIds([item]) : [item.id];
    this.outlineExpanded.update((expanded) => {
      const next = new Set(expanded);
      for (const id of ids) {
        if (open) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }

  /** Opens or closes every bookmark. */
  setOutlineExpanded(open: boolean): void {
    this.outlineExpanded.set(new Set(open ? outlineIds(this.outline()) : []));
  }

  /** Opens the current bookmark's parents and brings it into view. */
  revealCurrentOutlineItem(): void {
    const current = this.currentOutlineItem();
    if (!current) return;
    // Ids are paths ("0.2.1"): the parents are its prefixes.
    const parts = current.id.split('.');
    this.outlineExpanded.update((expanded) => {
      const next = new Set(expanded);
      for (let i = 1; i < parts.length; i++) {
        next.add(parts.slice(0, i).join('.'));
      }
      return next;
    });
    this.outlineRevealRequest.update((v) => v + 1);
  }

  /** The document's attached files. */
  readonly attachments = signal<ScPdfAttachment[]>([]);

  /** Downloads an attached file. */
  async downloadAttachment(attachment: ScPdfAttachment): Promise<void> {
    // pdf.js loads an attachment's content when it's asked for.
    const content =
      attachment.content ??
      (attachment.id
        ? await this.pdfDocument()
            ?.getAttachmentContent(attachment.id)
            .catch(() => null)
        : null);
    if (!content) return;
    this.saveAs(
      new Blob([content as Uint8Array<ArrayBuffer>]),
      attachment.filename,
    );
  }

  /** Every page number, in order — for a list of pages. */
  readonly pageNumbers = computed(() =>
    this.pdfDocument()
      ? Array.from({ length: this.totalPages() }, (_, i) => i + 1)
      : [],
  );

  /** Pages selected in a list of pages (for page organisation). */
  readonly selectedPages = signal<ReadonlySet<number>>(new Set());
  /** The selected pages that exist, ascending. */
  readonly pageSelection = computed(() => {
    const total = this.totalPages();
    return [...this.selectedPages()]
      .filter((page) => page <= total)
      .sort((a, b) => a - b);
  });

  selectPage(page: number, selected: boolean): void {
    this.selectedPages.update((pages) => {
      const next = new Set(pages);
      if (selected) next.add(page);
      else next.delete(page);
      return next;
    });
  }

  clearPageSelection(): void {
    this.selectedPages.set(new Set());
  }

  /** The selected pages one place earlier (-1) or later (1); they stay selected. */
  moveSelectedPages(delta: -1 | 1): void {
    const pages = this.pageSelection();
    if (!pages.length) return;
    const before = delta < 0 ? pages[0] - 1 : pages[pages.length - 1] + 2;
    this.selectedPages.set(new Set(this.movePages(pages, before)));
  }

  /** Thumbnails rendered for the current document (object URLs). */
  private thumbnails = new Map<string, Promise<string | null>>();
  private thumbnailsDocument: PDFDocumentProxy | null = null;
  /** Thumbnails render one at a time. */
  private thumbnailQueue: Promise<unknown> = Promise.resolve();

  /**
   * A page's thumbnail, `width` CSS pixels wide (at the screen's density,
   * with the viewer's rotation), as an image URL — rendered once per document.
   */
  renderThumbnail(pageNumber: number, width: number): Promise<string | null> {
    const doc = this.pdfDocument();
    if (!doc) return Promise.resolve(null);
    if (doc !== this.thumbnailsDocument) {
      this.releaseThumbnails();
      this.thumbnailsDocument = doc;
    }
    const rotation = this.rotation();
    const pageColors = resolvePageColors(
      this.appliedPageColors(),
      this.document.documentElement,
    );
    const key = `${doc.pagesMapper.getPageId(pageNumber)}:${width}:${rotation}:${JSON.stringify(pageColors)}`;
    let thumbnail = this.thumbnails.get(key);
    if (!thumbnail) {
      thumbnail = this.thumbnailQueue.then(async () => {
        try {
          const page = await doc.getPage(pageNumber);
          const rotate = (page.rotate + rotation) % 360;
          const natural = page.getViewport({ scale: 1, rotation: rotate });
          const density = this.document.defaultView?.devicePixelRatio ?? 1;
          const viewport = page.getViewport({
            scale: (width / natural.width) * density,
            rotation: rotate,
          });
          const canvas = this.document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({
            canvas,
            viewport,
            pageColors: pageColors ?? undefined,
          }).promise;
          this.scheduleCleanup();
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve),
          );
          canvas.width = canvas.height = 0;
          return blob ? URL.createObjectURL(blob) : null;
        } catch {
          return null;
        }
      });
      this.thumbnailQueue = thumbnail;
      this.thumbnails.set(key, thumbnail);
    }
    return thumbnail;
  }

  /** The document's permission flags (null: it sets none). */
  private readonly permissions = signal<ReadonlySet<number> | null>(null);

  private allows(...flags: number[]): boolean {
    const permissions = this.permissions();
    return (
      !this.enablePermissions() ||
      !permissions ||
      flags.some((flag) => permissions.has(flag))
    );
  }

  /** Text can be copied (see `enablePermissions`). */
  readonly canCopy = computed(() => this.allows(PermissionFlag.COPY));
  /** The document can be printed (see `enablePermissions`). */
  readonly canPrint = computed(
    () =>
      !!this.pdfDocument() &&
      this.allows(PermissionFlag.PRINT, PermissionFlag.PRINT_HIGH_QUALITY),
  );
  /** Annotations can be added (see `enablePermissions`). */
  readonly canEdit = computed(() =>
    this.allows(PermissionFlag.MODIFY_CONTENTS),
  );
  /** Form fields can be filled in (see `enablePermissions`). */
  readonly canFillForms = computed(() =>
    this.allows(
      PermissionFlag.MODIFY_ANNOTATIONS,
      PermissionFlag.FILL_INTERACTIVE_FORMS,
    ),
  );

  private cleanupTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * After a while without rendering, pdf.js frees what it keeps to draw
   * pages again faster (fonts, images, operator lists), as its viewer does.
   * Called after each render; a page still rendering by then puts it off.
   */
  scheduleCleanup(): void {
    if (this.cleanupTimeout) clearTimeout(this.cleanupTimeout);
    this.cleanupTimeout = setTimeout(() => {
      this.cleanupTimeout = null;
      this.pdfDocument()
        ?.cleanup()
        .catch(() => {
          // Rendering: the render's end schedules it again.
        });
    }, CLEANUP_TIMEOUT);
  }

  private releaseThumbnails(): void {
    for (const thumbnail of this.thumbnails.values()) {
      thumbnail.then((url) => url && URL.revokeObjectURL(url));
    }
    this.thumbnails = new Map();
    this.thumbnailsDocument = null;
  }

  /** The document's form fields, for the annotation layer (forms, scripts). */
  readonly formInfo = signal<{
    fieldObjects: Map<string, object[]> | null;
    hasJSActions: boolean;
  }>({ fieldObjects: null, hasJSActions: false });

  /** Page layout set from the last document, so the next can replace it. */
  private documentLayout: [ScPdfScrollMode, ScPdfSpreadMode] | null = null;

  // Find state
  readonly findOpen = signal(false);
  readonly findQuery = signal('');
  readonly findMatchCase = signal(false);
  readonly findHighlightAll = signal(true);
  readonly findEntireWord = signal(false);
  readonly findMatchDiacritics = signal(false);
  readonly findState = signal<ScPdfFindState>('idle');
  readonly findCurrentMatchIndex = signal(0);
  readonly findTotalMatches = signal(0);
  // Editor state
  readonly editorMode = signal<ScPdfEditorMode>('none');
  /** The tool whose settings to show (highlight, text, drawing), or null. */
  readonly toolSettings = computed(() => {
    const mode = this.editorMode();
    return mode === 'highlight' || mode === 'freetext' || mode === 'ink'
      ? mode
      : null;
  });
  // Editor params
  /**
   * Colours are CSS colours — the theme's variables: `var(--sc-pdf-viewer-highlight-1)`
   * to `-5` for highlights (pdf.js's yellow, green, blue, pink, red),
   * `var(--sc-pdf-viewer-ink-1)` to `-4` for text and drawings. pdf.js gets
   * them as real colours, and writes them into the PDF: the variable's
   * `:root` value, whatever the mode; its `.dark` value shows on dark pages
   * only (see pdf-viewer-colors.ts).
   */
  readonly highlightColor = signal<string>(HIGHLIGHT_COLORS[0]);
  readonly highlightThickness = signal(12);
  readonly highlightShowAll = signal(true);
  readonly freetextColor = signal<string>(INK_COLORS[0]);
  readonly freetextSize = signal(12);
  readonly inkColor = signal<string>(INK_COLORS[0]);
  readonly inkThickness = signal(1);
  readonly inkOpacity = signal(1);

  // Password state
  readonly passwordRequired = signal(false);
  readonly passwordReason = signal<
    'need-password' | 'incorrect-password' | null
  >(null);
  private passwordCallback: ((password: string | Error) => void) | null = null;

  // Alt text state
  readonly altTextDialogOpen = signal(false);
  /** The document's optional content (layers), and whether each shows. */
  readonly layers = signal<ScPdfLayer[]>([]);
  /** The layers' visibility as pdf.js renders it (with the pages). */
  readonly optionalContent = signal<ScPdfOptionalContentConfig | null>(null);

  // Signature state
  readonly signatureDialogOpen = signal(false);
  /**
   * Signatures saved for reuse. Bind `[(savedSignatures)]` to keep them
   * between sessions (pdf.js remembers them).
   */
  readonly savedSignatures = model<ScPdfSignatureData[]>([]);

  // Comment state
  /** The comments on annotations: the document's, and those written here. */
  readonly comments = signal<ScPdfComment[]>([]);
  /**
   * The comment being written — an annotation's comment button (in pdf.js's
   * toolbar on the page) — with its current text, until posted.
   */
  readonly pendingComment = signal<{
    id: string;
    pageNumber: number;
    text: string;
  } | null>(null);
  /** The comment picked on the page or in the list. */
  readonly activeCommentId = signal<string | null>(null);

  /** What the undo bar can undo now (shown for a few seconds), or null. */
  readonly undoable = signal<ScPdfUndoable | null>(null);
  private undoAction: (() => void) | null = null;
  /** Run once the undo bar closes without undoing (pdf.js frees deleted pages). */
  private undoCleanup: (() => void) | null = null;
  private undoTimeout: ReturnType<typeof setTimeout> | null = null;

  // Print progress state
  readonly printProgress = signal(0);
  readonly printDialogOpen = signal(false);
  private printCancelled = false;

  // Sidebar
  readonly sidebarWidth = signal(200);

  // Container element ref for fullscreen
  private containerElement: ElementRef<HTMLElement> | null = null;

  // Computed values
  readonly canGoPrev = computed(() => this.currentPage() > 1);
  readonly canGoNext = computed(() => this.currentPage() < this.totalPages());
  readonly canZoomIn = computed(() => this.currentScale() < MAX_SCALE - 1e-6);
  readonly canZoomOut = computed(() => this.currentScale() > MIN_SCALE + 1e-6);
  /** A file opened in the viewer (`openFile()`, drag and drop) instead of `src`. */
  readonly localFile = signal<File | null>(null);
  readonly hasSource = computed(() => !!this.src() || !!this.localFile());
  readonly showContent = computed(() => this.hasSource() && !this.error());
  /** Download progress of the document being loaded (0–1), or null if unknown. */
  readonly loadProgress = signal<number | null>(null);
  /** The file name used for downloads. */
  readonly downloadName = computed(
    () =>
      this.localFile()?.name.replace(/\.pdf$/i, '') ||
      this.fileName() ||
      'document',
  );

  /** The document being loaded; destroyed when another load starts. */
  private loadingTask: PDFDocumentLoadingTask | null = null;
  private workerReady = false;

  constructor() {
    this.currentPage.set(this.initialPage());
    this.zoom.set(this.initialZoom());

    // Browser only: the worker, the first document, fullscreen tracking.
    afterNextRender(() => {
      // High contrast mode, before the pages are drawn.
      const forcedColors = this.document.defaultView?.matchMedia(
        '(forced-colors: active)',
      );
      if (forcedColors) {
        this.forcedColors.set(forcedColors.matches);
        const onChange = () => this.forcedColors.set(forcedColors.matches);
        forcedColors.addEventListener('change', onChange);
        this.destroyRef.onDestroy(() =>
          forcedColors.removeEventListener('change', onChange),
        );
      }

      // The mode or theme changing on the page's root (ScPresetManager's
      // `dark`, `color-scheme`, `data-theme`).
      // Only when the page colours' values change: an overlay's scroll
      // blocking touches the root's class and style too.
      const view = this.document.defaultView;
      if (view?.MutationObserver) {
        const root = this.document.documentElement;
        const values = () => {
          const style = view.getComputedStyle(root);
          return (
            style.getPropertyValue('--sc-pdf-viewer-page') +
            '|' +
            style.getPropertyValue('--sc-pdf-viewer-page-foreground')
          );
        };
        let last = values();
        const themes = new view.MutationObserver(() => {
          const now = values();
          if (now === last) return;
          last = now;
          this.themeChanges.update((count) => count + 1);
        });
        themes.observe(this.document.documentElement, {
          attributes: true,
          attributeFilter: ['class', 'style', 'data-theme'],
        });
        this.destroyRef.onDestroy(() => themes.disconnect());
      }

      this.initWorker();
      this.workerReady = true;
      this.openSrc();

      const onFullscreenChange = () => {
        this.isFullscreen.set(!!this.document.fullscreenElement);
        // Leaving fullscreen (Escape, F11…) ends presentation mode.
        if (!this.document.fullscreenElement) this.endPresentation();
      };
      this.document.addEventListener('fullscreenchange', onFullscreenChange);
      this.destroyRef.onDestroy(() =>
        this.document.removeEventListener(
          'fullscreenchange',
          onFullscreenChange,
        ),
      );
    });

    // A new `src` replaces the document (and a file opened in the viewer);
    // an empty one clears it.
    effect(() => {
      this.src();
      if (!this.workerReady) return;
      untracked(() => {
        this.localFile.set(null);
        this.openSrc();
      });
    });

    // A find option changed: the search again (as pdf.js's find bar).
    const findOptions: [() => boolean, string][] = [
      [this.findMatchCase, 'casesensitivitychange'],
      [this.findEntireWord, 'entirewordchange'],
      [this.findHighlightAll, 'highlightallchange'],
      [this.findMatchDiacritics, 'diacriticmatchingchange'],
    ];
    for (const [option, type] of findOptions) {
      let first = true;
      effect(() => {
        option();
        if (first) {
          first = false;
          return;
        }
        untracked(() => this.findOptionChanged(type));
      });
    }

    // The view's settings, into pdf.js's viewer.
    effect(() => {
      const engine = this.engine();
      const mode = SCROLL_MODES[this.scrollMode()];
      if (engine && engine.viewer.scrollMode !== mode)
        engine.viewer.scrollMode = mode;
    });
    effect(() => {
      const engine = this.engine();
      const mode = SPREAD_MODES[this.spreadMode()];
      if (engine && engine.viewer.spreadMode !== mode)
        engine.viewer.spreadMode = mode;
    });
    effect(() => {
      const engine = this.engine();
      const rotation = this.rotation();
      if (
        engine?.viewer.pdfDocument &&
        engine.viewer.pagesRotation !== rotation
      )
        engine.viewer.pagesRotation = rotation;
    });
    // Once the pages are laid out (the initial view sets the first zoom).
    effect(() => {
      const engine = this.engine();
      const value = String(this.zoom());
      if (
        engine?.viewer.pagesCount &&
        engine.viewer.currentScaleValue !== value
      )
        engine.viewer.currentScaleValue = value;
    });

    this.watchEditing();

    // As pdf.js's comment mode: the comments show in the sidebar — in
    // comment mode, while one is written, when one is picked.
    effect(() => {
      if (
        this.editorMode() === 'comment' ||
        this.pendingComment() ||
        this.activeCommentId()
      ) {
        untracked(() => {
          this.sidebarView.set('comments');
          this.sidebarOpen.set(true);
        });
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.cleanupTimeout) clearTimeout(this.cleanupTimeout);
      this.releaseThumbnails();
      this.detachEngine?.();
      this.loadingTask?.destroy();
      this.pdfDocument()?.loadingTask.destroy();
      if (this.undoTimeout) {
        clearTimeout(this.undoTimeout);
      }
    });
  }

  private initWorker(): void {
    const customSrc = this.workerSrc();
    if (customSrc) {
      GlobalWorkerOptions.workerSrc = customSrc;
    } else {
      GlobalWorkerOptions.workerSrc = `${this.assetsUrl()}build/pdf.worker.min.mjs`;
    }
  }

  /**
   * Opens `src`. Its fragment holds pdf.js's open parameters
   * (`doc.pdf#page=3&zoom=150`), applied once the document is loaded.
   */
  private openSrc(): void {
    const src = this.src();
    if (!src) {
      this.open(null);
      return;
    }
    const { url, hash } = splitSource(src);
    this.open({ url }, hash);
  }

  /**
   * Loads a document, replacing the current one. A load that's overtaken by
   * another (a new `src`, a file opened meanwhile) is cancelled and ignored.
   */
  private async open(
    source: { url: string } | { data: Uint8Array } | null,
    hash = '',
    { rebuilt = false, page }: { rebuilt?: boolean; page?: number } = {},
  ): Promise<void> {
    this.loadingTask?.destroy();
    this.loadingTask = null;

    // Release the previous document once nothing renders it any more.
    const previous = this.pdfDocument();
    this.pdfDocument.set(null);
    previous?.loadingTask.destroy();
    this.clearFind();
    this.engine()?.setDocument(null);
    // pdf.js's editors belong to the document they edit.
    this.closeEditing();
    // The same document rebuilt (page organisation) keeps its undo.
    if (!rebuilt) {
      this.clearPageSelection();
      this.editorMode.set('none');
      this.closeUndoBar();
    }
    this.error.set(null);
    this.passwordRequired.set(false);
    this.passwordCallback = null;
    this.loadProgress.set(null);
    this.pageLabels.set(null);
    this.documentPageLabels = null;
    this.cutCleanup = null;
    this.pageClipboard.set(null);
    this.outline.set([]);
    this.formInfo.set({ fieldObjects: null, hasJSActions: false });
    this.layers.set([]);
    this.optionalContent.set(null);
    this.attachments.set([]);
    this.outlineExpanded.set(new Set());
    this.historyState.set({ entries: [], index: -1 });
    this.currentView.set(null);
    this.permissions.set(null);
    this.propertiesDialogOpen.set(false);
    this.releaseThumbnails();

    if (!source) {
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    // XFA forms render as HTML (the XFA layer), as in pdf.js.
    const task = getDocument({ ...source, ...this.loadOptions() });
    this.loadingTask = task;

    task.onPassword = (
      updateCallback: (password: string | Error) => void,
      reason: number,
    ) => {
      if (task !== this.loadingTask) return;
      this.isLoading.set(false);
      this.passwordRequired.set(true);
      this.passwordReason.set(
        reason === 2 ? 'incorrect-password' : 'need-password',
      );
      this.passwordCallback = updateCallback;
    };
    task.onProgress = ({
      loaded,
      total,
    }: {
      loaded: number;
      total: number;
    }) => {
      if (task === this.loadingTask && total > 0) {
        this.loadProgress.set(Math.min(1, loaded / total));
      }
    };

    try {
      const doc = await task.promise;
      if (task !== this.loadingTask) return;
      // Known before the pages are drawn (forms may be read-only).
      const permissions = await doc.getPermissions().catch(() => null);
      if (task !== this.loadingTask) return;
      this.loadingTask = null;
      this.permissions.set(permissions);
      if (!this.canEdit()) this.editorMode.set('none');
      this.pdfDocument.set(doc);
      this.totalPages.set(doc.numPages);
      this.openingPage = Math.min(
        Math.max(1, page ?? this.initialPage()),
        doc.numPages,
      );
      this.showDocument();
      this.isLoading.set(false);
      this.passwordRequired.set(false);
      this.loadProgress.set(1);
      this.loaded.emit({ totalPages: doc.numPages });
      await this.onDocumentReady(doc, hash);
    } catch (err) {
      if (task !== this.loadingTask || this.passwordRequired()) return;
      this.loadingTask = null;
      this.fail(loadError(err));
    }
  }

  /**
   * What pdf.js's viewer passes when loading: XFA as HTML, non-embedded
   * standard fonts, CMaps for CJK text, wasm decoders (JPEG 2000, JBIG2) and
   * colour profiles — all under `assetsUrl`.
   */
  private loadOptions() {
    const assets = this.assetsUrl();
    return {
      enableXfa: true,
      standardFontDataUrl: `${assets}standard_fonts/`,
      cMapUrl: `${assets}cmaps/`,
      cMapPacked: true,
      wasmUrl: this.wasmSrc() || `${assets}wasm/`,
      iccUrl: `${assets}iccs/`,
    };
  }

  /** Opens a local file (e.g. from a file input or drag and drop). */
  async loadFile(file: File): Promise<void> {
    this.localFile.set(file);
    this.fileOpened.emit({ name: file.name });
    await this.open({ data: new Uint8Array(await file.arrayBuffer()) });
  }

  /** Asks the user for a PDF file and opens it. */
  openFile(): void {
    const input = this.document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,application/pdf';
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (file) this.loadFile(file);
    });
    input.click();
  }

  // Methods for child components to call
  setContainerElement(element: ElementRef<HTMLElement>): void {
    this.containerElement = element;
  }

  onLoad(): void {
    this.isLoading.set(false);
    this.error.set(null);
    this.loaded.emit({ totalPages: this.totalPages() });
  }

  private fail(error: ScPdfLoadError): void {
    this.isLoading.set(false);
    this.error.set(error);
    this.errorEvent.emit(error);
  }

  retry(): void {
    const file = this.localFile();
    if (file) {
      this.loadFile(file);
    } else if (this.src()) {
      this.openSrc();
    }
  }

  /**
   * After a load: page labels and outline, then the view the document asks
   * for (page layout, page mode, open action), the open parameters on top,
   * and printing if the document asks for it.
   */
  private async onDocumentReady(
    doc: PDFDocumentProxy,
    hash: string,
  ): Promise<void> {
    const form = Promise.all([
      doc.getFieldObjects().catch(() => null),
      doc.hasJSActions().catch(() => false),
    ]);
    const [labels, outline, pageMode, pageLayout, openAction, jsActions] =
      await Promise.all([
        doc.getPageLabels().catch(() => null),
        this.loadOutline(doc),
        doc.getPageMode().catch(() => null),
        doc.getPageLayout().catch(() => null),
        doc.getOpenAction().catch(() => null),
        this.autoPrint() ? doc.getJSActions().catch(() => null) : null,
      ]);
    if (doc !== this.pdfDocument()) return;

    const [fieldObjects, hasJSActions] = await form;
    if (doc !== this.pdfDocument()) return;
    this.formInfo.set({ fieldObjects, hasJSActions });
    this.loadLayers(doc);

    this.documentPageLabels = usefulPageLabels(labels, doc.numPages);
    this.pageLabels.set(this.documentPageLabels);
    this.engine()?.viewer.setPageLabels(this.pageLabels());
    this.outline.set(outline);
    this.outlineExpanded.set(new Set(openOutlineIds(outline)));
    this.loadAttachments(doc);
    this.loadComments(doc);
    this.applyPageLayout(pageLayout);

    const view = pageMode ? PAGE_MODES[pageMode] : undefined;
    if (view) {
      this.sidebarView.set(view);
      this.sidebarOpen.set(true);
    }

    // Where it opens (as pdf.js's setInitialView): the open parameters,
    // else the document's open action, else where it was left.
    const openDest = field(openAction, 'dest');
    this.openingHash = hash;
    this.openingDest = openDest;
    this.documentRead = true;
    this.applyInitialView();
    if (doc !== this.pdfDocument()) return;

    const scripts = values(jsActions).flatMap((list) =>
      Array.isArray(list) ? list.map(String) : [],
    );
    if (
      this.autoPrint() &&
      (field(openAction, 'action') === 'Print' ||
        scripts.some((js) => AUTO_PRINT.test(js)))
    ) {
      this.printWithProgress();
    }
  }

  /**
   * The document's page layout, unless the scroll / spread mode was changed
   * by hand (still the default, or what the previous document set).
   */
  private applyPageLayout(layout: string | null): void {
    const current = [this.scrollMode(), this.spreadMode()];
    const previous = this.documentLayout ?? ['vertical', 'none'];
    const untouched =
      (current[0] === 'vertical' && current[1] === 'none') ||
      (current[0] === previous[0] && current[1] === previous[1]);
    if (!untouched) return;
    const next = (layout && PAGE_LAYOUTS[layout]) || ['vertical', 'none'];
    this.scrollMode.set(next[0]);
    this.spreadMode.set(next[1]);
    this.documentLayout = next;
  }

  /** The outline with each bookmark's destination resolved. */
  private async loadOutline(
    doc: PDFDocumentProxy,
  ): Promise<ScPdfOutlineItem[]> {
    const nodes = (await doc.getOutline().catch(() => null)) as
      ScPdfOutlineNode[] | null;
    const convert = (
      items: ScPdfOutlineNode[],
      path: string,
    ): Promise<ScPdfOutlineItem[]> =>
      Promise.all(
        items.map(async (node, index) => {
          const id = path ? `${path}.${index}` : String(index);
          const target = node.dest
            ? await this.resolveDestination(node.dest, doc)
            : null;
          return {
            id,
            title: node.title,
            pageNumber: target?.pageNumber ?? null,
            top: target?.top ?? 0,
            zoom: target?.zoom,
            url: node.url ?? null,
            bold: !!node.bold,
            italic: !!node.italic,
            open: (node.count ?? 0) > 0,
            items: await convert(node.items ?? [], id),
          };
        }),
      );
    return nodes ? convert(nodes, '') : [];
  }

  /**
   * A destination — a name, or pdf.js's explicit array
   * (`[pageRef, {name: 'XYZ'}, left, top, zoom]`) — as a page, a position on
   * it and the zoom it asks for.
   */
  async resolveDestination(
    dest: unknown,
    doc = this.pdfDocument(),
  ): Promise<ScPdfDestination | null> {
    if (!doc) return null;
    const explicit =
      typeof dest === 'string'
        ? await doc.getDestination(dest).catch(() => null)
        : await dest;
    if (!Array.isArray(explicit)) return null;

    const [ref, kind, ...args] = explicit as [unknown, unknown, ...unknown[]];
    let pageNumber: number;
    if (ref && typeof ref === 'object') {
      try {
        pageNumber =
          (await doc.getPageIndex(ref as { num: number; gen: number })) + 1;
      } catch {
        return null;
      }
    } else if (Number.isInteger(ref)) {
      pageNumber = (ref as number) + 1;
    } else {
      return null;
    }
    if (pageNumber < 1 || pageNumber > doc.numPages) return null;

    let pdfTop: unknown = null;
    let zoom: ScPdfZoomLevel | undefined;
    switch ((kind as { name?: string } | null)?.name) {
      case 'XYZ':
        pdfTop = args[1];
        if (typeof args[2] === 'number' && args[2] > 0) zoom = args[2];
        break;
      case 'FitH':
      case 'FitBH':
        pdfTop = args[0];
        zoom = 'page-width';
        break;
      case 'Fit':
      case 'FitB':
      case 'FitV':
      case 'FitBV':
        zoom = 'page-fit';
        break;
      case 'FitR':
        pdfTop = args[3];
        break;
    }
    const top = await this.topOnPage(doc, pageNumber, pdfTop);
    return { pageNumber, top, zoom };
  }

  /** A y coordinate in PDF units (from the bottom) as 0 (top) – 1 (bottom). */
  private async topOnPage(
    doc: PDFDocumentProxy,
    pageNumber: number,
    pdfTop: unknown,
  ): Promise<number> {
    if (typeof pdfTop !== 'number' || !Number.isFinite(pdfTop)) return 0;
    try {
      const [, y0, , y1] = (await doc.getPage(pageNumber)).view;
      return Math.min(1, Math.max(0, (y1 - pdfTop) / (y1 - y0)));
    } catch {
      return 0;
    }
  }

  /**
   * Applies pdf.js's open parameters — `page`, `zoom` (`150`, `page-width`,
   * `150,0,720`…), `nameddest`, `search`, `pagemode` — or a bare named
   * destination (`#chapter-2`), with pdf.js's link service. `src`'s
   * fragment is applied on load.
   */
  applyHash(hash: string): void {
    hash = hash.replace(/^#/, '');
    if (hash) this.engine()?.linkService.setHash(hash);
  }

  /** A page's label, or its number when the document has none. */
  pageLabel(pageNumber: number): string {
    return this.pageLabels()?.[pageNumber - 1] ?? String(pageNumber);
  }

  /** The page a label refers to — or, failing that, a page number. */
  pageForLabel(value: string): number | null {
    const text = value.trim();
    const index = this.pageLabels()?.indexOf(text) ?? -1;
    if (index >= 0) return index + 1;
    const page = Number(text);
    return Number.isInteger(page) && page >= 1 && page <= this.totalPages()
      ? page
      : null;
  }

  /** Downloads the document as it was loaded. */
  /**
   * Downloads the document — with the annotations, comments and form data
   * written into it when there are any (as pdf.js's "Save").
   */
  async download(): Promise<void> {
    const doc = this.pdfDocument();
    if (!doc) return;
    const data = this.hasChanges()
      ? await this.saveDocument()
      : await doc.getData();
    this.saveAs(
      new Blob([data as Uint8Array<ArrayBuffer>], { type: 'application/pdf' }),
      this.downloadName() + '.pdf',
    );
  }

  /**
   * Whether there's anything to write into the file: annotations, comments,
   * form data, pages reorganised.
   */
  hasChanges(): boolean {
    const doc = this.pdfDocument();
    return (
      !!doc &&
      (doc.annotationStorage.size > 0 || doc.pagesMapper.hasBeenAltered())
    );
  }

  /**
   * The document with the annotations, comments and form data written into
   * it, its pages in their order — a new PDF file's bytes (as pdf.js saves).
   */
  async saveDocument(): Promise<Uint8Array> {
    const doc = this.pdfDocument();
    if (!doc) throw new Error('No document to save.');
    const scripting = this.engine()?.scriptingManager;
    await scripting?.dispatchWillSave();
    try {
      const mapper = doc.pagesMapper;
      return mapper.hasBeenAltered()
        ? await extractMapped(doc, mapper.getPageMappingForSaving())
        : await doc.saveDocument();
    } finally {
      scripting?.dispatchDidSave();
    }
  }

  // Page organisation, as pdf.js's: the document's page map (`pagesMapper`)
  // moves, deletes, copies and pastes pages, and pdf.js's viewer moves their
  // views — their annotations with them — without rebuilding the file;
  // saving writes them in their new order. Inserting another file rebuilds it.

  /** The document's page labels, by its own page number (they follow their pages). */
  private documentPageLabels: string[] | null = null;
  /** @internal Counts page edits: a page number may show another page since. */
  readonly pageEdits = signal(0);
  /** Cut pages, kept for a paste: what frees them if none comes. */
  private cutCleanup: (() => void) | null = null;

  /** All page numbers, in order. */
  private allPages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  /** Valid, unique page numbers, ascending. */
  private pageSet(pageNumbers: number[]): number[] {
    const total = this.totalPages();
    return [...new Set(pageNumbers)]
      .filter((p) => Number.isInteger(p) && p >= 1 && p <= total)
      .sort((a, b) => a - b);
  }

  /** Each page's own number in the document, in their current order. */
  private pageOrder(doc: PDFDocumentProxy): number[] {
    return this.allPages().map((page) => doc.pagesMapper.getPageId(page));
  }

  /**
   * Tells pdf.js's viewer and find controller the pages changed (they move
   * their views, text and annotations), then the viewer's own state.
   */
  private pagesEdited(
    doc: PDFDocumentProxy,
    type: string,
    pageNumbers: number[] = [],
    {
      hasBeenCut = false,
      focus,
    }: { hasBeenCut?: boolean; focus?: number } = {},
  ): void {
    const engine = this.engine();
    engine?.eventBus.dispatch('pagesedited', {
      source: this,
      pagesMapper: doc.pagesMapper,
      type,
      pageNumbers,
      hasBeenCut,
    });
    if (type === 'copy' || type === 'cancelCopy' || type === 'cleanSavedData') {
      return;
    }
    const total = doc.pagesMapper.pagesNumber;
    this.totalPages.set(total);
    this.pageEdits.update((count) => count + 1);
    const labels = this.documentPageLabels;
    this.pageLabels.set(
      labels ? this.pageOrder(doc).map((id) => labels[id - 1]) : null,
    );
    const page = Math.min(Math.max(1, focus ?? this.currentPage()), total);
    if (engine) engine.viewer.currentPageNumber = page;
    this.currentPage.set(page);
  }

  /**
   * Moves pages to just before `beforePage` (past the end: to the end),
   * keeping their order — undoable. Returns their new page numbers.
   */
  movePages(pageNumbers: number[], beforePage: number): number[] {
    const doc = this.pdfDocument();
    const moving = this.pageSet(pageNumbers);
    if (!doc || !moving.length) return [];
    const order = this.pageOrder(doc);
    const index = Math.max(0, beforePage - 1);
    const start =
      Math.min(
        index - moving.filter((page) => page - 1 < index).length,
        this.totalPages() - moving.length,
      ) + 1;
    doc.pagesMapper.movePages(new Set(moving), moving, index);
    this.pagesEdited(doc, 'move', moving, { focus: start });
    this.showUndoBar({ kind: 'pages-moved', count: moving.length }, () =>
      this.restoreOrder(doc, order),
    );
    return moving.map((_, i) => start + i);
  }

  /** Puts the pages back in an order they had (undoing a move). */
  private restoreOrder(doc: PDFDocumentProxy, order: number[]): void {
    if (doc !== this.pdfDocument()) return;
    const mapper = doc.pagesMapper;
    order.forEach((id, position) => {
      let from = position + 1;
      while (from <= mapper.pagesNumber && mapper.getPageId(from) !== id) {
        from++;
      }
      if (from > mapper.pagesNumber || from === position + 1) return;
      mapper.movePages(new Set([from]), [from], position);
      this.pagesEdited(doc, 'move', [from]);
    });
  }

  /** Deletes pages (not all of them) — undoable. */
  deletePages(pageNumbers: number[]): void {
    const doc = this.pdfDocument();
    const removing = this.pageSet(pageNumbers);
    if (!doc || !removing.length || removing.length >= this.totalPages()) {
      return;
    }
    this.removePages(doc, removing, 'delete');
    this.showUndoBar(
      { kind: 'pages-deleted', count: removing.length },
      () => this.restorePages(doc),
      // No undo any more: pdf.js frees the deleted pages.
      () => this.freeDeletedPages(doc),
    );
  }

  /** Copies pages (with their annotations, comments and form data) for `pastePages`. */
  copyPages(pageNumbers: number[]): void {
    const doc = this.pdfDocument();
    const pages = this.pageSet(pageNumbers);
    if (!doc || !pages.length) return;
    this.dropClipboard();
    doc.pagesMapper.copyPages(Uint32Array.from(pages));
    this.pagesEdited(doc, 'copy', pages);
    this.pageClipboard.set({ count: pages.length, cut: false });
  }

  /** Cuts pages — paste them elsewhere to move them; undoable. */
  cutPages(pageNumbers: number[]): void {
    const doc = this.pdfDocument();
    const pages = this.pageSet(pageNumbers);
    if (!doc || !pages.length || pages.length >= this.totalPages()) return;
    this.dropClipboard();
    doc.pagesMapper.copyPages(Uint32Array.from(pages));
    this.pagesEdited(doc, 'copy', pages);
    this.removePages(doc, pages, 'cut');
    this.pageClipboard.set({ count: pages.length, cut: true });
    // Pasted, the cut pages are moved; never pasted, they're freed.
    this.cutCleanup = () => this.freeDeletedPages(doc);
    this.showUndoBar({ kind: 'pages-deleted', count: pages.length }, () => {
      this.cutCleanup = null;
      this.dropClipboard();
      this.restorePages(doc);
    });
  }

  /** Pastes the copied / cut pages after `afterPage` (0: at the start) — undoable. */
  pastePages(afterPage = this.currentPage()): void {
    const doc = this.pdfDocument();
    const clip = this.pageClipboard();
    if (!doc || !clip) return;
    const at = Math.min(Math.max(0, afterPage), this.totalPages());
    // The cut pages' views are the pasted ones now: nothing to free.
    this.cutCleanup = null;
    doc.pagesMapper.pastePages(at);
    this.pageClipboard.set(null);
    this.pagesEdited(doc, 'paste', [], {
      hasBeenCut: clip.cut,
      focus: at + 1,
    });
    const pasted = Array.from({ length: clip.count }, (_, i) => at + 1 + i);
    this.showUndoBar({ kind: 'pages-pasted', count: clip.count }, () => {
      if (doc !== this.pdfDocument()) return;
      this.removePages(doc, pasted, 'delete');
      this.freeDeletedPages(doc);
    });
  }

  private removePages(
    doc: PDFDocumentProxy,
    pages: number[],
    type: 'delete' | 'cut',
  ): void {
    doc.pagesMapper.deletePages(pages);
    this.pagesEdited(doc, type, pages);
    this.selectedPages.set(new Set());
  }

  /** Undoes the last deletion (pdf.js keeps the deleted pages until freed). */
  private restorePages(doc: PDFDocumentProxy): void {
    if (doc !== this.pdfDocument()) return;
    doc.pagesMapper.cancelDelete();
    this.pagesEdited(doc, 'cancelDelete');
  }

  private freeDeletedPages(doc: PDFDocumentProxy): void {
    if (doc !== this.pdfDocument()) return;
    doc.pagesMapper.cleanSavedData();
    this.pagesEdited(doc, 'cleanSavedData');
  }

  /** The clipboard replaced: cut pages never pasted are freed. */
  private dropClipboard(): void {
    const doc = this.pdfDocument();
    this.cutCleanup?.();
    this.cutCleanup = null;
    if (doc && this.pageClipboard()) {
      doc.pagesMapper.cancelCopy();
      this.pagesEdited(doc, 'cancelCopy');
    }
    this.pageClipboard.set(null);
  }

  /** The name of the file `insertFile` couldn't insert (not a PDF), until the next one. */
  readonly insertFailed = signal<string | null>(null);

  /** Inserts the pages of another PDF after `afterPage` (merging files) — undoable. */
  async insertFile(
    file: File | Uint8Array,
    afterPage = this.totalPages(),
  ): Promise<boolean> {
    const doc = this.pdfDocument();
    if (!doc || this.organizing()) return false;
    this.insertFailed.set(null);
    const data =
      file instanceof Uint8Array
        ? file
        : new Uint8Array(await file.arrayBuffer());
    let count: number;
    try {
      // A copy: pdf.js may take over the buffer it's given.
      const other = await getDocument({
        data: data.slice(),
        ...this.loadOptions(),
      }).promise;
      count = other.numPages;
      other.loadingTask.destroy();
    } catch {
      // Not a PDF (or unreadable): you say so.
      this.insertFailed.set(file instanceof File ? file.name : '');
      return false;
    }
    this.organizing.set(true);
    try {
      // The document as it is — annotations, form data, page order — is
      // the base, and what Undo goes back to.
      const before = {
        data: await this.saveDocument(),
        page: this.currentPage(),
      };
      const base = await getDocument({
        data: before.data.slice(),
        ...this.loadOptions(),
      }).promise;
      let merged: Uint8Array;
      try {
        const entries: ScPdfPageEntry[] = this.allPages().map((page) => ({
          page,
        }));
        entries.splice(
          afterPage,
          0,
          ...Array.from({ length: count }, (_, index) => ({ data, index })),
        );
        merged = await base.extractPages(pageInfos(entries));
      } finally {
        base.loadingTask.destroy();
      }
      await this.replaceDocument(merged, afterPage + 1);
      this.showUndoBar({ kind: 'pages-inserted', count }, () =>
        this.replaceDocument(before.data, before.page),
      );
      return true;
    } catch (error) {
      console.error('Page organisation:', error);
      return false;
    } finally {
      this.organizing.set(false);
    }
  }

  /** Downloads a PDF of just these pages, with their annotations, comments and form data. */
  async exportPages(pageNumbers: number[]): Promise<void> {
    const doc = this.pdfDocument();
    const pages = this.pageSet(pageNumbers);
    if (!doc || !pages.length) return;
    const data = await extractMapped(doc, doc.pagesMapper.extractPages(pages));
    this.saveAs(
      new Blob([data as Uint8Array<ArrayBuffer>], { type: 'application/pdf' }),
      `${this.downloadName()} (${pages.length === 1 ? `page ${pages[0]}` : `${pages.length} pages`}).pdf`,
    );
  }

  /** Shows a rebuilt document in place of the current one. */
  private async replaceDocument(data: Uint8Array, page: number): Promise<void> {
    // It's a local file now (download name kept; Retry reloads this).
    this.localFile.set(
      new File(
        [data as Uint8Array<ArrayBuffer>],
        `${this.downloadName()}.pdf`,
        {
          type: 'application/pdf',
        },
      ),
    );
    this.clearPageSelection();
    await this.open({ data }, '', { rebuilt: true, page });
  }

  private saveAs(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = this.document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    // Give the browser time to start the download before releasing the file.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async printWithProgress(): Promise<void> {
    const doc = this.pdfDocument();
    if (!doc || !this.canPrint()) return;

    this.printCancelled = false;
    this.printDialogOpen.set(true);
    this.printProgress.set(0);

    const urls: string[] = [];
    // With annotations, comments or form data: print the saved file, so the
    // page shows them as the PDF will.
    let printed: PDFDocumentProxy = doc;
    try {
      await this.engine()?.scriptingManager?.dispatchWillPrint();
      if (this.hasChanges()) {
        printed = await getDocument({
          data: await this.saveDocument(),
          ...this.loadOptions(),
        }).promise;
      }
      for (let i = 1; i <= printed.numPages; i++) {
        if (this.printCancelled) break;

        const page = await printed.getPage(i);
        // 150 DPI, as pdf.js prints.
        const viewport = page.getViewport({
          scale: 150 / 72,
          rotation: (page.rotate + this.rotation()) % 360,
        });
        const canvas = this.document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        // Print intent and the typed-in form values, as pdf.js prints.
        await page.render({
          canvas,
          viewport,
          intent: 'print',
          annotationMode: AnnotationMode.ENABLE_STORAGE,
        }).promise;
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve),
        );
        canvas.width = canvas.height = 0;
        if (blob) urls.push(URL.createObjectURL(blob));

        this.printProgress.set(Math.round((i / printed.numPages) * 100));
      }

      if (!this.printCancelled) {
        this.printDialogOpen.set(false);
        await this.printImages(urls);
        this.engine()?.scriptingManager?.dispatchDidPrint();
        return;
      }
    } catch (err) {
      console.error('Print error:', err);
    } finally {
      this.printDialogOpen.set(false);
      this.printProgress.set(0);
      if (printed !== doc) printed.loadingTask.destroy();
    }
    for (const url of urls) URL.revokeObjectURL(url);
  }

  /**
   * Prints page images from a hidden frame. No pop-up, so pop-up blockers
   * don't stop it — and it works without a click (auto-print).
   */
  private async printImages(urls: string[]): Promise<void> {
    const frame = this.document.createElement('iframe');
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    frame.style.cssText =
      'position:fixed;inset-inline-start:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    this.document.body.appendChild(frame);

    let done = false;
    const cleanup = (): void => {
      if (done) return;
      done = true;
      frame.remove();
      for (const url of urls) URL.revokeObjectURL(url);
    };

    const win = frame.contentWindow;
    const doc = frame.contentDocument;
    if (!win || !doc) {
      cleanup();
      return;
    }
    const title = doc.createElement('title');
    title.textContent = this.downloadName();
    const style = doc.createElement('style');
    style.textContent =
      '@page{margin:0}body{margin:0}img{display:block;width:100%;break-after:page}';
    doc.head.append(title, style);
    await Promise.all(
      urls.map((url) => {
        const img = doc.createElement('img');
        img.src = url;
        doc.body.appendChild(img);
        return img.decode().catch(() => undefined);
      }),
    );

    // Some browsers return from print() at once and fire `afterprint` when
    // the dialog closes; others block until then.
    win.addEventListener('afterprint', cleanup, { once: true });
    win.focus();
    win.print();
    setTimeout(cleanup, 60_000);
  }

  cancelPrint(): void {
    this.printCancelled = true;
    this.printDialogOpen.set(false);
  }

  toggleFullscreen(): void {
    const container = this.containerElement?.nativeElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }

  setTotalPages(total: number): void {
    this.totalPages.set(total);
  }

  // Password methods
  submitPassword(password: string): void {
    if (this.passwordCallback) {
      this.isLoading.set(true);
      this.passwordRequired.set(false);
      this.passwordCallback(password);
      this.passwordCallback = null;
    }
  }

  cancelPassword(): void {
    if (this.passwordCallback) {
      this.passwordCallback(new Error('Password dialog cancelled'));
      this.passwordCallback = null;
    }
    this.passwordRequired.set(false);
    this.fail({ kind: 'password', error: null });
  }

  /** The `properties` dialog is open. */
  readonly propertiesDialogOpen = signal(false);
  /** The document's properties, loaded when the dialog opens. */
  readonly documentProperties = signal<ScPdfDocumentProperties | null>(null);

  /** Opens the `properties` dialog (pdf.js's Document Properties). */
  async openProperties(): Promise<void> {
    const doc = this.pdfDocument();
    if (!doc) return;
    this.documentProperties.set(null);
    this.propertiesDialogOpen.set(true);
    const properties = await loadDocumentProperties(
      doc,
      this.currentPage(),
      this.localFile()?.name ?? `${this.downloadName()}.pdf`,
    ).catch(() => null);
    if (doc === this.pdfDocument() && this.propertiesDialogOpen()) {
      this.documentProperties.set(properties);
    }
  }

  closeProperties(): void {
    this.propertiesDialogOpen.set(false);
  }

  /** The document's attached files. */
  private async loadAttachments(doc: PDFDocumentProxy): Promise<void> {
    const attachments = await doc.getAttachments().catch(() => null);
    if (doc !== this.pdfDocument()) return;
    this.attachments.set(
      values(attachments).map((value) => {
        const { filename, content, id } = value as {
          filename: string;
          content?: Uint8Array;
          id?: string;
        };
        return { filename, content, id };
      }),
    );
  }

  addSavedSignature(sig: Omit<ScPdfSignatureData, 'id'>): void {
    const id = `sig-${crypto.randomUUID()}`;
    this.savedSignatures.update((list) => [...list, { ...sig, id }]);
  }

  removeSavedSignature(id: string): void {
    this.savedSignatures.update((list) => list.filter((s) => s.id !== id));
  }

  updateSavedSignature(id: string, description: string): void {
    this.savedSignatures.update((list) =>
      list.map((s) => (s.id === id ? { ...s, description } : s)),
    );
  }

  // Find methods
  /**
   * pdf.js's keyboard shortcuts. Only while focus is in the viewer, and not
   * while typing in a field (apart from Escape and Ctrl/⌘ shortcuts).
   */
  // ── pdf.js's viewer ──────────────────────────────────────────────────

  /** pdf.js's viewer components, once the canvas has created them. */
  readonly engine = signal<ScPdfEngine | null>(null);
  private detachEngine: (() => void) | null = null;

  /** Where the document opens, until its pages are laid out. */
  private openingPage = 1;
  private openingHash = '';
  private openingDest: unknown = null;
  /** Its pages are laid out: the initial view can be set. */
  private pagesReady = false;
  /** Its settings are read (open action, page mode…): the initial view can be set. */
  private documentRead = false;

  /** The current view's open parameters (`page=3&zoom=150,0,720`), for a link to it. */
  readonly currentView = signal<string | null>(null);

  /**
   * @internal The canvas hands over pdf.js's viewer: its events feed the
   * viewer's state, as pdf.js's application listens to them (`web/app.js`).
   */
  attachEngine(engine: ScPdfEngine): void {
    this.detachEngine?.();
    const off = [
      engine.on<{ pageNumber: number }>('pagechanging', ({ pageNumber }) => {
        if (pageNumber === this.currentPage()) return;
        this.currentPage.set(pageNumber);
        this.pageChange.emit({
          currentPage: pageNumber,
          totalPages: this.totalPages(),
        });
      }),
      engine.on<{ scale: number; presetValue?: string }>(
        'scalechanging',
        ({ scale, presetValue }) => {
          this.currentScale.set(scale);
          const level = (presetValue as ScPdfZoomLevel | undefined) ?? scale;
          this.zoom.set(level);
          this.zoomChange.emit({ zoom: level, scale });
        },
      ),
      engine.on<{ pagesRotation: number }>(
        'rotationchanging',
        ({ pagesRotation }) => this.rotation.set(pagesRotation),
      ),
      engine.on<{ mode: number }>('scrollmodechanged', ({ mode }) =>
        this.scrollMode.set(modeName(SCROLL_MODES, mode, 'vertical')),
      ),
      engine.on<{ mode: number }>('spreadmodechanged', ({ mode }) =>
        this.spreadMode.set(modeName(SPREAD_MODES, mode, 'none')),
      ),
      engine.on('pagesinit', () => {
        this.pagesReady = true;
        this.applyInitialView();
        // The layers pdf.js draws the pages with: shown and hidden from here.
        const doc = this.pdfDocument();
        engine.viewer.optionalContentConfigPromise.then((config) => {
          if (doc === this.pdfDocument() && config) this.setLayers(config);
        });
      }),
      engine.on('pagerendered', () => this.scheduleCleanup()),
      ...this.listenToEditors(engine),
      engine.on<{ mode: string }>('pagemode', ({ mode }) => {
        if (mode === 'none') {
          this.sidebarOpen.set(false);
        } else if (HASH_PAGE_MODES[mode]) {
          this.sidebarView.set(HASH_PAGE_MODES[mode]);
          this.sidebarOpen.set(true);
        }
      }),
      engine.on<{ query: string | string[] }>(
        'findfromurlhash',
        ({ query }) => {
          // A phrase in quotes, else each word (pdf.js's `search`).
          this.findOpen.set(true);
          this.findQuery.set(Array.isArray(query) ? query.join(' ') : query);
          this.dispatchFind('', false, query);
        },
      ),
      engine.on<{
        location: {
          pageNumber: number;
          scale: number | string;
          rotation: number;
          top: number;
          left: number;
          pdfOpenParams: string;
        };
      }>('updateviewarea', ({ location }) => {
        this.lastLocation = location;
        this.currentView.set(location.pdfOpenParams.replace(/^#/, ''));
        this.storeView(location);
      }),
      engine.on<{ matchesCount: { current: number; total: number } }>(
        'updatefindmatchescount',
        ({ matchesCount }) => this.updateMatches(matchesCount),
      ),
      engine.on<{
        state: number;
        previous: boolean;
        matchesCount: { current: number; total: number };
      }>('updatefindcontrolstate', ({ state, matchesCount }) => {
        this.updateMatches(matchesCount);
        this.findState.set(FIND_STATES[state] ?? 'idle');
      }),
    ];
    this.detachEngine = () => off.forEach((stop) => stop());
    this.engine.set(engine);
    this.showDocument();
  }

  /** @internal The canvas is gone: so is pdf.js's viewer. */
  releaseEngine(engine: ScPdfEngine): void {
    if (this.engine() !== engine) return;
    this.detachEngine?.();
    this.detachEngine = null;
    this.engine.set(null);
    // Its editors go with it: the next viewer has its own.
    this.uiManager = null;
    this.commentsUiManager = null;
    this.editorsReady.set(false);
    this.editorParamsKnown = false;
    this.editorParams.clear();
    this.requestedEditorMode = null;
  }

  /** The loaded document into pdf.js's viewer (once both are there). */
  private showDocument(): void {
    const engine = this.engine();
    const doc = this.pdfDocument();
    if (!engine || !doc || engine.viewer.pdfDocument === doc) return;
    this.pagesReady = false;
    this.initialViewSet = false;
    engine.viewer.scrollMode = SCROLL_MODES[this.scrollMode()];
    engine.viewer.spreadMode = SPREAD_MODES[this.spreadMode()];
    engine.setDocument(doc);
    engine.viewer.setPageLabels(this.pageLabels());
  }

  /**
   * The view the document opens with, as pdf.js's `setInitialView`: the
   * open parameters of `src`, else its open action's destination, else
   * where it was left (`rememberView`), else `initialPage` and
   * `initialZoom`. Once the pages are laid out and the document read.
   */
  private applyInitialView(): void {
    const engine = this.engine();
    const doc = this.pdfDocument();
    if (!engine || !doc || !this.pagesReady || !this.documentRead) return;
    this.documentRead = false;
    const stored = this.storedView(doc);
    engine.viewer.pagesRotation = stored?.rotation ?? this.rotation();
    engine.viewer.currentScaleValue = String(this.initialZoom());
    if (this.openingHash) {
      this.applyHash(this.openingHash);
    } else if (this.openingDest) {
      engine.linkService.goToDestination(this.openingDest as never);
    } else if (stored) {
      engine.linkService.setHash(
        `page=${stored.page}&zoom=${stored.zoom},${stored.left},${stored.top}`,
      );
    } else {
      engine.viewer.currentPageNumber = this.openingPage;
    }
    this.initialViewSet = true;
  }

  // ── View history: a document reopens where it was left ──────────────

  private lastLocation: { pageNumber: number; top: number } | null = null;
  /** Where the user goes is remembered only after the initial view (as pdf.js). */
  private initialViewSet = false;

  private viewKey(doc: PDFDocumentProxy): string {
    return `sc-pdf-view:${doc.fingerprints[0]}`;
  }

  private storedView(doc: PDFDocumentProxy): {
    page: number;
    zoom: string | number;
    left: number;
    top: number;
    rotation: number;
  } | null {
    if (!this.rememberView()) return null;
    try {
      const raw = this.document.defaultView?.localStorage.getItem(
        this.viewKey(doc),
      );
      const view = raw ? JSON.parse(raw) : null;
      // As pdf.js: a page, and a zoom it knows.
      return Number.isInteger(view?.page) &&
        (typeof view.zoom === 'number' || NAMED_ZOOMS.has(view.zoom))
        ? view
        : null;
    } catch {
      return null;
    }
  }

  private storeView(location: {
    pageNumber: number;
    scale: number | string;
    rotation: number;
    top: number;
    left: number;
  }): void {
    const doc = this.pdfDocument();
    if (!doc || !this.initialViewSet) return;
    try {
      this.document.defaultView?.localStorage.setItem(
        this.viewKey(doc),
        JSON.stringify({
          page: location.pageNumber,
          zoom: location.scale,
          left: location.left,
          top: location.top,
          rotation: location.rotation,
        }),
      );
    } catch {
      // No storage: nothing remembered.
    }
  }

  // ── Navigation ──────────────────────────────────────────────────────

  /**
   * Back / Forward: where the user was before each jump (a link, a
   * bookmark, a thumbnail, the page input…) — kept in the viewer, as pdf.js's
   * history, but not in the browser's (the app's router owns that).
   */
  private readonly historyState = signal<{
    entries: ScPdfHistoryEntry[];
    index: number;
  }>({ entries: [], index: -1 });
  readonly canGoBack = computed(() => this.historyState().index > 0);
  readonly canGoForward = computed(() => {
    const { entries, index } = this.historyState();
    return index < entries.length - 1;
  });

  /** @internal What pdf.js's link service records before a jump. */
  readonly historyAdapter = {
    pushCurrentPosition: () => this.remember(this.here()),
    push: ({
      explicitDest,
      pageNumber,
    }: {
      explicitDest: unknown[];
      pageNumber: number;
    }) => this.remember({ pageNumber, destArray: explicitDest }, true),
    pushPage: (pageNumber: number) =>
      this.remember({ pageNumber, destArray: null }, true),
    back: () => this.goBack(),
    forward: () => this.goForward(),
  };

  /** Where the pages are now: a place to come back to. */
  private here(): ScPdfHistoryEntry {
    const location = this.lastLocation;
    const page = location?.pageNumber ?? this.currentPage();
    return {
      pageNumber: page,
      destArray: location
        ? [null, { name: 'XYZ' }, null, location.top, null]
        : null,
    };
  }

  private remember(entry: ScPdfHistoryEntry, isTarget = false): void {
    this.historyState.update(({ entries, index }) => {
      const kept = entries.slice(0, index + 1);
      if (!isTarget) {
        // Where the user is now replaces the current entry (they may have scrolled).
        kept.splice(Math.max(0, kept.length - 1), 1, entry);
      } else {
        const last = kept[kept.length - 1];
        if (
          !last ||
          last.pageNumber !== entry.pageNumber ||
          JSON.stringify(last.destArray) !== JSON.stringify(entry.destArray)
        )
          kept.push(entry);
      }
      const trimmed = kept.slice(-MAX_HISTORY);
      return { entries: trimmed, index: trimmed.length - 1 };
    });
  }

  /** Back to where the user was before the last jump. */
  goBack(): void {
    this.moveInHistory(-1);
  }

  /** Forward again, after going back. */
  goForward(): void {
    this.moveInHistory(1);
  }

  private moveInHistory(delta: number): void {
    const { entries, index } = this.historyState();
    const target = entries[index + delta];
    if (!target) return;
    const updated = entries.slice();
    updated[index] = this.here();
    this.historyState.set({ entries: updated, index: index + delta });
    this.scrollTo(target);
  }

  private scrollTo({ pageNumber, destArray }: ScPdfHistoryEntry): void {
    this.engine()?.viewer.scrollPageIntoView({
      pageNumber,
      destArray: (destArray ?? undefined) as never,
    });
  }

  /** Goes to a page, remembering where it came from (Back returns there). */
  jumpToPage(page: number, top = 0): void {
    if (page < 1 || page > this.totalPages()) return;
    this.remember(this.here());
    this.remember({ pageNumber: page, destArray: null }, true);
    this.goToPage(page, top);
  }

  /** Goes to a page; `top` is where on it, from 0 (top) to 1 (bottom). */
  goToPage(page: number, top = 0): void {
    const engine = this.engine();
    if (page < 1 || page > this.totalPages()) return;
    if (!engine) {
      this.openingPage = page;
      return;
    }
    if (!top) {
      engine.viewer.currentPageNumber = page;
      return;
    }
    const view = engine.viewer.getPageView(page - 1)?.pdfPage?.view as
      number[] | undefined;
    const y = view ? view[3] - top * (view[3] - view[1]) : null;
    engine.viewer.scrollPageIntoView({
      pageNumber: page,
      destArray: [null, { name: 'XYZ' }, null, y, null] as never,
    });
  }

  /** The previous page — the previous spread in page scroll mode (pdf.js's). */
  goToPrevPage(): void {
    this.engine()?.viewer.previousPage();
  }

  /** The next page — the next spread in page scroll mode (pdf.js's). */
  goToNextPage(): void {
    this.engine()?.viewer.nextPage();
  }

  /** Goes to a destination — a name or an explicit array — with its zoom (pdf.js's link service). */
  async goToDestination(dest: unknown): Promise<void> {
    await this.engine()?.linkService.goToDestination(dest as never);
  }

  /** Goes to a bookmark's destination, or opens its web link. */
  goToOutlineItem(item: ScPdfOutlineItem): void {
    if (item.url) {
      this.document.defaultView?.open(item.url, '_blank', 'noopener');
      return;
    }
    if (!item.pageNumber) return;
    if (item.zoom !== undefined) this.setZoom(item.zoom);
    this.jumpToPage(item.pageNumber, item.top);
  }

  // ── Zoom and rotation ───────────────────────────────────────────────

  /** Zooms in a step (pdf.js's steps, up to 2500%). */
  zoomIn(): void {
    this.engine()?.viewer.increaseScale();
  }

  /** Zooms out a step (pdf.js's steps, down to 10%). */
  zoomOut(): void {
    this.engine()?.viewer.decreaseScale();
  }

  /** Multiplies the scale around a point of the pages (wheel and pinch zoom). */
  zoomBy(factor: number, origin?: [number, number]): void {
    this.engine()?.viewer.updateScale({
      scaleFactor: factor,
      origin,
    } as never);
  }

  setZoom(level: ScPdfZoomLevel): void {
    this.zoom.set(level);
  }

  rotateLeft(): void {
    this.rotation.update((r) => (((r - 90) % 360) + 360) % 360);
  }

  rotateRight(): void {
    this.rotation.update((r) => (r + 90) % 360);
  }

  // ── Find (pdf.js's find controller) ─────────────────────────────────

  /** Finds `query`: the first match from the current page on. */
  find(query: string): void {
    this.findQuery.set(query);
    if (!query) {
      this.clearFind();
      return;
    }
    this.dispatchFind('');
  }

  findNext(): void {
    if (this.findQuery()) this.dispatchFind('again');
  }

  findPrevious(): void {
    if (this.findQuery()) this.dispatchFind('again', true);
  }

  clearFind(): void {
    this.findQuery.set('');
    this.findState.set('idle');
    this.findCurrentMatchIndex.set(0);
    this.findTotalMatches.set(0);
    this.engine()?.eventBus.dispatch('findbarclose', { source: this });
  }

  /** @internal An option changed: the search again, as pdf.js's find bar. */
  findOptionChanged(type: string): void {
    if (this.findQuery()) this.dispatchFind(type);
  }

  private dispatchFind(
    type: string,
    findPrevious = false,
    query: string | string[] = this.findQuery(),
  ): void {
    this.engine()?.eventBus.dispatch('find', {
      source: this,
      type,
      query,
      caseSensitive: this.findMatchCase(),
      entireWord: this.findEntireWord(),
      highlightAll: this.findHighlightAll(),
      findPrevious,
      matchDiacritics: this.findMatchDiacritics(),
    });
  }

  private updateMatches({
    current,
    total,
  }: {
    current: number;
    total: number;
  }): void {
    this.findTotalMatches.set(total);
    this.findCurrentMatchIndex.set(Math.max(0, current - 1));
  }

  // ── Layers ──────────────────────────────────────────────────────────

  private setLayers(config: ScPdfOptionalContentConfig): void {
    this.optionalContent.set(config);
    const layers: ScPdfLayer[] = [];
    for (const [id, group] of config) {
      layers.push({ id, name: group.name ?? id, visible: group.visible });
    }
    this.layers.set(layers);
  }

  /** Before pdf.js's viewer has it: the document's own layers. */
  private async loadLayers(doc: PDFDocumentProxy): Promise<void> {
    if (this.optionalContent()) return;
    const config = await doc.getOptionalContentConfig().catch(() => null);
    if (doc === this.pdfDocument() && config && !this.optionalContent())
      this.setLayers(config);
  }

  /** Shows or hides a layer; the pages redraw. */
  setLayerVisible(id: string, visible: boolean): void {
    const config = this.optionalContent();
    if (!config) return;
    config.setVisibility(id, visible);
    this.redrawLayers(config);
  }

  /** A link's action on layers (pdf.js's `SetOCGState`). */
  applyLayerState(action: unknown): void {
    const config = this.optionalContent();
    if (!config) return;
    config.setOCGState(action as Parameters<typeof config.setOCGState>[0]);
    this.redrawLayers(config);
  }

  private redrawLayers(config: ScPdfOptionalContentConfig): void {
    this.layers.update((layers) =>
      layers.map((layer) => {
        const visible = config.getGroup(layer.id)?.visible ?? layer.visible;
        return visible === layer.visible ? layer : { ...layer, visible };
      }),
    );
    const engine = this.engine();
    if (engine)
      engine.viewer.optionalContentConfigPromise = Promise.resolve(config);
  }

  // ── Editing: pdf.js's annotation editors ────────────────────────────

  /** pdf.js's editors' manager for the open document, once its viewer made it. */
  private uiManager: ScPdfJsUiManager | null = null;
  private readonly editorsReady = signal(false);
  /** The mode asked of pdf.js, until it says it's there. */
  private requestedEditorMode: number | null = null;

  /** What pdf.js's editors say of the editing: undo, redo, a selection… */
  readonly editorState = signal<{
    isEditing?: boolean;
    isEmpty?: boolean;
    hasSomethingToUndo?: boolean;
    hasSomethingToRedo?: boolean;
    hasSelectedEditor?: boolean;
  }>({});

  /** The editor settings, by pdf.js's parameter. */
  private readonly editorSettings: [number, WritableSignal<unknown>][] = [
    [EDITOR_PARAMS.HIGHLIGHT_COLOR, this.highlightColor],
    [EDITOR_PARAMS.HIGHLIGHT_THICKNESS, this.highlightThickness],
    [EDITOR_PARAMS.HIGHLIGHT_SHOW_ALL, this.highlightShowAll],
    [EDITOR_PARAMS.FREETEXT_COLOR, this.freetextColor],
    [EDITOR_PARAMS.FREETEXT_SIZE, this.freetextSize],
    [EDITOR_PARAMS.INK_COLOR, this.inkColor],
    [EDITOR_PARAMS.INK_THICKNESS, this.inkThickness],
    [EDITOR_PARAMS.INK_OPACITY, this.inkOpacity],
  ] as [number, WritableSignal<unknown>][];
  /** The settings' values as pdf.js has them (to tell its changes from ours). */
  private readonly editorParams = new Map<number, unknown>();
  /** pdf.js has told its editors' settings: it takes ours from then on. */
  private editorParamsKnown = false;

  /** @internal The dialogs and bar pdf.js's editors ask for: the viewer's. */
  readonly editorManagers = editorManagers({
    editAltText: (uiManager, editor) => this.editAltText(uiManager, editor),
    getSignature: (editor) => this.getSignature(editor),
    setCommentsUiManager: (uiManager) => (this.commentsUiManager = uiManager),
    // The comment is written in your part of the viewer.
    commentDialogElement: () =>
      this.containerElement?.nativeElement ??
      (this.engine()?.viewer.container as HTMLElement),
    editComment: (editor) => this.askComment(editor),
    setComments: (comments) => this.setComments(comments),
    updateComment: (comment) => this.putComment(comment),
    removeComments: (ids) => this.dropComments(ids),
    showComment: (editor) => this.activeCommentId.set(editor?.uid ?? null),
    showUndo: (undo, what) => this.showUndoBar(undoneAnnotation(what), undo),
    hideUndo: () => this.closeUndoBar(),
  });

  /** pdf.js's editing events, into the viewer's state (as its application). */
  private listenToEditors(engine: ScPdfEngine): (() => void)[] {
    return [
      engine.on<{ uiManager: ScPdfJsUiManager }>(
        'annotationeditoruimanager',
        ({ uiManager }) => {
          this.uiManager = uiManager;
          this.editorParamsKnown = false;
          this.editorParams.clear();
          this.editorsReady.set(true);
        },
      ),
      // pdf.js's editors ask for a mode (a double-click on a text box…).
      engine.on<{ mode: number }>('switchannotationeditormode', (event) =>
        this.switchEditorMode(engine, event.mode, event),
      ),
      engine.on<{ mode: number }>('annotationeditormodechanged', ({ mode }) => {
        this.requestedEditorMode = null;
        this.editorMode.set(modeName(EDITOR_MODES, mode, 'none'));
      }),
      engine.on<{ details: [number, unknown][] }>(
        'annotationeditorparamschanged',
        ({ details }) => {
          if (!this.editorParamsKnown) {
            // Its editors are ready: they take the viewer's settings.
            this.editorParamsKnown = true;
            for (const [type, setting] of this.editorSettings) {
              this.pushEditorParam(engine, type, untracked(setting));
            }
            return;
          }
          // An annotation selected (its settings), or changed on the page.
          for (const [type, reported] of details) {
            const setting = this.editorSettings.find(([t]) => t === type)?.[1];
            const value =
              setting && COLOR_PARAMS.has(type)
                ? colorSetting(
                    String(reported),
                    String(untracked(setting)),
                    type === EDITOR_PARAMS.HIGHLIGHT_COLOR
                      ? HIGHLIGHT_COLORS
                      : INK_COLORS,
                    engine.viewer.container,
                  )
                : reported;
            this.editorParams.set(type, value);
            setting?.set(value);
          }
        },
      ),
      engine.on<{ details: Record<string, boolean> }>(
        'editingstateschanged',
        ({ details }) => this.editorState.set({ ...details }),
      ),
    ];
  }

  /** The viewer's mode and settings, into pdf.js's editors. */
  private watchEditing(): void {
    effect(() => {
      const engine = this.engine();
      const mode = EDITOR_MODES[this.editorMode()];
      if (engine && this.editorsReady()) {
        untracked(() => this.switchEditorMode(engine, mode));
      }
    });
    for (const [type, setting] of this.editorSettings) {
      effect(() => {
        const value = setting();
        const engine = this.engine();
        if (engine && this.editorsReady() && this.editorParamsKnown) {
          untracked(() => this.pushEditorParam(engine, type, value));
        }
      });
    }
    // A dialog closed (Escape, outside click): its editor is done with.
    effect(() => {
      if (!this.altTextDialogOpen()) untracked(() => this.closeAltText());
    });
    effect(() => {
      if (!this.signatureDialogOpen()) {
        untracked(() => this.closeSignatureDialog());
      }
    });
  }

  private switchEditorMode(
    engine: ScPdfEngine,
    mode: number,
    options: object = {},
  ): void {
    const viewer = engine.viewer;
    if (
      !this.uiManager ||
      editorModeOf(engine) === mode ||
      this.requestedEditorMode === mode
    ) {
      return;
    }
    this.requestedEditorMode = mode;
    viewer.annotationEditorMode = { ...options, mode } as never;
  }

  private pushEditorParam(
    engine: ScPdfEngine,
    type: number,
    value: unknown,
  ): void {
    if (this.editorParams.get(type) === value) return;
    this.editorParams.set(type, value);
    engine.eventBus.dispatch('switchannotationeditorparams', {
      source: this,
      type,
      // The colour pdf.js shows: a highlight's dark side on dark pages
      // (pdf.js saves its `:root` side), else the colour saved.
      value: COLOR_PARAMS.has(type)
        ? (resolveColor(
            String(value),
            engine.viewer.container,
            type === EDITOR_PARAMS.HIGHLIGHT_COLOR && engine.pagesDark
              ? 'shown'
              : 'saved',
          ) ?? value)
        : value,
    });
  }

  /** pdf.js in an editor mode (as asked of it). */
  private enterEditorMode(
    engine: ScPdfEngine,
    mode: ScPdfEditorMode,
  ): Promise<void> {
    const type = EDITOR_MODES[mode];
    this.editorMode.set(mode);
    if (editorModeOf(engine) === type) return Promise.resolve();
    return new Promise((resolve) => {
      const off = engine.on<{ mode: number }>(
        'annotationeditormodechanged',
        (event) => {
          if (event.mode !== type) return;
          off();
          resolve();
        },
      );
      this.switchEditorMode(engine, type);
    });
  }

  /** A new editor in a mode — pdf.js's "add" (an image, a signature). */
  private async createEditor(
    mode: ScPdfEditorMode,
    value?: object,
  ): Promise<void> {
    const engine = this.engine();
    if (!engine || !this.canEdit()) return;
    // Just opened: pdf.js's editors come with its first page.
    if (!this.uiManager) {
      await new Promise<void>((resolve) => {
        const off = engine.on('annotationeditoruimanager', () => {
          off();
          resolve();
        });
      });
    }
    if (engine !== this.engine()) return;
    await this.enterEditorMode(engine, mode);
    // Its editor types register with the first editor layer drawn, and
    // report their settings then: before, it would drop the new editor.
    if (!this.editorParamsKnown) {
      await new Promise<void>((resolve) => {
        const off = engine.on('annotationeditorparamschanged', () => {
          off();
          resolve();
        });
      });
    }
    if (engine !== this.engine()) return;
    engine.eventBus.dispatch('switchannotationeditorparams', {
      source: this,
      type: EDITOR_PARAMS.CREATE,
      value,
    });
  }

  /** The editor tool: `none`, or one of pdf.js's editors (again: off). */
  setEditorMode(mode: ScPdfEditorMode): void {
    // The document forbids adding annotations (see `enablePermissions`).
    if (mode !== 'none' && !this.canEdit()) return;
    this.editorMode.set(this.editorMode() === mode ? 'none' : mode);
  }

  /** Places an image on the current page (pdf.js's image editor). */
  addImage(file: File): void {
    this.createEditor('stamp', { bitmapFile: file });
  }

  /** The editors of a document closed or rebuilt. */
  private closeEditing(): void {
    this.uiManager = null;
    this.commentsUiManager = null;
    this.editorsReady.set(false);
    this.requestedEditorMode = null;
    this.editorState.set({});
    this.closeAltText();
    this.signatureEditor = null;
    this.pendingSignature = null;
    this.signatureDialogOpen.set(false);
    this.cancelComment();
    this.commentData.clear();
    this.comments.set([]);
    this.activeCommentId.set(null);
  }

  // ── Alt text (pdf.js's alt-text button on an image) ─────────────────

  private altTextEditor: {
    uiManager: ScPdfJsUiManager;
    editor: ScPdfJsEditor;
  } | null = null;
  /** The alt text being edited (the `altText` dialog): its description, or decorative. */
  readonly altText = signal<{ text: string; decorative: boolean } | null>(null);

  private editAltText(
    uiManager: ScPdfJsUiManager,
    editor: ScPdfJsEditor,
  ): void {
    // Its keys (Delete…) are the dialog's while it's open, as in pdf.js.
    uiManager.removeEditListeners();
    this.altTextEditor = { uiManager, editor };
    const data = editor.altTextData;
    this.altText.set({
      text: data?.altText ?? '',
      decorative: !!data?.decorative,
    });
    this.altTextDialogOpen.set(true);
  }

  /** Saves the alt text and closes the dialog. */
  saveAltText(text: string, decorative: boolean): void {
    const current = this.altTextEditor;
    if (current) {
      current.editor.altTextData = {
        altText: decorative ? '' : text.trim(),
        decorative,
      };
    }
    this.closeAltText();
  }

  closeAltText(): void {
    this.altTextDialogOpen.set(false);
    const current = this.altTextEditor;
    if (!current) return;
    this.altTextEditor = null;
    this.altText.set(null);
    current.editor.altTextFinish();
    current.uiManager.addEditListeners();
  }

  // ── Signatures (pdf.js's signature editor) ──────────────────────────

  /** A signature editor waiting for its signature (the dialog is open). */
  private signatureEditor: ScPdfJsEditor | null = null;
  /** A signature to give the next one. */
  private pendingSignature: { dataUrl: string; description: string } | null =
    null;

  /** A new signature: pdf.js's editor waits for it in the `signature` dialog. */
  openSignatureDialog(): void {
    this.createEditor('signature');
  }

  /** Closes the dialog — without a signature, its waiting editor goes. */
  closeSignatureDialog(): void {
    this.signatureDialogOpen.set(false);
    this.signatureEditor?.remove();
    this.signatureEditor = null;
  }

  /** Places a signature image on the current page (pdf.js turns it into lines). */
  placeSignature(dataUrl: string, description = ''): void {
    const editor = this.signatureEditor;
    if (editor) {
      this.signatureEditor = null;
      this.fillSignature(editor, { dataUrl, description });
      return;
    }
    this.pendingSignature = { dataUrl, description };
    this.createEditor('signature');
  }

  private getSignature(editor: ScPdfJsEditor): void {
    const pending = this.pendingSignature;
    this.pendingSignature = null;
    if (pending) {
      this.fillSignature(editor, pending);
    } else {
      this.signatureEditor = editor;
      this.signatureDialogOpen.set(true);
    }
  }

  private async fillSignature(
    editor: ScPdfJsEditor,
    { dataUrl, description }: { dataUrl: string; description: string },
  ): Promise<void> {
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const bitmap = await createImageBitmap(blob);
      const data = editor.getFromImage?.(bitmap);
      editor.addSignature?.(data, SIGNATURE_HEIGHT, description, null);
    } catch {
      editor.remove();
    }
  }

  // ── Comments (pdf.js's: on annotations, listed in its comment mode) ─

  private commentsUiManager: ScPdfJsUiManager | null = null;
  /** pdf.js's description of each comment (its page, its place). */
  private readonly commentData = new Map<string, ScPdfJsComment>();
  /** The annotation whose comment is being written. */
  private commentEditor: ScPdfJsEditor | null = null;

  /** The document's own comments (pdf.js lists them in its comment mode). */
  private async loadComments(doc: PDFDocumentProxy): Promise<void> {
    const annotations = (await doc
      // pdf.js's editable types: text boxes, highlights, images, drawings.
      .getAnnotationsByType(new Set([3, 9, 13, 15]), null as never)
      .catch(() => [])) as ScPdfJsComment[] | null;
    if (doc !== this.pdfDocument() || this.commentData.size) return;
    this.setComments(
      (annotations ?? []).filter(
        (annotation) => annotation.popupRef && annotation.contentsObj?.str,
      ),
    );
  }

  private setComments(comments: ScPdfJsComment[]): void {
    this.commentData.clear();
    for (const comment of comments) this.commentData.set(comment.id, comment);
    this.listComments();
  }

  private putComment(comment: ScPdfJsComment): void {
    this.commentData.set(comment.id, comment);
    this.listComments();
  }

  private dropComments(ids: string[]): void {
    for (const id of ids) this.commentData.delete(id);
    if (ids.includes(this.activeCommentId() ?? '')) {
      this.activeCommentId.set(null);
    }
    this.listComments();
  }

  private listComments(): void {
    this.comments.set(
      [...this.commentData.values()]
        .map(toComment)
        .sort((a, b) => a.pageNumber - b.pageNumber),
    );
  }

  /** Edits a comment (one made in the viewer) in the comment form. */
  editComment(id: string): void {
    const editor = this.commentsUiManager?.getEditor(id);
    if (editor) this.askComment(editor);
  }

  /** pdf.js's comment button on an annotation: its comment, to write. */
  private askComment(editor: ScPdfJsEditor): void {
    this.commentEditor = editor;
    const comment = editor.comment;
    this.pendingComment.set({
      id: editor.uid,
      pageNumber: editor.pageIndex + 1,
      text: typeof comment === 'object' && comment ? (comment.text ?? '') : '',
    });
  }

  /** Saves the comment being written (`pendingComment`). */
  postComment(text: string): void {
    const editor = this.commentEditor;
    this.cancelComment();
    if (!editor) return;
    editor.comment = text;
    this.activeCommentId.set(editor.uid);
  }

  cancelComment(): void {
    this.commentEditor = null;
    this.pendingComment.set(null);
  }

  /** Changes a comment's text (one made in the viewer). */
  updateComment(id: string, text: string): void {
    const editor = this.commentsUiManager?.getEditor(id);
    if (editor) editor.comment = text;
  }

  /** Deletes a comment (one made in the viewer) — undoable from the undo bar. */
  removeComment(id: string): void {
    const uiManager = this.commentsUiManager;
    const editor = uiManager?.getEditor(id);
    if (uiManager && editor) uiManager.deleteComment(editor, editor.comment);
  }

  /** Shows a comment's annotation, and picks it. */
  showComment(id: string): void {
    const data = this.commentData.get(id);
    if (!data) return;
    this.activeCommentId.set(id);
    const [x = 0, , , y = 0] = data.rect ?? [];
    this.engine()?.linkService.goToXY(data.pageIndex + 1, x, y);
    if (this.commentsUiManager?.getEditor(id)) {
      this.commentsUiManager.selectComment(data.pageIndex, id);
    }
  }

  private onKeydown(event: KeyboardEvent): void {
    if (!this.keyboardShortcuts() || event.defaultPrevented) return;
    const ctrl = event.ctrlKey || event.metaKey;
    const { altKey: alt, shiftKey: shift, key } = event;
    const target = event.target as HTMLElement;
    const typing =
      target.isContentEditable ||
      /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
    const last = this.totalPages();
    let handled = true;

    if (ctrl && alt && !shift) {
      switch (key.toLowerCase()) {
        case 'p':
          this.togglePresentation();
          break;
        case 'g':
          this.pageFocusRequest.update((v) => v + 1);
          break;
        default:
          handled = false;
      }
    } else if (ctrl && !alt) {
      switch (key) {
        case 'f':
        case 'F':
          this.openFind();
          break;
        case 'g':
        case 'G':
          if (shift) this.findPrevious();
          else this.findNext();
          break;
        case '+':
        case '=':
          this.zoomIn();
          break;
        case '-':
        case '_':
          this.zoomOut();
          break;
        case '0':
          this.setZoom('auto');
          break;
        case 'ArrowUp':
          handled = !typing && !shift;
          if (handled) this.goToPage(1);
          break;
        case 'ArrowDown':
          handled = !typing && !shift;
          if (handled) this.goToPage(last);
          break;
        case 's':
          this.download();
          break;
        case 'o':
          this.openFile();
          break;
        case 'p':
          this.printWithProgress();
          break;
        default:
          handled = false;
      }
    } else if (!ctrl && !alt && key === 'Escape' && this.findOpen()) {
      this.toggleFind();
    } else if (
      !ctrl &&
      !alt &&
      !typing &&
      this.caretBrowsing() &&
      (key === 'ArrowUp' || key === 'ArrowDown') &&
      moveCaret(key === 'ArrowUp', shift)
    ) {
      // Handled: the caret moved a line (caret browsing).
    } else if (
      !ctrl &&
      !alt &&
      !typing &&
      this.scrollMode() === 'page' &&
      this.pageModeKey(key, shift, target)
    ) {
      // Handled: page mode turns spreads with these keys.
    } else if (!ctrl && !alt && !typing) {
      switch (key) {
        case 'n':
        case 'j':
          this.goToNextPage();
          break;
        case 'p':
        case 'k':
          this.goToPrevPage();
          break;
        case 'Home':
          this.goToPage(1);
          break;
        case 'End':
          this.goToPage(last);
          break;
        case 'r':
          this.rotateRight();
          break;
        case 'R':
          this.rotateLeft();
          break;
        case 's':
          this.cursorTool.set('select');
          break;
        case 'h':
          this.cursorTool.set('hand');
          break;
        case 'F4':
          this.sidebarOpen.update((open) => !open);
          break;
        default:
          handled = false;
      }
    } else {
      handled = false;
    }

    if (handled) event.preventDefault();
  }

  /** Page Down / → / Space: next spread; Page Up / ← / Shift+Space: previous. */
  private pageModeKey(
    key: string,
    shift: boolean,
    target: HTMLElement,
  ): boolean {
    const space = key === ' ' && target.tagName !== 'BUTTON';
    if (key === 'PageDown' || key === 'ArrowRight' || (space && !shift)) {
      this.goToNextPage();
      return true;
    }
    if (key === 'PageUp' || key === 'ArrowLeft' || (space && shift)) {
      this.goToPrevPage();
      return true;
    }
    return false;
  }

  /** Opens the find bar and focuses its field. */
  openFind(): void {
    this.findOpen.set(true);
    this.findFocusRequest.update((v) => v + 1);
  }

  /** Presentation mode (fullscreen for now). */
  /**
   * Presentation mode (as pdf.js): fullscreen, toolbar hidden, one page at a
   * time fitted to the screen on black; click, wheel, swipe or the keys turn
   * the page, Escape leaves. The view as it was comes back afterwards.
   */
  async togglePresentation(): Promise<void> {
    if (this.presenting()) {
      await this.document.exitFullscreen().catch(() => undefined);
      return;
    }
    const container = this.containerElement?.nativeElement;
    if (!container || !this.pdfDocument()) return;

    this.presentationState = {
      scrollMode: this.scrollMode(),
      spreadMode: this.spreadMode(),
      zoom: this.zoom(),
      sidebarOpen: this.sidebarOpen(),
      cursorTool: this.cursorTool(),
    };
    this.presenting.set(true);
    this.scrollMode.set('page');
    this.spreadMode.set('none');
    this.zoom.set('page-fit');
    this.sidebarOpen.set(false);
    this.cursorTool.set('select');
    this.setEditorMode('none');
    if (this.findOpen()) this.toggleFind();
    this.goToPage(this.currentPage());

    try {
      if (this.document.fullscreenElement !== container) {
        await container.requestFullscreen();
      }
    } catch {
      this.endPresentation();
    }
  }

  /** Leaves presentation mode, restoring the view. */
  private endPresentation(): void {
    const state = this.presentationState;
    if (!state) return;
    this.presentationState = null;
    this.presenting.set(false);
    this.scrollMode.set(state.scrollMode);
    this.spreadMode.set(state.spreadMode);
    this.zoom.set(state.zoom);
    this.sidebarOpen.set(state.sidebarOpen);
    this.cursorTool.set(state.cursorTool);
    this.goToPage(this.currentPage());
  }

  toggleFind(): void {
    const open = !this.findOpen();
    this.findOpen.set(open);
    if (open) this.findFocusRequest.update((v) => v + 1);
    if (!open) {
      this.clearFind();
    }
  }

  // Undo bar
  private showUndoBar(
    undo: ScPdfUndoable,
    action: () => void,
    cleanup: (() => void) | null = null,
  ): void {
    this.closeUndoBar();
    this.undoAction = action;
    this.undoCleanup = cleanup;
    this.undoable.set(undo);

    this.undoTimeout = setTimeout(() => {
      this.closeUndoBar();
    }, 5000);
  }

  undoLastAction(): void {
    const action = this.undoAction;
    this.undoAction = null;
    this.undoCleanup = null;
    action?.();
    this.closeUndoBar();
  }

  closeUndoBar(): void {
    this.undoable.set(null);
    this.undoAction = null;
    const cleanup = this.undoCleanup;
    this.undoCleanup = null;
    cleanup?.();
    if (this.undoTimeout) {
      clearTimeout(this.undoTimeout);
      this.undoTimeout = null;
    }
  }
}
