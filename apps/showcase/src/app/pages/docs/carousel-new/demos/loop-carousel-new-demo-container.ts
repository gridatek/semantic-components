import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LoopCarouselNewDemo } from './loop-carousel-new-demo';

@Component({
  selector: 'app-loop-carousel-new-demo-container',
  imports: [DemoContainer, LoopCarouselNewDemo],
  template: `
    <app-demo-container
      title="Loop"
      [code]="code"
      demoUrl="/demos/carousel-new/loop-carousel-new-demo"
    >
      <app-loop-carousel-new-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LoopCarouselNewDemoContainer {
  private readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';
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

/** Loops round: past the last photo comes the first, both ways; Previous and Next are never disabled. */
@Component({
  selector: 'app-loop-carousel-new-demo',
  imports: [
    NgOptimizedImage,
    ScCarouselNew,
    ScCarouselNewItem,
    ScCarouselNewNext,
    ScCarouselNewPrevious,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
    ScAspectRatio,
    ScFrame,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scCarouselNew
      aria-roledescription="carousel"
      aria-label="Places"
      class="w-full max-w-[12rem] sm:max-w-sm"
      [loop]="true"
    >
      <div scCarouselNewViewport>
        <div scCarouselNewTrack>
          @for (image of images; track image.src) {
            <div
              scCarouselNewItem
              #slide="scCarouselNewItem"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div scAspectRatio scFrame [ratio]="4 / 3">
                <img
                  [ngSrc]="image.src"
                  fill
                  [priority]="$first"
                  sizes="(min-width: 640px) 40vw, 50vw"
                  [alt]="image.alt"
                  class="object-cover"
                />
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
export class LoopCarouselNewDemo {
  private readonly images = [
    {
      src: '/images/gallery/mountains.jpg',
      alt: 'Mountains under a clear sky',
    },
    { src: '/images/gallery/coast.jpg', alt: 'A rocky coast' },
    { src: '/images/gallery/forest.jpg', alt: 'A forest path' },
    { src: '/images/gallery/gorge.jpg', alt: 'A river in a gorge' },
    { src: '/images/gallery/cafe.jpg', alt: 'A street cafe' },
  ];
}`;
}
