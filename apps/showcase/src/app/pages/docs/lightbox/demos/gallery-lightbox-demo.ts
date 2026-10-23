import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLightbox,
  ScLightboxClose,
  ScLightboxDialog,
  ScLightboxImage,
  ScLightboxNext,
  ScLightboxPrevious,
  ScLightboxThumbnail,
  ScLightboxTrigger,
  ScLightboxZoomIn,
  ScLightboxZoomOut,
  ScLightboxZoomReset,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiScanIcon,
  SiXIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

interface Photo {
  readonly name: string;
  readonly alt: string;
  readonly author: string;
}

/** A grid of links to the full photos — links still, without the lightbox. Opened, the thumbnail grows into the photo; ← → or a swipe to change, + − 0 to zoom, Escape or a swipe down to close. */
@Component({
  selector: 'app-gallery-lightbox-demo',
  imports: [
    ScLightbox,
    ScLightboxTrigger,
    ScLightboxDialog,
    ScLightboxImage,
    ScLightboxClose,
    ScLightboxPrevious,
    ScLightboxNext,
    ScLightboxZoomIn,
    ScLightboxZoomOut,
    ScLightboxZoomReset,
    ScLightboxThumbnail,
    SiZoomInIcon,
    SiZoomOutIcon,
    SiScanIcon,
    SiXIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div scLightbox #lightbox="scLightbox" class="w-full">
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        @for (photo of photos; track photo.name) {
          <a
            scLightboxTrigger
            [href]="'/images/gallery/' + photo.name + '.jpg'"
          >
            <img
              [src]="'/images/gallery/' + photo.name + '-thumb.jpg'"
              [alt]="photo.alt"
              width="400"
              height="267"
              class="aspect-[3/2] w-full object-cover"
            />
          </a>
        }
      </div>
      <dialog scLightboxDialog aria-label="Photo viewer">
        <div class="flex items-center gap-1 p-2">
          <p class="ms-2 text-sm tabular-nums" aria-live="polite">
            {{ lightbox.index() + 1 }} of {{ lightbox.items().length }}
          </p>
          <div class="ms-auto flex gap-1">
            <button scLightboxZoomOut>
              <svg siZoomOutIcon></svg>
              <span class="sr-only">Zoom out</span>
            </button>
            <button scLightboxZoomReset>
              <svg siScanIcon></svg>
              <span class="sr-only">Fit</span>
            </button>
            <button scLightboxZoomIn>
              <svg siZoomInIcon></svg>
              <span class="sr-only">Zoom in</span>
            </button>
            <button scLightboxClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </div>
        <div
          class="relative grid min-h-0 flex-1 place-items-center overflow-hidden px-14"
        >
          <img scLightboxImage [alt]="lightbox.current()?.alt ?? ''" />
          <button
            scLightboxPrevious
            class="absolute start-2 top-1/2 -translate-y-1/2"
          >
            <svg siChevronLeftIcon></svg>
            <span class="sr-only">Previous image</span>
          </button>
          <button
            scLightboxNext
            class="absolute end-2 top-1/2 -translate-y-1/2"
          >
            <svg siChevronRightIcon></svg>
            <span class="sr-only">Next image</span>
          </button>
        </div>
        @if (lightbox.current(); as current) {
          <p class="p-3 text-center text-sm">
            {{ current.alt }}
            <span class="text-white/60"
              >— {{ photos[lightbox.index()].author }}</span
            >
          </p>
        }
        <div class="flex justify-center gap-2 overflow-x-auto p-3">
          @for (item of lightbox.items(); track item.src; let i = $index) {
            <button [scLightboxThumbnail]="i">
              <img [src]="item.thumbnail" [alt]="item.alt" />
            </button>
          }
        </div>
      </dialog>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GalleryLightboxDemo {
  readonly photos: readonly Photo[] = [
    {
      name: 'forest',
      alt: 'A pine forest above the sea',
      author: 'Paul Jarvis',
    },
    {
      name: 'waterfall',
      alt: 'A waterfall in a rocky gorge',
      author: 'Paul Jarvis',
    },
    {
      name: 'gorge',
      alt: 'A river through a green forest',
      author: 'Jerry Adney',
    },
    {
      name: 'mountains',
      alt: 'Snowy mountains under clouds',
      author: 'Go Wild',
    },
    {
      name: 'coast',
      alt: 'Wild roses above a misty sea',
      author: 'Austin Neill',
    },
    {
      name: 'cafe',
      alt: 'A wooden table in a quiet café',
      author: 'Luke Chesser',
    },
    {
      name: 'summit',
      alt: 'A wooded summit under white clouds',
      author: 'Nicholas Swanson',
    },
    {
      name: 'shed',
      alt: 'A green bicycle against a wooden shed',
      author: 'Alexander Shustov',
    },
  ];
}
