import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarouselNew,
  ScCarouselNewItem,
  ScCarouselNewTrack,
  ScCarouselNewViewport,
} from '@semantic-components/ui/carousel';

/** Controlled from outside: [(page)] both ways, plain buttons calling previous() and next() from exportAs; drag off, so only they and the keys move it. */
@Component({
  selector: 'app-controlled-carousel-new-demo',
  imports: [
    ScCarouselNew,
    ScCarouselNewItem,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
    ScButton,
    ScCard,
    ScCardBody,
  ],
  template: `
    <div
      class="flex w-full max-w-[12rem] flex-col items-center gap-3 sm:max-w-xs"
    >
      <div
        scCarouselNew
        #carousel="scCarouselNew"
        [(page)]="page"
        [drag]="false"
        aria-roledescription="carousel"
        aria-label="Numbers, controlled"
        class="w-full"
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
      </div>
      <p class="text-muted-foreground text-sm" data-testid="position">
        Slide {{ page() + 1 }} of {{ carousel.pageCount() || slides.length }}
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          [attr.aria-disabled]="!carousel.canPrevious() || null"
          (click)="carousel.previous()"
        >
          Previous
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [attr.aria-disabled]="!carousel.canNext() || null"
          (click)="carousel.next()"
        >
          Next
        </button>
        <button scButton variant="secondary" size="sm" (click)="page.set(4)">
          Show the last slide
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledCarouselNewDemo {
  private readonly slides = [1, 2, 3, 4, 5];
  private readonly page = signal(0);
}
