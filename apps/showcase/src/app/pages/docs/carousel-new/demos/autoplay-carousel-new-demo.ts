import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarouselNew,
  ScCarouselNewIndicator,
  ScCarouselNewIndicators,
  ScCarouselNewItem,
  ScCarouselNewNext,
  ScCarouselNewPlayToggle,
  ScCarouselNewPrevious,
  ScCarouselNewTrack,
  ScCarouselNewViewport,
} from '@semantic-components/ui/carousel';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiPauseIcon,
  SiPlayIcon,
} from '@semantic-icons/lucide-icons';

/** Rotating every 4 seconds ([(playing)], interval), with a play toggle (WCAG 2.2.2). It pauses while hovered, with a finger down, in a hidden tab or scrolled away; it stops when you move it or bring keyboard focus in; it doesn't start by itself under reduced motion. */
@Component({
  selector: 'app-autoplay-carousel-new-demo',
  imports: [
    ScCarouselNew,
    ScCarouselNewIndicator,
    ScCarouselNewIndicators,
    ScCarouselNewItem,
    ScCarouselNewNext,
    ScCarouselNewPlayToggle,
    ScCarouselNewPrevious,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiPauseIcon,
    SiPlayIcon,
  ],
  template: `
    <div
      scCarouselNew
      #carousel="scCarouselNew"
      [(playing)]="playing"
      [interval]="4000"
      aria-roledescription="carousel"
      aria-label="Numbers, rotating"
      class="w-full max-w-[12rem] sm:max-w-xs"
    >
      <div scCarouselNewViewport>
        <div scCarouselNewTrack>
          @for (n of slides; track n) {
            <div
              scCarouselNewItem
              #slide="scCarouselNewItem"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div class="p-1">
                <div scCard>
                  <div
                    scCardBody
                    class="flex aspect-square items-center justify-center p-6"
                  >
                    <span class="text-4xl font-semibold">{{ n }}</span>
                  </div>
                </div>
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
      <div class="flex items-center justify-center gap-2 pt-2">
        <button scCarouselNewPlayToggle>
          @if (carousel.playing()) {
            <svg siPauseIcon></svg>
            <span class="sr-only">Pause</span>
          } @else {
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          }
        </button>
        <div scCarouselNewIndicators aria-label="Choose a slide">
          @for (page of carousel.pages(); track page) {
            <button scCarouselNewIndicator [page]="page">
              <span class="sr-only">Slide {{ page + 1 }}</span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AutoplayCarouselNewDemo {
  private readonly slides = [1, 2, 3, 4, 5];
  private readonly playing = signal(true);
}
