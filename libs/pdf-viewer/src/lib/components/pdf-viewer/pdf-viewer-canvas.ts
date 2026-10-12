import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import type {
  PDFDocumentProxy,
  PDFPageProxy,
  PageViewport,
  RenderTask,
} from 'pdfjs-dist';
import {
  AnnotationLayer,
  AnnotationMode,
  TextLayer,
  XfaLayer,
  setLayerDimensions,
} from 'pdfjs-dist';
import type { ScPdfViewerRoot } from './pdf-viewer-root';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

const DEFAULT_LINK_REL = 'noopener noreferrer nofollow';

/**
 * Canvases bigger than this are drawn at a lower resolution: browsers refuse
 * (blank page) or run out of memory beyond it (pdf.js uses the same limit).
 */
const MAX_CANVAS_PIXELS = 16_777_216;

/** Pages within one viewport height above or below are kept rendered. */
const RENDER_MARGIN = '100% 0px';

const VISIBILITY_THRESHOLDS = Array.from({ length: 11 }, (_, i) => i / 10);

const enum LinkTarget {
  NONE = 0,
  SELF = 1,
  BLANK = 2,
  PARENT = 3,
  TOP = 4,
}

class PdfLinkService {
  externalLinkEnabled = true;

  private externalLinkTarget: LinkTarget = LinkTarget.BLANK;
  private externalLinkRel: string = DEFAULT_LINK_REL;
  private baseUrl: string | null = null;

  constructor(private viewer: ScPdfViewerRoot) {}

  get pagesCount(): number {
    return this.viewer.totalPages();
  }

  get page(): number {
    return this.viewer.currentPage();
  }

  set page(value: number) {
    this.viewer.goToPage(value);
  }

  get rotation(): number {
    return this.viewer.rotation();
  }

  set rotation(value: number) {
    // Rotation is managed by the viewer root
  }

  get isInPresentationMode(): boolean {
    return this.viewer.presenting();
  }

  /** Form fields send their script events through it. */
  get eventBus(): ScPdfViewerRoot['scripting']['eventBus'] {
    return this.viewer.scripting.eventBus;
  }

  setDocument(baseUrl: string | null = null): void {
    this.baseUrl = baseUrl;
  }

  addLinkAttributes(
    link: HTMLAnchorElement,
    url: string,
    newWindow = false,
  ): void {
    if (!url || typeof url !== 'string') return;

    if (this.externalLinkEnabled) {
      link.href = link.title = url;
    } else {
      link.href = '';
      link.title = `Disabled: ${url}`;
      link.onclick = () => false;
    }

    const target = newWindow ? LinkTarget.BLANK : this.externalLinkTarget;
    switch (target) {
      case LinkTarget.SELF:
        link.target = '_self';
        break;
      case LinkTarget.BLANK:
        link.target = '_blank';
        break;
      case LinkTarget.PARENT:
        link.target = '_parent';
        break;
      case LinkTarget.TOP:
        link.target = '_top';
        break;
      default:
        break;
    }

    link.rel = this.externalLinkRel;
  }

  getDestinationHash(dest: unknown): string {
    if (typeof dest === 'string' && dest.length > 0) {
      return this.getAnchorUrl('#' + escape(dest));
    }
    if (Array.isArray(dest)) {
      const str = JSON.stringify(dest);
      if (str.length > 0) {
        return this.getAnchorUrl('#' + escape(str));
      }
    }
    return this.getAnchorUrl('');
  }

  getAnchorUrl(anchor: string): string {
    return this.baseUrl ? this.baseUrl + anchor : anchor;
  }

  goToDestination(dest: unknown): Promise<void> {
    return this.viewer.goToDestination(dest);
  }

