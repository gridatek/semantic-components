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
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-third-width-carousel-demo',
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
    <div class="mx-auto w-full max-w-lg">
      <div sc-carousel class="w-full">
        <div sc-carousel-viewport>
          <div sc-carousel-track>
            @for (index of items; track index) {
              <div sc-carousel-item class="basis-1/3">
                <div class="p-1">
                  <div
                    class="flex aspect-square items-center justify-center rounded-lg border bg-card"
                  >
                    <span class="text-2xl font-semibold">{{ index }}</span>
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdWidthCarouselDemo {
  readonly items = [1, 2, 3, 4, 5];
}
