import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesCarouselDemo } from './sizes-carousel-demo';

@Component({
  selector: 'app-sizes-carousel-demo-container',
  imports: [DemoContainer, SizesCarouselDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/carousel/sizes-carousel-demo"
      [code]="code"
    >
      <app-sizes-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesCarouselDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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

/** Several slides in view: a basis on each item (half, a third from lg), aligned to the start. */
@Component({
  selector: 'app-sizes-carousel-demo',
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
  template: \`
    <div
      scCarousel
      aria-roledescription="carousel"
      aria-label="Sizes"
      class="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
      [options]="{ align: 'start' }"
    >
      <div scCarouselViewport>
        <div scCarouselTrack>
          @for (n of slides; track n) {
            <div
              scCarouselItem
              #slide="scCarouselItem"
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
      <button scCarouselPrevious>
        <svg siChevronLeftIcon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button scCarouselNext>
        <svg siChevronRightIcon></svg>
        <span class="sr-only">Next slide</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesCarouselDemo {
  readonly slides = [1, 2, 3, 4, 5];
}`;
}
