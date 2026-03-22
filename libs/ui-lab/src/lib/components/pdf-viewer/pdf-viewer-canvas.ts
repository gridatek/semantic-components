import {
  ChangeDetectionStrategy,
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
import { cn } from '@semantic-components/ui';
import type { PDFPageProxy, RenderTask } from 'pdfjs-dist';
import { AnnotationLayer, TextLayer, setLayerDimensions } from 'pdfjs-dist';
import type { ScPdfViewerRoot } from './pdf-viewer-root';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/**
 * Minimal link service for AnnotationLayer — handles external URLs
 * and internal page navigation without importing pdf_viewer.mjs.
 */
class MinimalLinkService {
  externalLinkEnabled = true;

  constructor(private viewer: ScPdfViewerRoot) {}

  addLinkAttributes(
    link: HTMLAnchorElement,
    url: string,
    newWindow = false,
  ): void {
    if (this.externalLinkEnabled) {
      link.href = link.title = url;
    } else {
      link.href = '';
      link.title = `Disabled: ${url}`;
      link.onclick = () => false;
    }
    link.target = newWindow ? '_blank' : '_blank';
    link.rel = 'noopener noreferrer nofollow';
  }

  getDestinationHash(dest: unknown): string {
    if (typeof dest === 'string' && dest.length > 0) {
      return '#' + escape(dest);
    }
    if (Array.isArray(dest)) {
      return '#' + escape(JSON.stringify(dest));
    }
    return '';
  }

  getAnchorUrl(anchor: string): string {
    return anchor;
  }

  async goToDestination(dest: unknown): Promise<void> {
    const doc = this.viewer.pdfDocument();
    if (!doc) return;

    let explicitDest: unknown[];
    if (typeof dest === 'string') {
      explicitDest = (await doc.getDestination(dest)) as unknown[];
    } else {
      explicitDest = dest as unknown[];
    }

    if (!Array.isArray(explicitDest)) return;

    const [destRef] = explicitDest;
    let pageNumber: number | undefined;

    if (destRef && typeof destRef === 'object') {
      try {
        pageNumber =
          (await doc.getPageIndex(destRef as { num: number; gen: number })) + 1;
      } catch {
        return;
      }
    } else if (typeof destRef === 'number') {
      pageNumber = destRef + 1;
    }

    if (pageNumber && pageNumber >= 1) {
      this.viewer.goToPage(pageNumber);
    }
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
    }
  }

  executeSetOCGState(): void {
    // Not supported
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
      class="h-full w-full overflow-auto"
      role="document"
      tabindex="0"
    >
      @for (page of pageLayouts(); track page.pageNumber) {
        <div
          class="bg-background relative mx-auto mb-2 shadow-sm"
          [attr.data-page]="page.pageNumber"
          [style.width.px]="page.width * scaledValue()"
          [style.height.px]="page.height * scaledValue()"
          [style.transform]="'rotate(' + rotation() + 'deg)'"
          [style.transform-origin]="'center center'"
        >
          <canvas
            [attr.data-page]="page.pageNumber"
            [style.width.px]="page.width * scaledValue()"
            [style.height.px]="page.height * scaledValue()"
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
            class="editorLayer absolute inset-0 z-[5]"
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
  `,
  host: {
    'data-slot': 'pdf-viewer-canvas',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private readonly dpr =
    typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  readonly pageLayouts = signal<PageLayout[]>([]);

  private readonly pdfDocument = this.pdfViewer.pdfDocument;
  readonly rotation = this.pdfViewer.rotation;
  private readonly zoom = this.pdfViewer.zoom;
  private readonly navigateTrigger = this.pdfViewer.navigateTrigger;
  private readonly findTrigger = this.pdfViewer.findTrigger;

  private readonly linkService = new MinimalLinkService(this.pdfViewer);

  private activeRenderTasks = new Map<number, RenderTask>();
  private activeTextLayers = new Map<number, TextLayer>();
  private renderedPages = new Set<number>();
  private textLayerData = new Map<
    number,
    { divs: HTMLElement[]; texts: string[] }
  >();
  private observer: IntersectionObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private renderTimeout: ReturnType<typeof setTimeout> | null = null;
  private scrollHandler: (() => void) | null = null;

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
    return mode !== 'none' ? 'auto' : 'none';
  });

  readonly editorCursor = computed(() => {
    const mode = this.editorMode();
    if (mode === 'highlight') return 'text';
    if (mode === 'freetext') return 'text';
    if (mode === 'ink') return 'crosshair';
    return 'default';
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
    const containerWidth = size.width - 32;
    const firstPage = layouts[0];
    if (z === 'page-actual') {
      return 1;
    }
    if (z === 'page-width') {
      return containerWidth / firstPage.width;
    }
    if (z === 'page-fit') {
      const containerHeight = size.height - 16;
      const scaleW = containerWidth / firstPage.width;
      const scaleH = containerHeight / firstPage.height;
      return Math.min(scaleW, scaleH);
    }
    // 'auto'
    const fitWidth = containerWidth / firstPage.width;
    return Math.min(fitWidth, 1.5);
  });

  constructor() {
    afterNextRender(() => {
      this.setupResizeObserver();
      this.setupIntersectionObserver();
    });

    // When PDF document loads, compute page layouts
    effect(() => {
      const doc = this.pdfDocument();
      if (doc) {
        this.computePageLayouts(doc.numPages);
      }
    });

    // Re-render when zoom or rotation changes
    effect(() => {
      this.scaledValue();
      this.rotation();
      const layouts = this.pageLayouts();

      if (layouts.length > 0) {
        this.renderedPages.clear();
        this.cancelAllRenderTasks();
        this.scheduleRender();
      }
    });

    // Navigate to page when navigateTrigger changes
    effect(() => {
      this.navigateTrigger();
      const page = untracked(() => this.pdfViewer.currentPage());

      setTimeout(() => {
        const container = this.scrollContainer()?.nativeElement;
        if (!container) return;
        const pageEl = container.querySelector(
          `[data-page="${page}"]`,
        ) as HTMLElement;
        if (pageEl) {
          pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
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
      document.addEventListener('keydown', this.onAnnotationKeyDown);
    });

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('mouseup', this.onHighlightMouseUp);
      document.removeEventListener('pointermove', this.onGlobalPointerMove);
      document.removeEventListener('pointerup', this.onGlobalPointerUp);
      document.removeEventListener('keydown', this.onAnnotationKeyDown);
      this.observer?.disconnect();
      this.resizeObserver?.disconnect();
      this.cancelAllRenderTasks();
      if (this.renderTimeout) {
        clearTimeout(this.renderTimeout);
      }
      const scrollEl = this.scrollContainer()?.nativeElement;
      if (scrollEl && this.scrollHandler) {
        scrollEl.removeEventListener('scroll', this.scrollHandler);
      }
    });
  }

  private scheduleRender(): void {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }
    // Use requestAnimationFrame + setTimeout to ensure Angular has
    // finished its render cycle and DOM elements exist
    this.renderTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        this.renderVisiblePages();
      });
    }, 0);
  }

  private async computePageLayouts(numPages: number): Promise<void> {
    const doc = this.pdfDocument();
    if (!doc) return;

    const layouts: PageLayout[] = [];
    for (let i = 1; i <= numPages; i++) {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      layouts.push({
        pageNumber: i,
        width: viewport.width,
        height: viewport.height,
      });
    }
    this.pageLayouts.set(layouts);
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

  private setupIntersectionObserver(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const pageEl = entry.target as HTMLElement;
          const pageNum = parseInt(pageEl.getAttribute('data-page') || '0', 10);

          if (entry.isIntersecting && pageNum > 0) {
            this.renderPage(pageNum);
          }
        }

        this.updateCurrentPageFromScroll(container);
      },
      {
        root: container,
        rootMargin: '100px 0px',
        threshold: [0, 0.25, 0.5, 0.75],
      },
    );

    this.scrollHandler = () => {
      this.updateCurrentPageFromScroll(container);
    };
    container.addEventListener('scroll', this.scrollHandler);
  }

  private renderVisiblePages(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    // Re-observe for future scroll-based rendering
    if (this.observer) {
      this.observer.disconnect();
      const pageElements = container.querySelectorAll(':scope > [data-page]');
      pageElements.forEach((el) => this.observer!.observe(el));
    }

    // Directly render pages that are currently visible
    const containerRect = container.getBoundingClientRect();
    const pageElements = container.querySelectorAll(':scope > [data-page]');

    pageElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible =
        rect.bottom > containerRect.top - 100 &&
        rect.top < containerRect.bottom + 100;

      if (isVisible) {
        const pageNum = parseInt(el.getAttribute('data-page') || '0', 10);
        if (pageNum > 0) {
          this.renderPage(pageNum);
        }
      }
    });
  }

  private updateCurrentPageFromScroll(container: HTMLElement): void {
    const pageElements = container.querySelectorAll(':scope > [data-page]');
    let mostVisiblePage = 1;
    let maxVisibleArea = 0;

    const containerRect = container.getBoundingClientRect();

    pageElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, containerRect.top);
      const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);

      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        mostVisiblePage = parseInt(el.getAttribute('data-page') || '1', 10);
      }
    });

    if (
      mostVisiblePage !== this.pdfViewer.currentPage() &&
      maxVisibleArea > 0
    ) {
      this.pdfViewer.currentPage.set(mostVisiblePage);
    }
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
      const scale = this.scaledValue() * this.dpr;
      const viewport = page.getViewport({ scale });

      const container = this.scrollContainer()?.nativeElement;
      if (!container) return;

      const canvas = container.querySelector(
        `canvas[data-page="${pageNumber}"]`,
      ) as HTMLCanvasElement;
      if (!canvas) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderTask = page.render({
        canvas,
        viewport,
      });

      this.activeRenderTasks.set(pageNumber, renderTask);

      await renderTask.promise;
      this.activeRenderTasks.delete(pageNumber);

      // Render text layer for text selection
      const textLayerDiv = container.querySelector(
        `[data-textlayer-page="${pageNumber}"]`,
      ) as HTMLDivElement;
      if (textLayerDiv) {
        textLayerDiv.innerHTML = '';
        const scale = this.scaledValue();
        const displayViewport = page.getViewport({ scale });
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
    } catch (err) {
      if ((err as { name?: string })?.name !== 'RenderingCancelledException') {
        console.error(`Error rendering page ${pageNumber}:`, err);
      }
      this.activeRenderTasks.delete(pageNumber);
      this.activeTextLayers.delete(pageNumber);
      this.renderedPages.delete(pageNumber);
    }
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
    const displayViewport = page.getViewport({ scale });

    const annotations = await page.getAnnotations();
    if (annotations.length === 0) return;

    annotationLayerDiv.style.setProperty('--total-scale-factor', String(scale));
    setLayerDimensions(annotationLayerDiv, displayViewport);

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
      annotationStorage: null,
    } as never);

    await annotationLayer.render({
      annotations,
      renderForms: false,
    } as never);
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
    allMatches: import('./pdf-viewer-types').PdfPageMatchInfo[],
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
    matchInfo: import('./pdf-viewer-types').PdfPageMatchInfo,
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

    const pageRect = pageEl.getBoundingClientRect();
    const pageW = pageRect.width;
    const pageH = pageRect.height;

    // Get all client rects from the range
    const clientRects = range.getClientRects();
    const rects: { x: number; y: number; width: number; height: number }[] = [];
    for (let i = 0; i < clientRects.length; i++) {
      const r = clientRects[i];
      rects.push({
        x: (r.left - pageRect.left) / pageW,
        y: (r.top - pageRect.top) / pageH,
        width: r.width / pageW,
        height: r.height / pageH,
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
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // Deselect annotation when clicking on the editor layer background
    this.handleEditorLayerClick(event);

    if (mode === 'freetext') {
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
        ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
      }
    }
  }

  onEditorPointerMove(event: PointerEvent, _pageNumber: number): void {
    if (!this.inkDrawing) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    this.inkCurrentStroke.push({ x, y });

    // Draw preview
    const canvas = target.querySelector(
      '.ink-preview-canvas',
    ) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
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
    annotations: import('./pdf-viewer-types').PdfEditorAnnotation[],
    scale: number,
  ): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    // Clear all existing editor annotations
    container
      .querySelectorAll('.editor-annotation')
      .forEach((el) => el.remove());

    for (const ann of annotations) {
      const editorLayer = container.querySelector(
        `[data-editorlayer-page="${ann.pageNumber}"]`,
      ) as HTMLElement;
      if (!editorLayer) continue;

      if (ann.type === 'highlight' && ann.rects) {
        for (const rect of ann.rects) {
          const div = document.createElement('div');
          div.className = 'editor-annotation editor-highlight';
          div.style.position = 'absolute';
          div.style.left = `${rect.x * 100}%`;
          div.style.top = `${rect.y * 100}%`;
          div.style.width = `${rect.width * 100}%`;
          div.style.height = `${rect.height * 100}%`;
          div.style.background = ann.color || '#FFFF00';
          div.style.opacity = String(ann.opacity ?? 0.4);
          div.style.mixBlendMode = 'multiply';
          div.style.pointerEvents = 'none';
          editorLayer.appendChild(div);
        }
      } else if (ann.type === 'freetext') {
        const div = document.createElement('div');
        div.className = 'editor-annotation editor-freetext-rendered';
        div.style.position = 'absolute';
        div.style.left = `${(ann.x ?? 0) * 100}%`;
        div.style.top = `${(ann.y ?? 0) * 100}%`;
        div.style.fontSize = `${(ann.fontSize ?? 12) * scale}px`;
        div.style.color = ann.fontColor || '#000';
        div.style.whiteSpace = 'pre-wrap';
        div.style.lineHeight = '1.2';
        div.style.pointerEvents = 'none';
        div.textContent = ann.text || '';
        editorLayer.appendChild(div);
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
  }

  private createInteractiveStamp(
    ann: import('./pdf-viewer-types').PdfEditorAnnotation,
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
          const layerRect = editorLayer.getBoundingClientRect();
          this.resizeState = {
            annotationId: ann.id,
            handle,
            startX: e.clientX,
            startY: e.clientY,
            origX: ann.x ?? 0,
            origY: ann.y ?? 0,
            origW: ann.width ?? 0.15,
            origH: ann.height ?? 0.15,
            layerW: layerRect.width,
            layerH: layerRect.height,
          };
        });

        wrapper.appendChild(h);
      }

      // Delete button
      const del = document.createElement('button');
      del.className = 'editor-stamp-delete';
      del.style.position = 'absolute';
      del.style.top = '-12px';
      del.style.right = '-12px';
      del.style.width = '22px';
      del.style.height = '22px';
      del.style.borderRadius = '50%';
      del.style.background = '#e74c3c';
      del.style.color = '#fff';
      del.style.border = '2px solid #fff';
      del.style.cursor = 'pointer';
      del.style.display = 'flex';
      del.style.alignItems = 'center';
      del.style.justifyContent = 'center';
      del.style.fontSize = '13px';
      del.style.lineHeight = '1';
      del.style.zIndex = '12';
      del.style.padding = '0';
      del.textContent = '✕';
      del.setAttribute('aria-label', 'Delete annotation');
      del.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectedAnnotationId = null;
        this.pdfViewer.removeEditorAnnotation(ann.id);
      });
      wrapper.appendChild(del);
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
      const layerRect = editorLayer.getBoundingClientRect();
      this.dragState = {
        annotationId: ann.id,
        startX: e.clientX,
        startY: e.clientY,
        origX: ann.x ?? 0,
        origY: ann.y ?? 0,
        layerW: layerRect.width,
        layerH: layerRect.height,
      };
    });

    editorLayer.appendChild(wrapper);
  }

  private readonly onGlobalPointerMove = (e: PointerEvent): void => {
    if (this.dragState) {
      const dx = (e.clientX - this.dragState.startX) / this.dragState.layerW;
      const dy = (e.clientY - this.dragState.startY) / this.dragState.layerH;
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
      const dx =
        (e.clientX - this.resizeState.startX) / this.resizeState.layerW;
      const dy =
        (e.clientY - this.resizeState.startY) / this.resizeState.layerH;
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
      const dx = (e.clientX - this.dragState.startX) / this.dragState.layerW;
      const dy = (e.clientY - this.dragState.startY) / this.dragState.layerH;
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
      const dx =
        (e.clientX - this.resizeState.startX) / this.resizeState.layerW;
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

  /** Deselect annotation when clicking outside */
  private handleEditorLayerClick(e: PointerEvent): void {
    const target = e.target as HTMLElement;
    if (this.selectedAnnotationId && !target.closest('.editor-stamp-wrapper')) {
      this.selectedAnnotationId = null;
      const annotations = this.pdfViewer.editorAnnotations();
      this.renderEditorAnnotations(annotations, this.scaledValue());
    }
  }
}
