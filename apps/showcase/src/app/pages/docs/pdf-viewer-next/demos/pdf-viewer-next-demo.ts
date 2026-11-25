import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScCheckbox,
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
  ScFrame,
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
  ScRadioGroup,
  ScSeparator,
  ScSlider,
  ScSpinner,
  ScSwitch,
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
  type ScPdfOutlineItem,
  ScPdfViewerNext,
  ScPdfViewerNextAddImage,
  ScPdfViewerNextAltTextForm,
  ScPdfViewerNextAltTextInput,
  ScPdfViewerNextAltTextKind,
  ScPdfViewerNextAttachment,
  ScPdfViewerNextBack,
  ScPdfViewerNextCanvas,
  ScPdfViewerNextComment,
  ScPdfViewerNextCommentCancel,
  ScPdfViewerNextCommentEdit,
  ScPdfViewerNextCommentForm,
  ScPdfViewerNextCommentInput,
  ScPdfViewerNextCommentRemove,
  ScPdfViewerNextCommentShow,
  ScPdfViewerNextContainer,
  ScPdfViewerNextContent,
  ScPdfViewerNextCopyPages,
  ScPdfViewerNextCutPages,
  ScPdfViewerNextDeletePages,
  ScPdfViewerNextDialog,
  ScPdfViewerNextDownload,
  ScPdfViewerNextEmpty,
  ScPdfViewerNextError,
  ScPdfViewerNextExportPages,
  ScPdfViewerNextFindInput,
  ScPdfViewerNextFindNext,
  ScPdfViewerNextFindPrevious,
  ScPdfViewerNextFindResultsInfo,
  ScPdfViewerNextFindToggle,
  ScPdfViewerNextFindbar,
  ScPdfViewerNextForward,
  ScPdfViewerNextGoToPage,
  ScPdfViewerNextInsertPages,
  ScPdfViewerNextLayer,
  ScPdfViewerNextLoading,
  ScPdfViewerNextLoadingBar,
  ScPdfViewerNextMenu,
  ScPdfViewerNextMovePagesEarlier,
  ScPdfViewerNextMovePagesLater,
  ScPdfViewerNextNav,
  ScPdfViewerNextNextPage,
  ScPdfViewerNextOpenFile,
  ScPdfViewerNextOutlineCollapseAll,
  ScPdfViewerNextOutlineExpandAll,
  ScPdfViewerNextOutlineFindCurrent,
  ScPdfViewerNextOutlineItem,
  ScPdfViewerNextOutlineToggle,
  ScPdfViewerNextPageInput,
  ScPdfViewerNextPageItem,
  ScPdfViewerNextPageSelect,
  ScPdfViewerNextPages,
  ScPdfViewerNextPasswordForm,
  ScPdfViewerNextPasswordInput,
  ScPdfViewerNextPastePages,
  ScPdfViewerNextPrevPage,
  ScPdfViewerNextPrint,
  ScPdfViewerNextPrintProgress,
  ScPdfViewerNextRetry,
  ScPdfViewerNextSetting,
  ScPdfViewerNextSidebarResizer,
  ScPdfViewerNextSidebarToggle,
  ScPdfViewerNextSignatureAdd,
  ScPdfViewerNextSignatureClear,
  ScPdfViewerNextSignatureDescription,
  ScPdfViewerNextSignatureForm,
  ScPdfViewerNextSignatureImage,
  ScPdfViewerNextSignatureMode,
  ScPdfViewerNextSignatureName,
  ScPdfViewerNextSignatureNew,
  ScPdfViewerNextSignaturePad,
  ScPdfViewerNextSignaturePlace,
  ScPdfViewerNextSignatureRemove,
  ScPdfViewerNextSpacer,
  ScPdfViewerNextThumbnail,
  ScPdfViewerNextToolbar,
  ScPdfViewerNextUndo,
  ScPdfViewerNextUndoBar,
  ScPdfViewerNextUndoDismiss,
  ScPdfViewerNextZoom,
  ScPdfViewerNextZoomIn,
  ScPdfViewerNextZoomOut,
  ScPdfViewerNextZoomSelect,
} from '@semantic-components/ui/pdf-viewer-next';
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
/** The swatches offered for highlights: the theme's (as pdf.js's). */
const HIGHLIGHT_COLORS = [
  { name: 'Yellow', value: 'var(--sc-pdf-viewer-highlight-1)' },
  { name: 'Green', value: 'var(--sc-pdf-viewer-highlight-2)' },
  { name: 'Blue', value: 'var(--sc-pdf-viewer-highlight-3)' },
  { name: 'Pink', value: 'var(--sc-pdf-viewer-highlight-4)' },
  { name: 'Red', value: 'var(--sc-pdf-viewer-highlight-5)' },
];

