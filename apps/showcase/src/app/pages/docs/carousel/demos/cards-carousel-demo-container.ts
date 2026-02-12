import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CardsCarouselDemo } from './cards-carousel-demo';

@Component({
  selector: 'app-cards-carousel-demo-container',
  imports: [DemoContainer, CardsCarouselDemo],
  template: `
    <app-demo-container
      title="With Cards"
      demoUrl="/demos/carousel/cards-carousel-demo"
      [code]="code"
    >
      <app-cards-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsCarouselDemoContainer {
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
  selector: 'app-cards-carousel-demo',
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
    <div class="mx-auto w-full max-w-sm">
      <div sc-carousel class="w-full">
        <div sc-carousel-viewport>
          <div sc-carousel-track>
            @for (card of cards; track card.title) {
              <div sc-carousel-item>
                <div class="p-1">
                  <div class="rounded-lg border bg-card p-6">
                    <h4 class="font-semibold">{{ card.title }}</h4>
                    <p class="mt-2 text-sm text-muted-foreground">
                      {{ card.description }}
                    </p>
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
export class CardsCarouselDemo {
  readonly cards = [
    {
      title: 'Card 1',
      description: 'This is the first card with some description text.',
    },
    {
      title: 'Card 2',
      description: 'This is the second card with different content.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card with more information.',
    },
    {
      title: 'Card 4',
      description: 'This is the fourth card with additional details.',
    },
    { title: 'Card 5', description: 'This is the fifth and final card.' },
  ];
}`;
}
