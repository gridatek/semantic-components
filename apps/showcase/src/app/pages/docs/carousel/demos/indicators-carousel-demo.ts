import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarousel,
  ScCarouselIndicator,
  ScCarouselIndicators,
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

/** Indicators: a tablist, a tab per position (positions(), from exportAs). A click goes there; ← → among them move it, Home and End to the ends; one tab stop. */
@Component({
  selector: 'app-indicators-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselIndicator,
    ScCarouselIndicators,
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
      #carousel="scCarousel"
      aria-roledescription="carousel"
      aria-label="Numbers, with indicators"
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
      <div scCarouselIndicators aria-label="Choose a slide" class="pt-2">
        @for (i of carousel.positions(); track i) {
          <button scCarouselIndicator [index]="i">
            <span class="sr-only">Slide {{ i + 1 }}</span>
          </button>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IndicatorsCarouselDemo {
  private readonly slides = [1, 2, 3, 4, 5];
}
