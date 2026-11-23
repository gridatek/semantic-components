import { A11yModule } from '@angular/cdk/a11y';
import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  signal,
  viewChildren,
} from '@angular/core';
import {
  ScAspectRatio,
  ScDialog,
  ScDialogClose,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScFrame,
} from '@semantic-components/ui';
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
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A gallery: a thumbnail opens the dialog at its photo, a carousel of them all — swipes, ← →, Previous and Next, a counter, the thumbnails below; Escape closes it and focus goes back to the thumbnail. */
@Component({
  selector: 'app-lightbox-usage-demo',
  imports: [
    A11yModule,
    NgOptimizedImage,
    ScAspectRatio,
    ScDialog,
    ScDialogClose,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScFrame,
    ScCarousel,
    ScCarouselItem,
    ScCarouselNext,
    ScCarouselPrevious,
    ScCarouselTrack,
    ScCarouselViewport,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiXIcon,
  ],
  template: `
    <div scDialogProvider [(open)]="open">
      <ul class="grid w-full max-w-md grid-cols-3 gap-2" aria-label="Places">
        @for (photo of photos; track photo.src; let i = $index) {
          <li>
            <button
              type="button"
              scFrame
              size="sm"
              class="focus-visible:ring-ring/50 block w-full overflow-hidden outline-none focus-visible:ring-[3px]"
              (click)="show(i)"
            >
              <div scAspectRatio [ratio]="1">
                <img
                  [ngSrc]="photo.thumb"
                  fill
                  [priority]="i < 3"
                  sizes="(min-width: 640px) 15vw, 30vw"
                  [alt]="photo.alt"
                  class="object-cover"
                />
              </div>
            </button>
          </li>
        }
      </ul>
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-3xl">
          <button scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>Places</h2>
          </div>
          <div
            scCarousel
            [(activeIndex)]="index"
            aria-roledescription="carousel"
            aria-label="Photos"
            class="grid gap-3"
          >
            <div class="relative">
              <div scCarouselViewport cdkFocusInitial>
                <div scCarouselTrack>
                  @for (photo of photos; track photo.src) {
                    <div
                      scCarouselItem
                      #slide="scCarouselItem"
                      aria-roledescription="slide"
                      [attr.aria-label]="
                        slide.index() + 1 + ' of ' + slide.count()
                      "
                    >
                      <div scAspectRatio scFrame [ratio]="3 / 2">
                        <img
                          [ngSrc]="photo.src"
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          [alt]="photo.alt"
                          class="object-cover"
                        />
                      </div>
                    </div>
                  }
                </div>
              </div>
              <button scCarouselPrevious variant="secondary" class="start-2">
                <svg siChevronLeftIcon></svg>
                <span class="sr-only">Previous photo</span>
              </button>
              <button scCarouselNext variant="secondary" class="end-2">
                <svg siChevronRightIcon></svg>
                <span class="sr-only">Next photo</span>
              </button>
            </div>
            <p class="text-muted-foreground flex justify-between gap-4 text-sm">
              <span>{{ photos[index()].alt }}</span>
              <span class="tabular-nums" aria-hidden="true">
                {{ index() + 1 }} / {{ photos.length }}
              </span>
            </p>
            <div
              role="group"
              aria-label="Thumbnails"
              class="flex gap-2 overflow-x-auto p-1"
            >
              @for (photo of photos; track photo.src; let i = $index) {
                <button
                  #thumb
                  type="button"
                  scFrame
                  size="sm"
                  class="focus-visible:ring-ring/50 block w-16 shrink-0 overflow-hidden outline-none focus-visible:ring-[3px]"
                  [class.opacity-50]="index() !== i"
                  [attr.aria-current]="index() === i || null"
                  (click)="index.set(i)"
                >
                  <div scAspectRatio [ratio]="1">
                    <img
                      [ngSrc]="photo.thumb"
                      fill
                      sizes="10vw"
                      alt=""
                      class="object-cover"
                    />
                  </div>
                  <span class="sr-only">{{ photo.alt }}</span>
                </button>
              }
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LightboxUsageDemo {
  private readonly open = signal(false);
  /** The photo shown: the carousel's activeIndex. */
  private readonly index = signal(0);
  private readonly thumbs = viewChildren<ElementRef<HTMLElement>>('thumb');
  private readonly photos = [
    ['mountains', 'Mountains under a clear sky'],
    ['coast', 'A rocky coast'],
    ['forest', 'A forest path'],
    ['gorge', 'A river in a gorge'],
    ['cafe', 'A street cafe'],
    ['summit', 'A snowy summit'],
  ].map(([name, alt]) => ({
    src: `/images/gallery/${name}.jpg`,
    thumb: `/images/gallery/${name}-thumb.jpg`,
    alt,
  }));

  constructor() {
    // The current thumbnail stays in view as the photo changes.
    afterRenderEffect(() => {
      this.thumbs()[this.index()]?.nativeElement.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    });
  }

  private show(index: number): void {
    this.index.set(index);
    this.open.set(true);
  }
}
