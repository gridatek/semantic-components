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
  selector: 'app-half-width-carousel-demo',
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
    <div class="mx-auto w-full max-w-md">
      <div scCarousel class="w-full">
        <div scCarouselViewport>
          <div scCarouselTrack>
            @for (index of items; track index) {
              <div scCarouselItem class="basis-1/2">
                <div class="p-1">
                  <div
                    class="bg-card flex aspect-square items-center justify-center rounded-lg border"
                  >
                    <span class="text-3xl font-semibold">{{ index }}</span>
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
export class HalfWidthCarouselDemo {
  readonly items = [1, 2, 3, 4, 5];
}
