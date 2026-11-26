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
import { SC_PDF_VIEWER } from './pdf-viewer';
import {
  highlightColorsOption,
  isDarkColor,
  resolveColor,
  resolvePageColors,
} from './pdf-viewer-colors';
import type { ScPdfViewerModule } from './pdf-viewer-engine';
import { ScPdfEngine, loadViewerModule } from './pdf-viewer-engine';
import { ScPdfViewerPan } from './pdf-viewer-pan';

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
  selector: 'div[scPdfViewerCanvas]',
  imports: [ScPdfViewerPan],
  template: `
    <div
      #container
      [class]="containerClass"
      scPdfViewerPan
      role="document"
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
export class ScPdfViewerCanvas {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('relative block h-full w-full', this.classInput()),
  );

  /**
   * pdf.js's scroll container. The pages' look — frame, pdf.js's toolbars on
   * them, its colours on the theme's tokens — is the stylesheet's
   * (@semantic-components/styles: pdf-viewer.css).
   */
  private readonly containerClass = cn(
    'absolute inset-0 touch-pan-x touch-pan-y overflow-auto outline-none data-hand:cursor-grab data-idle:cursor-none data-panning:cursor-grabbing data-idle:[&_*]:cursor-none data-hand:[&_.textLayer]:pointer-events-none',
  );

  private readonly container =
    viewChild.required<ElementRef<HTMLDivElement>>('container');
  private readonly viewer =
    viewChild.required<ElementRef<HTMLDivElement>>('viewer');
  private readonly alert =
    viewChild.required<ElementRef<HTMLDivElement>>('alert');

  /**
   * Each page's accessible name — your words, e.g.
   * `(page, label) => 'Report, page ' + label`. With it, the pages are named
   * regions (landmarks); without it, they aren't.
   *
   * pdf.js's viewer makes every page a landmark named "Page N". The library
   * doesn't by default: a page with two viewers, or a document whose labels
   * repeat its numbers, gets landmarks with the same name (which screen
   * readers can't tell apart, and axe's `landmark-unique` rejects), and a
   * long document floods the landmark list. Name them when your page has one
   * viewer, or with something that tells the viewers apart (the document's
   * title).
   */
  readonly pageName = input<((page: number, label: string) => string) | null>(
    null,
  );

  /** pdf.js's pages are there (or changed): they're named again. */
  private readonly pagesShown = signal(0);

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
      this.watchPageNames();
    });

    // pdf.js's viewer, built again when one of its options changes.
    effect((onCleanup) => {
      const module = this.module();
      const options = this.options();
      if (!module) return;
      const engine = untracked(() => {
        const container = this.container().nativeElement;
        // The theme's colours, as real colours; dark pages show the
        // highlights' dark side (see pdf-viewer-colors.ts).
        const pageColors = resolvePageColors(options.pageColors, container);
        const background =
          pageColors && resolveColor(pageColors.background, container, 'shown');
        const pagesDark = !!background && isDarkColor(background);
        return new ScPdfEngine(module, {
          ...options,
          pageColors,
          pagesDark,
          highlightColors: highlightColorsOption(container, pagesDark),
          container,
          viewer: this.viewer().nativeElement,
          history: this.pdfViewer.historyAdapter,
          viewerAlert: this.alert().nativeElement,
          managers: this.pdfViewer.editorManagers,
        });
      });
      untracked(() => this.pdfViewer.attachEngine(engine));
      const stopKeepingFocus = engine.on('pagechanging', () =>
        this.keepFocus(),
      );
      // New page views: when laid out, rendered (a cut page pasted is a
      // clone), and moved.
      const shown = () => this.pagesShown.update((count) => count + 1);
      const stopNaming = [
        engine.on('pagesinit', shown),
        engine.on('pagerendered', shown),
        engine.on('pagesedited', shown),
      ];
      onCleanup(() => {
        stopKeepingFocus();
        stopNaming.forEach((stop) => stop());
        this.pdfViewer.releaseEngine(engine);
        void engine.destroy();
      });
    });

    // The pages' names: yours, or none (see `pageName`).
    effect(() => {
      this.pagesShown();
      this.pdfViewer.pageEdits();
      this.pdfViewer.pageLabels();
      const name = this.pageName();
      const engine = this.pdfViewer.engine();
      if (engine) untracked(() => this.namePages(engine, name));
    });

    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.resizeObserver?.disconnect();
      this.dprQuery?.removeEventListener('change', this.onDprChange);
    });
  }

  private destroyed = false;

  /** pdf.js named a page (its translation, later): ours again. */
  private watchPageNames(): void {
    const view = this.viewer().nativeElement.ownerDocument.defaultView;
    if (!view?.MutationObserver) return;
    const observer = new view.MutationObserver((records) => {
      if (
        records.some((record) =>
          (record.target as Element).classList?.contains('page'),
        )
      ) {
        this.pagesShown.update((count) => count + 1);
      }
    });
    observer.observe(this.viewer().nativeElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-label', 'role'],
    });
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  /**
   * Names pdf.js's pages with `pageName`, or takes their landmark role and
   * name off. pdf.js translates its name into them later (and again when a
   * label changes): `watchPageNames` puts ours back then.
   */
  private namePages(
    engine: ScPdfEngine,
    name: ((page: number, label: string) => string) | null,
  ): void {
    const viewer = engine.viewer;
    for (let index = 0; index < viewer.pagesCount; index++) {
      const div = viewer.getPageView(index)?.div as HTMLElement | undefined;
      if (!div) continue;
      const page = index + 1;
      const label = name ? name(page, this.pdfViewer.pageLabel(page)) : null;
      // Only what differs: the observer below sees these changes too.
      if (div.getAttribute('aria-label') !== label) {
        if (label === null) div.removeAttribute('aria-label');
        else div.setAttribute('aria-label', label);
      }
      const role = name ? 'region' : null;
      if (div.getAttribute('role') !== role) {
        if (role === null) div.removeAttribute('role');
        else div.setAttribute('role', role);
      }
    }
  }

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
