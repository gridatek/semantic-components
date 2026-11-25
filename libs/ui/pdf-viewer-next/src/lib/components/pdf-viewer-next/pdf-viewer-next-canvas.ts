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
 * The library's page frame, in place of pdf.js's (a 9px transparent border
 * its application draws a shadow image in): pages 8px apart and from the
 * edges, on the theme's background, with a small shadow. In forced colours,
 * pdf.js's outline stays.
 */
const PAGE_FRAME = cn(
  '[--page-margin:8px_auto_0] [--page-border:0_solid_transparent] [--pdfViewer-padding-bottom:8px] [--spreadHorizontalWrapped-margin-LR:4px] [--page-bg-color:var(--background)] [&_.page]:shadow-sm',
  'forced-colors:[--page-border:1px_solid_CanvasText] forced-colors:[&_.page]:shadow-none',
);

/**
 * pdf.js's toolbars on the pages — its editors' (colour picker included),
 * the alt-text button and tooltip, the comment buttons — in the theme's
 * colours and radius, as a popover. pdf.js sets these variables on its
 * elements, unlayered: only important declarations override them. Not in
 * forced colours, where pdf.js's system colours stay.
 */
const PDFJS_THEME = cn(
  'not-forced-colors:[&_.editToolbar]:[--editor-toolbar-bg-color:var(--popover)]! not-forced-colors:[&_.editToolbar]:[--editor-toolbar-fg-color:var(--popover-foreground)]! not-forced-colors:[&_.editToolbar]:[--editor-toolbar-border-color:var(--border)]! not-forced-colors:[&_.editToolbar]:[--editor-toolbar-hover-border-color:var(--border)]! not-forced-colors:[&_.editToolbar]:[--editor-toolbar-hover-bg-color:var(--accent)]! not-forced-colors:[&_.editToolbar]:[--editor-toolbar-hover-fg-color:var(--accent-foreground)]! not-forced-colors:[&_.editToolbar]:[--editor-toolbar-focus-outline-color:var(--ring)]! not-forced-colors:[&_.editToolbar]:[--editor-toolbar-shadow:0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]!',
  'not-forced-colors:[&_.editToolbar]:[--alt-text-done-color:var(--popover-foreground)]! not-forced-colors:[&_.editToolbar]:[--alt-text-warning-color:var(--primary)]! not-forced-colors:[&_.editToolbar_*]:[--alt-text-tooltip-bg:var(--popover)]! not-forced-colors:[&_.editToolbar_*]:[--alt-text-tooltip-fg:var(--popover-foreground)]! not-forced-colors:[&_.editToolbar_*]:[--alt-text-tooltip-border:var(--border)]!',
  'not-forced-colors:[&_.colorPicker]:[--selected-outline-color:var(--ring)]! not-forced-colors:[&_.colorPicker]:[--hover-outline-color:var(--ring)]! not-forced-colors:[&_.colorPicker]:[--swatch-border-color:var(--border)]!',
  'not-forced-colors:[&_.annotationCommentButton]:[--comment-button-bg:var(--popover)]! not-forced-colors:[&_.annotationCommentButton]:[--comment-button-fg:var(--popover-foreground)]! not-forced-colors:[&_.annotationCommentButton]:[--comment-button-border-color:var(--border)]! not-forced-colors:[&_.annotationCommentButton]:[--comment-button-hover-bg:var(--accent)]! not-forced-colors:[&_.annotationCommentButton]:[--comment-button-hover-fg:var(--accent-foreground)]! not-forced-colors:[&_.annotationCommentButton]:[--comment-button-active-bg:var(--primary)]! not-forced-colors:[&_.annotationCommentButton]:[--comment-button-active-fg:var(--primary-foreground)]! not-forced-colors:[&_.annotationCommentButton]:[--comment-button-selected-bg:var(--primary)]! not-forced-colors:[&_.annotationCommentButton]:[--comment-button-selected-fg:var(--primary-foreground)]! not-forced-colors:[&_.annotationCommentButton]:[--comment-button-focus-outline-color:var(--ring)]!',
  '[&_.editToolbar]:rounded-md! [&_.editToolbar_.dropdown]:rounded-md!',
);

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
  template: `
    <div
      #container
      [class]="containerClass"
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

  /** pdf.js's scroll container: its frame and theme for pdf.js's pages. */
  private readonly containerClass = cn(
    'absolute inset-0 touch-pan-x touch-pan-y overflow-auto outline-none data-hand:cursor-grab data-idle:cursor-none data-panning:cursor-grabbing data-idle:[&_*]:cursor-none data-hand:[&_.textLayer]:pointer-events-none',
    // pdf.js's buttons on the pages take the browser's button font, as
    // pdf.js expects — not the page layer's, which Tailwind's preflight
    // would have them inherit (`font: inherit`).
    '[&_.annotationEditorLayer_button]:[font:revert]',
    PAGE_FRAME,
    PDFJS_THEME,
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
        engine.destroy();
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

  /**
   * Names pdf.js's pages with `pageName`, or takes their landmark role and
   * name off. pdf.js's words for the name go: they would come back.
   */
  private namePages(
    engine: ScPdfEngine,
    name: ((page: number, label: string) => string) | null,
  ): void {
    const viewer = engine.viewer;
    for (let index = 0; index < viewer.pagesCount; index++) {
      const div = viewer.getPageView(index)?.div as HTMLElement | undefined;
      if (!div) continue;
      div.removeAttribute('data-l10n-id');
      div.removeAttribute('data-l10n-args');
      const page = index + 1;
      if (name) {
        div.setAttribute('role', 'region');
        div.setAttribute(
          'aria-label',
          name(page, this.pdfViewer.pageLabel(page)),
        );
      } else {
        div.removeAttribute('role');
        div.removeAttribute('aria-label');
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
