import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DotsCarouselDemo } from './dots-carousel-demo';

@Component({
  selector: 'app-dots-carousel-demo-container',
  imports: [DemoContainer, DotsCarouselDemo],
  template: `
    <app-demo-container
      title="Dots"
      demoUrl="/demos/carousel/dots-carousel-demo"
      [code]="code"
    >
      <app-dots-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DotsCarouselDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarousel,
  ScCarouselDot,
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

/** A dot per position (positions(), from exportAs): a click goes there, the current one is marked. */
@Component({
  selector: 'app-dots-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselDot,
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
      #carousel="scCarousel"
      aria-roledescription="carousel"
      aria-label="Numbers, with dots"
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
      <div
        role="group"
        aria-label="Choose a slide"
        class="flex justify-center pt-2"
      >
        @for (i of carousel.positions(); track i) {
          <button scCarouselDot [index]="i">
            <span class="sr-only">Slide {{ i + 1 }}</span>
          </button>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DotsCarouselDemo {
  private readonly slides = [1, 2, 3, 4, 5];
}`;
}
