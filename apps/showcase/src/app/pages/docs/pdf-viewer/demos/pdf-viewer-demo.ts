import {
  ChangeDetectionStrategy,
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
import { cn } from '@semantic-components/ui';
import {
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerDownload,
  ScPdfViewerEmpty,
  ScPdfViewerError,
  ScPdfViewerFindInput,
  ScPdfViewerFindNext,
  ScPdfViewerFindPrevious,
  ScPdfViewerFindResultsInfo,
  ScPdfViewerFindToggle,
  ScPdfViewerFindbar,
  ScPdfViewerLoading,
  ScPdfViewerNav,
  ScPdfViewerNextPage,
  ScPdfViewerPageInfo,
  ScPdfViewerPrevPage,
  ScPdfViewerPrint,
  ScPdfViewerRoot,
  ScPdfViewerSeparator,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
  ScPdfViewerZoom,
  ScPdfViewerZoomIn,
  ScPdfViewerZoomOut,
  ScPdfViewerZoomSelect,
} from '@semantic-components/ui-lab';
import {
  SiChevronDownIcon,
  SiChevronUpIcon,
  SiDownloadIcon,
  SiEllipsisVerticalIcon,
  SiHighlighterIcon,
  SiImageIcon,
  SiPanelLeftIcon,
  SiPenIcon,
  SiPrinterIcon,
  SiSearchIcon,
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

@Component({
  selector: 'app-pdf-viewer-demo',
  imports: [
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
    ScPdfViewerDownload,
    ScPdfViewerPrint,
    ScPdfViewerSeparator,
    ScPdfViewerSpacer,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerError,
    ScPdfViewerEmpty,
    ScPdfViewerCanvas,
    ScPdfViewerFindToggle,
    ScPdfViewerFindbar,
    ScPdfViewerFindInput,
    ScPdfViewerFindNext,
    ScPdfViewerFindPrevious,
    ScPdfViewerFindResultsInfo,
    SiChevronUpIcon,
    SiChevronDownIcon,
    SiDownloadIcon,
    SiEllipsisVerticalIcon,
    SiHighlighterIcon,
    SiImageIcon,
    SiPanelLeftIcon,
    SiPenIcon,
    SiPrinterIcon,
    SiSearchIcon,
    SiTypeIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div class="pdfjs-viewer size-full">
      <div
        scPdfViewer
        class="size-full"
        [src]="pdfSrc()"
        [title]="pdfTitle()"
        #viewer="scPdfViewer"
      >
        <div
          scPdfViewerContainer
          class="size-full overflow-visible rounded-none border-none"
        >
          <!-- Toolbar -->
          <div
            scPdfViewerToolbar
            class="relative z-50 border-b-[#333] bg-[#474747] px-1 py-1"
          >
            <!-- Left: Sidebar toggle -->
            <button
              type="button"
              class="pdfjs-btn"
              [attr.aria-pressed]="sidebarOpen()"
              aria-label="Toggle Sidebar"
              (click)="sidebarOpen.set(!sidebarOpen())"
            >
              <svg siPanelLeftIcon class="size-4"></svg>
            </button>

            <div class="pdfjs-btn-spacer"></div>

            <!-- Find toggle -->
            <button scPdfViewerFindToggle class="pdfjs-btn">
              <svg siSearchIcon class="size-4"></svg>
            </button>

            <!-- Navigation: Prev | sep | Next -->
            <div scPdfViewerNav>
              <button scPdfViewerPrevPage>
                <svg siChevronUpIcon class="size-4"></svg>
              </button>
              <div scPdfViewerSeparator class="bg-[#666]"></div>
              <button scPdfViewerNextPage>
                <svg siChevronDownIcon class="size-4"></svg>
              </button>
            </div>

            <!-- Page input / of N -->
            <div scPdfViewerPageInfo></div>

            <div scPdfViewerSeparator class="bg-[#666]"></div>

            <!-- Middle: Zoom out | sep | Zoom in -->
            <div scPdfViewerZoom>
              <button scPdfViewerZoomOut>
                <svg siZoomOutIcon class="size-4"></svg>
              </button>
              <div scPdfViewerSeparator class="bg-[#666]"></div>
              <button scPdfViewerZoomIn>
                <svg siZoomInIcon class="size-4"></svg>
              </button>
            </div>

            <!-- Zoom select (separate from zoom buttons) -->
            <select scPdfViewerZoomSelect></select>

            <div scPdfViewerSpacer></div>

            <!-- Editor tools -->
            <div class="flex items-center">
              <button
                type="button"
                class="pdfjs-btn"
                aria-label="Highlight"
                [attr.aria-pressed]="viewer.editorMode() === 'highlight'"
                [class.pdfjs-btn-active]="viewer.editorMode() === 'highlight'"
                (click)="viewer.setEditorMode('highlight')"
              >
                <svg siHighlighterIcon class="size-4"></svg>
              </button>
              <button
                type="button"
                class="pdfjs-btn"
                aria-label="Free Text"
                [attr.aria-pressed]="viewer.editorMode() === 'freetext'"
                [class.pdfjs-btn-active]="viewer.editorMode() === 'freetext'"
                (click)="viewer.setEditorMode('freetext')"
              >
                <svg siTypeIcon class="size-4"></svg>
              </button>
              <button
                type="button"
                class="pdfjs-btn"
                aria-label="Draw"
                [attr.aria-pressed]="viewer.editorMode() === 'ink'"
                [class.pdfjs-btn-active]="viewer.editorMode() === 'ink'"
                (click)="viewer.setEditorMode('ink')"
              >
                <svg siPenIcon class="size-4"></svg>
              </button>
              <button
                type="button"
                class="pdfjs-btn"
                aria-label="Add Image"
                [attr.aria-pressed]="viewer.editorMode() === 'stamp'"
                [class.pdfjs-btn-active]="viewer.editorMode() === 'stamp'"
                (click)="viewer.setEditorMode('stamp')"
              >
                <svg siImageIcon class="size-4"></svg>
              </button>
            </div>

            <div scPdfViewerSeparator class="bg-[#666]"></div>

            <!-- Right: Print, Download -->
            <button scPdfViewerPrint>
              <svg siPrinterIcon class="size-4"></svg>
            </button>
            <button scPdfViewerDownload>
              <svg siDownloadIcon class="size-4"></svg>
            </button>

            <div scPdfViewerSeparator class="bg-[#666]"></div>

            <!-- Secondary toolbar toggle -->
            <div class="relative">
              <button
                type="button"
                class="pdfjs-btn"
                aria-label="Tools"
                [attr.aria-expanded]="secondaryToolbarOpen()"
                (click)="secondaryToolbarOpen.set(!secondaryToolbarOpen())"
              >
                <svg siEllipsisVerticalIcon class="size-4"></svg>
              </button>

              @if (secondaryToolbarOpen()) {
                <div
                  class="fixed inset-0 z-10"
                  (click)="secondaryToolbarOpen.set(false)"
                ></div>
                <div
                  class="absolute top-full right-0 z-20 mt-1 min-w-56 rounded border border-[#333] bg-[#474747] py-1 shadow-lg"
                >
                  <!-- Open File -->
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    (click)="fileInput.click(); secondaryToolbarOpen.set(false)"
                  >
                    Open File
                  </button>

                  <div class="pdfjs-menu-separator"></div>

                  <!-- Presentation Mode -->
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    (click)="
                      viewer.toggleFullscreen(); secondaryToolbarOpen.set(false)
                    "
                  >
                    Presentation Mode
                  </button>

                  <!-- Current View Bookmark -->
                  <a
                    class="pdfjs-menu-item"
                    [href]="bookmarkUrl()"
                    target="_blank"
                    rel="noopener noreferrer"
                    (click)="secondaryToolbarOpen.set(false)"
                  >
                    Current View
                  </a>

                  <div class="pdfjs-menu-separator"></div>

                  <!-- First / Last Page -->
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    (click)="
                      viewer.goToPage(1); secondaryToolbarOpen.set(false)
                    "
                  >
                    Go to First Page
                  </button>
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    (click)="
                      viewer.goToPage(viewer.totalPages());
                      secondaryToolbarOpen.set(false)
                    "
                  >
                    Go to Last Page
                  </button>

                  <div class="pdfjs-menu-separator"></div>

                  <!-- Rotate -->
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    (click)="
                      viewer.rotateRight(); secondaryToolbarOpen.set(false)
                    "
                  >
                    Rotate Clockwise
                  </button>
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    (click)="
                      viewer.rotateLeft(); secondaryToolbarOpen.set(false)
                    "
                  >
                    Rotate Counterclockwise
                  </button>

                  <div class="pdfjs-menu-separator"></div>

                  <!-- Cursor Tools -->
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    [attr.data-selected]="cursorTool() === 'select'"
                    (click)="
                      cursorTool.set('select'); secondaryToolbarOpen.set(false)
                    "
                  >
                    Text Selection Tool
                  </button>
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    [attr.data-selected]="cursorTool() === 'hand'"
                    (click)="
                      cursorTool.set('hand'); secondaryToolbarOpen.set(false)
                    "
                  >
                    Hand Tool
                  </button>

                  <div class="pdfjs-menu-separator"></div>

                  <!-- Scroll Mode -->
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    [attr.data-selected]="scrollMode() === 'page'"
                    (click)="
                      scrollMode.set('page'); secondaryToolbarOpen.set(false)
                    "
                  >
                    Page Scrolling
                  </button>
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    [attr.data-selected]="scrollMode() === 'vertical'"
                    (click)="
                      scrollMode.set('vertical');
                      secondaryToolbarOpen.set(false)
                    "
                  >
                    Vertical Scrolling
                  </button>
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    [attr.data-selected]="scrollMode() === 'horizontal'"
                    (click)="
                      scrollMode.set('horizontal');
                      secondaryToolbarOpen.set(false)
                    "
                  >
                    Horizontal Scrolling
                  </button>
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    [attr.data-selected]="scrollMode() === 'wrapped'"
                    (click)="
                      scrollMode.set('wrapped'); secondaryToolbarOpen.set(false)
                    "
                  >
                    Wrapped Scrolling
                  </button>

                  <div class="pdfjs-menu-separator"></div>

                  <!-- Spread Mode -->
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    [attr.data-selected]="spreadMode() === 'none'"
                    (click)="
                      spreadMode.set('none'); secondaryToolbarOpen.set(false)
                    "
                  >
                    No Spreads
                  </button>
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    [attr.data-selected]="spreadMode() === 'odd'"
                    (click)="
                      spreadMode.set('odd'); secondaryToolbarOpen.set(false)
                    "
                  >
                    Odd Spreads
                  </button>
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    [attr.data-selected]="spreadMode() === 'even'"
                    (click)="
                      spreadMode.set('even'); secondaryToolbarOpen.set(false)
                    "
                  >
                    Even Spreads
                  </button>

                  <div class="pdfjs-menu-separator"></div>

                  <!-- Document Properties -->
                  <button
                    type="button"
                    class="pdfjs-menu-item"
                    (click)="openDocumentProperties()"
                  >
                    Document Properties…
                  </button>
                </div>
              }
            </div>
          </div>

          <!-- Hidden file input for Open File -->
          <input
            #fileInput
            type="file"
            accept=".pdf"
            class="hidden"
            (change)="onFileSelected($event)"
          />

          <!-- Find bar -->
          @if (viewer.findOpen()) {
            <div scPdfViewerFindbar class="pdfjs-findbar">
              <div class="pdfjs-findbar-group">
                <input
                  scPdfViewerFindInput
                  type="text"
                  class="pdfjs-findbar-input"
                />
                <button scPdfViewerFindPrevious class="pdfjs-btn">
                  <svg siChevronUpIcon class="size-3.5"></svg>
                </button>
                <button scPdfViewerFindNext class="pdfjs-btn">
                  <svg siChevronDownIcon class="size-3.5"></svg>
                </button>
              </div>
              <div class="pdfjs-findbar-group">
                <label class="pdfjs-findbar-label">
                  <input
                    type="checkbox"
                    [checked]="viewer.findHighlightAll()"
                    (change)="toggleHighlightAll()"
                  />
                  Highlight All
                </label>
                <label class="pdfjs-findbar-label">
                  <input
                    type="checkbox"
                    [checked]="viewer.findMatchCase()"
                    (change)="
                      viewer.findMatchCase.set(!viewer.findMatchCase());
                      viewer.find(viewer.findQuery())
                    "
                  />
                  Match Case
                </label>
                <label class="pdfjs-findbar-label">
                  <input
                    type="checkbox"
                    [checked]="viewer.findMatchDiacritics()"
                    (change)="toggleMatchDiacritics()"
                  />
                  Match Diacritics
                </label>
                <label class="pdfjs-findbar-label">
                  <input
                    type="checkbox"
                    [checked]="viewer.findEntireWord()"
                    (change)="
                      viewer.findEntireWord.set(!viewer.findEntireWord());
                      viewer.find(viewer.findQuery())
                    "
                  />
                  Whole Words
                </label>
              </div>
              <div class="pdfjs-findbar-group">
                <span
                  scPdfViewerFindResultsInfo
                  class="pdfjs-findbar-msg"
                ></span>
              </div>
            </div>
          }

          <!-- Loading bar -->
          @if (viewer.isLoading()) {
            <div class="pdfjs-loading-bar">
              <div class="pdfjs-loading-bar-progress"></div>
            </div>
          }

          <!-- Main area: sidebar + content -->
          <div class="flex min-h-0 flex-1">
            <!-- Sidebar -->
            @if (sidebarOpen()) {
              <div
                class="flex w-[200px] shrink-0 flex-col border-r border-[#333] bg-[#404040]"
              >
                <!-- Sidebar tabs -->
                <div class="flex border-b border-[#333]">
                  <button
                    type="button"
                    class="pdfjs-sidebar-tab"
                    [attr.data-active]="sidebarTab() === 'thumbnails'"
                    (click)="sidebarTab.set('thumbnails')"
                  >
                    Pages
                  </button>
                  <button
                    type="button"
                    class="pdfjs-sidebar-tab"
                    [attr.data-active]="sidebarTab() === 'outline'"
                    (click)="sidebarTab.set('outline')"
                  >
                    Outline
                  </button>
                  <button
                    type="button"
                    class="pdfjs-sidebar-tab"
                    [attr.data-active]="sidebarTab() === 'attachments'"
                    (click)="sidebarTab.set('attachments')"
                  >
                    Attach.
                  </button>
                </div>

                <!-- Tab content -->
                <div class="flex-1 overflow-y-auto">
                  @switch (sidebarTab()) {
                    @case ('thumbnails') {
                      <div class="space-y-2 p-2">
                        @for (thumb of thumbnails(); track thumb.page) {
                          <button
                            type="button"
                            class="pdfjs-thumb"
                            [attr.data-active]="
                              viewer.currentPage() === thumb.page
                            "
                            (click)="viewer.goToPage(thumb.page)"
                          >
                            <img
                              [src]="thumb.dataUrl"
                              [alt]="'Page ' + thumb.page"
                              class="mx-auto shadow"
                            />
                            <p class="mt-1 text-center text-xs text-[#bbb]">
                              {{ thumb.page }}
                            </p>
                          </button>
                        }
                      </div>
                    }
                    @case ('outline') {
                      <div class="p-2">
                        @if (outline().length === 0) {
                          <p class="text-center text-xs text-[#999]">
                            No outline available.
                          </p>
                        } @else {
                          <ul class="pdfjs-outline">
                            @for (item of outline(); track item.title) {
                              <li>
                                <button
                                  type="button"
                                  class="pdfjs-outline-item"
                                  (click)="navigateOutline(item)"
                                >
                                  {{ item.title }}
                                </button>
                                @if (item.items && item.items.length > 0) {
                                  <ul class="pdfjs-outline-children">
                                    @for (
                                      child of item.items;
                                      track child.title
                                    ) {
                                      <li>
                                        <button
                                          type="button"
                                          class="pdfjs-outline-item"
                                          (click)="navigateOutline(child)"
                                        >
                                          {{ child.title }}
                                        </button>
                                        @if (
                                          child.items && child.items.length > 0
                                        ) {
                                          <ul class="pdfjs-outline-children">
                                            @for (
                                              sub of child.items;
                                              track sub.title
                                            ) {
                                              <li>
                                                <button
                                                  type="button"
                                                  class="pdfjs-outline-item"
                                                  (click)="navigateOutline(sub)"
                                                >
                                                  {{ sub.title }}
                                                </button>
                                              </li>
                                            }
                                          </ul>
                                        }
                                      </li>
                                    }
                                  </ul>
                                }
                              </li>
                            }
                          </ul>
                        }
                      </div>
                    }
                    @case ('attachments') {
                      <div class="p-2">
                        @if (attachments().length === 0) {
                          <p class="text-center text-xs text-[#999]">
                            No attachments.
                          </p>
                        } @else {
                          <ul class="space-y-1">
                            @for (att of attachments(); track att.filename) {
                              <li>
                                <button
                                  type="button"
                                  class="pdfjs-outline-item"
                                  (click)="downloadAttachment(att)"
                                >
                                  {{ att.filename }}
                                </button>
                              </li>
                            }
                          </ul>
                        }
                      </div>
                    }
                  }
                </div>
              </div>
            }

            <!-- Content -->
            <div scPdfViewerContent class="flex-1 bg-[#808080]">
              <div scPdfViewerLoading></div>
              <div scPdfViewerError></div>
              <div scPdfViewerEmpty></div>

              <sc-pdf-viewer-canvas />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Document Properties Dialog -->
    @if (documentPropertiesOpen()) {
      <div
        class="pdfjs-dialog-overlay"
        (click)="documentPropertiesOpen.set(false)"
      >
        <dialog open class="pdfjs-dialog" (click)="$event.stopPropagation()">
          <h2 class="pdfjs-dialog-title">Document Properties</h2>

          @if (documentProperties(); as props) {
            <div class="pdfjs-dialog-row">
              <span>File Name:</span>
              <p>{{ props.fileName }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>Title:</span>
              <p>{{ props.title }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>Author:</span>
              <p>{{ props.author }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>Subject:</span>
              <p>{{ props.subject }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>Keywords:</span>
              <p>{{ props.keywords }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>Creation Date:</span>
              <p>{{ props.creationDate }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>Modification Date:</span>
              <p>{{ props.modificationDate }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>Creator:</span>
              <p>{{ props.creator }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>Producer:</span>
              <p>{{ props.producer }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>PDF Version:</span>
              <p>{{ props.version }}</p>
            </div>
            <div class="pdfjs-dialog-row">
              <span>Page Count:</span>
              <p>{{ props.pageCount }}</p>
            </div>
          }

          <div class="pdfjs-dialog-buttons">
            <button
              type="button"
              class="pdfjs-dialog-btn"
              (click)="documentPropertiesOpen.set(false)"
            >
              Close
            </button>
          </div>
        </dialog>
      </div>
    }
  `,
  styles: `
    .pdfjs-viewer {
      /* Toolbar buttons (library + custom) */
      [data-slot='pdf-viewer-toolbar'] button:not(.pdfjs-menu-item),
      .pdfjs-btn {
        color: #d1d5db;
        background: transparent;
        border: none;
        border-radius: 4px;
        padding: 4px;
        height: 28px;
        width: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover:not(:disabled) {
          color: #fff;
          background: rgba(255, 255, 255, 0.15);
        }

        &:disabled {
          color: #6b7280;
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .pdfjs-btn-active {
        color: #fff !important;
        background: rgba(255, 255, 255, 0.25) !important;
      }

      .pdfjs-btn-spacer {
        width: 4px;
      }

      /* Editor layer */
      .editorLayer {
        position: absolute;
        inset: 0;
        z-index: 5;
        pointer-events: none;
      }

      /* Page info input */
      [data-slot='pdf-viewer-page-info'] input {
        background: #3d3d3d;
        border-color: #5a5a5a;
        color: #d1d5db;
        width: 3rem;
        height: 24px;
        font-size: 13px;

        &:focus {
          border-color: #6b9edd;
          box-shadow: none;
        }
      }

      [data-slot='pdf-viewer-page-info'] span {
        color: #bbb;
        font-size: 13px;
      }

      /* Zoom select */
      [data-slot='pdf-viewer-zoom-select'] {
        background: #3d3d3d;
        border-color: #5a5a5a;
        color: #d1d5db;
        height: 26px;
        font-size: 13px;
        padding: 0 4px;
      }

      /* Canvas content area */
      [data-slot='pdf-viewer-content'] [role='document'] {
        background: #808080;
      }

      /* Page canvas containers */
      [data-slot='pdf-viewer-canvas'] [data-page] {
        box-shadow:
          0 1px 3px rgba(0, 0, 0, 0.3),
          0 4px 8px rgba(0, 0, 0, 0.15);
      }

      /* Secondary toolbar menu items */
      .pdfjs-menu-item {
        display: block;
        width: 100%;
        text-align: left;
        padding: 6px 16px;
        color: #d1d5db;
        font-size: 13px;
        background: transparent;
        border: none;
        cursor: pointer;
        white-space: nowrap;
        height: auto;
        text-decoration: none;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        &[data-selected='true'] {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);

          &::before {
            content: '✓ ';
          }
        }
      }

      .pdfjs-menu-separator {
        height: 1px;
        margin: 4px 8px;
        background: #666;
      }

      /* Find bar */
      .pdfjs-findbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        padding: 4px 8px;
        background: #474747;
        border-bottom: 1px solid #333;
      }

      .pdfjs-findbar-group {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .pdfjs-findbar-input {
        background: #3d3d3d;
        border: 1px solid #5a5a5a;
        color: #d1d5db;
        padding: 2px 6px;
        font-size: 13px;
        border-radius: 2px;
        height: 24px;
        width: 200px;
        outline: none;

        &:focus {
          border-color: #6b9edd;
        }
      }

      .pdfjs-findbar-label {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #bbb;
        font-size: 12px;
        cursor: pointer;
        user-select: none;

        input[type='checkbox'] {
          accent-color: #6b9edd;
        }
      }

      .pdfjs-findbar-msg {
        color: #bbb;
        font-size: 12px;
      }

      /* Loading bar */
      .pdfjs-loading-bar {
        height: 3px;
        background: #3d3d3d;
        position: relative;
        overflow: hidden;
      }

      .pdfjs-loading-bar-progress {
        height: 100%;
        width: 30%;
        background: #6b9edd;
        animation: pdfjs-loading 1.5s ease-in-out infinite;
      }

      @keyframes pdfjs-loading {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(400%);
        }
      }

      /* Sidebar tabs */
      .pdfjs-sidebar-tab {
        flex: 1;
        padding: 6px 4px;
        font-size: 11px;
        color: #999;
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        white-space: nowrap;

        &:hover {
          color: #ccc;
        }

        &[data-active='true'] {
          color: #fff;
          border-bottom-color: #6b9edd;
        }
      }

      /* Outline tree */
      .pdfjs-outline {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .pdfjs-outline-children {
        list-style: none;
        padding-left: 12px;
        margin: 0;
      }

      .pdfjs-outline-item {
        display: block;
        width: 100%;
        text-align: left;
        padding: 4px 6px;
        color: #bbb;
        font-size: 12px;
        background: transparent;
        border: none;
        cursor: pointer;
        border-radius: 2px;
        line-height: 1.4;

        &:hover {
          background: #4a4a4a;
          color: #fff;
        }
      }

      /* Sidebar thumbnails */
      .pdfjs-thumb {
        width: 100%;
        cursor: pointer;
        border-radius: 0.25rem;
        padding: 0.5rem;
        border: none;
        background: transparent;
        transition: background-color 0.15s;

        &:hover {
          background: #4a4a4a;
        }

        &[data-active='true'] {
          background: #5a5a5a;
          box-shadow: 0 0 0 2px #6b9edd;
        }
      }
    }

    /* Document Properties Dialog */
    .pdfjs-dialog-overlay {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
    }

    .pdfjs-dialog {
      background: #474747;
      border: 1px solid #333;
      border-radius: 4px;
      padding: 16px;
      min-width: 400px;
      max-width: 500px;
      color: #d1d5db;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    .pdfjs-dialog-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #fff;
    }

    .pdfjs-dialog-row {
      display: flex;
      gap: 8px;
      padding: 4px 0;
      font-size: 13px;

      span {
        flex-shrink: 0;
        color: #999;
        min-width: 120px;
      }

      p {
        margin: 0;
        word-break: break-all;
        color: #d1d5db;
      }
    }

    .pdfjs-dialog-buttons {
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
    }

    .pdfjs-dialog-btn {
      background: #5a5a5a;
      border: 1px solid #666;
      border-radius: 4px;
      padding: 6px 16px;
      color: #d1d5db;
      font-size: 13px;
      cursor: pointer;

      &:hover {
        background: #666;
        color: #fff;
      }
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );

  private readonly destroyRef = inject(DestroyRef);
  private readonly viewerRef = viewChild<ScPdfViewerRoot>('viewer');

  // PDF source
  readonly pdfSrc = signal(
    'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  );
  readonly pdfTitle = signal('tracemonkey');

  // UI state
  readonly sidebarOpen = signal(false);
  readonly secondaryToolbarOpen = signal(false);
  readonly documentPropertiesOpen = signal(false);
  readonly sidebarTab = signal<'thumbnails' | 'outline' | 'attachments'>(
    'thumbnails',
  );

  // Thumbnails
  readonly thumbnails = signal<ThumbnailData[]>([]);

  // Outline / Attachments
  readonly outline = signal<OutlineItem[]>([]);
  readonly attachments = signal<AttachmentData[]>([]);

  // Secondary toolbar options (UI state)
  readonly cursorTool = signal<'select' | 'hand'>('select');
  readonly scrollMode = signal<'page' | 'vertical' | 'horizontal' | 'wrapped'>(
    'vertical',
  );
  readonly spreadMode = signal<'none' | 'odd' | 'even'>('none');

  // Document properties
  readonly documentProperties = signal<{
    fileName: string;
    title: string;
    author: string;
    subject: string;
    keywords: string;
    creationDate: string;
    modificationDate: string;
    creator: string;
    producer: string;
    version: string;
    pageCount: string;
  } | null>(null);

  private currentBlobUrl: string | null = null;

  // Bookmark URL for current view
  readonly bookmarkUrl = computed(() => {
    const viewer = this.viewerRef();
    if (!viewer) return '#';
    return `#page=${viewer.currentPage()}`;
  });

  constructor() {
    effect(() => {
      const viewer = this.viewerRef();
      if (!viewer) return;

      const doc = viewer.pdfDocument();
      if (doc) {
        this.renderThumbnails();
        this.loadOutline();
        this.loadAttachments();
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.currentBlobUrl) {
        URL.revokeObjectURL(this.currentBlobUrl);
      }
    });
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
    }

    this.currentBlobUrl = URL.createObjectURL(file);
    this.pdfSrc.set(this.currentBlobUrl);
    this.pdfTitle.set(file.name.replace('.pdf', ''));
    this.thumbnails.set([]);
    this.outline.set([]);
    this.attachments.set([]);
    input.value = '';
  }

  protected toggleHighlightAll(): void {
    const viewer = this.viewerRef();
    if (!viewer) return;
    viewer.findHighlightAll.set(!viewer.findHighlightAll());
    viewer.findTrigger.update((v) => v + 1);
  }

  protected toggleMatchDiacritics(): void {
    const viewer = this.viewerRef();
    if (!viewer) return;
    viewer.findMatchDiacritics.set(!viewer.findMatchDiacritics());
    viewer.find(viewer.findQuery());
  }

  protected async navigateOutline(item: OutlineItem): Promise<void> {
    const viewer = this.viewerRef();
    if (!viewer || !item.dest) return;

    const doc = viewer.pdfDocument();
    if (!doc) return;

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

    if (pageNumber && pageNumber >= 1) {
      viewer.goToPage(pageNumber);
    }
  }

  protected downloadAttachment(att: AttachmentData): void {
    const blob = new Blob([att.content as unknown as BlobPart]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = att.filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  protected openDocumentProperties(): void {
    this.secondaryToolbarOpen.set(false);
    this.loadDocumentProperties();
    this.documentPropertiesOpen.set(true);
  }

  private async loadDocumentProperties(): Promise<void> {
    const viewer = this.viewerRef();
    if (!viewer) return;

    const doc = viewer.pdfDocument();
    if (!doc) return;

    try {
      const metadata = await doc.getMetadata();
      const info = metadata.info as Record<string, string>;

      this.documentProperties.set({
        fileName: this.pdfTitle() || '-',
        title: info?.['Title'] || '-',
        author: info?.['Author'] || '-',
        subject: info?.['Subject'] || '-',
        keywords: info?.['Keywords'] || '-',
        creationDate: info?.['CreationDate'] || '-',
        modificationDate: info?.['ModDate'] || '-',
        creator: info?.['Creator'] || '-',
        producer: info?.['Producer'] || '-',
        version: info?.['PDFFormatVersion'] || '-',
        pageCount: doc.numPages.toString(),
      });
    } catch {
      this.documentProperties.set(null);
    }
  }

  private async renderThumbnails(): Promise<void> {
    const viewer = this.viewerRef();
    if (!viewer) return;

    const doc = viewer.pdfDocument();
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

        thumbs.push({
          page: i,
          dataUrl: canvas.toDataURL(),
        });
      } catch {
        // Skip failed page
      }
    }

    this.thumbnails.set(thumbs);
  }

  private async loadOutline(): Promise<void> {
    const viewer = this.viewerRef();
    if (!viewer) return;

    const doc = viewer.pdfDocument();
    if (!doc) return;

    try {
      const outline = await doc.getOutline();
      this.outline.set((outline as OutlineItem[]) ?? []);
    } catch {
      this.outline.set([]);
    }
  }

  private async loadAttachments(): Promise<void> {
    const viewer = this.viewerRef();
    if (!viewer) return;

    const doc = viewer.pdfDocument();
    if (!doc) return;

    try {
      const atts = await doc.getAttachments();
      if (!atts) {
        this.attachments.set([]);
        return;
      }
      const list: AttachmentData[] = [];
      for (const [filename, data] of Object.entries(atts)) {
        list.push({
          filename,
          content: (data as { content: Uint8Array }).content,
        });
      }
      this.attachments.set(list);
    } catch {
      this.attachments.set([]);
    }
  }
}
