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

/** Vertical: the slides in a column, the buttons above and below; ↑ and ↓ move. */
@Component({
  selector: 'app-orientation-carousel-new-demo',
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
      aria-label="Vertical"
      class="my-14 w-full max-w-xs"
      orientation="vertical"
    >
      <div scCarouselNewViewport>
        <div scCarouselNewTrack class="-mt-1 h-[270px]">
          @for (n of slides; track n) {
            <div
              scCarouselNewItem
              #slide="scCarouselNewItem"
              class="basis-1/2 pt-1"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardBody
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
export class OrientationCarouselNewDemo {
  private readonly slides = [1, 2, 3, 4, 5];
}
