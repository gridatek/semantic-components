import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SpacingCarouselNextDemo } from './spacing-carousel-next-demo';

@Component({
  selector: 'app-spacing-carousel-next-demo-container',
  imports: [DemoContainer, SpacingCarouselNextDemo],
  template: `
    <app-demo-container
      title="Spacing"
      demoUrl="/demos/carousel-next/spacing-carousel-next-demo"
      [code]="code"
    >
      <app-spacing-carousel-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SpacingCarouselNextDemoContainer {
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

/** The gap between slides: the item's start padding, the track's negative margin to match. */
@Component({
  selector: 'app-spacing-carousel-next-demo',
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
      aria-label="Spacing"
      class="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
    >
      <div scCarouselNextViewport>
        <div scCarouselNextTrack class="-ms-1">
          @for (n of slides; track n) {
            <div
              scCarouselNextItem
              #slide="scCarouselNextItem"
              class="basis-1/2 ps-1 lg:basis-1/3"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardContent
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
export class SpacingCarouselNextDemo {
  readonly slides = [1, 2, 3, 4, 5];
}`;
}
