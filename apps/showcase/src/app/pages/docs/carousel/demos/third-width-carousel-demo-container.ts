import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ThirdWidthCarouselDemo } from './third-width-carousel-demo';

@Component({
  selector: 'app-third-width-carousel-demo-container',
  imports: [DemoContainer, ThirdWidthCarouselDemo],
  template: `
    <app-demo-container
      title="Partial Items (33% width)"
      demoUrl="/demos/carousel/third-width-carousel-demo"
      [code]="code"
    >
      <app-third-width-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdWidthCarouselDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCarousel,
  ScCarouselItem,
  ScCarouselNext,
  ScCarouselPrevious,
  ScCarouselTrack,
  ScCarouselViewport,
} from '@semantic-components/carousel';
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-third-width-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselViewport,
    ScCarouselTrack,
    ScCarouselItem,
    ScCarouselPrevious,
    ScCarouselNext,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="mx-auto w-full max-w-[12rem] sm:max-w-sm">
      <div scCarousel aria-label="Third width carousel" class="w-full">
        <div scCarouselViewport>
          <div scCarouselTrack>
            @for (index of items; track index) {
              <div scCarouselItem class="md:basis-1/2 lg:basis-1/3">
                <div class="p-1">
                  <div scCard>
                    <div scCardBody class="flex aspect-square items-center justify-center p-6">
                      <span class="text-2xl font-semibold">{{ index }}</span>
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
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdWidthCarouselDemo {
  readonly items = [1, 2, 3, 4, 5];
}`;
}
