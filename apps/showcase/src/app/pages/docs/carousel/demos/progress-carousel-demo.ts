import {
  Component,
  ViewEncapsulation,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarousel,
  ScCarouselItem,
  ScCarouselNext,
  ScCarouselPrevious,
  ScCarouselTrack,
  ScCarouselViewport,
} from '@semantic-components/ui/carousel';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** A progress bar from Embla’s API (api(), from exportAs): its scrollProgress() at every scroll event, 0 to 1. */
@Component({
  selector: 'app-progress-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselItem,
    ScCarouselNext,
    ScCarouselPrevious,
    ScCarouselTrack,
    ScCarouselViewport,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scCarousel
      [options]="{ align: 'start' }"
      aria-roledescription="carousel"
      aria-label="Numbers, with progress"
      class="w-full max-w-[12rem] sm:max-w-sm"
    >
      <div scCarouselViewport>
        <div scCarouselTrack>
          @for (n of slides; track n) {
            <div
              scCarouselItem
              #slide="scCarouselItem"
              class="basis-1/2 sm:basis-1/3"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardBody
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <span class="text-2xl font-semibold">{{ n }}</span>
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
      <div
        class="bg-muted mx-auto mt-4 h-1 w-1/2 overflow-hidden rounded-full"
        aria-hidden="true"
      >
        <div
          class="bg-primary h-full origin-left rtl:origin-right"
          data-testid="progress"
          [style.transform]="'scaleX(' + progress() + ')'"
        ></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ProgressCarouselDemo {
  private readonly slides = [1, 2, 3, 4, 5, 6, 7, 8];
  private readonly carousel = viewChild.required(ScCarousel);
  /** How far it has scrolled, 0 to 1. */
  private readonly progress = signal(0);

  constructor() {
    effect((onCleanup) => {
      const api = this.carousel().api();
      if (!api) return;
      const update = () =>
        this.progress.set(Math.max(0, Math.min(1, api.scrollProgress())));
      update();
      api.on('scroll', update).on('reInit', update);
      onCleanup(() => {
        api.off('scroll', update);
        api.off('reInit', update);
      });
    });
  }
}
