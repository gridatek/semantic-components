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
  type ScPdfEditorMode,
  type ScPdfOutlineItem,
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
} from '@semantic-components/pdf-viewer';
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
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScProgress,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
  ScSeparator,
  ScSlider,
  ScSpinner,
  ScSwitch,
  ScSwitchField,
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
  ScTextarea,
  ScToggleGroup,
  ScToggleGroupItem,
  ScTooltipTrigger,
  cn,
} from '@semantic-components/ui';
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
    ScTooltipTrigger,
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
            aria-label="Find in document"
            [scTooltipTrigger]="'Find in document'"
            tooltipPosition="bottom"
          >
            <svg siSearchIcon></svg>
          </button>

          <div scSeparator orientation="vertical"></div>

          <div scPdfViewerNav aria-label="Page navigation">
            <button
              scButton
              variant="ghost"
              size="icon"
              scPdfViewerBack
              aria-label="Back"
              [scTooltipTrigger]="'Back'"
              tooltipPosition="bottom"
            >
              <svg siArrowLeftIcon></svg>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon"
              scPdfViewerForward
              aria-label="Forward"
              [scTooltipTrigger]="'Forward'"
              tooltipPosition="bottom"
            >
              <svg siArrowRightIcon></svg>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon"
              scPdfViewerPrevPage
              aria-label="Previous page"
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
              aria-label="Next page"
              [scTooltipTrigger]="'Next page'"
              tooltipPosition="bottom"
            >
              <svg siChevronDownIcon></svg>
            </button>
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
            <button
              scButton
              variant="ghost"
              size="icon"
              scPdfViewerZoomOut
              aria-label="Zoom out"
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
              aria-label="Zoom in"
              [scTooltipTrigger]="'Zoom in'"
              tooltipPosition="bottom"
            >
              <svg siZoomInIcon></svg>
            </button>
          </div>
          <div scNativeSelectContainer>
            <select
              scNativeSelect
              size="sm"
              scPdfViewerZoomSelect
              aria-label="Zoom"
              #zoom="scPdfViewerZoomSelect"
            >
              <option value="auto">Automatic zoom</option>
              <option value="page-actual">Actual size</option>
              <option value="page-fit">Page fit</option>
              <option value="page-width">Page width</option>
              @for (scale of zoom.scales(); track scale) {
                <option [value]="scale">{{ scale * 100 }}%</option>
              }
              @if (zoom.customZoom(); as custom) {
                <option [value]="custom">{{ zoom.customPercent() }}%</option>
              }
            </select>
            <svg siChevronDownIcon scNativeSelectIcon></svg>
          </div>
          <div scPopoverProvider side="bottom" align="start">
            <button
              scButton
              scPopoverTrigger
              variant="ghost"
              size="icon"
              aria-label="View options"
              [scTooltipTrigger]="'View options'"
              tooltipPosition="bottom"
            >
              <svg siBookOpenIcon></svg>
            </button>
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
                    type="single"
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
                    type="single"
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
                    type="single"
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

          <!-- Annotation tools -->
          <div
            scToggleGroup
            type="single"
            aria-label="Annotation tool"
            [value]="selectedTool()"
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
            <button
              scToggleGroupItem
              value="comment"
              aria-label="Comment"
              [scTooltipTrigger]="'Comment'"
              tooltipPosition="bottom"
            >
              <svg siMessageSquarePlusIcon></svg>
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
              <div scPopover class="w-60 gap-4">
                @switch (activeTool()) {
                  @case ('highlight') {
                    <div
                      scToggleGroup
                      scPdfViewerSetting="highlightColor"
                      type="single"
                      size="sm"
                      aria-label="Highlight colour"
                    >
                      @for (color of highlightColors; track color.value) {
                        <button
                          scToggleGroupItem
                          [value]="color.value"
                          [attr.aria-label]="color.name"
                        >
                          <span
                            class="ring-foreground/20 size-4 rounded-full ring-1"
                            [style.background-color]="color.value"
                          ></span>
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
                      <input
                        type="checkbox"
                        scSwitch
                        scPdfViewerSetting="highlightShowAll"
                      />
                    </label>
                  }
                  @case ('freetext') {
                    <div
                      scToggleGroup
                      scPdfViewerSetting="freetextColor"
                      type="single"
                      size="sm"
                      aria-label="Text colour"
                    >
                      @for (color of inkColors; track color.value) {
                        <button
                          scToggleGroupItem
                          [value]="color.value"
                          [attr.aria-label]="color.name"
                        >
                          <span
                            class="ring-foreground/20 size-4 rounded-full ring-1"
                            [style.background-color]="color.value"
                          ></span>
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
                      type="single"
                      size="sm"
                      aria-label="Drawing colour"
                    >
                      @for (color of inkColors; track color.value) {
                        <button
                          scToggleGroupItem
                          [value]="color.value"
                          [attr.aria-label]="color.name"
                        >
                          <span
                            class="ring-foreground/20 size-4 rounded-full ring-1"
                            [style.background-color]="color.value"
                          ></span>
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
          <button
            scButton
            variant="ghost"
            size="icon"
            aria-label="Add image"
            [scTooltipTrigger]="'Add image'"
            tooltipPosition="bottom"
            (click)="imageInput.click()"
          >
            <svg siImageIcon></svg>
          </button>
          <input #imageInput type="file" scPdfViewerAddImage class="hidden" />
          <div
            scPopoverProvider
            side="bottom"
            align="end"
            [(open)]="signaturesOpen"
          >
            <button
              scButton
              scPopoverTrigger
              variant="ghost"
              size="icon"
              aria-label="Signature"
              [scTooltipTrigger]="'Signature'"
              tooltipPosition="bottom"
            >
              <svg siSignatureIcon></svg>
            </button>
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
                          [attr.aria-label]="
                            'Place signature ' + (signature.description || '')
                          "
                          (click)="signaturesOpen.set(false)"
                        >
                          <img
                            [src]="signature.dataUrl"
                            alt=""
                            class="max-h-full max-w-full object-contain"
                          />
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
                  scButton
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

          <button
            scButton
            variant="ghost"
            size="icon"
            scPdfViewerPrint
            aria-label="Print"
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
            aria-label="Download"
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
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              scPdfViewerFindPrevious
              aria-label="Previous match"
              [scTooltipTrigger]="'Previous match'"
            >
              <svg siChevronUpIcon></svg>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              scPdfViewerFindNext
              aria-label="Next match"
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
              <div scTabs class="flex min-h-0 flex-1 flex-col">
                <div
                  scTabList
                  variant="line"
                  selectionMode="follow"
                  aria-label="Sidebar views"
                  class="w-full justify-start border-b px-1"
                  [selectedTab]="sidebarTab()"
                  (selectedTabChange)="setSidebarTab($event)"
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

                <!-- Pages: thumbnails, and page organisation -->
                <div
                  scTabPanel
                  value="thumbnails"
                  class="flex-1 overflow-y-auto"
                >
                  <ng-template scTabContent>
                    <div
                      role="toolbar"
                      aria-label="Organise pages"
                      class="bg-background sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b px-2 py-1"
                    >
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        scPdfViewerInsertPages
                        aria-label="Insert file"
                        [scTooltipTrigger]="'Insert a file after this page'"
                        (insertFailed)="insertFailed.set($event.name)"
                      >
                        <svg siFilePlusIcon></svg>
                      </button>
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        scPdfViewerPastePages
                        aria-label="Paste"
                        [scTooltipTrigger]="'Paste after this page'"
                      >
                        <svg siClipboardPasteIcon></svg>
                      </button>
                      @if (viewer.pageSelection().length) {
                        <div scSeparator orientation="vertical"></div>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          scPdfViewerMovePagesEarlier
                          aria-label="Move earlier"
                          [scTooltipTrigger]="'Move earlier'"
                        >
                          <svg siArrowUpIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          scPdfViewerMovePagesLater
                          aria-label="Move later"
                          [scTooltipTrigger]="'Move later'"
                        >
                          <svg siArrowDownIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          scPdfViewerCopyPages
                          aria-label="Copy"
                          [scTooltipTrigger]="'Copy'"
                        >
                          <svg siCopyIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          scPdfViewerCutPages
                          aria-label="Cut"
                          [scTooltipTrigger]="'Cut'"
                        >
                          <svg siScissorsIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          scPdfViewerDeletePages
                          aria-label="Delete"
                          [scTooltipTrigger]="'Delete'"
                        >
                          <svg siTrash2Icon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          scPdfViewerExportPages
                          aria-label="Save selected pages"
                          [scTooltipTrigger]="'Save selected pages as…'"
                        >
                          <svg siFileOutputIcon></svg>
                        </button>
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
                            type="checkbox"
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
                <div scTabPanel value="outline" class="flex-1 overflow-y-auto">
                  <ng-template scTabContent>
                    @if (viewer.outline().length === 0) {
                      <p class="text-muted-foreground p-4 text-center text-sm">
                        No outline in this document.
                      </p>
                    } @else {
                      <div class="flex gap-1 border-b px-2 py-1">
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          scPdfViewerOutlineExpandAll
                          aria-label="Expand all"
                          [scTooltipTrigger]="'Expand all'"
                        >
                          <svg siChevronsUpDownIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          scPdfViewerOutlineCollapseAll
                          aria-label="Collapse all"
                          [scTooltipTrigger]="'Collapse all'"
                        >
                          <svg siChevronsDownUpIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          scPdfViewerOutlineFindCurrent
                          aria-label="Find current outline item"
                          [scTooltipTrigger]="'Find current outline item'"
                        >
                          <svg siLocateFixedIcon></svg>
                        </button>
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
                  scTabPanel
                  value="attachments"
                  class="flex-1 overflow-y-auto"
                >
                  <ng-template scTabContent>
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
                <div scTabPanel value="layers" class="flex-1 overflow-y-auto">
                  <ng-template scTabContent>
                    @if (viewer.layers().length === 0) {
                      <p class="text-muted-foreground p-4 text-center text-sm">
                        No layers in this document.
                      </p>
                    } @else {
                      <ul class="grid gap-2 p-3" aria-label="Layers">
                        @for (layer of viewer.layers(); track layer.id) {
                          <li>
                            <label scCheckboxField>
                              <input
                                type="checkbox"
                                scCheckbox
                                [scPdfViewerLayer]="layer"
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
                <div scTabPanel value="comments" class="min-h-0 flex-1">
                  <ng-template scTabContent>
                    <div class="flex h-full flex-col">
                      <div
                        class="flex items-center justify-between gap-2 border-b px-3 py-2"
                      >
                        <h3 class="text-sm font-medium">
                          Comments ({{ viewer.comments().length }})
                        </h3>
                        @if (!viewer.pendingComment()) {
                          <button
                            scButton
                            size="sm"
                            variant="outline"
                            scPdfViewerCommentAdd
                          >
                            Add
                          </button>
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
                            <button
                              scButton
                              size="sm"
                              variant="ghost"
                              type="button"
                              scPdfViewerCommentCancel
                            >
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
            <div
              scProgress
              scPdfViewerLoadingBar
              aria-label="Loading document"
            ></div>
            <div scPdfViewerLoading>
              <svg scSpinner siLoaderCircleIcon class="size-6"></svg>
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
                <button scButton scPdfViewerRetry>Try again</button>
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

            <sc-pdf-viewer-canvas>
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
                        [attr.aria-label]="color.name"
                      >
                        <span
                          class="ring-foreground/20 size-3.5 rounded-full ring-1"
                          [style.background-color]="color.value"
                        ></span>
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
            </sc-pdf-viewer-canvas>
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
              <button scButton size="sm" variant="ghost" scPdfViewerUndo>
                Undo
              </button>
              <button scButton size="sm" variant="ghost" scPdfViewerUndoDismiss>
                Dismiss
              </button>
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
                  <button
                    scButton
                    scDialogClose
                    variant="outline"
                    type="button"
                  >
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
              ></div>
              <div scDialogFooter>
                <button scButton scDialogClose variant="outline">Cancel</button>
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
                  <button
                    scButton
                    scDialogClose
                    variant="outline"
                    type="button"
                  >
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

              <div scTabs>
                <div
                  scTabList
                  selectionMode="follow"
                  aria-label="Signature type"
                  [selectedTab]="signature.mode()"
                  (selectedTabChange)="signature.setMode($event)"
                >
                  <button scTab value="type">Type</button>
                  <button scTab value="draw">Draw</button>
                  <button scTab value="image">Image</button>
                </div>

                <div scTabPanel value="type">
                  <ng-template scTabContent>
                    <input
                      scInput
                      scPdfViewerSignatureName
                      aria-label="Signature"
                      placeholder="Your name"
                    />
                  </ng-template>
                </div>

                <div scTabPanel value="draw">
                  <ng-template scTabContent>
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

                <div scTabPanel value="image">
                  <ng-template scTabContent>
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
                <input
                  type="checkbox"
                  scCheckbox
                  [(checked)]="signature.saveForReuse"
                />
                Save signature for later
              </label>

              <div scDialogFooter class="sm:justify-between">
                <button scButton variant="ghost" scPdfViewerSignatureClear>
                  Clear
                </button>
                <div class="flex gap-2">
                  <button scButton scDialogClose variant="outline">
                    Cancel
                  </button>
                  <button scButton scPdfViewerSignatureAdd>Add</button>
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
                    [attr.aria-label]="item.title"
                  >
                    <svg siChevronRightIcon></svg>
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

      <!-- Document properties (yours: the data comes from pdf.js) -->
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
              <button scButton scDialogClose>Close</button>
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
  readonly documentPropertiesOpen = signal(false);
  readonly documentProperties = signal<Record<string, string> | null>(null);
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
        'File name': this.fileName() || '—',
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
}
