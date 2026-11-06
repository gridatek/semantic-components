import { Component, ViewEncapsulation } from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui';

/** Rows of a table: a wide column, then two narrow ones. */
@Component({
  selector: 'app-table-skeleton-demo',
  imports: [ScSkeleton],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-2">
      @for (row of rows; track row) {
        <div class="flex gap-4">
          <div scSkeleton class="h-4 flex-1"></div>
          <div scSkeleton class="h-4 w-24"></div>
          <div scSkeleton class="h-4 w-20"></div>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TableSkeletonDemo {
  protected readonly rows = [1, 2, 3, 4, 5];
}
