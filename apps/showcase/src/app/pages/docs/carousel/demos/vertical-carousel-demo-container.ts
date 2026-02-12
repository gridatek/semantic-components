import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalCarouselDemo } from './vertical-carousel-demo';

@Component({
  selector: 'app-vertical-carousel-demo-container',
  imports: [DemoContainer, VerticalCarouselDemo],
  template: `
    <app-demo-container
      title="Vertical"
      demoUrl="/demos/carousel/vertical-carousel-demo"
      [code]="code"
    >
      <app-vertical-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalCarouselDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCarousel,
  ScCarouselViewport,
  ScCarouselTrack,
  ScCarouselItem,
  ScCarouselNext,
  ScCarouselPrevious,
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-vertical-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselViewport,
    ScCarouselTrack,
    ScCarouselItem,
    ScCarouselPrevious,
    ScCarouselNext,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="mx-auto flex h-[350px] w-full max-w-xs items-center">
      <div
        sc-carousel
        orientation="vertical"
        [options]="{ align: 'start' }"
        class="w-full"
      >
        <div sc-carousel-viewport>
          <div sc-carousel-track class="-mt-1 h-[270px]">
            @for (index of items; track index) {
              <div sc-carousel-item class="basis-1/2 pt-1">
                <div class="p-1">
                  <div
                    class="flex items-center justify-center rounded-lg border bg-card p-6"
                  >
                    <span class="text-3xl font-semibold">{{ index }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <button sc-carousel-previous>
          <svg si-chevron-left-icon></svg>
          <span class="sr-only">Previous slide</span>
        </button>
        <button sc-carousel-next>
          <svg si-chevron-right-icon></svg>
          <span class="sr-only">Next slide</span>
        </button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalCarouselDemo {
  readonly items = [1, 2, 3, 4, 5];
}`;
}
