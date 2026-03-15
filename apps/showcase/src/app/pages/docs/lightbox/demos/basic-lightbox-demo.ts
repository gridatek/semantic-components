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
  SiMinimize2Icon,
  SiXIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-lightbox-demo',
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
    SiXIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
    SiMinimize2Icon,
  ],
  template: `
    <div class="space-y-2">
      <div scLightboxProvider [images]="images" #lightbox="scLightboxProvider">
        <div class="flex gap-4">
          @for (image of images; track image.src; let i = $index) {
            <button scLightboxTrigger [index]="i" class="h-32 w-32">
              <img
                [src]="image.thumbnail || image.src"
                [alt]="image.alt"
                class="size-full object-cover"
              />
            </button>
          }
        </div>

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
                <button scLightboxZoomOut value="zoom-out">
                  <svg siZoomOutIcon></svg>
                </button>
                <span class="min-w-12 text-center text-sm text-white/80">
                  {{ Math.round(lightbox.zoomLevel() * 100) }}%
                </span>
                <button scLightboxZoomIn value="zoom-in">
                  <svg siZoomInIcon></svg>
                </button>
                <button scLightboxZoomReset value="zoom-reset">
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
                <button
                  type="button"
                  scLightboxThumbnail
                  [index]="i"
                  [value]="i"
                >
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
      <p class="text-muted-foreground text-sm">
        Click an image to open the lightbox. Use arrow keys or buttons to
        navigate.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLightboxDemo {
  protected readonly Math = Math;

  readonly images: ScLightboxImageData[] = [
    { src: 'https://picsum.photos/800/600?random=1', alt: 'Random image 1' },
    { src: 'https://picsum.photos/800/600?random=2', alt: 'Random image 2' },
    { src: 'https://picsum.photos/800/600?random=3', alt: 'Random image 3' },
    { src: 'https://picsum.photos/800/600?random=4', alt: 'Random image 4' },
  ];
}
