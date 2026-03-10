import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  LightboxImage,
  ScLightbox,
  ScLightboxContainer,
  ScLightboxImage,
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
  selector: 'app-basic-lightbox-demo',
  imports: [
    ScLightbox,
    ScLightboxContainer,
    ScLightboxImage,
    ScLightboxThumbnail,
    ScLightboxTrigger,
    SiXIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
    SiMinimize2Icon,
  ],
  template: `
    <div class="space-y-2">
      <div scLightbox [images]="images" #lightbox="scLightbox">
        <div class="flex gap-4">
          @for (image of images; track image.src; let i = $index) {
            <button
              scLightboxTrigger
              [index]="i"
              class="focus:ring-ring h-32 w-32 overflow-hidden rounded-lg focus:ring-2 focus:outline-none"
            >
              <img
                [src]="image.thumbnail || image.src"
                [alt]="image.alt"
                class="size-full object-cover"
              />
            </button>
          }
        </div>

        @if (lightbox.isOpen()) {
          <div scLightboxContainer>
            <button
              type="button"
              class="absolute top-4 right-4 z-10 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              (click)="lightbox.close()"
              aria-label="Close lightbox"
            >
              <svg siXIcon class="size-6"></svg>
            </button>

            @if (lightbox.images().length > 1) {
              <button
                type="button"
                class="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                (click)="lightbox.previous()"
                [disabled]="!lightbox.loop() && lightbox.currentIndex() === 0"
                aria-label="Previous image"
              >
                <svg siChevronLeftIcon class="size-8"></svg>
              </button>
            }

            <div
              class="relative flex flex-1 items-center justify-center overflow-hidden"
            >
              <img scLightboxImage />
            </div>

            @if (lightbox.images().length > 1) {
              <button
                type="button"
                class="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                (click)="lightbox.next()"
                [disabled]="
                  !lightbox.loop() &&
                  lightbox.currentIndex() === lightbox.images().length - 1
                "
                aria-label="Next image"
              >
                <svg siChevronRightIcon class="size-8"></svg>
              </button>
            }

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
        }
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

  readonly images: LightboxImage[] = [
    { src: 'https://picsum.photos/800/600?random=1', alt: 'Random image 1' },
    { src: 'https://picsum.photos/800/600?random=2', alt: 'Random image 2' },
    { src: 'https://picsum.photos/800/600?random=3', alt: 'Random image 3' },
    { src: 'https://picsum.photos/800/600?random=4', alt: 'Random image 4' },
  ];
}
