import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScField,
  ScFieldDescription,
  ScInput,
  ScLabel,
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
  ScNativeSelectOption,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
  ScSeparator,
  ScSlider,
  ScSpinner,
  ScSwitch,
  ScSwitchField,
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
  ScTextarea,
  ScToggleGroup,
  ScToggleGroupItem,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import {
  type ScPdfDocumentProperties,
  type ScPdfEditorMode,
  type ScPdfOutlineItem,
  type ScPdfPaperSize,
  type ScPdfSidebarView,
  ScPdfViewer,
  ScPdfViewerAddImage,
  ScPdfViewerAltTextForm,
  ScPdfViewerAltTextInput,
  ScPdfViewerAltTextKind,
  ScPdfViewerAnnotationAltText,
  ScPdfViewerAnnotationColor,
  ScPdfViewerAnnotationDelete,
  ScPdfViewerAnnotationToolbar,
  ScPdfViewerAttachment,
  ScPdfViewerBack,
  ScPdfViewerCanvas,
  ScPdfViewerComment,
  ScPdfViewerCommentAdd,
  ScPdfViewerCommentCancel,
  ScPdfViewerCommentForm,
  ScPdfViewerCommentInput,
  ScPdfViewerCommentMarker,
  ScPdfViewerCommentRemove,
  ScPdfViewerCommentShow,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerCopyPages,
  ScPdfViewerCutPages,
  ScPdfViewerDeletePages,
  ScPdfViewerDialog,
  ScPdfViewerDownload,
  ScPdfViewerEmpty,
  ScPdfViewerError,
  ScPdfViewerExportPages,
  ScPdfViewerFindInput,
  ScPdfViewerFindNext,
  ScPdfViewerFindPrevious,
  ScPdfViewerFindResultsInfo,
  ScPdfViewerFindToggle,
  ScPdfViewerFindbar,
  ScPdfViewerForward,
  ScPdfViewerGoToPage,
  ScPdfViewerInsertPages,
  ScPdfViewerLayer,
  ScPdfViewerLoading,
  ScPdfViewerLoadingBar,
  ScPdfViewerMovePagesEarlier,
  ScPdfViewerMovePagesLater,
  ScPdfViewerNav,
  ScPdfViewerNextPage,
  ScPdfViewerOutlineCollapseAll,
  ScPdfViewerOutlineExpandAll,
  ScPdfViewerOutlineFindCurrent,
  ScPdfViewerOutlineItem,
  ScPdfViewerOutlineToggle,
  ScPdfViewerPageInput,
  ScPdfViewerPageItem,
  ScPdfViewerPageSelect,
  ScPdfViewerPages,
  ScPdfViewerPasswordForm,
  ScPdfViewerPasswordInput,
  ScPdfViewerPastePages,
  ScPdfViewerPrevPage,
  ScPdfViewerPrint,
  ScPdfViewerPrintProgress,
  ScPdfViewerRetry,
  ScPdfViewerSetting,
  ScPdfViewerSidebarResizer,
  ScPdfViewerSignatureAdd,
  ScPdfViewerSignatureClear,
  ScPdfViewerSignatureDescription,
  ScPdfViewerSignatureForm,
  ScPdfViewerSignatureImage,
  ScPdfViewerSignatureName,
  ScPdfViewerSignatureNew,
  ScPdfViewerSignaturePad,
  ScPdfViewerSignaturePlace,
  ScPdfViewerSignatureRemove,
  ScPdfViewerSpacer,
  ScPdfViewerThumbnail,
  ScPdfViewerToolbar,
  ScPdfViewerUndo,
  ScPdfViewerUndoBar,
  ScPdfViewerUndoDismiss,
  ScPdfViewerZoom,
  ScPdfViewerZoomIn,
  ScPdfViewerZoomOut,
  ScPdfViewerZoomSelect,
} from '@semantic-components/ui/pdf-viewer';
import {
  SiArrowDownIcon,
  SiArrowLeftIcon,
  SiArrowRightIcon,
  SiArrowUpIcon,
  SiBookOpenIcon,
  SiChevronDownIcon,
  SiChevronRightIcon,
  SiChevronUpIcon,
  SiChevronsDownUpIcon,
  SiChevronsUpDownIcon,
  SiCircleAlertIcon,
  SiClipboardPasteIcon,
  SiCopyIcon,
  SiDownloadIcon,
  SiEllipsisVerticalIcon,
  SiFileOutputIcon,
  SiFilePlusIcon,
  SiFileTextIcon,
  SiHighlighterIcon,
  SiImageIcon,
  SiLayersIcon,
  SiLayoutGridIcon,
  SiListTreeIcon,
  SiLoaderCircleIcon,
  SiLocateFixedIcon,
  SiMessageSquareIcon,
  SiMessageSquarePlusIcon,
  SiPanelLeftIcon,
  SiPaperclipIcon,
  SiPenIcon,
  SiPrinterIcon,
  SiScissorsIcon,
  SiSearchIcon,
  SiSignatureIcon,
  SiSlidersHorizontalIcon,
  SiTrash2Icon,
  SiTypeIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';

/** Your names for the standard paper sizes. */
const PAPER_NAMES: Record<ScPdfPaperSize, string> = {
  a3: 'A3',
  a4: 'A4',
  letter: 'Letter',
  legal: 'Legal',
};

/** The tools in the toolbar's toggle group. */
const TOOLS: readonly ScPdfEditorMode[] = [
  'highlight',
  'freetext',
  'ink',
  'comment',
];

/** Tools with an options panel. */
const TOOLS_WITH_OPTIONS: readonly ScPdfEditorMode[] = [
  'highlight',
  'freetext',
  'ink',
];

/** The swatches offered for highlights (as pdf.js's). */
const HIGHLIGHT_COLORS = [
  { name: 'Yellow', value: '#FFFF98' },
  { name: 'Green', value: '#53FFBC' },
  { name: 'Blue', value: '#80EBFF' },
  { name: 'Pink', value: '#FFCBE6' },
  { name: 'Red', value: '#FF4F5F' },
];

/** The swatches offered for text and drawings. */
const INK_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#E11D48' },
  { name: 'Blue', value: '#2563EB' },
  { name: 'Green', value: '#16A34A' },
];

