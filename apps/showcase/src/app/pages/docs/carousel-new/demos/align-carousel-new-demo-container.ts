import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlignCarouselNewDemo } from './align-carousel-new-demo';

@Component({
  selector: 'app-align-carousel-new-demo-container',
  imports: [DemoContainer, AlignCarouselNewDemo],
  template: `
    <app-demo-container
      title="Align"
      [code]="code"
      demoUrl="/demos/carousel-new/align-carousel-new-demo"
    >
      <app-align-carousel-new-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignCarouselNewDemoContainer {
  private readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAspectRatio,
  ScFrame,
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import {
  ScCarouselNew,
  type ScCarouselNewAlign,
  ScCarouselNewItem,
  ScCarouselNewNext,
  ScCarouselNewPrevious,
  ScCarouselNewTrack,
  ScCarouselNewViewport,
} from '@semantic-components/ui/carousel';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** Where a page sits in the viewport (align): at the start, centred with its neighbours peeking in, or at the end. It starts on the third photo ([page]="2"). */
@Component({
  selector: 'app-align-carousel-new-demo',
  imports: [
    NgOptimizedImage,
    ScAspectRatio,
    ScFrame,
    ScSelect,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScCarouselNew,
    ScCarouselNewItem,
    ScCarouselNewNext,
    ScCarouselNewPrevious,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
    SiCheckIcon,
    SiChevronDownIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="flex w-full flex-col items-center gap-6">
      <div scSelect class="w-40" [items]="alignments" [(value)]="align">
        <div scSelectLabel class="sr-only">Align</div>
        <div scSelectTrigger class="w-full">
          <span scSelectValue></span>
          <svg scSelectIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectPortal>
          <div scSelectPopup>
            <div scSelectList>
              @for (item of alignments; track item.value) {
                <div scSelectItem [value]="item.value">
                  <span scSelectItemText>{{ item.label }}</span>
                  <span scSelectItemIndicator><svg siCheckIcon></svg></span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
      <div
        scCarouselNew
        [align]="align()"
        [page]="2"
        aria-roledescription="carousel"
        aria-label="Places, aligned"
        class="w-full max-w-[12rem] sm:max-w-sm"
      >
        <div scCarouselNewViewport>
          <div scCarouselNewTrack>
            @for (photo of photos; track photo.src) {
              <div
                scCarouselNewItem
                #slide="scCarouselNewItem"
                class="basis-2/3"
                aria-roledescription="slide"
                [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
              >
                <div scAspectRatio scFrame [ratio]="4 / 3">
                  <img
                    [ngSrc]="photo.src"
                    fill
                    [priority]="$index >= 1 && $index <= 3"
                    sizes="(min-width: 640px) 25vw, 40vw"
                    [alt]="photo.alt"
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignCarouselNewDemo {
  private readonly alignments: { value: ScCarouselNewAlign; label: string }[] =
    [
      { value: 'start', label: 'Start' },
      { value: 'center', label: 'Center' },
      { value: 'end', label: 'End' },
    ];
  private readonly align = signal<ScCarouselNewAlign>('center');
  private readonly photos = [
    {
      src: '/images/gallery/mountains.jpg',
      alt: 'Mountains under a clear sky',
    },
    { src: '/images/gallery/coast.jpg', alt: 'A rocky coast' },
    { src: '/images/gallery/forest.jpg', alt: 'A forest path' },
    { src: '/images/gallery/gorge.jpg', alt: 'A river in a gorge' },
    { src: '/images/gallery/cafe.jpg', alt: 'A street cafe' },
    { src: '/images/gallery/summit.jpg', alt: 'A snowy summit' },
  ];
}`;
}
