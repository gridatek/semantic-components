import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import {
  DEFAULT_TOOLBAR_CONFIG,
  ZOOM_LEVELS,
  type PdfToolbarConfig,
  type PdfZoomLevel,
} from './pdf-viewer-types';

@Component({
  selector: 'sc-pdf-viewer-toolbar',
  template: `
    <div [class]="toolbarClass()">
      <!-- Navigation -->
      @if (config().showNavigation) {
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            [disabled]="currentPage() <= 1"
            (click)="prevPage.emit()"
            aria-label="Previous page"
            title="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          @if (config().showPageInfo) {
            <div class="flex items-center gap-1 px-2">
              <input
                type="number"
                [value]="currentPage()"
                (change)="onPageInput($event)"
                (keydown.enter)="onPageInput($event)"
                class="w-12 px-2 py-1 text-sm text-center border rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                [attr.min]="1"
                [attr.max]="totalPages()"
                aria-label="Current page"
              />
              <span class="text-sm text-muted-foreground">
                / {{ totalPages() }}
              </span>
            </div>
          }

          <button
            type="button"
            class="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            [disabled]="currentPage() >= totalPages()"
            (click)="nextPage.emit()"
            aria-label="Next page"
            title="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      }

      <!-- Separator -->
      @if (config().showNavigation && config().showZoom) {
        <div class="w-px h-6 bg-border"></div>
      }

      <!-- Zoom -->
      @if (config().showZoom) {
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="p-2 rounded-lg hover:bg-muted disabled:opacity-50 transition-colors"
            (click)="zoomOut.emit()"
            aria-label="Zoom out"
            title="Zoom out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M8 11h6" />
            </svg>
          </button>

          <select
            class="px-2 py-1.5 text-sm border rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            [value]="zoomLevelValue()"
            (change)="onZoomSelect($event)"
            aria-label="Zoom level"
          >
            @for (level of zoomLevels; track level.value) {
              <option [value]="level.value">{{ level.label }}</option>
            }
          </select>

          <button
            type="button"
            class="p-2 rounded-lg hover:bg-muted disabled:opacity-50 transition-colors"
            (click)="zoomIn.emit()"
            aria-label="Zoom in"
            title="Zoom in"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M11 8v6" />
              <path d="M8 11h6" />
            </svg>
          </button>
        </div>
      }

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Rotate -->
      @if (config().showRotate) {
        <button
          type="button"
          class="p-2 rounded-lg hover:bg-muted transition-colors"
          (click)="rotateLeft.emit()"
          aria-label="Rotate left"
          title="Rotate left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        <button
          type="button"
          class="p-2 rounded-lg hover:bg-muted transition-colors"
          (click)="rotateRight.emit()"
          aria-label="Rotate right"
          title="Rotate right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>
      }

      <!-- Separator -->
      @if (
        config().showRotate &&
        (config().showDownload || config().showPrint || config().showFullscreen)
      ) {
        <div class="w-px h-6 bg-border"></div>
      }

      <!-- Download -->
      @if (config().showDownload) {
        <button
          type="button"
          class="p-2 rounded-lg hover:bg-muted transition-colors"
          (click)="download.emit()"
          aria-label="Download"
          title="Download"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        </button>
      }

      <!-- Print -->
      @if (config().showPrint) {
        <button
          type="button"
          class="p-2 rounded-lg hover:bg-muted transition-colors"
          (click)="print.emit()"
          aria-label="Print"
          title="Print"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path
              d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
            />
            <rect width="12" height="8" x="6" y="14" />
          </svg>
        </button>
      }

      <!-- Fullscreen -->
      @if (config().showFullscreen) {
        <button
          type="button"
          class="p-2 rounded-lg hover:bg-muted transition-colors"
          (click)="toggleFullscreen.emit()"
          [attr.aria-label]="
            isFullscreen() ? 'Exit fullscreen' : 'Enter fullscreen'
          "
          [title]="isFullscreen() ? 'Exit fullscreen' : 'Enter fullscreen'"
        >
          @if (isFullscreen()) {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          } @else {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          }
        </button>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerToolbar {
  readonly currentPage = input(1);
  readonly totalPages = input(1);
  readonly zoom = input<PdfZoomLevel>('auto');
  readonly isFullscreen = input(false);
  readonly toolbarConfig = input<PdfToolbarConfig>({});
  readonly class = input<string>('');

  readonly prevPage = output<void>();
  readonly nextPage = output<void>();
  readonly goToPage = output<number>();
  readonly zoomIn = output<void>();
  readonly zoomOut = output<void>();
  readonly zoomChange = output<PdfZoomLevel>();
  readonly rotateLeft = output<void>();
  readonly rotateRight = output<void>();
  readonly download = output<void>();
  readonly print = output<void>();
  readonly toggleFullscreen = output<void>();

  protected readonly zoomLevels = ZOOM_LEVELS;

  protected readonly config = computed(() => ({
    ...DEFAULT_TOOLBAR_CONFIG,
    ...this.toolbarConfig(),
  }));

  protected readonly toolbarClass = computed(() =>
    cn(
      'flex items-center gap-2 px-3 py-2 bg-background border-b',
      this.class(),
    ),
  );

  protected readonly zoomLevelValue = computed(() => {
    const z = this.zoom();
    return typeof z === 'number' ? z.toString() : z;
  });

  protected onPageInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const page = parseInt(input.value, 10);
    if (!isNaN(page) && page >= 1 && page <= this.totalPages()) {
      this.goToPage.emit(page);
    } else {
      input.value = this.currentPage().toString();
    }
  }

  protected onZoomSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    if (value === 'auto' || value === 'page-fit' || value === 'page-width') {
      this.zoomChange.emit(value);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        this.zoomChange.emit(numValue);
      }
    }
  }
}
