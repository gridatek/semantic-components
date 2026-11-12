import {
  Component,
  ViewEncapsulation,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import { ScButton, ScCard, ScCardContent } from '@semantic-components/ui';
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
  SiPauseIcon,
  SiPlayIcon,
} from '@semantic-icons/lucide-icons';
import Autoplay from 'embla-carousel-autoplay';

/** Autoplay (embla-carousel-autoplay): it stops on hover, focus and drag, and a button pauses it (WCAG 2.2.2); its name follows the state. */
@Component({
  selector: 'app-plugin-carousel-demo',
  imports: [
    ScCarousel,
    ScCarouselItem,
    ScCarouselNext,
    ScCarouselPrevious,
    ScCarouselTrack,
    ScCarouselViewport,
    ScButton,
    ScCard,
    ScCardContent,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiPauseIcon,
    SiPlayIcon,
  ],
  template: `
    <div
      class="flex w-full max-w-[12rem] flex-col items-center gap-2 sm:max-w-xs"
    >
      <div
        scCarousel
        #carousel="scCarousel"
        [plugins]="plugins"
        aria-roledescription="carousel"
        aria-label="Autoplay"
        class="w-full"
      >
        <div scCarouselViewport>
          <div scCarouselTrack>
            @for (n of slides; track n) {
              <div
                scCarouselItem
                #slide="scCarouselItem"
                aria-roledescription="slide"
                [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
              >
                <div class="p-1">
                  <div scCard>
                    <div
                      scCardContent
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
        <button scCarouselPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">Previous slide</span>
        </button>
        <button scCarouselNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">Next slide</span>
        </button>
      </div>
      <button scButton variant="outline" size="icon-sm" (click)="toggle()">
        @if (playing()) {
          <svg siPauseIcon></svg>
          <span class="sr-only">Pause</span>
        } @else {
          <svg siPlayIcon></svg>
          <span class="sr-only">Play</span>
        }
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PluginCarouselDemo {
  readonly slides = [1, 2, 3, 4, 5];
  private readonly autoplay = Autoplay({
    delay: 2000,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  });
  readonly plugins = [this.autoplay];
  readonly playing = signal(false);
  private readonly carousel = viewChild.required(ScCarousel);

  constructor() {
    // The button's state from the plugin's events (it stops by itself too):
    // they come before its isPlaying() changes.
    effect((onCleanup) => {
      const api = this.carousel().api();
      if (!api) return;
      const play = () => this.playing.set(true);
      const stop = () => this.playing.set(false);
      api.on('autoplay:play', play).on('autoplay:stop', stop);
      this.playing.set(this.autoplay.isPlaying());
      onCleanup(() =>
        api.off('autoplay:play', play).off('autoplay:stop', stop),
      );
    });
  }

  toggle(): void {
    if (this.autoplay.isPlaying()) this.autoplay.stop();
    else this.autoplay.play();
  }
}
