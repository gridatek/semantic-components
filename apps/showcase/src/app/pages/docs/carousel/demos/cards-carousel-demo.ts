import {
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
} from '@semantic-components/carousel';
import {
  ScCard,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
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
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
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
                  <div scCard size="sm">
                    <div scCardHeader>
                      <h4 scCardTitle>{{ card.title }}</h4>
                      <p scCardDescription>{{ card.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <button scCarouselPrevious class="left-2 sm:-left-12">
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">Previous slide</span>
        </button>
        <button scCarouselNext class="right-2 sm:-right-12">
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
