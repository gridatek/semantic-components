import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCarousel,
  ScCarouselItem,
  ScCarouselTrack,
  ScCarouselViewport,
} from '@semantic-components/carousel';
import {
  ScLightbox,
  ScLightboxClose,
  ScLightboxCounter,
  ScLightboxImageData,
  ScLightboxNext,
  ScLightboxPortal,
  ScLightboxPrev,
  ScLightboxProvider,
  ScLightboxThumbnail,
  ScLightboxThumbnailBar,
  ScLightboxToolbar,
  ScLightboxTrigger,
  ScLightboxZoomControls,
  ScLightboxZoomIn,
  ScLightboxZoomOut,
  ScLightboxZoomReset,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiImageIcon,
  SiMinimize2Icon,
  SiXIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-keyboard-lightbox-demo',
  imports: [
    ScLightboxProvider,
    ScLightbox,
    ScLightboxClose,
    ScLightboxCounter,
    ScLightboxNext,
    ScLightboxPrev,
    ScLightboxTrigger,
    ScLightboxPortal,
    ScLightboxThumbnail,
    ScLightboxThumbnailBar,
    ScLightboxToolbar,
    ScLightboxZoomControls,
    ScLightboxZoomIn,
    ScLightboxZoomOut,
    ScLightboxZoomReset,
    ScCarousel,
    ScCarouselViewport,
    ScCarouselTrack,
    ScCarouselItem,
    SiImageIcon,
    SiXIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
    SiMinimize2Icon,
  ],
  template: `
    <div class="space-y-3">
      <ul class="text-muted-foreground list-inside list-disc space-y-1 text-sm">
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">←</kbd>
          /
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">→</kbd>
          - Navigate images
        </li>
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">+</kbd>
          /
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">-</kbd>
          - Zoom in/out
        </li>
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">0</kbd>
          - Reset zoom
        </li>
        <li>
          <kbd class="bg-muted rounded px-1 py-0.5 text-xs">Esc</kbd>
          - Close lightbox
        </li>
      </ul>
      <div scLightboxProvider [images]="images" #lightbox="scLightboxProvider">
        <button
          scLightboxTrigger
          [index]="0"
          class="hover:bg-accent inline-flex items-center gap-2 rounded-md border px-4 py-2"
        >
          <svg siImageIcon class="size-4"></svg>
          Open Gallery
        </button>

        <ng-template scLightboxPortal>
          <div scLightbox>
            <button scLightboxClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close lightbox</span>
            </button>

            <div
              scCarousel
              [activeIndex]="lightbox.currentIndex()"
              (activeIndexChange)="lightbox.goTo($event)"
              [options]="{ loop: lightbox.loop() }"
              class="flex-1"
              #carousel="scCarousel"
            >
              <div scCarouselViewport class="h-full">
                <div scCarouselTrack class="h-full">
                  @for (image of images; track image.src; let i = $index) {
                    <div
                      scCarouselItem
                      class="flex items-center justify-center ps-0"
                    >
                      <img
                        [src]="image.src"
                        [alt]="image.alt || 'Image ' + (i + 1)"
                        [style.transform]="
                          i === lightbox.currentIndex()
                            ? 'scale(' + lightbox.zoomLevel() + ')'
                            : 'scale(1)'
                        "
                        class="max-h-[calc(100vh-200px)] max-w-[calc(100vw-100px)] object-contain transition-transform duration-200"
                        draggable="false"
                      />
                    </div>
                  }
                </div>
              </div>

              @if (images.length > 1) {
                <button scLightboxPrev>
                  <svg siChevronLeftIcon></svg>
                  <span class="sr-only">Previous image</span>
                </button>
                <button scLightboxNext>
                  <svg siChevronRightIcon></svg>
                  <span class="sr-only">Next image</span>
                </button>
              }
            </div>

            <div scLightboxToolbar>
              <span scLightboxCounter></span>
              <div scLightboxZoomControls>
                <button scLightboxZoomOut>
                  <svg siZoomOutIcon></svg>
                </button>
                <span class="min-w-12 text-center text-sm text-white/80">
                  {{ Math.round(lightbox.zoomLevel() * 100) }}%
                </span>
                <button scLightboxZoomIn>
                  <svg siZoomInIcon></svg>
                </button>
                <button scLightboxZoomReset>
                  <svg siMinimize2Icon></svg>
                </button>
              </div>
            </div>

            <div scLightboxThumbnailBar>
              @for (
                image of lightbox.images();
                track image.src;
                let i = $index
              ) {
                <button type="button" scLightboxThumbnail [index]="i">
                  <img
                    [src]="image.thumbnail || image.src"
                    [alt]="image.alt || 'Thumbnail ' + (i + 1)"
                    class="size-full object-cover"
                  />
                </button>
              }
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardLightboxDemo {
  protected readonly Math = Math;

  readonly images: ScLightboxImageData[] = [
    { src: 'https://picsum.photos/800/600?random=1', alt: 'Random image 1' },
    { src: 'https://picsum.photos/800/600?random=2', alt: 'Random image 2' },
    { src: 'https://picsum.photos/800/600?random=3', alt: 'Random image 3' },
    { src: 'https://picsum.photos/800/600?random=4', alt: 'Random image 4' },
  ];
}
