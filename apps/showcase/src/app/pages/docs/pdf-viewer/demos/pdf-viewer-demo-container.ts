import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PdfViewerDemo } from './pdf-viewer-demo';

@Component({
  selector: 'app-pdf-viewer-demo-container',
  imports: [DemoContainer, PdfViewerDemo],
  template: `
    <app-demo-container
      title="PDF Viewer"
      demoUrl="/demos/pdf-viewer/pdf-viewer-demo"
      [code]="code"
    >
      <app-pdf-viewer-demo class="h-[800px]" />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Injector,
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
import {
  type ScPdfEditorMode,
  type ScPdfOutlineItem,
  type ScPdfSidebarView,
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
  ScPdfViewerLoadingBar,
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
  ScPdfViewerSignatureList,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
  ScPdfViewerViewOptions,
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
  SiArrowDownIcon,
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

interface ThumbnailData {
  page: number;
  dataUrl: string;
}

interface AttachmentData {
  filename: string;
  content: Uint8Array;
}

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
    ScPdfViewerLoadingBar,
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
    ScPdfViewerViewOptions,
    ScPdfViewerPasswordDialog,
    ScPdfViewerSignatureDialog,
    ScPdfViewerSignatureList,
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
    SiBookOpenIcon,
    SiTrash2Icon,
    SiTrash2Icon,
    SiScissorsIcon,
    SiScissorsIcon,
    SiFilePlusIcon,
    SiFilePlusIcon,
    SiFileOutputIcon,
    SiFileOutputIcon,
    SiCopyIcon,
    SiCopyIcon,
    SiClipboardPasteIcon,
    SiClipboardPasteIcon,
    SiArrowUpIcon,
    SiArrowUpIcon,
    SiArrowDownIcon,
    SiArrowDownIcon,
    SiChevronDownIcon,
    SiChevronRightIcon,
    SiChevronUpIcon,
    SiChevronsDownUpIcon,
    SiChevronsUpDownIcon,
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
    SiLocateFixedIcon,
    SiMessageSquareIcon,
    SiMessageSquarePlusIcon,
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
  template: \`
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
              <div scPopover class="w-auto">
                <sc-pdf-viewer-view-options />
              </div>
            </ng-template>
          </div>

          <div scPdfViewerSpacer></div>

          <!-- Editor tools -->
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
              <div scPopover class="w-auto">
                <sc-pdf-viewer-signature-list
                  (done)="signaturesOpen.set(false)"
                />
              </div>
            </ng-template>
          </div>

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
                    <!-- Page organisation: select pages (checkboxes), drag
                         them to reorder, or use the buttons. -->
                    <div
                      role="toolbar"
                      aria-label="Organise pages"
                      class="bg-background sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b px-2 py-1"
                    >
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Insert file"
                        [scTooltipTrigger]="'Insert file after this page'"
                        [disabled]="viewer.organizing()"
                        (click)="insertFile()"
                      >
                        <svg siFilePlusIcon></svg>
                      </button>
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Paste"
                        [scTooltipTrigger]="'Paste after this page'"
                        [disabled]="
                          !viewer.pageClipboard() || viewer.organizing()
                        "
                        (click)="viewer.pastePages()"
                      >
                        <svg siClipboardPasteIcon></svg>
                      </button>
                      @if (selection().length) {
                        <div scSeparator orientation="vertical"></div>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Move earlier"
                          [scTooltipTrigger]="'Move earlier'"
                          [disabled]="
                            selection()[0] === 1 || viewer.organizing()
                          "
                          (click)="moveSelection(-1)"
                        >
                          <svg siArrowUpIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Move later"
                          [scTooltipTrigger]="'Move later'"
                          [disabled]="
                            selection()[selection().length - 1] ===
                              viewer.totalPages() || viewer.organizing()
                          "
                          (click)="moveSelection(1)"
                        >
                          <svg siArrowDownIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Copy"
                          [scTooltipTrigger]="'Copy'"
                          (click)="organize('copy')"
                        >
                          <svg siCopyIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Cut"
                          [scTooltipTrigger]="'Cut'"
                          [disabled]="viewer.organizing()"
                          (click)="organize('cut')"
                        >
                          <svg siScissorsIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Delete"
                          [scTooltipTrigger]="'Delete'"
                          [disabled]="
                            selection().length >= viewer.totalPages() ||
                            viewer.organizing()
                          "
                          (click)="organize('delete')"
                        >
                          <svg siTrash2Icon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Save selected pages"
                          [scTooltipTrigger]="'Save selected pages as…'"
                          (click)="organize('export')"
                        >
                          <svg siFileOutputIcon></svg>
                        </button>
                        <span
                          class="text-muted-foreground ms-auto text-xs"
                          role="status"
                        >
                          {{ selection().length }} selected
                        </span>
                      }
                    </div>
                    <ul
                      class="grid gap-3 p-3"
                      aria-label="Pages"
                      (keydown)="onPagesKeydown($event)"
                    >
                      @for (thumb of thumbnails(); track thumb.page) {
                        <li
                          draggable="true"
                          [class]="dropIndicator(thumb.page)"
                          (dragstart)="onPageDragStart($event, thumb.page)"
                          (dragover)="onPageDragOver($event, thumb.page)"
                          (dragleave)="dropTarget.set(null)"
                          (drop)="onPageDrop($event, thumb.page)"
                          (dragend)="onPageDragEnd()"
                        >
                          <input
                            type="checkbox"
                            scCheckbox
                            class="absolute start-3 top-3 z-10"
                            [attr.aria-label]="
                              'Select page ' + viewer.pageLabel(thumb.page)
                            "
                            [checked]="selectedPages().has(thumb.page)"
                            (checkedChange)="selectPage(thumb.page, $event)"
                          />
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
                              [class.ring-2]="selectedPages().has(thumb.page)"
                              [class.ring-primary]="
                                selectedPages().has(thumb.page)
                              "
                            />
                            <span class="text-xs">
                              Page {{ viewer.pageLabel(thumb.page) }}
                            </span>
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
                          aria-label="Expand all"
                          [scTooltipTrigger]="'Expand all'"
                          (click)="setAllOutlineExpanded(true)"
                        >
                          <svg siChevronsUpDownIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Collapse all"
                          [scTooltipTrigger]="'Collapse all'"
                          (click)="setAllOutlineExpanded(false)"
                        >
                          <svg siChevronsDownUpIcon></svg>
                        </button>
                        <button
                          scButton
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Find current outline item"
                          [scTooltipTrigger]="'Find current outline item'"
                          [disabled]="!viewer.currentOutlineItem()"
                          (click)="revealCurrentOutlineItem()"
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
            <sc-pdf-viewer-loading-bar />
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
              <button scButton (click)="viewer.openFile()">Open file…</button>
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

    <!-- Outline: disclosure toggles (Shift+click: the whole branch) and links. -->
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
                  [attr.aria-expanded]="outlineExpanded().has(item.id)"
                  [attr.aria-label]="item.title"
                  (click)="toggleOutlineItem(item, $event)"
                >
                  <svg
                    siChevronRightIcon
                    class="transition-transform rtl:-scale-x-100"
                    [class.rotate-90]="outlineExpanded().has(item.id)"
                  ></svg>
                </button>
              } @else {
                <span class="w-6 shrink-0"></span>
              }
              <button
                scButton
                variant="ghost"
                size="sm"
                class="h-auto min-w-0 flex-1 justify-start py-1 text-start whitespace-normal"
                [class.font-bold]="item.bold"
                [class.italic]="item.italic"
                [class.bg-accent]="viewer.currentOutlineItem()?.id === item.id"
                [attr.aria-current]="
                  viewer.currentOutlineItem()?.id === item.id
                    ? 'location'
                    : null
                "
                [attr.data-outline-item]="item.id"
                (click)="viewer.goToOutlineItem(item)"
              >
                {{ item.title }}
              </button>
            </div>
            @if (item.items.length && outlineExpanded().has(item.id)) {
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
  \`,
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

  private readonly viewerRef = viewChild<ScPdfViewerRoot>('viewer');
  private readonly injector = inject(Injector);

  readonly pdfSrc = signal(
    'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  );
  readonly fileName = signal('tracemonkey');

  readonly sidebarOpen = signal(false);
  readonly sidebarTab = signal<ScPdfSidebarView>('thumbnails');
  readonly documentPropertiesOpen = signal(false);

  readonly thumbnails = signal<ThumbnailData[]>([]);
  /** Open outline items (by id). */
  readonly outlineExpanded = signal<ReadonlySet<string>>(new Set());
  readonly attachments = signal<AttachmentData[]>([]);

  readonly documentProperties = signal<Record<string, string> | null>(null);

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

  readonly signaturesOpen = signal(false);

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

    // A new outline: open the bookmarks the document wants open.
    effect(() => {
      const outline = this.viewerRef()?.outline() ?? [];
      untracked(() =>
        this.outlineExpanded.set(new Set(this.initialOutlineExpanded(outline))),
      );
    });

    // A new document: refill the sidebar lists.
    effect(() => {
      const doc = this.viewerRef()?.pdfDocument();
      untracked(() => {
        if (!this.viewerRef()?.organizing()) this.selectedPages.set(new Set());
        this.thumbnails.set([]);
        this.attachments.set([]);
        if (doc) {
          this.renderThumbnails();
          this.loadAttachments();
        }
      });
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

  // Page organisation (the Pages sidebar).

  /** Selected pages (thumbnail checkboxes). */
  readonly selectedPages = signal<ReadonlySet<number>>(new Set());
  /** Where dragged pages would land. */
  readonly dropTarget = signal<{ page: number; after: boolean } | null>(null);
  private draggedPages: number[] = [];

  /** The selected pages that exist, ascending. */
  protected readonly selection = computed(() => {
    const total = this.viewerRef()?.totalPages() ?? 0;
    return [...this.selectedPages()]
      .filter((page) => page <= total)
      .sort((a, b) => a - b);
  });

  protected selectPage(page: number, selected: boolean): void {
    this.selectedPages.update((pages) => {
      const next = new Set(pages);
      if (selected) next.add(page);
      else next.delete(page);
      return next;
    });
  }

  /** The selected pages one place earlier / later. */
  protected async moveSelection(delta: -1 | 1): Promise<void> {
    const viewer = this.viewerRef();
    const pages = this.selection();
    if (!viewer || !pages.length) return;
    const before = delta < 0 ? pages[0] - 1 : pages[pages.length - 1] + 2;
    this.selectedPages.set(new Set(await viewer.movePages(pages, before)));
  }

  protected async organize(
    action: 'copy' | 'cut' | 'delete' | 'export',
  ): Promise<void> {
    const viewer = this.viewerRef();
    const pages = this.selection();
    if (!viewer || !pages.length) return;
    switch (action) {
      case 'copy':
        await viewer.copyPages(pages);
        return;
      case 'export':
        await viewer.exportPages(pages);
        return;
      case 'cut':
        await viewer.cutPages(pages);
        break;
      case 'delete':
        await viewer.deletePages(pages);
        break;
    }
    this.selectedPages.set(new Set());
  }

  /** Inserts another PDF's pages after the current page. */
  protected insertFile(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,application/pdf';
    input.addEventListener('change', () => {
      const viewer = this.viewerRef();
      const file = input.files?.[0];
      if (viewer && file) viewer.insertFile(file, viewer.currentPage());
    });
    input.click();
  }

  /** Delete, Ctrl+C / X / V on the pages, as pdf.js. */
  protected onPagesKeydown(event: KeyboardEvent): void {
    const viewer = this.viewerRef();
    if (!viewer) return;
    const mod = event.ctrlKey || event.metaKey;
    if (event.key === 'Delete' && this.selection().length) {
      this.organize('delete');
    } else if (mod && event.key === 'c' && this.selection().length) {
      this.organize('copy');
    } else if (mod && event.key === 'x' && this.selection().length) {
      this.organize('cut');
    } else if (mod && event.key === 'v' && viewer.pageClipboard()) {
      viewer.pastePages();
    } else {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  protected onPageDragStart(event: DragEvent, page: number): void {
    const selection = this.selection();
    this.draggedPages = selection.includes(page) ? selection : [page];
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', this.draggedPages.join(','));
    }
  }

  protected onPageDragOver(event: DragEvent, page: number): void {
    if (!this.draggedPages.length) return;
    event.preventDefault();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.dropTarget.set({
      page,
      after: event.clientY - rect.top > rect.height / 2,
    });
  }

  protected async onPageDrop(event: DragEvent, page: number): Promise<void> {
    const viewer = this.viewerRef();
    const target = this.dropTarget();
    const pages = this.draggedPages;
    this.onPageDragEnd();
    if (!viewer || !target || !pages.length) return;
    event.preventDefault();
    const moved = await viewer.movePages(pages, target.after ? page + 1 : page);
    this.selectedPages.set(new Set(moved));
  }

  protected onPageDragEnd(): void {
    this.draggedPages = [];
    this.dropTarget.set(null);
  }

  /** A line above / below the page the dragged pages would land next to. */
  protected dropIndicator(page: number): string {
    const target = this.dropTarget();
    if (target?.page !== page) return 'relative rounded-md';
    return target.after
      ? 'relative rounded-md shadow-[0_3px_0_var(--color-primary)]'
      : 'relative rounded-md shadow-[0_-3px_0_var(--color-primary)]';
  }

  /** Types the outline template's context. */
  protected asOutline(items: unknown): ScPdfOutlineItem[] {
    return items as ScPdfOutlineItem[];
  }

  /** Opens or closes a bookmark; Shift+click does its whole branch (as pdf.js). */
  protected toggleOutlineItem(item: ScPdfOutlineItem, event: MouseEvent): void {
    const open = !this.outlineExpanded().has(item.id);
    const ids = event.shiftKey ? this.branchIds([item]) : [item.id];
    this.outlineExpanded.update((expanded) => {
      const next = new Set(expanded);
      for (const id of ids) {
        if (open) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }

  protected setAllOutlineExpanded(open: boolean): void {
    const outline = this.viewerRef()?.outline() ?? [];
    this.outlineExpanded.set(new Set(open ? this.branchIds(outline) : []));
  }

  /** Opens the current bookmark's parents and scrolls it into view. */
  protected revealCurrentOutlineItem(): void {
    const current = this.viewerRef()?.currentOutlineItem();
    if (!current) return;
    // Ids are paths ("0.2.1"): the parents are its prefixes.
    const parts = current.id.split('.');
    this.outlineExpanded.update((expanded) => {
      const next = new Set(expanded);
      for (let i = 1; i < parts.length; i++) {
        next.add(parts.slice(0, i).join('.'));
      }
      return next;
    });
    afterNextRender(
      () =>
        document
          .querySelector(\`[data-outline-item="\${current.id}"]\`)
          ?.scrollIntoView({ block: 'nearest' }),
      { injector: this.injector },
    );
  }

  /** The ids of these items and all their descendants. */
  private branchIds(items: ScPdfOutlineItem[]): string[] {
    return items.flatMap((item) => [item.id, ...this.branchIds(item.items)]);
  }

  private initialOutlineExpanded(items: ScPdfOutlineItem[]): string[] {
    return items.flatMap((item) => [
      ...(item.open ? [item.id] : []),
      ...this.initialOutlineExpanded(item.items),
    ]);
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
    const match = dateStr.match(/D:(\\d{4})(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})/);
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
    if (bytes < 1024) return \`\${bytes} B\`;
    if (bytes < 1024 * 1024) return \`\${(bytes / 1024).toFixed(1)} KB\`;
    return \`\${(bytes / (1024 * 1024)).toFixed(1)} MB\`;
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
        pageSize = \`\${inches(width)} × \${inches(height)} in (\${mm(width)} × \${mm(height)} mm)\`;
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
    // Not if another document was opened meanwhile.
    if (doc === this.viewerRef()?.pdfDocument()) this.thumbnails.set(thumbs);
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
}`;
}
