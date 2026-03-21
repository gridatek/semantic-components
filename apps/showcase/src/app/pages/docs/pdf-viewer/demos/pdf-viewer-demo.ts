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
  ScPdfViewerFullscreen,
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
  SiFolderOpenIcon,
  SiMaximizeIcon,
  SiMinimizeIcon,
  SiPanelLeftIcon,
  SiPrinterIcon,
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
    ScPdfViewerFullscreen,
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
    SiMaximizeIcon,
    SiMinimizeIcon,
    SiPanelLeftIcon,
    SiFolderOpenIcon,
    SiEllipsisVerticalIcon,
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
        <div scPdfViewerContainer class="h-full rounded-none border-none">
          <!-- Toolbar -->
          <div
            scPdfViewerToolbar
            class="border-b-[#333] bg-[#474747] px-1 py-1"
          >
            <!-- Sidebar toggle -->
            <button
              type="button"
              class="pdfjs-btn"
              [attr.aria-pressed]="sidebarOpen()"
              aria-label="Toggle Sidebar"
              (click)="sidebarOpen.set(!sidebarOpen())"
            >
              <svg siPanelLeftIcon class="size-4"></svg>
            </button>

            <div scPdfViewerSeparator class="bg-[#666]"></div>

            <!-- Navigation -->
            <div scPdfViewerNav>
              <button scPdfViewerPrevPage>
                <svg siChevronUpIcon class="size-4"></svg>
              </button>
              <button scPdfViewerNextPage>
                <svg siChevronDownIcon class="size-4"></svg>
              </button>
              <div scPdfViewerPageInfo></div>
            </div>

            <div scPdfViewerSeparator class="bg-[#666]"></div>

            <!-- Zoom -->
            <div scPdfViewerZoom>
              <button scPdfViewerZoomOut>
                <svg siZoomOutIcon class="size-4"></svg>
              </button>
              <select scPdfViewerZoomSelect></select>
              <button scPdfViewerZoomIn>
                <svg siZoomInIcon class="size-4"></svg>
              </button>
            </div>

            <div scPdfViewerSpacer></div>

            <!-- Presentation / Fullscreen -->
            <button scPdfViewerFullscreen>
              @if (viewer.isFullscreen()) {
                <svg siMinimizeIcon class="size-4"></svg>
              } @else {
                <svg siMaximizeIcon class="size-4"></svg>
              }
            </button>

            <!-- Open file -->
            <button
              type="button"
              class="pdfjs-btn"
              aria-label="Open File"
              (click)="fileInput.click()"
            >
              <svg siFolderOpenIcon class="size-4"></svg>
            </button>
            <input
              #fileInput
              type="file"
              accept=".pdf"
              class="hidden"
              (change)="onFileSelected($event)"
            />

            <!-- Print -->
            <button scPdfViewerPrint>
              <svg siPrinterIcon class="size-4"></svg>
            </button>

            <!-- Download -->
            <button scPdfViewerDownload>
              <svg siDownloadIcon class="size-4"></svg>
            </button>

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
                  class="absolute top-full right-0 z-20 mt-1 min-w-52 rounded border border-[#333] bg-[#474747] py-1 shadow-lg"
                >
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
                  <div class="mx-2 my-1 h-px bg-[#666]"></div>
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
                </div>
              }
            </div>
          </div>

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
  `,
  styles: `
    .pdfjs-viewer {
      /* Toolbar buttons (library + custom) */
      [data-slot='pdf-viewer-toolbar'] button,
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

        &:hover {
          background: rgba(255, 255, 255, 0.1);
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerDemo {
  private readonly destroyRef = inject(DestroyRef);
  private readonly viewerRef = viewChild<ScPdfViewerRoot>('viewer');

  readonly pdfSrc = signal(
    'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  );
  readonly pdfTitle = signal('tracemonkey');
  readonly sidebarOpen = signal(false);
  readonly secondaryToolbarOpen = signal(false);
  readonly thumbnails = signal<ThumbnailData[]>([]);

  private currentBlobUrl: string | null = null;

  constructor() {
    effect(() => {
      const viewer = this.viewerRef();
      if (!viewer) return;

      const doc = viewer.pdfDocument();
      if (doc) {
        this.renderThumbnails();
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
    input.value = '';
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
