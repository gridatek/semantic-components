import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GalleryLightboxDemo } from './gallery-lightbox-demo';

@Component({
  selector: 'app-gallery-lightbox-demo-container',
  imports: [DemoContainer, GalleryLightboxDemo],
  template: `
    <app-demo-container title="Gallery Component" [code]="code">
      <app-gallery-lightbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLightboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  LightboxImage,
  ScLightbox,
  ScLightboxContainer,
  ScLightboxGallery,
  ScLightboxGalleryItem,
  ScLightboxImage,
  ScLightboxThumbnail,
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
    ScLightbox,
    ScLightboxContainer,
    ScLightboxGallery,
    ScLightboxGalleryItem,
    ScLightboxImage,
    ScLightboxThumbnail,
    SiXIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
    SiMinimize2Icon,
  ],
  template: \`
    <div scLightbox [images]="images" #lightbox="scLightbox" class="max-w-xl">
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
              class="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              (click)="lightbox.previous()"
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
              class="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              (click)="lightbox.next()"
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
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLightboxDemo {
  protected readonly Math = Math;

  readonly images: LightboxImage[] = [
    { src: 'https://picsum.photos/800/600?random=20', alt: 'Gallery 1' },
    { src: 'https://picsum.photos/800/600?random=21', alt: 'Gallery 2' },
    { src: 'https://picsum.photos/800/600?random=22', alt: 'Gallery 3' },
    { src: 'https://picsum.photos/800/600?random=23', alt: 'Gallery 4' },
    { src: 'https://picsum.photos/800/600?random=24', alt: 'Gallery 5' },
    { src: 'https://picsum.photos/800/600?random=25', alt: 'Gallery 6' },
    { src: 'https://picsum.photos/800/600?random=26', alt: 'Gallery 7' },
    { src: 'https://picsum.photos/800/600?random=27', alt: 'Gallery 8' },
  ];
}`;
}
