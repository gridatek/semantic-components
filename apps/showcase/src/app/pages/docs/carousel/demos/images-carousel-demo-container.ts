import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ImagesCarouselDemo } from './images-carousel-demo';

@Component({
  selector: 'app-images-carousel-demo-container',
  imports: [DemoContainer, ImagesCarouselDemo],
  template: `
    <app-demo-container
      title="Images"
      demoUrl="/demos/carousel/images-carousel-demo"
      [code]="code"
    >
      <app-images-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesCarouselDemoContainer {
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
  selector: 'app-images-carousel-demo',
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
    <div class="mx-auto w-full max-w-md">
      <div sc-carousel class="w-full">
        <div sc-carousel-viewport>
          <div sc-carousel-track>
            @for (image of images; track image.alt) {
              <div sc-carousel-item>
                <div class="p-1">
                  <div
                    class="flex aspect-video items-center justify-center rounded-lg border bg-muted"
                  >
                    <span class="text-sm text-muted-foreground">
                      {{ image.alt }}
                    </span>
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
export class ImagesCarouselDemo {
  readonly images = [
    { alt: 'Image 1' },
    { alt: 'Image 2' },
    { alt: 'Image 3' },
    { alt: 'Image 4' },
  ];
}`;
}
