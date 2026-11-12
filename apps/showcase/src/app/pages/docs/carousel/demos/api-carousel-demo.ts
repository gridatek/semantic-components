import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCard, ScCardContent } from '@semantic-components/ui';
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

/** The slide shown, both ways ([(activeIndex)]), and how many positions (count(), from exportAs). */
@Component({
  selector: 'app-api-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselItem,
    ScCarouselNext,
    ScCarouselPrevious,
    ScCarouselTrack,
    ScCarouselViewport,
    ScCard,
    ScCardContent,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="w-full max-w-[12rem] sm:max-w-xs">
      <div
        scCarousel
        #carousel="scCarousel"
        [(activeIndex)]="current"
        aria-roledescription="carousel"
        aria-label="Numbers with their position"
        class="w-full"
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
        <button scCarouselPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">Previous slide</span>
        </button>
        <button scCarouselNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">Next slide</span>
        </button>
      </div>
      <p class="text-muted-foreground py-2 text-center text-sm">
        Slide {{ current() + 1 }} of {{ carousel.count() }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ApiCarouselDemo {
  readonly slides = [1, 2, 3, 4, 5];
  readonly current = signal(0);
}
