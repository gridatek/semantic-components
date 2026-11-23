import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarouselNew,
  ScCarouselNewItem,
  ScCarouselNewNext,
  ScCarouselNewPrevious,
  ScCarouselNewTrack,
  ScCarouselNewViewport,
} from '@semantic-components/ui/carousel';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** shadcn's demo: five cards, a slide each; the arrows (or ← →) move between them. */
@Component({
  selector: 'app-carousel-new-usage-demo',
  imports: [
    ScCarouselNew,
    ScCarouselNewItem,
    ScCarouselNewNext,
    ScCarouselNewPrevious,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scCarouselNew
      aria-roledescription="carousel"
      aria-label="Numbers"
      class="w-full max-w-[12rem] sm:max-w-xs"
    >
      <div scCarouselNewViewport>
        <div scCarouselNewTrack>
          @for (n of slides; track n) {
            <div
              scCarouselNewItem
              #slide="scCarouselNewItem"
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
      <button scCarouselNewPrevious>
        <svg siChevronLeftIcon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button scCarouselNewNext>
        <svg siChevronRightIcon></svg>
        <span class="sr-only">Next slide</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CarouselNewUsageDemo {
  private readonly slides = [1, 2, 3, 4, 5];
}
