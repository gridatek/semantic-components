import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';
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

/** Thumbnails: a second carousel, drag free, as a strip of buttons (Embla's thumbnails: containScroll 'keepSnaps', a position per thumbnail). The photo shown is one signal: the gallery's [(activeIndex)], and the strip follows it. */
@Component({
  selector: 'app-thumbnails-carousel-demo',
  imports: [
    NgOptimizedImage,
    ScAspectRatio,
    ScFrame,
    ScCarousel,
    ScCarouselItem,
    ScCarouselNext,
    ScCarouselPrevious,
    ScCarouselTrack,
    ScCarouselViewport,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="flex w-full max-w-[12rem] flex-col gap-3 sm:max-w-sm">
      <div
        scCarousel
        [(activeIndex)]="photo"
        aria-roledescription="carousel"
        aria-label="Gallery"
        class="w-full"
      >
        <div scCarouselViewport>
          <div scCarouselTrack>
            @for (item of photos; track item.src; let first = $first) {
              <div
                scCarouselItem
                #slide="scCarouselItem"
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
        <button scCarouselPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">Previous photo</span>
        </button>
        <button scCarouselNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">Next photo</span>
        </button>
      </div>
      <div
        scCarousel
        [options]="stripOptions"
        [activeIndex]="photo()"
        aria-roledescription="carousel"
        aria-label="Thumbnails"
        class="w-full"
      >
        <div scCarouselViewport>
          <div scCarouselTrack class="-ms-2">
            @for (item of photos; track item.src; let i = $index) {
              <div
                scCarouselItem
                #thumb="scCarouselItem"
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
export class ThumbnailsCarouselDemo {
  private readonly photo = signal(0);
  private readonly stripOptions = {
    dragFree: true,
    containScroll: 'keepSnaps',
  } as const;
  private readonly photos = [
    ['mountains', 'Mountains under a clear sky'],
    ['coast', 'A rocky coast'],
    ['forest', 'A forest path'],
    ['gorge', 'A river in a gorge'],
    ['cafe', 'A street cafe'],
    ['summit', 'A snowy summit'],
    ['shed', 'A shed in a field'],
    ['waterfall', 'A waterfall'],
  ].map(([name, alt]) => ({
    src: `/images/gallery/${name}.jpg`,
    thumb: `/images/gallery/${name}-thumb.jpg`,
    alt,
  }));
}
