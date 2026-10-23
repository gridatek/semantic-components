import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type {
  PDFDocumentProxy,
  PDFPageProxy,
  PageViewport,
  RenderTask,
} from 'pdfjs-dist';
import {
  AnnotationMode,
  TextLayer,
  XfaLayer,
  setLayerDimensions,
} from 'pdfjs-dist';
import { SC_PDF_VIEWER } from './pdf-viewer';
import {
  renderAnnotationLayer,
  setPresentationState,
} from './pdf-viewer-annotation-layer';
import { ScPdfViewerAnnotationToolbar } from './pdf-viewer-annotation-toolbar';
import { ScPdfViewerCommentMarker } from './pdf-viewer-comment-marker';
import { ScPdfDetailCanvas } from './pdf-viewer-detail-canvas';
import { ScPdfEditor } from './pdf-viewer-editor';
import { ScPdfViewerEditorLayer } from './pdf-viewer-editor-layer';
import { highlightMatches } from './pdf-viewer-find-highlighter';
import type { ScPdfTextLayerData } from './pdf-viewer-find-highlighter';
import { ScPdfLinkService } from './pdf-viewer-link-service';
import type { ScPdfPageBox } from './pdf-viewer-output-scale';
import { pageBox } from './pdf-viewer-output-scale';
import { ScPdfViewerPan } from './pdf-viewer-pan';
import { ScPdfStructTree } from './pdf-viewer-struct-tree';
import { ScPdfTextSelection } from './pdf-viewer-text-selection';
import type { ScPdfPageMatchInfo } from './pdf-viewer-types';

/** Pages within one viewport height above or below are kept rendered. */
const RENDER_MARGIN = '100% 0px';

const VISIBILITY_THRESHOLDS = Array.from({ length: 11 }, (_, i) => i / 10);

interface PageLayout {
  pageNumber: number;
  width: number;
  height: number;
}