@Component({
  selector: 'app-pdf-viewer-demo',
  imports: [
    NgTemplateOutlet,
    ScPdfViewer,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerNav,
    ScPdfViewerBack,
    ScPdfViewerForward,
    ScPdfViewerPrevPage,
    ScPdfViewerNextPage,
    ScPdfViewerPageInput,
    ScPdfViewerZoom,
    ScPdfViewerZoomIn,
    ScPdfViewerZoomOut,
    ScPdfViewerZoomSelect,
    ScPdfViewerSetting,
    ScPdfViewerPrint,
    ScPdfViewerDownload,
    ScPdfViewerSpacer,
    ScPdfViewerFindToggle,
    ScPdfViewerFindbar,
    ScPdfViewerFindInput,
    ScPdfViewerFindNext,
    ScPdfViewerFindPrevious,
    ScPdfViewerFindResultsInfo,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerLoadingBar,
    ScPdfViewerError,
    ScPdfViewerEmpty,
    ScPdfViewerRetry,
    ScPdfViewerCanvas,
    ScPdfViewerAnnotationToolbar,
    ScPdfViewerAnnotationDelete,
    ScPdfViewerAnnotationAltText,
    ScPdfViewerAnnotationColor,
    ScPdfViewerCommentMarker,
    ScPdfViewerAddImage,
    ScPdfViewerUndoBar,
    ScPdfViewerUndo,
    ScPdfViewerUndoDismiss,
    ScPdfViewerSidebarResizer,
    ScPdfViewerPages,
    ScPdfViewerPageItem,
    ScPdfViewerPageSelect,
    ScPdfViewerGoToPage,
    ScPdfViewerThumbnail,
    ScPdfViewerMovePagesEarlier,
    ScPdfViewerMovePagesLater,
    ScPdfViewerCopyPages,
    ScPdfViewerCutPages,
    ScPdfViewerPastePages,
    ScPdfViewerDeletePages,
    ScPdfViewerExportPages,
    ScPdfViewerInsertPages,
    ScPdfViewerOutlineItem,
    ScPdfViewerOutlineToggle,
    ScPdfViewerOutlineExpandAll,
    ScPdfViewerOutlineCollapseAll,
    ScPdfViewerOutlineFindCurrent,
    ScPdfViewerAttachment,
    ScPdfViewerLayer,
    ScPdfViewerComment,
    ScPdfViewerCommentAdd,
    ScPdfViewerCommentForm,
    ScPdfViewerCommentInput,
    ScPdfViewerCommentCancel,
    ScPdfViewerCommentShow,
    ScPdfViewerCommentRemove,
    ScPdfViewerDialog,
    ScPdfViewerPasswordForm,
    ScPdfViewerPasswordInput,
    ScPdfViewerPrintProgress,
    ScPdfViewerAltTextForm,
    ScPdfViewerAltTextInput,
    ScPdfViewerAltTextKind,
    ScPdfViewerSignatureForm,
    ScPdfViewerSignatureName,
    ScPdfViewerSignaturePad,
    ScPdfViewerSignatureImage,
    ScPdfViewerSignatureDescription,
    ScPdfViewerSignatureAdd,
    ScPdfViewerSignatureClear,
    ScPdfViewerSignaturePlace,
    ScPdfViewerSignatureRemove,
    ScPdfViewerSignatureNew,
    ScButton,
    ScTooltipProvider,
    ScTooltipTrigger,
    ScTooltipPortal,
    ScTooltip,
    ScTooltipArrow,
    ScSeparator,
    ScInput,
    ScTextarea,
    ScField,
    ScLabel,
    ScFieldDescription,
    ScCheckbox,
    ScCheckboxField,
    ScRadioGroup,
    ScRadioField,
    ScRadio,
    ScSlider,
    ScSwitch,
    ScSwitchField,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
    ScNativeSelectContainer,
    ScNativeSelect,
    ScNativeSelectIcon,
    ScNativeSelectOption,
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
    ScTabsList,
    ScTabsTab,
    ScTabsPanel,
    ScTabsPanelContent,
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogFooter,
    ScDialogClose,
    ScEmpty,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScEmptyDescription,
    ScEmptyBody,
    ScSpinner,
    SiArrowDownIcon,
    SiArrowLeftIcon,
    SiArrowRightIcon,
    SiArrowUpIcon,
    SiBookOpenIcon,
    SiChevronDownIcon,
    SiChevronRightIcon,
    SiChevronUpIcon,
    SiChevronsDownUpIcon,
    SiChevronsUpDownIcon,
    SiCircleAlertIcon,
    SiClipboardPasteIcon,
    SiCopyIcon,
    SiDownloadIcon,
    SiEllipsisVerticalIcon,
    SiFileOutputIcon,
    SiFilePlusIcon,
    SiFileTextIcon,
    SiHighlighterIcon,
    SiImageIcon,
    SiLayersIcon,
    SiLayoutGridIcon,
    SiListTreeIcon,
    SiLoaderCircleIcon,
    SiLocateFixedIcon,
    SiMessageSquareIcon,
    SiMessageSquarePlusIcon,
    SiPanelLeftIcon,
    SiPaperclipIcon,
    SiPenIcon,
    SiPrinterIcon,
    SiScissorsIcon,
    SiSearchIcon,
    SiSignatureIcon,
    SiSlidersHorizontalIcon,
    SiTrash2Icon,
    SiTypeIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div
      scPdfViewer
      class="size-full"
      [src]="pdfSrc()"
      [fileName]="fileName()"
      [(sidebarOpen)]="sidebarOpen"
      [(sidebarView)]="sidebarTab"
      [enablePermissions]="true"
      (fileOpened)="fileName.set($event.name.replace('.pdf', ''))"
      #viewer="scPdfViewer"
    >
      <div
        scPdfViewerContainer
        class="flex size-full flex-col rounded-none border-0"
      >
        <!-- Toolbar -->
        <div
          scPdfViewerToolbar
          aria-label="PDF viewer toolbar"
          class="flex-wrap gap-1 px-2 py-1.5"
        >
          <div scTooltipProvider side="bottom">
            <button
              scButton
              variant="ghost"
              size="icon"
              [attr.aria-pressed]="sidebarOpen()"
              scTooltipTrigger
              (click)="sidebarOpen.set(!sidebarOpen())"
            >
              <svg siPanelLeftIcon></svg>
              <span class="sr-only">Sidebar</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Sidebar<span scTooltipArrow></span></div>
            </ng-template>
          </div>
          <div scTooltipProvider side="bottom">
            <button scPdfViewerFindToggle scTooltipTrigger>
              <svg siSearchIcon></svg>
              <span class="sr-only">Find in document</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Find in document<span scTooltipArrow></span></div>
            </ng-template>
          </div>

          <div scSeparator orientation="vertical"></div>

          <div scPdfViewerNav aria-label="Page navigation">
            <div scTooltipProvider side="bottom">
              <button scPdfViewerBack scTooltipTrigger>
                <svg siArrowLeftIcon></svg>
                <span class="sr-only">Back</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Back<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scPdfViewerForward scTooltipTrigger>
                <svg siArrowRightIcon></svg>
                <span class="sr-only">Forward</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Forward<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scPdfViewerPrevPage scTooltipTrigger>
                <svg siChevronUpIcon></svg>
                <span class="sr-only">Previous page</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Previous page<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scPdfViewerNextPage scTooltipTrigger>
                <svg siChevronDownIcon></svg>
                <span class="sr-only">Next page</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Next page<span scTooltipArrow></span></div>
              </ng-template>
            </div>
          </div>
          <input scInput scPdfViewerPageInput aria-label="Page" />
          <span
            class="text-muted-foreground text-sm whitespace-nowrap"
            data-testid="page-count"
          >
            @if (viewer.pageLabels()) {
              ({{ viewer.currentPage() }} of {{ viewer.totalPages() }})
            } @else {
              / {{ viewer.totalPages() }}
            }
          </span>

          <div scSeparator orientation="vertical"></div>

          <div scPdfViewerZoom aria-label="Zoom controls">
            <div scTooltipProvider side="bottom">
              <button scPdfViewerZoomOut scTooltipTrigger>
                <svg siZoomOutIcon></svg>
                <span class="sr-only">Zoom out</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Zoom out<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scPdfViewerZoomIn scTooltipTrigger>
                <svg siZoomInIcon></svg>
                <span class="sr-only">Zoom in</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Zoom in<span scTooltipArrow></span></div>
              </ng-template>
            </div>
          </div>
          <div scNativeSelectContainer>
            <select
              scNativeSelect
              size="sm"
              scPdfViewerZoomSelect
              aria-label="Zoom"
              #zoom="scPdfViewerZoomSelect"
            >
              <option scNativeSelectOption value="auto">Automatic zoom</option>
              <option scNativeSelectOption value="page-actual">
                Actual size
              </option>
              <option scNativeSelectOption value="page-fit">Page fit</option>
              <option scNativeSelectOption value="page-width">
                Page width
              </option>
              @for (scale of zoom.scales(); track scale) {
                <option scNativeSelectOption [value]="scale">
                  {{ scale * 100 }}%
                </option>
              }
              @if (zoom.customZoom(); as custom) {
                <option scNativeSelectOption [value]="custom">
                  {{ zoom.customPercent() }}%
                </option>
              }
            </select>
            <svg siChevronDownIcon scNativeSelectIcon></svg>
          </div>
          <div scPopoverProvider side="bottom" alignment="start">
            <div scTooltipProvider side="bottom">
              <button
                scButton
                scPopoverTrigger
                variant="ghost"
                size="icon"
                scTooltipTrigger
              >
                <svg siBookOpenIcon></svg>
                <span class="sr-only">View options</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>View options<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto gap-4">
                <div class="grid gap-2">
                  <p
                    id="pdf-demo-cursor"
                    class="text-muted-foreground text-xs font-medium"
                  >
                    Cursor
                  </p>
                  <div
                    scToggleGroup
                    scPdfViewerSetting="cursorTool"
                    variant="outline"
                    size="sm"
                    aria-labelledby="pdf-demo-cursor"
                  >
                    <button scToggleGroupItem value="select">Select</button>
                    <button scToggleGroupItem value="hand">Hand</button>
                  </div>
                </div>
                <div class="grid gap-2">
                  <p
                    id="pdf-demo-scrolling"
                    class="text-muted-foreground text-xs font-medium"
                  >
                    Scrolling
                  </p>
                  <div
                    scToggleGroup
                    scPdfViewerSetting="scrollMode"
                    variant="outline"
                    size="sm"
                    aria-labelledby="pdf-demo-scrolling"
                  >
                    <button scToggleGroupItem value="page">Page</button>
                    <button scToggleGroupItem value="vertical">Vertical</button>
                    <button scToggleGroupItem value="horizontal">
                      Horizontal
                    </button>
                    <button scToggleGroupItem value="wrapped">Wrapped</button>
                  </div>
                </div>
                <div class="grid gap-2">
                  <p
                    id="pdf-demo-spreads"
                    class="text-muted-foreground text-xs font-medium"
                  >
                    Spreads
                  </p>
                  <div
                    scToggleGroup
                    scPdfViewerSetting="spreadMode"
                    variant="outline"
                    size="sm"
                    aria-labelledby="pdf-demo-spreads"
                  >
                    <button scToggleGroupItem value="none">None</button>
                    <button scToggleGroupItem value="odd">Odd</button>
                    <button scToggleGroupItem value="even">Even</button>
                  </div>
                </div>
              </div>
            </ng-template>
          </div>

          <div scPdfViewerSpacer></div>

          <!-- Annotation tools (off when the document forbids changes) -->
          <div
            scToggleGroup
            aria-label="Annotation tool"
            [disabled]="!viewer.canEdit()"
            [value]="[selectedTool()]"
            (valueChange)="setTool($event[0])"
          >
            <div scTooltipProvider side="bottom">
              <button scToggleGroupItem value="highlight" scTooltipTrigger>
                <svg siHighlighterIcon></svg>
                <span class="sr-only">Highlight</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Highlight<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scToggleGroupItem value="freetext" scTooltipTrigger>
                <svg siTypeIcon></svg>
                <span class="sr-only">Text</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Text<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scToggleGroupItem value="ink" scTooltipTrigger>
                <svg siPenIcon></svg>
                <span class="sr-only">Draw</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Draw<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scToggleGroupItem value="comment" scTooltipTrigger>
                <svg siMessageSquarePlusIcon></svg>
                <span class="sr-only">Comment</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Comment<span scTooltipArrow></span></div>
              </ng-template>
            </div>
          </div>
          <div scPopoverProvider side="bottom" alignment="end">
            <div scTooltipProvider side="bottom">
              <button
                scButton
                scPopoverTrigger
                variant="ghost"
                size="icon"
                [disabled]="!activeTool()"
                scTooltipTrigger
              >
                <svg siSlidersHorizontalIcon></svg>
                <span class="sr-only">Tool options</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Tool options<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-60 gap-4">
                @switch (activeTool()) {
                  @case ('highlight') {
                    <div
                      scToggleGroup
                      scPdfViewerSetting="highlightColor"
                      size="sm"
                      aria-label="Highlight colour"
                    >
                      @for (color of highlightColors; track color.value) {
                        <button scToggleGroupItem [value]="color.value">
                          <span
                            class="ring-foreground/20 size-4 rounded-full ring-1"
                            [style.background-color]="color.value"
                          ></span>
                          <span class="sr-only">{{ color.name }}</span>
                        </button>
                      }
                    </div>
                    <div scField>
                      <label scLabel for="pdf-demo-highlight-thickness">
                        Thickness — {{ viewer.highlightThickness() }}
                      </label>
                      <input
                        id="pdf-demo-highlight-thickness"
                        scSlider
                        scPdfViewerSetting="highlightThickness"
                        [min]="8"
                        [max]="24"
                      />
                    </div>
                    <label scSwitchField>
                      Show all
                      <input scSwitch scPdfViewerSetting="highlightShowAll" />
                    </label>
                  }
                  @case ('freetext') {
                    <div
                      scToggleGroup
                      scPdfViewerSetting="freetextColor"
                      size="sm"
                      aria-label="Text colour"
                    >
                      @for (color of inkColors; track color.value) {
                        <button scToggleGroupItem [value]="color.value">
                          <span
                            class="ring-foreground/20 size-4 rounded-full ring-1"
                            [style.background-color]="color.value"
                          ></span>
                          <span class="sr-only">{{ color.name }}</span>
                        </button>
                      }
                    </div>
                    <div scField>
                      <label scLabel for="pdf-demo-text-size">
                        Size — {{ viewer.freetextSize() }}
                      </label>
                      <input
                        id="pdf-demo-text-size"
                        scSlider
                        scPdfViewerSetting="freetextSize"
                        [min]="5"
                        [max]="100"
                      />
                    </div>
                  }
                  @case ('ink') {
                    <div
                      scToggleGroup
                      scPdfViewerSetting="inkColor"
                      size="sm"
                      aria-label="Drawing colour"
                    >
                      @for (color of inkColors; track color.value) {
                        <button scToggleGroupItem [value]="color.value">
                          <span
                            class="ring-foreground/20 size-4 rounded-full ring-1"
                            [style.background-color]="color.value"
                          ></span>
                          <span class="sr-only">{{ color.name }}</span>
                        </button>
                      }
                    </div>
                    <div scField>
                      <label scLabel for="pdf-demo-ink-thickness">
                        Thickness — {{ viewer.inkThickness() }}
                      </label>
                      <input
                        id="pdf-demo-ink-thickness"
                        scSlider
                        scPdfViewerSetting="inkThickness"
                        [min]="1"
                        [max]="20"
                      />
                    </div>
                    <div scField>
                      <label scLabel for="pdf-demo-ink-opacity">
                        Opacity — {{ viewer.inkOpacity() }}
                      </label>
                      <input
                        id="pdf-demo-ink-opacity"
                        scSlider
                        scPdfViewerSetting="inkOpacity"
                        [min]="0.05"
                        [max]="1"
                        [step]="0.05"
                      />
                    </div>
                  }
                }
              </div>
            </ng-template>
          </div>
          <div scTooltipProvider side="bottom">
            <button
              scButton
              variant="ghost"
              size="icon"
              scTooltipTrigger
              (click)="imageInput.click()"
            >
              <svg siImageIcon></svg>
              <span class="sr-only">Add image</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Add image<span scTooltipArrow></span></div>
            </ng-template>
          </div>
          <input #imageInput type="file" scPdfViewerAddImage class="hidden" />
          <div
            scPopoverProvider
            side="bottom"
            alignment="end"
            [(open)]="signaturesOpen"
          >
            <div scTooltipProvider side="bottom">
              <button
                scButton
                scPopoverTrigger
                variant="ghost"
                size="icon"
                scTooltipTrigger
              >
                <svg siSignatureIcon></svg>
                <span class="sr-only">Signature</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Signature<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-60 gap-3">
                @if (viewer.savedSignatures().length) {
                  <ul class="grid gap-2" aria-label="Saved signatures">
                    @for (
                      signature of viewer.savedSignatures();
                      track signature.id
                    ) {
                      <li class="grid gap-1">
                        <button
                          scButton
                          variant="outline"
                          class="h-16 w-full bg-white p-1 hover:bg-white dark:bg-white"
                          [scPdfViewerSignaturePlace]="signature"
                          (click)="signaturesOpen.set(false)"
                        >
                          <img
                            [src]="signature.dataUrl"
                            alt=""
                            class="max-h-full max-w-full object-contain"
                          />
                          <span class="sr-only">{{
                            'Place signature ' + (signature.description || '')
                          }}</span>
                        </button>
                        <div class="flex items-center justify-between gap-1">
                          <span class="text-muted-foreground truncate text-xs">
                            {{ signature.description || 'No description' }}
                          </span>
                          <button
                            scButton
                            variant="ghost"
                            size="xs"
                            class="text-destructive"
                            [scPdfViewerSignatureRemove]="signature"
                            [attr.aria-label]="
                              'Remove signature ' +
                              (signature.description || '')
                            "
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    }
                  </ul>
                } @else {
                  <p class="text-muted-foreground text-sm">
                    No saved signatures yet.
                  </p>
                }
                <button
                  scPdfViewerSignatureNew
                  class="w-full"
                  (click)="signaturesOpen.set(false)"
                >
                  Add new signature
                </button>
              </div>
            </ng-template>
          </div>

          <div scSeparator orientation="vertical"></div>

          <div scTooltipProvider side="bottom">
            <button scPdfViewerPrint scTooltipTrigger>
              <svg siPrinterIcon></svg>
              <span class="sr-only">Print</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Print<span scTooltipArrow></span></div>
            </ng-template>
          </div>
          <div scTooltipProvider side="bottom">
            <button scPdfViewerDownload scTooltipTrigger>
              <svg siDownloadIcon></svg>
              <span class="sr-only">Download</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Download<span scTooltipArrow></span></div>
            </ng-template>
          </div>

          <div scMenuProvider side="bottom" alignment="end">
            <div scTooltipProvider side="bottom">
              <button
                scButton
                scMenuTrigger
                variant="ghost"
                size="icon"
                scTooltipTrigger
              >
                <svg siEllipsisVerticalIcon></svg>
                <span class="sr-only">More</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>More<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <ng-template scMenuPortal>
              <div scMenu (itemSelected)="onMenuItem($event)">
                <ng-template scMenuContent>
                  <div scMenuItem value="open">Open file…</div>
                  <div scMenuItem value="presentation">Presentation mode</div>
                  <div scMenuItem value="fullscreen">Full screen</div>
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

        <!-- Find bar -->
        @if (viewer.findOpen()) {
          <div scPdfViewerFindbar class="flex-wrap border-b px-2 py-1.5">
            <input
              scInput
              scPdfViewerFindInput
              aria-label="Find in document"
              placeholder="Find in document…"
              class="h-8 w-56"
            />
            <div scTooltipProvider>
              <button scPdfViewerFindPrevious scTooltipTrigger>
                <svg siChevronUpIcon></svg>
                <span class="sr-only">Previous match</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Previous match<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider>
              <button scPdfViewerFindNext scTooltipTrigger>
                <svg siChevronDownIcon></svg>
                <span class="sr-only">Next match</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Next match<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <label scCheckboxField class="ms-2 text-sm">
              <input
                scCheckbox
                [checked]="viewer.findHighlightAll()"
                (checkedChange)="setHighlightAll($event)"
              />
              Highlight all
            </label>
            <label scCheckboxField class="text-sm">
              <input
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
                scCheckbox
                [checked]="viewer.findEntireWord()"
                (checkedChange)="
                  viewer.findEntireWord.set($event);
                  viewer.find(viewer.findQuery())
                "
              />
              Whole words
            </label>
            <span scPdfViewerFindResultsInfo class="ms-auto">
              @switch (viewer.findState()) {
                @case ('not-found') {
                  Phrase not found
                }
                @case ('pending') {
                  Searching…
                }
                @default {
                  @if (viewer.findTotalMatches()) {
                    {{ viewer.findCurrentMatchIndex() + 1 }} of
                    {{ viewer.findTotalMatches() }}
                    @if (viewer.findState() === 'wrapped') {
                      — continued from the top
                    }
                  }
                }
              }
            </span>
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
              <div
                scTabs
                class="flex min-h-0 flex-1 flex-col"
                [value]="sidebarTab()"
                (valueChange)="setSidebarTab($event)"
              >
                <div
                  scTabsList
                  variant="line"
                  aria-label="Sidebar views"
                  class="w-full justify-start border-b px-1"
                  activateOnFocus
                >
                  <div scTooltipProvider>
                    <button scTabsTab value="thumbnails" scTooltipTrigger>
                      <svg siLayoutGridIcon></svg>
                      <span class="sr-only">Pages</span>
                    </button>
                    <ng-template scTooltipPortal>
                      <div scTooltip>Pages<span scTooltipArrow></span></div>
                    </ng-template>
                  </div>
                  <div scTooltipProvider>
                    <button scTabsTab value="outline" scTooltipTrigger>
                      <svg siListTreeIcon></svg>
                      <span class="sr-only">Outline</span>
                    </button>
                    <ng-template scTooltipPortal>
                      <div scTooltip>Outline<span scTooltipArrow></span></div>
                    </ng-template>
                  </div>
                  <div scTooltipProvider>
                    <button scTabsTab value="attachments" scTooltipTrigger>
                      <svg siPaperclipIcon></svg>
                      <span class="sr-only">Attachments</span>
                    </button>
                    <ng-template scTooltipPortal>
                      <div scTooltip>
                        Attachments<span scTooltipArrow></span>
                      </div>
                    </ng-template>
                  </div>
                  <div scTooltipProvider>
                    <button scTabsTab value="layers" scTooltipTrigger>
                      <svg siLayersIcon></svg>
                      <span class="sr-only">Layers</span>
                    </button>
                    <ng-template scTooltipPortal>
                      <div scTooltip>Layers<span scTooltipArrow></span></div>
                    </ng-template>
                  </div>
                  <div scTooltipProvider>
                    <button scTabsTab value="comments" scTooltipTrigger>
                      <svg siMessageSquareIcon></svg>
                      <span class="sr-only">Comments</span>
                    </button>
                    <ng-template scTooltipPortal>
                      <div scTooltip>Comments<span scTooltipArrow></span></div>
                    </ng-template>
                  </div>
                </div>

                <!-- Pages: thumbnails, and page organisation -->
                <div
                  scTabsPanel
                  value="thumbnails"
                  class="flex-1 overflow-y-auto"
                >
                  <ng-template scTabsPanelContent>
                    <div
                      role="toolbar"
                      aria-label="Organise pages"
                      class="bg-background sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b px-2 py-1"
                    >
                      <div scTooltipProvider>
                        <button
                          scPdfViewerInsertPages
                          scTooltipTrigger
                          (insertFailed)="insertFailed.set($event.name)"
                        >
                          <svg siFilePlusIcon></svg>
                          <span class="sr-only">Insert file</span>
                        </button>
                        <ng-template scTooltipPortal>
                          <div scTooltip>
                            Insert a file after this page<span
                              scTooltipArrow
                            ></span>
                          </div>
                        </ng-template>
                      </div>
                      <div scTooltipProvider>
                        <button scPdfViewerPastePages scTooltipTrigger>
                          <svg siClipboardPasteIcon></svg>
                          <span class="sr-only">Paste</span>
                        </button>
                        <ng-template scTooltipPortal>
                          <div scTooltip>
                            Paste after this page<span scTooltipArrow></span>
                          </div>
                        </ng-template>
                      </div>
                      @if (viewer.pageSelection().length) {
                        <div scSeparator orientation="vertical"></div>
                        <div scTooltipProvider>
                          <button scPdfViewerMovePagesEarlier scTooltipTrigger>
                            <svg siArrowUpIcon></svg>
                            <span class="sr-only">Move earlier</span>
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>
                              Move earlier<span scTooltipArrow></span>
                            </div>
                          </ng-template>
                        </div>
                        <div scTooltipProvider>
                          <button scPdfViewerMovePagesLater scTooltipTrigger>
                            <svg siArrowDownIcon></svg>
                            <span class="sr-only">Move later</span>
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>
                              Move later<span scTooltipArrow></span>
                            </div>
                          </ng-template>
                        </div>
                        <div scTooltipProvider>
                          <button scPdfViewerCopyPages scTooltipTrigger>
                            <svg siCopyIcon></svg>
                            <span class="sr-only">Copy</span>
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>
                              Copy<span scTooltipArrow></span>
                            </div>
                          </ng-template>
                        </div>
                        <div scTooltipProvider>
                          <button scPdfViewerCutPages scTooltipTrigger>
                            <svg siScissorsIcon></svg>
                            <span class="sr-only">Cut</span>
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>Cut<span scTooltipArrow></span></div>
                          </ng-template>
                        </div>
                        <div scTooltipProvider>
                          <button scPdfViewerDeletePages scTooltipTrigger>
                            <svg siTrash2Icon></svg>
                            <span class="sr-only">Delete</span>
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>
                              Delete<span scTooltipArrow></span>
                            </div>
                          </ng-template>
                        </div>
                        <div scTooltipProvider>
                          <button scPdfViewerExportPages scTooltipTrigger>
                            <svg siFileOutputIcon></svg>
                            <span class="sr-only">Save selected pages</span>
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>
                              Save selected pages as…<span
                                scTooltipArrow
                              ></span>
                            </div>
                          </ng-template>
                        </div>
                        <span
                          class="text-muted-foreground ms-auto text-xs"
                          role="status"
                        >
                          {{ viewer.pageSelection().length }} selected
                        </span>
                      }
                    </div>
                    @if (insertFailed(); as file) {
                      <p
                        class="text-destructive px-3 pt-2 text-xs"
                        role="alert"
                      >
                        “{{ file }}” isn't a PDF that can be read.
                      </p>
                    }
                    <ul
                      scPdfViewerPages
                      class="grid gap-3 p-3"
                      aria-label="Pages"
                    >
                      @for (page of viewer.pageNumbers(); track page) {
                        <li [scPdfViewerPageItem]="page">
                          <input
                            scCheckbox
                            [scPdfViewerPageSelect]="page"
                            class="absolute start-3 top-3 z-10"
                            [attr.aria-label]="
                              'Select page ' + viewer.pageLabel(page)
                            "
                          />
                          <button
                            scButton
                            variant="ghost"
                            class="h-auto w-full flex-col gap-1 p-2"
                            [scPdfViewerGoToPage]="page"
                          >
                            <img [scPdfViewerThumbnail]="page" alt="" />
                            <span class="text-xs">
                              Page {{ viewer.pageLabel(page) }}
                            </span>
                          </button>
                        </li>
                      }
                    </ul>
                  </ng-template>
                </div>

                <!-- Outline -->
                <div scTabsPanel value="outline" class="flex-1 overflow-y-auto">
                  <ng-template scTabsPanelContent>
                    @if (viewer.outline().length === 0) {
                      <p class="text-muted-foreground p-4 text-center text-sm">
                        No outline in this document.
                      </p>
                    } @else {
                      <div class="flex gap-1 border-b px-2 py-1">
                        <div scTooltipProvider>
                          <button scPdfViewerOutlineExpandAll scTooltipTrigger>
                            <svg siChevronsUpDownIcon></svg>
                            <span class="sr-only">Expand all</span>
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>
                              Expand all<span scTooltipArrow></span>
                            </div>
                          </ng-template>
                        </div>
                        <div scTooltipProvider>
                          <button
                            scPdfViewerOutlineCollapseAll
                            scTooltipTrigger
                          >
                            <svg siChevronsDownUpIcon></svg>
                            <span class="sr-only">Collapse all</span>
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>
                              Collapse all<span scTooltipArrow></span>
                            </div>
                          </ng-template>
                        </div>
                        <div scTooltipProvider>
                          <button
                            scPdfViewerOutlineFindCurrent
                            scTooltipTrigger
                          >
                            <svg siLocateFixedIcon></svg>
                            <span class="sr-only"
                              >Find current outline item</span
                            >
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>
                              Find current outline item<span
                                scTooltipArrow
                              ></span>
                            </div>
                          </ng-template>
                        </div>
                      </div>
                      <nav aria-label="Outline" class="p-2">
                        <ng-container
                          [ngTemplateOutlet]="outlineList"
                          [ngTemplateOutletContext]="{
                            $implicit: viewer.outline(),
                          }"
                        />
                      </nav>
                    }
                  </ng-template>
                </div>

                <!-- Attachments -->
                <div
                  scTabsPanel
                  value="attachments"
                  class="flex-1 overflow-y-auto"
                >
                  <ng-template scTabsPanelContent>
                    @if (viewer.attachments().length === 0) {
                      <p class="text-muted-foreground p-4 text-center text-sm">
                        No attachments in this document.
                      </p>
                    } @else {
                      <ul class="grid gap-1 p-2">
                        @for (
                          attachment of viewer.attachments();
                          track attachment.filename
                        ) {
                          <li>
                            <button
                              scButton
                              variant="ghost"
                              size="sm"
                              class="w-full justify-start"
                              [scPdfViewerAttachment]="attachment"
                            >
                              {{ attachment.filename }}
                            </button>
                          </li>
                        }
                      </ul>
                    }
                  </ng-template>
                </div>

                <!-- Layers -->
                <div scTabsPanel value="layers" class="flex-1 overflow-y-auto">
                  <ng-template scTabsPanelContent>
                    @if (viewer.layers().length === 0) {
                      <p class="text-muted-foreground p-4 text-center text-sm">
                        No layers in this document.
                      </p>
                    } @else {
                      <ul class="grid gap-2 p-3" aria-label="Layers">
                        @for (layer of viewer.layers(); track layer.id) {
                          <li>
                            <label scCheckboxField>
                              <input scCheckbox [scPdfViewerLayer]="layer" />
                              {{ layer.name }}
                            </label>
                          </li>
                        }
                      </ul>
                    }
                  </ng-template>
                </div>

                <!-- Comments -->
                <div scTabsPanel value="comments" class="min-h-0 flex-1">
                  <ng-template scTabsPanelContent>
                    <div class="flex h-full flex-col">
                      <div
                        class="flex items-center justify-between gap-2 border-b px-3 py-2"
                      >
                        <h3 class="text-sm font-medium">
                          Comments ({{ viewer.comments().length }})
                        </h3>
                        @if (!viewer.pendingComment()) {
                          <button scPdfViewerCommentAdd>Add</button>
                        }
                      </div>
                      @if (viewer.editorMode() === 'comment') {
                        <p
                          class="text-muted-foreground border-b p-3 text-sm"
                          role="status"
                        >
                          Click on a page to place your comment.
                        </p>
                      }
                      @if (viewer.pendingComment(); as pending) {
                        <form
                          scPdfViewerCommentForm
                          #commentForm="scPdfViewerCommentForm"
                          class="grid gap-2 border-b p-3"
                        >
                          <textarea
                            scTextarea
                            scPdfViewerCommentInput
                            rows="3"
                            placeholder="Add a comment…"
                            [attr.aria-label]="
                              'Comment on page ' + pending.pageNumber
                            "
                          ></textarea>
                          <div class="flex justify-end gap-2">
                            <button type="button" scPdfViewerCommentCancel>
                              Cancel
                            </button>
                            <button
                              scButton
                              size="sm"
                              type="submit"
                              [disabled]="!commentForm.text().trim()"
                            >
                              Post
                            </button>
                          </div>
                        </form>
                      }
                      <ol class="flex-1 overflow-y-auto">
                        @for (
                          comment of viewer.comments();
                          track comment.id;
                          let index = $index
                        ) {
                          <li
                            [scPdfViewerComment]="comment"
                            class="grid gap-1 border-b p-3"
                          >
                            <div
                              class="flex items-center justify-between gap-2"
                            >
                              <button
                                scButton
                                variant="link"
                                size="xs"
                                class="h-auto px-0"
                                [scPdfViewerCommentShow]="comment"
                              >
                                <span
                                  class="bg-primary text-primary-foreground grid size-5 place-items-center rounded-full text-[0.65rem]"
                                  aria-hidden="true"
                                >
                                  {{ index + 1 }}
                                </span>
                                Page {{ viewer.pageLabel(comment.pageNumber) }}
                              </button>
                              <span class="text-muted-foreground text-xs">
                                {{ comment.date }}
                              </span>
                            </div>
                            @if (editingComment() === comment.id) {
                              <textarea
                                scTextarea
                                rows="2"
                                aria-label="Edit comment"
                                [value]="comment.text"
                                #edit
                              ></textarea>
                              <div class="flex justify-end gap-2">
                                <button
                                  scButton
                                  size="sm"
                                  variant="ghost"
                                  (click)="editingComment.set(null)"
                                >
                                  Cancel
                                </button>
                                <button
                                  scButton
                                  size="sm"
                                  (click)="
                                    viewer.updateComment(
                                      comment.id,
                                      edit.value
                                    );
                                    editingComment.set(null)
                                  "
                                >
                                  Save
                                </button>
                              </div>
                            } @else {
                              <p class="text-sm">{{ comment.text }}</p>
                              <div class="flex justify-end gap-1">
                                <button
                                  scButton
                                  size="sm"
                                  variant="ghost"
                                  (click)="editingComment.set(comment.id)"
                                >
                                  Edit
                                </button>
                                <button
                                  scButton
                                  size="sm"
                                  variant="ghost"
                                  class="text-destructive"
                                  [scPdfViewerCommentRemove]="comment"
                                >
                                  Delete
                                </button>
                              </div>
                            }
                          </li>
                        } @empty {
                          @if (
                            !viewer.pendingComment() &&
                            viewer.editorMode() !== 'comment'
                          ) {
                            <li
                              class="text-muted-foreground p-4 text-center text-sm"
                            >
                              No comments yet.
                            </li>
                          }
                        }
                      </ol>
                    </div>
                  </ng-template>
                </div>
              </div>
            </aside>
            <div scPdfViewerSidebarResizer aria-label="Resize sidebar"></div>
          }

          <div scPdfViewerContent class="flex-1">
            <div scProgress scPdfViewerLoadingBar aria-label="Loading document">
              <div scProgressTrack><div scProgressRange></div></div>
            </div>
            <div scPdfViewerLoading>
              <svg scSpinner siLoaderCircleIcon></svg>
              Loading document…
            </div>
            <div scEmpty scPdfViewerError>
              <div scEmptyHeader>
                <div scEmptyMedia variant="icon">
                  <svg siCircleAlertIcon></svg>
                </div>
                <div scEmptyTitle>Couldn't load the document</div>
                <div scEmptyDescription>
                  @switch (viewer.error()?.kind) {
                    @case ('invalid') {
                      The file isn't a valid PDF.
                    }
                    @case ('missing') {
                      The file wasn't found.
                    }
                    @case ('network') {
                      It couldn't be downloaded. Check your connection.
                    }
                    @case ('password') {
                      It needs a password.
                    }
                    @default {
                      Something went wrong while opening it.
                    }
                  }
                </div>
              </div>
              <div scEmptyBody>
                <button scPdfViewerRetry>Try again</button>
              </div>
            </div>
            <div scEmpty scPdfViewerEmpty>
              <div scEmptyHeader>
                <div scEmptyMedia variant="icon">
                  <svg siFileTextIcon></svg>
                </div>
                <div scEmptyTitle>No document</div>
                <div scEmptyDescription>Open a PDF to view it here.</div>
              </div>
              <div scEmptyBody>
                <button scButton (click)="viewer.openFile()">Open file…</button>
              </div>
            </div>

            <div scPdfViewerCanvas>
              <!-- The selected annotation's toolbar -->
              <ng-template scPdfViewerAnnotationToolbar let-annotation>
                <div
                  class="bg-popover flex items-center gap-1 rounded-md border p-1 shadow-md"
                >
                  @if (annotation.type === 'highlight') {
                    @for (color of highlightColors; track color.value) {
                      <button
                        scButton
                        variant="ghost"
                        size="icon-xs"
                        [scPdfViewerAnnotationColor]="annotation"
                        [color]="color.value"
                      >
                        <span
                          class="ring-foreground/20 size-3.5 rounded-full ring-1"
                          [style.background-color]="color.value"
                        ></span>
                        <span class="sr-only">{{ color.name }}</span>
                      </button>
                    }
                  }
                  @if (
                    annotation.type === 'stamp' ||
                    annotation.type === 'signature'
                  ) {
                    <button
                      scButton
                      variant="outline"
                      size="xs"
                      class="max-w-32 truncate"
                      [scPdfViewerAnnotationAltText]="annotation"
                    >
                      @if (annotation.isDecorative) {
                        Decorative
                      } @else if (annotation.altText) {
                        {{ annotation.altText }}
                      } @else {
                        Add alt text
                      }
                    </button>
                  }
                  <button
                    scButton
                    variant="outline"
                    size="xs"
                    [scPdfViewerAnnotationDelete]="annotation"
                  >
                    Delete
                  </button>
                </div>
              </ng-template>

              <!-- Comment markers -->
              <ng-template
                scPdfViewerCommentMarker
                let-comment
                let-index="index"
                let-active="active"
                let-pending="pending"
              >
                @if (pending) {
                  <span
                    class="border-primary bg-background text-primary grid size-6 place-items-center rounded-full border-2 text-xs font-medium shadow-sm"
                    aria-hidden="true"
                  >
                    +
                  </span>
                } @else if (comment) {
                  <button
                    scButton
                    size="icon-xs"
                    class="rounded-full shadow-sm"
                    [class.ring-3]="active"
                    [class.ring-ring/50]="active"
                    [scPdfViewerCommentShow]="comment"
                    [attr.aria-label]="'Comment ' + (index + 1)"
                  >
                    {{ index + 1 }}
                  </button>
                }
              </ng-template>
            </div>
          </div>

          <!-- Undo bar -->
          <div scPdfViewerUndoBar>
            @if (viewer.undoable(); as undo) {
              <span>
                @switch (undo.kind) {
                  @case ('annotation-deleted') {
                    Annotation deleted
                  }
                  @case ('annotations-cleared') {
                    {{ undo.count }} annotations cleared
                  }
                  @case ('pages-moved') {
                    {{ undo.count === 1 ? 'Page' : undo.count + ' pages' }}
                    moved
                  }
                  @case ('pages-deleted') {
                    {{ undo.count === 1 ? 'Page' : undo.count + ' pages' }}
                    deleted
                  }
                  @case ('pages-pasted') {
                    {{ undo.count === 1 ? 'Page' : undo.count + ' pages' }}
                    pasted
                  }
                  @case ('pages-inserted') {
                    {{ undo.count === 1 ? '1 page' : undo.count + ' pages' }}
                    inserted
                  }
                }
              </span>
              <button scPdfViewerUndo>Undo</button>
              <button scPdfViewerUndoDismiss>Dismiss</button>
            }
          </div>
        </div>

        <!-- Password dialog -->
        <div scDialogProvider scPdfViewerDialog="password">
          <ng-template scDialogPortal>
            <div scDialog>
              <form
                scPdfViewerPasswordForm
                #passwordForm="scPdfViewerPasswordForm"
              >
                <div scDialogHeader>
                  <h2 scDialogTitle>Password required</h2>
                  <p
                    scDialogDescription
                    [class.text-destructive]="passwordForm.incorrect()"
                  >
                    @if (passwordForm.incorrect()) {
                      Incorrect password. Try again.
                    } @else {
                      This document is protected. Enter its password to open it.
                    }
                  </p>
                </div>
                <div scField>
                  <label scLabel for="pdf-demo-password">Password</label>
                  <input
                    id="pdf-demo-password"
                    scInput
                    scPdfViewerPasswordInput
                  />
                </div>
                <div scDialogFooter>
                  <button scDialogClose variant="outline" size="default">
                    Cancel
                  </button>
                  <button
                    scButton
                    type="submit"
                    [disabled]="!passwordForm.password()"
                  >
                    Open
                  </button>
                </div>
              </form>
            </div>
          </ng-template>
        </div>

        <!-- Print preparation -->
        <div scDialogProvider scPdfViewerDialog="print">
          <ng-template scDialogPortal>
            <div scDialog class="sm:w-sm">
              <div scDialogHeader>
                <h2 scDialogTitle>Preparing to print</h2>
                <p scDialogDescription>
                  {{ viewer.printProgress() }}% of the pages ready
                </p>
              </div>
              <div
                scProgress
                scPdfViewerPrintProgress
                aria-label="Print preparation"
              >
                <div scProgressTrack><div scProgressRange></div></div>
              </div>
              <div scDialogFooter>
                <button scDialogClose variant="outline" size="default">
                  Cancel
                </button>
              </div>
            </div>
          </ng-template>
        </div>

        <!-- Alt text -->
        <div scDialogProvider scPdfViewerDialog="altText">
          <ng-template scDialogPortal>
            <div scDialog>
              <div scDialogHeader>
                <h2 scDialogTitle>Alternative text</h2>
                <p scDialogDescription>
                  Alt text describes the image for people who can't see it.
                </p>
              </div>
              <form scPdfViewerAltTextForm #altForm="scPdfViewerAltTextForm">
                <div scRadioGroup aria-label="Alternative text">
                  <div scRadioField>
                    <input
                      type="radio"
                      scRadio
                      scPdfViewerAltTextKind="describe"
                    />
                    <label scLabel>Add a description</label>
                    <p scFieldDescription>
                      One or two sentences about the subject, setting or action.
                    </p>
                  </div>
                  <div scRadioField>
                    <input
                      type="radio"
                      scRadio
                      scPdfViewerAltTextKind="decorative"
                    />
                    <label scLabel>Mark as decorative</label>
                    <p scFieldDescription>
                      For ornaments like borders or watermarks.
                    </p>
                  </div>
                </div>
                @if (!altForm.decorative()) {
                  <textarea
                    scTextarea
                    scPdfViewerAltTextInput
                    rows="3"
                    aria-label="Description"
                    placeholder="A young man sits down at a table to eat a meal"
                  ></textarea>
                }
                <div scDialogFooter>
                  <button scDialogClose variant="outline" size="default">
                    Cancel
                  </button>
                  <button scButton type="submit">Save</button>
                </div>
              </form>
            </div>
          </ng-template>
        </div>

        <!-- Signature -->
        <div scDialogProvider scPdfViewerDialog="signature">
          <ng-template scDialogPortal>
            <div
              scDialog
              scPdfViewerSignatureForm
              #signature="scPdfViewerSignatureForm"
              class="sm:w-xl sm:max-w-xl"
            >
              <div scDialogHeader>
                <h2 scDialogTitle>Add a signature</h2>
              </div>

              <div
                scTabs
                [value]="signature.mode()"
                (valueChange)="signature.setMode($event)"
              >
                <div scTabsList aria-label="Signature type" activateOnFocus>
                  <button scTabsTab value="type">Type</button>
                  <button scTabsTab value="draw">Draw</button>
                  <button scTabsTab value="image">Image</button>
                </div>

                <div scTabsPanel value="type">
                  <ng-template scTabsPanelContent>
                    <input
                      scInput
                      scPdfViewerSignatureName
                      aria-label="Signature"
                      placeholder="Your name"
                    />
                  </ng-template>
                </div>

                <div scTabsPanel value="draw">
                  <ng-template scTabsPanelContent>
                    <div class="grid gap-3">
                      <div class="relative h-36">
                        @if (!signature.strokes().length) {
                          <span
                            class="pointer-events-none absolute inset-0 grid place-items-center text-sm text-neutral-500"
                          >
                            Draw your signature here
                          </span>
                        }
                        <canvas
                          scPdfViewerSignaturePad
                          aria-label="Signature drawing area"
                        ></canvas>
                      </div>
                      <div scField>
                        <label scLabel for="pdf-demo-signature-thickness">
                          Thickness — {{ signature.thickness() }}
                        </label>
                        <input
                          id="pdf-demo-signature-thickness"
                          scSlider
                          [min]="1"
                          [max]="6"
                          [(value)]="signature.thickness"
                        />
                      </div>
                    </div>
                  </ng-template>
                </div>

                <div scTabsPanel value="image">
                  <ng-template scTabsPanelContent>
                    <div
                      class="flex h-36 flex-col items-center justify-center gap-2 rounded-lg border bg-white"
                    >
                      @if (signature.image(); as preview) {
                        <img
                          [src]="preview"
                          alt="Signature preview"
                          class="max-h-32 max-w-full object-contain"
                        />
                      } @else {
                        <button
                          scButton
                          variant="outline"
                          (click)="signatureFile.click()"
                        >
                          Choose an image…
                        </button>
                      }
                      <input
                        #signatureFile
                        type="file"
                        scPdfViewerSignatureImage
                        class="hidden"
                      />
                    </div>
                  </ng-template>
                </div>
              </div>

              <div scField>
                <label scLabel for="pdf-demo-signature-description">
                  Description
                </label>
                <input
                  id="pdf-demo-signature-description"
                  scInput
                  scPdfViewerSignatureDescription
                  placeholder="e.g. My signature"
                />
              </div>

              <label scCheckboxField>
                <input scCheckbox [(checked)]="signature.saveForReuse" />
                Save signature for later
              </label>

              <div scDialogFooter class="sm:justify-between">
                <button scPdfViewerSignatureClear>Clear</button>
                <div class="flex gap-2">
                  <button scDialogClose variant="outline" size="default">
                    Cancel
                  </button>
                  <button scPdfViewerSignatureAdd>Add</button>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>

      <!-- Outline (inside scPdfViewer, so its parts find the viewer):
           disclosure toggles — Shift+click does the whole branch — and links. -->
      <ng-template #outlineList let-items>
        <ul class="grid gap-0.5">
          @for (item of asOutline(items); track item.id) {
            <li>
              <div class="flex items-start">
                @if (item.items.length) {
                  <button
                    scButton
                    variant="ghost"
                    size="icon-xs"
                    class="mt-0.5 shrink-0"
                    [scPdfViewerOutlineToggle]="item"
                  >
                    <svg siChevronRightIcon></svg>
                    <span class="sr-only">{{ item.title }}</span>
                  </button>
                } @else {
                  <span class="w-6 shrink-0"></span>
                }
                <button
                  scButton
                  variant="ghost"
                  size="sm"
                  class="h-auto min-w-0 flex-1 justify-start py-1 text-start whitespace-normal"
                  [scPdfViewerOutlineItem]="item"
                >
                  {{ item.title }}
                </button>
              </div>
              @if (item.items.length && viewer.outlineExpanded().has(item.id)) {
                <div class="ps-4">
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

      <!-- Document properties (the viewer reads them; the text is yours) -->
      <div scDialogProvider scPdfViewerDialog="properties">
        <ng-template scDialogPortal>
          <div scDialog class="sm:max-w-lg">
            <div scDialogHeader>
              <h2 scDialogTitle>Document properties</h2>
            </div>
            @if (viewer.documentProperties(); as props) {
              <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                <dt class="text-muted-foreground">File name</dt>
                <dd class="break-words">{{ props.fileName }}</dd>
                <dt class="text-muted-foreground">File size</dt>
                <dd>{{ fileSize(props.fileSize) }}</dd>
                <dt class="text-muted-foreground">Title</dt>
                <dd class="break-words">{{ props.title ?? '—' }}</dd>
                <dt class="text-muted-foreground">Author</dt>
                <dd class="break-words">{{ props.author ?? '—' }}</dd>
                <dt class="text-muted-foreground">Subject</dt>
                <dd class="break-words">{{ props.subject ?? '—' }}</dd>
                <dt class="text-muted-foreground">Keywords</dt>
                <dd class="break-words">{{ props.keywords ?? '—' }}</dd>
                <dt class="text-muted-foreground">Created</dt>
                <dd>{{ props.creationDate?.toLocaleString() ?? '—' }}</dd>
                <dt class="text-muted-foreground">Modified</dt>
                <dd>{{ props.modificationDate?.toLocaleString() ?? '—' }}</dd>
                <dt class="text-muted-foreground">Creator</dt>
                <dd class="break-words">{{ props.creator ?? '—' }}</dd>
                <dt class="text-muted-foreground">PDF producer</dt>
                <dd class="break-words">{{ props.producer ?? '—' }}</dd>
                <dt class="text-muted-foreground">PDF version</dt>
                <dd>{{ props.version ?? '—' }}</dd>
                <dt class="text-muted-foreground">Page count</dt>
                <dd>{{ props.pageCount }}</dd>
                <dt class="text-muted-foreground">Page size</dt>
                <dd>{{ pageSize(props.pageSize) }}</dd>
                <dt class="text-muted-foreground">Fast Web View</dt>
                <dd>{{ props.linearized ? 'Yes' : 'No' }}</dd>
              </dl>
            } @else {
              <p class="text-muted-foreground text-sm">Loading…</p>
            }
            <div scDialogFooter>
              <button scDialogClose variant="default" size="default">
                Close
              </button>
            </div>
          </div>
        </ng-template>
      </div>
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

  private readonly viewerRef = viewChild<ScPdfViewer>('viewer');

  readonly pdfSrc = signal(
    'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  );
  readonly fileName = signal('tracemonkey');

  readonly sidebarOpen = signal(false);
  readonly sidebarTab = signal<ScPdfSidebarView>('thumbnails');
  readonly signaturesOpen = signal(false);
  /** The comment being edited in the list. */
  readonly editingComment = signal<string | null>(null);
  /** The name of a file that couldn't be inserted. */
  readonly insertFailed = signal<string | null>(null);

  protected readonly highlightColors = HIGHLIGHT_COLORS;
  protected readonly inkColors = INK_COLORS;

  /** The tool selected in the toggle group, if any. */
  protected readonly selectedTool = computed(() => {
    const mode = this.viewerRef()?.editorMode() ?? 'none';
    return TOOLS.includes(mode) ? mode : null;
  });

  /** The active tool, if it has options. */
  protected readonly activeTool = computed(() => {
    const mode = this.viewerRef()?.editorMode() ?? 'none';
    return TOOLS_WITH_OPTIONS.includes(mode) ? mode : null;
  });

  constructor() {
    // Placing or picking a comment shows the comments.
    effect(() => {
      const viewer = this.viewerRef();
      if (!viewer) return;
      if (
        viewer.editorMode() === 'comment' ||
        viewer.pendingComment() ||
        viewer.activeCommentId()
      ) {
        this.sidebarOpen.set(true);
        this.sidebarTab.set('comments');
      }
    });
  }

  protected setTool(value: string | string[] | null): void {
    this.viewerRef()?.setEditorMode(
      typeof value === 'string' ? (value as ScPdfEditorMode) : 'none',
    );
  }

  protected setSidebarTab(value: unknown): void {
    this.sidebarTab.set(value as ScPdfSidebarView);
  }

  protected setHighlightAll(value: boolean): void {
    const viewer = this.viewerRef();
    if (!viewer) return;
    viewer.findHighlightAll.set(value);
    viewer.findTrigger.update((v) => v + 1);
  }

  /** Types the outline template's context. */
  protected asOutline(items: unknown): ScPdfOutlineItem[] {
    return items as ScPdfOutlineItem[];
  }

  protected onMenuItem(value: unknown): void {
    const viewer = this.viewerRef();
    if (!viewer) return;
    switch (value) {
      case 'open':
        viewer.openFile();
        break;
      case 'presentation':
        viewer.togglePresentation();
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
        viewer.openProperties();
        break;
    }
  }

  protected fileSize(bytes: number | null): string {
    if (bytes === null) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  /** E.g. "8.27 × 11.69 in (210 × 297 mm, A4, portrait)". */
  protected pageSize(size: ScPdfDocumentProperties['pageSize']): string {
    if (!size) return '—';
    const inches = (points: number) => (points / 72).toFixed(2);
    const mm = (points: number) => ((points / 72) * 25.4).toFixed(0);
    const paper = size.paper ? `${PAPER_NAMES[size.paper]}, ` : '';
    return `${inches(size.width)} × ${inches(size.height)} in (${mm(size.width)} × ${mm(size.height)} mm, ${paper}${size.orientation})`;
  }
}
