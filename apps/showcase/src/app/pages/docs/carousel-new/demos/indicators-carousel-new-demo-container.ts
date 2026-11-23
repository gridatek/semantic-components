import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IndicatorsCarouselNewDemo } from './indicators-carousel-new-demo';

@Component({
  selector: 'app-indicators-carousel-new-demo-container',
  imports: [DemoContainer, IndicatorsCarouselNewDemo],
  template: `
    <app-demo-container
      title="Indicators"
      [code]="code"
      demoUrl="/demos/carousel-new/indicators-carousel-new-demo"
    >
      <app-indicators-carousel-new-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IndicatorsCarouselNewDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarouselNew,
  ScCarouselNewIndicator,
  ScCarouselNewIndicators,
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

/** Indicators: a tablist, a tab per page (pages(), from exportAs). A click or the arrows within show its page; one tab stop. */
@Component({
  selector: 'app-indicators-carousel-new-demo',
  imports: [
    ScCarouselNew,
    ScCarouselNewItem,
    ScCarouselNewNext,
    ScCarouselNewPrevious,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
    ScCarouselNewIndicator,
    ScCarouselNewIndicators,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCarouselNew
      #carousel="scCarouselNew"
      aria-roledescription="carousel"
      aria-label="Numbers, with indicators"
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
      <div scCarouselNewIndicators aria-label="Choose a slide" class="pt-2">
        @for (page of carousel.pages(); track page) {
          <button scCarouselNewIndicator [page]="page">
            <span class="sr-only">Slide {{ page + 1 }}</span>
          </button>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IndicatorsCarouselNewDemo {
  private readonly slides = [1, 2, 3, 4, 5];
}`;
}
