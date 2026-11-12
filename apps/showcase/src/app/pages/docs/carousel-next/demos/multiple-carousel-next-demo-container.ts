import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleCarouselNextDemo } from './multiple-carousel-next-demo';

@Component({
  selector: 'app-multiple-carousel-next-demo-container',
  imports: [DemoContainer, MultipleCarouselNextDemo],
  template: `
    <app-demo-container
      title="Multiple"
      demoUrl="/demos/carousel-next/multiple-carousel-next-demo"
      [code]="code"
    >
      <app-multiple-carousel-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleCarouselNextDemoContainer {
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

/** More slides in view as the screen grows; the buttons hidden on phones (swipe there). */
@Component({
  selector: 'app-multiple-carousel-next-demo',
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
      aria-label="Several in view"
      class="mx-auto max-w-xs sm:max-w-sm"
      [options]="{ align: 'start' }"
    >
      <div scCarouselNextViewport>
        <div scCarouselNextTrack>
          @for (n of slides; track n) {
            <div
              scCarouselNextItem
              #slide="scCarouselNextItem"
              class="sm:basis-1/2 lg:basis-1/3"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardContent
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <span class="text-3xl font-semibold">{{ n }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <button scCarouselNextPrevious class="hidden sm:inline-flex">
        <svg siChevronLeftIcon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button scCarouselNextNext class="hidden sm:inline-flex">
        <svg siChevronRightIcon></svg>
        <span class="sr-only">Next slide</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleCarouselNextDemo {
  readonly slides = [1, 2, 3, 4, 5];
}`;
}
