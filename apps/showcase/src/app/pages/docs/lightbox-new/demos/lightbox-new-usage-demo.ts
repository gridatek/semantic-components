import { A11yModule } from '@angular/cdk/a11y';
import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  ScCarouselNew,
  ScCarouselNewItem,
  ScCarouselNewNext,
  ScCarouselNewPrevious,
  ScCarouselNewTrack,
  ScCarouselNewViewport,
} from '@semantic-components/ui/carousel';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A gallery: a thumbnail opens the dialog at its photo, a carousel of them all — swipes, ← →, Previous and Next, a counter, the thumbnails below; Escape closes it and focus goes back to the thumbnail. */
@Component({
  selector: 'app-lightbox-new-usage-demo',
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
    ScCarouselNew,
    ScCarouselNewItem,
    ScCarouselNewNext,
    ScCarouselNewPrevious,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
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
            scCarouselNew
            [(page)]="index"
            aria-roledescription="carousel"
            aria-label="Photos"
          >
            <div scCarouselNewViewport>
              <div scCarouselNewTrack>
                @for (photo of photos; track photo.src) {
                  <div
                    scCarouselNewItem
                    #slide="scCarouselNewItem"
                    aria-roledescription="slide"
                    [attr.aria-label]="
                      slide.index() + 1 + ' of ' + slide.count()
                    "
                  >
                    <figure class="space-y-2">
                      <div scAspectRatio scFrame [ratio]="3 / 2">
                        <img
                          [ngSrc]="photo.src"
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          [alt]="photo.alt"
                          class="object-cover"
                        />
                      </div>
                      <figcaption class="text-muted-foreground text-sm">
                        {{ photo.alt }}
                      </figcaption>
                    </figure>
                  </div>
                }
              </div>
            </div>
            <button scCarouselNewPrevious variant="secondary" class="start-2">
              <svg siChevronLeftIcon></svg>
              <span class="sr-only">Previous photo</span>
            </button>
            <button
              scCarouselNewNext
              variant="secondary"
              class="end-2"
              cdkFocusInitial
            >
              <svg siChevronRightIcon></svg>
              <span class="sr-only">Next photo</span>
            </button>
          </div>
          <p
            class="text-muted-foreground text-sm tabular-nums"
            aria-hidden="true"
          >
            {{ index() + 1 }} / {{ photos.length }}
          </p>
          <div
            scCarouselNew
            #strip="scCarouselNew"
            [dragFree]="true"
            [page]="strip.pageOf(index())"
            aria-roledescription="carousel"
            aria-label="Thumbnails"
          >
            <div scCarouselNewViewport>
              <div scCarouselNewTrack class="-ms-2">
                @for (photo of photos; track photo.src; let i = $index) {
                  <div
                    scCarouselNewItem
                    #thumb="scCarouselNewItem"
                    class="basis-1/5 ps-2 sm:basis-1/8"
                    aria-roledescription="slide"
                    [attr.aria-label]="
                      thumb.index() + 1 + ' of ' + thumb.count()
                    "
                  >
                    <button
                      type="button"
                      scFrame
                      size="sm"
                      class="focus-visible:ring-ring/50 block w-full overflow-hidden outline-none focus-visible:ring-[3px]"
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
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LightboxNewUsageDemo {
  private readonly open = signal(false);
  /** The photo shown: the carousel's page. */
  private readonly index = signal(0);
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

  private show(index: number): void {
    this.index.set(index);
    this.open.set(true);
  }
}