/** The swatches offered for text and drawings: the theme's. */
const INK_COLORS = [
  { name: 'Black', value: 'var(--sc-pdf-viewer-ink-1)' },
  { name: 'Red', value: 'var(--sc-pdf-viewer-ink-2)' },
  { name: 'Blue', value: 'var(--sc-pdf-viewer-ink-3)' },
  { name: 'Green', value: 'var(--sc-pdf-viewer-ink-4)' },
];

@Component({
  selector: 'app-pdf-viewer-next-demo',
  imports: [
    ScFrame,
    NgTemplateOutlet,
    DecimalPipe,
    ScPdfViewerNext,
    ScPdfViewerNextContainer,
    ScPdfViewerNextToolbar,
    ScPdfViewerNextNav,
    ScPdfViewerNextBack,
    ScPdfViewerNextForward,
    ScPdfViewerNextPrevPage,
    ScPdfViewerNextNextPage,
    ScPdfViewerNextPageInput,
    ScPdfViewerNextZoom,
    ScPdfViewerNextZoomIn,
    ScPdfViewerNextZoomOut,
    ScPdfViewerNextZoomSelect,
    ScPdfViewerNextSetting,
    ScPdfViewerNextPrint,
    ScPdfViewerNextDownload,
    ScPdfViewerNextSpacer,
    ScPdfViewerNextFindToggle,
    ScPdfViewerNextMenu,
    ScPdfViewerNextOpenFile,
    ScPdfViewerNextSidebarToggle,
    ScPdfViewerNextSignatureMode,
    ScPdfViewerNextFindbar,
    ScPdfViewerNextFindInput,
    ScPdfViewerNextFindNext,
    ScPdfViewerNextFindPrevious,
    ScPdfViewerNextFindResultsInfo,
    ScPdfViewerNextContent,
    ScPdfViewerNextLoading,
    ScPdfViewerNextLoadingBar,
    ScPdfViewerNextError,
    ScPdfViewerNextEmpty,
    ScPdfViewerNextRetry,
    ScPdfViewerNextCanvas,
    ScPdfViewerNextAddImage,
    ScPdfViewerNextUndoBar,
    ScPdfViewerNextUndo,
    ScPdfViewerNextUndoDismiss,
    ScPdfViewerNextSidebarResizer,
    ScPdfViewerNextPages,
    ScPdfViewerNextPageItem,
    ScPdfViewerNextPageSelect,
    ScPdfViewerNextGoToPage,
    ScPdfViewerNextThumbnail,
    ScPdfViewerNextMovePagesEarlier,
    ScPdfViewerNextMovePagesLater,
    ScPdfViewerNextCopyPages,
    ScPdfViewerNextCutPages,
    ScPdfViewerNextPastePages,
    ScPdfViewerNextDeletePages,
    ScPdfViewerNextExportPages,
    ScPdfViewerNextInsertPages,
    ScPdfViewerNextOutlineItem,
    ScPdfViewerNextOutlineToggle,
    ScPdfViewerNextOutlineExpandAll,
    ScPdfViewerNextOutlineCollapseAll,
    ScPdfViewerNextOutlineFindCurrent,
    ScPdfViewerNextAttachment,
    ScPdfViewerNextLayer,
    ScPdfViewerNextComment,
    ScPdfViewerNextCommentForm,
    ScPdfViewerNextCommentInput,
    ScPdfViewerNextCommentCancel,
    ScPdfViewerNextCommentShow,
    ScPdfViewerNextCommentEdit,
    ScPdfViewerNextCommentRemove,
    ScPdfViewerNextDialog,
    ScPdfViewerNextPasswordForm,
    ScPdfViewerNextPasswordInput,
    ScPdfViewerNextPrintProgress,
    ScPdfViewerNextAltTextForm,
    ScPdfViewerNextAltTextInput,
    ScPdfViewerNextAltTextKind,
    ScPdfViewerNextSignatureForm,
    ScPdfViewerNextSignatureName,
    ScPdfViewerNextSignaturePad,
    ScPdfViewerNextSignatureImage,
    ScPdfViewerNextSignatureDescription,
    ScPdfViewerNextSignatureAdd,
    ScPdfViewerNextSignatureClear,
    ScPdfViewerNextSignaturePlace,
    ScPdfViewerNextSignatureRemove,
    ScPdfViewerNextSignatureNew,
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
    ScRadioGroup,
    ScRadio,
    ScSlider,
    ScSwitch,
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
      scPdfViewerNext
      class="size-full"
      [src]="pdfSrc()"
      [fileName]="fileName()"
      [enablePermissions]="true"
      #viewer="scPdfViewerNext"
    >
      <div
        scPdfViewerNextContainer
        class="flex size-full flex-col rounded-none border-0"
      >
        <!-- Toolbar -->
        <div
          scPdfViewerNextToolbar
          aria-label="PDF viewer toolbar"
          class="flex-wrap gap-1 px-2 py-1.5"
        >
          <div scTooltipProvider side="bottom">
            <button scPdfViewerNextSidebarToggle scTooltipTrigger>
              <svg siPanelLeftIcon></svg>
              <span class="sr-only">Sidebar</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Sidebar<span scTooltipArrow></span></div>
            </ng-template>
          </div>
          <div scTooltipProvider side="bottom">
            <button scPdfViewerNextFindToggle scTooltipTrigger>
              <svg siSearchIcon></svg>
              <span class="sr-only">Find in document</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Find in document<span scTooltipArrow></span></div>
            </ng-template>
          </div>

          <div scSeparator orientation="vertical"></div>

          <div scPdfViewerNextNav aria-label="Page navigation">
            <div scTooltipProvider side="bottom">
              <button scPdfViewerNextBack scTooltipTrigger>
                <svg siArrowLeftIcon></svg>
                <span class="sr-only">Back</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Back<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scPdfViewerNextForward scTooltipTrigger>
                <svg siArrowRightIcon></svg>
                <span class="sr-only">Forward</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Forward<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scPdfViewerNextPrevPage scTooltipTrigger>
                <svg siChevronUpIcon></svg>
                <span class="sr-only">Previous page</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Previous page<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scPdfViewerNextNextPage scTooltipTrigger>
                <svg siChevronDownIcon></svg>
                <span class="sr-only">Next page</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Next page<span scTooltipArrow></span></div>
              </ng-template>
            </div>
          </div>
          <input scInput scPdfViewerNextPageInput aria-label="Page" />
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

          <div scPdfViewerNextZoom aria-label="Zoom controls">
            <div scTooltipProvider side="bottom">
              <button scPdfViewerNextZoomOut scTooltipTrigger>
                <svg siZoomOutIcon></svg>
                <span class="sr-only">Zoom out</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Zoom out<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider side="bottom">
              <button scPdfViewerNextZoomIn scTooltipTrigger>
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
              scPdfViewerNextZoomSelect
              aria-label="Zoom"
              #zoom="scPdfViewerNextZoomSelect"
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
                    scPdfViewerNextSetting="cursorTool"
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
                    scPdfViewerNextSetting="scrollMode"
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
                    scPdfViewerNextSetting="spreadMode"
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

          <div scPdfViewerNextSpacer></div>

          <!-- Annotation tools (off when the document forbids changes) -->
          <div
            scToggleGroup
            aria-label="Annotation tool"
            scPdfViewerNextSetting="editorMode"
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
                [disabled]="!viewer.toolSettings()"
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
                @switch (viewer.toolSettings()) {
                  @case ('highlight') {
                    <div
                      scToggleGroup
                      scPdfViewerNextSetting="highlightColor"
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
                        scPdfViewerNextSetting="highlightThickness"
                        [min]="8"
                        [max]="24"
                      />
                    </div>
                    <label scField orientation="horizontal">
                      Show all
                      <input
                        scSwitch
                        scPdfViewerNextSetting="highlightShowAll"
                      />
                    </label>
                  }
                  @case ('freetext') {
                    <div
                      scToggleGroup
                      scPdfViewerNextSetting="freetextColor"
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
                        scPdfViewerNextSetting="freetextSize"
                        [min]="5"
                        [max]="100"
                      />
                    </div>
                  }
                  @case ('ink') {
                    <div
                      scToggleGroup
                      scPdfViewerNextSetting="inkColor"
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
                        scPdfViewerNextSetting="inkThickness"
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
                        scPdfViewerNextSetting="inkOpacity"
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
            <button scPdfViewerNextAddImage scTooltipTrigger>
              <svg siImageIcon></svg>
              <span class="sr-only">Add image</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Add image<span scTooltipArrow></span></div>
            </ng-template>
          </div>
          <div scPopoverProvider side="bottom" alignment="end">
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
                          [scPdfViewerNextSignaturePlace]="signature"
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
                            [scPdfViewerNextSignatureRemove]="signature"
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
                <button scPdfViewerNextSignatureNew class="w-full">
                  Add new signature
                </button>
              </div>
            </ng-template>
          </div>

          <div scSeparator orientation="vertical"></div>

          <div scTooltipProvider side="bottom">
            <button scPdfViewerNextPrint scTooltipTrigger>
              <svg siPrinterIcon></svg>
              <span class="sr-only">Print</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Print<span scTooltipArrow></span></div>
            </ng-template>
          </div>
          <div scTooltipProvider side="bottom">
            <button scPdfViewerNextDownload scTooltipTrigger>
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
              <div scMenu scPdfViewerNextMenu>
                <ng-template scMenuContent>
                  <div scMenuItem value="open">Open file…</div>
                  <div scMenuItem value="presentation">Presentation mode</div>
                  <div scMenuItem value="fullscreen">Full screen</div>
                  <div scMenuSeparator></div>
                  <div scMenuItem value="first-page">Go to first page</div>
                  <div scMenuItem value="last-page">Go to last page</div>
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
          <div scPdfViewerNextFindbar class="flex-wrap border-b px-2 py-1.5">
            <input
              scInput
              scPdfViewerNextFindInput
              aria-label="Find in document"
              placeholder="Find in document…"
              class="h-8 w-56"
            />
            <div scTooltipProvider>
              <button scPdfViewerNextFindPrevious scTooltipTrigger>
                <svg siChevronUpIcon></svg>
                <span class="sr-only">Previous match</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Previous match<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider>
              <button scPdfViewerNextFindNext scTooltipTrigger>
                <svg siChevronDownIcon></svg>
                <span class="sr-only">Next match</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Next match<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <label scField orientation="horizontal" class="ms-2 text-sm">
              <input scCheckbox scPdfViewerNextSetting="findHighlightAll" />
              Highlight all
            </label>
            <label scField orientation="horizontal" class="text-sm">
              <input scCheckbox scPdfViewerNextSetting="findMatchCase" />
              Match case
            </label>
            <label scField orientation="horizontal" class="text-sm">
              <input scCheckbox scPdfViewerNextSetting="findMatchDiacritics" />
              Match diacritics
            </label>
            <label scField orientation="horizontal" class="text-sm">
              <input scCheckbox scPdfViewerNextSetting="findEntireWord" />
              Whole words
            </label>
            <span scPdfViewerNextFindResultsInfo class="ms-auto">
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
          @if (viewer.sidebarOpen()) {
            <aside
              class="bg-background flex shrink-0 flex-col border-e"
              aria-label="Document sidebar"
              [style.width.px]="viewer.sidebarWidth()"
            >
              <div
                scTabs
                class="flex min-h-0 flex-1 flex-col"
                scPdfViewerNextSetting="sidebarView"
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
                        <button scPdfViewerNextInsertPages scTooltipTrigger>
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
                        <button scPdfViewerNextPastePages scTooltipTrigger>
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
                          <button
                            scPdfViewerNextMovePagesEarlier
                            scTooltipTrigger
                          >
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
                          <button
                            scPdfViewerNextMovePagesLater
                            scTooltipTrigger
                          >
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
                          <button scPdfViewerNextCopyPages scTooltipTrigger>
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
                          <button scPdfViewerNextCutPages scTooltipTrigger>
                            <svg siScissorsIcon></svg>
                            <span class="sr-only">Cut</span>
                          </button>
                          <ng-template scTooltipPortal>
                            <div scTooltip>Cut<span scTooltipArrow></span></div>
                          </ng-template>
                        </div>
                        <div scTooltipProvider>
                          <button scPdfViewerNextDeletePages scTooltipTrigger>
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
                          <button scPdfViewerNextExportPages scTooltipTrigger>
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
                    @if (viewer.insertFailed(); as file) {
                      <p
                        class="text-destructive px-3 pt-2 text-xs"
                        role="alert"
                      >
                        “{{ file }}” isn't a PDF that can be read.
                      </p>
                    }
                    <ul
                      scPdfViewerNextPages
                      class="grid gap-3 p-3"
                      aria-label="Pages"
                    >
                      @for (page of viewer.pageNumbers(); track page) {
                        <li [scPdfViewerNextPageItem]="page">
                          <input
                            scCheckbox
                            [scPdfViewerNextPageSelect]="page"
                            class="absolute start-3 top-3 z-10"
                            [attr.aria-label]="
                              'Select page ' + viewer.pageLabel(page)
                            "
                          />
                          <button
                            scButton
                            variant="ghost"
                            class="h-auto w-full flex-col gap-1 p-2"
                            [scPdfViewerNextGoToPage]="page"
                          >
                            <img [scPdfViewerNextThumbnail]="page" alt="" />
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
                          <button
                            scPdfViewerNextOutlineExpandAll
                            scTooltipTrigger
                          >
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
                            scPdfViewerNextOutlineCollapseAll
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
                            scPdfViewerNextOutlineFindCurrent
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
                              [scPdfViewerNextAttachment]="attachment"
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
                            <label scField orientation="horizontal">
                              <input
                                scCheckbox
                                [scPdfViewerNextLayer]="layer"
                              />
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
                      </div>
                      @if (viewer.pendingComment(); as pending) {
                        <form
                          scPdfViewerNextCommentForm
                          #commentForm="scPdfViewerNextCommentForm"
                          class="grid gap-2 border-b p-3"
                        >
                          <textarea
                            scTextarea
                            scPdfViewerNextCommentInput
                            rows="3"
                            placeholder="Add a comment…"
                            [attr.aria-label]="
                              'Comment on page ' + pending.pageNumber
                            "
                          ></textarea>
                          <div class="flex justify-end gap-2">
                            <button type="button" scPdfViewerNextCommentCancel>
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
                            [scPdfViewerNextComment]="comment"
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
                                [scPdfViewerNextCommentShow]="comment"
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
                                {{ comment.date?.toLocaleString() }}
                              </span>
                            </div>
                            <p class="text-sm">{{ comment.text }}</p>
                            <div class="flex justify-end gap-1">
                              <button [scPdfViewerNextCommentEdit]="comment">
                                Edit
                              </button>
                              <button
                                scButton
                                size="sm"
                                variant="ghost"
                                class="text-destructive"
                                [scPdfViewerNextCommentRemove]="comment"
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        } @empty {
                          @if (!viewer.pendingComment()) {
                            <li
                              class="text-muted-foreground p-4 text-center text-sm"
                            >
                              No comments yet. Select an annotation on the page,
                              then its comment button.
                            </li>
                          }
                        }
                      </ol>
                    </div>
                  </ng-template>
                </div>
              </div>
            </aside>
            <div
              scPdfViewerNextSidebarResizer
              aria-label="Resize sidebar"
            ></div>
          }

          <div scPdfViewerNextContent class="flex-1">
            <div
              scProgress
              scPdfViewerNextLoadingBar
              aria-label="Loading document"
            >
              <div scProgressTrack><div scProgressRange></div></div>
            </div>
            <div scPdfViewerNextLoading>
              <svg scSpinner siLoaderCircleIcon></svg>
              Loading document…
            </div>
            <div scEmpty scPdfViewerNextError>
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
                <button scPdfViewerNextRetry>Try again</button>
              </div>
            </div>
            <div scEmpty scPdfViewerNextEmpty>
              <div scEmptyHeader>
                <div scEmptyMedia variant="icon">
                  <svg siFileTextIcon></svg>
                </div>
                <div scEmptyTitle>No document</div>
                <div scEmptyDescription>Open a PDF to view it here.</div>
              </div>
              <div scEmptyBody>
                <button scPdfViewerNextOpenFile>Open file…</button>
              </div>
            </div>

            <div scPdfViewerNextCanvas></div>
          </div>

          <!-- Undo bar -->
          <div scPdfViewerNextUndoBar>
            @if (viewer.undoable(); as undo) {
              <span>
                @switch (undo.kind) {
                  @case ('annotation-deleted') {
                    @switch (undo.annotation) {
                      @case ('highlight') {
                        Highlight removed
                      }
                      @case ('freetext') {
                        Text removed
                      }
                      @case ('ink') {
                        Drawing removed
                      }
                      @case ('stamp') {
                        Image removed
                      }
                      @default {
                        Signature removed
                      }
                    }
                  }
                  @case ('annotations-deleted') {
                    {{ undo.count }} annotations removed
                  }
                  @case ('comment-deleted') {
                    Comment removed
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
              <button scPdfViewerNextUndo>Undo</button>
              <button scPdfViewerNextUndoDismiss>Dismiss</button>
            }
          </div>
        </div>

        <!-- Password dialog -->
        <div scDialogProvider scPdfViewerNextDialog="password">
          <ng-template scDialogPortal>
            <div scDialog>
              <form
                scPdfViewerNextPasswordForm
                #passwordForm="scPdfViewerNextPasswordForm"
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
                    scPdfViewerNextPasswordInput
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
        <div scDialogProvider scPdfViewerNextDialog="print">
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
                scPdfViewerNextPrintProgress
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
        <div scDialogProvider scPdfViewerNextDialog="altText">
          <ng-template scDialogPortal>
            <div scDialog>
              <div scDialogHeader>
                <h2 scDialogTitle>Alternative text</h2>
                <p scDialogDescription>
                  Alt text describes the image for people who can't see it.
                </p>
              </div>
              <form
                scPdfViewerNextAltTextForm
                #altForm="scPdfViewerNextAltTextForm"
              >
                <div scRadioGroup aria-label="Alternative text">
                  <div scField orientation="horizontal">
                    <input
                      type="radio"
                      scRadio
                      scPdfViewerNextAltTextKind="describe"
                    />
                    <label scLabel>Add a description</label>
                    <p scFieldDescription>
                      One or two sentences about the subject, setting or action.
                    </p>
                  </div>
                  <div scField orientation="horizontal">
                    <input
                      type="radio"
                      scRadio
                      scPdfViewerNextAltTextKind="decorative"
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
                    scPdfViewerNextAltTextInput
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
        <div scDialogProvider scPdfViewerNextDialog="signature">
          <ng-template scDialogPortal>
            <div
              scDialog
              scPdfViewerNextSignatureForm
              #signature="scPdfViewerNextSignatureForm"
              class="sm:w-xl sm:max-w-xl"
            >
              <div scDialogHeader>
                <h2 scDialogTitle>Add a signature</h2>
              </div>

              <div scTabs scPdfViewerNextSignatureMode>
                <div scTabsList aria-label="Signature type" activateOnFocus>
                  <button scTabsTab value="type">Type</button>
                  <button scTabsTab value="draw">Draw</button>
                  <button scTabsTab value="image">Image</button>
                </div>

                <div scTabsPanel value="type">
                  <ng-template scTabsPanelContent>
                    <input
                      scInput
                      scPdfViewerNextSignatureName
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
                          scPdfViewerNextSignaturePad
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
                      scFrame
                      size="sm"
                      class="flex h-36 flex-col items-center justify-center gap-2 bg-white"
                    >
                      @if (signature.image(); as preview) {
                        <img
                          [src]="preview"
                          alt="Signature preview"
                          class="max-h-32 max-w-full object-contain"
                        />
                      } @else {
                        <button scPdfViewerNextSignatureImage>
                          Choose an image…
                        </button>
                      }
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
                  scPdfViewerNextSignatureDescription
                  placeholder="e.g. My signature"
                />
              </div>

              <label scField orientation="horizontal">
                <input scCheckbox [(checked)]="signature.saveForReuse" />
                Save signature for later
              </label>

              <div scDialogFooter class="sm:justify-between">
                <button scPdfViewerNextSignatureClear>Clear</button>
                <div class="flex gap-2">
                  <button scDialogClose variant="outline" size="default">
                    Cancel
                  </button>
                  <button scPdfViewerNextSignatureAdd>Add</button>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>

      <!-- Outline (inside scPdfViewerNext, so its parts find the viewer):
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
                    [scPdfViewerNextOutlineToggle]="item"
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
                  [scPdfViewerNextOutlineItem]="item"
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
      <div scDialogProvider scPdfViewerNextDialog="properties">
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
                <dd>
                  @if (props.fileSize === null) {
                    —
                  } @else if (props.fileSize < 1024) {
                    {{ props.fileSize }} B
                  } @else if (props.fileSize < 1048576) {
                    {{ props.fileSize / 1024 | number: '1.1-1' }} KB
                  } @else {
                    {{ props.fileSize / 1048576 | number: '1.1-1' }} MB
                  }
                </dd>
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
                <dd>
                  @if (props.pageSize; as size) {
                    {{ size.width / 72 | number: '1.2-2' }} ×
                    {{ size.height / 72 | number: '1.2-2' }} in ({{
                      (size.width / 72) * 25.4 | number: '1.0-0'
                    }}
                    ×
                    {{ (size.height / 72) * 25.4 | number: '1.0-0' }} mm,
                    @switch (size.paper) {
                      @case ('a3') {
                        A3,
                      }
                      @case ('a4') {
                        A4,
                      }
                      @case ('letter') {
                        Letter,
                      }
                      @case ('legal') {
                        Legal,
                      }
                    }
                    {{ size.orientation }})
                  } @else {
                    —
                  }
                </dd>
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
export class PdfViewerNextDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );

  private readonly pdfSrc = signal(
    'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  );
  private readonly fileName = signal('tracemonkey');

  private readonly highlightColors = HIGHLIGHT_COLORS;
  private readonly inkColors = INK_COLORS;

  /** Types the outline template's context. */
  private asOutline(items: unknown): ScPdfOutlineItem[] {
    return items as ScPdfOutlineItem[];
  }
}
