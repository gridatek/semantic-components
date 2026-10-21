import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ZoomLightboxNextDemo } from './zoom-lightbox-next-demo';

@Component({
  selector: 'app-zoom-lightbox-next-demo-container',
  imports: [DemoContainer, ZoomLightboxNextDemo],
  template: `
    <app-demo-container
      title="Zoom"
      [code]="code"
      demoUrl="/demos/lightbox-next/zoom-lightbox-next-demo"
    >
      <app-zoom-lightbox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ZoomLightboxNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLightboxNext,
  ScLightboxNextClose,
  ScLightboxNextDialog,
  ScLightboxNextImage,
  ScLightboxNextNext,
  ScLightboxNextPrevious,
  ScLightboxNextTrigger,
  ScLightboxNextZoomIn,
  ScLightboxNextZoomOut,
  ScLightboxNextZoomReset,
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
  selector: 'app-zoom-lightbox-next-demo',
  imports: [
    ScLightboxNext,
    ScLightboxNextTrigger,
    ScLightboxNextDialog,
    ScLightboxNextImage,
    ScLightboxNextClose,
    ScLightboxNextPrevious,
    ScLightboxNextNext,
    ScLightboxNextZoomIn,
    ScLightboxNextZoomOut,
    ScLightboxNextZoomReset,
    SiZoomInIcon,
    SiZoomOutIcon,
    SiScanIcon,
    SiXIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scLightboxNext #lightbox="scLightboxNext" class="w-full max-w-md">
      <a scLightboxNextTrigger href="/images/gallery/mountains.jpg">
        <img
          src="/images/gallery/mountains-thumb.jpg"
          alt="Snowy mountains under clouds"
          width="400"
          height="267"
          class="aspect-[3/2] w-full object-cover"
        />
      </a>
      <dialog scLightboxNextDialog aria-label="Mountains">
        <div class="flex items-center gap-1 p-2">
          <p class="ms-2 text-sm tabular-nums" aria-live="polite">
            {{ lightbox.index() + 1 }} of {{ lightbox.items().length }}
          </p>
          <div class="ms-auto flex gap-1">
            <button scLightboxNextZoomOut>
              <svg siZoomOutIcon></svg>
              <span class="sr-only">Zoom out</span>
            </button>
            <button scLightboxNextZoomReset>
              <svg siScanIcon></svg>
              <span class="sr-only">Fit</span>
            </button>
            <button scLightboxNextZoomIn>
              <svg siZoomInIcon></svg>
              <span class="sr-only">Zoom in</span>
            </button>
            <button scLightboxNextClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </div>
        <div
          class="relative grid min-h-0 flex-1 place-items-center overflow-hidden px-14"
        >
          <img scLightboxNextImage alt="Snowy mountains under clouds" />
          <button
            scLightboxNextPrevious
            class="absolute start-2 top-1/2 -translate-y-1/2"
          >
            <svg siChevronLeftIcon></svg>
            <span class="sr-only">Previous image</span>
          </button>
          <button
            scLightboxNextNext
            class="absolute end-2 top-1/2 -translate-y-1/2"
          >
            <svg siChevronRightIcon></svg>
            <span class="sr-only">Next image</span>
          </button>
        </div>
      </dialog>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ZoomLightboxNextDemo {}`;
}
