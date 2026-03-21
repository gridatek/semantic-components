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

    this.destroyRef.onDestroy(() => {
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
      await this.renderAnnotationLayer(page, pageNumber, container);
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
}
