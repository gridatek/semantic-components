import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { CarouselUsageDemo } from './carousel-usage-demo';

@Component({
  selector: 'app-carousel-usage-demo-container',
  imports: [UsageCode, CarouselUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-carousel-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CarouselUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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

/** shadcn's demo: five cards, a slide each; the arrows (or ← →) move between them. */
@Component({
  selector: 'app-carousel-usage-demo',
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
      aria-roledescription="carousel"
      aria-label="Numbers"
      class="w-full max-w-[12rem] sm:max-w-xs"
    >
      <div scCarouselViewport>
        <div scCarouselTrack>
          @for (n of slides; track n) {
            <div
              scCarouselItem
              #slide="scCarouselItem"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardBody
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <span class="text-4xl font-semibold">{{ n }}</span>
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
export class CarouselUsageDemo {
  readonly slides = [1, 2, 3, 4, 5];
}`;
}
