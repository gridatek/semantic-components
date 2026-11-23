import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';
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
} from '@semantic-icons/lucide-icons';

/** Thumbnails: a second carousel, drag free, as a strip of buttons. The photo shown is one signal: the gallery's [(page)], and the strip follows it (pageOf()) so the current thumbnail stays in view. */
@Component({
  selector: 'app-thumbnails-carousel-new-demo',
  imports: [
    NgOptimizedImage,
    ScAspectRatio,
    ScFrame,
    ScCarouselNew,
    ScCarouselNewItem,
    ScCarouselNewNext,
    ScCarouselNewPrevious,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="flex w-full max-w-[12rem] flex-col gap-3 sm:max-w-sm">
      <div
        scCarouselNew
        [(page)]="photo"
        aria-roledescription="carousel"
        aria-label="Gallery"
        class="w-full"
      >
        <div scCarouselNewViewport>
          <div scCarouselNewTrack>
            @for (item of photos; track item.src; let first = $first) {
              <div
                scCarouselNewItem
                #slide="scCarouselNewItem"
                aria-roledescription="slide"
                [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
              >
                <div scAspectRatio scFrame [ratio]="4 / 3">
                  <img
                    [ngSrc]="item.src"
                    fill
                    [priority]="first"
                    sizes="(min-width: 640px) 40vw, 50vw"
                    [alt]="item.alt"
                    class="object-cover"
                  />
                </div>
              </div>
            }
          </div>
        </div>
        <button scCarouselNewPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">Previous photo</span>
        </button>
        <button scCarouselNewNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">Next photo</span>
        </button>
      </div>
      <div
        scCarouselNew
        #strip="scCarouselNew"
        [dragFree]="true"
        [page]="strip.pageOf(photo())"
        aria-roledescription="carousel"
        aria-label="Thumbnails"
        class="w-full"
      >
        <div scCarouselNewViewport>
          <div scCarouselNewTrack class="-ms-2">
            @for (item of photos; track item.src; let i = $index) {
              <div
                scCarouselNewItem
                #thumb="scCarouselNewItem"
                class="basis-1/4 ps-2"
                aria-roledescription="slide"
                [attr.aria-label]="thumb.index() + 1 + ' of ' + thumb.count()"
              >
                <button
                  type="button"
                  scFrame
                  size="sm"
                  class="focus-visible:ring-ring/50 block w-full overflow-hidden outline-none focus-visible:ring-[3px]"
                  [class.opacity-50]="photo() !== i"
                  [attr.aria-current]="photo() === i || null"
                  (click)="photo.set(i)"
                >
                  <div scAspectRatio [ratio]="1">
                    <img
                      [ngSrc]="item.thumb"
                      fill
                      sizes="15vw"
                      alt=""
                      class="object-cover"
                    />
                  </div>
                  <span class="sr-only">{{ item.alt }}</span>
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ThumbnailsCarouselNewDemo {
  private readonly photo = signal(0);
  private readonly photos = [
    'mountains',
    'coast',
    'forest',
    'gorge',
    'cafe',
    'summit',
    'shed',
    'waterfall',
  ].map((name, i) => ({
    src: `/images/gallery/${name}.jpg`,
    thumb: `/images/gallery/${name}-thumb.jpg`,
    alt: [
      'Mountains under a clear sky',
      'A rocky coast',
      'A forest path',
      'A river in a gorge',
      'A street cafe',
      'A snowy summit',
      'A shed in a field',
      'A waterfall',
    ][i],
  }));
}
