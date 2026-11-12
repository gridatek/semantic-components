import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
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

/** Photos, each named by its alt; loops round. */
@Component({
  selector: 'app-images-carousel-demo',
  imports: [
    NgOptimizedImage,
    ScCarousel,
    ScCarouselItem,
    ScCarouselNext,
    ScCarouselPrevious,
    ScCarouselTrack,
    ScCarouselViewport,
    ScAspectRatio,
    ScFrame,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div
      scCarousel
      aria-roledescription="carousel"
      aria-label="Places"
      class="w-full max-w-[12rem] sm:max-w-sm"
      [options]="{ loop: true }"
    >
      <div scCarouselViewport>
        <div scCarouselTrack>
          @for (image of images; track image.src) {
            <div
              scCarouselItem
              #slide="scCarouselItem"
              aria-roledescription="slide"
              [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()"
            >
              <div scAspectRatio scFrame [ratio]="4 / 3">
                <img
                  [ngSrc]="image.src"
                  fill
                  [priority]="$first"
                  sizes="(min-width: 640px) 40vw, 50vw"
                  [alt]="image.alt"
                  class="object-cover"
                />
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ImagesCarouselDemo {
  readonly images = [
    {
      src: '/images/gallery/mountains.jpg',
      alt: 'Mountains under a clear sky',
    },
    { src: '/images/gallery/coast.jpg', alt: 'A rocky coast' },
    { src: '/images/gallery/forest.jpg', alt: 'A forest path' },
    { src: '/images/gallery/gorge.jpg', alt: 'A river in a gorge' },
    { src: '/images/gallery/cafe.jpg', alt: 'A street cafe' },
  ];
}
