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
  ScLightboxImageData,
  ScLightboxNext,
  ScLightboxPortal,
  ScLightboxPrev,
  ScLightboxProvider,
  ScLightboxThumbnail,
  ScLightboxTrigger,
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
  selector: 'app-info-lightbox-demo',
  imports: [
    ScLightboxProvider,
    ScLightbox,
    ScLightboxClose,
    ScLightboxNext,
    ScLightboxPrev,
    ScLightboxTrigger,
    ScLightboxPortal,
    ScLightboxThumbnail,
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
    <div scLightboxProvider [images]="images" #lightbox="scLightboxProvider">
      <div class="flex gap-4">
        @for (image of images; track image.src; let i = $index) {
          <button
            scLightboxTrigger
            [index]="i"
            class="focus:ring-ring w-40 overflow-hidden rounded-lg focus:ring-2 focus:outline-none"
          >
            <img
              [src]="image.thumbnail || image.src"
              [alt]="image.alt"
              class="aspect-video w-full object-cover"
            />
            <div class="p-2 text-left">
              <p class="truncate text-sm font-medium">{{ image.title }}</p>
            </div>
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

          <div class="flex items-center justify-between bg-black/50 px-4 py-3">
            @if (
              lightbox.currentImage().title ||
              lightbox.currentImage().description
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
            <div class="flex items-center gap-2">
              <span class="text-sm text-white/80">
                {{ lightbox.currentIndex() + 1 }} /
                {{ lightbox.images().length }}
              </span>
              <div class="ml-4 flex items-center gap-1">
                <button
                  type="button"
                  class="p-2 text-white/80 transition-colors hover:text-white"
                  (click)="lightbox.zoomOut()"
                  [disabled]="lightbox.zoomLevel() <= 0.5"
                  aria-label="Zoom out"
                >
                  <svg siZoomOutIcon class="size-5"></svg>
                </button>
                <span class="min-w-12 text-center text-sm text-white/80">
                  {{ Math.round(lightbox.zoomLevel() * 100) }}%
                </span>
                <button
                  type="button"
                  class="p-2 text-white/80 transition-colors hover:text-white"
                  (click)="lightbox.zoomIn()"
                  [disabled]="lightbox.zoomLevel() >= 3"
                  aria-label="Zoom in"
                >
                  <svg siZoomInIcon class="size-5"></svg>
                </button>
                <button
                  type="button"
                  class="p-2 text-white/80 transition-colors hover:text-white"
                  (click)="lightbox.resetZoom()"
                  aria-label="Reset zoom"
                >
                  <svg siMinimize2Icon class="size-5"></svg>
                </button>
              </div>
            </div>
          </div>

          <div
            class="flex items-center justify-center gap-2 overflow-x-auto bg-black/50 px-4 py-3"
          >
            @for (image of lightbox.images(); track image.src; let i = $index) {
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoLightboxDemo {
  protected readonly Math = Math;

  readonly images: ScLightboxImageData[] = [
    {
      src: 'https://picsum.photos/800/600?random=10',
      alt: 'Mountain landscape',
      title: 'Mountain Sunrise',
      description: 'A beautiful sunrise over the mountains captured at dawn.',
    },
    {
      src: 'https://picsum.photos/800/600?random=11',
      alt: 'Ocean view',
      title: 'Ocean Waves',
      description: 'Peaceful ocean waves on a sunny afternoon.',
    },
    {
      src: 'https://picsum.photos/800/600?random=12',
      alt: 'Forest path',
      title: 'Forest Trail',
      description: 'A winding path through an ancient forest.',
    },
  ];
}
