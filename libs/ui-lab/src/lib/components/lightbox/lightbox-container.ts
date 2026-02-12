import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_LIGHTBOX } from './lightbox';

@Component({
  selector: '[sc-lightbox-container]',
  template: `
    @if (lightbox.isOpen()) {
      <div
        [class]="overlayClass()"
        (click)="lightbox.onOverlayClick($event)"
        (keydown)="lightbox.onKeydown($event)"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="
          'Image gallery, showing image ' +
          (lightbox.currentIndex() + 1) +
          ' of ' +
          lightbox.images().length
        "
      >
        <!-- Close button -->
        <button
          type="button"
          [class]="closeButtonClass()"
          (click)="lightbox.close()"
          aria-label="Close lightbox"
        >
          <ng-content select="[sc-lightbox-close-icon]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-6"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </ng-content>
        </button>

        <!-- Navigation: Previous -->
        @if (lightbox.images().length > 1) {
          <button
            type="button"
            [class]="navButtonClass('left')"
            (click)="lightbox.previous()"
            [disabled]="!lightbox.loop() && lightbox.currentIndex() === 0"
            aria-label="Previous image"
          >
            <ng-content select="[sc-lightbox-prev-icon]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="size-8"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </ng-content>
          </button>
        }

        <!-- Main image container -->
        <div [class]="imageContainerClass()">
          <img
            [src]="lightbox.currentImage().src"
            [alt]="
              lightbox.currentImage().alt ||
              'Image ' + (lightbox.currentIndex() + 1)
            "
            [class]="imageClass()"
            [style.transform]="'scale(' + lightbox.zoomLevel() + ')'"
            (load)="lightbox.onImageLoad()"
            draggable="false"
          />

          <!-- Loading indicator -->
          @if (lightbox.imageLoading()) {
            <div class="absolute inset-0 flex items-center justify-center">
              <ng-content select="[sc-lightbox-loading]">
                <svg
                  class="size-8 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  (click)="$event.stopPropagation()"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </ng-content>
            </div>
          }
        </div>

        <!-- Navigation: Next -->
        @if (lightbox.images().length > 1) {
          <button
            type="button"
            [class]="navButtonClass('right')"
            (click)="lightbox.next()"
            [disabled]="
              !lightbox.loop() &&
              lightbox.currentIndex() === lightbox.images().length - 1
            "
            aria-label="Next image"
          >
            <ng-content select="[sc-lightbox-next-icon]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="size-8"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </ng-content>
          </button>
        }

        <!-- Bottom bar -->
        <div [class]="bottomBarClass()">
          <!-- Image info -->
          @if (
            lightbox.showInfo() &&
            (lightbox.currentImage().title ||
              lightbox.currentImage().description)
          ) {
            <div class="flex-1 text-white">
              @if (lightbox.currentImage().title) {
                <h3 class="font-semibold">
                  {{ lightbox.currentImage().title }}
                </h3>
              }
              @if (lightbox.currentImage().description) {
                <p class="text-sm text-white/80">
                  {{ lightbox.currentImage().description }}
                </p>
              }
            </div>
          }

          <!-- Controls -->
          <div class="flex items-center gap-2">
            <!-- Counter -->
            @if (lightbox.showCounter() && lightbox.images().length > 1) {
              <span class="text-sm text-white/80">
                {{ lightbox.currentIndex() + 1 }} /
                {{ lightbox.images().length }}
              </span>
            }

            <!-- Zoom controls -->
            @if (lightbox.showZoom()) {
              <div class="flex items-center gap-1 ml-4">
                <button
                  type="button"
                  class="p-2 text-white/80 hover:text-white transition-colors"
                  (click)="lightbox.zoomOut()"
                  [disabled]="lightbox.zoomLevel() <= 0.5"
                  aria-label="Zoom out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="size-5"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3M8 11h6" />
                  </svg>
                </button>
                <span class="text-sm text-white/80 min-w-[3rem] text-center">
                  {{ Math.round(lightbox.zoomLevel() * 100) }}%
                </span>
                <button
                  type="button"
                  class="p-2 text-white/80 hover:text-white transition-colors"
                  (click)="lightbox.zoomIn()"
                  [disabled]="lightbox.zoomLevel() >= 3"
                  aria-label="Zoom in"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="size-5"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3M8 11h6M11 8v6" />
                  </svg>
                </button>
                <button
                  type="button"
                  class="p-2 text-white/80 hover:text-white transition-colors"
                  (click)="lightbox.resetZoom()"
                  aria-label="Reset zoom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="size-5"
                  >
                    <path d="M21 21l-6-6m6 6v-4.8m0 4.8h-4.8" />
                    <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
                    <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
                    <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
                  </svg>
                </button>
              </div>
            }
          </div>
        </div>

        <!-- Thumbnails -->
        @if (lightbox.showThumbnails() && lightbox.images().length > 1) {
          <div [class]="thumbnailsClass()">
            @for (image of lightbox.images(); track image.src; let i = $index) {
              <button
                type="button"
                [class]="thumbnailClass(i)"
                (click)="lightbox.goTo(i)"
                [attr.aria-label]="'Go to image ' + (i + 1)"
              >
                <img
                  [src]="image.thumbnail || image.src"
                  [alt]="image.alt || 'Thumbnail ' + (i + 1)"
                  class="size-full object-cover"
                />
              </button>
            }
          </div>
        }
      </div>
    }
  `,
  host: {
    'data-slot': 'lightbox-container',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLightboxContainer {
  readonly lightbox = inject(SC_LIGHTBOX);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly Math = Math;

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly overlayClass = computed(() =>
    cn(
      'lightbox-overlay fixed inset-0 z-50 bg-black/95 flex flex-col',
      'animate-in fade-in-0 duration-200',
    ),
  );

  protected readonly closeButtonClass = computed(() =>
    cn(
      'absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white',
      'transition-colors rounded-full hover:bg-white/10',
    ),
  );

  protected navButtonClass(side: 'left' | 'right'): string {
    return cn(
      'absolute top-1/2 -translate-y-1/2 z-10 p-2 text-white/80 hover:text-white',
      'transition-colors rounded-full hover:bg-white/10',
      'disabled:opacity-30 disabled:cursor-not-allowed',
      side === 'left' ? 'left-4' : 'right-4',
    );
  }

  protected readonly imageContainerClass = computed(() =>
    cn('flex-1 flex items-center justify-center overflow-hidden relative'),
  );

  protected readonly imageClass = computed(() =>
    cn(
      'max-h-[calc(100vh-200px)] max-w-[calc(100vw-100px)] object-contain',
      'transition-transform duration-200',
      this.lightbox.imageLoading() && 'opacity-0',
    ),
  );

  protected readonly bottomBarClass = computed(() =>
    cn('flex items-center justify-between px-4 py-3 bg-black/50'),
  );

  protected readonly thumbnailsClass = computed(() =>
    cn(
      'flex items-center justify-center gap-2 px-4 py-3 bg-black/50 overflow-x-auto',
    ),
  );

  protected thumbnailClass(index: number): string {
    return cn(
      'size-16 rounded overflow-hidden flex-shrink-0',
      'ring-2 ring-offset-2 ring-offset-black transition-all',
      index === this.lightbox.currentIndex()
        ? 'ring-white'
        : 'ring-transparent hover:ring-white/50',
    );
  }
}
