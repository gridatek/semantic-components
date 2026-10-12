import {
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
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
import { cn } from '@semantic-components/ui';
import type { PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdfjs-dist';
import {
  AnnotationMode,
  GlobalWorkerOptions,
  PermissionFlag,
  getDocument,
  version,
} from 'pdfjs-dist';
import type { ScPdfNormalizedText } from './pdf-viewer-find';
import { findInPage, normalizeText } from './pdf-viewer-find';
import { annotationStorageValues } from './pdf-viewer-save';
import { ScPdfScripting } from './pdf-viewer-scripting';
import type {
  ScPdfAttachment,
  ScPdfComment,
  ScPdfCursorTool,
  ScPdfDestination,
  ScPdfEditorAnnotation,
  ScPdfEditorMode,
  ScPdfFindState,
  ScPdfLayer,
  ScPdfLoadError,
  ScPdfLoadEvent,
  ScPdfOutlineItem,
  ScPdfPageChangeEvent,
  ScPdfPageColors,
  ScPdfPageMatchInfo,
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
const MAX_SCALE = 10;

/** pdf.js's optional content (layers) config; not exported by pdfjs-dist. */
type OptionalContentConfig = Awaited<
  ReturnType<PDFDocumentProxy['getOptionalContentConfig']>
>;

/** A script that prints, in a document's JavaScript actions (as pdf.js). */
const AUTO_PRINT = /\bprint\s*\(/;

/** How long without rendering before pdf.js's caches are freed (as pdf.js). */
const CLEANUP_TIMEOUT = 30_000;

/** Back / Forward remembers this many places. */
const MAX_HISTORY = 50;

/** A place in the document: a page, and how far down it (0–1). */
interface ScPdfPlace {
  page: number;
  top: number;
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

const NAMED_ZOOMS: Record<string, ScPdfZoomLevel> = {
  auto: 'auto',
  'page-actual': 'page-actual',
  'page-fit': 'page-fit',
  'page-height': 'page-fit',
  'page-width': 'page-width',
};

/** pdf.js's outline item, as `getOutline()` returns it. */
interface PdfOutlineNode {
  title: string;
  dest: string | unknown[] | null;
  url: string | null;
  bold: boolean;
  italic: boolean;
  count: number | undefined;
  items: PdfOutlineNode[];
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
      annotations?: ScPdfEditorAnnotation[];
      comments?: ScPdfComment[];
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
  protected readonly class = computed(() => cn('block', this.classInput()));

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
   * Colours to draw the pages with (e.g. a dark reading mode). Unset, the
   * pages follow the system's high-contrast mode (forced colours), drawn
   * in its `CanvasText` on `Canvas`, as in pdf.js.
   */
  readonly pageColors = input<ScPdfPageColors | null>(null);

  /** The system's high-contrast mode is on. */
  private readonly forcedColors = signal(false);

  /** The colours pages are drawn with, or null for their own. */
  readonly appliedPageColors = computed((): ScPdfPageColors | null => {
    const colors =
      this.pageColors() ??
      (this.forcedColors()
        ? { foreground: 'CanvasText', background: 'Canvas' }
        : null);
    // pdf.js needs both, and real colours.
    return colors &&
      typeof CSS !== 'undefined' &&
      CSS.supports('color', colors.foreground) &&
      CSS.supports('color', colors.background)
      ? colors
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
  /** Pages copied or cut, for `pastePages`: a PDF of them, and what was on them. */
  readonly pageClipboard = signal<{
    data: Uint8Array;
    count: number;
    /** On page 1…count of the copied pages. */
    annotations: ScPdfEditorAnnotation[];
    comments: ScPdfComment[];
  } | null>(null);
  /** The document is being rebuilt (page organisation). */
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

  // Navigation trigger — incremented to signal canvas to scroll to currentPage
  readonly navigateTrigger = signal(0);
  /** Where on the page the last navigation goes, from 0 (top) to 1 (bottom). */
  readonly navigateTop = signal(0);
  /** Whether the last navigation scrolls smoothly (not while a document opens). */
  readonly navigateSmooth = signal(true);
  /** Navigations right now are part of opening a document: instant. */
  private openingNavigation = false;

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
  async moveSelectedPages(delta: -1 | 1): Promise<void> {
    const pages = this.pageSelection();
    if (!pages.length) return;
    const before = delta < 0 ? pages[0] - 1 : pages[pages.length - 1] + 2;
    this.selectedPages.set(new Set(await this.movePages(pages, before)));
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
    const pageColors = this.appliedPageColors();
    const key = `${pageNumber}:${width}:${rotation}:${JSON.stringify(pageColors)}`;
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

  /** Pages drawn with their form fields in the DOM (for page scripts). */
  private readonly renderedPageNumbers = new Set<number>();

  /** The document's JavaScript, run in pdf.js's sandbox. */
  readonly scripting = new ScPdfScripting(
    {
      currentPage: () => this.currentPage(),
      totalPages: () => this.totalPages(),
      goToPage: (page) => this.goToPage(page),
      goToNextPage: () => this.goToNextPage(),
      goToPrevPage: () => this.goToPrevPage(),
      setScriptZoom: (value) => this.setScriptZoom(value),
      zoomIn: () => this.zoomIn(),
      zoomOut: () => this.zoomOut(),
      print: () => this.printWithProgress(),
      download: () => this.download(),
      isPageRendered: (page) => this.renderedPageNumbers.has(page),
      isPresenting: () => this.presenting(),
    },
    () => ({
      sandboxSrc:
        this.sandboxSrc() || `${this.assetsUrl()}build/pdf.sandbox.min.mjs`,
      wasmSrc: this.wasmSrc() || `${this.assetsUrl()}wasm/`,
    }),
  );

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
  readonly pageMatches = signal<ScPdfPageMatchInfo[]>([]);
  readonly findTrigger = signal(0);

  /** Each page's text, extracted once per document for find. */
  private pageTexts: Promise<ScPdfNormalizedText[]> | null = null;
  private pageTextsDocument: PDFDocumentProxy | null = null;
  /** Increments with each search, so an older one can't overwrite a newer one. */
  private findToken = 0;

  // Editor state
  readonly editorMode = signal<ScPdfEditorMode>('none');
  readonly editorAnnotations = signal<ScPdfEditorAnnotation[]>([]);
  readonly editorTrigger = signal(0);
  /** The annotation selected on the page (its toolbar shows), or null. */
  readonly selectedAnnotationId = signal<string | null>(null);

  // Editor params
  /** pdf.js's default highlight yellow. */
  readonly highlightColor = signal('#FFFF98');
  readonly highlightThickness = signal(12);
  readonly highlightShowAll = signal(true);
  readonly freetextColor = signal('#000000');
  readonly freetextSize = signal(12);
  readonly inkColor = signal('#000000');
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
  readonly altTextAnnotationId = signal<string | null>(null);

  /** The document's optional content (layers), and whether each shows. */
  readonly layers = signal<ScPdfLayer[]>([]);
  /** The layers' visibility as pdf.js renders it (with the pages). */
  readonly optionalContent = signal<OptionalContentConfig | null>(null);

  // Signature state
  readonly signatureDialogOpen = signal(false);
  /**
   * Signatures saved for reuse. Bind `[(savedSignatures)]` to keep them
   * between sessions (pdf.js remembers them).
   */
  readonly savedSignatures = model<ScPdfSignatureData[]>([]);

  // Comment state
  readonly comments = signal<ScPdfComment[]>([]);
  /** Where a comment is being added (the comment tool's click), until posted. */
  readonly pendingComment = signal<{
    pageNumber: number;
    x: number;
    y: number;
  } | null>(null);
  /** The comment picked on the page or in the list. */
  readonly activeCommentId = signal<string | null>(null);

  /** What the undo bar can undo now (shown for a few seconds), or null. */
  readonly undoable = signal<ScPdfUndoable | null>(null);
  private undoAction: (() => void) | null = null;
  private undoTimeout: ReturnType<typeof setTimeout> | null = null;

  // Print progress state
  readonly printProgress = signal(0);
  readonly printDialogOpen = signal(false);
  private printCancelled = false;

  // Sidebar
  readonly sidebarWidth = signal(200);

  private editorIdCounter = 0;
  private signatureIdCounter = 0;
  private commentIdCounter = 0;

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

    // Page scripts: the previous page closes, the new one opens.
    let previousPage = this.currentPage();
    effect(() => {
      const page = this.currentPage();
      untracked(() => this.scripting.pageChanged(previousPage, page));
      previousPage = page;
    });

    this.destroyRef.onDestroy(() => {
      if (this.cleanupTimeout) clearTimeout(this.cleanupTimeout);
      this.releaseThumbnails();
      this.scripting.destroy();
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
    {
      keepAnnotations = false,
      page,
    }: { keepAnnotations?: boolean; page?: number } = {},
  ): Promise<void> {
    this.loadingTask?.destroy();
    this.loadingTask = null;

    // Release the previous document once nothing renders it any more.
    const previous = this.pdfDocument();
    this.pdfDocument.set(null);
    previous?.loadingTask.destroy();
    this.clearFind();
    this.pendingComment.set(null);
    // Annotations and comments belong to the document — except when it's
    // the same one rebuilt (page organisation), which remaps them itself.
    if (!keepAnnotations) {
      this.clearPageSelection();
      this.editorAnnotations.set([]);
      this.comments.set([]);
      this.activeCommentId.set(null);
      this.closeUndoBar();
    }
    this.error.set(null);
    this.passwordRequired.set(false);
    this.passwordCallback = null;
    this.loadProgress.set(null);
    this.pageLabels.set(null);
    this.outline.set([]);
    this.formInfo.set({ fieldObjects: null, hasJSActions: false });
    this.layers.set([]);
    this.optionalContent.set(null);
    this.attachments.set([]);
    this.outlineExpanded.set(new Set());
    this.history.set({ entries: [], index: -1 });
    this.permissions.set(null);
    this.releaseThumbnails();
    this.renderedPageNumbers.clear();
    this.scripting.setDocument(null);

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
      // Navigated (not just set), so the canvas goes there once laid out.
      this.openingNavigation = true;
      this.goToPage(
        Math.min(Math.max(1, page ?? this.initialPage()), doc.numPages),
      );
      this.openingNavigation = false;
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
    if (this.enableScripting()) this.scripting.setDocument(doc);

    this.pageLabels.set(usefulPageLabels(labels, doc.numPages));
    this.outline.set(outline);
    this.outlineExpanded.set(new Set(openOutlineIds(outline)));
    this.loadAttachments(doc);
    this.applyPageLayout(pageLayout);

    const view = pageMode ? PAGE_MODES[pageMode] : undefined;
    if (view) {
      this.sidebarView.set(view);
      this.sidebarOpen.set(true);
    }

    const openDest = field(openAction, 'dest');
    // Where the document opens is jumped to, not scrolled to (as pdf.js).
    this.openingNavigation = true;
    try {
      if (hash) await this.applyHash(hash);
      else if (openDest) await this.goToDestination(openDest);
    } finally {
      this.openingNavigation = false;
    }
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
      PdfOutlineNode[] | null;
    const convert = (
      items: PdfOutlineNode[],
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

  /** Goes to a destination (see `resolveDestination`), with its zoom. */
  async goToDestination(dest: unknown): Promise<void> {
    const target = await this.resolveDestination(dest);
    if (!target) return;
    if (target.zoom !== undefined) this.setZoom(target.zoom);
    this.jumpToPage(target.pageNumber, target.top);
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

  /**
   * Applies pdf.js's open parameters — `page`, `zoom` (`150`, `page-width`,
   * `150,0,720`…), `nameddest`, `search`, `pagemode` — or a bare named
   * destination (`#chapter-2`). `src`'s fragment is applied on load.
   */
  async applyHash(hash: string): Promise<void> {
    const doc = this.pdfDocument();
    hash = hash.replace(/^#/, '');
    if (!doc || !hash) return;

    if (!hash.includes('=')) {
      let dest: unknown = decodeURIComponent(hash);
      try {
        const parsed: unknown = JSON.parse(dest as string);
        dest = Array.isArray(parsed) ? parsed : String(parsed);
      } catch {
        // A name.
      }
      await this.goToDestination(dest);
      return;
    }

    // Keys are case-insensitive, as in pdf.js.
    const params = new Map(
      [...new URLSearchParams(hash)].map(([key, value]) => [
        key.toLowerCase(),
        value,
      ]),
    );

    const pageMode = params.get('pagemode');
    if (pageMode === 'none') {
      this.sidebarOpen.set(false);
    } else if (pageMode && HASH_PAGE_MODES[pageMode]) {
      this.sidebarView.set(HASH_PAGE_MODES[pageMode]);
      this.sidebarOpen.set(true);
    }

    let pdfTop: unknown = null;
    const zoom = params.get('zoom');
    if (zoom) {
      const [scale, , top] = zoom.split(',');
      const percent = parseFloat(scale);
      const level: ScPdfZoomLevel | undefined = Number.isFinite(percent)
        ? Math.min(MAX_SCALE, Math.max(MIN_SCALE, percent / 100))
        : NAMED_ZOOMS[scale];
      if (level !== undefined) this.setZoom(level);
      if (top !== undefined) pdfTop = parseFloat(top);
    }

    const nameddest = params.get('nameddest');
    const page = parseInt(params.get('page') ?? '', 10);
    if (nameddest) {
      await this.goToDestination(nameddest);
    } else if (Number.isInteger(page)) {
      const pageNumber = Math.min(Math.max(1, page), doc.numPages);
      this.jumpToPage(
        pageNumber,
        await this.topOnPage(doc, pageNumber, pdfTop),
      );
    }

    const search = params.get('search');
    if (search) {
      this.findOpen.set(true);
      this.find(search);
    }
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

  /** The previous page — the previous spread in page scroll mode. */
  goToPrevPage(): void {
    if (!this.canGoPrev()) return;
    if (this.scrollMode() === 'page') {
      const [first] = this.spreadOf(this.currentPage());
      this.goToPage(this.spreadOf(Math.max(1, first - 1))[0]);
    } else {
      this.goToPage(this.currentPage() - 1);
    }
  }

  /** The next page — the next spread in page scroll mode. */
  goToNextPage(): void {
    if (!this.canGoNext()) return;
    if (this.scrollMode() === 'page') {
      const [, last] = this.spreadOf(this.currentPage());
      this.goToPage(Math.min(this.totalPages(), last + 1));
    } else {
      this.goToPage(this.currentPage() + 1);
    }
  }

  /** The first and last page of the spread holding `page`. */
  spreadOf(page: number): [number, number] {
    const mode = this.spreadMode();
    if (mode === 'none') return [page, page];
    // Odd spreads pair 1–2, 3–4…; even spreads show 1 alone, then 2–3, 4–5…
    const first =
      mode === 'odd'
        ? page % 2 === 1
          ? page
          : page - 1
        : page === 1
          ? 1
          : page % 2 === 0
            ? page
            : page - 1;
    const last =
      mode === 'even' && first === 1
        ? 1
        : Math.min(first + 1, this.totalPages());
    return [first, last];
  }

  /**
   * Where the user was before each jump (a link, a bookmark, a thumbnail,
   * the page input…), for Back and Forward, as pdf.js's history — kept in
   * the viewer, not the browser's history (the app owns that).
   */
  private readonly history = signal<{ entries: ScPdfPlace[]; index: number }>({
    entries: [],
    index: -1,
  });
  readonly canGoBack = computed(() => this.history().index > 0);
  readonly canGoForward = computed(() => {
    const { entries, index } = this.history();
    return index < entries.length - 1;
  });
  /** Where the pages are scrolled to (the canvas tells). */
  private locator: (() => ScPdfPlace) | null = null;

  /** @internal The canvas tells where the pages are scrolled to. */
  setLocator(locator: (() => ScPdfPlace) | null): void {
    this.locator = locator;
  }

  private location(): ScPdfPlace {
    return this.locator?.() ?? { page: this.currentPage(), top: 0 };
  }

  /** Goes to a page, remembering where it came from (Back returns there). */
  jumpToPage(page: number, top = 0): void {
    if (page < 1 || page > this.totalPages()) return;
    if (!this.openingNavigation) {
      const from = this.location();
      const to = { page, top };
      this.history.update(({ entries, index }) => {
        const kept = entries.slice(0, index + 1);
        // The current entry is where the user is now (they may have scrolled).
        kept.splice(Math.max(0, kept.length - 1), 1, from);
        if (from.page !== to.page || Math.abs(from.top - to.top) > 0.01) {
          kept.push(to);
        }
        const trimmed = kept.slice(-MAX_HISTORY);
        return { entries: trimmed, index: trimmed.length - 1 };
      });
    }
    this.goToPage(page, top);
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
    const { entries, index } = this.history();
    const target = entries[index + delta];
    if (!target) return;
    const updated = entries.slice();
    updated[index] = this.location();
    this.history.set({ entries: updated, index: index + delta });
    this.goToPage(target.page, target.top);
  }

  /** Goes to a page; `top` is where on it, from 0 (top) to 1 (bottom). */
  goToPage(page: number, top = 0): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.navigateTop.set(top);
      this.navigateSmooth.set(!this.openingNavigation);
      this.currentPage.set(page);
      this.navigateTrigger.update((v) => v + 1);
      this.pageChange.emit({
        currentPage: page,
        totalPages: this.totalPages(),
      });
    }
  }

  /** To the next 25% step above the current scale (up to 1000%). */
  zoomIn(): void {
    const steps = Math.floor(this.currentScale() * 4 + 1e-6) + 1;
    this.setZoom(Math.min(MAX_SCALE, steps / 4));
  }

  /** To the next 25% step below the current scale (down to 10%). */
  zoomOut(): void {
    const steps = Math.ceil(this.currentScale() * 4 - 1e-6) - 1;
    this.setZoom(Math.max(MIN_SCALE, steps / 4));
  }

  /** Multiplies the current scale (wheel and pinch zoom). */
  zoomBy(factor: number): void {
    const scale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, this.currentScale() * factor),
    );
    this.setZoom(Math.round(scale * 1000) / 1000);
  }

  setZoom(level: ScPdfZoomLevel): void {
    this.zoom.set(level);
    this.zoomChange.emit({
      zoom: level,
      scale: typeof level === 'number' ? level : 1,
    });
  }

  rotateLeft(): void {
    this.rotation.update((r) => (((r - 90) % 360) + 360) % 360);
  }

  rotateRight(): void {
    this.rotation.update((r) => (r + 90) % 360);
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

  /** Whether there's anything to write into the file: annotations, comments, form data. */
  hasChanges(): boolean {
    return (
      this.editorAnnotations().length > 0 ||
      this.comments().some((comment) => comment.text.trim()) ||
      (this.pdfDocument()?.annotationStorage.size ?? 0) > 0
    );
  }

  /**
   * The document with the viewer's annotations and comments, and the form
   * data, written into it — a new PDF file's bytes.
   */
  async saveDocument(): Promise<Uint8Array> {
    const doc = this.pdfDocument();
    if (!doc) throw new Error('No document to save.');
    await this.scripting.willSave();
    const storage = doc.annotationStorage;
    const values = await annotationStorageValues(
      doc,
      this.editorAnnotations(),
      this.comments(),
    );
    for (const [key, value] of values) storage.setValue(key, value);
    try {
      return await doc.saveDocument();
    } finally {
      // They stay editable in the viewer; only the file gets them.
      for (const key of values.keys()) storage.remove(key);
      this.scripting.didSave();
    }
  }

  // Page organisation (as pdf.js's): each change rebuilds the document with
  // pdf.js's extractPages — form data carried over, the viewer's annotations
  // and comments following their pages — and can be undone.

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

  /**
   * Moves pages to just before `beforePage` (past the end: to the end),
   * keeping their order. Resolves with their new page numbers.
   */
  async movePages(
    pageNumbers: number[],
    beforePage: number,
  ): Promise<number[]> {
    const moving = this.pageSet(pageNumbers);
    if (!moving.length) return [];
    const rest = this.allPages().filter((p) => !moving.includes(p));
    rest.splice(rest.filter((p) => p < beforePage).length, 0, ...moving);
    const start = rest.indexOf(moving[0]) + 1;
    await this.rebuild(
      rest.map((page) => ({ page })),
      { kind: 'pages-moved', count: moving.length },
      { focusPage: start },
    );
    return moving.map((_, i) => start + i);
  }

  /** Deletes pages (not all of them). */
  deletePages(pageNumbers: number[]): Promise<void> {
    const removing = this.pageSet(pageNumbers);
    if (!removing.length || removing.length >= this.totalPages()) {
      return Promise.resolve();
    }
    return this.rebuild(
      this.allPages()
        .filter((p) => !removing.includes(p))
        .map((page) => ({ page })),
      { kind: 'pages-deleted', count: removing.length },
    );
  }

  /** Copies pages (with their annotations, comments and form data) for `pastePages`. */
  async copyPages(pageNumbers: number[]): Promise<void> {
    const doc = this.pdfDocument();
    const pages = this.pageSet(pageNumbers);
    if (!doc || !pages.length) return;
    const data = await doc.extractPages([
      { document: null, includePages: pages.map((p) => p - 1) },
    ]);
    const onPages = <T extends { pageNumber: number }>(items: T[]): T[] =>
      items
        .filter((item) => pages.includes(item.pageNumber))
        .map((item) => ({
          ...item,
          pageNumber: pages.indexOf(item.pageNumber) + 1,
        }));
    this.pageClipboard.set({
      data,
      count: pages.length,
      annotations: onPages(this.editorAnnotations()),
      comments: onPages(this.comments()),
    });
  }

  /** Copies pages, then deletes them — paste them elsewhere to move them. */
  async cutPages(pageNumbers: number[]): Promise<void> {
    await this.copyPages(pageNumbers);
    await this.deletePages(pageNumbers);
  }

  /** Pastes the copied / cut pages after `afterPage` (0: at the start). */
  pastePages(afterPage = this.currentPage()): Promise<void> {
    const clip = this.pageClipboard();
    if (!clip) return Promise.resolve();
    const entries: ScPdfPageEntry[] = this.allPages().map((page) => ({
      page,
    }));
    entries.splice(
      afterPage,
      0,
      ...Array.from({ length: clip.count }, (_, index) => ({
        data: clip.data,
        index,
        annotations: clip.annotations,
        comments: clip.comments,
      })),
    );
    return this.rebuild(
      entries,
      { kind: 'pages-pasted', count: clip.count },
      { focusPage: afterPage + 1 },
    );
  }

  /** Inserts the pages of another PDF after `afterPage` (merging files). */
  async insertFile(
    file: File | Uint8Array,
    afterPage = this.totalPages(),
  ): Promise<boolean> {
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
      // Not a PDF (or unreadable): the consumer says so.
      return false;
    }
    const entries: ScPdfPageEntry[] = this.allPages().map((page) => ({
      page,
    }));
    entries.splice(
      afterPage,
      0,
      ...Array.from({ length: count }, (_, index) => ({ data, index })),
    );
    await this.rebuild(
      entries,
      { kind: 'pages-inserted', count },
      { focusPage: afterPage + 1 },
    );
    return true;
  }

  /** Downloads a PDF of just these pages, with their annotations, comments and form data. */
  async exportPages(pageNumbers: number[]): Promise<void> {
    const doc = this.pdfDocument();
    const pages = this.pageSet(pageNumbers);
    if (!doc || !pages.length) return;
    const onPages = <T extends { pageNumber: number }>(items: T[]): T[] =>
      items.filter((item) => pages.includes(item.pageNumber));
    const values = await annotationStorageValues(
      doc,
      onPages(this.editorAnnotations()),
      onPages(this.comments()),
    );
    const storage = doc.annotationStorage;
    for (const [key, value] of values) storage.setValue(key, value);
    let data: Uint8Array;
    try {
      data = await doc.extractPages([
        { document: null, includePages: pages.map((p) => p - 1) },
      ]);
    } finally {
      for (const key of values.keys()) storage.remove(key);
    }
    this.saveAs(
      new Blob([data as Uint8Array<ArrayBuffer>], { type: 'application/pdf' }),
      `${this.downloadName()} (${pages.length === 1 ? `page ${pages[0]}` : `${pages.length} pages`}).pdf`,
    );
  }

  /** Rebuilds the document from `entries` (its pages and others), undoably. */
  private async rebuild(
    entries: ScPdfPageEntry[],
    undo: ScPdfUndoable,
    { focusPage }: { focusPage?: number } = {},
  ): Promise<void> {
    const doc = this.pdfDocument();
    if (!doc || this.organizing() || !entries.length) return;
    this.organizing.set(true);
    try {
      // For undo: the document as it is (form data included), and the rest.
      const before = {
        data: await doc.extractPages([{ document: null }]),
        annotations: this.editorAnnotations(),
        comments: this.comments(),
        page: this.currentPage(),
      };
      const data = await doc.extractPages(pageInfos(entries));
      const { annotations, comments } = this.remapToEntries(entries);
      const moved = entries.findIndex(
        (entry) => 'page' in entry && entry.page === before.page,
      );
      await this.replaceDocument(
        data,
        annotations,
        comments,
        focusPage ??
          (moved >= 0 ? moved + 1 : Math.min(before.page, entries.length)),
      );
      this.showUndoBar(undo, () =>
        this.replaceDocument(
          before.data,
          before.annotations,
          before.comments,
          before.page,
        ),
      );
    } catch (error) {
      console.error('Page organisation:', error);
    } finally {
      this.organizing.set(false);
    }
  }

  /** The annotations and comments of each entry's source page, on its new page. */
  private remapToEntries(entries: ScPdfPageEntry[]): {
    annotations: ScPdfEditorAnnotation[];
    comments: ScPdfComment[];
  } {
    const annotations: ScPdfEditorAnnotation[] = [];
    const comments: ScPdfComment[] = [];
    const usedIds = new Set<string>();
    entries.forEach((entry, position) => {
      const [sourceAnnotations, sourceComments, sourcePage] =
        'page' in entry
          ? [this.editorAnnotations(), this.comments(), entry.page]
          : [entry.annotations ?? [], entry.comments ?? [], entry.index + 1];
      for (const ann of sourceAnnotations) {
        if (ann.pageNumber !== sourcePage) continue;
        // A page placed twice gets its annotations twice: fresh ids.
        const id = usedIds.has(ann.id)
          ? `editor-${++this.editorIdCounter}`
          : ann.id;
        usedIds.add(id);
        annotations.push({ ...ann, id, pageNumber: position + 1 });
      }
      for (const comment of sourceComments) {
        if (comment.pageNumber !== sourcePage) continue;
        const id = usedIds.has(comment.id)
          ? `comment-${++this.commentIdCounter}`
          : comment.id;
        usedIds.add(id);
        comments.push({ ...comment, id, pageNumber: position + 1 });
      }
    });
    return { annotations, comments };
  }

  /** Shows a rebuilt document in place of the current one. */
  private async replaceDocument(
    data: Uint8Array,
    annotations: ScPdfEditorAnnotation[],
    comments: ScPdfComment[],
    page: number,
  ): Promise<void> {
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
    this.editorAnnotations.set(annotations);
    this.comments.set(comments);
    this.editorTrigger.update((v) => v + 1);
    // The pages are renumbered (movePages re-selects the moved ones).
    this.clearPageSelection();
    await this.open({ data }, '', { keepAnnotations: true, page });
  }

  /** A page was drawn (its form fields are in the DOM) — for page scripts. */
  pageRendered(pageNumber: number): void {
    this.renderedPageNumbers.add(pageNumber);
    this.scripting.pageRendered(pageNumber);
  }

  /** A page was released (scrolled far away). */
  pageReleased(pageNumber: number): void {
    this.renderedPageNumbers.delete(pageNumber);
  }

  /** A zoom asked for by a script: a scale, or Acrobat's zoom types. */
  private setScriptZoom(value: number | string): void {
    if (typeof value === 'number' && value > 0) {
      this.setZoom(Math.min(MAX_SCALE, Math.max(MIN_SCALE, value)));
    } else if (value === 'FitPage' || value === 'FitHeight') {
      this.setZoom('page-fit');
    } else if (value === 'FitWidth' || value === 'FitVisibleWidth') {
      this.setZoom('page-width');
    }
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
    if (doc && !this.canPrint()) return;
    if (!doc) {
      this.print();
      return;
    }

    this.printCancelled = false;
    this.printDialogOpen.set(true);
    this.printProgress.set(0);

    const urls: string[] = [];
    // With annotations, comments or form data: print the saved file, so the
    // page shows them as the PDF will.
    let printed: PDFDocumentProxy = doc;
    try {
      await this.scripting.willPrint();
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
        this.scripting.didPrint();
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

  print(): void {
    const source = this.src();
    if (!source) return;

    const printWindow = window.open(source);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
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

  // Signature methods
  openSignatureDialog(): void {
    this.signatureDialogOpen.set(true);
  }

  closeSignatureDialog(): void {
    this.signatureDialogOpen.set(false);
    if (this.editorMode() === 'signature') this.editorMode.set('none');
  }

  /** Opens the alt-text dialog for an image annotation. */
  openAltText(annotationId: string): void {
    this.altTextAnnotationId.set(annotationId);
    this.altTextDialogOpen.set(true);
  }

  closeAltText(): void {
    this.altTextDialogOpen.set(false);
    this.altTextAnnotationId.set(null);
  }

  /** Shows or hides a layer (optional content group); the pages redraw. */
  setLayerVisible(id: string, visible: boolean): void {
    const config = this.optionalContent();
    if (!config) return;
    config.setVisibility(id, visible);
    this.layers.update((layers) =>
      layers.map((layer) => (layer.id === id ? { ...layer, visible } : layer)),
    );
  }

  /** Applies a link's SetOCGState action (layers shown, hidden or toggled). */
  applyLayerState(action: unknown): void {
    const config = this.optionalContent();
    if (!config) return;
    config.setOCGState(action as Parameters<typeof config.setOCGState>[0]);
    this.layers.update((layers) =>
      layers.map((layer) => {
        const visible = config.getGroup(layer.id)?.visible ?? layer.visible;
        return visible === layer.visible ? layer : { ...layer, visible };
      }),
    );
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

  /** The document's layers, with their default visibility. */
  private async loadLayers(doc: PDFDocumentProxy): Promise<void> {
    const config = await doc.getOptionalContentConfig().catch(() => null);
    if (doc !== this.pdfDocument()) return;
    this.optionalContent.set(config);
    const layers: ScPdfLayer[] = [];
    for (const [id, group] of config ?? []) {
      layers.push({ id, name: group.name ?? id, visible: group.visible });
    }
    this.layers.set(layers);
  }

  addSavedSignature(sig: Omit<ScPdfSignatureData, 'id'>): void {
    const id = `sig-${Date.now()}-${++this.signatureIdCounter}`;
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

  /** Places a signature image on the current page. */
  placeSignature(dataUrl: string, description = ''): void {
    this.addEditorAnnotation({
      type: 'signature',
      pageNumber: this.currentPage(),
      x: 0.3,
      y: 0.8,
      imageDataUrl: dataUrl,
      width: 0.25,
      height: 0.1,
      description,
    });
    this.editorMode.set('none');
  }

  // Comment methods
  addComment(comment: Omit<ScPdfComment, 'id'>): string {
    const id = `comment-${++this.commentIdCounter}`;
    this.comments.update((list) => [...list, { ...comment, id }]);
    return id;
  }

  removeComment(id: string): void {
    this.comments.update((list) => list.filter((c) => c.id !== id));
    if (this.activeCommentId() === id) this.activeCommentId.set(null);
  }

  /** Starts a comment at a point of a page (positions are 0–1 of the page). */
  startComment(pageNumber: number, x: number, y: number): void {
    this.pendingComment.set({ pageNumber, x, y });
    this.editorMode.set('none');
  }

  cancelComment(): void {
    this.pendingComment.set(null);
  }

  /** Posts the pending comment (or one on the current page) and selects it. */
  postComment(text: string, author = 'User'): void {
    const place = this.pendingComment() ?? {
      pageNumber: this.currentPage(),
      x: 0.5,
      y: 0.1,
    };
    const id = this.addComment({
      ...place,
      text,
      author,
      date: new Date().toLocaleString(),
      color: '#FFFF00',
    });
    this.pendingComment.set(null);
    this.activeCommentId.set(id);
  }

  /** Selects a comment and shows its page. */
  showComment(id: string): void {
    const comment = this.comments().find((c) => c.id === id);
    if (!comment) return;
    this.activeCommentId.set(id);
    if (comment.pageNumber !== this.currentPage()) {
      this.goToPage(comment.pageNumber);
    }
  }

  updateComment(id: string, text: string): void {
    this.comments.update((list) =>
      list.map((c) => (c.id === id ? { ...c, text } : c)),
    );
  }

  // Find methods
  /**
   * pdf.js's keyboard shortcuts. Only while focus is in the viewer, and not
   * while typing in a field (apart from Escape and Ctrl/⌘ shortcuts).
   */
  protected onKeydown(event: KeyboardEvent): void {
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

  async find(query: string): Promise<void> {
    this.findQuery.set(query);
    if (!query) {
      this.clearFind();
      return;
    }

    const doc = this.pdfDocument();
    if (!doc) return;

    const token = ++this.findToken;
    this.findState.set('pending');
    const pageTexts = await this.documentTexts(doc);
    // A newer search started, or the document changed, meanwhile.
    if (token !== this.findToken || doc !== this.pdfDocument()) return;

    const options = {
      matchCase: this.findMatchCase(),
      entireWord: this.findEntireWord(),
      matchDiacritics: this.findMatchDiacritics(),
    };
    // Normalised as the pages' text is (a line break is a space…).
    const normalizedQuery = normalizeText(query).text;
    const allMatches: ScPdfPageMatchInfo[] = [];
    let total = 0;

    for (const pageText of pageTexts) {
      // Offsets in the page's text (items, "\n" after each line), which
      // the text layer highlights.
      const found = findInPage(normalizedQuery, pageText, options);
      total += found.length;
      allMatches.push({
        matches: found.map(([start]) => start),
        matchesLength: found.map(([, length]) => length),
      });
    }

    this.pageMatches.set(allMatches);
    this.findTotalMatches.set(total);

    if (total === 0) {
      this.findState.set('not-found');
      this.findCurrentMatchIndex.set(0);
    } else {
      // Find first match on or after current page
      const currentPageIdx = this.currentPage() - 1;
      let found = false;

      for (let i = 0; i < allMatches.length; i++) {
        const pageIdx = (currentPageIdx + i) % allMatches.length;
        if (allMatches[pageIdx].matches.length > 0) {
          this.goToPage(pageIdx + 1);
          found = true;
          break;
        }
      }

      // Compute correct global index
      if (found) {
        for (let p = 0; p < allMatches.length; p++) {
          const pageIdx = (currentPageIdx + p) % allMatches.length;
          if (allMatches[pageIdx].matches.length > 0) {
            let gi = 0;
            for (let j = 0; j < pageIdx; j++) {
              gi += allMatches[j].matches.length;
            }
            this.findCurrentMatchIndex.set(gi);
            break;
          }
        }
      }

      this.findState.set('found');
    }

    this.findTrigger.update((v) => v + 1);
  }

  findNext(): void {
    const total = this.findTotalMatches();
    if (total === 0) return;

    const next = (this.findCurrentMatchIndex() + 1) % total;
    this.findCurrentMatchIndex.set(next);
    this.scrollToMatch(next);
    this.findState.set(next === 0 ? 'wrapped' : 'found');
    this.findTrigger.update((v) => v + 1);
  }

  findPrevious(): void {
    const total = this.findTotalMatches();
    if (total === 0) return;

    const prev = (this.findCurrentMatchIndex() - 1 + total) % total;
    this.findCurrentMatchIndex.set(prev);
    this.scrollToMatch(prev);
    this.findState.set(prev === total - 1 ? 'wrapped' : 'found');
    this.findTrigger.update((v) => v + 1);
  }

  clearFind(): void {
    this.findToken++;
    this.findQuery.set('');
    this.findState.set('idle');
    this.findCurrentMatchIndex.set(0);
    this.findTotalMatches.set(0);
    this.pageMatches.set([]);
    this.findTrigger.update((v) => v + 1);
  }

  /**
   * The text of every page, normalised for searching (see `normalizeText`),
   * extracted once per document — a few pages at a time in parallel — and
   * shared by the searches.
   */
  private documentTexts(doc: PDFDocumentProxy): Promise<ScPdfNormalizedText[]> {
    if (this.pageTexts && this.pageTextsDocument === doc) {
      return this.pageTexts;
    }
    this.pageTextsDocument = doc;
    this.pageTexts = (async () => {
      const texts: ScPdfNormalizedText[] = Array.from(
        { length: doc.numPages },
        () => ({ text: '', diffs: null, hasDiacritics: false }),
      );
      const batch = 8;
      for (let start = 1; start <= doc.numPages; start += batch) {
        const pages = Array.from(
          { length: Math.min(batch, doc.numPages - start + 1) },
          (_, i) => start + i,
        );
        await Promise.all(
          pages.map(async (pageNumber) => {
            try {
              const page = await doc.getPage(pageNumber);
              const content = await page.getTextContent();
              let text = '';
              for (const item of content.items) {
                if ('str' in item) {
                  text += item.str;
                  if (item.hasEOL) text += '\n';
                }
              }
              texts[pageNumber - 1] = normalizeText(text);
            } catch {
              // A page whose text can't be read just has no matches.
            }
          }),
        );
      }
      return texts;
    })();
    return this.pageTexts;
  }

  private scrollToMatch(globalIndex: number): void {
    const allMatches = this.pageMatches();
    let count = 0;
    for (let p = 0; p < allMatches.length; p++) {
      if (count + allMatches[p].matches.length > globalIndex) {
        this.goToPage(p + 1);
        return;
      }
      count += allMatches[p].matches.length;
    }
  }

  // Editor methods
  setEditorMode(mode: ScPdfEditorMode): void {
    // The document forbids adding annotations (see `enablePermissions`).
    if (mode !== 'none' && !this.canEdit()) return;
    if (mode === 'signature') {
      // Signature mode opens a dialog instead of toggling
      if (this.editorMode() === 'signature') {
        this.editorMode.set('none');
      } else {
        this.editorMode.set('signature');
        this.signatureDialogOpen.set(true);
      }
      return;
    }
    this.editorMode.set(this.editorMode() === mode ? 'none' : mode);
  }

  addEditorAnnotation(annotation: Omit<ScPdfEditorAnnotation, 'id'>): void {
    const id = `editor-${++this.editorIdCounter}`;
    this.editorAnnotations.update((list) => [...list, { ...annotation, id }]);
    this.editorTrigger.update((v) => v + 1);
  }

  updateEditorAnnotation(
    id: string,
    changes: Partial<Omit<ScPdfEditorAnnotation, 'id'>>,
  ): void {
    this.editorAnnotations.update((list) =>
      list.map((a) => (a.id === id ? { ...a, ...changes } : a)),
    );
    this.editorTrigger.update((v) => v + 1);
  }

  removeEditorAnnotation(id: string): void {
    const removed = this.editorAnnotations().find((a) => a.id === id);
    if (this.selectedAnnotationId() === id) this.selectedAnnotationId.set(null);
    this.editorAnnotations.update((list) => list.filter((a) => a.id !== id));
    this.editorTrigger.update((v) => v + 1);

    // Show undo bar
    if (removed) {
      this.showUndoBar({ kind: 'annotation-deleted', count: 1 }, () => {
        this.editorAnnotations.update((list) => [...list, removed]);
        this.editorTrigger.update((v) => v + 1);
      });
    }
  }

  clearEditorAnnotations(): void {
    const prev = this.editorAnnotations();
    this.editorAnnotations.set([]);
    this.editorTrigger.update((v) => v + 1);

    if (prev.length > 0) {
      this.showUndoBar(
        { kind: 'annotations-cleared', count: prev.length },
        () => {
          this.editorAnnotations.set(prev);
          this.editorTrigger.update((v) => v + 1);
        },
      );
    }
  }

  // Undo bar
  private showUndoBar(undo: ScPdfUndoable, action: () => void): void {
    if (this.undoTimeout) {
      clearTimeout(this.undoTimeout);
    }
    this.undoAction = action;
    this.undoable.set(undo);

    this.undoTimeout = setTimeout(() => {
      this.closeUndoBar();
    }, 5000);
  }

  undoLastAction(): void {
    if (this.undoAction) {
      this.undoAction();
      this.undoAction = null;
    }
    this.closeUndoBar();
  }

  closeUndoBar(): void {
    this.undoable.set(null);
    this.undoAction = null;
    if (this.undoTimeout) {
      clearTimeout(this.undoTimeout);
      this.undoTimeout = null;
    }
  }
}
