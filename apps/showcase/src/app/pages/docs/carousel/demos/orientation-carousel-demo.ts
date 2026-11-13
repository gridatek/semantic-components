import { Component, ViewEncapsulation } from '@angular/core';
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

/** Vertical: the slides in a column, the buttons above and below; ↑ and ↓ move. */
@Component({
  selector: 'app-orientation-carousel-demo',
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
  template: `
    <div
      scCarousel
      aria-roledescription="carousel"
      aria-label="Vertical"
      class="my-14 w-full max-w-xs"
      orientation="vertical"
      [options]="{ align: 'start' }"
    >
      <div scCarouselViewport>
        <div scCarouselTrack class="-mt-1 h-[270px]">
          @for (n of slides; track n) {
            <div
              scCarouselItem
              #slide="scCarouselItem"
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
      <button scCarouselPrevious>
        <svg siChevronLeftIcon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button scCarouselNext>
        <svg siChevronRightIcon></svg>
        <span class="sr-only">Next slide</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OrientationCarouselDemo {
  readonly slides = [1, 2, 3, 4, 5];
}
