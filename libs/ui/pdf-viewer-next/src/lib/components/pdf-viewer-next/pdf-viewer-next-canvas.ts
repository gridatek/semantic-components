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
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfViewerModule } from './pdf-viewer-next-engine';
import { ScPdfEngine, loadViewerModule } from './pdf-viewer-next-engine';
import { ScPdfViewerNextPan } from './pdf-viewer-next-pan';

/** Named zooms follow the container's size (pdf.js's `webViewerResize`). */
const FITTED_ZOOMS = new Set(['auto', 'page-fit', 'page-width']);

/**
 * The pages: pdf.js's `PDFViewer` in its container (`div.container >
 * div.pdfViewer`), as in pdf.js's viewer — rendering, text, annotation, XFA
 * and structure layers, links, forms, find highlights, scroll and spread
 * modes. Its options come from the viewer's inputs; changing one builds the
 * viewer again.
 */
@Component({
  selector: 'div[scPdfViewerNextCanvas]',
  imports: [ScPdfViewerNextPan],
  // pdf.js's buttons on the pages (its editors' toolbars) take the
  // browser's button font, as pdf.js expects — not the page layer's, which
  // Tailwind's preflight would have them inherit (\`font: inherit\`).
  template: `
    <div
      #container
      class="absolute inset-0 touch-pan-x touch-pan-y overflow-auto outline-none data-hand:cursor-grab data-idle:cursor-none data-panning:cursor-grabbing data-idle:[&_*]:cursor-none [&_.annotationEditorLayer_button]:[font:revert] data-hand:[&_.textLayer]:pointer-events-none"
      scPdfViewerNextPan
      role="document"
      [style.--comment-edit-button-icon]="commentIcon()"
      tabindex="0"
    >
      <div #viewer class="pdfViewer"></div>
    </div>
    <!-- pdf.js announces what its editors do here. -->
    <div #alert class="sr-only" role="alert"></div>
  `,
  host: {
    'data-slot': 'pdf-viewer-canvas',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerNextCanvas {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('relative block h-full w-full', this.classInput()),
  );

  private readonly container =
    viewChild.required<ElementRef<HTMLDivElement>>('container');
  private readonly viewer =
    viewChild.required<ElementRef<HTMLDivElement>>('viewer');
  private readonly alert =
    viewChild.required<ElementRef<HTMLDivElement>>('alert');

  /**
   * The icon of pdf.js's comment buttons: its application's stylesheet
   * defines it, not `pdf_viewer.css`.
   */
  private readonly commentIcon = computed(
    () =>
      `url("${this.pdfViewer.assetsUrl()}web/images/comment-editButton.svg")`,
  );

  /** pdf.js's viewer components, once loaded (in the browser only). */
  private readonly module = signal<ScPdfViewerModule | null>(null);

  /** The options pdf.js's viewer is built with. */
  private readonly options = computed(() => ({
    assetsUrl: this.pdfViewer.assetsUrl(),
    sandboxSrc: this.pdfViewer.sandboxSrc(),
    wasmSrc: this.pdfViewer.wasmSrc(),
    enableScripting: this.pdfViewer.enableScripting(),
    enableAutoLinking: this.pdfViewer.enableAutoLinking(),
    enablePermissions: this.pdfViewer.enablePermissions(),
    pageColors: this.pdfViewer.appliedPageColors(),
  }));

  constructor() {
    afterNextRender(() => {
      loadViewerModule().then((module) => {
        if (!this.destroyed) this.module.set(module);
      });
      this.watchSize();
      this.watchDevicePixelRatio();
      this.watchFocus();
    });

    // pdf.js's viewer, built again when one of its options changes.
    effect((onCleanup) => {
      const module = this.module();
      const options = this.options();
      if (!module) return;
      const engine = untracked(
        () =>
          new ScPdfEngine(module, {
            ...options,
            container: this.container().nativeElement,
            viewer: this.viewer().nativeElement,
            history: this.pdfViewer.historyAdapter,
            viewerAlert: this.alert().nativeElement,
            managers: this.pdfViewer.editorManagers,
          }),
      );
      untracked(() => this.pdfViewer.attachEngine(engine));
      const stopKeepingFocus = engine.on('pagechanging', () =>
        this.keepFocus(),
      );
      onCleanup(() => {
        stopKeepingFocus();
        this.pdfViewer.releaseEngine(engine);
        engine.destroy();
      });
    });

    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.resizeObserver?.disconnect();
      this.dprQuery?.removeEventListener('change', this.onDprChange);
    });
  }

  private destroyed = false;

  // ── Focus ───────────────────────────────────────────────────────────

  /** Focus is in the pages (the container or one of pdf.js's layers). */
  private focusInside = false;

  private watchFocus(): void {
    const container = this.container().nativeElement;
    const document = container.ownerDocument;
    const onFocusIn = (event: FocusEvent) =>
      (this.focusInside = container.contains(event.target as Node));
    document.addEventListener('focusin', onFocusIn);
    this.destroyRef.onDestroy(() =>
      document.removeEventListener('focusin', onFocusIn),
    );
  }

  /**
   * In page scroll mode (and presentation), pdf.js swaps the page shown:
   * focus in the page that left — its text layer, after a click — would
   * fall to the body, and the keys would leave the viewer. It stays in the
   * pages.
   */
  private keepFocus(): void {
    if (!this.focusInside) return;
    queueMicrotask(() => {
      const container = this.container().nativeElement;
      const active = container.ownerDocument.activeElement;
      if (!active || active === container.ownerDocument.body) {
        container.focus({ preventScroll: true });
      }
    });
  }

  // ── The container's size and the screen's density ───────────────────

  private resizeObserver: ResizeObserver | null = null;

  /** A fitted zoom fits again when the container's size changes. */
  private watchSize(): void {
    if (typeof ResizeObserver === 'undefined') return;
    this.resizeObserver = new ResizeObserver(() => {
      const viewer = this.pdfViewer.engine()?.viewer;
      if (!viewer?.pdfDocument) return;
      const value = viewer.currentScaleValue;
      if (FITTED_ZOOMS.has(value)) viewer.currentScaleValue = value;
      viewer.update();
    });
    this.resizeObserver.observe(this.container().nativeElement);
  }

  private dprQuery: MediaQueryList | null = null;
  private readonly onDprChange = (): void => {
    this.pdfViewer.engine()?.viewer.refresh();
    this.watchDevicePixelRatio();
  };

  /** Pages drawn again for the screen's density (the window moved screens). */
  private watchDevicePixelRatio(): void {
    const view = this.container().nativeElement.ownerDocument.defaultView;
    if (!view?.matchMedia) return;
    this.dprQuery?.removeEventListener('change', this.onDprChange);
    this.dprQuery = view.matchMedia(
      `(resolution: ${view.devicePixelRatio}dppx)`,
    );
    this.dprQuery.addEventListener('change', this.onDprChange);
  }
}
