import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  afterRenderEffect,
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
  AnnotationLayer,
  AnnotationMode,
  TextLayer,
  XfaLayer,
  setLayerDimensions,
} from 'pdfjs-dist';
import type { ScPdfViewer } from './pdf-viewer';
import { SC_PDF_VIEWER } from './pdf-viewer';
import { ScPdfViewerAnnotationToolbar } from './pdf-viewer-annotation-toolbar';
import { inferLinkAnnotations } from './pdf-viewer-autolink';
import { ScPdfViewerCommentMarker } from './pdf-viewer-comment-marker';
import { ScPdfStructTree } from './pdf-viewer-struct-tree';
import { ScPdfTextSelection } from './pdf-viewer-text-selection';
import type { ScPdfComment, ScPdfEditorAnnotation } from './pdf-viewer-types';

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

  constructor(private viewer: ScPdfViewer) {}

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
  get eventBus(): ScPdfViewer['scripting']['eventBus'] {
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

  /** A file attachment annotation's content, loaded when it's opened. */
  async getAttachmentContent(id: string): Promise<Uint8Array | null> {
    try {
      return (
        (await this.viewer.pdfDocument()?.getAttachmentContent(id)) ?? null
      );
    } catch {
      return null;
    }
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
    this.viewer.applyLayerState(action);
  }
}

interface PageLayout {
  pageNumber: number;
  width: number;
  height: number;
}