@Component({
  selector: 'div[scPdfViewerCanvas]',
  imports: [ScPdfViewerEditorLayer, ScPdfViewerPan],
  providers: [ScPdfEditor],
  template: `
    <div
      #scrollContainer
      class="h-full w-full touch-pan-x touch-pan-y overflow-auto outline-none data-hand:cursor-grab data-idle:cursor-none data-panning:cursor-grabbing data-idle:[&_*]:cursor-none data-hand:[&_.textLayer]:pointer-events-none"
      scPdfViewerPan
      role="document"
      tabindex="0"
    >
      <div [class]="pagesClass()">
        @for (spread of spreads(); track spread[0].pageNumber) {
          <div
            class="flex items-center justify-center gap-2"
            [hidden]="!isSpreadShown(spread)"
          >
            @for (page of spread; track page.pageNumber) {
              <!-- pdf.js sizes its layers with round(…, var(--scale-round-*));
                   the page's size is rounded the same way, so canvas pixels
                   line up with the screen's. -->
              @let box = pageBox(page);
              <div
                class="bg-background relative shrink-0 shadow-sm"
                [attr.data-page]="page.pageNumber"
                [attr.role]="pageName() ? 'region' : null"
                [attr.aria-label]="pageAriaLabel(page.pageNumber)"
                [style.width.px]="box.width"
                [style.height.px]="box.height"
                [style.--scale-round-x]="box.roundX + 'px'"
                [style.--scale-round-y]="box.roundY + 'px'"
                [style.background-color]="
                  pdfViewer.appliedPageColors()?.background ?? null
                "
                [style.cursor]="pageCursor()"
              >
                <canvas
                  class="block size-full"
                  width="0"
                  height="0"
                  [attr.data-page]="page.pageNumber"
                ></canvas>
                <!-- The visible part, sharp, when the page's canvas can't be. -->
                <canvas
                  class="absolute"
                  width="0"
                  height="0"
                  hidden
                  aria-hidden="true"
                  [attr.data-detail-page]="page.pageNumber"
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
                  [scPdfViewerEditorLayer]="page.pageNumber"
                  [scale]="scaledValue()"
                  [toolbar]="annotationToolbar()?.templateRef ?? null"
                  [marker]="commentMarker()?.templateRef ?? null"
                  [style.width.px]="sideways() ? box.height : box.width"
                  [style.height.px]="sideways() ? box.width : box.height"
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
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly editor = inject(ScPdfEditor);
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

  private readonly linkService = new ScPdfLinkService(this.pdfViewer);
  /** Drag-selecting text as in pdf.js (no jumping to the end of the page). */
  private readonly textSelection = new ScPdfTextSelection(() =>
    this.pdfViewer.canCopy(),
  );

  private activeRenderTasks = new Map<number, RenderTask>();
  private activeTextLayers = new Map<number, TextLayer>();
  private renderedPages = new Set<number>();
  private structTrees = new WeakMap<PDFPageProxy, ScPdfStructTree>();
  /** The sharp visible part of pages drawn below the screen's density. */
  private readonly detail = new ScPdfDetailCanvas();
  /** Rendered pages drawn below the screen's density. */
  private readonly restrictedPages = new Set<number>();
  private detailFrame = 0;
  private textLayerData = new Map<number, ScPdfTextLayerData>();
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
  /** Where a navigation is scrolling to, until it gets there. */
  private scrollTarget: { page: number; top: number } | null = null;
  private scrollTargetTimeout: ReturnType<typeof setTimeout> | undefined;

  /** Rotated a quarter turn: the page's width and height swap on screen. */
  protected readonly sideways = computed(() => this.rotation() % 180 !== 0);

  protected displayWidth(page: PageLayout): number {
    return this.sideways() ? page.height : page.width;
  }

  protected displayHeight(page: PageLayout): number {
    return this.sideways() ? page.width : page.height;
  }

  /** Each page's size on screen and its canvas's (pdf.js's rounding). */
  private readonly pageBoxes = computed(() => {
    const scale = this.scaledValue();
    const dpr = this.dpr();
    return new Map(
      this.pageLayouts().map((page) => [
        page.pageNumber,
        pageBox(
          this.displayWidth(page) * scale,
          this.displayHeight(page) * scale,
          dpr,
        ),
      ]),
    );
  });

  protected pageBox(page: PageLayout): ScPdfPageBox {
    return (
      this.pageBoxes().get(page.pageNumber) ??
      pageBox(
        this.displayWidth(page) * this.scaledValue(),
        this.displayHeight(page) * this.scaledValue(),
        this.dpr(),
      )
    );
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

  /** Your toolbar for the selected annotation, and your comment markers. */
  protected readonly annotationToolbar = contentChild(
    ScPdfViewerAnnotationToolbar,
  );
  protected readonly commentMarker = contentChild(ScPdfViewerCommentMarker);

  /**
   * Each page's accessible name — your words, e.g.
   * `(page, label) => \`Page \${label}\``; with it, pages are named regions.
   */
  readonly pageName = input<((page: number, label: string) => string) | null>(
    null,
  );

  readonly pageCursor = computed(() => {
    const mode = this.pdfViewer.editorMode();
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
      this.watchDevicePixelRatio();
      // Selecting text to highlight, moving / resizing annotations…
      this.editor.listen(this.scrollContainer()?.nativeElement ?? null);
    });

    // Form fields stop taking clicks in presentation mode (and back after).
    effect(() => {
      this.pdfViewer.presenting();
      untracked(() =>
        this.scrollContainer()
          ?.nativeElement.querySelectorAll<HTMLElement>('.annotationLayer')
          .forEach((layer) =>
            setPresentationState(layer, this.pdfViewer.presenting()),
          ),
      );
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
      // A layer shown or hidden.
      this.pdfViewer.layers();
      // Forms drawn as fields, or read-only (permissions).
      this.pdfViewer.canFillForms();
      this.pdfViewer.appliedPageColors();
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
      const page = untracked(() => this.pdfViewer.navigatePage());
      const top = untracked(() => this.pdfViewer.navigateTop());
      const smooth = untracked(() => this.pdfViewer.navigateSmooth());

      setTimeout(() =>
        this.scrollToPage(page, top, smooth ? 'smooth' : 'auto'),
      );
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

    // Back / Forward remember where the pages were scrolled to.
    this.pdfViewer.setLocator(() => this.location());

    this.destroyRef.onDestroy(() => {
      this.pdfViewer.setLocator(null);
      this.textSelection.destroy();
      this.renderObserver?.disconnect();
      this.visibilityObserver?.disconnect();
      this.resizeObserver?.disconnect();
      this.dprQuery?.removeEventListener('change', this.onDprChange);
      this.scrollContainer()?.nativeElement.removeEventListener(
        'scroll',
        this.onScroll,
      );
      cancelAnimationFrame(this.detailFrame);
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

    container.addEventListener('scroll', this.onScroll, { passive: true });
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

    // Until the scroll ends, where it's going is where the pages are
    // (Back / Forward remember it, not a page passed on the way).
    const target = { page, top };
    this.scrollTarget = target;
    clearTimeout(this.scrollTargetTimeout);
    const settled = () => {
      if (this.scrollTarget === target) this.scrollTarget = null;
    };
    container.addEventListener('scrollend', settled, { once: true });
    // No scroll at all (already there) fires no scrollend.
    this.scrollTargetTimeout = setTimeout(settled, 1000);

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

  /**
   * Where the pages are scrolled to: the current page, and how far down
   * it the viewport's top is (in page units, as `scrollToPage` takes it).
   */
  private location(): { page: number; top: number } {
    if (this.scrollTarget) return this.scrollTarget;
    const page = this.pdfViewer.currentPage();
    const container = this.scrollContainer()?.nativeElement;
    const pageEl = container?.querySelector<HTMLElement>(
      `div[data-page="${page}"]`,
    );
    if (!container || !pageEl) return { page, top: 0 };
    const box = pageEl.getBoundingClientRect();
    const scrolled =
      (container.getBoundingClientRect().top - box.top) / box.height;
    const down = Math.min(1, Math.max(0, scrolled));
    const rotation = this.rotation();
    return {
      page,
      top: rotation === 0 ? down : rotation === 180 && down > 0 ? 1 - down : 0,
    };
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
      // The structure tree, whose text goes with the text layer.
      canvas.textContent = '';
    }
    this.restrictedPages.delete(pageNumber);
    this.detail.reset(
      pageNumber,
      container.querySelector(`canvas[data-detail-page="${pageNumber}"]`),
    );
    this.pdfViewer.pageReleased(pageNumber);
    const textLayer = container.querySelector<HTMLElement>(
      `[data-textlayer-page="${pageNumber}"]`,
    );
    if (textLayer) this.textSelection.remove(textLayer);
    for (const layer of [
      `[data-textlayer-page="${pageNumber}"]`,
      `[data-annotationlayer-page="${pageNumber}"]`,
      `[data-xfalayer-page="${pageNumber}"]`,
    ]) {
      const el = container.querySelector(layer);
      if (el) el.textContent = '';
    }
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
      // At the CSS scale; the transform takes it to the canvas's pixels.
      const viewport = this.pageViewport(page, this.scaledValue());
      const box = pageBox(viewport.width, viewport.height, this.dpr());

      const container = this.scrollContainer()?.nativeElement;
      if (!container) return;

      const canvas = container.querySelector(
        `canvas[data-page="${pageNumber}"]`,
      ) as HTMLCanvasElement;
      if (!canvas || !box.width || !box.height) return;

      canvas.width = box.canvasWidth;
      canvas.height = box.canvasHeight;

      // Annotations that draw on their own canvas get it here, and the
      // annotation layer puts it in place.
      const annotationCanvasMap = new Map<string, HTMLCanvasElement>();
      const renderTask = page.render({
        ...this.renderParams(),
        canvas,
        viewport,
        transform: [
          box.canvasWidth / box.width,
          0,
          0,
          box.canvasHeight / box.height,
          0,
          0,
        ],
        annotationCanvasMap,
      } as Parameters<PDFPageProxy['render']>[0]);

      this.activeRenderTasks.set(pageNumber, renderTask);

      await renderTask.promise;
      this.activeRenderTasks.delete(pageNumber);
      this.pdfViewer.scheduleCleanup();

      // The previous detail was drawn at the previous scale.
      this.detail.reset(
        pageNumber,
        container.querySelector(`canvas[data-detail-page="${pageNumber}"]`),
      );
      if (box.restricted) {
        this.restrictedPages.add(pageNumber);
        this.updateDetail(pageNumber);
      } else {
        this.restrictedPages.delete(pageNumber);
      }

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
        this.textSelection.remove(textLayerDiv);
        textLayerDiv.innerHTML = '';
        const scale = this.scaledValue();
        const displayViewport = this.pageViewport(page, scale);
        textLayerDiv.style.setProperty('--total-scale-factor', String(scale));
        setLayerDimensions(textLayerDiv, displayViewport);
        // With its marked content, which the structure tree refers to.
        const textContent = await page.getTextContent({
          includeMarkedContent: true,
        });
        const textLayer = new TextLayer({
          textContentSource: textContent,
          container: textLayerDiv,
          viewport: displayViewport,
        });
        this.activeTextLayers.set(pageNumber, textLayer);
        await textLayer.render();
        this.activeTextLayers.delete(pageNumber);
        // Selecting by dragging behaves as in pdf.js.
        this.textSelection.add(textLayerDiv);
        await this.renderStructTree(page, canvas, textLayerDiv);

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
        const annotationLayer = container.querySelector<HTMLDivElement>(
          `[data-annotationlayer-page="${pageNumber}"]`,
        );
        if (annotationLayer) {
          await renderAnnotationLayer({
            div: annotationLayer,
            page,
            viewport: this.pageViewport(page, this.scaledValue()),
            scale: this.scaledValue(),
            textLayer: textLayerDiv,
            textData: this.textLayerData.get(pageNumber),
            annotationCanvasMap,
            structTree: this.structTree(page),
            linkService: this.linkService,
            viewer: this.pdfViewer,
          });
        }
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

  /** A page's structure tree (built once per page of a document). */
  private structTree(page: PDFPageProxy): ScPdfStructTree {
    let tree = this.structTrees.get(page);
    if (!tree) {
      const { rawDims } = page.getViewport({ scale: 1 }) as unknown as {
        rawDims: ConstructorParameters<typeof ScPdfStructTree>[1];
      };
      tree = new ScPdfStructTree(page, rawDims);
      this.structTrees.set(page, tree);
    }
    return tree;
  }

  /**
   * A tagged page's structure (headings, lists, tables, figures…) for
   * assistive technology: inside its canvas, as pdf.js's viewer does,
   * owning the text layer's text.
   */
  private async renderStructTree(
    page: PDFPageProxy,
    canvas: HTMLCanvasElement,
    textLayer: HTMLElement,
  ): Promise<void> {
    const tree = this.structTree(page);
    const dom = await tree.render();
    for (const old of Array.from(canvas.children)) {
      if (old !== dom) old.remove();
    }
    if (!dom) return;
    tree.updateTextLayer(textLayer);
    if (dom.parentNode !== canvas) canvas.append(dom);
  }

  /** The page at `scale`, turned by its own rotation plus the viewer's. */
  private pageViewport(page: PDFPageProxy, scale: number): PageViewport {
    return page.getViewport({
      scale,
      rotation: (page.rotate + this.rotation()) % 360,
    });
  }

  /** What page.render draws, besides the canvas, viewport and transform. */
  private renderParams(): object {
    // Form fields are drawn by the annotation layer (as HTML), not here —
    // unless they can't be filled in (then they're drawn, read-only).
    const optionalContent = this.pdfViewer.optionalContent();
    return {
      annotationMode: this.pdfViewer.canFillForms()
        ? AnnotationMode.ENABLE_FORMS
        : AnnotationMode.ENABLE,
      // High contrast mode, or the consumer's colours.
      pageColors: this.pdfViewer.appliedPageColors(),
      // The layers as shown / hidden in the viewer.
      ...(optionalContent && {
        optionalContentConfigPromise: Promise.resolve(optionalContent),
      }),
    };
  }

  /**
   * Draws, sharp, the visible part of a page whose canvas is drawn below
   * the screen's density (high zoom) — again as the page is scrolled.
   */
  private async updateDetail(pageNumber: number): Promise<void> {
    const doc = this.pdfDocument();
    const container = this.scrollContainer()?.nativeElement;
    const pageEl = container?.querySelector<HTMLElement>(
      `div[data-page="${pageNumber}"]`,
    );
    const canvas = container?.querySelector<HTMLCanvasElement>(
      `canvas[data-detail-page="${pageNumber}"]`,
    );
    if (!doc || !container || !pageEl || !canvas) return;
    const view = container.getBoundingClientRect();
    const box = pageEl.getBoundingClientRect();
    const visible = {
      minX: Math.max(0, view.left - box.left),
      minY: Math.max(0, view.top - box.top),
      maxX: Math.min(box.width, view.right - box.left),
      maxY: Math.min(box.height, view.bottom - box.top),
    };
    if (visible.maxX <= visible.minX || visible.maxY <= visible.minY) return;
    const page = await doc.getPage(pageNumber);
    if (!this.restrictedPages.has(pageNumber)) return;
    const drawn = await this.detail.update(
      page,
      canvas,
      visible,
      this.pageViewport(page, this.scaledValue()),
      this.dpr(),
      this.renderParams(),
    );
    if (drawn) this.pdfViewer.scheduleCleanup();
  }

  /** On scroll: the detail of the pages that have one, once a frame. */
  private readonly onScroll = (): void => {
    if (this.detailFrame || this.restrictedPages.size === 0) return;
    this.detailFrame = requestAnimationFrame(() => {
      this.detailFrame = 0;
      for (const pageNumber of this.restrictedPages) {
        this.updateDetail(pageNumber);
      }
    });
  };

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

  private cancelAllRenderTasks(): void {
    for (const [, task] of this.activeRenderTasks) {
      task.cancel();
    }
    this.activeRenderTasks.clear();
    for (const [, layer] of this.activeTextLayers) {
      layer.cancel();
    }
    this.activeTextLayers.clear();
    // Detail canvases stay shown until their page is drawn again.
    this.detail.resetAll();
    this.restrictedPages.clear();
  }

  private applyHighlights(
    allMatches: ScPdfPageMatchInfo[],
    highlightAll: boolean,
    currentMatchIndex: number,
  ): void {
    const hasCurrent = highlightMatches(
      this.textLayerData,
      allMatches,
      highlightAll,
      currentMatchIndex,
    );
    // Scroll the current match into view.
    if (hasCurrent) {
      setTimeout(() => {
        this.scrollContainer()
          ?.nativeElement.querySelector<HTMLElement>('.highlight.selected')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  }

  protected pageAriaLabel(page: number): string | null {
    const name = this.pageName();
    return name ? name(page, this.pdfViewer.pageLabel(page)) : null;
  }
}
