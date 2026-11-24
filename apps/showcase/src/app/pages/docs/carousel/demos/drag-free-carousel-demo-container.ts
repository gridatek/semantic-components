import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DragFreeCarouselDemo } from './drag-free-carousel-demo';

@Component({
  selector: 'app-drag-free-carousel-demo-container',
  imports: [DemoContainer, DragFreeCarouselDemo],
  template: `
    <app-demo-container
      title="Drag free"
      [code]="code"
      demoUrl="/demos/carousel/drag-free-carousel-demo"
    >
      <app-drag-free-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DragFreeCarouselDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarousel,
  ScCarouselItem,
  ScCarouselNext,
  ScCarouselPrevious,
  ScCarouselTrack,
  ScCarouselViewport,
} from '@semantic-components/ui/carousel';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Drag free (Embla’s dragFree): a swipe coasts to wherever it stops, no snapping; the nearest position becomes the current one. */
@Component({
  selector: 'app-drag-free-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselItem,
    ScCarouselNext,
    ScCarouselPrevious,
    ScCarouselTrack,
    ScCarouselViewport,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCarousel
      [options]="{ align: 'start', dragFree: true }"
      aria-roledescription="carousel"
      aria-label="Numbers, drag free"
      class="w-full max-w-[12rem] sm:max-w-sm"
    >
      <div scCarouselViewport>
        <div scCarouselTrack>
          @for (n of slides; track n) {
            <div
              scCarouselItem
              #slide="scCarouselItem"
              class="basis-1/2 sm:basis-1/3"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardBody
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <span class="text-2xl font-semibold">{{ n }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <button scCarouselPrevious>
        <svg siChevronLeftIcon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button scCarouselNext>
        <svg siChevronRightIcon></svg>
        <span class="sr-only">Next slide</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DragFreeCarouselDemo {
  private readonly slides = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}`;
}
