import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PagesCarouselNewDemo } from './pages-carousel-new-demo';

@Component({
  selector: 'app-pages-carousel-new-demo-container',
  imports: [DemoContainer, PagesCarouselNewDemo],
  template: `
    <app-demo-container
      title="Pages"
      [code]="code"
      demoUrl="/demos/carousel-new/pages-carousel-new-demo"
    >
      <app-pages-carousel-new-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PagesCarouselNewDemoContainer {
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

/** Three slides a page (slidesPerPage): Previous, Next and the indicators move a page at a time; the last slides that can’t start a page join the last. */
@Component({
  selector: 'app-pages-carousel-new-demo',
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
      [slidesPerPage]="3"
      aria-roledescription="carousel"
      aria-label="Numbers, three a page"
      class="w-full max-w-[12rem] sm:max-w-sm"
    >
      <div scCarouselNewViewport>
        <div scCarouselNewTrack>
          @for (n of slides; track n) {
            <div
              scCarouselNewItem
              #slide="scCarouselNewItem"
              class="basis-1/3"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardBody
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <span class="text-2xl font-semibold">{{ n }}</span>
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
      <div scCarouselNewIndicators aria-label="Choose a page" class="pt-2">
        @for (page of carousel.pages(); track page) {
          <button scCarouselNewIndicator [page]="page">
            <span class="sr-only">Page {{ page + 1 }}</span>
          </button>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PagesCarouselNewDemo {
  private readonly slides = [1, 2, 3, 4, 5, 6, 7, 8];
}`;
}
