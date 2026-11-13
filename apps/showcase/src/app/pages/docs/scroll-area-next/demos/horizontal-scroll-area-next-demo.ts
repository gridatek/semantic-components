import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollAreaNext,
  ScScrollAreaNextScrollbar,
  ScScrollAreaNextThumb,
  ScScrollAreaNextViewport,
  ScScrollAreaNextViewportContent,
} from '@semantic-components/ui';

/** A row wider than the box: a horizontal scrollbar. */
@Component({
  selector: 'app-horizontal-scroll-area-next-demo',
  imports: [
    NgOptimizedImage,
    ScFrame,
    ScScrollAreaNext,
    ScScrollAreaNextViewportContent,
    ScScrollAreaNextScrollbar,
    ScScrollAreaNextThumb,
    ScScrollAreaNextViewport,
  ],
  template: `
    <div scScrollAreaNext scFrame class="w-96 max-w-full whitespace-nowrap">
      <div scScrollAreaNextViewport>
        <div scScrollAreaNextViewportContent class="flex w-max gap-4 p-4">
          @for (place of places; track place) {
            <figure class="shrink-0">
              <img
                [ngSrc]="'/images/gallery/' + place + '-thumb.jpg'"
                width="192"
                height="128"
                priority
                alt=""
                class="rounded-md object-cover"
              />
              <figcaption class="text-muted-foreground pt-2 text-xs capitalize">
                {{ place }}
              </figcaption>
            </figure>
          }
        </div>
      </div>
      <div scScrollAreaNextScrollbar orientation="horizontal">
        <div scScrollAreaNextThumb></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalScrollAreaNextDemo {
  protected readonly places = [
    'cafe',
    'coast',
    'forest',
    'gorge',
    'mountains',
    'shed',
    'summit',
    'waterfall',
  ];
}
