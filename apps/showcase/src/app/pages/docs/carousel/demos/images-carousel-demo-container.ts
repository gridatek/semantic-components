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
  host: { class: 'block w-full' },
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
  selector: 'app-images-carousel-demo',
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
    <div class="mx-auto w-full max-w-[12rem] sm:max-w-xs">
      <div scCarousel aria-label="Images carousel" class="w-full">
        <div scCarouselViewport>
          <div scCarouselTrack>
            @for (image of images; track image.alt) {
              <div scCarouselItem>
                <div class="p-1">
                  <div scCard>
                    <div
                      scCardBody
                      class="flex aspect-video items-center justify-center p-6"
                    >
                      <span class="text-muted-foreground text-sm">
                        {{ image.alt }}
                      </span>
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
  host: { class: 'flex w-full justify-center' },
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
