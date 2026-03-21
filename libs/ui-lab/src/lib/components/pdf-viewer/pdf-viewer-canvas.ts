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
import { TextLayer, setLayerDimensions } from 'pdfjs-dist';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

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

  private activeRenderTasks = new Map<number, RenderTask>();
  private activeTextLayers = new Map<number, TextLayer>();
  private renderedPages = new Set<number>();
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
        const displayViewport = page.getViewport({
          scale: this.scaledValue(),
        });
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
}
