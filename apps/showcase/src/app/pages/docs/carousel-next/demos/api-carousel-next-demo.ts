import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** The slide shown, both ways ([(activeIndex)]), and how many positions (count(), from exportAs). */
@Component({
  selector: 'app-api-carousel-next-demo',
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
    <div class="w-full max-w-[12rem] sm:max-w-xs">
      <div
        scCarouselNext
        #carousel="scCarouselNext"
        [(activeIndex)]="current"
        aria-roledescription="carousel"
        aria-label="Numbers with their position"
        class="w-full"
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
      <p class="text-muted-foreground py-2 text-center text-sm">
        Slide {{ current() + 1 }} of {{ carousel.count() }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ApiCarouselNextDemo {
  readonly slides = [1, 2, 3, 4, 5];
  readonly current = signal(0);
}
