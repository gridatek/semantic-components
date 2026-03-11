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
  LightboxImage,
  ScLightboxContainer,
  ScLightboxPortal,
  ScLightboxProvider,
  ScLightboxThumbnail,
  ScLightboxTrigger,
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
    ScLightboxContainer,
    ScLightboxTrigger,
    ScLightboxPortal,
    ScLightboxThumbnail,
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
          <div scLightboxContainer>
            <button
              type="button"
              class="absolute top-4 right-4 z-10 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              (click)="lightbox.close()"
              aria-label="Close lightbox"
            >
              <svg siXIcon class="size-6"></svg>
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
                <button
                  type="button"
                  class="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  (click)="carousel.scrollPrev()"
                  aria-label="Previous image"
                >
                  <svg siChevronLeftIcon class="size-8"></svg>
                </button>
                <button
                  type="button"
                  class="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  (click)="carousel.scrollNext()"
                  aria-label="Next image"
                >
                  <svg siChevronRightIcon class="size-8"></svg>
                </button>
              }
            </div>

            <div
              class="flex items-center justify-center gap-2 bg-black/50 px-4 py-3"
            >
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

            <div
              class="flex items-center justify-center gap-2 overflow-x-auto bg-black/50 px-4 py-3"
            >
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

  readonly images: LightboxImage[] = [
    { src: 'https://picsum.photos/800/600?random=1', alt: 'Random image 1' },
    { src: 'https://picsum.photos/800/600?random=2', alt: 'Random image 2' },
    { src: 'https://picsum.photos/800/600?random=3', alt: 'Random image 3' },
    { src: 'https://picsum.photos/800/600?random=4', alt: 'Random image 4' },
  ];
}
