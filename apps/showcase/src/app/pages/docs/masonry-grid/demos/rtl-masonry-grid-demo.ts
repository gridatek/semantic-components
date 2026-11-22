import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScMasonryGrid,
  ScMasonryGridItem,
} from '@semantic-components/ui';

/** In a right-to-left page: the first column on the right, the rows read from the right. */
@Component({
  selector: 'app-rtl-masonry-grid-demo',
  imports: [Dir, ScMasonryGrid, ScMasonryGridItem, ScFrame],
  template: `
    <div dir="rtl" lang="ar" class="w-full">
      <ol scMasonryGrid [columnWidth]="90" class="gap-2">
        @for (height of heights; track $index) {
          <li
            scMasonryGridItem
            scFrame
            size="sm"
            class="bg-muted grid place-items-center text-xs font-medium"
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
export class RtlMasonryGridDemo {
  private readonly heights = [120, 50, 60, 70, 110, 40, 90, 60, 50];
}
