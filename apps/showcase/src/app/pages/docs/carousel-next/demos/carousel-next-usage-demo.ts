import { Component, ViewEncapsulation } from '@angular/core';
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

/** shadcn's demo: five cards, a slide each; the arrows (or ← →) move between them. */
@Component({
  selector: 'app-carousel-next-usage-demo',
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
  template: `
    <div
      scCarouselNext
      aria-roledescription="carousel"
      aria-label="Numbers"
      class="w-full max-w-[12rem] sm:max-w-xs"
    >
      <div scCarouselNextViewport>
        <div scCarouselNextTrack>
          @for (n of slides; track n) {
            <div
              scCarouselNextItem
              #slide="scCarouselNextItem"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardContent
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
      <button scCarouselNextPrevious>
        <svg siChevronLeftIcon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button scCarouselNextNext>
        <svg siChevronRightIcon></svg>
        <span class="sr-only">Next slide</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CarouselNextUsageDemo {
  readonly slides = [1, 2, 3, 4, 5];
}
