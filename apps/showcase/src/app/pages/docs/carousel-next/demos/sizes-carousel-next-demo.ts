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

/** Several slides in view: a basis on each item (half, a third from lg), aligned to the start. */
@Component({
  selector: 'app-sizes-carousel-next-demo',
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
      aria-label="Sizes"
      class="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
      [options]="{ align: 'start' }"
    >
      <div scCarouselNextViewport>
        <div scCarouselNextTrack>
          @for (n of slides; track n) {
            <div
              scCarouselNextItem
              #slide="scCarouselNextItem"
              class="basis-1/2 lg:basis-1/3"
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
export class SizesCarouselNextDemo {
  readonly slides = [1, 2, 3, 4, 5];
}
