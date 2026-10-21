import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLightbox,
  ScLightboxClose,
  ScLightboxDialog,
  ScLightboxImage,
  ScLightboxNext,
  ScLightboxPrevious,
  ScLightboxTrigger,
  ScLightboxZoomIn,
  ScLightboxZoomOut,
  ScLightboxZoomReset,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiScanIcon,
  SiXIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

/** One photo: the wheel, a double-click or a pinch zooms where you point; drag to pan. */
@Component({
  selector: 'app-zoom-lightbox-demo',
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
    SiZoomInIcon,
    SiZoomOutIcon,
    SiScanIcon,
    SiXIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div scLightbox #lightbox="scLightbox" class="w-full max-w-md">
      <a scLightboxTrigger href="/images/gallery/mountains.jpg">
        <img
          src="/images/gallery/mountains-thumb.jpg"
          alt="Snowy mountains under clouds"
          width="400"
          height="267"
          class="aspect-[3/2] w-full object-cover"
        />
      </a>
      <dialog scLightboxDialog aria-label="Mountains">
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
          <img scLightboxImage alt="Snowy mountains under clouds" />
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
      </dialog>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ZoomLightboxDemo {}
