import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScVirtualListNext,
  ScVirtualListNextRow,
} from '@semantic-components/ui-lab';

/** In lanes: photos in three columns, each placed in the lane that ends first. */
@Component({
  selector: 'app-grid-virtual-list-next-demo',
  imports: [ScVirtualListNext, ScVirtualListNextRow],
  template: `
    <ul
      scVirtualListNext
      #list="scVirtualListNext"
      tabindex="0"
      [count]="photos.length"
      [estimate]="160"
      [lanes]="3"
      [gap]="8"
      aria-label="Photos"
      class="h-96 w-full max-w-lg overflow-y-auto"
    >
      @for (row of list.rows(); track row.key) {
        <li [scVirtualListNextRow]="row">
          <img
            [src]="'/images/gallery/' + photos[row.index] + '-thumb.jpg'"
            [alt]="photos[row.index] + ' ' + (row.index + 1)"
            class="aspect-square w-full rounded-lg object-cover"
          />
        </li>
      }
    </ul>
    <p class="text-muted-foreground text-sm" data-testid="range">
      @if (list.range(); as range) {
        Rendered: {{ range.first + 1 }}–{{ range.last + 1 }} of
        {{ list.count() }}
      }
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class GridVirtualListNextDemo {
  private readonly names = [
    'cafe',
    'coast',
    'forest',
    'gorge',
    'mountains',
    'shed',
    'summit',
    'waterfall',
  ];
  readonly photos = Array.from({ length: 600 }, (_, i) => this.names[i % 8]);
}
