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
  ScLightboxGallery,
  ScLightboxGalleryItem,
  ScLightboxImageData,
  ScLightboxNext,
  ScLightboxPortal,
  ScLightboxPrev,
  ScLightboxProvider,
  ScLightboxThumbnail,
  ScLightboxThumbnailBar,
  ScLightboxToolbar,
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
  selector: 'app-gallery-lightbox-demo',
  imports: [
    ScLightboxProvider,
    ScLightbox,
    ScLightboxClose,
    ScLightboxCounter,
    ScLightboxGallery,
    ScLightboxGalleryItem,
    ScLightboxNext,
    ScLightboxPortal,
    ScLightboxPrev,
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
    <div
      scLightboxProvider
      [images]="images"
      #lightbox="scLightboxProvider"
      class="max-w-xl"
    >
      <div scLightboxGallery class="grid-cols-4 gap-2">
        @for (image of images; track image.src; let i = $index) {
          <button type="button" scLightboxGalleryItem [index]="i">
            <img
              [src]="image.src"
              [alt]="image.alt || 'Gallery image ' + (i + 1)"
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
export class GalleryLightboxDemo {
  protected readonly Math = Math;

  readonly images: ScLightboxImageData[] = [
    { src: 'https://picsum.photos/800/600?random=20', alt: 'Gallery 1' },
    { src: 'https://picsum.photos/800/600?random=21', alt: 'Gallery 2' },
    { src: 'https://picsum.photos/800/600?random=22', alt: 'Gallery 3' },
    { src: 'https://picsum.photos/800/600?random=23', alt: 'Gallery 4' },
    { src: 'https://picsum.photos/800/600?random=24', alt: 'Gallery 5' },
    { src: 'https://picsum.photos/800/600?random=25', alt: 'Gallery 6' },
    { src: 'https://picsum.photos/800/600?random=26', alt: 'Gallery 7' },
    { src: 'https://picsum.photos/800/600?random=27', alt: 'Gallery 8' },
  ];
}
