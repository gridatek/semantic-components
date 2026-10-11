import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  type ScPdfEditorMode,
  ScPdfViewerAltTextDialog,
  ScPdfViewerCanvas,
  ScPdfViewerCommentSidebar,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerDownload,
  ScPdfViewerEditorFreetextParams,
  ScPdfViewerEditorHighlightParams,
  ScPdfViewerEditorInkParams,
  ScPdfViewerEditorUndoBar,
  ScPdfViewerEmpty,
  ScPdfViewerError,
  ScPdfViewerFindInput,
  ScPdfViewerFindNext,
  ScPdfViewerFindPrevious,
  ScPdfViewerFindResultsInfo,
  ScPdfViewerFindToggle,
  ScPdfViewerFindbar,
  ScPdfViewerLayersView,
  ScPdfViewerLoading,
  ScPdfViewerNav,
  ScPdfViewerNextPage,
  ScPdfViewerPageInfo,
  ScPdfViewerPasswordDialog,
  ScPdfViewerPrevPage,
  ScPdfViewerPrint,
  ScPdfViewerPrintProgress,
  ScPdfViewerRetry,
  ScPdfViewerRoot,
  ScPdfViewerSidebarResizer,
  ScPdfViewerSignatureDialog,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
  ScPdfViewerZoom,
  ScPdfViewerZoomIn,
  ScPdfViewerZoomOut,
  ScPdfViewerZoomSelect,
} from '@semantic-components/pdf-viewer';
import {
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScDialog,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScEmptyMedia,
  ScInput,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScSeparator,
  ScSpinner,
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
  ScToggleGroup,
  ScToggleGroupItem,
  ScTooltipTrigger,
  cn,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiChevronUpIcon,
  SiCircleAlertIcon,
  SiDownloadIcon,
  SiEllipsisVerticalIcon,
  SiFileTextIcon,
  SiHighlighterIcon,
  SiImageIcon,
  SiLayersIcon,
  SiLayoutGridIcon,
  SiListTreeIcon,
  SiLoaderCircleIcon,
  SiMessageSquareIcon,
  SiPanelLeftIcon,
  SiPaperclipIcon,
  SiPenIcon,
  SiPrinterIcon,
  SiSearchIcon,
  SiSignatureIcon,
  SiSlidersHorizontalIcon,
  SiTypeIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

interface ThumbnailData {
  page: number;
  dataUrl: string;
}

interface OutlineItem {
  title: string;
  dest: string | unknown[] | null;
  items: OutlineItem[];
}

interface AttachmentData {
  filename: string;
  content: Uint8Array;
}

type SidebarTab =
  'thumbnails' | 'outline' | 'attachments' | 'layers' | 'comments';

/** Editor tools with an options panel. */
const TOOLS_WITH_OPTIONS: readonly ScPdfEditorMode[] = [
  'highlight',
  'freetext',
  'ink',
];

@Component({
  selector: 'app-pdf-viewer-demo',
  imports: [
    NgTemplateOutlet,
    ScPdfViewerRoot,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerNav,
    ScPdfViewerPrevPage,
    ScPdfViewerNextPage,
    ScPdfViewerPageInfo,
    ScPdfViewerZoom,
    ScPdfViewerZoomIn,
    ScPdfViewerZoomOut,
    ScPdfViewerZoomSelect,
    ScPdfViewerPrint,
    ScPdfViewerDownload,
    ScPdfViewerSpacer,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerError,
    ScPdfViewerEmpty,
    ScPdfViewerRetry,
    ScPdfViewerCanvas,
    ScPdfViewerFindToggle,
    ScPdfViewerFindbar,
    ScPdfViewerFindInput,
    ScPdfViewerFindNext,
    ScPdfViewerFindPrevious,
    ScPdfViewerFindResultsInfo,
    ScPdfViewerEditorHighlightParams,
    ScPdfViewerEditorFreetextParams,
    ScPdfViewerEditorInkParams,
    ScPdfViewerPasswordDialog,
    ScPdfViewerSignatureDialog,
    ScPdfViewerAltTextDialog,
    ScPdfViewerPrintProgress,
    ScPdfViewerSidebarResizer,
    ScPdfViewerLayersView,
    ScPdfViewerCommentSidebar,
    ScPdfViewerEditorUndoBar,
    ScButton,
    ScTooltipTrigger,
    ScSeparator,
    ScInput,
    ScCheckbox,
    ScCheckboxField,
    ScNativeSelectContainer,
    ScNativeSelect,
    ScNativeSelectIcon,
    ScToggleGroup,
    ScToggleGroupItem,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
    ScMenuProvider,
    ScMenuTrigger,
    ScMenuPortal,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuSeparator,
    ScTabs,
    ScTabList,
    ScTab,
    ScTabPanel,
    ScTabContent,
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogFooter,
    ScSpinner,
    ScEmptyMedia,
    SiChevronDownIcon,
    SiChevronUpIcon,
    SiCircleAlertIcon,
    SiDownloadIcon,
    SiEllipsisVerticalIcon,
    SiFileTextIcon,
    SiHighlighterIcon,
    SiImageIcon,
    SiLayersIcon,
    SiLayoutGridIcon,
    SiListTreeIcon,
    SiLoaderCircleIcon,
    SiMessageSquareIcon,
    SiPanelLeftIcon,
    SiPaperclipIcon,
    SiPenIcon,
    SiPrinterIcon,
    SiSearchIcon,
    SiSignatureIcon,
    SiSlidersHorizontalIcon,
    SiTypeIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div
      scPdfViewer
      class="size-full"
      [src]="pdfSrc()"
      [title]="pdfTitle()"
      #viewer="scPdfViewer"
    >
      <div
        scPdfViewerContainer
        class="flex size-full flex-col rounded-none border-0"
      >
        <!-- Toolbar -->
        <div scPdfViewerToolbar class="flex-wrap gap-1 px-2 py-1.5">
          <button
            scButton
            variant="ghost"
            size="icon"
            aria-label="Sidebar"
            [attr.aria-pressed]="sidebarOpen()"
            [scTooltipTrigger]="'Sidebar'"
            tooltipPosition="bottom"
            (click)="sidebarOpen.set(!sidebarOpen())"
          >
            <svg siPanelLeftIcon></svg>
          </button>
          <button
            scButton
            variant="ghost"
            size="icon"
            scPdfViewerFindToggle
            [scTooltipTrigger]="'Find in document'"
            tooltipPosition="bottom"
          >
            <svg siSearchIcon></svg>
          </button>

          <div scSeparator orientation="vertical"></div>

          <div scPdfViewerNav>
            <button
              scButton
              variant="ghost"
              size="icon"
              scPdfViewerPrevPage
              [scTooltipTrigger]="'Previous page'"
              tooltipPosition="bottom"
            >
              <svg siChevronUpIcon></svg>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon"
              scPdfViewerNextPage
              [scTooltipTrigger]="'Next page'"
              tooltipPosition="bottom"
            >
              <svg siChevronDownIcon></svg>
            </button>
          </div>
          <div scPdfViewerPageInfo></div>

          <div scSeparator orientation="vertical"></div>

          <div scPdfViewerZoom>
            <button
              scButton
              variant="ghost"
              size="icon"
              scPdfViewerZoomOut
              [scTooltipTrigger]="'Zoom out'"
              tooltipPosition="bottom"
            >
              <svg siZoomOutIcon></svg>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon"
              scPdfViewerZoomIn
              [scTooltipTrigger]="'Zoom in'"
              tooltipPosition="bottom"
            >
              <svg siZoomInIcon></svg>
            </button>
          </div>
          <div scNativeSelectContainer>
            <select scNativeSelect size="sm" scPdfViewerZoomSelect></select>
            <svg siChevronDownIcon scNativeSelectIcon></svg>
          </div>

          <div scPdfViewerSpacer></div>

          <!-- Editor tools -->
          <div
            scToggleGroup
            type="single"
            aria-label="Annotation tool"
            [value]="activeTool()"
            (valueChange)="setTool($event)"
          >
            <button
              scToggleGroupItem
              value="highlight"
              aria-label="Highlight"
              [scTooltipTrigger]="'Highlight'"
              tooltipPosition="bottom"
            >
              <svg siHighlighterIcon></svg>
            </button>
            <button
              scToggleGroupItem
              value="freetext"
              aria-label="Text"
              [scTooltipTrigger]="'Text'"
              tooltipPosition="bottom"
            >
              <svg siTypeIcon></svg>
            </button>
            <button
              scToggleGroupItem
              value="ink"
              aria-label="Draw"
              [scTooltipTrigger]="'Draw'"
              tooltipPosition="bottom"
            >
              <svg siPenIcon></svg>
            </button>
          </div>
          <div scPopoverProvider side="bottom" align="end">
            <button
              scButton
              scPopoverTrigger
              variant="ghost"
              size="icon"
              aria-label="Tool options"
              [disabled]="!activeTool()"
              [scTooltipTrigger]="'Tool options'"
              tooltipPosition="bottom"
            >
              <svg siSlidersHorizontalIcon></svg>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto">
                @switch (activeTool()) {
                  @case ('highlight') {
                    <sc-pdf-viewer-editor-highlight-params />
                  }
                  @case ('freetext') {
                    <sc-pdf-viewer-editor-freetext-params />
                  }
                  @case ('ink') {
                    <sc-pdf-viewer-editor-ink-params />
                  }
                }
              </div>
            </ng-template>
          </div>
          <button
            scButton
            variant="ghost"
            size="icon"
            aria-label="Add image"
            [scTooltipTrigger]="'Add image'"
            tooltipPosition="bottom"
            (click)="stampImageInput.click()"
          >
            <svg siImageIcon></svg>
          </button>
          <button
            scButton
            variant="ghost"
            size="icon"
            aria-label="Add signature"
            [scTooltipTrigger]="'Add signature'"
            tooltipPosition="bottom"
            (click)="viewer.setEditorMode('signature')"
          >
            <svg siSignatureIcon></svg>
          </button>

          <div scSeparator orientation="vertical"></div>

          <button
            scButton
            variant="ghost"
            size="icon"
            scPdfViewerPrint
            [scTooltipTrigger]="'Print'"
            tooltipPosition="bottom"
          >
            <svg siPrinterIcon></svg>
          </button>
          <button
            scButton
            variant="ghost"
            size="icon"
            scPdfViewerDownload
            [scTooltipTrigger]="'Download'"
            tooltipPosition="bottom"
          >
            <svg siDownloadIcon></svg>
          </button>

          <div scMenuProvider side="bottom" align="end">
            <button
              scButton
              scMenuTrigger
              variant="ghost"
              size="icon"
              aria-label="More"
              [scTooltipTrigger]="'More'"
              tooltipPosition="bottom"
            >
              <svg siEllipsisVerticalIcon></svg>
            </button>
            <ng-template scMenuPortal>
              <div scMenu (itemSelected)="onMenuItem($event)">
                <ng-template scMenuContent>
                  <div scMenuItem value="open">Open file…</div>
                  <div scMenuItem value="fullscreen">Presentation mode</div>
                  <div scMenuSeparator></div>
                  <div scMenuItem value="first">Go to first page</div>
                  <div scMenuItem value="last">Go to last page</div>
                  <div scMenuSeparator></div>
                  <div scMenuItem value="rotate-right">Rotate clockwise</div>
                  <div scMenuItem value="rotate-left">
                    Rotate counterclockwise
                  </div>
                  <div scMenuSeparator></div>
                  <div scMenuItem value="properties">Document properties…</div>
                </ng-template>
              </div>
            </ng-template>
          </div>
        </div>

        <input
          #fileInput
          type="file"
          accept=".pdf,application/pdf"
          class="hidden"
          (change)="onFileSelected($event)"
        />
        <input
          #stampImageInput
          type="file"
          accept="image/*"
          class="hidden"
          (change)="onStampImageSelected($event)"
        />

        <!-- Find bar -->
        @if (viewer.findOpen()) {
          <div scPdfViewerFindbar class="flex-wrap border-b px-2 py-1.5">
            <input scInput scPdfViewerFindInput class="h-8 w-56" />
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              scPdfViewerFindPrevious
              [scTooltipTrigger]="'Previous match'"
            >
              <svg siChevronUpIcon></svg>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              scPdfViewerFindNext
              [scTooltipTrigger]="'Next match'"
            >
              <svg siChevronDownIcon></svg>
            </button>
            <label scCheckboxField class="ms-2 text-sm">
              <input
                type="checkbox"
                scCheckbox
                [checked]="viewer.findHighlightAll()"
                (checkedChange)="setHighlightAll($event)"
              />
              Highlight all
            </label>
            <label scCheckboxField class="text-sm">
              <input
                type="checkbox"
                scCheckbox
                [checked]="viewer.findMatchCase()"
                (checkedChange)="
                  viewer.findMatchCase.set($event);
                  viewer.find(viewer.findQuery())
                "
              />
              Match case
            </label>
            <label scCheckboxField class="text-sm">
              <input
                type="checkbox"
                scCheckbox
                [checked]="viewer.findMatchDiacritics()"
                (checkedChange)="
                  viewer.findMatchDiacritics.set($event);
                  viewer.find(viewer.findQuery())
                "
              />
              Match diacritics
            </label>
            <label scCheckboxField class="text-sm">
              <input
                type="checkbox"
                scCheckbox
                [checked]="viewer.findEntireWord()"
                (checkedChange)="
                  viewer.findEntireWord.set($event);
                  viewer.find(viewer.findQuery())
                "
              />
              Whole words
            </label>
            <span scPdfViewerFindResultsInfo class="ms-auto"></span>
          </div>
        }

        <!-- Sidebar + content -->
        <div class="relative flex min-h-0 flex-1">
          @if (sidebarOpen()) {
            <aside
              class="bg-background flex shrink-0 flex-col border-e"
              aria-label="Document sidebar"
              [style.width.px]="viewer.sidebarWidth()"
            >
              <div scTabs class="flex min-h-0 flex-1 flex-col">
                <div
                  scTabList
                  variant="line"
                  selectionMode="follow"
                  aria-label="Sidebar views"
                  class="w-full justify-start border-b px-1"
                  [selectedTab]="sidebarTab()"
                  (selectedTabChange)="sidebarTab.set($any($event))"
                >
                  <button
                    scTab
                    value="thumbnails"
                    aria-label="Pages"
                    [scTooltipTrigger]="'Pages'"
                  >
                    <svg siLayoutGridIcon></svg>
                  </button>
                  <button
                    scTab
                    value="outline"
                    aria-label="Outline"
                    [scTooltipTrigger]="'Outline'"
                  >
                    <svg siListTreeIcon></svg>
                  </button>
                  <button
                    scTab
                    value="attachments"
                    aria-label="Attachments"
                    [scTooltipTrigger]="'Attachments'"
                  >
                    <svg siPaperclipIcon></svg>
                  </button>
                  <button
                    scTab
                    value="layers"
                    aria-label="Layers"
                    [scTooltipTrigger]="'Layers'"
                  >
                    <svg siLayersIcon></svg>
                  </button>
                  <button
                    scTab
                    value="comments"
                    aria-label="Comments"
                    [scTooltipTrigger]="'Comments'"
                  >
                    <svg siMessageSquareIcon></svg>
                  </button>
                </div>

                <div
                  scTabPanel
                  value="thumbnails"
                  class="flex-1 overflow-y-auto"
                >
                  <ng-template scTabContent>
                    <ul class="grid gap-3 p-3">
                      @for (thumb of thumbnails(); track thumb.page) {
                        <li>
                          <button
                            scButton
                            variant="ghost"
                            class="h-auto w-full flex-col gap-1 p-2"
                            [attr.aria-current]="
                              viewer.currentPage() === thumb.page
                                ? 'page'
                                : null
                            "
                            [class.bg-accent]="
                              viewer.currentPage() === thumb.page
                            "
                            (click)="viewer.goToPage(thumb.page)"
                          >
                            <img
                              [src]="thumb.dataUrl"
                              alt=""
                              class="mx-auto border shadow-sm"
                            />
                            <span class="text-xs">Page {{ thumb.page }}</span>
                          </button>
                        </li>
                      } @empty {
                        <li class="text-muted-foreground p-2 text-sm">
                          Rendering pages…
                        </li>
                      }
                    </ul>
                  </ng-template>
                </div>

                <div scTabPanel value="outline" class="flex-1 overflow-y-auto">
                  <ng-template scTabContent>
                    @if (outline().length === 0) {
                      <p class="text-muted-foreground p-4 text-center text-sm">
                        No outline in this document.
                      </p>
                    } @else {
                      <nav aria-label="Outline" class="p-2">
                        <ng-container
                          [ngTemplateOutlet]="outlineList"
                          [ngTemplateOutletContext]="{ $implicit: outline() }"
                        />
                      </nav>
                    }
                  </ng-template>
                </div>

                <div
                  scTabPanel
                  value="attachments"
                  class="flex-1 overflow-y-auto"
                >
                  <ng-template scTabContent>
                    @if (attachments().length === 0) {
                      <p class="text-muted-foreground p-4 text-center text-sm">
                        No attachments in this document.
                      </p>
                    } @else {
                      <ul class="grid gap-1 p-2">
                        @for (att of attachments(); track att.filename) {
                          <li>
                            <button
                              scButton
                              variant="ghost"
                              size="sm"
                              class="w-full justify-start"
                              (click)="downloadAttachment(att)"
                            >
                              {{ att.filename }}
                            </button>
                          </li>
                        }
                      </ul>
                    }
                  </ng-template>
                </div>

                <div scTabPanel value="layers" class="flex-1 overflow-y-auto">
                  <ng-template scTabContent>
                    <sc-pdf-viewer-layers-view />
                  </ng-template>
                </div>

                <div scTabPanel value="comments" class="min-h-0 flex-1">
                  <ng-template scTabContent>
                    <sc-pdf-viewer-comment-sidebar />
                  </ng-template>
                </div>
              </div>
            </aside>
            <sc-pdf-viewer-sidebar-resizer />
          }

          <div scPdfViewerContent class="flex-1">
            <div scPdfViewerLoading>
              <svg scSpinner siLoaderCircleIcon class="size-6"></svg>
            </div>
            <div scPdfViewerError>
              <div scEmptyMedia variant="icon">
                <svg siCircleAlertIcon></svg>
              </div>
              <button scButton scPdfViewerRetry>Try again</button>
            </div>
            <div scPdfViewerEmpty description="Open a PDF to view it here.">
              <div scEmptyMedia variant="icon">
                <svg siFileTextIcon></svg>
              </div>
              <button scButton (click)="fileInput.click()">Open file…</button>
            </div>

            <sc-pdf-viewer-canvas />
          </div>

          <sc-pdf-viewer-editor-undo-bar />
        </div>

        <sc-pdf-viewer-password-dialog />
        <sc-pdf-viewer-signature-dialog />
        <sc-pdf-viewer-print-progress />
        <sc-pdf-viewer-alt-text-dialog
          [open]="viewer.altTextDialogOpen()"
          [annotationId]="viewer.altTextAnnotationId()"
          (closed)="viewer.altTextDialogOpen.set(false)"
        />
      </div>
    </div>

    <ng-template #outlineList let-items>
      <ul class="grid gap-0.5">
        @for (item of items; track $index) {
          <li>
            <button
              scButton
              variant="ghost"
              size="sm"
              class="h-auto w-full justify-start py-1 text-start whitespace-normal"
              (click)="navigateOutline(item)"
            >
              {{ item.title }}
            </button>
            @if (item.items?.length) {
              <div class="ps-3">
                <ng-container
                  [ngTemplateOutlet]="outlineList"
                  [ngTemplateOutletContext]="{ $implicit: item.items }"
                />
              </div>
            }
          </li>
        }
      </ul>
    </ng-template>

    <!-- Document properties -->
    <div scDialogProvider [(open)]="documentPropertiesOpen">
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-lg">
          <div scDialogHeader>
            <h2 scDialogTitle>Document properties</h2>
          </div>
          @if (documentProperties(); as props) {
            <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              @for (row of propertyRows(props); track row.label) {
                <dt class="text-muted-foreground">{{ row.label }}</dt>
                <dd class="break-words">{{ row.value }}</dd>
              }
            </dl>
          } @else {
            <p class="text-muted-foreground text-sm">Loading…</p>
          }
          <div scDialogFooter>
            <button scButton (click)="documentPropertiesOpen.set(false)">
              Close
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );

  private readonly destroyRef = inject(DestroyRef);
  private readonly viewerRef = viewChild<ScPdfViewerRoot>('viewer');
  private readonly fileInputRef = viewChild<{
    nativeElement: HTMLInputElement;
  }>('fileInput');

  readonly pdfSrc = signal(
    'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  );
  readonly pdfTitle = signal('tracemonkey');

  readonly sidebarOpen = signal(false);
  readonly sidebarTab = signal<SidebarTab>('thumbnails');
  readonly documentPropertiesOpen = signal(false);

  readonly thumbnails = signal<ThumbnailData[]>([]);
  readonly outline = signal<OutlineItem[]>([]);
  readonly attachments = signal<AttachmentData[]>([]);

  readonly documentProperties = signal<Record<string, string> | null>(null);

  /** The active annotation tool that has options, if any. */
  protected readonly activeTool = computed(() => {
    const mode = this.viewerRef()?.editorMode() ?? 'none';
    return TOOLS_WITH_OPTIONS.includes(mode) ? mode : null;
  });

  private currentBlobUrl: string | null = null;

  constructor() {
    effect(() => {
      const doc = this.viewerRef()?.pdfDocument();
      if (doc) {
        this.renderThumbnails();
        this.loadOutline();
        this.loadAttachments();
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.currentBlobUrl) URL.revokeObjectURL(this.currentBlobUrl);
    });
  }

  protected setTool(value: string | string[] | null): void {
    const viewer = this.viewerRef();
    if (!viewer) return;
    viewer.editorMode.set(
      typeof value === 'string' ? (value as ScPdfEditorMode) : 'none',
    );
  }

  protected setHighlightAll(value: boolean): void {
    const viewer = this.viewerRef();
    if (!viewer) return;
    viewer.findHighlightAll.set(value);
    viewer.findTrigger.update((v) => v + 1);
  }

  protected onMenuItem(value: unknown): void {
    const viewer = this.viewerRef();
    if (!viewer) return;
    switch (value) {
      case 'open':
        this.fileInputRef()?.nativeElement.click();
        break;
      case 'fullscreen':
        viewer.toggleFullscreen();
        break;
      case 'first':
        viewer.goToPage(1);
        break;
      case 'last':
        viewer.goToPage(viewer.totalPages());
        break;
      case 'rotate-right':
        viewer.rotateRight();
        break;
      case 'rotate-left':
        viewer.rotateLeft();
        break;
      case 'properties':
        this.documentProperties.set(null);
        this.documentPropertiesOpen.set(true);
        this.loadDocumentProperties();
        break;
    }
  }

  protected propertyRows(
    props: Record<string, string>,
  ): { label: string; value: string }[] {
    return Object.entries(props).map(([label, value]) => ({ label, value }));
  }

  protected onStampImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const viewer = this.viewerRef();
      if (!viewer || !reader.result) return;

      const img = new Image();
      img.onload = () => {
        // About 15% of the page width, keeping the aspect ratio.
        const width = 0.15;
        viewer.addEditorAnnotation({
          type: 'stamp',
          pageNumber: viewer.currentPage(),
          imageDataUrl: reader.result as string,
          width,
          height: width * (img.height / img.width),
          x: 0.4,
          y: 0.4,
        });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (this.currentBlobUrl) URL.revokeObjectURL(this.currentBlobUrl);
    this.currentBlobUrl = URL.createObjectURL(file);
    this.pdfSrc.set(this.currentBlobUrl);
    this.pdfTitle.set(file.name.replace(/\.pdf$/i, ''));
    this.thumbnails.set([]);
    this.outline.set([]);
    this.attachments.set([]);
    input.value = '';
  }

  protected async navigateOutline(item: OutlineItem): Promise<void> {
    const viewer = this.viewerRef();
    const doc = viewer?.pdfDocument();
    if (!viewer || !doc || !item.dest) return;

    let dest = item.dest;
    if (typeof dest === 'string') {
      dest = (await doc.getDestination(dest)) as unknown[];
    }
    if (!Array.isArray(dest)) return;

    const [ref] = dest;
    let pageNumber: number | undefined;
    if (ref && typeof ref === 'object') {
      try {
        pageNumber =
          (await doc.getPageIndex(ref as { num: number; gen: number })) + 1;
      } catch {
        return;
      }
    } else if (typeof ref === 'number') {
      pageNumber = ref + 1;
    }
    if (pageNumber) viewer.goToPage(pageNumber);
  }

  protected downloadAttachment(att: AttachmentData): void {
    const url = URL.createObjectURL(
      new Blob([att.content as unknown as BlobPart]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = att.filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private parsePdfDate(dateStr: string): string {
    const match = dateStr.match(/D:(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
    if (!match) return dateStr || '—';
    const [, year, month, day, hour, minute, second] = match;
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    ).toLocaleString();
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private async loadDocumentProperties(): Promise<void> {
    const viewer = this.viewerRef();
    const doc = viewer?.pdfDocument();
    if (!viewer || !doc) return;

    try {
      const metadata = await doc.getMetadata();
      const info = (metadata.info ?? {}) as Record<string, string>;

      let fileSize = '—';
      try {
        const { length } = await doc.getDownloadInfo();
        if (length > 0) fileSize = this.formatFileSize(length);
      } catch {
        // Not available.
      }

      let pageSize = '—';
      try {
        const page = await doc.getPage(viewer.currentPage());
        const { width, height } = page.getViewport({ scale: 1 });
        const inches = (v: number) => (v / 72).toFixed(2);
        const mm = (v: number) => ((v / 72) * 25.4).toFixed(0);
        pageSize = `${inches(width)} × ${inches(height)} in (${mm(width)} × ${mm(height)} mm)`;
      } catch {
        // Not available.
      }

      this.documentProperties.set({
        'File name': this.pdfTitle() || '—',
        'File size': fileSize,
        Title: info['Title'] || '—',
        Author: info['Author'] || '—',
        Subject: info['Subject'] || '—',
        Keywords: info['Keywords'] || '—',
        Created: this.parsePdfDate(info['CreationDate'] ?? ''),
        Modified: this.parsePdfDate(info['ModDate'] ?? ''),
        Creator: info['Creator'] || '—',
        Producer: info['Producer'] || '—',
        'PDF version': info['PDFFormatVersion'] || '—',
        Pages: String(doc.numPages),
        'Page size': pageSize,
        Linearized: info['IsLinearized'] ? 'Yes' : 'No',
      });
    } catch {
      this.documentProperties.set({ Error: "Couldn't read the properties." });
    }
  }

  private async renderThumbnails(): Promise<void> {
    const doc = this.viewerRef()?.pdfDocument();
    if (!doc) return;

    const thumbs: ThumbnailData[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      try {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, viewport }).promise;
        thumbs.push({ page: i, dataUrl: canvas.toDataURL() });
      } catch {
        // Skip a page that fails to render.
      }
    }
    this.thumbnails.set(thumbs);
  }

  private async loadOutline(): Promise<void> {
    const doc = this.viewerRef()?.pdfDocument();
    if (!doc) return;
    try {
      this.outline.set(((await doc.getOutline()) as OutlineItem[]) ?? []);
    } catch {
      this.outline.set([]);
    }
  }

  private async loadAttachments(): Promise<void> {
    const doc = this.viewerRef()?.pdfDocument();
    if (!doc) return;
    try {
      const atts = await doc.getAttachments();
      this.attachments.set(
        Object.entries(atts ?? {}).map(([filename, data]) => ({
          filename,
          content: (data as { content: Uint8Array }).content,
        })),
      );
    } catch {
      this.attachments.set([]);
    }
  }
}
