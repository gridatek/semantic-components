import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarousel,
  ScCarouselItem,
  ScCarouselTrack,
  ScCarouselViewport,
} from '@semantic-components/ui/carousel';

/** Controlled from outside: [(activeIndex)] both ways, plain buttons calling scrollPrev() and scrollNext() from exportAs; drag off (Embla’s watchDrag), so only they and the keys move it. */
@Component({
  selector: 'app-controlled-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselItem,
    ScCarouselTrack,
    ScCarouselViewport,
    ScButton,
    ScCard,
    ScCardBody,
  ],
  template: `
    <div
      class="flex w-full max-w-[12rem] flex-col items-center gap-3 sm:max-w-xs"
    >
      <div
        scCarousel
        #carousel="scCarousel"
        [(activeIndex)]="current"
        [options]="{ watchDrag: false }"
        aria-roledescription="carousel"
        aria-label="Numbers, controlled"
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
      </div>
      <p class="text-muted-foreground text-sm" data-testid="position">
        Slide {{ current() + 1 }} of {{ slides.length }}
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="!carousel.canScrollPrev()"
          (click)="carousel.scrollPrev()"
        >
          Previous
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="!carousel.canScrollNext()"
          (click)="carousel.scrollNext()"
        >
          Next
        </button>
        <button scButton variant="secondary" size="sm" (click)="current.set(4)">
          Show the last slide
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledCarouselDemo {
  private readonly slides = [1, 2, 3, 4, 5];
  private readonly current = signal(0);
}