  goToPage(val: number | string): void {
    const doc = this.viewer.pdfDocument();
    if (!doc) return;

    const pageNumber = typeof val === 'string' ? parseInt(val, 10) : val | 0;
    if (
      Number.isInteger(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= this.pagesCount
    ) {
      this.viewer.goToPage(pageNumber);
    }
  }

  setHash(hash: string): void {
    this.viewer.applyHash(hash);
  }

  executeNamedAction(action: string): void {
    switch (action) {
      case 'NextPage':
        this.viewer.goToNextPage();
        break;
      case 'PrevPage':
        this.viewer.goToPrevPage();
        break;
      case 'FirstPage':
        this.viewer.goToPage(1);
        break;
      case 'LastPage':
        this.viewer.goToPage(this.viewer.totalPages());
        break;
      // GoBack / GoForward would navigate the host page's history (away
      // from the app), so they're ignored.
    }
  }

  async executeSetOCGState(action: unknown): Promise<void> {
    // OCG state changes are handled by the layers view component
  }
}

interface PageLayout {
  pageNumber: number;
  width: number;
  height: number;
}

@Component({
  selector: 'sc-pdf-viewer-canvas',
  template: `
    <div
      #scrollContainer
      class="h-full w-full touch-pan-x touch-pan-y overflow-auto outline-none data-hand:cursor-grab data-idle:cursor-none data-panning:cursor-grabbing data-idle:[&_*]:cursor-none data-hand:[&_.textLayer]:pointer-events-none"
      role="document"
      tabindex="0"
      [attr.data-hand]="handTool() || null"
      [attr.data-panning]="panning() || null"
      [attr.data-idle]="cursorIdle() || null"
      (pointerdown)="onPanStart($event)"
      (pointermove)="onPanMove($event)"
      (pointerup)="onPanEnd($event)"
      (pointercancel)="onPanEnd($event)"
    >
      <div [class]="pagesClass()">
        @for (spread of spreads(); track spread[0].pageNumber) {
          <div
            class="flex items-center justify-center gap-2"
            [hidden]="!isSpreadShown(spread)"
          >
            @for (page of spread; track page.pageNumber) {
              <!-- pdf.js sizes its layers with round(…, var(--scale-round-*)),
                   which its own viewer defines on each page. -->
              <div
                class="bg-background relative shrink-0 shadow-sm [--scale-round-x:1px] [--scale-round-y:1px]"
                [attr.data-page]="page.pageNumber"
                [style.width.px]="displayWidth(page) * scaledValue()"
                [style.height.px]="displayHeight(page) * scaledValue()"
                [style.cursor]="pageCursor()"
              >
                <canvas
                  width="0"
                  height="0"
                  [attr.data-page]="page.pageNumber"
                  [style.width.px]="displayWidth(page) * scaledValue()"
                  [style.height.px]="displayHeight(page) * scaledValue()"
                ></canvas>
                <div
                  class="textLayer"
                  [attr.data-textlayer-page]="page.pageNumber"
                ></div>
                <div
                  class="annotationLayer"
                  [attr.data-annotationlayer-page]="page.pageNumber"
                ></div>
                <div
                  class="xfaLayer"
                  [attr.data-xfalayer-page]="page.pageNumber"
                ></div>
                <!-- Annotations live in the unrotated page's coordinates,
                     turned with the page. -->
                <div
                  class="editorLayer absolute top-1/2 left-1/2 z-[5]"
                  [style.width.px]="page.width * scaledValue()"
                  [style.height.px]="page.height * scaledValue()"
                  [style.transform]="
                    'translate(-50%, -50%) rotate(' + rotation() + 'deg)'
                  "
                  [style.pointer-events]="editorPointerEvents()"
                  [style.cursor]="editorCursor()"
                  [attr.data-editorlayer-page]="page.pageNumber"
                  (pointerdown)="onEditorPointerDown($event, page.pageNumber)"
                  (pointermove)="onEditorPointerMove($event, page.pageNumber)"
                  (pointerup)="onEditorPointerUp($event, page.pageNumber)"
                ></div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-canvas',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerCanvas {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block h-full w-full', this.classInput()),
  );

  private readonly scrollContainer =
    viewChild<ElementRef<HTMLElement>>('scrollContainer');

  /** The screen's pixel density; updated when the window moves to another screen. */
  private readonly dpr = signal(
    typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
  );
  private dprQuery: MediaQueryList | null = null;
  private readonly onDprChange = (): void => {
    this.dpr.set(window.devicePixelRatio || 1);
    this.watchDevicePixelRatio();
  };

  readonly pageLayouts = signal<PageLayout[]>([]);

  private readonly pdfDocument = this.pdfViewer.pdfDocument;
  readonly rotation = this.pdfViewer.rotation;
  private readonly zoom = this.pdfViewer.zoom;
  private readonly navigateTrigger = this.pdfViewer.navigateTrigger;
  private readonly findTrigger = this.pdfViewer.findTrigger;

  private readonly linkService = new PdfLinkService(this.pdfViewer);

  private activeRenderTasks = new Map<number, RenderTask>();
  private activeTextLayers = new Map<number, TextLayer>();
  private renderedPages = new Set<number>();
  private textLayerData = new Map<
    number,
    { divs: HTMLElement[]; texts: string[] }
  >();
  private resizeObserver: ResizeObserver | null = null;
  private renderTimeout: ReturnType<typeof setTimeout> | null = null;
  /** Renders pages near the viewport and releases the others. */
  private renderObserver: IntersectionObserver | null = null;
  /** Tracks how much of each page is visible, for the current page. */
  private visibilityObserver: IntersectionObserver | null = null;
  /** Pages within the render margin of the viewport. */
  private readonly nearPages = new Set<number>();
  /** Visible area (px²) of each page in the viewport. */
  private readonly visibleAreas = new Map<number, number>();
  private readonly pageCount = computed(() => this.pageLayouts().length);
  /** A navigation waiting for the pages to be laid out. */
  private pendingNavigation: { page: number; top: number } | null = null;

  /** Rotated a quarter turn: the page's width and height swap on screen. */
  private readonly sideways = computed(() => this.rotation() % 180 !== 0);

  protected displayWidth(page: PageLayout): number {
    return this.sideways() ? page.height : page.width;
  }

  protected displayHeight(page: PageLayout): number {
    return this.sideways() ? page.width : page.height;
  }

  /** The pages grouped into spreads (one or two side by side). */
  protected readonly spreads = computed((): PageLayout[][] => {
    const layouts = this.pageLayouts();
    if (this.pdfViewer.spreadMode() === 'none') return layouts.map((l) => [l]);
    const spreads: PageLayout[][] = [];
    for (let page = 1; page <= layouts.length;) {
      const [first, last] = this.pdfViewer.spreadOf(page);
      spreads.push(layouts.slice(first - 1, last));
      page = last + 1;
    }
    return spreads;
  });

  protected readonly pagesClass = computed(() => {
    switch (this.pdfViewer.scrollMode()) {
      case 'horizontal':
        return 'flex min-h-full w-max flex-row items-center gap-2 p-2';
      case 'wrapped':
        return 'flex flex-wrap items-start justify-center gap-2 p-2';
      default:
        return 'flex min-w-fit flex-col items-center gap-2 p-2';
    }
  });

  /** In page scroll mode, only the current spread shows. */
  protected isSpreadShown(spread: PageLayout[]): boolean {
    if (this.pdfViewer.scrollMode() !== 'page') return true;
    const current = this.pdfViewer.currentPage();
    return spread.some((page) => page.pageNumber === current);
  }

  /** The hand tool drags the pages (not while an annotation tool is on). */
  protected readonly handTool = computed(
    () =>
      this.pdfViewer.cursorTool() === 'hand' &&
      this.pdfViewer.editorMode() === 'none',
  );
  protected readonly panning = signal(false);
  private panStart: {
    x: number;
    y: number;
    left: number;
    top: number;
  } | null = null;
  private pinch: { distance: number } | null = null;

  // Editor state
  private readonly editorMode = this.pdfViewer.editorMode;
  private readonly editorTrigger = this.pdfViewer.editorTrigger;
  private inkCurrentStroke: { x: number; y: number }[] = [];
  private inkCurrentPage = 0;
  private inkDrawing = false;

  // Interactive annotation state
  private selectedAnnotationId: string | null = null;
  private dragState: {
    annotationId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    layerW: number;
    layerH: number;
  } | null = null;
  private resizeState: {
    annotationId: string;
    handle: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
    layerW: number;
    layerH: number;
  } | null = null;

  readonly editorPointerEvents = computed(() => {
    const mode = this.editorMode();
    // Highlight mode needs pointer-events:none so the text layer underneath
    // can handle text selection; onHighlightMouseUp captures via document listener.
    // Freetext and ink need auto for direct interaction on the editor layer.
    if (mode === 'freetext' || mode === 'ink' || mode === 'comment') {
      return 'auto';
    }
    // For 'none' and 'highlight', the layer passes through clicks,
    // but children (annotations) with pointer-events:auto stay clickable.
    return 'none';
  });

  readonly editorCursor = computed(() => {
    const mode = this.editorMode();
    if (mode === 'freetext') return 'text';
    if (mode === 'ink') return 'crosshair';
    if (mode === 'comment') return 'cell';
    return 'default';
  });

  readonly pageCursor = computed(() => {
    const mode = this.editorMode();
    if (mode === 'highlight') return 'text';
    return '';
  });

  // Reactive container dimensions — updated by ResizeObserver so that
  // scaledValue re-evaluates when the container is laid out.
  private readonly containerSize = signal({ width: 0, height: 0 });

  readonly scaledValue = computed(() => {
    const z = this.zoom();
    if (typeof z === 'number') {
      return z;
    }
    const size = this.containerSize();
    const layouts = this.pageLayouts();
    if (size.width === 0 || layouts.length === 0) {
      return 1;
    }
    if (z === 'page-actual') {
      return 1;
    }
    // Fit the first page (or spread) as it shows: rotated, side by side.
    const pagesPerSpread = this.pdfViewer.spreadMode() === 'none' ? 1 : 2;
    const pageWidth = this.displayWidth(layouts[0]) * pagesPerSpread;
    const pageHeight = this.displayHeight(layouts[0]);
    const gaps = 16 + 8 * (pagesPerSpread - 1);
    const fitWidth = (size.width - 16 - gaps) / pageWidth;
    const fitHeight = (size.height - 16) / pageHeight;
    if (z === 'page-width') {
      return fitWidth;
    }
    if (z === 'page-fit' || this.pdfViewer.scrollMode() === 'horizontal') {
      return Math.min(fitWidth, fitHeight);
    }
    // 'auto'
    return Math.min(fitWidth, 1.5);
  });

  constructor() {
    afterNextRender(() => {
      this.setupResizeObserver();
      this.setupObservers();
      this.setupGestures();
      this.watchDevicePixelRatio();
    });

    // Presentation mode: start the idle-cursor timer; show the cursor after.
    effect(() => {
      const presenting = this.pdfViewer.presenting();
      untracked(() => {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.idleTimer = null;
        this.cursorIdle.set(false);
        if (presenting) this.onPresentationPointerMove();
      });
    });
    this.destroyRef.onDestroy(() => {
      if (this.idleTimer) clearTimeout(this.idleTimer);
    });

    // The root's zoom steps start from the scale the pages are drawn at.
    effect(() => this.pdfViewer.currentScale.set(this.scaledValue()));

    // A new document: forget the previous one's pages, then lay them out.
    effect(() => {
      const doc = this.pdfDocument();
      untracked(() => {
        this.cancelAllRenderTasks();
        this.renderedPages.clear();
        this.nearPages.clear();
        this.visibleAreas.clear();
        this.textLayerData.clear();
        this.pageLayouts.set([]);
        // Start at the top, not where the previous document was scrolled.
        this.scrollContainer()?.nativeElement.scrollTo({ top: 0, left: 0 });
        if (doc) this.computePageLayouts(doc);
      });
    });

    // Redraw at the new scale, rotation or pixel density, and when the pages
    // change — not when one page's size is corrected (see renderPage).
    effect(() => {
      this.scaledValue();
      this.rotation();
      this.dpr();
      // New spreads or layout recreate the page elements.
      this.spreads();
      this.pdfViewer.scrollMode();
      if (this.pageCount() === 0) return;

      untracked(() => {
        this.renderedPages.clear();
        this.cancelAllRenderTasks();
        this.scheduleRender();
      });
    });

    // Navigate to page when navigateTrigger changes
    effect(() => {
      this.navigateTrigger();
      const page = untracked(() => this.pdfViewer.currentPage());
      const top = untracked(() => this.pdfViewer.navigateTop());

      setTimeout(() => this.scrollToPage(page, top, 'smooth'));
    });

    // Apply find highlights when find state changes
    effect(() => {
      this.findTrigger();
      const allMatches = this.pdfViewer.pageMatches();
      const highlightAll = this.pdfViewer.findHighlightAll();
      const currentMatchIndex = this.pdfViewer.findCurrentMatchIndex();

      setTimeout(() => {
        this.applyHighlights(allMatches, highlightAll, currentMatchIndex);
      });
    });

    // Render editor annotations when they change
    effect(() => {
      this.editorTrigger();
      this.pdfViewer.highlightShowAll();
      this.pdfViewer.comments();
      this.pdfViewer.pendingComment();
      this.pdfViewer.activeCommentId();
      const annotations = this.pdfViewer.editorAnnotations();
      const scale = this.scaledValue();

      setTimeout(() => {
        this.renderEditorAnnotations(annotations, scale);
      });
    });

    // Listen for text selection in highlight mode
    afterNextRender(() => {
      document.addEventListener('mouseup', this.onHighlightMouseUp);
      document.addEventListener('pointermove', this.onGlobalPointerMove);
      document.addEventListener('pointerup', this.onGlobalPointerUp);
      document.addEventListener('pointerdown', this.onGlobalPointerDown);
      document.addEventListener('keydown', this.onAnnotationKeyDown);
    });

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('mouseup', this.onHighlightMouseUp);
      document.removeEventListener('pointermove', this.onGlobalPointerMove);
      document.removeEventListener('pointerup', this.onGlobalPointerUp);
      document.removeEventListener('pointerdown', this.onGlobalPointerDown);
      document.removeEventListener('keydown', this.onAnnotationKeyDown);
      this.renderObserver?.disconnect();
      this.visibilityObserver?.disconnect();
      this.resizeObserver?.disconnect();
      this.dprQuery?.removeEventListener('change', this.onDprChange);
      this.cancelAllRenderTasks();
      if (this.renderTimeout) {
        clearTimeout(this.renderTimeout);
      }
    });
  }

  private scheduleRender(): void {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }
    // After Angular has rendered the pages: (re)observe them. The observers
    // then report every page, which renders the ones near the viewport.
    this.renderTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        // A navigation that came before the pages existed (open parameters,
        // the initial page): go there first, so the observers report it.
        const pending = this.pendingNavigation;
        if (pending) this.scrollToPage(pending.page, pending.top, 'auto');
        this.observePages();
      });
    }, 0);
  }

  /**
   * Lays out every page at the first page's size, so the document shows at
   * once instead of after fetching every page. A page whose size differs is
   * corrected when it's rendered (as pdf.js's own viewer does).
   */
  private async computePageLayouts(doc: PDFDocumentProxy): Promise<void> {
    const first = await doc.getPage(1);
    if (doc !== this.pdfDocument()) return;
    const { width, height } = first.getViewport({ scale: 1 });
    this.pageLayouts.set(
      Array.from({ length: doc.numPages }, (_, i) => ({
        pageNumber: i + 1,
        width,
        height,
      })),
    );
  }

  private correctPageLayout(
    pageNumber: number,
    width: number,
    height: number,
  ): void {
    const layout = this.pageLayouts()[pageNumber - 1];
    if (!layout || (layout.width === width && layout.height === height)) {
      return;
    }
    this.pageLayouts.update((layouts) =>
      layouts.map((l) =>
        l.pageNumber === pageNumber ? { ...l, width, height } : l,
      ),
    );
  }

  private setupResizeObserver(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    this.containerSize.set({
      width: container.clientWidth,
      height: container.clientHeight,
    });

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.containerSize.set({ width, height });
      }
    });

    this.resizeObserver.observe(container);
  }

  /**
   * Two observers instead of measuring every page on scroll: one renders the
   * pages near the viewport and releases the others, one tracks how much of
   * each page is visible to know the current page.
   */
  private setupObservers(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    this.renderObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const page = this.pageNumberOf(entry.target);
          if (!page) continue;
          if (entry.isIntersecting) {
            this.nearPages.add(page);
            this.renderPage(page);
          } else if (this.nearPages.delete(page)) {
            this.releasePage(page);
          }
        }
      },
      { root: container, rootMargin: RENDER_MARGIN },
    );

    this.visibilityObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const page = this.pageNumberOf(entry.target);
          if (!page) continue;
          if (entry.isIntersecting) {
            // Area, so it works for rows (horizontal) as well as columns.
            this.visibleAreas.set(
              page,
              entry.intersectionRect.width * entry.intersectionRect.height,
            );
          } else {
            this.visibleAreas.delete(page);
          }
        }
        this.updateCurrentPage();
      },
      { root: container, threshold: VISIBILITY_THRESHOLDS },
    );
  }

  /**
   * Scrolls a page into view, `top` (0–1) down it. Before the pages are laid
   * out (a new document) it's kept and done once they are.
   */
  private scrollToPage(
    page: number,
    top: number,
    behavior: ScrollBehavior,
  ): void {
    const container = this.scrollContainer()?.nativeElement;
    const pageEl = container?.querySelector<HTMLElement>(
      `div[data-page="${page}"]`,
    );
    if (!container) return;
    if (!pageEl) {
      this.pendingNavigation = { page, top };
      return;
    }
    this.pendingNavigation = null;
    const mode = this.pdfViewer.scrollMode();

    // A position on the page (a destination's top) — in page units, so only
    // meaningful upright or upside down.
    const rotation = this.rotation();
    const offset =
      rotation === 0 ? top : rotation === 180 && top > 0 ? 1 - top : 0;

    if (mode === 'page' || mode === 'horizontal') {
      // Only this page's spread shows / pages sit in a row: bring the page
      // into view horizontally, then scroll down to the position.
      if (mode === 'page') container.scrollTo({ left: 0 });
      else pageEl.scrollIntoView({ block: 'nearest', inline: 'start' });
      container.scrollTo({
        top: offset * pageEl.offsetHeight,
        behavior: mode === 'page' ? 'auto' : behavior,
      });
      return;
    }
    const containerTop = container.getBoundingClientRect().top;
    const pageTop = pageEl.getBoundingClientRect().top;
    // To a page's top: keep the gap above it (p-2 / gap-2), as the first
    // page has at rest.
    const gap = offset ? 0 : 8;
    container.scrollTo({
      top:
        container.scrollTop +
        pageTop -
        containerTop +
        offset * pageEl.offsetHeight -
        gap,
      behavior,
    });
  }

  private observePages(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container || !this.renderObserver || !this.visibilityObserver) return;

    this.renderObserver.disconnect();
    this.visibilityObserver.disconnect();
    this.nearPages.clear();
    this.visibleAreas.clear();
    for (const el of container.querySelectorAll('div[data-page]')) {
      this.renderObserver.observe(el);
      this.visibilityObserver.observe(el);
    }
  }

  private pageNumberOf(el: Element): number {
    return parseInt(el.getAttribute('data-page') ?? '', 10) || 0;
  }

  /** The current page is the most visible one (the first, on a tie). */
  private updateCurrentPage(): void {
    let current = 0;
    let best = 0;
    for (const [page, height] of this.visibleAreas) {
      if (height > best || (height === best && page < current)) {
        best = height;
        current = page;
      }
    }
    if (current && current !== this.pdfViewer.currentPage()) {
      this.pdfViewer.currentPage.set(current);
    }
  }

  /** Frees a page that's far from the viewport; it's redrawn on return. */
  private releasePage(pageNumber: number): void {
    this.activeRenderTasks.get(pageNumber)?.cancel();
    this.activeRenderTasks.delete(pageNumber);
    this.activeTextLayers.get(pageNumber)?.cancel();
    this.activeTextLayers.delete(pageNumber);
    this.renderedPages.delete(pageNumber);
    this.textLayerData.delete(pageNumber);

    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;
    const canvas = container.querySelector<HTMLCanvasElement>(
      `canvas[data-page="${pageNumber}"]`,
    );
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
    this.pdfViewer.pageReleased(pageNumber);
    for (const layer of [
      `[data-textlayer-page="${pageNumber}"]`,
      `[data-annotationlayer-page="${pageNumber}"]`,
      `[data-xfalayer-page="${pageNumber}"]`,
    ]) {
      const el = container.querySelector(layer);
      if (el) el.textContent = '';
    }
  }

  /**
   * Ctrl/⌘ + wheel (and trackpad pinch, which arrives as one) zooms around the
   * pointer, 10% per wheel notch as in pdf.js; two fingers pinch on touch.
   * In page scroll mode a plain wheel at the edge turns the page.
   */
  private setupGestures(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    // In page scroll mode, wheeling past the top / bottom edge turns the page.
    let lastTurn = 0;
    const turnPage = (event: WheelEvent): void => {
      if (this.pdfViewer.scrollMode() !== 'page' || !event.deltaY) return;
      const down = event.deltaY > 0;
      const atEdge = down
        ? container.scrollTop + container.clientHeight >=
          container.scrollHeight - 1
        : container.scrollTop <= 0;
      if (!atEdge) return;
      event.preventDefault();
      if (event.timeStamp - lastTurn < 400) return;
      lastTurn = event.timeStamp;
      if (down) this.pdfViewer.goToNextPage();
      else this.pdfViewer.goToPrevPage();
    };

    const onWheel = (event: WheelEvent): void => {
      if (!event.ctrlKey && !event.metaKey) {
        turnPage(event);
        return;
      }
      event.preventDefault();
      // The page stays fitted in presentation mode.
      if (this.pdfViewer.presenting()) return;
      const pixels =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * 33
          : event.deltaY;
      this.zoomAround(
        Math.pow(1.1, -pixels / 100),
        event.clientX,
        event.clientY,
      );
    };

    const distance = (touches: TouchList): number =>
      Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY,
      );
    const onTouchStart = (event: TouchEvent): void => {
      if (event.touches.length === 2) {
        this.pinch = { distance: distance(event.touches) };
      }
    };
    const onTouchMove = (event: TouchEvent): void => {
      if (!this.pinch || event.touches.length !== 2) return;
      event.preventDefault();
      const now = distance(event.touches);
      const midX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      const midY = (event.touches[0].clientY + event.touches[1].clientY) / 2;
      this.zoomAround(now / this.pinch.distance, midX, midY);
      this.pinch.distance = now;
    };
    const onTouchEnd = (event: TouchEvent): void => {
      if (event.touches.length < 2) this.pinch = null;
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);
    this.destroyRef.onDestroy(() => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    });
  }

  /** Zooms by `factor`, keeping the point under (clientX, clientY) in place. */
  private zoomAround(factor: number, clientX: number, clientY: number): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container || factor === 1) return;
    const before = this.scaledValue();
    this.pdfViewer.zoomBy(factor);

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const contentX = container.scrollLeft + x;
    const contentY = container.scrollTop + y;
    requestAnimationFrame(() => {
      const ratio = this.scaledValue() / before;
      container.scrollLeft = contentX * ratio - x;
      container.scrollTop = contentY * ratio - y;
    });
  }

  /** Presentation mode: the cursor hides after a few seconds still. */
  protected readonly cursorIdle = signal(false);
  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  /** Presentation mode: where a click / swipe started. */
  private presentationPointer: { x: number; y: number } | null = null;

  private onPresentationPointerMove(): void {
    this.cursorIdle.set(false);
    if (this.idleTimer) clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => this.cursorIdle.set(true), 3000);
  }

  /**
   * Presentation mode: a click turns to the next page (Shift+click the
   * previous), a horizontal swipe either way — not on links or form fields.
   */
  private onPresentationPointerUp(event: PointerEvent): void {
    const start = this.presentationPointer;
    this.presentationPointer = null;
    if (!start || event.type === 'pointercancel') return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (event.pointerType === 'touch') {
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) this.pdfViewer.goToNextPage();
        else this.pdfViewer.goToPrevPage();
      }
      return;
    }
    if (Math.hypot(dx, dy) > 5) return;
    if (event.shiftKey) this.pdfViewer.goToPrevPage();
    else this.pdfViewer.goToNextPage();
  }

  protected onPanStart(event: PointerEvent): void {
    if (this.pdfViewer.presenting()) {
      const target = event.target as HTMLElement;
      const interactive = target.closest(
        'a, button, input, select, textarea, [contenteditable]',
      );
      this.presentationPointer =
        event.button === 0 && !interactive
          ? { x: event.clientX, y: event.clientY }
          : null;
      return;
    }
    if (!this.handTool() || event.button !== 0) return;
    const container = event.currentTarget as HTMLElement;
    this.panStart = {
      x: event.clientX,
      y: event.clientY,
      left: container.scrollLeft,
      top: container.scrollTop,
    };
    this.panning.set(true);
    container.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  protected onPanMove(event: PointerEvent): void {
    if (this.pdfViewer.presenting()) {
      this.onPresentationPointerMove();
      return;
    }
    if (!this.panStart) return;
    const container = event.currentTarget as HTMLElement;
    container.scrollLeft =
      this.panStart.left - (event.clientX - this.panStart.x);
    container.scrollTop = this.panStart.top - (event.clientY - this.panStart.y);
  }

  protected onPanEnd(event: PointerEvent): void {
    if (this.pdfViewer.presenting()) {
      this.onPresentationPointerUp(event);
      return;
    }
    if (!this.panStart) return;
    this.panStart = null;
    this.panning.set(false);
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
  }

  /** Redraws when the window moves to a screen with another pixel density. */
  private watchDevicePixelRatio(): void {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    this.dprQuery?.removeEventListener('change', this.onDprChange);
    this.dprQuery = window.matchMedia(
      `(resolution: ${window.devicePixelRatio}dppx)`,
    );
    this.dprQuery.addEventListener('change', this.onDprChange);
  }

  private async renderPage(pageNumber: number): Promise<void> {
    if (this.renderedPages.has(pageNumber)) return;

    const doc = this.pdfDocument();
    if (!doc) return;

    this.activeRenderTasks.get(pageNumber)?.cancel();
    this.activeTextLayers.get(pageNumber)?.cancel();
    this.renderedPages.add(pageNumber);

    try {
      const page: PDFPageProxy = await doc.getPage(pageNumber);
      // Scrolled away (or another document) while the page was fetched.
      if (doc !== this.pdfDocument() || !this.nearPages.has(pageNumber)) {
        this.renderedPages.delete(pageNumber);
        return;
      }
      const natural = page.getViewport({ scale: 1 });
      this.correctPageLayout(pageNumber, natural.width, natural.height);
      const viewport = this.pageViewport(
        page,
        this.scaledValue() * this.outputScale(natural),
      );

      const container = this.scrollContainer()?.nativeElement;
      if (!container) return;

      const canvas = container.querySelector(
        `canvas[data-page="${pageNumber}"]`,
      ) as HTMLCanvasElement;
      if (!canvas) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Form fields are drawn by the annotation layer (as HTML), not here.
      const renderTask = page.render({
        canvas,
        viewport,
        annotationMode: AnnotationMode.ENABLE_FORMS,
      });

      this.activeRenderTasks.set(pageNumber, renderTask);

      await renderTask.promise;
      this.activeRenderTasks.delete(pageNumber);

      // XFA forms are HTML, with their own text: no text or annotation layer.
      if (doc.isPureXfa) {
        await this.renderXfaLayer(page, pageNumber, container);
        this.pdfViewer.pageRendered(pageNumber);
        return;
      }

      // Render text layer for text selection
      const textLayerDiv = container.querySelector(
        `[data-textlayer-page="${pageNumber}"]`,
      ) as HTMLDivElement;
      if (textLayerDiv) {
        textLayerDiv.innerHTML = '';
        const scale = this.scaledValue();
        const displayViewport = this.pageViewport(page, scale);
        textLayerDiv.style.setProperty('--total-scale-factor', String(scale));
        setLayerDimensions(textLayerDiv, displayViewport);
        const textContent = await page.getTextContent();
        const textLayer = new TextLayer({
          textContentSource: textContent,
          container: textLayerDiv,
          viewport: displayViewport,
        });
        this.activeTextLayers.set(pageNumber, textLayer);
        await textLayer.render();
        this.activeTextLayers.delete(pageNumber);

        // Store text layer data for find highlighting
        this.textLayerData.set(pageNumber, {
          divs: [...textLayer.textDivs],
          texts: [...textLayer.textContentItemsStr],
        });

        // Apply highlights if a find query is active
        const allMatches = this.pdfViewer.pageMatches();
        if (allMatches.length > 0) {
          this.applyHighlights(
            allMatches,
            this.pdfViewer.findHighlightAll(),
            this.pdfViewer.findCurrentMatchIndex(),
          );
        }
      }

      // Render annotation layer for clickable links
      try {
        await this.renderAnnotationLayer(page, pageNumber, container);
      } catch (annErr) {
        console.warn(`Annotation layer error on page ${pageNumber}:`, annErr);
      }
      this.pdfViewer.pageRendered(pageNumber);
    } catch (err) {
      if ((err as { name?: string })?.name !== 'RenderingCancelledException') {
        console.error(`Error rendering page ${pageNumber}:`, err);
      }
      this.activeRenderTasks.delete(pageNumber);
      this.activeTextLayers.delete(pageNumber);
      this.renderedPages.delete(pageNumber);
    }
  }

  /** The page at `scale`, turned by its own rotation plus the viewer's. */
  private pageViewport(page: PDFPageProxy, scale: number): PageViewport {
    return page.getViewport({
      scale,
      rotation: (page.rotate + this.rotation()) % 360,
    });
  }

  /**
   * Canvas pixels per CSS pixel: the screen's density, lowered when the
   * canvas would exceed MAX_CANVAS_PIXELS (high zoom on a dense screen).
   */
  private outputScale(natural: { width: number; height: number }): number {
    const scale = this.scaledValue();
    const cssPixels = natural.width * scale * (natural.height * scale);
    const dpr = this.dpr();
    return cssPixels * dpr * dpr > MAX_CANVAS_PIXELS
      ? Math.sqrt(MAX_CANVAS_PIXELS / cssPixels)
      : dpr;
  }

  private async renderAnnotationLayer(
    page: PDFPageProxy,
    pageNumber: number,
    container: HTMLElement,
  ): Promise<void> {
    const annotationLayerDiv = container.querySelector(
      `[data-annotationlayer-page="${pageNumber}"]`,
    ) as HTMLDivElement;
    if (!annotationLayerDiv) return;

    annotationLayerDiv.innerHTML = '';
    const scale = this.scaledValue();
    const displayViewport = this.pageViewport(page, scale);

    const annotations = await page.getAnnotations();
    if (annotations.length === 0) return;

    annotationLayerDiv.style.setProperty('--total-scale-factor', String(scale));
    setLayerDimensions(annotationLayerDiv, displayViewport);

    const doc = this.pdfDocument();
    const { fieldObjects, hasJSActions } = this.pdfViewer.formInfo();
    const annotationLayer = new AnnotationLayer({
      div: annotationLayerDiv,
      accessibilityManager: null,
      annotationCanvasMap: null,
      annotationEditorUIManager: null,
      structTreeLayer: null,
      commentManager: null,
      page,
      viewport: displayViewport,
      linkService: this.linkService as never,
      annotationStorage: doc?.annotationStorage ?? null,
    } as never);

    // Form fields as HTML inputs, their values kept in the document's
    // annotation storage (so they survive re-rendering and are saved).
    await annotationLayer.render({
      annotations,
      renderForms: true,
      enableScripting: this.pdfViewer.enableScripting(),
      hasJSActions,
      fieldObjects,
    } as never);
  }

  /** A pure XFA form's page, as HTML (pdf.js's XFA layer). */
  private async renderXfaLayer(
    page: PDFPageProxy,
    pageNumber: number,
    container: HTMLElement,
  ): Promise<void> {
    const div = container.querySelector<HTMLDivElement>(
      `[data-xfalayer-page="${pageNumber}"]`,
    );
    const xfaHtml = await page.getXfa();
    if (!div || !xfaHtml) return;
    div.textContent = '';
    XfaLayer.render({
      viewport: this.pageViewport(page, this.scaledValue()).clone({
        dontFlip: true,
      }),
      div,
      xfaHtml,
      annotationStorage: this.pdfDocument()?.annotationStorage,
      linkService: this.linkService as never,
      intent: 'display',
    });
  }

  /** A screen offset turned back by the pages' rotation. */
  private unrotate(dx: number, dy: number): { dx: number; dy: number } {
    const angle = (-this.rotation() * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { dx: dx * cos - dy * sin, dy: dx * sin + dy * cos };
  }

  /**
   * A screen point as 0–1 of a page's editor layer — the unrotated page,
   * whatever the rotation (offsetWidth/Height ignore the CSS rotation).
   */
  private pointInLayer(
    layer: HTMLElement,
    clientX: number,
    clientY: number,
  ): { x: number; y: number } {
    const rect = layer.getBoundingClientRect();
    const { dx, dy } = this.unrotate(
      clientX - (rect.left + rect.width / 2),
      clientY - (rect.top + rect.height / 2),
    );
    return {
      x: dx / layer.offsetWidth + 0.5,
      y: dy / layer.offsetHeight + 0.5,
    };
  }

  /** A pointer move on screen, as a fraction of the unrotated page. */
  private layerDelta(
    dxScreen: number,
    dyScreen: number,
    layerW: number,
    layerH: number,
  ): { dx: number; dy: number } {
    const { dx, dy } = this.unrotate(dxScreen, dyScreen);
    return { dx: dx / layerW, dy: dy / layerH };
  }

  /** The "Delete" button of a selected annotation's toolbar (ui button styles). */
  private deleteButton(annotationId: string, label: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = buttonVariants({ variant: 'outline', size: 'xs' });
    button.textContent = 'Delete';
    button.setAttribute('aria-label', label);
    button.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectedAnnotationId = null;
      this.pdfViewer.removeEditorAnnotation(annotationId);
    });
    return button;
  }

  private cancelAllRenderTasks(): void {
    for (const [, task] of this.activeRenderTasks) {
      task.cancel();
    }
    this.activeRenderTasks.clear();
    for (const [, layer] of this.activeTextLayers) {
      layer.cancel();
    }
    this.activeTextLayers.clear();
  }

  private applyHighlights(
    allMatches: import('./pdf-viewer-types').ScPdfPageMatchInfo[],
    highlightAll: boolean,
    currentMatchIndex: number,
  ): void {
    // Determine which page/match the current index refers to
    let currentPage = -1;
    let currentMatchOnPage = -1;
    let count = 0;
    for (let p = 0; p < allMatches.length; p++) {
      if (count + allMatches[p].matches.length > currentMatchIndex) {
        currentPage = p;
        currentMatchOnPage = currentMatchIndex - count;
        break;
      }
      count += allMatches[p].matches.length;
    }

    // Apply highlights to each rendered page
    for (const [pageNumber, data] of this.textLayerData) {
      const pageIdx = pageNumber - 1;
      const pageMatchInfo = allMatches[pageIdx];

      // Restore original text first
      this.clearPageHighlights(data);

      if (!pageMatchInfo || pageMatchInfo.matches.length === 0) continue;

      const isSelectedPage = pageIdx === currentPage;

      this.renderPageHighlights(
        data,
        pageMatchInfo,
        highlightAll,
        isSelectedPage,
        currentMatchOnPage,
      );
    }

    // Scroll selected highlight into view
    if (currentPage >= 0) {
      setTimeout(() => {
        const container = this.scrollContainer()?.nativeElement;
        if (!container) return;
        const selected = container.querySelector(
          '.highlight.selected',
        ) as HTMLElement;
        if (selected) {
          selected.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    }
  }

  private clearPageHighlights(data: {
    divs: HTMLElement[];
    texts: string[];
  }): void {
    for (let i = 0; i < data.divs.length; i++) {
      const div = data.divs[i];
      if (div.querySelector('.highlight')) {
        div.textContent = data.texts[i];
      }
    }
  }

  private renderPageHighlights(
    data: { divs: HTMLElement[]; texts: string[] },
    matchInfo: import('./pdf-viewer-types').ScPdfPageMatchInfo,
    highlightAll: boolean,
    isSelectedPage: boolean,
    selectedMatchOnPage: number,
  ): void {
    // Build a mapping from flat text offset to divIdx + offset within div
    const divOffsets: { divIdx: number; start: number }[] = [];
    let flatOffset = 0;
    for (let i = 0; i < data.texts.length; i++) {
      divOffsets.push({ divIdx: i, start: flatOffset });
      flatOffset += data.texts[i].length;
    }

    // Convert flat match positions to div-relative coordinates
    for (let m = 0; m < matchInfo.matches.length; m++) {
      const isSelected = isSelectedPage && m === selectedMatchOnPage;
      if (!highlightAll && !isSelected) continue;

      const matchStart = matchInfo.matches[m];
      const matchEnd = matchStart + matchInfo.matchesLength[m];

      // Find which divs this match spans
      for (let d = 0; d < divOffsets.length; d++) {
        const divStart = divOffsets[d].start;
        const divEnd = divStart + data.texts[divOffsets[d].divIdx].length;

        if (matchEnd <= divStart || matchStart >= divEnd) continue;

        const div = data.divs[divOffsets[d].divIdx];
        const text = data.texts[divOffsets[d].divIdx];
        const localStart = Math.max(0, matchStart - divStart);
        const localEnd = Math.min(text.length, matchEnd - divStart);

        // Build new content with highlight spans
        const before = text.substring(0, localStart);
        const matched = text.substring(localStart, localEnd);
        const after = text.substring(localEnd);

        const frag = document.createDocumentFragment();
        if (before) {
          frag.appendChild(document.createTextNode(before));
        }

        const highlightSpan = document.createElement('span');
        highlightSpan.className = isSelected
          ? 'highlight selected'
          : 'highlight';
        highlightSpan.textContent = matched;
        frag.appendChild(highlightSpan);

        if (after) {
          frag.appendChild(document.createTextNode(after));
        }

        div.textContent = '';
        div.appendChild(frag);
      }
    }
  }

  // ── Editor methods ──

  private readonly onHighlightMouseUp = (): void => {
    if (this.editorMode() !== 'highlight') return;

    const selection = document.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    // Find which page the selection is in
    let pageEl: HTMLElement | null = null;
    let node: Node | null = range.startContainer;
    while (node && node !== container) {
      if (node instanceof HTMLElement && node.classList.contains('textLayer')) {
        pageEl = node.closest('[data-page]') as HTMLElement;
        break;
      }
      node = node.parentNode;
    }
    if (!pageEl) return;

    const pageNumber = parseInt(pageEl.getAttribute('data-page') || '0', 10);
    if (!pageNumber) return;

    const layer = pageEl.querySelector<HTMLElement>(
      `[data-editorlayer-page="${pageNumber}"]`,
    );
    if (!layer) return;

    // Each selection rect, mapped corner by corner into the unrotated page.
    const clientRects = range.getClientRects();
    const rects: { x: number; y: number; width: number; height: number }[] = [];
    for (let i = 0; i < clientRects.length; i++) {
      const r = clientRects[i];
      if (!r.width || !r.height) continue;
      const a = this.pointInLayer(layer, r.left, r.top);
      const b = this.pointInLayer(layer, r.right, r.bottom);
      rects.push({
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        width: Math.abs(b.x - a.x),
        height: Math.abs(b.y - a.y),
      });
    }

    if (rects.length === 0) return;

    this.pdfViewer.addEditorAnnotation({
      type: 'highlight',
      pageNumber,
      rects,
      color: this.pdfViewer.highlightColor(),
      opacity: 0.4,
    });

    selection.removeAllRanges();
  };

  onEditorPointerDown(event: PointerEvent, pageNumber: number): void {
    const mode = this.editorMode();
    const target = event.currentTarget as HTMLElement;
    const { x, y } = this.pointInLayer(target, event.clientX, event.clientY);

    if (mode === 'comment') {
      event.preventDefault();
      event.stopPropagation();
      this.pdfViewer.startComment(pageNumber, x, y);
    } else if (mode === 'freetext') {
      event.preventDefault();
      event.stopPropagation();
      this.createFreetextEditor(pageNumber, x, y, target);
    } else if (mode === 'ink') {
      this.inkDrawing = true;
      this.inkCurrentPage = pageNumber;
      this.inkCurrentStroke = [{ x, y }];
      target.setPointerCapture(event.pointerId);

      // Start drawing preview
      const canvas = this.getOrCreateInkCanvas(target);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = this.pdfViewer.inkColor();
        ctx.lineWidth = this.pdfViewer.inkThickness() * this.scaledValue();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = this.pdfViewer.inkOpacity();
        ctx.beginPath();
        ctx.moveTo(x * target.offsetWidth, y * target.offsetHeight);
      }
    }
  }

  onEditorPointerMove(event: PointerEvent, _pageNumber: number): void {
    if (!this.inkDrawing) return;

    const target = event.currentTarget as HTMLElement;
    const { x, y } = this.pointInLayer(target, event.clientX, event.clientY);

    this.inkCurrentStroke.push({ x, y });

    // Draw preview
    const canvas = target.querySelector(
      '.ink-preview-canvas',
    ) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(x * target.offsetWidth, y * target.offsetHeight);
        ctx.stroke();
      }
    }
  }

  onEditorPointerUp(event: PointerEvent, _pageNumber: number): void {
    if (!this.inkDrawing) return;
    this.inkDrawing = false;

    const target = event.currentTarget as HTMLElement;
    target.releasePointerCapture(event.pointerId);

    // Remove preview canvas
    const canvas = target.querySelector('.ink-preview-canvas');
    canvas?.remove();

    if (this.inkCurrentStroke.length < 2) return;

    this.pdfViewer.addEditorAnnotation({
      type: 'ink',
      pageNumber: this.inkCurrentPage,
      strokes: [this.inkCurrentStroke],
      color: this.pdfViewer.inkColor(),
      strokeWidth: this.pdfViewer.inkThickness(),
      opacity: this.pdfViewer.inkOpacity(),
    });

    this.inkCurrentStroke = [];
  }

  private getOrCreateInkCanvas(container: HTMLElement): HTMLCanvasElement {
    let canvas = container.querySelector(
      '.ink-preview-canvas',
    ) as HTMLCanvasElement;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'ink-preview-canvas';
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      container.appendChild(canvas);
    }
    return canvas;
  }

  private createFreetextEditor(
    pageNumber: number,
    x: number,
    y: number,
    container: HTMLElement,
  ): void {
    const div = document.createElement('div');
    div.contentEditable = 'true';
    div.className = 'editor-freetext';
    div.style.position = 'absolute';
    div.style.left = `${x * 100}%`;
    div.style.top = `${y * 100}%`;
    div.style.fontSize = `${this.pdfViewer.freetextSize() * this.scaledValue()}px`;
    div.style.color = this.pdfViewer.freetextColor();
    div.style.minWidth = '20px';
    div.style.minHeight = '1em';
    div.style.outline = '2px solid #6b9edd';
    div.style.padding = '2px 4px';
    div.style.background = 'rgba(255,255,255,0.8)';
    div.style.zIndex = '10';
    div.style.whiteSpace = 'pre-wrap';
    div.style.lineHeight = '1.2';
    // Prevent clicks on the editor from creating new editors
    div.addEventListener('pointerdown', (e) => e.stopPropagation());
    container.appendChild(div);
    // Defer focus to after event processing completes
    setTimeout(() => div.focus());

    const save = (): void => {
      const text = div.textContent?.trim() ?? '';
      div.remove();
      if (!text) return;

      this.pdfViewer.addEditorAnnotation({
        type: 'freetext',
        pageNumber,
        x,
        y,
        text,
        fontSize: this.pdfViewer.freetextSize(),
        fontColor: this.pdfViewer.freetextColor(),
      });
    };

    div.addEventListener('blur', save);
    div.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        div.removeEventListener('blur', save);
        div.remove();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        div.blur();
      }
    });
  }

  private renderEditorAnnotations(
    annotations: import('./pdf-viewer-types').ScPdfEditorAnnotation[],
    scale: number,
  ): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    // Clear all existing editor annotations
    container
      .querySelectorAll('.editor-annotation')
      .forEach((el) => el.remove());

    // The highlight tool's "Show all" off hides every highlight.
    const showHighlights = this.pdfViewer.highlightShowAll();

    for (const ann of annotations) {
      const editorLayer = container.querySelector(
        `[data-editorlayer-page="${ann.pageNumber}"]`,
      ) as HTMLElement;
      if (!editorLayer) continue;

      if (ann.type === 'highlight' && ann.rects) {
        if (!showHighlights) continue;
        this.createInteractiveHighlight(ann, editorLayer);
      } else if (ann.type === 'freetext') {
        this.createInteractiveFreetext(ann, editorLayer, scale);
      } else if (ann.type === 'ink' && ann.strokes) {
        const canvas = document.createElement('canvas');
        canvas.className = 'editor-annotation editor-ink';
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.width = editorLayer.clientWidth;
        canvas.height = editorLayer.clientHeight;
        editorLayer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.strokeStyle = ann.color || '#000';
          ctx.lineWidth = (ann.strokeWidth ?? 1) * scale;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = ann.opacity ?? 1;

          for (const stroke of ann.strokes) {
            if (stroke.length < 2) continue;
            ctx.beginPath();
            ctx.moveTo(stroke[0].x * canvas.width, stroke[0].y * canvas.height);
            for (let i = 1; i < stroke.length; i++) {
              ctx.lineTo(
                stroke[i].x * canvas.width,
                stroke[i].y * canvas.height,
              );
            }
            ctx.stroke();
          }
        }
      } else if (
        (ann.type === 'stamp' || ann.type === 'signature') &&
        ann.imageDataUrl
      ) {
        this.createInteractiveStamp(ann, editorLayer);
      }
    }

    this.renderCommentMarkers(container);
  }

  /**
   * A numbered marker where each comment was placed (the number matches the
   * comment list); clicking one selects its comment. The comment being
   * written shows as an outlined marker.
   */
  private renderCommentMarkers(container: HTMLElement): void {
    const activeId = this.pdfViewer.activeCommentId();
    const marker = (
      pageNumber: number,
      x: number,
      y: number,
      label: string,
      text: string,
      variant: 'default' | 'outline',
    ): HTMLButtonElement | null => {
      const layer = container.querySelector<HTMLElement>(
        `[data-editorlayer-page="${pageNumber}"]`,
      );
      if (!layer) return null;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = cn(
        'editor-annotation pointer-events-auto absolute z-[6] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm',
        buttonVariants({ variant, size: 'icon-xs' }),
      );
      button.style.left = `${x * 100}%`;
      button.style.top = `${y * 100}%`;
      button.textContent = label;
      button.setAttribute('aria-label', text);
      button.addEventListener('pointerdown', (e) => e.stopPropagation());
      layer.appendChild(button);
      return button;
    };

    this.pdfViewer.comments().forEach((comment, index) => {
      const button = marker(
        comment.pageNumber,
        comment.x,
        comment.y,
        String(index + 1),
        `Comment ${index + 1}: ${comment.text}`,
        'default',
      );
      if (!button) return;
      if (comment.id === activeId) {
        button.classList.add('ring-3', 'ring-ring/50');
      }
      button.addEventListener('click', () =>
        this.pdfViewer.activeCommentId.set(comment.id),
      );
    });

    const pending = this.pdfViewer.pendingComment();
    if (pending) {
      marker(
        pending.pageNumber,
        pending.x,
        pending.y,
        '+',
        'New comment',
        'outline',
      );
    }
  }

  private createInteractiveHighlight(
    ann: import('./pdf-viewer-types').ScPdfEditorAnnotation,
    editorLayer: HTMLElement,
  ): void {
    const isSelected = this.selectedAnnotationId === ann.id;
    const highlightColor = ann.color || '#FFFF00';

    // Container wrapping all rects for this highlight annotation
    const wrapper = document.createElement('div');
    wrapper.className = 'editor-annotation editor-highlight-wrapper';
    wrapper.dataset['annotationId'] = ann.id;
    wrapper.style.position = 'absolute';
    wrapper.style.inset = '0';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = isSelected ? '10' : '3';

    for (const rect of ann.rects!) {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.left = `${rect.x * 100}%`;
      div.style.top = `${rect.y * 100}%`;
      div.style.width = `${rect.width * 100}%`;
      div.style.height = `${rect.height * 100}%`;
      div.style.background = highlightColor;
      div.style.opacity = String(ann.opacity ?? 0.4);
      div.style.mixBlendMode = 'multiply';
      div.style.pointerEvents = 'auto';
      div.style.cursor = 'pointer';
      div.style.borderRadius = '2px';

      if (isSelected) {
        div.style.outline = '2px solid #6b9edd';
        div.style.outlineOffset = '1px';
      }

      div.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        if (this.selectedAnnotationId !== ann.id) {
          this.selectedAnnotationId = ann.id;
          const annotations = this.pdfViewer.editorAnnotations();
          this.renderEditorAnnotations(annotations, this.scaledValue());
        }
      });

      wrapper.appendChild(div);
    }

    // Toolbar when selected (color picker + delete)
    if (isSelected && ann.rects!.length > 0) {
      const firstRect = ann.rects![0];
      const toolbar = document.createElement('div');
      toolbar.className = 'editor-highlight-toolbar';
      toolbar.style.position = 'absolute';
      toolbar.style.left = `${firstRect.x * 100}%`;
      toolbar.style.top = `${firstRect.y * 100}%`;
      toolbar.style.transform = 'translateY(calc(-100% - 6px))';
      toolbar.style.display = 'flex';
      toolbar.style.gap = '4px';
      toolbar.style.zIndex = '12';
      toolbar.style.pointerEvents = 'auto';
      toolbar.style.padding = '4px';
      toolbar.style.borderRadius = '6px';
      toolbar.style.background = '#fff';
      toolbar.style.border = '1px solid #ccc';
      toolbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';

      // Color swatches
      const colors = ['#FFFF00', '#00FF00', '#00FFFF', '#FF69B4', '#FFA500'];
      for (const color of colors) {
        const swatch = document.createElement('button');
        swatch.style.width = '20px';
        swatch.style.height = '20px';
        swatch.style.borderRadius = '50%';
        swatch.style.background = color;
        swatch.style.border =
          color === highlightColor ? '2px solid #333' : '1px solid #ccc';
        swatch.style.cursor = 'pointer';
        swatch.style.padding = '0';
        swatch.setAttribute('aria-label', `Highlight color ${color}`);
        swatch.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
        swatch.addEventListener('click', (e) => {
          e.stopPropagation();
          this.pdfViewer.updateEditorAnnotation(ann.id, { color });
        });
        toolbar.appendChild(swatch);
      }

      toolbar.appendChild(this.deleteButton(ann.id, 'Delete highlight'));

      wrapper.appendChild(toolbar);
    }

    editorLayer.appendChild(wrapper);
  }

  private createInteractiveStamp(
    ann: import('./pdf-viewer-types').ScPdfEditorAnnotation,
    editorLayer: HTMLElement,
  ): void {
    const isSelected = this.selectedAnnotationId === ann.id;

    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'editor-annotation editor-stamp-wrapper';
    wrapper.dataset['annotationId'] = ann.id;
    wrapper.style.position = 'absolute';
    wrapper.style.left = `${(ann.x ?? 0) * 100}%`;
    wrapper.style.top = `${(ann.y ?? 0) * 100}%`;
    wrapper.style.width = `${(ann.width ?? 0.15) * 100}%`;
    wrapper.style.cursor = 'move';
    wrapper.style.pointerEvents = 'auto';
    wrapper.style.outline = isSelected ? '2px solid #6b9edd' : 'none';
    wrapper.style.outlineOffset = '2px';
    wrapper.style.zIndex = isSelected ? '10' : '5';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute(
      'aria-label',
      ann.description ||
        (ann.type === 'signature'
          ? 'Signature annotation'
          : 'Stamp annotation'),
    );

    // Image
    const img = document.createElement('img');
    img.style.width = '100%';
    img.style.display = 'block';
    img.style.pointerEvents = 'none';
    img.style.userSelect = 'none';
    img.draggable = false;
    img.src = ann.imageDataUrl!;
    img.alt =
      ann.description ||
      (ann.type === 'signature' ? 'Signature annotation' : 'Stamp annotation');
    wrapper.appendChild(img);

    // Resize handles (only when selected)
    if (isSelected) {
      const handles = ['nw', 'ne', 'sw', 'se'];
      for (const handle of handles) {
        const h = document.createElement('div');
        h.className = `editor-stamp-handle editor-stamp-handle-${handle}`;
        h.dataset['handle'] = handle;
        h.dataset['annotationId'] = ann.id;
        h.style.position = 'absolute';
        h.style.width = '10px';
        h.style.height = '10px';
        h.style.background = '#6b9edd';
        h.style.border = '1px solid #fff';
        h.style.borderRadius = '2px';
        h.style.zIndex = '11';

        if (handle.includes('n')) h.style.top = '-5px';
        if (handle.includes('s')) h.style.bottom = '-5px';
        if (handle.includes('w')) h.style.left = '-5px';
        if (handle.includes('e')) h.style.right = '-5px';

        if (handle === 'nw' || handle === 'se') h.style.cursor = 'nwse-resize';
        if (handle === 'ne' || handle === 'sw') h.style.cursor = 'nesw-resize';

        h.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.resizeState = {
            annotationId: ann.id,
            handle,
            startX: e.clientX,
            startY: e.clientY,
            origX: ann.x ?? 0,
            origY: ann.y ?? 0,
            origW: ann.width ?? 0.15,
            origH: ann.height ?? 0.15,
            layerW: editorLayer.offsetWidth,
            layerH: editorLayer.offsetHeight,
          };
        });

        wrapper.appendChild(h);
      }

      // Bottom toolbar (Alt text + Delete)
      const toolbar = document.createElement('div');
      toolbar.className = 'editor-stamp-toolbar';
      toolbar.style.position = 'absolute';
      toolbar.style.left = '0';
      toolbar.style.top = '100%';
      toolbar.style.marginTop = '6px';
      toolbar.style.display = 'flex';
      toolbar.style.gap = '4px';
      toolbar.style.zIndex = '12';

      // Alt text button
      const altBtn = document.createElement('button');
      altBtn.className = 'editor-stamp-alt-btn';
      altBtn.style.display = 'flex';
      altBtn.style.alignItems = 'center';
      altBtn.style.gap = '4px';
      altBtn.style.padding = '4px 10px';
      altBtn.style.borderRadius = '20px';
      altBtn.style.border = '1px solid #ccc';
      altBtn.style.background = '#fff';
      altBtn.style.color = '#15141a';
      altBtn.style.fontSize = '12px';
      altBtn.style.cursor = 'pointer';
      altBtn.style.whiteSpace = 'nowrap';
      altBtn.style.lineHeight = '1';

      const hasAlt = !!(ann.altText || ann.isDecorative);
      altBtn.textContent = hasAlt
        ? ann.isDecorative
          ? 'Decorative'
          : ann.altText!
        : '+ Alt text';
      if (hasAlt) {
        altBtn.style.maxWidth = '120px';
        altBtn.style.overflow = 'hidden';
        altBtn.style.textOverflow = 'ellipsis';
      }

      altBtn.setAttribute('aria-label', 'Edit alt text');
      altBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      altBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.pdfViewer.altTextAnnotationId.set(ann.id);
        this.pdfViewer.altTextDialogOpen.set(true);
      });
      toolbar.appendChild(altBtn);

      toolbar.appendChild(this.deleteButton(ann.id, 'Delete image'));

      wrapper.appendChild(toolbar);
    }

    // Click to select
    wrapper.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (this.selectedAnnotationId !== ann.id) {
        this.selectedAnnotationId = ann.id;
        // Re-render to show handles
        const annotations = this.pdfViewer.editorAnnotations();
        this.renderEditorAnnotations(annotations, this.scaledValue());
        return;
      }

      // Start drag
      this.dragState = {
        annotationId: ann.id,
        startX: e.clientX,
        startY: e.clientY,
        origX: ann.x ?? 0,
        origY: ann.y ?? 0,
        layerW: editorLayer.offsetWidth,
        layerH: editorLayer.offsetHeight,
      };
    });

    editorLayer.appendChild(wrapper);
  }

  private createInteractiveFreetext(
    ann: import('./pdf-viewer-types').ScPdfEditorAnnotation,
    editorLayer: HTMLElement,
    scale: number,
  ): void {
    const isSelected = this.selectedAnnotationId === ann.id;
    const fontSize = (ann.fontSize ?? 14) * scale;

    const wrapper = document.createElement('div');
    wrapper.className = 'editor-annotation editor-freetext-wrapper';
    wrapper.dataset['annotationId'] = ann.id;
    wrapper.style.position = 'absolute';
    wrapper.style.left = `${(ann.x ?? 0) * 100}%`;
    wrapper.style.top = `${(ann.y ?? 0) * 100}%`;
    wrapper.style.cursor = 'move';
    wrapper.style.pointerEvents = 'auto';
    wrapper.style.outline = isSelected ? '2px solid #6b9edd' : 'none';
    wrapper.style.outlineOffset = '2px';
    wrapper.style.zIndex = isSelected ? '10' : '5';
    wrapper.style.padding = '2px 4px';
    wrapper.style.whiteSpace = 'pre-wrap';
    wrapper.style.lineHeight = '1.2';
    wrapper.tabIndex = 0;

    const textEl = document.createElement('div');
    textEl.style.fontSize = `${fontSize}px`;
    textEl.style.color = ann.fontColor || '#000';
    textEl.style.pointerEvents = 'none';
    textEl.style.userSelect = 'none';
    textEl.textContent = ann.text || '';
    wrapper.appendChild(textEl);

    if (isSelected) {
      // Delete button toolbar
      const toolbar = document.createElement('div');
      toolbar.className = 'editor-freetext-toolbar';
      toolbar.style.position = 'absolute';
      toolbar.style.left = '0';
      toolbar.style.top = '100%';
      toolbar.style.marginTop = '6px';
      toolbar.style.display = 'flex';
      toolbar.style.gap = '4px';
      toolbar.style.zIndex = '12';

      toolbar.appendChild(this.deleteButton(ann.id, 'Delete text'));
      wrapper.appendChild(toolbar);
    }

    // Click to select
    wrapper.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (this.selectedAnnotationId !== ann.id) {
        this.selectedAnnotationId = ann.id;
        const annotations = this.pdfViewer.editorAnnotations();
        this.renderEditorAnnotations(annotations, this.scaledValue());
        return;
      }

      // Start drag
      this.dragState = {
        annotationId: ann.id,
        startX: e.clientX,
        startY: e.clientY,
        origX: ann.x ?? 0,
        origY: ann.y ?? 0,
        layerW: editorLayer.offsetWidth,
        layerH: editorLayer.offsetHeight,
      };
    });

    // Double-click to edit text inline
    wrapper.addEventListener('dblclick', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.selectedAnnotationId = ann.id;

      textEl.style.pointerEvents = 'auto';
      textEl.style.userSelect = 'text';
      textEl.contentEditable = 'true';
      textEl.style.outline = 'none';
      textEl.style.cursor = 'text';
      wrapper.style.cursor = 'text';
      wrapper.style.outline = '2px solid #6b9edd';
      textEl.focus();

      // Select all text
      const range = document.createRange();
      range.selectNodeContents(textEl);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);

      const commitEdit = (): void => {
        textEl.removeEventListener('blur', commitEdit);
        const newText = textEl.textContent?.trim() ?? '';
        textEl.contentEditable = 'false';
        textEl.style.pointerEvents = 'none';
        textEl.style.userSelect = 'none';
        wrapper.style.cursor = 'move';

        if (newText && newText !== ann.text) {
          this.pdfViewer.updateEditorAnnotation(ann.id, { text: newText });
        } else if (!newText) {
          this.selectedAnnotationId = null;
          this.pdfViewer.removeEditorAnnotation(ann.id);
        }
      };

      textEl.addEventListener('blur', commitEdit);
      textEl.addEventListener('keydown', (ke) => {
        if (ke.key === 'Escape') {
          textEl.removeEventListener('blur', commitEdit);
          textEl.contentEditable = 'false';
          textEl.style.pointerEvents = 'none';
          textEl.style.userSelect = 'none';
          wrapper.style.cursor = 'move';
          // Re-render to restore original text
          const annotations = this.pdfViewer.editorAnnotations();
          this.renderEditorAnnotations(annotations, this.scaledValue());
        } else if (ke.key === 'Enter' && !ke.shiftKey) {
          ke.preventDefault();
          textEl.blur();
        }
      });
    });

    editorLayer.appendChild(wrapper);
  }

  private readonly onGlobalPointerDown = (e: PointerEvent): void => {
    if (!this.selectedAnnotationId) return;
    const target = e.target as HTMLElement;
    if (
      !target.closest('.editor-stamp-wrapper') &&
      !target.closest('.editor-freetext-wrapper') &&
      !target.closest('.editor-highlight-wrapper')
    ) {
      this.selectedAnnotationId = null;
      const annotations = this.pdfViewer.editorAnnotations();
      this.renderEditorAnnotations(annotations, this.scaledValue());
    }
  };

  /** How far the pointer moved since the drag / resize began, in page units. */
  private pointerDelta(
    e: PointerEvent,
    state: { startX: number; startY: number; layerW: number; layerH: number },
  ): { dx: number; dy: number } {
    return this.layerDelta(
      e.clientX - state.startX,
      e.clientY - state.startY,
      state.layerW,
      state.layerH,
    );
  }

  private readonly onGlobalPointerMove = (e: PointerEvent): void => {
    if (this.dragState) {
      const { dx, dy } = this.pointerDelta(e, this.dragState);
      const newX = Math.max(0, Math.min(1, this.dragState.origX + dx));
      const newY = Math.max(0, Math.min(1, this.dragState.origY + dy));

      const wrapper = this.scrollContainer()?.nativeElement.querySelector(
        `[data-annotation-id="${this.dragState.annotationId}"]`,
      ) as HTMLElement;
      if (wrapper) {
        wrapper.style.left = `${newX * 100}%`;
        wrapper.style.top = `${newY * 100}%`;
      }
    } else if (this.resizeState) {
      const { dx } = this.pointerDelta(e, this.resizeState);
      const handle = this.resizeState.handle;
      const aspect = this.resizeState.origH / this.resizeState.origW;

      let newW = this.resizeState.origW;
      let newX = this.resizeState.origX;
      let newY = this.resizeState.origY;

      if (handle.includes('e')) {
        newW = Math.max(0.02, this.resizeState.origW + dx);
      } else if (handle.includes('w')) {
        newW = Math.max(0.02, this.resizeState.origW - dx);
        newX = this.resizeState.origX + (this.resizeState.origW - newW);
      }

      const newH = newW * aspect;
      if (handle.includes('n')) {
        newY = this.resizeState.origY + (this.resizeState.origH - newH);
      }

      const wrapper = this.scrollContainer()?.nativeElement.querySelector(
        `[data-annotation-id="${this.resizeState.annotationId}"]`,
      ) as HTMLElement;
      if (wrapper) {
        wrapper.style.left = `${newX * 100}%`;
        wrapper.style.top = `${newY * 100}%`;
        wrapper.style.width = `${newW * 100}%`;
      }
    }
  };

  private readonly onGlobalPointerUp = (e: PointerEvent): void => {
    if (this.dragState) {
      const { dx, dy } = this.pointerDelta(e, this.dragState);
      const newX = Math.max(0, Math.min(1, this.dragState.origX + dx));
      const newY = Math.max(0, Math.min(1, this.dragState.origY + dy));

      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        this.pdfViewer.updateEditorAnnotation(this.dragState.annotationId, {
          x: newX,
          y: newY,
        });
      }
      this.dragState = null;
    } else if (this.resizeState) {
      const { dx } = this.pointerDelta(e, this.resizeState);
      const handle = this.resizeState.handle;
      const aspect = this.resizeState.origH / this.resizeState.origW;

      let newW = this.resizeState.origW;
      let newX = this.resizeState.origX;
      let newY = this.resizeState.origY;

      if (handle.includes('e')) {
        newW = Math.max(0.02, this.resizeState.origW + dx);
      } else if (handle.includes('w')) {
        newW = Math.max(0.02, this.resizeState.origW - dx);
        newX = this.resizeState.origX + (this.resizeState.origW - newW);
      }

      const newH = newW * aspect;
      if (handle.includes('n')) {
        newY = this.resizeState.origY + (this.resizeState.origH - newH);
      }

      this.pdfViewer.updateEditorAnnotation(this.resizeState.annotationId, {
        x: newX,
        y: newY,
        width: newW,
        height: newH,
      });
      this.resizeState = null;
    }
  };

  private readonly onAnnotationKeyDown = (e: KeyboardEvent): void => {
    if (!this.selectedAnnotationId) return;

    if (e.key === 'Delete' || e.key === 'Backspace') {
      // Don't delete if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if ((e.target as HTMLElement)?.isContentEditable) return;

      e.preventDefault();
      const id = this.selectedAnnotationId;
      this.selectedAnnotationId = null;
      this.pdfViewer.removeEditorAnnotation(id);
    } else if (e.key === 'Escape') {
      this.selectedAnnotationId = null;
      const annotations = this.pdfViewer.editorAnnotations();
      this.renderEditorAnnotations(annotations, this.scaledValue());
    }
  };
}
