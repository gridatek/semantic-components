import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesCarouselNewDemo } from './sizes-carousel-new-demo';

@Component({
  selector: 'app-sizes-carousel-new-demo-container',
  imports: [DemoContainer, SizesCarouselNewDemo],
  template: `
    <app-demo-container
      title="Sizes"
      [code]="code"
      demoUrl="/demos/carousel-new/sizes-carousel-new-demo"
    >
      <app-sizes-carousel-new-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesCarouselNewDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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

/** Several slides in view: a basis on each item (half, a third from lg), aligned to the start. */
@Component({
  selector: 'app-sizes-carousel-new-demo',
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
  template: \`
    <div
      scCarouselNew
      aria-roledescription="carousel"
      aria-label="Sizes"
      class="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
    >
      <div scCarouselNewViewport>
        <div scCarouselNewTrack>
          @for (n of slides; track n) {
            <div
              scCarouselNewItem
              #slide="scCarouselNewItem"
              class="basis-1/2 lg:basis-1/3"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardBody
                    class="flex aspect-square items-center justify-center p-6"
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesCarouselNewDemo {
  private readonly slides = [1, 2, 3, 4, 5];
}`;
}
