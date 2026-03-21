import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerDownload,
  ScPdfViewerEmpty,
  ScPdfViewerError,
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
  SiPanelLeftIcon,
  SiPrinterIcon,
  SiSearchIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

interface ThumbnailData {
  page: number;
  dataUrl: string;
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
    SiChevronUpIcon,
    SiChevronDownIcon,
    SiDownloadIcon,
    SiEllipsisVerticalIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiPrinterIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div class="pdfjs-viewer h-[800px]">
      <div
        scPdfViewer
        class="h-full"
        [src]="pdfSrc()"
        [title]="pdfTitle()"
        #viewer="scPdfViewer"
      >
        <div
          scPdfViewerContainer
          class="h-full overflow-visible rounded-none border-none"
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
            <button
              type="button"
              class="pdfjs-btn"
              [attr.aria-pressed]="findBarOpen()"
              aria-label="Find in Document"
              (click)="findBarOpen.set(!findBarOpen())"
            >
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
          @if (findBarOpen()) {
            <div class="pdfjs-findbar">
              <div class="pdfjs-findbar-group">
                <input
                  #findInput
                  type="text"
                  class="pdfjs-findbar-input"
                  placeholder="Find in document…"
                  (input)="onFindInput(findInput.value)"
                  (keydown.enter)="findNext()"
                />
                <button
                  type="button"
                  class="pdfjs-btn"
                  aria-label="Find Previous"
                  (click)="findPrevious()"
                >
                  <svg siChevronUpIcon class="size-3.5"></svg>
                </button>
                <button
                  type="button"
                  class="pdfjs-btn"
                  aria-label="Find Next"
                  (click)="findNext()"
                >
                  <svg siChevronDownIcon class="size-3.5"></svg>
                </button>
              </div>
              <div class="pdfjs-findbar-group">
                <label class="pdfjs-findbar-label">
                  <input
                    type="checkbox"
                    [checked]="findHighlightAll()"
                    (change)="findHighlightAll.set(!findHighlightAll())"
                  />
                  Highlight All
                </label>
                <label class="pdfjs-findbar-label">
                  <input
                    type="checkbox"
                    [checked]="findMatchCase()"
                    (change)="
                      findMatchCase.set(!findMatchCase());
                      onFindInput(findInput.value)
                    "
                  />
                  Match Case
                </label>
                <label class="pdfjs-findbar-label">
                  <input
                    type="checkbox"
                    [checked]="findEntireWord()"
                    (change)="
                      findEntireWord.set(!findEntireWord());
                      onFindInput(findInput.value)
                    "
                  />
                  Whole Words
                </label>
              </div>
              <div class="pdfjs-findbar-group">
                <span class="pdfjs-findbar-msg">
                  {{ findResultsMessage() }}
                </span>
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
            <!-- Sidebar with page thumbnails -->
            @if (sidebarOpen()) {
              <div
                class="w-[200px] shrink-0 overflow-y-auto border-r border-[#333] bg-[#404040]"
              >
                <div class="space-y-2 p-2">
                  @for (thumb of thumbnails(); track thumb.page) {
                    <button
                      type="button"
                      class="pdfjs-thumb"
                      [attr.data-active]="viewer.currentPage() === thumb.page"
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

      .pdfjs-btn-spacer {
        width: 4px;
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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerDemo {
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
  readonly findBarOpen = signal(false);
  readonly documentPropertiesOpen = signal(false);

  // Thumbnails
  readonly thumbnails = signal<ThumbnailData[]>([]);

  // Find state
  readonly findMatchCase = signal(false);
  readonly findHighlightAll = signal(false);
  readonly findEntireWord = signal(false);
  readonly findResultsCount = signal(0);
  readonly findResultsMessage = signal('');

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
  private pageTexts: string[] = [];
  private findCurrentPageIndex = 0;

  constructor() {
    effect(() => {
      const viewer = this.viewerRef();
      if (!viewer) return;

      const doc = viewer.pdfDocument();
      if (doc) {
        this.renderThumbnails();
        this.extractText();
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
    this.pageTexts = [];
    this.findResultsCount.set(0);
    this.findResultsMessage.set('');
    input.value = '';
  }

  protected onFindInput(query: string): void {
    if (!query || this.pageTexts.length === 0) {
      this.findResultsCount.set(0);
      this.findResultsMessage.set('');
      this.findCurrentPageIndex = 0;
      return;
    }

    const matchCase = this.findMatchCase();
    const entireWord = this.findEntireWord();
    let totalMatches = 0;

    for (const pageText of this.pageTexts) {
      if (entireWord) {
        const flags = matchCase ? 'g' : 'gi';
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, flags);
        const matches = pageText.match(regex);
        totalMatches += matches ? matches.length : 0;
      } else {
        const searchIn = matchCase ? pageText : pageText.toLowerCase();
        const searchFor = matchCase ? query : query.toLowerCase();
        let idx = 0;
        while ((idx = searchIn.indexOf(searchFor, idx)) !== -1) {
          totalMatches++;
          idx += searchFor.length;
        }
      }
    }

    this.findResultsCount.set(totalMatches);
    this.findResultsMessage.set(
      totalMatches > 0
        ? `${totalMatches} match${totalMatches !== 1 ? 'es' : ''} found`
        : 'Phrase not found',
    );
  }

  protected findNext(): void {
    this.navigateFind(1);
  }

  protected findPrevious(): void {
    this.navigateFind(-1);
  }

  protected openDocumentProperties(): void {
    this.secondaryToolbarOpen.set(false);
    this.loadDocumentProperties();
    this.documentPropertiesOpen.set(true);
  }

  private navigateFind(direction: number): void {
    const viewer = this.viewerRef();
    if (!viewer || this.pageTexts.length === 0) return;

    const query =
      (document.querySelector('.pdfjs-findbar-input') as HTMLInputElement)
        ?.value || '';
    if (!query) return;

    const matchCase = this.findMatchCase();
    const searchFor = matchCase ? query : query.toLowerCase();
    const start = this.findCurrentPageIndex;

    for (let i = 1; i <= this.pageTexts.length; i++) {
      const idx =
        (start + i * direction + this.pageTexts.length) % this.pageTexts.length;
      const text = matchCase
        ? this.pageTexts[idx]
        : this.pageTexts[idx].toLowerCase();

      if (text.includes(searchFor)) {
        this.findCurrentPageIndex = idx;
        viewer.goToPage(idx + 1);
        return;
      }
    }
  }

  private async extractText(): Promise<void> {
    const viewer = this.viewerRef();
    if (!viewer) return;

    const doc = viewer.pdfDocument();
    if (!doc) return;

    this.pageTexts = [];
    for (let i = 1; i <= doc.numPages; i++) {
      try {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        const text = (textContent.items as { str?: string }[])
          .filter((item) => item.str !== undefined)
          .map((item) => item.str)
          .join(' ');
        this.pageTexts.push(text);
      } catch {
        this.pageTexts.push('');
      }
    }
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
}
