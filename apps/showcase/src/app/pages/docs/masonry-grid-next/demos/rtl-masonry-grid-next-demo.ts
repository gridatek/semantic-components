import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMasonryGridNext,
  ScMasonryGridNextItem,
} from '@semantic-components/ui';

/** In a right-to-left page: the first column on the right, the rows read from the right. */
@Component({
  selector: 'app-rtl-masonry-grid-next-demo',
  imports: [Dir, ScMasonryGridNext, ScMasonryGridNextItem],
  template: `
    <div dir="rtl" lang="ar" class="w-full">
      <ol scMasonryGridNext [columnWidth]="90" class="gap-2">
        @for (height of heights; track $index) {
          <li
            scMasonryGridNextItem
            class="bg-muted grid place-items-center rounded-md text-xs font-medium"
            [style.height.px]="height"
          >
            {{ $index + 1 }}
          </li>
        }
      </ol>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMasonryGridNextDemo {
  private readonly heights = [120, 50, 60, 70, 110, 40, 90, 60, 50];
}
