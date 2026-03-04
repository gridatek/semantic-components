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
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-vertical-carousel-demo',
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
  template: `
    <div class="py-12">
      <div
        scCarousel
        aria-label="Vertical carousel"
        orientation="vertical"
        [options]="{ align: 'start' }"
        class="w-full max-w-xs"
      >
        <div scCarouselViewport>
          <div scCarouselTrack class="-mt-1 h-[270px]">
            @for (index of items; track index) {
              <div scCarouselItem class="basis-1/2 pt-1">
                <div class="p-1">
                  <div scCard>
                    <div
                      scCardBody
                      class="flex items-center justify-center p-6"
                    >
                      <span class="text-3xl font-semibold">{{ index }}</span>
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalCarouselDemo {
  readonly items = [1, 2, 3, 4, 5];
}
