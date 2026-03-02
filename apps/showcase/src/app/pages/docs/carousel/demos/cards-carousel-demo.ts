import {
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
  template: `
    <div class="mx-auto w-full max-w-sm">
      <div scCarousel class="w-full">
        <div scCarouselViewport>
          <div scCarouselTrack>
            @for (card of cards; track card.title) {
              <div scCarouselItem>
                <div class="p-1">
                  <div class="bg-card rounded-lg border p-6">
                    <h4 class="font-semibold">{{ card.title }}</h4>
                    <p class="text-muted-foreground mt-2 text-sm">
                      {{ card.description }}
                    </p>
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
  `,
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
}
