import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DefaultCarouselDemo } from './default-carousel-demo';

@Component({
  selector: 'app-default-carousel-demo-container',
  imports: [DemoContainer, DefaultCarouselDemo],
  template: `
    <app-demo-container
      title="Default"
      demoUrl="/demos/carousel/default-carousel-demo"
      [code]="code"
    >
      <app-default-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultCarouselDemoContainer {
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
  selector: 'app-default-carousel-demo',
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
    <div class="mx-auto w-full max-w-xs">
      <div sc-carousel class="w-full">
        <div sc-carousel-viewport>
          <div sc-carousel-track>
            @for (index of items; track index) {
              <div sc-carousel-item>
                <div class="p-1">
                  <div
                    class="flex aspect-square items-center justify-center rounded-lg border bg-card p-6"
                  >
                    <span class="text-4xl font-semibold">{{ index }}</span>
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
export class DefaultCarouselDemo {
  readonly items = [1, 2, 3, 4, 5];
}`;
}