@Component({
  selector: 'sc-pdf-viewer-canvas',
  imports: [NgTemplateOutlet],
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
                [attr.role]="pageName() ? 'region' : null"
                [attr.aria-label]="pageAriaLabel(page.pageNumber)"
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
                  #layer
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
                  (pointermove)="onEditorPointerMove($event)"
                  (pointerup)="onEditorPointerUp($event)"
                >
                  @for (
                    annotation of annotationsOn(page.pageNumber);
                    track annotation.id
                  ) {
                    @if (annotation.type === 'highlight') {
                      @if (pdfViewer.highlightShowAll()) {
                        @for (rect of annotation.rects; track $index) {
                          <div
                            data-annotation
                            class="data-selected:outline-ring pointer-events-auto absolute cursor-pointer rounded-xs mix-blend-multiply outline-offset-1 data-selected:outline-2"
                            [attr.data-selected]="
                              isSelected(annotation) || null
                            "
                            [style.left.%]="rect.x * 100"
                            [style.top.%]="rect.y * 100"
                            [style.width.%]="rect.width * 100"
                            [style.height.%]="rect.height * 100"
                            [style.background-color]="annotation.color"
                            [style.opacity]="annotation.opacity ?? 0.4"
                            (pointerdown)="select($event, annotation)"
                          ></div>
                        }
                        @if (
                          isSelected(annotation) && annotation.rects?.[0];
                          as first
                        ) {
                          <div
                            data-annotation
                            class="pointer-events-auto absolute z-20 -translate-y-full pb-1.5"
                            [style.left.%]="first.x * 100"
                            [style.top.%]="first.y * 100"
                          >
                            <ng-container
                              [ngTemplateOutlet]="
                                annotationToolbar()?.templateRef ?? null
                              "
                              [ngTemplateOutletContext]="{
                                $implicit: annotation,
                              }"
                            />
                          </div>
                        }
                      }
                    } @else if (annotation.type === 'ink') {
                      <svg
                        class="pointer-events-none absolute inset-0 size-full overflow-visible"
                        viewBox="0 0 1 1"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        @for (stroke of annotation.strokes; track $index) {
                          <polyline
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            vector-effect="non-scaling-stroke"
                            [attr.points]="points(stroke)"
                            [attr.stroke]="annotation.color"
                            [attr.stroke-width]="
                              (annotation.strokeWidth ?? 1) * scaledValue()
                            "
                            [attr.stroke-opacity]="annotation.opacity ?? 1"
                          />
                        }
                      </svg>
                    } @else if (annotation.type === 'freetext') {
                      <div
                        data-annotation
                        tabindex="0"
                        class="data-selected:outline-ring pointer-events-auto absolute z-[5] cursor-move outline-offset-2 data-selected:z-10 data-selected:outline-2"
                        [attr.data-selected]="isSelected(annotation) || null"
                        [style.left.%]="position(annotation).x * 100"
                        [style.top.%]="position(annotation).y * 100"
                        (pointerdown)="
                          onAnnotationPointerDown($event, annotation, layer)
                        "
                        (dblclick)="editText($event, annotation)"
                      >
                        <div
                          data-text
                          class="px-1 py-0.5 leading-[1.2] whitespace-pre-wrap select-none data-editing:cursor-text data-editing:outline-none data-editing:select-text"
                          [attr.data-editing]="
                            editingText() === annotation.id || null
                          "
                          [attr.contenteditable]="
                            editingText() === annotation.id
                              ? 'plaintext-only'
                              : null
                          "
                          [style.font-size.px]="
                            (annotation.fontSize ?? 14) * scaledValue()
                          "
                          [style.color]="annotation.fontColor"
                          [textContent]="annotation.text"
                          (blur)="commitText($event, annotation)"
                          (keydown)="onTextKeydown($event, annotation)"
                        ></div>
                        @if (isSelected(annotation)) {
                          <div class="absolute top-full left-0 z-20 mt-1.5">
                            <ng-container
                              [ngTemplateOutlet]="
                                annotationToolbar()?.templateRef ?? null
                              "
                              [ngTemplateOutletContext]="{
                                $implicit: annotation,
                              }"
                            />
                          </div>
                        }
                      </div>
                    } @else if (annotation.imageDataUrl) {
                      <div
                        data-annotation
                        tabindex="0"
                        class="data-selected:outline-ring pointer-events-auto absolute z-[5] cursor-move outline-offset-2 data-selected:z-10 data-selected:outline-2"
                        [attr.data-selected]="isSelected(annotation) || null"
                        [attr.role]="imageName(annotation) ? 'img' : null"
                        [attr.aria-label]="imageName(annotation)"
                        [style.left.%]="position(annotation).x * 100"
                        [style.top.%]="position(annotation).y * 100"
                        [style.width.%]="position(annotation).width * 100"
                        (pointerdown)="
                          onAnnotationPointerDown($event, annotation, layer)
                        "
                      >
                        <img
                          alt=""
                          draggable="false"
                          class="pointer-events-none block w-full select-none"
                          [src]="annotation.imageDataUrl"
                        />
                        @if (isSelected(annotation)) {
                          @for (handle of handles; track handle.corner) {
                            <div
                              class="bg-ring absolute z-[11] size-2.5 rounded-xs border border-white"
                              [class]="handle.class"
                              (pointerdown)="
                                startResize(
                                  $event,
                                  annotation,
                                  handle.corner,
                                  layer
                                )
                              "
                            ></div>
                          }
                          <div class="absolute top-full left-0 z-20 mt-1.5">
                            <ng-container
                              [ngTemplateOutlet]="
                                annotationToolbar()?.templateRef ?? null
                              "
                              [ngTemplateOutletContext]="{
                                $implicit: annotation,
                              }"
                            />
                          </div>
                        }
                      </div>
                    }
                  }

                  <!-- The ink stroke being drawn. -->
                  @if (inkStroke(); as stroke) {
                    @if (stroke.page === page.pageNumber) {
                      <svg
                        class="pointer-events-none absolute inset-0 size-full overflow-visible"
                        viewBox="0 0 1 1"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <polyline
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          vector-effect="non-scaling-stroke"
                          [attr.points]="points(stroke.points)"
                          [attr.stroke]="pdfViewer.inkColor()"
                          [attr.stroke-width]="
                            pdfViewer.inkThickness() * scaledValue()
                          "
                          [attr.stroke-opacity]="pdfViewer.inkOpacity()"
                        />
                      </svg>
                    }
                  }

                  <!-- The text annotation being written (the text tool). -->
                  @if (textDraft(); as draft) {
                    @if (draft.page === page.pageNumber) {
                      <div
                        data-annotation
                        data-text-draft
                        contenteditable="plaintext-only"
                        class="outline-ring bg-background/80 pointer-events-auto absolute z-10 min-h-[1em] min-w-5 px-1 py-0.5 leading-[1.2] whitespace-pre-wrap outline-2"
                        [style.left.%]="draft.x * 100"
                        [style.top.%]="draft.y * 100"
                        [style.font-size.px]="
                          pdfViewer.freetextSize() * scaledValue()
                        "
                        [style.color]="pdfViewer.freetextColor()"
                        (pointerdown)="$event.stopPropagation()"
                        (blur)="commitDraft($event)"
                        (keydown)="onDraftKeydown($event)"
                      ></div>
                    }
                  }

                  <!-- Comment markers (yours). -->
                  @for (
                    entry of commentsOn(page.pageNumber);
                    track entry.comment.id
                  ) {
                    <div
                      data-annotation
                      class="pointer-events-auto absolute z-[6] -translate-x-1/2 -translate-y-1/2"
                      [style.left.%]="entry.comment.x * 100"
                      [style.top.%]="entry.comment.y * 100"
                      (pointerdown)="$event.stopPropagation()"
                    >
                      <ng-container
                        [ngTemplateOutlet]="
                          commentMarker()?.templateRef ?? null
                        "
                        [ngTemplateOutletContext]="{
                          $implicit: entry.comment,
                          index: entry.index,
                          active:
                            entry.comment.id === pdfViewer.activeCommentId(),
                          pending: false,
                        }"
                      />
                    </div>
                  }
                  @if (pdfViewer.pendingComment(); as pending) {
                    @if (pending.pageNumber === page.pageNumber) {
                      <div
                        data-annotation
                        class="pointer-events-auto absolute z-[6] -translate-x-1/2 -translate-y-1/2"
                        [style.left.%]="pending.x * 100"
                        [style.top.%]="pending.y * 100"
                        (pointerdown)="$event.stopPropagation()"
                      >
                        <ng-container
                          [ngTemplateOutlet]="
                            commentMarker()?.templateRef ?? null
                          "
                          [ngTemplateOutletContext]="{
                            $implicit: null,
                            index: pdfViewer.comments().length,
                            active: true,
                            pending: true,
                          }"
                        />
                      </div>
                    }
                  }
                </div>
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
  /** Drag-selecting text as in pdf.js (no jumping to the end of the page). */
  private readonly textSelection = new ScPdfTextSelection();

  private activeRenderTasks = new Map<number, RenderTask>();
  private activeTextLayers = new Map<number, TextLayer>();
  private renderedPages = new Set<number>();
  private structTrees = new WeakMap<PDFPageProxy, ScPdfStructTree>();
  private textLayerData = new Map<
    number,
    { divs: HTMLElement[]; texts: string[]; eols: boolean[] }
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

  // Annotation tools
  private readonly editorMode = this.pdfViewer.editorMode;
  /** The ink stroke being drawn, shown as it's drawn. */
  protected readonly inkStroke = signal<{
    page: number;
    points: { x: number; y: number }[];
  } | null>(null);
  /** A text annotation being written (the text tool's click). */
  protected readonly textDraft = signal<{
    page: number;
    x: number;
    y: number;
  } | null>(null);
  /** The text annotation being edited (double-click), or null. */
  protected readonly editingText = signal<string | null>(null);
  /** A move / resize in progress, shown live and committed on release. */
  protected readonly preview = signal<{
    id: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
  } | null>(null);

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

  /** The resize handles of a selected image. */
  protected readonly handles = [
    { corner: 'nw', class: '-top-1.5 -left-1.5 cursor-nwse-resize' },
    { corner: 'ne', class: '-top-1.5 -right-1.5 cursor-nesw-resize' },
    { corner: 'sw', class: '-bottom-1.5 -left-1.5 cursor-nesw-resize' },
    { corner: 'se', class: '-right-1.5 -bottom-1.5 cursor-nwse-resize' },
  ];

  /** The annotations of each page. */
  private readonly annotationsByPage = computed(() => {
    const byPage = new Map<number, ScPdfEditorAnnotation[]>();
    for (const annotation of this.pdfViewer.editorAnnotations()) {
      const list = byPage.get(annotation.pageNumber) ?? [];
      list.push(annotation);
      byPage.set(annotation.pageNumber, list);
    }
    return byPage;
  });

  /** The comments of each page, with their position in the list. */
  private readonly commentsByPage = computed(() => {
    const byPage = new Map<
      number,
      { comment: ScPdfComment; index: number }[]
    >();
    this.pdfViewer.comments().forEach((comment, index) => {
      const list = byPage.get(comment.pageNumber) ?? [];
      list.push({ comment, index });
      byPage.set(comment.pageNumber, list);
    });
    return byPage;
  });

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

    // Form fields stop taking clicks in presentation mode (and back after).
    effect(() => {
      this.pdfViewer.presenting();
      untracked(() =>
        this.scrollContainer()
          ?.nativeElement.querySelectorAll<HTMLElement>('.annotationLayer')
          .forEach((layer) => this.updatePresentationState(layer)),
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

    // Focus the text being written or edited, all of it selected.
    afterRenderEffect(() => {
      const editing = this.editingText();
      const drafting = this.textDraft();
      if (!editing && !drafting) return;
      const element =
        this.scrollContainer()?.nativeElement.querySelector<HTMLElement>(
          drafting ? '[data-text-draft]' : '[data-editing]',
        );
      if (!element || document.activeElement === element) return;
      element.focus();
      if (editing) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = document.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
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
      this.textSelection.destroy();
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
      // The structure tree, whose text goes with the text layer.
      canvas.textContent = '';
    }
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
      const optionalContent = this.pdfViewer.optionalContent();
      // Annotations that draw on their own canvas get it here, and the
      // annotation layer puts it in place.
      const annotationCanvasMap = new Map<string, HTMLCanvasElement>();
      const renderTask = page.render({
        canvas,
        viewport,
        annotationMode: AnnotationMode.ENABLE_FORMS,
        annotationCanvasMap,
        // The layers as shown / hidden in the viewer.
        ...(optionalContent && {
          optionalContentConfigPromise: Promise.resolve(optionalContent),
        }),
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
        // Which items end a line: find's page text has a "\n" after each
        // (see viewer.documentTexts), so offsets must count it.
        this.textLayerData.set(pageNumber, {
          divs: [...textLayer.textDivs],
          texts: [...textLayer.textContentItemsStr],
          eols: textContent.items
            .filter((item) => 'str' in item)
            .map((item) => 'hasEOL' in item && item.hasEOL),
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
        await this.renderAnnotationLayer(
          page,
          pageNumber,
          container,
          annotationCanvasMap,
        );
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

  /**
   * In presentation mode form fields don't take clicks — links still do
   * (as pdf.js's viewer).
   */
  private updatePresentationState(annotationLayer: HTMLElement): void {
    const presenting = this.pdfViewer.presenting();
    for (const section of annotationLayer.children) {
      if (
        section.hasAttribute('data-internal-link') ||
        section.classList.contains('linkAnnotation') ||
        section.classList.contains('mediaAnnotation')
      ) {
        continue;
      }
      (section as HTMLElement).inert = presenting;
    }
  }

  private async renderAnnotationLayer(
    page: PDFPageProxy,
    pageNumber: number,
    container: HTMLElement,
    annotationCanvasMap: Map<string, HTMLCanvasElement>,
  ): Promise<void> {
    const annotationLayerDiv = container.querySelector(
      `[data-annotationlayer-page="${pageNumber}"]`,
    ) as HTMLDivElement;
    if (!annotationLayerDiv) return;

    annotationLayerDiv.innerHTML = '';
    const scale = this.scaledValue();
    const displayViewport = this.pageViewport(page, scale);

    const annotations = await page.getAnnotations();
    // URLs and emails in the text that aren't links yet (as pdf.js).
    const textData = this.textLayerData.get(pageNumber);
    const textLayerDiv = container.querySelector<HTMLElement>(
      `[data-textlayer-page="${pageNumber}"]`,
    );
    const inferredLinks =
      this.pdfViewer.enableAutoLinking() && textData && textLayerDiv
        ? inferLinkAnnotations(
            textLayerDiv,
            textData.divs,
            textData.texts,
            displayViewport,
            annotations,
          )
        : [];
    if (annotations.length === 0 && inferredLinks.length === 0) return;

    annotationLayerDiv.style.setProperty('--total-scale-factor', String(scale));
    setLayerDimensions(annotationLayerDiv, displayViewport);

    const doc = this.pdfDocument();
    const viewer = this.pdfViewer;
    const { fieldObjects, hasJSActions } = viewer.formInfo();
    const annotationLayer = new AnnotationLayer({
      div: annotationLayerDiv,
      accessibilityManager: null,
      // Annotations drawn on their own canvas by page.render.
      annotationCanvasMap,
      annotationEditorUIManager: null,
      // Names and owned text for annotations, from the structure tree.
      structTreeLayer: this.structTree(page),
      commentManager: null,
      page,
      viewport: displayViewport.clone({ dontFlip: true }),
      linkService: this.linkService as never,
      annotationStorage: doc?.annotationStorage ?? null,
    } as never);

    // Form fields as HTML inputs, their values kept in the document's
    // annotation storage (so they survive re-rendering and are saved).
    await annotationLayer.render({
      annotations,
      renderForms: true,
      enableScripting: viewer.enableScripting(),
      hasJSActions,
      fieldObjects,
      // Note icons (pdf.js's images), attachments on the page, layers.
      imageResourcesPath: `${viewer.assetsUrl()}web/images/`,
      downloadManager: {
        openOrDownloadData: (content: Uint8Array, filename: string) =>
          viewer.downloadAttachment({ filename, content }),
      },
      optionalContentConfig: viewer.optionalContent(),
    } as never);
    if (inferredLinks.length) {
      await (
        annotationLayer as unknown as {
          addLinkAnnotations(links: object[]): Promise<void>;
        }
      ).addLinkAnnotations(inferredLinks);
    }
    this.updatePresentationState(annotationLayerDiv);

    // pdf.js puts a field's name (its tooltip, /TU) on the wrapping section
    // as a title only; give the field itself that accessible name.
    for (const field of annotationLayerDiv.querySelectorAll<HTMLElement>(
      'section[title] :is(input, textarea, select)',
    )) {
      if (field.hasAttribute('aria-label')) continue;
      const name = field.closest('section')?.getAttribute('title');
      if (name) field.setAttribute('aria-label', name);
    }
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
    data: { divs: HTMLElement[]; texts: string[]; eols: boolean[] },
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
      flatOffset += data.texts[i].length + (data.eols[i] ? 1 : 0);
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

  protected annotationsOn(page: number): ScPdfEditorAnnotation[] {
    return this.annotationsByPage().get(page) ?? [];
  }

  protected commentsOn(
    page: number,
  ): { comment: ScPdfComment; index: number }[] {
    return this.commentsByPage().get(page) ?? [];
  }

  protected pageAriaLabel(page: number): string | null {
    const name = this.pageName();
    return name ? name(page, this.pdfViewer.pageLabel(page)) : null;
  }

  /** An image annotation's name: its alt text or description, if any. */
  protected imageName(annotation: ScPdfEditorAnnotation): string | null {
    if (annotation.isDecorative) return null;
    return annotation.altText || annotation.description || null;
  }

  /** Points of a stroke for an SVG polyline (0–1 of the page). */
  protected points(stroke: { x: number; y: number }[]): string {
    return stroke.map((p) => `${p.x},${p.y}`).join(' ');
  }

  protected isSelected(annotation: ScPdfEditorAnnotation): boolean {
    return this.pdfViewer.selectedAnnotationId() === annotation.id;
  }

  /** Where an annotation shows — live while it's moved or resized. */
  protected position(annotation: ScPdfEditorAnnotation): {
    x: number;
    y: number;
    width: number;
  } {
    const preview = this.preview();
    if (preview?.id === annotation.id) {
      return {
        x: preview.x,
        y: preview.y,
        width: preview.width ?? annotation.width ?? 0.15,
      };
    }
    return {
      x: annotation.x ?? 0,
      y: annotation.y ?? 0,
      width: annotation.width ?? 0.15,
    };
  }

  protected select(
    event: PointerEvent,
    annotation: ScPdfEditorAnnotation,
  ): void {
    event.stopPropagation();
    this.pdfViewer.selectedAnnotationId.set(annotation.id);
  }

  /** Selects an annotation; on a selected one, starts moving it. */
  protected onAnnotationPointerDown(
    event: PointerEvent,
    annotation: ScPdfEditorAnnotation,
    layer: HTMLElement,
  ): void {
    event.stopPropagation();
    if (this.editingText() === annotation.id) return;
    // Your toolbar inside it handles its own clicks.
    if ((event.target as HTMLElement).closest('button, input, a')) return;
    event.preventDefault();
    if (!this.isSelected(annotation)) {
      this.pdfViewer.selectedAnnotationId.set(annotation.id);
      return;
    }
    this.dragState = {
      annotationId: annotation.id,
      startX: event.clientX,
      startY: event.clientY,
      origX: annotation.x ?? 0,
      origY: annotation.y ?? 0,
      layerW: layer.offsetWidth,
      layerH: layer.offsetHeight,
    };
  }

  protected startResize(
    event: PointerEvent,
    annotation: ScPdfEditorAnnotation,
    handle: string,
    layer: HTMLElement,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    this.resizeState = {
      annotationId: annotation.id,
      handle,
      startX: event.clientX,
      startY: event.clientY,
      origX: annotation.x ?? 0,
      origY: annotation.y ?? 0,
      origW: annotation.width ?? 0.15,
      origH: annotation.height ?? 0.15,
      layerW: layer.offsetWidth,
      layerH: layer.offsetHeight,
    };
  }

  /** Double-click a text annotation to edit it in place. */
  protected editText(
    event: MouseEvent,
    annotation: ScPdfEditorAnnotation,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    this.pdfViewer.selectedAnnotationId.set(annotation.id);
    this.editingText.set(annotation.id);
  }

  protected commitText(
    event: FocusEvent,
    annotation: ScPdfEditorAnnotation,
  ): void {
    if (this.editingText() !== annotation.id) return;
    this.editingText.set(null);
    const text = (event.target as HTMLElement).textContent?.trim() ?? '';
    if (!text) {
      this.pdfViewer.removeEditorAnnotation(annotation.id);
    } else if (text !== annotation.text) {
      this.pdfViewer.updateEditorAnnotation(annotation.id, { text });
    }
  }

  protected onTextKeydown(
    event: KeyboardEvent,
    annotation: ScPdfEditorAnnotation,
  ): void {
    if (this.editingText() !== annotation.id) return;
    const element = event.target as HTMLElement;
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.editingText.set(null);
      element.textContent = annotation.text ?? '';
      element.blur();
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      element.blur();
    }
  }

  protected commitDraft(event: FocusEvent): void {
    const draft = this.textDraft();
    this.textDraft.set(null);
    const text = (event.target as HTMLElement).textContent?.trim() ?? '';
    if (!draft || !text) return;
    this.pdfViewer.addEditorAnnotation({
      type: 'freetext',
      pageNumber: draft.page,
      x: draft.x,
      y: draft.y,
      text,
      fontSize: this.pdfViewer.freetextSize(),
      fontColor: this.pdfViewer.freetextColor(),
    });
  }

  protected onDraftKeydown(event: KeyboardEvent): void {
    const element = event.target as HTMLElement;
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.textDraft.set(null);
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      element.blur();
    }
  }

  /** The tool's click on a page: place a comment, start a text, draw. */
  protected onEditorPointerDown(event: PointerEvent, pageNumber: number): void {
    const mode = this.editorMode();
    const layer = event.currentTarget as HTMLElement;
    const { x, y } = this.pointInLayer(layer, event.clientX, event.clientY);

    if (mode === 'comment') {
      event.preventDefault();
      event.stopPropagation();
      this.pdfViewer.startComment(pageNumber, x, y);
    } else if (mode === 'freetext') {
      event.preventDefault();
      event.stopPropagation();
      this.textDraft.set({ page: pageNumber, x, y });
    } else if (mode === 'ink') {
      layer.setPointerCapture(event.pointerId);
      this.inkStroke.set({ page: pageNumber, points: [{ x, y }] });
    }
  }

  protected onEditorPointerMove(event: PointerEvent): void {
    const stroke = this.inkStroke();
    if (!stroke) return;
    const layer = event.currentTarget as HTMLElement;
    const point = this.pointInLayer(layer, event.clientX, event.clientY);
    this.inkStroke.set({ ...stroke, points: [...stroke.points, point] });
  }

  protected onEditorPointerUp(event: PointerEvent): void {
    const stroke = this.inkStroke();
    if (!stroke) return;
    this.inkStroke.set(null);
    const layer = event.currentTarget as HTMLElement;
    if (layer.hasPointerCapture(event.pointerId)) {
      layer.releasePointerCapture(event.pointerId);
    }
    if (stroke.points.length < 2) return;
    this.pdfViewer.addEditorAnnotation({
      type: 'ink',
      pageNumber: stroke.page,
      strokes: [stroke.points],
      color: this.pdfViewer.inkColor(),
      strokeWidth: this.pdfViewer.inkThickness(),
      opacity: this.pdfViewer.inkOpacity(),
    });
  }

  /** A click away from the annotations deselects. */
  private readonly onGlobalPointerDown = (event: PointerEvent): void => {
    if (!this.pdfViewer.selectedAnnotationId()) return;
    if ((event.target as HTMLElement).closest('[data-annotation]')) return;
    this.pdfViewer.selectedAnnotationId.set(null);
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

  /** The size and place a resize gives, from the pointer's move. */
  private resized(e: PointerEvent): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    const state = this.resizeState!;
    const { dx } = this.pointerDelta(e, state);
    const aspect = state.origH / state.origW;
    let width = state.origW;
    let x = state.origX;
    let y = state.origY;
    if (state.handle.includes('e')) {
      width = Math.max(0.02, state.origW + dx);
    } else if (state.handle.includes('w')) {
      width = Math.max(0.02, state.origW - dx);
      x = state.origX + (state.origW - width);
    }
    const height = width * aspect;
    if (state.handle.includes('n')) y = state.origY + (state.origH - height);
    return { x, y, width, height };
  }

  /** The place a move gives, from the pointer's move. */
  private moved(e: PointerEvent): {
    x: number;
    y: number;
    dx: number;
    dy: number;
  } {
    const state = this.dragState!;
    const { dx, dy } = this.pointerDelta(e, state);
    return {
      x: Math.max(0, Math.min(1, state.origX + dx)),
      y: Math.max(0, Math.min(1, state.origY + dy)),
      dx,
      dy,
    };
  }

  private readonly onGlobalPointerMove = (e: PointerEvent): void => {
    if (this.dragState) {
      const { x, y } = this.moved(e);
      this.preview.set({ id: this.dragState.annotationId, x, y });
    } else if (this.resizeState) {
      this.preview.set({
        id: this.resizeState.annotationId,
        ...this.resized(e),
      });
    }
  };

  private readonly onGlobalPointerUp = (e: PointerEvent): void => {
    if (this.dragState) {
      const { x, y, dx, dy } = this.moved(e);
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        this.pdfViewer.updateEditorAnnotation(this.dragState.annotationId, {
          x,
          y,
        });
      }
      this.dragState = null;
    } else if (this.resizeState) {
      this.pdfViewer.updateEditorAnnotation(
        this.resizeState.annotationId,
        this.resized(e),
      );
      this.resizeState = null;
    }
    this.preview.set(null);
  };

  /** Delete / Backspace deletes the selected annotation; Escape deselects. */
  private readonly onAnnotationKeyDown = (e: KeyboardEvent): void => {
    const id = this.pdfViewer.selectedAnnotationId();
    if (!id) return;
    const target = e.target as HTMLElement | null;
    // Not while typing.
    if (
      target?.isContentEditable ||
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName ?? '')
    ) {
      return;
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      this.pdfViewer.removeEditorAnnotation(id);
    } else if (e.key === 'Escape') {
      this.pdfViewer.selectedAnnotationId.set(null);
    }
  };
}
