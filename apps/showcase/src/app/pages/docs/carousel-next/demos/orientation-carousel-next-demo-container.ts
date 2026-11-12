import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OrientationCarouselNextDemo } from './orientation-carousel-next-demo';

@Component({
  selector: 'app-orientation-carousel-next-demo-container',
  imports: [DemoContainer, OrientationCarouselNextDemo],
  template: `
    <app-demo-container
      title="Orientation"
      demoUrl="/demos/carousel-next/orientation-carousel-next-demo"
      [code]="code"
    >
      <app-orientation-carousel-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OrientationCarouselNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardContent } from '@semantic-components/ui';
import {
  ScCarouselNext,
  ScCarouselNextItem,
  ScCarouselNextNext,
  ScCarouselNextPrevious,
  ScCarouselNextTrack,
  ScCarouselNextViewport,
} from '@semantic-components/ui/carousel';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Vertical: the slides in a column, the buttons above and below; ↑ and ↓ move. */
@Component({
  selector: 'app-orientation-carousel-next-demo',
  imports: [
    ScCarouselNext,
    ScCarouselNextItem,
    ScCarouselNextNext,
    ScCarouselNextPrevious,
    ScCarouselNextTrack,
    ScCarouselNextViewport,
    ScCard,
    ScCardContent,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCarouselNext
      aria-roledescription="carousel"
      aria-label="Vertical"
      class="my-14 w-full max-w-xs"
      orientation="vertical"
      [options]="{ align: 'start' }"
    >
      <div scCarouselNextViewport>
        <div scCarouselNextTrack class="-mt-1 h-[270px]">
          @for (n of slides; track n) {
            <div
              scCarouselNextItem
              #slide="scCarouselNextItem"
              class="basis-1/2 pt-1"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardContent
                    class="flex aspect-auto items-center justify-center p-6"
                  >
                    <span class="text-3xl font-semibold">{{ n }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <button scCarouselNextPrevious>
        <svg siChevronLeftIcon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button scCarouselNextNext>
        <svg siChevronRightIcon></svg>
        <span class="sr-only">Next slide</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OrientationCarouselNextDemo {
  readonly slides = [1, 2, 3, 4, 5];
}`;
}
