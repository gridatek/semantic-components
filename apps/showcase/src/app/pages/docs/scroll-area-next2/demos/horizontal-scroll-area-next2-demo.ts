import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScScrollAreaNext2 } from '@semantic-components/ui';

/** A row wider than the box: it scrolls sideways. */
@Component({
  selector: 'app-horizontal-scroll-area-next2-demo',
  imports: [NgOptimizedImage, ScScrollAreaNext2],
  template: `
    <div
      scScrollAreaNext2
      class="w-96 max-w-full rounded-md border whitespace-nowrap"
    >
      <div class="flex w-max gap-4 p-4">
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalScrollAreaNext2Demo {
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
