import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PagesCarouselDemo } from './pages-carousel-demo';

@Component({
  selector: 'app-pages-carousel-demo-container',
  imports: [DemoContainer, PagesCarouselDemo],
  template: `
    <app-demo-container
      title="Pages"
      [code]="code"
      demoUrl="/demos/carousel/pages-carousel-demo"
    >
      <app-pages-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PagesCarouselDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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

/** Three slides a page (Embla’s slidesToScroll): Previous, Next and the indicators move a page at a time; the last slides that can’t start a page join the last. */
@Component({
  selector: 'app-pages-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselItem,
    ScCarouselNext,
    ScCarouselPrevious,
    ScCarouselTrack,
    ScCarouselViewport,
    ScCarouselIndicator,
    ScCarouselIndicators,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCarousel
      #carousel="scCarousel"
      [options]="{ align: 'start', slidesToScroll: 3 }"
      aria-roledescription="carousel"
      aria-label="Numbers, three a page"
      class="w-full max-w-[12rem] sm:max-w-sm"
    >
      <div scCarouselViewport>
        <div scCarouselTrack>
          @for (n of slides; track n) {
            <div
              scCarouselItem
              #slide="scCarouselItem"
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
      <button scCarouselPrevious>
        <svg siChevronLeftIcon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button scCarouselNext>
        <svg siChevronRightIcon></svg>
        <span class="sr-only">Next slide</span>
      </button>
      <div scCarouselIndicators aria-label="Choose a page" class="pt-2">
        @for (i of carousel.positions(); track i) {
          <button scCarouselIndicator [index]="i">
            <span class="sr-only">Page {{ i + 1 }}</span>
          </button>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PagesCarouselDemo {
  private readonly slides = [1, 2, 3, 4, 5, 6, 7, 8];
}`;
}
